<?php

/**
 * Dashboard
 *
 * Documento Exclusivo AlphaSoft
 * @author Marcelo Santos
 *
 */

class QUERY_DASHBOARD
{

	public function CUBOS_BY_USER(){

		$query	=	"select d.DATABASE_ID,c.CUBE_ID, c.CUBE_DESC,d.DATABASE_ORDER,d.DATABASE_SERVER,d.DATABASE_USER,d.DATABASE_PWD
					from att_wrs_cube c
					inner join rel_wrs_cube_user cu
					on c.CUBE_ID = cu.CUBE_ID
					inner join att_wrs_database d
					on c.DATABASE_ID = d.DATABASE_ID
					where cu.USER_ID=".WRS::USER_ID()."
					and d.DATABASE_LINK = ''
							and d.DATABASE_STATUS =1
							and CUBE_STATUS = 1
							order by d.DATABASE_ORDER,c.CUBE_DESC";

		return $query;
	}
	
	
	/**
	 * Para auto load quando for modificado pelo usuário apenas manda o Array das  novas informações do DashBoard
	 * @param array $data
	 * @return string
	 */
	public function AUTO_LOAD_DASHBOARD($data=NULL)
	{
		$where	=	" A.DASHBOARD_AUTOLOAD='1' AND (A.USER_ID = '3' OR (A.DASHBOARD_SHARE = 1 AND A.CUSTOMER_ID = '3')) ";
		
		$sql	=	"SELECT ROW_NUMBER() OVER (   order by DASHBOARD_DESC asc ) ROW_ID,A.*
									FROM (SELECT DISTINCT A.DASHBOARD_ID, 
														  A.DASHBOARD_DESC, 
														  A.DASHBOARD_SHARE,
														  A.DASHBOARD_AUTOLOAD,
														  A.DASHBOARD_LAYOUT,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,DA.DATABASE_STATUS)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																	  INNER JOIN ATT_WRS_DATABASE DA
																			ON D.DATABASE_ID = DA.DATABASE_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS DATABASES_STATUS,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,E.CUBE_STATUS)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																	  INNER JOIN ATT_WRS_CUBE E
																			ON D.CUBE_ID = E.CUBE_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS CUBES_STATUS,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,E.CUBE_ID)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																	  INNER JOIN ATT_WRS_CUBE E
																			ON D.CUBE_ID = E.CUBE_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS CUBES_ID,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,E.CUBE_DESC)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																	  INNER JOIN ATT_WRS_CUBE E
																			ON D.CUBE_ID = E.CUBE_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS CUBES_DESC,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,C.QUADRANT)
														  FROM REL_WRS_DASHBOARD_REPORT C
															  INNER JOIN ATT_WRS_REPORT D
																	ON C.REPORT_ID = D.REPORT_ID
														  WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
														  FOR XML PATH('')),1,1,'') AS QUADRANTE,
														  STUFF((SELECT ',' + CONVERT(VARCHAR,D.REPORT_ID)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS REPORTS_ID,
														 STUFF((SELECT ',' + CONVERT(VARCHAR,D.REPORT_DESC)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS REPORTS_DESC,
														STUFF((SELECT ',' + CONVERT(VARCHAR,D.DATABASE_ID)
																 FROM REL_WRS_DASHBOARD_REPORT C
																	  INNER JOIN ATT_WRS_REPORT D
																			ON C.REPORT_ID = D.REPORT_ID
																 WHERE A.DASHBOARD_ID = C.DASHBOARD_ID
																 FOR XML PATH('')),1,1,'') AS DATABASE_ID
										  FROM ATT_WRS_DASHBOARD A
											   LEFT JOIN ATT_WRS_FILTER B
													 ON A.DASHBOARD_ID = B.DASHBOARD_ID
										  WHERE {WHERE}
								  ) A";
		
		//Apenas substitui quando for configurado pelo usuário sem salvar
		if(is_array($data)){
			$where =  " A.DASHBOARD_ID in ( ".implode(',', $data)." ) ";
		}
		
		$sql	=	 str_replace('{WHERE}', $where, $sql);
		
		return $sql;
		
		
	}
	
	
	public function FILTRO($dashboard_id)
	{
		$query	=	"select * from att_wrs_filter where dashboard_id in (".$dashboard_id.")";
		
		return $query;
	}
	
	
	public function Get_SSAS_Relationships(	$SERVER,
											$USER,
											$PWD,
											$DATABASE,
											$CUBE,
											$USER_ID=NULL
										  ) 
	{
		//DATABASE_SERVER,DATABASE_USER,DATABASE_PWD,DATABASE_ID,CUBE_ID
		$query	=	"EXEC Get_SSAS_Relationships '".$SERVER."','".$USER."','".$PWD."','".$DATABASE."','".$CUBE."'".(!empty($USER_ID) ? ",".$USER_ID : NULL);
		return $query;
	}
	
	
	
	public function Get_SSAS_Measures($SERVER,$USER,$PWD,$DATABASE,$CUBE,$USER_ID=NULL)
	{
		$sql	=	"EXEC Get_SSAS_Measures '".$SERVER."','".$USER."','".$PWD."','".$DATABASE."','".$CUBE."'".($USER_ID ? ",".$USER_ID : "");
		return $sql;
	}
	
	
	
	public function Get_SSAS_Attribute ($SERVER,
										$USER,
										$PWD,
										$DATABASE,
										$CUBE,
										$ATTRIBUTE,
										$START,
										$END,
										$FILTER,
										$LIKE,
										$MEASURE
										)
	{
		$_LIKE	=	(empty($LIKE) ? '' : '%'.$LIKE.'%');
		$sql	=	"EXEC Get_SSAS_Attribute '".$SERVER."','".$USER."','".$PWD."','$DATABASE','$CUBE','".$ATTRIBUTE."',".$START.",".$END.",'".$FILTER."','".$_LIKE."','".$MEASURE."'";		
		return $sql;
	}
	
	
	/**
	 * retorna informações para montar cada grid no Dashboard
	 * @param int $report_id
	 * @return string
	 */
	public function info_grid($report_id)
	{
			/*
			 * 	
				Descrição REPORT_FLAG
				
				OH - Coluna Invertida 
				T  - Totais
				OC - Colulna ordenada
				GR - Tipo de Gráfico
				P  - Se o gráfico e polar 
				L  - Se o gráfico tem Legenda
				CE - Colunas escondidadas
				QL - Quantidade de Linhas
			*/
		$sql	=	"select l.LAYOUT_ROWS,l.LAYOUT_COLUMNS,l.LAYOUT_MEASURES, r.REPORT_ID,r.DATABASE_ID, r.CUBE_ID, r.REPORT_FLAG, r.REPORT_VIEW
			  from rel_wrs_report_layout rl, att_wrs_layout l, att_wrs_report r
			  where rl.report_id='".$report_id."' and rl.layout_id=l.layout_id and rl.layout_master='1' and rl.report_id=r.report_id";
	
		return $sql;
	}
		

	
	/**
	 *  Apenas para trazer o total de linhas que pode ser utilizado no sistema
	 *  
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
	 * @param string $COUNT_TYPE
	 * @return string
	 */
	public function Get_SSAS_Records($SERVER,$USER,$PWD,$DATABASE,$CUBE,$ROWS,$COLUMNS,$MEASURES,$FILTERS,$ALL_ROWS,$ALL_COLS=0,$COUNT_TYPE='ROWS')
	{
		$sql = "EXEC Get_SSAS_Records 
										'".$SERVER."',
										'".$USER."',
										'".$PWD."',
										'".$DATABASE."',
								  		'".$CUBE."',
							       		'".$ROWS."',
							       		'".$COLUMNS."',
							       		'".$MEASURES."',
							       		'".$FILTERS."',
							       		".$ALL_ROWS.",
							       		".$ALL_COLS.",
								   		'".$COUNT_TYPE."'";
		return $sql; 
	
	}
	
	
	public function Create_SSAS_Query(
										$SERVER,
										$USER,
										$PWD,
										$DATABASE,
										$CUBE,
										$USER_CODE,
										$ROWS,
										$COLUMNS,
										$MEASURES,
										$FILTERS,
										$ALL_ROWS=0,
										$ALL_COLS=0,
										$COLS_ORDER=0
								)
	{
			$sql	=	"DECLARE @TABLE_NAME VARCHAR(MAX)
	        DECLARE @SQL_STATEMENT VARCHAR(MAX)
			EXEC Create_SSAS_Query '".$SERVER."','".$USER."','".$PWD."','".$DATABASE."','".$CUBE."','".$USER_CODE."',
							       '".$ROWS."',
							       '".$COLUMNS."',
							       '".$MEASURES."',
							       '".$FILTERS."',
							       ".$ALL_ROWS.",".$ALL_COLS.",
								   ".$COLS_ORDER.",@TABLE_NAME OUTPUT
			SET @SQL_STATEMENT = N'SELECT '+CHAR(39)+@TABLE_NAME+CHAR(39)+' AS TABELA'
			EXEC (@SQL_STATEMENT)";
			
			return $sql;

	}
	
	/**
	 * 
	 * FILTER_ATTRIBUTE
	 * 
	 * @param unknown $id_dashboard
	 * @return string
	 */
	public function filtros($id_dashboard)
	{
			$sql	=	'	select FILTER_ATTRIBUTE from att_wrs_filter where dashboard_id in ('.$id_dashboard.')';
			return $sql;
	}
	
	/**
	 * LAYOUT_ID
	 * LAYOUT_FILTERS
	 * @param unknown $reports_id
	 * @return string
	 */
	public function filtros_compartilhados($reports_id)
	{
		$sql	=	"select l.LAYOUT_ID,l.LAYOUT_FILTERS from rel_wrs_report_layout rl, att_wrs_layout l
						where rl.report_id in (".$reports_id.") and rl.layout_id=l.layout_id and rl.layout_master='1'";
		
		return $sql;
	}
	
	
	public function reporte_filter($report_id)
	{
		 $sql	=	"select FILTER_ATTRIBUTE, FILTER_VALUE  from att_wrs_filter  where report_id = '".$report_id."'";
		 return $sql;
	}
}	