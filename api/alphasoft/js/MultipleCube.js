
var CHANGE_CUBE_ELEMENTS	=	'';


/**
 * Mudando o tipo de Cubo
 */

function wrs_multiple_cube_event()
{
	//MODAL_LOADING_WRS_PANEL('GERANDO_MULTI_CUBE_TITLE','GERANDO_MULTI_CUBE_BODY','hide');
	
	var CUBE_ID			=	$(this).val();
	var _file			=	'WRS_PANEL';
	var _class			=	'WRS_PANEL';
	var _event			=	'change_cube';
	var param_request	=	[];
	var json			=	$(this).find('option:selected').attr('json');
//	setLoading($('.wrs_panel_measure_atribute'));
	
	
	var filter_icon		=	$('.wrs_panel_filter_icon');
	
	if(filter_icon.attr('filter_hide')=='true'){
		filter_icon.trigger('click');
	}
	
	
	param_request['CUBE_ID']				=	CUBE_ID;
	param_request[TAG_URL_CUBE_SELECTED]	=	CUBE_S;
	param_request['json']					=	json;

	CHANGE_CUBE_ELEMENTS	=	'';
	CHANGE_CUBE_ELEMENTS	=	getElementsWindowToChangeCube();
	change_cube(CUBE_ID);
}





function getElementsWindowToChangeCube()
{
	var $elements	=	[];
	
		$elements['LAYOUT_ROWS']		=	[];
		$elements['LAYOUT_COLUMNS']		=	[];
		$elements['LAYOUT_FILTERS']		=	[];
		$elements['LAYOUT_MEASURES']	=	[];
	
	
	//placeholder
	$('.sortable_linha li').each(function(){
		
		if(!$(this).hasClass('placeholder'))
		{
			var json 			=	$.parseJSON(base64_decode($(this).attr('json')));		
			$elements['LAYOUT_ROWS'][$elements['LAYOUT_ROWS'].length]	=	 '__'+replace_attr(json['LEVEL_FULL']);	
		}
	});
	
	
	$('.sortable_coluna li').each(function(){
		if(!$(this).hasClass('placeholder'))
		{
			var json 			=	$.parseJSON(base64_decode($(this).attr('json')));		
			$elements['LAYOUT_COLUMNS'][$elements['LAYOUT_COLUMNS'].length]	=	 '__'+replace_attr(json['LEVEL_FULL']);	
		}
	});
	
	
	$('.sortable_metrica li').each(function(){
		if(!$(this).hasClass('placeholder'))
		{
			var json 			=	$.parseJSON(base64_decode($(this).attr('json')));	
		 	$elements['LAYOUT_MEASURES'][$elements['LAYOUT_MEASURES'].length]	=	 '__'+replace_attr(json['MEASURE_UNIQUE_NAME']);	
		}
	});
	
	
	
	//WRS_DRAG_DROP_FILTER
	$('.sortable_filtro li').each(function(){
		if(!$(this).hasClass('placeholder'))
		{
			var json 	=	$.parseJSON(base64_decode($(this).attr('json')));	
			var attr	=	$(this).attr('atributo');
			
				if(empty(attr)) attr='';
				
				//TRACE_DEBUG(getFiltersChangeCube(json['LEVEL_FULL']));
				$elements['LAYOUT_FILTERS'][$elements['LAYOUT_FILTERS'].length]	=	[ '__'+replace_attr(json['LEVEL_FULL']),attr,getFiltersChangeCube(json['LEVEL_FULL'])];	
		}
	});
	
	return $elements;
}



function getFiltersChangeCube(levelFULL)
{
	var filter		=	'';
	$('.WRS_DRAG_DROP_FILTER h2').each(function(){
		var json 	=	$.parseJSON(base64_decode($(this).attr('json')));	
		
		if(levelFULL==json['LEVEL_FULL']){
			
			filter 	=	json['FILTER'];
		}
	})
	
	return filter;
}



/**
 *  Retorna com as informações da trcoda de cubo
 *  @link http://stackoverflow.com/questions/8314729/how-to-destroy-delete-active-accordion-using-jquery
 */
function change_cube(CUBE_ID)
{
	var measure_relation	=	$.parseJSON(base64_decode(MEASURE_RELATIONSSHIPS));
	var _relationships		=	measure_relation[CUBE_ID]['relationships'];
	var _measures			=	measure_relation[CUBE_ID]['measure'];	
	
		ATRIBUTOS_JSON		=	 base64_encode(json_encode(_relationships,true));
		METRICAS_JSON		=	 base64_encode(json_encode(_measures,true));	
	
	var htmlRelationships	=	MENU_DRAG_DROP_DIREITO(	_relationships	,['LEVEL_NAME','LEVEL_NAME']);
	
	var measure				=	MENU_DRAG_DROP_DIREITO(	_measures		,['MEASURE_NAME','MEASURE_NAME'],'metrica');
	

	$( ".WRS_DRAG_DROP").accordion("destroy");    // Removes the accordion bits
	$( ".WRS_DRAG_DROP").empty();                // Clears the contents
	
	$('.wrs_relationships_menu_direiro').html(htmlRelationships);
	$('.wrs_measure_menu_direiro').html(measure);
	

	
	
	 wrs_panel_active_drag_drop();
	 BTN_HOVER_BOX_DROP();

	set_value_box_relatorio(CHANGE_CUBE_ELEMENTS);
	CHANGE_CUBE_ELEMENTS	=	'';
	
	
	var check	=	['.sortable_filtro', '.sortable_metrica','.sortable_coluna','.sortable_linha'];
	
	for(obj in check)
	{
		var size	=	 $(check[obj]).find('li').length;

		if(size==0){
			var htmlDefault			=	'<li class="placeholder">'+sprintf(LNG('DRAG_DROP_AREA'),LNG($(check[obj]).attr('LNG')))+'</li>';
			$(check[obj]).html(htmlDefault);
		}
	};

	
	CLOSE_LOAD_RELATORIO();
	
	acoes_multiplas_menu_painel();

}







function MENU_DRAG_DROP_DIREITO(container,valueShow,_type)
{
	var icon	=	'font';
	var type	=	_type;
	var NULL	=	'';
	var html	=	NULL;
	
	if(empty(type))	type='';
	
	if(type=='metrica')
	{
		icon	=	'usd';
	}

	var liFindGroup	=	'<li class="wrs_drag_direita_find" vvalue="wrs_search" >'+
						'	<div class="form-group">'+
						'	<div class="input-group ">'+
						'		<input type="text" class="form-control wrs_search_drag_drop_direita_eventos"  placeholder="'+LNG('WHAT_SEARCH')+'">'+
						'		<span class="input-group-addon span_sub wrs_remove_searcg_drag cursor"><i class="fa fa-search"></i><i class="fa fa-eraser"></i></span>'+
						'	</div>'+
						'	</div>'+
						'</li>';
	
	var li			=	'<li 	class="ui-widget-content box_wrs_panel {class}" tag-class="{class}" api="wrs"  type="{type}"'+
						'			vvalue="{label}" json="{json}"><span class="btn-left glyphicon glyphicon glyphicon-'+icon+'"></span>{value}</li>';

	var liSearch	=	 ['{label}','{value}','{json}','{type}','{class}'];
	
	var dragDrop	=	'		<h2 rel="{rel}">'+
						'			<a href="#">{title}</a>'+
						'		</h2>'+
						'		<div class="wrs_panel_options {rel}" >'+
						'			<ul>{liBody}</ul>'+
						'		</div>';

	var dragDropSearch		=	 ['{title}','{liBody}','{rel}'];
	
	
	if(!is_array(container)) return  html;
	
	
	for(var label in  container  )
	{
			var value	=	container[label];
				liTemp	=	NULL;
			
			for(var _ilabel in value )
			{
				var _ivalue		=	value[_ilabel];
				var param_json	=	_ivalue;
				var $class		=	replace_attr(empty(param_json['LEVEL_FULL']) ? param_json['MEASURE_UNIQUE_NAME'] : param_json['LEVEL_FULL']);
				var lReplace	=	[_ivalue[valueShow[0]],_ivalue[valueShow[1]],base64_encode(json_encode(param_json,true)),type,$class];
					liTemp		+=	str_replace(liSearch, lReplace, li);
			}
			
			var rel				=	replace_attr(empty(param_json['LEVEL_FULL']) ? param_json['MEASURE_UNIQUE_NAME'] : param_json['LEVEL_FULL']);
			var dragDropReplace	=	[label,liFindGroup+liTemp,rel];
				html			+=	str_replace(dragDropSearch, dragDropReplace, dragDrop);
	}
	
	return html;
}
