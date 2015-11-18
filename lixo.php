<?php

session_start();

echo '<pre>';

$data	=	 array(	'page_size'								=> 	25,
						'PLUS_MINUS'							=> 	true,
						'ORDER_BY_COLUMN'						=>	'C001',
						'ORDER_COLUMN_TYPE'					 	=>	NULL,
						'ORDER_COLUMN'							=> 	NULL,
						'frozen'								=> 	0,
						'SUMARIZA'								=>	NULL,
						'COLORS_LINE' 							=>	1,
						'ALL_COLS'								=> 	NULL,
						'ALL_ROWS'								=> 	NULL,
						'WINDOW'								=>	'grid',
						'CHART'									=> 	NULL,
						'GAUGE_COLOR'							=> 	NULL,
						'GAUGE_SIZE_BY_LINE'					=> 	NULL,
						'DRILL_HIERARQUIA_LINHA'				=> 	NULL,
						'DRILL_HIERARQUIA_LINHA_DATA'			=>	NULL,
						'SHOW_LINE_TOTAL'						=> 	NULL,
						'DRILL_HIERARQUIA_LINHA_DATA_HEADER'	=>	NULL,
						'TYPE_RUN'								=>	NULL,
						'PAGE_CURRENT'							=>	NULL,		// Pagina corrente
						'TITLE_ABA'								=>	NULL,		//Titulo da ABA
						'REPORT_ID'								=>	NULL,//IDentificador da ABA
						'FILTER_TMP'							=>	'IiI=',		//Contem a estrutura do filtro usada para o histórico
						'QUERY_ID'								=> 	NULL,	//ID da query que foi requisitada
						'IS_REFRESH'							=>	NULL,		//identifica se foi executado o F5 e ou o frefresh na tela
						'TOP_CONFIG'							=>	NULL,		//COnfigurações dos tipos de TOPS e onde
						'MULTIPLE_CUBE_ID'						=>	NULL		//Caso exista multiple cubos ele é preenchido com o ID_do CUBO
					);	
					

					print_r(array_keys($data));