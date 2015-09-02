<?php 
/**
 * Concentra todas as interações HTMLS que o WRS venha necessitar a criar com o PHP
 * 
 * Author: Marcelo Santos
 * Company:Alpha Soft
 * Date: 17/12/2014 : 17:42
 */



includeCLASS('WRS_USER');
includeQUERY('WRS_REPORT');
includeQUERY('WRS_MANAGE_PARAM');

class WRS_REPORT  extends  WRS_USER
{
	
	private $event			=	NULL;
	private $paran_query	=	NULL;
	private $cube			=	array();
	
	/**
	 * 
	 * @var QUERY_WRS_REPORT
	 */
	private $_query			=	NULL;
	
	public function run($event,$paran_query,$cube_s)
	{
		$this->event		=	$event;
		$this->paran_query	=	$paran_query;
		
		$cubes				=	WRS::GET_SSAS_USER();
		$this->cube			=	$cubes[$cube_s];
		$this->_query		=	new QUERY_WRS_REPORT();
		
	}	


	public function change_query($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		switch($this->event)
		{
			case 'runGrid':  return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL); break;
		}
	}
	
	public function change_html($html)
	{
				WRS_TRACE('EVENTO: '.$this->event, __LINE__, __FILE__);
		switch($this->event)
		{
			case 'runGrid':
				WRS_TRACE('HTML: '.print_r($html,1), __LINE__, __FILE__);
				return $html; 
				break;
			default: return $html;			
		}
	}
		
	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		//return 'select * from TMP_REPORT_SSAS_1_3';
		
		$cube_id		=	fwrs_remove_colchete($this->cube['CUBE_ID']);
		$database_id	=	fwrs_remove_colchete($this->cube['DATABASE_ID']);
		
		$user			=	WRS::INFO_SSAS_LOGIN();
		
		$sql			=	$this->_query->Get_SSAS_Reports($user['CUSTOMER_ID'], $user['USER_CODE'], $user['PERFIL_ID'], $database_id, $cube_id);
		
		
		$query			=	 $this->query($sql);
		$error			=	false;
		$last_error		=	'';
		
		if($this->num_rows($query))
		{
			
			$rows		=	 $this->fetch_array($query);
			
			if(!empty($rows['ERROR_MESSAGE']))
			{
				$last_error		=	$rows['ERROR_MESSAGE'];
				$error			=	true;
			}else{
				return WRS_MANAGE_PARAM::select($columns, $rows['TABLE_NAME'], $orderBy, $orderByPOS, $_start, $_end,$_where);
			}
			
			
		}else{
			$last_error		=	'sem resultados para a consulta: '.$sql;
			$error			=	true;
		}
		
		
		
		
		if($error)
		{
			WRS_TRACE($last_error, __LINE__, __FILE__);
			return false;
		}
		
		
		
		
		

	}
	 
	 

	
	
}

?>