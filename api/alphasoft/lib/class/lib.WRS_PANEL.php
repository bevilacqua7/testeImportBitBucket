<?php 
/**
 * Construção do WRS Panel
 * 
 * Author: Marcelo Santos
 * Company:Alpha Soft
 * Date: 17/12/2014 : 17:42
 */

includeQUERY('WRS_PANEL');
includeCLASS('WRS_USER');

class WRS_PANEL  extends WRS_USER
{
	
	/**
	 * Parametros do WRS_PANEL
	 * @var array
	 */
	private $_param			=	 array();
	
	/**
	 * Posição do Cubo no Array da Sessão
	 * 
	 * @var int
	 */
	private $_cube_pos_session	=	NULL;
	
	/**
	 * Contem as querys do WRS_PANEL
	 * @var QUERY_PANEL
	 */
	private $_query			=	 NULL;
	
	/**
	 * 
	 * Parametros do Auto Load
	 * Get_SSAS_Reports_Autoload
	 * 
	 * @var array
	 */
	private $_param_ssas_reports		=	 array();
	
	
	/**
	 * Armazena o array do muliplo cubo
     * 
	 * @var array
	 */
	private $MEASURE_RELATIONSSHIPS	=	array();
	
	/**
	 * Construção da Classe
	 */
	public function __construct()
	{
		WRS_TRACE('__construct', __LINE__, __FILE__);
		
		//Pegando as informações do usuário
		$this->SET_USER_INFO();
		
		$this->_cube_pos_session		=	fwrs_request(TAG_URL_CUBE_SELECTED);
		
		//Incluindo aas querys
		$this->_query		=	 new QUERY_PANEL();

		$this->_param_ssas_reports	=	 array(		'REPORT_ID'				=> NULL,
													'REPORT_DESC'			=> NULL,
													'REPORT_SHARE'			=> NULL,
													'REPORT_AUTOLOAD'		=> NULL,
													'REPORT_VIEW'			=> NULL,
													'REPORT_STATUS'			=> NULL,
													'REPORT_FLAG'			=> NULL,
													'REPORT_FILTER'			=> NULL,
													'LAYOUT_ID'				=> NULL,
													'LAYOUT_ROWS'			=> NULL,
													'LAYOUT_COLUMNS'		=> NULL,
													'LAYOUT_MEASURES'		=> NULL,
													'LAYOUT_FILTERS'		=> NULL,
													'FILTER_FILTERS_ID'		=> NULL,
													'FILTER_FILTERS_DESC'	=> NULL
											);
		
		//Inicializando as metricas do layout
		$this->_param['layout_column']	=	 NULL;
		$this->_param['layout_measure']	=	 NULL;
		$this->_param['layout_filters']	=	 NULL;
		$this->_param['layout_rows']	=	 NULL;
		
		//Salvando as variáveis da URL para gerar uma nova URL com base nos parametros
		$this->getTagUrlAll();
		
		$this->_param['cube']		=	array();
	}
	
	/**
	 * Gravando as informações do cubo
	 * @param unknown $cube
	 */
	private function setCube($cube)
	{
		$this->_param['cube']	=	$cube;
	}
	
	/**
	 * Pegando as informações do cubo selecionado
	 * @return multitype:
	 */
	private function getCube()
	{
		return $this->_param['cube'];
	}
	

	/**
	 * Evento Principal
	 */
	public function run()
	{
		WRS_TRACE('run()', __LINE__, __FILE__);
		//Pegando os parametros do cubo selecionado
		$SSAS_USER		=	WRS::GET_SSAS_USER();
		
		if(isset($SSAS_USER[$this->_cube_pos_session]))
		{
			$this->setCube($SSAS_USER[$this->_cube_pos_session]);
		}
		
		$json_request	=	fwrs_request('json');
		
		if(!empty($json_request)){
			$this->setCube(json_decode(base64_decode($json_request),true));
		}
		
		//Pegando informações do Request
		foreach ($this->_param_ssas_reports as $label =>$value)
		{
			$tmp_value		=	fwrs_request($label);
			$tmp_value		=	 empty($tmp_value) ? NULL : base64_decode($tmp_value);
			$this->_param_ssas_reports[$label]		=	 $tmp_value;
		}
		
		switch(fwrs_request('event'))
		{
			case 'load_grid_header' :  	$this->load_grid_header()		; break;
			case 'gridRowsCache'	:	$this->SELECT_CACHE_GRID()		;break;
			case 'change_cube'		:	$this->CHANGE_CUBE()		;break;
			default 				: 	$this->eventDefault()			; break;
		}		
		
		WRS_TRACE('END run()', __LINE__, __FILE__);
		
	}
	

	private function load_grid_header()
	{
		$_cube			=	$this->getCube();
		$SERVER			=	$_cube['SERVER_ID'];
		$DATABASE		=	$_cube['DATABASE_ID'];
		$CUBE			=	$_cube['CUBE_ID'];
		$USER_CODE      = 	WRS::USER_CODE();

		$gridFlag		=	$this->getGrid($SERVER,$DATABASE,$CUBE,$USER_CODE);
	}
	
	
	/**
	 * Evento Default
	 * A Chamada principal para a construção
	 */
	public function eventDefault($changeCube=false)
	{
		WRS_TRACE('eventDefault()', __LINE__, __FILE__);		
		
		//HTML Panel
		includeCLASS('WRS_HTML');
		
		$panelHTML		=	 new WRS_HTML();

		$_cube			=	$this->getCube();
		$SERVER			=	$_cube['SERVER_ID'];
		$DATABASE		=	$_cube['DATABASE_ID'];
		$CUBE			=	$_cube['CUBE_ID'];
		$USER_CODE      = 	WRS::USER_CODE();
		
		//Para mudar no multiplos cubos apenas insere o ID do CUBO nesse elemento
		//Ou invoca apenas a criação do Elemento que está sendo solicitado
		//$CUBE			=	'[SAN - MDTR_NEW]';
		$gridFlag		=	$this->getGrid($SERVER,$DATABASE,$CUBE,$USER_CODE);
		
		/*
		 * Declarando as variáveis que irá para o HTML
		 */
		$HTML_CUBE_TITLE	=	$_cube['DATABASE_DESC'];
		$HTML_CUBE_EDITION	=	$_cube['CUBE_EDITION'];
		$HTML_CUBE_UPDATE	=	$_cube['CUBE_UPDATE'];

		$HTML_USER_NAME		=	WRS::USER_DESC();
		$HTML_USER_TYPE		=	WRS::USER_TYPE();
		$HTML_CUSTOMER_NAME	=	WRS::CUSTOMER_DESC();
		$HTML_ABAS_AUTO_LOAD=	$panelHTML->MENU_AUTO_LAOD($this->getLoadFilter());
		
		
		//Montando o menu Drag and DROP do Atributos
		$ATRIBUTOS			=	WRS::GET_SSAS_RELATIONSHIPS_BY_CUBE($CUBE);
		
		$ATRIBUTOS_JSON		=	base64_encode(json_encode($ATRIBUTOS,true));
		$HTML_ATRIBUTOS		=	$panelHTML->MENU_DRAG_DROP_DIREITO($this->_cube_pos_session,$ATRIBUTOS,array('LEVEL_NAME','LEVEL_NAME'));

		$MULTIPLE_CUBE		=	$this->is_multiple_cube($_cube,$CUBE);
		$HIDE_MULTIPLE_CUBE	=	'';
		
		if(!$MULTIPLE_CUBE)
		{
			$HIDE_MULTIPLE_CUBE	=	' hide ';
		}
		
		//Montando o menu Drag and DROP das Metricas
		$METRICAS			=	WRS::GET_SSAS_MEASURES_BY_CUBE($CUBE);

		
		$METRICAS_JSON		=	base64_encode(json_encode($METRICAS,true));
		$HTML_METICAS		=	 $panelHTML->MENU_DRAG_DROP_DIREITO($this->_cube_pos_session,$METRICAS,array('MEASURE_NAME','MEASURE_NAME'),'metrica');
		$MEASURE_RELATIONSSHIPS		=	 $this->MEASURE_RELATIONSSHIPS;
		
		if($changeCube)
		{
			//Apenas informações dos cubos	
			include PATH_TEMPLATE.'wrs_panel_measure_atribute.php';
		}
		else
		{
			$getRequestKendoUiDefault	=	$this->getRequestKendoUiDefault;
			include PATH_TEMPLATE.'wrs_panel.php';
		}
		
		WRS_TRACE('END eventDefault()', __LINE__, __FILE__);
	}
	
	private function is_multiple_cube($cube,$CUBE_ID)
	{
	
		$getSSAS_CUBE	=	 WRS::GET_SSAS_USER_MULTIPLE($cube['DATABASE_ID']);
		
		if(count($getSSAS_CUBE)==1) return false;
		
		$option	=	'';
		
		foreach($getSSAS_CUBE as $cube_info)
		{
			$value		=	$cube_info['CUBE_DESC'];
			$option.=fwrs_option($cube_info['CUBE_ID'],$value,$CUBE_ID, 'json="'.base64_encode(json_encode($cube_info,true)).'"');
		}
		
		
		
		return $option;
	}
	
	/**
	 * Carrega o Auto Load e informações dos filtros
	 */
	private function getLoadFilter()
	{
		includeCLASS('WRS_FILTER');
	
		$filter		=	 new WRS_FILTER();
		$filter->set_conn($this->get_conn());
	
		$allfilters		=	$filter->getAbasAutoLoad($this->getCubeDatabaseID(), $this->getCubeID());
	
		//Carrega o Filtro Original para que possa ser apresentado 
		if(isset($allfilters[0]))
		{
			$this->_param_ssas_reports	=	$allfilters[0];
		}
		
		return $allfilters;
	}
	
	
	/**
	 * Apenas grava a tabela do cache no banco 
	 * 
	 * @param unknown $value
	 */	
	private function SAVE_CACHE_SSAS_USER($key,$value)
	{
		WRS_TRACE('SAVE_CACHE_SSAS_USER()', __LINE__, __FILE__);	
		
		WRS::SET_SSAS_USER($this->_cube_pos_session,$key,$value);
		
		$SSAS_USER		=	WRS::GET_SSAS_USER();
		$this->setCube($SSAS_USER[$this->_cube_pos_session]);
		
		WRS_TRACE('END SAVE_CACHE_SSAS_USER()', __LINE__, __FILE__);
	}
	
	
	protected function getMeasuteAttribute($SERVER, $DATABASE, $CUBE,$CUBE_USER_CURRENT=NULL)
	{
		WRS_TRACE('getMeasuteAttribute', __LINE__, __FILE__);
		
		includeCLASS('WRS_ATTRIBUTE_MEASURE');
		
		$wrs_measure_relationships	=	array();
		
		$htmlAttibuteMeasure	=	NULL;
		$attibuteMeasure		=	new WRS_ATTRIBUTE_MEASURE();
		$flag_no_set			=	true;
		
		$attibuteMeasure->set_conn($this->get_conn());

		//Verificando se existe informações do relationships na session
		$relationships			=	WRS::GET_SSAS_RELATIONSHIPS_BY_CUBE($CUBE);
		
		$cube_update			=	 $attibuteMeasure->check_CUBE_SSAS_UPDATE($SERVER, $DATABASE, $CUBE);
		
		/*
		 * Verificando se o Cubo foi Atualizado
		 */
		$_cube					=	$this->getCube();
		if($cube_update!=$_cube['CUBE_UPDATE_ORIGINAL'])
		{
			WRS_TRACE('O Cubo foi atualizado', __LINE__, __FILE__);	
			
			WRS::SET_SSAS_USER_IN_ARRAY($this->_cube_pos_session,'CUBE_UPDATE_ORIGINAL'	,$cube_update);
			WRS::SET_SSAS_USER_IN_ARRAY($this->_cube_pos_session,'CUBE_UPDATE'			,fwrs_time_cube($cube_update));
			
			
			$relationships		= 	NULL;
			$metricas			=	NULL;			
			$SSAS_USER			=	WRS::GET_SSAS_USER();
			
			$this->setCube($SSAS_USER[$this->_cube_pos_session]);
			
		}
		
		//caso ainda não tenha sido inserida na sessão faz a pesquisa
		if(empty($relationships))
		{	
			$wrs_measure_relationships['relationships']	=	WRS::SET_SSAS_RELATIONSHIPS_BY_CUBE($CUBE, $attibuteMeasure->getAtributos($SERVER, $DATABASE, $CUBE));
		}
		
		//Verificando se existe metricas na sessão
		$metricas			=	 WRS::GET_SSAS_MEASURES_BY_CUBE($CUBE);		
		
		//Se não existir metricas na sessão então grava 
		//if(empty($metricas))
		{
				$wrs_measure_relationships['measure']	=	WRS::SET_SSAS_MEASURES_BY_CUBE($CUBE, $attibuteMeasure->getMetricas($SERVER, $DATABASE, $CUBE));
		}
		
		//Como as variáveis são usadas apenas para repassar informações para a sessão 
		//Então libero espaço na memoria do PHP
		unset($relationships);
		unset($metricas);
		
		WRS_TRACE('END getMeasuteAttribute', __LINE__, __FILE__);
		
		return $wrs_measure_relationships;
	}

	private function loadWrsKEndoUi($getRequestKendoUi)
	{
		$kendoUi				=	$getRequestKendoUi;
		$kendoUi['frozen']		=	0;
		

		$kendoUi['SUMARIZA']	=	$this->isEmptyNotZero($kendoUi['SUMARIZA'], 1);
		$kendoUi['COLORS_LINE']	=	$this->isEmptyNotZero($kendoUi['COLORS_LINE'], 1);
		
		return $kendoUi;

	}
	
	/**
	 * Gerando a GRID
	 * 
	 * Chamdas que são executadas pela URL
	 * 
	 * SUM
	 * ORDER_COLUMN
	 * @param string $SERVER
	 * @param string $DATABASE
	 * @param string $CUBE
	 * @return boolean
	 */
	public function getGrid($SERVER,$DATABASE,$CUBE,$USER_CODE)
	{
		WRS_TRACE('getGrid', __LINE__, __FILE__);

//		$CUBE	=	'[SAN - MDTR_NEW][SAN - MDTR_NEW]';
		
		includeCLASS('KendoUi');
		$TelerikUi	= new KendoUi();
		$TelerikUi->setId('wrsGrid');
		$MEASURE_RELATIONSSHIPS		=	 array();

		$cube		=	'';
		
		//Pegando as integrações com o KendoUi
		$getRequestKendoUi			=	$TelerikUi->getRequestWrsKendoUi();		
		$getRequestKendoUi			=	fwrs_request($getRequestKendoUi);
		
		$QUERY_TABLE_CACHE				=	''; //Irá contem o cache da tabela
		
		//PAssando o parametro encontrado pelo request ou pelo nativo
		if(empty($getRequestKendoUi['WINDOW']))
		{
			$getRequestKendoUi['WINDOW']='grid';//'grid_chart'
		}
		
		//grid_map
		//DEixar a aba ativa no javascript
		if(empty($getRequestKendoUi['PLUS_MINUS']))
		{
			$getRequestKendoUi['PLUS_MINUS']	=	 true;
		}

		
		
		
		$getRequestKendoUi				=	$this->loadWrsKEndoUi($getRequestKendoUi);
		$this->getRequestKendoUiDefault	=	$getRequestKendoUiDefault	=	json_encode(array_merge($TelerikUi->jsRequestWrsKendoUiParam(),$getRequestKendoUi),true);
		$getRequestKendoUi_TAG			=	' id="'.$TelerikUi->getId().'" wrsKendoUi="'.base64_encode(json_encode($getRequestKendoUi,true)).'" '; 
		
		

		//Parametrização que vem do select do HTML
		$flag_invert_column		=	fwrs_request('ORDER_COLUMN'); // 0 - false - 1 true
		$flag_invert_column		=	empty($flag_invert_column) ? 0 : $flag_invert_column; // Garantindo que não vá nulo

		$num_rows				=	0;
		$TABLE_NAME_CACHE		=	"";			
		$LAYOUT_ROWS_SIZE		=	0;
		
		//processando os multiplos cubos
		$get_multiple_SSAS_CUBE			=	 WRS::GET_SSAS_USER_MULTIPLE($DATABASE);
		
		if(count($get_multiple_SSAS_CUBE)>1)
		{
			//Multiplos cubos
			foreach($get_multiple_SSAS_CUBE as $multiple_cube)
			{
				$MEASURE_RELATIONSSHIPS[$multiple_cube['CUBE_ID']]	=	$this->getMeasuteAttribute($SERVER, $DATABASE, $multiple_cube['CUBE_ID'],$CUBE);
			}
			
			$this->MEASURE_RELATIONSSHIPS		=	$MEASURE_RELATIONSSHIPS;
		}else{
			//Cubo simples 
			$this->getMeasuteAttribute($SERVER, $DATABASE, $CUBE);
		}
				//End processosmultiplos cubos
		
		//Gravando as informações na Sessão ds Metricas e Atributos
		
		/*
		 * Parametrização que vem do HTML e do start inicial
		 * o implode é para fazer a quebras dos arrays por ',' para gere a implementação correta  
		 */
		
		$ROWSL			=	$this->implode($this->_param_ssas_reports['LAYOUT_ROWS']);
		$COLUMNS		=	$this->implode($this->_param_ssas_reports['LAYOUT_COLUMNS']);
		$MEASURES		=	$this->implode($this->_param_ssas_reports['LAYOUT_MEASURES']);
		$FILTERS		=	$this->implode($this->_param_ssas_reports['LAYOUT_FILTERS']);
		
		$DillLayout						=	 array();
		$DillLayout['LAYOUT_ROWS']		=	$ROWSL;
		$DillLayout['LAYOUT_COLUMNS']	=	$COLUMNS;
		$DillLayout['LAYOUT_MEASURES']	=	$MEASURES;
		$DillLayout['LAYOUT_FILTERS']	=	$FILTERS;
		
		
		
		$TelerikUi->setWrsKendoUi($getRequestKendoUi); //Passando para Gravar no JS as integrações recebidas
				
		$ROWSFrozen		=	array();
		/*
		 * Validando se as metricas principais estão nulas
		 */
		if( empty($MEASURES) || empty($ROWSL))
		{
			WRS_TRACE(LNG('RUN_RELATORIO_FALTA_INFORMACAO'), __LINE__, __FILE__);
			return false;
		}
		
		$ALL_ROWS		=	$this->isEmpty($getRequestKendoUi['ALL_ROWS'], 0);
		$ALL_COLS		=	$this->isEmpty($getRequestKendoUi['ALL_COLS'], 0);
		$COLS_ORDER		=	$flag_invert_column;
		
		//Query para procesar o nome da tabela temporária
		WRS_TRACE('Processando a query GET_SSAS_TABLE', __LINE__, __FILE__);
		/*
		 *	Apenas usamos as colunas 
		 *	TABLE_NAME
		 *	ROWS
		 *	MSG_ERROR
		 *	TIME_QUERY 
		 *
		 */
		if(!isset($cube['TABLE_CACHE']))
		{
				// Cria o Job Para Executar a Consulta
				$queryGrid			=	 $this->_query->CREATE_SSAS_JOB($SERVER, $DATABASE, $CUBE, $ROWSL, $COLUMNS, $MEASURES, $FILTERS, $ALL_ROWS, $ALL_COLS, $COLS_ORDER, 0, '');
				$queryGrid_exec		=	 $this->query($queryGrid);
				if($this->num_rows($queryGrid_exec))
				{
					// Verifica o Status do Job
					$rows =	$this->fetch_array($queryGrid_exec);
					$this->SAVE_CACHE_SSAS_USER('QUERY_CACHE',$rows['QUERY_ID']);
					$cube =	$this->getCube();
					if($rows['JOB_STATUS'] != 4)
					{
						$job_status 		= $this->_query->GET_SSAS_JOB($cube['QUERY_CACHE']);
						$job_status_exec	= $this->query($job_status);
						$rows = $this->fetch_array($job_status_exec);
						while(($rows['JOB_STATUS'] == 1) || ($rows['JOB_STATUS'] == 2) || ($rows['JOB_STATUS'] == 3))
						{
							$job_status_exec = $this->query($job_status);
							$rows = $this->fetch_array($job_status_exec);
							sleep(1);
						}
					}
					
					// Verifica o Retorno do Job
					if($rows['JOB_STATUS'] == 4)
					{
						// Verifica se o Job é de outro usuário
						
						//WRS_DEBUG_QUERY('Remover:::'.$getRequestKendoUi['DRILL_HIERARQUIA_LINHA']);
						//Salvando o nome da tabela cache
						$QUERY_TABLE_CACHE		=	$rows['QUERY_TABLE'];
						$this->SAVE_CACHE_SSAS_USER('TABLE_CACHE',$QUERY_TABLE_CACHE);
						if($rows['USER_CODE'] != $USER_CODE)
						{
							$copy_table = $this->_query->COPY_SSAS_TABLE($cube['QUERY_CACHE']);
							$copy_table_exec = $this->query($copy_table);
							$rows = $this->fetch_array($copy_table_exec);
							$this->SAVE_CACHE_SSAS_USER('TABLE_CACHE',$QUERY_TABLE_CACHE);
						}
						$cube =	$this->getCube();
					}
					elseif ($rows['JOB_STATUS'] < 0)
					{
						echo fwrs_warning(LNG('MSG_ERROR_TABLE_CACHE'),$getRequestKendoUi_TAG).fwrs_javascript('CLOSE_LOAD_RELATORIO();');
						WRS_TRACE('MSG_ERROR:: '.$rows['QUERY_ERROR'].' - '.$queryGrid, __LINE__, __FILE__);
						WRS_DEBUG_QUERY('MSG_ERROR:: '.$rows['QUERY_ERROR'].' - '.$queryGrid);
						return false;
					}
					else
					{
						WRS_TRACE('ERROR::CREATE_SSAS_JOB não retornou informações QUERY:::'.$queryGrid, __LINE__, __FILE__);
						echo fwrs_warning(LNG('ERROR_NOT_ROWS'),$getRequestKendoUi_TAG);
						return false;
					}
				}
				else
				{
					WRS_TRACE('ERROR::CREATE_SSAS_JOB não retornou informações QUERY:::'.$queryGrid, __LINE__, __FILE__);
					echo fwrs_warning(LNG('ERROR_NOT_ROWS'),$getRequestKendoUi_TAG);
					return false;
				}
		}//

		$LAYOUT_ROWS_SIZE			=	count(explode(',',$ROWSL));
		
		//Processando o Drill Linha
		if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
		{
			$DRILL_HIERARQUIA_LINHA_DATA	=	 json_decode(base64_decode($getRequestKendoUi['DRILL_HIERARQUIA_LINHA_DATA']),true);
			$DRILL_HIERARQUIA_LINHA_DATA	=	empty($DRILL_HIERARQUIA_LINHA_DATA) ? '' : $DRILL_HIERARQUIA_LINHA_DATA['query'];
			
			$query_DRILL_SSAS_TABLE		=	$this->_query->DRILL_SSAS_TABLE( $cube['TABLE_CACHE'], $LAYOUT_ROWS_SIZE, $DRILL_HIERARQUIA_LINHA_DATA, 1 );
			if($this->query($query_DRILL_SSAS_TABLE)){
				//Concatena apenas para inserir o D na frente
				$cube['TABLE_CACHE']	=	$cube['TABLE_CACHE'].'D';
			}else{
				WRS_TRACE('ERROR::A query do DRILL LInha não está executando'.$query_DRILL_SSAS_TABLE, __LINE__, __FILE__);
				echo fwrs_warning(LNG('ERROR_DRILL_LINE_RESULT'));
			}
			
		}//END
		
		
		
		
		// Obtem a Quantidade de Registros da Consulta		
		$query_table = $this->query($this->_query->RECORDS_SSAS_TABLES($cube['TABLE_CACHE'],((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])));
		if($this->num_rows($query_table))
		{
			$rows = $this->fetch_array($query_table);
			$num_rows = (int) $rows['TOTAL_ROWS'];
		}
		
		
		
		
		
		
		//$LAYOUT_ROWS_SIZE			=	$LAYOUT_ROWS_SIZE > $rows['COLUMNS']  ?  1 : $LAYOUT_ROWS_SIZE ;
		$this->query($this->_query->SORT_SSAS_TABLE($cube['TABLE_CACHE'],$LAYOUT_ROWS_SIZE,'1'));
		if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
		{
			// Obtem a Tabela Contendo Registros Abertos (Drill)
			$query_DRILL_SSAS_TABLE_INFO = $this->_query->INFO_SSAS_TABLE( $cube['TABLE_CACHE'].'S', $LAYOUT_ROWS_SIZE );
			$this->query($query_DRILL_SSAS_TABLE_INFO);
		}
		
		/*
		 * Pegando a Header
		 */
		//ACRESCENTA-SE O (S) PARA	AS DEMAIS CONSULTAS 
		$TABLE_NAME_CACHE	=	 $cube['TABLE_CACHE'].'S';		
		$queryHeader		=	 $this->_query->GET_SSAS_HEADER( $TABLE_NAME_CACHE, '[*]', $this->getUserLanguage());
		$queryHeader_exec	=	 $this->query($queryHeader);
		if(!$this->num_rows($queryHeader_exec))
		{
			echo fwrs_error(LNG('ERROR_TABLE_CACHE_NO_HEADER'),$getRequestKendoUi_TAG);
			WRS_TRACE('Não existe Header '.$queryHeader, __LINE__, __FILE__);
			WRS_DEBUG_QUERY('Não existe Header '.$queryHeader);
			return false;
		}
		
		//Contem as colunas e as quebras que serão passadas
		$labels					=	array();
		$param					=	array();
		$countField				=	0;			
		$_column				=	array();
		while($rows = $this->fetch_array($queryHeader_exec))
		{
			/*
			 * Apenas informa qual o nome das columns 
			 */
		
			$param[] 	= 	array( 'POS'=>$rows['POS'],'FIELD'=>$rows['FIELD'], 'SPAM'=>$rows['SPAM'],'TOTAL'=>$rows['TOTAL'] 	,  'LEVEL_TYPE'=>$rows['LEVEL_TYPE'] 	, 'LEVEL_FULL'=>$rows['LEVEL_FULL']	,  'LEVEL_NAME'=>$rows['LEVEL_NAME'] 		, 'LEVEL_VALUE'=>$rows['LEVEL_VALUE'] , 'LEVEL_POS'=>$rows['LEVEL_POS'] , 'FORMAT_STRING'=>$rows['FORMAT_STRING'] , 'KEYS'=>$rows['KEYS'], 'KEYS_UP'=>$rows['KEYS_UP']);
			
			//Pegando apenas as colunas de dados
			if(!empty($rows['POS']) && $rows['LEVEL_TYPE']=='MEASURE')
			{
				$_column[]	=	$rows['LEVEL_FULL'];
			}
		}
		
		$DillLayout['COLUMN_HEADER']	=	$_column;
		$TelerikUi->setDrillLayout($DillLayout);
		
		$button_header_html	=	<<<HTML
										<div class="btn-group" role="group" aria-label="...">
										  <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-menu-left"></span></button>
										  <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-menu-right"></span></button>
										</div>	
HTML;
		
		//Manipulando o $TelerikUi	= new KendoUi();
		$tagToUrl				=	 array();
		$tagToUrl['file']		=	'WRS_PANEL';
		$tagToUrl['class']		=	'WRS_PANEL';
		$tagToUrl['event']		=	'gridRowsCache';
		$tagToUrl['tableCache']	=	$cube['TABLE_CACHE'];
		$tagToUrl['numRows']	=	$num_rows;
		$tagToUrl['LRS']		=	$LAYOUT_ROWS_SIZE;
		$tagToUrl['rand']		=	RAND_TOKEN;
		$url					=	'run.php?'.fwrs_array_to_url($tagToUrl);
		
		$page_size				=	 fwrs_request('page_size');
		$page_size				=	 empty($page_size) ? 25 : $page_size;
		
		$TelerikUi->setPageSize($page_size);
		$TelerikUi->setRequestJson($url);
//		$TelerikUi->setRequestComplement($url.'header');
		
		$TelerikUi->setHeaderColumnWRS($param);
//		$TelerikUi->setToolbarExcel('excel', 'ExportarExcel', $urlToExport);
	//	$TelerikUi->setToolbarPDF('pdf', 'pdf', $urlToExport);
		
		echo $TelerikUi->render($this->param_encode($this->_param_ssas_reports));
		
		//echo '<div class="#grid1_grafico"></div>';
		
		//Executa o query do Cache
		//$this->SELECT_CACHE_GRID();
		
		WRS_TRACE('END getGrid', __LINE__, __FILE__);
	}
	
	private function param_encode($param)
	{
		$tmp	=	 array();
		
		foreach ($param as $label =>$value)
		{
			$tmp[$label]	=	 base64_encode($value);
		}
		return $tmp;
	}
	
	/**
	 * Processa as informações que estarão disponível no temporário
	 * @return boolean
	 */
	public function SELECT_CACHE_GRID()
	{
		WRS_TRACE('SELECT_CACHE_GRID', __LINE__, __FILE__);		
		
		//remote-data-binding.php
		header('Content-Type: application/json');

		/*
		 * Pegando os Eventos do Telerik
		 */
		$request 			=	json_decode(file_get_contents('php://input'),true);
		$page				=	$request['page'];
		$take				=	$request['take'];
		$skip				=	$request['skip'];
		$sort				=	isset($request['sort']) ? $request['sort'] : array();
		$pageSize			=	$request['pageSize'];

		/*
		 * Pegando os eventos do WRS_PAnel
		 */
		 
		$numRows			=	fwrs_request('numRows');
		$TABLE_NAME			=	fwrs_request('tableCache');	
		$LAYOUT_ROWS_SIZE	=	fwrs_request('LRS');
		
		/*
		 * Efetuando a contagem recursiva para fazer a reordenação
		 */
		if(isset($sort[0]['field']))
		{
			$field	=	(int)substr($sort[0]['field'], 1);
			$this->query($this->_query->SORT_SSAS_TABLE($TABLE_NAME,$LAYOUT_ROWS_SIZE,$field,strtoupper($sort[0]['dir'])));
		}
		
		/*
		 * Processa a tabela temporária
		 */
		$ROW_NUMBER_START		=	$skip==0 ? 1 : ($skip+1);
		$ROW_NUMBER_END			=	$take+$skip;
		
		$sqlGrid			=	 $this->_query->SELECT_SSAS_TABLE($TABLE_NAME.'S', $ROW_NUMBER_START, $ROW_NUMBER_END);
		$sqlGrid_exec		=	 $this->query($sqlGrid);
		if(!$this->num_rows($sqlGrid_exec))
		{
			echo fwrs_error(LNG('SELECT_NULL'));
			WRS_TRACE('A consulta retornou vazia  '.$sqlGrid, __LINE__, __FILE__);
			WRS_DEBUG_QUERY('A consulta retornou vazia  '.$sqlGrid);
			return false;
		}

		//Processando a Grid
		$resultGrid		=	array();
		$resultGridTmp	=	array();
		
		$param_chart	= array();

		while ($rows =  $this->fetch_array($sqlGrid_exec))
		{
			$resultGridTmp		=	$rows;
			//Colocando em negrito o value
			if(isset($sort[0]['field']))
			{
				$resultGridTmp['bold'.$sort[0]['field']]	=	true;
				//$resultGridTmp[$sort[0]['field']]	='<span style="color: #00ff00; font-weight: bold">42</span>';
			}
			$resultGrid[]		=	$resultGridTmp;
		}

		$resultGridDrill		=	array();
		
		// Caso Esteja no Modo Drill Obtem os Registros Abertos
		if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
		{
			$sqlGridInfo		=	 $this->_query->SELECT_SSAS_INFO($TABLE_NAME.'SI', $ROW_NUMBER_START, $ROW_NUMBER_END);
			$sqlGrid_Drill		=	 $this->query($sqlGridInfo);

			while ($rows =  $this->fetch_array($sqlGrid_Drill))
			{
				$resultGridDrill[]		=	$rows;
			}
		}
		
		/*
		 * Retorna os valores para o Json 
		 */
		
		$result				=	 array();
		$result['total']	=	$numRows;
		$result['data']		=	$resultGrid;
		$result['drill']	=	$resultGridDrill;

		echo json_encode($result);
		//echo json_encode($array_info,true);
		WRS_TRACE('END SELECT_CACHE_GRID', __LINE__, __FILE__);
	}
	
	
	/*
	 * Retorna a informação para o Javascript
	 * 
	 */
	private function CHANGE_CUBE()
	{	
		$json		=	 fwrs_request('json');
		
		if(empty($json)){
			echo fwrs_error(LNG('ERROR_MULTIPLE_CUBE_JSON'));
			return false;
		}
		$json		=	 json_decode(base64_decode($json),true);
		
		$this->setCube($json);
		
		$this->eventDefault(true);
	}
 
	
	/**
	 * Retorna o Database do Cubo
	 * @return multitype:
	 */
	protected function getCubeDatabaseID()
	{
		$cube	=	 $this->getCube();
		return $cube['DATABASE_ID'];
	}
	

	/**
	 * Retorna o ID do cubo
	 */
	protected function getCubeID()
	{
		$cube	=	 $this->getCube();
		return $cube['CUBE_ID'];
	}
	
	
	/**
	 * Faz a parametrização dos arrays que tem que retornar com quegra com virgula (,)
	 * @param array $pieces
	 * @return string
	 */
	private function implode($pieces)
	{
		if(!is_array($pieces)) return $pieces;
		return implode(',', $pieces);
	}

}

?>