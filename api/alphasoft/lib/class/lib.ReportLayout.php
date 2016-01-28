<?php 

 
/**
 * é chamado pelo javascript  controllers_layout
 */


includeQUERY('ReportLayout');
includeCLASS('WRS_USER');
includeQUERY('WRS_MANAGE_PARAM');
 
class ReportLayout extends WRS_USER
{

	/**
	 * contem as querys
	 * @var QUERY_ReportLayout
	 */
	private $_query			=	null;
	private $paran_query	=	NULL;
	private $cube			=	array();
	
	
	public function run($_event,$paran_query,$cube_s)
	{
		$event					=	empty($_event)?fwrs_request('event'):$_event;
		
		if($_event)
		{
			$this->paran_query		=	$paran_query;
			$cube_s					=	empty($cube_s)?fwrs_request('cube_s'):$cube_s;
			
			$cubes					=	WRS::GET_SSAS_USER();
			$this->cube				=	$cubes[$cube_s];

		}else{
			$cubes					=	WRS::GET_SSAS_USER();
			$this->cube				=	$cubes[fwrs_request('cube_s')];
		}
		
		$this->_query			=	 new QUERY_ReportLayout();
		
		
		switch($event)
		{
			//chamado pelo evento controllers_layout
			case 'layout_form_htm' 		:  	$this->layout_form_htm(); 	break;
			case 'layout_form_save'		:	$this->layout_form_save(); 	break;
			case 'layout_form_remove'	:	$this->layout_form_remove(); 	break;
			case 'layout_options_load'	:	$this->layout_options_load(); break;
		
			case 'runGrid'				:	$this->runGrid();
			
		}
		
	}
	
	
	private function layout_form_save()
	{
		header('Content-Type: application/json');
		
		$options		=	 array(
									'cube_s',			//sessão cubo
									'LAYOUT_DESC',		//input
									'LAYOUT_ALIAS',		//input
									'USER_CODE',		//local
									'SERVER_ID',		//local
									'DATABASE_ID',		//local
									'CUBE_ID',			//local
									'ROWS',				//base64
									'COLUMNS',			//base64
									'MEASURES',			//base64
									'LAYOUT_FLAG',		//sem uso no momento
									'LAYOUT_SHARE' 		//input
								);
		
		
		$parameter		=	 fwrs_request($options);
		
		$parameter['ROWS']			=	 base64_decode($parameter['ROWS']);
		$parameter['MEASURES']		=	 base64_decode($parameter['MEASURES']);
		$parameter['COLUMNS']		=	 base64_decode($parameter['COLUMNS']);
		
		
		$parameter['USER_CODE']		=	WRS::USER_CODE();
		$parameter['SERVER_ID']		=	$this->cube['SERVER_ID'];
		$parameter['DATABASE_ID']	=	$this->cube['DATABASE_ID'];
		$parameter['CUBE_ID']		=	$this->cube['CUBE_ID'];

		
		$_query		=	$this->_query->Save_SSAS_Layout(
											$parameter['LAYOUT_DESC'], 
											$parameter['LAYOUT_ALIAS'], 
											$parameter['USER_CODE'],
											$parameter['SERVER_ID'], 
											$parameter['DATABASE_ID'], 
											$parameter['CUBE_ID'], 
											$parameter['ROWS'], 
											$parameter['COLUMNS'], 
											$parameter['MEASURES'], 
											$parameter['LAYOUT_FLAG'], 
											$parameter['LAYOUT_SHARE']
										);
		
		
		
		
		$mensagems		=	array('mensagem'=>LNG('tpl_layout_error'), 'type'=>'error');
		
		if($this->query($_query))
		{
			$mensagems['mensagem']	=	LNG('tpl_layout_sucess');
			$mensagems['type']		=	'success';
		}
		
		
		echo json_encode($mensagems);

	}
	
	
	private function layout_form_remove()
	{
		header('Content-Type: application/json');
		
		$user			=	WRS::INFO_SSAS_LOGIN();
		$remove			=	 json_decode(fwrs_request('remove'));	
		$flag_error		=	false;
		$mensagems		=	array('mensagem'=>LNG('tpl_layout_remove_error'), 'type'=>'error');
		
		$qq=array();

		if(!empty($remove))
		{
			foreach($remove as $value)
			{
				$query	=	$this->_query->Remove_SSAS_Layout($value, WRS::USER_CODE(), $user['PERFIL_ID']);
				
				if(!$this->query($query))
				{
					$flag_error=true;
				}
			}
		}
		
		
		
		if($flag_error==false)
		{
			$mensagems['mensagem']	=	LNG('tpl_layout_remove_sucess');
			$mensagems['type']		=	'success';
		}
		
		
		
		
		echo json_encode($mensagems);
		
	}
	
	
	
	
	
	
	
	private function layout_options_load()
	{
		$parameter								=	 array();
		$parameter['BTN_SAVE']					=	LNG('BTN_SAVE');
		$parameter['BTN_SAIR']					=	LNG('BTN_SAIR');
		
		$parameter['tpl_layout_title'] 			= LNG('tpl_layout_title');
		$parameter['tpl_layout_name'] 			= LNG('tpl_layout_name');
		$parameter['tpl_layout_alias'] 			= LNG('tpl_layout_alias');
		$parameter['tpl_layout_share'] 			= LNG('tpl_layout_share');
		
		$parameter['ATTRIBUTOS_METRICA'] 		= LNG('ATTRIBUTOS_METRICA');
		$parameter['ATTRIBUTOS_LINHA'] 			= LNG('ATTRIBUTOS_LINHA');
		$parameter['ATTRIBUTOS_COLUNA'] 		= LNG('ATTRIBUTOS_COLUNA');
		
		
		
		
		$query	=	$this->_query->Get_SSAS_Layouts(WRS::CUSTOMER_ID(), WRS::USER_CODE(), $this->cube['DATABASE_ID'], $this->cube['CUBE_ID']);
		$query	=	 $this->query($query);
		
		if(!$this->num_rows($query)) return NULL;
		
		$name_column	=	 $this->fetch_array($query);
		
		$_select		=	'SELECT * FROM '.$name_column['TABLE_NAME'];
		
		$_select		=	 $this->query($_select);
		$option			=	'<option value="{label}" >{value}</option>'.PHP_EOL;
		$option_array	=	array('{label}','{value}');
		
		
		$parameter['ATTRIBUTOS_LINHA_OPTIONS']		=	'<option value="" >'.LNG('tpl_layout_options_default').'</option>';
		$parameter['ATTRIBUTOS_METRICA_OPTIONS']	=	'<option value="" >'.LNG('tpl_layout_options_default').'</option>';
		$parameter['ATTRIBUTOS_COLUNA_OPTIONS']		=	'<option value="" >'.LNG('tpl_layout_options_default').'</option>';
		
		if($this->num_rows($_select))
		{
			
			while($row = $this->fetch_array($_select))
			{
				$lRows		=	$row['LAYOUT_ROWS'];
				$lColumns	=	$row['LAYOUT_COLUMNS'];
				$lMeasure	=	$row['LAYOUT_MEASURES'];
				

				if(!empty($lRows))
				{
					$parameter['ATTRIBUTOS_LINHA_OPTIONS'].=str_replace($option_array, array($lRows, $row['LAYOUT_ALIAS']), $option);
				}
				
				if(!empty($lColumns))
				{
					$parameter['ATTRIBUTOS_COLUNA_OPTIONS'].=str_replace($option_array, array($lColumns, $row['LAYOUT_ALIAS']), $option);
				}
				
				if(!empty($lMeasure))
				{
					$parameter['ATTRIBUTOS_METRICA_OPTIONS'].=str_replace($option_array, array($lMeasure, $row['LAYOUT_ALIAS']), $option);
				}
				

			}
			
		}
		
		

		includeTemplate('layout_options', $parameter);
		
	}
	
	
	
	
	
	
	
	
	
	
	private function layout_form_htm()
	{
		$parameter								=	 array();
		$parameter['BTN_SAVE']					=	LNG('BTN_SAVE');
		$parameter['BTN_SAIR']					=	LNG('BTN_SAIR');
		
		$parameter['tpl_layout_title'] 			= LNG('tpl_layout_title');
		$parameter['tpl_layout_name'] 			= LNG('tpl_layout_name');
		$parameter['tpl_layout_alias'] 			= LNG('tpl_layout_alias');
		$parameter['tpl_layout_share'] 			= LNG('tpl_layout_share');
		
		includeTemplate('layout_save', $parameter);
		
	}
	
	
	
	
	
	
	
	
	
	
	//Processando eventos do GRID modal 
	
	
	public function change_query_exception($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		return $this->runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	private function runGrid($table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
	
		$query	=	$this->_query->Get_SSAS_Layouts(WRS::CUSTOMER_ID(), WRS::USER_CODE(), $this->cube['DATABASE_ID'], $this->cube['CUBE_ID']);
		$query	=	 $this->query($query);

		if(!$this->num_rows($query)) return NULL;
		
		$name_column	=	 $this->fetch_array($query);
		
		return WRS_MANAGE_PARAM::select('*', $name_column['TABLE_NAME'], $orderBy, $orderByPOS, $_start, $_end,$_where);
		
		
	}
	
	
	
}

?>