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
	
	$.fn.WRSTimerLoader = function(methodOrOptions)
	{
			var labelData			=	'WRSTimeLoader';
			var _data				=	$('body').data(labelData); 
			var that				=	this;
			var DATA_NAME			=	'WrsThreadJobManager';
			
			var TIME_LOAD			=	300;
		
			var __clock_time	=	 function()
			{
				
				var _data			=	 that.data(DATA_NAME);
				var _data_time		=	$('body').data(labelData);
				var _mktime	=	'';
				

					_data_time['time']	=	setTimeout(__clock_time, TIME_LOAD);
					/*
					
					for(var lineReportID in _data)
						{
							try{
								if(_data[lineReportID].report_id==_data_time.report_id)
								{									

										_mktime	=	_data[lineReportID].mktime;
										 
								}
							}catch(e){
								//_mktime	=	 mktime();
							}
						}
					

				if(empty(_mktime))
				{*/
					_mktime	=	 _data_time.mktime;
					
				//}
//				console.log('_mktime00',_mktime);
				
				var _mktime_current	=	mktime();
					_mktime			=	_mktime_current-_mktime;
				var _date			=	 date('i:s',_mktime);
				
				
				//console.log('_date',_date);
					
				$('.wrs-modal-time').html(_date);
				
			}
			
			
			var __stop_time_out		=	 function()
			{
				
				var _data_time		=	$('body').data(labelData);
				
				if(empty(_data_time)) return false;
				
				
//					if(array_length(_data_time)==0)
	//				{
						clearTimeout(_data_time['time']);    		
		    			that.data(labelData,'');
		//			}
		    		
		    		
			}
			
			
			var __init		=	 function(options)
			{
				__stop_time_out();
				
				var _options			=	 options;
					_options['time']	=	setTimeout(__clock_time, TIME_LOAD);
					_options['mktime']	=	mktime();

					var _data			=	 that.data(DATA_NAME);

					for(var lineData in _data)
					{
						var report__id		=	_data[lineData];
						
						if(report__id.report_id==_options['report_id'])
							{
								_options['mktime']	=	report__id.mktime;
							}
					}
					
					
					$('body').data(labelData,_options);
					
			}
			
			
			var __stop		=	 function(options)
			{
				var _data_time		=	$('body').data(labelData);
				
				if(empty(_data_time)) return false;
				
				if(_data_time.report_id==options.report_id)
				{
					__stop_time_out();
				}
		    		
			}
			
			
			
			var methods = 
			{
			        init 			: 	__init,
			        stop			:	__stop,
			        timeout			:	__stop_time_out
			};
		
		 
			/*
			 * 
			 * Inicia a construção dos metodos
			 * 
			 */
			if ( methods[methodOrOptions] )
			{
		            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    }
			else if ( typeof methodOrOptions === 'object' || ! methodOrOptions )
			{
		            // Default to "init"
		            return methods.init.apply( this, arguments );
		    }
		    else
		    {
		            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
		    }   
			
			
			
			
			
	}
	/*
	 * 
	 * Gerenciamento par a janela de abas em carregamento 
	 * 
	 * 
	 * Executando 
	 * 
	 * 
	 *	Verificando se o ID está ativo
	 * 	$('body').WRSJobModal('is_active',{report_id:'ABA_34072189172729'})
	 * 
	 * Adicionando o DEMO
	 * $('body').WRSJobModal('demo')
	 */
	$.fn.WRSJobModal = function(methodOrOptions) 
	{
			var that			=	 this;
			var DATA_NAME		=	'WrsThreadJobManager';
			var MODAL_JOB		=	'.modal-window-wrs';
			var MSG_JOBS		=	'WrsThreadJobManagerMessager';
			var ERROR			=	'WrsThreadJobManagerERROR';
			var CANCEL_JOB		=	'WrsThreadJobManagerCancelJOB';	

			var layout_center	=	$('.ui-layout-center');
			$(MODAL_JOB).width(layout_center.outerWidth()-2).height(layout_center.outerHeight()-3);
			/*
			 * Removendo
			 */
			var removeThread	=	 function(report_id)
	    	{
	    		var _data_param		=		that.data(DATA_NAME);
	    		var tmp_param		=		[];
	    		
		    		for(var lineParan in _data_param)
		    			{
			    			if(_data_param[lineParan].report_id!=report_id)
			    			{
			    				tmp_param[tmp_param.length]=	_data_param[lineParan];
			    			}
		    			}
	    		
	    		that.data(DATA_NAME,tmp_param);
	    	}
			
			
			
			
			
			var __add_mutex_job		=	 function(report_id,clean)
			{
				var _data		=	 that.data(CANCEL_JOB);
				var _tmp_data	=	{};
					if(empty(_data))	_data	=	{};
					
					
					if(clean==true)
					{
						for(var lineDataReportID in _data)
							{
									if(lineDataReportID!=report_id)
									{
										_tmp_data[lineDataReportID]	=	_data[lineDataReportID];
									}
									
									_data	=	_tmp_data;
							}
						
					}else{
						_data[report_id]			=	 true;
					}
					
					
					
					that.data(CANCEL_JOB,_data);
			}
			
			
			var _exist_job_in_cancel		=	 function(report_id)
			{
				var _data		=	 that.data(CANCEL_JOB);
				var _exec		=	 false;

					try{
						if(_data[report_id]==true){
							_exec	=	 true;
						}else{
							_exec	=	 false;
						}
					}catch(e){
						_exec	=	 false;
					}
					
					return _exec;
			}
			
			
			
			
			
			
			var __request_consulta_cancelada	=	 function(data)
			{

				//Removendo da opção de insert
				__add_mutex_job(data.report_id,true);
				
				if(data.status>0)
					{
						alertify.success(data.html,0);
						removeThread(data.report_id);
						$(MODAL_JOB).addClass('hide');
					}
					else
					{
						console.log('Error no JOB'+data.report_id,data.html);
						//alertify.error(data.html,0);
					}
			}
			
			
			 
			

			var __click__action_WRSJobModalCancelQuery	=	 function()
			{
				var _report_id	=	$(this).parent().attr('report_id');
				

				
				if(_exist_job_in_cancel(_report_id))
				{
					return true;
				}
				
				//show grid
				$('#'+_report_id+'Main').removeClass('hide');
				
				that.WRSTimerLoader('timeout',{report_id:_report_id});
				
				
				var _file			=	'WRS_PANEL';
    			var _class			=	'WRS_PANEL';
    			var _event			=	'stopjob';
    			var param_request	=	{report_id:_report_id};
     			
    		
    			
    			
    			
    				__add_mutex_job(_report_id);
    				$(MODAL_JOB).addClass('hide');
    			
    				runCall(
    							param_request,
    							_file,
    							_class,
    							_event,
    							__request_consulta_cancelada,
    							'modal','json'
    						);	
				
			}
			
			var __click__action_WRSJobModalCloseWindow	=	 function()
			{
				$(MODAL_JOB).addClass('hide');
			}
			
			
			var __init	=	 function(options)
			{
					var _html	=	'<!--  Modal JOB -->'+
									'		<div class="modal-window-wrs hide" >'+
									'			<div class="modal-box-wrs  modal-type-primary modal-size-normal" style="position: absolute; top: 50%; margin-top: -72px; ">'+
									'				<div class="modal-inner-wrs">'+
									'						<div class="modal-title-wrs-job">'+
									'							<h3><!-- Primary --></h3> '+
									'						</div>'+
									'						<div class="modal-text-wrs-job">'+
									'							<!--A simple primary message! -->'+
									'						</div>'+
									'						<div class="modal-buttons-wrs-job" report_id="">'+
									'							<button class="btn btn-warning modal-btn-padding modal-btn-job-wrs   action_WRSJobModalCancelQuery"><i class="fa fa-hand-paper-o"></i> '+LNG('BTN_CANCEL_CONSULTA')+' <span class="wrs-modal-time">00:00</span></button>'+
									'							<button class="btn btn-default  modal-btn-padding action_WRSJobModalCloseWindow"><i class="fa fa-times"></i> '+LNG('JOB_CLOSE_ALERT')+'</button>'+
									'						</div>'+
									'				</div>'+
									'			</div>'+
									'		</div>'+
									'<!--  END MODAL JOB -->';
					
					//Gatante que não exista outra janela
					$('.container_panel_relatorio').find(MODAL_JOB).each(function(){$(this).remove()});
					
					//Adiciona a estrutura da JANELA
					$('.container_panel_relatorio').append(_html);
					
					
					$('.action_WRSJobModalCancelQuery').unbind('click').click(__click__action_WRSJobModalCancelQuery);
					$('.action_WRSJobModalCloseWindow').unbind('click').click(__click__action_WRSJobModalCloseWindow);
			}
			
			
			var __clean		=	 function()
			{
				var modal		=	 $(MODAL_JOB);
				
					modal.find('.action_WRSJobModalCloseWindow').addClass('hide');
					modal.find('.modal-btn-job-wrs').removeClass('hide');
					modal.find('.modal-text-wrs-job').html(LNG('GERANDO_RELATORIO'));
			}
			
			
			var __resize		=	 function(options)
			{
				$(MODAL_JOB).height(options.height);
				$(MODAL_JOB).width(options.width);
			}
			
			var __get_data		=	 function()
			{
					return $('body').data(DATA_NAME);
			}
			
			/**
			 * Pesquisa o report ID e devolve a estrutura salva 
			 * @return Boolean|Array
			 */
			var getReportId			=	 function(report_id)
			{
					var _data		=	 __get_data();
					
						for(var lineData in _data)
						{
							if(_data[lineData].report_id	==	report_id) return _data[lineData];
						}
						
					return false;
			}
			
			
			
			/**
			 * Verifica se o ID está em execução
			 */
			var __is_active		=	 function(options)
			{
				var _opts			=	{report_id:''};
				var	opts 			= 	$.extend( {}, _opts, options);
				var _report_id		=	opts.report_id;
				var _active_jobs	=	__get_data();
				
					if(empty(_report_id)) return false;
				
				var _report_active	=	getReportId(_report_id);
				
					if(!_report_active) return false;
				
				return _report_active;
				
			}
			
			
			
			
			
			var __demo_trahs	=	 function()
			{
				var _tmp		=	 [];
				
					_tmp.push({report_id:'ABA_23273072694428' , 'mktime': mktime()});
				
					for(var i=0;i<5;i++)
						{
							_tmp.push({report_id:'ABA_'+js_rand(0,99999999999999) , 'mktime': mktime()});
						}
					
					$('body').data(DATA_NAME,_tmp);
					
					console.log(DATA_NAME,$('body').data(DATA_NAME));
			}
			
			
			
			
			
			
			 var __aba		=	 function(options)
			 {
					var _opts			=	{report_id:'',wait:false, title_aba:''};
					var	opts 			= 	$.extend( {}, _opts, options);
					var _report_id		=	opts.report_id;
					var _active_jobs	=	__get_data();
					var _modal			=	$(MODAL_JOB);
					var _error			=	that.data(ERROR);
					var _hide			=	false;
		    		var report_id_modal	=	_modal.find('.modal-buttons-wrs-job').attr('report_id');
		    		
						if(empty(_report_id)) 
						{
							console.error('É necessário passar um ID');
							return false;
						}
						
					var _report_active	=	getReportId(_report_id);
					
					var _title			=	'';
					var objs_msg		=	that.data(MSG_JOBS);
					var msg_job			=	{};
					
					var _is_error		=	'';
					
						
					try{
						_is_error	=	_error[_report_id];
					}catch(e){
						_is_error	=	'';
					}
					
					__time(opts);
					/*
					if(!_report_active && !opts.wait) 
					{
						return false;
					}*/

					_modal.removeClass('hide');
						
						
						//Pegando o Title
						if(opts.wait)
						{
							_title	=	opts.title_aba;
						}
						else
						{
							_title	=	that.wrsAbas('aba_title',opts);
						}
						
						_modal.find('.modal-title-wrs-job h3').html(_title);
						
						if(!empty(objs_msg))
						{
							try{
								msg_job	=	msg_job[opts.report_id]['QUERY_MESSAGE'];
							}catch(e)
							{
								msg_job	=	LNG('GERANDO_RELATORIO');
							}
						}else{
							msg_job	=	LNG('GERANDO_RELATORIO');
						}
						
						
						if(!empty(_is_error))
							{
									msg_job	=	_is_error;
							}
						
						_modal.find('.modal-text-wrs-job').html(msg_job);
						
						//Gravendo o ID para um possível cancelamento
						_modal.find('.modal-buttons-wrs-job').attr('report_id',opts.report_id);
						
						
			 }
			 
			 
			 
			 var __close		=	 function(options)
			 {
				 
				 
				 	var _opts			=	{report_id:'',wait:false, title_aba:''};
					var	opts 			= 	$.extend( {}, _opts, options);
					var _report_id		=	opts.report_id;
					
					var _errorData			=	that.data(ERROR);
		    		var _hide				=	true;
		    		var jobData				=	$('body').data(DATA_NAME);
		    		var aba_ativa		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
		    		
		    			that.WRSTimerLoader('timeout',opts);   
		    		
					var modal			=	$('.modal-window-wrs');
		    		var report_id_modal	=	modal.find('.modal-buttons-wrs-job').attr('report_id');
		    		
		    		
		    		
		    		/*
			    		if(_report_id==report_id_modal)
			    		{
			    			modal.addClass('hide');
			    		}*/
			    		

	    				
	    				for(var lineJOB in jobData)
						{
	    					if(jobData[lineJOB].report_id	==	_report_id)
	    					{
	    						_hide	= false;
	    					}
						}
	    				
	    				
	    				
	    				//$('body').data(DATA_NAME)
	    				var _is_error_data	=	 false;
	    				
	    				for(var lineError in _errorData)
						{
							if(_report_id==lineError)  {
								_hide= false;
								_is_error_data	=	 true;
							}
						}
	    				
	    				
	    				if(_is_error_data){
	    					modal.find('.action_WRSJobModalCancelQuery').addClass('hide');
	    					modal.find('.action_WRSJobModalCloseWindow').removeClass('hide');
	    				}else{
	    					modal.find('.action_WRSJobModalCancelQuery').removeClass('hide');
	    					
	    					modal.find('.action_WRSJobModalCloseWindow').addClass('hide');
	    					
	    					
	    				}
					

	    				if(_hide)
	    				{
	    					if(aba_ativa==_report_id)
	    					{
	    						modal.addClass('hide');
	    					}
	    					
	    				}else{
	    					modal.removeClass('hide');
	    				}
	    				
	    				
			 }
			 
			
			 

			var __click_aba		=	 function(options)
			 {
							
			 	var _opts			=	{report_id:'',wait:false, title_aba:''};
				var	opts 			= 	$.extend( {}, _opts, options);
				var _report_id		=	opts.report_id;
				
				var modal			=	$('.modal-window-wrs');
	    		var report_id_modal	=	modal.find('.modal-buttons-wrs-job').attr('report_id');
	    		
	    		var _errorData			=	that.data(ERROR);
	    		var _hide				=	true;
	    		var jobData				=	$('body').data(DATA_NAME);
	    		
	    			__aba(opts);
	    		
    				for(var lineJOB in jobData)
					{
    					if(jobData[lineJOB].report_id	==	_report_id){
    						_hide	= false;
    					}
					}
    				
    				var _is_error_data	=	 false;
    				
    				for(var lineError in _errorData)
					{
						if(_report_id==lineError)  
						{
							_hide= false;
							_is_error_data	=	true;
						}
					}
    				
    				
    				if(_is_error_data){
    					modal.find('.action_WRSJobModalCancelQuery').addClass('hide');
    					modal.find('.action_WRSJobModalCloseWindow').removeClass('hide');
    				}else{
    					modal.find('.action_WRSJobModalCancelQuery').removeClass('hide');
    					modal.find('.action_WRSJobModalCloseWindow').addClass('hide');
    				}
				
    				
    				if(_hide)
    				{
    					modal.addClass('hide');
    				}else{
    					
    					__time(opts);
    					modal.removeClass('hide');
    				}
    				
		 }
		
	 
		var __error			=	 function(options)
		{
			var _report_id		=	options.report_id;
			var msg				=	options.msg;
			
			var _data			=	that.data(DATA_NAME);
			var _error			=	that.data(ERROR);
			
			
		
			
			if(empty(_data)) 	_data	=	{};
			
			var tmp_data			=	{};
			
			
			if(empty(_error))	_error	=	{};
			
				_error[_report_id]	= msg;
				that.data(ERROR,_error);
	
				
			__close({report_id:_report_id,wait:false});
			
			
			for(var lineData in _data)
				{
						if(_data[lineData].report_id==_report_id)
							{
							
							}else{
									tmp_data[lineData]	=	_data[lineData];
							}
				}
			
			
			
			
			if(options.active)
			{
				var _modal			=	$(MODAL_JOB);
					_modal.find('.modal-text-wrs-job').html(msg);
			}
			
			
			var _title		=	that.wrsAbas('aba_title',{report_id:_report_id});
			
				alertify.error(sprintf(LNG('ERRO_EXECUTE_ABA'),_title)+msg, 0);
				
			that.data(DATA_NAME,tmp_data);
			
		}
		
		
		var __time			=	 function(options)
		{
				that.WRSTimerLoader('init',options);
			//$('.wrs-modal-time')
		}
		
			var methods = 
			{
			        init 			: 	__init,	//Criando o HTML e Start da estrutura
			        is_active		:	__is_active,	//Verificando se a aba está ativa
			        demo			:	__demo_trahs,	//Demonstração
			        aba				:	__aba,
			        close			:	__close,
			        click_aba		:	__click_aba,
			        resize			:	__resize,
			        error			:	__error,
			        clean			:	__clean
			      //  time			:	__time
			};
		
		 
			/*
			 * 
			 * Inicia a construção dos metodos
			 * 
			 */
			if ( methods[methodOrOptions] )
			{
		            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    }
			else if ( typeof methodOrOptions === 'object' || ! methodOrOptions )
			{
		            // Default to "init"
		            return methods.init.apply( this, arguments );
		    }
		    else
		    {
		            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
		    }   
			
			
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    $.fn.ThreadJobManager = function(report_id) 
    {
    	var that			=	this;
    	var DATA_NAME		=	'WrsThreadJobManager';
    	var WHO_CALL		=	'body'; // o evento principal é sempre em cima da body
    	var time			=	0;
    	
    	
    	
    	//Valor da Thread Principal
    	var THREAD_MAIN		=	'WrsThreadJobManagerTHREAD';

    	var MSG_JOBS		=	'WrsThreadJobManagerMessager';
    	//Gerenciamento para saber se a thread está inativa
    	//Valor da threade
    	//se ela estive inativa então força a reativar
    	var THREAD_TIMEOUT	=	'WrsThreadJobManagerTHREADTimeOut';
    	
    	var ERROR			=	'WrsThreadJobManagerERROR';
    	
    	//TRACE_DEBUG('receive::'+report_id);
    	var data_param		=	that.data(DATA_NAME);
    	
    		that.WRSJobModal('clean');
    	
    	
    		if(empty(report_id))
    		{
    			console.error('Não foi declarado um report_id',0);
    			return true;
    		}
    	

    		if(empty(data_param) || data_param==null || data_param==undefined)	{
    			data_param	=	[];
    		}
    		
    		
    		var _exist		=	 false;
    		for(var lineDataParan in data_param)
    			{
    					if(data_param[lineDataParan].report_id==report_id) 
    					{
    						_exist	=	 true;
    						//tmp_data_param.push(data_param[lineDataParan]);
    					}
    			}
    		

    		if(!_exist){
    			//o push nesse pronto da erro
    			data_param[data_param.length]	=	{'report_id' : report_id , 'mktime': mktime()};
        		//Armazenando na estrutura para poder processar
        		that.data(DATA_NAME,data_param);
    		}
    		

    		
    		//console.log('data_param',data_param);


    		
    	var removeThread	=	 function(report_id)
    	{
    		var _data_param		=		that.data(DATA_NAME);
    		var tmp_param		=		[];
    		

    		for(var lineParan in _data_param)
    			{
	    			if(_data_param[lineParan].report_id!=report_id){
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

    		that.data(MSG_JOBS,data);
    		
        	var data_param		=	that.data(DATA_NAME);
        	

    		var modal			=	$('.modal-window-wrs');
    		var report_id_modal	=	modal.find('.modal-buttons-wrs-job').attr('report_id');
    		var _errorData		=	$('body').data(ERROR);
    		
    		if(empty(_errorData))	_errorData	=	{};
    		

    		for(var lineData in data)
    			{
    					
    					var _data_json	=	typeof(data[lineData]) == 'string' ? $.parseJSON(data[lineData]) : data[lineData];
    					
    						
    					if(report_id_modal==lineData)
    						{
    							
    							try{
    								
	    							var msg_job		=	_data_json['data']['QUERY_MESSAGE'];
	    								modal.find('.modal-text-wrs-job').html(msg_job);
    							}catch(e){
    								
    							}
    						}
    			
    					try{
    							if(_data_json['error'])
    								{
    									var _title		=	that.wrsAbas('aba_title',{report_id:_data_json['REPORT_ID']});
    									
    									alertify.error(sprintf(LNG('ERRO_EXECUTE_ABA'),_title)+_data_json['error'], 0);
    									
    									removeThread(_data_json['REPORT_ID']);
    									
    									_errorData[_data_json['REPORT_ID']]	= _data_json['error'];	 //Atualiza mensagens de erros
    									
    									that.WRSTimerLoader('stop',{report_id:_data_json['REPORT_ID']});
    									
    								}
    					}catch(e){}
    					
    					
    					try{
							if(_data_json['html'])
								{
									alertify.success(sprintf(LNG('JOB_COMPLETE_LOAD'),that.wrsAbas('aba_title',{report_id:_data_json['REPORT_ID']})));
									
									removeThread(_data_json['REPORT_ID']);
									
									MOUNT_LAYOUT_GRID_HEADER(_data_json['warning']+_data_json['html'],'ThreadMainLoadData');
									
									_errorData	=	removeKey(_errorData,_data_json['REPORT_ID']);
									
									that.WRSTimerLoader('stop',{report_id:_data_json['REPORT_ID']});
								}
					}catch(e){}
    			}
    		
    		
    		//Atualiza mensagem de erros
    		$('body').data(ERROR,_errorData);
    		
    		//END FOR
    		
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
    				that.data(MSG_JOBS,'');
    				alertify.success(LNG('JOB_COMPLETE'));

    				//$('body').data('WRSTimeLoader','');
    				
    				that.WRSTimerLoader('timeout',{report_id:report_id_modal});    				
    				$('body').WRSJobModal('close',{'report_id':report_id_modal});
    				 
    				
    			}
    			
    			
    	}
    	
    	var get_report_ids		=	 function(input)
    	{
    		var _reports		=	[];
    		
    		for(var lineInput in input)
    			{
    				_reports.push(input[lineInput].report_id);
    			}
    		
    		return _reports;
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

     				param_request	=	base64_encode(json_encode(get_report_ids(_data_param)));

     				
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

 

