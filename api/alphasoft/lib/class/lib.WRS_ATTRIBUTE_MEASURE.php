<?php 
/**
 * Construção do WRS_ATTRIBUTE_MEASURE
 * 
 * Apenas é responsável pelas informações de Atributos e metricas do WRS_PANEL e Dashboard
 * 
 * Author: Marcelo Santos
 * Company:Alpha Soft
 */

includeClass('WRS_BASE');
includeQUERY('WRS_ATTRIBUTE_MEASURE');
class WRS_ATTRIBUTE_MEASURE  extends WRS_BASE
{
	
	/**
	 * Querys do ATTRIBUTE_MEASURE
	 * @var QUERY_ATTRIBUTE_MEASURE
	 */
	private $_query		=	 NULL;
	
	public function __construct()
	{
		$this->_query	=	 new QUERY_ATTRIBUTE_MEASURE();
	}
	
	/**
	 * Verifica se é multiplo cubo
	 * Se retornar um array é porque é multicubo
	 * 
	 * @param int $DATABASE_ID
	 * @param int $USER_ID
	 * @return string|array
	 */
	public function isMultipleCube($DATABASE_ID, $USER_ID)
	{
		WRS_TRACE('multipleCube()', __LINE__, __FILE__);		
		$query			=	$this->_query->MULTIPLE_SSAS_CUBE($DATABASE_ID, $USER_ID);
		$multiple_cube	=	NULL;
		
		$query			=	$this->query($query);
		$numRows		=	$this->num_rows($query);
		if($numRows>1)
		{
			$multiple_cube	=	array();
			while ($rows =  $this->fetch_array($query))
			{
				$multiple_cube[]	=	 $rows;
			}
		}
		
		WRS_TRACE('END multipleCube()', __LINE__, __FILE__);
		return $multiple_cube;
	}
	
	/**
	 * Verificando quando o Cubo Foi Atualizado
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @return string
	 */
	public function check_CUBE_SSAS_UPDATE($SERVER, $DATABASE, $CUBE)
	{
		$query 		= $this->_query->CUBE_SSAS_UPDATE($SERVER, $DATABASE, $CUBE);
		$query_exe	=	 $this->query($query);
		
		if($this->num_rows($query_exe))
		{
			$rows	=	 $this->fetch_array($query_exe);
			
			return $rows['CUBE_UPDATE'];			
		}
		
		return NULL;
	}
	
	
	/**
	 * 
	 * Retorna os Atributos  do Cubo selecionado
	 * 
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @return Ambigous <multitype:multitype: , sqlsrv_fetch_array>
	 */
	public function getAtributos($SERVER, $DATABASE, $CUBE)
	{
			WRS_TRACE('getAtributos()', __LINE__, __FILE__);
			
			$LANGUAGE	=	 WRS::USER_LANGUAGE();
		
			$query 		=	 $this->_query->GET_SSAS_RELATIONSHIPS($SERVER, $DATABASE, $CUBE, 0, $LANGUAGE);
			$query		=	 $this->query($query);
			$attr_tmp	=	array();
			
			if($this->num_rows($query))
			{
				while ($rows	=	 $this->fetch_array($query))
				{
					$_rows_param	=	$rows;
					
					//Se a dimensão ainda não existir cria-se a value
					if(!isset($attr_tmp[$_rows_param['DIMENSION_NAME']])) $attr_tmp[$_rows_param['DIMENSION_NAME']]=array();
					
					//Repassando o parametro de usuário e senha
					$_rows_param['CUBE_ID']	=	$CUBE;
					
					$attr_tmp[$_rows_param['DIMENSION_NAME']][]	=	$_rows_param;
				}
			}
			
			WRS_TRACE('END getAtributos()', __LINE__, __FILE__);
			return $attr_tmp;
	}
	
	
	/**
	 * 
	 * Devolve as Measures do Cubo selecionado
	 * @param string $SERVER
	 * @param string $USER
	 * @param string $PWD
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @param string $LANGUAGE
	 * @return array
	 */
	public function getMetricas($SERVER, $DATABASE, $CUBE)
	{
		WRS_TRACE('getMetricas()', __LINE__, __FILE__);
		
		$LANGUAGE	=	 WRS::USER_LANGUAGE();
		
		$measure_tmp	=	array();
		$query 			=	$this->_query->GET_SSAS_MEASURES($SERVER, $DATABASE, $CUBE, 0, $LANGUAGE);
		$query			=	$this->query($query);
		$first_measure	=	true;
		if($this->num_rows($query))
		{
			while ($rows = $this->fetch_array($query))
			{
				if(!isset($measure_tmp[$rows['MEASURE_DISPLAY_FOLDER']])) $measure_tmp[$rows['MEASURE_DISPLAY_FOLDER']]=array();

				if($first_measure)
				{
					WRS::set_FIRST_MEASURE_CUBE($CUBE, $rows);
					$first_measure	=	 false;
				}
				
				$measure_tmp[$rows['MEASURE_DISPLAY_FOLDER']][]	=	$rows;
				
					
			}
		}
		
		WRS_TRACE('END getMetricas()', __LINE__, __FILE__);
		
		return $measure_tmp;
	}
	
	 
}

?>