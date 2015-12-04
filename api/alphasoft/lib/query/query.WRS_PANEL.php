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
	 	$LOGIN_ID = WRS::LOGIN_ID();
		$ROWS = str_replace("'","''",$ROWS);
		$COLUMNS = str_replace("'","''",$COLUMNS);
		$MEASURES = str_replace("'","''",$MEASURES);
		$FILTERS = str_replace("'","''",$FILTERS);
	 	$query = <<<EOF
					EXEC Create_SSAS_Job	'{$LOGIN_ID}',
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
	public function RECORDS_SSAS_TABLES( $_QUERY_TABLE, $DRILL_LINE=0 )
	{
		$data_unless	=	substr($_QUERY_TABLE,0,count($_QUERY_TABLE)-2);
		
		
		$FAT_SSAS_TABLES	=	<<<EOF
		select TOTAL_ROWS,TOTAL_COLUMNS from FAT_SSAS_TABLES where QUERY_TABLE = '{$_QUERY_TABLE}'
EOF;
		
		
		$SQL_DRILL_LINE			=	<<<EOF
		    select TOTAL_ROWS,TOTAL_COLUMNS
		    from (SELECT TOTAL_COLUMNS FROM FAT_SSAS_TABLES where QUERY_TABLE = '{$data_unless}') A,
			     (SELECT COUNT(*) AS TOTAL_ROWS FROM {$_QUERY_TABLE}) B
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
	 * @param int $LINE
	 * @param string $FILTER
	 * @param int $OPENROWS
	 *
	 * @return <string>
	 */
	public function DRILL_SSAS_TABLE( $TABLE_NAME, $LINE, $FILTER, $OPENROWS )
	{
		$_FILTER	=	$FILTER;
		
		//Comando enviado do JS WRSFDrillLine.js - Limpa a consulta drill
		if($_FILTER=='DRILL_LINHA_RESTAR_CONSULTA')
		{
			$_FILTER	=	"";
		}
		
		// Exemplos: Exec Drill_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_F',5,'30 - MARCAS CLASSICAS E SIMILARES(_,_)110000 - JOSE RICARDO DOREA CARVALHO(_,_)112200 - OSVALDO LUIS CARDOZO DE ANDRADE',1
		//           Exec Drill_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_F',5,'{_*_}(_,_){_*_}',1
		//(_,_) Separador de Campos
		// OPENROWS = 1 (Abre) / 0 (Fecha)
		$query = <<<EOF
					EXEC Drill_SSAS_Table 	'{$TABLE_NAME}',
											{$LINE},
											'{$_FILTER}',
											{$OPENROWS}
EOF;
		return $query;
	}

	/**
	 * Obtem Informações de Registros Abertos (DRILL) de uma Tabela Ordenada
	 * 
	 * WARNING: Quando passa por essa função acrescenta-se o I no final do nome da tabela temporária ordenada
	 * 
	 * @param string $TABLE_NAME
	 * @param int $LINE
	 *
	 * @return <string>
	 */
	public function INFO_SSAS_TABLE( $TABLE_NAME, $LINE )
	{
		// Exemplo: Exec Info_SSAS_Table '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_FS',5
		$query = <<<EOF
					EXEC Info_SSAS_Table 	'{$TABLE_NAME}',
											{$LINE}
EOF;
		return $query;
	}

	/**
	 * Obtem Registros Abertos (Drill) juntamente com as Colunas Abertas
	 *
	 * @param string $TABLE_NAME
	 * @param int $ROW_NUMBER_START
	 * @param int $ROW_NUMBER_END
	 *
	 * @return <recordset>
	 */	
	public function SELECT_SSAS_INFO( $TABLE_NAME, $ROW_NUMBER_START, $ROW_NUMBER_END )
	{
		// Exemplo: Exec Select_SSAS_Info '_MDX_692E3FEAFAC44F708FF864EC3ECA8615_FDSI' OUTPUT,51,100
		$query = <<<EOF
					EXEC Select_SSAS_Info '{$TABLE_NAME}',
											{$ROW_NUMBER_START},
											{$ROW_NUMBER_END}
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

	/**
	 * Obtem Lista de Relatorios da Base de Dados
	 * 
	 * @param int $CUSTOMER_ID
	 * @param string $USER_TYPE
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 *
	 * @return string
	 */
	public static function GET_SSAS_REPORT( $DATABASE_ID, $CUBE_ID )
	{
		// Exemplo: EXEC Get_SSAS_Reports 1,'mfacioli','','GSK - DDD',''
		$USER_CODE 			= WRS::USER_CODE();
		$USER_CUSTOMER_ID 	= WRS::CUSTOMER_ID();
		$USER_TYPE 			= WRS::INFO_SSAS_LOGIN('PERFIL_ID');
		$DATABASE_ID 		= str_replace(array('[',']'),'',$DATABASE_ID);
		$CUBE_ID 			= str_replace(array('[',']'),'',$CUBE_ID);

		$query = <<<EOF
					EXEC Get_SSAS_Reports {$USER_CUSTOMER_ID}, '{$USER_CODE}', '{$USER_TYPE}', '{$DATABASE_ID}', '{$CUBE_ID}'
EOF;
		return $query;
	}

	/**
	 * Salva Relatorios na Base de Dados
	 * 
	 * @param string $REPORT_DESC
	 * @param string $SERVER_ID
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 * @param string $ROWS
	 * @param string $COLUMNS
	 * @param string $MEASURES
	 * @param string $FILTER
	 * @param string $FILTER_VALUES
	 * @param int $ALL_ROWS
	 * @param int $ALL_COLS
	 * @param int $COLS_ORDER
	 * @param string $REPORT_OPTIONS
	 * @param string $REPORT_FORMULAS
	 * @param string $REPORT_FILTER
	 * @param string $REPORT_FLAG
	 * @param string $LAYOUT_SHARE
	 * @param string $USER_TYPE
	 * @param int $REPORT_SHARE
	 * @param int $REPORT_AUTOLOAD
	 *
	 * @return string
	 */
	public function SAVE_SSAS_REPORT( $REPORT_DESC, $SERVER_ID, $DATABASE_ID, $CUBE_ID,
                                      $ROWS, $COLUMNS, $MEASURES, $FILTERS, $FILTERS_VALUES, $ALL_ROWS, $ALL_COLS, $COLS_ORDER,
									  $REPORT_OPTIONS, $REPORT_FORMULAS, $REPORT_FILTER, $REPORT_FLAG, 
									  $LAYOUT_SHARE, $USER_TYPE, $REPORT_SHARE, $REPORT_AUTOLOAD )
	{
		// Exemplo: EXEC Save_SSAS_Report 'TESTE DE RELATORIO','mfacioli',
        //              '192.168.1.3','GSK - DDD','GSK - DDD',
        //              '[FORCA DE VENDAS].[UNIDADE],[FORCA DE VENDAS].[REGIONAL],[FORCA DE VENDAS].[DISTRITAL],[FORCA DE VENDAS].[SETOR],[PRODUTO].[MARCA]',
        //              '[PERIODO].[ANO],[PERIODO].[MES]',
        //              '[Measures].[UNIDADE],[Measures].[REAL]',
        //              '[MERCADO].[MERCADO],[PERIODO].[ANO],[VISITADO].[VISITADO],[FORCA DE VENDAS].[SETOR]',
        //              '[MERCADO].[MERCADO](_,_)[D06-BACTROBAN](_|_)[PERIODO].[ANO](_,_)[2013],[2014](_|_)[VISITADO].[VISITADO](_,_)[SIM](_|_)[FORCA DE VENDAS].[SETOR](_,_)[112220 - VINICIUS LIMA DE ALMEIDA SILVA]',
        //              1,1,0,'','','','','-123(_,_)-234(_,_)-345','ABC(_,_)CDE(_,_)XPTO',0,0
		$USER_CODE = WRS::USER_CODE();
		$query = <<<EOF
					EXEC Save_SSAS_Report 	'{$REPORT_DESC}', 
											'{$USER_CODE}', 
											'{$SERVER_ID}', 
											'{$DATABASE_ID}', 
											'{$CUBE_ID}',
											'{$ROWS}', 
											'{$COLUMNS}', 
											'{$MEASURES}', 
											'{$FILTERS}', 
											'{$FILTERS_VALUES}', 
											{$ALL_ROWS}, 
											{$ALL_COLS}, 
											'{$COLS_ORDER}',
										  	'{$REPORT_OPTIONS}', 
										  	'{$REPORT_FORMULAS}', 
										  	'{$REPORT_FILTER}', 
										  	'{$REPORT_FLAG}', 
										  	'{$LAYOUT_SHARE}', 
											'{$USER_TYPE}',
											{$REPORT_SHARE}, 
											{$REPORT_AUTOLOAD}
EOF;
		return $query;
	}
	
	/**
	 * Pegando o total de colunas
	 * 
	 * @param unknown $QUERY_ID
	 * 
	 */
	/*
	public function FAT_SSAS_QUERYS($QUERY_ID)
	{
		$query  = <<<EOF
							select TOTAL_COLUMNS from FAT_SSAS_QUERYS WHERE QUERY_ID ='{$QUERY_ID}'
EOF;
		return $query;
		
	}*/

	/**
	 * Copia Relatorios da Base de Dados
	 * 
	 * @param int $REPORT_ID
	 * @param int $CUSTOMER_ID
	 * @param string $SERVER_ID
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 * @param int $IGNORE_FLAG
	 *
	 * @return string
	 */
	public function COPY_SSAS_REPORT( $REPORT_ID, $CUSTOMER_ID, $SERVER_ID, $DATABASE_ID, $CUBE_ID, $IGNORE_FLAG )
	{
		// Exemplo: EXEC Copy_SSAS_Report 'TESTE DE RELATORIO',1,'mfacioli','192.168.1.3','GSK - DDD',1,'GSK - DDD',0
		$USER_CODE = WRS::USER_CODE();
		$query = <<<EOF
					EXEC Copy_SSAS_Report {$REPORT_ID}, {$CUSTOMER_ID}, '{$USER_CODE}', '{$SERVER_ID}', '{$DATABASE_ID}', '{$CUBE_ID}', {$IGNORE_FLAG}
EOF;
		return $query;
	}
	
	/**
	 * Remove Relatorios da Base de Dados
	 * 
	 * @param int $REPORT_ID
	 * @param int $PERFIL_ID
	 *
	 * @return string
	 */
	public function REMOVE_SSAS_REPORT( $REPORT_ID, $PERFIL_ID )
	{
		// Exemplo: EXEC Remove_SSAS_Report 4587,'mfacioli',''
		$USER_CODE = WRS::USER_CODE();
		$query = <<<EOF
					EXEC Remove_SSAS_Report {$REPORT_ID}, '{$USER_CODE}', '{$PERFIL_ID}'
EOF;
		return $query;
	}

}