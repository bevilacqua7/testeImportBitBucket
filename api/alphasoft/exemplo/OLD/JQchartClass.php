<?php 
require_once '../jqGrid/jq-config.php'; 
require_once ABSPATH."php/jqUtils.php"; 
//require_once ABSPATH."php/jqGridPdo.php"; 
require_once ABSPATH."php/jqChart.php"; 
//ini_set("display_errors","1"); 
//$conn = new PDO(DB_DSN,DB_USER,DB_PASSWORD); 

// Tell the db that we use utf-8 
//jqGridDB::query($conn,"SET NAMES utf8"); 


function WRS_DEBUG_QUERY($texto,$fileName='WRS_DEBUG_QUERY.txt'){
	$fp = fopen(dirname(__DIR__).DIRECTORY_SEPARATOR.'debug'.DIRECTORY_SEPARATOR.$fileName,'a');
	fwrite($fp,$texto.PHP_EOL.'---------------------------------------------------------------------------------------------'.PHP_EOL); // grava a string no arquivo. Se o arquivo não existir ele será criado
	fclose($fp);
}



//Para implementar a Class
include '../api/alphasoft/lib/class/lib.JQCHART.php';

$grafico 	= 	 new WRS_JQCHART();
$param		=	 array();


$_gauge_param				=	array();
$_gauge_param['UNIDADE']	=	array(	'min'	=>14053,
										'max'	=>753836,
										'marker'=>array(
														array('from'=>14053,	'to'=>251278),
														array('from'=>251278,	'to'=>502557),
														array('from'=>502557,	'to'=>753836)
														)
													);

$param[]	=	 array('title'=>'ALTARGO (STF) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=>  14053,		'type'=>'gauge' );
$param[]	=	 array('title'=>'BACTROBAN (GSK) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=>  68339,		'type'=>'gauge' );
$param[]	=	 array('title'=>'BACTRONEO (N.Q) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=>  24276,		'type'=>'gauge' );
$param[]	=	 array('title'=>'MUPIROCINA MG (EUF) (: UNIDADE)',			'measure'=>'UNIDADE',	'data'=>  24224,		'type'=>'gauge' );
$param[]	=	 array('title'=>'MUPIROCINA MG (PZ8) (: UNIDADE)',			'measure'=>'UNIDADE',	'data'=>  39593,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );

$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)1',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)2',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)3',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)4',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)5',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)6',				'measure'=>'UNIDADE',	'data'=>  753836,		'type'=>'gauge' );

/*



/*
	for($i=0;$i<10;$i++){		
	$param[]	=	 array('title'=>'ALTARGO (STF) (: UNIDADE)'.$i,					'measure'=>'UNIDADE'.$i, 	'data'=> array(14053,43995,22211),			'type'=>'pie');
	$param[]	=	 array('title'=>'BACTROBAN (GSK) (: UNIDADE)'.$i,				'measure'=>'UNIDADE'.$i, 	'data'=>  array(68339,305157,170195),		'type'=>'pie');
	$param[]	=	 array('title'=>'BACTRONEO (N.Q) (: UNIDADE)'.$i,				'measure'=>'UNIDADE'.$i, 	'data'=>  array(24276,108192,102147),		'type'=>'pie');
	$param[]	=	 array('title'=>'MUPIROCINA MG (EUF) (: UNIDADE)'.$i,			'measure'=>'UNIDADE'.$i,	'data'=> array(24224,92742,160885),			'type'=>'pie');
	$param[]	=	 array('title'=>'MUPIROCINA MG (PZ8) (: UNIDADE)'.$i,			'measure'=>'UNIDADE'.$i,	'data'=> array(39593,167059,123576),		'type'=>'pie');
	$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)'.$i,				'measure'=>'UNIDADE'.$i,	'data'=> array(753836,3043426,2409773),		'type'=>'pie');
}



$param[]	=	 array('title'=>'ALTARGO (STF) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=> array(14053,43995,22211),			'type'=>'pie');
$param[]	=	 array('title'=>'BACTROBAN (GSK) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=>  array(68339,305157,170195),		'type'=>'pie');
$param[]	=	 array('title'=>'BACTRONEO (N.Q) (: UNIDADE)',				'measure'=>'UNIDADE', 	'data'=>  array(24276,108192,102147),		'type'=>'pie');
$param[]	=	 array('title'=>'MUPIROCINA MG (EUF) (: UNIDADE)',			'measure'=>'UNIDADE',	'data'=> array(24224,92742,160885),			'type'=>'pie');
$param[]	=	 array('title'=>'MUPIROCINA MG (PZ8) (: UNIDADE)',			'measure'=>'UNIDADE',	'data'=> array(39593,167059,123576),		'type'=>'pie');
$param[]	=	 array('title'=>'NEBACETIN (TAK) (: UNIDADE)',				'measure'=>'UNIDADE',	'data'=> array(753836,3043426,2409773),		'type'=>'pie');


$param[]	=	 array('title'=>'NEBACETIN (TAK) (: DOSE)',		'measure'=>'DOSE',		'data'=> array(15312940,62525905,48978995),	'type'=>'column');
$param[]	=	 array('title'=>'ALTARGO (STF) (: DOSE)',		'measure'=>'DOSE',		'data'=> array(70265,219975,111055),				'type'=>'column');
$param[]	=	 array('title'=>'BACTROBAN (GSK) (: DOSE)',		'measure'=>'DOSE',		'data'=> array(1025085,4577355,2180715),			'type'=>'column');
$param[]	=	 array('title'=>'BACTRONEO (N.Q) (: DOSE)',		'measure'=>'DOSE',		'data'=> array(364140,1622880,1532205),				'type'=>'column');
$param[]	=	 array('title'=>'MUPIROCINA MG (EUF) (: DOSE)',	'measure'=>'DOSE',		'data'=> array(363360,1391130,2413275),				'type'=>'column');
$param[]	=	 array('title'=>'MUPIROCINA MG (PZ8) (: DOSE)',	'measure'=>'DOSE',		'data'=> array(593895,2505885,1853640),				'type'=>'column');


*/
$grafico->setTitle('Average Monthly Weather Data for Tokyo');
$grafico->setSubTitle('Source: WorldClimate.com');

$grafico->setCategoryLegendaDown(array('2012', '2013', '2014'));
//$grafico->setCategoryLegendaDown(array(2012,2013,2014));

$grafico->setLegend(true);
$grafico->setPolar(false);

$grafico->setGaugeBand($_gauge_param);

//$grafico->setHeight(800);

echo $grafico->render($param);





?> 
