/**
 * 
 * Compexo de criação e eventos de abas
 * 
 * Exemplos
 * @link http://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods
 * @link http://layout.jquery-dev.com/demos/simple.html
 */

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
			var htmlABA			=	'<li class="{active} {IDaba}" id-aba="{IDaba}"><a href="#"><span class="title"  >{li}</span><span class="icon-remove-aba glyphicon glyphicon-remove"></span></a></li>';
			var htmlABAReplace	=	['{li}','{active}','{IDaba}','{editable}'];
			
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
					$('.NAV_CONFIG_WRS').attr('is-event',true).data('wrsConfigGridDefault',getElement);
					WRS_clean_filter();
			}
			
			
			var btn_add_new_aba	=	 function()
			{
				var className				=	'new_file';
				var htmlABA					=	'<li class="'+className+'" ><a href="#"><i class="fa fa-file-text"></i></a></li>';

				var _click_btn_new_aba		=	 function()
					{
							var id_report	=	add_aba_html('','',true,true);		
							
								wrsConfigGridDefaultManagerTopOptionsLock();
							
								btn_add_new_aba();
								
								open_configure_default();
							
								wrs_panel_layout.open('east');
								
								create_new_default(id_report,tagABA.find('.'+tag_aba_empty).find('.title').html());	
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
			
			/**
			 * Evento do click da ABA 
			 * para abrir a estrutura da aba
			 */
			var dblclick_open_aba		=	 function()
			{
				
				wrsConfigGridDefaultManagerTopOptions();
				
				tagABA.find('.active').removeClass('active');
				$(this).addClass('active');
				
				
				$('.NAV_CONFIG_WRS').attr('id-tag',$(this).attr('id-aba')).find('.report_title').html($(this).find('.title').html());

				//Pegando os dados salvo nessa aba
				var aba_data			=	$(this).data(abaData);
					//Ainda não existe estrutura na ABA
					if(empty(aba_data))
					{
						open_configure_default();
						return true;
					}
					

				var idReport		=	aba_data['REPORT_ID'];	
				var IDMain			=	'#'+idReport;
				var gridValue		=	getJsonDecodeBase64($(IDMain).attr('wrsparam'));
				var isGrid			=	false;
				var _kendoUiDataAba	=	$(this).data(kendoUiDataAba);
				

				//Title configura new Aba
				
				
				//$(IDMain).data('kendoGrid', _kendoUiDataAba);
				
				
				$(IDMain).each(function(){
					isGrid	=	 true;
				});
				
				var optionsAba		=	{};
				
				if(!isGrid)
				{
				
					var full_data		=	$(this).data(aba_full_data);
					var filters_add		=	filter_TMP_to_array(full_data.filter_selected.full);
					 
					optionsAba			=	{
												LAYOUT_ROWS			:	full_data['LAYOUT_ROWS'],
												LAYOUT_COLUMNS		:	full_data['LAYOUT_COLUMNS'],
												LAYOUT_MEASURES		:	full_data['LAYOUT_MEASURES'],
												LAYOUT_FILTERS		:	filters_add
											};
					
					

					
				}else{
				
				
				var optionsAba		=	{
						LAYOUT_ROWS			:	filter_array_convert(base64_decode(gridValue['LAYOUT_ROWS'])),
						LAYOUT_COLUMNS		:	filter_array_convert(base64_decode(gridValue['LAYOUT_COLUMNS'])),
						LAYOUT_MEASURES		:	filter_array_convert(base64_decode(gridValue['LAYOUT_MEASURES'])),
						LAYOUT_FILTERS		:	filter_TMP_to_array(getJsonDecodeBase64(gridValue['FILTER_TMP']))
					};
				}
					open_configure_default(optionsAba);
					
					//Configura apenas o CSS
					WRS_filter_hide();
					
					
					$('.wrsGrid').removeClass('wrsGrid');
					$(IDMain).addClass('wrsGrid');
					$(IDMain+'Main').removeClass('hide');
					
					
					$('.NAV_CONFIG_WRS').attr('is-event',true).attr('aba-change',true).data('wrsConfigGridDefault',aba_data);
					
					
					//Executa o filtro
					if(!isGrid)
					{
						wrsRunFilter();
					}else{
							//WRSKendoUiChart(KendoUi,_onlyDefault,_start_modal) 
						
						var getKendoUi	=	getElementsWrsKendoUi($('#'+idReport));
						 
						//wrsKendoUiChange('#'+idName,'WINDOW',wrs_data);
							$('#'+idReport).WRSWindowGridEventTools(getKendoUi['WINDOW']); //Ativano os gráficos
					}
					
					
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
					
					
					//wrsConfigGridDefault
					
					
					
					_title.attr('id-tag',id_tag).each(function(){
						
								//Apenas evita o Enter
								$(this).unbind('keypress').keypress(function(event){
									var code = event.keyCode || event.which;
									if ( code == 13 ) return false;
								});
								
								$(this).unbind('keyup').keyup(function(event)
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
								
							});
					
					/*
					
					var _tagEditable	=	 'contenteditable';
						$(this).attr('edit',$(this).attr('contenteditable'));
						
						//$(this).attr('contenteditable',false);
						
						$(this).unbind('click').click(function(event){
							
							$(this).attr('contenteditable',true);
							
							$('body').one('click',function() {
								tagABA.find('.title').each(function(){$(this).attr('contenteditable',false);});
							});
							
							event.stopPropagation();
						});
						
						*/
				});
				
				tagABA.find('li').unbind('click').click(dblclick_open_aba);
				
			}
			
			
			
			
			var event_remove_btn_close	=	 function()
			{
				var _report_id	=	 $(this).parent().parent().attr('id-aba');
				
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
				
				
					//se o report vier nulo então é criado um novo report
					if(empty($.trim(_report_id)) || _report_id==classIDName)
					{
							report_id				=	generateReportId();
							//GRavando o title da nova aba
						var getElement				=	[];	
							getElement['TITLE_ABA']	=	title;
							getElement['REPORT_ID']	=	report_id;
							$(this).attr('id-tag',report_id);	
							$('.NAV_CONFIG_WRS').attr('is-event',true).attr('id-tag',report_id).data('wrsConfigGridDefault',getElement).find('.report_title').html(title);
							
					}
					
					
					tagABA.find('.active').removeClass('active');	

					//full_data['TITLE_ABA']	=	title; //forçando um novo title;
							
				var tag_editable	=	true;
					if(!editable)	tag_editable	=	false;

					
				var _replace		=	[title,active,report_id,tag_editable];
				var html			=	str_replace(htmlABAReplace, _replace, htmlABA);
				
				
					tagABA.find('.'+report_id).remove();
					tagABA.append(html);
					
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
						tagABA.find('.'+report_id).data(abaData,data).data(aba_full_data,full_data);
					}	
					
					event_span_editable();
					
					return report_id;
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
				var optionsAba		=	{title:'',report_id:'',active:false};
				var	opts 			= 	$.extend( {}, optionsAba, options );

				tagABA.find('.'+tag_aba_empty).remove();
				
					add_aba_html(opts.title, opts.report_id,opts.active,true);
					btn_add_new_aba();
			}
			
			
			
			/**
			 * Faz a interceptação dos Eventos da Janela do evento default e efetua o refresh da aba
			 */
			var __refresh			=	 function(options)
			{

					try{
						tagABA.find('.'+options['REPORT_ID']).data(abaData,options);
					}
					catch(e)
					{
						WRS_ALERT(LNG('ERROR_LOAD_ABA'),'error');
					}
			}
			
			
			var __load_multiple		=	 function(options)
			{

					if(empty(options)) return false;
					
					var _report_id		=	'';
					
					tagABA.find('.'+tag_aba_empty).remove();

					
					for(var lineOptions	=0 ; lineOptions	<	options.length ;lineOptions++)
						{
						
								var optionsAba		=	{
															LAYOUT_ROWS			:[],
															LAYOUT_COLUMNS		:[],
															LAYOUT_MEASURES		:[],
															LAYOUT_FILTERS		:[],
															KendoUi				:[],
															filter_selected		:{data:"" , full:[]}
								};
						
								var	opts 			= 	$.extend( {}, optionsAba, options[lineOptions]);
								var _active			=	lineOptions==0 ? true : false;
								
								if(empty(_report_id))	_report_id	=	opts.KendoUi['REPORT_ID'];
								
									add_aba_html(opts.KendoUi['TITLE_ABA'], opts.KendoUi['REPORT_ID'],_active,true,false,opts.KendoUi,options[lineOptions]);
						}
					
					
					
					btn_add_new_aba();
					
					$('.NAV_CONFIG_WRS').attr('is-event',true);
					tagABA.find('.'+_report_id).trigger('click');
			}
			
			/*
			 * Metodos de funções
			 * formas de chamadas externas
			 */
			var methods = 
			{
			        init 			: 	__init,
			        add_new_aba		:	__add_new_aba,
			        remove			:	__remove,
			        refresh			:	__refresh,
			        load_multiple	:	__load_multiple
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
