function scripts_ini_after_load_modal_admin(){
	confere_botao_touch();
}

function confere_botao_touch(){
	if(Modernizr.touch && $('.modal-content-grid .modal-body div.k-grid').length>0){
		var botoes = $('.modal-content-grid .modal-footer button[action_type]');
		$( botoes.first().clone().attr('class','').addClass('btn btn-primary btn-color-write btn_window_grid_event').attr('action_type','dbl_click_btn').html('<li class="fa fa-pencil"></li> '+LNG('BTN_UPDATE')) ).insertAfter( botoes.parent().children().first() );
	}
}

function callback_load_admin_generic_modal_associations(arg,tabela)
{
	// se o evento ocorrer em cima do texto, o padrao do browser seleciona a palavra.  Portanto, intercepto e disparo o doubleclick do TD - felipeb 20160321
	if(arg.dadosHandlerEvento.target.tagName=='B'){
		$(arg.dadosHandlerEvento.target.parentElement).trigger('dblclick');
		return false;
	}
	var indexClique = arg.dadosHandlerEvento.target.cellIndex;
	var coluna_clicada = $($('#'+tabela+' .k-grid-header-wrap th[role=columnheader]')[indexClique]).attr('data-field');	
	if(coluna_clicada=='USER_CODE' || coluna_clicada=='CUBE_DESC'){
		callback_load_admin_generic_modal(arg,tabela,{'coluna_clicada':coluna_clicada,'form_event':'form_exception'});	
	}
}

function callback_load_admin_generic_modal(arg,tabela,opcoes)
{
	
	_START('callback_load_admin_generic_modal');
	var _data			=	$('#myModal, .modal-content-grid').data('wrsGrid');
	var options_extra	=	opcoes==undefined?{}:opcoes;
	var param			=	_data.param_original;
	var primaries 		= 	{};
	
	for(var coluna in param.field){
		if(param.field[coluna]['primary']!=undefined && param.field[coluna]['primary']){
			primaries[coluna]=arg[coluna];
		}
	}

	var option						=	{};
		option['wrs_type_grid']		=	'form';
		option[param['primary']]	=	'';
		option['primaries']			=	primaries;
		
		try{
			option[param['primary']] = $(arg[param['primary']]).text()!=''?$(arg[param['primary']]).text():arg[param['primary']];
		}catch(e){
			option[param['primary']] = arg[param['primary']];
		}

		option['param_request']			=	param;
		option							=	merge_objeto(option,options_extra); // merge

		var funCallBackVision = function()
		{
			_START('callback_load_admin_generic_modal::funCallBackVision');
			var rel		=	 $(this).attr('rel');
			var table	=	 $(this).attr('table');
			
			
			var option	=	 {wrs_type_grid:rel,tabela:table};
			
			
			try{
				//CUBE_S existe apenas no Painel ele pe a referencia de qual cubo está sendo utilizado pelo system
				option['cube_s']	=	CUBE_S;
			}catch(e){
				delete option['cube_s'];
			}

			
			
			carrega_grid_list_admin(option);
			_END('callback_load_admin_generic_modal::funCallBackVision');
		}

		
		
		
		var funCallBack	=	function(data)
		{
			_START('carrega_grid_list_admin::funCallBack');
			
				$('.modal-content-grid').html(data);
				aplicaMascaraSeExiste();
				wrs_window_grid_events_tools({btn:btn_window_grid_event_admin, visao: funCallBackVision});
				
			_END('carrega_grid_list_admin::funCallBack');	
		};
		
		if(options_extra['callback']!=undefined){
			funCallBack = options_extra['callback'];
		}
		
	grid_window_modal(option,tabela,funCallBack);
		
	_END('callback_load_admin_generic_modal');
}

function aplicaMascaraSeExiste(){
	
	// mascara de valores - mask - felipeb 20160301
	$('input.hasMask').focus(function(){
		var mascara 			= $(this).attr('maskfield');
		var mascaraPlaceHolder 	= $(this).attr('maskfieldPlaceHolder');

		if(mascaraPlaceHolder!=undefined && mascaraPlaceHolder!=''){
			$(this).mask(mascara, {placeholder: mascaraPlaceHolder});
		}else{
			$(this).mask(mascara);			
		}
		$(this).trigger('keyup'); // froca mostrar valor de acordo com mascara configurada
		$(this).blur(function(){
			$(this).val($(this).cleanVal());
		});
	});

	// quando o foco esta no input de um formulario, o keyaction é aplicado ao input e nao mais ao document, tendo assim de controlar novamente a acao do ESC dentro dos inputs
	$('form input').keydown(function(event){
	    if(event.keyCode == 27) {
	      event.preventDefault();
	      return false;
	    }
	});
	
}

function carrega_grid_list_admin(options,obj)
{
_START('carrega_grid_list_admin');
	
	//var active_aba	=	get_aba_active_object();	
	//	active_aba.wrsAbas('save_info_aba_current',active_aba);

	var funCallBackVision = function()
	{
		_START('carrega_grid_list_admin::funCallBackVision');
		var rel		=	 $(this).attr('rel');
		var table	=	 $(this).attr('table');
		
		
		var option	=	 {wrs_type_grid:rel,tabela:table};
		
		
		try{
			//CUBE_S existe apenas no Painel ele pe a referencia de qual cubo está sendo utilizado pelo system
			option['cube_s']	=	CUBE_S;
		}catch(e){
			delete option['cube_s'];
		}

		
		
		carrega_grid_list_admin(option);
		_END('carrega_grid_list_admin::funCallBackVision');
	}

	
	
	
	var funCallBack	=	function(data)
	{
		_START('carrega_grid_list_admin::funCallBack');
		
			$('.modal-content-grid').html(data);

			scripts_ini_after_load_modal_admin();
			 
			wrs_window_grid_events_tools({btn:btn_window_grid_event_admin, visao: funCallBackVision});
			
		_END('carrega_grid_list_admin::funCallBack');	
	};
	
	
	
	
	
	
	var retorno ='';
	
	if(options!='' && options!=null)
	{
		retorno = $.parseJSON(options);
		if(retorno!= null && typeof retorno == 'object' && typeof retorno.relatorios_apagados != 'undefined'){
			$('#myModalGenericConfig').modal('hide');	
			var _s = (retorno.relatorios_apagados>1)?'s':'';
			WRS_ALERT(LNG_s('JS_admin_removed',_s),'success');	
		}
	}
	
	var tabela 		= ($(this).attr('tabela')==undefined && typeof obj == 'object' && obj.attr('tabela')!=undefined)?obj.attr('tabela'):(($(this).attr('tabela')==undefined && typeof options == 'object' && options['tabela']!=undefined)?options['tabela']:$(this).attr('tabela'));
	
	
	var _options	=	((options!=null && options!='' && typeof options == 'object')?options:{wrs_type_grid:'list'});
	
	
	
	
	try{
		//CUBE_S existe apenas no Painel ele pe a referencia de qual cubo está sendo utilizado pelo system
		_options['cube_s']	=	CUBE_S;
	}catch(e){
		delete _options['cube_s'];
	}

	grid_window_modal(
							_options,
			 				tabela,
			 				funCallBack);
	
	
	
	_END('carrega_grid_list_admin'); 
}






function btn_window_grid_event_admin(data,_action_type,_table)
{

	_START('btn_window_grid_event_admin:0808');
	var action_type				=	 _action_type!=undefined?_action_type:$(this).attr('action_type');
	var table					=	 _table!=undefined?_table:$(this).attr('table');
	var values					=	 get_grid_window_values_form();

	var _data					=	 $('#myModal, .body_grid_window').data('wrsGrid');
	var dadosKendo				=	 (!$("#"+table).length)?_data:$("#"+table).data('wrsModal');
	var validacao_update_admin 	= function(){
		var valida_form = true;
		if( $('form.grid_window_values_form').length > 0
		){
			
			{ // validacao de campos obrigatorios
				var falta=false;
				$('form.grid_window_values_form .obrigatorio').each(function(){
					$(this).removeClass('nao_validado validado');
					if($(this).val()=='' || $(this).find(':selected').val()=='-1'){
						falta=true;
						valida_form=false;
						$(this).addClass('nao_validado');
					}
				});
				if(falta){
						WRS_ALERT(LNG('JS_admin_preencha_obrigatorios'),'warning');
						return false;												
				}
			}
			
			
			{ // validacao de valores minimo e maximos
				$('form.grid_window_values_form .valida_valor').each(function(){
					$(this).removeClass('nao_validado validado');
					var max_val 		= parseInt($(this).attr('max-value'));
					var min_val 		= parseInt($(this).attr('min-value'));
					var valor_campo 	= parseInt($(this).val());
					var nome_campo		= $(this).attr('placeholder');
					nome_campo			= nome_campo!=''?'('+nome_campo+')':'';
					if (typeof max_val !== typeof undefined && max_val !== false && valor_campo > max_val) {
						var campo = $(this);
						valida_form=false;	
						WRS_CONFIRM(LNG('JS_admin_preencha_maximo').replace('#NOMECAMPO#',nome_campo)+max_val+"<br>"+LNG('JS_admin_preencha_auto').replace('#VAL#',max_val),'warning',function(escolha){
							if(escolha){
								campo.val(max_val);
							}else{
								campo.addClass('nao_validado');											
							}
						});	
						return false;					
					}
					
					if (typeof min_val !== typeof undefined && min_val !== false && (valor_campo < min_val || valor_campo==='')) {
						var campo = $(this);
						valida_form=false;
						WRS_CONFIRM(LNG('JS_admin_preencha_minimo').replace('#NOMECAMPO#',nome_campo)+min_val+"<br>"+LNG('JS_admin_preencha_auto').replace('#VAL#',min_val),'warning',function(escolha){
							if(escolha){
								campo.val(min_val);
							}else{
								campo.addClass('nao_validado');												
							}
						});
						return false;	
					}
				});
			}
		}
		return valida_form;
	}
	
	var funCallBackVision = function(dados)
	{
		_START('btn_window_grid_event_admin::funCallBackVision');
		var rel		=	 $(this).attr('rel');
		var table	=	 $(this).attr('table');
		var option	=	 {wrs_type_grid:rel,tabela:table};
		
		try{
			//CUBE_S existe apenas no Painel ele pe a referencia de qual cubo está sendo utilizado pelo system
			option['cube_s']	=	CUBE_S;
		}catch(e){
			delete option['cube_s'];
		}

		carrega_grid_list_admin(option);
		_END('btn_window_grid_event_admin::funCallBackVision');
	}

	var funCallBack	=	function(data)
	{
		_START('btn_window_grid_event_admin::funCallBack');
			$('.modal-content-grid').html(data);
			aplicaMascaraSeExiste();

			scripts_ini_after_load_modal_admin();
			 
			wrs_window_grid_events_tools({btn:btn_window_grid_event_admin, visao: funCallBackVision});
		_END('btn_window_grid_event_admin::funCallBack');	
	};
		
	var param					=	 _data.param_original;
	var _extraValues 			= 	undefined;
	
	/*
	 * Como esta funcao (btn_window_grid_event_admin) é chamada para centralizar e normalizar as acoes especificas do ADMIN
	 * ela é a mesma para quando há itens selecionados na grid como para as acoes dos botoes (salvar, etc).  Por isso é verificado
	 * se existem parametros selecionados (mais de um item), caso nao houver, executa a acao com os dados da tela (formulario) para um unico item
	 */
	if(param==undefined){
		if(_extraValues==undefined){
			_extraValues=[];
			_extraValues['extra_validation_on_update_admin']=validacao_update_admin;
		}
		btn_window_grid_event(funCallBack,action_type,table,_extraValues);
		_END('btn_window_grid_event_admin:0808');
		return true;		
	}
	
	var chave_primaria			=	param.primary;
	
	/*
		podem existir mais de uma chave primaria para enviar à funcao de delecao
		felipeb 20160229
	 */
	var chaves_primarias		=	[];
	for(var pos in param.field){
		if(param.field[pos].primary!=undefined && param.field[pos].primary){
			chaves_primarias.push(pos);
		}
	}	
	
	
	var visao					=	'grid';
	
	var qtde_linhas_selecionadas=	null;
	var linhas_selecionadas		=	null;
	
	
	var attr = param.visao_atual;
	if (typeof attr !== typeof undefined && attr !== false) {		
		visao 	= 	'icon';		
	}	
	
	
	if(visao=='icon')
	{
		qtde_linhas_selecionadas=	$('.body_grid_window').find(':has(.selecao_icon)').length;
		linhas_selecionadas		=	$('.body_grid_window').find(':has(.selecao_icon)');		
	}
	else
	{		
		qtde_linhas_selecionadas=	$('.modal-content-grid #'+table+' .k-grid-content').find('tr:has(.checkline:checked)').length;
		linhas_selecionadas		=	$('.modal-content-grid #'+table+' .k-grid-content').find('tr:has(.checkline:checked)');		
	}
		

	var arrObjetosSelecionados 	= 	[];
	var objObjetosSelecionados 	= 	{};
	var arrRegisterIds 			= 	[];
	if(qtde_linhas_selecionadas>0)
	{
		if(qtde_linhas_selecionadas>0)
		{
			
			linhas_selecionadas.each(function()
					{
							
							var objDados = param_options = null;
							var index = '';
							if(visao=='icon')
							{
								index			=	$('.body_grid_window').first().children().index($(this));								
							}
							else
							{
								index			=	$('.modal-content-grid #'+table+' .k-grid-content tr').index(this);
							}
							objDados 			= 	dadosKendo[index];		
							if(chaves_primarias.length>1){
								var arrIds = [];
								for(var pos in chaves_primarias){
									arrIds.push({'chave':chaves_primarias[pos],'valor':objDados[chaves_primarias[pos]]});
								}
								arrRegisterIds.push(arrIds);
							}else{
								arrRegisterIds.push(objDados[chave_primaria]);
							}
							arrObjetosSelecionados.push(objDados);

							if(table=='ATT_WRS_USER'){
								objObjetosSelecionados[objDados['USER_ID']]	= objDados['USER_CODE'];
							}
					});
		}
	}
	
			switch(action_type)
			{
				case 'remove' 	: 	{
										if(qtde_linhas_selecionadas>0){										
											var retornoQuestion = function(escolha){
												if(escolha){
													_extraValues = {'objetosSelecionados':(escolha=='all')?'*':arrRegisterIds,'chave_primaria':chave_primaria};
													btn_window_grid_event(funCallBack,action_type,table,_extraValues);
												}
											}
											var _s = (qtde_linhas_selecionadas>1)?'s':'';
											WRS_CONFIRM(LNG_s('JS_admin_confirm_remove',_s),'warning',retornoQuestion);
										}else{
											WRS_ALERT(LNG('JS_admin_select_one'),'warning');
										}
										return false;
										break;
									}
				case 'import' 	: 	{	
										if( // validacao se o usuario clicou pra importar sem selecionar arquivo
											$('form.grid_window_values_form').length > 0 // verifica se existe o formulario de importacao ou se esta clicando no botao de importacao da tela da grid (inicial)
										){
											if(
													$('form.grid_window_values_form tbody.files tr').length == 0 // verifica se existe alguma linha de arquivo, pois este formulario de importacao efetua o upload automatico e mantem o inputfile sempre vazio, mas cria esta estrutura html/table adicionando as linhas de arquivos
											){
												WRS_ALERT(LNG('JS_admin_select_one_file'),'warning');
												return false;
											}
										}
									}
				case 'update' 	: 	{
										var validacao = validacao_update_admin();
										if(!validacao){
											return false;
										}
									}
				case 'back' 	: 
				case 'new' 		: 
						btn_window_grid_event(funCallBack,action_type,table,_extraValues);
						break;

				case 'dbl_click_btn'	: {
											if(qtde_linhas_selecionadas>0){			
												if(qtde_linhas_selecionadas==1){													
													var obj_linha_sel = arrObjetosSelecionados.shift();
													if(table=='REL_WRS_CUBE_USER'){ // excecao para esta tela pois utiliza chaves compostas e tem de saber qual coluna deseja editar
														
														var retornoQuestion = function(coluna){															
															if(coluna!='cancel' && coluna!=false){
																callback_load_admin_generic_modal(obj_linha_sel,table,{'coluna_clicada':coluna,'form_event':'form_exception'});	
															}else{
																return false;
															}
														}
														
														WRS_CONFIRM(
																		LNG('JS_admin_choice_column'),
																		'warning',
																		retornoQuestion,
																		undefined,
																		'custom',
																		[
																		 	{
																		 		text : LNG('JS_admin_choice_column_user'), 
																		 		val : "USER_CODE", 
																		 		onClick:function(e){																	
																		 								return true;
																						 			}
																		 	},
																		 	{
																		 		text : LNG('JS_admin_choice_column_cube'), 
																		 		val : "CUBE_DESC", 
																		 		onClick:function(e){																	
													 													return true;
																						 			}
																		 	}/*, // se quiser colocar botao de cancelar...
																		 	{
																		 		text : LNG('MODAL_CONFIRM_BT_CANCEL'), 
																		 		val : "cancel", 
																		 		onClick:function(e){																	
													 													return true;
																						 			}
																		 	}*/
																		]
																	);

														break;
														
													}else{													
														callback_load_admin_generic_modal(obj_linha_sel);
													}
												}else{
													WRS_ALERT(LNG('JS_admin_select_just_one'),'warning');
												}
											}else{
												WRS_ALERT(LNG('JS_admin_select_one'),'warning');
											}
											return false;
											break;
										};

				case 'export' 	: 	{ // sempre exportará todos os registros									
										_extraValues = {
												'objetosSelecionados'	:	'*',
												'chave_primaria'		:	chave_primaria			
										};					
										btn_window_grid_event(funCallBack,action_type,table,_extraValues);
										break;
									}

				
				case 'changePassword'	: {					
											if($('.grid_alterar_senha #nova_senha').length && $('.grid_alterar_senha #confirmar_senha').length){
												var qtde_linhas_selecionadas 		= 0;

												var nova_senha 			= $('.grid_alterar_senha #nova_senha').length?$('.grid_alterar_senha #nova_senha').val():'';
												var confirmar_senha 	= $('.grid_alterar_senha #confirmar_senha').length?$('.grid_alterar_senha #confirmar_senha').val():'';
												var old_senha 			= $('.grid_alterar_senha #old_senha').length?$('.grid_alterar_senha #old_senha').val():false;
												var operacao 			= (nova_senha=='' && confirmar_senha=='')?'expirar':'definir';											
												var op 					= operacao == 'definir'?LNG('js_admin_pass_sintax_a'):LNG('js_admin_pass_sintax_b'); 
												var extraValues		 	= $('.grid_alterar_senha #extraValues').length?base64_decode($('.grid_alterar_senha #extraValues').val()):null;
												var isAdm 				= !$('.grid_alterar_senha #old_senha').is(':visible');
												
												if(isAdm && extraValues!=undefined && extraValues!=null && extraValues!=''){
													var ObjsDecode 			= json_decode(extraValues);
													objObjetosSelecionados 	= ObjsDecode['objetosSelecionados'];
												}else{
													objObjetosSelecionados = {};
													objObjetosSelecionados[$('body').WrsGlobal('getPHP','login')['USER_ID']] = $('body').WrsGlobal('getPHP','login')['USER_CODE'];													
												}
												
												if(objObjetosSelecionados!='*')
												for(var usr_id in objObjetosSelecionados){
													qtde_linhas_selecionadas++;
												}

									 			if($('.alerta_senha_igual').length>0) $('.alerta_senha_igual').remove(); 
									 			
									 			if(nova_senha!='' || confirmar_senha!=''){
													if(nova_senha!=confirmar_senha){
														$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_same')+'</div>');
														return false;
													}
													if(nova_senha.length < 3 || confirmar_senha.length < 3){
														$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_min')+'</div>');
														return false;
													}
													if(old_senha!==false && nova_senha == old_senha){
														$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_equals')+'</div>');
														return false;
													}
													if(old_senha!==false && old_senha==''){
														$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_current')+'</div>');
														return false;
													}
													if($('#expira_senha').length>0 && (nova_senha!='' || confirmar_senha!='') && $('#expira_senha').is(':checked')){
														$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_choice')+'</div>');
														return false;			
													}
												}else if(!isAdm){
													$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_self')+'</div>');
													return false;
												}else if(isAdm && $('#expira_senha').length>0 && nova_senha=='' && confirmar_senha=='' && !$('#expira_senha').is(':checked')){
													$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_blank')+'</div>');
													return false;														
												}						
									 			
												if(qtde_linhas_selecionadas!=1 && !isAdm){
													WRS_ALERT(LNG('js_admin_no_user'),'error');
													return false;
												}
												
												var _s 				= qtde_linhas_selecionadas==1?'':'s';
												var qtde 			= qtde_linhas_selecionadas>0?qtde_linhas_selecionadas:LNG('js_admin_pass_sintax_d');
												qtde 				= !isAdm?LNG('js_admin_pass_sintax_e'):qtde;
												
												var retornoQuestion2 = function(escolha){
													if(escolha!=false){
														
														_extraValues = {
																'objSelecionados'	:	objObjetosSelecionados,
																'senha'				:	nova_senha,
																'old_senha'			:	old_senha	
														};	
														btn_window_grid_event(funCallBack,'changePassUser',table,_extraValues);
														
													}
												}
												
												var msg = op+qtde+LNG_s('js_admin_pass_sintax_c',_s)+LNG('js_admin_confirm_question');
												WRS_CONFIRM(msg,'warning',retornoQuestion2);
											}else{
												_extraValues = {
														'objetosSelecionados'	:	arrRegisterIds.length>0?objObjetosSelecionados:'*',
														'chave_primaria'		:	chave_primaria			
												};					
												btn_window_grid_event(funCallBack,action_type,table,_extraValues);
											}
											break;
										};
				case 'exportResults':	{

											callBackExecDownload = function(data_return){
												var link = data_return['link'];
												$('.modal-content-grid').modal('hide');
												if(link!=undefined && link!=''){
													window.location.assign(link);
													WRS_ALERT(LNG('ADMIN_EXPORT_OPTION_OK'),'success',function(){ $('.menu_cadastro[tabela='+table+']').trigger('click'); });
													// causa um erro apenas no navegador SAFARI
													//$('.menu_cadastro[tabela='+table+']').trigger('click');
													//alertify.success(LNG('ADMIN_EXPORT_OPTION_OK'),3000);
												}else{
													var erro = !isEmpty(data_return['erro'])?data_return['erro']:LNG('file_error_export');
													WRS_ALERT(erro,'error',function(){ $('.menu_cadastro[tabela='+table+']').trigger('click'); });
												}
												return false;
											}

											var values			=	get_grid_window_values_form();

											var table_system 	= 	confereTabelaManageParam(table); 
											var	param_request	=	{
													table		:	table,
													values		:	values
												};

											setLoading($('.modal-content-grid .modal-body'));
											$('.modal-content-grid .modal-body').prepend(LNG('UPLOAD_BTN_PROCESS'));
											$('.modal-content-grid .modal-footer').hide();
																				
											var Ofile			=	table_system;
											var Oclass			=	table_system;
											var Oevent			=	'exportResults';

											runCall(param_request,Ofile,Oclass,Oevent,callBackExecDownload,'json');
											
											break;
					
										}
				default: 	btn_window_grid_event(funCallBack,action_type,table,_extraValues);
			}
	
	_END('btn_window_grid_event_admin');
}


/*
 * Faz o funcionamento de duas selects e trata inclusive valores que estao do lado selecionado para que nao aparecam no campo como disponivel
 */
function select_work_generic(obj, enabled){
	var _enabled = enabled==undefined?true:enabled;
	if(typeof obj!='object'){
		obj = $('#'+obj).length>0?$('#'+obj):$('.'+obj);
		if(typeof obj!='object') return false;
	}	
		
	if(!_enabled){
		obj.find('.toActive').unbind('click').click(function(){
			obj.find('.wrs-select :selected').each(function(i, selected){ 
				$(this).remove().appendTo(obj.find('.wrs-select-receive'));
			});
			obj.find('.wrs-select-receive :selected').removeAttr("selected");
		});
		obj.find('.toAllActive').unbind('click').click(function(){
			obj.find('.wrs-select option').each(function(i, selected){ 
				$(this).remove().appendTo(obj.find('.wrs-select-receive'));
			});
			obj.find('.wrs-select-receive :selected').removeAttr("selected");
		});
		obj.find('.toBack').unbind('click').click(function(){
			obj.find('.wrs-select-receive :selected').each(function(i, selected){ 
				$(this).remove().appendTo(obj.find('.wrs-select'));
			});
			obj.find('.wrs-select :selected').removeAttr("selected");
		});
		obj.find('.toAllBack').unbind('click').click(function(){
			obj.find('.wrs-select-receive option').each(function(i, selected){ 
				$(this).remove().appendTo(obj.find('.wrs-select'));
			});
			obj.find('.wrs-select :selected').removeAttr("selected");
		});
		obj.find('.wrs-select').unbind('dblclick').bind('dblclick',function(){
			$("option:selected", this).remove().appendTo(obj.find('.wrs-select-receive'));
			obj.find('.wrs-select-receive :selected').removeAttr("selected");
		});
		obj.find('.wrs-select-receive').unbind('dblclick').bind('dblclick',function(){
			$("option:selected", this).remove().appendTo(obj.find('.wrs-select'));
			obj.find('.wrs-select :selected').removeAttr("selected");
		});
	}
	obj.find('.wrs-select, .wrs-select-receive').prop( "disabled", _enabled );	
	
	obj.find('.wrs-select-receive option').each(function(){
		var inx = obj.find(".wrs-select option[value='"+$(this).val()+"']").index();
		if(inx>=0){
			$(obj.find(".wrs-select option")[inx]).remove();
		}
	});
}


function atualiza_link_field_master(obj_principal,obj_referencias){
	var dados_obj_principal = json_decode(base64_decode($(obj_principal.parents('div')[1]).attr('link_field_master')));
	obj_principal.on('change',function(){
		var id_obj = $(this).attr('id');
		var filhos = $("[link_field='"+id_obj+"']");
		var dados_obj_selecionado = json_decode(base64_decode($(this).find('option:selected').attr('extra_values_for_option')));
		for(var campo in dados_obj_principal['valores']){			
			var campo_a_preencher_descricao = $("[label='"+campo+"']").find('div.h4');
			var descricao_a_preencher = dados_obj_selecionado[dados_obj_principal['valores'][campo]];
			var campo_a_preencher_valor = $('#'+campo);
			var valor_a_preencher = dados_obj_selecionado[campo];			
			campo_a_preencher_descricao.html(descricao_a_preencher);
			campo_a_preencher_valor.val(valor_a_preencher);
		}
	}).trigger('change');
}



function trataUploadAdmin(id) {
		$('#'+id).fileupload({
			'messages' 			:  	{
						            	  'msg_nome_obrigatorio_necessario'	: LNG('msg_nome_obrigatorio_necessario'),
						            	  'maxNumberOfFiles' 				: LNG('msg_maxNumberOfFiles'),
						            	  'msg_acceptFileTypes'				: LNG('msg_acceptFileTypes')
						           	}
		},{
			'process'			:	function (data, options) {
										var dfd = $.Deferred();
										var nome = options.nome_obrigatorio_zip;
										nome = nome!=undefined?nome.split('.'):false;
										if(nome!==false){
											var arq 		= options.files[0].name;
											nome 			= nome[0].toUpperCase();
											arq 			= arq!=undefined?arq.split('.'):false;
											var nome_arq 	= arq[0].toUpperCase();
											var ext 		= arq[1].toUpperCase();
											//if(nome_arq.indexOf(nome)<0){ // se o nome COMECA com o especificado - porem pode acontecer WRS_CUBE ser aceito no WRS_CUBE_USER ... etc
											if(nome_arq!=nome){
												var error = options.i18n('msg_nome_obrigatorio_necessario')+nome;
										        $(options.context.find('strong.error')).html(error);	
												options.files.error = true;
									            dfd.rejectWith(this, [data]);
											}
											if(ext!='ZIP' && ext!='CSV'){
												var error = options.i18n('msg_acceptFileTypes');
										        $(options.context.find('strong.error')).html(error);	
												options.files.error = true;
									            dfd.rejectWith(this, [data]);
											}
										}
								        return dfd.promise();
									}
		});
}

