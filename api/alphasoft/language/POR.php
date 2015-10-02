<?php
	$language = array ();
	
	$language['IDIOMA'] 				= "POR";
	$language['TITLE']					=	"WRS - ".WRS::VERSION();
	/*
	 * Mensagem de Privilegios
	 */
	$language ['USUARIO_SEM_PRIVILEGIOS'] 				= "Usuário sem privilégios";
	$language ['USUARIO_SEM_PRIVILEGIOS_LIMITE_ROWS'] 	= "Usuário sem privilégios para visualizar a grid, ela contém mais de 65 mil registros";
	$language ['ERROR_NOT_ROWS'] 						= "Erro interno ao executar a Consulta...";
	$language ['ERROR_DRILL_LINE_RESULT'] 				= "Erro interno ao processar a criação do DRILL LINHA, se o erro persistir entre em contato com o suporte";
	$language ['MSG_ERROR_TABLE_CACHE'] 				= "Consulta não pode ser executada, favor modificar o Layout dos Atributos selecionados..";
	$language ['VALOR'] 								= "Valor";
	
	/*
	 * CUBO ERRO
	 */
	$language ['ERRO_CUBO_INDISPONIVEL'] 			= "ERRO: INDISPONIVEL";
	$language ['ERROR_TABLE_CACHE_NO_HEADER']		= "Ops não existe Dados para esta Consulta..";
	$language ['ERROR_CUBO_NOT_FOUND']				= "Ops não foi possível identificar o cubo que está sendo utilizado. <br> Se o erro persistir, favor informar ao suporte. <br><b>Obrigado</b>";
	$language ['ERRO_EXECUTE_ABA'] 					= "Erro ao executar a Consulta <b>%s</b> <br>";
	$language ['ABA_IN_USER'] 						= "Consulta em uso ";
	$language ['ABA_LIMIT_SEE'] 					= "Não é possivel remover a Consulta <b>%s</b><br> pelo menos uma deve continuar visível.";
	
	$language ['JOB_COMPLETE_LOAD'] 		= "A Consulta <b>%s</b> foi carregada";
	$language ['JOB_COMPLETE'] 				= "Não existe mais Consultas a serem executados.";
	$language ['JOB_CANCEL'] 				= "A Consulta <b>%s</b> foi cancelada com sucesso";
	$language ['JOB_CANCEL_ERRO'] 				= "Erro ao cancelar a Consulta <b>%s</b> favor tentar novamente";
	$language ['JOB_NOTFOUND'] 				= "Não foi encontrado a Consulta para cancelar ou a mesma foi concluida";

	$language ['JOB_CLOSE_ALERT'] 				= "Fechar Janela de Alerta";
	 
	/*
	 * ALERTS
	 */
	
	$language ['SELECT_NULL'] 					= "Consulta retornou vazia";
	$language ['RUN_GRID_CHANGE_NOT'] 			= "Não há modificações para gerar uma nova Consulta..";
	
	/*
	 * TITULOS
	 */
	
	$language ['TITLE_TEMA'] 			= "TEMA";
	$language ['TITLE_LINGUA'] 			= "LINGUA";
	$language ['TITLE_ALTER_SENHA'] 	= "ALTERAR SENHA";
	$language ['TITLE_ADMINISTRATIVO'] 	= "ADMINISTRATIVO";
	
	$language ['TITLE_ATT_WRS_USER'] 	= "Usuários";
	
	$language ['TITLE_GRID_WINDOW_MENU_MANAGER'] 		= "Visão";
	$language ['TITLE_GRID_WINDOW_MENU_LIST'] 			= "Grid";
	$language ['TITLE_GRID_WINDOW_MENU_DETAILS'] 		= "Detalhes";
	$language ['TITLE_GRID_WINDOW_MENU_BIG_ICON'] 		= "Icone Grande";
	$language ['TITLE_GRID_WINDOW_MENU_MEDIUM_ICON'] 	= "Icone Médio";
	$language ['TITLE_GRID_WINDOW_MENU_SMALL_ICON'] 	= "Icone Pequeno";
	$language ['TITLE_GRID_WINDOW_MENU_LIST_INFO'] 		= "Lista Básica";
	$language ['REPORT_RESULT_HISTORY'] 		= "Não existe histórico";



	$language['TITLE_TOP_TOTAL'] 	= "TOTAL";
	$language['TITLE_TOP_5'] 		= "TOP 5";
	$language['TITLE_TOP_10'] 		= "TOP 10";
	$language['TITLE_TOP_15'] 		= "TOP 15";
	$language['TITLE_TOP_20'] 		= "TOP 20";
	$language['TITLE_TOP_25'] 		= "TOP 25";
	$language['TITLE_TOP_50'] 		= "TOP 50";
	$language['TITLE_TOP_100'] 		= "TOP 100";
	
	
	
	
	$language['ERROR_LOAD_ABA'] 		= "ERRO:ABA01 - Ocorreu um erro ao abrir a aba..";


	
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
	
	$language ['DRAG_DROP_FILE_IN_USER'] 		= "O elemento <b>%s</b> já está em uso";
	$language ['DRAG_DROP_FILE_IN_USER_REMOVE'] = "O elemento <b>%s</b> já estava em uso e por isso foi removido da seleção";
	$language ['DRAG_DROP_FILE_NOT_PUT'] 		= "Não pode inserir o <b>%s</b> neste box, ele pertece a outra outra estrutura ";
	
	$language ['DRAG_DROP_AREA'] 					= "Arraste para esta área <b>%s</b>.";
	$language ['DRAG_DROP_CLEAN_SELECTION'] 		= "Tem certeza que deseja remover todos(as) <b>%s</b> ?";
	$language ['DRAG_DROP_CLEAN_SELECTION_INSIDE']	= "Tem certeza que deseja limpar todas as seleções do Filtro?";
	
		
	$language ['DRAG_DROP_CLEAN_SELECTION_SUCCESS'] 		= "Remoção dos(as) <b>%s</b>(s) realizadas com sucesso.";
	$language ['DRAG_DROP_CLEAN_SELECTION_SUCCESS_INSIDE'] = "Seleções do filtro removido com sucesso .";
	
	$language ['RUN_RELATORIO_FALTA_INFORMACAO'] 	= "Para execurar o relatório falta informações em: <br> <b>%s</b>";
	
	
	
	$language ['DRAG_DROP_FIELD_ATRIBUTO'] 	= "um Atributo";
	$language ['DRAG_DROP_FIELD_METRICA'] 	= "uma Metrica";
	
	$language ['GERANDO_RELATORIO'] 		= "Aguarde um instante enquando o sistema está gerando o relatório. <br> Obrigado";
	$language ['GERANDO_RELATORIO_TITLE'] 	= "Gerando Relatório";
	
	$language ['GERANDO_MULTI_CUBE_BODY'] 		= "Aguarde um instante enquando o sistema está trocando o cubo. <br> Obrigado";
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
	$language['GRID_HEADER_OPTION_TOTAL_LINE']		 	=	"Total Linhas";
	$language['GRID_HEADER_OPTION_TOTAL_COLUMN']	 	=	"Total Colunas";
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
	
	$language['GRID_HEADER_TITLE_DADOS']		=	"Dados";
	$language['GRID_HEADER_TITLE_EXIBITION']	=	"Exibição";
		
	$language['WHAT_SEARCH'] = "O que procura?";
	
	
	$language ['TITLE_TOP'] 		= "Opções Top";
	$language ['BTN_SAIR'] 		= "Sair";
	$language ['BTN_SIM'] 		= "Sim";
	$language ['BTN_NAO'] 		= "Não";
	$language ['BTN_CONFIRM'] 	= "Confirmado";
	$language ['BTN_CANCEL_CONSULTA'] 	= "Cancelar Consulta ";
	$language ['BTN_APLY'] 		= "Aplicar";
	$language ['BTN_REMOVE'] 	= "Remover";
	$language ['BTN_UPDATE'] 	= "Alterar";
	$language ['BTN_NEW'] 		= "Novo";
	$language ['BTN_SAVE'] 		= "Salvar";
	$language ['BTN_APPLY'] 		= "Aplicar";
	$language['OF'] 			= "de";
	$language['PAGE'] 			= "Página";
	
	
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
	$language ['TITLE_ATT_WRS_USER'] 		=  "Gerenciamento de Usuários";
	$language ['TITLE_ATT_WRS_DATABASE'] 	=  "Gerenciamento de Databases";
	$language ['TITLE_ATT_WRS_CUBE'] 		=  "Gerenciamento de Cubos";
	$language ['TITLE_ATT_WRS_HIERARCHY'] 	=  "Gerenciamento de Hierarquias";
	$language ['TITLE_ATT_WRS_PROFILE'] 	=  "Gerenciamento de Perfis";
	$language ['TITLE_REL_WRS_CUBE_USER'] 	=  "Gerenciamento de Associações";
	$language ['TITLE_ATT_WRS_REPORT'] 		=  "Gerenciamento de Relatórios";
	$language ['TITLE_ATT_WRS_DOWNLOAD'] 	=  "Gerenciamento de Arquivos";
	$language ['TITLE_ATT_WRS_LOG'] 		=  "Gerenciamento de Logs";
	
	$language['LINE_TOTAL']					=	'TOTAL';
	$language['LINE_TOTAL_BUBBLE']			=	'Deseja usar as linha de totais no gráfico?';
	
	
	
	
	
	// MODAL GENERICA
	$language['MODAL_GENERICA_SALVAR']		=	'Salvar';
	$language['MODAL_GENERICA_ATUALIZAR']	=	'Atualizar';
	$language['MODAL_GENERICA_APAGAR']		=	'Apagar';
	$language['MODAL_GENERICA_CANCELAR']	=	'Sair';


	// MODAL CONFIRM
	$language['MODAL_CONFIRM_BT_CONFIRM']	=	'Apagar';
	$language['MODAL_CONFIRM_BT_CANCEL']	=	'Cancelar';
?>