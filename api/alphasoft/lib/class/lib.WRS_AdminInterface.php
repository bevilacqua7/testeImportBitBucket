<?php
/*
 * interface com funcoes para a area administrativa
 * felipebevi.com.br 20160118
 */
includeClass('WRS_BASE');

class WRS_AdminInterface  extends WRS_BASE
{

	public $classname = NULL;
	public $OBJECT	= NULL;
	private $manage_param = NULL;
	public $temp_folder;
	

	// atualizar o atributo data dentro da variavel param para que se mantenha nas WindowGrids navegadas,
	// possibilitando ler o atributo "param_original" de qualquer tela navegada, o qual por sua vez são
	// os atributos da tabela em questão definidos no WRS_MANAGE_PARAM
	public function RefreshDataAttrInParam($_param){
		$param = $_param;
		$data=array();
		$param['visao_atual']	=	'list';
		$data['param_original'] = 	$param;
		$param['data']	=	json_encode($data);
		return $param;
	}
	
	public function SetObject($Object)
	{
		$this->OBJECT=$Object;
		$this->temp_folder = PATH_FILE.$this->classname.DS.'exportFiles'.DS;//sys_get_temp_dir().DIRECTORY_SEPARATOR;
		if(!is_dir(PATH_FILE.$this->classname)){
			mkdir(PATH_FILE.$this->classname, 0777, true);
		}
		if(!is_dir(PATH_FILE.$this->classname.DS.'exportFiles')){
			mkdir(PATH_FILE.$this->classname.DS.'exportFiles', 0777, true);
		}
		$scr_field_bloq = <<<HTML
		<script>
			$('input[type=text]').each(function(){ bloqueia_chars($(this)); });
		</script>
HTML;
		echo $scr_field_bloq;
	}
	
	public function downloadLink($_registros,$_chavePrimaria,$_param){
		$registros = $_registros;
		$chavePrimaria = $_chavePrimaria;
		$param = $_param;
		if(is_array($registros)){
			foreach($registros as $k=>$v){
				$registros[$k]=(int)strip_tags($v);
			}
			$registros = implode(',',$registros);
		}
	
		$arr_dados = $this->exportarDadosEmMassa($registros,$chavePrimaria,$param);
		if($arr_dados){
			$unique					=rand(0,99).date('YmdHis');
			$temp_filename_header	="export_".$this->classname."_".$unique."_cabecalhos.csv";
			$temp_filename_body		="export_".$this->classname."_".$unique."_registros.csv";
			$temp_filename_zip		="export_".$this->classname."_".$unique.".zip";
	
			$this->gerarArquivoCSVExport($temp_filename_header,array($arr_dados['titulos']));
			$this->gerarArquivoCSVExport($temp_filename_body,$arr_dados['dados']);
			$this->gerarArquivoZIPExport($temp_filename_zip,array($temp_filename_header,$temp_filename_body));
				
			$this->apagarArquivoGerado($this->temp_folder.$temp_filename_header);
			$this->apagarArquivoGerado($this->temp_folder.$temp_filename_body);
	
			$url = "run.php?file=".$this->classname."&class=".$this->classname."&event=downloadFile&fileDownload=".$temp_filename_zip;
			return $url;
		}else{
			return false;
		}
	
	}
	
	public function downloadFile(){
	
		$temp_filename_zip = trim($_REQUEST['fileDownload']);
		$this->SetObject(NULL);
	
		if(is_file($this->temp_folder.$temp_filename_zip)){
				
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			header("Cache-Control: public");
			header("Content-Description: File Transfer");
			header("Content-type: application/octet-stream");
			header("Content-Disposition: attachment; filename=\"".$temp_filename_zip."\"");
			header("Content-Transfer-Encoding: binary");
			header("Content-Length: ".filesize($this->temp_folder.$temp_filename_zip));
			ob_clean();
			flush();
			ignore_user_abort(true);
			if(readfile($this->temp_folder.$temp_filename_zip))
			{
				$this->apagarArquivoGerado($this->temp_folder.$temp_filename_zip);
			}
			exit();
				
		}else{
			return false;
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
	
	public function exportarDadosEmMassa($_registros,$_chavePrimaria,$_param){
		$registros = $_registros;
		$chavePrimaria = $_chavePrimaria;
		$param = $_param;
	
		/*
		 * Eventos do Banco
		 * @var WRS_MANAGE_PARAM
		 */
		$this->manage_param	= new WRS_MANAGE_PARAM();
	
		$page_current	=	fwrs_request('page_current');
		$page_current	=	 empty($page_current) ? 1 : $page_current;
	
		$page_size		=	fwrs_request('page_size');
		$page_size		=  	empty($page_size) ? 100000 : $page_size;
			
		if(!array_key_exists('order_by', $param['order'])){
			$param['order']['order_by']='';
		}
		if(!array_key_exists('order_type', $param['order'])){
			$param['order']['order_type']='';
		}
	
		if($registros=='*'){
			$sql			=	$this->manage_param->select('*', $this->classname, $param['order']['order_by'], $param['order']['order_type'], $page_current, $page_size);
		}else{
			/*
			 * TODO: query com where dos IDs dos registros selecionados no array $_type_reg
			 */
			//$sql			=	$this->manage_param->select('*', $this->classname, $param['order']['order_by'], $param['order']['order_type'], $page_current, $page_size);
			$sql			=	$this->manage_param->select('*', $this->classname, $param['order']['order_by'], $param['order']['order_type'], $page_current, $page_size);
			
		}
	
		$this->set_conn($this->OBJECT->get_conn());
		$query			= 	$this->query($sql);
		/*
		 * Verificando se existe resultado
		*/
		if(!$this->num_rows($query))
		{
			return false;
		}else{
	
			$arr_result=$arr_titles=array();
			while($rows = $this->fetch_array($query))
			{
				if(count($arr_titles)==0){
					foreach($rows as $title=>$val){
						$arr_titles[]=$title;
					}
				}
	
				// trata o que nao é string do retorno do banco de dados
				foreach($rows as $k=>$v){
					if(!is_string($v)){
						switch ($v){
							case @is_object($v):
								if(get_class($v)=='DateTime'){
									$rows[$k] = $v->format('d/m/Y H:i:s');
								}
						}
					}
				}
	
				$arr_result[]=$rows;
			}
				
			return array('titulos'=>$arr_titles,'dados'=>$arr_result);
		}
	
	
	}
	
	public function importarDadosEmMassa($name,$_request_original=NULL){
		
		$form_send			= (is_array($_request_original) && array_key_exists('envio_de_arquivo', $_request_original) && $_request_original['envio_de_arquivo']==1);
		$event_form			= $_request_original['event'];
		
		$upload_dir_key 	= 	array($_tabela,0,$name); // chave consiste em usuario logado + formulario em questao (ex. ATT_WRS_USER) + valor da chave da tabela (ex. USER_ID = 3)
	
		$extra_params		=	array(
				'autoUpload'		=> 	true,
				//'acceptFileTypes'	=>	"/(\.|\/)(gif|jpe?g|png)$/i",
				'maxFileSize'		=> 	3000000, // 3 MB,
				'maxNumberOfFiles'	=> 	1,
				'botao_selecionar'	=>	true,
				'botao_enviar'		=>	false,
				'botao_cancelar'	=>	false,
				'botao_apagar'		=>	false,
				'barra_status'		=>	false
		);
	
		// validacao se existir arquivos par a realizacao da importacao dos dados em massa
		include PATH_TEMPLATE.'import_file_window.php';
		$arquivos_existentes = $upload->listFiles();
		//exit('<pre>'.print_r($arquivos_existentes,1));
		if($form_send && is_array($arquivos_existentes) && count($arquivos_existentes)>0){
			$cont = 0;
			$msgs_erros = array();
			foreach($arquivos_existentes as $arq){
				$ret = $this->trataDadosImportados($upload->getFileContent($arq));
				$upload->removeFile($arq);
				if($ret!==true){
					$msgs_erros[]="<b>".$arq."</b> - ".$ret;
				}else{
					$cont++;
				}
			}
			$upload->removeAllFiles();
			$cont_err 		= count($arquivos_existentes)-$cont;
	
			$mensagem_success		= $cont . ($cont>1?LNG('upload_files_success_plur'):LNG('upload_files_success_sing'));
			$tipo_mensagem_success	= 'success';
				
			$mensagem_error			= $cont_err . ($cont_err>1?LNG('upload_files_error_plur'):LNG('upload_files_error_sing'));
			$tipo_mensagem_error	= 'warning';
				
			if($cont_err>0){
				$mensagem 			= $mensagem_error."<br>".$mensagem_success.(count($msgs_erros)>0?"<br><br>".implode("<br>",$msgs_erros):'');
				$tipo_mensagem 		= $tipo_mensagem_error;
			}else{
				$mensagem 			= $mensagem_success;
				$tipo_mensagem 		= $tipo_mensagem_success;
			}
				
			return str_replace(array('{MENSAGEM}','{TIPOMENSAGEM}'),array($mensagem,$tipo_mensagem),$HTML_OK);
		}else{
			$upload->removeAllFiles();
			return $HTML_UPLOAD;
		}
	}
	
	public function trataDadosImportados($conteudoFile){
		WRS_DEBUG_QUERY("===========================DADOS IMPORTADOS INICIO===========================");
		WRS_DEBUG_QUERY($conteudoFile);
		WRS_DEBUG_QUERY("===========================DADOS IMPORTADOS FIM==============================");
		return true;// true; // else return mensagem de erro
	}
	
	
}

?>