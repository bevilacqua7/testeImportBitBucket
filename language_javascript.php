<?PHP


	/**
	 * Apenas processa a conversão do idioma para o Javascript
	 */

	include_once 'config/configCommon.php';
	
	$file_language	=	PATH_LANGUAGE.WRS::USER_LANGUAGE().'.php';
	header('Content-Type: application/javascript');
	echo  'var LNG_VAR='.json_encode($language,true);
	echo PHP_EOL;

?>


function LNG(value)
{
	if(!isset(LNG_VAR[value])) return value;
	
	return LNG_VAR[value];
}