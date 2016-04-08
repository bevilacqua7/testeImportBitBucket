<?php
	$wrs_cookie = json_decode ( $_COOKIE ['WRS_LOGIN'], true );
?>

<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" class="full" xml:lang="pt-br" lang="pt-br">
<HEAD>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html;charset=utf-8;" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="shortcut icon" href="./imagens/favico/favicon.ico" type="image/x-icon">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
var NOT_CHECK_LOGIN	=	true;
</script>
<?php include_once 'config/configCommon.php';?>

<title><?php eLNG('LOGIN_HTML_TITLE'); ?></title>
<script>
	var SERVER_REQUEST_URI	=	'login';


	<?php 
	
		$recover		=	 fwrs_request('recover');
		$usecode		=	 fwrs_request('usercode');
	
	?>
	var RECOVER='<?php echo $recover;?>';
	var USER_CODE='<?php echo $usecode;?>';
</script>

<?php 
	
	

	
	includeCLASS('HeaderTag');
	$HeaderTag		=	 new HeaderTag();
	echo $HeaderTag->header('login');

?>
<!-- Bootstrap core CSS -->


<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="api/bootstrap-3.3.0/assets/js/ie-emulation-modes-warning.js"></script>


 



 

</HEAD>

<BODY style="margin-top: 0px;">
<div id="fakeloader"></div><script type="text/javascript">$("#fakeloader").fakeLoader();</script>
 
	<div class="container">

		<img class="wrs_logo_left" style="margin-left: 5px;"
			src="imagens/logo-wrs.png" width="130" height="60" /> <img
			class="wrs_logo_right" src="imagens/logo-ims.png" width="140"
			height="40" />

		<form class="form-signin" role="form">
		
			<h2 class="form-signin-heading"><?php eLNG('LOGIN_TITLE');?></h2>
			<div class="sub_container">
			
				
				<input type="text" id="user" name="user" class="form-control"
					placeholder="<?php eLNG('LOGIN_USER_SYSTEM');?>"
					value="<?php echo $wrs_cookie['LAST_USER']['user']; ?>" required
					autofocus> <input type="password" id="password" name="password"
					class="form-control" placeholder="<?php eLNG('LOGIN_PASSWORD');?>"
					value="<?php echo $wrs_cookie['LAST_USER']['pwd']; ?>" required>
					<input type="text" id="user_remote" name="user_remote" class="form-control"
					placeholder="Perfil">

				<div class="new_password"></div>
				<div class="mensagens" style="margin-top: 10px;">
					<?php 
						$msg	=	 fwrs_request('msg');
						if(!empty($msg)) echo fwrs_success(LNG($msg));
						
					?>
				</div>
				
				
				<div class="checkbox">
					
					<label><input
						<?php if(!empty($wrs_cookie['LAST_USER']['pwd'])){echo "checked='checked'";} ?>
						type="checkbox" name="chk_lembrar" id="chk_lembrar" value="1">
						<?php eLNG('LOGIN_ARMAZENA');?></label>
					<label id="label_chk_remote">
					
					<input
						<?php if(!empty($wrs_cookie['LAST_USER']['remote'])){echo "checked='checked'";} ?>
						type="checkbox" name="chk_remote" id="chk_remote" value="1">
						<?php eLNG('LOGIN_OTHER_PERFIL');?>
						
						</label>
				</div>


				<div class="row container wrs_info" style="padding: 0px">
					<div style="padding-right: 0px;" class="col-md-1 list_user">
						<span class="glyphicon glyphicon-user"></span> <?php eLNG('LOGIN_USER');?>
					</div>
					<div class="col-md-1 remove_user"
						style="text-align: center; width: 144px">
						<span class="glyphicon glyphicon-trash"></span> <?php eLNG('LOGIN_REMOVE');?>
					</div>
					<div class="col-md-2 recover_password"
						style="text-align: left; padding: 0px">
						<span class="glyphicon glyphicon-send"></span> <?php eLNG('LOGIN_PASSWORD_RECOVER');?> 
					</div>
				</div>

				<div class="container-user">
					<h4><?php eLNG('LOGIN_HISTORY');?></h4>
						<div class="ulUser">
							<ul class="list-user">
					<?php
					
					$count = 0;
					foreach ( $wrs_cookie as $user => $value ) 
					{
						
						if ($user == 'LAST_USER') continue;
						
						$color = (($count ++) % 2 == 0) ? '#EEE9E9' : '#FFFFFF';
						
						$HTML	=	<<<HTML
													<li style='background:{$color}'>
																	<div class='wrs_click_user' user='{$user}' pwd='{$value['pwd']}' >{$user}</div>
																	<div  user='{$user}' pwd='{$value['pwd']}' class='wrs_remove_user_temp  glyphicon glyphicon-remove pull-right' ></div>
													</li>

HTML;
						
						echo $HTML;

					}
					?> 
							</ul>
						</div>
				</div>
				

				<button class="btn btn-lg btn-primary btn-block wrs_login" type="button"> <?php eLNG('LOGIN_BUTTON');?> </button>
				
		</form>
	</div>
	</div>
	<!-- /container -->

	<script>

	<?php 
	
		if(!empty($recover))
		{
			echo '$(function(){wrs_login_recover()});';
		}
	?>
	</script>
 
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script	src="api/bootstrap-3.3.0/assets/js/ie10-viewport-bug-workaround.js"></script>

</BODY>
</HTML>