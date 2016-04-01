
/*
 * PLUGIN WRS GRID
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 * 
 * 
 * 
 * Options
 * 
 */


/**
 * WARNING: As funções com nomeclaturas 'wrsConfigGridDefaultManager' é para garantir que nas configurações TOP não ocorra problemas ao executar uma nova ABA
 * Garantindo que ao criar uma nova apa
 */
function wrsConfigGridDefaultManagerTopOptions()
{
	_START('wrsConfigGridDefaultManagerTopOptions');
	$('#wrsConfigGridDefault').each(function(){
		$(this).attr('wrsConfigGridDefaultManagerTopOptions',false);
	});	
	_END('wrsConfigGridDefaultManagerTopOptions');
}

function wrsConfigGridDefaultManagerTopOptionsLock()
{
	_START('wrsConfigGridDefaultManagerTopOptionsLock');
	$('#wrsConfigGridDefault').each(function(){
		$(this).attr('wrsConfigGridDefaultManagerTopOptions',true);
	});	
	
	_END('END::wrsConfigGridDefaultManagerTopOptionsLock')
}

function wrsConfigGridDefaultManagerTopOptionsStatus()
{
	var status	=	 false;
	_START('wrsConfigGridDefaultManagerTopOptionsStatus');
		$('#wrsConfigGridDefault').each(function(){
			status	=	$(this).attr('wrsConfigGridDefaultManagerTopOptions');
			
			if(empty(status)) status=false;
		});	
	
		_END('wrsConfigGridDefaultManagerTopOptionsStatus');
	return status;
}





/* END CONFIGURE*/

function DEFAULT_OPTIONS_TOPS()
 {
	
	_ONLY('DEFAULT_OPTIONS_TOPS');
	
	 $('.wrs_grid_options_default').wrsTopOptions();
	 $('.DRAG_DROP_LATERAIS').find('.wrs_tops_configure').hide();
	 $('.DRAG_DROP_LATERAIS').find('.label_top_wrs').remove();
	 
 }
 

/**
 *  Iniciando a criação do Plugin
 */ 
(function( $ ) {
		
		
		/**
		 * Configurações das opções TOP
		 */
		$.fn.wrsTopOptions = function() 
		{
			_START('wrsTopOptions');
			var that				=	this;
			var report_id			=	this.attr('id');
			var report_aba			=	'.'+report_id;
			var IDGrid				=	'#'+report_id;
			var isDefault			=	Boolean(that.attr('isDefault'));
			var aba_curent_object	=	get_aba_active_object();
			var telerikGrid			=	that.data('kendoGrid');

			
			if(!wrsConfigGridDefaultManagerTopOptionsStatus())
				{
					that.data('kendoGridWrsTopOptions',{});
					telerikGrid		=	{};
				}else{
					if(empty(telerikGrid)) telerikGrid	=	{};
					that.data('kendoGridWrsTopOptions',telerikGrid);
					
				}
			
			
			var layout			=	'';
			var measure			=	'';
			
			
				if(isDefault==true)
				{
					measure			=	telerikGrid;
				}else{
					layout			=	wrsKendoUiContextMenuGetLayoutInfo(telerikGrid);
					measure			=	explode(',',layout['LAYOUT_MEASURES']);
					
					/*
					for(var lm in measure)
						{
							measure[lm]	=	replace_attr(measure[lm]);	
						}*/
					
				}
			
				

				
				if(!$(IDGrid).hasClass('wrs_grid_options_default'))
				{
					$(IDGrid).addClass('wrs_grid_options_default');
				}

			var TAGButton		=	'	  <ul class="dropdown-menu wrsTopOptionsData ">'+
									'	    <li tag="total"><a href="#"><i class="fa fa-arrow-right"></i>'+LNG('TITLE_TOP_TOTAL')+'</a></li>'+
									'	    <li key="5"   class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_5')+'</a>  <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="10"  class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_10')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="15"  class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_15')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="20"  class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_20')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="25"  class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_25')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="50"  class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_50')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'	    <li key="100" class="dropdown-wrs-submenu"><a href="#"><span class="fa fa-arrow-up"></span><i class="fa fa-angle-right"></i>'+LNG('TITLE_TOP_100')+'</a> <ul class="dropdown-menu measure wrsTopOptionsDataSub"></ul></li>'+
									'		<li><a href="#"><span class="fa fa-times"></span> '+LNG('BTN_SAIR')+'</a></li>'
									'	  </ul>';
		
			
			
			var TAGLabel			=	 function(field,_top_config,_this,_measure)
			{
				//_START('wrsTopOptions::TAGLabel');
						var html_tag	=	'';
						var tag_tmp		=	'';
						var tmp_top		=	[];
							_this.find('.label_top_wrs').remove();
							 
							//TRACE_DEBUG('set');
						try{
							
								//console.log('_top_config',_top_config);
								if(_top_config[field])
								{
									

							//		TRACE_DEBUG('set01');
									
									tag_tmp			=	str_replace(['{','}'],'',_top_config[field]);
									tmp_top			=	explode('|',tag_tmp);
									var key_title	=	parseInt(tmp_top[1])-1;
									var _title		=	'';
									
								//	TRACE_DEBUG('set02');
									if(isDefault==true)
									{
										key_title	=	parseInt(tmp_top[1]);
									}
									
								//	TRACE_DEBUG('set03');
									if(empty(_measure)){
										
										 _title	=	telerikGrid.headerIndex.byFrozenLevelFull[(measure[key_title])].title;
										 //_title	=	telerikGrid.headerIndex.byFrozenLevelFull[replace_attr(measure[key_title])].title;
									}else{
										_title	=	 _measure[key_title].name;
									}
									
									
									//TRACE_DEBUG('set04');
									var _span	=	$('<span/>',{'class':"label label-info label_top_wrs", 'data-toggle':"tooltip",'data-placement':"left",title:_title});
										_span.html(LNG('TITLE_TOP_'+tmp_top[0]));//Save the Name
										
									//	TRACE_DEBUG('set05');
										var _find	=	_this.find('a');
									//	TRACE_DEBUG('set06');
										if(_find.length ) 
										{
										//	TRACE_DEBUG('set07');
											_find.append(_span);
										}
										else
										{
										//	TRACE_DEBUG('set08');
										//	TRACE_DEBUG('end');
											_this.append(_span);
										}
										
								}
						}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
				//_END('wrsTopOptions::TAGLabel');		
			}
			
			var convertTypeTOP		=	 function(key,data)
			{
				_START('wrsTopOptions::convertTypeTOP');
				var wrsKendoUi		=	aba_curent_object.wrsAbaData('getKendoUi');
				var top_config		=	'';
				var data_save		=	'';
				
				if(isDefault==true)
					{
							that.attr('is-event',true);//Ativa a mudança para quando executar o run filrer
							that.wrsTopOptions();
					}
				
				
				
				
				try{
					top_config	=	wrsKendoUi.TOP_CONFIG;
				}catch(e)
				{
					if(IS_EXCEPTION) console.warn(' exception');
					top_config	=	'';
				}
				 
				var config			=	$.parseJSON(base64_decode(top_config));
					
				if(empty(config)) config=	{};
				
				config[key]	=	data;
				data_save	=	base64_encode(json_encode(config));
					
					

					aba_curent_object.wrsAbaData('setKendoUi',{TOP_CONFIG:data_save});
					
				if(isDefault==true)	
					{
						that.wrsTopOptions();
					}
					else
					{	wrsRunFilter();
						return true;
					}
				_END('wrsTopOptions::convertTypeTOP');	
			}
			
			/*
			 * LImpa quando clicar no TOtal
			 */
			var wrsTopOptionsData	=	 function()
			{
				
				_START('wrsTopOptions::wrsTopOptionsData');	
				var kendoUi		=	 $(IDGrid).data('kendoGridWrsTopOptions');
				var btnOption	=	 $(this).parent().data('wrsTopOptionsDataParent');
				var tag			=	 $(this).attr('tag');
				var isROWS		=	 $(this).attr('isROWS');
				var full_name	=	'';
				
		
			 	if(isDefault==true)
		 		{
		 			//Opções na tela de Default
			 		
					var tag_class	=	 btnOption.parent().attr('tag-class');
					
					var json	=	$('.wrs_options_select li.'+tag_class).data('wrs-data');

					
		 			//var json		=	$.parseJSON(base64_decode( btnOption.parent().attr('json')));
		 			
		 				full_name	=	json['LEVEL_FULL'];
		 		}else{		
		 			var field		=	btnOption.parent().parent().index()+'_'+btnOption.parent().index();
		 				full_name	=	kendoUi.headerIndex[field].LEVEL_FULL;
		 		}
				
				 if(empty(tag)) return true;
				  
				 if(isDefault==true)
					{
					 
					 	btnOption				=	aba_curent_object.wrsAbaData('getKendoUi');
					 	btnOption.TOP_CONFIG 	= $.parseJSON(base64_decode(btnOption.TOP_CONFIG));
					 
					 // remove o TOP apenas do atributo selecionado
				 	 if(btnOption.TOP_CONFIG[full_name]!=null && btnOption.TOP_CONFIG[full_name]!=undefined){
				 		 delete btnOption.TOP_CONFIG[full_name];
				 	 }


				 	 aba_curent_object.wrsAbaData('setKendoUi',{TOP_CONFIG:base64_encode(json_encode(btnOption.TOP_CONFIG))});
					 
					 that.attr('is-event',true);//Ativa a mudança para quando executar o run filrer
					 
					 
					 that.wrsTopOptions();
					 
					}else{

						aba_curent_object.wrsAbaData('setKendoUi',{TOP_CONFIG:base64_encode(json_encode(''))});
						
						 wrsRunFilter();
					}
				_END('wrsTopOptions::wrsTopOptionsData');	
			};
			
			
			var wrsTopOptionsDataSub	=	 function()
			{
				_START('wrsTopOptions::wrsTopOptionsDataSub');
				var btnOption	=	 that.find('.wrsTopOptionsData').data('wrsTopOptionsDataParent');
				var tag			=	 $(this).attr('tag');
				var isROWS		=	 $(this).attr('isROWS');
				var key			=	$(this).parent().parent().attr('key');
				var val			=	'';
				var index		=	'';
				var full_name	=	$(this).attr('full_name');
				
				var kendoUi		=	 $(IDGrid).data('kendoGridWrsTopOptions');
				
					try{

							var _kendo	=	$(IDGrid).data('kendoGrid');
								if(!empty(_kendo))	kendoUi=_kendo;
					}catch(e){
							//Continua com a origem
						if(IS_EXCEPTION) console.warn(' exception');
					}
					

					if(empty(tag)) {
						_END('wrsTopOptions::wrsTopOptionsDataSub');
						return true;
					}

					 	if(isDefault==true)
					 		{
					 			//Opções na tela de Default
					 				index			=	tag;	
					 			var tag_class	=	 btnOption.parent().attr('tag-class');
								var json	=	$('.wrs_options_select li.'+tag_class).data('wrs-data');
								
					 				full_name	=	json['LEVEL_FULL'];
					 		}else{
					 								index	=	tag;//btnOption.parent().index();			
									 			var field		=	btnOption.parent().parent().index()+'_'+btnOption.parent().index();
									 				full_name	=	kendoUi.headerIndex[field].LEVEL_FULL;
					 		}
					 	
					 	val =	'{'+key+'|'+index+'}';
					 	convertTypeTOP(full_name,val);
				
				_END('wrsTopOptions::wrsTopOptionsDataSub');				
			}
			
			
			var clickOptions		=	 function(event)
			{
				_START('wrsTopOptions::clickOptions');
				var p 					= 	$(this);
				var offset 				= 	p.offset();
				var optionsData			=	that.find('.wrsTopOptionsData');
				
					optionsData.data('wrsTopOptionsDataParent',p);
					optionsData.addClass('wrs_visible');
					optionsData.css({left:offset.left,top:offset.top+p.outerHeight(),'z-index':99999});
					
					
				var liHTML			=	''; 
				
				var isROWS			=	Boolean(p.attr('isROWS'));
				
				

					for(lineMeasure in measure)
						{
							var title		=	'';
							var full_name	=	'';
							var _tag		=	'';
							
							if(isDefault==true)
								{
									_tag		=	lineMeasure;
									full_name	=	measure[lineMeasure].full_name;
										title	=	measure[lineMeasure].name;
								}else{
									_tag		=	(parseInt(lineMeasure)+1);
									full_name	=	measure[lineMeasure];

									title		=	telerikGrid.headerIndex.byFrozenLevelFull[measure[lineMeasure]]['title'];
								}
							
								
								liHTML+=' <li isROWS='+isROWS+' full_name="'+full_name+'"   tag='+_tag+' class="wrsTopOptionsDataSubLi"><a href="#"><span class="glyphicon glyphicon glyphicon-usd"></span> '+title+'</a></li>';
						}
					
					optionsData.find('.measure').attr('isROWS',isROWS).html(liHTML);
					
					$('html').one('click',function() {
							 $('.wrsTopOptionsData').removeClass('wrs_visible');
					});

					that.find('.wrsTopOptionsData').find('.wrsTopOptionsDataSubLi').unbind('click').click(wrsTopOptionsDataSub);

					event.stopPropagation();
				_END('wrsTopOptions::clickOptions');
					return false;
			}

				
				if(isDefault!=true)
				{
	
					var wrsKendoUi_mount	=	$(report_aba).wrsAbaData('getKendoUi');
					var _top_config			=	{};
					

					if(!empty(wrsKendoUi_mount)){
						try{
							_top_config	=	$.parseJSON(base64_decode(wrsKendoUi_mount.TOP_CONFIG));
						}catch(e){
							_top_config	=	{};
							if(IS_EXCEPTION) console.warn(' exception');
						}
					}
					

					 
					
					//Configuração normal para quando a grid já estiver montada
					that.find('.k-grid-header table:first tr').find('th').each(function(){
						var wrs_tops_configure		=	$('<span/>', {
							type	: 'button',
							title	: LNG('TITLE_TOP'),
							html	: $('<i/>',{'class':'fa fa-bars'}),
							'class'	: 'wrs_tops_configure'
						});
						
						$(this).prepend(wrs_tops_configure);
						wrs_tops_configure.unbind('click').click(clickOptions);
						
						
						/*
						 * Verificando se Existe TOP para a LInha ou a Coluna pesquisada no momento
						 */
						
						var key_name	=	$(this).parent().index()+'_'+$(this).index();
						try{
							
							var field	=	telerikGrid.headerIndex[key_name].LEVEL_FULL;
								TAGLabel(field,_top_config,$(this));
						}catch(e){
							if(IS_EXCEPTION) console.warn(' exception');
						}
						//END
						
					});
					
					that.find('.k-grid-header table:first tr:last-child').find('th').find('.wrs_tops_configure').attr('isROWS',true);				
					that.find('.k-grid-header table:first tr:last-child').find('th:first-child').find('.wrs_tops_configure').hide();
				}else{
						wrsKendoUi		=	get_aba_active_kendoUi();
					var _top_config		=	$.parseJSON(base64_decode(wrsKendoUi.TOP_CONFIG));
					 
 
					var measure_data	=	[];
					var measure_count	=	1;
					that.parent().find('.sortable_metrica li').each(function(){			
						
			 			var tag_class	=	 $(this).attr('tag-class');
						var json	=	$('.wrs_options_select li.'+tag_class).data('wrs-data');

						
						
						
						if(!empty(json)){
							measure_data[measure_count]	=	{'level_full':json['MEASURE_UNIQUE_NAME'],'name':json['MEASURE_CAPTION']};
							measure_count++;
						}
					});
					
					measure	=	measure_data;
					
					
					that.data('kendoGridWrsTopOptions',measure);
					
					//COnfigurando para as ooções default
					

					that.parent().find('.sortable_coluna li,.sortable_linha li').each(function(){		
					var tag_class	=	 $(this).attr('tag-class');
					
						var json	=	$('.wrs_options_select li.'+tag_class).data('wrs-data');
	
							if(!empty(json)){
			
										var wrs_tops_configure		=	$('<span/>', {
											type	: 'button',
											title	: LNG('TITLE_TOP'),
											html	: $('<i/>',{'class':'fa fa-bars'}),
											'class'	: 'wrs_tops_configure btn-link'
										});
										
										$(this).find('.wrs_tops_configure').remove();
										$(this).prepend(wrs_tops_configure);

										TAGLabel(	json.LEVEL_FULL,
													_top_config,
													$(this),
													measure_data);
										
										wrs_tops_configure.unbind('click').click(clickOptions);
							}
						
							
					});
					
					$('.sortable_filtro li').each(function(){
							var wrs_tops_configure		=	$('<span/>', {
								type	: 'button',
								title	: LNG('TITLE_TOP'),
								html	: $('<i/>',{'class':'fa fa-bars'}),
								'class'	: 'wrs_tops_configure btn-link'
							}).css('display','none');
							
							$(this).find('.wrs_tops_configure').remove();
							$(this).prepend(wrs_tops_configure);
							wrs_tops_configure.unbind('click').click(clickOptions);
					});
					
					//console.log('kendoGrid ID 0::',that.attr('id'));
					//console.log('wrsTopOptionsDataSub 01: ',measure_data);
					that.data('kendoGridWrsTopOptions',measure_data);
				}
				
				that.find('.wrsTopOptionsData').remove();
				that.prepend(TAGButton);				


				that.find('.wrsTopOptionsData li').unbind('click').click(wrsTopOptionsData);
				
				//Active Toggle Tooltiple Bootstrap
				$(function () {
					  $('[data-toggle="tooltip"]').tooltip()
					})

			_END('wrsTopOptions');		
		}
		
		
		
		
		
				
	}( jQuery ));
 