$(document).ready(function(){
	$('.wrs_open_save').unbind('click').click(function() {
		grid_window_modal({wrs_type_grid:'icon_middle'});
	});

	$('.wrs_open_modal').unbind('click').click(function()
	{
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
		modal.find('.bt-salvar span').removeClass().addClass('glyphicon glyphicon-plus color_write');
		modal.find('.bt-atualizar span').removeClass().addClass('fa fa-floppy-o color_write');
		modal.find('.bt-salvar label').text('Carregar');
		modal.find('.bt-apagar label').text('Apagar');
		// grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},'GET_SSAS_REPORT');
		// grid_window_modal({wrs_type_grid:'icon_middle',cube_s:CUBE_S},'ATT_WRS_USER');

	});
});