<?php

/**
 * Contem as querys para a verificação da conexão do usuário
 * @author msdantas
 *
 */

class QUERY_LOGIN
{

	/**
	 * Fazendo o Login do usuário
	 * @param string $USER_CODE
	 * @param string $USER_PWD
	 * @param string $ADDRESS
	 * @param string $SESSION
	 * @param string $BROWSER
	 * @param string $SYSTEM
	 * @return string
	 */
	public static function SET_LOGIN($USER_CODE,$USER_PWD,$ADDRESS,$SESSION,$BROWSER,$SYSTEM)
	{
		$query	=	"	EXEC Login_SSAS_User '".$USER_CODE."','".$USER_PWD."','".$ADDRESS."','".$SESSION."','".$BROWSER."','".$SYSTEM."'";
		return $query;
	}
	
	
	/**
	 * Verificando se o usuário encontra-se logado
	 * @param string $LOGIN_ID
	 * @return string
	 */
	public static function GET_LOGIN($LOGIN_ID)
	{
		$query	=	"EXEC Get_SSAS_Login '".$LOGIN_ID."'";
		return $query;
	}	
	
	/**
	 * Faz o Logaout do Usuário
	 * @param string $USER_CODE
	 * @return string
	 */
	public static function LOGOUT($USER_CODE)
	{
		$query	=	"EXEC Logout_SSAS_User '".$USER_CODE."'";
		return $query;
	}
							

	
	
	
	
}	