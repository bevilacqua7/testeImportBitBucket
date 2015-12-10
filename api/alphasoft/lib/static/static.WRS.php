<?php 

class WRS
{

	private static $_version	=	WRS_VERSION;
	
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
	
	
	
	/**
	 * Graca a quantidade de coluinas de uma query
	 * @param string $query_table
	 * @param int $columns
	 */
	public static function SET_TOTAL_COLUMN($query_table,$columns)
	{
		if(!isset($_SESSION['QTD_QUERY_TABLE']))
		{
			$_SESSION['QTD_QUERY_TABLE']	=	array();
		}
		
		$_SESSION['QTD_QUERY_TABLE'][$query_table]	=	$columns;
	}
	
	/**
	 * Verifica a quantidade de Columnas de um QUery
	 * @param int $query_table
	 */
	public static function GET_TOTAL_COLUMN($query_table)
	{
		if(!isset($_SESSION['QTD_QUERY_TABLE'][$query_table])) return 1;
		
		return $_SESSION['QTD_QUERY_TABLE'][$query_table];
	}
	
	
	public static function CLEAN_TOTAL_COLUMN()
	{
		return $_SESSION['QTD_QUERY_TABLE']	=	 array();
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
	 * Retorna informações das restricoes dos filtros do Cliente
	 */
	public static function INFO_SSAS_LOGIN_FILTER_FIXED()
	{
		$filters 		= WRS::INFO_SSAS_LOGIN('USER_FILTER');
		$filters_values = WRS::INFO_SSAS_LOGIN('USER_FILTER_VALUE');
		$arr_retorno=false;
		if(trim($filters)!='' && trim($filters_values)!='')
		{
			$qtde_filters 						= 	explode(',',$filters);
			$qtde_filters_values 				= 	explode(',',$filter_values);
			if(count($qtde_filters)>1 && count($qtde_filters_values)>1)
			{
				foreach($qtde_filters as $key => $filtro)
				{
					$arr_retorno[$filtro]		=	explode(',',str_replace(array('[',']'),'',$qtde_filters_values[$key]));
				}
			}
			else
			{
				$arr_retorno[trim($filters)] 	= 	array(trim($filters_values));
			}
		}
		return $arr_retorno;
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
	
	/*
	 * Devolve o login ID
	 */
	public static function GET_LOGIN_ID()
	{
		return $_SESSION['LOGIN_ID'];
	}
	
	/**
	 * Grava o Logind ID
	 * @param string $login
	 */
	public static function SET_LOGIN($login,$perfil=null)
	{
		$_SESSION['LOGIN']		=	$login;
		$_SESSION['USER_CODE']	=	(trim($perfil)!='' && $perfil!=null)?$perfil:$login;
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
	
	public static function SET_CACHE_JOB_RESULT($report_id,$data)
	{
		
		$key	=	'CACHE_JOB_RESULT';
		
		if(!isset($_SESSION[$key])) $_SESSION[$key]	=	 array();
		$_SESSION[$key][$report_id]	=	$data;
		
	}
	
	public static function GET_CACHE_JOB_RESULT($report_id)
	{
		$key	=	'CACHE_JOB_RESULT';
		return $_SESSION[$key][$report_id];
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
	 * 
	 * Gravando informações do Historico dos Relatórios
	 * 
	 * @param string $cube_id
	 * @param int 	 $report_id
	 * @param array  $history
	 */
	public static function SET_REPORT_HISTORY($cube_id,$report_id,$history)
	{
		$TAG_NAME		=	'CUBE_REPORT_HISTORY';
		
		self::declare_REPORT_HISTORY($TAG_NAME, $cube_id, $report_id);
		
		if(empty($history)) return false;

		 $_SESSION[$TAG_NAME][$cube_id][$report_id]	=	$history;
	}
	
	
	/**
	 * Garante que seja gerado apenas um ID para quando não existir Registro de ID Report
	 * @param string  $cube_id
	 * @return number
	 */
	public static function GET_REPORT_HISTORY_CURRENT($cube_id,$return_data=false)
	{
		$multiple_cube		=	array();
		
		$TAG_NAME		=	'CUBE_REPORT_HISTORY';
		$TMPMktime		=	fwrs_mktime();
		$ReportId		=	'ABA_'.rand(0,99999999999999);
		$report_history	=	array();
		
		if(isset($_SESSION[$TAG_NAME][$cube_id]))
		{
			
			$multiple_cube		=	WRS::GET_SSAS_USER_MULTIPLE($cube_id);
			
			
			foreach($multiple_cube as $cube_session)
			{
				//
					$cube_detail	=	 $_SESSION[$TAG_NAME][$cube_session['CUBE_ID']];
					
					foreach($cube_detail as $data)
					{
						$data				=	 json_decode(base64_decode($data),true);
						$dataHitorico		=	$data[0];
						//WRS_DEBUG_QUERY($dataHitorico);
							
							if($dataHitorico['mktime']<=$TMPMktime){
								$TMPMktime		=	$dataHitorico['mktime'];
								$ReportId		=	$dataHitorico['kendoUi']['REPORT_ID'];
								$report_history	=	$dataHitorico;
							}
						
					}
			}
			
		}
		
		if($return_data)	return base64_encode(json_encode($report_history,true));
		
		return $ReportId;
	}
	
	
	
	/**
	 * 
	 * Deletando um cubo ID do Histórico
	 * 
	 * @param string $cube_id
	 * @param string $report_id
	 */
	public static function DELETE_REPORT_HISTORY($cube_id,$report_id)
	{
		$TAG_NAME		=	'CUBE_REPORT_HISTORY';
	
		self::declare_REPORT_HISTORY($TAG_NAME, $cube_id, $report_id);
		
		if(isset($_SESSION[$TAG_NAME][$cube_id][$report_id])){
			unset($_SESSION[$TAG_NAME][$cube_id][$report_id]);
		}
		
	}
	
	
	
	
	/**
	 * Apagando o histórico dos cubos
	 * 
	 * @param string $cube_id
	 */
	public static function DEL_ALL_REPORT_HISTORY($cube_id=null)
	{
			$TAG_NAME		=	'CUBE_REPORT_HISTORY';
			$report_history	=	array();

			if(empty($cube_id)) 
			{
				unset($_SESSION[$TAG_NAME]);
			}
			else
			{
				unset($_SESSION[$TAG_NAME][$cube_id]);
			}
			
			WRS::CLEAN_TOTAL_COLUMN();
	}
	
	
	/**
	 * 
	 * PEgabd
	 * 
	 * @param string $cube_id
	 * @param int $report_id
	 */
	public static function GET_REPORT_HISTORY($cube_id,$report_id)
	{
		$TAG_NAME		=	'CUBE_REPORT_HISTORY';
	
		self::declare_REPORT_HISTORY($TAG_NAME, $cube_id, $report_id);
	
		return isset($_SESSION[$TAG_NAME][$cube_id][$report_id]) ? $_SESSION[$TAG_NAME][$cube_id][$report_id] : NULL;
	}
	
	/**
	 * Apenas confere o Array da estring History
	 * 
	 * @param string $TAG_NAME
	 * @param string $cube_id
	 * @param int    $report_id
	 */
	private static function declare_REPORT_HISTORY($TAG_NAME,$cube_id,$report_id)
	{
		if(!isset($_SESSION[$TAG_NAME])) $_SESSION[$TAG_NAME]=array();
		
		if(empty($cube_id)) 
		{
			return false;
		}
		
		if(!isset($_SESSION[$TAG_NAME][$cube_id]))
		{
			$_SESSION[$TAG_NAME][$cube_id]	=	array();
		}
	
		 
	
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