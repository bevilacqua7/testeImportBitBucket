<?php 

class WRS_INI
{


	private static $ini_var	=	NULL;
	
	/**
	 * Carrega ini para a sessão
	 */
	public static function LOAD_INI(){
	
	
		if(!file_exists(PATH_INI))
		{
			echo '<br>ERROR não foi encontrado o arquivo ini '.PATH_INI.'<br>';
		}
	
	
		// Interpreta com as seções
		$ini_array = parse_ini_file(PATH_INI, true);
		self::$ini_var	=	$ini_array;
	
	}
	
	
	
	/**
	 * Retorna o string do INI
	 * @param string $paran
	 */
	public static function get_var_ini($paran)
	{
		return  self::$ini_var[$paran];
	}
	
	
	/**
	 * Retorna array dos arquivos ini
	 */
	public static function get_full_var()
	{
		return self::$ini_var;
	}
	
	
}

?>