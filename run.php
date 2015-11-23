<?PHP

//ini_set("display_errors","1");
	/**
	 * file:WRS_CLASS
	 * class: Name class
	 * event: INterno para cada processo
	 */
	ini_set("log_errors", 1);
	ini_set("error_log", dirname(__FILE__).DIRECTORY_SEPARATOR."wrs-php-error.log");

//	header("Content-Type: text/html; charset=ISO-8859-1",true);
//	header("Content-Type: text/html; charset=ISO-8859-1",true);
	include_once 'config/configCommon.php';
	
	$data		=	array('file', 'event', 'class');
	$data		=	fwrs_request($data);

	
	
	$is_js		=	 fwrs_request('is_js');
	$login		=	 fwrs_request('login');
	$pwd		=	 fwrs_request('pwd');
	
	
 
	
	
	/*
	$exeption_by_event		=	array('threadJobManager','change_cube','save_history','stopjob','load_grid_header','logout');
	
	if(($is_js!=true && empty($login) && empty($pwd)))
	{
		if(!in_array($data['event'], $search_array) && $data['event']!='' && !empty($data['event']))
		{
			WRS_DEBUG_QUERY($data['event']);
			
			includeCLASS('WRS_LOGIN');
			$login	=	 new WRS_LOGIN();
			$login->set_conn($conn_wrs);
			$userIsLogged	=	 $login->userIsLogged();
			
	
			if(!$userIsLogged['is_loged'] )
			{
				header('Location: login.php');	
				exit();
			}
		}
		
	}*/
	
	
	
	includeCLASS($data['file']);
	$class	=	 $data['class'];	
	$obj	=	 new $class();
	$obj->set_conn($conn_wrs);
	$obj->run(); 	

?>
