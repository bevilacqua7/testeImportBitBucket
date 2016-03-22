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
	private $current_event		= 	NULL;
	
	/**
	 * 
	 * Criando o Formulário
	 * 
	 */
	protected  function create_form($_param,$visao,$actions_fiels,$current_event)
	{
		
		$param					=	$_param;
		$this->current_event 	= 	$current_event;
		$html					=	NULL;
		
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
			
			if(array_key_exists('grid_only', $object) && $object['grid_only']==true){
				continue;
			}
			
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
				//Verificando se é key/primary com valor
				if(
						(
							(isset($param['primary']) || isset($param['key'])) && // se for primary ou key
							$param['value']!='' && // e tiver algum valor
							$this->current_event!='new' &&  // e for uma alteracao (diferente de novo)
							(!array_key_exists('disabled_edit', $param) || $param['disabled_edit']===true) // nao tenha parametro disabled_edit ou que ele seja verdadeiro (nao permita alterar na edicao)
						) || // OU
						(
							array_key_exists('disabled', $param) && // que tenha o parametro disabled e que ele seja verdadeiro (campo somente leitura)
							$param['disabled']
						)
				)
				{
					return $this->is_key_with_value($param);	
				}
				
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

				if(array_key_exists('type',$param) && $param['type']=='int')
				{
					$class =' input_type_int_only ';
				}
				
				$type_input = 'text';
				$extra_html = '';
				if(array_key_exists('type',$param) && $param['type']=='password')
				{
					$type_input ='password';
					$extra_html .='<input type="checkbox" class="show_pass_field"> '.LNG('FORM_TYPE_PASSWORD_SHOW');
					$class =' input_type_password ';
				}
				
				$classHide = (isset($param['class']) && strstr($param['class'],'hide'))?' hide':'';

				$rels		=	 array('class'=>'form-group form-control-wrs_color'.$classHide);
				$rel		=	 $this->getParamFormInput($this->merge_array_value($param,$rels));
				
				// felipeb 20160311 - por ser dinamico a montagem dos class ao inves de respeitar o padrao do form, trato o que vier antes de gravar no HTML para permitir que um campo HIDE porem com edit_new=true apareca no formulario para sua inclusao durante a criacao do registro
				if(isset($param['edit_new']) && $param['edit_new']==true && (!isset($param['value']) || $param['value']=='') && $this->current_event=='new'){
					$rel = str_replace('hide','',$rel);
				}

				$param['title_placeholder']	=(array_key_exists('placeholder', $param))?$param['placeholder']:$param['title'];
				$param['label_title']		=$param['title_placeholder'];
				
				if(array_key_exists('primary',$param) && $param['primary']=='true' && (!isset($param['value']) || $param['value']=='')){
					$extra_html .='<input type="hidden" name="novo_registro" value="1">';
				}
				
				$mask	=	"";
				if(array_key_exists('mask',$param) && $param['mask']!='')
				{
					$class.=' hasMask';
					$mask =	<<<EOF
								maskfield="{$param['mask']}" 
EOF;
				}
				
				//Verificando se é obrigatorio
				/*
				 * TODO: verificar que macumba é essa de nao reconhecer TRUE com booleano deste parametro!!! felipeb 20160301
				 */
				if(array_key_exists('obrigatorio', $param) && $param['obrigatorio']=='true' && $classHide=='')
				{
					$class.=' obrigatorio ';
					$param['title'].='  *';
					$param['label_title'].='  ('.LNG('obrigatorio').')';
				}
								
				// valores minimo e maximo se existirem
				$max_min_value='';
				$aplicou_class_min_max=false;
				if(array_key_exists('max-value', $param) && (int)$param['max-value']>0){
					$max_min_value.=" max-value='".(int)$param['max-value']."' ";
					$class.=' valida_valor';
					$aplicou_class_min_max=true;
				}
				if(array_key_exists('min-value', $param) && (int)$param['min-value']>=0){
					$max_min_value.=" min-value='".(int)$param['min-value']."' ";
					if(!$aplicou_class_min_max){
						$class.=' valida_valor';
					}
				}

				$disabled = ((array_key_exists('disabled_edit', $param) && $param['disabled_edit']===true && $this->current_event!='new') || (array_key_exists('disabled', $param) && $param['disabled']===true))?' disabled':'';
				
				$html 	=	<<<EOF
							<div  {$rel} title="{$param['label_title']}">
					    		<label for="{$param['label']}" title="{$param['label_title']}" >{$param['title']}</label>
						    	<div class="form-control-wrs" title="{$param['label_title']}">
						    		<input type="{$type_input}" {$disabled} {$max_min_value} title="{$param['label_title']}" name="{$param['label']}" {$length} {$mask} class=" {$class}" value="{$param['value']}" id="{$param['label']}" placeholder="{$param['title_placeholder']}">
						    	</div>
						    	{$extra_html}
					    	</div>
EOF;

		return $html;
		
		}
		
		
	private function select_box($param)
		{
	
					$length			=	"";
					$class			=	"";
					$param_select	=	!is_array($param['is_select'])? $this->manage_param->getMetodoTabela($param['is_select']) : '';
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
								if(array_key_exists('selected', $param) && (!array_key_exists('value', $param) || $param['value']=='')){
									$param['value'] = $param['selected'];
								}
								
								$option	.=	 fwrs_option($label, $value,$param['value']);
						}
						
					}else{

							// excecao para usuarios NAO MST ou ADM, não visualizarem usuarios maiores que eles proprios
							// felipeb 20160226
							$where_query='';
							$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
							if($param_select['table']=='ATT_WRS_USER' || $param_select['table']=='ATT_WRS_PERFIL'){
								if($perfil_logado!='MST'){									
									$where_query="PERFIL_ID != ''MST''";
								}
							}
							if($param_select['table']=='ATT_WRS_CUSTOMER'){
								$CUSTOMER_ID 			= 	WRS::CUSTOMER_ID();
								if($perfil_logado!='MST'){									
									$where_query		=	"CUSTOMER_ID = ".$CUSTOMER_ID;
								}
							}

							$obj_aux_link_field = null;
							// quando houverem filhos que dependem da escolha de valor deste pai, inclui atributos e scripts a mais. - felipeb 20160322
							if(array_key_exists('link_field_master', $param) && is_array($param['link_field_master'])){
								$obj_aux_link_field = array();
							}
							
							$_query		=	$this->manage_param->select($param_select['field'], $param_select['table'], $param_select['order']['order_by'], $param_select['order']['order_type'], 1, 100,$where_query);
							
							$query		=	 $this->query($_query);
							
							if($this->num_rows($query))
							{
								
								while($rows = $this->fetch_array($query))
								{
		
									$html_option				=	array();
									$value_option				=	$rows[$param_select['primary']];
									$extra_attr_for_values 		= 	'';
									
									// TRATAMENTO extra para quando existirem mais de uma chave para o select, bem como o possivel tratamento/validacao em outros campos dentro do formulario que dependam deste select.  Atualmente aplicado para o DATABASE_ID no cadastro de CUBOS - felipeb 20160322
									if(is_array($obj_aux_link_field)){
										$valores_preenche = $param['link_field_master']['valores'];
										$linha_comando = '';
										$extra_val_arr = array();
										if(is_array($param['link_field_master']['id'])){
											foreach($param['link_field_master']['id'] as $campo_chave){
												$extra_val_arr[$campo_chave]=$rows[$campo_chave];
												$linha_comando.= '["'.$rows[$campo_chave].'"]';
											}
										}else{
											$linha_comando.='["'.$rows[$param['link_field_master']['id']].'"]';
										}
										$arr_temp = array();
										foreach($valores_preenche as $campo1=>$campo2){
											$arr_temp[$campo1] = $rows[$campo1];
											$arr_temp[$campo2] = $rows[$campo2];
											$extra_val_arr[$campo1]=$rows[$campo1];
											$extra_val_arr[$campo2]=$rows[$campo2];
										}
										$extra_attr_for_values = base64_encode(json_encode($extra_val_arr,1));
										$comando = '$'.'obj_aux_link_field'.$linha_comando.'='.'$'.'arr_temp;';
										eval($comando);
									}

									if(isset($param['select_fields_in_table']) && is_array($param['select_fields_in_table']))
									{
										
										foreach($param['select_fields_in_table'] as $label)
										{
											if($param_select['primary']!=$label){
												$html_option[]	=	$rows[$label];
											}
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
									
									$extra_attr_for_values = $extra_attr_for_values!=''?' extra_values_for_option="'.$extra_attr_for_values.'"':'';
									
									$option	.=	 fwrs_option($value_option, implode(' - ',$html_option),$param['value'],$extra_attr_for_values);
								}
							}
					}
					

					//Verificando se é obrigatorio
					$param['title_placeholder']=$param['title'];
					$param['label_title']		=$param['title'];
					
					if(array_key_exists('obrigatorio', $param) && $param['obrigatorio']=='true')
					{
						$class.=' obrigatorio ';
						$param['title'].='  *';
						$param['label_title'].='  ('.LNG('obrigatorio').')';
					}

					$complemento_link_field = (is_array($obj_aux_link_field) && count($obj_aux_link_field)>0)?json_encode($obj_aux_link_field,1):'';
					$disabled 				= ((array_key_exists('disabled_edit', $param) && $param['disabled_edit']===true && $this->current_event!='new') || (array_key_exists('disabled', $param) && $param['disabled']===true))?' disabled':'';

					if($complemento_link_field!=''){
						$complemento_link_field = "<script> atualiza_link_field_master($('#".$param['label']."'),".$complemento_link_field."); </script>";
					}
					
					$html 	=	<<<EOF
								<div  {$rel}  title="{$param['label_title']}">
						    		<label for="{$param['label']}"  title="{$param['label_title']}" >{$param['title']}</label>
							    	<div class="form-control-wrs" title="{$param['label_title']}" >
							    		<select name="{$param['label']}" title="{$param['label_title']}" {$disabled} {$length} class=" {$class}" id="{$param['label']}" placeholder="{$param['title']}">
							    		{$option}
							    		</select>
							    	</div>
							    	{$complemento_link_field}
						    	</div>
EOF;
	
			return $html;
			
			}
 
	 
	
		private function is_key_with_value($param)
		{

			$rels				=	 array('class'=>'form-group form-control-wrs_color');
			$rel				=	 $this->getParamFormInput($this->merge_array_value($param,$rels));
			$html 	=	<<<EOF
								<div  {$rel}>
						    		<label for="{$param['label']}"  >{$param['title']}</label>
							    	<div class="form-control-wrs">
							    		<div class="h4">{$param['value']}</div>
							    		<input type="hidden" name="{$param['label']}" value="{$param['value']}" id="{$param['label']}">
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
				if(is_array($value)){
					$value = base64_encode(json_encode($value,1));
				}
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