<html>

  <head>
    <head>

    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">


    <script type="text/javascript" src="jquery-2.1.3.min.js"></script>
    

    <meta charset="utf-8">

    <title>Complex icons</title>

    <style>

      html, body, .msdMaps {

        height: 400px;
        margin: 0px;

        padding: 0px

      }

    </style>
    
    
  <?php 

  include_once('../api/alphasoft/lib/class/lib.GOOGLE_MAPS.php');
  $wrsMaps	=	 new GOOGLE_MAPS();
  echo $wrsMaps->getScriptHeader();
  echo $wrsMaps->scriptMarkersGoogleMaps();
  
  ?>
  </head>
  <body>
<?php 


$wrsMaps->setIDDiv('divID');
$wrsMaps->setBeaches('Bondi Beach',-33.890542,151.274856,'<h1>Title Bondi</h1> Novo mundo');
$wrsMaps->setBeaches('Coogee Beach',-33.923036,151.259052,'Title Coogee ');
$wrsMaps->setBeaches('Cronulla Beach',-34.028249,151.157507,'Title Cronulla ');
$wrsMaps->setBeaches('Manly Beach',-33.80010128657071,151.28747820854187,'Title Manly ');
$wrsMaps->setBeaches('Maroubra Beach',-33.950198,151.259302,'Title Maroubra ','PINK3.png');

//$wrsMaps->setBeachesFull($_beaches)
echo $wrsMaps->render();


//EXEC Get_SSAS_Attribute_Address '192.168.1.3','ALPHASOFT\automacao','auto!@#123','GSK - DDD CHANNEL','GSK - DDD CHANNEL','[GEOGRAFIA].[BRICK]','0437 - S.JERONIMO'



?>
<button class="btnRescizeMaps">RESCIZE</button>

<Script>
$(function(){

	$('.btnRescizeMaps').click(function(){
		$('#divID').width(200);
		divID_initialize();
	});
});
</Script>
</body></html>