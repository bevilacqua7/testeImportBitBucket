
/*
 * PLUGIN WRS GRID
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 */
  
/**
 * Verificnado se existe alterações nos filtros
 */


	 /*
	  * Configurações para aplicar a visualização das Titles do qTipe
	  */
        $(document).ready(function() {
        	   $('.tooltip_info_wrs_panel').qtip({
        	         content: {
								text: function(event, api) 
										{
											return $('<div class="container"> '+tagFilterWRS()+'</div>');
										},
								title : 'Filtros'
            	         },
        	         style: {
        	        	 classes: 'qtip-bootstrap qtip-shadow'
        	         }, events: {
        	             render: function(event, api) {
        	                 // Grab the BGIFrame element
        	                 var elem = api.elements.bgiframe;
        	             }}
        	         /*position: {
        	        	 my: 'top left',  // Position my top left...
        	             at: 'top right', // at the bottom right of...
        	             target: 'mouse', // Track the mouse as the positioning target
        	             adjust: { x: 20, y: 5 } // Offset it slightly from under the mouse
        	         }*/
        	     });
        	   
      	     
            
        });
        

function convert_to_class(array)
{
	var tmp		=	[];
	
	for(x in array)
		{
			tmp[x]	=	'__'+replace_attr(array[x]);
		}
	
	return tmp;
}


function findFilterMergeLoad(filterMerge,levelFull)
{
	for(d in filterMerge)
		{
			if(filterMerge[d][0]==levelFull)
			{
				return filterMerge[d][2];
			}
		}
	
	return '';
}
function filterMergeLoad(filter_current,filterMerge)
{
	var array_user		=	[];
	var filters_add		=	[];//INforma quais atributos já foram utilizados para não repetir

	
	for(x in filter_current)
		{
			var levelFull		=	'__'+replace_attr(filter_current[x][0]);
			
			var replace_filter	=	findFilterMergeLoad(filterMerge,levelFull);
			
			var filter			= 	!isset(filter_current[x][2]) ? 'a' : filter_current[x][2];
			
			if(!empty(replace_filter))
			{
				if(empty(filter))
					replace_filter			=	replace_filter;
				else					
					replace_filter			=	filter+','+replace_filter;
				
				filter		=	replace_filter;
				filters_add[levelFull]	=	true;		
			
			}
			//garante que não se repita as informações no array principal
			array_user[array_user.length]	=	[levelFull,filter_current[x][1],filter];
		}
	

		if(is_array(filterMerge))
			{
				for(fm in filterMerge)
					{//ARRAY
							if(isset(filters_add[filterMerge[fm][0]])) continue;
							
							array_user[array_user.length]	=	filterMerge[fm];
					}
			}
			else
			{
				if(!isset(filters_add[filterMerge[0]]))
				{
					array_user[array_user.length]	=	filterMerge;
				}
			}
	
	if(array_user.length==0) return '';
	return array_user;
}


function changeWithDrillColumnRows(column,columnName)
{
	var _column						=	[];
		_column[columnName]	=	 convert_to_class(column);
		set_value_box_relatorio(_column);
		cleanPlaceholder();
		$('.wrs_panel_filter_icon').attr('filter_hide','false').trigger('click');
		wrsRunFilter();
}
//Removendo qualquer informação de placeholder que é a mensagem de que não há valores na tela 
function cleanPlaceholder()
{
	$(".WRS_DRAG_DROP_FILTER").find('.placeholder').remove();
}

function changeWithDrillFilter(layout,filter_to_add)
{
	var 	btnRun	=	$('.wrs_run_filter');
	var 	json	=	$.parseJSON(base64_decode(btnRun.attr('history'))) ;
	
	
	//btnRun.attr('history','');
	//Mudando o status para que possa ser renderizado

	var changeLayout	=	{};
	var filtersCurrent	=	tagFilterWRS(true);
	
	
	if(!empty(layout['LAYOUT_ROWS']))
	{
		changeLayout['LAYOUT_ROWS']			=	convert_to_class(layout['LAYOUT_ROWS']);
	}
	
	if(!empty(layout['LAYOUT_COLUMNS']))
	{
		changeLayout['LAYOUT_COLUMNS']			=	convert_to_class(layout['LAYOUT_COLUMNS']);
	}
	
	if(!empty(layout['LAYOUT_MEASURES']))
	{
		changeLayout['LAYOUT_MEASURES']			=	convert_to_class(layout['LAYOUT_MEASURES']);
	}
	
	
	
	
		
	if($(".WRS_DRAG_DROP_FILTER h2").length==0)
	{
		if(is_array(filter_to_add))
			{
					changeLayout['LAYOUT_FILTERS'] = filterMergeLoad(filtersCurrent,filter_to_add);
			}else
			{
					changeLayout['LAYOUT_FILTERS'] = [filter_to_add];
			}
		
	}else{
		//Quando já existir filtros
		changeLayout['LAYOUT_FILTERS'] =  filterMergeLoad(filtersCurrent,filter_to_add);	
	}
	
	

	set_value_box_relatorio(changeLayout);
	
	//Removendo qualquer informação de placeholder que é a mensagem de que não há valores na tela 
	cleanPlaceholder();
	
	$('.wrs_panel_filter_icon').attr('filter_hide','false').trigger('click');
	btnRun.trigger('click');
}




function compare_filter_change(_filters_compare)
{
	
	if(empty(_filters_compare)) return false;
	
	 var filters_compare 	=	 explode(',',_filters_compare);
	
	  for(obj in filters_compare)
	  {
	  		var headerFilter	=	'#'+filters_compare[obj];
	  		var header			=	$(headerFilter).attr('json');
        	var json			=	$.parseJSON(base64_decode(header));	   

        	var filter			=	 [];
	  		var filter_click	=	 [];
	  		
        	if(!empty(json['FILTER']))
        	{
        		filter			=	 explode(',',json.FILTER);
        	}
        	
	  		if(!empty(json['FILTER_CLICK']))
	  		{
	  			filter_click	=	 explode(',',json.FILTER_CLICK);
	  		}
	  		

	  		if(filter.length != filter_click.length){
	  			return true;
	  		}

	  		for(objFilter in filter)
	  			{
	  					if(!in_array(filter[objFilter],filter_click, true)) 
	  					{
	  						return true;
	  					}
	  			}
	  			
	  }
		  return false;
	
}


/**
 * Apaga a estrutira de Filtros
 */
function WRS_clean_filter()
{
	var getID		=	 $('.wrsGrid').attr('id');
		$('.wrs_run_filter').removeAttr('history').removeAttr('locked').removeAttr('flag_load');
		
		$('.wrsGrid').removeClass('wrsGrid')
		$('#'+getID+'Main').addClass('hide');
		//$('.wrsGrid').removeAttr('wrsparam').removeAttr('wrskendoui');
}

function WRS_filter_hide()
{
	var getID		=	 $('.wrsGrid').attr('id');
		$('.wrsGrid').removeClass('wrsGrid')
		$('#'+getID+'Main').addClass('hide');
		//$('.wrsGrid').removeAttr('wrsparam').removeAttr('wrskendoui');
}


/**
 * Verificando se existe alteração nas vertentes para a pesquisa
 */
function is_wrs_change_to_run(_param_request)
{
	
	var param_request	=	 _param_request;
	
	
	var filter			=	$('.wrs_run_filter');
	var history			=	filter.attr('history');
	var histoty_param	=	{};
	var flag			=	true;
	var change_TOP		=	false;
	var eastonclose		=	$('.wrs_run_filter').attr('eastonclose');
	var loadStart		=	 true;
	
//	console.log('isHistory',_param_request);
	
	
	//foreach(param_request);
	if(empty(history))
	{
		
		for(lineHistoty_param in param_request)
			{
				histoty_param[lineHistoty_param]	=	param_request[lineHistoty_param];
			}
		
		/*
		histoty_param['LAYOUT_ROWS']	=	param_request['LAYOUT_ROWS'];	
		histoty_param['LAYOUT_COLUMNS']	=	param_request['LAYOUT_COLUMNS'];	
		histoty_param['LAYOUT_MEASURES']=	param_request['LAYOUT_MEASURES'];	
		histoty_param['LAYOUT_FILTERS']	=	param_request['LAYOUT_FILTERS']	;
		histoty_param['TOP_CONFIG']		=	''	;
		histoty_param['ORDER_COLUMN']	=	0	;
		histoty_param['ALL_COLS']		=	''	;
		histoty_param['ALL_ROWS']		=	''	;
		histoty_param['DRILL_HIERARQUIA_LINHA']		=	''	;
		histoty_param['DRILL_HIERARQUIA_LINHA_DATA']		=	''	;*/
		
		
//		console.log('histoty_param',histoty_param);
		
		
		if(param_request['IS_REFRESH']==TRUE){
			param_request['IS_REFRESH']							=	'_false';
		}
		
		var base64						=	base64_encode(json_encode(histoty_param,true));
		

		if(eastonclose=='true')
		{
			MODAL_LOADING_WRS_PANEL();
			$('.wrs_run_filter').attr('eastonclose','false');
			loadStart	=	false;
		}
		
		filter.attr('history',base64);
		
		return {status:false, val:param_request};
	}
	
	histoty_param	=	$.parseJSON(base64_decode(history));


	if(empty(param_request['ALL_COLS'])) param_request['ALL_COLS']='';
	
	if(empty(param_request['ALL_ROWS'])) param_request['ALL_ROWS']='';

	if(empty(param_request['ORDER_COLUMN'])) param_request['ORDER_COLUMN']=0;
	if(histoty_param['LAYOUT_ROWS']!=param_request['LAYOUT_ROWS']) 			flag=false;
	
	if(histoty_param['LAYOUT_COLUMNS']!=param_request['LAYOUT_COLUMNS']) 	flag=false;

	if(histoty_param['LAYOUT_MEASURES']!=param_request['LAYOUT_MEASURES']) 	flag=false;
	if(histoty_param['LAYOUT_FILTERS']!=param_request['LAYOUT_FILTERS'])	flag=false;

	if(histoty_param['ORDER_COLUMN']!=param_request['ORDER_COLUMN'])		flag=false;
	
	if(histoty_param['ALL_COLS']!=param_request['ALL_COLS'])				flag=false;
	
	if(histoty_param['ALL_ROWS']!=param_request['ALL_ROWS'])				flag=false;

	if(histoty_param['DRILL_HIERARQUIA_LINHA_DATA_MINUS']!=param_request['DRILL_HIERARQUIA_LINHA_DATA_MINUS'])				flag=false;
	
	if(histoty_param['TOP_CONFIG']!=param_request['TOP_CONFIG']){
		flag=false;
		
		if(!empty(histoty_param['TOP_CONFIG'])){
			//Exceção para limpar os TOPs
			param_request['DRILL_HIERARQUIA_LINHA_DATA_HEADER']	=	"";
			param_request['DRILL_HIERARQUIA_LINHA_DATA']		=	"";
		}
	}
	
	if(!flag)
	{

		//Garante que ao clicar na linha de drill na primeira vez seja executada
		if(	(!empty(histoty_param['DRILL_HIERARQUIA_LINHA_DATA']) && !empty(histoty_param['DRILL_HIERARQUIA_LINHA_DATA_HEADER']))  || 
			param_request['TYPE_RUN']=='DrillLinha' || 
			param_request['TYPE_RUN']=='DrillHeaderData')
		{
			param_request['DRILL_HIERARQUIA_LINHA_DATA_HEADER']	=	"";
			param_request['DRILL_HIERARQUIA_LINHA_DATA']		=	"";
		}
	}

	if(histoty_param['DRILL_HIERARQUIA_LINHA']!=param_request['DRILL_HIERARQUIA_LINHA'])				flag=false;
	
	if(histoty_param['DRILL_HIERARQUIA_LINHA_DATA']!=param_request['DRILL_HIERARQUIA_LINHA_DATA'])				flag=false;
	 	//Gravando o Histórico
	if(flag)
	{
		
		if(eastonclose=='true')
		{
			$('.wrs_run_filter').attr('eastonclose','false');
			resizeGridSimple();
		}
		else
		{
			if(empty($('.wrs_run_filter').attr('history')))
			{
				WRS_ALERT(LNG('RUN_GRID_CHANGE_NOT'),'warning');

			}else{
				CLOSE_LOAD_RELATORIO();
				
				if($('.wrs_run_filter').attr('eastonclose')!='true')
					{
						var _visible	=	$('.wrs_panel_center_body').attr('index-visible');
						if(_visible!='block')
						{
							WRS_ALERT(LNG('RUN_GRID_CHANGE_NOT'),'warning');
						}
					}
					
				wrs_panel_layout.close('east');
				$('.wrs_panel_center_body').hide();
				$('.wrs_panel_filter_icon').hide();
			}
			
		}
		
		return {status:true, val:param_request};
		
	}
	else
	{
	
		
		if(eastonclose=='true')
			{
				if(loadStart)
				{	
					MODAL_LOADING_WRS_PANEL();
				}
				$('.wrs_run_filter').attr('eastonclose','false');
			}
		
		/*
			histoty_param['LAYOUT_ROWS']	=	param_request['LAYOUT_ROWS'];	
			histoty_param['LAYOUT_COLUMNS']	=	param_request['LAYOUT_COLUMNS'];	
			histoty_param['LAYOUT_MEASURES']=	param_request['LAYOUT_MEASURES'];	
			histoty_param['LAYOUT_FILTERS']	=	param_request['LAYOUT_FILTERS']	;		
			histoty_param['ORDER_COLUMN']	=	param_request['ORDER_COLUMN']	;
			histoty_param['ALL_COLS']		=	param_request['ALL_COLS']	;
			histoty_param['ALL_ROWS']		=	param_request['ALL_ROWS']	;
			histoty_param['DRILL_HIERARQUIA_LINHA']			=	param_request['DRILL_HIERARQUIA_LINHA']	;
			histoty_param['DRILL_HIERARQUIA_LINHA_DATA']	=	param_request['DRILL_HIERARQUIA_LINHA_DATA'];//Mante sempre nula para que possa fazer nova consulta//param_request['DRILL_HIERARQUIA_LINHA_DATA']	;
			histoty_param['TOP_CONFIG']	=	param_request['TOP_CONFIG'];
			
			*/
			
			for(lineHistoty_param in param_request)
			{
				histoty_param[lineHistoty_param]	=	param_request[lineHistoty_param];
			}
			
			
			
			histoty_param['DRILL_HIERARQUIA_LINHA_DATA_MINUS']='';
			//histoty_param['DRILL_HIERARQUIA_LINHA_DATA_HEADER']='';
			histoty_param['DRILL_HIERARQUIA_LINHA_DATA']='';
			
	
			filter.attr('history',base64_encode(json_encode(histoty_param,true)));
	}
	
	return {status:false, val:param_request};
}


/** 
 *  Força o click para processar o Relatório
 */
function wrsRunFilter()
{
		$('.wrs_run_filter').trigger('click');
}

function wrsFilterShow()
{
//	$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide(); // Ativando o Drag And Drop 
	//$('.WRS_DRAG_DROP_FILTER_CONTAINER').show(); //Escondendo a estrutura de pesquisa de filtro
	var filter	=	$('.wrs_panel_filter_icon');

		if(!filter.attr('filter_hide'))
		{
			filter.attr('filter_hide', false).trigger('click'); 
		}
	
		if(!$('.WRS_DRAG_DROP_FILTER').is(":visible"))
		{
			filter.trigger('click');
		}
}

function tagFilterWRS(typeReturn)
{
	//Salvando para poder recuperar as seleções
	var html		=	'';
	var structArray	=	[];
	$(".WRS_DRAG_DROP_FILTER h2").each(function(){
 		
 		var json	=	 	$.parseJSON(base64_decode($(this).attr('json')));
 		
 		var atributo	=	$(this).attr('atributo');
 			atributo	=	empty(atributo) ? '' : atributo;
 			
 			structArray[structArray.length]	=	[json['LEVEL_FULL'], atributo ,json['FILTER']];
 			
 				if(!empty(json['FILTER']))
 				{
 					if(!empty($(this).attr('vvalue')))
 	 				{
 	 					html+='<h3>'+$(this).attr('vvalue')+'</h3> ';
 	 				}
 	 				
 					
 					var _explode		=	explode(',',json['FILTER']);
 					
 					for(obj in _explode)
 						{
 							var value	=	_explode[obj];
 							
 							var v_explode	=	 explode('[',value);
 							value	=	str_replace(']','',v_explode[v_explode.length-1]);
 							html+='<p>'+value+'</p>';
 						}
 					
			 		 	
			 	}
 	});
 	
 	if(empty(html))
 	{
 		html	=	fwrs_warning(LNG('FILTER_NOT_ROWS_TOOLTIP'));
 	}
 	
 	if(typeReturn) return structArray;
 	
 	return html;
 	
}
function wrsFilterClickFalse()
{
			$('.wrs_panel_filter_icon').attr('filter_hide', false); 
}
	 
(function ( $ ) {
    $.WrsFilter= function(typeEvent,typeValue) {

    	
    	
    	$event		=	 this;
    
    
    	var G_MSG_FILTER_CLEAN	=	'';
    	//Esconde o ACordion para a busca do Filtro
    	
    	if(!$('.wrs_panel_filter_icon').attr('filter_hide')){
    		$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
    	}
    	//Ativando o Accordion dos menu
    	$( ".WRS_DRAG_DROP_FILTER" ).accordion({collapsible: true,active: false,heightStyle: 'content'});

    	
    	
    	var wrs_filter_check_change_filter = function()
    	{
    		var flag_back		=	false;
    		$(".WRS_DRAG_DROP_FILTER").find('h2').each(function(){
    			var json				=	$.parseJSON(base64_decode($(this).attr('json')));	   

    			if(json['FILTER_TO_CLEAN']==true)
    			  	{
    			        if(compare_filter_change(json['FILTER_TO_COMPARE']))
    			        	{
    			        			setJsonEncodeDecode($(this),['FILTER','FILTER_TO_CLEAN','FILTER_CLICK','FILTER_TO_CLEAN'],['',false,'',false],true,true);
    			        			flag_back	=	 true;
    			        	}	 	
    			       }
    			
    		});
    		
    		return flag_back;
    	}

    	
    	var setJsonEncodeDecode	=	 function(localEvent,label,value,pageCurrentHome,noLoad)
    	{
    		var index_data			=	 localEvent.attr('index-data');
    		var main				=	$('#wrs_header_filter_main_'+index_data);
    		var json				=	$.parseJSON(base64_decode(main.attr('json')));	
    		
    		
    		if(is_array(label))
    			{
    			//Caso seja passado array
    			for(obj in label)
    				{
    						var _value						=	value;
    						
    						/*
    						 * O array poder ser passado uma única variável para repassar a todos ou repassar uma
    						 * variável para cada
    						 */
    						if(is_array(value))
    							{
    									_value				=	value[obj];
    							}
    						
    						json[label[obj]]				=	_value;
    				}
    			
    			}else{
    					json[label]				=	value;
    			}
    		
    		if(pageCurrentHome)
    		{
    			json['PG_CURRENT']				=	0;
    		}
    		
    		main.attr('json',base64_encode(json_encode(json,true)));
    		
    		if(!noLoad)
    		{
    			clickHeaderFiltro(main,'loadWrs');
    		}
    		
    	}

    	
    	
    	var cleanFiltersDown  = function(level_down,typeEvent,nameTagHeader)
    	{
    			
    		var levelDown			=	[];
				levelDown			=	 explode(',',level_down);			
			
			if(empty(level_down) && empty(typeEvent)) return '';
				
			$('.WRS_DRAG_DROP_FILTER h2').each(function(){
					var level_full					=	$(this).attr('level-full');	
					var json						=	$.parseJSON(base64_decode($(this).attr('json')));	
					
						//Verificando se o Level Full exist no array passado
						if(in_array(level_full, levelDown, true) || typeEvent=='all')
						{
							var is_simples	=	 $(this).attr('atributo');
							/*
							 * Apenas limita quando for clicado no botão 
							 * o all é acionado apenas no botão sentrão quando não vem pelo all 
							 * ele foi acionado pelo request da mudança do pai
							 */
							var is_simples	=	typeEvent=='all' ? is_simples : ''; 
							
							if(is_simples!='simples' || typeEvent=='all')
							{	
								/*
								 * Se o filtro foi modificado então apaga os filhos
								 */
								if(typeEvent=='all')
									{
										setJsonEncodeDecode($(this),['LIKE','FILTER_TO_CLEAN','FILTER','FILTER_TO_COMPARE','FILTER_CLICK'],['',false,'','',''],true,true);
									}else{
										var FILTER_TO_COMPARE	=	 [];
										if(nameTagHeader)
										{
											if(!empty(json['FILTER_TO_COMPARE'])){
												FILTER_TO_COMPARE							=	explode(',',json['FILTER_TO_COMPARE']);
											}
											
											if(!in_array(nameTagHeader,FILTER_TO_COMPARE, true))
											{
												FILTER_TO_COMPARE[FILTER_TO_COMPARE.length]	= nameTagHeader;	
											}
										}
										
										var FILTER_TO_COMPARE		=	implode(',',FILTER_TO_COMPARE);

										setJsonEncodeDecode($(this),['LIKE','FILTER_TO_CLEAN','FILTER_TO_COMPARE'],['',true,FILTER_TO_COMPARE],true,true);
									}
							}
							
						}
					
			});

    	}
    	

		
		/**
		 * Pegando os Filtros pais 
		 */
		var getFiltersLevelUP =	function(level_up,typeEvent)
		{
			var levelUP			=	[];
			var filters_up		=	[];
			var empty_filter	=	false;
			var tagQuery		=	'';
			var FilterOriginal	=	[];
			
				levelUP			=	 explode(',',level_up);			
			
			if(empty(level_up) && empty(typeEvent)) return '';

				
			$('.WRS_DRAG_DROP_FILTER h2').each(function(){
					var level_full					=	$(this).attr('level-full');	
					var json						=	$.parseJSON(base64_decode($(this).attr('json')));	
					var _json_filter				=	'';
						//Verificando se o Level Full exist no array passado
						if(in_array(level_full, levelUP, true) || typeEvent=='all')
						{
							if(!empty(json.FILTER))
							{/*
								if(typeEvent=='all')
								{
									//Para executar o relatório
									filters_up[filters_up.length]	=	json.FILTER;	
								}else{
									*///PAssando para montar os Filtros 

									_json_filter						=	json.FILTER;
									filters_up[filters_up.length]	=	'{'+json.FILTER+'}';								
								//}
								//empty_filter					=	false;
							}
							
							FilterOriginal[FilterOriginal.length]	=	{'class':'__'+replace_attr(level_full),data:_json_filter};
						}
					
			});
			
			//foreach(FilterOriginal);
			//if(empty_filter) return '';
			
			if(is_array(filters_up)) 
				{
 					tagQuery	=	 implode(',',filters_up);
				}else{
					tagQuery	=	'';
				}
			
			
			if(typeEvent=='all') return {data:tagQuery,full:FilterOriginal};
			
 			return tagQuery; 			
		}
		
		 
		 /*
		  * Gravando total de atributos
		  */
		 var setSizeDataFilterClean = function(size_data)
		 {
		     $('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
		     
		     if($('.wrs_panel_filter_icon').attr('filter_hide') || size_data=='all')
		     {		
		    	 cleanFiltersDown('','all'); //Apagando todos os Selects
		     }
		     
		 }
		 
		 
		var getAllFiltersToRun	=	 function()
			{

					return getFiltersLevelUP('','all');
				//	return getFiltersUP(size,true);
			}
		
		 
		
		//Force Result Clean
		switch(typeEvent)
		{
			case 'getAllFiltersToRun' 		: return getAllFiltersToRun()				; break;
		}
		
	 
		

		
		
		var menuFilter	=	 function(index_data,nameID,type,_searchText)
		{
			var searchText					=	 _searchText ? _searchText : '' ;
			var header_main					=	$('#wrs_header_filter_main_'+index_data);
			var atributo_simples_composto	=	header_main.attr('atributo');
			var textDigit					=	$(nameID).find('.div_componente_filter').find('input').val();
				searchText					=	textDigit ? textDigit : searchText;
			
			html	=	'<div class="form-inline div_componente_filter">'
			html	+=  '  <div class="form-group">'
			html	+=  '    <div class="input-group">'
			html	+=  '      <input type="text" class="form-control wrs_element btn_event_filtro_search_input" value="'+searchText+'" index-data="'+index_data+'" placeholder="'+LNG('WHAT_SEARCH')+'">'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_search" index-data="'+index_data+'"><i class="fa fa-search"></i></div>'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_clean" index-data="'+index_data+'"><i class="fa fa-eraser"></i></div>'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_remove" index-data="'+index_data+'"><i class="fa fa-trash-o"></i></div>'
			html	+=  '    </div>'
			html	+=  '  </div>'
			html	+=  '</div>';
			
			
			$(nameID).find('.div_componente_filter').remove();
			
			switch(type)
			{
				case 'before'	:  $(nameID).prepend(html); break;
				case 'after'	:  
									{
											var table = $(nameID).find('table tr:first-child td:eq(1)');
											
											if(isset(table[0]))
											{
												table.html(html);
											}
											else
											{
												var _html	=	$(nameID).html();
												$(nameID).html('<div class="wrs_filter_body_container">'+html+_html+'</div>');
												
											}
											
											
									}
				;break;
			}
			

			
			//configurando a borracha
			
			//btn_event_filtro_clean
			
			if(!searchText)
				{
					$(nameID).find('.btn_event_filtro_clean').hide();
				}
			
			/*
		 	 * @Link http://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
		 	 */
		 	var btn_event_filtro_search=	 function()
		 	{
		 		var input		=	$(this).parent().find('.btn_event_filtro_search_input');
		 		setJsonEncodeDecode(input,'LIKE',input.val(),true);
			}	
		 	
		 	
		 	var btn_event_filtro_remove=	 function(){

		 		$evento	=	$(this);
		 		
		 		WRS_CONFIRM(LNG('FILTER_CLEAN_FILTER'),'warning',function(result){
		 			
		 									if(result)
		 									{
		 										G_MSG_FILTER_CLEAN	= LNG('FILTER_CLEAN_FILTER_SUCCESS');
		 										setJsonEncodeDecode($evento,['FILTER','LIKE'],'',true);		 										
		 									}
		 		});
		 		
		 	}	
		 	
		 	
		 	var btn_event_filtro_search_input=	 function(e)
		 	{
		 		if(e.which == 13) 
		 		{
		 			setJsonEncodeDecode($(this),'LIKE',$(this).val(),true);
		 		}
		 	}	
		 	
		 	var btn_event_filtro_search_input_up=	 function(e)
		 	{
		 		if(!empty($(this).val()))
		 			{
		 				$(this).parent().find('.btn_event_filtro_clean').show();
		 			}else{
		 				$(this).parent().find('.btn_event_filtro_clean').hide();
		 			}
		 	}	
		 	

		 	var btn_event_filtro_clean	=	 function()
		 	{
		 		//Limpando a pesquisa
		 		setJsonEncodeDecode($(this),'LIKE','',true);
		 	}
		 	
		 	
		 	/*
		 	 * Apenas implementa o evento quando terminar de carregar
		 	 */
		 	
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search').unbind('click').click(btn_event_filtro_search);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search_input').unbind('keypress').keypress(btn_event_filtro_search_input).focus();
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search_input').unbind('keyup').keyup(btn_event_filtro_search_input_up);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_clean').unbind('click').click(btn_event_filtro_clean);
			 	
			 	if(atributo_simples_composto!='simples')
			 	{
				 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_remove').unbind('click').click(btn_event_filtro_remove);
			 	}else{
			 		$(nameID).find('.btn_event_filtro_remove').hide();
			 	}


			 	//Remove os Eventos se for before
			 	if(type=='before')
			 	{
			 		$(nameID).find('.wrs_element').each(function(){
				 		$(this).prop('disabled', true);
				 		$(this).addClass('not-allowed ');
				 	});
			 	}
		 	
		 	 
		 	
		 	
		 	
		 	
			
		}
		
		/**
    	 * Função responsável por criar o Acordion para pesquisa dos Filtros
    	 * 
    	 */	
         var  clickHeaderFiltro	 = function (_event,type)
         {
        	 var event				=	 _event;
        	 var pageHome			=	false;
        	 if(type!='loadWrs')
        	 {
        		 event				=	 $(this);
        		 pageHome			=	true;
        	 }

        	 
        	 var json				=	$.parseJSON(base64_decode(event.attr('json')));	        	 
        	 var index_data			=	event.attr('index-data');
        	 var wrs_filter_body	=	'#wrs_filter_body_'+index_data;
        	 var body				=	$(wrs_filter_body);
        	 
	        	 json['id']			=	wrs_filter_body;
	        	 json['index_data']	=	index_data;
	        	 json['FILTER_UP']	=	getFiltersLevelUP(json['LEVEL_UP']);
	        	 json['atributo']	=	event.attr('atributo');

	         var filter					=	empty(json['FILTER']) ? '' : json['FILTER'];
        	 /*
        	  * Verifica se o Filtro foi modificado
        	  */
        	 if(json['FILTER_TO_CLEAN']==true)
        		 {
        		 	if(compare_filter_change(json['FILTER_TO_COMPARE']))
        		 	{
        		 		json['FILTER']				=	'';
        		 	}
        		 	
        		 	json['FILTER_TO_CLEAN']		=	false;
        		 	setJsonEncodeDecode(event,['FILTER','FILTER_TO_CLEAN','FILTER_CLICK'],['',false,filter],true,true);
        		 }
        	 else
        		 {
        		 
        		 json['FILTER_CLICK']	=	filter;
        		 }
        	 
        	 if(pageHome)
        		{
        		 	json['PG_CURRENT']		=	0;
        		}
        	 
        	 
        	 var _wrs_multiple_cube_event	=	$('.wrs_multiple_cube_event').find('option').length;
     		//Verificando se existe multiplos cubos
     		if(_wrs_multiple_cube_event>1){
     			var jsonMukltiple	=	$('.wrs_multiple_cube_event').find('option:selected').attr('json');
     			var _json			=	$.parseJSON(base64_decode(jsonMukltiple));	
     			
//     			foreach(_json);
     			json['CUBE_ID']		=	_json['CUBE_ID'];
     			json['json']		=	jsonMukltiple;	
     		}
     		
        	 
			 setLoading(body.find('.wrs_filter_body_container'));
			 
			 menuFilter(index_data,wrs_filter_body,'before',json['LIKE']);
			 
        	 runCall(json,'WRS_FILTER','WRS_FILTER','filter_select_info',funCallBackRun,'modal','json');
         }
         
         
    /**
     * Retorno da Class FILTER
     */
	 var funCallBackRun	=	 function(data)
	 	{
		 	$(data.data.id).find('.wrs_filter_body_container').html(data.html);

	 		var index_data			=	 data.data.index_data;
 			var _main				=	$('#wrs_header_filter_main_'+index_data);
		 		_main.attr('json',base64_encode(json_encode(data.data,true)));

				
		 
		 	/*
		 	 * Auto detect checkBox Main
		 	 */
		 		
		 		var checkBoxAll	=	 true;
		 		$(data.data.id).find('.wrs_filter_body_container').find('.wrs_input_filter_single').each(function(){
		 			if(!$(this).prop('checked')) checkBoxAll = false;
		 		});
		 		
		 		$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_checkbox').each(function(){
		 			$(this).prop('checked',checkBoxAll);
		 		});
		 		
		 	/*
		 	 * Eventos
		 	 */
		 	var btn_event_filtro_next_back		=	 function(){
		 		
		 			//setJsonEncodeDecode($(this),'next',10);
		 		
		 			var type	= $(this).attr('type');
		 			
		 			var index_data			=	 $(this).attr('index-data');
		 			var main				=	$('#wrs_header_filter_main_'+index_data);
		 			var json				=	$.parseJSON(base64_decode(main.attr('json')));	
		 			
		 			var page_current		=	json.PG_CURRENT;
		 			
		 			switch(type)
		 			{
		 				case 'next' :  page_current++; break;
		 				case 'back' :  page_current--; break;
		 			}
		 				
		 			setJsonEncodeDecode($(this),'PG_CURRENT',page_current);
		 			
		 		}

		 	
		 	var wrsFilteValuerControl		=	 function(arrayFilter,value,remove)
		 	{
		 		var tmp		=	[];
		 		
		 		for(obj in arrayFilter)
		 			{
		 				if(!remove)
		 				{
		 					if(arrayFilter[obj]==value)return false;
		 				}
		 				else
		 				{
		 					if(arrayFilter[obj]!=value)
		 						{
		 							tmp[tmp.length]=arrayFilter[obj];	
		 						}
		 				}
		 			}
		 		
		 		//Retorna apenas o que foi removido
		 		if(remove) return tmp;
		 		
		 		return true;
		 	}
		 	
		 	
		 	var btn_event_filtro_checkbox	=	 function()
				 	{
					 		var index_data	=	$(this).attr('index-data');
					 		var nameTag		=	'wrs_filter_body_'+index_data;
				 			var main		=	$('#'+nameTag);
				 			var checked		=	$(this).prop('checked');
				 			var nameTagMain	=	'wrs_header_filter_main_'+index_data;
				 			var mainFilter	=	$('#'+nameTagMain);
				 			var json		=	$.parseJSON(base64_decode(mainFilter.attr('json')));	
				 			var filter		=	 explode(',',json.FILTER);
				 			var value		=	'';
				 			
				 			if(empty(filter)) filter=[];
				 			
				 			
				 			
				 			main.find('input[type=checkbox]').each(function(){
				 				if(!$(this).hasClass('btn_event_filtro_checkbox'))
				 				{
				 					if(checked)
				 						{
				 							value = $(this).val();
				 							if(wrsFilteValuerControl(filter,value))
				 								{
				 									if(!empty($.trim(value)))
				 										{
				 											filter[filter.length]= value;	
				 										}
				 								}
				 						}
				 						else
				 						{
				 							filter	=	wrsFilteValuerControl(filter,value,true);
				 							filter	=	'';
				 						}
				 					
				 					$(this).prop('checked',checked);
				 				}
				 			});
				 			
				 			
				 			if(is_array(filter))
				 			{
				 				json['FILTER']	=	implode(',',filter);
				 			}else
				 			{
				 				json['FILTER']	=	'';
				 			}
				 				
				 			//Gravando no JSON
				 			mainFilter.attr('json',base64_encode(json_encode(json,true)));
				 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTagMain);
				 	}
		 	
		 	
		 	var wrs_input_filter_single	=	 function()
		 	{
				var index_data	=	$(this).attr('index-data');
				var nameTag		=	'wrs_header_filter_main_'+index_data;
	 			var main		=	$('#'+nameTag);
	 			var json		=	$.parseJSON(base64_decode(main.attr('json')));	
	 			var filter		=	'';
	 			var type_input	=	$(this).attr('type');
	 			var checked		=	$(this).prop('checked');
	 			var value 		=	$(this).val();
	 			
	 			if(type_input=='radio' && checked)
		 			{
		 				json['FILTER']	=	'';
		 				json['FILTER_CLICK']	=	 $(this).val();
		 			}		 			
	 			
	 			if(!empty(json.FILTER))
	 				{
	 					filter	=	explode(',',json.FILTER);
	 				}
	 			
	 			if(empty(filter)) filter=[];
	 			
	 			
	 			
	 			if(checked)
					{
						if(wrsFilteValuerControl(filter,value))
							{
								if(!empty($.trim(value)))
								{
									filter[filter.length]= value;	
								}
							}
					}else{
						filter	=	wrsFilteValuerControl(filter,value,true);
					}
	 			
	 			
	 			if(is_array(filter))
	 				{
	 					json['FILTER']	=	implode(',',filter);
	 				}
	 			else
		 			{
		 				json['FILTER']	=	'';
		 			}
	 			
	 			//Gravando no JSON
	 			main.attr('json',base64_encode(json_encode(json,true)));
	 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTag);
		 	}
		 	
		 	/*
		 	 * Help click no input
		 	 * @link http://stackoverflow.com/questions/10268222/jquery-checking-a-checkbox-and-triggering-javascript-onclick-event
		 	 */
		 	var pws_click_triger_single =  function()
		 	{
		 		var index	=	 $(this).index();
		 		
		 		if(index==1)
		 		{
		 			var checked		=	$(this).parent().find('input').prop('checked');
		 			
		 			$(this).parent().find('input').prop('checked',!checked);
		 			$(this).parent().find('input').triggerHandler('click');
		 		}
		 	}
		 	
		 	
		 	menuFilter(index_data,data.data.id,'after',data.data.LIKE);
		 	
		 	$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_checkbox').unbind('click').click(btn_event_filtro_checkbox);
		 	$(data.data.id).find('.wrs_filter_body_container').find('.wrs_input_filter_single').unbind('click').click(wrs_input_filter_single);
		 	$(data.data.id).find('.wrs_filter_body_container').find('.pws_click_triger_single').unbind('click').click(pws_click_triger_single);
		 	
		 	if(!data.data.PGBACK_DISABLE)
		 	{
			 	$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_back').unbind('click').click(btn_event_filtro_next_back);
		 	}else{
		 		$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_back').attr('disabled','disabled');
		 		
		 	}
		 	
		 	if(!data.data.PGNEXT_DISABLE)
		 	{
		 		$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_next').unbind('click').click(btn_event_filtro_next_back);
		 	}else{
		 		$(data.data.id).find('.wrs_filter_body_container').find('.btn_event_filtro_next').attr('disabled','disabled');
		 	}
		 	
		 	
		 	
		 	
		 	if(!empty(G_MSG_FILTER_CLEAN))
		 	{
		 		WRS_ALERT(G_MSG_FILTER_CLEAN,'success');
		 		G_MSG_FILTER_CLEAN	=	'';
		 	}
		 	
		 	
		 	/*
		 	 * Pegando o Primeiro para aplicar o filtro
		 	 */
		 	
		 	if(data.data.ONLY_FIRST_CHECKBOX)
		 	{
		 		
		 		var _hEvent	=	$('#wrs_header_filter_main_'+data.data.index_data)
		 		
		 		$(data.data.id).find('.wrs_filter_body_container').find('.wrs_input_filter_single:first').each(function(){
		 			$(this).prop('checked',true);
		 			$(this).triggerHandler('click');
		 			
		 			setJsonEncodeDecode(_hEvent,'ONLY_FIRST_CHECKBOX','',true,false);
		 			wrs_check_filter_simples();
		 		});
		 		
		 		/*
		 		 * Limitando o processo para não entrar em loop
		 		 * Se o processo passar mais que 3X e não encontrar seleção 
		 		 * Finaliza o processo
		 		 * Esse caso é para quando o filtro não retornar dados
		 		 */
		 		var tryFind	=	_hEvent.attr('tryFind');	 			
	 			if(empty(tryFind)) tryFind= 0;	 			
	 			tryFind++;	 			
	 			_hEvent.attr('tryFind',tryFind);
	 			
		 	}//End evento
		 	
		 	//É similar com a requisição acima mas apenas forma seleciona o primeiro elsemento sem processar a Grid
		 	if(data.data.FORCE_ONLY_FIRST_CHECKBOX)
		 		{
			 		$(data.data.id).find('.wrs_filter_body_container').find('.wrs_input_filter_single:first').each(function(){
			 			$(this).prop('checked',true);
			 			$(this).triggerHandler('click');
			 		});
		 		}
		 	
		 	formata_texto_resultado_filtros();
		}
    	 
	
     
     
   	 var  setWRSFilterCommon = function()
							 {
   		 						//Esconde todo o conteiner de Drag and Drop
								$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide();
								 
								//Mostra a tela de Busca de filtro
							 	$('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
							 	var jsonDROP		=	[];
							 	var jsonDROPExist	= false;
							 	//Salvando para poder recuperar as seleções
							 	$(".WRS_DRAG_DROP_FILTER h2").each(function(){
							 		jsonDROP[$(this).attr('level-full')]	=	$(this).attr('json');
							 		jsonDROPExist	=	true;
							 	});
							 	
							 	$(".WRS_DRAG_DROP_FILTER").html(''); // Remove todos os filtros
									//Criando a estrutura dos FIltros selecionados
							 	
							 
							 	
							 	var size_data			=	 0;
							 	var is_atributo_simples	=	false;
									 $('.sortable_filtro li').each(function()
											{
										 			var value		=	$(this).attr('vvalue');
												 	var json		=	$(this).attr('json');
												 	var index		=	$(this).index();
												 	var jsonDecode	=	$.parseJSON(base64_decode(json));
												 	var atributo	=	$(this).attr('atributo');
												 	
												 	if(atributo=='simples')	is_atributo_simples=true;
												 	
												 	
												 	//Substitui o Json pelo qualk já estva selecionado
												 	
												 	if(jsonDROPExist)
												 		{
														 	if(isset(jsonDROP[jsonDecode.LEVEL_FULL]))
														 		{
														 			json				=	jsonDROP[jsonDecode.LEVEL_FULL];
														 		}
												 		}
												 	
												 	if(!empty(value))
												 	{
												 		var h2	=	 $('<h2/>',{	'vvalue'		:	value,
												 									html			:	value,
												 									'json'			:	json,
												 									'level-full'	:	jsonDecode.LEVEL_FULL,
												 									'index-data'	:	index,
												 									'id'			:	'wrs_header_filter_main_'+index,
																					'class'			:	'wrs_class_filter_header_main',
																					'atributo'		:	atributo
																		 		});
												 		
												 		var div	=	$('<div/>',
												 								{
												 									'id'	:	'wrs_filter_body_'+index,
												 									'class':	'wrs_filter_body'
												 									
												 								}).html($('<div/>',{'class':'wrs_filter_body_container'}));
												 		
												 		$(".WRS_DRAG_DROP_FILTER").append(h2).append(div);
												 		size_data++;
												 		h2.unbind('click').click(clickHeaderFiltro);//Adicionando o Evento de click
												 	}
											});
									 //Aplicando o verificado se atributo simples
									 $(".WRS_DRAG_DROP_FILTER").attr('is_atributo_simples',is_atributo_simples);
									 
									 jsonDROP	=	[];
									 //setSizeDataFilterClean(size_data);
						
									/*
									 * Ativando o Accordion
									 */
									//http://api.jqueryui.com/accordion/#method-destroy
									$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
									 
							 } //End setWRSFilterCommon
   	 
   	 


		
		
				   	var wrs_panel_filter_icon	=	 function()
					{
				   		
				   		var event	=	 $(this);

				   		var filter_hide		=	event.attr('filter_hide'); //Flag armazenada no botão para saber se já foi pressionado
				
						if(filter_hide!='true' && filter_hide!='false') filter_hide='false';
				
						if(filter_hide=='false')
						{	
							setWRSFilterCommon();
					 		filter_hide	=	true;
						}else{
							$('.WRS_DRAG_DROP_RECEIVER_FILTER').show(); // Ativando o Drag And Drop 
							$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide(); //Escondendo a estrutura de pesquisa de filtro
							filter_hide	=	 false; 
						}
				
						event.attr('filter_hide', filter_hide); //Atualiza a Flag
				 }
				
				/**
				*  Evento que converte todos os Drags em formaato Toggle e com opções para trazer os resultados
				*/
				$('.wrs_panel_filter_icon').unbind('click').click(wrs_panel_filter_icon);
		
		
		
				

				/**
				 *  Verificnado se os comapos simples estão preenchidos
				 */
				var wrs_check_filter_simples = function()
				{
					
					var filter					=	$(".WRS_DRAG_DROP_FILTER");
					var is_atributo_simples		=	filter.attr('is_atributo_simples');
					var no_simple				=	true;

					if(is_atributo_simples=='false') return true;
					
					filter.find("h2").each(function(){
						var atributo	=	$(this).attr('atributo');		
						var json		=	'';
						
						if(atributo=='simples')
							{
					 				json	=	 	$.parseJSON(base64_decode($(this).attr('json')));

					 				if(empty(json.FILTER))
					 					{
					 						no_simple			=	false;
					 						var check_simple	=	explode(',',filter.attr('check-simples'));
					 						
					 						//Confirma que será um array
					 						if(empty(filter.attr('check-simples'))) check_simple=[];
					 						
					 						var level_full		=	$(this).attr('level-full');
					 						
					 						//Força o evento natural de Load
					 						json['ONLY_FIRST_CHECKBOX']	=	true;
					 						
					 						if(!in_array(level_full, check_simple, true))
											{
					 							check_simple[check_simple.length]	=	level_full;
											}else{
												//O link existe na estrutura
												
												var passSize	=	 parseInt($(this).attr('tryFind'));
												
												if(passSize>3) 
												{
													no_simple = true;
													json['ONLY_FIRST_CHECKBOX']	=	false; //Para impedir a abertura altomárica ao clicar
												}												
											}
					 						filter.attr('check-simples',implode(',',check_simple));
					 						
					 						$(this).attr('json',base64_encode(json_encode(json,true)));
					 						
					 						clickHeaderFiltro($(this),'loadWrs');
					 					} 
							}
						
					});
					
					
					if(no_simple)
						{
							TRACE('Processando select simples');
							filter.attr('is_atributo_simples',false);
							$('.wrs_run_filter').attr('is_atributo_simples',true);
							$('.wrs_run_filter').trigger('click');
						}
					
					return false;
				}
				
				
		
				/**
				 * Eventos por requisição
				 */
				switch(typeEvent)
				{
					case 'getAllFiltersToRun' 		: return getAllFiltersToRun()				; break;
					case 'setSizeDataFilterClean'	: return setSizeDataFilterClean(typeValue)	; break;
					case 'wrs_check_filter_simples'	: return wrs_check_filter_simples()			; break;
					case 'wrs_filter_check_change_filter' :  return wrs_filter_check_change_filter(); break;
				}
				
        return $event;
    };
}( jQuery ));





 

