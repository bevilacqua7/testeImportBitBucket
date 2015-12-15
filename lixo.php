<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
date_default_timezone_set('America/Los_Angeles');

$arr = array(
		'GOLD',
		'NIVER',
		'OFF',
		'BLACKFRIDAY',
		'BLACK'
);

for($i=0;$i<=100;$i++){
	foreach($arr as $key){
		$t = array(
				$i.$key,
				$key.$i
				);
		foreach($t as $k){
			$res = tenta($k);
			if($res->isSuccess){
				echo "<br>OK: ".$k;
			}else{
				echo "<br>ERRO: ".$k;
			}
			flush();
		}
	}
}



function tenta($str){
	$url = "https://www.netshoes.com.br/services/coupon.jsp?code=".$str;
	/*
	$ch = curl_init();
	$timeout = 2;
	curl_setopt ($ch, CURLOPT_URL, $url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$re = curl_exec($ch);
	curl_close($ch);
	*/
	$re = file_get_contents($url);
	return json_decode($re);
}



exit();

/*
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
					*/