<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

class QUERY_WRS_CUSTOMER
{
	
	public function Get_query_changetable($CUSTOMER_ID)
	{

		$query			=	"select ".$CUSTOMER_ID." as customerId";
		return $query;
		
	}
	
	public function Get_procedure_remove_customer($CUSTOMER_ID)
	{

		$query			=	"select ".$CUSTOMER_ID." as customerId_remove";
		return $query;
		
	}
	
}