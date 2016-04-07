
var form_data	=	{};
function WRS_RESIZE()
{
		var width	=	 $(window).width();
		var height	=	 $(window).height();
		
		if(width<=800){
			$('BODY').css('background-size','auto 100%');
		}else{
			$('BODY').css('background-size','100% auto');
		}

	//Ajusta aa tela de login
		if(height<500)
		{
			$('.form-signin').css({margin:'0px', padding:'0px', position:"relative"});
		}

		$('body').width(width);
//		$('body').height(height);
		
		var posX	=	($(window).width()/2)-(($('.form-signin').width())/2);
		
		//var posX	=	height/2;
		var pos	=	($(window).height()/2)-(($('.form-signin').height()+50)/2);

		var min_top		=	100;


		
		if(pos<=min_top) pos =min_top;
		
		$('.form-signin').css('top',pos);

		$('.form-signin').css('left',posX);
			
}

$( window ).resize(WRS_RESIZE);


function valida_usuario()
{
	wrsCheckLogin($('#user').val(), $('#password').val(),'login', $('#user_remote').val());
}

function LoginMensagen(string)
{
	$('.mensagens').html(string);
}

function wrs_click_user()
{
	
	var login =	 $(this).attr('user');
	var pwd =	 $(this).attr('pwd');
	LoginMensagen('');

		remove_new_password();
	
	$('#user').val(login);
	$('#password').val(pwd);
}

function wrs_remove_user_temp()
{
	var getUser	=	$(this).attr('user');
	var confirm	=	 window.confirm(LNG('REMOVE_LOGIN_COOKIE'));


	if(confirm)
	{
		$('body').WrsGlobal('setCM',{remove:true});
		$(this).parent().remove();
		wrsCheckLogin(getUser, '','remove');
		
	}
	
}






var function_call_login	=	 function(data){

	TRACE('recebendo parametro do Post run.php wrsCheckLogin na common.js');
	
	
	
	$('.wrs_login').html('Login');
	
	if(typeof data.data!='undefined')
	{
		if(typeof data.data.change!='undefined')
		{
			if(data.data.change==true)
			{
				$('#password').val($('#password_new').val());
				valida_usuario();
			}
		}
		
		
		if(typeof data.data.recover!='undefined')
		{
			if(data.data.recover==true)
			{
				var _pas		=	$('#password_new').val();

					form_data['user'].val(USER_CODE);
					form_data['password'].val(_pas);
					
					$('.sub_container').prepend(form_data['password']);
					$('.sub_container').prepend(form_data['user']);
					$('.new_password').remove();
					
					RECOVER		=	 '';
					
					$('.wrs_login').trigger('click');
	
			}
		}
		
		//Senha expired
		if(data.data.expired==true)
		{
			create_new_pass();
			 
		}//Senha expirada
		
		//Valida login 
		if(data.data.login==true)
		{
			LoginMensagen(data.html);
			
			$("#fakeloader").show();
			window.location	=	'run.php?file=WRS_MAIN&class=WRS_MAIN&ncon';
		}
	}
		
	
	
	LoginMensagen(data.html);
	
	
	
	if(empty(data.html))
	{
		LoginMensagen(fwrs_error(LNG('ERRO_FILE_PROCCESS')));
	}
	
	TRACE('O post da run.php wrsCheckLogin da common.js foi concluido');
};

function remove_new_password()
{
	$('#password_new,#password_new_confirm').remove();
}


function password_recover()
{
	remove_new_password();
	wrsCheckLogin($('#user').val(), '','recover_login', '');
}

function wrs_login_recover()
{

	//RECOVER
	create_new_pass();
	
	//form_data['sub_container']		=	$('#user').parent().html();
	
	form_data['user']			=	$('#user');
	form_data['password']		=	$('#password');
	
	
	$('#password,#user').remove();
	LoginMensagen(fwrs_success(LNG('LOGIN_RECOVER_NEW')));
	$('.checkbox,.wrs_info').hide();

}


function create_new_pass()
{
	var _param	=	{ 
			type	:	"password",
			id		:	"password_new",
			name	:	"password_new",
			'class'	:	"form-control",
			placeholder	:	LNG('LOGIN_NEW_PASSWORD'),
			required:true
		};
	
	var _param_du	=	{ 
			type	:	"password",
			id		:	"password_new_confirm",
			name	:	"password_new_confirm",
			'class'	:	"form-control",
			placeholder	:	LNG('LOGIN_NEW_PASSWORD_CONFIRM'),
			required:true
		};
	
	remove_new_password()
	$('.new_password').append($('<input/>',_param)).append($('<input/>',_param_du));
	$('#password_new').focus();
	
	//ENTER nos formularios
	$( "#password_new,#password_new_confirm" ).unbind('keypress').keypress(function( event ) {if ( event.which == 13 ) valida_usuario();});
	
}

function wrsCheckLogin(login,pwd,event,perfil)
{
	TRACE('Iniciando wrsCheckLogin na common.js');
	
	var isCookie	=	 $('#chk_lembrar:checked').val() == 1 ? 1 : 0;	
	
	var _load		=	' <img src="./imagens/wrs_loading.gif"/>';
	var mensagem	=	fwrs_warning(LNG('LOGIN_CHECK')+_load);
	
	TRACE('Enviando parametro para o Post run.php wrsCheckLogin na common.js');

	if(event!='recover_login' && isEmpty(RECOVER))
	{
		//Senha empty
		if(isEmpty(login)) 
		{
			mensagem	=	sprintf(LNG('LOGIN_PASSWORD_EMPTY'),LNG('LOGIN_USER_SYSTEM'));
			LoginMensagen(fwrs_error(mensagem));
			
			return false;
		}
	
		if(isEmpty(pwd) && !$('body').WrsGlobal('getCM','remove')) {
			mensagem	=	sprintf(LNG('LOGIN_PASSWORD_EMPTY'),LNG('LOGIN_PASSWORD'));
			LoginMensagen(fwrs_error(mensagem));
			return false;
		}
	//end empty
	}else{
		mensagem	=	fwrs_success(LNG('LOGIN_SEND_CHANGE')+_load);
	}
	
	
	var _param	=	{
			'login'		:	login,
			'pwd'		:	pwd,
			'perfil'	:	((perfil!=undefined && perfil!='')?perfil:''),
			'file'		:	'WRS_LOGIN',
			'class'		:	'WRS_LOGIN',
			'event'		:	event,
			'isCookie'	:	isCookie
		};
	
	
	if(!isEmpty(RECOVER))
		{
			_param['login']	=	RECOVER;
			_param['event']	=	'recover_email';
		}
	
	
	//Regras para os clicks 
	
	//Troca de senha
	if($('#password_new').length>0)
	{
		
		var password_new			=	$('#password_new').val();
		var password_new_confirm	=	$('#password_new_confirm').val();
		
		//Verificando se é vazio
		if(isEmpty(password_new))
		{
			var _placeholder	=	$('#password_new').attr('placeholder');
			LoginMensagen(fwrs_error(sprintf(LNG('LOGIN_PASSWORD_EMPTY'),_placeholder)));
			return false
		}
		
		
		if(isEmpty(password_new_confirm))
		{
			var _placeholder	=	$('#password_new_confirm').attr('placeholder');
			LoginMensagen(fwrs_error(sprintf(LNG('LOGIN_PASSWORD_EMPTY'),_placeholder)));
			return false
		}
		
		
		
		//verificando se é igual
		if(password_new_confirm!=password_new)
		{
			LoginMensagen(fwrs_error(LNG('LOGIN_NEW_PASSWORD_CONFIRM_ERROR')));
			return false
		}
		
		_param['new_password']	=	password_new;
		
		 mensagem	=	fwrs_warning(LNG('LOGIN_CHECK_NEW')+_load);
		 
	}
	
	
	LoginMensagen(mensagem);
	
	$.post('run.php',_param,function_call_login,"json").fail(function() {
		LoginMensagen(fwrs_error(LNG('ERRO_FILE_PROCCESS')));
	  });
	

}








$(function(){

	WRS_RESIZE();
	//By Marcelo Santos
	$('.wrs_remove_user_temp').click(wrs_remove_user_temp);

	$('.wrs_click_user').click(wrs_click_user);

	$('.remove_user').click(function(){});
	$('.wrs_login').click(function(){
		valida_usuario();
	});


	$('.container-user, #user_remote').css('visibility','visible');
	$('.container-user, #user_remote').css('display','block');
	$('.container-user, #user_remote').toggle();
	
	$('.list_user').click(function(){
		$('.container-user').toggle('show');
	})
	
	$('.remove_user').click(function(){
		limpaCookies();
	});

	$('.recover_password').click(function(){
		password_recover();
	})
	
	
	
	$( "#user,#password,#user_remote" ).keypress(function( event ) {
		  if ( event.which == 13 ) {			  
			  valida_usuario();
		  }
		 
	});

	
	
	$("#chk_remote").change(function(){
		if($(this).is(":checked")){
			$('#password').css({ 'border-bottom-right-radius': '0', 'border-bottom-left-radius': '0' });
			$('#user_remote').show(200);
		}else{
			$('#password').css({ 'border-bottom-right-radius': '4px', 'border-bottom-left-radius': '4px' });
			$('#user_remote').hide(200);
		}
	});
	
	
	
});