<?php

/**
 * Contem Querys utilizadas para Filtrar consultas
 * @author msdantas
 *
 */

class QUERY_FILTER
{
	
	/**
	 * Efetua Pesquisa quando clica nos filtros
	 * 
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $ATTRIBUTE
	 * @param int $START
	 * @param int $END
	 * @param string $FILTER
	 * @param string $LIKE
	 * @param string $MEASURE
	 *
	 * @return <string>
	 */
	public function GET_SSAS_ATTRIBUTE(	$SERVER, $DATABASE, $CUBE, $ATTRIBUTE, $START, $END, $FILTER, $LIKE, $MEASURE)
	{
		// Exemplo: EXEC Get_SSAS_Attribute_Value '192.168.1.3','GSK - DDD','GSK - DDD','[FORCA DE VENDAS].[UNIDADE]',0,11,'','',''
		$query = <<<EOF
					EXEC Get_SSAS_Attribute_Value 	'{$SERVER}',
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
	 * Retorna os Relatórios marcados como AUTO LOAD
	 *
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 *
	 * @return <string>
	 */
	public function REPORT_AUTO_LOAD( $DATABASE_ID, $CUBE_ID )
	{
		$CUSTOMER_ID = WRS::CUSTOMER_ID();
		$USER_ID = WRS::USER_ID();
		$query = <<<EOF
					EXEC Get_SSAS_Reports_Autoload 	{$CUSTOMER_ID},
													{$USER_ID},
													'{$DATABASE_ID}',
													'{$CUBE_ID}'
EOF;
		return $query;
	}
	
	/**
	 * Retorna os filtros de um Relatório
	 * 
	 * @param int $FILTER_ID
	 *
	 * @return string
	 */
	public function FILTER_REPORT( $FILTER_ID )
	{
		$query = <<<EOF
					SELECT * 
					FROM ATT_WRS_FILTER 
					WHERE FILTER_ID = {$FILTER_ID}
EOF;
		return $query;
	}

}	