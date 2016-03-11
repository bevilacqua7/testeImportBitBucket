<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author msdantas
 */

class QUERY_LOGIN
{
	
	/**
	 * Efetua o Login do usuário
	 *
	 * @param string $USER_CODE
	 * @param string $USER_PWD
	 * @param string $ADDRESS
	 * @param string $SESSION
	 * @param string $BROWSER
	 * @param string $SYSTEM
	 *
	 * @return <string>
	 */
	public static function LOGIN_SSAS( $USER_PWD, $USER_MASTER, $USER_CODE, $ADDRESS, $SESSION, $BROWSER, $SYSTEM )
	{
		// Exemplos: EXEC Login_SSAS_User 'xxx','','mfacioli','192.168.1.22','ABCDE12345','SAFARI','MAC OS X 10.9'
		//           EXEC Login_SSAS_User 'xxx','mfacioli','msdantas','192.168.1.22','ABCDE12345','SAFARI','MAC OS X 10.9'
		$query = <<<EOF
					EXEC Login_SSAS_User	'{$USER_PWD}',
											'{$USER_MASTER}',
											'{$USER_CODE}',
											'{$ADDRESS}',
											'{$SESSION}',
											'{$BROWSER}',
											'{$SYSTEM}'
EOF;
		return $query;
	}
	
	/**
	 * Verifica se o usuário encontra-se logado
	 *
	 *	Utilizar o 
	 *	WRS::GET_LOGIN_ID()
	 *
	 * @param string $LOGIN_ID
	 *
	 * @return <string>
	 */
	public static function GET_SSAS_LOGIN( $LOGIN_ID )
	{
		// Exemplo: EXEC Get_SSAS_Login '92914B9CA2B84AD99C35FACDEC13D1BD'
		$query = <<<EOF
					EXEC Get_SSAS_Login '{$LOGIN_ID}'
EOF;
		return $query;
	}	
	
	/**
	 * Efetua o Logout do Usuário
	 *
	 * @param string $USER_CODE
	 *
	 * @return <string>
	 */
	public static function LOGOUT_SSAS( $USER_CODE )
	{
		// Exemplo: EXEC Logout_SSAS_User 'mfacioli'
		$query = <<<EOF
					EXEC Logout_SSAS_User '{$USER_CODE}'
EOF;
		return $query;
	}
	
	/**
	 * Efetua a Troca de Senha do Usuário
	 *
	 * @param string $USER_CODE
	 * @param string $USER_MASTER
	 * @param string $USER_PWD
	 * @param string $PWD_RESET
	 * @param string $CUSTOMER_ID
	 *
	 * @return <string>
	 */
	public static function CHANGE_SSAS_PASSWORD( $USER_CODE, $USER_MASTER, $USER_PWD, $PWD_RESET, $CUSTOMER_ID )
	{
		// Exemplo: EXEC Change_SSAS_Password 'mfacioli','','12345','abcde',0
		$query = <<<EOF
					EXEC Change_SSAS_Password '{$USER_CODE}',
					                          '{$USER_MASTER}',
											  '{$USER_PWD}',
											  '{$PWD_RESET}',
											  '{$CUSTOMER_ID}'
EOF;
		return $query;
	}

	/**
	 * Solicita o Codigo de Troca de Senha do Usuário
	 *
	 * @param string $USER_CODE
	 *
	 * @return <string>
	 */
	public static function RESET_SSAS_PASSWORD( $USER_CODE )
	{
		// Exemplo: EXEC Reset_SSAS_Password 'mfacioli'
		$query = <<<EOF
					EXEC Reset_SSAS_Password '{$USER_CODE}'
EOF;
		return $query;
	}
	
	/**
	 * Apenas para pegar o email do usuário
	 * @param string $USER_CODE
	 * 
	 * @return string
	 */
	public static function SELECT_EMAIL($USER_CODE)
	{
		$query		=	<<<EOF
				SELECT USER_EMAIL,USER_DESC from ATT_WRS_USER WHERE USER_CODE='{$USER_CODE}'
EOF;

		return $query;
	}
}

?>