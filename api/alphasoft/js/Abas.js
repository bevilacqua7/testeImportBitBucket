
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
	
}







function get_aba_active_kendoUi(get_id)
{
	_START('get_aba_active_kendoUi');
	var event		=	null;
	if(get_id!=undefined && get_id!=null)
	{
		event	=	$(chIClass(get_id));
	}else{
		event	=	$('.WRS_ABA').find('.active');
	}
	_END('get_aba_active_kendoUi');
	
	return event.wrsAbaData('getKendoUi');
}

function get_aba_active()
{
	_ONLY('get_aba_active');
	return get_aba_active_object().wrsAbaData('getData');
}



function get_aba_active_wrs_param()
{
	
	_ONLY('get_aba_active_wrs_param');
	return get_aba_active_object().wrsAbaData('getWrsData');
	
}

function get_aba_active_kendoUi()
{
	_ONLY('get_aba_active_kendoUi');
	return get_aba_active_object().wrsAbaData('getKendoUi');	
}

function get_aba_active_object()
{
	_ONLY('get_aba_active_object');
	return $('.WRS_ABA').find('.active');
	
}



function trace_change_kendo(kendoUi)
{
	console.log('trace_change_kendo',kendoUi);
}



function optionsDataConvert(gridValue,with_decode)
{
	_START('optionsDataConvert');
	if(with_decode)
	{
		var optionsAba		=	{
				LAYOUT_ROWS			:	filter_array_convert(gridValue['LAYOUT_ROWS']),
				LAYOUT_COLUMNS		:	filter_array_convert(gridValue['LAYOUT_COLUMNS']),
				LAYOUT_MEASURES		:	filter_array_convert(gridValue['LAYOUT_MEASURES']),
				LAYOUT_FILTERS		:	filter_TMP_to_array(gridValue['FILTER_TMP'])
			};
		
	}else{
		var optionsAba		=	{
				LAYOUT_ROWS			:	filter_array_convert(base64_decode(gridValue['LAYOUT_ROWS'])),
				LAYOUT_COLUMNS		:	filter_array_convert(base64_decode(gridValue['LAYOUT_COLUMNS'])),
				LAYOUT_MEASURES		:	filter_array_convert(base64_decode(gridValue['LAYOUT_MEASURES'])),
				LAYOUT_FILTERS		:	filter_TMP_to_array(getJsonDecodeBase64(gridValue['FILTER_TMP']))
			};
	}
	
	_END('optionsDataConvert');
	return optionsAba;
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
			var htmlABA			=	'<li class="{active} {IDaba}" id-aba="{IDaba}" ><a href="#"><span class="title"  >{li}</span><span class="icon-remove-aba glyphicon glyphicon-remove"></span></a></li>';
			var htmlABAReplace	=	['{li}','{active}','{IDaba}','{editable}'];
			
			/*
			 * Abria a tela de configuração mas nula
			 */
			var open_configure_default		=	 function(options)
			{
				_START('wrsAbas::open_configure_default');
				
				var optionsAba		=	{
											LAYOUT_ROWS			:[],
											LAYOUT_COLUMNS		:[],
											LAYOUT_MEASURES		:[],
											LAYOUT_FILTERS		:[]
										};
				var	opts 			= 	$.extend( {}, optionsAba, options );
				
				
					set_value_box_relatorio(opts);
					filter_configure_window();
			
					_END('wrsAbas::open_configure_default');
			}
			
			
			
			var ResizeABA		=	 function()
			{
				
				var _width		=	 0;
				
				$('.WRS_ABA').find('li').each(function()
				{
					_width+=$(this).outerWidth()+2;
					
				});
				
				$('.WRS_ABA ul').width(_width+20);
				
			}
			
			
			
			var __remove_event_click		=	 function()
			{
				_START('wrsAbas::__remove_event_click');
				tagABA.find('.active').removeAttr('is_load');
				_END('wrsAbas::__remove_event_click');
			}
			
			
			//Contem o evento do filtro a ser manipulado
			var __manager_vision_grid_edit		=	 function(event,report_id,noactive,_isLoad)
			{

				_START('wrsAbas::__manager_vision_grid_edit');
					var _filter			=	$('.wrs_run_filter');
					var history			=	$('.WRS_ABA').find('.active').wrsAbaData('getHistory');
					var _report_id_h	=	'';
					var is_load			=	event.attr('is_load');
					
						is_load			=	empty(is_load) ? false : true;
						var _box_container	=	$('.container_panel_relatorio').find('.'+report_id+'BOX');
						
						_filter.attr('manager_aba','true');
			
						if(!empty(history))
						{
							_report_id_h	=	 base64_decode(history.REPORT_ID);
						}
						
						
						if(_box_container.length==0 && !_isLoad)
							{
								if(wrs_panel_layout)
								{
									wrs_panel_layout.open('east');
								}
							}
						
						
						/*
						 * Verifica se a aba clicada esta no proceço de JOB
						 * caso sim 
						 * para o o evento de click e reorna a função
						 */
						if(_isLoad)
							{
									//$('.container_panel_relatorio_rows').addClass('hide'); //remove-by Santos
									$('.container_panel_relatorio').show();
									$('.wrs_panel_filter_measure').hide();
									
									$(window).resize();		
									resize_container_grid(report_id);
								return true;
								
							}else{
								$('.wrs_panel_filter_measure').show();
							}

						if(is_load==true) 
						{
							return true;
						}
						
						
						if(!noactive)
						{
							
							event.attr('is_load','true');
						}
						
						

						if(!_isLoad)
						{
								if(_report_id_h!=report_id)
								{
									if(!noactive){
										if(wrs_panel_layout) {
											//Faz o evento do click quando não existir relatório ainda
											layout_east_close(false, _isLoad);
										//	wrs_panel_layout.close('east');
										}
									}
								}else{
									__remove_event_click();
								}
						}
						else
						{
							__remove_event_click();

							$('.wrs_run_filter').attr('status_load','true');
						}
						
					
						
						$(window).resize();		
						resize_container_grid(report_id);
						
						_END('wrsAbas::__manager_vision_grid_edit');
			}
			
			
			
			/*
			 * Criando uma nobva aba de configurações defaults 
			 * carrega a Janela para DRAG and DROP nula
			 */
			var create_new_default					=	 function(id_report,title)
			{
				_START('wrsAbas::create_new_default');
				var getElement						=	{};
				
					getElement['REPORT_ID']			=	id_report;
					getElement['TITLE_ABA']			=	title;
					getElement['SUMARIZA']			=	1;
					getElement['COLORS_LINE']		=	1;


					WRS_clean_filter();
					_END('wrsAbas::create_new_default');
					return getElement;
			}
			
			
			
			
			var multiple_cube		=	 function()
			{
				_START('wrsAbas::multiple_cube');
				var _wrs_multiple_cube_event	=	$('.wrs_multiple_cube_event').find('option').length;
				
				//Verificando se existe multiplos cubos
				if(_wrs_multiple_cube_event==1 || _wrs_multiple_cube_event==0)
				{	
					_END('wrsAbas::multiple_cube');
					return null;
				}
				else
				{
					var jsonMukltiple			=	getJsonDecodeBase64($('.wrs_multiple_cube_event').find('option:selected').attr('json'));
					
					_END('wrsAbas::multiple_cube');
					
					return jsonMukltiple['CUBE_ID'];
				}
				
				_END('wrsAbas::multiple_cube');
				return null;
				
				
			}
			
			
			
			
			var btn_add_new_aba	=	 function()
			{
				_START('wrsAbas::btn_add_new_aba');
				var className				=	'new_file';
				var htmlABA					=	'<li class="'+className+'" ><a href="#"><i class="fa fa-file-text"></i></a></li>';

				var _click_btn_new_aba		=	 function()
					{
							var aba_active		=	tagABA.find('.active');
								save_info_aba_current(aba_active);

								
										var getElement						=	{};	
											getElement['TITLE_ABA']			=	__new_name_aba();
											getElement['REPORT_ID']			=	generateReportId();
											getElement['SUMARIZA']			=	1;
 											getElement['COLORS_LINE']		=	1;
											getElement['MULTIPLE_CUBE_ID']		=	multiple_cube(); //Atualização
											var optionsAba		=	{
																		LAYOUT_ROWS			:base64_json({}),
																		LAYOUT_COLUMNS		:base64_json({}),
																		LAYOUT_MEASURES		:base64_json({}),
																		LAYOUT_FILTERS		:base64_json({}),
																		KendoUi				:base64_json(getElement),
																		FILTER_TMP			:""
																	};//Atualização
											
											__load_multiple([optionsAba]);
								btn_add_new_aba();	
					}
					tagABA.find('.'+className).remove();
					tagABA.append(htmlABA);
					tagABA.find('.'+className).unbind('click').click(_click_btn_new_aba);
					
					_END('wrsAbas::btn_add_new_aba');
			}
			/**
			 * Apenas gera o Report ID
			 */
			var generateReportId		=	 function ()
			{
				var aba_name	=	 'ABA_'+js_rand(0,99999999999999);
				_ONLY('generateReportId');
					return aba_name;
			}
			
			
			
			
			var saveKendoGridData	=	 function()
			{
				_START('wrsAbas::saveKendoGridData');
				/*
				 * Ao clicar em mudança de aba
				 * Eu mantenho a estrutura oficial da aba original
				 */
					var currentABA		=	$('.wrsGrid').attr('id');
					var kendoUiGrid		=	$('#'+currentABA).data('kendoGrid');
					
					if(empty(kendoUiGrid)) {
						_END('wrsAbas::saveKendoGridData');
						return false;
					}
					
						tagABA.find('.'+currentABA).data(kendoUiDataAba,kendoUiGrid);
					
						_END('wrsAbas::saveKendoGridData');
						
			}
			
			
			/*
			 * Salvando alterações na aba corrente
			 */
			var save_info_aba_current		=	 function(_aba_active)
			{
				
				_START('wrsAbas::save_info_aba_current');
				
				if(_aba_active.length==0) return true;
				
				var aba_active			=	 _aba_active;
				
				 
				try{
						if(_aba_active.wrsAbaData('getKendoUi').new_aba==true)
							{
								_aba_active.wrsAbaData('setKendoUi',{new_aba:false});
								return true;
							}
				}catch(e){}
				
				
				//habilita a janela
				var _filter_hide=activeToGetAllFilters();
					
				
				var report_id			=	'.'+aba_active.attr('id-aba');
				var IDGrid				=	'#'+aba_active.attr('id-aba');
				var isGrid				=	 false;		
				var isIDGrid			=	false;
				
					aba_active.each(function(){
						isGrid	=	true;
					});
					
					
					$(IDGrid).each(function(){
						isIDGrid	=	true;
					});
				
 				
				var _param_request	=	$(report_id).wrsAbaData('getWrsData');
				
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
					
					aba_active.wrsAbaData('setWrsData',_param_request);
					
					//Ativa para não executar a grid se existir alterações
					aba_active.wrsAbaData('setKendoUi',{STOP_RUN:true});
					
					//Desabilita a janela
					activeToGetAllFiltersRecover(_filter_hide);
					
					_END('wrsAbas::save_info_aba_current');
				
			}
			
			var multiple_cube_active		=	 function(kendoUi)
			{
				_START('wrsAbas::multiple_cube_active');
				
				var kendoObject						=	kendoUi;	
				var multiple_cube_id				=	null;	
				var wrs_multiple_cube_event_class	=	$('.wrs_multiple_cube_event');
				

				try{
					multiple_cube_id		=	kendoObject['MULTIPLE_CUBE_ID'];
					
					if(multiple_cube_id!=null || multiple_cube_id!='' || multiple_cube_id!=undefined)
					{
					//	TRACE_DEBUG('send click');
						
						
						if(wrs_multiple_cube_event_class.find('option:selected').val() != multiple_cube_id)
							{
							//	multiple_cube_no_change();
								multiple_cube_status_change();

								var index		=	wrs_multiple_cube_event_class.find('option[value="'+multiple_cube_id+'"]').index();
									wrs_multiple_cube_event_class.find('li:eq('+index+')').find('a').trigger('click');
							}
					}
					
				}catch(e){
					multiple_cube_id	=			null;	
				}
				
				_END('wrsAbas::multiple_cube_active');

			}
			
			/**
			 * Evento do click da ABA 
			 * para abrir a estrutura da aba
			 */
			var dblclick_open_aba		=	 function()
			{
				_START('wrsAbas::dblclick_open_aba');
					
				var only_aba		=	false;
				var IDMain			=	"";
				var hasDefault		=	$('.wrs_panel_filter_measure').is(':hidden');
				var _report_id		=	$(this).attr('id-aba');
				var IDCurrent		=	'#'+_report_id;
				
				var current		=	 $(IDCurrent+'Main');

				/*
				 * Garante que se a Aba estiver ativa não permita o clicque
				 */
				if(current.length) 
				{
					if(!current.hasClass('hide'))
					{
						_END('wrsAbas::dblclick_open_aba');
						return true;
					}
				}
				
				
				wrsConfigGridDefaultManagerTopOptions();
				
				var aba_active		=	tagABA.find('.active');
				

				if(aba_active!=undefined){
					aba_active.removeClass('active');
					aba_active.wrsAbaData('set_change_aba',true);
				}
					
				//Tultimo carregado
				var last_active		=	$('#'+aba_active.attr('id-aba')+'Main')	;				
				
				if(last_active.length>0)
				{
					last_active.addClass('hide');
				}
				
					
				var noactive		=	$('.wrs_run_filter').attr('noactive');
					noactive		=	empty(noactive) ? false : true;''
				
					wrs_run_filter_unlocked();
				

				var _isLoad			=	 job_exist(_report_id);				
				var data_array_aba	=	$(this).wrsAbaData('getData');				
				var gridValue		=	$(this).wrsAbaData('getKendoUi');
							

				//Informa qual sera a Ativa no momento	
				$('body').managerJOB('setActiveAba',{report_id:_report_id});
				
					save_info_aba_current(aba_active);
				
					$(this).addClass('active');
					
					var wrsConfigGridDefault		=	$('#wrsConfigGridDefault').data({}); //Zera a estrutura inicial
					
					$('.wrsGrid').removeClass('wrsGrid');
					$('.NAV_CONFIG_WRS').attr('id-tag',$(this).attr('id-aba')).find('.report_title').html($(this).find('.title').html());

					
				//Pegando os dados salvo nessa aba
				var aba_data			=	data_array_aba.data.LAYOUT_MEASURES;
					
				//Ainda não existe estrutura na ABA
				if(empty(aba_data))
				{
						if(hasDefault==true)
						{
							open_configure_default();
							__manager_vision_grid_edit($(this),_report_id,noactive,_isLoad);
							//$(window).resize();
							_END('wrsAbas::dblclick_open_aba');
							return true;
						}
				}

				
				
				var isGrid			=	false;
					
					
				
				
					$(IDMain).each(function(){
						isGrid	=	 true;
					});
					

					
					if(hasDefault==false)
					{
						only_aba		=	 true;
					}else{
						
						
						$(IDCurrent).each(function(){
							isGrid	=	 true;
						});
						
						
						if(!isGrid)
						{
							if(!_isLoad){
								wrs_panel_layout.open('east');
							}
						}
						
					}
				


				
				var _kendoUiDataAba	=	$(this).data(kendoUiDataAba);
				
					if(hasDefault==true)
					{
						isGrid		=	true;
						only_aba	=	true;
					}
				
					var optionsAba		=	optionsDataConvert(data_array_aba.data);
					
					open_configure_default(optionsAba);
				
					//Verificando se existe multiplos cubos para serem ativados
					multiple_cube_active(gridValue);
					multiple_cube_status_change(false);
					
					$(IDCurrent).addClass('wrsGrid');
					
					$('.container_panel_relatorio_rows').addClass('hide'); //Remove-by Santos
					
					if(hasDefault==true && isGrid==true)
					{
						$(IDCurrent+'Main').removeClass('hide');
					}

					$('.NAV_CONFIG_WRS').attr('is-event',true).attr('aba-change',true);

					__manager_vision_grid_edit($(this),_report_id,noactive,_isLoad);
					
					_END('wrsAbas::dblclick_open_aba');
			}
			
			
			
			
			
			
			
			
			
			
			
			
		 
			
			var title_is_time			=	null;
			
			var activeKeyPress		=	 function(event)
			{
				_START('wrsAbas::activeKeyPress');
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
						

						var title					=	$(this).html();
						var _report_id_new			=	'';
						var abaJquery				=	$('.'+getID);
						
						
					
						
						
					
						
						
						
							//Se estiver vazio inicia a verificação do time
							if($.trim(title)=='')
							{
								clearTimeout(title_is_time);
								
								var is_title_empty = {
										  that    		: 	$(this),
										  title			:	abaJquery.find('.title'),
										  element		:	abaJquery,
										  resize		: 	function( event ) 
										  {
											  if($.trim($(this.that).html())=='')
												  {
												  	var _title		=	__new_name_aba();
												  	this.that.html(_title);
												  	this.title.html(_title);
												  	this.element.wrsAbaData('setKendoUi',{TITLE_ABA:_title});
												  	WRS_ALERT(LNG('ABA_TITLE_EMPTY'),'warning');
												  }
											  
											  		clearTimeout(title_is_time);
										  }
										};
								
								var time_out 	= $.proxy( is_title_empty.resize, is_title_empty );
								
								
								title_is_time		=	setTimeout(time_out,1000*2);
								
							}
							 
						
						
							
							if(empty(getID))
							{
								getID	=	_report_id_new	=	generateReportId();
								$(this).attr('id-tag',_report_id_new);												
								$('.wrsAbaNew').attr('id-aba',_report_id_new).addClass(_report_id_new).removeClass('wrsAbaNew');
							}else{
								abaJquery.wrsAbaData('setKendoUi',{TITLE_ABA:title});
							}

							abaJquery.find('.title').html(title);
							


				});
				
				_END('wrsAbas::activeKeyPress');
			}
			
			
			
			
			
			/*
			 * 
			 * @link http://stackoverflow.com/questions/2441565/how-do-i-make-a-div-element-editable-like-a-textarea-when-i-click-it
			 */
			var event_span_editable	=	 function()
			{
				_START('wrsAbas::event_span_editable');
				
				$('.CONTROL_TITLE_EDIT').each(function()
				{
					
					var _title		=	$(this).find('.report_title');
					var id_tag		=	$(this).attr('id-tag');
					
					_title.attr('id-tag',id_tag).each(function(){
								activeKeyPress($(this));
							});
				});
				tagABA.find('li').unbind('click').click(dblclick_open_aba);
				
				_END('wrsAbas::event_span_editable');
			}
			
			
			
			
			var event_remove_btn_close	=	 function()
			{
				_START('wrsAbas::event_remove_btn_close');
				
				var _report_id	=	$(this).parent().parent().attr('id-aba');
				var size_li		=	tagABA.find('li').length;
				var next_id		=	$('.'+_report_id).next();
				var kendoUi		=	get_aba_active_kendoUi();
				
				
				if($('.'+_report_id).next().attr('class')=='new_file')
				{
					next_id	=	$('.WRS_ABA li').eq($('.'+_report_id).index()-1);
				}
				
				//Envia o comando para remover o Histótico
				var _param_request		=	{
					cube_s			:	CUBE_S,
					report_id		:	_report_id
				};
				

				var _file	=	'WRS_PANEL';
				var _class	=	'WRS_PANEL';
				var _event	=	'remove_history';

				
				//Remove o report ID
				runCall(_param_request,_file,_class,_event,null,'modal');
				//Histórico removido
				
				
				if(size_li==2)
				{
					WRS_ALERT(sprintf(LNG('ABA_LIMIT_SEE'),__aba_title({report_id:_report_id})),'warning');
					return true;
				}
				
					
					$('body').managerJOB('remove_aba_cancel_job',{'report_id':_report_id});

				
				__remove({'report_id':_report_id});
				
					
				if($('.WRS_ABA .active').length==0)
				{
					$('.'+next_id.attr('id-aba')).trigger('click');
				}
				
				
				if(kendoUi['REPORT_ID']!=next_id.attr('id-aba'))
				{
					$('.'+next_id.attr('id-aba')).trigger('click');
				}
					
				
				
				
						
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
				var is_direct		=	 false;
				
				var getElement				=	[];	
					getElement['TITLE_ABA']	=	title;
					getElement['REPORT_ID']	=	report_id;
				
				
				try{
					if(_full_data['load_direct']==true) is_direct=false;
				}catch(e){
					is_direct	=	 false;
				}
					
					//se o report vier nulo então é criado um novo report
					if(empty($.trim(_report_id)) || _report_id==classIDName)
					{
							report_id				=	generateReportId();
							//GRavando o title da nova aba
							$(this).attr('id-tag',report_id);
							$('.'+report_id).wrsAbaData('setKendoUi',{REPORT_ID:report_id});
							$('.NAV_CONFIG_WRS').attr('is-event',true).attr('id-tag',report_id).find('.report_title').html(title);

							
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
				            		 	 	tag_editable
				            		 	 ];
				
				var html			=	str_replace(htmlABAReplace, _replace, htmlABA);
				
					
				var get_aba_current		=	tagABA.find('.'+report_id);
				var before_insert			=	get_aba_current.next('li');
					
				
				
					
					get_aba_current.remove();
					
					
					if(is_direct==false)
					{
							if(empty(before_insert.attr('class'))){
								tagABA.append(html);
							}else{
								before_insert.before(html);
							}
					}
					
					//Controle para manter as alterações nas abas
					
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
						var _change_elements	=	_full_data;
						
						var kendoUiTools	=	_full_data['KendoUi'];
						
						delete _change_elements.KendoUi;
						
						var _reportDetails		=	{};
						
						try
						{
							_reportDetails	=	_full_data['reportDetails'];
						}
						catch(e)
						{
							_reportDetails	=	{};
						}
						

						var aba_data	=	{
								kendoUi			:	getJsonDecodeBase64(kendoUiTools), 
								data			:	_change_elements,
								kendoGrid		:	{},
								reportDetails	:	_reportDetails
						};
			
						
						aba_data.kendoUi['new_aba']	=	true;
						
						$('.'+report_id).wrsAbaData(aba_data);
						
						
						title		=	aba_data.kendoUi.TITLE_ABA;
						report_id	=	aba_data.kendoUi.REPORT_ID;
						

			
			
					}	
					
					event_span_editable();
					
					
					ResizeABA();
					
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
				_START('wrsAbas::__init');
					btn_add_new_aba();
					tagABA.find('.new_file').trigger('click');
				_END('wrsAbas::__init');
				
			}
			
			
			
			/*
			 * Removendo a aba
			 */
			var __remove	=	 function(options)
			{
				_START('wrsAbas::__remove');
					
					tagABA.find('.'+options.report_id).remove();
					$('#'+options.report_id+'Main').remove();
					
					ResizeABA();
					
				_END('wrsAbas::__remove');
			}
			
			
			
			/**
			 * Adicionando uma nova aba ou apenas atualizando a sua estrutura
			 */
			var __add_new_aba		=	 function(options)
			{
				TRACE_DEBUG('Adicionarndo ABAS desativado');
				
			}
			
			
			
			/**
			 * Faz a interceptação dos Eventos da Janela do evento default e efetua o refresh da aba
			 */
			var __refresh			=	 function(opts)
			{
				_START('wrsAbas::__refresh');
				//base64_decode(opts.REPORT_ID)
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
					
					tagABA.find('.'+REPORT_ID).removeAttr('is_load');
					_END('wrsAbas::__refresh');
			}

			
			
			
			var __load_multiple		=	 function(options,noactive)
			{
				_START('wrsAbas::__load_multiple');
					var _noactive	= false;
					
					if(!empty(noactive)) _noactive = noactive;
					
					if(empty(options)) return false;
					
					
					var _report_id			=	'';
					var is_load_direct		=	false;
					var be_loaded			=	false;
					var aba_active			=	get_aba_active_kendoUi();
					var _report_id_active	=	aba_active.REPORT_ID;
					
					//tagABA.find('.'+tag_aba_empty).each(function(){$(this).remove();});
					// atualizacao do tratamento acima que nao funcionava
					$('.WRS_ABA ul li').each(function(){ if($(this).attr('class')==''){ $(this).remove(); } });

					var _object_open		=	[];
					var _kenoUiWindow		=	[];
					var _kendoUiLast		=	[];
					
					for(var lineOptions	=0 ; lineOptions	<	options.length ;lineOptions++)
						{
						
								var optionsAba		=	{
															LAYOUT_ROWS			:null,
															LAYOUT_COLUMNS		:null,
															LAYOUT_MEASURES		:null,
															LAYOUT_FILTERS		:null,
															KendoUi				:[],
															FILTER_TMP			:null
														};
								
								
								var	opts 			= 	options[lineOptions];
								var _active			=	true;
								var kendoUi			=	json_decode(base64_decode(opts.KendoUi));
									be_loaded			=	false;
									
									if(empty(kendoUi)) continue;
									
									if(empty(_report_id))	_report_id	=	kendoUi['REPORT_ID'];

									
									try{
										if(opts['load_direct']==true) is_load_direct= true;
									}catch(e){
										is_load_direct	= false;
									}
									

									
									if($('.'+kendoUi['REPORT_ID']).length>=1 && is_load_direct==false)
									{
								    	alertify.custom = alertify.extend("custom");
										alertify.custom(sprintf(LNG('ABA_BE_LOADED'),kendoUi['TITLE_ABA']));
										_report_id	=	'';
										be_loaded	=	 true;
										
										if(_report_id_active!=kendoUi['REPORT_ID']){											
											$('.'+kendoUi['REPORT_ID']).trigger('click');
										}
										
										continue;
									}
									 
									
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
					
					
					
					if(be_loaded) return true;
					
					btn_add_new_aba();
					
					
					var optionsAba		=	optionsDataConvert(_object_open);

					
							open_configure_default(optionsAba);
					
					

					$('.NAV_CONFIG_WRS').attr('is-event',true);
					
					if(empty(_report_id)) {
						_END('wrsAbas::__load_multiple');
						return false;
					}
					
					if(!_noactive)
					{
						$('.wrs_run_filter').attr('noactive','true');
					}
					
					
					var get_last_active	=	$('.WRS_ABA ul .active');

					if(is_load_direct==false)
					{
						tagABA.find('.'+_report_id).trigger('click');
					}else{
						wrsRunFilter();
					}
						
						
						get_last_active.wrsAbaData('set_change_aba',false);
					
					if(_noactive)
					{
						//wrsRunFilter();
					}else{//Opção apenas para quando for para abrir layout
						$('.wrs_run_filter').removeAttr('noactive');
					}
					
				 
					
					
				_END('wrsAbas::__load_multiple');	
			}
			
			
			var encode_to_aba_create			=	 function(_opts,_optsDefault)
			{
				_START('wrsAbas::encode_to_aba_create');
				var opts			=	_opts;
				var optsDefault		=	_optsDefault;
				var FILTER_TMP		=	[];
				

				
					optsDefault['KendoUi']	=	opts['KendoUi'];
					
				// construindo o reverso
				for(var lineOptions in opts)
					{
						
							var object_class			=	'';
							var is_filter				=	false;
							var key						=	'LEVEL_FULL';
							switch(lineOptions)
							{
								case 	'LAYOUT_FILTERS' 	:	is_filter	=	true;
								case 	'LAYOUT_ROWS'		:
								case 	'LAYOUT_COLUMNS'	:	object_class	=	'WRS_DRAG_DROP_ATTR'	;		break;
								case 	'LAYOUT_MEASURES'	:	{
																	key				=	'MEASURE_UNIQUE_NAME';
																	object_class	=	'WRS_DRAG_DROP_METRICA'	;		
																}; break;
								default						:	continue;
							}
						
							var s_opts		=	opts[lineOptions];
							
								for(var lineFull in s_opts)
									{
									
										var _tmp_opts		=	s_opts[lineFull];
										
										if(is_filter)
										{
											_tmp_opts		=	s_opts[lineFull][0];
											FILTER_TMP.push({'class':_tmp_opts, 'data': s_opts[lineFull][2].join(',')});
										}
										
										
										var _class			=	str_replace('__','',_tmp_opts);

										if(empty(_class)) continue;
										
										var object_param	=	$('.'+object_class).find('.wrs_panel_options').find('.'+_class);
										var _json			=	getJsonEncodeToElement(object_param);

										if(_json!=null)
										{
											optsDefault[lineOptions].push(_json[key]);
										}
									}
						
						
					}
				
				
					optsDefault['FILTER_TMP']	=	FILTER_TMP;

					
					for(var lineDefault in optsDefault)
						{
							
								if(!empty(optsDefault[lineDefault]))
								{
									var _data							=	optsDefault[lineDefault];
									
									
									switch(lineDefault)
									{
										case 	'LAYOUT_FILTERS' 	:	
										case 	'LAYOUT_ROWS'		:
										case 	'LAYOUT_COLUMNS'	:	
										case 	'LAYOUT_MEASURES'	:	 _data	=	_data.join(','); break;
										default	: _data	=	json_encode(_data,true); break;
									}
									
									   optsDefault[lineDefault]			=	"";
										optsDefault[lineDefault]		=	 base64_encode(_data);
									
								}else{
									optsDefault[lineDefault]	=	"";
								}
						
						}
					
					
					_END('wrsAbas::encode_to_aba_create');
					
					return optsDefault;
					
				
			}
			
			/*
			 * Função também faz parte do controle de Histórico
			 */
			var __refresh_F5		=	 function(options)
			{
				
				_START('wrsAbas::__refresh_F5');
				
						if(empty(options)) return false;
				
				
						var optionsAba		=	{
								LAYOUT_ROWS			:[],
								LAYOUT_COLUMNS		:[],
								LAYOUT_MEASURES		:[],
								LAYOUT_FILTERS		:[],
								KendoUi				:[],
								FILTER_TMP			:""
							};
				
						var	opts 				= 	$.extend( {}, optionsAba, options);
						var	opts_encode			=	encode_to_aba_create(opts,optionsAba);
						
						try{
							opts_encode['load_direct']	=	options['load_direct'];
						}catch(e){
							_ONLY('load_direct history');
						}
						
						__load_multiple([opts_encode],true);
						
					_END('wrsAbas::__refresh_F5');	
			}
			
			
			
			
			
			
			var __aba_title	= function(options)
			{
				
				_START('wrsAbas::__aba_title');
				var _opts			=	{report_id:''};
				var	opts 			= 	$.extend( {}, _opts, options);
				
				_END('wrsAbas::__aba_title');
				return tagABA.find('.'+opts.report_id).find('.title').html();
			}
			
			
			
			
			var __show_grid		=	 function()
			{
				
				
				var report_id	=	 '#'+tagABA.find('.active').attr('id-aba');
				var _main		=	report_id+'Main';
				

			//	$('.container_panel_relatorio_rows').addClass('hide'); //Remove -By Santos
				
				find_and_hide_container(report_id);
				
				
				$(_main).removeClass('hide');
				//$(report_id).WRSWindowGridEventTools()
				
				
			}
			
			
			
			
			var slice_top		=	 function (input)
			{
				var input_tmp	=	 [];
				for(var lineInput in input)
				{
					if(lineInput!=0){
						input_tmp.push(input[lineInput]);
					}
				}
				return input_tmp;
			}

			
			
			var __auto_load		=	 function (inputBase64,event)
			{
				_START('wrsAbas::__show_grid');
				var aba_active	=	 tagABA.find('.active');
				
				
				if(empty(inputBase64)) return false;
				
				var input		=	 getJsonDecodeBase64(inputBase64);

				
				
					if(input.length!=0)
					{
						__load_multiple(input,AUTO_LOAD_RUN);
						
						$('.wrs_run_filter').data('auto_load_data',base64_encode(json_encode(slice_top(input))));
						$('.wrs_run_filter').attr('auto_load','true');
						
					
					}else{
						$('.wrs_run_filter').removeAttr('auto_load');
						$('.wrs_run_filter').data('auto_load_data','');
					}
					
					
					//Remove a aba em branco ou aque não tiver linhas
					if(aba_active.wrsAbaData('getWrsData').LAYOUT_ROWS=='e30=')
						{
							aba_active.find('.icon-remove-aba').trigger('click');
						}
					
					_END('wrsAbas::__show_grid');
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
			        show_grid				:	__show_grid,
			        remove_event_click		:	__remove_event_click,
			        refresh_F5				:	__refresh_F5,
			        auto_load				:	__auto_load
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
		
		
	 	
		
		
		
		
		
		
		
		/*
		 * Mudança da estrutura da aba
		 */
		$.fn.wrsAbaData = function(methodOrOptions) 
		{
	
			var that			=	 this;
			var wrsDataName		=	'wrs_aba_data';
			var data_global		=	this.data(wrsDataName);
			
			
			/*
			 * Carga inicial
			 */
			var __init		=	 function(options)
			{
				_START('wrsAbaData::__init');
				var base		=	{
										kendoUi			:	{}, 
										data			:	{},
										kendoGrid		:	{},
										reportDetails	:	{},
										history			:	null,
										first_line_total:	{}, 
										change_aba		:	false,
										enable_change	:	false	 //Habilita para iniciar a detectar se existe modificações no sistema
									};
				
				
				var data_option	=	merge_objeto(base,options);
				
					that.data(wrsDataName,data_option);
					
				_END('wrsAbaData::__init');
				return data_option;
			}
			
			
			
			/**
			 * Informa ao sistema de 
			 */
			var __setEnableChange	=	 function(change)
			{
				
				if(data_global==undefined) return false;
				data_global.enable_change		=	change;
				that.data(wrsDataName,data_global);				
				
			}
			
			
			/**
			 * Retorna uma flag informando que já existe modificações
			 */
			var __getEnableChange	=	 function()
			{
				
				if(data_global==undefined) return false;
				
				return data_global.enable_change;
				
			}
			
			
			/**
			 * Verificando se existe modificações
			 * @returns {Boolean}
			 */
			function __aba_detect_change()
			{
				
				if(data_global==undefined)  return false;
				
				
				if(data_global.enable_change==false) 
				{
					__setEnableChange(true);	
					return false;
				}
				
				var kendoUi				=	data_global.kendoUi
				var report_id			=	kendoUi.REPORT_ID;
				
				var html				=	'<i class="wrs_is_change_aba fa fa-asterisk"></i>  ';
				
				if(that.find('.wrs_is_change_aba').length==0)
				{
					that.find('a').prepend(html);
					
				}
				
				
			}
			
			
			
			
			function __remove_asterisk()
			{
				that.find('.wrs_is_change_aba').remove();
				__setEnableChange(true);
			}

			
		 
			
			
			/*
			 * Alterando apenas um dos dados da estrutura da aba
			 * ou kendoUi -> que contem as informações para a estrutura da grid
			 * data que contem a estrutura do wrs
			 */
			var __change		=	 function(options)
			{
				_START('wrsAbaData::__change');
				var base		=	{key:{}, data:{}};
				var data_option	=	merge_objeto(base,options);
				
					data_global[data_option.key]	=	data_option.data;
				
				that.data(wrsDataName,data_global);
				
				_END('wrsAbaData::__change');
			}
			
			var set_input_poolin		=	 function(input,key)
			{
				_START('wrsAbaData::set_input_poolin');
				for(var lineInput in input)
				{
					data_global[key][lineInput]	=	input[lineInput];
				}
			
				that.data(wrsDataName,data_global);
				_END('wrsAbaData::set_input_poolin');
			}
			
			/**
			 * Adicionando elementos ao KendoUI da Estrutura da ABA
			 */
			var __setKendoUi	=	 function(input)
			{
				
				if(data_global==undefined || data_global==null)
					{
						console.error('data_global nãoi foi definido ainda data_Error:',input);
						return false;
					}
				_ONLY('wrsAbaData::__setKendoUi');
				set_input_poolin(input,'kendoUi');
			}
			
			
			
			/**
			 * Adicionando elementos ao KendoUI da Estrutura da ABA
			 */
			var __setKendoUiGrid	=	 function(input)
			{
				_ONLY('wrsAbaData::__setKendoUiGrid');
					set_input_poolin(input,'kendoGrid');
			}
			
			/**
			 * Adicionando elemento ao data da estrutura da ABA
			 */
			var __setWrsData	=	 function(input)
			{
				_ONLY('wrsAbaData::__setWrsData');
				set_input_poolin(input,'data');
			}
			
			var  __getKendoUi	=	 function()
			{
//				_START('wrsAbaData::__getKendoUi');
				try{
					
					try{delete data_global.kendoUi.LAYOUT_COLUMNS; 	} catch(e){}
					try{delete data_global.kendoUi.LAYOUT_FILTERS;	} catch(e){}
					try{delete data_global.kendoUi.LAYOUT_MEASURES;	} catch(e){}
					try{delete data_global.kendoUi.LAYOUT_ROWS;		} catch(e){}
					try{delete data_global.kendoUi.FILTER_TMP;		} catch(e){}
					
					//_END('wrsAbaData::__getKendoUi');
					return data_global.kendoUi;
				}catch(e){
					//_END('wrsAbaData::__getKendoUi');
					return {SUMARIZA:1,COLORS_LINE:1};
				}
				
			}
			
			var  __getWrsData	=	 function()
			{
				_START('wrsAbaData::__getWrsData');
				if(data_global==undefined) {
					_END('wrsAbaData::__getWrsData');
					return undefined;
				}
				
				_END('wrsAbaData::__getWrsData');
				return data_global.data
			}
			
			
			var  __getData	=	 function()
			{
				_ONLY('wrsAbaData::__getData');
				return data_global;
			}
			
			var __getKendoGrid	=	 function()
			{
				_ONLY('wrsAbaData::__getKendoGrid');
				return data_global.kendoGrid;
			}
			
			
			var __setReportDetails	=	 function(input)
			{
				_ONLY('wrsAbaData::__setReportDetails');
					set_input_poolin(input,'reportDetails');
			}
			
			var __getReportDetails	=	 function()
			{
					_ONLY('wrsAbaData::__getReportDetails');
				return data_global.reportDetails;
			}
			
			var __setHistory	=	 function(input)
			{
				_START('wrsAbaData::__setHistory');
				data_global.history	=	input;
				
				that.data(wrsDataName,data_global);
				
				_END('wrsAbaData::__setHistory');
			}
			
			var __getHistory	=	 function()
			{
				_ONLY('wrsAbaData::__getHistory');
				return data_global.history;
			}
			
			var __getFirstLineTotal		=	 function()
			{
				_ONLY('wrsAbaData::__getFirstLineTotal');
				return data_global.first_line_total;
			}
			
			var __setFirstLineTotal		=	 function(input)
			{
				_START('wrsAbaData::__setFirstLineTotal');
				data_global.first_line_total		=	input;
				
				that.data(wrsDataName,data_global);
				
				_END('wrsAbaData::__setFirstLineTotal');
			}
			
			
			var __get_change_aba		=	 function()
			{
				_ONLY('wrsAbaData::__get_change_aba');
				return data_global.change_aba;	
			}
			
			var __set_change_aba		=	 function(input)
			{
				_ONLY('wrsAbaData::__set_change_aba');
				
				if(data_global==undefined) return false;
				
				data_global.change_aba	=	input;	
			}
			
			
			
			
			
			
			var methods = 
			{
			        init 				: 	__init,
			        change				: 	__change,
			        setKendoUi			:	__setKendoUi,
			        setWrsData			:	__setWrsData,
			        setKendoUiGrid		:	__setKendoUiGrid,
			        setReportDetails	:  	__setReportDetails,
			        setHistory			:	__setHistory,
			        setFirstLineTotal	:	__setFirstLineTotal,
			        set_change_aba		:	__set_change_aba,
			        setEnableChange		:	__setEnableChange,
				    getKendoUi			:	__getKendoUi,
			        getWrsData			:	__getWrsData,
			        getData				:	__getData,
			        getReportDetails	:  	__getReportDetails,
			        getKendoGrid		:	__getKendoGrid,
			        getHistory		 	:	__getHistory,
			        getFirstLineTotal	:	__getFirstLineTotal,
			        get_change_aba		:	__get_change_aba,
			        getEnableChange		:	__getEnableChange,
			        aba_detect_change	:	__aba_detect_change,
			        remove_asterisk		:	__remove_asterisk
			        
			};
			
				/*
				 * 
				 * Inicia a construção dos metodos
				 * 
				 */
				if ( methods[methodOrOptions] )
				{
						//console.error(methodOrOptions);
			            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			    }
				else if ( typeof methodOrOptions === 'object' || ! methodOrOptions )
				{
					//console.error('init');
			            // Default to "init"
			            return methods.init.apply( this, arguments );
			    }
			    else
			    {
			            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
			    }    	
		}// END $.fn.wrsAbas = function(methodOrOptions)
		
		
		
		
}( jQuery ));


$(function(){
	$(ABA_TAG_NAME).wrsAbas({});
	//$(ABA_TAG_NAME).wrsAbas('auto_load', AUTO_LOAD);
});
