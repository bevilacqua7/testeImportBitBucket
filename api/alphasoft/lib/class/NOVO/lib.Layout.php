<?php
include_once(PATH_SMARTY.'libs'.DIRECTORY_SEPARATOR.'Smarty.class.php');

class WRS_LAYOUT extends Smarty
{
	
	public function load()
	{
		//Inicializa as configirações
		$this->PWS_SMART_CONFIG();
		
		//$this->force_compile = true;
		$this->debugging 		= false;
		$this->caching 			= false;
		$this->cache_lifetime 	= 120;
		
		/*
		 * Cria pastas temporárias do ClassSmarty
		 */
		$this->setTemplateDir(PATH_TEMPLATE);
		$this->setCompileDir(PATH_TEMPLATE_CACHE);
		$this->setPluginsDir(SMARTY_PLUGINS_DIR);
		$this->setCacheDir(PATH_CACHE);
		$this->setConfigDir(PATH_CONFIG_SMARTY);		
		
		/*
		 * Validação da criação dos diretórios
		 */		
		fpws_create_folder(PATH_CONFIG_SMARTY);
		fpws_create_folder(PATH_TEMPLATE_CACHE);
		fpws_create_folder(SMARTY_PLUGINS_DIR);
		fpws_create_folder(PATH_CACHE);
		
	}
	
	/**
	 * Alimenta as variáveis com o array passado
	 * @param array $array_info
	 */
	public function set_var($array_info)
	{
		if(is_array($array_info)){
			foreach($array_info as $label =>$value)
			{
				$this->assign($label, $value);
			}
		}
	}
	
	public function set_layout($layout_name)
	{
		/*
		 * Carregado o idima
		 */
				
		
		if(is_array($_SESSION['PWS_LNG'])){			
			foreach ($_SESSION['PWS_LNG'] as $label =>$value){
				$this->assign($label,$value);
			}
		}
		/*
		 * FIM Idioma
		 */
		
		//Carrega o Layout
		$this->display($layout_name);
	}
	
	
}