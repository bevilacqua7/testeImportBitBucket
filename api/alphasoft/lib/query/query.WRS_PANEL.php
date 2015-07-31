<?php

/**
 * Contem Querys para a Construção das Grids
 * @author msdantas
 */

class QUERY_PANEL
{
	
	/**
	 * 
	 * Cria Job para obter a tabela temporária
	 *
	 * WARNING: Após criação do Job deve-se obter o campo QUERY_ID para buscar o Status do mesmo 
	 *
	 * Valores Retornados:
	 * QUERY_ID
	 * QUERY_TABLE
	 * JOB_STATUS
	 *
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $ROWS
	 * @param string $COLUMNS
	 * @param string $MEASURES
	 * @param string $FILTERS
	 * @param int $ALL_ROWS
	 * @param int $ALL_COLS
	 * @param int $COLS_ORDER
	 * @param int $TIMEOUT
	 * @param int $SCHEDULE
	 *
	 * @return <recordset>
	 */
	 public function CREATE_SSAS_JOB( $SERVER, $DATABASE, $CUBE, $ROWS, $COLUMNS, $MEASURES, $FILTERS, $ALL_ROWS, $ALL_COLS, $COLS_ORDER, $TIMEOUT, $SCHEDULE )
	 {
	 	// Exemplo: EXEC Create_SSAS_Job 'mfacioli',
        //               '[192.168.1.3]','[GSK - DDD]','[GSK - DDD]',
        //               '[FORCA DE VENDAS].[UNIDADE],[FORCA DE VENDAS].[REGIONAL],[FORCA DE VENDAS].[DISTRITAL],[FORCA DE VENDAS].[SETOR],[PRODUTO].[MARCA]',
        //               '[PERIODO].[ANO],[PERIODO].[MES]',
        //               '[Measures].[UNIDADE],[Measures].[REAL]',
        //               '{[MERCADO].[MERCADO].[D06-BACTROBAN]},{[PERIODO].[ANO].[2013]},{[VISITADO].[VISITADO].[SIM]}'
        //               1,1,0,0,@SCHEDULE
	 	$USER_CODE = WRS::USER_CODE();
	 	$query = <<<EOF
					EXEC Create_SSAS_Job	'{$USER_CODE}',
											'{$SERVER}',
											'{$DATABASE}',
											'{$CUBE}',
											'{$ROWS}',
											'{$COLUMNS}',
											'{$MEASURES}',
											'{$FILTERS}',
											{$ALL_ROWS},
											{$ALL_COLS},
											{$COLS_ORDER},
											{$TIMEOUT},
											'{$SCHEDULE}'
EOF;
	 	return $query;
	 }
	
	/**
	 * Verifica Status do Job
	 *
	 * Status Jobs: 1 - Query Created
	 *              2 - Query Waiting
	 *              3 - Query Running
	 *              4 - Query Finish
	 *              5 - Query Canceled
	 *             -1 - Query Timeout
	 *             -2 - Query Start Error
	 *             -3 - Query Execute Error
	 *
	 * Valores Retornados:
	 * QUERY_TABLE
	 * QUERY_ERROR
	 * SCHEDULE	 
	 * TIME_START	 
	 * TIME_FINISH	 
	 * TIME_TOTAL	 
	 * USER_CODE
	 * JOB_REQUEST	 
	 * JOB_MESSAGE	 
	 * JOB_STATUS
	 *
	 * @param string $QUERY_ID
	 *
	 * @return <recordset>
	 */
	public static function GET_SSAS_JOB( $QUERY_ID )
	{
		// Exemplo: EXEC Get_SSAS_Jobs '779B4C0951462493DC0EBF1FDD6A2F85' 
		$query = <<<EOF
					EXEC Get_SSAS_Jobs '{$QUERY_ID}'
EOF;
		return $query;
	}		
	
	public static function STOP_SSAS_JOB( $QUERY_ID )
	{
		// Exemplo: EXEC Stop_SSAS_Job '779B4C0951462493DC0EBF1FDD6A2F85' 
		$query = <<<EOF
					EXEC Stop_SSAS_Job '{$QUERY_ID}'
EOF;
		return $query;
	}		

	/**
	 * Clona o resultado de uma Consulta para uma temporária
	 * 
	 * @param string $TABLE_NAME
	 * @param int $LINE
	 * @param int $MEASURE
	 * @param string $ORDER
	 * @param string $FILTERS
	 *
	 * @return <string>
	 */
	public function COPY_SSAS_TABLE( $QUERY_ID )
	{
		// Exemplo: EXEC Copy_SSAS_Table 'mfacioli','18BDBC3648FE450D91BE799CE5758D32'
	 	$USER_CODE = WRS::USER_CODE();
		$query = <<<EOF
					EXEC Copy_SSAS_Table 	'{$USER_CODE}',
											'{$QUERY_ID}'
EOF;
		return $query;
	}

	
	/**
	 * Obtem a Quantidade de Registros da Consulta 
	 * 
	 * o $DRILL_LINE é para um execução temporária para a consulta do dril
	 * @param string $_QUERY_TABLE
	 * @param int $DRILL_LINE
	 * @return string
	 */
	public function SELECT_FAT_SSAS_TABLES($_QUERY_TABLE,$DRILL_LINE=0)
	{
		$FAT_SSAS_TABLES	=	<<<EOF
		select TOTAL_ROWS from FAT_SSAS_TABLES where QUERY_TABLE = '{$_QUERY_TABLE}'
EOF;
		
		$SQL_DRILL_LINE			=	<<<EOF
			SELECT COUNT(*) AS TOTAL_ROWS FROM {$_QUERY_TABLE}
EOF;
		/*
		 * TODO: Temporário
		 */
		if($DRILL_LINE==1) return $SQL_DRILL_LINE; 
		
		return $FAT_SSAS_TABLES;	
	}
	/**
	 * Ordena a tabela temporária conforme parametro passado
	 * 
	 * WARNING: Quando passa por essa função acrescenta-se o S no final do nome da tabela temporária
	 * 
	 * @param string $TABLE_NAME
	 * @param int $LINE
	 * @param int $MEASURE
	 * @param string $ORDER
	 * @param string $FILTERS
	 *
	 * @return <string>
	 */
	public function SORT_SSAS_TABLE( $TABLE_NAME, $LINE, $MEASURE, $ORDER='ASC', $FILTERS='' )
	{
		// Exemplo: EXEC Sort_SSAS_Table '_MDX_18BDBC3648FE450D91BE799CE5758D32_F',5,'6','DESC',''
		$query = <<<EOF
					EXEC Sort_SSAS_Table 	'{$TABLE_NAME}',
											{$LINE},
											'{$MEASURE}',
											'{$ORDER}',
											'{$FILTERS}'
EOF;
		return $query;
	}
	
	/**
	 * Filtra a tabela temporária conforme parametro passado
	 * 
	 * WARNING Quando passa por essa função acrescenta-se o F no final do nome da tabela temporária
	 * 
	 * @param string $TABLE_NAME
	 * @param int $LINE
	 * @param string $ATTRIBUTE
	 * @param string $FILTER
	 *
	 * @return <string>
	 */
	public function FILTER_SSAS_TABLE( $TABLE_NAME, $LINE, $ATTRIBUTE, $FILTER='' )
	{
		// Exemplo: EXEC Filter_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_F',5,
		//               '[FORCA DE VENDAS].[DISTRITAL].[DISTRITAL].[MEMBER_CAPTION]',
		//               '112200 - OSVALDO LUIS CARDOZO DE ANDRADE'
		$query = <<<EOF
					EXEC Filter_SSAS_Table 	'{$TABLE_NAME}',
											{$LINE},
											'{$ATTRIBUTE}',
											'{$FILTER}'
EOF;
		return $query;
	}

	/**
	 * Expande tabela temporária conforme parametro passado
	 * 
	 * WARNING: Quando passa por essa função acrescenta-se o D no final do nome da tabela temporária
	 * 
	 * @param string $TABLE_NAME
	 * @param string $FILTER
	 * @param int $LINE
	 *
	 * @return <string>
	 */
	public function DRILL_SSAS_TABLE( $TABLE_NAME, $FILTER,$LINE )
	{
		// Exemplo: Exec Drill_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_F','30 - MARCAS CLASSICAS E SIMILARES{VIR}110000 - JOSE RICARDO DOREA CARVALHO{VIR}112200 - OSVALDO LUIS CARDOZO DE ANDRADE',5
		//{SEP} -- Quebra de LInhas
		//{VIR} -- Nivel
		$query = <<<EOF
					EXEC Drill_SSAS_Table 	'{$TABLE_NAME}',
											'{$FILTER}',
											{$LINE}
EOF;
		return $query;
	}

	/**
	 * Obtem Registros no Formato utilizado para GRID, 
	 *
	 * WARNING: Retorno dos campos são definidos como CNNN (onde NNNN = posição do campo na Tabela)
	 * 
	 * @param string $TABLE_NAME
	 * @param int $ROW_NUMBER_START
	 * @param int $ROW_NUMBER_END
	 *
	 * @return <recordset>
	 */	
	public function SELECT_SSAS_TABLE( $TABLE_NAME, $ROW_NUMBER_START, $ROW_NUMBER_END )
	{
		// Exemplo: Exec Select_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_F' OUTPUT,50,99
		$query = <<<EOF
					EXEC Select_SSAS_Table '{$TABLE_NAME}',
											{$ROW_NUMBER_START},
											{$ROW_NUMBER_END}
EOF;
		return $query;
	}
	
	/**
	 * Obtem os Nomes dos Campos da Consulta
	 *
	 * WARNING: Cada linha chama um novo comando e obedece a regra de ordenação
	 * 
	 * @param string $TABLE_NAME
	 * @param string $ATTRIBUTE
	 * @param string $LANGUAGE
	 * @return string
	 */
	public function GET_SSAS_HEADER( $TABLE_NAME, $ATTRIBUTE, $LANGUAGE )
	{
		// Exemplo: EXEC Get_SSAS_Table '_MDX_57EBC8E1A2C64670985B79FB9A234DF2_FS','[*]','ENG'
		$query = <<<EOF
					EXEC Get_SSAS_Table '{$TABLE_NAME}',
										'{$ATTRIBUTE}',
										'{$LANGUAGE}'
EOF;
			return $query;
	}

}