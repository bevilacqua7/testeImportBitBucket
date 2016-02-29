<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

includeQUERY('ATT_WRS_AdminInterfaces');

class QUERY_WRS_LOG extends QUERY_WRS_ADMIN
{

	public function Get_procedure_remove_log($tabela,$condicao){
	
		// por seguranca e testes
		$tabela 		= 'FAT_WRS_LOG';
	
		return $this->Get_procedure_remove($tabela, $condicao);
	}
	

	public function Get_query_changetable_log($tabela,$arr_campos_valores,$condicao,$operacao){
	
		// por seguranca e testes
		$tabela 		= 'FAT_WRS_LOG';
	
		return $this->Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao);
	}
	
	
}