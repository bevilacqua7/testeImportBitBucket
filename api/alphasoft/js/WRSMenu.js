$(document).ready(function(){
	
	$('.painel_administrativo_demo').click(function(){
		grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},'ATT_WRS_USER');
		$('#myModal').modal('show');
	});
	
	$('.wrs_open_save').unbind('click').click(function() {
		var _param	= {
				'file'			:	'WRS_REPORT', 
				'classe'		:	'WRS_REPORT',
				'title'			:	'Inclusão de Relatório',
				'bt_salvar'		:	true,
				'bt_cancelar'	:	true,
				'returnModal'	:	true,
				'extraParam'	:	{wrs_type_grid:'list',cube_s:CUBE_S,return_html:true},
				'event'			:	'openModalSave'
			};
		var modal = $(this).modalGeneric(_param);
	});

	$('.wrs_open_modal').unbind('click').click(function()
	{
		carrega_grid_list_reports();
		$('#myModal').modal('show');
	});
});
