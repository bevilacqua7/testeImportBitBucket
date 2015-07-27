<?php 

class WRS
{

	private static $_version	=	"1.0.0";
	
	public static function VERSION()
	{
		return self::$_version;
	}
	/**
	 * 
	 * Grava todas as regras do usuário regras que são informadas ao se conectar
	 * 
	 * Pode-se gravar informações dentro do array no proprio momento de Gravação
	 * @param array $rulesPosArray
	 * @param string $label
	 * @param string $value
	 */
	public static function SET_SSAS_USER($rulesPosArray,$label=NULL,$value=NULL)
	{
//		WRS_DEBUG_QUERY(print_r($rulesPosArray,true));
		if(empty($label) && empty($force))
		{
			$_SESSION['SSAS_USER']	=	$rulesPosArray;
		}else{
			$_SESSION['SSAS_USER'][$rulesPosArray][$label]	=	$value;
		}
	}
	
	/*
	 * Contem aso MUltiplos cubos
	 */
	public static function SET_SSAS_USER_MULTIPLE($multipleCube)
	{
			$_SESSION['SSAS_USER_MULTIPLE']	=	$multipleCube;
	}
	
/*
	 * Contem aso MUltiplos cubos
	 */
	public static function GET_SSAS_USER_MULTIPLE($cube_id)
	{
			RETURN  $_SESSION['SSAS_USER_MULTIPLE'][$cube_id];
	}
	
	
	/**
	 * 
	 * Grava todas as regras do usuário regras que são informadas ao se conectar
	 * 
	 * Pode-se gravar informações dentro do array no proprio momento de Gravação
	 * @param array $rulesPosArray
	 * @param string $label
	 * @param string $value
	 */
	public static function SET_SSAS_USER_IN_ARRAY($rulesPosArray,$label,$value)
	{
		$_SESSION['SSAS_USER'][$rulesPosArray][$label]	=	$value;
	}

	/**
	 * Retorna toda as regras por usuário regras que são informadas ao se conectar
	 * @return session
	 */
	public static function GET_SSAS_USER()
	{
		return WRS_SESSION('SSAS_USER');
	}
	
	/**
	 * Grava o ID do Usuário
	 * @param int $user_id
	 */
	public static function SET_USER_ID($user_id)
	{
		$_SESSION['USER_ID']	=	$user_id;
	}

	/**
	 * Grava o ID do Cliente
	 * @param int $custumer_id
	 */
	public static function SET_CUSTOMER_ID($custumer_id)
	{
		$_SESSION['CUSTOMER_ID']	=	$custumer_id;
	}
	
	
	/**
	 * INformações do usuário com o Cliente
	 * @param string $customer_user
	 */
	public static function SET_INFO_SSAS_LOGIN($customer_user,$value=NULL)
	{
		if(empty($value))
		{
			//Gravando o Array completo
			$_SESSION['SSAS_Login']	=	$customer_user;
		}else{
			//Modificando uma variável já existente
			$_SESSION['SSAS_Login'][$customer_user]	=	$value;
		}
	}
	
	/**
	 * Retorna informações do usuário por CLiente
	 * @param string $label
	 * @return string|Array
	 */
	public static function INFO_SSAS_LOGIN($label=NULL)
	{
		$SSASLogin	=	WRS_SESSION('SSAS_Login');
		
		if(empty($label)){
			return $SSASLogin;
		}
		
		$request	=	 isset($SSASLogin[$label]) ? $SSASLogin[$label] : NULL;
		
		
		switch ($label)
		{
			case 'USER_FORMAT' : {
										$request = empty($request) ? 'theme-azul' : $request;
										
										if(strpos($request, 'theme-')===false){
											$request	=	'theme-'.$request;
										}
										
									}; break; 
			case 'LANGUAGE_ID' : $request = empty($request) ? 'POR' 			: $request; break; 
		}
		return $request;
	}
	
	/**
	 * Grava o Logind ID
	 * @param string $login_id
	 */
	public static function SET_LOGIN_ID($login_id)
	{
		$_SESSION['LOGIN_ID']	=	$login_id;
	}
	
	
	/**
	 * Grava o Logind ID
	 * @param string $login
	 */
	public static function SET_LOGIN($login)
	{
		$_SESSION['LOGIN']		=	$login;
		$_SESSION['USER_CODE']	=	$login;
	}
	
	/**
	 * Retorna o Login ID
	 * @return session
	 */
	public static function LOGIN_ID()
	{
		return WRS_SESSION('LOGIN_ID');
	}
	
	
	/**
	 * Pegando o Login do usuário
	 * @return session
	 */
	public static function LOGIN()
	{
		return WRS_SESSION('LOGIN');
	}
	
	
	/**
	 * Retorna o Id do Usuário
	 * @return session
	 */
	public static function USER_ID()
	{
		return WRS_SESSION('USER_ID');
	}
	
	/**
	 * Retorna o Id do Cliente
	 * @return session
	 */
	public static function CUSTOMER_ID()
	{
		return WRS_SESSION('CUSTOMER_ID');
	}
	
	public static function SERVER_ID()
	{
		return WRS_SESSION('SERVER_ID');
	}
	
	public static function USER_CODE()
	{
		return WRS_SESSION('USER_CODE');
	}
		
	public static function USER_DESC()
	{
		
		return self::INFO_SSAS_LOGIN('USER_DESC');
	}
	
	public static function USER_TYPE()
	{
		return self::INFO_SSAS_LOGIN('USER_TYPE');
	}
	
	public static function CUSTOMER_DESC()
	{
		return self::INFO_SSAS_LOGIN('CUSTOMER_DESC');
	}
	
	/**
	 * Retorna o Idioma
	 * @return session
	 */
	public static function USER_LANGUAGE()
	{
		return self::INFO_SSAS_LOGIN('LANGUAGE_ID');
	}
	

	public static function getTABLE_CACHE_REPORT($report_id)
	{
			if(isset($_SESSION['TABLE_CACHE_REPORT'][$report_id]))
			{
				return $_SESSION['TABLE_CACHE_REPORT'][$report_id];
			}
			
		return NULL;
	}
	
	public static function setTABLE_CACHE_REPORT($report_id,$name_table_cache)
	{	
		$_SESSION['TABLE_CACHE_REPORT'][$report_id]	=	$name_table_cache;
	}
	
	public static function cleanTABLE_CACHE_REPORT()
	{
		$_SESSION['TABLE_CACHE_REPORT'] = array();
	}
	
	/**
	 * Armazena as informações que serão globais 
	 * Contem todas as informações dos Cubos
	 * Apenas é carregado uma única vez 
	 * Orientação do Marcelo Facioli
	 * @param array $array
	 */
	public static function setWRS_DASHBOARD_Relationships($array)
	{
		$_SESSION['WRS_DASHBOARD_Relationships']	=	$array;
	}
	
	
	/**
	 * Retorna as  informações do Cubo
	 * @return array
	 */
	public static function getWRS_DASHBOARD_Relationships()
	{
		return isset($_SESSION['WRS_DASHBOARD_Relationships']) ? $_SESSION['WRS_DASHBOARD_Relationships'] : NULL;
	}
	
	
	/**
	 * Controla as variáveis da Header que é necessário para trazer os resultados das linhas por colunas
	 * Apenas utilizado no WRS_DASHBOARD_CARREGA_GRID e é alimentado no WRS_DASHBOARD_QUADRANTE
	 * @param int $report_id
	 * @param array $valeu
	 */
	public static function setWRS_TEMP_COMMON_COLUMN($report_id,$value)
	{
		$_SESSION['WRS_TEMP_COMMON'.$report_id]	=	$value;
	}
	
	/**
	 * Retorna a common
	 * Apenas utilizado no WRS_DASHBOARD_CARREGA_GRID e é alimentado no WRS_DASHBOARD_QUADRANTE
	 * @param int $report_id
	 * @return  array
	 */
	public static function getWRS_TEMP_COMMON_COLUMN($report_id)
	{
		return isset($_SESSION['WRS_TEMP_COMMON'.$report_id]) ? $_SESSION['WRS_TEMP_COMMON'.$report_id] : NULL;
	}
	 
	
	/**
	 * Para saber quando executa a Ordenação para cada report 
	 * executado em WRS_DASHBOARD_CARREGA_GRID
	 * 
	 * @param  int $report_id
	 */
	public static function setReportSortDashBoard($report_id,$flag=true)
	{
		$_SESSION['ReportSort'.$report_id]=$flag;
	}
	
	/**
	 * Informa se pode executar o sort da tabela temporária
	 * Executado emn WRS_DASHBOARD_CARREGA_GRID
	 * @param int $report_id
	 * @return boolean
	 */
	public static function getReportSortDashBoard($report_id)
	{
		return isset($_SESSION['ReportSort'.$report_id]) ? $_SESSION['ReportSort'.$report_id] : false;
	}
	
	
	/**
	 * 
	 * Armazena valores do total de resultados da tabela tenporária por id reporyt
	 * @param int $report_id
	 * @param int $size
	 */
	public static function setReportSortDashboardRowsSize($report_id,$size)
	{
		$_SESSION['ReportSortDashboardRowsSize'.$report_id]	= $size;
	}
	
	
	/**
	 * Retorna qual o total do report id
	 * @param unknown $report_id
	 * @return Ambigous <NULL, unknown>
	 */
	public static function getReportSortDashboardRowsSize($report_id)
	{
		return isset($_SESSION['ReportSortDashboardRowsSize'.$report_id]) ? $_SESSION['ReportSortDashboardRowsSize'.$report_id] : 0;
	}
	
	
	/**
	 * para poder identificar se o tipo de otrdenação foi modificado 
	 * @param int $report_id
	 * @param string $value
	 * @return string
	 */
	public static function setGetDashboardSiDx($report_id,$value=NULL)
	{
		$back_report	=	isset($_SESSION['DashboardSiDx'.$report_id]) ? $_SESSION['DashboardSiDx'.$report_id] : NULL;

		if(!empty($value))
		{
			$_SESSION['DashboardSiDx'.$report_id]	=	$value;
		}
		
		return $back_report;
	}
	
	
	/**
	 * Session para armazenar o Array do gráfico
	 * @param array $data
	 * @param int $report_id
	 * @param int $quadrante
	 */
	public static function setJQCHART($data,$report_id)
	{
		$_SESSION['WRS_CHART_REP_'.$report_id]		=	$data;
	}
	
	/**
	 * Retorna o Array do Gráfico
	 * @param int $report_id
	 * @param int $quadrante
	 * @return unknown
	 */
	public static function getJQCHART($report_id)
	{
		return $_SESSION['WRS_CHART_REP_'.$report_id];
	}
	
	
	/*********************************************************************************************************************
	 * 
	 * Controle dos processos para enviar a consulta ao Banco de dados
	 * 
	 * ******************************************************************************************************************
	 */
	
	
	/**
	 * Grava os Atributos na Sessão por Cubo
	 * 
	 * @param string $cube_id
	 * @param array $rows
	 */
	public static function SET_SSAS_RELATIONSHIPS_BY_CUBE($cube_id,$rows)
	{
		return $_SESSION['GET_SSAS_RELATIONSHIPS'][$cube_id]	=	$rows;
	}
	
	
	/**
	 * 
	 * Retorna os Atributos por cubo
	 * 
	 * @param string $cube_id
	 * @return array
	 */
	public static function GET_SSAS_RELATIONSHIPS_BY_CUBE($cube_id)
	{
		if(isset($_SESSION['GET_SSAS_RELATIONSHIPS'][$cube_id]))
		{
			return $_SESSION['GET_SSAS_RELATIONSHIPS'][$cube_id];	
		}
		
		return NULL;
	}
	
	
	/**
	 * Gravando as Metricas por Cubo
	 * @param string $cube_id
	 * @param array $rows
	 */
	public static function SET_SSAS_MEASURES_BY_CUBE($cube_id,$rows)
	{
		return $_SESSION['GET_SSAS_MEASURES'][$cube_id]	=	$rows;
	}
	
	/**
	 * Gravando a Measure info Por MEASURE_NAME
	 * @param string $cube_id
	 * @param array $ROWS
	 */
	public static function SET_SSAS_MEASURES_BY_CUBE_UNIQUE_NAME($cube_id,$ROWS)
	{
		$_SESSION['GET_SSAS_MEASURES_UNIQUE_NAME'][$cube_id][$ROWS['MEASURE_NAME']]	=	$ROWS;
	}
	
	
	/**
	 * Pega as informaçlões por MEASURE_NAME
	 * @param string $cube_id
	 * @param string $MEASURE_NAME
	 * 
	 * @return array
	 */
	public static function GET_SSAS_MEASURES_BY_CUBE_UNIQUE_NAME($cube_id,$MEASURE_NAME)
	{
		return $_SESSION['GET_SSAS_MEASURES_UNIQUE_NAME'][$cube_id][$MEASURE_NAME];
	}
	
	
	/**
	 * 
	 * Gravando a primeira linha de Measure de cada Cubo 
	 * @param string $CUBE_ID
	 * @param array $MEASURE_ROW
	 */
	public static function set_FIRST_MEASURE_CUBE($CUBE_ID,$MEASURE_ROW)
	{
		$_SESSION['FIRST_MEASURE_CUBE'][$CUBE_ID]	=	$MEASURE_ROW;
	}
	
	
	/**
	 * 
	 * Retorna a primeira linha de dados da measure por cubo
	 * @param string $CUBE_ID
	 * @return array
	 */
	public static function get_FIRST_MEASURE_CUBE($CUBE_ID)
	{
		$measure	=	NULL;
		
		if(isset($_SESSION['FIRST_MEASURE_CUBE'][$CUBE_ID]))
		{
			$measure	=	 $_SESSION['FIRST_MEASURE_CUBE'][$CUBE_ID];
		}
		
		return $measure;
	}
	
	
	/**
	 *
	 * Retorna as metricas por cubo
	 * TODO:Verificar a estrutura de cache
	 * @param string $cube_id
	 * @return array
	 */
	public static function GET_SSAS_MEASURES_BY_CUBE($cube_id)
	{
	//	return NULL;
		
		if(isset($_SESSION['GET_SSAS_MEASURES'][$cube_id]))
		{
			return $_SESSION['GET_SSAS_MEASURES'][$cube_id];
		}
	
		return NULL;
	}

}

?>