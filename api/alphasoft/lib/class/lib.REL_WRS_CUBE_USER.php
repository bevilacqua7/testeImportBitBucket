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
	private $admin 	= NULL;
	public $html_param_form_exception = NULL;
	
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
	
	public function downloadFile(){
		$this->admin->downloadFile();
	}
	
	public function run($_event=false,$param=false,$cube_s=false)
	{
		$event	=	empty($_event)?fwrs_request('event'):$_event;
		switch($event)
		{
			case 'save_association'			: 	$this->save_association(); 				break;
			case 'downloadFile' 			: 	$this->downloadFile(); 					break;
			case 'runGrid'					:	$this->runGrid();
		}
	}

	public function change_query_exception($table=NULL,$orderBy=NULL,$orderByPOS=NULL,$_start=NULL,$_end=NULL, $_where=NULL)
	{
		return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where);
	
	}
	

	private function runGrid($table=NULL,$orderBy=NULL,$orderByPOS=NULL,$_start=NULL,$_end=NULL, $_where=NULL)
	{
	
		return WRS_MANAGE_PARAM::select('*', $table, $orderBy, $orderByPOS, $_start, $_end,$_where);
	
	}
	

	private function save_association($request=null)
	{
		
		$tipo_save 			= $request!=null && is_array($request) && array_key_exists('association_for', $request)?$request['association_for']:fwrs_request('association_for'); // : "user"
		$arr_indices_cubos 	= json_decode(base64_decode($request!=null && is_array($request) && array_key_exists('association_indexes_for_cubes', $request)?$request['association_indexes_for_cubes']:fwrs_request('association_indexes_for_cubes'))); // : "eyJpbmRpY2VfMCI6eyJDVUJFX0lEIjoiW0dTSyAtIEFVRElUXSIsIkRBVEFCQVNFX0lEIjoiW0dTSyAtIEFVRElUXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzEiOnsiQ1VCRV9JRCI6IltHU0sgLSBDVVBdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gQ1VQXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzIiOnsiQ1VCRV9JRCI6IltTQU4gLSBDT1RBU19ORVddIiwiREFUQUJBU0VfSUQiOiJbU0FOIC0gTURUUl9ORVddIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfMyI6eyJDVUJFX0lEIjoiW0FMQyAtIERERF0iLCJEQVRBQkFTRV9JRCI6IltBTEMgLSBERERdIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfNCI6eyJDVUJFX0lEIjoiW0dTSyAtIElOVEVdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gSU5URV0iLCJTRVJWRVJfSUQiOiJbMTkyLjE2OC4xLjNdIn0sImluZGljZV81Ijp7IkNVQkVfSUQiOiJbR1NLIC0gSU5URV9DT10iLCJEQVRBQkFTRV9JRCI6IltHU0sgLSBJTlRFXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzYiOnsiQ1VCRV9JRCI6IltHU0sgLSBJTlRFX0REXSIsIkRBVEFCQVNFX0lEIjoiW0dTSyAtIElOVEVdIiwiU0VSVkVSX0lEIjoiWzE5Mi4xNjguMS4zXSJ9LCJpbmRpY2VfNyI6eyJDVUJFX0lEIjoiW1NBTiAtIE1EVFJfTkVXXSIsIkRBVEFCQVNFX0lEIjoiW1NBTiAtIE1EVFJfTkVXXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifSwiaW5kaWNlXzgiOnsiQ1VCRV9JRCI6IltHS0MgLSBQRFJdIiwiREFUQUJBU0VfSUQiOiJbR0tDIC0gUERSXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuNF0ifSwiaW5kaWNlXzkiOnsiQ1VCRV9JRCI6IltHU0sgLSBQTUJdIiwiREFUQUJBU0VfSUQiOiJbR1NLIC0gUE1CXSIsIlNFUlZFUl9JRCI6IlsxOTIuMTY4LjEuM10ifX0="
		$arr_cubos_sel 		= $request!=null && is_array($request) && array_key_exists('cubos', $request)?$request['cubos']:fwrs_request('cubos'); // : Array[10] 0: "indice_3" 1: "indice_0"
		$arr_users_sel 		= $request!=null && is_array($request) && array_key_exists('users', $request)?$request['users']:fwrs_request('users'); // : Array[1] 0: "1"

		if(!$this->admin->get_conn()){
			$this->admin->set_conn($this->get_conn());
		}

		$sql_insert			= array();
		$sql_del			= array();
		$operacao			= 'INSERT';
		
		// gera SQLs para apagar relacoes existentes e criar novas associacoes
		if($tipo_save=='user'){
			
			$user_id 		= array_shift($arr_users_sel);
			$condicao		= 'USER_ID = '.$user_id;
			$sql_del[] 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao); // obrigatoriamente sempre terá 1 registro quando a requisicao vier do duplo clique na coluna usuario
			if(is_array($arr_cubos_sel) && count($arr_cubos_sel)>0){
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
			}
			
		}else if($tipo_save=='cube'){
			
			$cube_index 	= array_shift($arr_cubos_sel);
			$data_cube 		= (array)$arr_indices_cubos->$cube_index;
			$cube_id 		= $data_cube['CUBE_ID'];
			$database_id 	= $data_cube['DATABASE_ID'];
			$server_id 		= $data_cube['SERVER_ID'];	
			// atencao, o server_id nao é validado na condicao pois pode estar cadastrado com servidor diferente, uma vez que existe o balance entre servers - facioli 20160307 - felipeb
			$condicao		= "CUBE_ID = ''".$cube_id."'' AND DATABASE_ID = ''".$database_id."''";
			$sql_del[] 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao); // obrigatoriamente sempre terá 1 registro quando a requisicao vier do duplo clique na coluna usuario
			if(is_array($arr_users_sel) && count($arr_users_sel)>0){
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
			
		}else if($tipo_save=='new'){
			
			if(is_array($arr_users_sel) && count($arr_users_sel)>0){
				foreach($arr_users_sel as $user_id){
					
					$condicao		= 'USER_ID = '.$user_id;					
					$sql_del[] 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao); // obrigatoriamente sempre terá 1 registro quando a requisicao vier do duplo clique na coluna usuario
							
					if(is_array($arr_cubos_sel) && count($arr_cubos_sel)>0){
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
					}
				}
			}
			
		}else{
			return false;
		}
		

		$mensagens_del		=	'';
		if(count($sql_del)>0){
			foreach($sql_del as $sql){
				$query	=	$this->admin->query($sql);
				if(!$query)
				{
					$mensagens_del	=	array('mensagem'=>LNG('tpl_association_remove_error'), 'type'=>'error');
				}
			}
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
		
		return $mensagem;
	
	}
	
	public function build_grid_form_exception($param){
		$this->form_association_html($param);
	}
	
	private function form_association_html($_options=null)
	{
		$param				= $this->admin->RefreshDataAttrInParam($_options);

		$primaries 			= fwrs_request('primaries');		
		$options 			= $_options==null?fwrs_request('options_extra'):$_options;
		
		$user_id 			= array_key_exists('USER_ID', $primaries) 		&& $primaries['USER_ID']!=''			?$primaries['USER_ID']:'';
		$cube_id 			= array_key_exists('CUBE_ID', $primaries) 		&& $primaries['CUBE_ID']!=''			?$primaries['CUBE_ID']:'';
		$database_id 		= array_key_exists('DATABASE_ID', $primaries) 	&& $primaries['DATABASE_ID']!=''		?$primaries['DATABASE_ID']:'';
		$server_id 			= array_key_exists('SERVER_ID', $primaries) 	&& $primaries['SERVER_ID']!=''			?$primaries['SERVER_ID']:'';
		
		$coluna_clique_user	= fwrs_request('coluna_clicada');
		
		$parameter['combo_block_cubes'] = $coluna_clique_user=='USER_CODE' || $coluna_clique_user==false?'false':'true';
		$parameter['combo_block_users'] = $coluna_clique_user=='USER_CODE'?'true':'false';
		
		$parameter['association_for']	= $coluna_clique_user=='USER_CODE'?'user':(($coluna_clique_user==false)?'new':'cube');

		if($user_id){
			$query_cube_sel			=	$this->queryClass->getCurrentAssociationsByUser($user_id);
		}
		if($cube_id && $database_id && $server_id){
			$query_user_sel			=	$this->queryClass->getCurrentAssociationsByCube($cube_id,$database_id,$server_id);
		}
		
		$query_all_cubes		=	$this->queryClass->getQueryAllCubes();
		$query_all_users		=	$this->queryClass->getQueryAllUsers();	
		
		$query_clicked_cubes	=	$this->queryClass->getQueryAllCubes($coluna_clique_user=='USER_CODE' || $coluna_clique_user==false?null:$cube_id);
		$query_clicked_users	=	$this->queryClass->getQueryAllUsers($coluna_clique_user=='USER_CODE'?$user_id:null);	


		$this->admin->set_conn($this->admin->OBJECT->get_conn());

		
		// monta indice para trabalhar com os cubos, pois utilizam chaves compostas
		$indices 				= $this->admin->criaIndicesComQueryParaCubos($query_all_cubes,array('CUBE_ID','DATABASE_ID','SERVER_ID'),'CUBE_DESC');
		$parameter['association_indexes_for_cubes']	= base64_encode(json_encode($indices['indices'],1));

		if($coluna_clique_user!=false){
			$chave_combo_provisoria	= 'XXX';
			$indices_sel 			= $this->admin->criaIndicesComQueryParaCubos($query_clicked_cubes,array('CUBE_ID','DATABASE_ID','SERVER_ID'),'CUBE_DESC',$chave_combo_provisoria);
			$option_cube_sel		= '';			
			// monta option com indice real para mostrar quando o cubo for selecionado
			if($coluna_clique_user=='CUBE_DESC'){
				$key_cube_clicked	= $this->admin->findIndexInarrayByMultipleValues($indices['indices'],array_shift($indices_sel['indices']));
				$option_cube_sel	= str_replace($chave_combo_provisoria,$key_cube_clicked,$indices_sel['combo']);
			}else{
				$option_cube_sel	= $this->admin->preencheCombosComQuery($query_cube_sel ,'CUBE_ID','CUBE_DESC', $indices_sel['indices']);
			}		
		}
		
		$parameter['cubos']		= $indices['combo']; //$this->admin->preencheCombosComQuery($query_all_cubes,'CUBE_ID','CUBE_DESC');
		$parameter['users'] 	= $this->admin->preencheCombosComQuery($query_all_users,'USER_ID','USER_CODE');
		$parameter['cubos_sel']	= ($coluna_clique_user==false)?'':$option_cube_sel; //$this->admin->preencheCombosComQuery($coluna_clique_user?$query_cube_sel:$query_clicked_cubes ,'CUBE_ID','CUBE_DESC');
		$parameter['users_sel']	= ($coluna_clique_user==false)?'':$this->admin->preencheCombosComQuery($coluna_clique_user=='USER_CODE'?$query_clicked_users:$query_user_sel ,'USER_ID','USER_CODE');		

		$HTML = includeTemplate('modal_admin_associacoes',$parameter,true);

		$this->html_param_form_exception 		= 	$HTML;		
		
	}
	
	
	public function insert($options)
	{	
		$param				=	$this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));

		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		
		$_options			=	array();
		$_options['valores_linha']['USER_ID']		=false;
		$_options['valores_linha']['CUBE_ID']		=false;
		$_options['valores_linha']['DATABASE_ID']	=false;
		$_options['valores_linha']['SERVER_ID']		=false;
		$_options['coluna_clicada']					=false;
		
		$param['html'] = $this->form_association_html($_options);
		
		return $param;
	}
	
	public function update($options)
	{
		$param				=	$this->admin->RefreshDataAttrInParam($this->admin->OBJECT->build_grid_form($options));
		
		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		
		$request 			= 	$_REQUEST;
		$request['cubos']	=	array_keys($request['cubos']);
		$request['users']	=	array_keys($request['users']);
		$msg				=	$this->save_association($request);
		$event_form			=	$this->admin->classname;

		include PATH_TEMPLATE.'export_file_window.php';
		$this->html_param_form_exception = str_replace(array('{MENSAGEM}','{TIPOMENSAGEM}'),array($msg['mensagem'],$msg['type']),$HTML_ERR);
	}
	
	public function delete($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$arr_obj			= (array)json_decode($_request_original['extraValues']);
		
		$sql_del = array();
		foreach($arr_obj['objetosSelecionados'] as $obj_list){
			$registros = array();
			foreach($obj_list as $obj){
				$_obj 						= (array)$obj;
				$registros[$_obj['chave']]	= $_obj['valor'];
			}
			$condicao		= "CUBE_ID = ''".$registros['CUBE_ID']."'' AND DATABASE_ID = ''".$registros['DATABASE_ID']."'' AND USER_ID = ".$registros['USER_ID'];
			$sql_del[] 		= $this->queryClass->Get_procedure_remove_cube_user($this->admin->classname,$condicao);
		}

		$this->admin->set_conn($this->admin->OBJECT->get_conn());
		
		$mensagens_del		=	array('mensagem'=>LNG_S(LNG_S('tpl_association_remove_sucess',((count($sql_del)>1)?'s':'')),((count($sql_del)>1)?'ns':'m'),'%ns',true), 'type'=>'success');
		if(count($sql_del)>0){
			foreach($sql_del as $sql){
				$query	=	$this->admin->query($sql);
				if(!$query)
				{
					$mensagens_del	=	array('mensagem'=>LNG('tpl_association_remove_error'), 'type'=>'error');
				}
			}
		}
			
		$this->admin->retornaMsgAcaoTelaAdmin(($mensagens_del['type']=='error'?false:true),$mensagens_del['mensagem'],$this->admin->classname);
	
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