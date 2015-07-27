<?php
//Includes scripts jqGrid
ini_set("display_errors","1");


/*
 * @link http://www.guriddo.net/demo/jqgridphp/
 * */
include_once('../dashboard/config.php');
require_once('../jqGrid/jq-config.php');
require_once('../jqGrid/php/jqGrid.php');
require_once('../jqGrid/php/jqGridSqlSrv.php');



 

$grid = new jqGridRender($conn_wrs);
//$grid = new jqGridRender();
//$grid = new jqGridRender($conn_wrs);
//$grid->SelectCommand 	= 'SELECT COUNT(*)  FROM [MDX_MFACIOLI_42056569178317899FS]  ';
$grid->SelectCommand 	= 'SELECT * FROM [MDX_MFACIOLI_42077578813618828FS]';
$grid->dataType 		= 'json';
$grid->setColModel();

//$grid->setPrimaryKeyId('ROW_NUMBER');
$grid->setUrl('jqGridSQL.php');
$grid->setGridOptions(array(
//				"caption" 		=> "NOVO EXEMPLO",
	 			"page" 			=> 1,
	 			"rowNum" 		=> 10,//$size_rows,
	 			"hidegrid" 		=> false,
	 			"hoverrows" 	=> true,
	 			"rownumbers" 	=> true,
	 			"rownumWidth" 	=> 35,
	 			"rowList" 		=> array (25,50,100,200,500 ),
	 			"shrinkToFit" 	=> false,
	 			"viewrecords" 	=> true,
	 			"gridview" 		=> true,
	 			"sortname" 		=> "ROW_NUMBER",
	 			"sortorder" 	=> 'ASC',
	 			"mtype" 		=> 'GET',
	 			"jsonReader" 	=> '{root:"rows"}',
	 			"loadtext" 		=> 'Carregando...',
	 			"loadui"		=> 'block',
				"width"=>700,
				"pager"=>'#pager'
		
));

//Frozem

$grid->setColProperty("[MERCADO].[MERCADO].[MERCADO].[MEMBER_CAPTION]"								, array("label"=>'MERCADO',"frozen"=>true , "formatter"=>"js:formatString", 'wrs_data'=>array('LEVEL_FULL'=>'[MERCADO].[MERCADO]')));
$grid->setColProperty("[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR]"	, array("label"=>'DOLARSS',"hidden"=>false));
$grid->setColProperty("[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201101].[Measures].[DOLAR]"	, array("label"=>'DOLAR'));
$grid->setColProperty("[PERIODO].[ANO].&[2011].[PERIODO].[SEMESTRE].&[201101].[Measures].[DOLAR]"	, array("label"=>'DOLAR'));
$grid->setColProperty("[PERIODO].[ANO].&[2011].[PERIODO].[SEMESTRE].&[201107].[Measures].[DOLAR]"	, array("label"=>'DOLAR'));
$grid->setColProperty("[PERIODO].[ANO].&[2011].[PERIODO].[SEMESTRE].&[201201].[Measures].[DOLAR]"	, array("label"=>'DOLAR'));
$grid->setColProperty("[PERIODO].[ANO].&[2012].[PERIODO].[SEMESTRE].&[201201].[Measures].[DOLAR]"	, array("label"=>'Title'));
$grid->setColProperty("[PERIODO].[ANO].&[2012].[PERIODO].[SEMESTRE].&[201207].[Measures].[DOLAR]"	, array("label"=>'PRIVATE HOSPITAL'));
$grid->setColProperty("[PERIODO].[ANO].&[2012].[PERIODO].[SEMESTRE].&[201301].[Measures].[DOLAR]"	, array("label"=>'PUBLIC HOSPITAL'));
$grid->setColProperty("[PERIODO].[ANO].&[2013].[PERIODO].[SEMESTRE].&[201301].[Measures].[DOLAR]"	, array("label"=>'TENDER'));


$grid->setColProperty("[PERIODO].[ANO].&[2013].[PERIODO].[SEMESTRE].&[201307].[Measures].[DOLAR]"	, array("label"=>'TENDER'));
$grid->setColProperty("[PERIODO].[ANO].&[2013].[PERIODO].[SEMESTRE].&[201401].[Measures].[DOLAR]"	, array("label"=>'TENDER'));
$grid->setColProperty("[PERIODO].[ANO].&[2014].[PERIODO].[SEMESTRE].&[201401].[Measures].[DOLAR]"	, array("label"=>'TENDER'));
$grid->setColProperty("[PERIODO].[ANO].&[2014].[PERIODO].[SEMESTRE].&[201407].[Measures].[DOLAR]"	, array("label"=>'TENDER'));
$grid->setColProperty("[PERIODO].[ANO].&[2014].[PERIODO].[SEMESTRE].&[201501].[Measures].[DOLAR]"					, array("label"=>'TENDER'));
$grid->setColProperty("[PERIODO].[ANO].&[2015].[PERIODO].[SEMESTRE].&[201501].[Measures].[DOLAR]"					, array("label"=>'TENDER'));






$format_cells = <<<FORMAT_CELLS
function formatString(cellValue, options, rowObject) 
{
		//options.colModel['frozen']
		return '<div class="ui-state-default cellWithoutBackgroundFiltro" ATIBUTO="'+options.colModel['wrs_data']['LEVEL_FULL']+'" VALUE="'+options.colModel['wrs_data']['LEVEL_FULL']+'.['+cellValue+']">'+cellValue+'</div>';
}
FORMAT_CELLS;
$grid->setJSCode($format_cells);

//para esconder campos


$grid->callGridMethod("#grid", "setGroupHeaders", array(array(
		"useColSpanStyle"=>false,
		"groupHeaders"=>array(
				array(
						"startColumnName"=>'ROW_NUMBER',
						"numberOfColumns"=>3,
						"titleText"=>'ROW_NUMBER_INFO'
				),
				array(
						"startColumnName"=>'[GEOGRAFIA].[BRICK].[BRICK].[MEMBER_CAPTION]',
						"numberOfColumns"=>3,
						"titleText"=>'Dose Info'
				)
		)
)));


/*


$grid->callGridMethod("#grid", "setGroupHeaders", array(array(
		"useColSpanStyle"=>false,
		"groupHeaders"=>array(
				array(
						"startColumnName"=>'ROW_NUMBER',
						"numberOfColumns"=>3,
						"titleText"=>'ROW_NUMBER_INFO'
				),
				array(
						"startColumnName"=>'[GEOGRAFIA].[BRICK].[BRICK].[MEMBER_CAPTION]',
						"numberOfColumns"=>3,
						"titleText"=>'Dose Info'
				)
		)
)));


$grid->callGridMethod("#grid", "setGroupHeaders", array(array(
		"useColSpanStyle"=>false,
		"groupHeaders"=>array(
				array(
						"startColumnName"=>'ROW_NUMBER',
						"numberOfColumns"=>1,
						"titleText"=>'detalhes'
				),
				array(
						"startColumnName"=>'[GEOGRAFIA].[BRICK].[BRICK].[MEMBER_CAPTION]',
						"numberOfColumns"=>1,
						"titleText"=>'Detalhes'
				)
		)
)));
*/


$grid->navigator = true;

$grid->setNavOptions('navigator', array("excel"=>false,"add"=>false,"edit"=>false,"del"=>false,"view"=>false));

 
//$grid->toolbarfilter = true;

$grid->callGridMethod('#grid', 'setFrozenColumns');
$grid->renderGrid('#grid','#pager',true, null, null, true,true);




