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
			
			
 <?PHP
 
 $file	=	 dirname(dirname(dirname(__DIR__))).DIRECTORY_SEPARATOR.'alphasoft'.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'class'.DIRECTORY_SEPARATOR.'lib.TelerikUi.php';

 include_once($file);

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

 
 <?php 

$TelerikUi	= new TelerikUi();
$TelerikUi->setPageSize(30);
$TelerikUi->setRequestJson('php.php');
$TelerikUi->setHeaderColumnWRS(NULL);
echo $TelerikUi->render();

?> 

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
