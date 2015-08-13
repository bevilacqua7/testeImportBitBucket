
/*
 * PLUGIN WRS GRID
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 * Bold
 * @link http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template
 */

var RELATIONSHIPS_FULL_NAME	=	$.parseJSON(base64_decode( ATRIBUTOS_JSON));
var RELATIONSHIPS_FULL		=	[];
var _TRUE	=	'1',
	TRUE		=	true,
	NULL		=	null,
	FALSE		=	false,
	EMPTY		=	'';
	
	


include_js('WRSWindowGrid');
include_js('WRSMaps');
include_js('WRSKendoUiChart');
include_js('WRSGridEventsTools');
include_js('WRSHeaderIndex');
include_js('WRSDrillLine');	//Drill Line





/**
 * Criando o index do relationships para a consulta via level full
 * @returns {Boolean}
 */
function  SET_RELATIONSHIPS_FULL_NAME()
{
	if(RELATIONSHIPS_FULL.length) return true;
	
	for(_obj_fn in RELATIONSHIPS_FULL_NAME)
	{
		var _full	=	 RELATIONSHIPS_FULL_NAME[_obj_fn];
		
		for(_f_obj_fn in _full)
			{
				RELATIONSHIPS_FULL[_full[_f_obj_fn]['LEVEL_FULL']]=	_full[_f_obj_fn];
			}
	}	
	
//	TRACE_DEBUG();
}

SET_RELATIONSHIPS_FULL_NAME();

 function wrs_format_line(data)
 {
	return data;
 }
 

 function getElementsWrsKendoUi(_event)
 {
 	if(!empty(_event.html()))
 	{
 		var wrsKendoUi	=	$.parseJSON(base64_decode(_event.attr('wrsKendoUi'))); 		
 		return wrsKendoUi;
 	} 	
 	
 	return [];
 	
 }

 /**
  *  Neste Evento nós procurando saber quem é o pai do Evento para retornar todo o Json Principal
  *  Retorna as informações dos layouts
  *  
  *  LAYOUT_ROWS
  *	 LAYOUT_COLUMNS
  *  LAYOUT_MEASURES
  *  LAYOUT_FILTERS
  */
 function wrsKendoUiContextMenu(whoEvent,kendoActive)
 {
	 var kendoUi		=	kendoActive  ? whoEvent : whoEvent.data('kendoGrid');
	 var layout			=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	 var layout_tmp		=	[];
	 
	 var types			=	['LAYOUT_ROWS','LAYOUT_COLUMNS','LAYOUT_MEASURES','LAYOUT_FILTERS'];
	 
	 for(obj in types)
		 {
		 	layout_tmp[types[obj]]	=	wrsKendoUiContextMenuChangeArray(layout[types[obj]]);
		 }
	 
	 return {'layout_full':layout, 'layout_clean' : layout_tmp};
	 
 }

 
 function wrsKendoUiContextMenuChangeArray(param)
 {
	 if(empty(param)) return '';
	 
	 var currentParam	= 	explode(',',param);
	 var tmpParam		=	[];
	 
	 for(obj in currentParam)
		 {
		 	tmpParam[obj]	=	replace_attr(currentParam[obj]);
		 }
	 
	 return tmpParam;
	 
 }
 
function  wrsKendoUiContextMenuGetLayoutInfo(kendoUi)
{
		var keyName		=	getFirstValueArray(kendoUi.columns);
		var layout		=	 kendoUi.columns[keyName]['layout'];
		return layout;
}
 
 
 /*
  * Ativando configurações para o Tema
  */
 function addKendoUiColorJQueryGrid()
 {
 	var color		=	$('.ui-state-default').css('border-color');
	var colorFont	=	$('.ui-state-default').css('color');
	var ui_state_active =	$('.ui-state-active').css('color');
	
	 
	var style	=	'';
		style	+=	"<style>.table_border,.border_color tr td {border-color : "+color+" !important;}";
		style	+=	".bold{color:"+colorFont+" !important;}";
		style	+=	".colorSelect{color:"+ui_state_active+" !important;}";
		style	+='</style>';
	$(style).appendTo( "head" );
 }
 
function getWrsKendoColumn(data)
{
		var tmp		=	[];
		var _tmp	=	[];
		
		for(obj in data)
		{
			var _arg	=	data[obj];
			for(_obj in _arg)
			{
				if(_obj!='field')
				{
					if(_obj=='columns')
					{
						_tmp	=	[];
						_tmp   	=  _local_merge_array(tmp,getWrsKendoColumn(_arg[_obj]));
						tmp		=	[];
						tmp		=	_tmp;
					}
				}else{
						tmp[_arg[_obj]]	=  _arg;
				}
			}
			
		}
		
		return tmp;
		
}// END getWrsKendoColumn
												
												
  function foreach(array,type){

		IS_TRACE	=	true;
		
		TRACE('---foreach--------');
		
		if(!is_array(array))TRACE('STRING::|::'+array);
		for(obj in array)
		{
			if(empty(type)){
				TRACE(obj+'   ||   '+array[obj]);
			}else{
				
			TRACE(obj+':');
			}
		}
		
			IS_TRACE	=	false;
  }
  
  
  /*
   * MErge Array 
   */
 function _local_merge_array(f_array,s_array)
 {
	var _tmpArray	=	[];
	
		for(obj in f_array)
		{
				_tmpArray[obj]	=	f_array[obj];
		}
		
		for(objs in s_array)
		{
				_tmpArray[objs]	=	s_array[objs];
		}
	return _tmpArray;
 }
 
 /*
  * Importante para pegar os elementos do Drill
  * Onde é mainupado o formata string e outras configurações
  */
 function onDataBinding(arg)
 {
	var id 				=	 '#'+arg.sender.element.attr('id');
	var kendoUi			=	arg.sender;
	var wrsKendoUi		=	 $.parseJSON(base64_decode($(id).attr('wrsKendoUi')));
	var _arg			=	arg;
	//Pegando a Header e informações de formatação das colunas
	var _param			=	getWrsKendoColumn(arg.sender.columns);
	var _width							=	[];
	var frozen							=	0;
	var sizeFrozen						=	$(id).find('.k-grid-header-locked tr:last-child').find('th').length-1;
	var tmpFZ							=	0;
	var totalFrozen						=	[];
	var totalLastLabel					=	'';
	var indexTh							=	0;
	var lineToHideDrillLine				=	[];
	var DRILL_HIERARQUIA_LINHA_DATA		=	base64_decode(wrsKendoUi.DRILL_HIERARQUIA_LINHA_DATA);
	var DRILL_HIERARQUIA_REQUEST		=	arg.sender.dataSource._wrs_request_data.drill;
	var typeColumnFrozen				=	false;
	
	
	
	
	
	
	var layout							=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	
	var _DRILL_FCC						=	DRILL_FCC(arg.sender.headerIndex.byFrozenLevelFull,explode(',',layout.LAYOUT_ROWS));
	var DRILL_LINE_LAST_COLUMN			=	_DRILL_FCC[_DRILL_FCC.length-1];
	var LAYOUT_ROWS_B64					=	base64_encode(json_encode(_DRILL_FCC));
	
	arg.sender['wrsKendoUi']	=	[];
	arg.sender['wrsKendoUi']['WRS_ROWS']							=	_DRILL_FCC;
	arg.sender['wrsKendoUi']['DRILL_HIERARQUIA_LINHA_DATA_HEADER']	=	explode(',',base64_decode(wrsKendoUi.DRILL_HIERARQUIA_LINHA_DATA_HEADER));
	arg.sender['wrsKendoUi']['DRILL_HIERARQUIA_LINHA']				=	wrsKendoUi.DRILL_HIERARQUIA_LINHA;
	arg.sender['wrsKendoUi']['DRILL_LINE_LAST_COLUMN']				=	DRILL_LINE_LAST_COLUMN;
	
	arg.sender['drill_line_total_data']	=	[];
	
	//temporária para armazenar a coluna anterior a sendo chamada
	_arg.sender._wrs_data	=	[]	;
	

	//Apenas realimenta as colunas que deve ser preenchida caso existe totais
	if(wrsKendoUi.ALL_ROWS)
	{
		for(o__param in  _param)
		{
			if(tmpFZ>sizeFrozen) continue;
			tmpFZ++;
			
			if(_param[o__param]['map']=='[LATITUDE]') continue;
			
			totalFrozen[totalFrozen.length]=	o__param;
			
			totalLastLabel	=	o__param;
			indexTh			=	tmpFZ;
		}
		
		_arg.sender['wrs_frozen_data']					=	[];
		_arg.sender['wrs_frozen_data']['data']			=	[];
		_arg.sender['wrs_frozen_data']['index']			=	indexTh-1;
		_arg.sender['wrs_frozen_data']['field']			=	totalLastLabel;
	}
	//END
	var next_column			=	'';
	var next_column_count	=	0;
	for(var i=0;i<_arg.items.length;i++)
	{
			var idx		=	0;
				frozen	=	0;
				
				_arg.sender._wrs_data[i]	=	[];//Loading
			
			next_column_count		=	0;	
			for(obj in _param)
			{
				var word			=	_arg.items[i][obj];
				var img				=	'';	
				
				next_column_count++;
				
				//Caso o valor seja maoir não se aplica
				try{
					next_column	=	kendoUi.headerIndex.column_count[next_column_count];
				}catch(e){
					next_column	=	null;
				}
				
				
				/*
				 * Impede que a a latitude seja formatada 
				 */
				if(_param[obj]['map']=='[LATITUDE]')
				{
					continue;
				}
				
				//TRACE_DEBUG(obj);
				
				/*
				 * Reposicionando o hide quando acionao o mais e menos 
				 * Apenas pega as linhas em branco
				 */
				if(wrsKendoUi['ALL_ROWS'])
				{
					if(obj==totalLastLabel)
						{
							if(empty(word))
								{
									var searchTotalValue	=	'';	
									//Verificanso a coluna anterior tem dados
									for(stv =(totalFrozen.length-1) ;  stv>=0; stv--)
									{
										if(!empty(_arg.items[i][totalFrozen[stv]]))
										{
											if(stv==0){//Não pega o primeiro elemento que seria os números das páginas
												stv	=	-1;
												continue;
											}
											_arg.sender['wrs_frozen_data']['data'][i]	=	_arg.items[i][totalFrozen[stv]];
											stv	=	-1;
										}
										
									}
									
								}
							
						}
					
				}
				//END
				
				
				if(_param[obj]['locked'])
				{
					//Procrssando apenas os Frozens
					frozen++;
					_arg.items[i][obj]	= strlen($.trim(_arg.items[i][obj]))==0 ? '' : _arg.items[i][obj]; //Removendo os NULL
					_arg.sender._wrs_data[i][obj]	=	_arg.items[i][obj];
					
					typeColumnFrozen	=	true;
					if(wrsKendoUi.DRILL_HIERARQUIA_LINHA==_TRUE)
						{
							_arg.items[i][obj]		=	DRILL_HIERARQUIA_LINHA_setButton(	_arg.items[i][obj],
																							_arg.items[i]['C000'],
																							i,
																							obj,
																							DRILL_HIERARQUIA_REQUEST,
																							LAYOUT_ROWS_B64,
																							id,
																							_DRILL_FCC,
																							DRILL_LINE_LAST_COLUMN,
																							arg.sender,
																							next_column,
																							_arg.items[i]);
						}
					
					
				}else{
					typeColumnFrozen	=	 false;
					_arg.sender._wrs_data[i][obj]	=	formataValue(_param[obj]['wrsParam']['LEVEL_FULL'],_param[obj]['wrsParam']['FORMAT_STRING'],word,false,true); //Full para complementar

					
						if(isset(_arg.items[i]['bold'+obj]))
						{
							//Aplica o BOLD
							word		=	formataValue(_param[obj]['wrsParam']['LEVEL_FULL'],_param[obj]['wrsParam']['FORMAT_STRING'],word, wrsKendoUi.SUMARIZA);
								//Pois quando for Percente no Cresce vem Imagem junto
								if(is_array(word))
									{
										img		=	word[1];
										word	=	word[0];
									}
							_arg.items[i][obj]	= '<b class="color-black">'+word+img+'</b>';
						}else{
							word	=	formataValue(_param[obj]['wrsParam']['LEVEL_FULL'],_param[obj]['wrsParam']['FORMAT_STRING'],word,wrsKendoUi.SUMARIZA);
							
							//Pois quando for Percente no Cresce vem Imagem junto
							if(is_array(word))
								{
									img		=	word[1];
									word	=	word[0];
								}
							
							_arg.items[i][obj]	=	word+img;
							
						}
				}

				var paddingText	=	20;
				
				if(wrsKendoUi.DRILL_HIERARQUIA_LINHA==_TRUE && typeColumnFrozen && obj!='C000'){
					paddingText=50;
				}
				
				if(!isset(_width[idx]))
				{
					var title		=	_param[obj]['title'];		
					_width[idx]		= $("<div/>").text(title).textWidth()+paddingText;
				}
				
				var tmp_width	=	$("<div/>").text(word).textWidth()+paddingText;

				if(tmp_width>_width[idx])
				{
					_param[obj]['width']	=	_width[idx]				= 	tmp_width;			
				}
				 
				idx++;
				
				
				
				
			}

			
	}
	
	
	
	for(idx in _width)
		{
			WRSSresize(id,idx, _width[idx],frozen-1); 
		}
	
	return _arg;
 }

 
 
 
/*
 * 
 * @link http://www.telerik.com/forums/want-to-make-perticular-field-bold-based-upon-value-of-other-field
 */
 
function wrsKendoUiChange(nameID,param,value)
{
	var wrsKendoUi		=	$.parseJSON(base64_decode($(nameID).attr('wrsKendoUi')));
	var _tmpWrsKendoUi	=	"";
	
	
	if(empty(param))
	{
		//Para quando for passado Array como parametro
		if(is_array(value))
		{
			for(obj in value)
			{
				wrsKendoUi[obj]	=	value[obj];
			}
		}
	}else{
		//Quando for passado apenas parametro normal
		wrsKendoUi[param]	=	value;
	}
	
	_tmpWrsKendoUi		=	 base64_encode(json_encode(wrsKendoUi,true));
	$(nameID).attr('wrsKendoUi',_tmpWrsKendoUi);
}
 



function onDataBound(arg)
	{
		
			TRACE('START onDataBound');
			resizeColumnKendoUi(arg);

			var nameID		=	 '#'+arg.sender.element.attr('id');
			var ELEMENT		=	$(nameID+'Elements');
			var wrsKendoUi	=	$.parseJSON(base64_decode($(nameID).attr('wrsKendoUi')));
				wrsKendoUiChange(nameID,'page_size',arg.sender.dataSource._pageSize);
			
				
				ELEMENT.attr('chart','false');
				ELEMENT.attr('maps_wrs','false');
				 
	
			//Se o Somatório estiver ativo então faz a configuração do SUM
			if(wrsKendoUi.ALL_ROWS)
			{
				$(nameID).find('.wrstelerikButtonHeader').each(function(){					
					
					var _rel	=	$(this).attr('rel');
						_rel	= 	_rel=='plus' ? true : false;
						
					if(wrsKendoUi['PLUS_MINUS']==_rel)
					{
						$(this).trigger('click');
					}
					
				});
				
				themeSUM(nameID,arg,wrsKendoUi);
			}
			

			//Removendo as cores entre as linhas
			$(nameID).find('.k-grid-content').find('tbody tr').each(function(){if(wrsKendoUi.COLORS_LINE!=1){$(this).removeClass('k-alt');}});
			

			
			$(nameID).find('.k-grid-content').scrollTop(0);//Faz com que quando finalizar o load ir para a primeira o inicio

			
			CLOSE_LOAD_RELATORIO();
			$('.wrs_box').show();
			
			
			resizeGridSimple();
			
			addDrillOnDataBound(nameID,arg);
			//Aplicando o Evento do CLick no DRILL LINHA

			
			if(arg.sender.wrsKendoUi.DRILL_HIERARQUIA_LINHA	==_TRUE){
			
				DRILL_HIERARQUIA_LINHA_createEventClick(nameID);
				
				DRILL_HIERARQUIA_LINHA_setButtonExpandALL(nameID,arg.sender.wrsKendoUi.DRILL_HIERARQUIA_LINHA_DATA_HEADER,arg.sender.wrsKendoUi.DRILL_LINE_LAST_COLUMN);
				
				DRILL_HIERARQUIA_LINHA_hideColumn(	nameID,
													arg.sender,
													arg.sender.wrsKendoUi.WRS_ROWS,
													arg.sender.dataSource._wrs_request_data.drill);
			}
			
			TRACE('END onDataBound');
	}

	
	
	
	
 
	/*
	 * @link http://jsbin.com/ikoley/2/edit?html,output
	 * @link http://www.telerik.com/forums/change-column-widths-after-grid-created
	 */
	 function WRSSresize(gridId,idx, width,sizeFrozen) {
		var _idx		=	idx;
		var _idxHeader	=	_idx;

		if(idx>sizeFrozen)
		{	
			_idxHeader	=	idx-(sizeFrozen+1);
			
			$(gridId+" .k-grid-content") //content
              .find("colgroup col")
              .eq(_idxHeader)
              .css({width: width}).attr('up','up');;
			  
			   $(gridId+" .k-grid-header-wrap") //header
              .find("colgroup col")
              .eq(_idxHeader)
              .css({width: width}).attr('up','up');
			  
		}
		else
		{
			$(gridId+" .k-grid-header-locked ") //header
              .find("colgroup col")
              .eq(_idx)
              .css({width: width}).attr('DOQN','DOQN');
			  
			  $(gridId+" .k-grid-content-locked") //header
              .find("colgroup col")
              .eq(_idx)
              .css({width: width}).attr('DOQN','DOQN');
		}
		
		
		//TRACE(_idx+' | '+_idxHeader+' || '+sizeFrozen+' || '+width);
      }
		
		
		
		
		
		
		
function resizeColumnKendoUi(arg)
{
	var _arg				=	arg.sender.element;
	var id					=	"#"+_arg.attr('id');

	/*
	 *Aplicando o Thema
	 */
		$(id).find('.k-grid-content-locked').find('tr').each(function(){
				$(this).addClass('ui-state-default');
				$(this).removeClass('k-alt');
			});
		
	
			
}

 /*
  * Ação do hide show do Congelar
  */
function  buttonPlusMinus(nameID,hideShow,sizeFrozen)
													{

														if(!hideShow){
																$(nameID).find('.k-grid-content-locked').find('tr').find('td:last-child').each(function(){
																	if(empty($(this).html()))
																	{
																		var index		=	$(this).index();
																		var htmlName	=	'';
																		var tagTR		=	 $(this).parent();
																		
																		while(empty(htmlName))
																		{
																				index--;
																				htmlName	=	tagTR.find('td').eq(index).html();
																		}
																		
																		if(index!=0){
																			$(this).html(htmlName);
																		}
																		
																		if($(this).attr('wrsNull')!='true')
																		{
																			$(this).attr('wrsNull','true');
																			$(this).addClass('wrsNull');
																		}
																	}
																});
														}else{
															$(nameID).find('.k-grid-content-locked').find('.wrsNull').html('');
														}
													}



function  themeSUM(nameID,arg,wrsParam)
{
		var find_last			=	'last-child';
			


		$(nameID).find('.k-grid-content-locked').find('tr').find('td:'+find_last).each(function(){
			var index				=	$(this).parent().index();
			var parent_index_data	=	parseInt($(this).index());
			var html_data_index		=	'';
			var isTotal				=	true;

			
			//QUando for o caso se linha de DRILL habilita os totais apenas nas linhas corretas
			if(arg.sender.wrsKendoUi.DRILL_HIERARQUIA_LINHA	==_TRUE){
				
				try{
					if(arg.sender['drill_line_total_data'][index])
					{
						isTotal	=	 false;
					}
				} catch(e){}
			}
			
			
			if(isTotal)
			{
				if(empty($(this).html()) || $(this).attr('wrsNull')=='true')
					{
						$(nameID).find('.k-grid-content').find('tbody tr').eq(index).addClass('ui-state-default tag_total');
						//Caso seja nula a linha de Total pesquisa e insere a ultima encontrada
						for(var i=parent_index_data; (i>=1 && empty(html_data_index)); i--){
							html_data_index	=	 strip_tags($(this).parent().find('td:eq('+i+')').html());
						}
						$(this).parent().attr('wrs-html-data',html_data_index);
						
					}
			}
			
				
			});
			
			
			
			
			//Aplica bolde nas clunas de totais
			var _param	=	getWrsKendoColumn(arg.sender.columns);
					
			
			var TOTAL			=	LNG('LINE_TOTAL');
			var colTOTAL		=	arg.sender.headerIndex.column_total;
			
			
			for(lineColTOTAL in colTOTAL){
				$(nameID).find('.k-grid-header	.k-grid-header-wrap').find('tr:last-child').find('th[data-field='+lineColTOTAL+']').each(function(){
					var th	=	 $(this).index();
					$(nameID).find('.k-grid-content').find('tbody tr').each(function(){
						$(this).find('td').eq(th).addClass('bold tag_total');
						//$('.k-grid-content-locked tr:eq('+$(this).index()+')').addClass('tag_total');
					});
				});
			}
			

}													
													
/**
 *  Iniciando a criação do Plugin
 */ 
(function( $ ) {
		
	 	/*
	 	 * Modelo de como esconder a Coluna
	 	 * @link http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-hideColumn
	 	 */
		 
		 /*
		  * Aplicando padrões para o Tema
 		  */
	 

	 	
	    $.fn.WrsGridKendoUiControlColumnPlusMinus = function(openStart) 
	    {	
	    	
			addKendoUiColorJQueryGrid();
			
			var $eventTelerik		=	 this;
			var _openStart			=	openStart ? true : false;
			var telerikGrid 		= 	this.data('kendoGrid');
			var IDName				=	'#'+$eventTelerik.attr('id');
			var wrsKendoUi			=	$.parseJSON(base64_decode($(IDName).attr('wrsKendoUi')));
			
				telerikGrid['wrs_frozen_data']			=	[];
				telerikGrid['wrs_frozen_data']['data']	=	[];
			
			/*
			 * Column Header Index criado por Marcelo Santos
			 */
			telerikGrid.headerIndex	=	WRSHeaderIndex(telerikGrid);

			/*
			 * Escondendo a Header principal com os exports 
			 */
			$eventTelerik.find('.k-header:first').attr('style','min-height:0px; height:0px;overflow:auto');
			$eventTelerik.find('.k-header:first a').attr('style','min-height:0px; height:0px;overflow:auto').hide();
			
			var wrs_export_event	=	 function(){
														var getClass	=	 $(this).attr('rel');
														if(!empty(getClass))
															{
																$('.'+getClass).trigger('click');
															}
													}
			
			$('.wrs_event_export').click(wrs_export_event);
			
			
			var countFrozen	=	 function(data)
												{
												var length		=	0;	
													for(obj in data)
													{
														var object	=	data[obj];
														for(_obj in object)
														{
															if(_obj=='locked')
															{
																length++;
															}
														}
													}
													
												return length;
												}; //END countFrozen
			/*
			 * Pegando as informações ads colunas Frozen
			 */
			var getRecursiveColumnFrozen	=	 function(data)
												{
														for(obj in data)
														{
															if(obj!=0) continue;
																														
															//Verificando se existe o padrão WRS key
															if(empty(data[obj].key))
															{
																	var subData	=	data[obj];
																	for(subObj in subData)
																	{
																		if(subObj=='columns')
																		{
																			if(subData[subObj].length>1) 
																			{
																				return subData[subObj];
																			}
																			return getRecursiveColumnFrozen(subData[subObj]);
																		}
																	}
															}
														}
														return data;
												}// END getRecursiveColumnFrozen
			
			

		
			/*
			 * Eventos dos Botões hiden and Show
			 */
			var buttonHideShow	= function()
									{
											var type			=	$(this).attr('rel');
											var event			=	'hide';
											var IDName			=	'#'+$eventTelerik.attr('id');
											var lastKey			=	'';
											var localKendoUI	=	$(IDName).data('kendoGrid');
											
											$(this).parent().find('.wrstelerikButtonHeader').hide();
											
											
											var telerikColumn	=	getRecursiveColumnFrozen(telerikGrid.columns);	//Procura por qual nível da sub header está a informação									
											var ColumnLength	=	countFrozen(telerikColumn);
											
											$eventTelerik.find('.'+$(this).attr('class')).each(
																								function(){ 
																									$(this).hide();
																									if($(this).attr('rel')!=type) 
																										$(this).show();
																									}
																								);
											
											if(ColumnLength<=2){
												$('.'+$(this).attr('class')).hide();
											}

											if(type=='plus') event='show';
											 
											 var type_plus_minus		=	type=='plus' ? true : false;
											 
											wrsKendoUiChange(IDName,'PLUS_MINUS',type_plus_minus);
											 
											buttonPlusMinus(IDName,type_plus_minus,ColumnLength);

											//Escondendo as headers 
											$(IDName).find('.k-grid-header-locked').find('tr:last-child').find('th').each(function(){
												
												if($(this).index()>=1)
												{
													var tr_index	=	$(this).parent().index();
													var td_index	=	$(this).index();
													var i_key		=	tr_index+'_'+td_index;
													var td_column	=	telerikGrid.headerIndex[i_key];	
													
													if(td_column['map']!='[LATITUDE]')
													{
														if(event=='hide')
														{
															
															telerikGrid.hideColumn(td_column);
														}
														else
														{

																telerikGrid.showColumn(td_column);

														}
														
														lastKey	=	i_key;
													}
													
												}
											});
											//END 
											//Apenas mantem a última coluna ativa
											
											var hIndex	=	telerikGrid.headerIndex[lastKey];
											var fiedlL	=	hIndex['field'];
											
											 
											if(event=='hide')
											{
												telerikGrid.showColumn(telerikGrid.headerIndex[lastKey]);
											}
											/*
											data || 1,D06-BACTROBAN
											index || 3
											field || C002
											*/
											
										
											if(localKendoUI['wrs_frozen_data']['data'].length)
											{
												
												var dataFrozenEmpty	=	localKendoUI['wrs_frozen_data']['data'];
												var tdIndex			=	localKendoUI['wrs_frozen_data']['index'];
													
													for(odfe in dataFrozenEmpty)
													{
														var	val_html	=	'';
														
														if(event=='hide')
														{
															val_html	=	dataFrozenEmpty[odfe];
														}
														
														$(IDName).find('.k-grid-content-locked tr:eq('+odfe+') td:eq('+tdIndex+')').attr('data-original','true');
														$(IDName).find('.k-grid-content-locked tr:eq('+odfe+') td:eq('+tdIndex+')').html(val_html);
													}
													
												
											}
											
											
											
											
											return false;
									};
									
													
			
			var plusButton		=	$('<span/>', {
													type	: 'button',
													title	: 'Plus title',
													rel		: 'plus',
													html	: $('<i/>',{'class':'fa fa-plus-circle'}),
													'class'	: 'wrstelerikButtonHeader'
												});
												
			var minusButton	= plusButton.clone().attr('rel','minus').html($('<i/>',{'class':'fa fa-minus-circle'}));
			
			this.find('.k-grid-header table:first tr:last').find('th:first-child').html(''); //Limpando a primeira Coluna
			
			this.find('.k-grid-header table:first tr:last').find('th:first-child').addClass('wrs_control_header_kendoUi');			
			//Não libera a ordenação para o primeiro segmento da coluna
			$('.wrs_control_header_kendoUi').show().unbind('click');
			
			//Abilita o Botão mais e menos só se existir o somatório
			

			if(wrsKendoUi['ALL_ROWS']==1)
			{
					this.find('.k-grid-header table:first tr:last').find('th:first-child').append(plusButton);
					this.find('.k-grid-header table:first tr:last').find('th:first-child').append(minusButton);
					//Eventos dos Botões
					plusButton.unbind('click');
					minusButton.unbind('click');
					
					
					plusButton.click(buttonHideShow);
					minusButton.click(buttonHideShow);

					if(_openStart)
					{
						plusButton.trigger('click');
					}
					else
					{
						minusButton.trigger('click');
					}
			}
			
			
			if(wrsKendoUi['DRILL_HIERARQUIA_LINHA']==1)
				{
					minusButton.addClass('hide');
					plusButton.addClass('hide');
				}
			
			
			/*
			 * Evento da Reordenação das Colunas
			 */
			 
			if(!telerikGrid.columns[0].key)
			{
				//Apenas cria o Evento da Reodenação 
						var columnReOrder		=	$('<span/>', {
																type	: 'button',
																title	: 'Reordenar Coluna',
																rel		: IDName,
																flag	: wrsKendoUi.ORDER_COLUMN,
																html	: $('<i/>',{'class':'glyphicon glyphicon-resize-horizontal'}),
																'class'	: 'wrs_reOrderButton'
															});
															
						this.find('.k-grid-header table:first tr:first-child').find('th:first-child').prepend(columnReOrder);
						//Evento ao clicar no Botão Reordena 
						columnReOrder.click(function(){
						
								var ID			=	$(this).attr('rel');
								var getParam	=	$.parseJSON(base64_decode($(IDName).attr('wrskendoui')));					
								var flag		=	getParam.ORDER_COLUMN;
								
								switch(flag)
								{
									case 0 : flag= 1 ; break;
									case 1 : flag= 0 ; break;
									default: flag= 0 ; break;
								}
								
								getParam['ORDER_COLUMN']		=	flag;
								wrsKendoUiChange($(IDName),'ORDER_COLUMN',flag);
								wrsRunFilter();//Executa o plugin nativamente 
						});
			}
			
			/*
			 * Evento para Ordenação de colunas
			 */
			var orderByColumnEvent	=	 function()
													{	
														var $e		=	$(this).parent();
														var field	=	$e.attr('data-field');
														var dir		=	$e.attr('data-dir');
														var desc	=	'descending';
														
														var columnType		=	 dir;
														
														
												
														
														var hasFrozen	=	 $e.parent().parent().parent().parent();
														if(hasFrozen.hasClass('k-grid-header-locked'))
														{
															//Quando for Frozen
															//Start ASCENTENTE
																	switch(dir)
																		{
																			case 'desc' : {dir='';desc='ascending'; columnType='asc';};break;
																			case 'asc' : {dir=undefined;columnType='desc';};break;
																			default: {dir=''; desc='ascending'; columnType='asc';};
																		}
														}else{
															//Start Descendente
															//Quando não é frozem
															switch(dir)
															{
																case 'desc' : {dir='';desc='ascending'; columnType='asc';};break;
																case 'asc' : {dir=undefined; columnType='desc';};break;
																default: {dir='asc'; desc='ascending'; columnType='desc'};
															}
														}
		
															$e.attr('data-dir',dir);
															$(this).attr('aria-sort',desc);
															
															/*
															 * 
															 */
															
															
															wrsKendoUiChange(IDName,'ORDER_BY_COLUMN',field);
															wrsKendoUiChange(IDName,'ORDER_COLUMN_TYPE',columnType);
															
															
															telerikGrid.dataSource._sort	= [];
															telerikGrid.dataSource._sort[0]	=	{'field':field,'dir':dir};
													}
													
													
			$eventTelerik.find('.k-grid-header table tr:last-child').find('th a').click(orderByColumnEvent);
			
			
			
			
			/*
			 *  Painel de Opções 
			 *  
			 */
			var addOptionsHeader	=	 function(e)
													{
															e.stopPropagation();//Para não fexar a Janela
															//Array para armazenar as informações das opções
															var getSelected		=	 [];
															var eachFind	=	 function()
																					{
																						getSelected[$(this).attr('name')]		=	 $(this).prop('checked') ? 1 : 0;
																					}
																	
															$(IDName+'NAV').find('.dropdown-menu-configuration').find('input[type=checkbox]').each(eachFind); //Starta o eventos
															
															//Gravando os Parametros
															wrsKendoUiChange(IDName,'',getSelected);
															
															
															wrsKendoUiChange($(IDName),'',getSelected);
															wrsRunFilter();//Executa o plugin nativamente 
															/*
														var getParam	=	$.parseJSON(base64_decode($(IDName).attr('wrsParam')));	
														var wrsKendoUi	=	$.parseJSON(base64_decode($(IDName).attr('wrsKendoUi')));
														var request		= _local_merge_array(getParam,wrsKendoUi);
														var all			= _local_merge_array(request,getSelected);*/
														//foreach(all);
														/*
														
														wrsRunGridButton(request);*/
														
													}
			
			
			var input_btn_add_opcoes	=	 function()
			{
								var getSelected=[];
									getSelected[$(this).attr('name')] = $(this).prop('checked') ? 1 : 0;
								
									wrsKendoUiChange($(IDName),'',getSelected);
									
									switch($(this).attr('name'))
									{
										case 'SUMARIZA'    :  	telerikGrid.dataSource.read(); break;
										case 'COLORS_LINE' : 	telerikGrid.dataSource.read(); break; 
									}
									
									
									rules_pendences_checkbox($(this),$(this).parents('ul'));
					
				
			}
			
			$(IDName+'NAV').find('.btn_add_opcoes').unbind('click').click(addOptionsHeader);//Criando o Evento de Clickes
			//End Painel Opções
			
			
			$(IDName+'NAV').find('.wrs_grid_options').find('input').unbind('click').click(input_btn_add_opcoes);
			
			//Preenchendo o FOrmulário de Opções no Load
			$(IDName+'NAV').find('.dropdown-menu-configuration').find('input[type=checkbox]').each(function(){
				if(isset(wrsKendoUi[$(this).attr('name')]))
				{
						if(!empty(wrsKendoUi[$(this).attr('name')]))
							{
								$(this).prop('checked',true);
							}
						
						rules_pendences_checkbox($(this),$(this).parents('ul'));
				}
			});
			//
			
			/*
			 * Aplicando o Thema
			 */
			

			
			var hideLatitudeColumn		=	 function(kendoUi,column)
												{
										
													
													 for(cc in column)
														 {
														 	
															if(column[cc]['hide'])
															{
																kendoUi.hideColumn(column[cc]);
															}

															if(column[cc]['columns'])
															{
																hideLatitudeColumn(kendoUi,column[cc]['columns']);
															}
														 }
												};
			
			var hideLatitude	=	 function(kendo)
										{
												
												var idName	=	 kendo.element.attr('id');
												var kendoUi	=	$('#'+idName).data('kendoGrid');
												
												hideLatitudeColumn(kendoUi,kendoUi.columns);
																};
			
			
			hideLatitude(telerikGrid);			
			$eventTelerik.find('.k-grid-header').find('th').each(function(){
				$(this).addClass('ui-state-default');
				
			});
			
			$eventTelerik.find('.k-pager-wrap').each(function(){
				$(this).addClass('ui-state-default');
			});
			
			$eventTelerik.find('.k-pager-wrap').each(function(){
				$(this).addClass('ui-state-default');
			});
			
			$eventTelerik.find('.k-grid-header').each(function(){
				$(this).addClass('border_button ui-state-default ');
			});
			
			$eventTelerik.find('.k-grid-content-locked,.k-grid-content').each(function(){
				$(this).addClass('border_color');
			});
			/* END THEME */
			
	        return this;
	    };
	 
		/*
		 * @link http://demos.telerik.com/kendo-ui/grid/frozen-columns
		 * @link http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-hideColumn
		 * @link http://docs.telerik.com/kendo-ui/web/grid/how-to/Layout/apply-minimum-width-during-column-resize
		 */
		$.fn.minMaxWidth = function(_param) 
		{
				var telerikGrid 	= 	this.data('kendoGrid');
				var minWidth		=	_param.minWidth;
				var maxWidth		=	_param.maxWidth;
				return this;
		}
				
	}( jQuery ));
 
 
 
 
 
 
 
 
 
 
