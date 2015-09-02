

/**
 * Quando finalizou de construir os elemtnos da GRid
 * @param arg
 */

function ajustaTags(arr){
	var ret=[];
	if(Array.isArray(arr)){
		if(arr.length>0){		
			for(var nova in arr){
				if(arr[nova].trim()!=''){
					var s='__'+replace_attr(arr[nova]);
					ret.push(s);
				}
			}
		}
	}else{
		ret = '__'+replace_attr(arr);
	}
	return ret;
}

function callback_check_line_generic_modal(data){
	var linha=$('#GET_SSAS_REPORT .k-grid-content table').find('tr')[parseInt(data.ROW_ID)-1];
	var check = !$(linha).find('td input.checkline').prop('checked');
	$(linha).find('td input.checkline').prop('checked',check);
	$('#GET_SSAS_REPORT .k-grid-header table').find('input.checkline').prop('checked',false); // qualquer alteracao na linha, desmarca o checkall da coluna
	if($($(event.target).context).hasClass('checkline')){ // se o click vier do checkbox
		$($(event.target).context).prop('checked',!check);
	}
}

function trataCheckColuna(){
	var checkColuna = $(this).prop('checked');
	$('#GET_SSAS_REPORT .k-grid-content table').find('tr').each(function(){
		$(this).find('td input.checkline').prop('checked',checkColuna);
	});
}

function callback_load_report_generic_modal(data,return_params,nao_processa){
	if(return_params==undefined) return_params=false;
	if(nao_processa==undefined) nao_processa=false;
	//wrs_panel_layout.open('east');
	
	var _ROWS 		=	data.LAYOUT_ROWS.split(',');
	var _COLUMNS 	=	data.LAYOUT_COLUMNS.split(',');
	var _MEASURES 	=	data.LAYOUT_MEASURES.split(',');
	var _FILTERS 	=	data.LAYOUT_FILTERS.split(',');
	var _kendoui	=	$.parseJSON(base64_decode(data.REPORT_OPTIONS));
	var _filter_selected ='';

	if(data.FILTER_VALUES!='' && data.FILTER_VALUES!=null && data.FILTER_VALUES.length>0){
		var filtros_values = data.FILTER_VALUES.split('(_|_)');
		var data_temp = "{"+data.FILTER_VALUES.replace('(_|_)','},{')+"}";
		var full_temp = [];
		for(var filtro in filtros_values){
			var quebra_temp0 	= filtros_values[filtro].split(',');
			var quebra_temp1 	= quebra_temp0[0].split('.');
			quebra_temp1.splice(-1,1);
			var class_temp		= ajustaTags(quebra_temp1.join('.'));
			var data_temp2		= filtros_values[filtro];
			full_temp.push({'class':class_temp,'data':data_temp2});
		}
		_filter_selected = {'data':data_temp,'full':full_temp};
	}

	var _param		=	{
					'LAYOUT_ROWS'			:	ajustaTags(_ROWS),
					'LAYOUT_COLUMNS'		:	ajustaTags(_COLUMNS),
					'LAYOUT_MEASURES'		:	ajustaTags(_MEASURES),
					'LAYOUT_FILTERS'		:	ajustaTags(_FILTERS),
					'KendoUi'				:	_kendoui,
					'filter_selected'		:	_filter_selected
	}
	
	if(return_params){
		return _param;
	}else{
		set_value_box_relatorio(_param);
		$('#myModal').modal('hide');
		if(!nao_processa){
			wrsRunFilter();
		}else{
			wrs_panel_layout.open('east');
		}
	}
}


function carrega_grid_list_reports(){

	var funCallBack	=	function(data)
	{
			$('.modal-content-grid').html(data);
			wrs_window_grid_events_tools({btn:btn_window_grid_event_report});
	};
	
	 grid_window_modal(
			 				{wrs_type_grid:'list',cube_s:CUBE_S},
			 				'GET_SSAS_REPORT',
			 				funCallBack);
	 
}

function btn_window_grid_event_report(data)
{
	var action_type				=	 $(this).attr('action_type');
	var table					=	 $(this).attr('table');
	var values					=	 get_grid_window_values_form();
	
	var qtde_linhas_selecionadas=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content').find('tr:has(.checkline:checked)').length;
	var linhas_selecionadas		=	$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content').find('tr:has(.checkline:checked)');
	
		if(qtde_linhas_selecionadas>1){
		
			var arrObjetosSelecionados = [];
			var arrReportsIds = [];
			
			linhas_selecionadas.each(function(){
				var objDados = $('#GET_SSAS_REPORT').data().handler._data[$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content tr').index(this)];
				arrReportsIds.push(objDados.REPORT_ID);
				arrObjetosSelecionados.push(callback_load_report_generic_modal(objDados,true));
			});
			
			switch(action_type)
			{
				case 'new' 		: 
						//callback_load_report_generic_modal(objDados);	
						break; // abre o relatorio
				case 'update' 	: 
						//callback_load_report_generic_modal(objDados,false,true);
						break; // abre somente o layout
				case 'remove' 	:
						removeReport(arrReportsIds);
						break; // apaga o relatorio
				
			}
			
			console.log('TODO: acoes multiplas nas guias',{'evento':action_type,'arrObjetos':arrObjetosSelecionados});
			
		}else{
			var objDados = $('#GET_SSAS_REPORT').data().handler._data[$('.modal-content-grid #GET_SSAS_REPORT .k-grid-content tr').index(linhas_selecionadas)];
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
		}
}

function removeReport(arrRepIds){

    $('#confirmModal').find('.modal-body').html('Deseja realmente apagar este relatório?');
    $('#confirmModal').find('.modal-header h4').html('Apagar');
    $('#confirmModal').modal({ backdrop: 'static', keyboard: false }).on('click', '#deleteModalConfirm', function (e) {
    		$('#confirmModal').modal('hide');
			var param_request	=	 {'report_id':JSON.stringify(arrRepIds)};
			var Ofile			=	'WRS_REPORT';
			var Oclass			=	'WRS_REPORT';
			var Oevent			=	'delete';

				
			var header	=	'<div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active"><h4 class="modal-title" id="myModalLabel">'+LNG('LABEL_LOAD')+'</h4></div><div class="body_grid_window_center_Load"></div>';
				$('.modal-content-grid').html(header);
				setLoading($('.body_grid_window_center_Load'));	
				runCall(param_request,Ofile,Oclass,Oevent,carrega_grid_list_reports,'modal');		
						
    });
    
}


function getLoadReport()
{
	var _param						=	{};
	var sortable_metrica			=	rows_by_metrica_attr_base64('.sortable_metrica','metrica');
	var sortable_linha				=	rows_by_metrica_attr_base64('.sortable_linha','attr');
	var sortable_coluna				=	rows_by_metrica_attr_base64('.sortable_coluna','attr');
	var sortable_filtro				=	rows_by_metrica_attr_base64('.sortable_filtro','attr');
	var wrs_grid_options_default	=	$('#wrsConfigGridDefault').data('wrsConfigGridDefault');
	var filter_selected				=	$.WrsFilter('getAllFiltersToRun');
	
	_param	=	{
					'LAYOUT_ROWS'			:	sortable_linha,
					'LAYOUT_COLUMNS'		:	sortable_coluna,
					'LAYOUT_MEASURES'		:	sortable_metrica,
					'LAYOUT_FILTERS'		:	sortable_filtro,
					'KendoUi'				:	wrs_grid_options_default,
					'filter_selected'		:	filter_selected
	}
	
	return _param;
	
}