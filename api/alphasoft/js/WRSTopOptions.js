
/*
 * PLUGIN WRS GRID
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 * 
 * 
 * 
 * Options
 * 
 */
		
function DEFAULT_OPTIONS_TOPS()
 {
	 $('.wrs_grid_options_default').wrsTopOptions();
	 $('.DRAG_DROP_LATERAIS').find('.wrs_tops_configure').remove();
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
			var that		=	this;
			var IDGrid		=	'#'+this.attr('id');
			var isDefault	=	Boolean(that.attr('isDefault'));
			
			var telerikGrid 		= 	that.data('kendoGrid');
			var layout			=	'';
			var measure			=	'';
			
			
				if(isDefault==true)
				{
					measure			=	telerikGrid;
					

				}else{
					layout			=	wrsKendoUiContextMenuGetLayoutInfo(telerikGrid);
					measure			=	explode(',',layout['LAYOUT_MEASURES']);
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
						var html_tag	=	'';
						var tag_tmp		=	'';
						var tmp_top		=	[];
							_this.find('.label_top_wrs').remove();
							 
						try{
							
							
								if(_top_config[field])
								{
									

									
									
									tag_tmp			=	str_replace(['{','}'],'',_top_config[field]);
									tmp_top			=	explode('|',tag_tmp);
									var key_title	=	parseInt(tmp_top[1])-1;
									var _title		=	'';
									
									if(isDefault==true)
									{
										key_title	=	parseInt(tmp_top[1]);
									}
									
									
									if(empty(_measure)){
										 _title	=	measure[key_title];
									}else{
										_title	=	 _measure[key_title].level_full;
										
										
									}
									
									
									
									var _span	=	$('<span/>',{'class':"label label-info label_top_wrs", 'data-toggle':"tooltip",'data-placement':"left",title:_title});
										_span.html(LNG('TITLE_TOP_'+tmp_top[0]));//Save the Name
										
										var _find	=	_this.find('a');
										
										if(_find.length ) _find.append(_span);
										else
											_this.append(_span);
										
								}
						}catch(e){}
						
			}
			
			var convertTypeTOP		=	 function(key,data)
			{
				
				var wrsKendoUi		=	'';
				var top_config		=	'';
				var data_save		=	'';
				
				if(isDefault==true)
					{
							wrsKendoUi	=	$(IDGrid).data('wrsConfigGridDefault');
							
							if(empty(wrsKendoUi)){
								wrsKendoUi	=	{};
							}
							
							that.attr('is-event',true);//Ativa a mudança para quando executar o run filrer
							that.wrsTopOptions();
					}else{
							wrsKendoUi	=	$.parseJSON(base64_decode($(IDGrid).attr('wrsKendoUi')));
					}
				
				
				
				try{
					top_config	=	wrsKendoUi.TOP_CONFIG;
				}catch(e)
				{
					top_config	=	'';
				}
				 
				var config			=	$.parseJSON(base64_decode(top_config));

					if(empty(config)) config=	{};
					
					config[key]	=	data;
					data_save	=	base64_encode(json_encode(config));
					
					
					

				if(isDefault==true)	
					{
						wrsKendoUi['TOP_CONFIG']	=	data_save;
						$(IDGrid).data('wrsConfigGridDefault',wrsKendoUi);
						that.wrsTopOptions();
					}
					else
					{
						wrsKendoUiChange(IDGrid,'TOP_CONFIG',data_save);
						wrsRunFilter();
					}
			}
			
			/*
			 * LImpa quando clicar no TOtal
			 */
			var wrsTopOptionsData	=	 function()
			{
				var btnOption	=	 $(this).parent().data('wrsTopOptionsDataParent');
				var tag			=	 $(this).attr('tag');
				
				var isROWS		=	 $(this).attr('isROWS');
				
				 if(empty(tag)) return true;
				  
				 if(isDefault==true)
					{
					 
					 btnOption	=	$(IDGrid).data('wrsConfigGridDefault');
					 
					 	
					 try{
						 btnOption.TOP_CONFIG	=	'';
					 }catch(e)
					 {
						 btnOption					=	[];
						 btnOption['TOP_CONFIG']	=	'';
					 }
					 
					 
					 btnOption['TOP_CONFIG']	=	base64_encode(json_encode(btnOption.TOP_CONFIG));
					 
					 
					 $(IDGrid).data('wrsConfigGridDefault',btnOption);
					 that.attr('is-event',true);//Ativa a mudança para quando executar o run filrer
					}else{
						 wrsKendoUiChange(IDGrid,'TOP_CONFIG',base64_encode(json_encode('')));
						 wrsRunFilter();
					}
					
			};
			
			
			var wrsTopOptionsDataSub	=	 function()
			{
				var btnOption	=	 that.find('.wrsTopOptionsData').data('wrsTopOptionsDataParent');
				var tag			=	 $(this).attr('tag');
				var isROWS		=	 $(this).attr('isROWS');
				var key			=	$(this).parent().parent().attr('key');
				var val			=	'';
				var index		=	'';
				var full_name	=	$(this).attr('full_name');
				
				var kendoUi		=	 $(IDGrid).data('kendoGrid');
				
					 if(empty(tag)) return true;

					 	if(isDefault==true)
					 		{
					 			//Opções na tela de Default
					 				index			=	tag;	
					 			var json		=	$.parseJSON(base64_decode( btnOption.parent().attr('json')));
					 				full_name	=	json['LEVEL_FULL'];
//						 				key			=	(btnOption.parent().index()+1);
					 				
					 				
					 					
					 		}else{
									 /*	if(isROWS=='true')
									 		{
									 			index		=	tag;//btnOption.parent().index();	
									 			var field	=	btnOption.parent().parent().index()+'_'+btnOption.parent().index();
								 					full_name	=	kendoUi.headerIndex[field].LEVEL_FULL;

									 		}else{
									 		*/	index	=	tag;//btnOption.parent().index();			
									 			var field		=	btnOption.parent().parent().index()+'_'+btnOption.parent().index();
									 				full_name	=	kendoUi.headerIndex[field].LEVEL_FULL;
									 				
									 	//	}
					 	
									 	
					 		}
					 	val =	'{'+key+'|'+index+'}';
					 	convertTypeTOP(full_name,val);
			}
			
			
			var clickOptions		=	 function(event)
			{
				
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
									title		=	telerikGrid.headerIndex.byFrozenLevelFull[measure[lineMeasure]].title;
								}
								
								liHTML+=' <li isROWS='+isROWS+' full_name="'+full_name+'"   tag='+_tag+' class="wrsTopOptionsDataSubLi"><a href="#"><span class="glyphicon glyphicon glyphicon-usd"></span> '+title+'</a></li>';
						}
					
					optionsData.find('.measure').attr('isROWS',isROWS).html(liHTML);
					
					$('html').one('click',function() {
							 $('.wrsTopOptionsData').removeClass('wrs_visible');
					});

					that.find('.wrsTopOptionsData').find('.wrsTopOptionsDataSubLi').unbind('click').click(wrsTopOptionsDataSub);

					event.stopPropagation();
					return false;
			}

				
				if(isDefault!=true)
				{
	
					var wrsKendoUi_mount	=	$.parseJSON(base64_decode($(IDGrid).attr('wrsKendoUi')));
					var _top_config			=	{};
					

					if(!empty(wrsKendoUi_mount)){
						try{
							_top_config	=	$.parseJSON(base64_decode(wrsKendoUi_mount.TOP_CONFIG));
						}catch(e){
							_top_config	=	{};
						}
					}
					

					 
					
					//Configuração normal para quando a grid já estiver montada
					that.find('.k-grid-header table:first tr').find('th').each(function(){
						
//						foreach(kendoUi);
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
						}
						//END
						
					});
					
					that.find('.k-grid-header table:first tr:last-child').find('th').find('.wrs_tops_configure').attr('isROWS',true);				
					that.find('.k-grid-header table:first tr:last-child').find('th:first-child').find('.wrs_tops_configure').remove();
				}else{
						
					

					wrsKendoUi	=	$(IDGrid).data('wrsConfigGridDefault');
					
					var _top_config	=	$.parseJSON(base64_decode(wrsKendoUi.TOP_CONFIG));
					
 
					
					var measure_data	=	[];
					var measure_count	=	1;
					that.parent().find('.sortable_metrica li').each(function(){						
						var json	=	$.parseJSON(base64_decode( $(this).attr('json')));
						
						if(!empty(json)){
							measure_data[measure_count]	=	{'level_full':json['MEASURE_UNIQUE_NAME'],'name':json['MEASURE_CAPTION']};
							measure_count++;
						}
					});
					
//					foreach(measure_data);
					
					
					measure	=	measure_data;
					
					that.data('kendoGrid',measure);
					
					//COnfigurando para as ooções default
					that.parent().find('.sortable_coluna li,.sortable_linha li').each(function(){		
						
						var json	=	$.parseJSON(base64_decode( $(this).attr('json')));
						
						
						
						var wrs_tops_configure		=	$('<span/>', {
							type	: 'button',
							title	: LNG('TITLE_TOP'),
							html	: $('<i/>',{'class':'fa fa-bars'}),
							'class'	: 'wrs_tops_configure btn-link'
						});
						
						$(this).find('.wrs_tops_configure').remove();
						$(this).prepend(wrs_tops_configure);
						
						
					
						TAGLabel(json.LEVEL_FULL,_top_config,$(this),measure_data);
						
						
						wrs_tops_configure.unbind('click').click(clickOptions);
						
							
					});
					
					
					
					that.data('kendoGrid',measure_data);
				}
				
				
				
				
				that.find('.wrsTopOptionsData').remove();
				that.prepend(TAGButton);				
				that.find('.wrsTopOptionsData li').unbind('click').click(wrsTopOptionsData);
				
				//Active Toggle Tooltiple Bootstrap
				$(function () {
					  $('[data-toggle="tooltip"]').tooltip()
					})
						
		}
		
		
		
		
		
				
	}( jQuery ));
 