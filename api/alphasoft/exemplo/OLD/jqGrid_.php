<?php
//Includes scripts jqGrid
require_once('../jqGrid/jq-config.php');
require_once('../jqGrid/php/jqGrid.php');
require_once('../jqGrid/php/jqGridPdo.php');



include_once('../dashboard/config.php');


// Instancia o jqGrid
$grid = new jqGridRender($conn_wrs);


// Query SQL
$grid->SelectCommand = 'SELECT * FROM [MDX_MFACIOLI_42053640703472222FS]';

// Seta o output para json...
$grid->dataType = 'json';


$grid->setColModel();

// Seta a url que serão obtidos os dados
$grid->setUrl('jqGrid.php');

//Algumas propriedades da grid setadas...
$grid->setGridOptions(array(
    "rowNum"=>10,
    "sortname"=>"ROW_NUMBER",
    "rowList"=>array(10,20,50),
    "height"=>'auto'
));

// Algumas propriedades da GRID sendo alteradas, por exemplo, formatos
$grid->setColProperty("ID", array("label"=>"ID", "width"=>60));
$grid->setColProperty("Data", array(
    "formatter"=>"date",
    "formatoptions"=>array("srcformat"=>"Y-m-d H:i:s","newformat"=>"m/d/Y")
    )
);

// Agrupando os cabecalhos...
$grid->callGridMethod("#grid", "setGroupHeaders", array(array(
    "useColSpanStyle"=>true,
    "groupHeaders"=>array(
        array(
            "startColumnName"=>'ID', 
            "numberOfColumns"=>2, 
            "titleText"=>'Info'
        ),
        array(
            "startColumnName"=>'Nome', 
            "numberOfColumns"=>3, 
            "titleText"=>'Detalhes'
        )
    )
)));

//Renderizando a grid..
$grid->renderGrid('#grid','#pager',true, null, null, true,true);

