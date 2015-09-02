$(document).ready(function(){
	
	$('.painel_administrativo_demo').click(function(){
		grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},'ATT_WRS_USER');
		$('#myModal').modal('show');
	});
	
	$('.wrs_open_save').unbind('click').click(function() {
		/*
		grid_window_modal({wrs_type_grid:'grid',cube_s:CUBE_S},'ATT_WRS_REPORT');
		$('#myModal').modal('show');
		*/
		var _param	= {
				'file'			:	'WRS_REPORT', 
				'classe'		:	'WRS_REPORT',
				'title'			:	'Inclusão de Relatório',
				'bt_salvar'		:	true,
				'bt_cancelar'	:	true,
				'returnModal'	:	true,
				'extraParam'	:	{wrs_type_grid:'list',cube_s:CUBE_S,return_html:true},
				'event'			:	'openModalSave'
			//	'dadosJs'		:	getLoadReport()
			};
		var modal = $(this).modalGeneric(_param);
	});

	$('.wrs_open_modal').unbind('click').click(function()
	{
		/*
		var _param	= {
						'file'			:	'WindowGrid', 
						'classe'		:	'WindowGrid',
						'title'			:	'Gerenciamento de Relatórios',
						'bt_salvar'		:	true,
						'bt_apagar'		:	true,
						'bt_cancelar'	:	true,
						'returnModal'	:	true,
						'extraParam'	:	{wrs_type_grid:'list',cube_s:CUBE_S,return_html:true},
						'event'			:	'GET_SSAS_REPORT'
					};
		
		var modal = $(this).modalGeneric(_param);
*/
		/*
		modal.find('.bt-salvar span').removeClass().addClass('glyphicon glyphicon-plus color_write');
		modal.find('.bt-atualizar span').removeClass().addClass('fa fa-floppy-o color_write');
		modal.find('.bt-salvar label').text('Carregar');
		modal.find('.bt-apagar label').text('Apagar');
	*/
		// grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},'GET_SSAS_REPORT');
		
		
		var funCallBack	=	function(data)
		{
				$('.modal-content-grid').html(data);
				wrs_window_grid_events_tools();
				$('.btn_window_grid_event').html('data');
		};
		
		 grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},'GET_SSAS_REPORT',funCallBack);
		 $('#myModal').modal('show');
		 
		 

	});
});




function getLoadReport()
{
	var _param						=	{};
	var sortable_metrica			=	rows_by_metrica_attr_base64('.sortable_metrica','metrica');
	var sortable_linha				=	rows_by_metrica_attr_base64('.sortable_linha','attr');
	var sortable_coluna				=	rows_by_metrica_attr_base64('.sortable_coluna','attr');
	var sortable_filtro				=	rows_by_metrica_attr_base64('.sortable_filtro','attr');
	var wrs_grid_options_default	=	$('#wrsConfigGridDefault').data('wrsConfigGridDefault');
	var filter_selected				=	$.WrsFilter('getAllFiltersToRun');
	
	/*
	console.log('sortable_metrica',sortable_metrica);
	console.log('sortable_linha',sortable_linha);
	console.log('sortable_coluna',sortable_coluna);
	console.log('sortable_filtro',sortable_filtro);
	console.log('wrs_grid_options_default',wrs_grid_options_default);
	
	*/
	_param	=	{
					'LAYOUT_ROWS'			:	sortable_linha,
					'LAYOUT_COLUMNS'		:	sortable_coluna,
					'LAYOUT_MEASURES'		:	sortable_metrica,
					'LAYOUT_FILTERS'		:	sortable_filtro,
					'KendoUi'				:	wrs_grid_options_default,
					'filter_selected'		:	filter_selected
	}
	
	
	//função remove colchetes e outros lixos
	//replace_attr()
	
	
//	set_value_box_relatorio(_param);
	
	
	/*
	$result_box['LAYOUT_ROWS']			=	array('__FORCADEVENDASREGIONAL','__FORCADEVENDASDISTRITAL','__GEOGRAFIABRICK');
	$result_box['LAYOUT_COLUMNS']		=	array('__PERIODOANO','__PERIODOSEMESTRE');
	$result_box['LAYOUT_MEASURES']		=	array('__MeasuresShareDolar','__MeasuresEvolDolar','__MeasuresDolar');
	$result_box['LAYOUT_FILTERS']		=	array(	array('__MERCADOMERCADO','',array('[MERCADO].[MERCADO].[D06-BACTROBAN]','[MERCADO].[MERCADO].[D-CX-ACNE LIMPEZA]')),
			array('__PRODUTOLABORATORIO','','[PRODUTO].[LABORATORIO].[GSK FARMA]'));
	
	
	*/
	return _param;
	
}