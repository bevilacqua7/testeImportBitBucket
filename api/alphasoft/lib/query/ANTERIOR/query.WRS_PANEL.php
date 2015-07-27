<?php

/**
 * Contem as querys para a construção das grids
 * @author msdantas
 *
 */

class QUERY_PANEL
{
	
	
	 
	
	
	/**
	 * 
	 * Criando a tabela temporária
	 * Já retorna o total de linhas total de coluna e se ocorrou algum erro ao criar a temporária
	 * AS colunas que irei utilizar é apenas 
	 * TABLE_NAME
	 * ROWS
	 * MSG_ERROR
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $ROWS
	 * @param string $COLUMNS
	 * @param string $MEASURES
	 * @param string $FILTERS
	 * @param int $ALL_ROWS
	 * @param int $ALL_COLS
	 * @param int $COLS_ORDER
	 * @return string
	 */
	 public function GET_SSAS_TABLE(	$SERVER,
										$USER,
										$PWD,
										$DATABASE,
										$CUBE,
										$ROWS,
										$COLUMNS,
										$MEASURES,
										$FILTERS,
										$ALL_ROWS,
										$ALL_COLS,
										$COLS_ORDER
									)
	 {
	 	
	 	$USER_CODE	=	 WRS::USER_CODE();
	 	$query 		=	<<<EOF
	 	EXEC Get_SSAS_Table  	'{$SERVER}',
					 			'{$USER}',
					 			'{$PWD}',
							 	'{$DATABASE}',
					 			'{$CUBE}',
					 			'{$USER_CODE}',
							 	'{$ROWS}',
							 	'{$COLUMNS}',
							 	'{$MEASURES}',
							 	'{$FILTERS}',
							 	{$ALL_ROWS},
	 							{$ALL_COLS},
	 							{$COLS_ORDER}
EOF;
	 	return $query;
	 }
	
	
	
	/**
	 * 
	 * Criando e ordenando a tabela temporária conforme parametro  passado
	 * 
	 * CRIA A TABELA COMO REALMENTE DEVE SER USADA e na ordenação solicirada
	 * WARNING Quando passa por essa função acrescenta-se o S no final do nome da tabela temporária
	 * 
	 * @param string $TABLE_NAME
	 * @param int $LINE
	 * @param int $MEASURE
	 * @param string $ORDER
	 * @param string $FILTERS
	 * @return string
	 */
	public function SORT_TABLE(		$TABLE_NAME,
									$LINE,
									$MEASURE,
									$ORDER='ASC',
									$FILTERS='1=1'
									)
	{
		$query	=	 <<<EOF
								EXEC Sort_SSAS_Table {$TABLE_NAME},
														{$LINE},
														'{$MEASURE}',
														'{$ORDER}',
														'{$FILTERS}'
EOF;
		
		return $query;
	}
	
	
	/**
	 * Select principal para a construção da grid
	 * 
	 * @param string $TABLE_NAME
	 * @param int $ROW_NUMBER_START
	 * @param int $ROW_NUMBER_END
	 * @return string
	 */	
	public function SELECT($TABLE_NAME,$ROW_NUMBER_START,$ROW_NUMBER_END)
	{
	/*	$query 	=	<<<EOF
		SELECT * FROM {$TABLE_NAME} WHERE ROW_NUMBER > {$ROW_NUMBER_START} AND ROW_NUMBER <= {$ROW_NUMBER_END}
EOF;
*/
		$query 	=	<<<EOF
		EXEC Select_SSAS_Table '{$TABLE_NAME}',{$ROW_NUMBER_START},{$ROW_NUMBER_END}
EOF;

	
		return $query;
	}
	
	
	
	
	/**
	 * 
	 * Traz os nomes das colunas
	 * WARNING:Regra
	 * Executa a procedure com base nas conulas que são selecionadas
	 * Cada linha chama um novo comando e obedece a regra de ordenação 
	 * 
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $TABLE_NAME
	 * @param string $ATTRIBUTE
	 * @param string $LANGUAGE
	 * @return string
	 */
	public function GET_HEADER(	$SERVER,
								$DATABASE,
								$CUBE,
								$TABLE_NAME,
								$ATTRIBUTE,
								$LANGUAGE
								)
	{
			$query = <<<EOF
				EXEC Get_SSAS_Columns_Query '{$SERVER}',
											'{$DATABASE}',
											'{$CUBE}',
											'{$TABLE_NAME}',
											'{$ATTRIBUTE}',
											'{$LANGUAGE}'
EOF;
			return $query;			
	}
	
	
	
	/**
	 * Query para gerar pontos no mapa
	 * 
	 * Para gerar os pontos do Mapa precisa apenas pegar a header das colunas da tabela temporária e relacionar com o array do relationship
	 * E concatenar com o full name e o valor e devolper para a procedure abaixo
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $ATTRIBUTE
	 * @param string $FILTER
	 * @return string
	 */
	public function MAP(	$SERVER,
							$USER,
							$PWD,
							$DATABASE,
							$CUBE,
							$ATTRIBUTE,
							$FILTER
							)
	{
		$query 		=	<<<EOF
			EXEC Get_SSAS_Attribute_Address '{$SERVER}',
											'{$USER}',
											'{$PWD}',
											'{$DATABASE}',
											'{$CUBE}',
											'{$ATTRIBUTE}',
											'{$FILTER}'
EOF;
		return $query;
					
	}
	
}	