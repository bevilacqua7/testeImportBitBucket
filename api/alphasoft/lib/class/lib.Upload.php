<?php

includeCLASS('WRS_BASE');

define('DIR_JQUERY_UPLOAD_LIB','jQuery-File-Upload-9.11.2'.DS.'server'.DS.'php'.DS.'UploadHandler.php');

$paramUpload	=	array(
							'php'=>DIR_JQUERY_UPLOAD_LIB
						 );

include_once(PATH_API.$paramUpload['php']);


class WRSUpload extends WRS_BASE
{

	private $parameter		=	array(
										'upload_dir'		=>	NULL,
										'upload_url'		=>	NULL,
										'autoUpload'		=> 	true,
										//'acceptFileTypes'	=>	"/(\.|\/)(gif|jpe?g|png)$/i",
										'maxFileSize'		=> 	5000000, // 5 MB,
										'maxNumberOfFiles'	=> 	10,
										'botao_selecionar'	=>	true,
										'botao_enviar'		=>	true,
										'botao_cancelar'	=>	true,
										'botao_apagar'		=>	true,
										'barra_status'		=>	true
									 );

	public $nameFile;
	private $urlServerVar;
	
	public function WRSUpload($filename=NULL,$extra_params=NULL){
		
		if(is_array($extra_params) && count($extra_params)>0){
			$this->parameter = $extra_params + $this->parameter;
		}
		$this->define_name_file($filename);
		$this->ruleFileName();		
		$this->urlServerVar						=	'?filename=Upload&class=WRSUpload&event=upload&nameFile='.base64_encode($this->nameFile).'&params='.base64_encode(json_encode($this->parameter));
		
		
	}
	
	public function run()
	{

		$event	=	 fwrs_request('event');
		$this->define_name_file(base64_decode(fwrs_request('nameFile')));
		$this->parameter = (array)json_decode(base64_decode(fwrs_request('params')));
		$this->urlServerVar						=	'?filename=Upload&class=WRSUpload&event=upload&nameFile='.base64_encode($this->nameFile).'&params='.base64_encode(json_encode($this->parameter));
		
		switch($event)
		{
			case 'upload' : $this->Handler(); break;
		}
	}
	
	public function monta_parameters_for_extra_options($arr_param){
		if(is_array($arr_param) && count($arr_param)>0){
			$ret = '';
			foreach($arr_param as $k=>$v){
				if(is_int($v)){					
					$ret.="\n\t,".$k.": ".$v;
				}else{					
					$ret.="\n\t,".$k.": ".'"'.str_replace('\\',"\\\\",$v).'"';
				}
			}
			return $ret;
		}else{
			return '';
		}
	}
	
	
	public function uploadHTML()
	{
		$id	=	'fileupload';//'WRSUpload'.rand(1,99999);
		
		$this->ruleFileName();
	
		$parameter_upload							=	$this->parameter;
		$parameter_upload['id']						=	$id;
		$parameter_upload['upload_server']			=	'run.php'.$this->urlServerVar;
		$parameter_upload['upload_extra_options']	=	$this->monta_parameters_for_extra_options($this->parameter);

		/*
		 * TODO: ver com o Santos o por quê deste include_once já ter sido chamado e nao acrescentar de novo o upload
		 */
		include(PATH_TEMPLATE.'upload.php');
		return $HTML;
		
	}
	
	
	public function define_name_file($arr_dir){
		if(is_array($arr_dir) && count($arr_dir)>0){
			$this->nameFile = implode(DS,$arr_dir).DS;
		}else if($arr_dir!='' && is_string($arr_dir)){
			$this->nameFile = $arr_dir;
		}
	}
	
	private function ruleFileName()
	{
		$nameFile							=	$this->nameFile;
		$nameFileURL						=	str_replace(DS, DS_URL, $nameFile);
		$this->parameter['upload_dir']		=	PATH_FILE.$nameFile;
		$this->parameter['upload_url']		=	PATH_FILE_URL.$nameFileURL;
		$DIR_JQUERY_UPLOAD_LIB_URL			=	str_replace(DS, DS_URL, DIR_JQUERY_UPLOAD_LIB);
		$this->parameter['script_url']		=	'api'.DS_URL.$DIR_JQUERY_UPLOAD_LIB_URL.$this->urlServerVar;
		$this->parameter['script_url']		=	'run.php'.$this->urlServerVar;
		
	}
	

	public function Handler()
	{
		$this->ruleFileName(); 
		$UploadHandler = new UploadHandler($this->parameter);
	}


	public function listFiles()
	{
		$files = array_diff(glob(PATH_FILE.$this->nameFile.'{,.}*', GLOB_BRACE), array(PATH_FILE.$this->nameFile.'..',PATH_FILE.$this->nameFile.'.')); // gerado pela visualizacao do windows [thumbnail]
		return $files;
	}

	public function removeAllFiles()
	{
		$files=$this->listFiles();
		$status=true;
		if(is_array($files) && count($files)>0){
			foreach($files as $file){			
				$s=$this->removeFile($file);
				if($status && !$s){
					$status=$s;
				}
			}
			return $status;
		}else{
			return true;
		}
	}

	public function getFileContent($file){
		$arq = PATH_FILE.$this->nameFile.$file;
		if(is_file($arq)){
			return file_get_contents($arq);
		}else{
			return false;
		}
	}
	
	public function removeFile($file){
		$arq = is_file($file)?$file:(is_file(PATH_FILE.$this->nameFile.$file)?PATH_FILE.$this->nameFile.$file:$file);
		if(is_file($arq)){
			return unlink($arq);
		}else if(is_dir($arq)){
			return $this->removeFolder($arq);
		}else{
			return false;
		}
	}
	
	public function removeFolder($path){
		$path = is_dir($path)?$path:PATH_FILE.$path.'*';
		try{
			$iterator = new DirectoryIterator($path);
			foreach ( $iterator as $fileinfo ) {
				if($fileinfo->isDot())continue;
				if($fileinfo->isDir()){
					if($this->removeFolder($fileinfo->getPathname()))
						@rmdir($fileinfo->getPathname());
				}
				if($fileinfo->isFile()){
					@unlink($fileinfo->getPathname());
				}
			}
		} catch ( Exception $e ){
			// write log
			return false;
		}
		return true;
	}
	
	
	
	
}