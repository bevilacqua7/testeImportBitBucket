<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa
includeQUERY('ATT_WRS_CUBE');

class ATT_WRS_CUBE extends WRS_BASE
{
	private $admin = NULL;
	
	public function __construct(){
		$this->admin = new WRS_AdminInterface();
		$this->admin->classname = 'ATT_WRS_CUBE';
		$this->queryClass		 = new QUERY_WRS_CUBE();
	}

	public function SetObject($Object)
	{
		$this->admin->SetObject($Object);
	}
	
	public function run()
	{
		$event	=	 fwrs_request('event');
		switch($event)
		{
			case 'downloadFile' : $this->downloadFile(); break;
		}
	}
	
	public function downloadFile(){
		$this->admin->downloadFile();
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
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
		unset($param['button']['import']);
		unset($param['button']['export']);
		unset($param['button']['remove']);
		return $param;
	}
	
	public function update($options)
	{
	
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		$arr_campos_valores = array();
		$arr_campos_request_classe = array(
				'class',
				'file',
				'event',
				'wrs_type_grid',
				'form_event'
		);
		$acao_form			= 'UPDATE'; // como utilizo o mesmo botao salvar para insert e update, virifico se chegou registro com ID ($param['primary']), se nao tiver ID, é insert, se não, update
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
	
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
				if(!in_array($nome_campo,$arr_campos_request_classe)){
					if($nome_campo==$param['primary']){
						if(trim($_request_original[$nome_campo])==''){
							$acao_form = 'INSERT';
						}
					}else{
						$separador = "''";
						if(array_key_exists('type', $param['field'][$nome_campo]) && $param['field'][$nome_campo]['type']=='int'){
							$separador='';
						}
						$arr_campos_valores[$nome_campo]=$_request_original[$nome_campo]==''?'NULL':$separador.$_request_original[$nome_campo].$separador;
					}
				}
			}
		}
		
		/**
		 * REGRA ADMINISTRATIVO para tabelas com chaves compostas - FACIOLI 20160226 - felipeb
		 * varre todos os fields e verifica quem possui o atributo PRIMARY, com isso, pode mandar mais de uma coluna primary como parametro para a query
		 */
		$primaries=array();
		foreach($param['field'] as $nomeField => $colunaAtual){
			if(array_key_exists('primary',$colunaAtual) && $colunaAtual['primary']){
				$primaries[] = $nomeField.' = '."''".$_request_original[$nomeField]."''";
			}
		}
		
		$condicao_query = ($acao_form=='UPDATE')?((count($primaries)>0)?implode(' and ',$primaries):''):'';
	
		unset($param['button']['import']);
		unset($param['button']['export']);
		unset($param['button']['remove']);
	
		$query_exec = $this->queryClass->Get_query_changetable_cube($_tabela, $arr_campos_valores, $condicao_query, $acao_form);
	
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status = $this->admin->query($query_exec);
		$msg = ($acao_form=='UPDATE')?LNG('ADMIN_REG_UPDATED'):LNG('ADMIN_REG_INSERTED');
		if(!$status){
			$st = sqlsrv_errors();
			$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');
			$msg					=	$DATA_BASE_ERROR.$st[0]['message'];
		}
	
		$this->admin->retornaMsgAcaoTelaAdmin($status,$msg,$_tabela,$query_exec);
	
	}
	
	public function delete($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		$_regForDelete		= json_decode($_request_original['extraValues'],1);
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
	
		if(!is_array($_regForDelete['objetosSelecionados']) || count($_regForDelete['objetosSelecionados'])==0){
			$msg = LNG('ADMIN_NO_REG');
			$this->admin->retornaMsgAcaoTelaAdmin(false,$msg,$_tabela,'');
		}
	
		//$condicao_query = $param['primary'].' in('.implode(',',$_regForDelete['objetosSelecionados']).') ';
	
		/*
		 * ATT_WRS_CUBE = Remove_SSAS_Cube( @CUBE_ID VARCHAR(100), @DATABASE_ID VARCHAR(100), @SERVER_ID VARCHAR(100), @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
		 */
		$USER_CODE 				= WRS::USER_CODE();
		$CUTOMER_ID 			= WRS::CUSTOMER_ID();
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status=true;

		$msg='';
		foreach($_regForDelete['objetosSelecionados'] as $id_for_del){
			
			if(is_array($id_for_del)){
				$saida=array();
				foreach($id_for_del as $obj){
					$saida[$obj['chave']]=$obj['valor'];
				}
				$id_for_del = $saida['CUBE_ID'].','.$saida['DATABASE_ID'].','.$saida['SERVER_ID'];
			}
			
			$condicao_query = $id_for_del.",".$CUTOMER_ID.",".$USER_CODE;
			$query_exec = $this->queryClass->Get_procedure_remove_cube($_tabela, $condicao_query);
			
			$query = $this->admin->query($query_exec);
			if(!$this->num_rows($query) || !$query)
			{
				$status=false;
				$st = sqlsrv_errors();
				$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');
				$msg					.=	$DATA_BASE_ERROR.$st[0]['message'];
				$this->admin->retornaMsgAcaoTelaAdmin($query,$msg,$_tabela,$query_exec);
				return false;
				/*
				 }else{
				 $rows 	= $this->fetch_array($query);
				 if(array_key_exists('output', $rows)){
				 $msg = $rows['output'];
				 }else if(array_key_exists('ERROR_MESSAGE', $rows)){
				 $status=false;
				 $msg = $rows['ERROR_MESSAGE'];
				 }
				 */
			}else{
				 $rows 	= $this->fetch_array($query);
				 if(array_key_exists('output', $rows)){
				 	$msg .= $rows['output']."<br>";
				 }else if(array_key_exists('ERROR_MESSAGE', $rows)){
				 	$status=false;
				 	$msg .= $rows['ERROR_MESSAGE']."<br>";
				 }else if(array_key_exists('REMOVE_MESSAGE', $rows)){
				 	$status=false;
				 	$msg .= $rows['REMOVE_MESSAGE']."<br>";
				 }
			}
		}
		$msg = ($msg!='' && !$status)?$msg:LNG_S('ADMIN_REG_DELETED',((count($_regForDelete['objetosSelecionados'])>1)?'s':''))."<br>".$msg;
		$this->admin->retornaMsgAcaoTelaAdmin($status,$msg,$_tabela,$query_exec);
		
	}
	
	public function import($options)
	{
	
		$_fields						= $options['field'];
		$_request_original 				= $_REQUEST;
		$_tabela						= $options['table'];
		$_request_original['campo_id'] 	= $options['primary'];
		$_request_original['_param'] 	= $options;
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
	
		unset($param['button']['update']);
		unset($param['button']['remove']);
		unset($param['button']['export']);
	
		$nome_arquivo = 'uploads/'.WRS::CUSTOMER_ID().'/';
	
		// criacao do HTML para exibir o form de upload ou realizar a importacao se houverem arquivos enviados
		$param['html'] = $this->admin->importarDadosEmMassa($nome_arquivo,$_request_original);
	
		return $param;
	}
	
	public function export($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$_regForExport		= json_decode($_request_original['extraValues'],1);
		$_regForExport['caracter_separacao'] = $_request_original['caracter_d'];
		$_regForExport['efetua_compactacao'] = $_request_original['caracter_c']!='nao'?true:false;
	
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
	
		unset($param['button']['update']);
		unset($param['button']['remove']);
		unset($param['button']['import']);
	
		$event_form						= WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($_request_original['event']);
		$_request_original['event'] 	= $event_form;
	
		$param['tabela_export']			= $event_form;
		$param['caracter_separacao']	= $_regForExport['caracter_separacao'];
		$param['efetua_compactacao']	= $_regForExport['efetua_compactacao'];
	
		$nome_diretorio = 'uploads/'.WRS::CUSTOMER_ID().'/';
		$param['nome_diretorio']	= $nome_diretorio;
	
	
		include PATH_TEMPLATE.'export_file_window.php';
		$link_download = $this->admin->downloadLink($_regForExport['objetosSelecionados'],$_regForExport['chave_primaria'],$param);
		if(!$link_download){
			$msg 	= LNG('ADMIN_EXPORT_OPTION_ERROR');
			$tipomsg= "error";
		}else{
			$msg 	= LNG('ADMIN_EXPORT_OPTION_OK');
			$tipomsg= "success";
		}
		$HTML 	= str_replace(array('{MENSAGEM}','{TIPOMENSAGEM}','{URL_DOWNLOAD}'),array($msg,$tipomsg,$link_download),$HTML);
		$param['html'] = $HTML;
	
		return $param;
	}

}

?>