/**
 * 
 * Compexo de criação e eventos de abas
 * 
 * Exemplos
 * @link http://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods
 * @link http://layout.jquery-dev.com/demos/simple.html
 */
/*
 * TODO: Falta salvar as informações do chante quando clica em abrir um relatório
 */

function wrsABAAddValue(grid,_kendoUi)
{
	var _IDGrid		=	 str_replace('#','',grid);
	var _aba		=	$('.WRS_ABA ul').find('.'+_IDGrid);
		
	var _paran		=	json_decode(base64_decode(_aba.attr('wrsparam')));
		
		_paran		=	merge_objeto(_paran,_kendoUi);
		
		_aba.data('WINDOW',_paran).attr('wrsparam',base64_json(_paran));
		$('#wrsConfigGridDefault').data('wrsConfigGridDefault',_kendoUi).wrsConfigGridDefault(_kendoUi);
		
		
}

function trace_change_kendo(kendoUi)
{
	TRACE_DEBUG('CHANGE');
	console.log('trace_change_kendo',kendoUi);
}

(function( $ ) {
		
		/**
		 * Configurações das Abas
		 */
		$.fn.wrsAbas = function(methodOrOptions) 
		{
			var tagName			=	'WRSAbas';
			var that			=	 this;
			var abaData			=	'WRSAbasDATA';
			var classIDName		=	'wrsAbaNew';//lembrabdo que essa classe ao carregar uma nova deve ser apagada
			var aba_full_data	=	'wrs_aba_full_data';
			var kendoUiDataAba	=	'kendoUiDataAba'; //Não modifique sem altera no WRSKendoUi.js
			
			var tag_aba_empty	=	'aba_empty';
			
			/*
			 * O objerto da TAG é <ul>
			 * 						<li><a> <span>icon remove</span></a></li>
			 * 					  </ul>
			 */
			var tagABA			=	$('.WRS_ABA ul');
			var htmlABA			=	'<li class="{active} {IDaba}" id-aba="{IDaba}"  wrsparam="{param}"><a href="#"><span class="title"  >{li}</span><span class="icon-remove-aba glyphicon glyphicon-remove"></span></a></li>';
			var htmlABAReplace	=	['{li}','{active}','{IDaba}','{editable}','{param}'];
			
			/*
			 * Abria a tela de configuração mas nula
			 */
			var open_configure_default		=	 function(options)
			{
				var optionsAba		=	{
											LAYOUT_ROWS			:[],
											LAYOUT_COLUMNS		:[],
											LAYOUT_MEASURES		:[],
											LAYOUT_FILTERS		:[]
										};
				var	opts 			= 	$.extend( {}, optionsAba, options );
				
					
					set_value_box_relatorio(opts);
					filter_configure_window();
				
			}
			
			
			
			/*
			 * Criando uma nobva aba de configurações defaults 
			 * carrega a Janela para DRAG and DROP nula
			 */
			var create_new_default					=	 function(id_report,title)
			{
				var getElement						=	{};
				
					getElement['REPORT_ID']			=	id_report;
					getElement['TITLE_ABA']			=	title;
					getElement['SUMARIZA']			=	1;
					getElement['COLORS_LINE']		=	1;

					$('.NAV_CONFIG_WRS,#wrsConfigGridDefault').attr('is-event',true).data('wrsConfigGridDefault',getElement);
					
					WRS_clean_filter();
					return getElement;
			}
			
			
			var btn_add_new_aba	=	 function()
			{
				var className				=	'new_file';
				var htmlABA					=	'<li class="'+className+'" ><a href="#"><i class="fa fa-file-text"></i></a></li>';

				var _click_btn_new_aba		=	 function()
					{
							var aba_active		=	tagABA.find('.active');
								save_info_aba_current(aba_active);
					/*
							var id_report	=	add_aba_html('','',true,true,base64_json({}));		
								wrsConfigGridDefaultManagerTopOptionsLock();
															
								open_configure_default();							
								wrs_panel_layout.open('east');
								
							var get_info	=	create_new_default(id_report.report_id,id_report.title);	
							
								tagABA.find('.'+id_report.report_id).attr('wrsparam',base64_json(get_info)).data('WINDOW',get_info);
								
								*/
								
					
					
									
										var getElement						=	{};	
											getElement['TITLE_ABA']			=	__new_name_aba();
											getElement['REPORT_ID']			=	generateReportId();
											getElement['SUMARIZA']			=	1;
											getElement['COLORS_LINE']		=	1;
					
											var optionsAba		=	{
																		LAYOUT_ROWS			:base64_json({}),
																		LAYOUT_COLUMNS		:base64_json({}),
																		LAYOUT_MEASURES		:base64_json({}),
																		LAYOUT_FILTERS		:base64_json({}),
																		KendoUi				:base64_json(getElement),
																		FILTER_TMP			:""
																	};
					
											 
											__load_multiple([optionsAba]);
								
								
								btn_add_new_aba();	
					}
				
				
				 
					tagABA.find('.'+className).remove();
					tagABA.append(htmlABA);
					tagABA.find('.'+className).unbind('click').click(_click_btn_new_aba);
						 
			}
			
			
			
			
			
			/**
			 * Apenas gera o Report ID
			 */
			var generateReportId		=	 function ()
			{
				var aba_name	=	 'ABA_'+js_rand(0,99999999999999);
					return aba_name;
			}
			
			
			
			
			var saveKendoGridData	=	 function()
			{
				/*
				 * Ao clicar em mudança de aba
				 * Eu mantenho a estrutura oficial da aba original
				 */
					var currentABA		=	$('.wrsGrid').attr('id');
					var kendoUiGrid		=	$('#'+currentABA).data('kendoGrid');
					
					if(empty(kendoUiGrid)) return false;
					
						tagABA.find('.'+currentABA).data(kendoUiDataAba,kendoUiGrid);
						
			}
			
			
			/*
			 * Salvando alterações na aba corrente
			 */
			var save_info_aba_current		=	 function(_aba_active)
			{
				
				if(_aba_active.length==0) return true;
				//habilita a janela
				var _filter_hide=activeToGetAllFilters();
					
				var aba_active			=	 _aba_active;
				
				var IDGrid				=	'#'+aba_active.attr('id-aba');
				var eventGridActive		=	aba_active//$(IDGrid);
				var isGrid				=	 false;		
				var isIDGrid			=	false;
					eventGridActive.each(function(){
						isGrid	=	true;
					});
					
					
					$(IDGrid).each(function(){
						isIDGrid	=	true;
					});
				
	//				if(!isGrid)	
		//			{
						eventGridActive	=	aba_active;
			//		}
				
				var _param			=	eventGridActive.attr('wrsparam');
				
				
				var _param_request	=	getJsonDecodeBase64(_param);
				
					if(empty(_param_request) || _param_request=='null') _param_request	=	{};
					
				
 				
				var sortable_metrica	=	 rows_by_metrica_attr_base64('.sortable_metrica','metrica');
				var sortable_linha		=	 rows_by_metrica_attr_base64('.sortable_linha','attr');
				var sortable_coluna		=	 rows_by_metrica_attr_base64('.sortable_coluna','attr');
				var sortable_filtro		=	 rows_by_metrica_attr_base64('.sortable_filtro','attr');
				var getAllFiltersToRun	=	"";
				
				var request_metrica		=	 sortable_metrica.request;
				var request_linha		=	 sortable_linha.request;
				var request_coluna		=	 sortable_coluna.request;
				var request_filtro		=	 sortable_filtro.request;

					getAllFiltersToRun					=	$.WrsFilter('getAllFiltersToRun');
					
					_param_request['LAYOUT_ROWS']		=	base64_encode(implode(',',request_linha));
					_param_request['LAYOUT_COLUMNS']	=	base64_encode(implode(',',request_coluna));
					_param_request['LAYOUT_MEASURES']	=	base64_encode(implode(',',request_metrica));
					_param_request['LAYOUT_FILTERS']	=	base64_encode(getAllFiltersToRun.data);
					_param_request['FILTER_TMP']		=	base64_encode(json_encode(getAllFiltersToRun.full));
					
					eventGridActive.attr('wrsparam',base64_encode(json_encode(_param_request,true)));
					
				//Salva atualizações da aba corrente mas esse evento somente quando troca de aba
				var configure_default_chart	=	$('.NAV_CONFIG_WRS').data('wrsConfigGridDefault');
				
					if(array_length(configure_default_chart)==2 || (isIDGrid==true && empty(aba_active.data('WINDOW'))))
					{
						var _concat						=	$('#wrsConfigGridDefault').data('wrsConfigGridDefault');
							configure_default_chart		=	 merge_objeto(configure_default_chart,_concat);
							
							if(array_length(_concat)==2)
							{
								configure_default_chart		=	getElementsWrsKendoUi($(IDGrid));
								configure_default_chart		=	 merge_objeto(configure_default_chart,_concat);
							}
							
							
					}
					
					aba_active.data('WINDOW',configure_default_chart);
					
					//Desabilita a janela
					activeToGetAllFiltersRecover(_filter_hide);
				
			}
			
			
			function optionsDataConvert(gridValue)
			{
				
				var optionsAba		=	{
						LAYOUT_ROWS			:	filter_array_convert(base64_decode(gridValue['LAYOUT_ROWS'])),
						LAYOUT_COLUMNS		:	filter_array_convert(base64_decode(gridValue['LAYOUT_COLUMNS'])),
						LAYOUT_MEASURES		:	filter_array_convert(base64_decode(gridValue['LAYOUT_MEASURES'])),
						LAYOUT_FILTERS		:	filter_TMP_to_array(getJsonDecodeBase64(gridValue['FILTER_TMP']))
					};
				
				return optionsAba;
			}
			/**
			 * Evento do click da ABA 
			 * para abrir a estrutura da aba
			 */
			var dblclick_open_aba		=	 function()
			{
				wrsConfigGridDefaultManagerTopOptions();
				//wrsConfigGridDefaultManagerTopOptionsLock();
				
				var aba_active		=	tagABA.find('.active');
					aba_active.removeClass('active');
					
				var gridValue		=	[];
				var only_aba		=	false;
				var idReport		=	"";
				var IDMain			=	"";
				var hasDefault		=	 $('.wrs_panel_filter_measure').is(':hidden');
				var _report_id		=	$(this).attr('id-aba');
				var IDCurrent		=	'#'+_report_id;
				
				wrs_run_filter_unlocked();
				 
				
				$('body').WRSJobModal('click_aba',{report_id:_report_id});
				
					$(this).addClass('active');
					
					//Saçvando as alterações da ABA
					
					if(hasDefault==false)
					{
						save_info_aba_current(aba_active);
					}
					
					$('.NAV_CONFIG_WRS').attr('id-tag',$(this).attr('id-aba')).find('.report_title').html($(this).find('.title').html());

				//Pegando os dados salvo nessa aba
				var aba_data			=	$(this).data(abaData);
	
				
			//	console.log('aba_data',aba_data);
				
				//Ainda não existe estrutura na ABA
				if(empty(aba_data))
				{
						if(hasDefault==true)
						{
							open_configure_default();
							return true;
							
						}
						
				}
				else
				{
						IDMain			=	'#'+idReport;
					 	gridValue		=	getJsonDecodeBase64($(IDMain).attr('wrsparam'));
				}
				
				
				var isGrid			=	false;
				var _paran_aba		=	$(this).attr('wrsparam');
				
					wrs_run_filter_add_history(_paran_aba)
					
					
					$(IDMain).each(function(){
						isGrid	=	 true;
					});
					
					
					
					if(hasDefault==false)
					{
						gridValue		=	getJsonDecodeBase64(_paran_aba);
						only_aba		=	 true;
					}else{
						
						gridValue		=	getJsonDecodeBase64(_paran_aba);
						
						
						$(IDCurrent).each(function(){
							isGrid	=	 true;
						});
						
						
						if(!isGrid)
						{
							wrs_panel_layout.open('east');
						}
						
					}
				
				
				
				
				var _kendoUiDataAba	=	$(this).data(kendoUiDataAba);
				
			
				
					
					if(hasDefault==true)
					{
						isGrid		=	true;
						only_aba	=	true;
					}
				
				var optionsAba		=	{};
				


				
				var optionsAba		=	optionsDataConvert(gridValue);
					open_configure_default(optionsAba);
					
					//Configura apenas o CSS
					//WRS_filter_hide();
					
					$('.wrsGrid').removeClass('wrsGrid');
					$(IDCurrent).addClass('wrsGrid');
					
					$('.container_panel_relatorio_rows').addClass('hide');
					
					if(hasDefault==true && isGrid==true)
					{
						$(IDCurrent+'Main').removeClass('hide');
					}

					$('.NAV_CONFIG_WRS').attr('is-event',true).attr('aba-change',true);//.data('wrsConfigGridDefault',aba_data);
					

					//Executa o filtro
					if(!isGrid)
					{
						if(!only_aba)
						{
							wrsRunFilter();
						}else{
							var getKendoUi	=	$(this).data('WINDOW');
							getKendoUi	= empty(getKendoUi) ? {} : getKendoUi;
							$('.NAV_CONFIG_WRS').attr('is-event',true).data('wrsConfigGridDefault',getKendoUi).wrsConfigGridDefault(getKendoUi);
							
							
						}
					}else{
						
						if(only_aba)
						{
							//Ana nova em nodo de edição
							var getKendoUi	=	$(this).data('WINDOW');
								getKendoUi	= empty(getKendoUi) ? {} : getKendoUi;
								$('.NAV_CONFIG_WRS').attr('is-event',true).data('wrsConfigGridDefault',getKendoUi).wrsConfigGridDefault(getKendoUi);
						}else{
							var getKendoUi	=	getElementsWrsKendoUi($('#'+idReport));
								$('#'+idReport).attr('is-event',true).WRSWindowGridEventTools(getKendoUi['WINDOW']); //Ativano os gráficos
						}
					}
					
					
					
					
					
					
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			var activeKeyPress		=	 function(event)
			{
				//Apenas evita o Enter
				event.unbind('keypress').keypress(function(event){
					var code = event.keyCode || event.which;
					if ( code == 13 ) return false;
				});
				
				event.unbind('keyup').keyup(function(event)
				{
					//Não permite o enter
					var code = event.keyCode || event.which;
					
					if ( code == 13 ) return false;
					
						var getID					=	$(this).attr('id-tag');
						
							if(!empty($('.NAV_CONFIG_WRS').attr('id-tag')))  getID=$('.NAV_CONFIG_WRS').attr('id-tag');
						
						var getElement				=	$('.NAV_CONFIG_WRS').data('wrsConfigGridDefault');
						var title					=	$(this).html();

						var _report_id_new			=	'';
							getElement['TITLE_ABA']	=	title;
							
							if(empty(getID))
							{
								getID	=	_report_id_new	=	getElement['REPORT_ID']	=	generateReportId();
								$(this).attr('id-tag',_report_id_new);												
								$('.wrsAbaNew').attr('id-aba',_report_id_new).addClass(_report_id_new).removeClass('wrsAbaNew');
							}

							$('.'+getID).find('.title').html(title);
							
							$('.NAV_CONFIG_WRS').attr('is-event',true).data('wrsConfigGridDefault',getElement);
							/*
							$('#'+getID+'NAV').find('.report_title').html(title);
							$('#wrsConfigGridDefault').find('.report_title').html(title);
							*/

				});
				
			}
			
			
			
			
			
			
			
			/*
			 * 
			 * @link http://stackoverflow.com/questions/2441565/how-do-i-make-a-div-element-editable-like-a-textarea-when-i-click-it
			 */
			var event_span_editable	=	 function()
			{
				
				$('.CONTROL_TITLE_EDIT').each(function()
				{
					
					var _title		=	$(this).find('.report_title');
					var id_tag		=	$(this).attr('id-tag');
					
					
					
					_title.attr('id-tag',id_tag).each(function(){
						
								activeKeyPress($(this));
								
							});
					
					
				});
				
				tagABA.find('li').unbind('click').click(dblclick_open_aba);
				
			}
			
			
			
			
			var event_remove_btn_close	=	 function()
			{
				var _report_id	=	 $(this).parent().parent().attr('id-aba');
				var size_li		=	tagABA.find('li').length;
				
				
					if(size_li==2)
						{
							WRS_ALERT(sprintf(LNG('ABA_LIMIT_SEE'),__aba_title({report_id:_report_id})),'warning');
							return true;
						}
				
					__remove({'report_id':_report_id});

			}
			
			var __new_name_aba		=	 function()
			{
				var new_size		=	tagABA.find('.'+tag_aba_empty).length;
				var _title			=	'';
				var _title_tag		= true;
				
				
				
				while(_title_tag)
				{
					new_size++;
					
					_title			=	LNG('LABEL_NOVO')+' ('+new_size+')';
					_title_tag	=	 false;
					
					tagABA.find('li').find('.title').each(function(){
						
						if($.trim(_title)==$.trim($(this).html()))
						{
							_title_tag	=	 true;
						}
					})
					
					
				}
				
				return _title;
			}
			
			
			/**
			 * Apenas cria uma nova aba na estrutura
			 */
			var add_aba_html	=	 function(_title, _report_id,_active,editable,_append,data,_full_data)
			{
				var report_id		=	_report_id;
				var title			=	empty(_title) ? __new_name_aba() : _title;
				var active			=	_active ? 'active' : '';
				var full_data		=	_full_data;
				
				
				
				var getElement				=	[];	
					getElement['TITLE_ABA']	=	title;
					getElement['REPORT_ID']	=	report_id;
				
				
					//se o report vier nulo então é criado um novo report
					if(empty($.trim(_report_id)) || _report_id==classIDName)
					{
							report_id				=	generateReportId();
							//GRavando o title da nova aba
							getElement['REPORT_ID']	=	report_id;
							$(this).attr('id-tag',report_id);	
							$('.NAV_CONFIG_WRS').attr('is-event',true).attr('id-tag',report_id).data('wrsConfigGridDefault',getElement).find('.report_title').html(title);
							
					}
					

					
					tagABA.find('.active').removeClass('active');	

					//full_data['TITLE_ABA']	=	title; //forçando um novo title;
							
				var tag_editable	=	true;
					if(!editable)	tag_editable	=	false;

				
				
				var	encode_full		=	base64_json(full_data);
					

				var _replace		=	[
				            		 	 	title,
				            		 	 	active,
				            		 	 	report_id,
				            		 	 	tag_editable,
				            		 	 	encode_full
				            		 	 ];
				
				var html			=	str_replace(htmlABAReplace, _replace, htmlABA);
				
					
					
					tagABA.find('.'+report_id).remove();
					
					tagABA.append(html);
					
					//Controle para manter as alterações nas abas
				//	tagABA.find('.'+report_id).data(abaData,getElement);
					
					tagABA.find('.'+tag_aba_empty).removeClass(tag_aba_empty);
					if(empty(_report_id) || _report_id==classIDName)
					{
						tagABA.find('.'+report_id).addClass(tag_aba_empty);
					}
					
					tagABA.find('.icon-remove-aba').unbind('click').click(event_remove_btn_close);
					
					if( _report_id!=classIDName)
					{
						tagABA.find('.'+classIDName).remove();
					}
					
					//Gravando informações das abas na tela 
					if(!empty(data))
					{
						tagABA.find('.'+report_id).data(abaData,data).data(aba_full_data,_full_data);
					}	
					
					event_span_editable();
					
					return {'report_id':report_id, 'title':title};
			}
			
			
			
			
			
			
			/*
			 * Funções
			 */
			
		   /*
			* Iniciando o processo de construção das abas
			*/
			var __init		=	 function(options)
			{
					/*
					 * TODO: Remove classIDName
					 */
					add_aba_html('',classIDName,true,true);					
					btn_add_new_aba();
					tagABA.find('.active').trigger('click');
			}
			
			
			
			/*
			 * Removendo a aba
			 */
			var __remove	=	 function(options)
			{
				var optionsAba		=	{report_id:''};
				var	opts 			= 	$.extend( {}, optionsAba, options );
					tagABA.find('.'+opts.report_id).remove();
			}
			
			
			
			/**
			 * Adicionando uma nova aba ou apenas atualizando a sua estrutura
			 */
			var __add_new_aba		=	 function(options)
			{
				TRACE_DEBUG('Adicionarndo ABAS desativado');
				/*
				var optionsAba		=	{title:'',report_id:'',active:false};
				var	opts 			= 	$.extend( {}, optionsAba, options );
					tagABA.find('.'+tag_aba_empty).remove();
				
					//console.log('opts',opts);
				
				var aba_request	=	add_aba_html(opts.title, opts.report_id,opts.active,true);
					btn_add_new_aba();
//					tagABA.find('.active').trigger('click');
					

				var get_info	=	create_new_default(aba_request.report_id,aba_request.title);
					
				TRACE_DEBUG(aba_request.report_id);
					tagABA.find('.'+aba_request.report_id).attr('wrsparam',base64_json(get_info));
					*/
			}
			
			
			
			/**
			 * Faz a interceptação dos Eventos da Janela do evento default e efetua o refresh da aba
			 */
			var __refresh			=	 function(opts)
			{
				
				
				var REPORT_ID	=	opts.REPORT_ID;
				
					if(empty(REPORT_ID)) return false;
				
				var _ABA	=	tagABA.find('.'+REPORT_ID);
				
					if(_ABA.length==0)
					{
						//Se não existir aba então cria uma
						__load_multiple([opts]);
					}else{
						var _box		=	 $('.'+REPORT_ID+'BOX');
						var _title		=	_box.find('.report_title');
						
						_title.attr('id-tag',REPORT_ID).each(function(){
									activeKeyPress($(this));
								});
					
					}
				
				

			}

			
			
			var __load_multiple		=	 function(options,noactive)
			{
					var _noactive	= false;
					

					if(!empty(noactive)) _noactive = noactive;
					
					if(empty(options)) return false;
					
					var _report_id		=	'';
					
					
					tagABA.find('.'+tag_aba_empty).each(function(){$(this).remove();});

					var _object_open		=	[];
					var _kenoUiWindow		=	[];
					var _kendoUiLast		=	[];
					
					for(var lineOptions	=0 ; lineOptions	<	options.length ;lineOptions++)
						{
						
								var optionsAba		=	{
															LAYOUT_ROWS			:[],
															LAYOUT_COLUMNS		:[],
															LAYOUT_MEASURES		:[],
															LAYOUT_FILTERS		:[],
															KendoUi				:[],
															FILTER_TMP			:""
														};
						
								var	opts 			= 	$.extend( {}, optionsAba, options[lineOptions]);
								var _active			=	true;
								var kendoUi			=	json_decode(base64_decode(opts.KendoUi));
								
								
								if(empty(kendoUi)) continue;
								if(empty(_report_id))	_report_id	=	kendoUi['REPORT_ID'];
								
								
								_kenoUiWindow[kendoUi['REPORT_ID']]	=	kendoUi;
								_kendoUiLast						=	kendoUi;
								
								_object_open	=	opts;
								
									add_aba_html(	kendoUi['TITLE_ABA'], 
											kendoUi['REPORT_ID'],
													_active,
													true,
													false,
													opts.KendoUi,
													opts);
						}
					
					
					
					btn_add_new_aba();
					
					
					
					//$(this).data('WINDOW');
					
					
					for(var lineKendoUi in _kenoUiWindow)
						{
							tagABA.find('.'+lineKendoUi).data('WINDOW',_kenoUiWindow[lineKendoUi]);
						}
					
					
					$('#wrsConfigGridDefault').data('wrsConfigGridDefault',_kendoUiLast);
					
					var optionsAba		=	optionsDataConvert(_object_open);

							open_configure_default(optionsAba);
					
					

					$('.NAV_CONFIG_WRS').attr('is-event',true);
					
					if(empty(_report_id)) return false;
					tagABA.find('.'+_report_id).trigger('click');
					
					
					if(_noactive)
						{
							wrsRunFilter();
						}
			}
			
			
			var __aba_title	= function(options)
			{
				
				var _opts			=	{report_id:''};
				var	opts 			= 	$.extend( {}, _opts, options);
				
				return tagABA.find('.'+opts.report_id).find('.title').html();
			}
			
			var __show_grid		=	 function()
			{
				
				
				var report_id	=	 '#'+tagABA.find('.active').attr('id-aba');
				var _main		=	report_id+'Main';
				
				$('.container_panel_relatorio_rows').addClass('hide');
				
				
				$(_main).removeClass('hide');
				$(report_id).WRSWindowGridEventTools()
				
				
			}
			
			
			/*
			 * Metodos de funções
			 * formas de chamadas externas
			 */
			var methods = 
			{
			        init 					: 	__init,
			        add_new_aba				:	__add_new_aba,
			        remove					:	__remove,
			        refresh					:	__refresh,
			        load_multiple			:	__load_multiple,
			        aba_title				:	__aba_title,
			        show_grid				:	__show_grid
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
		}// END $.fn.wrsAbas = function(methodOrOptions)
		
		
	 	
}( jQuery ));


$(function(){$(ABA_TAG_NAME).wrsAbas({})})