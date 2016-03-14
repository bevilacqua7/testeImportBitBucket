<?php
	$language = array ();
	
	$language['LINGUA'] 				= 	"English";
	$language['IDIOMA'] 				= 	"ENG";
	$language['TITLE']					=	"WRS - ".WRS::VERSION();
	$language['CharSet']		  		= 	'utf-8';		//por enqtanto está implementado apenas no  sendmail
	
	
	$language['DESCONECTED_TITLE']		=	"USUÁRIO DESCONECTADO";
	$language['DESCONECTED_DESCRIPT']	=	"Usuário desconectado do sistema por motivo diversos:";
	$language['DESCONECTED_BUTTON']		=	"VOLTAR PARA O LOGIN";
	$language['DESCONECTED_REASONS']	=	array('Inatividade na sessão,','Alteração de senha,','Banco de dados sem conexão,','Senha expirtada,','Entre outras.');
	
 

	
	
	/*
	 * Mensagem de Privilegios
	 */
	$language['USUARIO_SEM_PRIVILEGIOS'] 				= "Usuário sem privilégios";
	$language['USUARIO_SEM_PRIVILEGIOS_LIMITE_ROWS'] 	= "Usuário sem privilégios para visualizar a grid, ela contém mais de 65 mil registros";
	$language['ERROR_NOT_ROWS'] 						= "Erro interno ao executar a Consulta";
	$language['ERROR_DRILL_LINE_RESULT'] 				= "Erro interno ao processar a criação do DRILL LINHA, se o erro persistir entre em contato com o suporte";
	$language['MSG_ERROR_TABLE_CACHE'] 				= "Consulta não pode ser executada, favor modificar o Layout dos Atributos selecionados";
	$language['VALOR'] 								= "Valor";
	
	
	/*TRANSLATE BUTTONS*/
	
	$language['TOOLTIP_BTN_RUN'] 				= 	"Executar relatório";
	$language['TOOLTIP_BTN_CLEAN_FILTER']		=	"Limpar todos os filtros selecionados";
	$language['TOOLTIP_BTN_CHANTE_FILTER_DROP']	=	"Faz a mudança de estado de: <br> DRAG and DROP para Seleção de filtro <br> Estado de filtro para DRAG and DROP";
	$language['TOOLTIP_BTN_NEGADO']				=	"Negando os filtros selecionados, na consulta irá vir todos os filtros menos os selecionados.";
	$language['TOOLTIP_BTN_CLEAN_FILTER_LOCAL']	=	"Limpar apenas os filtros dessa dimensão";
	$language['TOOLTIP_BTN_ERASER_FILTER_LOCAL']=	"Limpa as pesquisas feita nos filtros pesquisados";
	$language['TOOLTIP_BTN_CLEAR_ELEMENTS_BELLOW']	=	"Remove todos os elementos do container a baixo";
	//END
	
	$language['ERROR_CANT_CREATE_JOB'] 						= "Ops.. Favor reenviar a consulta, não foi possível criar um job, se o erro persistir favor entrar em contato com o suporte";
	
	$language['CSV_ERROR_TABLE_EMPTY']			="Ops, ainda não foi gerado nenhum relatório para essa  consulta, ou falta informaçõe da tabela para ser gerada.";
	$language['CSV_NOT_GENERATE']			=	'Não está sendo possivel gerar o CSV, erro interno no banco';

	$language['CSV_GENERATE_ZIP']		=	'Gerando %s arquivos CSV';
	
	$language['LOGOUT']						=	'Aguarde um instante estamos saindo do sistema..<br><br><br>';
	
	$language['MENU_ADMIN_CUSTOMER']		=	'Clientes';
	$language['MENU_ADMIN_USER']			=	'Usuários';
	$language['MENU_ADMIN_SERVER']			=	'Servidores';
	$language['MENU_ADMIN_DATABASE']		=	'Databases';
	$language['MENU_ADMIN_CUBE']			=	'Cubos';
	$language['MENU_ADMIN_HIERARCHY']		=	'Hierarquias';
	$language['MENU_ADMIN_PERFIL']			=	'Perfis';
	$language['MENU_ADMIN_CUBE_USER']		=	'Associações';
	$language['MENU_ADMIN_REPORT']			=	'Relatórios';
	$language['MENU_ADMIN_DOWNLOAD']		=	'Downloads';
	$language['MENU_ADMIN_LOG']				=	'Logs';
	$language['MENU_ADMIN_SSAS_REPORT']		=	'Relatórios';
	$language['MENU_ADMIN_SSAS_LAYOUTS']	=	'Layouts';
	
	$language['file_not_validated']			=	'Arquivo não validado';	
	$language['file_not_unziped']			=	'Arquivo não descompactado';
	
	
	
	
	$language['ADMIN_AVISO_IMPORT']			=	'- importe apenas arquivos no formato CSV ou ZIP<br>- certifique-se que o nome do arquivo seja: #NAME_FILE#, ou que o ZIP contenha este arquivo<br>- Layout padrão:<br><span class="class_layout_padrao">#DEFAULT_LAYOUT#</span>';
	
	$language['TITLE_OPTIONS']				=	'Options';
	
	$language['MENU_ALL_CATEGORY']			=	'Todas as categorias';
		
	
	$language['NO_RESULTS_QUERY']	=	'sem resultados para a consulta: ';
	$language['NAME_REPORT_EMPTY']	=	'Escolha um nome para o relatório';

	$language['DATABASE_NOT_CONECTED']	=	"Sem conexão com o banco de dados, tente desconectar e logar no sistema novamente";
	$language['DATABASE_NOT_FOUND']		=	"Ops!!! Sem conexão com o banco de dados";
	/*
	 * CUBO ERRO
	 */
	$language ['ERRO_CUBO_INDISPONIVEL'] 			= "ERRO: INDISPONIVEL";
	$language ['ERROR_TABLE_CACHE_NO_HEADER']		= "Não existem Dados para esta Consulta..";
	$language ['ERROR_CUBO_NOT_FOUND']				= "Não foi possível identificar o Cubo utilizado. <br> Se o erro persistir, favor informar ao suporte";
	$language ['ERRO_EXECUTE_ABA'] 					= "Erro ao executar a Consulta <b>%s</b> <br>";
	$language ['ABA_IN_USER'] 						= "Consulta em uso";
	$language ['ABA_LIMIT_SEE'] 					= "Não é possivel remover a Consulta <b>%s</b><br> pelo menos uma deve continuar visível.";
	$language ['ABA_CHANGE_CUBE_ID'] 					= "As informações da ABA será apagada pois pertence á outro cubo";
	
	$language ['JOB_COMPLETE_LOAD'] 		= "Consulta <b>%s</b> foi concluída";
	$language ['JOB_COMPLETE'] 				= "Não existem mais Consultas em execução";
	$language ['JOB_CANCEL'] 				= "Consulta <b>%s</b> foi cancelada com sucesso";
	$language ['JOB_CANCEL_ERRO'] 			= "Erro ao cancelar a Consulta <b>%s</b> favor tentar novamente";
	$language ['JOB_NOTFOUND'] 				= "Não foi encontrado a Consulta para cancelar ou a mesma foi concluida";

	$language ['JOB_CLOSE_ALERT'] 			= 	"Fechar Janela de Alerta";
	$language['SORT_SSAS_TABLE_ERROR']		=	"ERROR::008 Não foi possível Sortear a tabela";	
	$language['CONSULTA_ATIVA_CANCELAR']	=	"Existe uma consulta em andamento para esse report, é necessário cancelar para solicitar uma nova consulta.";
	/*
	 * ALERTS
	 */
	
	$language ['SELECT_NULL'] 					= "Consulta retornou vazia";
	$language ['RUN_GRID_CHANGE_NOT'] 			= "Não há modificações para gerar uma nova Consulta..";
	
	$language ['NOT_CLOSE_WINDOW'] 			= "As abas listadas a baixo não estão salvas:";
	$language ['NOT_CLOSE_WINDOW_LOGOUT'] 	= "As abas listadas a baixo não estão salvas, deseja sair mesmo sem salvar?";
	$language ['ABA_TITLE_EMPTY'] 			= "É necessário digitar um <b>título</b> para o report";
	
	$language['SEE_IN_MAP']					=	'VER NO MAPA';
	$language['REMOVE']						=	'REMOVER';
	
	$language['DATA_BASE_ERROR']			=	'<b>Ops... Erro no Banco de dados:</b> ';
	
	/*
	 * TITULOS
	 */
	
	$language ['TITLE_TEMA'] 			= "Tema";
	$language ['TITLE_LINGUA'] 			= "Lingua";
	$language ['TITLE_ALTER_SENHA'] 	= "Alterar Seha";
	$language ['TITLE_ADMINISTRATIVO'] 	= "Administrativo";
	$language ['TITLE_ADMINISTRATIVO_MENU'] 	= "MENU PRINCIPAL";
		
	$language ['TITLE_GRID_WINDOW_MENU_MANAGER'] 		= "Visão";
	$language ['TITLE_GRID_WINDOW_MENU_LIST'] 			= "Grid";
	$language ['TITLE_GRID_WINDOW_MENU_DETAILS'] 		= "Detalhes";
	$language ['TITLE_GRID_WINDOW_MENU_BIG_ICON'] 		= "Icone Grande";
	$language ['TITLE_GRID_WINDOW_MENU_MEDIUM_ICON'] 	= "Icone Médio";
	$language ['TITLE_GRID_WINDOW_MENU_SMALL_ICON'] 	= "Icone Pequeno";
	$language ['TITLE_GRID_WINDOW_MENU_LIST_INFO'] 		= "Lista Básica";
	$language ['REPORT_RESULT_HISTORY'] 		= "Não existe histórico";

	$language ['MAIN_OPEN_REPORT'] 		= "Abrir relatórios";
	$language ['MAIN_OPEN_LAYOUT'] 		= "Abrir layouts";


	$language['TITLE_TOP_TOTAL'] 	= "TOTAL";
	$language['TITLE_TOP_5'] 		= "TOP 5";
	$language['TITLE_TOP_10'] 		= "TOP 10";
	$language['TITLE_TOP_15'] 		= "TOP 15";
	$language['TITLE_TOP_20'] 		= "TOP 20";
	$language['TITLE_TOP_25'] 		= "TOP 25";
	$language['TITLE_TOP_50'] 		= "TOP 50";
	$language['TITLE_TOP_100'] 		= "TOP 100";
	
	
	
	
	$language['ERROR_LOAD_ABA'] 		= "ERRO:ABA01 - Ocorreu um erro ao abrir a aba..";
	$language['ABA_BE_LOADED']			=	"A aba <b>%s</b> já se encontra carregada";

	
	/*
	 * FILTROS
	 */
	$language ['FILTER_NOT_ROWS'] 			= "Não foi encontrado nenhum elemento.";
	$language ['FILTER_NOT_ROWS_TOOLTIP']	= "Não há filtro selecionado.";
	$language ['FILTER_CLEAN_FIND']			= "Limpar a pesquisa";
	$language ['FILTER_CLEAN_FILTER']		= "Tem certeza que desenja apagar os filtros já selecionados?";
	$language ['FILTER_CLEAN_FILTER_SUCCESS']= "Limpeza do filtro efetuada com sucesso.";
	
	/*
	 * ERRO AO CARREGAR A RUN.php
	 */
	$language ['ERRO_FILE_PROCCESS'] = "Ops Houve algum erro no processso ERRO:0001";
	
	/*
	 * BOTAO
	 */

	$language ['BTN_CLOSE'] 					= "Fechar";
	$language ['MSG_FORCE_LOGOFF'] 				= "Você foi desconectado do sistema";
	
	$language ['DRAG_DROP_FILE_IN_USER'] 		= "O elemento <b>%s</b> já está em uso";
	$language ['DRAG_DROP_FILE_IN_USER_REMOVE'] = "O elemento <b>%s</b> já estava em uso e por isso foi removido da seleção";
	$language ['DRAG_DROP_FILE_NOT_PUT'] 		= "Não pode inserir o <b>%s</b> neste box, ele pertece a outra outra estrutura ";
	
	$language ['DRAG_DROP_AREA'] 					= "Arraste para esta área <b>%s</b>.";
	$language ['DRAG_DROP_CLEAN_SELECTION'] 		= "Tem certeza que deseja remover todos(as) <b>%s</b> ?";
	$language ['DRAG_DROP_CLEAN_SELECTION_INSIDE']	= "Tem certeza que deseja limpar todas as seleções do Filtro?";
	
	$language ['DRAG_DROP_MSG_ERROX_MAX_QTDE'] 		= "Não é possível inserir mais de %s atributos no campo %s";
		
	$language ['DRAG_DROP_CLEAN_SELECTION_SUCCESS'] 		= "Remoção dos(as) <b>%s</b>(s) realizadas com sucesso.";
	$language ['DRAG_DROP_CLEAN_SELECTION_SUCCESS_INSIDE'] = "Seleções do filtro removido com sucesso .";
	
	$language ['RUN_RELATORIO_FALTA_INFORMACAO'] 	= "Para execurar a Consulta falta informações em: <br> <b>%s</b>";
	
	
	
	$language ['DRAG_DROP_FIELD_ATRIBUTO'] 	= "um Atributo";
	$language ['DRAG_DROP_FIELD_METRICA'] 	= "uma Metrica";
	
	$language ['GERANDO_RELATORIO'] 		= "Aguarde um instante enquando a Consulta é criada";
	$language ['GERANDO_RELATORIO_TITLE'] 	= "Gerando Consulta";
	
	$language ['GERANDO_MULTI_CUBE_BODY'] 		= "Aguarde um instante para troca de Cubo";
	$language ['GERANDO_MULTI_CUBE_TITLE'] 	= "Trocando o Cubo";
	
	
	$language ['ATTRIBUTOS_FILTRO'] 	= "Filtros";
	$language ['ATTRIBUTOS_COLUNA'] 	= "Colunas";
	$language ['ATTRIBUTOS_LINHA'] 		= "Linhas";
	$language ['ATTRIBUTOS_METRICA'] 	= "Metricas";
	$language ['ATTRIBUTOS_MULTIPLE_CUBE'] 	= "Cubos";
	$language ['ATTRIBUTOS_SIMPLES'] 	= "Simples";
	$language ['ATTRIBUTOS_COMPOSTO'] 	= "Composto";
	$language ['ATTRIBUTOS_TITLE'] 		= "Atributos";
	
	
	/*
	 * CHART
	 */
	$language ['ACTIVE'] 			= "Ativas(os)";
	$language ['ACTION'] 			= "Ações";
	$language ['TYPE'] 				= "Tipo";
	$language ['SUB_TYPE'] 			= "Sub Tipo";
	$language ['LEGEND_ENABLE'] 	= "Desativar";
	$language ['POLAR'] 			= "Polar";
	$language ['RADAR'] 			= "Radar";
	$language['NORMAL']				= "Nornal";
	$language['STACKED']			= "Empilhado";
	$language['WAVY']				= "Ondulado";
	$language['PERCENT']			= "Percentual";	
	$language['LEGEND']				= "Legendas";
	$language['MULTIPLE_CURSOR']	= "Multiplo";
	
	$language['CHART_GAUGE_RANGE']	= "Range";
	$language['CHART_GAUGE_QUANTIDADE']	=	"Quantidade por linha";
	$language['CHART_GAUGE_COLOR_TITLE']	= "Gauge";
	$language['CHART_GAUGE_LINEAR']	= "Linear";
	$language['CHART_GAUGE_RADIAL']	= "Radial";
	
	
	$language['CHART_PIE']	=	"Nornal";
	$language['CHART_DONUT']=	"Vazado";
//	$language['CONFIG_CHART_LEGEND']		=	"Legenda interna";
	$language['CHART_INSIDE_NOT_LEGEND']	=	"Valores";
	
	$language['CHART_RADAR_LINE']	=	"Linha";
	$language['CHART_RADAR_COLUMN']	=	"Coluna";	
	$language['CHART_RADAR_AREA']	=	"Area";
	
	$language['CHART_LEGEND_BOTTOM']	=	"Abaixo";
	$language['CHART_LEGEND_TOP']		=	"Acima";
	$language['CHART_LEGEND_LEFT']		=	"Esquerda";
	$language['CHART_LEGEND_RIGHT']		=	"Direita";
	
	
	$language['CHART_BUBBLE_X']		=	"Eixo X";
	$language['CHART_BUBBLE_Y']		=	"Eixo Y";
	$language['CHART_BUBBLE_TOTAL']	=	"Volume";

	/**
	 * Header das GRID
	 */
	$language['GRID_HEADER_OPTION'] 				 	= 	"Opções";
	$language['GRID_HEADER_OPTION_TOTAL_LINE']		 	=	"Linhas";
	$language['GRID_HEADER_OPTION_TOTAL_COLUMN']	 	=	"Colunas";
	$language['GRID_HEADER_OPTION_TOTAL_SUMARIZA']	 	=	"Numeros Resumidos";
	$language['GRID_HEADER_OPTION_TOTAL_LINE_COLOR']	=	"Linhas Intercaladas";
	$language['GRID_HEADER_OPTION_ORDER_COLUMN']	 	=	"Inverter Colunas";
	$language['GRID_HEADER_OPTION_DRILL_HIERARQUIA_LINHA']=	"Registros Consolidados";
	
	$language['GRID_HEADER_EXPORT'] 			= "Exportar";
	$language['GRID_HEADER_EXPORT_PDF'] 		= "Pdf";
	$language['GRID_HEADER_EXPORT_CSV'] 		= "Csv";
	$language['GRID_HEADER_EXPORT_EXCEL'] 		= "Excel";
	$language['GRID_HEADER_EXPORT_IMAGE'] 		= "Imagem";
	$language['GRID_HEADER_EXPORT_IMAGE_SVG'] 	= "Imagem SVG";
	
	$language['CHART_CONFIG'] 	= "Configurar Gráfico";
	 
	 
	
	$language['GRID_HEADER_SEE'] 		= 	"Visão";
	$language['GRID_HEADER_SEE_GRID']	=	"Planilha";	
	$language['GRID_HEADER_SEE_CHART']	=	"Gráfico";
	$language['GRID_HEADER_SEE_MAP']	=	"Mapa";
	
	$language['GRID_HEADER_TITLE_DADOS']		=	"DADOS";
	$language['GRID_HEADER_TITLE_TOTAL']		=	"TOTAL";
	$language['GRID_HEADER_TITLE_EXIBITION']	=	"EXIBIÇÃO";
		
	$language['WHAT_SEARCH'] = "O que procura?";
	
	
	$language ['TITLE_TOP'] 		= "Opções Top";
	$language ['BTN_SAIR'] 		= "Sair";
	$language ['BTN_SAIR_MENU'] 		= "Fechar menu";
	$language ['BTN_SIM'] 		= "Sim";
	$language ['BTN_NAO'] 		= "Não";
	$language ['BTN_CONFIRM'] 	= "Confirmado";
	$language ['BTN_CANCEL_CONSULTA'] 	= "Cancelar Consulta ";
	$language ['BTN_APLY'] 		= "Aplicar";
	$language ['BTN_REMOVE'] 	= "Remover";
	$language ['BTN_UPDATE'] 	= "Alterar";
	$language ['BTN_NEW'] 		= "Novo";
	$language ['BTN_SAVE'] 		= "Salvar";
	$language ['BTN_APPLY'] 	= "Aplicar";
	$language['OF'] 			= "de";
	$language['PAGE'] 			= "Página";
	
	
	$language['tpl_layout_remove_empty'] 				= "É necessário selecionar algum relatório para poder deletar";
	$language['tpl_layout_remove_sucess'] 				= "Layouts Removidos com sucesso";
	$language['tpl_layout_remove_error'] 				= "Não foi possivel remover alguns layouts";
	
	$language['tpl_layout_options_default'] 			= "Padrão";

	
	$language['tpl_layout'] 				= "Layouts";
	$language['tpl_layout_title'] 			= "Salvar Layout";
	$language['tpl_layout_name'] 			= "Nome Layout";
	$language['tpl_layout_alias'] 			= "Alias Layout";
	$language['tpl_layout_name_empty'] 		= "É necessário digitar o <b>Nome Layout</b>";
	$language['tpl_layout_alias_empty'] 	= "É necessário digitar o <b>Alias Layout</b>";
	$language['tpl_layout_data_empty'] 		= "É necessário preencher uma das opções para salvar um layout <b>Métricas, Linhas ou Colunas</b>";
	
	$language['tpl_layout_option_select_empty'] 		= "É necessário selecionar alguma opção para o layout";
	
	
	$language['tpl_layout_share'] 			= "Compartilhar";
	$language['tpl_layout_error'] 			= "OPS... Erro ao salvar o layout,favor tentar novamente";
	$language['tpl_layout_sucess'] 			= "Layout salvo com sucesso";
	
	
	$language ['ALERT_TITLE_ERRO'] 		= "Aconteceu um erro.";
	$language ['ALERT_TITLE_SUCCESS'] 	= "Confirmando.";
	$language ['ALERT_TITLE_WARNING'] 	= "Atenção!";
	$language ['ALERT_TITLE_INFO'] 		= "Para seu conhecimento";
	$language ['ERROR_MULTIPLE_CUBE_JSON'] 		= "Erro no processo de criação de multiplos cubos se o erro persistir favor entrar em contato.";
	
	$language ['ERROR_NOT_EVENT'] 		= "Não foi possível encontrar o evento solicitado, se o erro persistir favor entrar em contato";
	$language ['ERROR_TITLE'] 			= "Atenção ocorreu um erro..";
	$language ['ERROR_EVENT_NOT_FOUND'] = "Não foi especificado o evento para essa requisição";
	
	$language ['WARNING_TITLE_RESULT_NOT_FOUND']	= "Consulta";
	$language ['WARNING_BODY_RESULT_NOT_FOUND']		= "A consulta não retornou resultado..";

		

	$language ['TITLE_CONTEX_MENU'] 						= "Adicionar à";
	$language ['FILTER_CONTEX_MENU_SELECTION_REMOVE'] 		= "Remover seleção do%s ite%ns";
	$language ['FILTER_CONTEX_MENU_SELECTION_VIEW'] 		= "Visualizar ite%ns selecionado%s";
	$language ['FILTER_CONTEX_MENU_SELECTION_ITEM_EXISTS'] 	= "O%s ite%ns abaixo já existia%m e não fo%ram adicionado%s:";
	
	$language ['TITLE_MENU_DASHBOARD'] 	= "('Visões Consolidadas com Relatórios de Diferentes Bases Segmentadas em Quadrantes Independentes')";
	

	$language['tpl_association_save_sucess'] 				= "Associação salva com sucesso";
	$language['tpl_association_save_error'] 				= "Erro na associação";
	$language['tpl_association_remove_sucess'] 				= "Associação do%s ite%ns removida com sucesso";
	$language['tpl_association_remove_error'] 				= "Erro na remoção de associação";

	$language['tpl_association_title'] 						= "Associacao individual por ";
	$language['tpl_association_title_cube'] 				= "Cubo";
	$language['tpl_association_title_user'] 				= "Usuário";
	
	
	/*
	 * HTML DIVERSOS
	 */
	
	$language ['HTML_CUBE_EDITION'] 	= "Edição:";
	$language ['HTML_CUBE_UPDATE'] 		= "Atualizado:";
	
	$language['LABEL_NOVO']				=	"Novo";
	$language['LABEL_LOAD']				=	"Carregando...";
	$language['PAGINATION_PAGE']		=	"Elementos";
	$language['PAGINATION_PAGE_INSIDE']	=	"até";
	
	//ADMINISTRATIVO
	$language ['TITLE_ATT_WRS_CUSTOMER'] 	=  "Gerenciamento de Clientes";
	$language ['TITLE_ATT_WRS_SERVER'] 		=  "Gerenciamento de Servidores";
	$language ['TITLE_ATT_WRS_USER'] 		=  "Gerenciamento de Usuários";
	$language ['TITLE_ATT_WRS_DATABASE'] 	=  "Gerenciamento de Databases";
	$language ['TITLE_ATT_WRS_CUBE'] 		=  "Gerenciamento de Cubos";
	$language ['TITLE_ATT_WRS_HIERARCHY'] 	=  "Gerenciamento de Hierarquias";
	$language ['TITLE_ATT_WRS_PROFILE'] 	=  "Gerenciamento de Perfis";
	$language ['TITLE_REL_WRS_CUBE_USER'] 	=  "Gerenciamento de Associações";
	$language ['TITLE_ATT_WRS_REPORT'] 		=  "Gerenciamento de Relatórios";
	$language ['TITLE_ATT_WRS_DOWNLOAD'] 	=  "Gerenciamento de Arquivos";
	$language ['TITLE_ATT_WRS_PERFIL'] 		=  "Gerenciamento de Perfis";
	$language ['TITLE_ATT_WRS_LOG'] 		=  "Gerenciamento de Logs";
	
	$language['LINE_TOTAL']					=	'TOTAL';
	$language['label_total']				=	'Total';
	$language['LINE_TOTAL_BUBBLE']			=	'Deseja usar as linha de totais no gráfico?';
	
	
	// UPLOAD FORM
	$language['msg_maxNumberOfFiles']					=	'Número maximo de arquivos excedido';
	$language['msg_acceptFileTypes']					=	'Arquivo de extensão nao permitida';
	$language['msg_maxFileSize']						=	'Arquivo de tamanho excedido';
	$language['msg_minFileSize']						=	'Arquivo de tamanho mínimo não alcancado';
	$language['msg_nao_existe_file_in_zip']				=	'Não existe o arquivo permitido dentro deste ZIP: ';
	$language['msg_nome_obrigatorio_necessario']		=	'É obrigatório o uso de um nome específico para este upload: ';
	$language['upload_form_selecionar']					=	'Selecionar';
	$language['upload_form_enviar']						=	'Enviar';
	$language['upload_form_cancelar']					=	'Cancelar';
	$language['upload_form_apagar']						=	'Apagar';
	$language['upload_form_processando']				=	'Processando...';
	$language['upload_form_erro']						=	'Erro no envio';
	
	// UPLOAD DE ARQUIVOS PARA IMPORTACAO DE DADOS EM MASSA

	$language['upload_files_select']					=	'Selecione o arquivo para importação:';
	$language['upload_files_success_sing']				=	' registro importado com sucesso';
	$language['upload_files_success_plur']				=	' registros importados com sucesso';
	$language['upload_files_error_sing']				=	' registro importado com erro';
	$language['upload_files_error_plur']				=	' registros importados com erro';
	
	$language['upload_files_success_file']				=	'Arquivo importado com sucesso';
	
	// MODAL GENERICA
	$language['MODAL_GENERICA_SALVAR']		=	'Salvar';
	$language['MODAL_GENERICA_ATUALIZAR']	=	'Atualizar';
	$language['MODAL_GENERICA_APAGAR']		=	'Apagar';
	$language['MODAL_GENERICA_CANCELAR']	=	'Fechar';
	$language['MODAL_GENERICA_VOLTAR']		=	'Voltar';


	// MODAL CONFIRM
	$language['MODAL_CONFIRM_BT_CONFIRM']	=	'Apagar';
	$language['MODAL_CONFIRM_BT_CANCEL']	=	'Cancelar';
	
	
	
	// ADMIN MANAGE PARAM
	$language['obrigatorio'] 				= 'obrigatório';
	$language['bt_back'] 					= 'Voltar';
	$language['bt_new'] 					= 'Novo';
	$language['bt_update'] 					= 'Salvar';
	$language['bt_remove'] 					= 'Apagar';
	$language['bt_export'] 					= 'Exportar';
	$language['bt_import'] 					= 'Importar';
	$language['bt_export_user'] 			= $language['bt_export'];//.' Usuários';
	$language['bt_import_user'] 			= $language['bt_import'];//.' Usuários';
	$language['bt_export_customer'] 		= $language['bt_export'];//.' Clientes';
	$language['bt_import_customer'] 		= $language['bt_import'];//.' Clientes';
	$language['bt_export_server'] 			= $language['bt_export'];//.' Servidores';
	$language['bt_import_server'] 			= $language['bt_import'];//.' Servidores';
	$language['bt_export_database'] 		= $language['bt_export'];//.' Databases';
	$language['bt_import_database'] 		= $language['bt_import'];//.' Databases';
	$language['bt_export_cube'] 			= $language['bt_export'];//.' Cubos';
	$language['bt_import_cube'] 			= $language['bt_import'];//.' Cubos';
	$language['bt_export_profile'] 			= $language['bt_export'];//.' Perfis';
	$language['bt_import_profile'] 			= $language['bt_import'];//.' Perfis';
	$language['bt_export_cube_user'] 		= $language['bt_export'];//.' Associações';
	$language['bt_import_cube_user'] 		= $language['bt_import'];//.' Associações';
	$language['bt_export_download'] 		= $language['bt_export'];//.' Downloads';
	$language['bt_import_download'] 		= $language['bt_import'];//.' Downloads';
	$language['bt_export_log'] 				= $language['bt_export'];//.' Logs';
	$language['bt_import_log'] 				= $language['bt_import'];//.' Logs';
	

	//Login
	$language['LOGIN_USER']			=	'Usuários';
	$language['LOGIN_REMOVE_HISTORY_SUCCESS']			=	'Histórico removido com sucesso';
	$language['LOGIN_REMOVE']		=	'Remover';
	$language['LOGIN_PASSWORD_RECOVER']		=	'Recuperar Senha';
	$language['LOGIN_BUTTON']				=	'Login';
	$language['LOGIN_HISTORY']		='Histórico de Usuários';
	
	
	$language['LOGIN_SUBJECT']		=	'Recuperação de senha';
	
	$language['LOGIN_RECOVER_NOT_FOUND']		=	'Ops... Não foi encontrado o usuário <b>%s</b> para enviar a recuperação de senha.';
	$language['LOGIN_NOT_EMAIL']		=	'Ops.. Não foi encontrado email para ser enviado para o usuário <b>%s</b>. <br>Favor entrar em contato com o suporte para a recuperação da senha.<br>Obrigado.';
	
	$language['LOGIN_RECOVER_NEW']		=	'<h4>Alteração de senha</h4> Digite a nova senha para ter acesso ao sistema.';
	
	$language['LOGIN_OTHER_PERFIL']		='Outro Perfil';
	$language['LOGIN_ARMAZENA']			='Armazenar dados de Usuário ?';
	$language['LOGIN_PASSWORD']			='Password';
	$language['LOGIN_USER_SYSTEM']		='Usuário';
	$language['LOGIN_TITLE']			='WRS System';
	
	$language['LOGIN_ADD_NEW_RECOVER']			=	'Entre com a nova senha para acessar o sistema';
	$language['LOGIN_RECOVER_SUCCESS']			='Recuperação de senha enviada para o email do usuário';
	
	$language['LOGIN_RECOVER_ERROR']			='Ops.. Não foi possível enviar o email. Favor entrar em contato com o suporte para poder recuperar a senha. Obrigado';
	
	$language['HTML_LOGIN_RECOVER_BTN']		=	"TROCAR SENHA";
	$language['HTML_LOGIN_RECOVER_TITLE']="Recuperação de senha";
	$language['HTML_LOGIN_RECOVER']			=	<<<HTML
									Solicitação de recuperação de senha para acesso ao WRS System, caso não tenha solicitado favor desconsiderar esse email. <br><br>
									Clique no botão abaixo para ser redirecionado a troca de senha.	<br><br>
									Caso não não funcione o click copie o linque e cole no  navegador para efetuar a troca.
HTML;

	
	$language['LOGIN_NEW_PASSWORD']			='Nova senha';
	$language['LOGIN_NEW_PASSWORD_CONFIRM']	='Confirme a nova senha';
	$language['LOGIN_CHECK']				='Verificando senha...';
	$language['LOGIN_CHECK_NEW']			='Salvando nova senha ...';
	$language['LOGIN_PASSWORD_EMPTY']		='É necessário preencher o campo <b>%s</b> ';
	$language['LOGIN_PASSWORD_EMPTY_NEW']		='Não está sendo passado a nova senha.';
	$language['LOGIN_TAG_EMPTY']		='O código para reset da senha está em branco';
	$language['LOGIN_NEW_PASSWORD_CONFIRM_ERROR']		='A confirmação da nova senha não confere';
	$language['LOGIN_CHANGE_SQL_ERRO']		='Ops.. erro ao executar query do login, favor tentar novamente.';
	
	$language['LOGIN_RECOVER_SUCCESS_TIME']		=	'Senha gerada com sucesso. Redirecionando para o acesso ao sistema.';
	
	
	$language['LOGIN_CHANGE_SQL_ERRO_RECOVER']		='Ops.. erro ao executar query do login, para a recuperação da senha.';
	
	$language['LOGIN_CHANGE_OK']			='Senha alterada com sucesso, agora efetue o login com a nova senha';
	$language['REMOVE_LOGIN_COOKIE']		=	"Tem certeza que deseja remover o usuário do histórico de acesso?";
	
	$language['LOGIN_HTML_TITLE']			=	"WRS - Web Report System";
	
	

	$language['ADMIN_IMPORT_caracter_delimitador']			=	'Caracter delimitador: ';
	$language['ADMIN_IMPORT_tipo_importacao']				=	'Tipo de importação: ';
	$language['ADMIN_IMPORT_virgula']						=	'Vírgula';
	$language['ADMIN_IMPORT_ponto_virgula']					=	'Ponto e vírgula';
	$language['ADMIN_IMPORT_tabulacao']						=	'Tabulação';
	$language['ADMIN_IMPORT_remover']						=	'Remover os registros anteriores';
	$language['ADMIN_IMPORT_atualizar']						=	'Atualizar e adicionar novos';
	$language['ADMIN_IMPORT_compactar_resultados']			=	'Compactar resultados: ';
	
	
	$language['PASSWORD_EXPIRED']			=	'Senha expirada, é necessário criar uma nova senha. <br> Preencha o formulário com a nova senha.';
	$language['LOGIN_OK']					=	'Redirecionando para a tela principal';
	$language['LOGIN_PASSWORD_ERROR']		=	'Usuário ou senha inválidos';
	$language['LOGIN_SEND_CHANGE']			=	'Processando a recuperação da senha..';
		
	// JSs de MENU, ADMIN e REPORTS
	$language['JS_menu_report_include'] 	= 	'Inclusão de Relatório';
	$language['JS_menu_report_name'] 		= 	'Escolha um nome para o relatório';

	$language['JS_admin_choice_column'] 	= 	'Qual coluna deseja editar?';
	$language['JS_admin_choice_column_user']= 	'Usuário';
	$language['JS_admin_choice_column_cube']= 	'Cubo';
	
	$language['js_admin_pass_sintax_a']		=	'Deseja realmente definir uma nova senha para ';
	$language['js_admin_pass_sintax_b']		=	'Deseja realmente expirar a senha para ';
	$language['js_admin_pass_sintax_c']		=	' usuário%s';
	$language['js_admin_pass_sintax_d']		=	'todos os';
	$language['js_admin_pass_same']			=	'A senha e a confirmação de senha precisam ser iguais.';
	$language['js_admin_pass_min']			=	'A senha e a confirmação de senha não podem ter menos de 3 caracteres.';
	$language['js_admin_observation']		=	'* deixe os campos em branco para expirar a senha';
	$language['js_admin_new_pass_placeholder']=	'mínimo de 3 caracteres';
	$language['js_admin_new_pass']			=	'Nova Senha: ';
	$language['js_admin_confirm_pass']		=	'Confirmar Senha: ';
	
	$language['JS_admin_confirm_export'] 	= 	'Deseja exportar quais registros?';
	$language['JS_admin_all_records'] 		= 	'Todos os registros';
	$language['JS_admin_selecteds'] 		= 	'Somente o%s selecionado%s';
	$language['JS_admin_select_one'] 		= 	'Selecione ao menos um registro';
	$language['JS_admin_select_just_one'] 	= 	'Selecione apenas um registro para alterar';
	$language['JS_admin_select_one_file'] 	= 	'Selecione um arquivo antes de importar';
	$language['JS_admin_confirm_remove'] 	= 	'Deseja realmente apagar este%s registro%s?';
	$language['JS_admin_removed'] 			= 	'Registro%s removido%s com sucesso';

	$language['JS_report_confirm_remove'] 	= 	'Deseja apagar este%s relatório%s?';
	$language['JS_report_select_one'] 		= 	'Selecione ao menos um relatório';
	$language['JS_report_removed'] 			= 	'Relatório%s removido%s com sucesso';

	$language['JS_admin_preencha_obrigatorios'] 	= 	'Por favor preencha todos os campos obrigatórios';
	$language['JS_admin_preencha_minimo'] 	= 	'O valor mínimo para este campo #NOMECAMPO# é: ';
	$language['JS_admin_preencha_maximo'] 	= 	'O valor máximo para este campo #NOMECAMPO# é: ';
	$language['JS_admin_preencha_auto'] 	= 	'Deseja corrigir este valor para #VAL# ?';
	
	// EXPORT ADMIN OPTIONS
	$language['ADMIN_EXPORT_OPTION_ERROR'] 	= 	'Não há registros para serem exportados';
	$language['ADMIN_EXPORT_OPTION_OK'] 	= 	'Iniciando o download...';

	$language['ADMIN_REG_INSERTED'] 		= 	'Registro incluído com sucesso';
	$language['ADMIN_REG_UPDATED'] 			= 	'Registro alterado com sucesso';
	$language['ADMIN_REG_DELETED'] 			= 	'Registro%s excluído%s com sucesso';
	$language['ADMIN_NO_REG'] 				= 	'Sem registro para ação';
	
	
	$language['FORM_TYPE_PASSWORD_SHOW'] 	= 	'ver senha';
	

	$language['IMPORT_EXPORT_MESSAGES_STATUS'] 	= 	'Status:';
	$language['IMPORT_EXPORT_MESSAGES_DETAIL'] 	= 	'Detalhes:';
	
	
	/*
	 * GERADO COM O SQL:
	 * felipeb 20160225
		select 
		{fn CONCAT(
			'	$language[''',{fn CONCAT(
									coluna,{fn CONCAT(
														'''] 	= 	''',{fn CONCAT(
																			coluna,
																			''';'
													)}
								)}
			)}
		)}
		from
		(
		select distinct COLUMN_NAME as coluna
			from INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_NAME in ('ATT_WRS_CUSTOMER','ATT_WRS_USER','ATT_WRS_SERVER','ATT_WRS_DATABASE','ATT_WRS_CUBE','ATT_WRS_PERFIL','REL_WRS_CUBE_USER','ATT_WRS_REPORT','ATT_WRS_DOWNLOAD','FAT_WRS_LOG','ATT_WRS_HIERARCHY')
		) as f
		order by coluna
	 */
	
	 $language['CUBE_DESC']  =  'Descrição do Cubo';
	 $language['CUBE_FILTER']  =  'Atributos com Filtro';
	 $language['CUBE_FILTER_VALUE']  =  'Valores dos Atributos com Filtros';
	 $language['CUBE_FLAG']  =  'Flag do Cubo';
	 $language['CUBE_ID']  =  'Código do Cubo';
	 $language['CUBE_STATUS']  =  'Situação do Cubo';
	 $language['CUSTOMER_CODE']  =  'Código do Cliente';
	 $language['CUSTOMER_DESC']  =  'Descrição do Cliente';
	 $language['CUSTOMER_EXPIRY']  =  'Expiração da Senha';
	 $language['CUSTOMER_FLAG']  =  'Flag do Cliente';
	 $language['CUSTOMER_GROUP']  =  'Grupo do Cliente';
	 $language['CUSTOMER_ID']  =  'Código Interno do Cliente';
	 $language['CUSTOMER_STATUS']  =  'Situação do Cliente';
	 $language['DATABASE_BALANCE']  =  'Base Balanceada';
	 $language['DATABASE_COMMENT']  =  'Comentário sobre a Base';
	 $language['DATABASE_DESC']  =  'Descrição da Base';
	 $language['DATABASE_FLAG']  =  'Situação da Base';
	 $language['DATABASE_ID']  =  'Código da Base';
	 $language['DATABASE_IMAGE']  =  'Imagem da Base';
	 $language['DATABASE_LINK']  =  'Link de acesso Externo';
	 $language['DATABASE_ORDER']  =  'Ordem de Exibição';
	 $language['DATABASE_POOL']  =  'Base Compartilhado';
	 $language['DATABASE_STATUS']  =  'Situação da Base';
	 $language['DATE_ID']  =  'Período';
	 $language['DOWNLOAD_ID']  =  'Código do Download';
	 $language['FILE_DATE']  =  'Data do Arquivo';
	 $language['FILE_DESC']  =  'Descrição do Arquivo';
	 $language['FILE_FLAG']  =  'Flag do Arquivo';
	 $language['FILE_NAME']  =  'Nome do Arquivo';
	 $language['FILE_SIZE']  =  'Tamanho do Arquivo';
	 $language['LANGUAGE_ID']  =  'Lingua';
	 $language['MESSAGE']  =  'Mensagem';
	 $language['MODULE']  =  'Módulo';
	 $language['OPERATION']  =  'Operação';
	 $language['PERFIL_DESC']  =  'Descrição do Perfil';
	 $language['PERFIL_FLAG']  =  'Flag do Perfil';
	 $language['PERFIL_ID']  =  'Código do Perfil';
	 $language['PERFIL_LEVEL']  =  'Nível do Perfil';
	 $language['PERFIL_STATUS']  =  'Situação do Perfil';
	 $language['PROCESS']  =  'Processo';
	 $language['REPORT_AUTOLOAD']  =  'Carga Automática';
	 $language['REPORT_DATE']  =  'Data do Relatório';
	 $language['REPORT_DESC']  =  'Descrição do Relatório';
	 $language['REPORT_FILTER']  =  'Filtro do Relatório';
	 $language['REPORT_FLAG']  =  'Flag do Relatório';
	 $language['REPORT_FORMULAS']  =  'Fórmulas do Relatório';
	 $language['REPORT_ID']  =  'Código do Relatório';
	 $language['REPORT_OPTIONS']  =  'Opções do Relatório';
	 $language['REPORT_SHARE']  =  'Relatório Compartilhado';
	 $language['REPORT_STATUS']  =  'Situação do Relatório';
	 $language['REPORT_UPDATE']  =  'Atualização do Relatório';
	 $language['SERVER_COMMENT']  =  'Comentário do Servidor';
	 $language['SERVER_DESC']  =  'Descrição do Servidor';
	 $language['SERVER_FLAG']  =  'Flag do Servidor';
	 $language['SERVER_ID']  =  'Código do Servidor';
	 $language['SERVER_PWD']  =  'Senha do Usuário';
	 $language['SERVER_STATUS']  =  'Situação do Servidor';
	 $language['SERVER_USER']  =  'Usuário de Conexão';
	 $language['TRANSACTION_ID']  =  'Código da Transação';
	 $language['USER_CODE']  =  'Código do Usuário';
	 $language['USER_DESC']  =  'Descrição do Usuário';
	 $language['USER_EMAIL']  =  'Email do Usuário';
	 $language['USER_EXPIRY']  =  'Expiração da Senha';
	 $language['USER_FILTER']  =  'Atributos com Filtro';
	 $language['USER_FILTER_VALUE']  =  'Valores dos Atributos com Filtros';
	 $language['USER_FLAG']  =  'Flag de Usuário';
	 $language['USER_FORMAT']  =  'Formato do Layout';
	 $language['USER_FVD']  =  'Flag Interna';
	 $language['USER_ID']  =  'Código Interno do Usuário';
	 $language['USER_INTERNAL']  =  'Código Interno';
	 $language['USER_MASTER']  =  'Usuário MASTER';
	 $language['USER_PWD']  =  'Senha do Usuário';
	 $language['USER_PWD_OLD']  =  'Senha Anterior';
	 $language['USER_SALT']  =  'Código Interno';
	 $language['USER_STATUS']  =  'Situação do Usuário';
	 $language['USER_TYPE']  =  'Tipo do Usuário';

?>