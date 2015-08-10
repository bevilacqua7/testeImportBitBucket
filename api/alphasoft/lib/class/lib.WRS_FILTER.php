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

includeQUERY('WRS_FILTER');

class WRS_FILTER  extends WRS_BASE
{
	
	/**
	 * Contem as querys dos filtros
	 * @var QUERY_FILTER
	 */
	private $_query		=	 NULL;
	
	public function __construct()
	{
		$this->_query	=	 new QUERY_FILTER();
	}
	
	
	/**
	 * Contem todas as informações da data do request
	 * @var array
	 */
	private $data_request	=	 array();
	
	public function getDataRequest()
	{
		return $this->data_request;
	}
	
	
	public function setDataRequest($data)
	{
		$this->data_request	=	$data;
	}
	
	public function run()
	{
		WRS_TRACE('run()', __LINE__, __FILE__);
		
		header('Content-Type: application/json');
		$allCubes		=	WRS::GET_SSAS_USER();
		$cube_info		=	$allCubes[fwrs_request('CUBE_POS_SESSION')];
		$json			=	fwrs_request('json');
		
		//Quando for multiplo cubo
		if(!empty($json)){
			$cube_info	=	 json_decode(base64_decode($json),true);
		}
		
		$cube_id		=	fwrs_request('CUBE_ID');
		
		/*
		 * Padrão para a devolução de informações
		 */
		
		$this->setDataRequest($_REQUEST);
		
		$_data			=	array();
		$_data['data']	=	$this->getDataRequest();
		$_data['html']	=	NULL;
		
		if(empty($cube_id) || empty($cube_info))
		{
			$_data['html']	=	fwrs_error(LNG('ERROR_CUBO_NOT_FOUND'));
			echo  json_encode($_data,true);
			WRS_TRACE('END run com erro não foi possível localizar o ID do CUBO', __LINE__, __FILE__);		
			exit();	
		
		}
		
		switch(fwrs_request('event'))
		{
			case 'filter_select_info' : {
												$_data['html'] = $this->filter_select_info($cube_id,$cube_info);
										}
			break;
		}

		$_data['data']	=	$this->getDataRequest();	
		
		echo  json_encode($_data,true);
		
		WRS_TRACE('END run()', __LINE__, __FILE__);		
	}
	
	
	private function filter_select_info($cube_id,$cube_info)
	{
		$measure_info			=	WRS::get_FIRST_MEASURE_CUBE($cube_id);
		$first_measure			=	$measure_info['MEASURE_UNIQUE_NAME'];		
		$data					=	$this->getDataRequest();

		$RELATIONSHIP_SOURCE	=	fwrs_request('RELATIONSHIP_SOURCE'); 
		$DIMENSION_NAME			=	fwrs_request('DIMENSION_NAME');
		$LEVEL_FULL				=	fwrs_request('LEVEL_FULL'); 
		$LEVEL_NAME 			=	fwrs_request('LEVEL_NAME');
		$LEVEL_UP 				=	fwrs_request('LEVEL_UP');
		$LEVEL_DOWN 			=	fwrs_request('LEVEL_DOWN');
		$LEVEL_DRILL 			=	fwrs_request('LEVEL_DRILL');
		$LEVEL_DEFAULT 			=	fwrs_request('LEVEL_DEFAULT');
		$LATITUDE 				=	fwrs_request('LATITUDE');
		$CUBE_ID 				=	fwrs_request('CUBE_ID');
		$CUBE_POS_SESSION 		=	fwrs_request('CUBE_POS_SESSION');
		$id 					=	fwrs_request('id');
		$index_data 			=	fwrs_request('index_data');
		$FILTER_REQUEST			=	fwrs_request('FILTER');
		$FILTER_UP				=	fwrs_request('FILTER_UP');
		
		/*
		 * Identifica se o tipo de campo é checkBox ou Radio simples
		 */
		$atributo_simples_composto			=	 fwrs_request('atributo');
		$atributo_simples_composto			=	 $atributo_simples_composto=='simples' ? false : true;

		$PG_CURRENT			=	fwrs_request('PG_CURRENT');
		$PG_CURRENT			=	empty($PG_CURRENT) ? 0 : $PG_CURRENT;
		/*
		if(!empty($FILTER_UP))
		{
			$FILTER_UP	=	explode(',', $FILTER_UP);
			$FILTER_UP	=	implode(",",$FILTER_UP);
		}
		*/
		
		$LIMIT_PAGE		=	11;
		$PAGE_ROWS		=	0;
		
		//Conexão
		$SERVER			=	$cube_info['SERVER_ID'];
		$DATABASE		=	$cube_info['DATABASE_ID'];
		$CUBE			=	$cube_info['CUBE_ID'];
		
		//Pegando o que vier do Inpute de Pesquisa
		$LIKE			=	 fwrs_request('LIKE');
		
		//Precisa fazer a regra da primeira measure
		$MEASURE	=	NULL;
		
		$ATTRIBUTE	=	NULL;
		
		$START		=	$PG_CURRENT;
		$END		=	$LIMIT_PAGE;
		
		$START	=	$START*($LIMIT_PAGE-1);
			
		//Aplicando a regra para a MEasure		
		if($this->is_measure($FILTER_UP, $DIMENSION_NAME))
		{
			$MEASURE	=	$first_measure; //A measure é apenas quando o level mane da seleção atual é diferente dos demais
			/*
			 * TODO: Verificar regra
			 */
			$END		=	$START+$LIMIT_PAGE;
		}else{
			//$END	=	$START+$LIMIT_PAGE;
		}
		
		
		if(!empty($LIKE))
		{
			$LIKE	=	 '%'.$LIKE.'%';
		}
		
		$ATTRIBUTE	=	 $LEVEL_FULL;
		
		$query	=	$this->_query->GET_SSAS_MEMBERS($SERVER, $DATABASE, $CUBE, $ATTRIBUTE, $START, $END, $FILTER_UP, $LIKE, $MEASURE);
		$query	=	 $this->query($query);
		
		
		$BUTON_CALL_BACK	=	NULL;
		
		$PAGE_ROWS			=	$this->num_rows($query);
		
		$table_body			=	NULL;
		$BTN_ERASE			=	NULL;
		
		
		$body	=	array();
		$_body	=	array();
		
		$input			=	'<input type="checkbox" class="btn_event_filtro_checkbox"  index-data="'.$index_data.'">';
		$input_type		=	'checkbox';
		
		if(!$atributo_simples_composto) 
		{
			$input		=	NULL;
			$input_type	=	'radio';
		}
		
		$body[]	=	$input;
		$body[]	=	NULL;
		
	 
		

		if(!$PAGE_ROWS)
			{
				return fwrs_warning(LNG('FILTER_NOT_ROWS'));
			}
		
		$table_body.= $this->table_body($body,NULL,'header_filtro');
			
		$FILTER_ARRAY		=	explode(',',$FILTER_REQUEST);
		$count				=	0;
		
		
		$force_select_first	=	 false;
		/*
		 * Verificando se o filtro for simples e não existir uma seleção 
		 * Então eu insiro o primeiro resultado como já selecionado
		 */
		if(empty($FILTER_REQUEST) && $input_type	==	'radio')
		{
			$force_select_first	=	true;	
		}
					
					
		while($rows =  $this->fetch_array($query))
		{
			$body	=	 array();
			$value	=	$LEVEL_FULL.'.['.$rows[$LEVEL_NAME].']';
			
			$count++;
			if($LIMIT_PAGE==$count) continue;
			
			$body[]	=	'<input type="'.$input_type.'" name="'.$LEVEL_FULL.'" class="wrs_input_filter_single" index-data="'.$index_data.'"  '.fwrs_checkbox($FILTER_ARRAY, $value).' value="'.$value.'">';
			$body[]	=	$rows[$LEVEL_NAME];
			$table_body.= $this->table_body($body,"text_original='".$rows[$LEVEL_NAME]."'",NULL,NULL,array('pws_click_triger_single','pws_click_triger_single pws_filter_text') );
		}
		
		
		$PAGINATION_PAGE			=	LNG('PAGINATION_PAGE');
		$PAGINATION_PAGE_INSIDE		=	LNG('PAGINATION_PAGE_INSIDE');
		
		$PG_CURRENT_START				=	$PG_CURRENT*($LIMIT_PAGE-1);
		$pg_END							=	$PG_CURRENT_START+($LIMIT_PAGE-1);
		
		$pg_END		=	$PG_CURRENT_START+($LIMIT_PAGE==$count ? $count-1 : $count );
		$PG_CURRENT_START+=1;
		
		$_body[]	=	<<<HTML_ENTITIES
						<div class="">
					  <div class="">
					    <div class="pagination_filter" >
					      <button class="navbar-left btn btn_event_filtro_back" type="back" index-data="{$index_data}"><i class="fa fa-chevron-left"></i></button>
					      <button class="btn btn-link" disabled="disabled"> {$PG_CURRENT_START} {$PAGINATION_PAGE_INSIDE} {$pg_END}</button>
					      <button class="navbar-right btn btn_event_filtro_next" type="next" index-data="{$index_data}"><i class="fa fa-chevron-right"></i></button>
					    </div>
					  </div>
					</div>
HTML_ENTITIES;

		$table_body.= $this->table_body($_body,'colspan="2"','header_filtro');
		
		
		$data['PG_CURRENT']			=	$PG_CURRENT;	
		$data['PGNEXT_DISABLE']		=	false;
		$data['PGBACK_DISABLE']		=	false;		
		$data['FORCE_ONLY_FIRST_CHECKBOX']		=	$force_select_first;
		
	
		if($count!=$LIMIT_PAGE)
		{
			$data['PGNEXT_DISABLE']	=	true;
		}
		
		
		if($PG_CURRENT==0)
		{
			$data['PGBACK_DISABLE']	=	true;
		}

		
		$html	=	 $this->table_show(NULL, $table_body);
		
		$this->setDataRequest($data);
		
		return $html.fwrs_javascript($js);
	}
	
	
	
	 

	/**
	 * 
	 * Verificanso se na dimension UP existe informações difente para aplicar a paginação
	 * 
	 * @param Array $filter_up
	 * @param string $dimension_name
	 */ 
	private function is_measure($filter_up,$dimension_name)
	{
		if(empty($filter_up)) return false;
		
		$explode	=	 explode('}',str_replace('{', '', $filter_up));
		
		foreach($explode as $value)
		{
			$filter		=	 explode(',',$value);
			foreach($filter as $dimension_value)
			{
				if(empty($dimension_value)) continue;
				
					$value_compare	=	 explode(']',str_replace('[', '', $dimension_value));
					$value_compare	=	$value_compare[0];
					
					if($value_compare!=$dimension_name) return true;
			}
		}
		
		return false;
	}
	
	
	
	
	
	/**
	 * Retorna os Filtros que o ID retorna
	 * 
	 * @param int $FILTER_ID
	 * @return null|array
	 */
	public function getFilters($FILTER_ID)
	{
		WRS_TRACE('getFilters()', __LINE__, __FILE__);
		
		$query 		=	$this->_query->FILTER_REPORT($FILTER_ID);
		$query		=	$this->query($query);
		$filters_tmp=	array();
		$filters	=	NULL;
		
		if($this->num_rows($query))
		{
			$filters	=	array();
			while($rows	=	 $this->fetch_array($query))
			{
				$filters_tmp	=	$rows;
				
				$filters_tmp['FILTER_VALUE']	=	 explode(TAG_QUEBRA_VIR, $rows['FILTER_VALUE']);
				
				$filters[]		=	$filters_tmp;
			}
		}
		
		WRS_TRACE('END getFilters()', __LINE__, __FILE__);
		
		return $filters;
	}

	
	
	
	
	
	
	/**
	 * 
	 * Retorna o Array das Abas de Auto Load
	 * 
	 * @param string $DATABASE_ID
	 * @param string $CUBE_ID
	 * @return array
	 */
	public function getAbasAutoLoad($DATABASE_ID, $CUBE_ID)
	{		
		WRS_TRACE('getAbasAutoLoad()', __LINE__, __FILE__);
		
		$query			=	 $this->_query->REPORT_AUTO_LOAD($DATABASE_ID, $CUBE_ID);

		$query			=	 $this->query($query);
		$relatorios		=	array();
		$relatorio_tmp	=	array();
		
		if($this->num_rows($query))
		{
				while($rows =  $this->fetch_array($query))
				{
					$relatorio_tmp					=	$rows;
					
					//Conversões
					$relatorio_tmp['REPORT_FLAG']			=	 $this->convertReportFlag($relatorio_tmp['REPORT_FLAG']);
					$relatorio_tmp['REPORT_FILTER']			=	 $this->convertStringToArray($relatorio_tmp['REPORT_FILTER']);
					$relatorio_tmp['LAYOUT_ROWS']			=	 $this->convertStringToArray($relatorio_tmp['LAYOUT_ROWS']);
					$relatorio_tmp['LAYOUT_COLUMNS']		=	 $this->convertStringToArray($relatorio_tmp['LAYOUT_COLUMNS']);
					$relatorio_tmp['LAYOUT_MEASURES']		=	 $this->convertStringToArray($relatorio_tmp['LAYOUT_MEASURES']);
					$relatorio_tmp['LAYOUT_FILTERS']		=	 $this->convertStringToArray($relatorio_tmp['LAYOUT_FILTERS']);
					$relatorio_tmp['FILTER_FILTERS_ID']		=	 $this->convertStringToArray($relatorio_tmp['FILTER_FILTERS_ID']);
					$relatorio_tmp['FILTER_FILTERS_DESC']	=	 $this->convertStringToArray($relatorio_tmp['FILTER_FILTERS_DESC']);	
					
					//gerando o temporário
					$relatorios[]	=	$relatorio_tmp;
				}
			
		}else{
			WRS_DEBUG_QUERY('getAbasAutoLoad Não tem resultados');
		}
		
		
		WRS_TRACE('END getAbasAutoLoad()', __LINE__, __FILE__);		
		return $relatorios;
	}
	
	
	
	
	
	
	
	/**
	 * 
	 * Faz a conversão do String para o array 
	 * 
	 * Padrão que vem da BAse 
	 * OH=0|T=0|OC=5|GR=|P=|L=|CE=0|QL=25
	 * 
	 * 
	 * 
	 * @param string $reportFlag
	 * @return array:NULL
	 */
	private function convertReportFlag($reportFlag)
	{
		$explode		=	 explode('|',$reportFlag);
		$report_array	=	 array();

		foreach($explode as $value)
		{
			$report_tmp	=	 explode('=', $value);			
			$report_array[$report_tmp[0]] =  isset($report_tmp[1]) ? $report_tmp[1] : NULL;
		}
		
		return $report_array;
	}
	
	
	
	
	
	
	/**
	 * faz a conversão das quebras do banco quando vem com virgula
	 * @param string $string
	 * @return NULL|array
	 */
	private function convertStringToArray($string)
	{
		if(empty($string)) return NULL;
				
		return explode(',', $string);
	}
	
	 
}

?>