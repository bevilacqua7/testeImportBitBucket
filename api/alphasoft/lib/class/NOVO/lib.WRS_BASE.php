<?php 

/**
 * Contem as informações essenciais para a execução das demais classes
 * Base para todas as classes
 * 
 * Documento Exclusivo AlphaSoft
 * @author Marcelo Santos
 *
 */

/*
 * Chama a Query
 */

includeClass('SqlServer');

class WRS_BASE extends SQL_SERVER
{
		
	/**
	 * Contem Todo HTML do sistema
	 * @var WRS_HTML
	 */
	public $WRS_HTML	=	NULL;
	
	/**
	 * Contem informações do layout do sistema
	 * @var PWS_LAYOUT
	 */
	public $layout			=	NULL;
	
	/**
	 * Eventos atual para o Sistema
	 * @var string
	 */
	private $event			=	NULL;
	
	/**
	 * Contrução da Tag URL
	 * @var array
	 */
	private $_tagUrl		=	 array();
	
	
	/**
	 * Informa��es de DEBUG
	 * @var array
	 */
	private $wrs_debug		=	 array();
	
	/**
	 * Replica a Tag do HTML a ser passada
	 * @param string $label
	 * @param string $value
	 */
	public function setTagUrl($label,$value)
	{
		$this->_tagUrl[$label]	=	$value;
	}
	
	/**
	 * Retorna o Array da Tag HTML
	 * @return array
	 */
	public function getTagUrl()
	{
		return $this->_tagUrl;
	}
	
	/**
	 * Pegando a URL Atual 
	 */
	public function getTagUrlAll()
	{
		$explode	=	 explode('&',$_SERVER['QUERY_STRING']);

		foreach($explode as $value)
		{
			$array_temp			=	 explode('=',$value);
			
			$insite				=	 isset($array_temp[0]) ? $array_temp[0] : count($this->_tagUrl);
			$_value				=	 isset($array_temp[1]) ? $array_temp[1] : NULL;
			
			$this->_tagUrl[$insite]	=	$_value;	
		}
		
		return $this->_tagUrl;
	}
	

	/**
	 * Mensagem para debug de ERROR
	 * 
	 * @param string $data
	 */
	public function debug_error($data)
	{
		$this->wrs_debug['error'][]	=	$data;
	}
	
	/**
	 * Mensagem para debug de SUCESSO
	 *
	 * @param string $data
	 */
	public function debug_success($data)
	{
		$this->wrs_debug['success'][]	=	$data;
	}

	/**
	 * Mensagem para debug de WARNING
	 *
	 * @param string $data
	 */
	public function debug_warning($data)
	{
		$this->wrs_debug['warning'][]	=	$data;
	}
	
	
	/**
	 * Mensagem apenas para debug
	 *
	 * @param string $data
	 */
	public function debug($data)
	{
		if(WRS_DEBUG_WORD)
		{	
			$this->wrs_debug['debug'][]	=	$data;
		}
	}
	
	
	/**
	 * Informa ao sistemas as variáveis que tem que ser passada ao layout
	 * @param array|string $var_name
	 * @param string $value
	 */
	public function set_var($var_name,$value=NULL)
	{
		
		if(is_array($var_name)){
			foreach($var_name as $label =>$new_value){
				$this->layout->assign($label,$new_value);
			}
		}else{
			$this->layout->assign($var_name,$value);
		}
	}
	
	/**
	 * Retorna as mensagems de DEBUG
	 * 
	 * @param string $jump_line
	 * @return Ambigous <NULL, string>
	 */
	public function debug_show($jump_line=NULL,$css=false)
	{
		$labels_debug_show	=	array('debug'=>'DEBUG: ','warning'=>'WARNING: ','success'=>'SUCCESS: ','error'=>'ERROR: ');
		
		$show_return		=	NULL;

		foreach($this->wrs_debug as $debug_label => $debug_value)
		{
			if(count($debug_value)){
				//Apenas permite a palavra debug quando existir
				if($debug_label=='debug' && !WRS_DEBUG_WORD)  continue;
				//Apresenta na tela as mensagem de DEBUG ou warning	
				foreach($debug_value as $debug_info)
				{
					if($css){
						$show_return.='<div class="alert alert-'.$debug_label.'">'.$debug_info.'</div>'.$jump_line;					
					}else{
						$show_return.=$labels_debug_show[$debug_label].$debug_info.$jump_line;
					}
				}
			}	
		}
		
		return $show_return;		
	}
	
	
	/**
	 * Cria o arquivo e insere conte�do na �ltima linha do arquivo
	 * 
	 * @param string $file_path
	 * @param string $data
	 */
	public function insert_data_file($file_path,$data,$type='utf8_decode')
	{
		$_data	=	 $type=='utf8_decode' ? utf8_decode($data) : PWS_UTF($data);
				
		$handle 		= 	fopen($file_path,"a+");
		fwrite($handle,$_data);
		fclose($handle);
	}
	
	/**
	 * TRIM da classw PWS
	 * 
	 * @param string $data
	 * @return mixed
	 */
	public function pws_trim($data)
	{
		return str_replace(' ', '', trim($data));
	}
	
	
	/**
	 * Retorna request esperado pela URL
	 * Pode ser passado o parametro via Array tamb�m
	 * 
	 * @param string:array $name
	 * @return string:array
	 */
	 protected  function get_request($name)
	{
		//Verifica se o parametro passado � array e se for inicia o processo de Preenchimento
		if(is_array($name)){
			$array_request		=	 array();			

			foreach($name as $label_request){
				$array_request[$label_request] = isset($_REQUEST[$label_request]) ? $_REQUEST[$label_request] : NULL;
			}			
			
			return $array_request;
		}
		
		//retorna apenas s String solicitada
		return isset($_REQUEST[$name]) ? $_REQUEST[$name] : NULL;
	}
	
	/**
	 * Cria a pasta no destino
	 * @param string $path
	 */
	protected function create_folder($path)
	{
		
		$path_array	=	 explode(DIRECTORY_SEPARATOR, $path);
		$path_temp	=	NULL;
		
		foreach ($path_array as $path_name)
		{
			$var	=	$this->pws_trim($path_name);		 
			if(!strlen($var)) continue;
			
			$path_temp.=$path_name.DIRECTORY_SEPARATOR;	
			
			if(!file_exists($path_temp)){
				if(!mkdir($path_temp, 0777, true)){
					$this->debug_error('O sistema n�o est� conseguindo criar a pasta '.$path_temp);
				}	
			}
		}		
	}
	
	
	
	
	/**
	 * 
	 * Informa o evento a ser trabalhado
	 * 
	 * @param string $event
	 */
	public function set_event($event)
	{
		switch (strtoupper($event))
		{
			case  	EVENT_SHOW 		: $this->is_show()		; break;
			case 	EVENT_INSERT	: $this->is_insert()	; break;
			case 	EVENT_UPDATE	: $this->is_update()	; break;
			case 	EVENT_GRID		: $this->is_grid()		; break;
			case 	EVENT_NOT_FOUND	: $this->is_not_found()	; break;
			case 	EVENT_REMOVE	: $this->is_remove()	; break;
			case 	EVENT_SEARCH	: $this->is_search()	; break;
			default					: $this->is_not_found()	; break;
		}				
		
	 
	}
	
	/**
	 * Evento SHOW
	 */
	public function is_show()
	{
		$this->event	=	EVENT_SHOW;
	}	

	/**
	 * Evento INSERT
	 */
	public function is_insert()
	{
		$this->event	=	EVENT_INSERT;
	}
	
	/**
	 * Evento UPDATE
	 */
	public function is_update()
	{
		$this->event	=	EVENT_UPDATE;
	}
	
	/**
	 * Evento GRID
	 */
	public function is_grid()
	{
		$this->event	=	EVENT_GRID;
	}
	
	/**
	 * Evento REMOVE
	 */
	public function is_remove()
	{
		$this->event	=	EVENT_REMOVE;
	}
	
	/**
	 * Evento SEARCH
	 */
	public function is_search()
	{
		$this->event	=	 EVENT_SEARCH;
	}
	
	/**
	 * Evento NOT_FOUND
	 */
	public function is_not_found()
	{
		$this->event	=	EVENT_NOT_FOUND;
	}
	
	/**
	 * Retorna o Evento
	 * @return string
	 */
	public function get_event()
	{
		return $this->event;
	}

/**
	 * Essa função chava as funções avaixo
	 * 
	 * show()
	 * insert()
	 * update()
	 * grid()
	 * not_found()
	 * remove()
	 * search()
	 * 
	 * @return event
	 */
	protected function boot_event()
	{
		switch ($this->event)
		{
			case  	EVENT_SHOW 		: return 'show'		; break;
			case 	EVENT_INSERT	: return 'insert'	; break;
			case 	EVENT_UPDATE	: return 'update'	; break;
			case 	EVENT_GRID		: return 'grid'		; break;
			case 	EVENT_NOT_FOUND	: return 'not_found'	; break;
			case 	EVENT_REMOVE	: return 'remove'	; break;
			case 	EVENT_SEARCH	: return 'search'	; break;
			default					: return 'not_found'	; break;
		}	
		
		return 'not_found';
	}
	
	
	
 	/**
	 * Criando a Header da Table para o PHP
	 * @param array $header
	 * @return string
	 */
	protected function table_header($header)
	{
		$tabe_header	=	NULL;
		foreach($header as $value){
			$tabe_header.="<th>".$value."</th>".PHP_EOL;
		}
		return "<thead><tr>".$tabe_header."</tr></thead>".PHP_EOL;
	}	
	
	/**
	 * Criando o Corpo do HTML
	 * @param array $body
	 * @return string
	 */
	protected function table_body($body,$inset_td=NULL,$class=NULL,$title=NULL, $class_td=NULL)
	{
		$tabe_body		=	NULL;
		$pws_tooltip	=	NULL;
		$complement		=	NULL;
		
		//Apenas para o Tooltipe
		if($class){
			$pws_tooltip	=	"pws_tooltip";
			$complement		=	' data-toggle="tooltip" title="'.$title.'" ';
		}
		
		foreach($body as $value){
			$tabe_body.="<td class='".$class_td."'   ".$inset_td.">".$value."</td>".PHP_EOL;
		}
		
		return "<tr class='".$class." ".$pws_tooltip." ' ".$complement.">".$tabe_body."</tr>".PHP_EOL;
	}
	
	/**
	 * Juntas as partes da Tabela
	 * @param string $header
	 * @param string $body
	 * @return string
	 */
	protected function table_show($header,$body,$add_class)
	{
		return '<table width="100%" class="table table-hover table-fixed-pws '.$add_class.'">'.$header.'<tbody>'.$body.'</tbody></table>'.PHP_EOL;
	}
	
	
	/**
	 * Parametrização para o WRS_JQCHART dos dados
	 * @param array $_param
	 * @return multitype:
	 */
	protected function chart_parameter($_param,$chart_category,$title_line,$title_column)
	{
		$param_convert			=	array();
		$param_convert_merge	=	array();
		$_param_modify			=	$_param;
		$count_line				=	1;
		$line_size				=	12;
		$title					=	NULL;
		$data_chart				=	NULL;
		$gauge_param_detail		=	array(	'min'	=>NULL,'max'	=>0,'marker'=>array());
		$gauge_param			=	array();
		$is_gauge				=	false;
		$count_category			=	 count($chart_category);
		
		
		foreach($_param['data'] as $chart_label =>$char_values)
		{
			if($char_values['title']=='[remove]') continue;
			$chart_type		=	1;
			foreach ($char_values['data'] as $label_measure =>$value_datails)
			{
				//Apenas apresenta o gráfico que foi solicitado pelo Cliente
				if(!isset($chart_category[$chart_type])) continue;
				
				
				
				
				
				//Limitação da linha por relatório		
				if(isset($param_convert[$label_measure]) &&  count($param_convert[$label_measure])==$line_size) continue;		

				if(!isset($param_convert[$label_measure])) $param_convert[$label_measure]= array();
				//END limitação
				
				$data_chart		=	$value_datails['data'];
				
				//Regras para  Gauge
				if($chart_category[$chart_type]=='gauge')
				{
					$is_gauge	=	 true;
					
					
					
					if(isset($value_datails['gauge_data_select']))
					{
						$data_chart		=	$value_datails['gauge_data_select'];
					}else{
						$data_chart		=	$value_datails['data'][0];
					}
					
					//Verifica se já exisre o Gauge com a metrica
					if(!isset($gauge_param[$label_measure])){
						$gauge_param[$label_measure]	=	$gauge_param_detail;
					}
					
					if(empty($gauge_param[$label_measure]['min'])) $gauge_param[$label_measure]['min']=$data_chart;
					
					if(empty($gauge_param[$label_measure]['max'])) $gauge_param[$label_measure]['max']=$data_chart;

					if($data_chart<$gauge_param[$label_measure]['min'])
					{
						$gauge_param[$label_measure]['min']=$data_chart;
					}
					
					if($data_chart>$gauge_param[$label_measure]['max'])
					{
						$gauge_param[$label_measure]['max']=$data_chart;
					}
				}
				
				$param_value_by_measure			=	array('title'=> '('.(count($param_convert[$label_measure])+1).') '.$char_values['title'].'  ('.$label_measure.')',				'measure'=>$label_measure, 	'data'=> $data_chart,			'type'=>$chart_category[$chart_type]);
				
				
				if($count_category>1)
				{
					//Regra para o Gaugue para quando tiver mais de uma metrica
					if(count($param_convert[$label_measure])<1)
					{
						$param_value_by_measure['title']		=	$param_value_by_measure['measure'];
						//Apenas insere a 1º posição	
						$param_convert[$label_measure][]		=	$param_value_by_measure;
					}
				}else{
						$param_convert[$label_measure][]		=	$param_value_by_measure;
				}
				
				$chart_type++;
			}
		}
		
		
		foreach($param_convert as $param_label => $param_value)
		{
			$param_convert_merge	=	 array_merge($param_convert_merge,$param_value);
		}
		
		$_param_modify['data']=$param_convert_merge;
		
		//manipila o Title		
		$explode_title_line		=	explode(',',$title_line);
		$explode_title_column	=	explode(',',$title_column);		
		$title					=	$explode_title_line[count($explode_title_line)-1].' X '.$explode_title_column[count($explode_title_column)-1];
		$_param_modify['title']	=	$title;
		
		
		
		if($is_gauge)
		{
			$_param_modify['gauge']	=	$this->paramiter_gauge_chart($gauge_param);
		}		
		
		return $_param_modify;
	}
	
	
	private function paramiter_gauge_chart($param)
	{
		
		if(count($param)==0) return NULL;
		
		$gauge		=	array();
		$porcent	=	100/3;
		foreach ($param as $param_measure => $param_value)
		{
					
					$param[$param_measure]['min']	=	round($param[$param_measure]['min']);
					$param[$param_measure]['max']	=	round($param[$param_measure]['max']);
					
					$porcent_middle		=	round(($param[$param_measure]['max']*$porcent)/100);
					$porcent_last		=	round(($param[$param_measure]['max']*($porcent+$porcent))/100);
					
					$gauge[$param_measure]	=	 array(	'min'	=>$param[$param_measure]['min'],
														'max'	=>$param[$param_measure]['max'],
														'marker'=>array(
																array('from'=>$param[$param_measure]['min'],	'to'=>$porcent_middle),
																array('from'=>$porcent_middle,					'to'=>$porcent_last),
																array('from'=>$porcent_last,					'to'=>$param[$param_measure]['max'])
														)
												);
		 
		}
		
		return $gauge;
	}
	
	/**
	 * Validando se a variável está nula
	 * @param string $param
	 * @param string $call
	 * @return string
	 */
	public function isEmpty($param,$call)
	{
		return empty($param) ? $call : $param;
	}

	/**
	 * Vailização diferente de zero pois o empty considera nulo o zero
	 * @param unknown $param
	 * @param unknown $call
	 * @return unknown
	 */
	public function isEmptyNotZero($param,$call)
	{
		$val	=	str_replace(' ', '', trim($param));
		
		if(empty($val))
		{
			if($param!='0') return $call;			
		}		
		return $param;
	}

}

?>