<?php

includeCLASS('WRS_BASE');
includeCLASS('WRS_AdminInterface'); // interface com funcoes para a area administrativa
includeQUERY('REL_WRS_CUBE_USER');

class REL_WRS_CUBE_USER extends WRS_BASE
{
	/**
	 * 
	 * @var WRS_AdminInterface
	 */
	private $admin = NULL;
	
	public function __construct()
	{
		$this->admin = new WRS_AdminInterface();
		
		$this->admin->classname = 'REL_WRS_CUBE_USER';
		
		$this->queryClass		 = new QUERY_WRS_CUBE_USER();
	}

	public function SetObject($Object)
	{
		$this->admin->SetObject($Object);
	}
	
	public function run($_event=false,$param=false,$cube_s=false)
	{
		$event	=	empty($_event)?fwrs_request('event'):$_event;
		switch($event)
		{
			case 'save_association'			: 	$this->save_association(); 			break;
			case 'form_association_html'	:  	$this->form_association_html(); 	break;
			case 'runGrid'					:	$this->runGrid();
		}
	}

	public function change_query_exception($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where);
	
	}
	

	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
	
		return WRS_MANAGE_PARAM::select('*', $table, $orderBy, $orderByPOS, $_start, $_end,$_where);
	
	}
	

	private function save_association()
	{
		header('Content-Type: application/json');
		
		$tipo_save 			= fwrs_request('association_for'); // : "user"
		$arr_indices_cubos 	= json_decode(base64_decode(fwrs_request('association_indexes_for_cubes'))); // : "eyJpbmRpY2VfMCI6eyJDVUJFX0lEIjoiW0dTSyAtIEFVRElUXSIsIkRBVEFCQVNFX0lEIjoiW0dTSyAtIEFVRElUXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzEiOnsiQ1VCRV9JRCI6IltHU0sgLSBDVVBdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gQ1VQXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzIiOnsiQ1VCRV9JRCI6IltTQU4gLSBDT1RBU19ORVddIiwiREFUQUJBU0VfSUQiOiJbU0FOIC0gTURUUl9ORVddIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfMyI6eyJDVUJFX0lEIjoiW0FMQyAtIERERF0iLCJEQVRBQkFTRV9JRCI6IltBTEMgLSBERERdIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfNCI6eyJDVUJFX0lEIjoiW0dTSyAtIElOVEVdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gSU5URV0iLCJTRVJWRVJfSUQiOiJbMTkyLjE2OC4xLjNdIn0sImluZGljZV81Ijp7IkNVQkVfSUQiOiJbR1NLIC0gSU5URV9DT10iLCJEQVRBQkFTRV9JRCI6IltHU0sgLSBJTlRFXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzYiOnsiQ1VCRV9JRCI6IltHU0sgLSBJTlRFX0REXSIsIkRBVEFCQVNFX0lEIjoiW0dTSyAtIElOVEVdIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfNyI6eyJDVUJFX0lEIjoiW1NBTiAtIE1EVFJfTkVXXSIsIkRBVEFCQVNFX0lEIjoiW1NBTiAtIE1EVFJfTkVXXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzgiOnsiQ1VCRV9JRCI6IltHS0MgLSBQRFJdIiwiREFUQUJBU0VfSUQiOiJbR0tDIC0gUERSXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuNF0ifSwiaW5kaWNlXzkiOnsiQ1VCRV9JRCI6IltHU0sgLSBQTUJdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gUE1CXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifX0="
		$arr_cubos_sel 		= fwrs_request('cubos'); // : Array[10] 0: "indice_3" 1: "indice_0"
		$arr_users_sel 		= fwrs_request('users'); // : Array[1] 0: "1"
		

		$this->admin->set_conn($this->get_conn());
		$sql_insert			= array();
		$operacao			= 'INSERT';
		
		// gera SQLs para apagar relacoes existentes e criar novas associacoes
		if($tipo_save=='user'){
			$user_id 		= array_shift($arr_users_sel);
			$condicao		= 'USER_ID = '.$user_id;
			$sql_del 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao); // obrigatoriamente sempre terá 1 registro quando a requisicao vier do duplo clique na coluna usuario
			foreach($arr_cubos_sel as $cube_index){
				$data_cube 		= (array)$arr_indices_cubos->$cube_index;
				$arr_campos_valores = array(
						'SERVER_ID' 	=> "''".$data_cube['SERVER_ID']."''",
						'DATABASE_ID' 	=> "''".$data_cube['DATABASE_ID']."''",
						'CUBE_ID' 		=> "''".$data_cube['CUBE_ID']."''",
						'USER_ID' 		=> $user_id
				);
				$sql_insert[]	= $this->queryClass->Get_query_changetable_cube_user($this->admin->classname,$arr_campos_valores,$condicao,$operacao);
			}
		}else{
			$cube_index 	= array_shift($arr_cubos_sel);
			$data_cube 		= (array)$arr_indices_cubos->$cube_index;
			$cube_id 		= $data_cube['CUBE_ID'];
			$database_id 	= $data_cube['DATABASE_ID'];
			$server_id 		= $data_cube['SERVER_ID'];	
			// atencao, o server_id nao é validado na condicao pois pode estar cadastrado com servidor diferente, uma vez que existe o balance entre servers - facioli 20160307 - felipeb
			$condicao		= "CUBE_ID = ''".$cube_id."'' AND DATABASE_ID = ''".$database_id."''";
			$sql_del 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao); // obrigatoriamente sempre terá 1 registro quando a requisicao vier do duplo clique na coluna usuario
			foreach($arr_users_sel as $user_id){
				$arr_campos_valores = array(
						'SERVER_ID' 	=> "''".$server_id."''",
						'DATABASE_ID' 	=> "''".$database_id."''",
						'CUBE_ID' 		=> "''".$cube_id."''",
						'USER_ID' 		=> $user_id
				);
				$sql_insert[]	= $this->queryClass->Get_query_changetable_cube_user($this->admin->classname,$arr_campos_valores,$condicao,$operacao);
			}
		}
		

		$mensagens_del		=	'';
		$query	=	$this->admin->query($sql_del);
		if(!$query)
		{
			$mensagens_del	=	array('mensagem'=>LNG('tpl_association_remove_error'), 'type'=>'error');
		}
		

		$mensagens_ins		=	array('mensagem'=>LNG('tpl_association_save_sucess'), 'type'=>'success');		
		if(count($sql_insert)>0){
			foreach($sql_insert as $sql){
				$query	=	$this->admin->query($sql);
				if(!$query)
				{
					$mensagens_ins	=	array('mensagem'=>LNG('tpl_association_save_error'), 'type'=>'error');
				}
			}
		}
		
	
		$mensagem = $mensagens_ins;

		if($mensagens_del!=''){
			$mensagem = $mensagens_del;
		}	
	
		echo json_encode($mensagem);
	
	}
	
	private function form_association_html()
	{
		
		$options = fwrs_request('extraParam');
		
		$user_id 			= $options['valores_linha']['USER_ID'];
		$cube_id 			= $options['valores_linha']['CUBE_ID'];
		$database_id 		= $options['valores_linha']['DATABASE_ID'];
		$server_id 			= $options['valores_linha']['SERVER_ID'];
		

		$coluna_clique_user	= $options['coluna_clicada']=='USER_CODE';
		
		$parameter['combo_block_cubes'] = $coluna_clique_user?'false':'true';
		$parameter['combo_block_users'] = $coluna_clique_user?'true':'false';
		
		$parameter['association_for']	= $coluna_clique_user?'user':'cube';

		$query_cube_sel			=	$this->queryClass->getCurrentAssociationsByUser($user_id);		
		$query_user_sel			=	$this->queryClass->getCurrentAssociationsByCube($cube_id,$database_id,$server_id);
		
		$query_all_cubes		=	$this->queryClass->getQueryAllCubes();
		$query_all_users		=	$this->queryClass->getQueryAllUsers();	
		
		$query_clicked_cubes	=	$this->queryClass->getQueryAllCubes($coluna_clique_user?null:$cube_id);
		$query_clicked_users	=	$this->queryClass->getQueryAllUsers($coluna_clique_user?$user_id:null);	

		
		$this->admin->set_conn($this->get_conn());		
		
		// monta indice para trabalhar com os cubos, pois utilizam chaves compostas
		$indices 				= $this->admin->criaIndicesComQueryParaCubos($query_all_cubes,array('CUBE_ID','DATABASE_ID','SERVER_ID'),'CUBE_DESC');
		$parameter['association_indexes_for_cubes']	= base64_encode(json_encode($indices['indices'],1));

		$chave_combo_provisoria	= 'XXX';
		$indices_sel 			= $this->admin->criaIndicesComQueryParaCubos($query_clicked_cubes,array('CUBE_ID','DATABASE_ID','SERVER_ID'),'CUBE_DESC',$chave_combo_provisoria);
		$option_cube_sel		= '';
		
		// monta option com indice real para mostrar quando o cubo for selecionado
		if(!$coluna_clique_user){
			$key_cube_clicked	= $this->admin->findIndexInarrayByMultipleValues($indices['indices'],array_shift($indices_sel['indices']));
			$option_cube_sel	= str_replace($chave_combo_provisoria,$key_cube_clicked,$indices_sel['combo']);
		}else{
			$option_cube_sel	= $this->admin->preencheCombosComQuery($query_cube_sel ,'CUBE_ID','CUBE_DESC', $indices_sel['indices']);
		}		
		
		$parameter['cubos']		= $indices['combo']; //$this->admin->preencheCombosComQuery($query_all_cubes,'CUBE_ID','CUBE_DESC');
		$parameter['users'] 	= $this->admin->preencheCombosComQuery($query_all_users,'USER_ID','USER_CODE');
		$parameter['cubos_sel']	= $option_cube_sel; //$this->admin->preencheCombosComQuery($coluna_clique_user?$query_cube_sel:$query_clicked_cubes ,'CUBE_ID','CUBE_DESC');
		$parameter['users_sel']	= $this->admin->preencheCombosComQuery($coluna_clique_user?$query_clicked_users:$query_user_sel ,'USER_ID','USER_CODE');		

		includeTemplate('modal_admin_associacoes',$parameter);

	}
	/*
	 * TODO: conferir combo de customer e giltrar qdo usuario for ADM
	 */
	
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
	
		$query_exec = $this->queryClass->Get_query_changetable_cube_user($_tabela, $arr_campos_valores, ($acao_form=='UPDATE'?implode(' and ',$primaries):''), $acao_form);
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
	
		$condicao_query = $param['primary'].' in('.implode(',',$_regForDelete['objetosSelecionados']).') ';
	
		$query_exec = $this->queryClass->Get_procedure_remove_cube_user($_tabela, $condicao_query);
	
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