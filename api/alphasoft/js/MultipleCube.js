



/**
 * Mudando o tipo de Cubo
 */

function wrs_multiple_cube_event()
{
	_START('wrs_multiple_cube_event');
	//MODAL_LOADING_WRS_PANEL('GERANDO_MULTI_CUBE_TITLE','GERANDO_MULTI_CUBE_BODY','hide');
	
	var CUBE_ID			=	$(this).val();
	var wrs_multiple_cube_event_class	=	$('.wrs_multiple_cube_event');
	var multiple_data					=	wrs_multiple_cube_event_class.data('wrsParan');
	

	//wrs_multiple_cube_event_class.data('wrsParan',{'val':CUBE_ID,'type_event':type_event});
	if(multiple_data.type_event!='no_change'){
			var aba_current		=	get_aba_active();
			
			if(aba_current['MULTIPLE_CUBE_ID']!=CUBE_ID)
			{
				WRS_CONFIRM(LNG('ABA_CHANGE_CUBE_ID'),'warning',event_cube_change_confirm);
			}
	}
	else
	{
		event_cube_change_confirm(true);		
	}
	_END('wrs_multiple_cube_event');
}




function multiple_cube_status_change(no_change)
{
	_START('multiple_cube_status_change');
	var wrs_multiple_cube_event_class	=	$('.wrs_multiple_cube_event');
	var multiple_data					=	wrs_multiple_cube_event_class.data('wrsParan');
	
	if(multiple_data==undefined || multiple_data==null)
	{
		multiple_data	=	{'val':null,type_event:false};
	}
	
	
	var val								= 	multiple_data.val; 
	var type_event						=	'no_change';
	
	if(no_change==undefined)
	{
		type_event						=	'no_change';
	}else{
		type_event						=	no_change;
	}
	
	wrs_multiple_cube_event_class.data('wrsParan',{'val':val,'type_event':type_event});
	
	_END('multiple_cube_status_change');
}




function event_cube_change_confirm(confirm)
{
	_START('event_cube_change_confirm');
	var wrs_multiple_cube_event_class	=	$('.wrs_multiple_cube_event');
	var that							=	wrs_multiple_cube_event_class.find('option:selected');
	var CUBE_ID							=	that.val();
	var multiple_data					=	wrs_multiple_cube_event_class.data('wrsParan');
	var val								= 	multiple_data.val; 
	var type_event						=	multiple_data.type_event;

	type_event	=	 null;
	
	
	//Voltando a configuração
	if(!confirm)
	{
		wrs_multiple_cube_event_class.selectpicker('val', val);
		wrs_multiple_cube_event_class.data('wrsParan',{'val':val,'type_event':type_event});
		return true;
	}


	wrs_multiple_cube_event_class.data('wrsParan',{'val':CUBE_ID,'type_event':type_event});
	
	var _file			=	'WRS_PANEL';
	var _class			=	'WRS_PANEL';
	var _event			=	'change_cube';
	var json			=	that.attr('json');
	

	var filter_icon		=	$('.wrs_panel_filter_icon');
	
	if(filter_icon.attr('filter_hide')=='true'){
		filter_icon.trigger('click');
	}


	
	$('.WRS_ABA').find('.active').wrsAbaData('setKendoUi',{MULTIPLE_CUBE_ID:CUBE_ID});

	change_cube(CUBE_ID);
	_END('event_cube_change_confirm');
}






function getFiltersChangeCube(levelFULL)
{
	_START('getFiltersChangeCube');
	var filter		=	'';
	$('.WRS_DRAG_DROP_FILTER h2').each(function(){
		var json 	=	$.parseJSON(base64_decode($(this).attr('json')));	
		
		if(levelFULL==json['LEVEL_FULL']){
			
			filter 	=	json['FILTER'];
		}
	})
	_END('getFiltersChangeCube');
	return filter;
}



/**
 *  Retorna com as informações da trcoda de cubo
 *  @link http://stackoverflow.com/questions/8314729/how-to-destroy-delete-active-accordion-using-jquery
 */
function change_cube(CUBE_ID)
{
	_START('change_cube');
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

	

	set_value_box_relatorio(optionsDataConvert(get_aba_active_wrs_param()));
	
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
_END('change_cube');
}







function MENU_DRAG_DROP_DIREITO(container,valueShow,_type)
{
	_START('MENU_DRAG_DROP_DIREITO');
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
	
	
	if(!is_array(container)) {
		_END('MENU_DRAG_DROP_DIREITO');
		return  html;
	}
	
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
	_END('MENU_DRAG_DROP_DIREITO');
	return html;
}

