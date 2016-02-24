
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
        
function clean_filters()
{
	
	_START('clean_filters');
	$('.sortable_filtro li').each(function(){
	
		var tag_class					=	 $(this).attr('tag-class');
		
		var filter_east					=	$('.wrs_panel_options .'+tag_class);
		var filter_east_json			=	filter_east.data('wrs-data');

		
			try{
				if(filter_east_json['FILTER'])
				{
					filter_east_json['FILTER']	=	null;
				}
			}catch(e)
			{
				
			}
			
			filter_east.data('wrs-data',filter_east_json);
		
	});
	
	_END('clean_filters');
}




function filtro_simples_aba_ataual()
{
	
	var aba_active		=	get_aba_active_object();
	var filters			=	aba_active.wrsAbaData('getFilterSimples','all');
	
	for(var line in filters)
		{
				var simplesFilter	=	filters[line];
				
				
				if( typeof simplesFilter.simples	!=	undefined)
					{
						if(simplesFilter.simples==true)
							{
								return true;
							}
					}
		
		}
	
	return false;
	
}




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

function set_css_negado(tag_class,aba_active)
	{

	var status		=	aba_active.wrsAbaData('getFilterNegado',tag_class); 
	var css_tag_table		=	'.wrs-filter-'+tag_class;
	
	if(status.negado==true)
	{
		$(css_tag_table).addClass('filter_nagedo');
	}else{
		$(css_tag_table).removeClass('filter_nagedo');
	}
		
		
	}
	



function filterMergeLoad(filter_current,filterMerge)
{
	
	_START('filterMergeLoad');
	var array_user		=	[];
	var filters_add		=	[];//INforma quais atributos já foram utilizados para não repetir

	
	for(var x in filter_current)
		{
	
			var levelFullEmpty	=filter_current[x][0];
			var levelFull		=	'__'+levelFullEmpty;
			
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
	
	var 	btnRun		=	$('.wrs_run_filter');
	var 	aba_current	=	$('.WRS_ABA').find('.active');
	var aba_active	=			get_aba_active_object();
	 
	 
	//Mudando o status para que possa ser renderizado
	var current_layout	=	getLoadReport(true);
	
	var changeLayout	=	optionsDataConvert(current_layout,true);
	

//	var filtersCurrent	=	tagFilterWRS(true);
	var filtersCurrent	=	$.WrsFilter('getAllFiltersToRun').filter;

		

	
		aba_current.wrsAbaData('setKendoUi',wrs_clean_data(null));
	
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
	
	
	


	//Add elemento para ser acrescentado
	
	for(var lineFilter in filter_to_add)
		{
				var opt_insert		=	{tag:str_replace('__','',filter_to_add[lineFilter][0]),data:filter_to_add[lineFilter][2]};
				
				aba_active.wrsAbaData('setNewFilter',opt_insert);
		}
	
	set_value_box_relatorio(changeLayout);
	
	//Removendo qualquer informação de placeholder que é a mensagem de que não há valores na tela 
	cleanPlaceholder();
	
	$('.wrs_panel_filter_icon').attr('filter_hide','false');
	
	$.WrsFilter('wrs_panel_filter_icon');
	
	btnRun.trigger('click');
	
	delete	aba_active;
	
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
	  		var header			=	$(headerFilter).data('wrs-data');
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
function compare_filter_negado_simple(historio,current)
{
	//true é diferente false é igual
	

	var h_length	=	array_length(historio);
	var c_length	=	array_length(current);
	
		if(c_length!=h_length) {
			return true;
		}
	
	var data_higt	=	c_length;
	var to_compare	=	h_length;
	
		if(h_length	> c_length)
			{
				data_higt	=	h_length;
				to_compare	=	c_length;
			}
	
	
	for(var line in data_higt)
		{
				
					if(typeof to_compare[line]=="undefined") {
						return true;
					}
					

					if(typeof data_higt[line].negado!= typeof to_compare[line].negado)
					{
							return true;
					}
					
					if(typeof data_higt[line].level_full!= typeof to_compare[line].level_full)
					{
							return true;
					}
					
					
					if(typeof data_higt[line].simples!= typeof to_compare[line].simples)
					{
							return true;
					}
		
		}
	
	
	
	return false;
}
/**
 * Verificando se existe alteração nas vertentes para a pesquisa
 */
function is_wrs_change_to_run(_param_request,manager_aba,report_id,compare_filter)
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
	
	
	

	
	var _compare	= ['LAYOUT_ROWS','LAYOUT_COLUMNS','LAYOUT_MEASURES','LAYOUT_FILTERS','ORDER_COLUMN','ALL_COLS','ALL_ROWS','DRILL_HIERARQUIA_LINHA','SUMARIZA'];

		if(empty(param_request.ALL_COLS)) param_request.ALL_COLS='';
		
		if(empty(param_request.ALL_ROWS)) param_request.ALL_ROWS='';
	
		if(empty(param_request.ORDER_COLUMN)) param_request.ORDER_COLUMN=0;
	

		for(var lineCompare in _compare)
		{
			var __key				=	_compare[lineCompare];
			var _history_compare	=	_trim(histoty_param[__key]);
			var request_current	=	param_request[__key];
			
				if(__key=='LAYOUT_FILTERS')
				{
					_history_compare	=	convert_to_compare_filter(getJsonDecodeBase64(histoty_param['FILTER_TMP']));

					request_current	=	compare_filter;
				}
				
				if(empty_wrs_defaults(_history_compare)!=empty_wrs_defaults(_trim(request_current	))) 
				{
					flag=false;
				}
		}
		//DEVELOPE:
		//VErifica se o filtro simples ou composto teve alteração filtro negado
		
		
		if(compare_filter_negado_simple(histoty_param['filter'],param_request['filter'])==true)
			{
			 	flag=false;
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
		}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
		
		
		
		
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
			
			
			

			var base64_add	=	base64_encode(json_encode(histoty_param,true));
			
			
			aba_active.wrsAbaData('setHistory',base64_add);
			
			
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
			if(IS_EXCEPTION) console.warn(' exception');
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
	var aba_active	=	get_aba_active_object();
	
	
	
	var makeTitle	=	 function(title,tmp_width,width,_class)
	{
		var _width	=	width;
		var css__class	=	isEmpty(_class) ? '' : _class;
		
		if(!empty(title))
			{
				
				tmp_width 	=	text_width(title);
				if(tmp_width>=_width) _width	=	tmp_width; 
				
				return {html:'<h3 class="'+css__class+'">'+title+'</h3>', 'width':_width};
			}
		
		return {html:'', 'width':_width};
	}
	
	
	var makeDesck	=	function(input,tmp_width,width,_div,_explode_to_add)
	{
		var _explode  	= 	input;
		var html		=	'';
		var _width		=	width;
		var _filter		= [];
		
		for(var obj in _explode)
			{
				var _value		=	_explode[obj];
				var v_explode	=	 explode('[',_value);
				var value		=	str_replace(']','',v_explode[v_explode.length-1]);
				var div			=	 _div;
				 
				_filter.push(_value);
				
				if(_explode_to_add!=undefined)
				{
					if(!isEmpty(_explode_to_add))
					{
						if(exist_in_array(_explode_to_add,_value)) continue;
					}
				}
				
				if(value!='null' && !isEmpty(value))
					{
						//_value
						html+='<p class="'+div._class+'"><i class="fa '+div._class_i+'"></i> '+value+'</p>';
						tmp_width 	=	text_width(value);
	 					if(tmp_width>=_width) _width	=	tmp_width; 
					}
			}
		
		
		return {'html':html,'width':_width, 'filter':_filter};
	}
	
	$(".WRS_DRAG_DROP_FILTER h2").each(function(){
		/*
		 * Esse primeiro IF impede que o filtro fixo não seja exibido
		 */
		if($(this).hasClass('red')!=true) 
		{	
		
				var tag_class			=	$(this).attr('tag-class');
				var filters				=	aba_active.wrsAbaData('getFilter',{tag:tag_class});
				var level_full			=	$(this).attr('level-full');
		 		var tmp_width			=	0;
		 		
		 		var _filter				=	[];
				var _explode			=	explode(',',filters);
				var _explode_to_add		=	aba_active.wrsAbaData('getNewFilter',{tag:tag_class});
		 		
				
				
		 		
				//Para o add o Filreo no Drill
				var atributo	=	$(this).attr('atributo');
					atributo	=	empty(atributo) ? '' : atributo;
		 					
						if(!exist_in_array(_explode,'') || !isEmpty(_explode_to_add))
						{
							var _title	=	makeTitle($(this).attr('vvalue'),tmp_width,_width);
							
							html+=_title.html;
							_width	=	_title.width;
						}
						
							
						
						
						
						
						var get_filter_negado	=	get_aba_active_object().wrsAbaData('getFilterNegado',tag_class);
						
						var class_exec			=	{ico:'fa-eye',css:'filter-exec'};

						//Filtro Negado
						if(get_filter_negado.negado==true)
							{
								class_exec			=	{ico:'fa-times',css:'filter-negado'};
							}
						
						
						
		 					//Filtros Que já está em uso
		 			 		var in_use	=	makeDesck(_explode,tmp_width,_width,{'_class_i':class_exec.ico,'_class':class_exec.css},_explode_to_add);
		 						html+=in_use.html;
		 						_width=in_use.width;
		 						
		 						_filter	=	merge_filter_data(in_use.filter, _filter);
		 					
		 					//Filtros que estão a ser inseridos
		 					var to_add	=	makeDesck(_explode_to_add,tmp_width,_width,{'_class_i':'fa-eye-slash','_class':'filter-exec-slash'},undefined);
		 						html+=to_add.html;
		 						_width=to_add.width;
		 						
		 						_filter	=	merge_filter_data(to_add.filter, _filter);
		 						
		 					
		 					structArray[structArray.length]	=	[level_full, atributo ,_filter.push(',')];
 					
		}//END IF RED	
 	});
	

	var get_filter_fixed		=	 $('body').filterFixed('tooltipeFixed');
	
		if(get_filter_fixed!=false){
	

			for(var lineFixed in get_filter_fixed)
			{
				var tmp_width	=	0;
				//Pegando infor para o title
				var get_object	=	$('.ui-layout-pane-east ul').find('.'+lineFixed);
				var json		=	get_object.data('wrs-data');
				
				if(json==undefined) continue;
				
				//Title
				var _title	=	makeTitle(json.LEVEL_NAME,tmp_width,_width,'filter-fixed');
					html	+=	_title.html;
					
					_width	=	_title.width;
				
				//Verificando para adicionar na lista dos filtros fixos
					var to_add	=	makeDesck(get_filter_fixed[lineFixed].filter,tmp_width,_width,{'_class_i':'fa-user','_class':'filter-fixed'},undefined);
						html	+=	to_add.html;
						_width	=	to_add.width;
					
			}
		}
			
	
	$('.qtip-default').width(_width); 
	
 	
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
    			var json				=	$(this).data('wrs-data');	   


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
    		var json				=	main.data('wrs-data');	
    		
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
    			
    			}
    			else
    			{
    					json[label]				=	value;
    			}
    		
    		if(pageCurrentHome)
    		{
    			json['PG_CURRENT']				=	0;
    		}

    		main.data('wrs-data',json);
    		
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
			
			
			var aba_active			=			get_aba_active_object();
			
			
				
			$('.WRS_DRAG_DROP_FILTER h2').each(function(){
					var level_full					=	$(this).attr('level-full');	
					//var json						=	$.parseJSON(base64_decode($(this).attr('json')));	
					var json						=	$(this).data('wrs-data');	
					var not_use						=	$(this).hasClass('hide');
					var tag_class					=	$(this).attr('tag-class');
					var aba_active					=	get_aba_active_object();
					
					///Para não permitir apagar filtro simples
					var filters					=	aba_active.wrsAbaData('getFilterSimples',{'tag_class':tag_class});
					
					 
					
						if(!not_use && filters==true) 
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
									
									aba_active.wrsAbaData('setNewFilter',{tag:tag_class,data:null});
								}
								
							}
						}
					
			});
			
			
		//	$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
			
			_END('WrsFilter::cleanFiltersDown');	
    	}
    	

    	var rules_filter_tags	=	 function(_negado,level_full,_json_filter)
    	{
    		var _query		=	null;
    		var _type_tag	=	'{'+_json_filter+'}';
    			
		    		if(_negado==true)
					{
						//Aplica a regra do filtro negado
		    			_query	=	str_replace(['{LEVEL_FULL}','{DATA}'],[level_full,_json_filter], words_restrict.filter_negado);	
					}
					else
					{
						_query	=	_type_tag;	
					}
				
				
				return { query:_query , normal:  _type_tag };	
		
    	}
    	
		/**
		 * Pegando os Filtros pais 
		 */
		var getFiltersLevelUP =	function(level_up,typeEvent)
		{
			_START('WrsFilter::getFiltersLevelUP');	
			var levelUP			=	[];
			var filters_up		=	[];
			var filters_up_only_Data=	[];
			var empty_filter	=	false;
			var tagQuery		=	'';
			var FilterOriginal	=	[];
			var addFilter		=	[];
			var _index			=	[];
			var aba_active			=			get_aba_active_object();
			var add_filter_fixed	=	{};
			
				levelUP			=	 explode(',',level_up);			
			
			if(empty(level_up) && empty(typeEvent)) 
			{
				_END('WrsFilter::getFiltersLevelUP');	
				return '';
			}
	
			
			
			var find_filter		 =	function(level_full,tag_class,is_red)
			{
					var _data_filter				=	'';
					
					var _json_filter				=	'';
						//Verificando se o Level Full exist no array passado
						if(in_array(level_full, levelUP, true) || typeEvent=='all')
						{						  
							_data_filter		=	aba_active.wrsAbaData('getFilter',{tag:tag_class});
					         var getNewFilter	=	aba_active.wrsAbaData('getNewFilter',{tag:tag_class});
					        
					         
					         
					         var get_filter_negado	=	aba_active.wrsAbaData('getFilterNegado',md5(level_full));
					         
					         //Regra para não permitir duplicidade para o Filtro simples
					         var processa_silples	=	 true;
					         if(typeof get_filter_negado.simples!=undefined)
					        	 {
					        	 	if(get_filter_negado.simples==true) processa_silples=false;
					        	 }
					         
					         
					         var vir			=	',';
					         
					         if(!isEmpty(getNewFilter))
					         {
						        	 if(isEmpty(_data_filter) || isEmpty(getNewFilter))	vir	=	'';
						        	 
						        	 //Faz com que o filtro simples não seja duplicado
						        	 if(processa_silples==false)
						        	 {
						        		 _data_filter=vir=	'';
						        	 }
						        	 
						        	 _data_filter = _data_filter+vir+implode_wrs(getNewFilter);
					        	 
					         }
					         
					         
					         
					         
					         //Aplicação do Filtro
							if(!empty(_data_filter))
							{
									_json_filter						=	_data_filter;
									_index.push(_json_filter);		
									//Obtendo filtros negado

									var _querys												=	rules_filter_tags(get_filter_negado.negado,level_full,_json_filter);
										filters_up.push(_querys.query);
										filters_up_only_Data.push(_querys.normal);	
										
							}
							
							
							
							FilterOriginal[FilterOriginal.length]	=	{'class':'__'+replace_attr(level_full),data:_json_filter};							
							addFilter[addFilter.length]				=	[replace_attr(level_full),'',_json_filter];
						}
					
			};
			
			
			$('.WRS_DRAG_DROP_FILTER h2').each(function()
					{
										var level_full					=	$(this).attr('level-full');	
										var tag_class					=	$(this).attr('tag-class');
										var is_red						=	$(this).hasClass('red');
										
										if(is_red==true)
										{
											add_filter_fixed[tag_class]=	true;
										}
										
										find_filter(level_full,tag_class,is_red);
										

					});
			
			
			//HERE
			//Adicionando Filtros fixos
				var allFilterFixeds		=		$('body').filterFixed('add_filtro_fixo_query',{
																								fn 				:	rules_filter_tags,
																								filtersUP		:	filters_up,
																								originalFilter	:	FilterOriginal,
																								onlyData		:	filters_up_only_Data,
																								FilterAdd		:	addFilter,
																								index			:	_index
																							});
				
			
				//HERE
				//Devolvendo os filtros fixos aplicados
				filters_up					=	allFilterFixeds.filtersUP;
				filters_up_only_Data		=	allFilterFixeds.onlyData;
				addFilter					=	allFilterFixeds.FilterAdd;
				FilterOriginal				=	allFilterFixeds.originalFilter;
				_index						=	allFilterFixeds._index;
				//END
				
			
			

			
			
			if(is_array(filters_up)) 
				{
 					tagQuery	=	 implode(',',filters_up);
				}else{
					tagQuery	=	'';
				}
			
			

			if(typeEvent=='all') {
				_END('WrsFilter::getFiltersLevelUP');
				return {
							data:tagQuery,
							full:FilterOriginal,
							filter:addFilter, 
							index:implode(',',_index),
							only_compare	:	implode(',',filters_up_only_Data)
						};
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
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_search" 	index-data="'+index_data+'"><i class="fa fa-search"></i></div>'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_negado" 	index-data="'+index_data+'"><i class="fa fa-times-circle"></i></div>'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_clean" 	index-data="'+index_data+'"><i class="fa fa-eraser"></i></div>'
			html	+=  '      <div class="input-group-addon btn wrs_element btn_event_filtro_remove" 	index-data="'+index_data+'"><i class="fa fa-trash-o"></i></div>'
			html	+=  '    </div>'
			html	+=  '  </div>'
			html	+=  '</div>';
			
			
			$(nameID).find('.div_componente_filter').remove();
			
			
			switch(type)
			{
				case 'before'	:  {$(nameID).prepend(html);

				}; break;
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
			
			$('.btn_event_filtro_search').hide();
			
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

		 		$evento			=	$(this);
		 		$key_object		=		find_parent_class($evento,'wrs_filter_body').attr('tag-class');
		 		
		 		WRS_CONFIRM(LNG('FILTER_CLEAN_FILTER'),'warning',function(result){
		 			
		 									if(result)
		 									{
		 										G_MSG_FILTER_CLEAN	= LNG('FILTER_CLEAN_FILTER_SUCCESS');

		 										setJsonEncodeDecode($evento,['FILTER','LIKE'],'',true);		
		 										var active_aba_object	=		get_aba_active_object();	
		 										
		 										active_aba_object.wrsAbaData('removeFilter',$key_object);
		 										$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
		 										
		 										
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
		 
		 	
		 	var btn_event_filtro_search_input_click	=	 function(e)
		 	{
				//@Link http://stackoverflow.com/questions/152975/how-to-detect-a-click-outside-an-element
				 		
				 		if($('.btn_event_filtro_negado').is(":visible")==true)
				 		{ 
				 			//Processando o Evento do click fora para mudar os tipos de bottons
							$('html').one('click',function() 
							{
								//Desabilita o negação e habilita o button search
						 		$('.btn_event_filtro_negado').show();
						 		$('.btn_event_filtro_search').hide();
						 		$('.btn_event_filtro_clean').hide();
							});
					e.stopPropagation();
		 		}
					  
					  
		 		//Desabilita o negação e habilita o button search
		 		$('.btn_event_filtro_negado').hide();
		 		$('.btn_event_filtro_search').show();
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
		 	
		 	
		 
		 	//Botão Evento Negação
		 	var btn_event_filtro_negado	=	 function()
		 	{
		 		//Obtendo informações de quem dever ser carregado
		   		var index_data			=	 $(this).attr('index-data');
	    		var main				=	$('#wrs_header_filter_main_'+index_data);
	    		//var json				=	$.parseJSON(base64_decode(main.attr('json')));	
	    		var json				=	main.data('wrs-data');	
	    		var aba_active			=	get_aba_active_object();
	    		

	    		var status		=	aba_active.wrsAbaData('getFilterNegado',json.tag_class); 
	    		
	    			aba_active.wrsAbaData('enableFilterNegado',{type:json.tag_class, data: !status.negado, level_full:json.LEVEL_FULL});
	    		
	    			set_css_negado(json.tag_class,aba_active);
		 	}
		 	
		 	/*
		 	 * Apenas implementa o evento quando terminar de carregar
		 	 */
		 	
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search').unbind('click').click(btn_event_filtro_search);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search_input').unbind('keypress').keypress(btn_event_filtro_search_input).focus();
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search_input').unbind('click').click(btn_event_filtro_search_input_click);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_search_input').unbind('keyup').keyup(btn_event_filtro_search_input_up);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_clean').unbind('click').click(btn_event_filtro_clean);
			 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_negado').unbind('click').click(btn_event_filtro_negado);
			 	
			 	
			 	if(atributo_simples_composto!='simples')
			 	{
				 	$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_remove').unbind('click').click(btn_event_filtro_remove);
			 	}else{
			 		$(nameID).find('.btn_event_filtro_remove').hide();
			 		$(nameID).find('.wrs_filter_body_container').find('.btn_event_filtro_negado').remove();
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
    	 * TODO: O código pode ser limpo devido a modificação do dia 21/12/2015
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
        	 
        	 var aba_active			=			get_aba_active_object();
        	 //var json				=	$.parseJSON(base64_decode(event.attr('json')));	        	 
        	 var json				=	event.data('wrs-data');	        //Apenas gerencia a funções correntes a ele
        	 
        	 var tag_class			=	event.attr('tag-class');
        	 var index_data			=	event.attr('index-data');
        	 var wrs_filter_body	=	'#wrs_filter_body_'+index_data;
        	 var body				=	$(wrs_filter_body);
        	 
        	 
	        	 json['id']			=	wrs_filter_body;
	        	 json['index_data']	=	index_data;
	        	 json['FILTER_UP']	=	getFiltersLevelUP(json['LEVEL_UP']);
	        	 json['atributo']	=	event.attr('atributo');
	         	         
	        	 
	        	 json['tag_class']	=	tag_class;
	         
	        //filtro ativo na aba
	         json['FILTER']	=	aba_active.wrsAbaData('getFilter',{tag:tag_class});
	        	 
	         var getNewFilter	=	aba_active.wrsAbaData('getNewFilter',{tag:tag_class});
	         var vir			=	',';
	         if(!isEmpty(getNewFilter)){
	        	 if(isEmpty(json['FILTER']))	vir	=	'';
	        	 json['FILTER'] = json['FILTER']+vir+getNewFilter;
	         }
	         
	         
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

        	 
        	 if(pageHome)
        		{
        		 	json['PG_CURRENT']		=	0;
        		}
        	 
        	 
        	 var _wrs_multiple_cube_event	=	$('.wrs_multiple_cube_event').find('option').length;
        	 
     		//Verificando se existe multiplos cubos
     		if(_wrs_multiple_cube_event>1){
     			var jsonMukltiple	=	$('.wrs_multiple_cube_event').find('option:selected').attr('json');
     			var _json			=	$.parseJSON(base64_decode(jsonMukltiple));	
     			

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
		 		
		 		_main.data('wrs-data',data.data);

				
		 		set_css_negado(data.data.tag_class,get_aba_active_object());	
		 		
		 
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
		 			var json				=	main.data('wrs-data');	
		 			
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
				 			var json		=	mainFilter.data('wrs-data');	
				 			var filter		=	 explode(',',json.FILTER);
				 			var value		=	'';

				 			if(empty(filter) || filter=='') filter=[];
				 			
				 			
				 			//aba_detect_change();
				 			
				 			
				 			main.find('input[type=checkbox]').each(function(){
				 				if(!$(this).hasClass('btn_event_filtro_checkbox'))
				 				{
				 		 			 var aba_active	=			get_aba_active_object();
				 		 			 var tag_class	=	$(this).attr('tag-class');
				 		 			 var _val		=	$(this).val();
				 		 			
				 		 			 	aba_active.wrsAbaData('setNewFilter',{tag:tag_class,data:_val,remove:checked? false: true});
				 		 					
				 					$(this).prop('checked',checked);
				 				}
				 			});
				 			
				 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTagMain);
							
							_END('WrsFilter::funCallBackRun::btn_event_filtro_checkbox');
				 	}
		 	
		 	
		 	var wrs_input_filter_single	=	 function()
		 	{
				_START('WrsFilter::funCallBackRun::wrs_input_filter_single');
				var index_data	=	$(this).attr('index-data');
				var nameTag		=	'wrs_header_filter_main_'+index_data;
	 			var main		=	$('#'+nameTag);
	 			var json		=	main.data('wrs-data');	
	 			var type_input	=	$(this).attr('type');
	 			var checked		=	$(this).prop('checked');
	 			var value 		=	$(this).val();
	 			
	 			 var aba_active	=	get_aba_active_object();
	 			 var tag_class	=	$(this).attr('tag-class');
	 			
	 			if(type_input!='radio')
					{
	 					var _val		=	$(this).val();
	 					aba_active.wrsAbaData('setNewFilter',{tag:tag_class,data:_val,remove:checked? false: true});

					}else{

	 					aba_active.wrsAbaData('setNewFilter',{tag:tag_class,data:null});//Limpa todos os filtros e adicinoa apenas o escolhidp
	 					aba_active.wrsAbaData('setNewFilter',{tag:tag_class,data:$(this).val(),only_data:true});
					}
	 			
	 			cleanFiltersDown(json['LEVEL_DOWN'],'',nameTag);
				
				_END('WrsFilter::funCallBackRun::wrs_input_filter_single');
		 	}
		 	
		 	/*
		 	 * Help click no input
		 	 * @link http://stackoverflow.com/questions/10268222/jquery-checking-a-checkbox-and-triggering-javascript-onclick-event
		 	 */
		 	var pws_click_triger_single =  function()
		 	{
//				_START('WrsFilter::funCallBackRun::pws_click_triger_single');
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
     	
     	var _filter_tmp	=	'';
     	
     		try{
     			_filter_tmp	=	_tmp.FILTER_TMP;
     		}catch(e){
     			console.warn('exception');
     			_filter_tmp	=	'';
     		}
     		
     		
     	var _filter	=	getJsonDecodeBase64(_filter_tmp);
     	
		var _obj	=	{};
		

		if(isEmpty(_filter)) return null;

		for(var lineFilter in _filter)
		{
			var _sub				=	_filter[lineFilter];
				_obj[_sub.class]	=	_sub.data;
		}


		return _obj;

     }
	 
	 
	 /**
	  * Faz a junção dos filtros selecionados e o que já está para ser selecionado
	  */
	 var join_filter_selected_current	=	 function(filter,selected)
	 {
		 	var _tmp_filter	=	filter.split(',');
		 	var _selected	=	selected.split(',');
		 	
		 	
		 	for(var line in _selected)
		 	{
		 		if(!isEmpty(_selected[line]))
		 		{
		 			if($.inArray(_selected[line],_tmp_filter)<0)
		 				{
		 					_tmp_filter.push(_selected[line]);
		 				}
		 		}
		 	}
		 	
		 	
		 	return _tmp_filter.join(',');
		 
	 }
	 
	 
   	 var  setWRSFilterCommon = function(typeExec)
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
														 	
															
															try{
																	
														 				json['FILTER']	=	json['FILTER_CLICK']=		join_filter_selected_current(json['FILTER'],filter_selectd['__'+tag_class]);
														 		}catch(e){
														 			if(IS_EXCEPTION) console.warn(' exception');
														 		}
																
																

															
														 	if(!empty(value))
														 	{
														 		var h2	=	 $('<h2/>',{	'vvalue'		:	value,
														 									html			:	value,
//														 									'json'			:	json,
														 									'level-full'	:	jsonDecode.LEVEL_FULL,
														 									'index-data'	:	index,
														 									'tag-class'		:	tag_class,
														 									'id'			:	'wrs_header_filter_main_'+index,
																							'class'			:	'wrs_class_filter_header_main '+_hide+' WRS-'+tag_class,
																							'atributo'		:	atributo
																				 		}).data('wrs-data',json);
														 		
														 		var div	=	$('<div/>',
														 								{
														 									'id'			:	'wrs_filter_body_'+index,
														 									'class'			:	'wrs_filter_body',
														 									'tag-class'		:	tag_class
														 									
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
									
									//Bloqueia o drag and drop dos filtros fixos
//									$('body').filterFixed('hide',{filter:true, exec:typeExec});

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
							setWRSFilterCommon(true);
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
					var aba_ativa				=	 get_aba_active_object();

					if(is_atributo_simples=='false') 
					{
						_END('WrsFilter::__wrs_check_filter_simples');
						return true;
					}
					
					filter.find("h2").each(function(){
						var atributo	=	$(this).attr('atributo');		
						var json		=	'';
						var tag_class	=	 $(this).attr('tag-class');
						
						
						
						
						if(atributo=='simples' && isEmpty(aba_ativa.wrsAbaData('getAllFilters',{tag:tag_class})))
							{
//					 				json	=	 	$.parseJSON(base64_decode($(this).attr('json')));
					 				json	=	 	$(this).data('wrs-data');

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
					 						$(this).data('wrs-data',json);
					 						
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
			            $.error( 'Method ' +  methodOrOptions + ' does not exist on Filter.Filter' );
			    }
    };
    
    
    
    
    
    
   
    	
}( jQuery ));



 

(function ( $ ) {
	 /**
     * Estrutura do Filtro Fixo
     */
	$.fn.filterFixed	= function(methodOrOptions) 
    {
    	
    	var dataFilterFixed		=	'filterFixed';
		/**
		 * Pegando todos os registros do ManagerJOB
		 */
		var GetData		=	function()
			{
					var data_body		=	$('body').data(dataFilterFixed);
					
						data_body		=	data_body==undefined || data_body==null || data_body=='' ? {} : data_body;
						
					var defaultData		=	{
												filter_fixed					:	[],//Contem toda a estrutuda do filtro fixo
												filter_fixed_base				:	[]
											}
					
					return $.extend({}, defaultData,data_body);
			}
		
		
		
		
		var __getData	=	 function()
		{
			return GetData();
		}
		
		
		
		//Carrega com as informações iniciais para o filtro fixo
    	var __init		=	 function(_jsonFilterFixed)
    	{

    		_ONLY('filterFixed::__init');
    		//variávelk global antiga userinfo_filter_fixed
    		__init_element({data:_jsonFilterFixed,column:'filter_fixed'});
    	}
    	
    	
    	
    	var __filterSugestDatabase		=	 function(_jsonFilterFixed)
    	{
    		_ONLY('filterFixed::__filterSugestDatabase');

    		var jsonFilterFixed			=	_jsonFilterFixed;
    		var get_data				=	GetData();
    		var filtrer_fixed_login		=	 get_data.filter_fixed;
    		var json					=	[];
    		
    		
	    		for(var key in jsonFilterFixed)
	    			{
	    				var exist_data	=	false;
	    				 try{
	    					 
	    					 	if(filtrer_fixed_login[str_replace('__','',(jsonFilterFixed[key][0]))])
	    					 		{
	    					 			exist_data	=	true;
	    					 		}
	    				 }catch(e){
	    					 exist_data	=	false;
	    				 }
	    				
	    				 if(exist_data!=true)
	    				 {
	    					 json[json.length]	=	jsonFilterFixed[key];
	    				 }
	    			}
    		
    		
			get_data.filter_fixed_base	=	json;
			
		$('body').data(dataFilterFixed,get_data);
		
		
    	}
    	
    	
    	var __addFilterDB	=	 function()
    	{
    		var get_data				=	GetData();
    		
    		
    		if(!isEmpty(get_data.filter_fixed_base))
    			{
    					set_value_box_relatorio({LAYOUT_FILTERS:get_data.filter_fixed_base});
    					
    					var filter		=	get_data.filter_fixed_base;
    					var aba_active	=	get_aba_active_object();
    					
    					for(var line in filter)
    						{
    							var tag_class		=	str_replace('__','',filter[line][0]);

    							var opt_insert		=	{tag:tag_class,data:filter[line][2]};
    							
    							aba_active.wrsAbaData('setNewFilter',opt_insert);
    								

    								
    								if(filter[line][3]==true)
    								{
    						    		var filter_east					=	$('.wrs_panel_options ul .'+tag_class);
    					    			var filter_east_json			=	filter_east.data('wrs-data');
    						    		
    									aba_active.wrsAbaData('enableFilterNegado',{type:tag_class, data:true, level_full:filter_east_json.LEVEL_FULL});
    								}
    								
    								
    								
    							}
    					
    			}
    		
    	}
    	
    	
    	
    	
     	var __init_element		=	 function(element)
    	{
    		var jsonFilterFixed		=	 element.data;
    		_ONLY('filterFixed::__init_element');
    		//variávelk global antiga userinfo_filter_fixed
    		
    		if(typeof jsonFilterFixed == 'object')
    		{
	    		if(isEmpty(jsonFilterFixed)) return false;
	    		
	    		//Mount Filters
	    		for(var lineDataFilter in jsonFilterFixed)
	    		{
	    			var _data										=	jsonFilterFixed[lineDataFilter].data;
	    				jsonFilterFixed[lineDataFilter]['filter']	=	[];
	    			var tmp											=	[];
	    			
			    			for(var lineData in _data )
			    				{
			    					tmp.push(jsonFilterFixed[lineDataFilter]['class']+".["+_data[lineData]+"]");	
			    				}
		    			
		    			jsonFilterFixed[lineDataFilter]['filter']	=	tmp;
	    		}//END Maount
	    		
	    		
	    		
	    		var get_data					=	GetData();
	    			get_data[element.column]	=	jsonFilterFixed;

	    			$('body').data(dataFilterFixed,get_data);
    		}
    	}
     	
     	
    	
    
    	/*
    	 * Falta validar remover todos dos pais e o title
    	 */
    	var actions_dimensions	=	 function(dimensao)
    	{
    		if(isEmpty(dimensao.level_up)) return true;
    		
    		if(isEmpty(dimensao.level_full)) return true;
    		

    		var dimensao_data		=	dimensao.level_full.split(']');
    		var dimensal_level		=	dimensao_data[0]+']';
    		var level_up			=	dimensao.level_up.split(',');
    		var dimensoes			=	{};
    		
    		
    		for(var line in level_up)
    			{
    				if(level_up[line].substring(0,dimensal_level.length)==dimensal_level)
    					{
    						var _class	=	md5(level_up[line]);
    						
    						if(dimensao.checa_dimensao==true)
    							{
    							
    								dimensoes['__'+_class]=	true;
    							
    							}
    							else
    							{
		    						//Remove o Filtro se ele for uns dos pais da dimensão e se não estiver no fixo
		    						if(!array_find_data(dimensao.filter_fixed,_class))
		    						{
		    							$('.wrs_panel_options li.'+_class).remove();
									}
		    						
		    						$('.wrs_panel_options li.'+_class).addClass('hide');
    							}
    						
    					}
    			}
    		
    		
	    		if(dimensao.checa_dimensao==true)
				{
						return dimensoes;
				}

    	}
    	
    	
    	
    	//Essa função é chamada em apenas dois lugares
    	var __hide	=	 function(_setFilter)
    	{
    		_START('filterFixed::__hide');
    		var _data		=	 GetData();
    		
    		var setFilter	=	_setFilter;
    		
    		if(_setFilter==undefined)
    			{
    				setFilter	=	{filter:false, exec:false};
    			}
    		
    		//Verificando se o array está vazio
    		if(isEmpty(_data.filter_fixed)==true) 
    		{
    			_END('filterFixed::__hide - empty');
    			return false; 
    		}
    		
    		var	filter				=	_data.filter_fixed;
    		var add_filter_fixed	=	{};	
    		

    		//Escondendo os valores para drag and drop
    		for(var _class in filter)
    		{
	    		//Removendo os pais e dos filtros do lado direiro e esquerdo
	    		
	    		var filter_east					=	$('.wrs_panel_options ul .'+_class);
    			var filter_east_json			=	filter_east.data('wrs-data');
    			 
    			if(filter_east_json!=undefined)
    			{                                                                                                                                                                                                                                                  
	    			//Removendo as dimensões dos elementos direito e esquerdo
	    			actions_dimensions({
	    															level_full		:	filter_east_json.LEVEL_FULL	/*"[PERIODO].[MES]"*/,
	    															level_up		:	filter_east_json.LEVEL_UP  /*"[PERIODO].[ANO],[PERIODO].[MAT],[PERIODO].[SEMESTRE],[PERIODO].[TRIMESTRE],[PERIODO].[YTD]"*/,
	    															checa_dimensao	:	false
	    													});
    			}
    			//END
    			
    		}
    		

    		 
    		
    		_END('filterFixed::__hide');
    	}
    	
    	var join_dimensao	=	 function(receive,to_add)
    	{
    		var start_receive	=	 receive;
    		
    		for(var line in to_add)
    			{
    				start_receive[line]=	to_add[line];
    			}
    		
    		return start_receive;
    	}
    	
    	
    	
    	var __filtro_fixed_check		=	 function(_filters)
    	{
    		if(isEmpty(_filters)) return _filters;
    		
    		var filter		=	_filters;
    		var _data		=	 GetData();
    		var filter_fixo=	_data.filter_fixed;	
    		
    		
    		if(isEmpty(filter_fixo))  return filter;
    		
    		var key_not_add		=	{};
    		
    		for(var lineFixed in filter_fixo)
    			{
    					var filter_east_json			=	$('.wrs_panel_options li.'+lineFixed).data('wrs-data');
    					
    					if(filter_east_json==undefined) continue; 
    					
    					key_not_add['__'+lineFixed]	=	true;

    					
	    					if(!isEmpty(filter_east_json.LEVEL_UP))
	    					{
						    	var filter_pai_dimensao	=	actions_dimensions({
															level_full		:	filter_east_json.LEVEL_FULL,
															level_up		:	filter_east_json.LEVEL_UP,
															checa_dimensao	:	true
													});
						    	
						    	key_not_add		=	join_dimensao(key_not_add,filter_pai_dimensao);
	    					}
    					
				}
    	
    		
    		
    		//Removendo se existir algum filtro ou pai do filtro da mesma dimensal dos filtros fixos
    		for(var lineFilter in filter)
    			{
					if(typeof key_not_add[filter[lineFilter][0]]=="boolean") 
					{
						delete filter[lineFilter];
					}
    			}
    		
    		
    	 
    		
    		return filter;
    	}
    	
    	
    	
    	
    	var __add_filtro_fixo_query		=	 function(_inputs)
    	{
    		var inputs		=	_inputs;
    		var _data		=	 GetData();
    		var filter_fixo	=	_data.filter_fixed;	
    		
    		
    		if(isEmpty(filter_fixo))  return _inputs;
    		
    		var key_not_add		=	{};
    		var filters_up		=	[];
    		
    		/**
    		 * Essa regra do código é a mesma que é utilizada antes de chamar a função __add_filtro_fixo_query
    		 */
    		if(!isEmpty(filter_fixo))
    		{	
		    		for(var tag_class in filter_fixo)
		    			{
		    					var filter_east_json			=	$('.wrs_panel_options li.'+tag_class).data('wrs-data');
		    					
		
		    					if(isEmpty(filter_east_json)) continue;
		    					
		    					
		    					var level_full					=	filter_east_json['LEVEL_FULL'];	
								var type						=	filter_fixo[tag_class].type;	//negado/simples
								var _negado						=	false;
								var _json_filter				=	implode(',',filter_fixo[tag_class].filter);
								
									if(type=='negado')
									{
										_negado=	true;
									}
									
									inputs.index.push(_json_filter);		
								
								//Obtendo filtros negado
								var _querys												=	inputs.fn(_negado,level_full,_json_filter);
		
									inputs.filtersUP.push(_querys.query);
									inputs.onlyData.push(_querys.normal);	
									
									inputs.originalFilter.push({'class':'__'+replace_attr(level_full),data:_json_filter});
									
									inputs.FilterAdd.push([replace_attr(level_full),'',_json_filter]);
		    					
						}//END FOR
    		}
    		
    		return inputs;
    		
    	}
    	
    	
    	var __add_filtro_fixo_query_save		=	 function(_inputs)	//LAYOUT_FILTERS, filter_selected
    	{
    		var inputs		=	_inputs;
    		var _data		=	 GetData();
    		var filter_fixo	=	_data.filter_fixed;	
    		
    		
    		
    		if(isEmpty(filter_fixo))  return _inputs;
    		
    		var key_not_add		=	{};
    		var filters_up		=	[];
    		
    		
    		 // Essa regra do código é a mesma que é utilizada antes de chamar a função __add_filtro_fixo_query
    		 
    		if(!isEmpty(filter_fixo))
    		{	
    			
    				var filter_key		=	[];
    				
		    		for(var tag_class in filter_fixo)
		    			{
		    					

								var type						=	filter_fixo[tag_class].type;	//negado/simples
								var _json_filter				=	implode(',',filter_fixo[tag_class].filter);
								var string_type					=	'';
								var layout_filters				=	filter_fixo[tag_class]['class'];
									if(type=='negado')
									{
										string_type	=	'~';
									}
									
									if(type=='simples')
									{
										string_type	=	'*';
									}
									
									
									filter_key.push(string_type+layout_filters);
									/*
								
								//Obtendo filtros negado
								var _querys												=	inputs.fn(_negado,level_full,_json_filter);
		
									inputs.filtersUP.push(_querys.query);
									inputs.onlyData.push(_querys.normal);	
									
									inputs.originalFilter.push({'class':'__'+replace_attr(level_full),data:_json_filter});
									
									inputs.FilterAdd.push([replace_attr(level_full),'',_json_filter]);
									*/
		    					
						}//END FOR
		    		
		    		var vir = ',';
		    			if(isEmpty(inputs.LAYOUT_FILTERS)){
		    				vir	='';
		    			}
		    			
		    			
		    			inputs.LAYOUT_FILTERS.request	=	inputs.LAYOUT_FILTERS.request+vir+implode(',',filter_key);
		    			
    		}
    		
    		return inputs;
    		
    		
    	}
    	
    	
    
    	
    	
    	
    	
    	//Apenas devolve o array para ser tratado
    	//È trabalhado também no perfil onde é manipulado para mandar para o filtro
    	var __tooltipeFixed	=	 function(index)
    	{
    		
    		_START('filterFixed::__tagFilterWRS');
    		
    		var _data		=	 GetData();
    		
    		//Verificando se o array está vazio
    		if(isEmpty(_data.filter_fixed)==true) 
    		{
    			_END('filterFixed::__tagFilterWRS - empty');
    			return false; 
    		}
    		
    					_END('filterFixed::__tagFilterWRS - data');
    		
    		if(index!=undefined)
    			{
    				//validando se existe o filtro a ser pesquisado
    				try{
    					return _data.filter_fixed[index];
    				}catch(e){
    					return false;
    				}
    				
    				
    			}else{
    					return _data.filter_fixed;
    			}
    		
    		
    		_END('filterFixed::__tagFilterWRS - not');
    		return false;
    		
    		
    	}
    	

    	 
    	
    	/*
		 * Metodos de funções
		 * formas de chamadas externas
		 */
		var methods = 
		{
		        init 							: 	__init,
		        hide							:	__hide,
		        tooltipeFixed					:	__tooltipeFixed,
		        filterSugestDatabase			:	__filterSugestDatabase,
		        getData							:	__getData,
		        addFilterDB						:	__addFilterDB,
		        filtro_fixed_check				:	__filtro_fixed_check,
		        add_filtro_fixo_query			:	__add_filtro_fixo_query,
		        add_filtro_fixo_query_save		:	__add_filtro_fixo_query_save
		};
		
		
		 //console.log('fixed',methodOrOptions);
		 
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
	            $.error( 'Method ' +  methodOrOptions + ' does not exist on Filter.filterFixed' );
	    }
		
		
    };	
}( jQuery ));



 

