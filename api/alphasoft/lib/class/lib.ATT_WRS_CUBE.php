<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa

class ATT_WRS_CUBE extends WRS_BASE
{
	private $admin = NULL;
	
	public function __construct(){
		$this->admin = new WRS_AdminInterface();
		$this->admin->classname = 'ATT_WRS_CUBE';
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
		$param['html']			=	'<pre>INSERT CLASS '.$this->admin->classname.' - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
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

		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));	
		unset($param['button']['import']);
		unset($param['button']['export']);
		$param['html']			=	'<pre>UPDATE CLASS '.$this->admin->classname.' - tabela: '.$_tabela.'<hr>'.print_r($_POST,1).'</pre>'.$param['html'];	
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
	
		$param	=	 $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
		unset($param['button']['import']);
		unset($param['button']['export']);
		$param['html']			=	'<pre>DELETE CLASS '.$this->admin->classname.' - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];
		return $param;
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
		$param['html'] = $this->admin->importarDadosEmMassa('importCubes');		
		
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