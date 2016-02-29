<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

includeQUERY('ATT_WRS_AdminInterfaces');

class QUERY_WRS_DOWNLOAD extends QUERY_WRS_ADMIN
{

	public function Get_procedure_remove_download($tabela,$condicao){
	
		// por seguranca e testes
		$tabela 		= 'ATT_WRS_DOWNLOAD';
	
		return $this->Get_procedure_remove($tabela, $condicao);
	}
	

	public function Get_query_changetable_download($tabela,$arr_campos_valores,$condicao,$operacao){
	
		// por seguranca e testes
		$tabela 		= 'ATT_WRS_DOWNLOAD';
	
		return $this->Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao);
	}
	
	
}