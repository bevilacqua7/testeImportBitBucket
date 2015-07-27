<!DOCTYPE dhtml>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br"> 
<HEAD>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WRS - Web Report System</title>
<!--Importa JS-->



		
		
<script type="text/javascript" src="./js/jquery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="./<?php echo JS_PATH_API;?>php_js.js?<?php echo WRS_TEMP_RAND;?>"></script>
<script type="text/javascript" src="./language_javascript.php?<?php echo WRS_TEMP_RAND;?>"></script>
<script type="text/javascript" src="./<?php echo JS_PATH_API;?>common.js?<?php echo WRS_TEMP_RAND;?>"></script>

<link href="./api/bootstrap-3.3.0/dist/css/bootstrap-wrs.css?v=1.0 " rel="stylesheet">
<link href="./api/bootstrap-3.3.0/dist/css/bootstrap-theme.min.css?v=1.0 " rel="stylesheet">

<link rel="stylesheet" href="api/fakeLoader/fakeLoader.css">
  <script type="text/javascript" src="api/fakeLoader/fakeLoader.js"></script>
  
<link href="./css/wrs_config.css?v=0.0.1 " rel="stylesheet">

<!-- TODO:: Colocar o gerenciamneto na tela -->
<link rel="stylesheet" type="text/css" href="./css/<?php echo WRS::INFO_SSAS_LOGIN('USER_FORMAT')?>/jquery-ui-1.8.22.custom.css?v=1.0" id="themeHost"  host="./css/{host}/jquery-ui-1.8.22.custom.css?v=1.0"  />


<?php 

	if(wrs_get_user_browser()=='ie'){
		echo '<link rel="stylesheet" type="text/css" href="./css/wrs_ie.css?'.rand(0,999999).'" />';
	}
	
	if(wrs_get_user_browser()=='firefox'){
		echo '<link rel="stylesheet" type="text/css" href="./css/wrs_firefox.css?'.rand(0,999999).'" />';
	}
?>

</HEAD>
<BODY onResize="" onLoad="">


<div id="fakeloader"></div><script type="text/javascript">$("#fakeloader").fakeLoader();</script>
 	