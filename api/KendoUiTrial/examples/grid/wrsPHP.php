<!DOCTYPE html>
<html>
<head>
    <title>Binding to remote data</title>
    <meta charset="utf-8">
    <link href="../content/shared/styles/examples-offline.css" rel="stylesheet">
    <link href="../../styles/kendo.common.min.css" rel="stylesheet">
    <link href="../../styles/kendo.rtl.min.css" rel="stylesheet">
    <link href="../../styles/kendo.default.min.css" rel="stylesheet">
    <link href="../../styles/kendo.dataviz.min.css" rel="stylesheet">
    <link href="../../styles/kendo.dataviz.default.min.css" rel="stylesheet">
	
	
	
    <script src="../../js/jquery.min.js"></script>
	 <script src="../../js/angular.min.js"></script>
	 
	 
    
	
    <script src="../../js/kendo.all.min.js"></script>
    <script src="../content/shared/js/console.js"></script>
	<script src="../../js/messages/kendo.messages.pt-BR.min.js"></script>
    <script>
        
    </script>
    
    
</head>
<body>

        <div id="example" class="wrs_grid" style="height:400px">
            <div id="wrsGrid"></div>
 <?php 
 
 


$HEADER		=	array();



$column		=	 array();
$column[]	=array("field"=>"OrderID","title"=>"Order ID","width"=>200);
$column[]	=array("field"=>"Freight","title"=>"Freight 012","width"=>200);
$column[]	=array("field"=>"OrderDate","title"=>"OrderDate","width"=>200);
$HEADER['columns'][0]	= array("title"=>"Frozen Header","locked"=>false,"columns"=>$column);

$column		=	 array();
$column[]	=array("field"=>'_3',"title"=>'2',"width"=>260);

$HEADER['columns'][1]	= array("title"=>"Exemplo Grupo","columns"=>$column);


$column		=	 array();
$column[]	=array("field"=>"ShipCity","title"=>"Ship City","width"=>300);

$HEADER['columns'][2]	= array("title"=>"Exemplo CID","columns"=>$column);



$HEADER['resizable']	=	true;
$HEADER['scrollable']	=	true;
$HEADER['sortable']	=	true;


$HEADER['dataSource']['transport']['read']['url']			=	'wrs.php?type=SS';
$HEADER['dataSource']['transport']['read']['contentType']	=	'application/json';
$HEADER['dataSource']['transport']['read']['type']			=	'POST';
$HEADER['dataSource']['transport']['parameterMap']			=	'function(data) {return kendo.stringify(data);}';
																		   
$HEADER['dataSource']['pageSize']			=	30;
$HEADER['dataSource']['schema']['data']		=	'data';
$HEADER['dataSource']['schema']['total']	=	'total';
$HEADER['dataSource']['serverSorting']		=	true;
$HEADER['dataSource']['serverPaging']		=	true;

$HEADER['dataSource']['schema']['model']['fields']	= array();
$HEADER['dataSource']['schema']['model']['fields'][]	= array("field"=>'_3',"type"=>"string");
$HEADER['dataSource']['schema']['model']['fields'][]	= array("field"=>"Freight","type"=>"string");
$HEADER['dataSource']['schema']['model']['fields'][]	= array("field"=>"OrderID","type"=>"string");
$HEADER['dataSource']['schema']['model']['fields'][]	= array("field"=>"ShipCity","type"=>"string");
$HEADER['dataSource']['schema']['model']['fields'][]	= array("field"=>"OrderDate","type"=>"string");



/*
print_r($HEADER);
exit();*/
/*

$HEADER['toolbar']		=	array();
$HEADER['toolbar'][]	=	array("name"=>"excel");
$HEADER['toolbar'][]	=	array("name"=>"pdf");


$HEADER['excel'][]	=	array("fileName"=>"WRSEXCEL.xlsx","filterable"=>true,"proxyURL"=>"wrs.php?type=save");
$HEADER['pdf'][]	=	array("fileName"=>"PDF.pdf","allPages"=>true,"proxyURL"=>"wrs.php?type=save");

*/

$HEADER['pageable']		= array(
															"refresh"=> true,
															"pageSizes"=> array(30,50,90),
															"input"=>true,
															"numeric"=>false);
 
 
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

            

				
function dsData(data,ds)
{
	
//	alert(data)
	for(obj in ds)
	{
		$('body').prepend(obj+':;'+ds[obj]+'<br><br>');
	}
//$('body').prepend(data.ss+'<br><br>');
	
	return '[['+data+']]';
}

		$(function()
					{

								var jsonDecode	=	<?php echo json_encode($HEADER,true);?>;


								 var jsonDecode	=	{
														"columns":
																	[
																		{
																			"locked":false,
																			"title":"Novo Teste",
																			"width":200,
																			columns: [
																			
																					{
																					"locked":false,
																			"field":"[MERCADO][DOT][MERCADO][DOT][MERCADO][DOT][MEMBER_CAPTION]",
																			"title":"Novo Testesss",
																			"width":200
																					},
																					{
																					"locked":false,
																			"field":"[MERCADO][DOT][MERCADO][DOT][MERCADO][DOT][MEMBER_CAPTION]s",
																			"title":"Novo Tstesss",
																			"width":200
																					}
																			]
																							
																						
																			}],
														"resizable":true,
														"scrollable":true,
														"sortable":true,
														"dataSource":
																			{
																				"transport":
																							{"read":
																										{
																											"url":"wrs.php?type=SS","contentType":"application\/json","type":"POST"
																										},"parameterMap":"function(data) {return kendo.stringify(data);}"},"pageSize":30,
													"schema":{
																	"data":"data",
																	"total":"total",
																	"model":
																				{
																					"fields":
																								[
																									{"field":"[MERCADO][DOT][MERCADO][DOT][MERCADO][DOT][MEMBER_CAPTION]","type":"string"}
																								]
																				}
															},"serverSorting":true,"serverPaging":true},"pageable":{"refresh":true,"pageSizes":[30,50,90],"input":true,"numeric":false}
								 };
								
								

								
								jsonDecode.dataSource.transport.parameterMap			=	function(data) {return kendo.stringify(data);}
								
								$("#wrsGrid").kendoGrid(jsonDecode);
					});
		  
		  
		  </script>
    
    <!--  PARA EXCEL -->
<script src="../../js/jszip.min.js"></script>


 

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
