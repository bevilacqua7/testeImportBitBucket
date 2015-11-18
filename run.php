<?PHP

//ini_set("display_errors","1");
	/**
	 * file:WRS_CLASS
	 * class: Name class
	 * event: INterno para cada processo
	 */
	ini_set("log_errors", 1);
	ini_set("error_log", dirname(__FILE__).DIRECTORY_SEPARATOR."php-error.log");

//	header("Content-Type: text/html; charset=ISO-8859-1",true);
//	header("Content-Type: text/html; charset=ISO-8859-1",true);
	include_once 'config/configCommon.php';
	includeCLASS(fwrs_request('file'));
	$class	=	 fwrs_request('class');	
	$obj	=	 new $class();
	$obj->set_conn($conn_wrs);
	$obj->run(); 	

?>
