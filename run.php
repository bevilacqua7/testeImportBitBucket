<?PHP

//ini_set("display_errors","1");
	/**
	 * file:WRS_CLASS
	 * class: Name class
	 * event: INterno para cada processo
	 */
//	header("Content-Type: text/html; charset=ISO-8859-1",true);
//	header("Content-Type: text/html; charset=ISO-8859-1",true);
	include_once 'config/configCommon.php';
	includeCLASS(fwrs_request('file'));
	$class	=	 fwrs_request('class');	
	$obj	=	 new $class();
	$obj->set_conn($conn_wrs);
	$obj->run(); 	

?>
