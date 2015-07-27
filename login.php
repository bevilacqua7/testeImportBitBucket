<?php
$wrs_cookie = json_decode ( $_COOKIE ['WRS_LOGIN'], true );

// var_dump($wrs_cookie);
// exit();
?>
<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">
<HEAD>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html;charset=utf-8;" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>WRS - Web Report System</title>



<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
<script type="text/javascript"
	src="./api/alphasoft/js/php_js.js?<?php echo rand(0,99999);?>"></script>
<script type="text/javascript" src="language_javascript.php"></script>
<script type="text/javascript"
	src="./api/alphasoft/js/common.js?<?php echo rand(0,99999);?>"></script>
<!-- Bootstrap core CSS -->
<link href="api/bootstrap-3.3.0/dist/css/bootstrap.min.css?v=1.0 "
	rel="stylesheet">

<!-- Custom styles for this template -->
<link href="api/bootstrap-3.3.0/signin.css?v=1.0 " rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script
	src="api/bootstrap-3.3.0/assets/js/ie-emulation-modes-warning.js"></script>

<!--Importa CSS-->
<style type="text/css">
<!--
body {
	background-image: url(imagens/bg.jpg);
	background-repeat: repeat-x;
	text-align: center;
}
-->
</style>

<style type="text/css">
body {
	margin: 0px;
	background-image: url(imagens/wrs_background.jpg);
	background-repeat: no-repeat;
	text-align: center;
	background-size: 100% auto;
	background-position: top center;
	background-color: #BADAFF;
	filter: progid:DXImageTransform.Microsoft.AlphaImageLoader( 
src='imagens/wrs_background.jpg', sizingMethod='scale');
	-ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader( 
src='imagens/wrs_background.jpg', sizingMethod='scale')";
}

.wrs_logo_left, .wrs_logo_right {
	position: fixed;
	top: 30px;
	display: block;
}

.wrs_logo_left {
	left: 40PX;
}

.wrs_logo_right {
	top: 40px;
	right: 40px !important;
}

.wrs_remove_user_temp {
	color: red;
	margin: 3px 2px;
}
</style>



<script type="text/javascript">

function WRS_RESIZE()
{
		var width	=	 $(window).width();
		var height	=	 $(window).height();
		
		if(width<=800){
			$('BODY').css('background-size','auto 100%');
		}else{
			$('BODY').css('background-size','100% auto');
		}


		$('body').width(width);
		$('body').height(height);
		
		var posX	=	($(window).width()/2)-(($('.form-signin').width()+50)/2);
		
		//var posX	=	height/2;
		var pos	=	($(window).height()/2)-(($('.form-signin').height()+50)/2);
		
		$('.form-signin').css('top',pos);

		$('.form-signin').css('left',posX);
			
}

$( window ).resize(WRS_RESIZE);
$(function(){ WRS_RESIZE();});
</script>

</HEAD>

<BODY style="margin-top: 0px;">

	<div class="container">

		<img class="wrs_logo_left" style="margin-left: 5px;"
			src="imagens/logo-wrs.png" width="130" height="60" /> <img
			class="wrs_logo_right" src="imagens/logo-ims.png" width="140"
			height="40" />

		<form class="form-signin" role="form">
			<h2 class="form-signin-heading">System Access</h2>
			<div class="sub_container">
				<input type="text" id="user" name="user" class="form-control"
					placeholder="Username"
					value="<?php echo $wrs_cookie['LAST_USER']['user']; ?>" required
					autofocus> <input type="password" id="password" name="password"
					class="form-control" placeholder="Password"
					value="<?php echo $wrs_cookie['LAST_USER']['pwd']; ?>" required>

				<div class="checkbox">
					<div class="mensagens"></div>
					<label><input
						<?php if(!empty($wrs_cookie['LAST_USER']['pwd'])){echo "checked='checked'";} ?>
						type="checkbox" name="chk_lembrar" id="chk_lembrar" value="1">
						Armazenar dados de Usuário ?</label>
				</div>


				<div class="row container wrs_info" style="padding: 0px">
					<div style="padding-right: 0px;" class="col-md-1 list_user">
						<span class="glyphicon glyphicon-user"></span> Usuários
					</div>
					<div class="col-md-1 remove_user"
						style="text-align: center; width: 144px">
						<span class="glyphicon glyphicon-trash"></span> Remover
					</div>
					<div class="col-md-2 recover_password"
						style="text-align: left; padding: 0px">
						<span class="glyphicon glyphicon-send"></span> Recuperar Senha
					</div>
				</div>

				<div class="container-user">
					<h4>Histórico de Usuários</h4>
					<div class="ulUser">
						<ul class="list-user">
					<?php
					
					$count = 0;
					foreach ( $wrs_cookie as $user => $value ) {
						if ($user == 'LAST_USER')
							continue;
						$color = (($count ++) % 2 == 0) ? '#EEE9E9' : '#FFFFFF';
						echo "<li style='background:" . $color . "'><span class='wrs_click_user' user='" . $user . "' pwd='" . $value ['pwd'] . "' > " . $user . "</span> <span  user='" . $user . "' pwd='" . $value ['pwd'] . "' class='wrs_remove_user_temp  glyphicon glyphicon-remove pull-right'  ></span> </li>";
					}
					?> 
				</ul>
					</div>
				</div>

				<button class="btn btn-lg btn-primary btn-block wrs_login"
					type="button">Login</button>
		
		</form>
	</div>
	</div>
	<!-- /container -->


	<script type="text/javascript">

function valida_usuario()
{
	wrsCheckLogin($('#user').val(), $('#password').val(),'login');
}

function wrs_click_user()
{
	var login =	 $(this).attr('user');
	var pwd =	 $(this).attr('pwd');

	$('#user').val(login);
	$('#password').val(pwd);
}

function wrs_remove_user_temp()
{
	var getUser	=	$(this).attr('user');
	var confirm	=	 window.confirm('Tem certeza que deseja remover o usuário do histórico de acesso?');


	if(confirm){
		$(this).parent().remove();
		wrsCheckLogin(getUser, '','remove');
		
	}
	
}

$(function(){


	//By Marcelo Santos
	$('.wrs_remove_user_temp').click(wrs_remove_user_temp);

	$('.wrs_click_user').click(wrs_click_user);

	$('.remove_user').click(function(){});
	$('.wrs_login').click(function(){
		valida_usuario();
	});


	$('.container-user').css('visibility','visible');
	$('.container-user').css('display','block');
	$('.container-user').toggle();
	
	$('.list_user').click(function(){
		$('.container-user').toggle('show');
	})
	
	$('.remove_user').click(function(){
		limpaCookies();
	});

	$('.recover_password').click(function(){
		enviaEmailSenha($('#user').val());
	})
	
	$( "#user,#password" ).keypress(function( event ) {
		  if ( event.which == 13 ) {			  
			  valida_usuario();
		  }
		 
		});
	
});
</script>
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script
		src="api/bootstrap-3.3.0/assets/js/ie10-viewport-bug-workaround.js"></script>

</BODY>
</HTML>