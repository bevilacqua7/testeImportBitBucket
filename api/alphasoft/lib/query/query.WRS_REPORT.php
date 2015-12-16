<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author msdantas
 */

class QUERY_WRS_REPORT
{


	public function Get_SSAS_Reports($CUSTOMER_ID,$USER_CODE,$USER_TYPE,$DATABASE_ID,$CUBE_ID)
	{
	
		$query	=	<<<HTML
							EXEC Get_SSAS_Reports {$CUSTOMER_ID}, '{$USER_CODE}', '{$USER_TYPE}', '{$DATABASE_ID}', '{$CUBE_ID}'
	
HTML;
		return $query;
	
	}
	
	public function Get_SSAS_Reports_Groups($CUSTOMER_ID)
	{

		$query			=	"select distinct USER_TYPE from ATT_WRS_USER where CUSTOMER_ID =".$CUSTOMER_ID;
		return $query;
		
	}
	
}