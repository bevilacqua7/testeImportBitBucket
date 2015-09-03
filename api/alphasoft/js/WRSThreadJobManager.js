/*
 *
 * Gerenciador DOS JOBS ao criar ou executar um novo processo é necessário iniciar o start de JOBS nele é gerenciado 
 * todo o processo de JOBS do WRS
 *
 * @author Marcelo Santos
 *
 * Referências
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 */

/*
 * Apresentação em Segundos para o setTimeOut
 */


//Convertendo para o seguntos do setTimeout
var WRS_TIME_THREAD			=	1000*2; 
//Segundos para administração para verificar se a ação morreu
var WRS_TIME_OUT_THREAD		=	10;	
//Variável para cancelamento do JOB nela é inserida o array das sessões a serem canceladas
var WRS_THREAD_CANCEL		=	'WrsThreadCancelJob';	

/*
 * Gerenciamento de JOB
 * 
 * Sempre chamar o evento no body
 */
(function($){
 
    $.fn.ThreadJobManager = function(report_id) 
    {
    	
    	var that			=	this;
    	var DATA_NAME		=	'WrsThreadJobManager';
    	var WHO_CALL		=	'body'; // o evento principal é sempre em cima da body
    	var time			=	0;
    	
    	//Thread Principal
    	var THREAD_MAIN		=	'WrsThreadJobManagerTHREAD';

    	//Gerenciamento para saber se a thread está inativa
    	//se ela estive inativa então força a reativar
    	var THREAD_TIMEOUT	=	'WrsThreadJobManagerTHREADTimeOut';
    	
    	var data_param		=	that.data(DATA_NAME);
    	
    		if(empty(report_id))
    		{
    			console.error('Não foi declarado um report_id');
    			return true;
    		}
    		
    		if(empty(data_param))	{
    			data_param	=	[];
    		}
    		
    		data_param[data_param.length]=	report_id;
    		
    		//Armazenando na estrutura para poder processar
    		that.data(DATA_NAME,data_param);

    		
    	var removeThread	=	 function(report_id)
    	{
    		var _data_param		=		that.data(DATA_NAME);
    		var tmp_param		=		[];
    		
    		for(var lineParan in _data_param)
    			{
	    			if(_data_param[lineParan]!=report_id){
	    				tmp_param[tmp_param.length]=	_data_param[lineParan];
	    			}
    			}
    		
    		that.data(DATA_NAME,tmp_param);
    	}
    		
    	/*
    	 * Limpra o time out da thread 
    	 */
    	var WrsThreadJobManagerTHREADClear	=	 function()
    	{
    		clearTimeout(that.data(THREAD_MAIN));    		
    		that.data(THREAD_MAIN,'');
    	}    	
    
		
    	/*
    	 * Limpra o time out da thread manager
    	 */
    	var WrsThreadJobTimeOut	=	 function()
    	{
    		clearTimeout(that.data(THREAD_TIMEOUT));    		
    		that.data(THREAD_TIMEOUT,'');
    	} 

    	
    	/*
    	 * Recebe dados do run call
    	 */
    	var ThreadMainLoadData	=	 function(data)
    	{
    		

    		for(var lineData in data)
    			{
    			
    					try{
    							if(data[lineData]['error'])
    								{
    									alertify.error(LNG('ERRO_EXECUTE_ABA')+data[lineData]['error']);
    									removeThread(data[lineData]['REPORT_ID']);
    								}
    					}catch(e){}
    					
    					
    					try{
							if(data[lineData]['html'])
								{
									alertify.success(LNG('JOB_COMPLETE_LOAD')+data[lineData]['REPORT_ID']);
									removeThread(data[lineData]['REPORT_ID']);
									MOUNT_LAYOUT_GRID_HEADER(data[lineData]['warning']+data[lineData]['html'],'ThreadMainLoadData');
								}
					}catch(e){}
    			}
    		
    		
    		var _data_param		=	that.data(DATA_NAME);
    		var is_data			=	false;
    		
    			try{
    				
    					if(array_length(_data_param)) is_data= true;
    				
    			}catch(e){}
    		
    		
    			if(is_data)
    			{
    					that.data(THREAD_MAIN,setTimeout(ThreadMain, WRS_TIME_THREAD));	
    			}else{
    				WrsThreadJobManagerTHREADClear();
    				WrsThreadJobTimeOut();
    				alertify.success(LNG('JOB_COMPLETE'));
    			}
    	}
    	
    	
    	
    	/*
    	 * Thread por requisição do JOB
    	 * Quando oprocesso é finalizado chama-o novamente até que não exista mais JOBS a serem processados
    	 */
    	var ThreadMain	=	 function()
    	{
    		var _data_param		=		that.data(DATA_NAME);
    			time			=		mktime(date('H'),date('i'),parseInt(date('s'))+WRS_TIME_OUT_THREAD,date('m'),date('d'),date('Y'));
    		var _mktime			=		mktime();
    		var param_request	=	 	[];
    		
    		if(array_length(_data_param)>=1)
    		{
    			var _file			=	'WRS_PANEL';
    			var _class			=	'WRS_PANEL';
    			var _event			=	'threadJobManager';
     				param_request	=	base64_encode(json_encode(_data_param));
    			
    				runCall(
    							{'jobs_manager':param_request},
    							_file,
    							_class,
    							_event,
    							ThreadMainLoadData,
    							'modal',
    							'json'
    						);	
    		}
    	}
    	
    	
    	
    	/*
    	alertify.custom = alertify.extend("custom");
		alertify.custom("Iniciando");
    	*/
    	/*
    	 * Thread gerencial do processo 
    	 */
    	var ThreadMainManagerTimeOut	=	 function()
    	{
    		var _data_param		=	that.data(DATA_NAME);
    		var _mktime			=	mktime();
    		
//    		console.log('ThreadMainManagerTimeOut',_mktime);
    		
    		
    		
    		if(array_length(_data_param)>=1)
    		{
    			that.data(THREAD_TIMEOUT,setTimeout(ThreadMainManagerTimeOut, WRS_TIME_OUT_THREAD*1000));	
    		}
    		else
    		{
    			alertify.success(LNG('JOB_COMPLETE'));
    			WrsThreadJobTimeOut();
    		}
    	}    	
    	
    	//Se existir alguma thread em execução para ela
    	WrsThreadJobManagerTHREADClear();
    	
    	//limpa o thread manager
    	WrsThreadJobTimeOut();
    	
//    	console.log('data_param',data_param);
    	//Garante que seja executado apenas se houver dados para serem processados no thread
    	if(array_length(data_param)>=1)
    	{
    		
	    	//Iniciando a Thread MAIN
	    	that.data(THREAD_MAIN,setTimeout(ThreadMain, WRS_TIME_THREAD));	
	    	
	    	//Thread Manager para gerenciar as thread via requisição
	    	that.data(THREAD_TIMEOUT,setTimeout(ThreadMainManagerTimeOut, WRS_TIME_OUT_THREAD*1000));	
	    	
	    	return false;
    	}
    	
    	return true;
    };
    
    
 
}( jQuery ));


 

