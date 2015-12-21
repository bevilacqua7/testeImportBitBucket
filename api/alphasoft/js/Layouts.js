
function event_btn_change_layout_options(data)
{
	
	if(isEmpty(data)) return false;
	
	var options		=	{
							param		:	 {},
							is_empty	:	 true,
							wrs_data	:	get_aba_active_kendoUi()
						};

	
	$('.layout-select-box select').each(function()
			{
						var selected		=	 $(this).find('option:selected').val();
						
						if(!isEmpty(selected))
						{
							options.param[$(this).attr('name')]		=	filter_array_convert(selected);
							options.is_empty						=	 false;
						}
		
			});
	
	if(options.is_empty)
		{
			WRS_ALERT(LNG('tpl_layout_option_select_empty'),'error');
			return false;
		}
	

		
	$('.'+options.wrs_data.REPORT_ID).wrsAbaData('setKendoUi',{FILTER_TO_CLEAN:false,TYPE_RUN:TYPE_RUN.layout});
	
	set_value_box_relatorio(options.param,true);
	
	$('#myModalGenericConfig').modal('hide');
	
	
	
	
	
	
	
	
	
	wrsRunFilter();
	
	delete options;

}




function btn_open_layouts_events()
{
	
	var btn_open_layouts_click	=	 function()
	{
		 
		 
		var param_request			=	[];
			param_request['cube_s']	=	CUBE_S;
		
		var optionsDefault			= {
												'file'									:	'ReportLayout', 
												'classe'								:	'ReportLayout',
												'event'									:	'layout_options_load',
												'title'									:	LNG('tpl_layout'),
												'bt_salvar'								:	true,
												'bt_atualizar'							:	false,
												'bt_apagar'								:	false,
												'bt_salvar_extra_action_validator'		:	event_btn_change_layout_options,
												'bt_atualizar_extra_action_validator'	:	null,
												'bt_apagar_extra_action_validator'		:	null,
												'bt_cancelar'							:	true,
												'returnModal'							:	false,
												'extraParam'							:	param_request
											};
		
			$(this).modalGeneric(optionsDefault);
		
		
	}
	
	
	$('.btn-open-layouts').unbind('click').click(btn_open_layouts_click);
}
var layout_events_button	=	 function()
{
	
	_START('layout_events_button');

//	var action_type				=	$(this).attr('action_type');
	var _table					=	$(this).attr('table');
	var _object					=	$('#'+_table);
	var _data					=	_object.data('wrs-modal');
	var _data_remove			=	[];
	
		_object.find('input[type=checkbox]').each(function(){
			
			if($(this).prop('checked')==true)
				{
					var _index	=	$(this).parent().parent().index();
					
					_data_remove.push(_data[_index].LAYOUT_ID);
				}
		});
	
	var Ofile				=	'ReportLayout';
	var Oclass				=	'ReportLayout';
	var Oevent				=	'layout_form_remove';	
	
	var funCallBackDataLayout_events_button	=	 function(data)
	{
		WRS_ALERT(data.mensagem,data.type);
		$(".wrs_grid_window_event a.active_tools").trigger('click');
	}
	
	
	if(isEmpty(_data_remove))
		{
			WRS_ALERT(LNG('tpl_layout_remove_empty'),'error');
			return false;
		}

		var param_request			=	{};
		param_request['remove']	=	 json_encode(_data_remove);
	
		runCall(param_request,Ofile,Oclass,Oevent,funCallBackDataLayout_events_button,'modal','json');
		
	_END('layout_events_button');
	
	
}




var event_btn_save_layout	= function(data)
{
	
	if(isEmpty(data)) return false;
	
	var funCallBackData			=	 function(data)
	{
		WRS_ALERT(data.mensagem,data.type);
	}

	
	var Ofile				=	'ReportLayout';
	var Oclass				=	'ReportLayout';
	var Oevent				=	'layout_form_save';	
	
	var inputs_values		=	get_grid_window_values_form($('.layout-container'));
	
	var options				=	{
										cube_s			:	CUBE_S,
										LAYOUT_DESC		:	null, //está mo input
										LAYOUT_ALIAS	:	null,	// está o input
										USER_CODE		:	null,
										SERVER_ID		:	null,
										DATABASE_ID		:	null,
										CUBE_ID			:	null,
										ROWS			:	base64_encode(rows_by_metrica_attr_base64('.sortable_linha','attr').request),
										COLUMNS			:	base64_encode(rows_by_metrica_attr_base64('.sortable_coluna','attr').request),
										MEASURES		:	base64_encode(rows_by_metrica_attr_base64('.sortable_metrica','metrica').request),
										LAYOUT_FLAG		:	null,
										LAYOUT_SHARE	:	null //está mo input
								};
		
	var param_request		=	merge_objeto(options,inputs_values);
	
	
	if(isEmpty(param_request.LAYOUT_DESC))
	{
		WRS_ALERT(LNG('tpl_layout_name_empty'),'error');
		return false;
	}
	
	if(isEmpty(param_request.LAYOUT_ALIAS))
	{
		WRS_ALERT(LNG('tpl_layout_alias_empty'),'error');
		return false;
	}
	
	
	if(isEmpty(param_request.ROWS) && isEmpty(param_request.COLUMNS) && isEmpty(param_request.MEASURES))
		{
			WRS_ALERT(LNG('tpl_layout_data_empty'),'error');
			return false;
			
		}
	
	runCall(param_request,Ofile,Oclass,Oevent,funCallBackData,'modal','json');
	
}	

function controllers_layout()
{
	
	//layout-container
	var event_layout_save	=	 function()
	{
		var Ofile					=	'ReportLayout';
		var Oclass					=	'ReportLayout';
		var Oevent					=	'layout_form_htm';	
		var param_request			=	[];
			param_request['cube_s']	=	CUBE_S;
			
		 
		
		var optionsDefault			= {
												'file'									:	'ReportLayout', 
												'classe'								:	'ReportLayout',
												'event'									:	'layout_form_htm',
												'title'									:	LNG('tpl_layout_title'),
												'bt_salvar'								:	true,
												'bt_atualizar'							:	false,
												'bt_apagar'								:	false,
												'bt_salvar_extra_action_validator'		:	event_btn_save_layout,
												'bt_atualizar_extra_action_validator'	:	null,
												'bt_apagar_extra_action_validator'		:	null,
												'bt_cancelar'							:	true,
												'returnModal'							:	false,
												'extraParam'							:	param_request
											};
		
			$(this).modalGeneric(optionsDefault);
			
	}
	
	
	$('.event-layout-save').click(event_layout_save);

	//event-layout-open
	
}

/*
 * END temnplate layout
 */




function layout_actionSingle(data,tabela)
{

}


function layout_actionDouble(data,return_params,nao_processa)
{
	_START('layout_actionDouble');

	var optionsAba		=	{};
	
	
	if(!isEmpty(data.LAYOUT_COLUMNS))
		{
			optionsAba['LAYOUT_COLUMNS']	=	filter_array_convert(data.LAYOUT_COLUMNS);
		}
	
	if(!isEmpty(data.LAYOUT_ROWS))
	{
		optionsAba['LAYOUT_ROWS']	=	filter_array_convert(data.LAYOUT_ROWS);
	}
	
	if(!isEmpty(data.LAYOUT_MEASURES))
	{
		optionsAba['LAYOUT_MEASURES']	=	filter_array_convert(data.LAYOUT_MEASURES);
	}
	
	set_value_box_relatorio(optionsAba);

	
	
	_END('layout_actionDouble');
}


