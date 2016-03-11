<?PHP

//	ini_set("display_errors","1");
	/**
	 * file:WRS_CLASS
	 * class: Name class
	 * event: INterno para cada processo
	 */
	ini_set("log_errors", 1);
	ini_set("error_log", dirname(__FILE__).DIRECTORY_SEPARATOR."api".DIRECTORY_SEPARATOR."alphasoft".DIRECTORY_SEPARATOR."var".DIRECTORY_SEPARATOR.date('Y_m_d_')."php-error.log");

//	header("Content-Type: text/html; charset=ISO-8859-1",true);

	include_once 'config/configCommon.php';
	
	$filename = fwrs_request('filename');
	$name_file='file';
	
	if(isset($filename) && trim($filename)!='')
	{
		$name_file = 'filename';		
	}
	
	WRS_DEBUG_QUERY($_REQUEST,'ds.log');
	$data		=	array($name_file, 'event', 'class');
	
	$data		=	fwrs_request($data);
	
	
	$is_js		=	 fwrs_request('is_js');
	$login		=	 fwrs_request('login');
	$pwd		=	 fwrs_request('pwd');
	
	
	includeCLASS($data[$name_file]);
	$class	=	 $data['class'];	
	$obj	=	 new $class();
	$obj->set_conn($conn_wrs);
	
	
	//Validando conexão de usuário
	$val	=	WRS::LOGIN_ID();
	if(empty($val))
	{
		//Apenas não verifica pasa as seguintes classes
		$notcheck		= array('WRS_LOGIN','WRS_FILTER');
				if(!in_array($class,$notcheck))
		{
			$obj->isUserConnect();
		}
	}
	
	$obj->run(); 	
	
	

?>
