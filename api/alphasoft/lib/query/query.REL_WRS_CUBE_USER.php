<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 */

includeQUERY('ATT_WRS_AdminInterfaces');

class QUERY_WRS_CUBE_USER extends QUERY_WRS_ADMIN
{

	public function getCurrentAssociations($user_id,$cube_id=false,$database_id=false,$server_id=false){
		
		$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
		$where=array();
		if($perfil_logado!='MST' || $perfil_logado=='ADM'){
			$CUTOMER_ID 			= WRS::CUSTOMER_ID();
			$where[]="CUSTOMER_ID = ".$CUTOMER_ID;
		}
			
		if(isset($user_id) && $user_id!=''){
			$where[]="USER_ID = ".$user_id;
		}

		if(isset($cube_id) && isset($database_id) && isset($server_id) && $cube_id!='' && $database_id!='' && $server_id!=''){
			$where[]="CUBE_ID = ''".$cube_id."''";
			$where[]="DATABASE_ID = ''".$database_id."''";
			// voltou a considerar SERVER ID - Faciolli - felipeb 20160324 17h21
			$where[]="SERVER_ID = ''".$server_id."''"; // nao considero server id por existir balance entre os servers - facioli 20160307 - felipeb
		}
		
		$where = is_array($where) && count($where)>0?implode(' AND ',$where):'';
		
		$sql = WRS_MANAGE_PARAM::select('*','REL_WRS_CUBE_USER','','ASC',1,0, $where);
		
		return $sql;
	}
	
	public function getCurrentAssociationsByUser($user_id){
		return $this->getCurrentAssociations($user_id);
	}
	
	public function getCurrentAssociationsByCube($cube_id,$database_id,$server_id){
		return $this->getCurrentAssociations(false,$cube_id,$database_id,$server_id);
	}

	public function getQueryAllUsers($user_id=null){	
		$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
		$where=array();
		if($perfil_logado!='MST' || $perfil_logado=='ADM'){
			$CUTOMER_ID 			= WRS::CUSTOMER_ID();
			$where[]="CUSTOMER_ID = ".$CUTOMER_ID;
		}		
		if(isset($user_id) && $user_id!=''){
			$where[]="USER_ID = ".$user_id;
		}	
		$where = is_array($where) && count($where)>0?implode(' AND ',$where):'';
	
		$sql = WRS_MANAGE_PARAM::select('*','ATT_WRS_USER','','ASC',1,0, $where);	
		return $sql;
	}

	public function getQueryAllCubes($cube_id=null,$database_id=null,$server_id=null){	
		$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
		$where=array();
		if($perfil_logado!='MST' || $perfil_logado=='ADM'){
			$CUTOMER_ID 			= WRS::CUSTOMER_ID();
			$where[]="CUSTOMER_ID = ".$CUTOMER_ID;
		}		
		if(isset($cube_id) && isset($database_id) && isset($server_id) && $cube_id!='' && $database_id!='' && $server_id!=''){
			$where[]="CUBE_ID = ''".$cube_id."''";
			$where[]="DATABASE_ID = ''".$database_id."''";
			// voltou a considerar SERVER ID - Faciolli - felipeb 20160324 17h21
			$where[]="SERVER_ID = ''".$server_id."''"; // nao considero server id por existir balance entre os servers - facioli 20160307 - felipeb
		}
		$where = is_array($where) && count($where)>0?implode(' AND ',$where):'';
	
		$sql = WRS_MANAGE_PARAM::select('*','ATT_WRS_CUBE(POOL)','','ASC',1,0, $where);	
		return $sql;
	}	
	
	public function Get_procedure_remove_cube_user($tabela,$condicao){
	
		// por seguranca e testes
		$tabela 		= 'REL_WRS_CUBE_USER';
	
		return $this->Get_procedure_remove($tabela, $condicao);
	}
	

	public function Get_query_changetable_cube_user($tabela,$arr_campos_valores,$condicao,$operacao){
	
		// por seguranca e testes
		$tabela 		= 'REL_WRS_CUBE_USER';
	
		return $this->Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao);
	}

	/**
	 * Insere os Relacionamentos entre Cubo x Usuário
	 * 
	 * @param int $SERVERS
	 * @param int $DATABASES
	 * @param int $CUBES
	 * @param int $USERSS
	 * @param int $RELATIONSHIP
	 *
	 * @return string
	 */
	public function INSERT_RELATIONSHIP( $SERVERS, $DATABASES, $CUBES, $USERS, $RELATIONSHIP  = 'USER')
	{
		// Exemplo: EXEC Insert_Relationship  'ALPHABASE,ALPHAWEB', 'GSK - DDD,GSK - MDTR', 'GSK - DDD,GSK - MDTR', '1,2,3', 'CUBE' -- CUBE / USER
		$USER_CODE = WRS::USER_CODE();
		$query = <<<EOF
					EXEC Insert_Relationship '{$SERVERS}', 
					                         '{$DATABASES}',
					                         '{$CUBES}',
					                         '{$USERS}',
					                         '{$RELATIONSHIP}'
											 '{$USER_CODE}'
EOF;
		return $query;
	}
		
}