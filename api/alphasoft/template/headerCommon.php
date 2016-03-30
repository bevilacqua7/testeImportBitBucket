<!DOCTYPE dhtml>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br"> 
<HEAD>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php eLNG('TITLE'); ?></title>
<!--Importa JS-->



<?php 

	//  verificar quais scripts realmente fazem funcionar as modais de cadastro
	$_REQUEST[TAG_URL_CUBE_SELECTED]=0;
	$ATRIBUTOS_JSON=base64_encode('{}');
	$TAG_HEADER					=	'main';
	include_once(PATH_TEMPLATE.'scripts_ini.php');

?>


</HEAD>


<BODY onResize="" onLoad="">

<div id="fakeloader"></div><script type="text/javascript">$("#fakeloader").fakeLoader();</script>
 	