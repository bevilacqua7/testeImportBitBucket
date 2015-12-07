
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
			
			_START('Filter.js Loader qtip');
        	   $('.tooltip_info_wrs_panel').qtip({
        	         content: {
								text: function(event, api) 
										{
											return $('<div class="container "> '+tagFilterWRS()+'</div>');
										},
								title : 'Filtros'
            	         },
        	         style: {
        	        	 classes: 'qtip-bootstrap qtip-shadow'
        	         }, events: {
        	             render: function(event, api) {
        	                 // Grab the BGIFrame element
        	                 var elem = api.elements.bgiframe;
        	             }},
        	             position: {
        	 				viewport: $(window)
        	 			},
        	 			hide: {
        	 				fixed: true,
        	 				delay: 300
        	 			}
        	         
        	         /*position: {
        	        	 my: 'top left',  // Position my top left...
        	             at: 'top right', // at the bottom right of...
        	             target: 'mouse', // Track the mouse as the positioning target
        	             adjust: { x: 20, y: 5 } // Offset it slightly from under the mouse
        	         }*/
        	     });
        	   
      	     
            _END('Filter.js Loader qtip');
        });
        

function convert_to_class(array)
{
	 _START('convert_to_class');
	var tmp		=	[];
	
	for(x in array)
		{
			tmp[x]	=	'__'+replace_attr(array[x]);
		}
	_END('convert_to_class');
	return tmp;
}


function findFilterMergeLoad(filterMerge,levelFull)
{
	
	_START('findFilterMergeLoad');
	
	for(d in filterMerge)
		{
			if(filterMerge[d][0]==levelFull)
			{
				return filterMerge[d][2];
			}
		}
	
	_END('findFilterMergeLoad');
	return '';
}
function filterMergeLoad(filter_current,filterMerge)
{
	
	_START('filterMergeLoad');
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
	
	_END('filterMergeLoad');
	return array_user;
}


function changeWithDrillColumnRows(column,columnName)
{
	_START('changeWithDrillColumnRows');
	var current_layout		=	getLoadReport(true);
	
	var _column				=	optionsDataConvert(current_layout,true);
	
	
		_column[columnName]	=	 convert_to_class(column);
		

		
		set_value_box_relatorio(_column);
		cleanPlaceholder();
		$('.wrs_panel_filter_icon').attr('filter_hide','false');
		//.trigger('click');
		$.WrsFilter('wrs_panel_filter_icon');
		wrsRunFilter();
		
	_END('changeWithDrillColumnRows');	
}
//Removendo qualquer informação de placeholder que é a mensagem de que não há valores na tela 
function cleanPlaceholder()
{
	_ONLY('cleanPlaceholder');
	$(".WRS_DRAG_DROP_FILTER").find('.placeholder').remove();
}

function changeWithDrillFilter(layout,filter_to_add)
{
	_START('changeWithDrillFilter');
	var 	btnRun	=	$('.wrs_run_filter');
	var 	json	=	$('.WRS_ABA').find('.active').wrsAbaData('getHistory');
	
	

	
	//Mudando o status para que possa ser renderizado
	var current_layout	=	getLoadReport(true);
	

	var changeLayout	=	optionsDataConvert(current_layout,true);
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
	
	

	
//	changeLayout	=	getLoadReport()


	
	set_value_box_relatorio(changeLayout);
	
	//Removendo qualquer informação de placeholder que é a mensagem de que não há valores na tela 
	cleanPlaceholder();
	
	$('.wrs_panel_filter_icon').attr('filter_hide','false');
	//.trigger('click');
	$.WrsFilter('wrs_panel_filter_icon');
	btnRun.trigger('click');
	
	_END('changeWithDrillFilter');
}




function compare_filter_change(_filters_compare)
{
	
	_START('compare_filter_change');
	if(empty(_filters_compare)) return false;
	
	 var filters_compare 	=	 explode(',',_filters_compare);
	
	  for(obj in filters_compare)
	  {
	  		var headerFilter	=	'#'+filters_compare[obj];
//	  		var header			=	$(headerFilter).attr('json');
	  		var header			=	$(headerFilter).data('filter');
        	//var json			=	$.parseJSON(base64_decode(header));	   
	  		var json			=	header;	   
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
	  
	  _END('compare_filter_change');
		  return false;
	
}


/**
 * Apaga a estrutira de Filtros
 */
function WRS_clean_filter()
{
	_START('WRS_clean_filter');
	var getID		=	 $('.wrsGrid').attr('id');
	
		$('.wrs_run_filter').removeAttr('locked').removeAttr('flag_load');
		
		$('.wrsGrid').removeClass('wrsGrid')
		$('#'+getID+'Main').addClass('hide');
		//$('.wrsGrid').removeAttr('wrsparam').removeAttr('wrskendoui');
	_END('WRS_clean_filter');	
}

function WRS_filter_hide()
{
	_START('WRS_filter_hide');
	var getID		=	 $('.wrsGrid').attr('id');
		$('.wrsGrid').removeClass('wrsGrid')
		$('#'+getID+'Main').addClass('hide');
		//$('.wrsGrid').removeAttr('wrsparam').removeAttr('wrskendoui');
	_END('WRS_filter_hide');	
}

function convert_to_compare_filter(inputHistory)
{
	var tmp	=	[];
	_START('convert_to_compare_filter');
	
	for(var lineInput in inputHistory)
		{
				if(inputHistory[lineInput].data=='' || inputHistory[lineInput].data==null) continue;
				tmp.push('{'+inputHistory[lineInput].data+'}');
		}
	
	_END('convert_to_compare_filter');
	return base64_encode(tmp.join(','));
	
}

/**
 * Verificando se existe alteração nas vertentes para a pesquisa
 */
function is_wrs_change_to_run(_param_request,manager_aba,report_id)
{
	
	_START('is_wrs_change_to_run');
	var param_request	=	{};
		param_request	=	 _param_request;

	var _status			=	 false;
	
	var filter			=	$('.wrs_run_filter');
	var aba_active		=	$('.WRS_ABA').find('.active');
	var history			=	aba_active.wrsAbaData('getHistory');
	var histoty_param	=	{};
	var flag			=	true;
	var change_TOP		=	false;
	var eastonclose		=	$('.wrs_run_filter').attr('eastonclose');
	var loadStart		=	 true;



	if(empty(history))
	{
		
		for(var lineHistoty_param in param_request)
			{
				histoty_param[lineHistoty_param]	=	param_request[lineHistoty_param];
			}
			
		
		if(param_request['IS_REFRESH']==TRUE)
		{
			param_request['IS_REFRESH']							=	'_false';
		}
		
		var base64						=	base64_encode(json_encode(histoty_param,true));
		

		if(eastonclose=='true')
		{
			//MODAL_LOADING_WRS_PANEL();
			$('.wrs_run_filter').attr('eastonclose','false');
			loadStart	=	false;
		}
		

		aba_active.wrsAbaData('setHistory',base64);
		
		_END('is_wrs_change_to_run');
		return {status:_status, val:param_request};
	}
	
	
	
	
	
	histoty_param	=	$.parseJSON(base64_decode(history));
	
	
	var _compare	= ['LAYOUT_ROWS','LAYOUT_COLUMNS','LAYOUT_MEASURES','LAYOUT_FILTERS','ORDER_COLUMN','ALL_COLS','ALL_ROWS','DRILL_HIERARQUIA_LINHA'];

		if(empty(param_request.ALL_COLS)) param_request.ALL_COLS='';
		
		if(empty(param_request.ALL_ROWS)) param_request.ALL_ROWS='';
	
		if(empty(param_request.ORDER_COLUMN)) param_request.ORDER_COLUMN=0;
	

		for(var lineCompare in _compare)
		{
			var __key				=	_compare[lineCompare];
			var _history_compare	=	_trim(histoty_param[__key]);
			
				if(__key=='LAYOUT_FILTERS')
				{
					_history_compare	=	convert_to_compare_filter(getJsonDecodeBase64(histoty_param['FILTER_TMP']));
				}
				
				if(empty_wrs_defaults(_history_compare)!=empty_wrs_defaults(_trim(param_request[__key]))) flag=false;
		}
		
		
		//Apenas para quando for o Drill Lile				
		if(param_request['DRILL_HIERARQUIA_LINHA_DATA_MINUS']!=null || param_request['DRILL_HIERARQUIA_LINHA_DATA']!=null)
		{
			flag	=	 false;
		}
		
		//Se for solicitado o cancelamento então deixa o usuário executar novamente a consulta
		try{
			if(aba_active.wrsAbaData('getKendoUi').STOP_QUERY==true)
			{
				aba_active.wrsAbaData('setKendoUi',{STOP_QUERY:false});
				flag	=	 false;
			}
		}catch(e){}
		
		
		
		
		if(_trim(histoty_param['TOP_CONFIG'])!=_trim(param_request.TOP_CONFIG))
		{
			flag=false;
		
		}

	
	
	
	
	
	if(flag)
	{
		
		if(eastonclose=='true')
		{
			$('.wrs_run_filter').attr('eastonclose','false');
			resizeGridSimple();
		}
		else
		{
			if(empty(history))
			{
				if(!manager_aba)
				{	
					WRS_ALERT(LNG('RUN_GRID_CHANGE_NOT'),'warning');
				}

			}
			else
			{
				CLOSE_LOAD_RELATORIO();
				
				if($('.wrs_run_filter').attr('eastonclose')!='true')
					{
						var _visible	=	$('.wrs_panel_center_body').attr('index-visible');
						if(_visible!='block')
						{
							if(!manager_aba)
							{
								//TRACE_DEBUG('NOT 01');
								WRS_ALERT(LNG('RUN_GRID_CHANGE_NOT'),'warning');
							}
						}
					}
					
				wrs_panel_layout.close('east');
				$('.wrs_panel_center_body').hide();
				$('.wrs_panel_filter_icon').hide();
			}
			
			
			
		}
_END('is_wrs_change_to_run');
		return {status:true, val:param_request};
		
	}
	else
	{
			for(var lineHistoty_param in param_request)
			{
				histoty_param[lineHistoty_param]	=	param_request[lineHistoty_param];
			}
			
			//mantendo os dados
			param_request  = histoty_param;
			
			
			

			
			aba_active.wrsAbaData('setHistory',base64_encode(json_encode(histoty_param,true)));
			
			
	}
	


	
	
	_END('is_wrs_change_to_run');
	return {status:_status, val:param_request};
}














/** 
 *  Força o click para processar o Relatório
 */
function wrsRunFilter()
{
		_ONLY('wrsRunFilter');
		$('.wrs_run_filter').trigger('click');
}

function wrsFilterShow()
{
		_START('wrsFilterShow');
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
	
	_END('wrsFilterShow');	
}



/**
 * 
 * @returns
 */
function get_exec_filter()
{	
		var _filter	=	null;
		var _index	=	{};	
		var _tmp	=	[];
		
		try{
			_filter	=	get_aba_active_wrs_param().index_filtro;
		}catch(e){
			
			_filter	=	 null;
			
		}
		
		
		if(_filter==null) return false;
		
		
		_tmp		=	 explode(',',_filter);
		
		for(var lineTmp in _tmp)
			{
				_index[_tmp[lineTmp]] = true;
			}
		
		return _index;
		
}

function text_width(input)
{
	return  $("<div/>").text(input).textWidth()+(input.length*4);
}


function tagFilterWRS(typeReturn)
{
	_START('tagFilterWRS');
	//Salvando para poder recuperar as seleções
	var html		=	'';
	var html_bk		=	'';// uso estas variaveis pra jogar os filtros fixos para o final de todos, sempre, e em vermelho
	var html_fixed	=	'';
	var structArray	=	[];
	var exec_filter	=	get_exec_filter();
	var _width		=	250;	
	$(".WRS_DRAG_DROP_FILTER h2").each(function(){
 		
 		//var json	=	 	$.parseJSON(base64_decode($(this).attr('json')));
		var json	=	 	$(this).data('filter');
		
 		var atributo	=	$(this).attr('atributo');
 		var filter_fixed=	$(this).hasClass('hide');
 			atributo	=	empty(atributo) ? '' : atributo;
 		var tmp_width	=	0;
 			
 			structArray[structArray.length]	=	[json['LEVEL_FULL'], atributo ,json['FILTER']];
 			
 		
 			
 				if(!empty(json['FILTER']))
 				{
 					if(filter_fixed){
 						html_bk = html;
 						html='';
 						html+='<font color="red">';
 					}
 					if(!empty($(this).attr('vvalue')))
 	 				{
 	 					html+='<h3>'+$(this).attr('vvalue')+'</h3> ';
 	 					
 	 					
 	 					tmp_width 	=	text_width($(this).attr('vvalue'));
 	 					
 	 					
 	 					if(tmp_width>=_width) _width	=	tmp_width; 	 					
 	 					
 	 				}
 	 				
 					
 					var _explode		=	explode(',',json['FILTER']);
 					
 					for(obj in _explode)
 						{
 							var _value	=	_explode[obj];
 							
 							var v_explode	=	 explode('[',_value);
 							var value		=	str_replace(']','',v_explode[v_explode.length-1]);
 							
 							var div			=	 {'_class_i':'fa-eye-slash','_class':'filter-exec-slash'};
 							
 							try{
 								if(exec_filter[_value]==true)
 								{
 									div			=	 {'_class_i':'fa-eye','_class':'filter-exec'};
 								}
 							}catch(e){
 								div			=	 {'_class_i':'fa-eye-slash','_class':'filter-exec-slash'};
 							}
 							
 							//_value
 							html+='<p class="'+div._class+'"><i class="fa '+div._class_i+'"></i> '+value+'</p>';
 							
 							
 							tmp_width 	=	text_width(value);
 	 	 					
 	 	 					
 	 	 					if(tmp_width>=_width) _width	=	tmp_width; 
 	 	 					
 						}
 					
 					//<i class="fa fa-eye-slash"></i>não visualizado
 					if(filter_fixed){
 						html+='</font>';
 						html_fixed+=html;
 						html=html_bk;
 					}
			 		 	
			 	}
 	});
	
	
	
	
	$('.qtip-default').width(_width); 
	
	
	if(html_fixed!=''){
		html+=html_fixed;
	}
 	
 	if(empty(html))
 	{
 		html	=	fwrs_warning(LNG('FILTER_NOT_ROWS_TOOLTIP'));
 	}
 	
 	if(typeReturn) return structArray;
 	
	_END('tagFilterWRS');
 	return html;
 	
}
function wrsFilterClickFalse(filter_hide)
{
		_ONLY('wrsFilterClickFalse');
		$('.wrs_panel_filter_icon').attr('filter_hide', filter_hide==undefined ? false : filter_hide); 
}

















































	 
(function ( $ ) {
	
	
	
	
    //$.WrsFilter	= function(typeEvent,typeValue) 
	$.WrsFilter	= function(methodOrOptions) 
    {
    	var that				=	 this;
    	var G_MSG_FILTER_CLEAN	=	'';
		
    	//Esconde o ACordion para a busca do Filtro
    	

    	var __wrs_filter_check_change_filter = function()
    	{
			_START('WrsFilter::__wrs_filter_check_change_filter');	
    		var flag_back		=	false;
    		$(".WRS_DRAG_DROP_FILTER").find('h2').each(function(){
    			//var json				=	$.parseJSON(base64_decode($(this).attr('json')));	   
    			var json				=	$(this).data('filter');	   
    			if(json['FILTER_TO_CLEAN']==true)
    			  	{
    			        if(compare_filter_change(json['FILTER_TO_COMPARE']))
    			        	{
    			        			setJsonEncodeDecode($(this),['FILTER','FILTER_TO_CLEAN','FILTER_CLICK','FILTER_TO_CLEAN'],['',false,'',false],true,true);
    			        			flag_back	=	 true;
    			        	}	 	
    			       }
    			
    		});
    		_END('WrsFilter::__wrs_filter_check_change_filter');	
    		return flag_back;
    	}

    	
    	var setJsonEncodeDecode	=	 function(localEvent,label,value,pageCurrentHome,noLoad)
    	{
			_START('WrsFilter::setJsonEncodeDecode');	
    		var index_data			=	 localEvent.attr('index-data');
    		var main				=	$('#wrs_header_filter_main_'+index_data);
    		//var json				=	$.parseJSON(base64_decode(main.attr('json')));	
    		var json				=	main.data('filter');	
    		
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
    		
 //   		main.attr('json',base64_encode(json_encode(json,true)));
    		main.data('filter',json);
    		
    		if(!noLoad)
    		{
    			clickHeaderFiltro(main,'loadWrs');
    		}
			
			_END('WrsFilter::setJsonEncodeDecode');	
    		
    	}

    	
    	
    	var cleanFiltersDown  = function(level_down,typeEvent,nameTagHeader)
    	{
    		_START('WrsFilter::cleanFiltersDown');	
    		var levelDown			=	[];
				levelDown			=	 explode(',',level_down);			
			
			if(empty(level_down) && empty(typeEvent)) {
				_END('WrsFilter::cleanFiltersDown');	
				return '';
			}
				
			$('.WRS_DRAG_DROP_FILTER h2').each(function(){
					var level_full					=	$(this).attr('level-full');	
					//var json						=	$.parseJSON(base64_decode($(this).attr('json')));	
					var json						=	$(this).data('filter');	
					var not_use						=	$(this).hasClass('hide');
					

						if(!not_use) 
						{
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
						}
					
			});
			_END('WrsFilter::cleanFiltersDown');	
    	}
    	

		
		/**
		 * Pegando os Filtros pais 
		 */
		var getFiltersLevelUP =	function(level_up,typeEvent)
		{
			_START('WrsFilter::getFiltersLevelUP');	
			var levelUP			=	[];
			var filters_up		=	[];
			var empty_filter	=	false;
			var tagQuery		=	'';
			var FilterOriginal	=	[];
			var _index			=	[];

			
				levelUP			=	 explode(',',level_up);			
			
			if(empty(level_up) && empty(typeEvent)) {
				_END('WrsFilter::getFiltersLevelUP');	
				return '';
			}
				
			$('.WRS_DRAG_DROP_FILTER h2').each(function(){
					var level_full					=	$(this).attr('level-full');	
					//var json						=	$.parseJSON(base64_decode($(this).attr('json')));	
					var json						=	$(this).data('filter');	
					var _json_filter				=	'';
						//Verificando se o Level Full exist no array passado
						if(in_array(level_full, levelUP, true) || typeEvent=='all')
						{
							if(!empty(json.FILTER))
							{
									_json_filter						=	json.FILTER;
									_index.push(json.FILTER);		
									filters_up[filters_up.length]	=	'{'+json.FILTER+'}';								
							}
							
							FilterOriginal[FilterOriginal.length]	=	{'class':'__'+replace_attr(level_full),data:_json_filter};
						}
					
			});
			
			
			
			FilterOriginal	=	merge_filter_in_array(FilterOriginal);

			if(is_array(filters_up)) 
				{
 					tagQuery	=	 implode(',',filters_up);
				}else{
					tagQuery	=	'';
				}
			
			
			if(typeEvent=='all') {
				_END('WrsFilter::getFiltersLevelUP');
				return {data:tagQuery,full:FilterOriginal, index:implode(',',_index)};
			}
			_END('WrsFilter::getFiltersLevelUP');
 			return tagQuery; 			
		}
		
		 
		 /*
		  * Gravando total de atributos
		  */
		 var __setSizeDataFilterClean = function(size_data)
		 {
			 _START('WrsFilter::__setSizeDataFilterClean');
		     $('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
		     
		     if($('.wrs_panel_filter_icon').attr('filter_hide') || size_data=='all')
		     {		
		    	 cleanFiltersDown('','all'); //Apagando todos os Selects
		     }
		      _END('WrsFilter::__setSizeDataFilterClean');
		 }
		 
		 
		var __getAllFiltersToRun	=	 function()
			{
					_ONLY('WrsFilter::__getAllFiltersToRun');
					return getFiltersLevelUP('','all');
			}
		
		 
		
	 
		

		
		
		var menuFilter	=	 function(index_data,nameID,type,_searchText)
		{
			_START('WrsFilter::menuFilter');
			
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
		 	
		 	 
		 	
		 	
		 	
		 	_END('WrsFilter::menuFilter');
			
		}
		
		/**
    	 * Função responsável por criar o Acordion para pesquisa dos Filtros
    	 * 
    	 */	
         var  clickHeaderFiltro	 = function (_event,type)
         {
			 _START('WrsFilter::clickHeaderFiltro');
        	 var event				=	 _event;
        	 var pageHome			=	false;
        	 if(type!='loadWrs')
        	 {
        		 event				=	 $(this);
        		 pageHome			=	true;
        	 }

        	 
        	 //var json				=	$.parseJSON(base64_decode(event.attr('json')));	        	 
        	 var json				=	event.data('filter');	        	 
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
			 
			  _END('WrsFilter::clickHeaderFiltro');
         }
         
         
    /**
     * Retorno da Class FILTER
     */
	 var funCallBackRun	=	 function(data)
	 	{
			 _START('WrsFilter::funCallBackRun');
		 	$(data.data.id).find('.wrs_filter_body_container').html(data.html);

	 		var index_data			=	 data.data.index_data;
 			var _main				=	$('#wrs_header_filter_main_'+index_data);
		 		//_main.attr('json',base64_encode(json_encode(data.data,true)));
		 		
		 		_main.data('filter',data.data);

				
		 
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
		 		 _START('WrsFilter::funCallBackRun::btn_event_filtro_next_back');
		 			var type	= $(this).attr('type');
		 			
		 			var index_data			=	 $(this).attr('index-data');
		 			var main				=	$('#wrs_header_filter_main_'+index_data);
		 			//var json				=	$.parseJSON(base64_decode(main.attr('json')));	
		 			var json				=	main.data('filter');	
		 			
		 			var page_current		=	json.PG_CURRENT;
		 			
		 			switch(type)
		 			{
		 				case 'next' :  page_current++; break;
		 				case 'back' :  page_current--; break;
		 			}
		 				
		 			setJsonEncodeDecode($(this),'PG_CURRENT',page_current);
		 			 _END('WrsFilter::funCallBackRun::btn_event_filtro_next_back');
		 		}

		 	
		 	var wrsFilteValuerControl		=	 function(arrayFilter,value,remove)
		 	{
				
				_START('WrsFilter::funCallBackRun::wrsFilteValuerControl');
		 		var tmp		=	[];
		 		
		 		for(obj in arrayFilter)
		 			{
		 				if(!remove)
		 				{
		 					if(arrayFilter[obj]==value)
		 					{
		 						_END('WrsFilter::funCallBackRun::wrsFilteValuerControl');
		 						return false;
		 					}
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
		 		if(remove) {
		 			_END('WrsFilter::funCallBackRun::wrsFilteValuerControl');
					return tmp;
		 		}
				 _END('WrsFilter::funCallBackRun::wrsFilteValuerControl');
		 		return true;
		 	}
		 	
		 	
		 	var btn_event_filtro_checkbox	=	 function()
				 	{
						
						_START('WrsFilter::funCallBackRun::btn_event_filtro_checkbox');
					 		var index_data	=	$(this).attr('index-data');
					 		var nameTag		=	'wrs_filter_body_'+index_data;
				 			var main		=	$('#'+nameTag);
				 			var checked		=	$(this).prop('checked');
				 			var nameTagMain	=	'wrs_header_filter_main_'+index_data;
				 			var mainFilter	=	$('#'+nameTagMain);
				 			//var json		=	$.parseJSON(base64_decode(mainFilter.attr('json')));	
				 			var json		=	mainFilter.data('filter');	
				 			var filter		=	 explode(',',json.FILTER);
				 			var value		=	'';
				 			
				 			if(empty(filter) || filter=='') filter=[];
				 			
				 			
				 			//aba_detect_change();
				 			
				 			
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
//				 			mainFilter.attr('json',base64_encode(json_encode(json,true)));
				 			mainFilter.data('filter',json);
				 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTagMain);
							
							_END('WrsFilter::funCallBackRun::btn_event_filtro_checkbox');
				 	}
		 	
		 	
		 	var wrs_input_filter_single	=	 function()
		 	{
				_START('WrsFilter::funCallBackRun::wrs_input_filter_single');
				var index_data	=	$(this).attr('index-data');
				var nameTag		=	'wrs_header_filter_main_'+index_data;
	 			var main		=	$('#'+nameTag);
	 			//var json		=	$.parseJSON(base64_decode(main.attr('json')));	
	 			var json		=	main.data('filter');	
	 			var filter		=	'';
	 			var type_input	=	$(this).attr('type');
	 			var checked		=	$(this).prop('checked');
	 			var value 		=	$(this).val();
	 			
	 			//aba_detect_change();
	 			
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
//	 			main.attr('json',base64_encode(json_encode(json,true)));
	 			main.data('filter',json);
	 			
	 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTag);
				
				_END('WrsFilter::funCallBackRun::wrs_input_filter_single');
		 	}
		 	
		 	/*
		 	 * Help click no input
		 	 * @link http://stackoverflow.com/questions/10268222/jquery-checking-a-checkbox-and-triggering-javascript-onclick-event
		 	 */
		 	var pws_click_triger_single =  function()
		 	{
				_START('WrsFilter::funCallBackRun::pws_click_triger_single');
		 		var index	=	 $(this).index();
		 		
		 		if(index==1)
		 		{
		 			var checked		=	$(this).parent().find('input').prop('checked');
		 			
		 			$(this).parent().find('input').prop('checked',!checked);
		 			$(this).parent().find('input').triggerHandler('click');
		 		}
		 		
		 		
				_END('WrsFilter::funCallBackRun::pws_click_triger_single');
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
		 			__wrs_check_filter_simples();
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
			
			_END('WrsFilter::funCallBackRun');
		}
    	 
	
     
     
	 var filter_current_selected	=	 function()
     {
     	var _tmp	=	get_aba_active_wrs_param();
     	
     	var _filter	=	getJsonDecodeBase64(_tmp.FILTER_TMP);
     	
		var _obj	=	{};
		

		if(isEmpty(_filter)) return null;

		for(var lineFilter in _filter)
		{
			var _sub				=	_filter[lineFilter];
				_obj[_sub.class]	=	_sub.data;
		}
//FILTER
//FILTER_CLICK

		return _obj;

     }
	 
   	 var  setWRSFilterCommon = function()
							 {
								 
								 _START('WrsFilter::setWRSFilterCommon');
   		 						//Esconde todo o conteiner de Drag and Drop
								$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide();
								 
								//Mostra a tela de Busca de filtro
							 	$('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
							 	var jsonDROP		=	[];
							 	var jsonDROPExist	= false;
							 	
							 	//Salvando para poder recuperar as seleções
							 	$(".WRS_DRAG_DROP_FILTER h2").each(function(){
							 		
							 		if($(this).attr('level-full')!=undefined){
								 		jsonDROP[$(this).attr('level-full')]	=	$(this).data('wrs-data');
								 		jsonDROPExist	=	true;
							 		}
							 	});
							 	
							 	
							 	
							 	$(".WRS_DRAG_DROP_FILTER").html(''); // Remove todos os filtros
									//Criando a estrutura dos FIltros selecionados
							 	
							 
							 	
							 	var size_data			=	 0;
							 	var is_atributo_simples	=	false;
							 	var filter_selectd		=	filter_current_selected();
							 	
								
									 $('.sortable_filtro li').each(function()
											{
										 			var value		=	$(this).attr('vvalue');
												 	var index		=	$(this).index();
												 	var atributo	=	$(this).attr('atributo');
												 	var not_use		=	 $(this).attr('not-use');
												 	var _hide		=	 ' hide ';
												 	var tag_class	=	 $(this).attr('tag-class');
												 	var json		=	$('.wrs_panel_options ul .'+tag_class).data('wrs-data');
												 	var jsonDecode	=	json;
												 	
												 	////FILTER
//FILTER_CLICK
												 	
												 	if(empty(not_use))
												 	{
												 		_hide	=	'';
												 	}
												 	
												 	
														 	
														 	if(atributo=='simples')	is_atributo_simples=true;
														 	
														 	
														 	//Substitui o Json pelo qualk já estva selecionado
														 	/*
														 	if(jsonDROPExist)
														 		{
																 	if(isset(jsonDROP[jsonDecode.LEVEL_FULL]))
																 		{
																 			json				=	jsonDROP[jsonDecode.LEVEL_FULL];
																 		}
														 		}*/
														 	
															
															try{
														 				json['FILTER']	=	json['FILTER_CLICK']=		filter_selectd['__'+tag_class];
																		
														 		}catch(e){

														 		}
																
																

															
														 	if(!empty(value))
														 	{
														 		var h2	=	 $('<h2/>',{	'vvalue'		:	value,
														 									html			:	value,
//														 									'json'			:	json,
														 									'level-full'	:	jsonDecode.LEVEL_FULL,
														 									'index-data'	:	index,
														 									'id'			:	'wrs_header_filter_main_'+index,
																							'class'			:	'wrs_class_filter_header_main '+_hide,
																							'atributo'		:	atributo
																				 		}).data('filter',json);
														 		
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
						
									/*
									 * Ativando o Accordion
									 */
									//http://api.jqueryui.com/accordion/#method-destroy
									$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
									 
									_END('WrsFilter::setWRSFilterCommon'); 
							 } //End setWRSFilterCommon
   	 
   	 


		
		
				   	var __click_wrs_panel_filter_icon	=	 function()
					{
				   		_START('WrsFilter::__click_wrs_panel_filter_icon');
				   		
				   		var event	=	 $('.wrs_panel_filter_icon');

				   		
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
						_END('WrsFilter::__click_wrs_panel_filter_icon');
				 }
				
		
		
		
				

				/**
				 *  Verificnado se os comapos simples estão preenchidos
				 */
				var __wrs_check_filter_simples = function()
				{
					_START('WrsFilter::__wrs_check_filter_simples');
					
					var filter					=	$(".WRS_DRAG_DROP_FILTER");
					var is_atributo_simples		=	filter.attr('is_atributo_simples');
					var no_simple				=	true;

					if(is_atributo_simples=='false') {
						_END('WrsFilter::__wrs_check_filter_simples');
						return true;}
					
					filter.find("h2").each(function(){
						var atributo	=	$(this).attr('atributo');		
						var json		=	'';
						
						if(atributo=='simples')
							{
//					 				json	=	 	$.parseJSON(base64_decode($(this).attr('json')));
					 				json	=	 	$(this).data('filter');

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
					 						
//					 						$(this).attr('json',base64_encode(json_encode(json,true)));
					 						$(this).data('filter',json);
					 						
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
					_END('WrsFilter::__wrs_check_filter_simples');
					return false;
				}
				
				
				
				
				var __init	=	 function ()
				{
					if(!$('.wrs_panel_filter_icon').attr('filter_hide'))
					{
						$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
					}
					
					//Ativando o Accordion dos menu
					$( ".WRS_DRAG_DROP_FILTER" ).accordion({collapsible: true,active: false,heightStyle: 'content'});
					
									/**
						*  Evento que converte todos os Drags em formaato Toggle e com opções para trazer os resultados
						*/
						$('.wrs_panel_filter_icon').unbind('click').click(__click_wrs_panel_filter_icon);
					
					return that;
				}
				
		
				/**
				 * Eventos por requisição
				 */

				
				
				/*
				 * Metodos de funções
				 * formas de chamadas externas
				 */
				var methods = 
				{
				        init 							: 	__init,
				        getAllFiltersToRun				:	__getAllFiltersToRun,
				        setSizeDataFilterClean			:	__setSizeDataFilterClean,
				        wrs_check_filter_simples		:	__wrs_check_filter_simples,
				        wrs_filter_check_change_filter	:	__wrs_filter_check_change_filter,
				        wrs_panel_filter_icon			:   __click_wrs_panel_filter_icon
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
    };
    
    
}( jQuery ));





 

