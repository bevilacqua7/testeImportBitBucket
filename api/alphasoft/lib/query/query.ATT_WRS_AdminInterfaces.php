<?php
/**
 * Contem Querys para a verificação da conexão do usuário
 * @author fbevilacqua
 * interface com funcoes para a area administrativa
 * felipebevi.com.br 20160118
 */
includeClass('WRS_BASE');
includeQuery('WRS_MANAGE_PARAM');

class QUERY_WRS_ADMIN
{
	public function manageExceptionChangeQueryDelete($tabela,$CUSTOMER_ID=NULL){
		/*
			QUANDO OPERATION = 'DELETE' E TABLE_NAME = 'TABELAS ABAIXO' OS ELEMENTOS DO PARAMETRO @FILTER DEVEM CONTER O PARAMETROS ABAIXO RELATIVOS A CADA FUNÇÃO
            ATT_WRS_CUSTOMER = Remove_SSAS_Customer( @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
            ATT_WRS_USER = Remove_SSAS_User( @USER_ID BIGINT, @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
            ATT_WRS_SERVER = Remove_SSAS_Server( @SERVER_ID VARCHAR(100), @USER_CODE VARCHAR(100) )
            ATT_WRS_DATABASE = Remove_SSAS_Database( @DATABASE_ID VARCHAR(100), @SERVER_ID VARCHAR(100), @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
            ATT_WRS_CUBE = Remove_SSAS_Cube( @CUBE_ID VARCHAR(100), @DATABASE_ID VARCHAR(100), @SERVER_ID VARCHAR(100), @CUSTOMER_ID BIGINT, @USER_CODE VARCHAR(100) )
            ATT_WRS_PERFIL = Remove_SSAS_Perfil( @PERFIL_ID VARCHAR(50), @USER_CODE VARCHAR(100) )
            REL_WRS_ATTRIBUTE_LEVEL = Remove_SSAS_Relationship( @DATABASE_ID VARCHAR(100), @CUBE_ID VARCHAR(100), @ATTRIBUTE_HIERARCHY VARCHAR(100), @ATTRIBUTE_LEVEL VARCHAR(100) )
		 */
		$condicao='';
		
		$current_user 			= WRS::GET_SSAS_USER();

		//$CUSTOMER_ID 			= $CUSTOMER_ID==NULL?WRS::CUSTOMER_ID():implode(',',$CUSTOMER_ID);
		$CUSTOMER_ID 			= WRS::CUSTOMER_ID();
		$USER_CODE 				= WRS::USER_CODE();
		$USER_ID 				= WRS::USER_ID();
		$SERVER_ID 				= WRS::SERVER_ID();
		$DATABASE_ID 			= fwrs_remove_colchete($current_user->cube['DATABASE_ID']);
		$CUBE_ID 				= fwrs_remove_colchete($current_user->cube['CUBE_ID']);
		$PERFIL_ID 				= WRS::INFO_SSAS_LOGIN('PERFIL_ID');
		$ATTRIBUTE_HIERARCHY 	= '';
		$ATTRIBUTE_LEVEL 		= '';
		
		switch(WRS_MANAGE_PARAM::confereTabelaCadastroRetorno($tabela)){
			//case "ATT_WRS_CUSTOMER_TESTE":
			case "ATT_WRS_CUSTOMER": 		$condicao="$CUSTOMER_ID, $USER_CODE"; break;
			case "ATT_WRS_USER": 			$condicao="$USER_ID, $CUSTOMER_ID, $USER_CODE"; break;
			case "ATT_WRS_SERVER": 			$condicao="$SERVER_ID, $USER_CODE"; break;
			case "ATT_WRS_DATABASE": 		$condicao="$DATABASE_ID, $SERVER_ID, $CUSTOMER_ID, $USER_CODE"; break;
			case "ATT_WRS_CUBE": 			$condicao="$CUBE_ID, $DATABASE_ID, $SERVER_ID, $CUSTOMER_ID, $USER_CODE"; break;
			case "ATT_WRS_PERFIL": 			$condicao="$PERFIL_ID, $USER_CODE"; break;
			case "REL_WRS_ATTRIBUTE_LEVEL":	$condicao="$DATABASE_ID, $CUBE_ID, $ATTRIBUTE_HIERARCHY, $ATTRIBUTE_LEVEL"; break;
		}
		
		return $condicao;
	}
	
	public function Get_query_changetable($tabela,$arr_campos_valores,$condicao,$operacao)
	{
		$arr_operacoes = array('INSERT','UPDATE');
		
		if(in_array($operacao,$arr_operacoes) && $tabela!='' && is_array($arr_campos_valores) && count($arr_campos_valores)>0){
			if($operacao=='INSERT'){ // certifica que inserts nao recebam condicoes
				$condicao='';
			}
			
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
	
	public function Get_procedure_remove($tabela,$condicao)
	{

		if($tabela!=''){
						
			if($condicao!=''){
				
				$query			=	"EXEC Change_Table '".$tabela."',
					                  '',
					                  '',
					                  '".$condicao."',
					                  'DELETE',
					                  1";
				//exit($query);
				return $query;
				
			}else{
				return false;
			}
		}else{
			return false;
		}
		
	}
	

	public function getQueryExportarTabela($options){
		/*
		 Export_Table( @TABLE_NAME VARCHAR(MAX), @FIELDS VARCHAR(MAX), @FILTER VARCHAR(MAX) = '', @DIRECTORY VARCHAR(MAX), @SEPARATOR VARCHAR(10) = ',' )
	
		 EXEC Export_Table 'ATT_WRS_CUSTOMER_TESTE',
		 'CUSTOMER_CODE,CUSTOMER_DESC,CUSTOMER_EXPIRY,CUSTOMER_FLAG,CUSTOMER_STATUS,CUSTOMER_GROUP',
		 '',
		 'E:\TEMP',
		 ';'	
		 */
	
		if(array_key_exists('tabela', $options) && $options['tabela']!=''){
			$tabela 	= $options['tabela'];
			$colunas	= (array_key_exists('colunas', $options))?((is_array($options['colunas']))?implode(',',$options['colunas']):$options['colunas']):'*';
			$separador	= (array_key_exists('separador', $options))?$options['separador']:';';
			$separador 	= $separador=='virgula'?',':(($separador=='ponto_virgula')?';':'\t');
			$diretorio	= (array_key_exists('diretorio', $options))?$options['diretorio']:'';
			$filtros 	= $options['filtros'];
			
			// Nas tabelas de Usuarios e Associacao, não devem exportar PERFIS = MASTER e ADMINISTRADOR
			$perfil_logado 	= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
			if($tabela=='ATT_WRS_USER' || $tabela=='REL_WRS_CUBE_USER'){
				$filtros=(($filtros!='')?$filtros.' AND ':'')."PERFIL_ID NOT IN (''MST'',''ADM'')";
			}
			
			$arq_conf_param	= WRS_MANAGE_PARAM::getAtributoTabelaConfig($tabela,'nome_arquivo_import');
			$diretorio 		= $diretorio.$arq_conf_param;
			
			$diretorio_inv	= str_replace('/','\\',$diretorio);
				
			return array("query"=> "
						EXEC Export_Table '".$tabela."',
		                        '".$colunas."',
		                        '".$filtros."',
		                        '".$diretorio_inv."',
		                        '".$separador."'
					",
					"file" 		=> $diretorio,
					"file_ori" 	=> $arq_conf_param
			);
		}else{
			return false;
		}
	}
	
	public function getQueryImportarTabela($options){
		/*
	
	
		Import_Table( @TABLE_NAME VARCHAR(MAX), @FIELDS VARCHAR(MAX), @KEYS VARCHAR(MAX), @FILTER VARCHAR(MAX) = '', @FILE VARCHAR(MAX), @SEPARATOR VARCHAR(10) = ',', @REPLACE BIT = 0 )
			
		EXEC Import_Table 'ATT_WRS_CUSTOMER_TESTE',
		'CUSTOMER_CODE,CUSTOMER_DESC,CUSTOMER_EXPIRY,CUSTOMER_FLAG,CUSTOMER_STATUS,CUSTOMER_GROUP',
		'CUSTOMER_CODE',
		'',
		'E:\TEMP\ATT_WRS_CUSTOMER_TESTE.CSV',
		';',
		1
			
		EXEC Import_Table 'ATT_WRS_PERFIL_TESTE',
		'',
		'',
		'', --'PERFIL_ID LIKE ''DRG%''',
		'E:\TEMP\ATT_WRS_PERFIL_TESTE.CSV',
		';',
		1
		 
		 
		-- em 24/02 adicionado mais 2 campos ao final - usuario e customer_id logados
		ex. complemento da query:
		,
		'fbevilacqua',
		1
		*/
		if(array_key_exists('tabela', $options) && $options['tabela']!='' && array_key_exists('campo_id', $options) && $options['campo_id']!=''){
			$tabela 	= $options['tabela'];
			$colunas	= (array_key_exists('colunas', $options))?((is_array($options['colunas']))?implode(',',$options['colunas']):$options['colunas']):'';
			$filtros	= (array_key_exists('filtros', $options))?((is_array($options['filtros']))?implode(',',$options['filtros']):$options['filtros']):'';
			$separador	= (array_key_exists('separador', $options))?$options['separador']:';';
			$tipoImport	= (array_key_exists('tipoImport', $options))?$options['tipoImport']:0;
			$campo_id 	= $options['campo_id'];
			$user_logado 		= WRS::USER_CODE();
			$customer_id_logado	= WRS::CUSTOMER_ID();
				
			$diretorio 	= str_replace('/','\\',$options['diretorio']);
	
			return "
						EXEC Import_Table '".$tabela."',
		                        '".$colunas."',
		                        '".$campo_id."',
		                        '".$filtros."',
		                        '".$diretorio."',
		                        '".$separador."',
				                ".$tipoImport.",
				                '".$user_logado."',
				                ".$customer_id_logado."
					";
		}else{
			return false;
		}
	}
	
	public function getQueryCompreessFile($action, $arquivo_de, $arquivo_para, $options){
		/*
		 Compress_Files ( @ZipCommand VARCHAR(10), @ZipFolder VARCHAR(255), @ZipFile VARCHAR(255), @Replace BIT = 1, @ShowOutput BIT = 0 )
		 	
		 EXEC Compress_Files 'ZIP','E:\TEMP\ASSP.DLL','E:\TEMP\ZIP\SQLZIP.ZIP'
		 EXEC Compress_Files 'ZIP','E:\TEMP\GSK - DDD.ABF','E:\TEMP\ZIP\SQLZIP.ZIP',0,1
		 EXEC Compress_Files 'UNZIP','E:\TEMP\ZIP\SQLZIP.ZIP','E:\TEMP\UNZIP'
		 */
		$_action 		= $action=='ZIP'?'ZIP':'UNZIP';
		$_arquivo_de 	= $arquivo_de;
		$_arquivo_para 	= $arquivo_para;
		$replace 		= (array_key_exists('replace',$options) && $options['replace'])?'0':'1';
		$output 		= (array_key_exists('output',$options) && $options['output'])?'1':'0';
		$query 			= "
			EXEC Compress_Files '".$_action."','".$_arquivo_de."','".$_arquivo_para."',".$replace.",".$output."
				";
		return $query;
	}
	
}