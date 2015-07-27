<?php
//Includes scripts jqGrid
//ini_set("display_errors","1");


/*
 * @link http://www.trirand.com/blog/phpjqgrid/examples/loading_data/array_data/default.php#PHPCode
 * @link http://www.guriddo.net/demo/jqgridphp/
 * @link http://www.trirand.net/documentation/php/_2v70w5c4u.htm
 * @link http://www.guriddo.net/demo/jqgridphp/loading_data/array_data_subgrid/default.php 
 * */


class WRS_DANTAS{

	
	public function __construct(){
//include_once('../dashboard/config.php');
require_once('../api/jqGrid/jq-config.php');
require_once('../api/jqGrid/php/jqGrid.php');

/*
 * Customização para AlphaSofth
 */
require_once('../api/jqGrid/php/jqGridArray.php');
 
// Create the jqGrid instance

// Create a random array data
$i=0;

//$data1[$i]['[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR]']    = 'Carregando...';

//for($i=0;$i<125;$i++){
	$data1[$i]['id']    = 'Carregando...';
	$data1[$i]['foo']   = 'Carregando...';
	$data1[$i]['bar']   = 'Carregando...';
	$data1[$i]['nomes']  = 'Carregando...';
	$data1[$i]['bars']   = 'Carregando...';
	$data1[$i]['nomess']  = 'Carregando...';
	$data1[$i]['bars']   = 'Carregando...';
	$data1[$i]['nomeas']  = 'Carregando...';
//}

	$gArray			=	new jqGridArray();
	$gArray->_wrs_column	=	$data1;
	$grid = new jqGridRender($gArray);

// Always you can use SELECT * FROM data1
//$grid->SelectCommand = "SELECT [PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR], foo, bar, nomes FROM data1 ";
$grid->SelectCommand = "SELECT * FROM data1 ";


$grid->dataType = 'json';
//$grid->setPrimaryKeyId('id');

$grid->setColModel();
// Enable navigator


//$grid->setColProperty("id"	, array("label"=>'DOLAR'));


//$grid->setColProperty("id", array("sorttype"=>"int"));



$grid->setGridOptions(array(
/*		'caption'=>'Dantas',*/
				"page" 			=> 1,
	 			"rowNum" 		=> 25,//$size_rows,
	 			'rows'			=>	10,
	 			"hidegrid" 		=> false,
	 			"hoverrows" 	=> true,
	 			"rownumbers" 	=> true,
	 			"rownumWidth" 	=> 35,
	 			"rowList" 		=> array (25,50,100,200,500 ),
	 			"shrinkToFit" 	=> false,
	 			"viewrecords" 	=> true,
	 			"gridview" 		=> true,
	 	//		"sortname" 		=> "[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR]",
				"sortname" 		=> "id",
	 			"sortorder" 	=> 'ASC',
	 			"mtype" 		=> 'POST',
	 			"jsonReader" 	=> '{root:"rows"}',
	 			"loadtext" 		=> 'Carregando...',
	 			"loadui"		=> 'block',
				"width"			=>700,
				"pager"			=>'#pager'
//		'recordtext'=>'oi'
	
));

$grid->callGridMethod("#grid", "setGroupHeaders", array(array(
		"useColSpanStyle"=>false,
		"groupHeaders"=>array(
				array(
						"startColumnName"=>'id',
						"numberOfColumns"=>3,
						"titleText"=>'ROW_NUMBER_INFO'
				)
		)
)));


$grid->setUrl('jqGridArrayRows.php?numRows=400');

//$grid->setColProperty("[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR]"		, array("label"=>'MERCADO',"frozen"=>true , 'wrs_data'=>array('LEVEL_FULL'=>'[MERCADO].[MERCADO]')));

$grid->callGridMethod('#grid', 'setFrozenColumns');

$grid->navigator = true;
// Enable search
$grid->setNavOptions('navigator', array("excel"=>true,"add"=>false,"edit"=>false,"del"=>false,"view"=>false,"csv"=>true, "pdf"=>true));
// Activate single search
$grid->setNavOptions('search',array("multipleSearch"=>false));
// Enjoy

$grid->renderGrid('#grid','#pager',true, null, null, true,true);


}
}



$d	= new WRS_DANTAS();


