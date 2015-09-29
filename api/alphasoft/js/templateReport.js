
/**
 * Quando finalizou de construir os elemtnos da GRid
 * @param arg
 */

function ajustaTags(arr){
	var ret=[];
	
	if(Array.isArray(arr))
	{
		if(arr.length>0)
		{		
			for(var nova in arr)
			{
				if(arr[nova].trim()!='')
				{
					var s='__'+replace_attr(arr[nova]);
					ret.push(s);
				}
			}
		}
	}
	else
	{
		ret = '__'+replace_attr(arr);
	}
	return ret;
}

function callback_check_line_generic_modal(data){
	var attr = data.visao_atual;
	if (typeof attr !== typeof undefined && attr !== false) {
		if(data.obj_sel.hasClass('selecao_icon')){
			data.obj_sel.removeClass('selecao_icon');
		}else{
			data.obj_sel.addClass('selecao_icon');
		}
	}else{	
		var linha=$('#GET_SSAS_REPORT .k-grid-content table').find('tr')[parseInt(data.ROW_ID)-1];
		var check = !$(linha).find('td input.checkline').prop('checked');
		$(linha).find('td input.checkline').prop('checked',check);
		$('#GET_SSAS_REPORT .k-grid-header table').find('input.checkline').prop('checked',false); // qualquer alteracao na linha, desmarca o checkall da coluna
		if($($(event.target).context).hasClass('checkline')){ // se o click vier do checkbox
			$($(event.target).context).prop('checked',!check);
		}
	}
}

function trataCheckColuna(){
	var checkColuna = $(this).prop('checked');
	$('#GET_SSAS_REPORT .k-grid-content table').find('tr').each(function(){
		$(this).find('td input.checkline').prop('checked',checkColuna);
	});
}

function report_array_to_key(inputArray)
{
	if(empty(inputArray)) return inputArray;
	
	 var _tmp		=	[];
	 
		for(lineInput in inputArray)
		{
			_tmp[inputArray[lineInput]]		=	[];
		}
		
		return _tmp;
}

function reoprt_convert_load(inputArray)
{
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
		
		return _tmp;
	
}



function callback_load_report_generic_modal(data,return_params,nao_processa)
{
	
	if(return_params==undefined) 	return_params=false;
	
	if(nao_processa==undefined) 	nao_processa=false;
	//wrs_panel_layout.open('east');
	
	data = repair_reportname_kendoui(data);
	
	var _ROWS 				=	data.LAYOUT_ROWS;//.split(',');
	var _COLUMNS 			=	data.LAYOUT_COLUMNS;//.split(',');
	var _MEASURES 			=	data.LAYOUT_MEASURES;//.split(',');
	var _FILTERS 			=	data.LAYOUT_FILTERS;//.split(',');
	var _kendoui			=	$.parseJSON(base64_decode(data.REPORT_OPTIONS));
	var _filter_selected 	=	'';
	var _FILTERS_TMP		=	report_array_to_key(_FILTERS.split(','));
	
	
	if(data.FILTER_VALUES!='' && data.FILTER_VALUES!=null && data.FILTER_VALUES.length>0)
	{
		var filtros_values 	= data.FILTER_VALUES.split('(_|_)');
		var data_temp 		= "{"+data.FILTER_VALUES.replace('(_|_)','},{')+"}";
		//var full_temp 		= [];
		
	
			for(var filtro in filtros_values)
			{
				var value 				= 	filtros_values[filtro].split(',');
				var key_full			=	value[0].split('.');
					key_full.splice(-1,1);
				var key					=	implode('.',key_full);	
			
					_FILTERS_TMP[key]	=	value;
					
				//full_temp.push({'class':class_temp,'data':data_temp2});
				
			}
		
		//_filter_selected = {'data':data_temp,'full':full_temp};
		
	}
	

	
	var _param		=	{
							'LAYOUT_ROWS'			:	wrs_base64encode(_ROWS),
							'LAYOUT_COLUMNS'		:	wrs_base64encode(_COLUMNS),
							'LAYOUT_MEASURES'		:	wrs_base64encode(_MEASURES),
							'LAYOUT_FILTERS'		:	wrs_base64encode(_FILTERS),
							'KendoUi'				:	base64_json(_kendoui),
							'FILTER_TMP'			:	base64_json(reoprt_convert_load(_FILTERS_TMP))//wrs_base64encode(_filter_selected)
						}

/*	
	var _param		=	{
			'LAYOUT_ROWS'			:	ajustaTags(_ROWS),
			'LAYOUT_COLUMNS'		:	ajustaTags(_COLUMNS),
			'LAYOUT_MEASURES'		:	ajustaTags(_MEASURES),
			'LAYOUT_FILTERS'		:	ajustaTags(_FILTERS),
			'KendoUi'				:	_kendoui,
			'filter_selected'		:	_filter_selected
}

*/
	
	//console.log('reportDATA: ',data,'kendoUi carregado: ',_kendoui, 'PARAM: ',_param);
	/*
	 * TODO: adicionar os campos abaixo para ir para as abas e voltar para a tela na hora de salvar:
	 * - REPORT_AUTOLOAD
	 * - REPORT_SHARE
	 * - ver onde gravar os layouts e retorna-los
	 * - USER_TYPE (grupos)
	 */
//	console.log('LAYOUT_FILTERS',ajustaTags(_FILTERS));
	//console.log('filter_selected',_filter_selected);
	
	if(return_params)
	{
		return _param;
	}
	else
	{
		
		$(ABA_TAG_NAME).wrsAbas('load_multiple',[_param],true);

		//wrsRunFilter();
		//set_value_box_relatorio(_param);
		
		$('#myModal').modal('hide');
		if(!nao_processa){
			//wrsRunFilter();
		}else{
			wrs_panel_layout.open('east');
		}
		
	}
}





function carrega_grid_list_reports(options){

	WRS_CONSOLE('optionsWindow',options);
	
	var funCallBackVision = function()
	{
		var rel		=	 $(this).attr('rel');
		var table	=	 $(this).attr('table');
		var option	=	 {wrs_type_grid:rel,cube_s:CUBE_S};
		carrega_grid_list_reports(option);
	}

	var funCallBack	=	function(data)
	{
			$('.modal-content-grid').html(data);
			wrs_window_grid_events_tools({btn:btn_window_grid_event_report, visao: funCallBackVision});
	};
	
	var retorno ='';
	if(options!='' && options!=null){
		retorno = $.parseJSON(options);
		if(retorno!= null && typeof retorno == 'object' && typeof retorno.relatorios_apagados != 'undefined'){
			$('#myModalGenericConfig').modal('hide');	
			var s = (retorno.relatorios_apagados>1)?'s':'';
			WRS_ALERT('Relatório'+s+' removido'+s+' com sucesso','success');	
		}
	}

	grid_window_modal(
			 				((options!=null && options!='' && typeof options == 'object')?options:{wrs_type_grid:'icon_middle',cube_s:CUBE_S}),
			 				'GET_SSAS_REPORT',
			 				funCallBack);
	 
}


function repair_reportname_kendoui(obj){
	if(obj!=undefined && typeof obj == 'object'){
		var attr = obj.REPORT_OPTIONS;
		if (typeof attr !== typeof undefined && attr !== false) {
			var param_options 		= 	$.parseJSON(base64_decode(obj.REPORT_OPTIONS));
			param_options.TITLE_ABA		=	obj.REPORT_DESC;
			obj.REPORT_OPTIONS	= base64_json(param_options);
		}
	}
	return obj;
}


function btn_window_grid_event_report(data)
{
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
			case 'new' 		: 
						$(ABA_TAG_NAME).wrsAbas('load_multiple',arrObjetosSelecionados,true);
						$('#myModal').modal('hide');
					//callback_load_report_generic_modal(objDados);	
					break; // abre o relatorio
			case 'update' 	: 
						$(ABA_TAG_NAME).wrsAbas('load_multiple',arrObjetosSelecionados);
						$('#myModal').modal('hide');
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
					callback_load_report_generic_modal(objDados);	
					break; // abre o relatorio
			case 'update' 	: 
					callback_load_report_generic_modal(objDados,false,true);
					break; // abre somente o layout
			case 'remove' 	: 
					removeReport([report_id]);
					break; // apaga o relatorio
			
		}
	}else{
		WRS_ALERT('selecione ao menos um relatório','warning'); 
	}
}

function removeReport(arrRepIds){

	var _callbackDelete = function (confirm) {
		   if(confirm){
				var param_request	=	 {'report_id':JSON.stringify(arrRepIds)};
				var Ofile			=	'WRS_REPORT';
				var Oclass			=	'WRS_REPORT';
				var Oevent			=	'delete';
				runCall(param_request,Ofile,Oclass,Oevent,carrega_grid_list_reports,'modal');
		   }
	}

	WRS_CONFIRM("Deseja apagar este(s) relatório(s)?",'warning',_callbackDelete);
}


function getLoadReport()
{
	var _param						=	{};
	var sortable_metrica			=	rows_by_metrica_attr_base64('.sortable_metrica','metrica');
	var sortable_linha				=	rows_by_metrica_attr_base64('.sortable_linha','attr');
	var sortable_coluna				=	rows_by_metrica_attr_base64('.sortable_coluna','attr');
	var sortable_filtro				=	rows_by_metrica_attr_base64('.sortable_filtro','attr');
	var wrs_grid_options_default	=	$('#wrsConfigGridDefault').data('wrsConfigGridDefault');
	
	var _filter_hide=activeToGetAllFilters();
	var filter_selected				=	$.WrsFilter('getAllFiltersToRun');
	
	_param	=	{
					'LAYOUT_ROWS'			:	sortable_linha,
					'LAYOUT_COLUMNS'		:	sortable_coluna,
					'LAYOUT_MEASURES'		:	sortable_metrica,
					'LAYOUT_FILTERS'		:	sortable_filtro,
					'KendoUi'				:	wrs_grid_options_default,
					'filter_selected'		:	filter_selected
	}
	
//	console.log('filter_selected',filter_selected);
	
	//Desabilita a janela
	activeToGetAllFiltersRecover(_filter_hide);
	return _param;
	
}