
/**
 * 
 * Compexo de criação e eventos de abas
 * 
 * Exemplos
 * @link http://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods
 * @link http://layout.jquery-dev.com/demos/simple.html
 */
 





(function ( $ ) {
	 /**
     * Estrutura do Filtro Fixo
     */
	$.fn.WrsGlobal	= function(methodOrOptions) 
    {
    	var dataWrsGlobal		=	'WrsGlobal';
		
    	
		var GetData		=	function()
		{
				var data_body		=	$('body').data(dataWrsGlobal);
				
					data_body		=	data_body==undefined || data_body==null || data_body=='' ? {} : data_body;
					
				var defaultData		=	{
											php					:	{},//Variáveis do PHP
											js					:	{
																	//drill : {'parent':event, 'type':'linha'}
												
											}//Variáveis do JS
											
										}
				
				return $.extend({}, defaultData,data_body);
		}
	
	
		
		
		//Carrega com as informações iniciais para o filtro fixo
    	var __init		=	 function(_jsonFilterFixed,type)
    	{
    		var jsonFilterFixed		=	 _jsonFilterFixed;
    		_ONLY('filterFixed::__init');
    		//variávelk global antiga userinfo_filter_fixed
    		
    		if(typeof jsonFilterFixed == 'object')
    		{
	    		
    			var get_data		=	GetData();
	    			get_data[type]	=	jsonFilterFixed;
	    			 
	    			
	    			$('body').data(dataWrsGlobal,get_data);
    		}
    	}
    	
    	
    	var __setJS		=	 function(_data)
    	{
    		var get_data				=	GetData();
    		
				get_data.js[_data.type]	=	_data.data;
				
			$('body').data(dataWrsGlobal,get_data);
    	}
    	
    	
    	var __setPHP		=	 function(_data)
    	{
    		var get_data		=	GetData();
				get_data.php[_data.type]	=	_data.data;
				
			$('body').data(dataWrsGlobal,get_data);
    	}
    	
    	
    	var __getJS		=	 function(val)
    	{
    		var get_data		=	GetData();
    		
    			try{
    				return get_data.js[val];
    			}catch(e)
    			{
    				return null;
    			}
    		
    			return null;
    	}
    	
    	
    	var __getPHP		=	 function(val)
    	{
    		var get_data		=	GetData();
    		
    			try{
    				return get_data.php[val];
    			}catch(e)
    			{
    				return null;
    			}
    		
    			return null;
    	}
    	
    	
    	
    	
    	var __getData		=	 function()
    	{
    		return GetData();
    	}
    	
		
    	/*
		 * Metodos de funções
		 * formas de chamadas externas
		 */
		var methods = 
		{
		        init 			: 	__init,
		        setJS			:	__setJS,
		        setPHP			:	__setPHP,
		        getJS			:	__getJS,
		        getPHP			:	__getPHP,
		        getData			:	__getData
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
	            $.error( 'Method ' +  methodOrOptions + ' does not exist on Global.Global' );
	    }
		
		
    };	
}( jQuery ));


 
