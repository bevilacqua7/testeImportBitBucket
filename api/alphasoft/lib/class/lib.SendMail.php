<?php 
/**
 * Criando Formulário
 * 
 */

	
class SendMail 
{
	
	
	public static function send($param)
	{
		$ini	=	WRS_INI::mail();
		
		includeAPI('PHPMailer'.DS.'class.phpmailer');
		includeAPI('PHPMailer'.DS.'class.smtp');
		
		/*
		$param['mail']
		$param['subject']
		$param['body']
		
		*/
		$mail = new PHPMailer();
		$mail->isSMTP();
		$mail->SMTPAuth 	= true;
		$mail->isHTML();
		
		$mail->Host 		= $ini['HOST'];
		$mail->Username 	= $ini['EMAIL'];
		$mail->Password 	= $ini['PASSWORD'];
		$mail->SMTPSecure 	= $ini['SMTPSecure'];	// SSL REQUERIDO pelo GMail
		$mail->Port 		= $ini['PORT'];  		// A porta 465 deverá estar aberta em seu servidor
		
		
		$_email		=	$ini['EMAIL'];
		$_name_host	=	$ini['NAMEHOST'];
		
		
		if(isset($param['uEmail']))
		{
			if(!empty($param['uEmail']))
			{
				$_email	=	$param['uEmail'];
			}
		}
		
		
		if(isset($param['nameHost']))
		{
			if(!empty($param['nameHost']))
			{
				$_name_host	=	$param['nameHost'];
			}
		}
		
		
		$mail->SetFrom($_email, $_name_host);
		
		
		$mail->SMTPDebug 	= 	0;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
		
		$mail->CharSet  	= 	LNG('CharSet');
		
		$mail->Subject 		= $param['subject'];
		
		$mail->Body 		= $param['body'];
		
		
		//Copia
		if(isset($param['addCC']))
		{
			foreach($param['addCC'] as $addCC)
			{
				$mail->addCC($addCC);
			}
		}
		
		//Anexando 
		if(isset($param['addAttachment']))
		{
			foreach($param['addAttachment'] as $addAttachment)
			{
				$mail->addAttachment($addAttachment);
			}
		}
		
		
		
		$mail->AddAddress($param['mail']);

		if(isset($param['cError'])){
			return array('send'=>$mail->Send(),'error'=>$mail->ErrorInfo);
		}else{
			return $mail->Send();
		}
		
		
		//
		
		
		
		
	}
	
	
}

?>