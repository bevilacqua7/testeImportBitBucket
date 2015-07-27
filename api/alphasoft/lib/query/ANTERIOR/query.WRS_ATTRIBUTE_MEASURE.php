<?php

/**
 * Contem as querys para a verificação da conexão do usuário
 * @author msdantas
 *
 */

class QUERY_ATTRIBUTE_MEASURE
{

	/**
	 * Verificanso se é multiplo cubo
	 * 
	 * WARNING: Verificando se o Database existe mais de 1(UM) Cubo
	 * Caso retorne mais de um resultado é multiplo cubo
	 * 
	 * @param INT $DATABASE_ID
	 * @param INT $USER_ID
	 * @return string
	 */
	public function MULTIPLE_CUBE($DATABASE_ID,$USER_ID)
	{
		$query	=	<<<EOF
					SELECT  *
					FROM 
						ATT_WRS_CUBE c, REL_WRS_CUBE_USER cu
					WHERE 
						DATABASE_ID='{$DATABASE_ID}' and c.CUBE_ID=cu.CUBE_ID and USER_ID='{$USER_ID}' order by CUBE_DESC
EOF;
		
		return $query;
		
	}
	
	
	
	/**
	 * 
	 * Retornando os atributos de um cubo 
	 * 
	 * Para separar como DISTINCT usa-se DIMENSION_NAME apenas para montar a tela
	 *
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param int $USER_ID
	 * @param string $LANGUAGE
	 * @return string
	 */
	public function GET_SSAS_RELATIONSHIPS($SERVER,$USER,$PWD,$DATABASE,$CUBE,$USER_ID,$LANGUAGE)
	{
	
		$query	=	<<<EOF
							EXEC dbo.Get_SSAS_Relationships '{$SERVER}',
															'{$USER}',
															'{$PWD}',
															'{$DATABASE}',
															'{$CUBE}',
															{$USER_ID},
															'{$LANGUAGE}'
EOF;
		return $query;
	}
	
	
	/**
	 * 
	 * Verifica quando o cubo foi atualizado
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @return string
	 */
	public function CUBE_SSAS_UPDATE($SERVER,$USER,$PWD,$DATABASE,$CUBE)
	{
		$query = <<<EOF
					DECLARE @CUBE_UPDATE VARCHAR(MAX)
						EXEC Get_SSAS_CubeUpdate '{$SERVER}','{$USER}','{$PWD}','{$DATABASE}','{$CUBE}',@CUBE_UPDATE OUTPUT 
					SELECT @CUBE_UPDATE AS CUBE_UPDATE
EOF;

		return $query;
	}
	
	
	/**
	 * 
	 * Retorna as Mesasures de cada Cubo
	 * Para separar os nomes como DISTINCT  usa-se os MEASURE_DISPLAY_FOLDERS apenas para montar a tela
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param int $USER_ID
	 * @param string $LANGUAGE
	 * @return string
	 */
	public function GET_SSAS_MEASURES($SERVER,$USER,$PWD,$DATABASE,$CUBE,$USER_ID,$LANGUAGE)
	{
		$query	=	<<<EOF
							EXEC dbo.Get_SSAS_Measures '{$SERVER}',
														'{$USER}',
														'{$PWD}',
														'{$DATABASE}',
														'{$CUBE}',
														{$USER_ID},
														'{$LANGUAGE}'
EOF;
		return $query;
	}
			
	
}	