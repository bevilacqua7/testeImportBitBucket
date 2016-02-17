<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

class QUERY_WRS_ADMIN
{
	
	public function Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao)
	{
		$arr_operacoes = array('INSERT','UPDATE');
		
		if(in_array($operacao,$arr_operacoes) && $tabela!='' && is_array($arr_campos_valores) && count($arr_campos_valores)>0){
	
			// por seguranca e testes
			$tabela = 'ATT_WRS_CUSTOMER_TESTE';
			
			$query			=	"EXEC Change_Table '".$tabela."',
				                  '".implode(",",array_keys($arr_campos_valores))."',
				                  '".implode(",",array_values($arr_campos_valores))."',
				                  '".$condicao."',
				                  '".$operacao."',
				                  1";
			return $query;
			
		}else{
			return false;
		}
	}
	
	public function Get_procedure_remove_customer($tabela,$condicao)
	{

		if($tabela!='' && $condicao!=''){
			
			// por seguranca e testes
			$tabela = 'ATT_WRS_CUSTOMER_TESTE';
			
			$query			=	"EXEC Change_Table '".$tabela."',
				                  '',
				                  '',
				                  '".$condicao."',
				                  'DELETE',
				                  1";
			return $query;

		}else{
			return false;
		}
		
	}
	
}