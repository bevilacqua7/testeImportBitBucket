<?php


ini_set("log_errors", 1);
ini_set("error_log", "php-error.log");

 

define('GUSER', 'webreportsystem@gmail.com');	// <-- Insira aqui o seu GMail
define('GPWD', 'wrs!@#123');		// <-- Insira aqui a senha do seu GMail

//https://ctrlq.org/code/19589-send-mail-php
//https://github.com/PHPMailer/PHPMailer/wiki/Troubleshooting
//https://support.google.com/a/answer/176600?hl=pt-BR


require 'class.phpmailer.php';
require 'class.smtp.php';
//require 'PHPMailerAutoload.php';


	
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth 	= true;		// Autenticaçăo ativada
$mail->isHTML();	//Para formataçăo HTML
$mail->Host 		= 'smtp.gmail.com';	// SMTP utilizado

$mail->Username 	= GUSER;
$mail->Password 	= GPWD;

$mail->SMTPDebug 	= 0;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas

$mail->SMTPSecure 	= 'ssl';	// SSL REQUERIDO pelo GMail

$mail->Port 		= 465;  		// A porta 465 deverá estar aberta em seu servidor



$mail->SetFrom(GUSER, 'WRS_SYSTEM');
$mail->CharSet  = LNG('CharSet');
$mail->AltBody = 'Para mensagens somente texto';
$mail->Subject 		= 'assunto';
$mail->Body 		= 'mensage,';
$mail->AddAddress('marcelosantos_j8@yahoo.com.br');


if(!$mail->Send())
{
	echo 'ERROR '.$mail->ErrorInfo;
	return false;
} else {
	echo 'send';
	return true;
}




?>