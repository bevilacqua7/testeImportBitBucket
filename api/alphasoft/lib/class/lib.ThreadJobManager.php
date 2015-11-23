<?php 

/**
 * 
 * Controle das sessões das Thread dos JOBS
 * 
 * Função principal apenas armazenar as variáveis de ambiente para não levar para o Javascript
 * 
 * @author Marcelo Santos
 *
 */

//includeCLASS('WRS_USER');

class ThreadJobManager extends WRS_USER
{
	
	private  $labelSession	=	'WRS_ThreadJobManager';

	 
	/**
	 * Contem as querys do WRS_PANEL
	 * @var QUERY_PANEL
	 */
	private $_query			=	 NULL;
	
	
	/**
	 * Verifica se o array princial foi criado o se já existe
	 */
	private function threadExist($report_id)
	{
		if(!array_key_exists($this->labelSession, $_SESSION))
		{
			$_SESSION[$this->labelSession]	=	array();
		}
	}

	/**
	 * Grava o ID report  com as variáveis de ambiente na sessão
	 * @param int $report_id
	 * @param array $input_array
	 */
	public  function setJOB($report_id,$input_val)
	{
		
		/**
		 * VErifica se existe o array principal
		 */
		$this->threadExist($report_id);
		
		//Gravando dados
		$_SESSION[$this->labelSession][$report_id]	=	$input_val;
		
	}
	
	
	/**
	 * 
	 * Recebendo as informações do JOB da sessão
	 * 
	 * @param int $report_id
	 * @return array
	 */
	public function getJOB($report_id)
	{
		$this->threadExist($report_id);
		
		if(!array_key_exists($report_id, $_SESSION[$this->labelSession]))
		{
			return false;
		}
		
		//retorna estrutura
		return $_SESSION[$this->labelSession][$report_id];		
		
	}
	
	
	/**
	 * Remoneteno da sessão o JOB
	 * 
	 * @param int $report_id
	 */
	public function removeJOB($report_id)
	{
	
		$this->threadExist($report_id);
		
		if(!array_key_exists($report_id, $_SESSION[$this->labelSession]))
		{
			return false;
		}
		
		//Removendo array por acossiação 
		unset($_SESSION[$this->labelSession][$report_id]);		
	}
	
	
	/**
	 * 
	 * Processando a Thread executa no processo inicial de quando solicitado pela thread do Javascript
	 * 
	 * @param array $inputThread
	 * @param int $report_id
	 * @param QUERY_PANEL
	 * @param boolean $checkThreadJobManager
	 * @return boolean|array
	 */

	public function runThreadJobManager($inputThread,$report_id,$queryPanel,$checkThreadJobManager=false)
	{
		//Incluindo aas querys
		$this->_query					=	$queryPanel;
		$ROWSL							=	$inputThread['ROWSL'];
		$getRequestKendoUi				=	$inputThread['getRequestKendoUi'];
		$getRequestWrsExceptions		=	$inputThread['getRequestWrsExceptions'];
		$cube							=	$inputThread['cube'];
		$getRequestKendoUi_TAG			=	$inputThread['getRequestKendoUi_TAG'];
		$DillLayout						=	$inputThread['DillLayout'];
		$CUBE							=	$inputThread['CUBE'];
		$rows_CREATE_SSAS_JOB			=	$inputThread['CREATE_SSAS_JOB'];
		$cube_s							=	$inputThread['cube_s'];
		$USER_CODE						=	$inputThread['USER_CODE'];
		
		
		$msg							=	NULL;//mensagens do sistema muda a cada conjunto de regras
		/*
		 * TODO: Verificar as mensagem de retorno quando ocorrer erro
		 */
		
		if(!$checkThreadJobManager){
			$this->setJOB($report_id, $inputThread);
		}
		
		
//		
		
		
		//compartilhando apenas algumas informações da querty para comparações
		$rows_GET_SSAS_JOB		=	$rows_CREATE_SSAS_JOB;
		

		
		
		//TODO:Remover esse IF inteiro
		if(empty($rows_CREATE_SSAS_JOB['QUERY_ID']))
		{
			//return array('cube'=>$cube,'REPORT_ID'=>$getRequestKendoUi['REPORT_ID'], '_param'=>$this->_param,'wait_thread'=>true);
		}
		

		if($rows_CREATE_SSAS_JOB['JOB_STATUS'] != 4)
		{
			$job_status 		= $this->_query->GET_SSAS_JOB($rows_CREATE_SSAS_JOB['QUERY_ID']);
			$job_status_exec	= $this->query($job_status);
			$rows_GET_SSAS_JOB 	= $this->fetch_array($job_status_exec);
			
			//$rows_GET_SSAS_JOB['JOB_STATUS']		=	3;	
			

			if(($rows_GET_SSAS_JOB['JOB_STATUS'] == 1) || ($rows_GET_SSAS_JOB['JOB_STATUS'] == 2) || ($rows_GET_SSAS_JOB['JOB_STATUS'] == 3))
			{
				
				return array('cube'=>$cube, 'REPORT_ID'=>$getRequestKendoUi['REPORT_ID'],'_param'=>$this->_param,'wait_thread'=>true,'data'=>$rows_GET_SSAS_JOB);
			}
			
		}
		
		
		/*
		 * TODO: Remover
		 */
		//$rows_GET_SSAS_JOB['JOB_STATUS']	=	3; 
			
		// Verifica o Retorno do Job
		if($rows_GET_SSAS_JOB['JOB_STATUS'] == 4)
		{
			// Verifica se o Job é de outro usuário
			//WRS_DEBUG_QUERY('Remover:::'.$getRequestKendoUi['DRILL_HIERARQUIA_LINHA']);
			//Salvando o nome da tabela cache
			$QUERY_TABLE_CACHE		=	$rows_GET_SSAS_JOB['QUERY_TABLE'];
			
			$this->SAVE_CACHE_SSAS_USER('TABLE_CACHE',$QUERY_TABLE_CACHE,$cube_s);
			
			if($rows_GET_SSAS_JOB['USER_CODE'] != $USER_CODE)
			{
				$copy_table 			= $this->_query->COPY_SSAS_TABLE($rows_CREATE_SSAS_JOB['QUERY_ID']);
				$copy_table_exec 		= $this->query($copy_table);
				$rows_GET_SSAS_JOB 		= $this->fetch_array($copy_table_exec);
					
				$this->SAVE_CACHE_SSAS_USER('TABLE_CACHE',$QUERY_TABLE_CACHE,$cube_s);
			}
			
			$cube =	$this->getCube();
			
		}
		elseif ($rows_GET_SSAS_JOB['JOB_STATUS'] < 0)
		{
			$msg	=	 fwrs_warning(LNG('MSG_ERROR_TABLE_CACHE'),$getRequestKendoUi_TAG).fwrs_javascript('CLOSE_LOAD_RELATORIO();');
			WRS_TRACE('MSG_ERROR:: '.$rows_GET_SSAS_JOB['QUERY_ERROR'].' - '.$queryGrid, __LINE__, __FILE__);
			WRS_DEBUG_QUERY('MSG_ERROR:: '.$rows_GET_SSAS_JOB['QUERY_ERROR'].' - '.$queryGrid);
			
			if($checkThreadJobManager)
			{
				return array('error'=>$msg,'REPORT_ID'=>$report_id,'data'=>$rows_GET_SSAS_JOB);
			}else{
				echo $msg;
			}
			
			return false;
			
		}
		else if($rows_GET_SSAS_JOB['JOB_STATUS'] == 5)
		{
		
			return array('error'=>'true','cancel'=>true,'REPORT_ID'=>$report_id,'data'=>$rows_GET_SSAS_JOB);
		}else
		{
			WRS_TRACE('ERROR::CREATE_SSAS_JOB não retornou informações QUERY:::'.$queryGrid, __LINE__, __FILE__);
			$msg	=	fwrs_warning(LNG('ERROR_NOT_ROWS'),$getRequestKendoUi_TAG);
			

			if($checkThreadJobManager)
			{
				return array('error'=>$msg,'REPORT_ID'=>$report_id,'data'=>$rows_GET_SSAS_JOB);
			}else{
				echo $msg;
			}
			
			return false;
		}
		
		return array('cube'=>$cube, 'REPORT_ID'=>$getRequestKendoUi['REPORT_ID'],'_param'=>$this->_param,'wait_thread'=>false,'data'=>$rows_GET_SSAS_JOB);
		
	}
	
	
	
}


?>