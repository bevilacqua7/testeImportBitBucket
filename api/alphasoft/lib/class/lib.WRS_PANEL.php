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

/*
 * Incluindo a thread Manager JOB
 */
includeCLASS('ThreadJobManager');

class WRS_PANEL  extends WRS_USER
{
	

	
	/**
	 * Posição do Cubo no Array da Sessão
	 * 
	 * @var int
	 */
	private $_cube_pos_session	=	NULL;
	
	/**
	 * 
	 * @var ThreadJobManager
	 */
	private $threadJobManager	=	'';
	
	
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
	
	private $ssas_request				=	array();
	
	
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
	 * Evento Principal
	 */
	public function run()
	{
		
		
		WRS_TRACE('run()', __LINE__, __FILE__);
		//Pegando os parametros do cubo selecionado
		$SSAS_USER		=	WRS::GET_SSAS_USER();
		
		//Criando a estrutura do Thread Manager
		$this->threadJobManager	=	 new ThreadJobManager();
		$this->threadJobManager->set_conn($this->get_conn()); //passando a conexão do Banco 
		
		if(isset($SSAS_USER[$this->_cube_pos_session]))
		{
			$this->setCube($SSAS_USER[$this->_cube_pos_session]);
		}
		
		$json_request	=	fwrs_request('json');
		
		if(!empty($json_request)){
			$this->setCube(json_decode(base64_decode($json_request),true));
		}
		
		$exception	=	array('TITLE_ABA','cube_s','WINDOW','TYPE_RUN','TOP_CONFIG','SUMARIZA','SHOW_LINE_TOTAL','REPORT_ID','PLUS_MINUS','PAGE_CURRENT','MKTIME_HISTORY','IS_REFRESH','DRILL_HIERARQUIA_LINHA','COLORS_LINE','ALL_ROWS','ALL_COLS','ORDER_COLUMN');
		//Pegando informações do Request
		foreach ($this->_param_ssas_reports as $label =>$value)
		{
			$tmp_value		=	fwrs_request($label);
			
			$this->ssas_request[$label]	=	$tmp_value;
			if(!in_array($label,$exception))
			{
				$tmp_value		=	 empty($tmp_value) ? NULL :  utf8_encode(base64_decode($tmp_value));
			}
			
			$this->_param_ssas_reports[$label]		=	 $tmp_value;
		}
		
		

		
		switch(fwrs_request('event'))
		{
			case 'load_grid_header' :  	$this->load_grid_header()		; 	break;
			case 'gridRowsCache'	:	$this->SELECT_CACHE_GRID()		;	break;
			case 'change_cube'		:	$this->CHANGE_CUBE()			;	break;
			case 'save_history'		:	$this->saveHistory()			;	break;
			case 'remove_history'	: 
				{
					$_cube			=	$this->getCube();
					WRS::DELETE_REPORT_HISTORY($_cube['CUBE_ID'], fwrs_request('report_id'));
					exit();
				}
				; break;	
			case 'threadJobManager'	: 	$this->threadJobManagerVoid()	;	break;	
			case 'stopjob'			:	$this->threadJobManagerStop()	;	break;
			default 				: 	$this->eventDefault()			; 	break;
			
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
		
		// puxando as restricoes de filtros fixos se houver
		$FILTER_FIXED		= 	WRS::INFO_SSAS_LOGIN_FILTER_FIXED();
		
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
			$ABA_TITLE	=	 LNG('LABEL_NOVO');
			$getRequestKendoUiDefault	=	$this->getRequestKendoUiDefault;
			include PATH_TEMPLATE.'wrs_panel.php';
		}
		
		//Caso seja nulo ou executdo com F5 ou refresh executa o histórico
		echo fwrs_javascript('WRSKendoGridRefresh("'.WRS::GET_REPORT_HISTORY_CURRENT($CUBE,true).'")');

		if(is_array($FILTER_FIXED) && count($FILTER_FIXED)>0){
			// alimenta as informacoes de filtros fixos do usuario
			echo fwrs_javascript('set_userinfo_filter_fixed('.json_encode($FILTER_FIXED,1).')');
		}
		
		$this->load_reports_autoload();
		

		WRS_TRACE('END eventDefault()', __LINE__, __FILE__);
	}
	
	private function load_reports_autoload(){

		$_cube			=	$this->getCube();
		$DATABASE		=	$_cube['DATABASE_ID'];
		$CUBE			=	$_cube['CUBE_ID'];
				
		$sql			= 	QUERY_PANEL::GET_SSAS_REPORT($DATABASE, $CUBE);
		$queryGrid_exec	=	$this->query($sql);
		$rows_REPORTS	=	array();
		if($this->num_rows($queryGrid_exec))
		{
			$table_temp				=	$this->fetch_array($queryGrid_exec);
			$sql2					=	'select * from '.reset($table_temp); // pega o primeiro resultado do array
			$queryGrid_table_temp	=	$this->query($sql2);

			if($this->num_rows($queryGrid_table_temp))
			{
				while($report	=	$this->fetch_array($queryGrid_table_temp)){
					if(trim($report['REPORT_AUTOLOAD'])=='1'){
						$rows_REPORTS[] 	=	'AUTO_LOAD.push(callback_load_report_generic_modal('.json_encode($report,1).',true))';
					}			
				}
			}
		}
		if(count($rows_REPORTS)>0 && fwrs_request('exec_reports')=='1'){ // exec_reports!=1 para nao carregar relatorios quando é somente layout
			echo fwrs_javascript('AUTO_LOAD = [];'.implode(';',$rows_REPORTS).';AUTO_LOAD=base64_json(AUTO_LOAD);');
		}
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
		if(empty($metricas))
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
	 * Gerenciamento de Histórico
	 * 
	 * O Layout contem as seguintes infos
	 * 	LAYOUT_ROWS
	 *	LAYOUT_COLUMNS
	 *	LAYOUT_MEASURES
	 *	LAYOUT_FILTERS
	 *
	 * @param string $cube_id
	 * @param array $getRequestKendoUi
	 * @param array $layout
	 * 
	 * @return string
	 */
	private function managerHistoty($cube_id,$getRequestKendoUi,$getRequestWrsExceptions,$layout)
	{
	
		$flagEmpty				=	true;
		$result_box				=	array();
		$_getRequestKendoUi		=	$getRequestKendoUi;
		$report_id				=	$_getRequestKendoUi['REPORT_ID'];
		$history				=	array();
		$history_data			=	array();
		$type_run				=	$_getRequestKendoUi['TYPE_RUN'];
		
		foreach($layout as $lineData)
		{
			if(!empty($lineData)) $flagEmpty=false;
		}
		
//		WRS_DEBUG_QUERY($getRequestKendoUi);
		

		
		if($getRequestKendoUi['IS_REFRESH']=='_false' || $flagEmpty)
		{
			$request	=	WRS::GET_REPORT_HISTORY($cube_id, $report_id);
			return $request;
		}
		
	 

		$tagClass			=	"__";
		$LAYOUT_ROWS		=	$this->convertDataHistory($layout['LAYOUT_ROWS'],$tagClass);
		$LAYOUT_COLUMNS		=	$this->convertDataHistory($layout['LAYOUT_COLUMNS'],$tagClass);
		$LAYOUT_MEASURES	=	$this->convertDataHistory($layout['LAYOUT_MEASURES'],$tagClass);

		/*
		 * Retorna array com 
		 * class, data -> Por linha
		 */
		$LAYOUT_FILTERS_TMP							=	json_decode(base64_decode($_getRequestKendoUi['FILTER_TMP']),true);
		$LAYOUT_FILTERS								=	array();
		$_getRequestKendoUi['FILTER_TMP']			=	NULL;
		$getRequestWrsExceptions['TRASH_HISTORY']	=	NULL;
		
		foreach($LAYOUT_FILTERS_TMP as $data)
		{
			$LAYOUT_FILTERS[]	=	array($data['class'],'', explode(',',$data['data']));
		}
		
		
		
		
		$result_box['LAYOUT_ROWS']			=	$LAYOUT_ROWS;
		$result_box['LAYOUT_COLUMNS']		=	$LAYOUT_COLUMNS;
		$result_box['LAYOUT_MEASURES']		=	$LAYOUT_MEASURES;
		$result_box['LAYOUT_FILTERS']		=	$LAYOUT_FILTERS;
		
	
	
		
		$history		=	json_decode(base64_decode(WRS::GET_REPORT_HISTORY($cube_id, $report_id)),true);
		
		if(!is_array($history)) $history= array();
		
		$history_data	=	array(	
									'layout'	=>	$result_box, 
									'kendoUi'	=>	$_getRequestKendoUi,
									'date'		=>	date('H:i:s'),
									'type'		=>	$type_run,
									'mktime'	=>	fwrs_mktime()
								);
		
	
	
		
		if($history_data['type']!='DrillColuna') 
		{
	
				if(!empty($history))
				{
					if(is_array($history))
					{
						$historyTMP		=	array();
						foreach($history as $dataHistory)
						{
							if( $dataHistory['mktime']!=$getRequestWrsExceptions['MKTIME_HISTORY'])
							{
								$historyTMP[]	=	$dataHistory;
							}
						}
						
						$history	=	$historyTMP;
					}
				}
				//
				//Caso exista mais que 10 linhas de histórico remove a ultima
				if(count($history)>=10){
					array_pop($history);
				}
				
		
				//Incrementa no histórico na primeira linha
				array_unshift($history, $history_data);
		
		}
		
		
		$history		=	base64_encode(json_encode($history,true));
		
//		WRS_DEBUG_QUERY($history)
		
		//GRava na sessão
		WRS::SET_REPORT_HISTORY($cube_id, $report_id, $history);
		
			return $history;
	}
	
	/**
	 * Apenas GRava a troca de tabla de ordenação
	 * 
	 * @param string $cube_id
	 * @param array $getRequestKendoUi
	 * @param string $column
	 */
	private function managerHistotyChangeColOrder($cube_id,$getRequestKendoUi,$column,$order,$page_current,$rows_page,$saveHistory=false)
	{
		$report_id		=	 $getRequestKendoUi['REPORT_ID'];
		$history		=	json_decode(base64_decode(WRS::GET_REPORT_HISTORY($cube_id, $report_id)),true);

		
		if(empty($history)) return false;
		
		
		if(!$saveHistory)
		{
			$history[0]['kendoUi']['ORDER_BY_COLUMN']	=	$column;
			$history[0]['kendoUi']['ORDER_COLUMN_TYPE']	=	$order;
			
			if($page_current)$history[0]['kendoUi']['PAGE_CURRENT']	=	$page_current;
			
			if($rows_page)$history[0]['kendoUi']['page_size']	=	$rows_page;
			
		}else{
			//Se for a opção salvar 
			foreach($column as $line => $data)
			{
				$history[0]['kendoUi'][$line]	=	$data;
			}
			
		}
		
		
		$history		=	base64_encode(json_encode($history,true));
		
		WRS::SET_REPORT_HISTORY($cube_id, $report_id, $history);
	}
	
	private function saveHistory()
	{
		WRS_TRACE('START:: saveHistory', __LINE__, __FILE__);
		
		$options	=	 array('report_id','history_options','cube_s');
		$options	=	 fwrs_request($options);
	
		$options['history_options']	=	 json_decode(base64_decode($options['history_options']),true);
		
		$cube_s		=	$options['cube_s'];
		$_cube		=	 WRS::GET_SSAS_USER();
		$cube_id	=	$_cube[$cube_s]['CUBE_ID'];
		
		
		$getRequestKendoUi					=	 array();
		$getRequestKendoUi['REPORT_ID']		=	$options['report_id'];
		$this->managerHistotyChangeColOrder($cube_id, $getRequestKendoUi, $options['history_options'], NULL,NULL,NULL,true);
	}
	
	private function convertDataHistory($data,$tagClass="")
	{
		$explode	=	explode(',',$data);

		foreach($explode as $line =>$_data)
		{
			$explode[$line]	=	$tagClass.fwrs_replace_attr($_data);
		}
		
		return $explode;
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
		$MEASURE_RELATIONSSHIPS		=	 array();

		$cube		=	'';
	

		//Pegando as integrações com o KendoUi
		$getRequestKendoUi			=	$TelerikUi->getRequestWrsKendoUi($_REQUEST);		
//		$getRequestKendoUi			=	fwrs_request($getRequestKendoUi);
		/*
		echo '<pre>';
		print_r($getRequestKendoUi);
		echo '</pre>';*/
		/*
		 * Exceptions variáveis utilizadas exporadicamente
		 */
		$getRequestWrsExceptions			=	$TelerikUi->getRequestWrsExceptions();
		$getRequestWrsExceptions			=	fwrs_request($getRequestWrsExceptions);
		
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
		
		
		
		

		//Criando o ID do REPORT ID
		if(empty($getRequestKendoUi['REPORT_ID']))
		{
			$getRequestKendoUi['REPORT_ID']	=	WRS::GET_REPORT_HISTORY_CURRENT($CUBE);
		}
		

		$getRequestWrsExceptions['TRASH_HISTORY']	=	$this->managerHistoty($CUBE,$getRequestKendoUi,$getRequestWrsExceptions,$DillLayout);
		
		
		$TelerikUi->setId($getRequestKendoUi['REPORT_ID']);		
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
		
		
		// Cria o Job Para Executar a Consulta
		/*
		 * Regras PARA O TOP
		 */
		if(!empty($getRequestKendoUi['TOP_CONFIG'])){
				
			$TOP_CONFIG	=	json_decode(base64_decode($getRequestKendoUi['TOP_CONFIG']),true);
				
			if(is_array($TOP_CONFIG))
			{
				$ROWSL_TMP		=	 explode(',',$ROWSL);
				$COLUMNS_TMP	=	 explode(',',$COLUMNS);
		
				//Comparando os valores do ARRAY
				foreach($ROWSL_TMP as $topLine =>$topData)
				{
					if(array_key_exists($topData, $TOP_CONFIG))
					{
						$ROWSL_TMP[$topLine]	=	$ROWSL_TMP[$topLine].$TOP_CONFIG[$topData];
					}
				}
		
				//Comparando os valores do ARRAY
				foreach($COLUMNS_TMP as $topColLine =>$topColData)
				{
					if(array_key_exists($topColData, $TOP_CONFIG))
					{
						$COLUMNS_TMP[$topColLine]	=	$COLUMNS_TMP[$topColLine].$TOP_CONFIG[$topColData];
					}
				}
		
				$ROWSL		=	 $this->implode($ROWSL_TMP);
				$COLUMNS	=	$this->implode($COLUMNS_TMP);
		
			}
				
		}
		//END
		
				
				$cube 								=	$this->getCube();
		
				$job_num_rows						=	 false;
				
				/*
				QUERY_ID
				QUERY_TABLE
				USER_CODE
				JOB_STATUS*/
		
				if(!empty($getRequestKendoUi['DRILL_HIERARQUIA_LINHA_DATA']))
				{
					//Simula o retorno do JOB para caso seja o drill linha
					$rows_CREATE_SSAS_JOB			=	 array(
																'QUERY_ID'		=>	$getRequestKendoUi['QUERY_ID']	,
																'QUERY_TABLE'	=>	$cube['TABLE_CACHE'],
																'USER_CODE'		=>	WRS::USER_CODE(),
																'JOB_STATUS'	=>	4	
																);
					
					$job_num_rows	=	 true;
				}else{
		
						$queryGrid			=	 $this->_query->CREATE_SSAS_JOB($SERVER, $DATABASE, $CUBE, $ROWSL, $COLUMNS, $MEASURES, $FILTERS, $ALL_ROWS, $ALL_COLS, $COLS_ORDER, 0, '');
				
				
						$queryGrid_exec		=	 $this->query($queryGrid);
						$job_num_rows		=	$this->num_rows($queryGrid_exec);
						
						if($job_num_rows)
						{
							$rows_CREATE_SSAS_JOB 				=	$this->fetch_array($queryGrid_exec);
						}
				
				}
				
				if($job_num_rows)
				{
					// Verifica o Status do Job
					
					$rows_GET_SSAS_JOB					=	NULL;
					$getRequestKendoUi['QUERY_ID']		=	$rows_CREATE_SSAS_JOB['QUERY_ID'];
					
					
					
					
					//Salvando na estrutura do quendo ui o ID da query

					/*
					 * Criando a estrutura de arrey para ficar no gereciador de thread
					 */
					
					$getRequestKendoUi	=	 array_merge($getRequestKendoUi,$this->ssas_request);
					
			
					
					$thread_job_manager	=	array(		'ROWSL'						=>	$ROWSL,
														'getRequestKendoUi'			=>	$getRequestKendoUi,
														'getRequestWrsExceptions'	=>	$getRequestWrsExceptions,
														'cube'						=>	$cube,	
														'cube_s'					=>	$this->_cube_pos_session,				
														'getRequestKendoUi_TAG'		=>	$getRequestKendoUi_TAG,	
														'DillLayout'				=>	$DillLayout,
														//'TelerikUi'					=>	$TelerikUi,
														'CUBE'						=>	$CUBE,
														'USER_CODE'					=>	$USER_CODE,
														'CREATE_SSAS_JOB'			=>	$rows_CREATE_SSAS_JOB,
														'_param_ssas_reports'		=>	$this->_param_ssas_reports//Retorno do processo da query CREATE_SSAS_JOB	
					);
					
					
					
					
					
					/*
					 *	Criando a base do script para o Data Report 
					 */
					return $this->mountScriptReport($thread_job_manager,$TelerikUi);
					

				}
				else
				{
					WRS_TRACE('ERROR::CREATE_SSAS_JOB não retornou informações QUERY:::'.$queryGrid, __LINE__, __FILE__);
					//echo fwrs_warning(LNG('ERROR_NOT_ROWS'),$getRequestKendoUi_TAG);
					
					return array('error'=>LNG('ERROR_NOT_ROWS'),'REPORT_ID'=>$getRequestKendoUi['REPORT_ID']);
					
					
					//return false;
				}
		
		
		
		
		WRS_TRACE('END getGrid', __LINE__, __FILE__);
	}
	
	
	
	/**
	 * 
	 * Apenas monta o HTML que será mostrado na tela para que depois seja executado o javascript e crie os eventos do Kendo Ui e por sua vez chave os eventos de construção da GRID usando a estrutura KendoUi
	 * 
	 * 
	 * @param array $thread_job_manager
	 * @param KendoUi $TelerikUi
	 * @param boolean $checkThreadJobManager
	 * @return Ambigous <boolean, multitype:>|string|Ambigous <string, boolean>
	 */
	private function mountScriptReport($thread_job_manager,$TelerikUi,$checkThreadJobManager=false)
	{
		
		
//		return array('error'=>'OPS erro interno');
		
		//Temporarias da function
		$_tmp_threadJobManager	=	'';
		$HTML					=	'';
 
		$ROWSL					=	$thread_job_manager['ROWSL'];
		$getRequestKendoUi		=	$thread_job_manager['getRequestKendoUi'];
		$getRequestWrsExceptions=	$thread_job_manager['getRequestWrsExceptions'];
		$cube					=	$thread_job_manager['cube'];
		$getRequestKendoUi_TAG	=	$thread_job_manager['getRequestKendoUi_TAG'];
		$DillLayout				=	$thread_job_manager['DillLayout'];
//		$TelerikUi				=	$thread_job_manager['TelerikUi'];
		$CUBE					=	$thread_job_manager['CUBE'];
		$_param_ssas_reports	=	$thread_job_manager['_param_ssas_reports'];
		
		$threadJobManager	=	$this->threadJobManager->runThreadJobManager($thread_job_manager,$getRequestKendoUi['REPORT_ID'],$this->_query,$checkThreadJobManager);

		if(is_array($threadJobManager))
		{
			//O correu um erro  no processo da runThreadJobManager 
			if(array_key_exists('error', $threadJobManager)) {return $threadJobManager;}
			
			$cube			=	$threadJobManager['cube'];
			$this->_param	=	$threadJobManager['_param'];
			
				//Verificando se é para esperar a thread
				if($threadJobManager['wait_thread'])
				{
					header('Content-Type: application/json');
					$_tmp_threadJobManager	=	json_encode($threadJobManager,true);
					//Quando a solicitação dor pelo processo de checagem do JOB
					if(!$checkThreadJobManager)
					{
							echo $_tmp_threadJobManager;
							
							exit();
					}else{
						return $_tmp_threadJobManager;
					}
				}
			
		
			$HTML	=	$this->mountGrid(	$ROWSL,
						$getRequestKendoUi,
						$getRequestWrsExceptions,
						$cube,
						$getRequestKendoUi_TAG,
						$DillLayout,
						$TelerikUi,
						$CUBE,
						$checkThreadJobManager);
			
			
			if($checkThreadJobManager) return $HTML;
			
			
		}
		else
		{
			return $threadJobManager;
		}
		
	}
	
	//$SERVER,$DATABASE,$CUBE,$USER_CODE
	/**
	 * 
	 * @param unknown $ROWSL
	 * @param unknown $getRequestKendoUi
	 * @param unknown $getRequestWrsExceptions
	 * @param unknown $cube
	 * @param unknown $getRequestKendoUi_TAG
	 * @param unknown $DillLayout
	 * @param KendoUi $TelerikUi
	 * @paran boolean $checkThreadJobManager
	 * @return boolean
	 */
	private function mountGrid($ROWSL,$_getRequestKendoUi,$getRequestWrsExceptions,$_cube,$getRequestKendoUi_TAG,$DillLayout,$TelerikUi,$CUBE,$checkThreadJobManager)
	{
		WRS_TRACE('Start mountGrid', __LINE__, __FILE__);
		
		$cube						=	$_cube;
		$getRequestKendoUi			=	$_getRequestKendoUi;

		
//		$getRequestKendoUi['ALL_ROWS']
	//WRS_DEBUG_QUERY($getRequestKendoUi);
	
		$LAYOUT_ROWS_SIZE							=	count(explode(',',$ROWSL));
		$msg										=	''; //mensagens do sistema ela muda a cada conjunto de regras
		
		//Processando o Drill Linha
		if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
		{
			$OPENROWS	=	1;
			if($getRequestWrsExceptions['DRILL_HIERARQUIA_LINHA_DATA_MINUS']=='remove_line') $OPENROWS=0;
			
			$DRILL_HIERARQUIA_LINHA_DATA	=	 base64_decode($getRequestKendoUi['DRILL_HIERARQUIA_LINHA_DATA']);
			$DRILL_HIERARQUIA_LINHA_DATA	=	empty($DRILL_HIERARQUIA_LINHA_DATA) ? '' : $DRILL_HIERARQUIA_LINHA_DATA;
			$query_DRILL_SSAS_TABLE			=	$this->_query->DRILL_SSAS_TABLE( $cube['TABLE_CACHE'], $LAYOUT_ROWS_SIZE, $DRILL_HIERARQUIA_LINHA_DATA, $OPENROWS );
			
			if($this->query($query_DRILL_SSAS_TABLE)){
				//Concatena apenas para inserir o D na frente
				$cube['TABLE_CACHE']	=	$cube['TABLE_CACHE'].'D';
			}else{
				WRS_TRACE('ERROR::A query do DRILL LInha não está executando'.$query_DRILL_SSAS_TABLE, __LINE__, __FILE__);
				$msg	=	 fwrs_warning(LNG('ERROR_DRILL_LINE_RESULT'));
				
				if(!$checkThreadJobManager){
					echo $msg;
				}
			}			
		}//END
		
		
		// Obtem a Quantidade de Registros da Consulta		
		$query_table = $this->query($this->_query->RECORDS_SSAS_TABLES($cube['TABLE_CACHE'],((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])));
		if($this->num_rows($query_table))
		{
			$rows 		= $this->fetch_array($query_table);
			$num_rows 	= (int) $rows['TOTAL_ROWS'];
			WRS::SET_TOTAL_COLUMN($cube['TABLE_CACHE'], $rows['TOTAL_COLUMNS']);//Gravando
		}
		
		
		
		//$LAYOUT_ROWS_SIZE			=	$LAYOUT_ROWS_SIZE > $rows['COLUMNS']  ?  1 : $LAYOUT_ROWS_SIZE ;
		
		$_sort_current		=	(int)substr($getRequestKendoUi['ORDER_BY_COLUMN'], 1);
		$_sort_column		=	WRS::GET_TOTAL_COLUMN($_cube['TABLE_CACHE']);
		
		$_sort_order		=	$_sort_current > $_sort_column ? $_sort_column : $_sort_current;
		

		/*
		echo $_sort_current.'--';
		echo $_sort_order;*/
		
		$SORT_SSAS_TABLE	=	$this->query($this->_query->SORT_SSAS_TABLE($cube['TABLE_CACHE'],$LAYOUT_ROWS_SIZE,$_sort_order));
		
		if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
		{
			// Obtem a Tabela Contendo Registros Abertos (Drill)
			$query_DRILL_SSAS_TABLE_INFO = $this->_query->INFO_SSAS_TABLE( $cube['TABLE_CACHE'].'S', $LAYOUT_ROWS_SIZE );
			$this->query($query_DRILL_SSAS_TABLE_INFO);
		}
		
		/*
		 * Pegando a Header
		 */
		
		if(!$SORT_SSAS_TABLE)
		{
				return array('error'=>LNG('SORT_SSAS_TABLE_ERROR'),'REPORT_ID'=>$getRequestKendoUi['REPORT_ID']);
		}
		
		//ACRESCENTA-SE O (S) PARA	AS DEMAIS CONSULTAS 
		$TABLE_NAME_CACHE	=	 $cube['TABLE_CACHE'].'S';		
		$queryHeader		=	 $this->_query->GET_SSAS_HEADER( $TABLE_NAME_CACHE, '[*]', $this->getUserLanguage());
		$queryHeader_exec	=	 $this->query($queryHeader);
		if(!$this->num_rows($queryHeader_exec))
		{
			$msg	=	 LNG('ERROR_TABLE_CACHE_NO_HEADER');
			WRS_TRACE('Não existe Header '.$queryHeader, __LINE__, __FILE__);
			WRS_DEBUG_QUERY('Não existe Header '.$queryHeader);

		//	if($checkThreadJobManager)
			//{
				return array('error'=>$msg,'REPORT_ID'=>$getRequestKendoUi['REPORT_ID']);
			/*}else{
				echo $msg;
			}*/
			
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
		
		//Repassando informações para drill
		$tagToUrl['DRILL_HIERARQUIA_LINHA']		=	$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'];
		$tagToUrl['REPORT_ID']					=	$getRequestKendoUi['REPORT_ID'];
		$tagToUrl['CUBE_ID']					=	$CUBE;
		
		
		$tagToUrl['tableCache']	=	$cube['TABLE_CACHE'];
		$tagToUrl['numRows']	=	$num_rows;
		$tagToUrl['LRS']		=	$LAYOUT_ROWS_SIZE;
		$tagToUrl['rand']		=	RAND_TOKEN;

		
		

		$page_size				=	 $getRequestKendoUi['page_size'];
		$page_size				=	 empty($page_size) ? 25 : $page_size;
		
		$PAGE					=	1;
	
		if(isset($getRequestKendoUi['PAGE_CURRENT']))
		{
			$PAGE	=	ceil($num_rows/$page_size);
			
			if($PAGE>=$getRequestKendoUi['PAGE_CURRENT'])
			{
				$PAGE	=	$getRequestKendoUi['PAGE_CURRENT'];
			}
		}
		
		
		$TelerikUi->setPageSize($page_size);
		$TelerikUi->setHeaderColumnWRS($param);
		
		
	
		
		
		$tagToUrl['TOTAL_COLUMN']	=	$TelerikUi->get_total_column();
		
		
		$url						=	'run.php?'.fwrs_array_to_url($tagToUrl);
		$TelerikUi->setRequestJson($url,$PAGE);
		
		
		$TelerikUi->setToolbarExcel('excel', 'ExportarExcel', $url);
		$TelerikUi->setToolbarPDF('pdf', 'pdf', $url);
		
		
		
		$getRequestKendoUi['TOTAL_COLUMN']		=	$tagToUrl['TOTAL_COLUMN'];//Recalcula o total de colunas
		
		$HTML	=	 $TelerikUi->render(	$this->param_encode($this->_param_ssas_reports),
											$getRequestWrsExceptions,
											$getRequestKendoUi['REPORT_ID'],
											$getRequestKendoUi);
		
		
		
		if($checkThreadJobManager)
		{
			return array('html'=>$HTML,'warning'=>$msg,'REPORT_ID'=>$getRequestKendoUi['REPORT_ID'],'data'=>$getRequestKendoUi);
		}else{
			echo $HTML;
		}
		
		//echo '<div class="#grid1_grafico"></div>';
		
		//Executa o query do Cache
		//$this->SELECT_CACHE_GRID();

		WRS_TRACE('END mountGrid', __LINE__, __FILE__);
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

		includeCLASS('KendoUi');
		$TelerikUi					= new KendoUi();
		$getRequestKendoUi			=	$TelerikUi->getRequestWrsKendoUi($_REQUEST);
//		$getRequestKendoUi			=	fwrs_request($getRequestKendoUi);
		$CUBE_ID					=	fwrs_request('CUBE_ID');
		$TOTAL_COLUMN				=	fwrs_request('TOTAL_COLUMN');
		$total_column_detect		= 	false;
		/*
		 * Pegando os Eventos do Telerik
		 */
		$request 				=	json_decode(file_get_contents('php://input'),true);
		$page					=	$request['page'];
		$take					=	$request['take'];
		$skip					=	$request['skip'];
		$sort					=	isset($request['sort']) ? $request['sort'] : array();
		$pageSize				=	$request['pageSize'];
		$resultGridDrill		=	NULL;
	
		/*
		 * Pegando os eventos do WRS_PAnel
		 */
		 

		$numRows			=	fwrs_request('numRows');
		$TABLE_NAME			=	fwrs_request('tableCache');	
		$LAYOUT_ROWS_SIZE	=	fwrs_request('LRS');
		
		/*
		 * Efetuando a contagem recursiva para fazer a reordenação
		 * WARNING:Esse é o trecho do código que está se repetindo
		 */
		
		
		if(isset($sort[0]['field']))
		{
			
			$field	=	(int)substr($sort[0]['field'], 1);
			
			$total_atual	=	 WRS::GET_TOTAL_COLUMN($TABLE_NAME);
			
			if($total_atual!=$field)
			{	
				
				WRS::SET_TOTAL_COLUMN($TABLE_NAME,$field);
				
				if($field>$TOTAL_COLUMN)
				{
					$field					=	$TOTAL_COLUMN;
					$total_column_detect	=	true;
				}
				
				$this->query($this->_query->SORT_SSAS_TABLE($TABLE_NAME,$LAYOUT_ROWS_SIZE,$field,strtoupper($sort[0]['dir'])));
				
				
				if(((int)$getRequestKendoUi['DRILL_HIERARQUIA_LINHA'])==1)
				{
					// Obtem a Tabela Contendo Registros Abertos (Drill)
					$query_DRILL_SSAS_TABLE_INFO = $this->_query->INFO_SSAS_TABLE( $TABLE_NAME.'S', $LAYOUT_ROWS_SIZE );
					$this->query($query_DRILL_SSAS_TABLE_INFO);
				}
			}
			
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

		//WRS_DEBUG_QUERY(print_r($request,true));
		
		
			$order_field	=	isset($sort[0]['field']) ? $sort[0]['field'] : '';
			$order_dir		=	isset($sort[0]['dir']) ? $sort[0]['dir'] : '';
			
			
			if($total_column_detect)	$order_field	=	'';
			
			$this->managerHistotyChangeColOrder($CUBE_ID, 
												$getRequestKendoUi,
												$order_field,
												$order_dir,
												$page,
												$pageSize,false);
		
//			$cube_id,$getRequestKendoUi,$column,$order,$page_current,$rows_page,$saveHistory=false

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

		
		
		
		// Caso Esteja no Modo Drill Obtem os Registros Abertos
		if($getRequestKendoUi['DRILL_HIERARQUIA_LINHA']==1)
		{
			$resultGridDrill	=	 array();
			$sqlGridInfo		=	 $this->_query->SELECT_SSAS_INFO($TABLE_NAME.'SI', $ROW_NUMBER_START, $ROW_NUMBER_END);
			$sqlGrid_Drill		=	 $this->query($sqlGridInfo);
			
			//Verifica se existe resultado se existir então aplica 
			if($this->num_rows($sqlGrid_Drill)) 
			{
				
				$resultGridDrillLine	= array();
				$resultGridDrillData	= array();
				$rowsLastTMP			=	array();
				while ($rows =  $this->fetch_array($sqlGrid_Drill))
				{
					$resultGridDrillLine[$rows['ROW_NUMBER']]		=	$rows;
					$resultGridDrillData[$rows['DRILL_OPEN']]		=	$rows;
					$rowsLastTMP									=	$rows;
				}
				
				$resultGridDrill['line']	=	$resultGridDrillLine;
				$resultGridDrill['data']	=	$resultGridDrillData;
				$resultGridDrill['OPENCOLS']=	$rowsLastTMP['OPENCOLS'];
				
			
			}
			
			
		}
		
		/*
		 * Retorna os valores para o Json 
		 */
		
		$result				=	 array();
		$result['total']	=	$numRows;
		$result['data']		=	$resultGrid;

		$result['wrs_request_data']					=	array();
		$result['wrs_request_data']['drill']		=	$resultGridDrill;
		echo json_encode($result);
		//echo json_encode($array_info,true);
		WRS_TRACE('END SELECT_CACHE_GRID', __LINE__, __FILE__);
		
	}
	
	
	
	
	
	
	
	private function threadJobManagerStop()
	{
		
		WRS_TRACE('threadJobManagerStop()', __LINE__, __FILE__);
		$report_id				=	 fwrs_request('report_id');
		$html_data				=	array();
		$html_data['report_id']	=	$report_id;
		
		header('Content-Type: application/json');
	 
	
		$job			=	$this->threadJobManager->getJOB($report_id);
		
		if(!empty($job))
		{
			
			if(isset($job['CREATE_SSAS_JOB']['QUERY_ID']))
			{
					$query	=	$this->_query->STOP_SSAS_JOB($job['CREATE_SSAS_JOB']['QUERY_ID']);

					if(!$this->query($query))
					{
						$html_data['html']	=	 str_replace('%s',$job['getRequestKendoUi']['TITLE_ABA'],LNG('JOB_CANCEL_ERRO'));
						$html_data['status']	=	-1;
						echo json_encode($html_data,true);
						exit();
					}else{
						$html_data['html']	=	 str_replace('%s',$job['getRequestKendoUi']['TITLE_ABA'],LNG('JOB_CANCEL'));
						$html_data['status']	=	1;
						$this->threadJobManager->removeJOB($report_id);
						echo json_encode($html_data,true);
						exit();
					}
			
			}
			
			
		}

		
		$html_data['html'] 		=	LNG('JOB_NOTFOUND');
		$html_data['status']	=	-2;	
		$this->threadJobManager->removeJOB($report_id);
		
		
		echo json_encode($html_data,true);
		//STOP_SSAS_JOB
		
		WRS_TRACE('END threadJobManagerStop()', __LINE__, __FILE__);
		
	}
	
	
	/**
	 * 
	 * Apenas é executado quando o GErenciamento de JOB estiver ativo ou seja quanto não tiver solicitação ou quando a solicitação acabar essa função será sempre chamada
	 *  
	 */
	private function threadJobManagerVoid()
	{
		header('Content-Type: application/json');
		
		includeCLASS('KendoUi');

		$job_val		=	base64_decode(fwrs_request('jobs_manager'));
		$job_param		=	json_decode($job_val,true);
	 	$param_manager	=	array();
		
		if(!empty($job_val))
		{
			foreach($job_param as $line =>$report_data)
			{
				//WRS_DEBUG_QUERY($report_data);

				$job			=	$this->threadJobManager->getJOB($report_data);
				
				if($job)
				{
						$TelerikUi			= 	new KendoUi();
						$getRequestKendoUi	=	$job['getRequestKendoUi'];
						
						$TelerikUi->setId($getRequestKendoUi['REPORT_ID']);		
						$TelerikUi->setWrsKendoUi($getRequestKendoUi); //Passando para Gravar no JS as integrações recebidas
						
						$MountReport		=	$this->mountScriptReport($job,$TelerikUi,true);
						
						//Removendo o Report ID da lista de array
						if(array_key_exists('html', $MountReport))
						{
							$this->threadJobManager->removeJOB($getRequestKendoUi['REPORT_ID']);	
						}
						
						$param_manager[$report_data]	=	$MountReport;
				}
			}
		}
		
		echo json_encode($param_manager,true);
		
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