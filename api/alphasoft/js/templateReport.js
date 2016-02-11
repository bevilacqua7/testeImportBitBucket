
function report_array_to_key(inputArray)
{
	_START('report_array_to_key');
	if(empty(inputArray)) return inputArray;
	
	 var _tmp		=	[];
	 
		for(lineInput in inputArray)
		{
			_tmp[inputArray[lineInput]]		=	[];
		}
		_END('report_array_to_key');
		return _tmp;
}

function reoprt_convert_load(inputArray)
{
	_START('reoprt_convert_load');
	if(empty(inputArray)) return '';
	 var _tmp		=	[];
	 
		for(lineInput in inputArray)
		{
			if(empty(replace_attr(lineInput))) continue;
			var _filters	=	{
			            	 	 	'class' : 	'__'+replace_attr(lineInput),
			            	 	 	'data'	:	inputArray[lineInput].join(',')
								}
			
			_tmp.push(_filters);
		}
		_END('reoprt_convert_load');
		return _tmp;
	
}

function load_multiple_reports_autoload(obj){
	_START('load_multiple_reports_autoload');
	if(typeof obj=='object'){
		for(var key in obj){
			var report = obj[key];
			//callback_load_report_generic_modal($.parseJSON(report));
		}
	}
	_END('load_multiple_reports_autoload');
}

function formata_filters_tmp(_FILTERS,_FILTERS_VALUES){
	_START('formata_filters_tmp');
	var _FILTERS_TMP		=	(_FILTERS!='' && _FILTERS!=undefined)?report_array_to_key(_FILTERS.split(',')):'';
	
	if(_FILTERS_VALUES!='' && _FILTERS_VALUES!=null && _FILTERS_VALUES!=undefined && _FILTERS_VALUES.length>0)
	{
		var filtros_values 	= _FILTERS_VALUES.split('(_|_)');
		var data_temp 		= "{"+_FILTERS_VALUES.replace('(_|_)','},{')+"}";
		//var full_temp 		= [];
		
	
			for(var filtro in filtros_values)
			{
				var value 				= 	filtros_values[filtro].split(',');
				var key_full			=	value[0].split('.');
					key_full.splice(-1,1);
				var key					=	implode('.',key_full);	
			
					_FILTERS_TMP[key]	=	value;
									
			}		
		
	}
	_END('formata_filters_tmp');
	return base64_json(reoprt_convert_load(_FILTERS_TMP));
}

function callback_load_report_generic_modal(data,return_params,nao_processa)
{
	_START('callback_load_report_generic_modal');
	if(return_params==undefined) 	return_params=false;
	
	if(nao_processa==undefined) 	nao_processa=true;
	//wrs_panel_layout.open('east');
	
	data = repair_reportname_kendoui(data);
	
	var _ROWS 				=	data.LAYOUT_ROWS;
	var _COLUMNS 			=	data.LAYOUT_COLUMNS;
	var _MEASURES 			=	data.LAYOUT_MEASURES;
	var _FILTERS 			=	data.LAYOUT_FILTERS;
	var _FILTERS_VALUES 	=	data.FILTER_VALUES;
	var _kendoui			=	$.parseJSON(base64_decode(data.REPORT_OPTIONS));
	var _filter_selected 	=	'';
	
	
	var _param		=	{
							'LAYOUT_ROWS'			:	wrs_base64encode(_ROWS),
							'LAYOUT_COLUMNS'		:	wrs_base64encode(_COLUMNS),
							'LAYOUT_MEASURES'		:	wrs_base64encode(_MEASURES),
							'LAYOUT_FILTERS'		:	wrs_base64encode(_FILTERS),
							'KendoUi'				:	base64_json(_kendoui),
							'FILTER_TMP'			:	formata_filters_tmp(_FILTERS,_FILTERS_VALUES)//wrs_base64encode(_filter_selected)
						}
		
	if(return_params)
	{
		_END('callback_load_report_generic_modal');
		return _param;
	}
	else
	{

		$(ABA_TAG_NAME).wrsAbas('load_multiple',[_param],nao_processa);

		//wrsRunFilter();
		//set_value_box_relatorio(_param);
		
		$('#myModal').modal('hide');
		
		/*
		if(!nao_processa){
			//wrsRunFilter();
		}
		
		else{
			wrs_panel_layout.open('east');
		}*/
		
	}
	return _param;
	_END('callback_load_report_generic_modal');
}





function carrega_grid_list_reports(options)
{
_START('carrega_grid_list_reports');
	
	var active_aba	=	get_aba_active_object();
	
		active_aba.wrsAbas('save_info_aba_current',active_aba, false);


	var funCallBackVision = function()
	{
		_START('carrega_grid_list_reports::funCallBackVision');
		var rel		=	 $(this).attr('rel');
		var table	=	 $(this).attr('table');
		var option	=	 {wrs_type_grid:rel,cube_s:CUBE_S};
		carrega_grid_list_reports(option);
		_END('carrega_grid_list_reports::funCallBackVision');
	}

	var funCallBack	=	function(data)
	{
		_START('carrega_grid_list_reports::funCallBack');
			$('.modal-content-grid').html(data);
			wrs_window_grid_events_tools({btn:btn_window_grid_event_report, visao: funCallBackVision});
		_END('carrega_grid_list_reports::funCallBack');	
	};
	
	var retorno ='';
	if(options!='' && options!=null){
		retorno = $.parseJSON(options);
		if(retorno!= null && typeof retorno == 'object' && typeof retorno.relatorios_apagados != 'undefined'){
			$('#myModalGenericConfig').modal('hide');	
			var _s = (retorno.relatorios_apagados>1)?'s':'';
			WRS_ALERT(LNG_s('JS_report_removed',_s),'success');	
		}
	}

	grid_window_modal(
			 				((options!=null && options!='' && typeof options == 'object')?options:{wrs_type_grid:'icon_middle',cube_s:CUBE_S}),
			 				'GET_SSAS_REPORT',
			 				funCallBack);
	_END('carrega_grid_list_reports'); 
}


function repair_reportname_kendoui(_obj)
{
	
	var obj		=	_obj;
	
	_START('repair_reportname_kendoui');
	if(obj!=undefined && typeof obj == 'object'){
		var attr = obj.REPORT_OPTIONS;
		if (typeof attr !== typeof undefined && attr !== false) {
			

			
			var param_options 		= $.parseJSON(base64_decode(obj.REPORT_OPTIONS));
			

			//TODO: Validar regra
			if(isEmpty(param_options))  
			{
				param_options	=	{};
				//return false;
			}
			
				param_options.TITLE_ABA		=	obj.REPORT_DESC;
			
			
	 		// recriando variaveis redundantes dentro do objeto KendoUi (report_options)
			param_options.REPORT_DESC			=	obj.REPORT_DESC;
			param_options.REPORT_ID				=	obj.REPORT_ID;
			
			param_options.REPORT_SHARE			=	obj.REPORT_SHARE;
			param_options.REPORT_AUTOLOAD		=	obj.REPORT_AUTOLOAD;
			param_options.FILTER_TMP			=	formata_filters_tmp(obj.LAYOUT_FILTERS,obj.FILTER_VALUES);
			
			param_options.LAYOUT_ROWS			=	(obj.LAYOUT_ROWS=='' || obj.LAYOUT_ROWS==undefined || obj.LAYOUT_ROWS==null)			?'':base64_json(obj.LAYOUT_ROWS);
			param_options.LAYOUT_COLUMNS		=	(obj.LAYOUT_COLUMNS=='' || obj.LAYOUT_COLUMNS==undefined || obj.LAYOUT_COLUMNS==null)	?'':base64_json(obj.LAYOUT_COLUMNS);
			param_options.LAYOUT_MEASURES		=	(obj.LAYOUT_MEASURES=='' || obj.LAYOUT_MEASURES==undefined || obj.LAYOUT_MEASURES==null)?'':base64_json(obj.LAYOUT_MEASURES);
			param_options.LAYOUT_FILTERS		=	(obj.LAYOUT_FILTERS=='' || obj.LAYOUT_FILTERS==undefined || obj.LAYOUT_FILTERS==null)	?'':base64_json(obj.LAYOUT_FILTERS);
			
			
//			obj.REPORT_ID	=	
				param_options.REPORT_ID				=	'A'+obj.REPORT_ID;
			
			/*
	 		
	 		// ainda não retornam do banco de dados portanto nao sao recriados e nem apagados na hora da gravacao mas existem separadamente no BD
	 		unset($dadosJs->KendoUi->ALL_ROWS);
	 		unset($dadosJs->KendoUi->ALL_COLS);
	 		unset($dadosJs->KendoUi->ORDER_COLUMN);
	 					
			*/			
			
			obj.REPORT_OPTIONS	= base64_json(param_options);

		}
	}
	_END('repair_reportname_kendoui');
	return obj;
}


function btn_window_grid_event_report(data)
{
	_START('btn_window_grid_event_report');
	var action_type				=	 $(this).attr('action_type');
	var table					=	 $(this).attr('table');
	var values					=	 get_grid_window_values_form();

	var _data					=	 $('#myModal, .body_grid_window').data('wrsGrid');
	var param					=	 _data.param_original;
	var visao					=	'grid';
	
	var qtde_linhas_selecionadas=	null;
	var linhas_selecionadas		=	null;
	
	var attr = param.visao_atual;
	if (typeof attr !== typeof undefined && attr !== false) {		
		visao 	= 	'icon';		
	}
	
	if(visao=='icon'){

		qtde_linhas_selecionadas=	$('.body_grid_window').find(':has(.selecao_icon)').length;
		linhas_selecionadas		=	$('.body_grid_window').find(':has(.selecao_icon)');
		
	}else{
		
		qtde_linhas_selecionadas=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content').find('tr:has(.checkline:checked)').length;
		linhas_selecionadas		=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content').find('tr:has(.checkline:checked)');
		
	}

	if(qtde_linhas_selecionadas>1){
	
		var arrObjetosSelecionados = [];
		var arrReportsIds = [];
		
		linhas_selecionadas.each(function(){
			var objDados = param_options = null;
			if(visao=='icon'){
				var index			=	$('.body_grid_window').first().children().index($(this));
				objDados 			= repair_reportname_kendoui(_data[index]);
			}else{
				var index			=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content tr').index(this);
				objDados 			= repair_reportname_kendoui($('#GET_SSAS_REPORT').data().handler._data[index]);
			}
			
			
			arrReportsIds.push(objDados.REPORT_ID);
			arrObjetosSelecionados.push(callback_load_report_generic_modal(objDados,true));
			
		});
		

		switch(action_type)
		{
			case 'new' 		: {
						$(ABA_TAG_NAME).wrsAbas('load_multiple',arrObjetosSelecionados,true);
						$('#myModal').modal('hide');}
					//callback_load_report_generic_modal(objDados);	
					break; // abre o relatorio
			case 'update' 	: {
						$(ABA_TAG_NAME).wrsAbas('load_multiple',arrObjetosSelecionados,false);
						$('#myModal').modal('hide');}
					//callback_load_report_generic_modal(objDados,false,true);
					break; // abre somente o layout
			case 'remove' 	:
					removeReport(arrReportsIds);
					break; // apaga o relatorio
			
		}
		
//		console.log('TODO: acoes multiplas nas guias',{'evento':action_type,'arrObjetos':arrObjetosSelecionados});
		
	}else if(qtde_linhas_selecionadas==1){

		

		var objDados = param_options = null;
		if(visao=='icon'){
			var index			=	$('.body_grid_window').first().children().index(linhas_selecionadas);
			objDados 			= repair_reportname_kendoui(_data[index]);
		}else{
			var index			=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content tr').index(linhas_selecionadas);			
			objDados 			= repair_reportname_kendoui($('#GET_SSAS_REPORT').data().handler._data[index]);
		}
		
		var report_id= objDados.REPORT_ID;
		switch(action_type)
		{
			case 'new' 		: 
					callback_load_report_generic_modal(objDados,false,true);	
					break; // abre o relatorio
			case 'update' 	: 
					callback_load_report_generic_modal(objDados,false,false);
					break; // abre somente o layout
			case 'remove' 	: 
					removeReport([report_id]);
					break; // apaga o relatorio
			
		}
	}else{
		WRS_ALERT(LNG('JS_report_select_one'),'warning'); 
	}
	_END('btn_window_grid_event_report');
}

function removeReport(arrRepIds)
{
	_START('removeReport');
	
	var _callbackDelete = function (confirm) {
		   if(confirm){
				var param_request	=	 {'report_id':JSON.stringify(arrRepIds)};
				var Ofile			=	'WRS_REPORT';
				var Oclass			=	'WRS_REPORT';
				var Oevent			=	'delete';
				runCall(param_request,Ofile,Oclass,Oevent,carrega_grid_list_reports,'modal');
		   }
	}
	var _s = arrRepIds.length>1?'s':'';
	WRS_CONFIRM(LNG_s('JS_report_confirm_remove',_s),'warning',_callbackDelete);
	_END('removeReport');
	
}


function getLoadReport(no_request)
{
	_START('getLoadReport');
	
	
	var active_aba	=	get_aba_active_object();
	
		active_aba.wrsAbas('save_info_aba_current',active_aba,false);
		
		

	var _param						=	{};
	var sortable_metrica			=	rows_by_metrica_attr_base64('.sortable_metrica','metrica');
	var sortable_linha				=	rows_by_metrica_attr_base64('.sortable_linha','attr');
	var sortable_coluna				=	rows_by_metrica_attr_base64('.sortable_coluna','attr');
	var sortable_filtro				=	rows_by_metrica_attr_base64('.sortable_filtro','attr');
	var wrs_grid_options_default	=	get_aba_active_kendoUi();
	
	var _filter_hide				=	activeToGetAllFilters();
	var filter_selected				=	$.WrsFilter('getAllFiltersToRun');
	
	wrs_grid_options_default		=	wrs_clean_data(wrs_grid_options_default);
	
	if(no_request)
	{
		
		_param	=	{
				'LAYOUT_ROWS'			:	sortable_linha.request,
				'LAYOUT_COLUMNS'		:	sortable_coluna.request,
				'LAYOUT_MEASURES'		:	sortable_metrica.request,
				'FILTER_TMP'			:	filter_selected.full,
				
			}
		
		
	}else{
		_param	=	{
						'LAYOUT_ROWS'			:	sortable_linha,
						'LAYOUT_COLUMNS'		:	sortable_coluna,
						'LAYOUT_MEASURES'		:	sortable_metrica,
						'LAYOUT_FILTERS'		:	sortable_filtro,
						'KendoUi'				:	wrs_grid_options_default,
						'filter_selected'		:	filter_selected
		}
	}
	

	//Desabilita a janela
	activeToGetAllFiltersRecover(_filter_hide);
	_END('getLoadReport');
	return _param;
	
}

function atualiza_id_aba_ativa(_rep_id)
{
	_START('atualiza_id_aba_ativa');
	
	var rep_id	=	_rep_id;
	
	if(rep_id!='' && parseInt(rep_id)>0)
	{

		rep_id='A'+rep_id;
		
		var aba_ativa 	= $(".WRS_ABA ul li.active");
		var get_old_id	=	aba_ativa.attr('id-aba');

		aba_ativa.wrsAbaData('change_div_elements',{old:get_old_id,id:rep_id});
		aba_ativa.wrsAbaData('remove_asterisk');
		
	}
	
	
	
	_END('atualiza_id_aba_ativa');
}

