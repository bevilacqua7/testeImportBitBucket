<!DOCTYPE html>
<html>
<head>
    <title>Binding to remote data</title>
    <meta charset="utf-8">
    <link href="../../telerikUi/styles/kendo.common.min.css" rel="stylesheet">
    <link href="../../telerikUi/styles/kendo.rtl.min.css" rel="stylesheet">
    <link href="../../telerikUi/styles/kendo.default.min.css" rel="stylesheet">
    <link href="../../telerikUi/styles/kendo.dataviz.min.css" rel="stylesheet">
    <link href="../../telerikUi/styles/kendo.dataviz.default.min.css" rel="stylesheet">
	
	<script src="../../telerikUi/js/jquery.min.js"></script>
 	<script src="../../telerikUi/js/angular.min.js"></script>
 	
    <script src="../../telerikUi/js/kendo.all.min.js"></script>
    
    <script src="../../telerikUi/examples/content/shared/js/console.js"></script>
    
    
	<script src="../../telerikUi/js/messages/kendo.messages.pt-BR.min.js"></script>
	
	<script src="../../telerikUi/js/jszip.min.js"></script>
	
    
    
</head>
<body>
    
    
    

        <div id="example" class="wrs_grid" style="height:400px">
            
            
            
<?php 

	include '../lib/class/lib.TelerikUi.php';


	$TelerikUi	= new TelerikUi();


?>

<script>

  
                function onDataBound(arg)
				{
					//Frozen Header
					//arg.sender.columns[0].columns
					
					//Not Frozen Header
					//arg.sender.columns[1].columns
					//Resultados
					//arg.sender.dataSource._view[0].fields -- Totas as colunas
					//arg.sender.dataSource._view.length -- TOTAL
					//arg.sender.dataSource._view[1]['ShipName'] -- Resultado por linja
					
                	var idName	=	arg.sender._cellId.replace('_active_cell','')  ;

				}

            

function format_number(data)
{
	return format_string(data);
}

function format_string(data)
{
	
//	alert(data)
	for(obj in ds)
	{
		$('body').prepend(obj+':;'+ds[obj]+'<br><br>');
	}
//$('body').prepend(data.ss+'<br><br>');
	
	return '[['+data+']]';
}

</script>

<?php 


$param	=	 array();
/*
$param['ROW_NUMBER'] 	= array('LEVEL_NAME'=>'' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[MERCADO].[MERCADO].[MERCADO].[MEMBER_CAPTION]'] 	= array('LEVEL_NAME'=>'MERCADO' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[MES].[MES].[MEMBER_CAPTION]'] 	= array('LEVEL_NAME'=>'MES' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'DOLAR' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
	*/
/*
$param['ROW_NUMBER'] 	= array('LEVEL_NAME'=>'' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[MERCADO].[MERCADO].[MERCADO].[MEMBER_CAPTION]'] 	= array('LEVEL_NAME'=>'MERCADO' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[MES].[MES].[MEMBER_CAPTION]'] 	= array('LEVEL_NAME'=>'MES' 		, 'LEVEL_VALUE'=>'' , 'MEASURE'=>'' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2010].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2010' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2011].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2011' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2012].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2012' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2013].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2013' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2014].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2014' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');
$param['[PERIODO].[ANO].&[2015].[Measures].[DOLAR]'] 	= array('LEVEL_NAME'=>'ANO' 		, 'LEVEL_VALUE'=>'2015' , 'MEASURE'=>'DOLAR' , 'FORMAT_STRING'=>'' , 'SPAN'=>'1');*/

			

$param	=	 array();


include dirname(__DIR__).'\var\header.php';

$TelerikUi->setPageSize(25);
$TelerikUi->setRequestJson('php.php');
$TelerikUi->setHeaderColumnWRS($param);
$TelerikUi->setToolbarExcel('excel', 'Exportar', 'php.sp');
$TelerikUi->setToolbarPDF('pdf', 'pdf', 'file.php');
$TelerikUi->setId('wrsGrid');
echo $TelerikUi->render();

?> 


		
    
    <!--  PARA EXCEL -->





<style>
    #wrsGrid
      {
        margin: 0;
        padding: 0;
        border-width: 0;
        height: 100%;
      }
</style>
</body>
</html>
