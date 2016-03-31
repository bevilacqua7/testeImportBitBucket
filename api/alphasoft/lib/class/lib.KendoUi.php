<?php 

/**
 * Encapsulamento da construção da Grid usando a APi Telerik
 * 
 * @author Marcelo Santos
 * @date 23/03/2015 as 14:40
 * 
 * Site principal da API
 * @link www.telerik.com
 * 
 * Exemplos 
 * @link http://demos.telerik.com/kendo-ui/grid/index
 * 
 * Documentação
 * @link http://docs.telerik.com/
 * @link http://docs.telerik.com/kendo-ui/introduction
 * 
 * Forums
 * @link http://www.telerik.com/forums
 * @link http://www.telerik.com/forums/kendo-ui-integration
 * @link http://www.telerik.com/forums/kendo-ui
 * 
 * Inciar ordenação por outra coluna
 * 
 * http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#sort
 * 
 */


 

class KendoUi
{

	/**
	 * Contem o esqueleto da estrutura do telerik Ui Kendo
	 * @var array
	 */
	private $_param				=	array();
	private $_field				=	array();
	private $_field_param		=	array();
	private $_idName			=	'grid';
	private $wrsKendoUi			=	array();
	private $Drilllayout		=	 array();
	private $param_wrs			=	 array();
	private $total_column		=	0;
	
	
	private $arr_operacoes		=	array(
			'date' => array(
					'eq'				=>	" %c  = ''#v'' ",
					'gt'				=>	" %c > ''#v'' ",
					'gte'				=>	" %c >= ''#v'' ",
					'lt'				=>	" %c < ''#v'' ",
					'lte'				=>	" %c <= ''#v'' ",
					'neq'				=>	" %c !=  ''#v'' "
			),
			'enums' => array(
					'eq'				=>	" %c  =  ''#v'' ",
					'neq'				=>	" %c != ''#v'' "
			),
			'number' => array(
					'eq'				=>	" %c  = #v ",
					'gt'				=>	" %c > #v ",
					'gte'				=>	" %c >= #v ",
					'lt'				=>	" %c < #v ",
					'lte'				=>	" %c <= #v ",
					'neq'				=>	" %c != #v "
			),
			'string' => array(
					'eq'				=>	" %c  = ''#v'' ",
					'neq'				=>	" %c != ''#v'' ",
					'startswith'		=>	" %c LIKE ''#v%'' ",
					'contains'			=>	" %c LIKE ''%#v%'' ",
					'doesnotcontain'	=>	" %c NOT LIKE ''%#v%'' ",
					'endswith'			=>	" %c LIKE ''%#v'' "
			)
	);
	
	
	

	public function set_total_column($input)
	{
		$this->total_column	=	 $input;
	}
	
	public function get_total_column()
	{
		return $this->total_column-1;
	}
	public function setParamWRS($input)
	{
		$this->param_wrs		=	$input;	
	}
	
	
	public function getParamWRS()
	{
		return $this->param_wrs;
	}
	
	
	public function setDrillLayout($_layout)
	{
		$this->Drilllayout		=	$_layout;		
	}
	
	
	public function getDrillLayout()
	{
		return $this->Drilllayout;
	}
	
	/**
	 * Gravando informações no KendoUi
	 * @param array|string $param
	 * @param string $value
	 */
	public function setWrsKendoUi($param,$value=NULL)
	{
		if(is_array($param))
		{
				foreach($param as $label =>$lValue)
				{
					$this->wrsKendoUi[$label]	=	$lValue;
				}
		}else{
			$this->wrsKendoUi[$param]	=	$value;
		}
		
	}
	
	
	public function __construct()
	{
		//Carregando o esqueleto principal do Array
		$this->buildTelerikKendo();
	}
	
	
	public function setId($id)
	{
		$this->_idName	=	 $id;
	}
	
	public function getId()
	{
		return $this->_idName;
	}
	
	
	/**
	 * variáveis que podem cirtular pela WrsKendoUi
	 * @return multitype:string
	 */
	public function getRequestWrsKendoUi($_param=NULL)
	{
		/*
		 * WARNING:O Comando 'TYPE_RUN' é apenas para saber qual o tipo de Execução está sendo solicitado e por esse motivo ele deve ser sempre empty quando finalizado o processo
		 * Ao criar uma flag de controle lembrar que tem que modificar ao optar por sal var o relatório 
		 */

		$data	=	 array(	'page_size'								=> 	25,
						'PLUS_MINUS'							=> 	true,
						'ORDER_BY_COLUMN'						=>	'C001',
						'ORDER_COLUMN_TYPE'					 	=>	NULL,
						'ORDER_COLUMN'							=> 	NULL,
						'frozen'								=> 	0,
						'SUMARIZA'								=>	NULL,
						'COLORS_LINE' 							=>	1,
						'ALL_COLS'								=> 	NULL,
						'ALL_ROWS'								=> 	NULL,
						'WINDOW'								=>	'grid',
						'CHART'									=> 	NULL,
						'GAUGE_COLOR'							=> 	NULL,
						'filter'								=> 	array(),	//Contem informações de negação e simples 
						'GAUGE_SIZE_BY_LINE'					=> 	NULL,
						'DRILL_HIERARQUIA_LINHA'				=> 	NULL,
						'DRILL_HIERARQUIA_LINHA_DATA'			=>	NULL,
						'SHOW_LINE_TOTAL'						=> 	NULL,
						'DRILL_HIERARQUIA_LINHA_DATA_HEADER'	=>	NULL,
						'TYPE_RUN'								=>	NULL,
						'PAGE_CURRENT'							=>	NULL,		//Pagina corrente
						'TITLE_ABA'								=>	NULL,		//Titulo da ABA
						'REPORT_ID'								=>	NULL,		//IDentificador da ABA
						'FILTER_TMP'							=>	'IiI=',		//Contem a estrutura do filtro usada para o histórico
						'QUERY_ID'								=> 	NULL,		//ID da query que foi requisitada
						'IS_REFRESH'							=>	NULL,		//identifica se foi executado o F5 e ou o frefresh na tela
						'TOP_CONFIG'							=>	NULL,		//COnfigurações dos tipos de TOPS e onde
						'MULTIPLE_CUBE_ID'						=>	NULL,		//Caso exista multiple cubos ele é preenchido com o ID_do CUBO
						'EXPORT'								=>	FALSE,		//Flag true or false para exportação de PDF excel entre outros
						'TABLE_CACHE'							=>	''		//table acache em uso
					);	

		
		if($_param==NULL)	return array_keys($data);
		
		if($_param=='default')	return $data;
		
		foreach($data as $label =>$value)
		{
			if(isset($_param[$label]))
			{
					if(!empty($_param[$label]))
					{
						$data[$label]	=	$_param[$label];
					}
			}
			
		}
		return $data;
	}
	
	
	/**
	 * Exeções que as vezes é utilizado para repassar informações ao request
	 * @return multitype:string
	 */
	public function getRequestWrsExceptions()
	{
		return array(
							'DRILL_HIERARQUIA_LINHA_DATA_MINUS',
							'TRASH_HISTORY',		// Contem as informações hos HISTORICOS
							'MKTIME_HISTORY',		//Mktime do Histori
							'STOP_RUN',		//A Flag irá aparecer quando se navega entre as abas | true:false
							'STOP_QUERY',	//Caso esteja true executa novamente mesmo com o histórico igual|true:false
							'TOTAL_COLUMN',		//Muito usado quando existir coluna ordenadas
							'JOB_RESULT',	//REsultado do JOB para o HIstórico
							'KEYS', //Usado para controlar a chave para cancelamento		
		);
	}

	/*
	 * Configurando o array acimapa para o Javascript
	 */
	public function jsRequestWrsKendoUiParam()
	{
		$_param 	=	 $this->getRequestWrsKendoUi();

		//$_param_tmp	=	array();
		//foreach($_param as $label => $value){$_param_tmp[$value]	=	'';}
		
		return $_param;
	}
	
	
	private function buildTelerikKendo()
	{
		$_param						=	array();
		$_param['columns']			=	array();
		$_param['dataSource']		=	array();
		$_param['sortable']			=	true;
		$_param['resizable']		=	true;
		$_param['scrollable']		=	true;		
		$this->wrsKendoUi['frozen']	=	0;
		
		//$_param['toolbar']		=	array();
		/*
		 * Chama a função que irá criar o mapa o Gráfico
		 */
		//$_param['dataBound']	=	 'loadMapGraphic';
		
		
		$_param['pageable']		=	 array(	'refresh'	=>	false,
											'pageSizes'	=> 	array(10,25,50,100,250,500,1000),
											'input'		=>	true,
											'numeric'	=>	false);
		
		//Declate start param
		$this->_param	=	 $_param;
		
		
		
	}
	
	
	
	
	
	/**
	 * 
	 * @param string $name
	 * @param string $FileName
	 * @param string $urlProxy
	 */
	public function setToolbarExcel($name,$FileName,$urlProxy)
	{
		$this->_param['toolbar'][]			=	array('name'=>$name);
		$this->_param[$name]				=  	array();
		$this->_param[$name]['fileName']	=	$FileName;
		$this->_param[$name]['filterable']	=	true;
		$this->_param[$name]['allPages']	=	true;
		$this->_param[$name]['proxyURL']	=	$urlProxy;
	}
	
	
	
	
	
	
	/**
	 *
	 *	Inplementa o botão de Gerar PDF
	 * 
	 * @param string $name
	 * @param string $FileName
	 * @param string $urlProxy
	 */
	public function setToolbarPDF($name,$FileName,$urlProxy)
	{
		$this->_param['toolbar'][]			=	array('name'=>$name);
		$this->_param[$name]				=  	array();
		$this->_param[$name]['fileName']	=	$FileName;
		$this->_param[$name]['allPages']	=	true;
		$this->_param[$name]['proxyURL']	=	$urlProxy;
	}
	
	/**
	 * Passando informações das Colunas
	 * @param array $_column
	 */
	private function setColumn($_column)
	{
		$this->_param['columns']	=	$_column;	
	}
	
	/**
	 * 
	 * Nome da Coluna final 
	 * 
	 * @param string $field
	 * @param array $parse
	 * @param boolean $locked 
	 */
	private function setField($field,$_param,$locked=false)
	{/*
		$parseParam					=	 array();
		$parseParam['MEASURE_NAME']	=	$_param['LEVEL_FULL'];
		$parseParam['MEASURE_NAME']	=	$_param['LEVEL_FULL'];*/
		
		$_type		=	'string';// 'number';
		
			if($locked)
			{
				$this->wrsKendoUi['frozen']++;
				$_type	=	'string';
			}
			
		$this->_field[]		= array("field"=>$field,/*"parse"=>'wrs_format_line',*/"type"=>$_type);
		
//		$_param['FORMAT_STRING']
		//'formataValue(MEASURE_NAME,formatacao,valor,sumariza)'
		
	}
	
	
	/**
	 * 
	 * Renderizando a Grid
	 * 
	 * @param string $json
	 * @param string $type
	 * @return string
	 */
	public function render($_element,$getRequestWrsExceptions,$report_id,$getRequestKendoUi,$table_cache)
	{
		//Pegando os padrões das páginas
		$this->pageScheme();

		
		
		//Pegando O ID do Cubo
		$_request	=	$_REQUEST;
		unset($_request['class']); // Apagando info da URL
		unset($_request['file']);	// Apagando info da URL
		unset($_request['event']);	// Apagando info da URL
			
		$_jsonencode		=	NULL;
		$PLUS_MINUS			=	$getRequestKendoUi['PLUS_MINUS'];
		
		$this->orderByOnLoad($getRequestKendoUi);
		
		//Filtro para todos os outros elementos
		$this->_param['filterable']	=	true;
		
		$_jsonencode =	json_encode($this->_param,true);
		
		
		/*
		 * Configurações e ações para o Javascript
		 */
		
		$idTag		=	$this->getId();
		
		
		
		//Adicionando title da aba
		$ABA_TITLE					=	$this->wrsKendoUi['TITLE_ABA'];
		$ABA_TITLE					=	 empty($ABA_TITLE) ? LNG('ABA_IN_USER') :  $ABA_TITLE;
		
		
		
		include PATH_TEMPLATE.'wrs_panel_header_options.php';
		
		$element	=	base64_encode(json_encode(array_merge($_request,$_element),true));
		

		$ORDER_COLUMN  = $getRequestKendoUi['ORDER_COLUMN'];
		$ORDER_COLUMN  = empty($ORDER_COLUMN) ? 0 : $ORDER_COLUMN;	
		
		//PArametros a ser passado pela Kendo
		$wrsKendoUi							=  	NULL;
		$this->wrsKendoUi['ORDER_COLUMN']	= 	$ORDER_COLUMN;
		$this->wrsKendoUi['TYPE_RUN']		=	NULL;//QUam solicitou o tipo de Alteração do evento
		
		$this->wrsKendoUi['DRILL_HIERARQUIA_LINHA_DATA']	=	"";	//Manter sempre nullo 
		$wrsKendoUi					=	 base64_encode(json_encode($this->wrsKendoUi,true));
		
		
		$fields		=	 json_encode($this->_field_param,true);

		$html 	= <<<HTML
		
			
		
			<div id="{$idTag}Main" class="container_panel_relatorio_rows hide" keys="{$getRequestWrsExceptions['KEYS']}">
						<div class="wrs_box {$idTag}BOX">
									{$WRS_PANEL_HEADER_TABLE}
								
									<div id="{$idTag}" class="wrsGrid table_border border_bottom hide wrs_grid_container"  ></div>
									
									<div id="{$idTag}Elements" class="hide wrs_grid_elements ui-widget-content table_border"></div>
							
								 	 <script>
								  
								  		WRSHistory['{$report_id}']	=	"{$getRequestWrsExceptions['TRASH_HISTORY']}";	
								  		
										$(function(){
										
													$('.btn-clean-filter-kendo-ui').unbind('click').click(btn_clean_filter_kendo_ui)
										
															$(window).unload(function(){});
														
															var jsonDecode											= 	{$_jsonencode};
																
																jsonDecode.dataBound									= 	function(arg){ return onDataBound(arg);}								
																jsonDecode.dataBinding									=	function(arg){ return onDataBinding(arg);}
																
																
																
																
																
																 jsonDecode.filterable	=	 {
											                            operators: {
														                                string	: {
																                                    eq	: kendo.ui.FilterCell.prototype.options.operators.number.eq,
																									gt	: kendo.ui.FilterCell.prototype.options.operators.number.gt,
																									gte	: kendo.ui.FilterCell.prototype.options.operators.number.gte,
																									lt	: kendo.ui.FilterCell.prototype.options.operators.number.lt,
																									lte	: kendo.ui.FilterCell.prototype.options.operators.number.lte,
																									neq	: kendo.ui.FilterCell.prototype.options.operators.number.neq
														                                }
											                            }
											                        };
                        
                        
																
																
																//@link http://www.telerik.com/forums/grid-filtering-in-javascript---not-equal-to-null
																jsonDecode.dataSource.transport.parameterMap			=	function(data) {
		                                								// TODO: para fazer a condicao de AND ou OR das colunas, basta alterar a variavel this.options.dataSource._filter.logic baseado em outro componente na tela, valores 'and' ou 'or' 
				                                						
		                                								var _filters		=	'{}';
		                                								
		                                								if(!isEmpty(this.options.dataSource._filter))
		                                								{
		                                									data['filters']	=	recursiveFilterFindType(rFFTIndex(this.options.dataSource.options.schema.model.fields),this.options.dataSource._filter);
																			_filters	=	data['REPORT_FILTER']	=	changeFiltersKendoUi("{$report_id}",json_decode(json_encode(data['filters'])));
																			
																		}
		                                							
																	 	$(".{$this->getId()}").wrsAbaData('setWrsFilterStart',{filter	:	_filters});
																		$(".{$this->getId()}").wrsAbaData('setWrsData',{REPORT_FILTER:_filters});
																		
																		
																			
																			
		                                								return kendo.stringify(data);
																}
																
																
																
																	var grid = $('#A162').data('kendoGrid');

																//jsonDecode.dataSource.filter = new Array();
													   			//
													   			
													   			try{
													   					var  filters						=	json_decode($(".{$this->getId()}").wrsAbaData('getWrsData').REPORT_FILTER);
													   					var ffilter=	setFiltersKendoUiDecode(json_decode('{$fields}'),filters);
													   						
													   						jsonDecode.dataSource.filter	=ffilter;
													   						
													   						$(".{$this->getId()}").wrsAbaData('setWrsFilterStart',{filter	:	ffilter});
													   						
													   			}catch(e){
													   				console.log('Sem Filtros');
													   			}
													   			
																
																$("#{$this->getId()}").kendoGrid(jsonDecode);
																$(".{$this->getId()}BOX").hide();
																$("#{$this->getId()}").WrsGridKendoUiControlColumnPlusMinus({$PLUS_MINUS}).WrsDrill().WRSWindowGridEventTools();
																$('.dropdown-menu-configuration form, .dropdown-menu-configuration li ').click(function (e) {e.stopPropagation();});
																$('.NAV_CONFIG_WRS').wrsConfigGridDefault(); //Confgirando o Tools para pegar os elementos 
																		
																WRSKendoGridComplete("#{$this->getId()}");		
																
													});
													
													generate_hight_models('{$this->getId()}');
													
													$(".{$this->getId()}").wrsAbaData('setKendoUi',
																{
																	TOTAL_COLUMN	:	{$getRequestKendoUi['TOTAL_COLUMN']},
																	TABLE_CAHCE		:	'{$table_cache}'
																}
																);
																
																
																
																		
												//Adicionando nova ABA						
												var _options_aba	=	{
																			title		:'{$ABA_TITLE}',
																			report_id	:'{$report_id}',
																			active		:	true
																		};
												//$(ABA_TAG_NAME).wrsAbas('refresh',_options_aba);						
									</script>
						</div>
					
																		
			</div>
HTML;
	 
		return $html;
	}
	
	
	
	public function container_error($idTag,$msg)
	{
		$html	=	<<<HTML
						<div id="{$idTag}Main" class="container_panel_relatorio_rows" rel="error">
								{$msg}
						</div>
HTML;

		return $html;
	}
	
	
	
	
	private function orderByOnLoad($getRequestKendoUi)
	{

		$column		=	$getRequestKendoUi['ORDER_BY_COLUMN'];
		$columnDir	=	$getRequestKendoUi['ORDER_COLUMN_TYPE'];		
		
		if(!empty($column))
		{
			$columnDir										=	empty($columnDir) ? 'asc' : $columnDir;
			$this->_param['dataSource']['sort']['field']	=	$column;
			$this->_param['dataSource']['sort']['dir']		=	$columnDir;
		}
		
	}
	
	
	
	
	/**
	 * 
	 * Informa qual será a URL de Resposta
	 * @param string $url
	 */	
	public function setRequestJson($urlRequest,$PAGE=1)
	{
		$this->_param['dataSource']['transport']['read']['url']				=	$urlRequest;
		$this->_param['dataSource']['transport']['read']['contentType']		=	'application/json';
		$this->_param['dataSource']['transport']['read']['type']			=	'POST';

		$this->_param['dataSource']['page']			=	$PAGE;
		//Passa os parametros atrávez do request
		$this->_param['dataSource']['transport']['parameterMap']			=	"";
	}
	
	
	
	private $urlComplement		=	NULL;
	public function setRequestComplement($urlRequest)
	{
		$this->urlComplement=	$urlRequest;
	}

	
	public function getRequestComplement()
	{
		return $this->urlComplement;
	}
	
	
	
	
	
	
	
	
	/**
	 * Quantos Registro será exibido por páginas
	 * @param int $size
	 */
	public function setPageSize($size)
	{
		$this->_param['dataSource']['pageSize']	=	$size;
	}
	
	
 
	
	
	
	
	
	
	
	
	private function pageScheme()
	{
		$this->_param['dataSource']['schema']['data']			=	"data";
		
		$this->_param['dataSource']['schema']['model']['fields']=	$this->_field;
		$this->_param['dataSource']['schema']['total']			=	"total";
		$this->_param['dataSource']['serverSorting']			=	true;
		$this->_param['dataSource']['serverPaging']				=	true;
		
	}
	
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 
	 * @param array $_param
	 * 
	 */
	public function setHeaderColumnWRS($_param)
	{
		
		/**
		 *  Menu Principal
		 */
		$_menu			=	array();
		$_menuReverse	=	array();
		$_menuUse		=	array();
		$_menuUseTmp	=	array();
		$arrayFrozen	=	array();
		$frozenHeader	=	array();
		$columnOnly		=	false;
		$menuTotalFlag	=	array();
		$columns_table	=	array();
		$param			=	$_param;

		foreach ($param as $param_label)
		{
			
			if(empty($param_label['FIELD']))
			{
				$menuTotalFlag[$param_label['LEVEL_FULL']][]	=	$param_label['TOTAL'];
			}
			else
			{
				$columns_table[]	=	$param_label['FIELD'];
			}
			
			if($param_label['LEVEL_POS']>=1)
			{
				
				$_menu			=	$this->findSetKey($_menu,$param_label);
			}else{
				$_param_label					=	$param_label;
				$_param_label['KEYS']			=  	$_param_label['FIELD'];//count($arrayFrozen);
				$_param_label['LEVEL_VALUE']	=	$_param_label['LEVEL_NAME'];		
				$arrayFrozen					=	$this->findSetKey($arrayFrozen,$_param_label,true);
			}
			
			
			if(empty($param_label['FIELD']) && !empty($param_label['LEVEL_NAME']) && !empty($param_label['LEVEL_VALUE']))
			{
					$frozenHeader[$param_label['LEVEL_NAME']]		=	$param_label;
			}
			
			if(isset($param_label['LEVEL_POS'])){
				$param_label['field']	=	$param_label['FIELD'];
				$this->_field_param[$param_label['FIELD']]	=	$param_label;
			}
			
		}
		
		
		
		$arrayFrozen			=	$arrayFrozen[0];
		$frozenHeader			=	array_reverse($frozenHeader);
		$frozenArrayHeader		=	array();
		$frozenArrayHeaderTMP	=	array();
		

		

		/*
		 * Configurando os primeiros niveis
		 */
		foreach ($frozenHeader as $label)
		{
			$frozenArrayHeader[0]['title']		=	(string)$label['LEVEL_NAME'];
			$frozenArrayHeader[0]['LEVEL_FULL']	=	(string)$label['LEVEL_FULL'];
			$frozenArrayHeader[0]['locked']		=	true;
			$frozenArrayHeader[0]['columns']	=	array_values($arrayFrozen);
			//$frozenArrayHeader[0]['field']		=	'';
			$arrayFrozen						=	$frozenArrayHeader;
		}
	
		
		$_menuReverse	=	array_reverse($_menu);
		$tmpContinue	=	NULL;
		
		

		foreach ($_menuReverse as $Reverselabel =>$ReverseValue)
		{
				$_menuUse	=	 array();
				
				foreach ($ReverseValue as $Label =>$value)
				{
					
					if(!isset($_menuUse[$value['keyUp']]) && !empty($value['keyUp'])) 
					{
						$_menuUse[$value['keyUp']] =  array();
					}
					
					if(isset($_menuUseTmp[$value['key']]))
					{
						if(empty($value['keyUp']) && !empty($value['key']))
								{
										$pos	=	 count($_menuUse);
									
										if(empty($value['title']))
										{
											//Quando for apenas as colunas da tabela
											$_menuUse	=	array_values($this->getSingleArray($_menuUseTmp));
											$columnOnly	=	true;
											
										}else{
											$_menuUse[$pos]['title']			=	(string)$value['title'];
											$_menuUse[$pos]['is_total']			=	(string)$value['TOTAL'];
											$_menuUse[$pos]['columns']			=	array_values($_menuUseTmp[$value['key']]);
											$_menuUse[$pos]['tb_field']			=	(string)@$value['FIELD'];
											$_menuUse[$pos]['LEVEL_FULL']		=	(string)$value['LEVEL_FULL'];
										
											
										
										}										
								}else{
										$_menuUse[$value['keyUp']][$value['key']]['title']		=	(string)$value['title'];
										$_menuUse[$value['keyUp']][$value['key']]['columns']	=	array_values($_menuUseTmp[$value['key']]);
										
										$_menuUse[$value['keyUp']][$value['key']]['tb_field']	=	(string)@$value['FIELD'];
										$_menuUse[$value['keyUp']][$value['key']]['LEVEL_FULL']	=	(string)$value['LEVEL_FULL'];
								}
					}
					else
					{
						 
							if(empty($value['keyUp']))
							{
							//	$_menuUse[0]	=	$value; //Verão descontinuada da regra antiga
								$_menuUse	=	$ReverseValue;
							}else{
								$_menuUse[$value['keyUp']][$value['key']]	=	$value;
							}
						
					}
				}
				

				
				$_menuUseTmp	=	$_menuUse;
		}
		
		

		$wrs_column			=	 array_merge($arrayFrozen,$_menuUseTmp);

		
		//Gravando as posições dos totais
		$keysOnly										=	array_keys($wrs_column);
		$wrs_column[$keysOnly[0]]['flag_total_column']	=	$menuTotalFlag;
		$wrs_column[$keysOnly[0]]['column_table']		=	$columns_table;
		$wrs_column[$keysOnly[0]]['layout']				=	$this->getDrillLayout();
		

		
		//if($columnOnly)
		//{
			$wrs_column		=	 array_values($wrs_column);
	//	}
		
		
		$this->set_total_column(count($columns_table));
		

		$this->setColumn($wrs_column);
		
		
		return true;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	private function getSingleArray($array)
	{
		$single		=	 array();
		
		foreach($array as $value) 
		{
			foreach ($value as $getvalue)
			{
			 
			$single[]	=	$getvalue;
			}
		}
		
		return $single;
	}
	
	
	
	
	
	
	
	
	
	private function findSetKey($_menu,$_param,$locked=false)
	{
		$localMenu		=	$_menu;
		$key			=	(string)$_param['KEYS'];
		$keyUp			=	(string)$_param['KEYS_UP'];
		$value			=	(string)$_param['LEVEL_VALUE'];
		$levelPos		=	(string)$_param['LEVEL_POS'];
		$field			=	(string)$_param['FIELD'];
		//$pos			=	(string)$_param['POS'];
		
		//$field			=	 str_replace(array('.','&',' '), array('[DOT]','[AND]','__'), $field);
		
		$paramTelerik			=	 array();
		
		$paramTelerik['key']	=	$key;
		$paramTelerik['keyUp']	=	$keyUp;
		$paramTelerik['title']	=	$value;
		$paramTelerik['TOTAL']	=	(string)$_param['TOTAL'];
		$paramTelerik['tb_field']=	(string)$field;
		$paramTelerik['LEVEL_FULL']=	(string)$_param['LEVEL_FULL'];
		$paramTelerik['LEVEL_DRILL']=	(string)$_param['LEVEL_DRILL'];
		$paramTelerik['field']		=	'';

		
		

		
		if($locked)
		{
			$paramTelerik['locked']		=	$locked;
			$paramTelerik['filterable']	=	false;
		}
		
		
	 
		
		if(!empty($field))
		{
			$this->setField((string)$field, $_param,$locked);
			$paramTelerik["width"]		=	(strlen($value)*7)+10;
			$paramTelerik["width"]		=	$paramTelerik["width"]==0 ? 45 : $paramTelerik["width"];
			$paramTelerik['field']		=	(string)$field;
			$paramTelerik['title']		=	$paramTelerik['field']=='C000' ? '.' : $paramTelerik['title'];
			$paramTelerik['tb_field']	=	(string)$field;
			$paramTelerik['LEVEL_FULL']=	(string)$_param['LEVEL_FULL'];
			$paramTelerik['LEVEL_DRILL']=	(string)$_param['LEVEL_DRILL'];
					
			$_tmp_param					=	$_param;
			$_tmp_param['INDEX']		=	 ((int)substr($field, 1))-$this->wrsKendoUi['frozen'];
			//$_tmp_param['FIELD']	
			
		//Comando para passar parametro de quais colunas esconder
				if(strpos($_tmp_param['LEVEL_NAME'],'.LATITUDE')===false)
				{
					if(strpos($_tmp_param['FIELD'],'[*LATITUDE*]')===false)
					{
						$paramTelerik['hide']	=	false;
					}else{
						$paramTelerik['hide']	=	true;
						$paramTelerik['map']	=	'[LATITUDE]';
					}
				}else{
					$paramTelerik['hide']	=	true;
					$paramTelerik['map']	=	'[LATITUDE]';
				}
				
				
			$paramTelerik['wrsParam']	=	$_tmp_param;
			//$paramTelerik['layout']		=	$this->getDrillLayout();
			/*
			 * Formatação para que pemita passar tag pela base de Dados
			 * @link http://www.telerik.com/forums/how-to-parse-field-data-as-html
			 */
			$paramTelerik['template']	=	'#='.$paramTelerik['field'].'#';

		}
		
		$localMenu[$levelPos][$key]	=	 $paramTelerik; 
		
		return $localMenu;
		
	}
	

	public  function getOPerationsFilter()
	{
		return json_encode($this->arr_operacoes,true);
	}
	
	private function filtersToWhereField($field)
	{
		$campos_de = array('%c','#v');				
		
		$arr_operacoes = $this->arr_operacoes;
		
		$campos_para 						= 	array($field['field'],$field['value']);
		$field['type'] 						= 	array_key_exists('type', $field) && $field['type']!=''?$field['type']:'string'; // verifica se existe o type_column nativo na estrutura da coluna em questão para a montagem do filtro corretamente de acordo com seu tipo de conteudo.  Se nao existir, assume tipo string
		$condicao 							= 	str_replace($campos_de,$campos_para,$arr_operacoes[$field['type']][$field['operator']]);
		
		return '('.$condicao.')';
	}
	
	
	
	private function filtersToWhereContent($arr_content_field)
	{
		if(array_key_exists('filters', $arr_content_field))
		{
			$where_conditions_columns_parcial					=	array();
			foreach($arr_content_field['filters'] as $arr_operacao_parcial)
			{
				$where_conditions_columns_parcial[] 			= 	$this->filtersToWhereContent($arr_operacao_parcial);
			}
			return 		'('.implode(' '.strtoupper($arr_content_field['logic']).' ',$where_conditions_columns_parcial).')';
		}
		else
		{
			return 		$this->filtersToWhereField($arr_content_field);
		}
		
	}
	
	
	/**
	 * //START
	 * Transforma o objeto padrao do KendoUi (json) para uma clausula WHERE
	 * @param array $column_filters-  JSON original do KendoUi de filtros
	 * @param string $column_condition - opcional para definir a operacao entre as colunas passadas (AND ou OR)
	 * @return string - clausila WHERE no padrao WRS com duas apostrofes simples como delimitador de string
	 */
	public function filtersToWhere($column_filters,$column_condition=" AND "){
		$where = '';

		if($column_filters!=null && $column_filters!='' && !is_array($column_filters) && is_object($column_filters)){
			$column_filters = (array)json_decode(json_encode($column_filters,1),1);			
		}
		
		$column_condition	=	is_array($column_filters) && array_key_exists('logic', $column_condition)?$column_filters['logic']:' AND ';

		if($column_filters!=null && $column_filters!='' && is_array($column_filters)){
			$where_conditions_columns	=	array();
			// este foreach inicial poderia ter sido suprimido chamando diretamente $this->filtersToWhereContent, porém, ele existe já que sempre haverá a primeira posicao de filters no array, E, PRINCIPALMENTE para manipular a condicao entre colunas, AND ou OR de acordo com o parametro inicial do metodo: $column_condition 
			foreach($column_filters['filters'] as $arr_operacao)
			{
					$where_conditions_columns[] 	= 	$this->filtersToWhereContent($arr_operacao);
			}						
			
			$where = '('.implode(' '.strtoupper($column_condition).' ',$where_conditions_columns).')';				
		}
				
		return $where;
	}
	 
 
/*
	public function makeFiltersKendoUiQuery($deep,$logic="AND")
	{
	
		$options				=	array('%c','#v');
		$_logic					=	' and ';
		$_filter				=	array();
		
		foreach($deep as $type =>$value)
		{

		 	
				if($type =='filters')
				{
					$rec		=	$this->makeFiltersKendoUiQuery($value,$value['logic']);
					$_filter[] =	$rec;
				}
				else
				{
						
						$_filter[] = $value;
				}
		}
		
		return $_filter;
	}
	
 
	public function getFilters($filters)
	{
		//WRS_DEBUG_QUERY($filters['filters'][0]['filters'],'ds.log');
		
//		$filters['filters'][0]['filters']['filters']=$filters['filters'][0]['filters'];
		
		WRS_DEBUG_QUERY($this->makeFiltersKendoUiQuery($filters['filters']),'ds.log');
		return implode(' ',$this->makeFiltersKendoUiQuery($filters));
	}
	*/
	
	public function grid_window($column,$param)
	{

//		$json_column		=	json_encode($column,true);
		$table				=	$param['table'];
		$model				=	array();
		$modelField			=	array();	
		$filterable 		=	isset($param['filterable'])?$param['filterable']:false;
		
		$_column		=	 json_encode($column,true);
		$_param			=	 json_encode($param,true);
		
		
		foreach($column as $col_param)
		{
			$field			=	$col_param['field'];
			$model[]		=	array_merge($col_param,array('field'=>$col_param['field'],'template'=>'#='.$field.'#'));
			$val_model		=	array('field'=>$col_param['field'],'type'=>'string');


			if(array_key_exists('width', $col_param)){
				$val_model['width']=$col_param['width'];
			}
			
			if(array_key_exists('class', $col_param) && strstr($col_param['class'],'hide')){
				$val_model['class']=$col_param['class'];
			}
			
			$modelField[]	=	$val_model;
		}
		
		//$model[0]['window_grid']		=	$param;
		$json_column		= 	json_encode($model,true);
		$modelField			= 	json_encode($modelField,true);
		$cube_s				=	fwrs_request('cube_s');
	
		
		$windowGridShare	=	json_encode($param,true);
		$grid	=	<<<HTML
					<div id="{$table}"></div>
		            <script>

		                $(document).ready(function () {
		                    $("#{$table}").data("wrsWindowGridShare",{$windowGridShare}).kendoGrid({
		                    	columns: {$json_column},
		                        dataSource: {
		                        	pageSize	:	25,
		                            transport: {
		                                read: {
		                                		type		:'POST',
		                                		contentType	: 'application/json',
	                                			url			:	'run.php?file=WindowGrid&class=WindowGrid&event_grid_inside=grid&table={$table}&cube_s={$cube_s}'
		                                	},
		                                parameterMap		:	function(data) { 
		                                								// TODO: para fazer a condicao de AND ou OR das colunas, basta alterar a variavel this.options.dataSource._filter.logic baseado em outro componente na tela, valores 'and' ou 'or' 
		                                								data['filters']=this.options.dataSource._filter;
		                                								return kendo.stringify(data);
																}
		                            },
		                            schema: {
		                            	data	:"data",
		                                model	: {
		                                    fields: {$modelField}
		                                },
		                                total:"total"
		                            },
		                            serverPaging: true,
		                            serverSorting: true,                            
		                        },
		                        	height	:540,
                       				sortable:true,
									resizable:true,
									scrollable:true,
									filterable:{$filterable},
									pageable:	{
													refresh		:false,
													pageSizes	:[10,25,50,100,200,500,1000],
													input		:true,
													numeric		:false
												},
								dataBinding		:	function(arg){ return onDataBindingWindowGrid(arg);},
								dataBound		:	function(arg){ return onDataBoundWindowGrid(arg);}
		                        
		                    });
		                    		                    
		                    
		                }).loadParanGridWindow({$_column},{$_param});
		            </script>		
		            
		            
HTML;

		
		return $grid;	
		
	}
	
	 
	
	
}

?>