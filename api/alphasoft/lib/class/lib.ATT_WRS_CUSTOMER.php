<?php

/**
 * Obtendo informações do usuário
 */

includeCLASS('WRS_USER');
includeQUERY('WRS_PANEL');
includeQUERY('WRS_MANAGE_PARAM');

class ATT_WRS_CUSTOMER extends WRS_BASE
{
	
	private $OBJECT			= 	NULL;
	private $event			=	NULL;
	private $_query			=	NULL;
	private $cube			=	array();
	

	public function run($event,$paran_query,$cube_s)
	{
		$this->event		=	empty($event)?fwrs_request('event'):$event;
		$this->_query		=	new QUERY_PANEL();
		$cube_s				=	empty($cube_s)?fwrs_request('cube_s'):$cube_s;		
		
		$cubes				=	WRS::GET_SSAS_USER();
		$this->cube			=	$cubes[$cube_s];
		
		return "EVENTO RUN lib.ATT_WRS_CUSTOMER - Event: ".print_r($event,1).' - param: '.print_r($paran_query,1).' - cube_s: '.print_r($cube_s,1);
	}
	
	public function SetObject($Object)
	{
		$this->OBJECT=$Object;
	}
	


	public function change_query_exception($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		switch($this->event)
		{
			case 'runGrid':  return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL); break;
		}
	}
	

	private function getQuerySelectReports(){
	
		$cube_id		=	fwrs_remove_colchete($this->cube['CUBE_ID']);
		$database_id	=	fwrs_remove_colchete($this->cube['DATABASE_ID']);
	
		$user			=	WRS::INFO_SSAS_LOGIN();

		$sql			=	$this->_query->GET_SSAS_REPORT($database_id, $cube_id,0);
		return $sql;
	
	}
	
	
	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
	
		$sql			=	$this->getQuerySelectReports();
	
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
				return WRS_MANAGE_PARAM::select('*', $rows['TABLE_NAME'], $orderBy, $orderByPOS, $_start, $_end,$_where);
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
	
	
	public function insert($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>INSERT CLASS - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	public function update($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>UPDATE CLASS - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	public function delete($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>DELETE CLASS - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	

}

?>