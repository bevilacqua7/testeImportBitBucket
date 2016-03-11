<?php

use phpDocumentor\Plugin\Parameter;
/*
 * Carrega as configurações principais para o funcionamento do Sistema
 */
 
define('PATH_WRS',__DIR__.DIRECTORY_SEPARATOR);
define('PATH_VAR',PATH_WRS.'var'.DIRECTORY_SEPARATOR);

/*
 * Configurações para o Class SMARTY
*/
define('PATH_CACHE',PATH_VAR.'cache'.DIRECTORY_SEPARATOR);
define('PATH_TEMPLATE',PATH_WRS.'template'.DIRECTORY_SEPARATOR);
define('PATH_TEMPLATE_CACHE',PATH_VAR.'template_cache'.DIRECTORY_SEPARATOR);
define('PATH_CONFIG_SMARTY',PATH_VAR.'smarty_config'.DIRECTORY_SEPARATOR);

/*
 * INformações para API
*/



define('PATH_DEFINE',PATH_WRS.'define'.DIRECTORY_SEPARATOR);
/*
 * Definição de IDIOMA
*/
define('PATH_LANGUAGE',PATH_WRS.'language'.DIRECTORY_SEPARATOR);





/**
 * Inclui arquivos ao projeto dentro da estrutura
 *
 * @param string $filename
 * @param string $folder
 * @param string $whoCall
 * @param string $firstName
 */
function includeFileLIB($filename,$folder,$whoCall,$firstName='lib.')
{

	$filename_configure	=	PATH_WRS.'lib'.DIRECTORY_SEPARATOR.$folder.DIRECTORY_SEPARATOR.$firstName.$filename.'.php';

	if(@file_exists($filename_configure)){
		include_once $filename_configure;
	}else{
		echo 'Arquivo includeCLASS <b>'.$filename_configure.'</b> Não encontrado';
		exit();
	}

}
/**
 * Faz o include dos templates
 * @param file $name
 */
function includeTemplate($file,$parameter,$return=false)
{
	$filename_configure		=	PATH_TEMPLATE.$file.'.php';
	
	if(@file_exists($filename_configure))
	{
		include_once $filename_configure;
		
		if($return) return $HTML;
		
	}else{
		echo 'Arquivo includeTemplate <b>'.$filename_configure.'</b> Não encontrado';
		exit();
	}
	 
}

 

/**
 * Inlcui o arquivo da pasta CLASS
 *
 * @param string $filename
 */
function includeCLASS($filename)
{
	includeFileLIB($filename, 'class', 'includeCLASS');
}

/**
 * Faz a inclusão dos eventos do Ajax
 * @param string $filename
 */
function includeAJAX($filename)
{
	includeFileLIB($filename, 'ajax', 'includeAJAX');
}

/**
 * Incluindo API do siste

 * @param include $fileName
 */
function includeAPI($fileName)
{

	$filename_configure	=	PATH_API.$fileName.'.php';

	if(@file_exists($filename_configure)){
		include_once $filename_configure;
	}else{
		echo 'Arquivo includeCLASS <b>'.$filename_configure.'</b> Não encontrado';
		exit();
	}
	
}

/**
 * Inlcui o arquivo da pasta QUERY
 *
 * @param string $filename
 */
function includeQUERY($filename)
{
	includeFileLIB($filename, 'query', 'includeQUERY','query.');
}

/**
 * Inlcui o arquivo da pasta STATIC
 *
 * @param string $filename
 */
function includeSTATIC($filename)
{
	includeFileLIB($filename, 'static', 'includeSTATIC','static.');
}

includeCLASS('WRS_INI');

include_once(__DIR__.DIRECTORY_SEPARATOR.'define'.DIRECTORY_SEPARATOR.'define.php'); 
