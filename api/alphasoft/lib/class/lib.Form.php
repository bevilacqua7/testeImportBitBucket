<?php 
/**
 * Criando Formulário
 * 
 */

includeQUERY('WRS_MANAGE_PARAM');
includeCLASS('WRS_USER');


	
class FORM  extends WRS_USER
{
 
	/**
	 * 
	 * Enter description here ...
	 * @var WRS_MANAGE_PARAM
	 */
	protected  $manage_param	=	NULL;
	private $obj_atual 			= 	NULL;
	
	/**
	 * 
	 * Criando o Formulário
	 * 
	 */
	protected  function create_form($_param,$visao,$actions_fiels)
	{
		

		$param				=	$_param;
				
		$html				=	NULL;
		
		if(!array_key_exists('button', $param) || !is_array($param['button']) || count($param['button'])<=0){
			$param['button']	=	array('new'=>'','remove'=>'');
		}
		
		$event_form			=	fwrs_request('form_event');
		$exec_action		=	'';
		
		$primary_number		=	 fwrs_request($param['primary']);
		$rows_select		=	 NULL;
		
		
		
		//Caso a opção do select seja vazio
		if(empty($event_form))
		{
			if(!empty($primary_number))
			{
				$where			=	$param['primary']."=''".$primary_number."''";	
				$_query			=	$this->manage_param->select($param['field'], $param['table'], $param['order']['order_by'], $param['order']['order_type'], 1, 1,$where);
				$_query			=	$this->query($_query);
				
				if($this->num_rows($_query))
				{
					$rows_select	=	 $this->fetch_array($_query);
				}
			}
		}

		$this->obj_atual	=	array('table'=>$param['table'],'id'=>$rows_select[$param['primary']]);
		
		foreach($param['field'] as $label =>$tools)
		{
			$object								=	 $tools;
						
			$object['title']					=	$tools['title'];
			$object['label']					=	$label;
			$object['length']					=	(isset($tools['length']))?$tools['length']:'';
			$object['value']					=	fwrs_request($label);
			
			$param['field'][$label]['value']	=	$object['value']	=	fwrs_request($label);
			
			if(!empty($rows_select))
			{
				if(isset($rows_select[$label]))
				{
					if(isset($rows_select[$label])){
						
						//VErifica se existe correções
						if(isset($tools['type_convert']))
						{
							$rows_select[$label]	=	 $this->type_convert($tools['type_convert'],$rows_select[$label],$tools);
						}
						
						$param['field'][$label]['value']	=	$object['value']	=	$rows_select[$label];
					}					 
				}
			}

			$html.=$this->input($object);
		}
		
		if(!empty($event_form))
		{
			$exec_action	=	$this->exec_action_form($param,$event_form);
		//	$exec_action	=	$exec_action;//.'<pre>'.print_r($_REQUEST,true).'</pre>';
		}
		
		
		$form			=	'<form class="grid_window_values_form">{form}</form>';
		//$param['html']	=	$exec_action.str_replace('{form}', $html, $form);
		$param['html']	=	str_replace('{form}', $html, $form);
		
		return $param;
	}
	
	
	
	protected  function type_convert($type,$data,$tools,$acion='get')
	{
		if(empty($data)) return '';
		
		switch($type)
		{
			case 'date_object' : {
					return $data->format($tools['format']);
			}; break;
			
		}
	}

	private function exec_action_form($param,$event)
	{
			$form_value		=	array();	
			
			foreach($param['field'] as $label =>$value)
			{
				$form_value[]	=	$label."='".$value['value']."'";
			}
			
			$query_data		=	implode(',',$form_value);
			
			/* -- deve estar depreciado, variavel $event_form nao existe neste contexto - felipeb 20160118
			switch($event_form)
			{
				case 'new' 		: {}	;	break;
				case 'update' 	: {} 	; 	break;
				case 'remove' 	: {} 	;	break;
			}			*/
			
			return $query_data;
			
	}
	
		
	private function input($param)
	{
		
				//Verificando se é select
				if(isset($param['is_select']))
				{
					return $this->select_box($param);	
				}
				
				//Verificando se é upload
				if(isset($param['is_upload']))
				{
					return $this->upload_field($param);	
				}
				
				$length	=	"";
				$class	=	"";
				if(!empty($param['length']))
				{
					$length	=	<<<EOF
								maxlength="{$param['length']}" size="{$param['length']}"
EOF;
				}
	
				if($param['length']>80)
				{
					$class ='form-control-wrs-auto';
				}
				
				$rels		=	 array('class'=>'form-group form-control-wrs_color');
				$rel		=	 $this->getParamFormInput($this->merge_array_value($param,$rels));
				
				$html 	=	<<<EOF
							<div  {$rel}>
					    		<label for="{$param['label']}"  >{$param['title']}</label>
						    	<div class="form-control-wrs">
						    		<input type="text" name="{$param['label']}" {$length} class=" {$class}" value="{$param['value']}" id="{$param['label']}" placeholder="{$param['title']}">
						    	</div>
					    	</div>
EOF;

		return $html;
		
		}
		
		
	private function select_box($param)
		{
	
					$length			=	"";
					$class			=	"";
					$param_select	=	!is_array($param['is_select'])? $this->manage_param->$param['is_select']() : '';
					$where			=	$param['value'];
					$option			=	'';
					if(!empty($param['length']))
					{
						$length	=	<<<EOF
									maxlength="{$param['length']}" 
EOF;
					}
					
					if($param['length']>80)
					{
						$class ='form-control-wrs-auto';
					}
					
					$rels		=	 array('class'=>'form-group form-control-wrs_color');
					$rel		=	 $this->getParamFormInput($this->merge_array_value($param,$rels));
					
					
					
					
					//$where	=	$param_select['primary']="=''".$param['value']."''";
					if(is_array($param['is_select']))
					{
						
						foreach($param['is_select'] as $label =>$value)
						{
								$option	.=	 fwrs_option($label, $value,$param['value']);
						}
						
					}else{
							$_query		=	$this->manage_param->select($param_select['field'], $param_select['table'], $param_select['order']['order_by'], $param_select['order']['order_type'], 1, 100);
							$query		=	 $this->query($_query);
							
							if($this->num_rows($query))
							{
								
								while($rows = $this->fetch_array($query))
								{
		
									$html_option		=	 array();
									$value_option		=	$rows[$param_select['primary']];
									

									if(isset($param['select_fields_in_table']) && is_array($param['select_fields_in_table']))
									{
										
										foreach($param['select_fields_in_table'] as $label)
										{
											$html_option[]	=	$rows[$label];
										}
										
									}else{
										
										foreach($param_select['field'] as $label =>$value)
										{
											if(isset($value['select']))
											{
												$html_option[]	=	$rows[$label];
											}
										}
										
									}
									
									$option	.=	 fwrs_option($value_option, implode(' - ',$html_option),$param['value']);
								}
								//$option
								
							}else{
								
							}
					}
					//$param['value']
					
					$html 	=	<<<EOF
								<div  {$rel}>
						    		<label for="{$param['label']}"  >{$param['title']}</label>
							    	<div class="form-control-wrs">
							    		<select name="{$param['label']}" {$length} class=" {$class}" id="{$param['label']}" placeholder="{$param['title']}">
							    		{$option}
							    		</select>
							    	</div>
						    	</div>
EOF;
	
			return $html;
			
			}
 
	 
	
		private function upload_field($param,$_extra_params=NULL)
		{
			includeCLASS('Upload');
			
			$rels				=	 array('class'=>'form-group form-control-wrs_color');
			$rel				=	 $this->getParamFormInput($this->merge_array_value($param,$rels));

			$upload_dir_key 	= 	array($this->obj_atual['table'],$this->obj_atual['id'],$param['label']); // chave consiste em usuario logado + formulario em questao (ex. ATT_WRS_USER) + valor da chave da tabela (ex. USER_ID = 3)
			$extra_params		=	array(
					'autoUpload'		=> 	true,
					//'acceptFileTypes'	=>	"/(\.|\/)(gif|jpe?g|png)$/i",
					'maxFileSize'		=> 	3000000, // 3 MB,
					'maxNumberOfFiles'	=> 	1,
					'botao_selecionar'	=>	true,
					'botao_enviar'		=>	false,
					'botao_cancelar'	=>	false,
					'botao_apagar'		=>	false,
					'barra_status'		=>	false
			);
			
			if($_extra_params!=NULL && is_array($_extra_params)){
				$extra_params = $_extra_params + $extra_params;
			}
			
			$upload				=	new WRSUpload($upload_dir_key,$extra_params);
			$htmlUpload			=	$upload->uploadHTML();			

			$html 				=	<<<EOF
											<div  {$rel}>
									    		<label for="{$param['label']}"  >{$param['title']}</label>
										    	<div class="">
													{$htmlUpload}
												</div>
									    	</div>
EOF;
	
			return $html;
			
		}
 
	 
	
		private function getParamFormInput($param)
		{
			$html		=	"";
			foreach($param as $label =>$value){
				$html.=' '.$label.'="'.$value.'" ';
			}
			return $html;
		}
	
		
		private function merge_array_value($array,$array_merge)
		{
			$_tmp		=	 $array;
			
			foreach($array_merge as $label =>$value)
			{
				if(isset($_tmp[$label]))
				{
					$_tmp[$label]	=	$_tmp[$label].' '.$value;
				}
				else
				{
					$_tmp[$label]	=	$value;
				}
			}
			
			
			return $_tmp;
		}
	
		
		
		
		
		
	
	
	
	
	
	
	
}

?>