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
	
}