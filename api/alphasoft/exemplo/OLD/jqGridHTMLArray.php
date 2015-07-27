<?php 

 
//http://www.guriddo.net/demo/jqgridphp/
?>
<!DOCTYPE html>
<html>
  <head>
    <title>jqGrid PHP Demo</title>
    
     <link rel="stylesheet" type="text/css" media="screen" href="../css/theme-azul/jquery-ui-1.8.22.custom.css" /> 
    <script src="../js/jquery-1.8.2.min.js" type="text/javascript"></script> 
	
	
	
	
    <link rel="stylesheet" type="text/css" media="screen" href="../api/jqGrid/css/ui.jqgrid.css" />
	 <style>
        html, body {
	        margin: 50px;            /* Remove body margin/padding */
	        padding: 0;
	        overflow: hidden;    /* Remove scroll bars on browser window */
	        font-size: 75%;
        }
        
    </style>
    
    
    <script src="../js/jqGrid/i18n/grid.locale-pt.js" type="text/javascript"></script>

    <script src="../api/jqGrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.8.21.custom.js" type="text/javascript"></script> 
    
  
    
  </head>
  <body>
  <div ><?php 
  
  				include_once(__DIR__.DIRECTORY_SEPARATOR."jqGridArray.php");
  				//include 'jqGridArrayInside.php';
  ?></div>
  
  <script>

  	$(function(){
  		$('#grid_frozen').find('tr').each(function(){
  	  		$(this).addClass('ui-widget-content jqgrow ui-row-ltr dantas');
  	  		$(this).html('Dantas');
  	  	});

  		
  	})
  </script>
   </body>
</html>