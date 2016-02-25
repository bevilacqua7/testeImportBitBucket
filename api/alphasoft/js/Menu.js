 

$(document).ready(function(){
	
	_START('Menu.js');
	$('.wrs_open_save').unbind('click').click(function() {
		
		_ONLY('click Menu.js .wrs_open_save');
		
		
		var btn_salvar_extra_action_validator = function(data){ // validacoes extra antes da acao principal do botao padrao
			
			
		_START('btn_salvar_extra_action_validator');
			var retorno_padrao = true;
			
			if(typeof data=='object' && data.event=='save'){
				
				if(data.report_name.trim()==''){
					retorno_padrao = false;
					WRS_ALERT(LNG('NAME_REPORT_EMPTY'),'warning'); 
				}
				
				
				var aba_ativa	=	get_aba_active_kendoUi();

			  	$('#'+aba_ativa.REPORT_ID+'Main').find('.report_title').html(data.report_name);
			  	
				//Muda os titles
				$('.wrs_panel_center_body_container').find('.report_title').html(data.report_name).trigger('keyup');
				
				
			}
			
			
			
			
			
			_END('btn_salvar_extra_action_validator');
			return retorno_padrao; 
		}
		

		var _param	= {
				'file'			:	'WRS_REPORT', 
				'classe'		:	'WRS_REPORT',
				'title'			:	LNG('JS_menu_report_include'),
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
	
	
	
	
	
	$('.menuADM_link').click(function(){
		if(window.location.href.indexOf('//alphaweb')>-1 || window.location.href.indexOf('//192.168.1.4')>-1){ // exibe o menu somente em ambiente de desenvolvimento
			$('.menu_administrativo_itens, #fullwidth, #fullwidth_ds, .bt_config_templates').fadeToggle();
		}
	});

	
	
	//Evento do menu Administrativo 
	$('.menu_cadastro').click(function(){
		carrega_grid_list_admin(undefined,$(this));
		$('#myModal').modal('show');
	});
		
	
	
	
	_END('Menu.js');
	
	
});
