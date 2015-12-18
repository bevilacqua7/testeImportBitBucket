<?php

date_default_timezone_set('America/Sao_Paulo');



WRS_INI::LOAD_INI();
$WRS_DEFINE		=	 WRS_INI::WRS_DEFINE();
	

if(!isset($_SESSION)){
	session_start();
}


define('WRS_VERSION',$WRS_DEFINE['WRS_VERSION']);

/**
 * Para informar se existe debug
 * @var boolean
 */
define('IS_WRS_DEBUG',$WRS_DEFINE['IS_WRS_DEBUG']);




/**
 * Para informar se existe debug
 * @var boolean
 */
define('IS_WRS_TRACE',$WRS_DEFINE['IS_WRS_TRACE']);


/**
 * Informa o Status do DEBUG
 * @var boolen
 */
if(!defined('WRS_DEBUG_WORD')){
	define('WRS_DEBUG_WORD',$WRS_DEFINE['WRS_DEBUG_WORD']);
}


if(!defined('REFERENCE_JS_PATH')){
	define('REFERENCE_JS_PATH',dirname(__DIR__).DIRECTORY_SEPARATOR);
}

if(!defined('JS_PATH')){
	$subject	=	str_replace(REFERENCE_JS_PATH, '', dirname(__DIR__).DIRECTORY_SEPARATOR).'js'.DIRECTORY_SEPARATOR;
	define('JS_PATH',str_replace(DIRECTORY_SEPARATOR, '/', $subject));
}

if(!defined('JS_PATH_API') && defined('PATH_MAIN')){
	$subject	=	str_replace(PATH_MAIN, '', dirname(__DIR__).DIRECTORY_SEPARATOR).'js'.DIRECTORY_SEPARATOR;
	define('JS_PATH_API',str_replace(DIRECTORY_SEPARATOR, '/', $subject));
}

/**
 * Apenas informa se irá possuir conexão com o Banco de dados
 * @var string
 */

$rand_token_version		=	WRS_VERSION;

if(WRS_INI::WRS_SERVER('ACTIVE_RAND_JS')==true)	
{
	 $rand_token_version	=	rand(0,999999); 
}



define('RAND_TOKEN',$rand_token_version);

/**
 * Eventos para o WRS
 */

define('EVENT_SHOW'			,strtoupper('show'));
define('EVENT_INSERT'		,strtoupper('insert'));
define('EVENT_UPDATE'		,strtoupper('update'));
define('EVENT_GRID'			,strtoupper('grid'));
define('EVENT_NOT_FOUND'	,strtoupper('not_found'));
define('EVENT_REMOVE'		,strtoupper('remove'));
define('EVENT_SEARCH'		,strtoupper('search'));

/*
 * Define Quebra do BANCO
 */
/**
 *  Tag de quebra parametros {VIR} do banco de dados
 * @var string
 */
define('TAG_QUEBRA_VIR', $WRS_DEFINE['TAG_QUEBRA_VIR']);

/**
 * Tag URL para informações do Cubo
 */
define('TAG_URL_CUBE_SELECTED',$WRS_DEFINE['TAG_URL_CUBE_SELECTED']);

/**
 * Endereço da pasta corrente da Estrutura Nova 
 * 
 * @var string
 */

define('WRS_DEBUG_QUERY_FILE_NAME',$WRS_DEFINE['WRS_DEBUG_QUERY_FILE_NAME']);


/**
 * 
 * Endereço dos arquivos originais do WRS
 * 
 * @var string
 */
define('PATH_DEFAULT',dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR);

define('PATH_API',PATH_DEFAULT);

define('PATH_SMARTY',PATH_API.'Smarty-3.1.20'.DIRECTORY_SEPARATOR);



define('DS_URL',	'/');

//Arquivos de UPLOADS
define('PATH_FILE',			dirname(PATH_DEFAULT).DS.'files'.DS);

define('PATH_FILE_URL',		'files'.DS_URL);

define('DEBUG_TRACE'		, $WRS_DEFINE['DEBUG_TRACE']);

	//Chama o script com funÃ§Ãµes gerais de banco de dados

/**
 * Grava as informações dos processos que estão sendo executado no PHP
 * @param string $word
 * @param string $line
 * @param string $file
 */
function WRS_TRACE($word,$line,$file)
{
	date_default_timezone_set('America/Sao_Paulo');
	if(IS_WRS_TRACE)
	{
		$text_debug	=	WRS::LOGIN().' - '.$word.'  | LINE:'.$line.' | FILE:'.$file;
		$fileName	=	DEBUG_TRACE;
		$fp 		= 	fopen(dirname(__DIR__).DIRECTORY_SEPARATOR.'var'.DIRECTORY_SEPARATOR.$fileName,'a');
		fwrite($fp,date('d-m-Y H:i:s | ').$text_debug.PHP_EOL); // grava a string no arquivo. Se o arquivo não existir ele será criado
		fclose($fp);
	}
	
}


/**
 * 
 * Função para pegar a Sessão Currente
 * 
 * @param string $label
 * @return session
 * 
 */
function WRS_SESSION($label)
{
	if(isset($_SESSION[$label])){
		return $_SESSION[$label];
	}
	
	return false;	
}

/**
 * Verifica se a function existe
 */
if(!function_exists('WRS_request')) {
	function WRS_request($label)
	{
		
		if(is_array($label))
		{
			//Caso seja um array para receber
			$request		=	 array();
			foreach($label as $_value)
			{
				$request[$_value] 	=	'';
				if(isset($_REQUEST[$_value]))
				{
					$request[$_value]	=	$_REQUEST[$_value];
				}
			}
			return $request;
		}else{
			
			if(isset($_REQUEST[$label]))
			{
				return $_REQUEST[$label];
			}else{
				return '';
			}
			
		}
	
		return '';
	}
}

function WRS_UTF($data)
{
	return $data;
}

function WRS_UTF_FILE($data)
{
	return utf8_decode($data);
}

function fwrs_replace_attr($value)
{
	$repalce		=	array('[',']','.','%'    ,'&',' ',',','(',')');
	$sub			=	array('' ,'' ,'' ,'_por_','' ,'' ,'' ,'' ,'');
	return str_replace($repalce,$sub,$value);	
}
/**
 * incluindo a leitura do arquivo ini
 */


/**
 * Cria diretório com base nas URL passada
 * @param string $path
 */
function fwrs_create_folder($path)
{
	$path_array	=	 explode(DIRECTORY_SEPARATOR, $path);
	$path_temp	=	NULL;
	
	foreach ($path_array as $path_name)
	{
		$var	=	str_replace(' ', '', trim($path_name)); 
		
		if(!strlen($var)) continue;
			
		$path_temp.=$path_name.DIRECTORY_SEPARATOR;
			
		if(!file_exists($path_temp)){
			if(!mkdir($path_temp, 0777, true)){
				echo 'O sistema não está conseguindo criar a pasta '.$path_temp;
				exit();
			}
		}
	}
}

/**
 * Completa com as mensagem do WRS em Bootstrap
 * @param string $type
 * @param string $msg
 * @return string
 */
function fwrs_alert($type,$msg,$tag=NULL)
{
	return '<div '.$tag.' class="alert '.$type.'" >'.$msg.'</div>';
}

function fwrs_trigger_js($obj,$event)
{
	return fwrs_javascript('$("'.$obj.'").trigger("'.$event.'")');
}

function fwrs_utf8d($input)
{
	return utf8_decode($input);
}

function fwrs_utf8e($input)
{
	return utf8_encode($input);
}
/**
 * Faz a padronização da formatação do Cubo
 * @param string $time
 */
function fwrs_time_cube($time)
{
	return substr($time,0,19);
}

/**
 * Criando a header para exportação
 * @param array $export_header
 * @param string $type_export
 * @return string
 */
function create_header_export($_export_header,$type_export,$sort=true)
{
	$export_header	=	$_export_header;	 
	$tr				=	'<tr>{tr}</tr>'.PHP_EOL;
	$td				=	'<td bgColor="'.corFundoTitulo($_SESSION['COR']).'" colspan="{colspan}"  style="border:solid 1px '.corTitulo($_SESSION['COR']).';font-weight:bold;color:#FFFFFF;font-size:14px" align="left">{value}</td>'.PHP_EOL;
	$td_array		=	array('{colspan}','{value}');
	$header_html	=	NULL;
	 
	if($type_export=='CSV')	$header_html	=	array();
	 $value		=	NULL;
	//foreach ($export_header as $label =>$value)
		

	for($i=0;$i<count($export_header);$i++)	
	{
		$value	=	$export_header[$i];
		
		switch($type_export)
		{
			case 'XLS' : $header_html.=str_replace($td_array, array($value['column'],$value['title']), $td); break;
			case 'CSV' :  $header_html	=	array_merge($header_html, fwrs_repeat_array($value['title'], $value['column']));break;
		}
	}
	 
	switch($type_export)
	{
		case 'XLS' :  return str_replace('{tr}', $header_html, $tr) ; break;
		case 'CSV' : {
			return implode(';', $header_html).($header_html ?  PHP_EOL: NULL);
		
		}; break;
		
	}
	 
}

/**
 * 
 * @param data $conteudo
 * @param string $_name_temp
 * @param string $type_file
 */
function fwrs_create_file_to_export($conteudo,$_name_temp,$type_file)
{
	if(file_exists($_name_temp)) unlink($_name_temp);
	
	$name_temp	=	 str_replace('.zip', '.'.$type_file, $_name_temp);
	
	$name_file	=	$name_temp;
	$fp 		= 	fopen($name_file,'a');
	fwrite($fp,$conteudo); // grava a string no arquivo. Se o arquivo não existir ele será criado
	fclose($fp);
	
	//Verifica se precisa compactar
	if(strpos($_name_temp,'.zip')=== false)
	{}else{
		$zip = new ZipArchive();
		if ($zip->open($_name_temp,ZipArchive::CREATE) === TRUE) {
			$zip->addFile($name_temp, 'WRS_EXPORT_'.$type_file.'.'.$type_file);
			$zip->close();
			unlink($name_temp);
		}else{
			WRS_DEBUG('ERRO:: Não foi possível gerar o  zip '.$_name_temp);
		}
		$zip->close();
	}	
}

function fwrs_remove_file_export()
{
	$file	=	 array('CSV','XLS');

	foreach($file as $value)
	{
		$file_path_zip	=	PATH_VAR.'export'.DIRECTORY_SEPARATOR.WRS::USER_CODE().'_WRS_EXPORT_'.$value.'.zip';
		$file_path		=	PATH_VAR.'export'.DIRECTORY_SEPARATOR.WRS::USER_CODE().'_WRS_EXPORT_'.$value.'.'.$value;
		
		if(file_exists($file_path_zip)) unlink($file_path_zip);
		
		if(file_exists($file_path)) unlink($file_path);
		
		
	}
	
}

/**
 * Criando a header para exportação
 * @param array $export_header
 * @param string $type_export
 * @return string
 */
function create_header_export_result($export_header,$type_export)
{

	$tr				=	'<tr>{tr}</tr>'.PHP_EOL;
	$td				=	'<td colspan="{colspan}"  style="border:solid 1px '.corTitulo($_SESSION['COR']).';font-weight:bold;color:#000000;font-size:14px" align="left">{value}</td>'.PHP_EOL;
	$td_array		=	array('{value}');
	$header_html	=	NULL;

	if($type_export=='CSV')	$header_html	=	array();

	if($type_export!='CSV')
	{
		foreach ($export_header as $label =>$value)
		{
			switch($type_export)
			{
				case 'XLS' : 	$header_html.=str_replace($td_array, array($value), $td); break;
			}
		}
	}

	switch($type_export)
	{
		case 'XLS' :  return str_replace('{tr}', $header_html, $tr) ; break;
		case 'CSV' :  return implode(';', $export_header).PHP_EOL; break;
	}

}

/**
 * Repeat a mesma variável uma certa quantidade de vezes
 * @param label $label
 * @param int $repeat
 * @return multitype:unknown
 */
function fwrs_repeat_array($label,$repeat)
{
	if($repeat==0) return array($label);
	
	$array		=	array();
	
	for($i=0;$i<$repeat;$i++){
		$array[]	=	$label;		
	}
	
	return $array;
}

function fwrs_array_to_url($array)
{
		$tmp	=	NULL;
		foreach($array as $label =>$value)
		{
			$tmp.=		$label.'='.$value.'&';
		}
		
		return $tmp;
}

function fwrs_javascript($js)
{
	return '<script>'.$js.'</script>';
}


/**
 * Retorna o overlib para o padrão escolhido
 * @param unknown $array
 */
function fwrs_overlib($array)
{
	$html	=	NULL;
	foreach($array as $label =>$value_array)
	{
		$html.='<h4>['.$label.' ]</h4>';
		foreach($value_array as $value)
		{
			$html.=$value.'<br>';
		}
	}
	
	return $html;
}

/**
 * Apenas pega um parametro de uma string que foi convertida em array e novamente transforma em um novo array
 * @param array $array
 * @param string $glue
 * @return array
 */
function fwrs_string_array_to_array($array,$glue)
{
	$array_temp	=	array();
	$explode	=	NULL;
	
	foreach($array as $label)
	{
		$explode	=	explode($glue,$label);
		$array_temp[$explode[0]]=$explode[1];
	}
	
	return $array_temp;
}
/**
 * Apenas para inserir colchetes
 * @param string $value
 * @return string
 */
function fwrs_set_cochete($value)
{
	return '['.$value.']';
}
 
/**
 * Mensagem de Error
 * @param string $msg
 */
function fwrs_error($msg,$tag=NULL)
{
	return fwrs_alert('alert-danger', $msg,$tag);
}

/**
 * Mensagem de Warning
 * @param string $msg
 */
function fwrs_warning($msg,$tag=NULL)
{
	return fwrs_alert('alert-warning', $msg,$tag);
}

/**
 * Mensagem de Success
 * @param string $msg
 */
function fwrs_success($msg,$tag=NULL)
{
	return fwrs_alert('alert-success', $msg,$tag);
}

/**
 * Mensagem de info
 * @param string $msg
 */
function fwrs_info($msg,$tag=NULL)
{
	return fwrs_alert('alert-info', $msg,$tag);
}

/**
 * Faz o Encode para todos os values do Array
 * @param array $array
 * @return Ambigous <unknown, string>
 */
function fwrs_array_encode64_value($array,$parameter_no_encode=NULL,$deep_label=NULL)
{
	$array_temp		=	$array;
	$flag_encode	=	true;
	foreach($array_temp as $label =>$value)
	{
		$flag_encode	=	true;
		
		if(is_array($value))
		{
			$array_temp[$label]	=	fwrs_array_encode64_value($value,$parameter_no_encode,$label);
		}else{
			
			if(is_array($parameter_no_encode))
			{
				if(in_array($deep_label ? $deep_label : $label,$parameter_no_encode)) $flag_encode=false;
			}
				if($flag_encode)
					$array_temp[$label]	=	base64_encode($value);
				else
					$array_temp[$label]	=	$value;
				
				
		}
	}
	return $array_temp;
}
/**
 * Redirecionamento de URL
 * @param string $location
 */
function fwrs_js_location($location)
{
	echo '<script>window.location="'.$location.'";</script>';
	exit();
}

/**
 * Criação do option
 * Types
 * value
 * text
 * 
 * @param array $result
 * @param string|int $selected
 */
function fwrs_option($value,$text,$selected=NULL,$elements=NULL)
{
	$subject 	= '<option value="{value}" {select} '.$elements.' >{text}</option>'.PHP_EOL;
	$search		=	array('{value}','{text}','{select}');
	
 
	
	 
		$replace	=	 array(	$value,
								$text, 
								($value==$selected ? ' selected="selected" ' : NULL)
								);
		
	return str_replace($search, $replace, $subject);
}

/**
 * 
 * Quebra de string para Array com vários parametros
 * @param string $string
 * @param string $quebra
 * @param string $delimiter
 * @return Array
 */
function fwrs_array_split($string,$quebra,$delimiter)
{
	$array	=	array();
	$value	=	explode($quebra, $string);
	
	
	if(empty($string)) return NULL;
	
	foreach($value as $result){
		$glue										=	explode($delimiter,$result);	
		$array[(isset($glue[0]) ? $glue[0] : NULL)]	=	(isset($glue[1]) ? $glue[1] : NULL);
	}
	
	return $array;
}

/**
 * Request
 * @param string $label
 * @return Ambigous <string, unknown>
 */
function fwrs_request($label)
{
	return WRS_request($label);
}


function fwrs_remove_colchete($input)
{
	return str_replace(array('[',']'), '', $input);
}

/**
 * 
 * Delimitador para  Strings
 * @param string $_value
 * @param number $_delimitador
 * @return string
 */
function fwrs_delimitador($_value,$_delimitador=21,$_dot=true)
{
	return substr($_value,0,$_delimitador).($_dot ? '...' : NULL);
}
/*
 * Incluindo Classe que contem as informações da classe
 */

function fwrs_checkbox($array,$value)
{
	if(!is_array($array)) return NULL;
	
	foreach($array as $value_array){
		
		if($value_array==$value) return ' checked="checked" ';
	}
	
	return NULL;
}

function fwrs_array_comparar($array,$value)
{
	if(!is_array($array)) return false;

	foreach($array as $value_array){
		if($value_array==$value) return true;
	}

	return false;
}

function fwrs_mktime()
{
	return mktime(date("H"), date("i"), date("s"), date("m"), date("d"), date("Y"));
}


/**
 * Gravando info no cookie
 * @param string $value
 * @param string $name
 */
function fwrs_set_cookie($value,$name)
{
	setcookie($name, $value);
	setcookie($name, $value,  time()+3600*24*30*12*5);  /* expira em 1 hora */
	setcookie($name, $value,  time()+3600*24*30*12*5, "/~rasmus/", $_SERVER['HTTP_HOST'], 1);
}

/**
 * Apagar o Cookie
 * @param string $name
 */
function fwrs_set_cookie_clean($name)
{
	setcookie($name, $value,  time() - 3600);  /* expira em 1 hora */
	setcookie($name, $value,  time() - 3600, "/~rasmus/", $_SERVER['HTTP_HOST'], 1);
}
