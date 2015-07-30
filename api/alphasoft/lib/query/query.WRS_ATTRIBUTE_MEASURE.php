<?php

/**
 * Contem Querys para a obtenção dos dados de Cubo
 * @author msdantas
 */

class QUERY_ATTRIBUTE_MEASURE
{
	
	/**
	 * Obtem a Data de Atualização do Cubo
	 * 
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 *
	 * @return <string>
	 */
	public function CUBE_SSAS_UPDATE( $SERVER, $DATABASE, $CUBE )
	{
		// Exemplo: EXEC Get_SSAS_CubeUpdate '192.168.1.4','GSK - PMB','GSK - PMB', @UPDATE OUTPUT
		$query = <<<EOF
					DECLARE @UPDATE VARCHAR(MAX)
					EXEC Get_SSAS_CubeUpdate	'{$SERVER}',
												'{$DATABASE}',
												'{$CUBE}',
												@UPDATE OUTPUT 
					SELECT @UPDATE AS CUBE_UPDATE
EOF;
		return $query;
	}

	/**
	 * Verifica se o Banco possui multiplos Cubo associados
	 * 
	 * WARNING: Caso retorne mais de um resultado possui multiplos Cubos
	 * 
	 * @param INT $DATABASE_ID
	 * @param INT $USER_ID
	 *
	 * @return <string>
	 */
	public function MULTIPLE_SSAS_CUBE( $DATABASE_ID, $USER_ID )
	{
		$query = <<<EOF
		            EXEC Get_SSAS_CubeUser {$USER_ID},'{$DATABASE_ID}'
EOF;
		return $query;
	}

	/**
	 * Consulta para Obter a Lista de Atributos de um Cubo e os Relacionamentos entre eles
	 * 
	 * WARNING: Separar como DISTINCT, deve se utilizar DIMENSION_NAME apenas para montar a tela
	 *
	 * Valores Retornados:
	 * RELATIONSHIP_SOURCE
	 * DIMENSION_NAME
	 * LEVEL_FULL
	 * LEVEL_NAME
	 * LEVEL_UP
	 * LEVEL_DOWN
	 * LEVEL_DRILL
	 * LEVEL_DEFAULT
	 * LATITUDE
	 *
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param int $USER_ID
	 * @param string $LANGUAGE
	 *
	 * @return <string>
	 */
	public function GET_SSAS_RELATIONSHIPS( $SERVER, $DATABASE, $CUBE, $USER_ID, $LANGUAGE)
	{
		// Exemplo: Exec Get_SSAS_RelationShips '192.168.1.4','GSK - PMB','GSK - PMB',0,'ENG'
		$query = <<<EOF
					EXEC Get_SSAS_Relationships '{$SERVER}',
												'{$DATABASE}',
												'{$CUBE}',
												{$USER_ID},
												'{$LANGUAGE}'
EOF;
		return $query;
	}
	
	/**
	 * Retorna as Medidas (Fatos + Calculos) de cada Cubo
	 *
	 * WARNING: Separar como DISTINCT, deve se utilizar MEASURE_DISPLAY_FOLDERS apenas para montar a tela
	 * 
	 * Valores Retornados:
	 * MEASURE_SOURCE
	 * MEASURE_NAME
	 * MEASURE_UNIQUE_NAME
	 * DATA_TYPE
	 * NUMERIC_PRECISION
	 * NUMERIC_SCALE
	 * MEASURE_UNITS
	 * DESCRIPTION
	 * MEASURE_DISPLAY_FOLDER
	 * DEFAULT_FORMAT_STRING
	 *
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param int $USER_ID
	 * @param string $LANGUAGE
	 *
	 * @return <string>
	 */
	public function GET_SSAS_MEASURES( $SERVER, $DATABASE, $CUBE, $USER_ID, $LANGUAGE)
	{
		// Exemplo: EXEC Get_SSAS_Measures '192.168.1.4','GSK - PMB','GSK - PMB',0,'ENG'
		$query = <<<EOF
					EXEC Get_SSAS_Measures	'{$SERVER}',
											'{$DATABASE}',
											'{$CUBE}',
											{$USER_ID},
											'{$LANGUAGE}'
EOF;
		return $query;
	}
	
}