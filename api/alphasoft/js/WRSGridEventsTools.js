

/*
 * TODO: Tem que sincronizar esta função com o resizeGridSimple()open
 */
(function ( $ ) {
	
	
	
	$.fn.NavConfigure = function()
	{
		var navConfigure=	this;
	}
	
	
    $.fn.WRSWindowGridEventTools = function(loadByAba){
    	
    	
    	var eventTelerik	=	this;
		var idName			=	eventTelerik.attr('id');
		var GRID			=	$('#'+idName);
		var telerikGrid 	= 	GRID.data('kendoGrid');		
		var NAV				=	$('#'+idName+'NAV');
		var ELEMENT			=	$('#'+idName+'Elements');
		var BOX				=	$('.'+idName+'BOX');
		var MAP				=	$('#'+idName+'Elements .map');
		var CHART			=	$('#'+idName+'Elements .chart');
		
		
		$('.container_panel_relatorio_rows').height($('.container_panel_relatorio').height());
		
		var _height			=	BOX.parent().parent().outerHeight();
		var navHeight		=	NAV.height();
		
		
		
		//Criando a DIV do MAPA o da CHART
		var check_div_map_chart	=	 function(type)
		{
			var flag_c_m	=	false;
			var type_div	=	'';
			var _explode	=	'';
				_explode	=	explode('_',type);
			var toUse		=	{chart:false,map:false};
			
			
			//Garantindo a posição do mapa e do gráfico no mesmo elemento
			if(type=='chart_map' || type=='map_chart')
			{
				var chart = $('#'+idName+'Elements .chart').data("kendoChart");
		        	
					if(!empty(chart)){
						chart.destroy();
					}
		        	
		        	$('#'+idName+'Elements .map').removeData();//Removendo o Mapa
		        	
		        	
		        	//GRID.removeAttr('style-data').removeAttr('style');
		        	ELEMENT.removeAttr('style-data').removeAttr('style');
		        	
			}
			
			
			switch(type)
			{
				case "grid_chart"	: 
				case "grid_map"		: 
				case "chart_grid"	:
				case "chart_map"	:
				case "map_grid"		:
				case "map_chart"	:{ 
					
					ELEMENT.attr('chart','false');
		        	ELEMENT.attr('maps_wrs','false');
		        	ELEMENT.attr('maps','false');
		        	ELEMENT.html('');
		        	
				};				break;
			}
			
			
			
			for(_ie in _explode)
			{
				flag_c_m	=	false;
				type_div	=	_explode[_ie];
				
				
				switch(type_div)
				{
					case 'chart': toUse.chart=flag_c_m=true; break;
					case 'map'	: toUse.map=flag_c_m=true; break;
				}
				
				if(flag_c_m)
					{
						if(ELEMENT.find('.'+type_div).length==0)
						{
							ELEMENT.append($('<div/>').hide().addClass(type_div).addClass('block'));
						}else{							
							ELEMENT.find('.'+type_div).show();
						}
						
						flag_c_m	=	 false;
					}
			}
			
			for(toU in toUse)
				{
						if(!toUse[toU])
						{
							ELEMENT.find('.'+toU).hide();
						}
				}
		}
		
		
		
		var WRSWindowGridEventToolsClick	=	function(e,data)
		{
			var wrs_data		=	"";
			var height			=	BOX.parent().parent().outerHeight();
			var BOX_PARENT		=	BOX.parent().parent();
			var active_half		=	false;
			var paddingCenter	=	((parseInt(BOX_PARENT.parent().css('padding-bottom').replace('px')))*3)-2;
			var _heightToUse	=	'';
			
			var kendoUiTools	=	getElementsWrsKendoUi(GRID);
			
			MAP.hide();
			CHART.hide();
			GRID.hide();
			
				NAV.find('.info_chart').hide();
			
				_height		=	height;
				_height		=	_height-navHeight;
				
				

				
			var half		=	(_height-paddingCenter)/2;
				_heightToUse=	half*2;
				
				if(empty(data)){
					wrs_data	=	$(this).attr('wrs-data');
				}else{
					wrs_data	=	data;
				}
				

				var isHistory	=	Boolean($(this).parent().parent().attr('isHistory'));	
				
				if(isHistory===TRUE){
				//Save Historico

				var saveHistory	=	[];
		  			saveHistory['WINDOW']	=	wrs_data;
		  			saveHistoryEvents(saveHistory,kendoUiTools['REPORT_ID']);
				}
				
		  		$(this).parent().parent().attr('isHistory',TRUE);
				
				//Default
				switch(wrs_data){case "grid"			:  case "chart"		: case "map"			: {GRID.removeAttr('style');ELEMENT.removeAttr('style');GRID.removeAttr('style-data');ELEMENT.removeAttr('style-data');};break;}
				
				ELEMENT.height((height-paddingCenter));
				GRID.height(height-paddingCenter);
				ELEMENT.show().removeClass('hide');
//				GRID.show();
				
				var changeOrder		=	 function(flag){
					
					
//Voltando para o formato com a grid para cima
					
					//Default

					
					var heightGrid		=	GRID.height();
					var heightElement	=	ELEMENT.height();
						
					if(empty(GRID.attr('style-data')))
					{
						GRID.attr('style-data',GRID.attr('style'));
					}else{
						GRID.attr('style',GRID.attr('style-data'));
						GRID.height(heightGrid);
					}
					
					if(empty(ELEMENT.attr('style-data'))){
						ELEMENT.attr('style-data',ELEMENT.attr('style'));
					}else{
						ELEMENT.attr('style',ELEMENT.attr('style-data'));
						ELEMENT.height(heightElement);
					}
					
					
					if(empty(flag))
					{
						var offsetGrid 		= GRID.offset();
						var offsetElement 	= ELEMENT.offset();
						
							GRID.offset({ top: offsetElement.top});
							ELEMENT.offset({ top: offsetGrid.top});
					}
				};
				
				//Save alteration in MAP
				wrsKendoUiChange('#'+idName,'WINDOW',wrs_data);
				
				
				
				//CRiando a DIV do MAPA ou CHART
				check_div_map_chart(wrs_data);
				
				//END criando div CHART ou MAPA
				
				switch(wrs_data)
				{
					case "grid_chart"	: GRID.show();break;
					case "chart_grid"	: GRID.show();break;
					case "map_grid"		: GRID.show();break;
					case "grid_map"		: GRID.show();break;
					case "grid"			: GRID.show();break;
				}
				
				
				switch(wrs_data)
				{
					case "grid"			: {GRID.show();ELEMENT.hide();};break;
					case "chart"		: GRID.hide();					break;
					case "map"			: GRID.hide();					break;
					case "grid_chart"	: active_half=true;				break;
					case "grid_map"		: active_half=true;				break;
					case "chart_grid"	:{ active_half=true;};				break;
					case "chart_map"	:{ active_half=true;};				break;
					case "map_grid"		:{ active_half=true;};				break;
					case "map_chart"	:{ active_half=true; };				break;
				}
				
				
				//Tamando para que possamos saber qual o tamano dos gráficos multiplos
				ELEMENT.attr('chart-multiple-height',half);
				
				if(active_half)
				{
				//	GRID.show();
			//		ELEMENT.show();
					ELEMENT.height(half);
					GRID.height(half);
					
					//ELEMENT.attr('height-chart',half);
					
				}else{
					ELEMENT.height(_heightToUse);
					ELEMENT.attr('height-chart',_heightToUse);
					GRID.height(_heightToUse);
				}				

				

				//Invertendo a orderm
				if(	wrs_data=='chart_grid' ||
					wrs_data=='map_grid'	||
					wrs_data=='map_chart')
				{
					changeOrder(); 
				}
				
				if(	wrs_data=='grid_chart' ||
						wrs_data=='grid_map')	
					{
						changeOrder(true); 
					}
				
				switch(wrs_data)
				{
					case "grid_chart"	: {WRSKendoUiChart(telerikGrid);}							break;
					case "chart_grid"	: {WRSKendoUiChart(telerikGrid);};							break;
					case "chart_map"	: { WRSKendoUiChart(telerikGrid);WRSMaps(telerikGrid);};	break;
					case "map_grid"		: {WRSMaps(telerikGrid); WRSKendoUiChart(telerikGrid);};	break;
					case "map_chart"	: {WRSMaps(telerikGrid);	WRSKendoUiChart(telerikGrid);};	break;
					case "grid_map"		: {WRSMaps(telerikGrid); };									break;
					case "chart"		: {WRSKendoUiChart(telerikGrid);};												break;
					case "map"			: {WRSMaps(telerikGrid); goMapsResize(); };														break;
				}
				
				
				

				telerikGrid.resize();
				
		};

		NAV.find('.wrs_tools_options_window a').unbind('click').click(WRSWindowGridEventToolsClick);
		
		//Para o botão visão
		var function_btn_open_type_vision		=	 function()
	  	{
			var wrsKendoUi			=	$.parseJSON(base64_decode(GRID.attr('wrsKendoUi')));
			
	  		$(this).parent().find('li a').each(function(){
	  				$(this).removeClass('active_tools');
	  				if(wrsKendoUi.WINDOW	==	$(this).attr('wrs-data')){
	  					$(this).addClass('active_tools');
	  					
	  				}
	  		});
	  	}

		
		
		NAV.find('.btn-open-type-vision').unbind('click').click(function_btn_open_type_vision);
		
		//Load event ptincipal
		
//		TRACE_DEBUG('empty');

		//WRSWindowGridEventToolsClick('','grid_map');
		if(!empty(loadByAba))
			{
					switch(loadByAba)
					{
						case "chart"		: 
						case "grid_chart"	: 
						case "chart_grid"	:
						case "chart_map"	:
						case "map_chart"	: WRSKendoUiChart(telerikGrid,null,true);				break;
					}
					
					//only maps
					switch(loadByAba)
					{
						case "map"			: 
						case "grid_map"		:
						case "map_grid"		:
						case "map_chart"	:
						case "chart_map"	: WRSMaps(telerikGrid);goMapsResize();				break;
					}
					
				 
				
			}
    };
 
}( jQuery ));







function saveHistoryEvents(kendoParam,report_id)
{
	if(empty(report_id)) return false;
	
	var param 	=	{};
	
	
		for(lineParan in kendoParam)
			{
			
				param[lineParan]=	kendoParam[lineParan];
			}
	
		
		
		param			=	 base64_encode(json_encode(param));
	var param_request	=	{'report_id':report_id,'history_options':param,'cube_s':CUBE_S};
		runCall(param_request, 'WRS_PANEL', 'WRS_PANEL', 'save_history', null, 'modal');
}




/*
 * Opções DEFAULD 
 */


/*
 * Ajustas as pendencias do checkbox exemplo o dril_linha depende do linha de totais 
 * 
 */
function rules_pendences_checkbox(element,fullEvent)
{
	var dependence	=	element.attr('dependence');
	var checked		=	element.prop('checked');
	var _input		=	'';
	
	if(!empty(dependence)) {

		_input	=	fullEvent.find('input[name='+dependence+']');
		if(checked){
			//_input.prop('disabled',false);
			_input.parent().parent().show();
		}else{
			_input.prop('checked',false);
			//_input.prop('disabled',true);
			_input.parent().parent().hide();

		}
	}
	
}

//Variável default é preenchida pelo lib.WRS_PANEL
var getRequestKendoUiDefault	=	{};
/*
* Configuração de Gráfico e Visão para o DRAG AND DROP
*/




(function( $ ) {
	 /*
	  * Para encontrar o da base procure por 
	  * OPTIONS_CONFIGURE na WRS KendoUi JS
	  */
  $.fn.wrsConfigGridDefault = function(options) 
  {
	
	  var 	data_name				=	'wrsConfigGridDefault',//WARNING:Cuidado ao alterar essa variável pois ela reflete em outros lugares melhores pesquisaqr antes de modificar - WRSKendoUiCHart -wrs_panel
			element					=	this,
			data					=	element.data(data_name);
	  
	  	var opts 					= 	$.extend( {}, getRequestKendoUiDefault, empty(options) ? {} : options),
	  		nav_options				=	element.find('.wrs_grid_options'),
	  		list_wrs_vision			=	element.find('.list-wrs-type-vision'),
	  		btn_options				=	element.find('.btn-options-grid'),
	  		btn_configute_chart		=	element.find('.btn-configute-chart'),
	  		btn_open_type_vision	=	element.find('.btn-open-type-vision'),
			isClick					=	false;
			nav_options.attr('id','wrs_grid_options_default');	
		
		
//		console.log('wrsConfigGridDefault::opts',opts);
		

		
  		//WARNING:  O nome do ID nao pode ser removido pois existe outros lugares com pendencia no nome - wrs_panel
		element.attr('id',data_name);
  	
  		if(empty(options) && !empty(data)) opts	=	data;
  		
  		element.data(data_name,opts);
  		
  	
  	var detect_event	=	 function(type)
  	{
  			if(type=='clean') {
  				
  				if(element.attr('is-event')==_TRUE)
  						{
  					element.removeAttr('is-event');
  				}
  			}else
  				element.attr('is-event',true);
  	}
  	
  	//Limpando evento
  	detect_event('clean');
  	/*
  	 * Configurando o tipo de visualização da telas
  	 */
  	//
  	var function_btn_open_type_vision		=	 function()
  	{
  		check_exist_grid();
  		list_wrs_vision.find('li a').each(function(){
  				var _wrs_data		=	 $(this).attr('wrs-data');
  				$(this).removeClass('active_tools');
  				if(opts.WINDOW	==	_wrs_data){
  					$(this).addClass('active_tools');
  				}
  		});
  	}
  	
  	var function_click_list_wrs_vision			=	 function(){
  			var _wrs_data		=	$(this).attr('wrs-data');
  				opts.WINDOW		=	_wrs_data;
  				element.data(data_name,opts);
  				detect_event();//Abilita Evento
  				list_wrs_vision.find('li a').removeClass('active_tools');
  				$(this).addClass('active_tools');
  				

  				//Salvando no histórico	
  		 		var saveHistory			=	[];
		  			saveHistory['WINDOW']	=	_wrs_data;
		  			saveHistoryEvents(saveHistory,opts['REPORT_ID']);
	  			
					
  				return false;
  	}
  	
  	/*
  	 * Atualiza de acordo com as informações contidas na original
  	 * Função pesquisa no html por GRid complementar para que possa usar 
  	 */
  	var check_exist_grid	=	 function()
  	{  	

  		if(isClick) return true;

  		var searchGrid		=	$(document).find('.wrsGrid');
		var hasDefault		=	 $('.wrs_panel_filter_measure').is(':hidden');
		

		/*
		 * TODO: Validar
		 */
	  		if(!empty(searchGrid.html()) && hasDefault==true)
	  		{
	  			opts	=	getJsonDecodeBase64(searchGrid.attr('wrskendoui'));  			
	  			element.data(data_name,opts);

	  		}  		
			  		
  	}
  	
  	
  	//Click do Botão - nav_options
  	var event_click_btn_options	=	 function(){
  		check_exist_grid(); 

  		nav_options.find('input').each(function(){
  				if(opts[$(this).attr('name')]){
  					$(this).prop('checked',true);
  				}else{
  					$(this).prop('checked',false);
  				}  				
  				rules_pendences_checkbox($(this),$(this).parents('ul'));
  		});
  	}
  	
  	
  	//Evento de click nos INPUT do Options
  	var event_find_nav_options_input	=	 function()
  	{
  		var _checked					=	$(this).prop('checked');
  		
  			opts						=	element.data(data_name);
  		
	  		opts[$(this).attr('name')]	= 	_checked ? 1 : '';
	  		detect_event();//Abilita Evento
	  		element.data(data_name,opts);  
	  		isClick		=	true;

	  		//Salvando no histórico
	  		var saveHistory	=	[];
	  			saveHistory[$(this).attr('name')]	=	opts[$(this).attr('name')];
	  			saveHistoryEvents(saveHistory,opts['REPORT_ID']);
	  		
	  			rules_pendences_checkbox($(this),$(this).parents('ul'));
  	}
  	
  	//Abrindo o Modal de opções do CHART
  	var event_btn_configute_chart	=	 function(){
  		


  			var get_measures_title	=	 [];

  			
  			$('.WRS_MEASURE_DRAG').find('li').each(function(){
  				var _json		=	 $(this).attr('json');
  				var _json_data	=	getJsonDecodeBase64(_json);
  				//console.log($(this).attr('vvalue'),getJsonDecodeBase64(_json));  				
  				get_measures_title[_json_data.MEASURE_UNIQUE_NAME]	=	_json_data.MEASURE_NAME;

  			});
  			
  			
  			/*
  			 * Comando para já permitir informações selecionada no chart
  			opts.CHART	=	{data:{
					'[Measures].[Share Dolar]':{ type : 'column',value : 'column',title : 'Nornal',stack : false}
				},
				legend :{},labels:{}};
  			
  			
  			opts.CHART	=	 base64_encode(json_encode(opts.CHART,true));
  			*/
  			
  			element.data(data_name,opts);
  			
  			var KendoUi	=	{
  					'element'		:	nav_options,
  				//Apenas para não ocorrer erro no  WRSKendoUiChart
  					headerIndex	:	{
  										chart: {
  													data:{}, 
  													measure_title:get_measures_title
  												}
  					}
  			};
  			
  			//save options
  			detect_event();//Abilita Evento
  			nav_options.attr('wrsKendoUi',base64_encode(json_encode(opts,true)));
  			

  			nav_options.data('kendoGrid',KendoUi);	
  			
  		/*
  		 * Usando a estrutura atual para manipular a tela de customização do chart
  		 * É necessário converter a tela atual para a estrutura do kendo ui somente dessa forma é possível utilizar sem problemas toda a estrutura
  		 */
  		
  		nav_options.removeAttr('chart-wrs');//Permite que seja recriado sempre a estrutura nova das escolhas dos charts
  			
  		WRSKendoUiChart(KendoUi,true);
  		
  		
 // 		TRACE_DEBUG(nav_options.html());
  		
  		$($(this).attr('data-target')).modal('show');  		
  	}
  	
  	//EVENTS
  	//Click para iniciar a configuração das Visões
  	btn_open_type_vision.unbind('click').click(function_btn_open_type_vision);  
  	
  	//Executa a mudança de visão
  	list_wrs_vision.find('li a').unbind('click').click(function_click_list_wrs_vision);
  	
  	//Click do Botão OPTIONS

  	btn_options.unbind('click').click(event_click_btn_options);
  	
  	nav_options.find('li').each(function(){
  			$(this).find('input').unbind('click').click(event_find_nav_options_input);
  			$(this).unbind('click').click(function (e) {e.stopPropagation();});
  	});
  	
  	
  	
  	btn_configute_chart.each(function(){
  		$(this).unbind('click').click(event_btn_configute_chart);
  	});
  	

  	element.attr('isDefault',true).wrsTopOptions();
  		
      return element;

  };

}( jQuery ));
//END

 

