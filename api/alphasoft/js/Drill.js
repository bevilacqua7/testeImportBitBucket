/**
 * PLUGIN WRS DRILL
 * Construção dos principais eventos do Drill
 * 
 * 
 * Esta api é em conjunto com o contextJS 
 * A API contextJS foi modificada para que funcione perfeitamente com nossos eventos e controles exclusivo que só o WRS contem
 * 
 * @link http://lab.jakiestfu.com/contextjs/
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 */


function addDrillOnDataBound(nameID,kendoUI)
{
	_START('addDrillOnDataBound');
	
	var kendo			=	wrsKendoUiContextMenu(kendoUI.sender,true);
	var layout			=	kendo.layout_full;
	var rows_tag		=	explode(',',layout['LAYOUT_ROWS']);
	var column_tag		=	explode(',',layout['LAYOUT_COLUMNS']);

	var _data			=	kendoUI.sender._data;
	var __kendoUI		=	kendoUI.sender;

	var keyName			=	getFirstValueArray(kendoUI.sender.columns);
	var name_column		=	__kendoUI.columns[keyName].column_table;
	var sizeColumns		=	__kendoUI.columns[keyName].flag_total_column
	var columns_fixed	=	explode(',',__kendoUI.columns[keyName].layout['LAYOUT_ROWS']);
		columns_fixed	=	columns_fixed.length+1;
		
	


	/*
	 * Adicionando o DrilDown
	 */
	
	var clickDrillDown	=	 function(){
		_START('addDrillOnDataBound::clickDrillDown');

					var LEVEL_DRILL	=	 $(this).attr('LEVEL_DRILL');
					var LEVEL_FULL	=	 $(this).attr('LEVEL_FULL');
					var rel			=	 $(this).attr('rel');
					
					var indexParent			=	 $(this).parent().index();
					var _layout				=	[];
					var rows				=	explode(',',layout['LAYOUT_ROWS']);
					var column				=	explode(',',layout['LAYOUT_COLUMNS']);
					var filter_add			=	'';
					
					if(rel=='column')
						{
							indexParent					=	 $(this).parent().parent().index();
							column[indexParent]			=	LEVEL_DRILL;
							_layout['LAYOUT_COLUMNS']	=	column;
						}else{
							rows[indexParent-1]		=	LEVEL_DRILL;
							_layout['LAYOUT_ROWS']	=	rows;
						}
					
						
						filter_add							=	[['__'+replace_attr(LEVEL_FULL),'',LEVEL_FULL+'.['+strip_tags($(this).parent().html())+']']];
						
						

						
						changeTypeRun(nameID,TYPE_RUN.drildown);//Informando o tipo de RUN foi solicitado
						
						changeWithDrillFilter(_layout,filter_add);
						
		_END('addDrillOnDataBound::clickDrillDown');				
		
	};
	
	var is_in_array			=	 function(value){
	_START('addDrillOnDataBound::is_in_array');
			if(in_array(value,rows_tag))
				{
					return false;
				}
			
			if(in_array(value,column_tag))
			{
				return false;
			}
			
			_END('addDrillOnDataBound::is_in_array');
			return true;
	
	}
	
	

	for(x in rows_tag)
		{
			
			var class_tag_for		=	 '.wrs_panel_options .'+replace_attr(rows_tag[x]);

			//$('.wrs_panel_options .PRODUTOLABORATORIO').data('wrs-data')
			//var json				=	$.parseJSON(base64_decode($(class_tag_for).attr('json')));
			var json				=	$(class_tag_for).data('wrs-data');
			

			var json_level_drill	=	 null;
			
			try{
				json_level_drill	=	json.LEVEL_DRILL;
				
			}catch(e){
				json_level_drill	=	 null;
				console.warn(' exception');
			}

			
			if(!empty(json_level_drill) && !in_array('DRD',PERFIL_ID_USER)){
					if(is_in_array(json.LEVEL_DRILL)){
						$(nameID).find('.k-grid-content-locked tr').each(function(){
							if(!$(nameID+' .k-grid-content tr:eq('+$(this).index()+')').hasClass('tag_total'))
							{
								var event	=	$(this).find('td:eq('+(parseInt(x)+1)+')');
								var aLink	=	$('<a/>',{href:'#',  'class':'underline','LEVEL_DRILL':json.LEVEL_DRILL,'title':'DrillDown: '+json.LEVEL_DRILL,'LEVEL_FULL':json.LEVEL_FULL}).html(event.html());
									aLink.click(clickDrillDown);
								event.html(aLink);
								
								
								//Trabalhando a exeção da estrutura da latitude e longitude do mapa
								if(kendoUI.sender.wrsKendoUi.DRILL_HIERARQUIA_LINHA==_TRUE){							
									event.find('.DRILL_HIERARQUIA_LINHA').each(function(){
										var getElement	=	 $(this).clone();
										getElement.click(DRILL_HIERARQUIA_LINHA_HEADER_CLICK);
										$(this).parent().parent().append(getElement);
										$(this).remove();
									})
								}
							}
						})
					}
				}	
		}
	

	
	for(c in column_tag)
		{
		

			
			if(empty(column_tag[c])) continue;
			
			//$('.wrs_panel_options .PRODUTOLABORATORIO').data('wrs-data')
			var class_tag			=	'.wrs_panel_options .'+replace_attr(column_tag[c]);


			//var json				=	$.parseJSON(base64_decode($(class_tag).attr('json')));
			var json				=	$(class_tag).data('wrs-data');
			var json_level_drill	=	 null;
			
			try{
				json_level_drill	=	json.LEVEL_DRILL;
				
			}catch(e){
				json_level_drill	=	 null;
				console.warn(' exception');
			}
			
			
			
		
		//var json	=	$.parseJSON(base64_decode($(class_tag).attr('json')));
		


			if(!empty(json_level_drill) && !in_array('DRD',PERFIL_ID_USER))
				{
						if(is_in_array(json.LEVEL_DRILL))
						{
							
							$(nameID).find('.k-grid-header-wrap tr:eq('+c+')').each(function(){
								
								$(this).find('th').each(function(){
										var event	=	 $(this);
										
											if(!event.hasClass('tag_total'))
											{
												var aLink	=	$('<a/>',{href:'#','class':'underline','rel':'column','LEVEL_DRILL':json.LEVEL_DRILL,'title':'DrillDown: '+json.LEVEL_DRILL,'LEVEL_FULL':json.LEVEL_FULL}).html(event.html());
													aLink.click(clickDrillDown);
												event.html(aLink);
											}
										
								});
								
							})
						}
				}
			
			

			
		}

	
	
	
	_END('addDrillOnDataBound');
	
}

function getFirstValueArray(kendoUi)
{
	
	_START('getFirstValueArray');
	for(key in kendoUi)
		{
			if(key)
			{
				return key;
			}
		}
	
	_END('getFirstValueArray');
}

function addTargetDisableContext(kendoUi,report_id)
{
	_START('addTargetDisableContext');
	var keyName		=	getFirstValueArray(kendoUi);
	var columnTotal	=	kendoUi[keyName]['flag_total_column'];
	var tr		=	0;
	for(total in columnTotal)
	{
		var line	=	columnTotal[total];
		for(th in line)
		{
				if(line[th]=='S')
					{
						$(report_id+' .k-grid-header-wrap tr:eq('+tr+') th:eq('+th+') ').addClass('tag_total');
					}
		}
		
		tr++;
	}
	
	_END('addTargetDisableContext');
}


(function ( $ ) {
    $.fn.WrsDrill		= function()
    {
		_START('WrsDrill');
		
    	$event					=	 this;
    	var TAG_REPORT_ID		=	'#'+$event.attr('id');
    
    	
    	//var kendoUi		=	$('#'+$event.attr('id')).data('kendoGrid');
		
    //	wrsKendoUiFindColumnsDeep(kendoUi,1);
    	
    	$(TAG_REPORT_ID+' .dropdown-menu-drill').remove();
    	
		/*
		 * Eventos principais recebidps
		 * construido por Marcelo Santos
		 * 
		 * json
		 * event
		 * parent
		 * type
		 * kendoId
		 * layout
		 * 
		 * Type
		 * coluna_header_line
		 * linha
		 * linha_header
		 * coluna_headerchangeWithDrill
		 * 
		 * 
		 */
    	function drill_click_option(e)
    	{
			
			_START('WrsDrill::drill_click_option');
			
    		var IDName			=	'#'+e.kendoId;
    		var kendoUi			=	$(IDName).data('kendoGrid');
    		var _data			=	kendoUi._data;
    		var keyName			=	getFirstValueArray(kendoUi.columns);
    		var name_column		=	kendoUi.columns[keyName].column_table;
    		var sizeColumns		=	kendoUi.columns[keyName].flag_total_column
    		var columns_fixed	=	explode(',',kendoUi.columns[keyName].layout['LAYOUT_ROWS']);
    			columns_fixed	=	columns_fixed.length+1;

    		//Abilita para o reenvio	
    			
    		
    		var rows		=  	'';
    		var column		=	'';
    		var measure		=	'';
    		var indexParent	=	e.parent.index()-1;
    		
    		var rows_current_full_name		=	'';
    		var column_current_full_name	=	'';
    		var measure_current_full_name	=	'';
    		var filter_add					=	'';
    		var value_select				=	'';
    		
    		var _layout				=	 [];
    		var layout				=	e.layout;
    		

    		for(x in layout)
    			{
    					_layout[x]	=	explode(',',layout[x]);
    			}
    		

    		
    		$('.'+e.kendoId).wrsAbaData('setKendoUi',{STOP_RUN:false, 'TYPE_RUN':TYPE_RUN[e.type]});
    		
    		switch(e.type)
    		{
				case 'linha' 				:  {
													var indexTR			=	e.parent.parent().index();
													var indexTD			=	parseInt(e.parent.index());
													var proxTd			=	e.parent.next('td');
													
													//if(proxTd!=null && proxTd!='undefined' && !proxTd.is(":visible") && proxTd.text().trim()!='') -- esse foi o felipe || Estava equivocado
													if(e.event.parent().attr('class')=='VER_MAPA')
													{
														$('a[wrs-data=grid_map]').last().trigger('click');														
														var _explode		=	 explode('|',str_replace(' ','',proxTd.text()));
														//centraliza o mapa no ponto em questao
														$(IDName+'Elements .map').data('goMap').setMap({ 
													        latitude: _explode[0], 
													        longitude: _explode[1], 
													        zoom: 15 
													    });
														
														
														//aciona o clique do marcador em questao
														google.maps.event.addListenerOnce($(IDName+'Elements .map').data('goMap').map, 'tilesloaded', function(event) {
															google.maps.event.trigger($(IDName+'Elements .map').data(''+(parseInt(indexTR)+1)), 'click');
													    });
														
														
													    
													}else{
														value_select	=	strip_tags(_data[indexTR][name_column[indexTD]]);
														rows_current_full_name				=	_layout['LAYOUT_ROWS'][indexParent];
														_layout['LAYOUT_ROWS'][indexParent]	=	e.json['LEVEL_FULL'];
														filter_add							=	[['__'+replace_attr(rows_current_full_name),'',rows_current_full_name+'.['+value_select+']']];
														changeWithDrillFilter(_layout,filter_add);
													}
				};	
				break;
				case 'coluna_header'		:	
    			case 'coluna_header_line' 	:	{
									    				var sizeTr	=	e.parent.parent().parent().find('tr').length;
														var indexTr	=	 e.parent.parent().index();
														
															if(sizeTr==1 || (sizeTr-1)==indexTr)
																{
																	var index_rest	=	'';
																	
																		measure		=	explode(',',e.layout['LAYOUT_MEASURES']);

		    															if(e.event.parent().hasClass('REMOVE_LINE_HEADER'))
		    															{ // se clicou no botao remover
		        															
		    																var newrows=[];
		    																
		        															for(var row in measure)
		        															{
		        																if(measure[row]!=e.layout['COLUMN_HEADER'][indexParent+1])
		        																	newrows[newrows.length]=measure[row];
		        															}	
		        															
		        															measure = newrows;
		    															}else{
		    																
		    																var level_click		=	kendoUi.headerIndex.field[e.parent.attr('data-field')].LEVEL_FULL;
		    																//
//		    																console.log('measure::',measure,'column::',e.layout['COLUMN_HEADER'],'measure::',e.json['MEASURE_UNIQUE_NAME']);
		    																
																			measure		=	fwrs_array_change_value(measure,level_click,e.json['MEASURE_UNIQUE_NAME']);
		    															}

																		changeWithDrillColumnRows(measure,'LAYOUT_MEASURES');
																}
																else
																{
																	column				=	explode(',',e.layout['LAYOUT_COLUMNS']);
																	var td_index		=	e.parent.index();
																	var tr_index		=	e.parent.parent().index();
																	var td_index		=	td_index+qtd_frozen_eq(IDName,tr_index);
																	
																	var key_user		=	tr_index+'_'+td_index;
																	var html_title		=	kendoUi.headerIndex[key_user]['title'];
																	
																	
																	filter_add							=	[['__'+replace_attr(column[indexTr]),'',column[indexTr]+'.['+html_title+']']];
																 	column[indexTr]				=	e.json['LEVEL_FULL'];
																	_layout['LAYOUT_COLUMNS']	=	column;
																	changeWithDrillFilter(_layout,filter_add);
																	

																}
    			};
    			break;
    			case 'linha_header'			:	{
    												var sizeTr	=	e.parent.parent().parent().find('tr').length;
    												var indexTr	=	 e.parent.parent().index();
    												
    													if(sizeTr==1 || (sizeTr-1)==indexTr)
    														{
	    														rows				=	explode(',',e.layout['LAYOUT_ROWS']);
	    														
    															if(e.event.parent().hasClass('REMOVE_LINE_HEADER')){ // se clicou no botao remover
        															var newrows=[];
        															
        															for(var row in rows)
        															{
        																if(rows[row]!=rows[indexParent])
        																	newrows[newrows.length]=rows[row];
        															}
        															rows = newrows;        																
    															}else{
    	    														rows[indexParent]	=	e.json['LEVEL_FULL'];
    															}
    															
	    														changeWithDrillColumnRows(rows,'LAYOUT_ROWS');
    														}
    														else
    														{
    														
    															column			=	explode(',',e.layout['LAYOUT_COLUMNS']);
    															if(e.event.parent().hasClass('REMOVE_LINE_HEADER')){ // se clicou no botao remover
        															var newcolumn=[];
        															for(var col in column)
        															{
        																if(column[col]!=column[indexTr])
        																	newcolumn[newcolumn.length]=column[col];
        															}
        															column = newcolumn;        																
    															}else{
    																column[indexTr]	=	e.json['LEVEL_FULL'];
    															}
    															changeWithDrillColumnRows(column,'LAYOUT_COLUMNS');
    														}
    													
    													return true;
    													
    													
    			};break;
    			case 'data'				:	{
    								/*
    								 * Esta opção é mais complexa pois mudar as colunas e header para fazer a integração correta
    								 */
										var indexTR			=	e.parent.parent().index();
										var indexTD			=	parseInt(e.parent.index());
											rows			=	explode(',',e.layout['LAYOUT_ROWS']);
											column			=	explode(',',e.layout['LAYOUT_COLUMNS']);
											value_select	=	strip_tags(_data[indexTR][name_column[indexTD]]);
											

											
										var _layout		=	[];
										var _filter		=	[];
										var _value		=	'';
										var header_size	=	0;
										
												for(x in rows)
													{
														_value					=	strip_tags(_data[indexTR][name_column[parseInt(x)+1]]);
														_filter[_filter.length]	=	['__'+replace_attr(rows[x]),'',rows[x]+'.['+_value+']'];
													}
												
										header_size	=	$event.find('.k-grid-header-wrap tr').length;
										
										
										if(header_size!=1)
										{
												for(c in column)
													{
														_value		=	'';
														var countTD	=	0;
														//Pesquisando qual a posição correta de cara Header
														$event.find('.k-grid-header-wrap tr:eq('+c+') ').find('th').each(function(){
															
																var colspan	=	$(this).attr('data-colspan');
																	colspan	=	 empty(colspan) ? 1 : colspan;	
																	countTD	=	countTD+parseInt(colspan);
																if(countTD>=(indexTD+1) && empty(_value))
																{
																	_value	=	 strip_tags($(this).html());
																}
														});

														var __local_array		=	[];
															__local_array[0]	=	'__'+replace_attr(column[c]);
															__local_array[1]	=	'';
															__local_array[2]	=	column[c]+'.['+_value+']';

														_filter[_filter.length]	=	__local_array;
													}
										}

											var column_field	=	$(IDName).find('.k-grid-header-wrap tr:last-child th:eq(2)').attr('data-field');
											
											console.log('_filter',_filter);
											
											
											_layout['LAYOUT_COLUMNS']	=	['empty'];
											_layout['LAYOUT_MEASURES']	=	[kendoUi.headerIndex.field[column_field].LEVEL_FULL];
											_layout['LAYOUT_ROWS']		=	[e.json['LEVEL_FULL']];
										
											
											changeWithDrillFilter(_layout,_filter);
										
					
    			};break;
    		}
			
			_END('WrsDrill::drill_click_option');
    	}// EDN drill_click_option(e)
    	
    	//Start context Menu
    	context.init({preventDoubleContext: false,above:'auto'});

    	var jsonRelationShip	=	$.parseJSON(base64_decode(ATRIBUTOS_JSON));
    	var jsonMeasure			=	$.parseJSON(base64_decode(METRICAS_JSON));
    	
    	/*
    	 * Para que funcione tanto com RelationShip,Measure e resultados 
    	 */
    	var menu_context_relation_ship_measure	=	 function (_jsonMenu)
    	{
			_START('WrsDrill::menu_context_relation_ship_measure');
    		var menuMain				=	[];
    		menuMain[menuMain.length]	=	{header	: 'Options ', action:drill_click_option};

    		for(indexMenu in _jsonMenu)
        		{
        				var subMenu			=	[];
        				var TITLE			=	indexMenu;
        				var subObjectMenu	=	_jsonMenu[indexMenu];
        				
        				
        				for(indexSubRElation	in subObjectMenu)
        					{
        							var detailSubRelation	=	subObjectMenu[indexSubRElation];
        							var _text				=	empty(detailSubRelation['LEVEL_NAME']) ? detailSubRelation['MEASURE_NAME'] : detailSubRelation['LEVEL_NAME'];
        							var fullName			=	empty(detailSubRelation['LEVEL_FULL']) ? detailSubRelation['MEASURE_UNIQUE_NAME'] : detailSubRelation['LEVEL_FULL'];
        							subMenu[subMenu.length]	=	{text	: _text		, className:replace_attr(fullName),action:drill_click_option, json:base64_encode(json_encode(detailSubRelation,true))};
        							
        							/*
        							 * 	ATIBUTOS
        							 	[RELATIONSHIP_KEY] => [192.168.1.4][GSK - PMB][GSK - PMB][MERCADO].[MERCADO]
        			                    [DIMENSION_NAME] => MERCADO
        			                    [LEVEL_FULL] => [MERCADO].[MERCADO]
        			                    [LEVEL_NAME] => MERCADO
        			                    [LEVEL_UP] => 
        			                    [LEVEL_DOWN] => 
        			                    [LEVEL_DRILL] => 
        			                    [LEVEL_DEFAULT] => [MERCADO].[MERCADO].[(All)]
        			                    [LATITUDE] => 
        			                    [CUBE_ID] => [GSK - PMB][GSK - PMB]
        							 */
        								/*
        								 * MEASURES
        								[MEASURE_KEY] => [192.168.1.4][GSK - PMB][GSK - PMB]
        			                    [MEASURE_NAME] => DOLAR
        			                    [MEASURE_UNIQUE_NAME] => [Measures].[DOLAR]
        			                    [MEASURE_CAPTION] => DOLAR
        			                    [DATA_TYPE] => 5
        			                    [NUMERIC_PRECISION] => 16
        			                    [NUMERIC_SCALE] => -1
        			                    [MEASURE_UNITS] => 
        			                    [DESCRIPTION] => 
        			                    [MEASURE_DISPLAY_FOLDER] => FATOS
        			                    [DEFAULT_FORMAT_STRING] => Standard
        			                    */
        					}
        				
        				var detailSubRelation			=	subObjectMenu[0];
        				var fullName					=	empty(detailSubRelation['LEVEL_FULL']) ? detailSubRelation['MEASURE_UNIQUE_NAME'] : detailSubRelation['LEVEL_FULL'];
        					menuMain[menuMain.length]	=	{text	: TITLE	, subMenu:subMenu,className:replace_attr(fullName)};
        				//menuMain[menuMain.length]=	 {divider: true};
        		}
    		
			_END('WrsDrill::menu_context_relation_ship_measure');
        	return menuMain;
    	}

    	
    	var kendoUi		=	$('#'+$event.attr('id')).data('kendoGrid');
    	var e_infos = wrsKendoUiContextMenu($event);
    	var e_colunas 	= explode(',',e_infos.layout_full['LAYOUT_COLUMNS']);
    	var e_linhas 	= explode(',',e_infos.layout_full['LAYOUT_ROWS']);
    	var cols_qtde = [e_colunas.length,e_linhas.length];
    	/*
    	 * Context Menu das Linhas
    	 */
    	var data_line_header							=	 menu_context_relation_ship_measure(jsonRelationShip);
    		data_line_header[data_line_header.length]	=	{text	: 'REMOVER'		, className:'REMOVE_LINE_HEADER',action:drill_click_option, json:''};
    		
    	var data_line_row							=	 menu_context_relation_ship_measure(jsonRelationShip);
    		data_line_row[data_line_row.length]	=	{text	: 'VER NO MAPA'		, className:'VER_MAPA',action:drill_click_option, json:''};
    		
    		
    	if(!in_array('DRT',PERFIL_ID_USER)){
	    	// cabecalho de cada linha	
	    	$(TAG_REPORT_ID+" .k-grid-content-locked").attr('rel','noContext').attr('type','linha');
	    	context.attachWRS(TAG_REPORT_ID+' .k-grid-content-locked td'				, data_line_row, $event);
	    	    	
	    	// cabecalho inicial (canto superior esquerdo) da coluna e da linha apenas
	    	$(TAG_REPORT_ID +" .k-grid-header .k-grid-header-locked").attr('type','linha_header');
	    	context.attachWRS(TAG_REPORT_ID+' .k-grid-header .k-grid-header-locked th'	, data_line_header,$event);    	  	
    	}
    	
    	//Dados
    	if(!in_array('DRV',PERFIL_ID_USER))
    	{
    		$(TAG_REPORT_ID+" .k-grid-content").attr('type','data');
    		context.attachWRS(TAG_REPORT_ID+' .k-grid-content td'				, menu_context_relation_ship_measure(jsonRelationShip),$event);    		
    	}

    	
    	
    	//ContextMenu das Heardes mas das Colunas
    	var length	=	$(TAG_REPORT_ID+' .k-grid-header .k-grid-header-wrap tr').length;
    	
    	/*
    	 * Aplicando a header com linhas e colunas na header de resultados
    	 */
    	
    	
    		
    	addTargetDisableContext(kendoUi.columns,TAG_REPORT_ID);
    	
    	if(length==1)
    	{
    		$(TAG_REPORT_ID+" .k-grid-header .k-grid-header-wrap").attr('type','coluna_header');
    		
			var data_line_header2							=	menu_context_relation_ship_measure(jsonMeasure);
    			data_line_header2[data_line_header2.length]	=	{text	: 'REMOVER'		, className:'REMOVE_LINE_HEADER',action:drill_click_option, json:''};
    		// header de cada coluna
        	if(!in_array('DRT',PERFIL_ID_USER)){
        		context.attachWRS(TAG_REPORT_ID+' .k-grid-header .k-grid-header-wrap tr:eq(0) th '	, data_line_header2,$event);
        	}
    	}else{
    		
    		$(TAG_REPORT_ID+' .k-grid-header .k-grid-header-wrap').attr('type','coluna_header_line');
    		 
    		var tag					=	'';
    		for(var i=0;i<length;i++)
    			{    			
    					tag		=	TAG_REPORT_ID+' .k-grid-header .k-grid-header-wrap tr:eq('+i+') th ';
    					if(i!=(length-1))
    					{	// header de cada coluna
    				    	if(!in_array('DRT',PERFIL_ID_USER)){
    				    		context.attachWRS(tag	, menu_context_relation_ship_measure(jsonRelationShip),$event);
    				    	}
    					}else{
    				    	if(!in_array('DRM',PERFIL_ID_USER)){
	    						var data_line_header2							=	 menu_context_relation_ship_measure(jsonMeasure);
	    		        		data_line_header2[data_line_header2.length]	=	{text	: 'REMOVER'		, className:'REMOVE_LINE_HEADER',action:drill_click_option, json:''};
	    		        		// metricas
	    						context.attachWRS(tag	, data_line_header2,$event);
    				    	}
    					}
    			}   		 
    	}
  

_END('WrsDrill');
        return $event;
    };
}( jQuery ));
