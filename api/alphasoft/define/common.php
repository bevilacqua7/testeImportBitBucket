<?php 

/**
 * Funções comuns para o WRS
 */
/**
 * Apenas string oara fazer as complementações do sistema
 * @var strfing
 */
define('WRS_COMPLEMENT', 'VALUE_WRS');
define('WRS_TEMP_RAND',rand(0,99999999999999));

/*
 * Funções Genericas 
 */


function PARAMETERS_SEPARATORS($key)
{

	
	$local = array(
			'vir'		=>'(_,_)',
			'pipe'		=>'(_|_)',
			'negacao'	=>'~',
			'simples'	=>'*'
	);
	
	
	if(array_key_exists($key, $local))
	{
		return $local[$key];
	}
	
		return false;
	

}






/**
 * Debug 
 * @param string $texto
 * @param string $fileName
 */
function WRS_DEBUG_QUERY($texto,$_fileName='wrs_debug_query.log')
{
	if(is_array($texto)) $texto = print_r($texto,true);
	
	
	$fileName		=	$_fileName;
	$fileName		=	date('Y_m_d_').$fileName;
	
	
	$fp = fopen(PATH_VAR.DIRECTORY_SEPARATOR.DIRECTORY_SEPARATOR.$fileName,'a');

	
	if($fileName=='WRS_DEBUG.txt')
		fwrite($fp,$texto.PHP_EOL.'---------------------------------------------------------------------------------------------'.PHP_EOL); // grava a string no arquivo. Se o arquivo não existir ele será criado
	else
		fwrite($fp,$texto.PHP_EOL); // grava a string no arquivo. Se o arquivo não existir ele será criado
	
	fclose($fp);
}

function include_js($file)
{
	echo '<script type="text/javascript" src="api/alphasoft/js/'.$file.'.js?'.RAND_TOKEN.'"></script>'.PHP_EOL;	
}
/**
 * Pegando apenas o NOme do Browser
 * @return string
 */
function wrs_get_user_browser()
{
	$u_agent = $_SERVER['HTTP_USER_AGENT'];
	$ub = '';
	if(preg_match('/MSIE/i',$u_agent))
	{
		$ub = "ie";
	}
	elseif(preg_match('/Firefox/i',$u_agent))
	{
		$ub = "firefox";
	}
	elseif(preg_match('/Safari/i',$u_agent))
	{
		$ub = "safari";
	}
	elseif(preg_match('/Chrome/i',$u_agent))
	{
		$ub = "chrome";
	}
	elseif(preg_match('/Flock/i',$u_agent))
	{
		$ub = "flock";
	}
	elseif(preg_match('/Opera/i',$u_agent))
	{
		$ub = "opera";
	}

	return $ub;
}



/**
 * Constroi um Select com base no Array passado e os parametros no implements
 * name
 * id
 * class
 * implements
 * 
 * 
 * @param array $array
 * @param string $selected_by_label
 * @param array $implements
 * @return string
 */
function select($array,$selected_by_label,$implements)
{
	$option			=	'<option value="{label}" {SELECTED} >{value}</option>'.PHP_EOL;
	$option_array	=	array('{value}','{SELECTED}','{label}');
	
	$select			=	'<select name="{name}" id="{id}" class="{class}" {implements} >{option}</select>'.PHP_EOL;
	$select_array	=	array('{option}','{name}','{id}','{class}','{implements}');

	$html			=	NULL;
	$selected		=	NULL;
	
	
	foreach ($array as $label =>$value)
	{
		$selected	=	$selected_by_label==$label ? 'SELECTED' : NULL;
		$replace	=	 array($value,$selected,$label);
		$html		.= str_replace($option_array, $replace, $option);
	}
	
	$replace	= array();
	$replace[]	= $html;
	$replace[]	= isset($implements['name']) 		? $implements['name'] 		: NULL;
	$replace[]	= isset($implements['id']) 			? $implements['id'] 		: NULL;
	$replace[]	= isset($implements['class']) 		? $implements['class'] 		: NULL;
	$replace[]	= isset($implements['implements']) 	? $implements['implements'] : NULL;
	$html		= str_replace($select_array, $replace, $select);
	
	return $html;
}

/*
 * Funções de Negócio
 */




/**
 * Fazendo o include do idioma
 */
$file_language	=	PATH_LANGUAGE.WRS::USER_LANGUAGE().'.php';

if(!file_exists($file_language)){
	$file_language	=	PATH_LANGUAGE.'POR.php';
}
//Ao incluir esse arquivo é criada a variável $language
include_once $file_language;


/**
 * Retorna todo o idioma  passado
 * @param string $label
 * @return string
 */

function LNG($string)
{
	//Recebe a variável global
	GLOBAL $language;

	if(!isset($language[$string])) return $string;

	return ($language[$string]);
}

// substitui o LNG trocando os %s por s se existirem
function LNG_S($string,$char=false,$recursiva=false)
{
	$_char 			= $char===false?'s':$char;
	$_recursiva 	= !$recursiva?false:true;
	$_string 		= $_recursiva?$string:LNG($string);
	
	if(strpos($_string,'%s')){
		return LNG_S(str_replace('%s',$_char,$_string),$_char,true);
	}else{
		return $_string;
	}
}




function LNG_JOIN($string)
{
	//Recebe a variável global 
	GLOBAL $language;
	
	$join	=	$string;
	
	foreach($string as $label => $value)
	{
		if(isset($language[$value]))
			$join[$label]	=	$language[$value];
		else
			$join[$label]	=	$value;
	}
	
	return implode(' ',$join);
}


?>