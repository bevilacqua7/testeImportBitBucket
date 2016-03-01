

function callback_load_admin_generic_modal(arg,tabela)
{
	_START('callback_load_admin_generic_modal');
	var _data			=	 $('#myModal, .modal-content-grid').data('wrsGrid');
	var param			=	 _data.param_original;
	var option						=	 [];
		option['wrs_type_grid']		=	'form';
		option[param['primary']]	=	$(arg[param['primary']]).text();
		option['param_request']			=	param;

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
				
				wrs_window_grid_events_tools({btn:btn_window_grid_event_admin, visao: funCallBackVision});
				
			_END('carrega_grid_list_admin::funCallBack');	
		};
		
		
		

	grid_window_modal(option,tabela,funCallBack);
		
	_END('callback_load_admin_generic_modal');
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






function btn_window_grid_event_admin(data)
{
	_START('btn_window_grid_event_admin:0808');
	var action_type				=	 $(this).attr('action_type');
	var table					=	 $(this).attr('table');
	var values					=	 get_grid_window_values_form();

	var _data					=	 $('#myModal, .body_grid_window').data('wrsGrid');
	var dadosKendo				=	 (!$("#"+table).length)?_data:$("#"+table).data('wrsModal');

	//console.log('dadosKendo',dadosKendo);

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
			wrs_window_grid_events_tools({btn:btn_window_grid_event_admin, visao: funCallBackVision});
		_END('btn_window_grid_event_admin::funCallBack');	
	};
		
	var param					=	 _data.param_original;
	
	/*
	 * Como esta funcao (btn_window_grid_event_admin) é chamada para centralizar e normalizar as acoes especificas do ADMIN
	 * ela é a mesma para quando há itens selecionados na grid como para as acoes dos botoes (salvar, etc).  Por isso é verificado
	 * se existem parametros selecionados (mais de um item), caso nao houver, executa a acao com os dados da tela (formulario) para um unico item
	 */
	if(param==undefined){
		btn_window_grid_event(funCallBack,action_type,table);
		_END('btn_window_grid_event_admin:0808');
		return true;		
	}
	
	var chave_primaria			=	param.primary;
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
							arrRegisterIds.push($(objDados[chave_primaria]).text());
							arrObjetosSelecionados.push(objDados);
														
					});
		}
	}
	
	var _extraValues = undefined;
	
	
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
										var retornoQuestion = function(escolha){
											if(qtde_linhas_selecionadas==0 && escolha!='cancel' && escolha!='all' && escolha!=false){	
												WRS_ALERT(LNG('JS_admin_select_one'),'warning');
											}else{
												if(escolha!='cancel' && escolha!=false){
													//_extraValues = {'objetosSelecionados':(escolha=='all')?'*':arrObjetosSelecionados};	
													_extraValues = {'objetosSelecionados':(escolha=='all')?'*':arrRegisterIds,'chave_primaria':chave_primaria};					
													btn_window_grid_event(funCallBack,action_type,table,_extraValues);
												}
											}
										}
										var _s = (qtde_linhas_selecionadas>1)?'s':'';
										WRS_CONFIRM(
														LNG('JS_admin_confirm_export'),
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
				case 'back' 	: 
				case 'new' 		: 
				case 'update' 	: 
						btn_window_grid_event(funCallBack,action_type,table,_extraValues);
						break;
				
			}
	
	_END('btn_window_grid_event_admin');
}









function executaDownloadFile($file){
	WRS_CONSOLE('DOWNLOAD',$file);
	$('#downloadFileExport').attr('src',$file);
}
