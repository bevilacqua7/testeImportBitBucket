<?PHP


	/**
	 * Apenas processa a conversão do idioma para o Javascript
	 */

	include_once 'config/configCommon.php';
	
	$file_language	=	PATH_LANGUAGE.WRS::USER_LANGUAGE().'.lng';
	header('Content-Type: application/javascript');
	echo  'var LNG_VAR='.json_encode($language,true);
	echo PHP_EOL;

?>


function LNG(value)
{
	var _value	= value;
	try{
			if(LNG_VAR[value])
			{
				_value	=	LNG_VAR[value];
			}
	}catch(e){
		_value	= value;
	}
	
	return _value;
}