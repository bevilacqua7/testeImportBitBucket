<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author msdantas
 */

class QUERY_ReportLayout
{

	/**
	 * LEITURA DE LAYOUTS
	 * 
	 * Retorna duas tabelas para poder ser feito o select 
	 *  TABLE_NAME
	 *	ERROR_MESSAGE
	 *
	 * @param unknown $CUSTOMER_ID
	 * @param unknown $USER_CODE
	 * @param unknown $DATABASE_ID
	 * @param unknown $CUBE_ID
	 * @return string
	 */
	public function Get_SSAS_Layouts($CUSTOMER_ID,$USER_CODE,$DATABASE_ID,$CUBE_ID)
	{
	
		$query	=	<<<HTML
							EXEC Get_SSAS_Layouts
													{$CUSTOMER_ID},
													'{$USER_CODE}',
													'{$DATABASE_ID}',
													'{$CUBE_ID}'
	
HTML;
		return $query;
	
	}

	/**
	 * GRAVAÇÃO DE LAYOUTS
	 * 
	 * @param unknown $LAYOUT_DESC
	 * @param unknown $LAYOUT_ALIAS
	 * @param unknown $USER_CODE
	 * @param unknown $SERVER_ID
	 * @param unknown $DATABASE_ID
	 * @param unknown $CUBE_ID
	 * @param unknown $ROWS
	 * @param unknown $COLUMNS
	 * @param unknown $MEASURES
	 * @param unknown $LAYOUT_FLAG
	 * @param unknown $LAYOUT_SHARE
	 * @return string
	 */
	public function Save_SSAS_Layout(	$LAYOUT_DESC,
										$LAYOUT_ALIAS,
										$USER_CODE,
										$SERVER_ID,
										$DATABASE_ID,
										$CUBE_ID,
										$ROWS,
										$COLUMNS,
										$MEASURES,
										$LAYOUT_FLAG,
										$LAYOUT_SHARE
			)
	{

		$query	=	<<<HTML
							EXEC Save_SSAS_Layout
													'{$LAYOUT_DESC}',
													'{$LAYOUT_ALIAS}',
													'{$USER_CODE}',
													'{$SERVER_ID}',
													'{$DATABASE_ID}',
													'{$CUBE_ID}',
													'{$ROWS}',
													'{$COLUMNS}',
													'{$MEASURES}',
													'{$LAYOUT_FLAG}',
													{$LAYOUT_SHARE}
	
HTML;
		return $query;
		
	}
	
	/**
	 * REMOÇÃO DE LAYOUTS
	 * 
	 * 
	 * @param unknown $LAYOUT_ID
	 * @param unknown $USER_CODE
	 * @param unknown $PERFIL_ID
	 */
	public function Remove_SSAS_Layout($LAYOUT_ID,$USER_CODE,$PERFIL_ID)
	{
	
		$query	=	<<<HTML
							EXEC Remove_SSAS_Layout
														{$LAYOUT_ID},
														'{$USER_CODE}',
														'{$PERFIL_ID}'
	
HTML;
														return $query;
	
	}
	
}