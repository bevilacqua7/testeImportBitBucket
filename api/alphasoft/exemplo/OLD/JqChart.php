
<!DOCTYPE html> 
<html> 
  <head> 
    <style type="text"> 
        html, body { 
            margin: 0;            /* Remove body margin/padding */ 
            padding: 0; 
            overflow: hidden;    /* Remove scroll bars on browser window */ 
            font-size: 62.5%; 
        } 
        body { 
            font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif"; 
        } 
        #tags {z-index: 900} 
    </style> 
    <title>jqChart PHP Demo</title> 
    <link rel="stylesheet" type="text/css" media="screen" href="../css/theme-azul/jquery-ui-1.8.22.custom.css" /> 
    <script src="../js/jquery-1.8.2.min.js" type="text/javascript"></script> 
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <script src="../js/jqGrid/jquery.jqChart.min.js" type="text/javascript"></script> 
      
    <script src="../js/jquery-ui-1.8.21.custom.js" type="text/javascript"></script> 
	<script src="../api/alphasoft/js/php_js.js" type="text/javascript"></script> 
       
       <script type="text/javascript">

		function WrsJqGridDebug(event)
		{
			var string		=	'';

			for(var obj in event){
				if(empty(event[obj])) continue;
				
				string+=obj+'='+event[obj]+'|';
			}


			return string;
			
		}

       </script>
  </head> 
  <body> 
      <div> 
        <?php include ("JQchartClass.php");?> 
      </div> 
      <br/> 

   </body> 
</html> 