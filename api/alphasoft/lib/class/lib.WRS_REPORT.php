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
includeQUERY('ReportLayout');
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
	/**
	 * 
	 * @var QUERY_WRS_LAYOUT
	 */
	private $_query_layout	=	NULL;
	
	public function run($event,$paran_query,$cube_s)
	{		
		$this->event		=	empty($event)?fwrs_request('event'):$event;
		$this->paran_query	=	$paran_query;
		$cube_s				=	empty($cube_s)?fwrs_request('cube_s'):$cube_s;
		
		$cubes				=	WRS::GET_SSAS_USER();
		$this->cube			=	$cubes[$cube_s];
		$this->_query		=	new QUERY_WRS_REPORT();
		$this->_query_layout=	new QUERY_ReportLayout();

		if(!empty($this->event))
		{
			switch ($this->event)
			{
				case 'openModalSave' 	: 	return $this->openModalSave(); break;
				case 'save' 			: 	return $this->save(); break;
				case 'delete' 			: 	return $this->delete(); break;
				case 'csv_zip'			:	return $this->csv_zip(); break;
				
			}
		}
	}
	
	
	
	/**
	 * Gerando o CSV e o ZIP e depois inicia o download
	 * modeo de chamada 
	 * run.php?file=WRS_REPORT&class=WRS_REPORT&event=csv_zip&table=_MDX_D1AAEF9AB22344D7AE435E0F13F37580_F&zip=name_zip&csv=name_csv
	 * 
	 */
	
	private function csv_zip()
	{
		$info_table		=	  array(
										'table',	//Nome da tabela
										'title',	//TITLE
										'error',
										'report_id'
									);

		$param			=	fwrs_request($info_table);
		$ini			=	WRS_INI::WRS_DEFINE();
		
		
		
		$info_user		=	array(
							'db'		=>	array(	
														'path'	=>	$ini['PATH_DB_CSV_ZIP']				, 
														'ds' 	=>	$ini['DB_DIRECTORY_SEPARATOR']
													),
							'user'		=>	array(	
														'path'		=>	'', 
														'ds'		=>	DS, 
														'user_id'	=>	WRS::USER_ID())
							
		);
		
		
		
		
		
		header('Content-Type: application/json');
		
		
		if(empty($param['table']) ||empty($param['title']))
		{
			$param['error']				=	 LNG('CSV_ERROR_TABLE_EMPTY');
		}else{
		
			$info_user['user']['path']		=	str_replace(
															$info_user['db']['ds'], 
															$info_user['user']['ds'], 
															$info_user['db']['path']
														);
			
			
			
			//Cria a pasta files
			if(!is_dir($info_user['user']['path']))
			{
				mkdir($info_user['user']['path'], 0700);
			}
			
			
			
			$directory	=	$info_user['user']['path'].$info_user['user']['user_id'];
			
			//Criando a pasta do usuário
			if(!is_dir($directory)) 
			{
					mkdir($directory, 0700);
			}
			
			//Atualza o usuário com o novo diretório atualizado
			$info_user['user']['path']		=	$directory.DS;
			
			$name_zip						=	$info_user['user']['path'].$param['title'].'.zip';
			$name_csv						=	$info_user['user']['path'].$param['title'].'.csv';
			
			
			//Removendo os arquivo remanecentes
			if(file_exists($name_zip))  unlink($name_zip);
			
			if(file_exists($name_csv))  unlink($name_csv);
				
			$path_db_csv	=	str_replace(DS, $info_user['db']['ds'], $name_csv);
			$path_db_zip	=	str_replace(DS, $info_user['db']['ds'], $name_zip);
			

			$query_genretare	=	$this->query($this->_query->csv_generate($param['table'], $path_db_csv));

			
			if(file_exists($name_csv))
			{
					
				$this->query($this->_query->zip_generate($path_db_csv, $path_db_zip));
				
				if(file_exists($name_zip))
				{
					//Permite o Download do ZIP
					$param['download']	=	str_replace(DS,'/',str_replace(PATH_MAIN, '', $name_zip));
				}else{
					$param['error']		=LNG('CSV_NOT_GENERATE');
				}
			}else{
				$param['error']		=LNG('CSV_NOT_GENERATE');
			}
		}
		

		
		 echo json_encode($param,true);
		 
	}
	

	public function delete(){
		$user			=	WRS::INFO_SSAS_LOGIN();		
		$arr_report_id	=	json_decode(fwrs_request('report_id'));
		$retorno_del	=	array();
		if(is_array($arr_report_id) && count($arr_report_id)>0){
			foreach($arr_report_id as $report_id){
				$sql			=	QUERY_PANEL::REMOVE_SSAS_REPORT( $report_id, $user['PERFIL_ID'] );
		 		$query			=	$this->query($sql);
			}
			$retorno_del['relatorios_apagados']		= 	count($arr_report_id);
		}
		echo json_encode($retorno_del);
	}
	
	public function save()
	{

		$layouts 			= fwrs_request('layouts');
		$grupos 			= fwrs_request('grupos');		
		$dadosJs			= json_decode(fwrs_utf8e(base64_decode(fwrs_request('dadosJs'))));
		
		 
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
 		 		
		/*
		 * TODO:Felipe refazer tem que receber com a formatação já pronta
		 * PReste atenção quando for a formatação de negação (~) que não pode esá filtado 
		 */
 		
 		if(trim($FILTERS)!='')
 		{
 			$arr_filtros_sel	=	array();
 			$filtros			=	explode(",",$FILTERS);

 			if(count($filtros)>0)
 			{
 				foreach($filtros as $pos => $filtro)
 				{
 					if(count($dadosJs->filter_selected->full)>0 && trim($dadosJs->filter_selected->full[$pos]->data)!='')
 					{
 						$_filtro	=	$filtro;
 						
 						//substr($d, 1, strlen($d))
 						
 						if(substr($_filtro, 0,1)==PARAMETERS_SEPARATORS('negacao') ||
 							substr($_filtro, 0,1)==PARAMETERS_SEPARATORS('simples')) $_filtro	=	substr($_filtro, 1, strlen($_filtro));
 						
 						$arr_filtros_sel[]	=	$_filtro.PARAMETERS_SEPARATORS('vir').$dadosJs->filter_selected->full[$pos]->data;
 					}
 				}
 				
 				$FILTERS_VALUES = implode(PARAMETERS_SEPARATORS('pipe'),$arr_filtros_sel);
 				
 			}
 		} 		
		
 		
 		$ALL_ROWS 			= ($dadosJs->KendoUi->ALL_ROWS=="1")?1:0;
 		$ALL_COLS 			= ($dadosJs->KendoUi->ALL_COLS=="1")?1:0;
 		$COLS_ORDER 		= $dadosJs->KendoUi->ORDER_COLUMN;
 		 		 		
 		$REPORT_FORMULAS 	= '';
 		$REPORT_FILTER 		= '';
 		$REPORT_FLAG 		= '';
 		$LAYOUT_SHARE 		= (is_array($layouts)?implode(PARAMETERS_SEPARATORS('vir'),$layouts):$layouts); 
 		$USER_TYPE 			= (is_array($grupos)?implode(PARAMETERS_SEPARATORS('vir'),$grupos):$grupos);
 		$REPORT_SHARE 		= fwrs_request('report_share')=='1'?1:0;
 		$REPORT_AUTOLOAD 	= fwrs_request('report_auto')=='1'?1:0;
 		
 		// limpando variaveis redundantes de dentro do objeto dadosJS (report_options)
 		// sao recriados novamente em: templateReport.js:229 - 20151026
 		unset($dadosJs->filter_selected);
 		unset($dadosJs->LAYOUT_ROWS);
 		unset($dadosJs->LAYOUT_COLUMNS);
 		unset($dadosJs->LAYOUT_MEASURES);
 		unset($dadosJs->LAYOUT_FILTERS);
 		unset($dadosJs->KendoUi->REPORT_SHARE);
 		unset($dadosJs->KendoUi->REPORT_AUTOLOAD);
 		unset($dadosJs->KendoUi->FILTER_TMP);
 		unset($dadosJs->KendoUi->REPORT_DESC);
 		// elimina tambem NOME E ID para evitar duplicidade ao abrir relatorio
 		unset($dadosJs->KendoUi->TITLE_ABA);
 		unset($dadosJs->KendoUi->REPORT_ID);
 		// elimina informacoes de layouts indexadas
 		unset($dadosJs->KendoUi->LAYOUT_ROWS);
 		unset($dadosJs->KendoUi->LAYOUT_COLUMNS);
 		unset($dadosJs->KendoUi->LAYOUT_MEASURES);
 		unset($dadosJs->KendoUi->LAYOUT_FILTERS);
 		// posicoes que existem na tabela separadamente mas nao retornam na consulta, assim, não são retirados e nem recriados	
 		//unset($dadosJs->KendoUi->ALL_ROWS);
 		//unset($dadosJs->KendoUi->ALL_COLS);
 		//unset($dadosJs->KendoUi->ORDER_COLUMN);
 		
 		$REPORT_OPTIONS 	= base64_encode(json_encode($dadosJs->KendoUi,true));
 		
 		
 		$sql = QUERY_PANEL::SAVE_SSAS_REPORT(	$REPORT_DESC, 
 												$SERVER_ID, 
 												$DATABASE_ID, 
								 				$CUBE_ID,
								                $ROWS, 
								 				$COLUMNS, 
								 				$MEASURES, 
								 				$FILTERS, 
								 				$FILTERS_VALUES, 
								 				$ALL_ROWS, 
								 				$ALL_COLS, 
								 				$COLS_ORDER,
												$REPORT_OPTIONS, 
								 				$REPORT_FORMULAS, 
								 				$REPORT_FILTER, 
								 				$REPORT_FLAG, 
												$LAYOUT_SHARE, 
								 				$USER_TYPE, 
								 				$REPORT_SHARE, 
								 				$REPORT_AUTOLOAD);
		
 		$query			=	 $this->query($sql);
 		$res			=	 $this->fetch_array($query);
 		$rep_id			=	 $res['REPORT_ID'];
 		$error			=	 $res['ERROR_MESSAGE'];
 		

 		
 		if(!empty($res['ERROR_MESSAGE']))
 		{
 			
 		$DATA_BASE_ERROR		=	 LNG('DATA_BASE_ERROR');	
 		$msg		=	$DATA_BASE_ERROR.$res['ERROR_MESSAGE'];
 		
 		$JS=<<<HTML
	 		$('#myModalGenericConfig').modal('hide');
	 		atualiza_id_aba_ativa({$rep_id});
			WRS_ALERT('{$msg}','error'); 
HTML;
			echo fwrs_javascript($JS);
 		
 			exit();
 		}
 		
 		if($rep_id=='0' || trim($error)!='')
 		{
 			echo $error."<hr>Query: ".$sql;
 			
 		}else{
 			$JS=<<<HTML
 		$('#myModalGenericConfig').modal('hide');
 		atualiza_id_aba_ativa({$rep_id});
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
			case 'runGrid':  return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where); break;
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
	
		
		$sql			=	QUERY_PANEL::GET_SSAS_REPORT($database_id, $cube_id, 1);
	
		return $sql;
	
	}
	
	private function getQueryLayouts(){
		
		$sql	=	$this->_query_layout->Get_SSAS_Layouts(WRS::CUSTOMER_ID(), WRS::USER_CODE(), $this->cube['DATABASE_ID'], $this->cube['CUBE_ID'],0,0);
		return $sql;
		
	}
	
	private function getLayoutListObjects(){
		$query	=	$this->query($this->getQueryLayouts());
		
		if(!$this->num_rows($query)) return NULL;
		
	
		$_result		=	 $query;
		$array_result	=	array();
		if($this->num_rows($_result)>0){
			while($res = $this->fetch_array($_result)){
				$array_result[]=$res;
			}
			return $array_result;
		}else{
			return false;
		}
		
	}
		
	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		
		$sql			=	$this->getQuerySelectReports();
		
		
		
		if(empty($sql))
		{
			$last_error		=	LNG('NO_RESULTS_QUERY').$sql;
			$error			=	true;
		}else{
			
			
			
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
					return WRS_MANAGE_PARAM::select('*', $rows['TABLE_NAME'], $orderBy, $orderByPOS, $_start, $_end,$_where);
				}
				
				
			}else{
				$last_error		=	LNG('NO_RESULTS_QUERY').$sql;
				$error			=	true;
			}
		}
		
		
		
		
		if($error)
		{
			WRS_TRACE($last_error, __LINE__, __FILE__);
			return false;
		}

	}

	
	public function openModalSave()
	{
		$dadosJs			= 	json_decode(base64_decode(fwrs_request('dadosJs')));
		$nome_report		=	'report_name';		
		
		// injeta as variaveis de ambiente (configuracao atual) no formulario para a inclusao no banco
		$EXTRA_SCRIPT	=	<<<HTML
				var reportAtual = getLoadReport();
				WRS_CONSOLE('atual',reportAtual);
				var input	=	 $('<input/>',{name:"dadosJs",type:'hidden', value:base64_encode(json_encode(reportAtual))}).css('display','none');
				$('#insert_report').append(input);
				$('#report_name').val(reportAtual.KendoUi.TITLE_ABA); // preenche com o nome atual vindo do JS
				$('#report_auto').prop( "checked", ((reportAtual.KendoUi.REPORT_AUTOLOAD==1)?true:false) );
				$('#report_share').prop( "checked", ((reportAtual.KendoUi.REPORT_SHARE==1)?true:false) );
				// nao retorno os grupos selecionados pois o mesmo nao retorna na query nem no objeto reportAtual ainda
				select_work($('#select1'));
				select_work($('#select2'));
HTML;
		
		$combo	 		= 	<<<COMBO
				<option value="%VAL%" %SEL%>%LAB%</option>
COMBO;
	
		// preenche os 'grupos' do formulario com os tipos cadastrados no banco (query passada pelo facioli em 26-08-2015)
		$user				=	WRS::INFO_SSAS_LOGIN();		
		$sql				=	$this->_query->Get_SSAS_Reports_Groups($user['CUSTOMER_ID']);
		$query				=	$this->query($sql);
		$tipos				=	array();
		$combo_grupos		=	'';
		$combo_grupos_sel	=	'';
		/*
		 * TODO: preencher os selecionados
		 */
		if($this->num_rows($query)>0){
			while($res			=	$this->fetch_array($query)){
				$combo_grupos.=str_replace(array('%VAL%','%SEL%','%LAB%'),array($res['USER_TYPE'],'',$res['USER_TYPE']),$combo);
			}
		}

		// preenche os 'layouts' do formulario com os tipos cadastrados no banco (query extraida da tela de layouts que ja existe)		
		$listaLayouts 		= 	$this->getLayoutListObjects();
		$combo_layouts		=	'';
		$combo_layouts_sel	=	'';
		if($listaLayouts){
			foreach($listaLayouts as $objLayout){				
				if($objLayout['LAYOUT_SHARE']!='1'){			
					if($objLayout['REPORT_ID']=='1'){
						$combo_layouts_sel.=str_replace(array('%VAL%','%SEL%','%LAB%'),array($objLayout['LAYOUT_ID'],'',$objLayout['LAYOUT_DESC']),$combo);
					}else{
						$combo_layouts.=str_replace(array('%VAL%','%SEL%','%LAB%'),array($objLayout['LAYOUT_ID'],'',$objLayout['LAYOUT_DESC']),$combo);
					}
				}
			}
		}
		
		include PATH_TEMPLATE.'modal_include_report.php';		
		echo $HTML;
		
	}
	
	
}

?>