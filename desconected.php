<?php 
	
	$charset		=	 isset($_REQUEST['charset']) ? $_REQUEST['charset'] : 'POR';
	$file			=	'api'.DIRECTORY_SEPARATOR.'alphasoft'.DIRECTORY_SEPARATOR.'language'.DIRECTORY_SEPARATOR.$charset.'.lng';
	
	include_once 'config/configCommon.php';
	include $file;
	
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width">
<title><?php eLNG('DESCONECTED_TITLE');?></title>
<link rel="shortcut icon" href="./imagens/favico/favicon.ico" type="image/x-icon">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="css/desconected.css" />
<link type="text/css" rel="stylesheet" href="api/font-awesome-4.3.0/css/font-awesome.min.css?720336" />
<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js?442047"></script>

</head>
<body>
	<div class="header"><img style="height: auto; width: 100%; border: 0; max-width: 208px;" src="imagens/logo-wrs.png" ></div>
	<div class="container_center">
			<div class="container">
				<h1><strong><?php eLNG('DESCONECTED_TITLE');?></strong></h1>
				<p><?php eLNG('DESCONECTED_DESCRIPT');?></p>
				<p>
					<ul>
						<?php 
								foreach(LNG('DESCONECTED_REASONS') as $val)
								{
									echo '<li><i class="fa fa-info-circle"></i> '.$val.'</li>';
								}
						?>
					</ul>
				</p>
				<p class="textCenter">
					<a class="button" href="./"> <i class="fa fa-sign-out"></i> <?php eLNG('DESCONECTED_BUTTON');?></a>
				</p>
			</div>
	</div>
	
		<script>

		if($('#fakeloader').length>0)
		{
			SYSTEM_OFF=true;
			window.location='desconected.php?charset='+LNG('IDIOMA');
		}
	</script>
</body>
</html>