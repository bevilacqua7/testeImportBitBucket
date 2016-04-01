<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa
includeQUERY('ATT_WRS_USER');

class ATT_WRS_USER extends WRS_BASE
{
	private $admin 			= 	NULL;
	
	public function __construct()
	{
		$this->admin = new WRS_AdminInterface();
		$this->admin->classname  = 'ATT_WRS_USER';
		$this->queryClass		 = new QUERY_WRS_USER();
	}
	
	public function SetObject($Object)
	{
		$this->admin->SetObject($Object);
	}
	
	public function run()
	{
		$event					=	fwrs_request('event');
		$this->admin->set_conn($this->get_conn());
		switch($event)
		{
			case 'fileDownload' 		: $this->fileDownload(); 			break;
			case 'changePassUser' 		: $this->changePassUser(); 			break;
			case 'exportResults' 		: $this->exportResults(); 			break;
		}
	}

	public function export($options=null)
	{
		$param = $this->admin->export($options);
		$param['title']= LNG('bt_export_user');
		return $param;
	}
	
	public function exportResults($options=null)
	{
		$customer_id_logado		= WRS::CUSTOMER_ID();
		$param_extra = array(
				'filtro_fixo' => 'CUSTOMER_ID = '.$customer_id_logado
		);
		return $this->admin->exportResults($options,$param_extra);
	}
	
	public function fileDownload($options=null)
	{
		return $this->admin->fileDownload($options);
	}
	
	public function changePassword($options){
		$param 				= $this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
		$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
		$_request_original	= $_REQUEST;
		$extraValues 		= array_key_exists('extraValues', $_request_original) && $_request_original['extraValues']!='self'?base64_encode($_request_original['extraValues']):'';
		$isAdm 				= ($perfil_logado=='MST' || $perfil_logado=='ADM') && $extraValues!='';
		$HTML 				= includeTemplate('modal_change_passwd',array('isAdm'=>$isAdm,'extraValues'=>$extraValues),true);
		$param['html']		= $HTML;
		$param['title']		= LNG('TITLE_ALTER_SENHA');
		if(!$isAdm){
			unset($param['button']['back']);			
		}
		unset($param['button']['update']);
		return $param;
	}

	public function changePassUser($options){
				
		$parameter		=	(array)json_decode(fwrs_request('extraValues'));
		$nova_senha 	= 	$parameter['senha'];
		$old_senha 		= 	$nova_senha!='' && $parameter['old_senha']!=''?$parameter['old_senha']:''; // garante que haja uma nova senha para utilizar controles com a senha antiga
		$objSelecionados=	(array)$parameter['objSelecionados'];
		
		includeQUERY('WRS_LOGIN');
		$class_query_login = new QUERY_LOGIN();
		
		$qtde_user = (is_array($objSelecionados) && count($objSelecionados)>0)?count($objSelecionados):0;
			
		$query = array();
		
		// se houver senha antiga, não pode passar user_id e customer_id
		$USER_MASTER			= 	WRS::USER_MASTER();
		$USER_ID_LOGADO			= 	$old_senha!=''?0:WRS::USER_ID();
		$CUSTOMER_ID 			= 	$old_senha!=''?0:WRS::CUSTOMER_ID();
		
		if($qtde_user){
			foreach($objSelecionados as $user_id=>$user_code){
				if(trim($user_code)=='*'){ $user_code=""; }
				$query[] = $class_query_login->CHANGE_SSAS_PASSWORD( $user_code, $USER_MASTER, $nova_senha, $old_senha, $CUSTOMER_ID, $USER_ID_LOGADO ); 
			}
		}else{
				$query[] = $class_query_login->CHANGE_SSAS_PASSWORD( '', $USER_MASTER, $nova_senha, $old_senha, $CUSTOMER_ID, $USER_ID_LOGADO ); 					
		}
		
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status=true;
		$op = '';
		$qtde_op = $qtde_user==0?LNG('js_admin_pass_sintax_d'):$qtde_user;
		$qtde_op = ($old_senha!='')?LNG('js_admin_pass_sintax_e'):$qtde_op;		
		if($nova_senha==''){		
			$op 	 = $qtde_op;
			$op		.= LNG_s('js_admin_pass_sintax_c',(($qtde_user>1)?'s':''));
			$op		.= ' '.LNG_s('php_admin_msg_exp_success',(($qtde_user>1)?'s':''));
		}else{
			$op = LNG('php_admin_msg_red_success');
			$op.= $qtde_op;
			$op.= LNG_s('js_admin_pass_sintax_c',(($qtde_user>1)?'s':''));
			$op.= LNG('php_admin_msg_red_success2');
		}
		$msg = $op;
		
		if(is_array($query) && count($query)>0){
			foreach($query as $query_exec){
				
				$queryRes = $this->admin->query($query_exec);
				
				if(!$queryRes){
					$status=false;
					$st = sqlsrv_errors();
					$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');
					$msg					=	$DATA_BASE_ERROR.$st[0]['message'];						
				}else if($this->admin->num_rows($queryRes)){
					$rows	=	$this->admin->fetch_array($queryRes);
					$status = 	(int)trim($rows['STATUS']);
					if($status!=1){
						$status=false;
						$msg = ($nova_senha=='')?LNG('php_admin_msg_exp_erro'):LNG('php_admin_msg_red_erro');
						$msg.= "<br><b>".$rows['MESSAGE']."</b>";
					}
				}
				
			}
		}else{
			$msg = ($nova_senha=='')?LNG('php_admin_msg_exp_erro'):LNG('php_admin_msg_red_erro');
		}
		
		$this->admin->retornaMsgAcaoTelaAdmin($status,$msg,$old_senha!=''?'':$this->admin->classname);
						
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
	
		$query_exec = $this->queryClass->Get_query_changetable_user($_tabela, $arr_campos_valores, ($acao_form=='UPDATE'?implode(' and ',$primaries):''), $acao_form);
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
		 * ATT_WRS_USER = Remove_SSAS_User( @USER_ID BIGINT, @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
		 */
		$USER_CODE 				= WRS::USER_CODE();
		$CUTOMER_ID 			= WRS::CUSTOMER_ID();
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		$status=true;
		$msg = LNG_S('ADMIN_REG_DELETED',((count($_regForDelete['objetosSelecionados'])>1)?'s':''));
		foreach($_regForDelete['objetosSelecionados'] as $id_for_del){
			$condicao_query = $id_for_del.",".$CUTOMER_ID.",".$USER_CODE;
			$query_exec = $this->queryClass->Get_procedure_remove_user($_tabela, $condicao_query);
			$query = $this->admin->query($query_exec);
			if ($this->num_rows($query)){
				$rows	=	$this->fetch_array($query);
				if ($rows['STATUS'] < 0){
					$status=false;
					$msg		=	$rows['MESSAGE'];
					$this->admin->retornaMsgAcaoTelaAdmin($query,$msg,$_tabela,$query_exec);
					return false;
				}
			}else if(!$this->num_rows($query) || !$query){
				$status=false;
				$st = sqlsrv_errors();
				$DATA_BASE_ERROR		=	LNG('DATA_BASE_ERROR');
				$msg					=	$DATA_BASE_ERROR.$st[0]['message'];
				$this->admin->retornaMsgAcaoTelaAdmin($query,$msg,$_tabela,$query_exec);
				return false;
			}
		}
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
		unset($param['button']['changePassword']);
		$param['title']= LNG('bt_import_user');
	
		$nome_arquivo = 'uploads/'.WRS::CUSTOMER_ID().'/';
	
		// criacao do HTML para exibir o form de upload ou realizar a importacao se houverem arquivos enviados
		$param['html'] = $this->admin->importarDadosEmMassa($nome_arquivo,$_request_original);
	
		return $param;
	}


}

?>