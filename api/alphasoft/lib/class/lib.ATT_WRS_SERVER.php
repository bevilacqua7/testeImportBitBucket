<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa
includeQUERY('ATT_WRS_SERVER');

class ATT_WRS_SERVER extends WRS_BASE
{
	private $admin = NULL;
	
	public function __construct(){
		$this->admin = new WRS_AdminInterface();
		$this->admin->classname = 'ATT_WRS_SERVER';
		$this->queryClass		 = new QUERY_WRS_SERVER();
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
		return $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
	}
	
	public function update($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
	
		$param				=	$this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
		$arr_campos_valores	=	$this->admin->montaArrayCamposValoresDoRequest($_fields,$_request_original,$param);		// por utilizar o mesmo metodo para insert ou update, valido se existe uma chave já criada dentro do metodo $this->admin->montaArrayCamposValoresDoRequest
		$primaries			=	$this->admin->retornaPrimariesPreenchidasDosFields($param,$_request_original);
		$acao_form			=	$this->admin->getCurrentActionForm();
	
		$query_exec = $this->queryClass->Get_query_changetable_server($_tabela, $arr_campos_valores, implode(' and ',$primaries), $acao_form);
		$this->admin->execInsertUpdate($query_exec,$_tabela);
	
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
		 * ATT_WRS_SERVER = Remove_SSAS_Server( @SERVER_ID VARCHAR(100), @USER_CODE VARCHAR(100) )
		 */
		$USER_CODE 				= WRS::USER_CODE();
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status=true;
		foreach($_regForDelete['objetosSelecionados'] as $id_for_del){
			$condicao_query = $id_for_del.",".$USER_CODE;
			$query_exec = $this->queryClass->Get_procedure_remove_server($_tabela, $condicao_query);
			$query = $this->admin->query($query_exec);
			if(!$this->num_rows($query) || !$query)
			{
				$status=false;
				$st = sqlsrv_errors();
				$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');
				$msg					=	$DATA_BASE_ERROR.$st[0]['message'];
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
			}
		}
		$msg = LNG_S('ADMIN_REG_DELETED',((count($_regForDelete['objetosSelecionados'])>1)?'s':''));
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