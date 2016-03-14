<?PHP

includeCLASS('WRS_BASE');
includeQUERY('WRS_LOGIN');

class WRS_LOGIN extends WRS_BASE
{

	public function run()
	{
		WRS_TRACE('run()', __LINE__, __FILE__);
		
		$login		=	 fwrs_request('login');
		$pwd		=	 fwrs_request('pwd');
		$perfil		=	 fwrs_request('perfil');
		$event		=	 fwrs_request('event');
		
		if(strpos($pwd,WRS_COMPLEMENT)!==false)
		{
			$pwd	=	base64_decode(str_replace(WRS_COMPLEMENT, '', $pwd));
		}
		
		switch($event)
		{
			case 'login' 		:	{	echo $this->setLogin($login, $pwd, $perfil);};break;
			case 'remove'		:	{ 
				header('Content-Type: application/json');
				echo $this->remove($login);	
			}; break;
			case 'isUserConnect'	:	{ 	echo $this->isUserConnect(true) ;	}; break;
			case 'recover_login':	{	echo $this->recover_login();}; break;
			case 'recover_email'		:	{	echo $this->recover_email();}; break;
		}

		
		WRS_TRACE('END run()', __LINE__, __FILE__);
		
	}
	
	
	private function recover_email()
	{
		header('Content-Type: application/json');
		
		$param		=	array(
				'html'=>	fwrs_error(LNG('LOGIN_CHANGE_SQL_ERRO')),
				'data'=>	array(
						'expired'=>false,
						'login'=>false,
						'change'=>false,
				)
					
		);
		
		$USER_PWD 		=	 fwrs_request('new_password');
		$PWD_RESET		=	fwrs_request('login');
		
		
		if(empty($USER_PWD))
		{
			$param['html']	=	fwrs_error(LNG('LOGIN_PASSWORD_EMPTY_NEW'));
			
			return json_encode($param);
		}
		
		if(empty($PWD_RESET))
		{
			$param['html']	=	fwrs_error(LNG('LOGIN_TAG_EMPTY'));
				
			return json_encode($param);
		}
		
		
		
		$query	=	 $this->query(QUERY_LOGIN::CHANGE_SSAS_PASSWORD('', '', $USER_PWD, $PWD_RESET, 0));
		
		
		
		if($this->num_rows($query))
		{
			$rows	=	 $this->fetch_array($query);
			
			
			if($rows['STATUS']==1){
				$param['html']	=	 fwrs_success(LNG('LOGIN_RECOVER_SUCCESS_TIME'));
				$param['data']['recover']	=true;
			}else{
				$param['html']	=	 fwrs_error($rows['CHANGE_MESSAGE']);
						
			}
			
		}
			
		
		return json_encode($param);
	}
	
	private function recover_login()
	{
		header('Content-Type: application/json');
		$USER_CODE	=	 fwrs_request('login');
		
		
		$param		=	array(
				'html'=>	fwrs_error(LNG('LOGIN_CHANGE_SQL_ERRO_RECOVER')),
				'data'=>	array(
						'expired'=>false,
						'login'=>false,
						'change'=>false,
							)
					
		);
		
		$query	=	$this->query(QUERY_LOGIN::RESET_SSAS_PASSWORD($USER_CODE));
		
		if(!$this->num_rows($query))return json_encode($param);
		
		$rows	=	 $this->fetch_array($query);
		
		
		if($rows['STATUS']==1)
		{
			$param		=	 $this->send_recover($param,$USER_CODE,$rows['LINK_CODE']);
		}
		

		return json_encode($param);
	}
	
	
	private function send_recover($_param,$USER_CODE,$linkCode)
	{
		$param			=	$_param;
		
		
		
			
		$query_login	=	 $this->query(QUERY_LOGIN::SELECT_EMAIL($USER_CODE));
		
		if(!$query_login)
		{
			$param['html']	=	 fwrs_error(LNG('LOGIN_CHANGE_SQL_ERRO'));
		}
		
		if(!$this->num_rows($query_login))
		{
			$param['html']	=	fwrs_error(sprintf(LNG('LOGIN_RECOVER_NOT_FOUND'),$USER_CODE));
		}else{
			//Encontrado dados
			
			$rows		=	 $this->fetch_array($query_login);
			$mail		=	$rows['USER_EMAIL'];
			$user_desc	=	$rows['USER_DESC'];
			
			
			if(empty($mail))
			{
				$param['html']	=	 fwrs_warning(sprintf(LNG('LOGIN_NOT_EMAIL'),$USER_CODE));			
			}else{
				//Existe email para o usuário
				$param['html']		= $this->sendMail($mail,$linkCode);

				
			}
		}
		
		
		
		
		
		return $param;
		
	}
	
	
	
	private function sendMail($mail,$tag)
	{

		$param['mail']		=	$mail;
		$param['subject']	=	LNG('LOGIN_SUBJECT');
	
		$url			=	dirname($_SERVER['HTTP_REFERER']);
		
		
		$TITLE		=LNG('HTML_LOGIN_RECOVER_TITLE');
		$BODY		=LNG('HTML_LOGIN_RECOVER');
		$LINK		=$url.'/login.php?recover='.$tag;
		$TITLE_BUTTON	=LNG('HTML_LOGIN_RECOVER_BTN');
		$LOGO		=$url.'/imagens/logo-wrs.png';

		include PATH_TEMPLATE.'recover_password.php';
		
		$param['body']	=	$HTML;
		
		if(SendMail::send($param))
		{
			return fwrs_success(LNG('LOGIN_RECOVER_SUCCESS'));
		}
		
		return fwrs_error(LNG('LOGIN_RECOVER_ERROR'));
		
		
	}
	
	
	
	
	private function remove($login)
	{
		WRS_TRACE('remove($login)', __LINE__, __FILE__);
		
		$param		=	array(
				'html'=>	fwrs_success(LNG('LOGIN_REMOVE_HISTORY_SUCCESS')),
				'data'=>	array(
						'expired'=>false,
						'login'=>false,
						'change'=>false)
					
		);
		
		
		$user_cookie	=	json_decode($_COOKIE['WRS_LOGIN'],true);
		$cookie_temp	=	array();
		$last_user		=	false;
		$last_array		=	NULL;
	
		if($user_cookie['LAST_USER']['user']==$login) 
		{
			$last_user=true;
		}
		
		foreach($user_cookie as $user =>$value)
		{
			if($user=='LAST_USER') continue;

			
			if($login!=$user) {

				if($last_user)
				{
					$last_array			=	$value;
				}
				
				$cookie_temp[$user]	=	$value;
			}
		}
		
		if($last_user)
		{
			$cookie_temp['LAST_USER']	=	$last_array;
		}
		
		fwrs_set_cookie(json_encode($cookie_temp), 'WRS_LOGIN');
		
		
		
		return json_encode($param,true);
		
		WRS_TRACE('END remove($login)', __LINE__, __FILE__);
	}
	
	
	private function change_password($USER_CODE,$PWD_RESET,$USER_PWD)
	{
		
		$param		=	array(
										'html'=>	fwrs_error(LNG('LOGIN_CHANGE_SQL_ERRO')),
										'data'=>	array(	
															'expired'=>false,
															'login'=>false,
															'change'=>false)
					
		);
		
		
		$this->remove($USER_CODE);
		

		$query	=	$this->query(QUERY_LOGIN::CHANGE_SSAS_PASSWORD($USER_CODE, '', $PWD_RESET,$USER_PWD, 0));
		
		if(!$this->num_rows($query))	return json_encode($param);
		
		$rows		=	 $this->fetch_array($query);
		
		if(isset($rows['STATUS']))
		{
			if($rows['STATUS']==1)
			{
				$param['html']				=		fwrs_success(LNG('LOGIN_CHANGE_OK'));
				$param['data']['change']	=	true;
			}else{
				$param['html']				=		fwrs_warning($rows['CHANGE_MESSAGE']);
				$param['data']['change']	=	false;
			}
		}
		
		return json_encode($param);
		
		
	}
	
	/**
	 * 
	 * Fazendo a query de Login
	 * @param string $USER_CODE
	 * @param string $USER_PWD
	 * @param string $USER_PERFIL // opcional
	 * @return string
	 */
	public function setLogin($USER_CODE,$USER_PWD,$USER_PERFIL)
	{
		WRS_TRACE('setLogin()', __LINE__, __FILE__);
		
		header('Content-Type: application/json');
		
		$user_cookie	=	json_decode($_COOKIE['WRS_LOGIN'],true);

		
		WRS_TRACE('Iniciando o WRS_LOGIN na função setLogin ', __LINE__, __FILE__);
		
		$rules_session_tmp		=	 NULL;
		$multiple_cube			=	array();
		$PWD_RESET			=	 fwrs_request('new_password');
		 
	 
		
		session_destroy();		//Apaga qualquer sessão
		session_start();		// Inicia uma nova sessão
		
		if(empty($USER_CODE)) 
		{
			return json_encode(array('html'=>fwrs_error(sprintf(LNG('LOGIN_PASSWORD_EMPTY'),LNG('LOGIN_USER_SYSTEM'))),'data'=>array('expired'=>false,'login'=>false)),true);
		}
		
		if(empty($USER_PWD)) 
		{
			return json_encode(array('html'=>fwrs_error(sprintf(LNG('LOGIN_PASSWORD_EMPTY'),LNG('LOGIN_PASSWORD'))),'data'=>array('expired'=>false,'login'=>false)),true);
		}
		
		
		$browserInfo	=	 $this->getBrowser();
		$ADDRESS		=	 $_SERVER['REMOTE_ADDR'];
		$SESSION		=	 session_id();
		$BROWSER		=	 $browserInfo['browser'].' - '.$browserInfo['version'];
		$SYSTEM			=	 $this->getOs();
		$rules_session	=	array();

		WRS_TRACE('Executando a query QUERY_LOGIN::LOGIN_SSAS ', __LINE__, __FILE__);
		
		if ($USER_PERFIL != ''){
			$query		=	 QUERY_LOGIN::LOGIN_SSAS( $USER_PWD, $USER_CODE, $USER_PERFIL, $ADDRESS, $SESSION, $BROWSER, $SYSTEM );
		}else{
			$query		=	 QUERY_LOGIN::LOGIN_SSAS( $USER_PWD, '', $USER_CODE, $ADDRESS, $SESSION, $BROWSER, $SYSTEM );
		}
		
		$query			=	 $this->query($query);
	
		
		if($query)
		{
			if($this->num_rows($query))
			{
				$login_id		=	NULL;
				WRS_TRACE('Obtendo o resultado da query  QUERY_LOGIN::LOGIN_SSAS  ', __LINE__, __FILE__);
				$rule_database_id	=	array(); //Se já existir uma database não permite a inserção de outra
				
				while($rows = $this->fetch_array($query) )
				{
					$login_id			=	$rows['LOGIN_ID'];
					
					//Verificando a senha expirada e ou salvando a nova senha
					if($login_id==LOGIN_EXPIRED)
					{
						if(empty($PWD_RESET))
						{
							$_param_call	=	array('html'=>fwrs_warning(LNG('PASSWORD_EXPIRED')),'data'=>array('expired'=>true,'login'=>false));
							return json_encode($_param_call,true);
						}else{
								return $this->change_password($USER_CODE,$PWD_RESET,$USER_PWD);
						}

					}
					
					$key_database		=	$rows['DATABASE_ID'].$rows['SERVER_ID'];
						
					//Inserindo os multiplos cubos
						//if(!isset($multiple_cube[$rows['DATABASE_ID']]))
						if(!isset($rule_database_id[$key_database]))
						{
							$multiple_cube[$rows['DATABASE_ID']]	= array()	;
						}

		
						$multiple_cube[$rows['DATABASE_ID']][]	=	$rows;
				
					
					//Permite apenas uma Database ID
					if(isset($rule_database_id[$key_database])) continue;
					$rule_database_id[$key_database] =	true;
					
					
					$rules_session_tmp	=	$rows;
					
					//Conversão das informações do Cubo database
					$rules_session_tmp['CUBE_UPDATE_ORIGINAL']	=	$rules_session_tmp['CUBE_UPDATE'];
					$rules_session_tmp['CUBE_UPDATE']			=	fwrs_time_cube($rules_session_tmp['CUBE_UPDATE']);
					
					$rules_session[]	=	$rules_session_tmp;
				}
				
				
				WRS_TRACE('Gravando sessões ', __LINE__, __FILE__);				
				//Salvando o Login
				WRS::SET_LOGIN($USER_CODE,$USER_PERFIL);
				//Gravando o Login ID para a Sessão
				WRS::SET_LOGIN_ID($login_id);
				//Gravando a Sessão dos Usuários
				WRS::SET_SSAS_USER($rules_session);
				//Cadastrando os multiplos Cubos
				WRS::SET_SSAS_USER_MULTIPLE($multiple_cube);
				
				
				WRS_TRACE('Pegando informações do usuário QUERY_LOGIN::GET_LOGIN', __LINE__, __FILE__);
				$query_get_login	= QUERY_LOGIN::GET_SSAS_LOGIN($login_id);
				$query_get_login	=	 $this->query($query_get_login);
				
				if($this->num_rows($query_get_login))
				{
					
					
					$rows	=	 $this->fetch_array($query_get_login);
					WRS::SET_INFO_SSAS_LOGIN($rows);
					WRS::SET_CUSTOMER_ID($rows['CUSTOMER_ID']);
					WRS::SET_USER_ID($rows['USER_ID']);
					$user_cookie[$USER_CODE]	= array('pwd'	=>WRS_COMPLEMENT.base64_encode($USER_PWD),'user'=>$USER_CODE);					
					$user_cookie['LAST_USER']	= $user_cookie[$USER_CODE];
					
					//sort($user_cookie);
					if(fwrs_request('isCookie')==1){
						fwrs_set_cookie(json_encode($user_cookie), 'WRS_LOGIN');
					}
					
					//Limpando tabelas temporárias
					$this->cleanTMP();
										
					WRS_TRACE('Usuário logado com sucesso', __LINE__, __FILE__);
					WRS_TRACE('END setLogin()', __LINE__, __FILE__);
					$_param_call	=	array('html'=>fwrs_success(LNG('LOGIN_OK')),'data'=>array('login'=>true,'expired'=>false));
					return json_encode($_param_call,true);
				}
				
			}
			
		}
		
		WRS_TRACE('Senha inválida ', __LINE__, __FILE__);
		WRS_TRACE('END setLogin()', __LINE__, __FILE__);
		
		$_param_call	=	array('html'=>fwrs_error(LNG('LOGIN_PASSWORD_ERROR')),'data'=>array('login'=>false));
		return json_encode($_param_call,true);
		
		 
	}
	
	

	
	


	/**
	 * Pegando informações do Browser
	 * @link http://verticis.com.br/blog/tutoriais/php-tutoriais/como-identificar-o-navegador-utilizado-em-php/
	 * @return array
	 */
	private function getBrowser()
	{
	
		$useragent = $_SERVER['HTTP_USER_AGENT'];
	
		if (preg_match('|MSIE ([0-9].[0-9]{1,2})|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'IE';
		} elseif (preg_match( '|Opera/([0-9].[0-9]{1,2})|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Opera';
		} elseif(preg_match('|Firefox/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Firefox';
		} elseif(preg_match('|Chrome/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Chrome';
		} elseif(preg_match('|Safari/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Safari';
		} else {
			// browser not recognized!
			$browser_version = 0;
			$browser= 'other';
		}
	
		return array('browser'=>$browser,'version'=>$browser_version);
	
	}
	
	
	
	/**
	 * Retorna o Sistema Operacional do Cliente
	 * @link http://www.rafaeltheodoro.com.br/php/detecta-o-tipo-de-navegador-que-o-cliente-esta-utilizando/
	 * @return string|boolean
	 */
	private function getOs()
	{
		$useragent = $_SERVER['HTTP_USER_AGENT'];
	
		$useragent = strtolower($useragent);
	
		//check for (aaargh) most popular first
		//winxp
		if(strpos("$useragent","windows nt 5.1") !== false)
		{
			return "Windows XP";
		}
		elseif (strpos("$useragent","windows nt 6.0") !== false)
		{
			return "Windows Vista";
		}
		elseif (strpos("$useragent","windows nt 6.1") !== false)
		{
			return "Windows 7";
		}
		elseif (strpos("$useragent","windows 98") !== false)
		{
			return "Windows 98";
		}
		elseif (strpos("$useragent","windows nt 5.0") !== false)
		{
			return "Windows 2000";
		}
		elseif (strpos("$useragent","windows nt 5.2") !== false)
		{
			return "Windows 2003 server";
		}
		elseif (strpos("$useragent","windows nt 6.0") !== false)
		{
			return "Windows Vista";
		}
		elseif (strpos("$useragent","windows nt") !== false)
		{
			return "Windows NT";
		}
		elseif (strpos("$useragent","win 9x 4.90") !== false && strpos("$useragent","win me"))
		{
			return "Windows ME";
		}
		elseif (strpos("$useragent","win ce") !== false)
		{
			return "Windows CE";
		}
		elseif (strpos("$useragent","win 9x 4.90") !== false)
		{
			return "Windows ME";
		}
		elseif (strpos("$useragent","iphone") !== false)
		{
			return "iPhone";
		}
		elseif (strpos("$useragent","mac os x") !== false)
		{
			return "Mac OS X";
		}
		elseif (strpos("$useragent","macintosh") !== false)
		{
			return "Macintosh";
		}
		elseif (strpos("$useragent","linux") !== false)
		{
			return "Linux";
		}
		elseif (strpos("$useragent","freebsd") !== false)
		{
			return "Free BSD";
		}
		elseif (strpos("$useragent","symbian") !== false)
		{
			return "Symbian";
		}
		else
		{
			return 'Não encontrado';
		}
	}
	
	
}

?>