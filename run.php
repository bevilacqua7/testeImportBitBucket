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
	
	$data		=	array($name_file, 'event', 'class');
	
	$data		=	fwrs_request($data);
	
	//WRS_DEBUG_QUERY($_REQUEST,'dd.log');


	
	
	//WRS_TRACE('start run.php  \n'.print_r($_REQUEST,true) , __LINE__, __FILE__);
	
	
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
	

	
	
	includeCLASS($data[$name_file]);
	$class	=	 $data['class'];	
	$obj	=	 new $class();
	$obj->set_conn($conn_wrs);
	$obj->run(); 	

?>
