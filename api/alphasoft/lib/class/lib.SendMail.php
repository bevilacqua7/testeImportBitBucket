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
		
		$mail->SetFrom($ini['EMAIL'], $ini['NAMEHOST']);
		
		$mail->SMTPDebug 	= 0;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
		
		
		
		$mail->CharSet  = LNG('CharSet');
		
		
		$mail->Subject 		= $param['subject'];
		
		$mail->Body 		= $param['body'];
		
		$mail->AddAddress($param['mail']);
		
		
		return $mail->Send();
	}
	
	
}

?>