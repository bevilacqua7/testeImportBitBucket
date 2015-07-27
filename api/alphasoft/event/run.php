<?php 


	$loadIniClass	=	array();
	
	
	$path_config	=	dirname(__DIR__).DIRECTORY_SEPARATOR.'config.php';
	
	include_once($path_config);
	
	
 
	$class	=	fwrs_request('class');
	$event	=	fwrs_request('event');
 
	
	/*
	 * Lendo Configuração das Classes que tem que ser carregadas
	 */
	$loadIniClass 	= parse_ini_file(PATH_DEFINE.'defineClass.ini', true);	 
	$loadIniClass	=	$loadIniClass['class'];
	
	/*
	 * Verifica se a nome clatura da Classe veio vazia 
	 * E se existe essa informação  nos registros
	 */
	if(empty($class) || !isset($loadIniClass[$class])){
		echo fwrs_error('Não foi possível encontrar a Class <b>'.$class.'</b><br>');
		exit();
	}
	
	/*
	 * Verifica se o evento passado não está em branco
	 */
	if(empty($event)){
		echo fwrs_error('O evento <b>'.$event.'</b> não foi localizado <br>');
		exit();
	}
	
	
	/*
	 * Faz o include da classe
	 */
	includeCLASS($class);
	
	/*
	 * Chamando a Classe
	 */
	$classEvent		=	 new $loadIniClass[$class]();

	/*
	 * passa o Evento
	 */
	$classEvent->set_event($event);

	/*
	 * Passa a conexão
	 */
	$classEvent->set_conn($conn);
	
	/*
	 * Executa a Classe
	*/
	$classEvent->run();
	
?>