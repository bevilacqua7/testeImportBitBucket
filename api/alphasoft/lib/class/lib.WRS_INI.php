<?php 

class WRS_INI
{


	private static $ini_var		=	NULL;
	private static $ini_load	=	NULL;
	private static $full_ini	=	NULL;
	
	/**
	 * Carrega ini para a sessão
	 */
	public static function LOAD_INI()
	{
		if(!file_exists(PATH_INI))
		{
			echo '<br>ERROR não foi encontrado o arquivo ini '.PATH_INI.'<br>';
		}
	
		// Interpreta com as seções
		self::$full_ini = parse_ini_file(PATH_INI, true);
		
		if(isset(self::$full_ini[$_SERVER['SERVER_NAME']])){
			self::$ini_var	=	self::$full_ini[$_SERVER['SERVER_NAME']];
		}else{
			//Assume olphaweb_como default
			self::$ini_var	=	self::$full_ini['alphaweb'];
		}
		
		 
	}
	
	/**
	 * var $input 
	 */
	public static function WRS_SERVER($input=NULL)
	{
		if(empty($input)) return self::$ini_var;
		
		return self::$ini_var[$input];
	}
	
	public static function tmp()
	{
	
		return self::$full_ini['tmp'];
	
	}
	
	
	public static function WRS_DEFINE()
	{
		
		$data_define	=	self::$full_ini['WRS_DEFINE'];
		$default_url	=	self::WRS_SERVER();
		
		return array_merge($data_define,$default_url);
		
	}
	

	
	
	
}

?>