<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

includeQUERY('ATT_WRS_AdminInterfaces');

class QUERY_WRS_CUSTOMER extends QUERY_WRS_ADMIN
{
	public function Get_procedure_remove_customer($tabela,$condicao){

		// por seguranca e testes
		$tabela 		= 'ATT_WRS_CUSTOMER';
				
		return $this->Get_procedure_remove($tabela, $condicao);
	}

	public function Get_query_changetable_customer($tabela,$arr_campos_valores,$condicao,$operacao){

		// por seguranca e testes
		$tabela 		= 'ATT_WRS_CUSTOMER';

		return $this->Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao);
	}
	
}