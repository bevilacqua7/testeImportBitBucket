

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

function callback_load_report_generic_modal(data){
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
	
	set_value_box_relatorio(_param);
	$('#myModal').modal('hide');
	wrsRunFilter();	
}