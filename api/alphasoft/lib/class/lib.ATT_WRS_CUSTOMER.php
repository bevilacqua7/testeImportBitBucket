<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa
includeQUERY('ATT_WRS_CUSTOMER');

class ATT_WRS_CUSTOMER extends WRS_BASE
{
	private $admin = NULL;
	private $queryClass = NULL;
		
	public function __construct(){
		$this->admin			 = new WRS_AdminInterface();
		$this->admin->classname  = 'ATT_WRS_CUSTOMER';
		$this->queryClass		 = new QUERY_WRS_CUSTOMER();
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
						$arr_campos_valores[$nome_campo]=$separador.$_request_original[$nome_campo].$separador;
					}
				}
			}
		}
		
		$condicao_query = ($acao_form=='UPDATE')?$param['primary'].' = '.$_request_original[$param['primary']]:'';

		unset($param['button']['import']);
		unset($param['button']['export']);
		unset($param['button']['remove']);
				
		$query_exec = $this->queryClass->Get_query_changetable($_tabela, $arr_campos_valores, $condicao_query, $acao_form);

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
		
		$condicao_query = $param['primary'].' in('.implode(',',$_regForDelete['objetosSelecionados']).') ';

		$query_exec = $this->queryClass->Get_procedure_remove_customer($_tabela, $condicao_query);
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status = $this->admin->query($query_exec);
		$msg = LNG_S('ADMIN_REG_DELETED',((count($_regForDelete['objetosSelecionados'])>1)?'s':''));
		if(!$status){
			$st = sqlsrv_errors();	 			
	 		$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');	
	 		$msg					=	$DATA_BASE_ERROR.$st[0]['message'];
		}

		$this->admin->retornaMsgAcaoTelaAdmin($status,$msg,$_tabela,$query_exec);
		
	}
	
	public function import($options)
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

		unset($param['button']['update']);
		unset($param['button']['remove']);
		unset($param['button']['export']);

		// criacao do HTML para exibir o form de upload ou realizar a importacao se houverem arquivos enviados
		$param['html'] = $this->admin->importarDadosEmMassa('importCustomers',$_request_original);		
		
		return $param;
	}
	
	public function export($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$_regForExport		= json_decode($_request_original['extraValues'],1);
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