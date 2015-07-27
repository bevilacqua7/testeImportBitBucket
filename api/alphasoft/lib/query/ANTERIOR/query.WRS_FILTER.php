<?php

/**
 * Query dos Filtros
 * @author msdantas
 *
 */

class QUERY_FILTER
{
	
	/**
	 * Efetuando a Pesquisa quando clica nos filtros
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $ATTRIBUTE
	 * @param int $START
	 * @param int $END
	 * @param string $FILTER
	 * @param string $LIKE
	 * @param string $MEASURE
	 * @return string
	 */
	public function FIND_FILTER_SELECT($SERVER,
								$USER,
								$PWD,
								$DATABASE,
								$CUBE,
								$ATTRIBUTE,
								$START,
								$END,
								$FILTER,
								$LIKE,
								$MEASURE)
	{
		//Execmplo 
		//EXEC Get_SSAS_Attribute_Value '192.168.1.3','ALPHASOFT\automacao','auto!@#123','GSK - DDD','GSK - DDD','[FORCA DE VENDAS].[UNIDADE]',0,11,'','',''
		
		$query	=	<<<EOF
				EXEC Get_SSAS_Attribute_Value 	'{$SERVER}',
												'{$USER}',
												'{$PWD}',
												'{$DATABASE}',
												'{$CUBE}',
												'{$ATTRIBUTE}',
												{$START},
												{$END},
												'{$FILTER}',
												'{$LIKE}',
												'{$MEASURE}'				
EOF;
		return $query;
	}
	
	
	
	/**
	 * Retorna os Relatórios auto Load
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 * @return string
	 */
	public function RELATORIO_AUTO_LOAD(	$DATABASE_ID,
									$CUBE_ID)
	{
				$CUSTOMER_ID	=	WRS::CUSTOMER_ID();
				$USER_ID		=	WRS::USER_ID();
				$query			=	<<<EOF
					EXEC Get_SSAS_Reports_Autoload {$CUSTOMER_ID},{$USER_ID},'{$DATABASE_ID}','{$CUBE_ID}'
EOF;
				return $query;
	}
	
	
	/**
	 * 
	 * Retorna os filtros do Relatório
	 * 
	 * @param int $FILTER_ID
	 * @return string
	 */
	public function FILTER_RELATORIO($FILTER_ID)
	{
			$query	=	"SELECT *  FROM ATT_WRS_FILTER WHERE FILTER_ID=".$FILTER_ID;
			return $query;
	}
	
	
}	