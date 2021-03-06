
var HEIGHT_ABAS		=	50;

/*
 * TODO: Tem que sincronizar esta função com o resizeGridSimple()open
 */
(function ( $ ) {
	
	
	
	$.fn.NavConfigure = function()
	{
		_ONLY('NavConfigure');
		var navConfigure=	this;
	}
	
	
    $.fn.WRSWindowGridEventTools = function(loadByAba,_click_auto)
    {
		_START('WRSWindowGridEventTools');''
		
    	var eventTelerik	=	this;
    	var click_auto		=	_click_auto==undefined || _click_auto==null ? false : _click_auto;
		var idName			=	eventTelerik.attr('id');
		var GRID			=	$('#'+idName);
		var report_aba		=	'.'+idName;	
		var telerikGrid 	= 	GRID.data('kendoGrid');		
		var NAV				=	$('#'+idName+'NAV');
		var ELEMENT			=	$('#'+idName+'Elements');
		var BOX				=	$('.'+idName+'BOX');
		var MAP				=	$('#'+idName+'Elements .map');
		var CHART			=	$('#'+idName+'Elements .chart');

		$('.container_panel_relatorio_rows').outerHeight($('.ui-layout-center').innerHeight()-HEIGHT_ABAS);
		
		var _height			=	BOX.parent().parent().outerHeight();
		var navHeight		=	NAV.height();
		
		var firstValue		=	$('body').data('navHeight');
		
			if(firstValue==null)
				{
					$('body').data('navHeight',navHeight);
				}
				else
				{
					navHeight	=	firstValue;
				}
			
			
		
		//Criando a DIV do MAPA o da CHART
		var check_div_map_chart	=	 function(type)
		{
			_START('WRSWindowGridEventTools::check_div_map_chart');
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
							ELEMENT.append($('<div/>').hide().addClass(type_div+' elements').addClass('block').attr('id',idName+type_div));
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
			_END('WRSWindowGridEventTools::check_div_map_chart');
		}
		
		
		/*
		 * Criando os eventos da janelas e renderizando as Telas Gráfico e MAPA
		 */
		var WRSWindowGridEventToolsClick	=	function(e,data)
		{

			_START('WRSWindowGridEventTools::WRSWindowGridEventToolsClick');
			var wrs_data		=	"";
			var kendoUiTools	=	getElementsWrsKendoUi(GRID);
			var height			=	$('.ui-layout-center').innerHeight()-HEIGHT_ABAS;

			
			if(empty(data))
			{
				wrs_data	=	$(this).attr('wrs-data');
			}
			else
			{
				wrs_data	=	data;
			}
			

				var isHistory	=	Boolean($(this).parent().parent().attr('isHistory'));	
				
				if(isHistory===TRUE)
				{
					//Save Historico
					var saveHistory	=	[];
			  			saveHistory['WINDOW']	=	wrs_data;
			  			saveHistoryEvents(saveHistory,kendoUiTools['REPORT_ID']);
				}
				
				//Removendo e inserindo o novo active
  				$(this).parent().parent().find('.active_tools').removeClass('active_tools');
  				$(this).addClass('active_tools');
  				
  				
  				
		  		$(this).parent().parent().attr('isHistory',TRUE);
				
				//Default
				ELEMENT.show().removeClass('hide');

				//Save alteration in MAP
				wrsKendoUiChange('#'+idName,'WINDOW',wrs_data);

				//CRiando a DIV do MAPA ou CHART
				check_div_map_chart(wrs_data);
				
				//END criando div CHART ou MAPA
				//Tamando para que possamos saber qual o tamano dos gráficos multiplos
				ELEMENT.attr('chart-multiple-height',height/2);
				
				/*
				 * Criando Gráfico e Mapa
				 */
				
				
				try{
					
					if(kendoUiTools['EXPORT']==true)
						{
								
							
							_END('WRSWindowGridEventTools::WRSWindowGridEventToolsClick');
							return false;
						}
				}catch(e){
					if(IS_EXCEPTION) console.warn(' exception');
				}

				switch(wrs_data)
				{
					//case "grid"			: {GRID.show();ELEMENT.hide();}							;	break;
					case "chart"		: WRSKendoUiChart(telerikGrid)								;	break;
					case "map"			: WRSMaps(telerikGrid); 									;	break;
					case "grid_chart"	: WRSKendoUiChart(telerikGrid)								;	break;
					case "grid_map"		: WRSMaps(telerikGrid)										;	break;
					case "chart_grid"	: WRSKendoUiChart(telerikGrid)								;	break;
					case "chart_map"	: {WRSKendoUiChart(telerikGrid);WRSMaps(telerikGrid);}		;	break;
					case "map_grid"		: {WRSMaps(telerikGrid); WRSKendoUiChart(telerikGrid);}		;	break;
					case "map_chart"	: {WRSMaps(telerikGrid);	WRSKendoUiChart(telerikGrid);}	;	break;
				}
				

				resize_container_grid(idName,wrs_data);
				
				
				delete kendoUiTools;
			_END('WRSWindowGridEventTools::WRSWindowGridEventToolsClick');
		};

		//Para reforçar e renovar os elementos quando for solicitado a troca de página 
		if(click_auto==true && (loadByAba!=null && loadByAba!=undefined))
		{
			NAV.find('.wrs_tools_options_window a[wrs-data='+loadByAba+']').trigger('click');
		}
			
			NAV.find('.wrs_tools_options_window a').unbind('click').click(WRSWindowGridEventToolsClick);
	
		
		//Para o botão visão
		var function_btn_open_type_vision		=	 function()
	  	{
			
			_START('WRSWindowGridEventTools::function_btn_open_type_vision');
			
			var wrsKendoUi			=	get_aba_active_kendoUi();
			
			
			
			if(isEmpty(wrsKendoUi.WINDOW)){
				wrsKendoUi.WINDOW	=	 'grid';
			}
			
			
	  		$(this).parent().find('li a').each(function(){
	  				$(this).removeClass('active_tools');
	  				if(wrsKendoUi.WINDOW	==	$(this).attr('wrs-data')){
	  					$(this).addClass('active_tools');
	  				}
	  		});
			
			delete wrsKendoUi;
			_END('WRSWindowGridEventTools::function_btn_open_type_vision');
	  	}

		
		
		$('.btn-open-type-vision').unbind('click').click(function_btn_open_type_vision);
		
		//NAV.find('.btn-open-type-vision').unbind('click').click(function_btn_open_type_vision);
		
	delete eventTelerik;
	delete GRID;
	delete NAV;
	delete ELEMENT;
	delete BOX;
	delete MAP;
	delete CHART;
		_END('WRSWindowGridEventTools');
		
		
    };
 
}( jQuery ));


function generate_hight_models(report_id)
{
	
	var half		=	 false;
	var ELEMENT		=	$('#'+report_id+'Elements');
	var kendoUi		=	$('.'+report_id).wrsAbaData('getKendoUi');
	var height		=	0;
	
		switch(kendoUi.WINDOW)
		{
			case "grid_chart"	:   
			case "grid_map"		: 	
			case "chart_grid"	: 	
			case "chart_map"	: 	
			case "map_grid"		: 	
			case "map_chart"	: 	half=true				;	break;
		}
	
	
	
	var layout_center_object	=		$('.ui-layout-center');
	
	var layout_center			=	{
										padding_left	:	parseInt(layout_center_object.css('padding-left').replace("px", "")),
										padding_right	:	parseInt(layout_center_object.css('padding-right').replace("px", "")),
										context			:	layout_center_object,
										height			:	layout_center_object.innerHeight()-HEIGHT_ABAS,
										width			:	layout_center_object.outerWidth()
									};
	
	//Ajustando as bordas
	layout_center.width		-=	(layout_center.padding_left+5);
	layout_center.height	-= (layout_center.padding_left+layout_center.padding_right);
	
	//Ajuste do tamanho do center layout removento o padding	
	layout_center.width		=	layout_center.width-(layout_center.padding_left);
	

	if(half){
		height= layout_center.height/2;
	}else{
		height	= layout_center.height;
	}
	
	
	
	ELEMENT.height(height);

	
		delete kendoUi;
		delete ELEMENT;
		delete layout_center;

		$('#'+report_id).height(height);
	
	
	
	
}

/*
 * Nova versão de resize
 * TODO: Depreciar a função WRSWindowGridEventToolsClick
 * @link http://www.mandalatv.net/2013/08/redrawing-google-maps-with-a-tabs-interface/
 * 
 */
function resize_container_grid(report_id,_type_grid)
{
	_START('resize_container_grid');
	var type_grid		=		_type_grid;
	var kendoUi			=		$('.'+report_id).wrsAbaData('getKendoUi');
	
	
	
	try{
		if(kendoUi['EXPORT']==true)
			{
				_END('resize_container_grid');
				return false;
			}
	}catch(e){
		if(IS_EXCEPTION) console.warn(' exception');
	}
	
	
	/* START */

	var layout_center_object	=		$('.ui-layout-center');
	
	var layout_center			=	{
										padding_left	:	parseInt(layout_center_object.css('padding-left').replace("px", "")),
										padding_right	:	parseInt(layout_center_object.css('padding-right').replace("px", "")),
										context			:	layout_center_object,
										height			:	layout_center_object.innerHeight()-HEIGHT_ABAS,
										width			:	layout_center_object.outerWidth()
									};
	
	//Ajustando as bordas
	layout_center.width		-=	(layout_center.padding_left+5);
	layout_center.height	-= (layout_center.padding_left+layout_center.padding_right);
	
	//Ajuste do tamanho do center layout removento o padding	
	layout_center.width		=	layout_center.width-(layout_center.padding_left);
	
	
	var html_class		=	
								{
									k_grid_page					:	'.k-grid-pager',
									wrs_tools_options_window	:	'.wrs_tools_options_window .active_tools',
									info_chart					:	'.info_chart',
									grid_button_header_menu		:	'.grid_button_header_menu',
									k_pager_info				:	'.k-pager-info',
									k_pager_sizes				:	'.k-pager-sizes',
									k_dropdown_wrap				:	'.k-dropdown-wrap',
									k_animation_container		:	'.k-animation-container',
									k_grid_pager_a				:	'.k-grid-pager a',
									k_grid_pager_input_input	:	'.k-grid-pager input',
								}
	
	var options			=	{
								'report_id'			:		report_id,
								grid				:		$('#'+report_id),
								map					:		$('#'+report_id+'Elements .map'),
								chart				:		$('#'+report_id+'chart'),
								kendoGrid			:		$('#'+report_id).data('kendoGrid'),
								height				:		layout_center.height,
								width				:		layout_center.width,
								container_configure	:		$('#'+report_id+'NAV'),
								container_elements	:		$('#'+report_id+'Elements'),
								container_main		:		$('.'+report_id+'BOX'),
								height_multiple		:		0,
								width_multiple		:		0,
								tag					:		html_class
							};
	
	
		//passando o tamanho da tela para a opções de configurações
		options.container_configure.innerWidth(layout_center.width);
		
		//configurando tela de modal
		$('body').managerJOB('resize',{'height':layout_center_object.outerHeight(),'width':layout_center_object.outerWidth()});
		
		//não deixa executa sem a GRID estar criada
		if(options.grid==undefined || options.grid==null) return false;
		
		
			//Garantindo que o campo type não seja nulo
			if(type_grid==undefined || type_grid==null)
			{
				type_grid	=	options.container_configure.find(options.tag.wrs_tools_options_window).attr('wrs-data');
				if(type_grid==undefined || type_grid==null) type_grid	=	'grid';
			}
		
	
			/*
			 * Configure Default
			 */

			//Remove a opção de Paginação na header
			options.container_configure.find(options.tag.k_grid_page).remove();
			
			//Elements
			options.container_elements.width(options.width);
			options.container_elements.height(options.height);
			
			options.container_elements.addClass('wrs_grid_elements_no_border');
			
			//Hides
			options.container_elements.hide();
			options.grid.hide();
			
						
			//CHART
			if(options.chart) 
			{
				options.chart.hide();
			}
			
			//MAP
			if(options.map) 
			{
				options.map.hide();
			}
			
			//configurando a opção para edição de gráfico
			options.container_configure.find(options.tag.info_chart).hide();
		
			var change_order	=	function(options,_order)
			{
				_START('resize_container_grid::change_order');
				//Comandos para ordenação
				var order_options	=	{
											element	 :	{
																map 	: 	'bottom',
																chart	: 	'top'
														},
											container : {
																element	:	'bottom',
																grid	:	'top'
														},
											change 	  :	{
																element 	: 	false,
																container	:	true
														}	
										};
				
				var order		=	order_options;
				
					if(_order!=undefined && _order!=null)
					{
						order	=merge_objeto(order_options,_order);
					}
				
				

				
					//Elementos
					if(order.change.element)
					{
						if(order.element.chart=='top')
						{
							//0 é o z index
							if(options.chart.index()!=0)
								{
									var soap		=	options.chart.detach();
										options.map.before(soap);
								}
						}else{
							if(options.map.index()!=0)
							{
								var soap		=	options.map.detach();
									options.chart.before(soap);
							}
						}
					}
					
					//COntainer
					
					if(order.change.container)
					{
						if(order.container.element=='top')
							{
								//2 é o index que corresponde a ficar logo abaixo
								if(options.container_elements.index()==2)
								{
									var soap		=	options.container_elements.detach();
										options.grid.before(soap);
								}
							}else{
								
									var soap		=	options.container_elements.detach();
//										console.log('send');
										options.grid.after(soap);
//										console.log('receive');
							}
					}
					
					delete order_options,order;
					
				_END('resize_container_grid::change_order');
			}

			
			
			
			
			var show_map		=	 function(_options,_clone)
			{
				_START('resize_container_grid::show_map');
					var clone		=	_clone==undefined || _clone==null ? false : _clone;
					var options		=	_options;
					var height_map	=	options.height	-	1;
					var report_id	=	_options.report_id;
					
						options.map.width(options.width);
						options.map.height(height_map);
				
						options.container_elements.show();
						options.map.show();
						
					var _map		=	options.map.data('goMap');
					
						
					
					//resize
					google.maps.event.trigger(_map.map, 'resize'); 
					
					
					if($('#'+report_id+'map').data('goMap').getMarkers().length>=1)
					{
						_map.fitBounds('visible'); 
					}
					//Mantem a visão anyerior
					//var google_maps	=	_options.container_elements.data('google_map_last_reload');
						
						if(clone)
						{
							clone_header_pagination(options);
						}
				_END('resize_container_grid::show_map');		
			}
			
			
			
			
			
			
			
			
			var show_chart		=	 function(_options,_clone)
			{
				_START('resize_container_grid::show_chart');
				var options	=	_options;
				var chart	=	options.chart.data("kendoChart");
				var clone		=	_clone==undefined || _clone==null ? false : _clone;
					
				var width_chart	=	options.width	-	3;
				
					options.chart.width(width_chart);
					options.chart.height(options.height);

					options.chart.show();
					
					
					if(chart!=undefined)
					{
						chart.height						=	options.height;
						
						chart.options.chartArea.height 		=	chart.height;
						chart.options.chartArea.width 		=	width_chart;
				      	chart.redraw();
						chart.resize();
					}else{
						//multiple chart
					/*	options.chart.find('.wrs_multiple_chart').each(function(){
							var multiple	=	$(this).data("kendoChart");
							
								multiple.height						=	options.height;
								multiple.redraw();
								multiple.resize();
							
						});*/
					}
				    
					options.container_elements.show();
				    options.container_configure.find(options.tag.info_chart).show();
				    
				    if(_clone)
				    {
				    	clone_header_pagination(options);
				    }
					
				_END('resize_container_grid::show_chart');	
			}	
			
			
			
			
			
			
			
			
			
			
			
			var show_grid		=	 function(options)
			{
				_START('resize_container_grid::show_grid');
				options.grid.show();
				
				if(options.kendoGrid) 
				{
					options.grid.width(options.width-1);
					options.grid.height(options.height);

					$('#'+options.report_id).removeClass('hide');
					
					var options_resize = {
								optionsWRS    	: options,
							  resize: function( event ) 
							  {
								  	this.optionsWRS.grid.width(this.optionsWRS.width);
								  	this.optionsWRS.kendoGrid.resize();	
							  }
							};
					
					var time_out 	= $.proxy( options_resize.resize, options_resize );
					
					setTimeout(time_out,50);
					
					options.kendoGrid.resize();	
				}
				_END('resize_container_grid::show_grid');
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			//Criando a header de paginação
			var clone_header_pagination		=	 function(options)
			{
				_START('resize_container_grid::clone_header_pagination');
				if(options.kendoGrid.dataSource._total<=0) {
					_END('resize_container_grid::clone_header_pagination');
					return false;
				}
				//salvando informações do google maps
				var save_info_google_maps		=	 function(options)
				{/*
					if(options.map!=undefined )
					{
							var google_map_last_reload		=	options.map.data('goMap');
							
							if(google_map_last_reload!=undefined)
							{
								options.container_elements.data('google_map_last_reload',google_map_last_reload.map);
							}
		        	

					}*/
				}
				
					options.container_configure.find(options.tag.k_grid_page).remove();
					options.container_configure.find(options.tag.grid_button_header_menu).prepend(options.grid.find(options.tag.k_grid_page).clone());

					
					var _div	=	$("<div/>").html(options.container_configure.find(options.tag.k_pager_sizes).html());
						_div.find('span').remove();

					var _html_tmp	=	options.container_configure.find(options.tag.k_pager_sizes).html();
					
					
					options.container_configure.find(options.tag.k_pager_sizes).html(_html_tmp.replace(strip_tags(_div.html()),''));
					
					
					
				
					options.container_configure.find(options.tag.k_pager_sizes).append(LNG('label_total')+' : '+options.kendoGrid.dataSource._total);
					
					//options.container_configure.find(options.tag.k_pager_sizes).append(' '+options.kendoGrid.dataSource._total);
					
					options.container_configure.find(options.tag.grid_button_header_menu).find(options.tag.k_dropdown_wrap).hide();
					
					
					
					
				
					
					
					//Select da nova header
					options.container_configure.find(options.tag.grid_button_header_menu).find('.k-dropdown select').data('optionsWRS',options).show().change(function() {
						var index		=	 $(this).find('option:selected').index();
						var id			=	 '#'+$(this).parent().attr('aria-activedescendant');
						var optionsWRS	=	$(this).data('optionsWRS');
						
							optionsWRS.grid.find(optionsWRS.tag.k_dropdown_wrap).trigger('click');	//ativa e clica
							$(optionsWRS.tag.k_animation_container).hide();
							$(id).parent().find('li:eq('+index+')').trigger('click');
							
							
							save_info_google_maps(optionsWRS);
							
					}).find('option[value='+options.kendoGrid.dataSource._pageSize+']').prop('selected',true);
					
					
					
					//CRiando os eventos
					options.container_configure.find(options.tag.k_grid_pager_a).data('optionsWRS',options);
					options.container_configure.find(options.tag.k_grid_pager_a).unbind('click').click(function(){
						var optionsWRS	=	$(this).data('optionsWRS');
						var index		=	 $(this).index();
							index		=	index >=3 ? index-1 :index	
							
							optionsWRS.grid.find(optionsWRS.tag.k_grid_pager_a+':eq('+index+')').trigger('click');
							
							save_info_google_maps(optionsWRS);
							
					});
					
					//TODO:Usar já com o o eq(do header que será utilizado na estrutura)
					options.container_configure.find(options.tag.k_grid_pager_input_input).data('optionsWRS',options);
					options.container_configure.find(options.tag.k_grid_pager_input_input).unbind('keydown').keydown(function(e) {
					   
						if (e.keyCode == $.ui.keyCode.ENTER){
					    	var optionsWRS	=	$(this).data('optionsWRS');
					    	var ee = jQuery.Event("keydown");
					    		ee.which = e.which; // # Some key code value
					    		ee.keyCode = e.keyCode; // # Some key code value
					    	
					    		optionsWRS.grid.find(optionsWRS.tag.k_grid_pager_input_input).val($(this).val()).trigger(ee);
					    		save_info_google_maps(optionsWRS);
								
					    }
					});
					
					
					
				_END('resize_container_grid::clone_header_pagination');	
			}
			
			
			
			
			
			
			
			var container_half	=	 function(_options,_element_no_half)
			{
				_END('resize_container_grid::container_half');
				var options			=	_options;
				var element_no_half	=	_element_no_half==undefined || _element_no_half==null ? false : _element_no_half;
					options.height	=	options.height/2;
					
					if(element_no_half==false)
					{
						options.container_elements.height(options.height);
					}
					
					options.grid.height(options.height);
				_END('resize_container_grid::container_half');
					return options;
			}
			
			
			
			
			var grid_chart		=	 function(_options)
			{
				_START('resize_container_grid::grid_chart');
				var options		=	container_half(_options);
					
					change_order(options);
					show_grid(options);
					show_chart(options);
				_END('resize_container_grid::grid_chart');	
			}
			
			
			
			var grid_map		=	 function(_options)
			{
				_START('resize_container_grid::grid_map');
				var options		=	container_half(_options);
					
					change_order(options);
					show_grid(options);
					show_map(options);
				_END('resize_container_grid::grid_map');	
			}
			
			
			
			
			
			
			var chart_grid		=	 function(_options)
			{
				_START('resize_container_grid::chart_grid');
				var options		=	container_half(_options);
				
				var order_options	=	{
						element	 :	{
											map 	: 	'bottom',
											chart	: 	'top'
									},
						container : {
											element	:	'top',
											grid	:	'bottom'
									},
						change 	  :	{
											element 	: 	false,
											container	:	true
									}	
						
					};
				

					change_order(options,order_options);
					
					show_grid(options);
					show_chart(options);
				_END('resize_container_grid::chart_grid');	
			}
			
			
			
			
			var chart_map		=	 function(_options)
			{
				_START('resize_container_grid::chart_map');
				var options		=	container_half(_options,true);
				var order_options	=	{
						element	 :	{
											map 	: 	'bottom',
											chart	: 	'top'
									},
						change 	  :	{
											element 	: 	true,
											container	:	false
									}	
						
					};
				
					options.container_elements.removeClass('wrs_grid_elements_no_border');
					change_order(options,order_options);
					
					show_chart(options,true);
					show_map(options);
				_END('resize_container_grid::chart_map');	
			}
			
			
			var map_grid		=	 function(_options)
			{
				_START('resize_container_grid::map_grid');
				
				var options		=	container_half(_options);

				var order_options	=	{
						container : {
											element	:	'top',
											grid	:	'bottom'
									},
						change 	  :	{
											element 	: 	false,
											container	:	true
									}	
						
					};
				

					change_order(options,order_options);
					
					show_grid(options);
					show_map(options);
				_END('resize_container_grid::map_grid');	
			}
			
			
			
			
			
			
			
			
			
			
			var map_chart		=	 function(_options)
			{
				_START('resize_container_grid::map_chart');
				var options		=	container_half(_options,true);
				var order_options	=	{
						element	 :	{
											map 	: 	'top',
											chart	: 	'bottom'
									},
						change 	  :	{
											element 	: 	true,
											container	:	false
									}	
						
					};
				

					options.container_elements.removeClass('wrs_grid_elements_no_border');
					change_order(options,order_options);
					
					show_chart(options,true);
					show_map(options);
				_END('resize_container_grid::map_chart');	
			}
			
			
			
			
	 

			switch(type_grid)
			{
				case "grid"			: 	show_grid(options)				;	break;
				case "chart"		: 	show_chart(options,true)		;	break;
				case "map"			:	show_map(options,true)			;	break;
				case "grid_chart"	:   grid_chart(options)				; 	break;
				case "grid_map"		: 	grid_map(options)				;	break;
				case "chart_grid"	: 	chart_grid(options)				;	break;
				case "chart_map"	: 	chart_map(options)				;	break;
				case "map_grid"		: 	map_grid(options)				;	break;
				case "map_chart"	: 	map_chart(options)				;	break;
			}

		
	delete kendoUi;
	delete type_grid;
	delete layout_center_object;
	delete layout_center;
	delete html_class;
	delete options;

	_END('resize_container_grid');
	
}


function resize_common()
{
	_START('resize_common');
	var report_id		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
		resize_container_grid(report_id);
	_END('resize_common');
}



function saveHistoryEvents(kendoParam,report_id)
{
	_START('saveHistoryEvents');
	if(empty(report_id)) return false;
	
	var param 	=	{};
	
	
		for(lineParan in kendoParam)
			{
			
				param[lineParan]=	kendoParam[lineParan];
			}
	
		
		
		param			=	 base64_encode(json_encode(param));
	var param_request	=	{'report_id':report_id,'history_options':param,'cube_s':CUBE_S};
		runCall(param_request, 'WRS_PANEL', 'WRS_PANEL', 'save_history', null, 'modal');
		delete param;
	_END('saveHistoryEvents');	
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
	_START('rules_pendences_checkbox');
	
	var dependence	=	element.attr('dependence');
	var checked		=	element.prop('checked');
	var _input		=	'';
	
	
	if(!empty(dependence))
	{
		_input	=	fullEvent.find('input[name='+dependence+']');
		if(checked){
			var _show	=	 true;
			//_input.prop('disabled',false);
			//Se for consolidado permite apenas se tiver duas ou mais linhas
			if(dependence=='DRILL_HIERARQUIA_LINHA')
			{
				if($('.sortable_linha').find('li').length<=1) _show=false;
			}
			
			if(_show==true)
			{
				_input.parent().parent().show();
			}
			
		}else{
			_input.prop('checked',false);
			//_input.prop('disabled',true);
			_input.parent().parent().hide();

		}
	}
	
	_END('rules_pendences_checkbox');	

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
	  _START('wrsConfigGridDefault');
	
	  
	  var aba_current				=	get_aba_active_object();
	  var 	data_name				=	'wrsConfigGridDefault',
			element					=	this,
			data					=	aba_current.wrsAbaData('getKendoUi');
	  
	  	var opts 					= 	$.extend( {}, getRequestKendoUiDefault, empty(options) ? {} : options),
	  		nav_options				=	element.find('.wrs_grid_options'),
	  		list_wrs_vision			=	element.find('.list-wrs-type-vision'),
	  		btn_options				=	element.find('.btn-options-grid'),
	  		btn_configute_chart		=	element.find('.btn-configute-chart'),
	  		btn_open_type_vision	=	element.find('.btn-open-type-vision'),
			isClick					=	false;
			nav_options.attr('id','wrs_grid_options_default');	
		


  		//WARNING:  O nome do ID nao pode ser removido pois existe outros lugares com pendencia no nome - wrs_panel
		element.attr('id',data_name);
  	
  		if(empty(options) && !empty(data)) opts	=	data;
  		
  		
  	
  	var detect_event	=	 function(type)
  	{
		_START('wrsConfigGridDefault::detect_event');
  			if(type=='clean') {
  				
  				if(element.attr('is-event')==_TRUE)
  						{
  					element.removeAttr('is-event');
  				}
  			}else
  				element.attr('is-event',true);
		
		_END('wrsConfigGridDefault::detect_event');
  	}
  	
  	//Limpando evento
  	detect_event('clean');
  	/*
  	 * Configurando o tipo de visualização da telas
  	 */
  	//
  	var function_btn_open_type_vision		=	 function()
  	{
		_START('wrsConfigGridDefault::function_btn_open_type_vision');
		
		var _opts		=		get_aba_active_kendoUi();
		
  		
  		list_wrs_vision.find('li a').each(function(){
  				var _wrs_data		=	 $(this).attr('wrs-data');
  				$(this).removeClass('active_tools');

  				if(_opts.WINDOW	==	_wrs_data){
  					$(this).addClass('active_tools');
  				}
  		});
  		
  		delete _opts;
		_END('wrsConfigGridDefault::function_btn_open_type_vision');
  	}
  	
  	var function_click_list_wrs_vision			=	 function(){
		_START('wrsConfigGridDefault::function_click_list_wrs_vision');

				var _wrs_data		=	$(this).attr('wrs-data');
				
				var active_aba			=	get_aba_active_object();
				
				var _report_id_box		=	active_aba.attr('id-aba')+'BOX';
				
				
				
				$('.'+_report_id_box).find('.wrs_tools_options_window').find('a[wrs-data="'+_wrs_data+'"]').trigger('click');
  	/*				

  					detect_event();//Abilita Evento
  					*/
				
  					list_wrs_vision.find('li a').removeClass('active_tools');
  					$(this).addClass('active_tools');
  					
  					active_aba.wrsAbaData('setKendoUi',{WINDOW:_wrs_data});
  					
				delete active_aba;
  				_END('wrsConfigGridDefault::function_click_list_wrs_vision');				
		
  				return true;
  	}
  	

  	
  	//Click do Botão - nav_options
  	var event_click_btn_options	=	 function()
  	{
		_START('wrsConfigGridDefault::event_click_btn_options');
  		
		var _opts		=		get_aba_active_kendoUi();	
  		
		$(this).parent().find('input').each(function()
  				{
	  				$(this).prop('checked',false);

	  				var _val	=	_opts[$(this).attr('name')];
	  				
	  				//Mantem a compatibilidade com os relatórios já salvos
	  				if($(this).attr('name')=='FROZEN_ROWS'){	if(_val!=0) _val = 1;}
	  				
	  				if(!empty(_val)){
	  					$(this).prop('checked',true);
	  				}else{
	  					$(this).prop('checked',false);
	  				}  
	  				
	  				rules_pendences_checkbox($(this),$(this).parent().parent().parents('ul'));
  		});
  		
		//hide CONSOLIDADO
		if($('.sortable_linha').find('li').length<=1){
			$('.DRILL_HIERARQUIA_LINHA_CHECK').hide();
		}
		
		
		delete _opts;
		_END('wrsConfigGridDefault::event_click_btn_options');
  	}
  	
	var addWrsKendoUiChange	=	 function(report_id,_key,value)
	{
		_START('wrsConfigGridDefault::addWrsKendoUiChange');
		var _report_id_exist	=	false;
		var	_report_id			=	'#'+report_id;
		
			$(_report_id).each(function(){_report_id_exist=true;});
			
		if(_report_id_exist)
			{
				wrsKendoUiChange(_report_id,_key,value);	
			}
		_END('wrsConfigGridDefault::addWrsKendoUiChange');	
	}
  	
  	//Evento de click nos INPUT do Options
  	var event_find_nav_options_input	=	 function()
  	{
		_START('wrsConfigGridDefault::event_find_nav_options_input');
  		var _checked					=	$(this).prop('checked');
		var _key						=	$(this).attr('name');
		var get_aba						=	get_aba_active_object();
		
  			opts						=	[]; 
	  		opts[_key]	= 	_checked ? 1 : 0;
	  		
	  		
	  		detect_event();//Abilita Evento
	  		element.attr('is-event',true);  

	  		get_aba.wrsAbaData('setKendoUi',opts);
	  		rules_pendences_checkbox($(this),$(this).parents('ul'));
			
			delete get_aba;
	  			
		_END('wrsConfigGridDefault::event_find_nav_options_input');
  	}
  	
  	//Abrindo o Modal de opções do CHART
  	var event_btn_configute_chart	=	 function(){
  		

		_START('wrsConfigGridDefault::event_btn_configute_chart');
  			var get_measures_title	=	 [];

  			
  			$('.WRS_MEASURE_DRAG').find('li').each(function(){
  			//	var _json_data		=	 $(this).data('wrs-data');
//  				var _json_data	=	getJsonDecodeBase64(_json);
				var tag_class	=	$(this).attr('tag-class');
				var _json_data	=	$('.ui-layout-pane-east ul').find('.'+tag_class).data('wrs-data');
				
  				get_measures_title[_json_data.MEASURE_UNIQUE_NAME]	=	_json_data.MEASURE_NAME;
				delete _json_data;

  			});
  			
  			
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
  			

  			nav_options.data('kendoGrid',KendoUi);	
  			
  		/*
  		 * Usando a estrutura atual para manipular a tela de customização do chart
  		 * É necessário converter a tela atual para a estrutura do kendo ui somente dessa forma é possível utilizar sem problemas toda a estrutura
  		 */
  		
  		nav_options.removeAttr('chart-wrs');//Permite que seja recriado sempre a estrutura nova das escolhas dos charts
  			
  		WRSKendoUiChart(KendoUi,true);
  		
  		
  		$($(this).attr('data-target')).modal('show');  	

		delete KendoUi;
		_END('wrsConfigGridDefault::event_btn_configute_chart');		
  	}
  	
  	//EVENTS
  	//Click para iniciar a configuração das Visões
  	btn_open_type_vision.unbind('click').click(function_btn_open_type_vision);  
  	
  	//Executa a mudança de visão
  	list_wrs_vision.find('li a').unbind('click').click(function_click_list_wrs_vision);
  	
  	//Click do Botão OPTIONS

  	btn_options.unbind('click').click(event_click_btn_options);
  	$('.btn-options-grid').unbind('click').click(event_click_btn_options);
  	
  	nav_options.find('li').each(function(){
  			$(this).find('input').unbind('click').click(event_find_nav_options_input);
  			$(this).unbind('click').click(function (e) {e.stopPropagation();});
  	});
  	
  	
  	
  	btn_configute_chart.each(function(){
  		$(this).unbind('click').click(event_btn_configute_chart);
  	});
  	

  	element.attr('isDefault',true).wrsTopOptions();
	_END('wrsConfigGridDefault');
  		
		delete data,opts,nav_options;
		
      return element;

  };

}( jQuery ));
//END

 

