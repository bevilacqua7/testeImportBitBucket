function scripts_ini_after_load_modal_admin(){
	confere_botao_touch();
	bt_reset_senha_user();
}

function confere_botao_touch(){
	if(Modernizr.touch && $('.modal-content-grid .modal-body div.k-grid').length>0){
		var botoes = $('.modal-content-grid .modal-footer button[action_type]');
		$( botoes.first().clone().attr('class','').addClass('btn btn-primary btn-color-write btn_window_grid_event').attr('action_type','dbl_click_btn').html('<li class="fa fa-pencil"></li> '+LNG('BTN_UPDATE')) ).insertAfter( botoes.parent().children().first() );
	}
}

function bt_reset_senha_user(){
	if($('.modal-content-grid .wrs_window_grid .k-grid').attr('id')=="ATT_WRS_USER"){ // validar perfil logado para MST E ADM apenas
		var botoes = $('.modal-content-grid .modal-footer button[action_type]');
		$( botoes.first().clone().attr('class','').addClass('btn btn-warning btn-color-write btn_window_grid_event').attr('action_type','reset_password').html('<li class="fa fa-exclamation-triangle"></li> '+LNG('TITLE_ALTER_SENHA')) ).insertBefore( botoes.parent().children().last() );
	}
}

function callback_load_admin_generic_modal_associations(arg,tabela)
{
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
				case 'export' 	: 	{			

										var LNG_caracter_delimitador 	= LNG('ADMIN_IMPORT_caracter_delimitador');
										var LNG_compactar_resultados	= LNG('ADMIN_IMPORT_compactar_resultados');
										var LNG_virgula 				= LNG('ADMIN_IMPORT_virgula');
										var LNG_ponto_virgula 			= LNG('ADMIN_IMPORT_ponto_virgula');
										var LNG_tabulacao 				= LNG('ADMIN_IMPORT_tabulacao');
										var LNG_sim 					= LNG('BTN_SIM');
										var LNG_nao 					= LNG('BTN_NAO');
					
										var div_export = 
											$('<form/>').addClass('grid_window_values_form')
											.append(
												$('<div/>').addClass('container-fluid')
													.append($('<div/>').addClass('row').html('<strong>'+LNG('JS_admin_confirm_export')+'</strong>'))
													.append($('<div/>').addClass('row')
															.append($('<table/>').addClass('table')
																	.append($('<tr/>')
																			.append($('<td/>')
																					.append(LNG_caracter_delimitador)
																			)
																			.append($('<td/>')
																					.append($('<input/>').prop({
																						'type'		:'radio',
																						'name'		:'caracter_d',
																						'id'		:'caracter_d2',
																						'value'		:'ponto_virgula',
																						'checked'	:'checked'
																						})
																					)
																					.append($('<label/>').attr({
																						'for':'caracter_d2'
																					}).html(LNG_ponto_virgula).css({'font-weight': 'normal'}))
																			)
																			.append($('<td/>')
																					.append($('<input/>').prop({
																						'type'		:'radio',
																						'name'		:'caracter_d',
																						'id'		:'caracter_d1',
																						'value'		:'virgula'
																						})
																					)
																					.append($('<label/>').attr({
																						'for':'caracter_d1'
																					}).html(LNG_virgula).css({'font-weight': 'normal'}))
																			)
																			.append($('<td/>')
																					.append($('<input/>').prop({
																						'type'		:'radio',
																						'name'		:'caracter_d',
																						'id'		:'caracter_d3',
																						'value'		:'tabulacao'
																						})
																					)
																					.append($('<label/>').attr({
																						'for':'caracter_d3'
																					}).html(LNG_tabulacao).css({'font-weight': 'normal'}))
																			)
																	)
																	.append($('<tr/>')
																			.append($('<td/>')
																					.append(LNG_compactar_resultados)
																			)
																			.append($('<td/>')
																					.append($('<input/>').prop({
																						'type'		:'radio',
																						'name'		:'caracter_c',
																						'id'		:'caracter_c1',
																						'value'		:'sim',
																						'checked'	:'checked'
																						})
																					)
																					.append($('<label/>').attr({
																						'for':'caracter_c1'
																					}).html(LNG_sim).css({'font-weight': 'normal'}))
																			)
																			.append($('<td/>')
																					.prop({'colspan':'2'})
																					.append($('<input/>').prop({
																						'type'		:'radio',
																						'name'		:'caracter_c',
																						'id'		:'caracter_c2',
																						'value'		:'nao'
																						})
																					)
																					.append($('<label/>').attr({
																						'for':'caracter_c2'
																					}).html(LNG_nao).css({'font-weight': 'normal'}))
																			)
																	)
															)															
													)
											)
										;
										
										var retornoQuestion = function(escolha){
											if(qtde_linhas_selecionadas==0 && escolha!='cancel' && escolha!='all' && escolha!=false){	
												WRS_ALERT(LNG('JS_admin_select_one'),'warning');
											}else{
												if(escolha!='cancel' && escolha!=false){
													//_extraValues = {'objetosSelecionados':(escolha=='all')?'*':arrObjetosSelecionados};	
													_extraValues = {
															'objetosSelecionados'	:	(escolha=='all')?'*':arrRegisterIds,
															'chave_primaria'		:	chave_primaria			
													};					
													btn_window_grid_event(funCallBack,action_type,table,_extraValues);
												}
											}
										}
										var _s = (qtde_linhas_selecionadas>1)?'s':'';
										

										
										WRS_CONFIRM(
														div_export,
														'warning',
														retornoQuestion,
														undefined,
														'custom',
														[
														 	{
														 		text : LNG('JS_admin_all_records'), 
														 		val : "all", 
														 		onClick:function(e){																	
														 								return true;
																		 			}
														 	},
														 	{
														 		text : LNG_s('JS_admin_selecteds',_s), 
														 		val : "sel", 
														 		onClick:function(e){																	
									 													return true;
																		 			}
														 	},
														 	{
														 		text : LNG('MODAL_CONFIRM_BT_CANCEL'), 
														 		val : 'cancel', 
														 		onClick:function(e){
																		 				return true;
																		 			}
														 	}
														]
													);
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
						
				case 'reset_password'	: {
												var div_reset = 
												$('<form/>').addClass('grid_window_values_form grid_alterar_senha')
												.append(
														$('<div/>').addClass('container-fluid')
														.append(
																$('<div/>').addClass('row form-group')
																.append(
																		$('<label/>').attr({'for':'caracter_d3'})
																		.html(LNG('js_admin_new_pass')).css({'font-weight': 'normal'})  
																		)
																.append(
																		$('<div/>').addClass('row form-control-wrs')
																		.append(
																				$('<input/>').prop({
																				'type'			:'password',
																				'name'			:'nova_senha',
																				'id'			:'nova_senha',
																				'placeholder'	: LNG('js_admin_new_pass_placeholder') 
																				}).addClass('form-control-wrs-auto form-control')
																				.css({'padding':'6px 12px !important'})
																				.on('focus',function(){ $('.alerta_senha_igual').hide(); })
																				)
																		)
																)
														.append(
																$('<div/>').addClass('row form-group')
																.append(
																		$('<label/>').attr({'for':'caracter_d3'})
																		.html(LNG('js_admin_confirm_pass')).css({'font-weight': 'normal'}) 
																		)
																.append(
																		$('<div/>').addClass('row form-control-wrs')
																		.append(
																				$('<input/>').prop({
																				'type'			:'password',
																				'name'			:'confirmar_senha',
																				'id'			:'confirmar_senha',
																				'placeholder'	:LNG('js_admin_new_pass_placeholder')
																				}).addClass('form-control-wrs-auto form-control')
																				.css({'padding':'6px 12px !important'})
																				.on('focus',function(){ $('.alerta_senha_igual').hide(); })
																				)
																		)
																)
														.append( 
																$('<div/>').addClass('row small').html(LNG('js_admin_observation'))
																)
														);
											
												var retornoQuestion = function(retorno_escolha){
													if(retorno_escolha!='cancel'){
														var s = qtde_linhas_selecionadas==1?'':'s';
														var qtde = qtde_linhas_selecionadas>0?qtde_linhas_selecionadas:LNG('js_admin_pass_sintax_d');
														var nova_senha 		= $('.grid_alterar_senha #nova_senha').val().trim();
														var confirmar_senha = $('.grid_alterar_senha #confirmar_senha').val().trim();
														var operacao = (nova_senha=='' && confirmar_senha=='')?'expirar':'definir';											
														var op = operacao == 'definir'?LNG('js_admin_pass_sintax_a'):LNG('js_admin_pass_sintax_b'); 														
														
														var retornoQuestion2 = function(escolha){
															if(escolha!=false){
																
																var funCallBackData			=	 function(data)
																{
																	WRS_ALERT(data.mensagem,data.type);
																}
																
																var Ofile				=	'ATT_WRS_USER';
																var Oclass				=	'ATT_WRS_USER';
																var Oevent				=	'changePassUser';	

																var options				=	{
																									'operacao'			:	operacao,
																									'objSelecionados'	:	objObjetosSelecionados,
																									'senha'				:	nova_senha
																							};
																runCall(options,Ofile,Oclass,Oevent,funCallBackData,'modal','json');
																
															}
														}
														
														var msg = op+qtde+LNG_s('js_admin_pass_sintax_c',((qtde_linhas_selecionadas>1)?'s':''));
														WRS_CONFIRM(msg,'warning',retornoQuestion2);
													}
												}

												WRS_CONFIRM(
																div_reset,
																'warning',
																retornoQuestion,
																undefined,
																'custom',
																[
																 	{ 
																 		text : LNG('BTN_SAVE'), 
																 		addClass: 'btn-light-blue',
																 		val : true, 
																 		onClick:function(e){		
																					 			var nova_senha 		= $('.grid_alterar_senha #nova_senha').val().trim();
																					 			var confirmar_senha = $('.grid_alterar_senha #confirmar_senha').val().trim();
																					 			if(nova_senha!='' || confirmar_senha!=''){
																									if(nova_senha!=confirmar_senha){
																										if($('.alerta_senha_igual').length>0) $('.alerta_senha_igual').remove(); 
																										$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_same')+'</div>');
																										return false;
																									}
																									if(nova_senha.length < 3 || confirmar_senha.length < 3){
																										if($('.alerta_senha_igual').length>0) $('.alerta_senha_igual').remove(); 
																										$('.grid_alterar_senha').prepend('<div class="alert alert-danger alerta_senha_igual" role="alert">'+LNG('js_admin_pass_min')+'</div>');
																										return false;
																									}
																								}					
																 								return true;
																				 			}
																 	},
																 	{
																 		text : LNG('MODAL_CONFIRM_BT_CANCEL'), 
																 		val : 'cancel', 
																 		onClick:function(e){																	
											 													return true;
																				 			}
																 	}
																]
															);
												
											return false;
											break;
										};

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







function executaDownloadFile($file){
	WRS_CONSOLE('DOWNLOAD',$file);
	$('#downloadFileExport').attr('src',$file);
}
