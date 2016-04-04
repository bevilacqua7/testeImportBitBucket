<?php
/**
 * Contem Metodos Genericos para a area Administrativa
 * @author fbevilacqua
 * interface com funcoes para a area administrativa
 * felipebevi.com.br 20160118
 */
includeQuery('ATT_WRS_AdminInterfaces');
includeClass('KendoUi');
includeCLASS('WRS_USER');

class WRS_AdminInterface  extends WRS_USER
{

	public $classname 		= NULL;
	public $OBJECT			= NULL;
	private $manage_param 	= NULL;
	public $temp_folder;
	private $queryClass 	= NULL;
	private $current_action	= NULL;
	
	public function __construct(){
		$this->queryClass = new QUERY_WRS_ADMIN();
	}

	// atualizar o atributo data dentro da variavel param para que se mantenha nas WindowGrids navegadas,
	// possibilitando ler o atributo "param_original" de qualquer tela navegada, o qual por sua vez são
	// os atributos da tabela em questão definidos no WRS_MANAGE_PARAM
	public function RefreshDataAttrInParam($_param){
		$param = $_param;
		$data=array();
		$param['visao_atual']	=	'list';
		$data['param_original'] = 	$param;
		$param['data']	=	json_encode($data);		
		return $this->ajustaBotoesModalConformeAction($param);
	}
	
	public function setCurrentAction($action){
			$this->current_action = $action;
	}
	
	
	// monta indice para trabalhar chaves compostas baseada em uma query
	// se houver campo descricao, retorna um combo ja preenchido com os valores relacionados ao indice
	public function criaIndicesComQueryParaCubos($query,$arr_chaves,$campo_descricao=null,$forca_indice_fixo_nos_options=null){
		if(is_array($arr_chaves) && count($arr_chaves)>0){
			$pre_value		=	'indice_';
			$indices		=	array();		
			$_select		=	$this->query($query);
			$cont			=	0;

			$option			=	'<option value="{value}" >{label}</option>'.PHP_EOL;
			$option_array	=	array('{value}','{label}');
			$combo			=	'';


			if($this->num_rows($_select))
			{
				while($row = $this->fetch_array($_select))
				{
					foreach($arr_chaves as $chave){
						if(array_key_exists($chave, $row)){
							$indices[$pre_value.$cont][$chave] = $row[$chave];
						}
					}		

					if($campo_descricao!=null && $campo_descricao!='' && array_key_exists($campo_descricao, $row)){
						$codigo 	= $forca_indice_fixo_nos_options!=null?$forca_indice_fixo_nos_options:$pre_value.$cont;
						$descricao	= $row[$campo_descricao];
						$combo		.=str_replace($option_array, array($codigo, $descricao), $option);
						//$indices[$pre_value.$cont]['descricao'] = $row[$campo_descricao];
					}
					
					$cont++;
				}		
			}
			
			return ($campo_descricao!=null && $campo_descricao!='')?array('indices'=>$indices,'combo'=>$combo):$indices;
		}else{
			return false;
		}
	}
		
	public function findIndexInarrayByMultipleValues($arr_valores,$arr_indices_a_buscar){
		$indice=null;
		foreach($arr_valores as $k=>$v){
			if($indice!=null) continue; // pula o laco se o indice ja tenha sido encontrado
			if(is_array($v) && count($v)>0){
				$match=true;
				foreach($arr_indices_a_buscar as $chave=>$valor){
					if(!array_key_exists($chave, $v) || $v[$chave]!=$valor){
						//echo "<hr><br>Indice [".$chave."] nao existe no array [".print_r($v,1)."] ou valor [".$v[$chave]."] é diferente de [".$valor."]";
						$match=false;
					}
				}
				if($match){
					//echo "<hr><br>PEGOU - valor [".print_r($v,1)."] de [".$k."]";
					$indice = $k;
					break;
				}
			}
		}
		//if($indice==null){
		//	echo '<hr>Array_indices: '.print_r($arr_indices_a_buscar,1);
		//	exit('<pre>>>>'.print_r($arr_valores,1));
		//}
		return $indice;
	}
	
	// monta options baseado em query, codigo e descricao
	public function preencheCombosComQuery($query,$campo_codigo,$campo_descricao,$baseado_em_indices=null){
		$option			=	'<option value="{value}" >{label}</option>'.PHP_EOL;
		$option_array	=	array('{value}','{label}');
		$combo			=	'';
		$arr_indices_chaves_a_buscar = array();
		if($baseado_em_indices!=null && is_array($baseado_em_indices)){
			$_copia = $baseado_em_indices;
			$arr_indices_chaves_a_buscar = array_keys(array_shift($_copia));
			// voltou a considerar SERVER ID - Faciolli - felipeb 20160324 17h21
			//if(in_array('SERVER_ID',$arr_indices_chaves_a_buscar)){ // remove o server id para nao entrar na comparacao, pois o servidor será automatico - facioli 20160307 - felipeb
			//	unset($arr_indices_chaves_a_buscar[array_search('SERVER_ID',$arr_indices_chaves_a_buscar)]);
			//}
			if(in_array('descricao',$arr_indices_chaves_a_buscar)){ // remove descricao para nao entrar na comparacao, pois a mesma será automatica tambem
				unset($arr_indices_chaves_a_buscar[array_search('descricao',$arr_indices_chaves_a_buscar)]);
			}
		}
		
		$_select		=	$this->query($query);
		if($this->num_rows($_select))
		{
			while($row = $this->fetch_array($_select))
			{
				if(array_key_exists($campo_codigo, $row) && array_key_exists($campo_descricao, $row)){
					if($baseado_em_indices!=null && is_array($baseado_em_indices)){
						$arr_indices_a_buscar = array();
						foreach($arr_indices_chaves_a_buscar as $chave){
							$arr_indices_a_buscar[$chave] = $row[$chave];
						}
						//if(count($arr_indices_a_buscar)==0){
						//	echo "<pre>";
						//	exit(print_r($arr_indices_chaves_a_buscar,1)."<hr>".print_r($row,1));
						//}
						$codigo = $this->findIndexInarrayByMultipleValues($baseado_em_indices,$arr_indices_a_buscar);
					}else{
						$codigo = $row[$campo_codigo];
					}
					if($codigo==''){ // pode nao achar indice se for baseado em indices
						$codigo = $row[$campo_codigo];
						$row[$campo_descricao] .= ' - nao achou: '.print_r($arr_indices_a_buscar,1);
					}
					$descricao	= array_key_exists('descricao', $row)?$row['descricao']:$row[$campo_descricao];
					$combo		.=str_replace($option_array, array($codigo, $descricao), $option);
				}			 	
			}		
		}
		return $combo;
		
	}
	
	public function ajustaBotoesModalConformeAction($param){
		if(in_array($this->current_action,array('INSERT','UPDATE'))){
			unset($param['button']['import']);
			unset($param['button']['export']);
			unset($param['button']['remove']);
			unset($param['button']['changePassword']);
		}
		return $param;
	}
	
	public function retornaMsgAcaoTelaAdmin($boolStatus,$msg,$tabela_cadastro='',$query=''){
 		$typeMsg = $boolStatus?'success':'error'; 		
		$callback='function(){}';
 		if($tabela_cadastro!=''){
 			$callback="function(){ $('.menu_cadastro[tabela=".WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($tabela_cadastro)."]').trigger('click'); }";
 		}
		$msg = addslashes($msg);
 		$JS=<<<HTML
	 		$('#myModal').modal('hide'); // #myModalGenericConfig
			WRS_ALERT('{$msg}','{$typeMsg}',{$callback}); 
HTML;
 		if($query!=''){
 			$JS.="WRS_CONSOLE(".json_encode(array('query'=>$query),1).")";
 		}
 		echo fwrs_javascript($JS); 		
 		exit();
	}
	
	/**
	 * Confere se existe um diretorio completo, porém somente a partir da segunda posicao, uma vez que considero que a primeira é sempre a base do sistema e/ou o diretorio inicial, Ex.: C:/ ou /var/, por isso nunca vou criar o primeiro diretorio passado
	 * @param string $dir - deve ser passado o diretorio COMPLETO, desde a raiz
	 */
	public function confere_criacao_diretorio($dir,$testa_outro_replace=false){
		$dir = $testa_outro_replace?$dir:str_replace("/","\\",$dir);
		if(!is_dir($dir)){
			$diretorios = explode("\\",$dir);
			if(count($diretorios)>1){
				$dir_atual = $diretorios[0];
				for($p=1;$p<count($diretorios);$p++){
					if(trim($diretorios[$p])!=''){
						$diretorio = $dir_atual.DS.$diretorios[$p];
						if(!is_dir($diretorio)){
							mkdir($diretorio, 0777, true);
						}
						$dir_atual.=DS.$diretorios[$p];
					}
				}
			}else{
				$this->confere_criacao_diretorio(str_replace("\\",'/',$dir),true);
			}
		}
	}
	
	public function SetObject($Object)
	{
		$this->OBJECT=$Object;
		$this->temp_folder = PATH_FILE.$this->classname.DS.'exportFiles'.DS;//sys_get_temp_dir().DIRECTORY_SEPARATOR;
		$this->confere_criacao_diretorio($this->temp_folder);
		
		// funcoes JS para tratamento dos formularios administrativos
		$scr_field_bloq = <<<HTML
		<script>
			$('input[type=text], input[type=password]').each(function(){ bloqueia_chars($(this)); });
			trata_campos_senha();
			trata_campos_int();
		</script>
HTML;
		echo $scr_field_bloq;
	}
	
	public function getCurrentActionForm(){
		return $this->current_action;
	}
	
	public function montaArrayCamposValoresDoRequest($_fields,$_request_original,$param){
		$arr_campos_request = array();
		$arr_campos_valores = array();
		$arr_campos_request_classe = array(
				'class',
				'file',
				'event',
				'wrs_type_grid',
				'form_event'
		);
		$tabela = $_request_original['event'];
		if(!$this->manage_param){
			$this->manage_param = new WRS_MANAGE_PARAM;
		}
		$tabela_fields = $this->manage_param->getMetodoTabela($tabela);
		$primaries = $this->retornaPrimariesPreenchidasDosFields($tabela_fields,$_request_original,true);
				
		$this->setCurrentAction('UPDATE');
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
				if(!in_array($nome_campo,$arr_campos_request_classe)){
					
					if($nome_campo==$param['primary']){
						if(trim($_request_original[$nome_campo])=='' || array_key_exists('novo_registro', $_request_original)){
							$this->setCurrentAction('INSERT');
						}
					}
					
					if($nome_campo!=$param['primary'] || ($nome_campo==$param['primary'] && array_key_exists($nome_campo, $primaries) && $this->current_action=='INSERT')){
						$possui_class_hide 		= array_key_exists('class', $valores) && strstr($valores['class'],'hide');
						$possui_class_edit_new 	= array_key_exists('edit_new', $valores) && $valores['edit_new'];
						
						if(
							!$possui_class_hide || // nao tiver a class Hide 
							($possui_class_hide && $possui_class_edit_new && $this->current_action=='INSERT') // ou se tiver mas for uma insercao e tiver tambem o edit_new=true
						){ // adiciona na query o campo e seu valor
						
							$separador = "''";
							if(array_key_exists('type', $param['field'][$nome_campo]) && $param['field'][$nome_campo]['type']=='int'){
								$separador='';
							}
							$arr_campos_valores[$nome_campo]=$_request_original[$nome_campo]==''?'NULL':$separador.$_request_original[$nome_campo].$separador;

						}
					}
					
				}
			}
		}
		
		return $arr_campos_valores;
	}
	
	public function retornaPrimariesPreenchidasDosFields($param,$_request_original,$as_array_assoc=false){
		/**
		 * REGRA ADMINISTRATIVO para tabelas com chaves compostas - FACIOLI 20160226 - felipeb
		 * varre todos os fields e verifica quem possui o atributo PRIMARY, com isso, pode mandar mais de uma coluna primary como parametro para a query
		 */
		$primaries=array();
		foreach($param['field'] as $nomeField => $colunaAtual){
			if(array_key_exists('primary',$colunaAtual) && $colunaAtual['primary']){
				if(is_array($_request_original) && array_key_exists($nomeField, $_request_original) && $_request_original[$nomeField]!=''){
					if($as_array_assoc){
						$primaries[$nomeField] = $_request_original[$nomeField];
					}else{
						$primaries[] = $nomeField.' = '."''".$_request_original[$nomeField]."''";
					}
				}
			}
		}
		return $primaries;
	}
	
	public function execInsertUpdate($query_exec,$_tabela){

		$this->set_conn($this->OBJECT->get_conn());
		$query			= 	$this->query($query_exec);
		
		$msgs_erros = $msgs_erros_detalhes = array();
		$output_geral='';
		if($this->num_rows($query))
		{
			$rows 	= $this->fetch_array($query);
			if ($rows['STATUS']<0)
				$msgs_erros[]=$rows['MESSAGE'];
		}else{
			$msgs_erros[]=LNG('ADMIN_NO_REG');
		}
		
		$mensagem_success		= ($this->current_action=='UPDATE')?LNG('ADMIN_REG_UPDATED'):LNG('ADMIN_REG_INSERTED');
		$tipo_mensagem_success	= 'success';
		$tipo_mensagem_error	= 'error';
		
		if(count($msgs_erros)>0){
			$mensagem			= '<b>'.LNG('IMPORT_EXPORT_MESSAGES_STATUS').'</b><br>'.implode('<br>',$msgs_erros);
			if(count($msgs_erros_detalhes)>0){
				$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_DETAIL').'</b><br>'.implode('<br>',$msgs_erros_detalhes);
			}
			$tipo_mensagem 		= $tipo_mensagem_error;
		}else{
			$mensagem 			= $mensagem_success;
			if($output_geral!=''){
				$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_STATUS').'</b><br>'.$output_geral;
			}
			if(count($msgs_erros_detalhes)>0){
				$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_DETAIL').'</b><br>'.implode('<br>',$msgs_erros_detalhes);
			}
			$tipo_mensagem 		= $tipo_mensagem_success;
		}
			
		
		
		$this->retornaMsgAcaoTelaAdmin((!(count($msgs_erros)>0)),$mensagem,$_tabela,$query_exec);
	}
	
	public function downloadLink($_registros,$_chavePrimaria,$_param){

		$compacta 						= $_param['efetua_compactacao']; // bool
		$regIds							= $_registros;
		$primary						= $_chavePrimaria;
		$nome_diretorio					= $_param['nome_diretorio'];			
		$WRS_DEFINE						= WRS_INI::WRS_DEFINE();
		$nome_diretorio					= $WRS_DEFINE['PATH_DB_CSV_ZIP'].$nome_diretorio;
		
		$this->confere_criacao_diretorio($nome_diretorio);

		$arr_filtro = array();
		
		$filtros_window_grid 			= array_key_exists('filtros_aplicados', $_param) && $_param['filtros_aplicados']!=''?$_param['filtros_aplicados']:'';
		$filtro_fixo 					= array_key_exists('filtro_fixo', $_param) && $_param['filtro_fixo']!=''?$_param['filtro_fixo']:'';
		$filtros						= ((is_array($regIds) && count($regIds)>0)?$primary.' in ('.implode(',',$regIds).')':'');

		if($filtro_fixo!=''){
			$arr_filtro[] = $filtro_fixo;
		}
		if($filtros!=''){
			$arr_filtro[] = $filtros;
		}
		if($filtros_window_grid!=''){
			$arr_filtro[] = $filtros_window_grid;
		}
		
		$filtros = count($arr_filtro)>0?implode(' AND ',$arr_filtro):'';
		
		$_param['tabela_export'] 		= WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($_param['tabela_export']);
		$tabela_para_query 				= WRS_MANAGE_PARAM::getAtributoTabelaConfig($_param['tabela_export'],'tabela_bd');

		// verifica se existe uma tabela especifica para fazer o export
		$tabela_export_alternativa		= WRS_MANAGE_PARAM::getAtributoTabelaConfig($_param['tabela_export'],'tabela_bd_export');
		$tabela_para_query				= $tabela_export_alternativa!=''?$tabela_export_alternativa:$tabela_para_query;
		
		$return_export 	= $this->queryClass->getQueryExportarTabela(array(
																'tabela'	=> $tabela_para_query,
																'colunas'	=> WRS_MANAGE_PARAM::getAtributoTabelaConfig($_param['tabela_export'],'colunas_import_export'),
																'filtros'	=> $filtros,
																'separador' => $_param['caracter_separacao'],
																'diretorio'	=> $nome_diretorio
													));
			
		$query_export 	= $return_export['query'];
		$file_export 	= $return_export['file'];
		$file_original 	= $return_export['file_ori'];

		$query			= 	$this->query($query_export);

		/*
		 * Verificando se existe resultado
		*/
		$msg=array();
		$processo=false;
		if($this->num_rows($query)==0)
		{
			return false;
		}else{		
			$rows 	= $this->fetch_array($query);
			
			$status	= $rows['STATUS'];
			if($status>0){
				if($compacta){
					$file_export			= PATH_MAIN.$file_export;
					$file_export_inv		= str_replace('/',DS,$file_export); // troca barras normais por invertidas para processo no SQL server/ windows
					$new_file_export		= substr($file_export,0,-4).'.ZIP';
					$new_file_export_inv	= str_replace('/',DS,$new_file_export); // troca barras normais por invertidas para processo no SQL server/ windows
					$return_compact 		= $this->queryClass->getQueryCompreessFile('ZIP', $file_export_inv, $new_file_export_inv);
					$query					= 	$this->query($return_compact);
					if(!$this->num_rows($query))
					{
						return false;
					}else{
						$rows 	= $this->fetch_array($query);

						$status	= $rows['STATUS'];
						if($status>0){
							$processo=true;
							$file_export 	= $new_file_export;
							$file_export	= str_replace(DS,'/',str_replace(PATH_MAIN,'',$file_export));
						}
					}
				}else{
					$processo=true;
				}			
			}else{
				// Verifica Retorno
				$msg[]=LNG('file_error_export');
			
				if($rows['MESSAGE']!=''){
					$msg[]=$rows['MESSAGE'];
				}
			}
		}
		
		if($processo){
			$file_export 	= str_replace(DS,'/',$file_export);
			return array('link'=>$file_export);			
		}else{
			return array('erro'=>$msg);
		}
			
	}
		
	public function apagarArquivoGerado($filename){ // str ou array
		if(is_array($filename) && count($filename)>0){
			foreach($filename as $file){
				$this->apagarArquivoGerado($file);
			}
		}else{
			if(is_file($this->temp_folder.$filename)){
				unlink($this->temp_folder.$filename);
			}else if(is_file($filename)){
				unlink($filename);
			}
		}
	}
	
	public function gerarArquivoZIPExport($filename,$arrFiles){
		if(is_array($arrFiles)){
	
			$zip = new ZipArchive();
			if ($zip->open($this->temp_folder.$filename, ZIPARCHIVE::CREATE)!==TRUE) {
				exit('forbidden to create file: '.$this->temp_folder.$filename);
			}
	
			foreach($arrFiles as $file){
				$file = $this->temp_folder.$file;
				if(is_file($file)){
					$zip->addFile($file, basename($file) );
				}
			}
			$zip->status;
			$zip->close();
				
		}else{
			return false;
		}
	}
	
	public function gerarArquivoCSVExport($nome,$conteudo){
		$fp = fopen($this->temp_folder.$nome, 'w');
		if(!is_array($conteudo)) $conteudo = array($conteudo);
		foreach ($conteudo as $linha) {
			fputcsv($fp, $linha);
		}
		fclose($fp);
	}
	
		
	public function exportarRegistrosAdmin($param,$options){
		$prerequest = array_key_exists('prerequest', $param)?(is_array($param['prerequest'])?base64_encode(json_encode($param['prerequest'],1)):$param['prerequest']):'';
		include PATH_TEMPLATE.'export_file_window.php';
		return $HTML_DEFAULT;
	}
	

	public function importarDadosEmMassa($name,$_request_original=NULL){
	
		// bool se ja enviou um arquivo (true) ou esta na primeira tela (false)
		$form_send			= (is_array($_request_original) && array_key_exists('envio_de_arquivo', $_request_original) && $_request_original['envio_de_arquivo']==1);
			
		$event_form			= WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($_request_original['event']);
	
		$upload_dir_key 	= 	$name;
	
		$WRS_DEFINE	= WRS_INI::WRS_DEFINE();
		$diretorio 	= $WRS_DEFINE['WRS_DIRNAME_IMPORT'];
	
		$name_file_import 		= WRS_MANAGE_PARAM::getAtributoTabelaConfig($event_form,'nome_arquivo_import');
		$columns_description 	= WRS_MANAGE_PARAM::getAtributoTabelaConfig($event_form,'colunas_descricao');
		$columns_description	= (!$columns_description || $columns_description=='')?'':$columns_description;
		if($name_file_import!=''){
			$avisos = str_replace('#NAME_FILE#',$name_file_import,LNG('ADMIN_AVISO_IMPORT'));
			$avisos = str_replace('#DEFAULT_LAYOUT#',$columns_description,$avisos);
		}

		$msg_erro_tamanho 					= LNG('msg_maxFileSize');
		$msg_erro_tipo 						= LNG('msg_acceptFileTypes');
		$msg_erro_nao_existe_file_in_zip	= LNG('msg_nao_existe_file_in_zip').$name_file_import;
		$msg_nome_obrigatorio_necessario	= LNG('msg_nome_obrigatorio_necessario').$name_file_import;

		$extra_params		=	array(
				'upload_dir'				=>  $diretorio,
				'autoUpload'				=> 	true,
				'maxFileSize'				=> 	10000000, // 10 MB,
				'maxNumberOfFiles'			=> 	1,
				'botao_selecionar'			=>	true,
				'botao_enviar'				=>	false,
				'botao_cancelar'			=>	false,
				'botao_apagar'				=>	false,
				'barra_status'				=>	false,
				'image_versions' 			=>  false,
				'restricaoCsvZip'			=>  true,
				'nome_obrigatorio_zip' 		=> 	$name_file_import
				
				/*,
				'valida_nome_dentro_zip' 	=> 	true,
				'valida_nome_obrigatorio' 	=> 	true,
				'accept_file_types'			=>  ("/(zip)|(csv)$/i"),
				'messages'					=>  array(
						'maxFileSize'					=> $msg_erro_tamanho,
						'acceptFileTypes'				=> $msg_erro_tipo,
						'nao_existe_arquivo_zip'		=> $msg_erro_nao_existe_file_in_zip,
						'nome_obrigatorio_necessario'	=> $msg_nome_obrigatorio_necessario
				)*/
				//,'print_response' 	=>  false
		);
			
		include PATH_TEMPLATE.'import_file_window.php';
	
		$arquivos_existentes = $form_send?$upload->listFiles():$upload->removeAllFiles();
	
		$colunas_import_export = WRS_MANAGE_PARAM::getAtributoTabelaConfig($event_form,'colunas_import_export');
	
		$output_geral='';
		if($form_send && is_array($arquivos_existentes) && count($arquivos_existentes)>0){
			$caracter_delimitador	 = ($_request_original['caracter_d']!='ponto_virgula')?'virgula':'ponto_virgula';
			$tipo_importacao		 = ($_request_original['tipo_importacao']!='atualizar')?'remover':'atualizar';
			$colunas				 = ($colunas_import_export)?$colunas_import_export:'';
			$campo_id				 = $_request_original['campo_id'];
			$cont = 0;
			$msgs_erros = $msgs_erros_detalhes = array();
			foreach($arquivos_existentes as $arq){
				$nome_arquivo=false;
				if(strtoupper(substr($arq,-3))=='ZIP'){
						
					$file_zip_to_import	= str_replace('/',DS,$arq); // troca barras normais por invertidas para processo no SQL server/ windows
					$file_to_unzip		= str_replace('/',DS,$diretorio.$upload_dir_key.$name_file_import); // troca barras normais por invertidas para processo no SQL server/ windows
					$return_compact 	= $this->queryClass->getQueryCompreessFile('UNZIP', $file_zip_to_import, $file_to_unzip);
	
					$this->set_conn($this->OBJECT->get_conn());
					$query			= 	$this->query($return_compact);
						
					if(!$this->num_rows($query))
					{
						$msgs_erros[]="<b>".$arq."</b> ".LNG('file_not_unziped');
					}else{
	
	
						$rows 	= $this->fetch_array($query);
						// Verifica Retorno
						$status	= $rows['STATUS'];
						if($status>0){
							$nome_arquivo = $diretorio.$upload_dir_key.$name_file_import;
							$output_geral.= addslashes($rows['MESSAGE'])."<br>";
						}else{
							$msgs_erros[]=LNG('file_error_import');
								
							if($rows['MESSAGE']!=''){
								$msgs_erros_detalhes[]=$rows['MESSAGE'];
							}
						}
	
							
					}
						
						
				}else{
					$nome_arquivo = $arq;
				}
	
				if($nome_arquivo){
						
					// verifica se existem campos KEY para formar a chave para a tabela em importacao
					$primary = $campo_id;
					if(array_key_exists('_param', $_request_original)){
						$obj = $_request_original['_param'];
						$keys = array();
						foreach($obj['field'] as $atributo=>$dados_campo){
							if(array_key_exists('key', $dados_campo) || array_key_exists('primary', $dados_campo)){
								$keys[]=$atributo;
							}
						}
						unset($obj);
						if(count($keys)>0){
							$primary = implode(',',$keys);
						}
					}
	
					$ret = $this->trataDadosImportados($nome_arquivo,array(
							'delimitador'		=>$caracter_delimitador,
							'tipo_importacao'	=>$tipo_importacao,
							'tabela_import'		=>WRS_MANAGE_PARAM::getAtributoTabelaConfig($event_form,'tabela_bd'),
							'campo_id'			=>$primary,
							'colunas'			=>$colunas
					));
	
					if(is_array($ret)){
	
						// Verifica Retorno
						$status	= $ret['STATUS'];
						if($status>0){
							$output_geral.= addslashes($ret['MESSAGE'])."<br>";
						}else{
							$msgs_erros[]=LNG('file_error_import');
						}
	
						if($ret['ERROR']!=''){
							$msgs_erros_detalhes[]=$ret['ERROR'];
						}
							
					}else{
						$msgs_erros[]="<b>".$arq."</b> ".LNG('file_not_validated');
					}
	
				}else{
					$msgs_erros[]="<b>".$arq."</b> ".LNG('file_not_validated');
				}
			}
	
			$mensagem_success		= LNG('upload_files_success_file');
			$tipo_mensagem_success	= 'success';
			$tipo_mensagem_error	= 'error';
	
			if(count($msgs_erros)>0){
				$mensagem			= '<b>'.LNG('IMPORT_EXPORT_MESSAGES_STATUS').'</b><br>'.implode('<br>',$msgs_erros);
				if(count($msgs_erros_detalhes)>0){
					$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_DETAIL').'</b><br>'.implode('<br>',$msgs_erros_detalhes);
				}
				$tipo_mensagem 		= $tipo_mensagem_error;
			}else{
				$mensagem 			= $mensagem_success;
				$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_STATUS').'</b><br>'.$output_geral;
				if(count($msgs_erros_detalhes)>0){
					$mensagem			.= '<br><b>'.LNG('IMPORT_EXPORT_MESSAGES_DETAIL').'</b><br>'.implode('<br>',$msgs_erros_detalhes);
				}
				$tipo_mensagem 		= $tipo_mensagem_success;
			}
				
			$upload->removeAllFiles();
	
			return str_replace(array('{MENSAGEM}','{TIPOMENSAGEM}'),array($mensagem,$tipo_mensagem),$HTML_OK);
		}else{
			$upload->removeAllFiles();
			return $HTML_UPLOAD;
		}
	}
	
	public function trataDadosImportados($nameFile,$options){
		$delimitador 			= $options['delimitador']=='virgula'?',':(($options['delimitador']=='ponto_virgula')?';':'\t');
		$tipoImport	 			= $options['tipo_importacao']=='atualizar'?0:1;
		$tabelaImport	 		= $options['tabela_import'];
		$colunas	 			= $options['colunas'];
		$campo_id	 			= $options['campo_id'];
		$nome_apenas_arquivo 	= basename($nameFile);
		$query_import			= $this->queryClass->getQueryImportarTabela(array(
											'tabela'		=>$tabelaImport,
											'campo_id'		=>$campo_id,
											'colunas'		=>$colunas,
											'filtros'		=>'',
											'separador'		=>$delimitador,
											'diretorio'		=>$nameFile,
											'tipoImport'	=>$tipoImport
								));

		$this->set_conn($this->OBJECT->get_conn());
		$query			= 	$this->query($query_import);
		
		/*
		 * Verificando se existe resultado
		*/		
		if(!$this->num_rows($query))
		{
			return false;
		}else{
			return $this->fetch_array($query);
		}		
		
		return false;
		
	}
	

	public function export($options)
	{
		$param	=	 $this->RefreshDataAttrInParam($this->OBJECT->build_grid_form($options));
		unset($param['button']['update']);
		$_request_original = $_REQUEST;
		
		$arr_var_nao_permitidas = array(
				'class',
				'file',
				'event',
				'wrs_type_grid',
				'form_event'
		);
		foreach($arr_var_nao_permitidas as $proib){
			if(array_key_exists($proib, $_request_original)){
				unset($_request_original[$proib]);
			}
		}
		$param['prerequest'] = $_request_original;
		$param['html'] = $this->exportarRegistrosAdmin($param,$options);
		$param['title']= LNG('bt_export');
	
		// clona o botao para chamar a segunda parte da exportacao -> exportResults
		$param['button']['exportResults'] = $param['button']['export'];
		unset($param['button']['export']);
		$param['button_icon']['exportResults'] = $param['button_icon']['export'];
		unset($param['button_icon']['export']);
		unset($param['button']['changePassword']);

		return $param;
	}
	

	public function exportResults($options=null,$param_extra=null)
	{		

		$_request_original 	= $_REQUEST;
		$_tabela			= $_request_original['table'];
		$tabelaManageParam	= new WRS_MANAGE_PARAM();
		if($tabelaManageParam->load($_tabela)){
			header('Content-Type: application/json');
			
			$_fields		= $tabelaManageParam->getMetodoTabela($_tabela);
	
			if(is_array($_request_original) && array_key_exists('values', $_request_original) && array_key_exists('prerequest', $_request_original['values'])){
				$prerequest = (array)json_decode(base64_decode($_request_original['values']['prerequest']),1);
				if(is_array($prerequest)){
					$_request_original = array_merge($_request_original,$prerequest);
				}
			}		
			
			$_regForExport							= (array)json_decode(json_encode($_request_original['values'],1),1);
			$_regForExport 							= array_merge($_request_original,$_regForExport);
			$_regForExport['caracter_separacao'] 	= $_regForExport['caracter_d'];
			$_regForExport['efetua_compactacao'] 	= $_regForExport['caracter_c']!='nao'?true:false;
			unset($_regForExport['values']);
			unset($_regForExport['prerequest']);

			if(is_array($_regForExport) && array_key_exists('extraValues', $_regForExport)){
				$paramExtra = (array)json_decode($_regForExport['extraValues'],1);
				if(is_array($paramExtra)){
					$_regForExport = array_merge($_regForExport,$paramExtra);
				}
			}
			unset($_regForExport['extraValues']);
			unset($_regForExport['caracter_d']);
			unset($_regForExport['caracter_c']);
			
			$filtros_aplicados = "";
			if(array_key_exists('filters_window_grid', $_request_original) && $_request_original['filters_window_grid']){
				$kendoObj = new KendoUi();
				$filtros_aplicados = $kendoObj->filtersToWhere($_request_original['filters_window_grid']);
			}
	
			$arr_campos_request = array();
			foreach($_fields as $nome_campo => $valores){
				if(array_key_exists($nome_campo, $_request_original)){
					$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
				}
			}
			
			$event_form						= WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($_tabela);
			$_request_original['event'] 	= $event_form;
			
			$param	=	 array();
	
			$param['tabela_export']			= $event_form;
			$param['filtros_aplicados']		= $filtros_aplicados;
			$param['caracter_separacao']	= $_regForExport['caracter_separacao'];
			$param['efetua_compactacao']	= $_regForExport['efetua_compactacao'];
	
			$customer_id_logado		= WRS::CUSTOMER_ID();		
			$nome_diretorio = $customer_id_logado.'/';
			$param['nome_diretorio']	= $nome_diretorio;
		
			$param['filtro_fixo'] = is_array($param_extra) && array_key_exists('filtro_fixo', $param_extra)?$param_extra['filtro_fixo']:'';

			include PATH_TEMPLATE.'export_file_window.php';
			$param = $this->downloadLink($_regForExport['objetosSelecionados'],$_regForExport['chave_primaria'],$param);
					
			echo json_encode($param,true);
		}
		
	}
	
}

?>