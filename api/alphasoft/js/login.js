
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


	if(confirm)
	{
		$(this).parent().remove();
		wrsCheckLogin(getUser, '','remove');
		
	}
	
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
		enviaEmailSenha($('#user').val());
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