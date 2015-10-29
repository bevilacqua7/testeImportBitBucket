<?php 
/**
 * Concentra todas as interações HTMLS que o WRS venha necessitar a criar com o PHP
 * 
 * Author: Marcelo Santos
 * Company:Alpha Soft
 * Date: 17/12/2014 : 17:42
 */

includeClass('WRS_BASE');

class WRS_MAIN  extends WRS_BASE
{
 
	public function run()
	{
		WRS_TRACE('Iniciando a run()', __LINE__, __FILE__);
		$event	=	 fwrs_request('event');

		switch($event)
		{
			case 'updateTheme'  : $this->updateTheme(); break;
			case 'updateIdioma' : $this->updateIdioma(); break;
			case 'logout' 		: $this->logout(); break;
		}
		
		if(!empty($event))  exit();
		
		// ao entrar na pagina inicial do sistema, apaga os historicos existentes para nao interferir na criacao de novos relatorios
		WRS::DEL_ALL_REPORT_HISTORY();
		
		
		WRS_TRACE('Pegando as variáveis para montar o template', __LINE__, __FILE__);
		$SELECT_THEME		=	$this->getTheme();
		$WRS_LOGO			= 	$this->getLogo();
		$SELECT_IDOMA		=	$this->getIdioma();
		$WRS_MAIN_DATABASES	=	$this->getDatabasesBox();
		
		
		$WRS_MAIN_DATABASES_DASHBOARD	=	$WRS_MAIN_DATABASES['dashboard'];
		
		
		$WRS_MAIN_DATABASES				=	$WRS_MAIN_DATABASES['database'];
		
		WRS_TRACE('Montando template wrs_main.php', __LINE__, __FILE__);
		include_once(PATH_TEMPLATE.'wrs_main.php');
		WRS_TRACE('Template Montado', __LINE__, __FILE__);
		
	}
	
	private function logout()
	{
		includeQUERY('WRS_LOGIN');
		//Fazendo o Logout
		$this->query(QUERY_LOGIN::LOGOUT_SSAS(WRS::LOGIN_ID()));
		session_destroy();
		header('Location: login.php');
		exit();
	}
	
	private function updateTheme()
	{
		WRS_TRACE('Alterando o updateTheme', __LINE__, __FILE__);
		
		$theme	=	 fwrs_request('theme');
		$theme	=	 empty($theme) ? 'theme-azul' : $theme;
		WRS::SET_INFO_SSAS_LOGIN('USER_FORMAT',$theme);	
	}
	
	/**
	 * Pesquisa o Logo
	 * @return string
	 */	
	private function getLogo()
	{
		$logo		=	 WRS::INFO_SSAS_LOGIN('CUSTOMER_CODE');
		$logo		=	"./imagens/logos/".$logo.".png";
		return file_exists($logo) ? $logo : "./imagens/logos/TST.png";
	}
	
	
	/**
	 * Temas
	 * @return Ambigous <string, mixed>
	 */
	private function getTheme()
	{
		$theme	=	array();
		$theme['theme-azul']	='Azul';
		$theme['theme-cinza']	='Cinza';
		$theme['theme-laranja']	='Laranja';
		$theme['theme-verde']	='Verde';
		$theme['theme-vermelho']='Vermelho';

		$implements		=	 array();
		
		$implements['name']		='WRSChangeTheme';
		$implements['class']	='WRSChangeTheme';
		

		return select($theme,WRS::INFO_SSAS_LOGIN('USER_FORMAT'),$implements);
	}
	
	
	private function getIdioma()
	{
		$theme	=	array();
		$theme['ENG']	='English';
		$theme['POR']	='Portuguese';
		$theme['ESP']	='Espanhol';
		
		$implements		=	 array();
		
		$implements['name']		='WRSChangeIdioma';
		$implements['class']	='WRSChangeIdioma';
		
		return select($theme,WRS::INFO_SSAS_LOGIN('LANGUAGE_ID'),$implements);
		
	}
	 
	/**
	 * Mudando o Idioma
	 */
	private function updateIdioma()
	{
		$idioma	=	 fwrs_request('idioma');
		WRS::SET_INFO_SSAS_LOGIN('LANGUAGE_ID',$idioma);
	}
	
	private function getDatabasesBox()
	{
		$html_body	=	NULL;
		$html		=	NULL;
		
		$cubo_info	=	 WRS::GET_SSAS_USER();
		$dashboard	=	NULL;

		$EDITION_TITLE		=	LNG('HTML_CUBE_EDITION');
		$ATUALIZACAO_TITLE	=	LNG('HTML_CUBE_UPDATE');

		$count		=	0;
		
		foreach($cubo_info as $label =>$value)
		{
			//if(empty($label)) continue;//garante que não passe lixo para o sistema o campo obrigatóriamente tem que ter ID
			
			$DATABASE_DESC			=	$value['DATABASE_DESC'];
			$CUBE_EDITION			=	$value['CUBE_EDITION'];
			$CUBE_UPDATE			=	$value['CUBE_UPDATE'];
			$DATABASE_IMAGE			=	$value['DATABASE_IMAGE'];
			$DATABASE_COMMENT		=	$value['DATABASE_COMMENT'];
			$STATUS					=	$value['STATUS'];
			$WARNING				=	NULL;
			$flag_cube_indisponivel	=	false;
			
			
			$LINK				=	'run.php?file=WRS_PANEL&class=WRS_PANEL&'.TAG_URL_CUBE_SELECTED.'='.($count)."&exec_reports=1";
			$LINK_LAYOUT		=	'run.php?file=WRS_PANEL&class=WRS_PANEL&'.TAG_URL_CUBE_SELECTED.'='.($count)."&exec_reports=0";
			$TITLE_LINK			=	LNG('MAIN_OPEN_REPORT');
			$TITLE_LINK_LAYOUT	=	LNG('MAIN_OPEN_LAYOUT');
			
			$count++;
			//Garantindo que não vá lixo
			if(empty($DATABASE_IMAGE)) continue;
			
			if(empty($CUBE_UPDATE) && empty($value['DATABASE_LINK']) || $STATUS==0)
			{
				$WARNING 				= fwrs_error(LNG('ERRO_CUBO_INDISPONIVEL'));
				$flag_cube_indisponivel	=	true;
			}
			
			
			if(!empty($value['DATABASE_LINK'])){
				$LINK	=$value['DATABASE_LINK'];
			}
			
			include(PATH_TEMPLATE.'wrs_main_database.php');
			
			
			
			
			if(!$flag_cube_indisponivel)
			{
				if(!empty($value['DATABASE_LINK']))
				{
					$dashboard.=	$html;
					continue;
				}
				
				if(empty($CUBE_UPDATE)) continue;
			}
			
			
			
			
			$html_body.=$html;
		}
		
		
		$perfil_type	=	 WRS::INFO_SSAS_LOGIN('PERFIL_ID');
		if($perfil_type == 'MST' || $perfil_type == 'ADM' )
		{
			
			$DATABASE_DESC		=	'DASHBOARD';
			$DATABASE_COMMENT	=	LNG('TITLE_MENU_DASHBOARD');
			$DATABASE_IMAGE		=	'_dashboard.jpg';
			$LINK				=	'dashboard/';

			include(PATH_TEMPLATE.'wrs_main_database.php');
			$dashboard.=$html;
			
		}
		
		
		return array('database'=>$html_body,'dashboard'=>$dashboard);
	}
	 
}

?>