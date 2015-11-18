$(document).ready(function(){
	
	_START('Menu.js');
	$('.wrs_open_save').unbind('click').click(function() {
		
		var btn_salvar_extra_action_validator = function(data){ // validacoes extra antes da acao principal do botao padrao
		_START('btn_salvar_extra_action_validator');
			var retorno_padrao = true;
			if(typeof data=='object' && data.event=='save'){ 
				if(data.report_name.trim()==''){
					retorno_padrao = false;
					WRS_ALERT('Escolha um nome para o relatório','warning'); 
				}
			}
			_END('btn_salvar_extra_action_validator');
			return retorno_padrao;
		}
		
		var _param	= {
				'file'			:	'WRS_REPORT', 
				'classe'		:	'WRS_REPORT',
				'title'			:	'Inclusão de Relatório',
				'bt_salvar'		:	true,
				'bt_cancelar'	:	true,
				'returnModal'	:	true,
				'extraParam'	:	{wrs_type_grid:'list',cube_s:CUBE_S,return_html:true},
				'event'			:	'openModalSave',
				'bt_salvar_extra_action_validator'	: btn_salvar_extra_action_validator  // validacoes extra antes da acao principal do botao padrao
			};
		var modal_save = $(this).modalGeneric(_param);
	});

	$('.wrs_open_modal').unbind('click').click(function()
	{
		carrega_grid_list_reports();
		$('#myModal').modal('show');
	});
	
	_END('Menu.js');
});
