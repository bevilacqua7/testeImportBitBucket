<?php 
/**
 * LIB para a geracao de relatorios
 * 
 * Author: Marcelo Santos / Felipe Bevilacqua
 * Company:Alpha Soft
 * Date: 31/08/2015
 */



includeCLASS('WRS_USER');
includeQUERY('WRS_PANEL');
includeQUERY('WRS_REPORT');
includeQUERY('WRS_MANAGE_PARAM');

class WRS_REPORT  extends  WRS_USER
{
	
	private $event			=	NULL;
	private $paran_query	=	NULL;
	private $cube			=	array();
	
	/**
	 * 
	 * @var QUERY_WRS_REPORT
	 */
	private $_query			=	NULL;
	
	public function run($event,$paran_query,$cube_s)
	{		
		$this->event		=	empty($event)?fwrs_request('event'):$event;
		$this->paran_query	=	$paran_query;
		$cube_s				=	empty($cube_s)?fwrs_request('cube_s'):$cube_s;
		
		$cubes				=	WRS::GET_SSAS_USER();
		$this->cube			=	$cubes[$cube_s];
		$this->_query		=	new QUERY_WRS_REPORT();

		if(!empty($this->event))
		{
			switch ($this->event)
			{
				case 'openModalSave' 	: return $this->openModalSave(); break;
				case 'save' 			: return $this->save(); break;
				case 'delete' 			: return $this->delete(); break;
				
			}
		}
	}
	

	public function delete(){

		$user			=	WRS::INFO_SSAS_LOGIN();		
		$arr_report_id	=	json_decode(fwrs_request('report_id'));
		if(is_array($arr_report_id) && count($arr_report_id)>0){
			foreach($arr_report_id as $report_id){
				$sql			=	QUERY_PANEL::REMOVE_SSAS_REPORT( $report_id, $user['PERFIL_ID'] );
		 		$query			=	$this->query($sql);
			}
		}
 		
	}
	
	public function save(){

		$layouts 			= fwrs_request('layouts');
		$grupos 			= fwrs_request('grupos');		
		$dadosJs			= json_decode(base64_decode(fwrs_request('dadosJs')));
		$user				= WRS::INFO_SSAS_LOGIN();
 		$REPORT_DESC 		= fwrs_request('report_name');
 		$SERVER_ID 			= fwrs_remove_colchete($this->cube['SERVER_ID']);
 		$DATABASE_ID 		= fwrs_remove_colchete($this->cube['DATABASE_ID']);
 		$CUBE_ID 			= fwrs_remove_colchete($this->cube['CUBE_ID']);
 		$ROWS 				= $dadosJs->LAYOUT_ROWS->request;
 		$COLUMNS 			= $dadosJs->LAYOUT_COLUMNS->request;
 		$MEASURES 			= $dadosJs->LAYOUT_MEASURES->request;
 		$FILTERS 			= $dadosJs->LAYOUT_FILTERS->request;
 		$FILTERS_VALUES 	= '';
 		
 		if(trim($FILTERS)!=''){
 			$arr_filtros_sel=array();
 			$filtros	=	explode(",",$FILTERS);
 			if(count($filtros)>0){
 				foreach($filtros as $pos => $filtro){
 					if(count($dadosJs->filter_selected->full)>0){
 						$arr_filtros_sel[]=$filtro."(_,_)".$dadosJs->filter_selected->full[$pos]->data;
 					}
 				}
 				$FILTERS_VALUES = implode("(_|_)",$arr_filtros_sel);
 			}
 		}
 		
 		$ALL_ROWS 			= 0;
 		$ALL_COLS 			= 0;
 		$COLS_ORDER 		= 0;
 		$REPORT_OPTIONS 	= base64_encode(json_encode($dadosJs->KendoUi));
 		$REPORT_FORMULAS 	= '';
 		$REPORT_FILTER 		= '';
 		$REPORT_FLAG 		= '';
 		$LAYOUT_SHARE 		= '';
 		$USER_TYPE 			= $grupos;
 		$REPORT_SHARE 		= fwrs_request('report_share')=='1'?1:0;
 		$REPORT_AUTOLOAD 	= fwrs_request('report_auto')=='1'?1:0;

 		$sql = QUERY_PANEL::SAVE_SSAS_REPORT($REPORT_DESC, $SERVER_ID, $DATABASE_ID, $CUBE_ID,
                                      $ROWS, $COLUMNS, $MEASURES, $FILTERS, $FILTERS_VALUES, $ALL_ROWS, $ALL_COLS, $COLS_ORDER,
									  $REPORT_OPTIONS, $REPORT_FORMULAS, $REPORT_FILTER, $REPORT_FLAG, 
									  $LAYOUT_SHARE, $USER_TYPE, $REPORT_SHARE, $REPORT_AUTOLOAD);
		

 		$query			=	 $this->query($sql);
 		$res			=	 $this->fetch_array($query);
 		$rep_id			=	 $res['REPORT_ID'];
 		$error			=	 $res['ERROR_MESSAGE'];
 		if($rep_id=='0' || trim($error)!=''){
 			echo $error."<hr>Query: ".$sql;
 		}else{
 			$JS=<<<HTML
 		$('#myModalGenericConfig').modal('hide');		
		WRS_ALERT('Relatório salvo com sucesso','success'); 
HTML;
			echo fwrs_javascript($JS);
 		}
		exit();
		
	}

	
	
	
	public function change_query_exception($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		switch($this->event)
		{
			case 'runGrid':  return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL); break;
		}
	}
	
	
	
	
	public function change_html($html)
	{
		switch($this->event)
		{
			case 'runGrid':
				return $html; 
				break;
			default: return $html;			
		}
	}
	
	private function getQuerySelectReports(){

		$cube_id		=	fwrs_remove_colchete($this->cube['CUBE_ID']);
		$database_id	=	fwrs_remove_colchete($this->cube['DATABASE_ID']);
		
		$user			=	WRS::INFO_SSAS_LOGIN();
		
		$sql			=	$this->_query->Get_SSAS_Reports($user['CUSTOMER_ID'], $user['USER_CODE'], $user['PERFIL_ID'], $database_id, $cube_id);
		return $sql;
		
	}
		
	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		
		$sql			=	$this->getQuerySelectReports();
		
		$query			=	 $this->query($sql);
		$error			=	false;
		$last_error		=	'';
		
		if($this->num_rows($query))
		{
			
			$rows		=	 $this->fetch_array($query);
			
			if(!empty($rows['ERROR_MESSAGE']))
			{
				$last_error		=	$rows['ERROR_MESSAGE'];
				$error			=	true;
			}else{
				return WRS_MANAGE_PARAM::select($columns, $rows['TABLE_NAME'], $orderBy, $orderByPOS, $_start, $_end,$_where);
			}
			
			
		}else{
			$last_error		=	'sem resultados para a consulta: '.$sql;
			$error			=	true;
		}
		
		
		
		
		if($error)
		{
			WRS_TRACE($last_error, __LINE__, __FILE__);
			return false;
		}

	}

	
	public function openModalSave()
	{
		$dadosJs			= json_decode(base64_decode(fwrs_request('dadosJs')));
		// injeta as variaveis de ambiente (configuracao atual) no formulario para a inclusao no banco
		$JS	=	<<<HTML
		
				var input	=	 $('<input/>',{name:"dadosJs",type:'text', value:base64_encode(json_encode(getLoadReport()))}).css('display','none');
				$('#insert_report').append(input);

HTML;
		// preenche os 'grupos' do formulario com os tipos cadastrados no banco (query passada pelo facioli em 26-08-2015)
		$user			=	WRS::INFO_SSAS_LOGIN();		
		$sql			=	"select distinct USER_TYPE from ATT_WRS_USER where CUSTOMER_ID =".$user['CUSTOMER_ID'];		
		$query			=	$this->query($sql);
		$tipos=array();
		while($res			=	$this->fetch_array($query)){
			$tipos[]=$res['USER_TYPE'];
		}
		$JS2='';
		foreach($tipos as $nome){
			$JS2.= "\n$('#select2').find('.wrs-measures').append($('<option/>').html('".$nome."'));";
		}
		echo fwrs_javascript($JS);
		echo fwrs_javascript($JS2);
		
		$nome_report='';
		
		include PATH_TEMPLATE.'modal_include_report.php';
		exit();
		
	}
	
	 

	
	
}

?>