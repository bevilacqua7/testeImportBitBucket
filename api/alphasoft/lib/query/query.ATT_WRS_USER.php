<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author msdantas
 */

class QUERY_WRS_USER
{

	
	public function Get_SSAS_UserList()
	{
		
		$query	=	<<<HTML
							EXEC Get_SSAS_Reports {$CUSTOMER_ID}, '{$USER_CODE}', '{$USER_TYPE}', '{$DATABASE_ID}', '{$CUBE_ID}'

HTML;
		return $query;
		
	}
	
}