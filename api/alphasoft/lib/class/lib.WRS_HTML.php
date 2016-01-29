<?php 


class WRS_HTML
{
	
	
	
	public function __construct()
	{

		
	}
	
	
	
	/**
	 * Construção do Menu do lado esquerdo
	 * @param array $container
	 * @param array $valueShow
	 * @param string $_direira_esquerda
	 * 
	 * $valueShow limit 2 arrays
	 * 
	 * Padrão 
	 * //$container	=	 array('title'=>'Title','rowLi'=>$array{label,value})
	 * 
	 * @return string
	 */
	public function MENU_DRAG_DROP_DIREITO($pos_cube_session,$container,$valueShow,$type=NULL,$_direira_esquerda="wrs_search_drad_drop_direita")
	{
		$icon				=	'font';
		$class_to_tool_tip	=	null;
		if($type=='metrica')
		{
			$icon	=	'usd';
			$class_to_tool_tip	=	'metricas-tooltip';
		}
		
		
		$html		=	NULL;
		$WHAT_SEARCH		=	 LNG('WHAT_SEARCH');
		$liFindGroup		=	<<<EOF
							<li class="wrs_drag_direita_find" vvalue="wrs_search" >
								<div class="form-group">
									<div class="input-group ">
										<input type="text" class="form-control wrs_search_drag_drop_direita_eventos"  placeholder="{$WHAT_SEARCH}">
										<span class="input-group-addon span_sub wrs_remove_searcg_drag cursor"><i class="fa fa-search"></i><i class="fa fa-eraser"></i></span>
									</div>
								</div>
							</li>
EOF;
		
		//Ao manipular essa função lembranbdo que tem que fazer o mesmo no WRSMultipleCube.js
		$li			=	<<<EOF
								<li  	class="ui-widget-content box_wrs_panel {class} {$class_to_tool_tip}" text_original="{title}" tag-class="{class}" api="wrs" type="{type}"
										vvalue="{label}" json="{json}" wrs-data='{wrs-data}' ><span class="btn-left glyphicon glyphicon glyphicon-{$icon}"></span>{value}</li>
EOF;

		$liSearch	=	 array('{label}','{value}','{json}','{type}','{class}','{wrs-data}','{title}');
		
		$dragDrop	=	<<<EOF
			<h2 rel="{rel}">
				<a href="#">{title}</a>
			</h2>
			<div class="wrs_panel_options {rel}" >
				<ul>{liBody}</ul>
			</div>
EOF;
		$dragDropSearch		=	 array('{title}','{liBody}','{rel}');
		
		if(!is_array($container)) return  $html;
		
		
		foreach( $container as $label =>$value )
		{
				$liTemp		=	NULL;
				foreach($value as $_ilabel =>$_ivalue)
				{
					$param_json						=	$_ivalue;
					$param_json['CUBE_POS_SESSION']	=	$pos_cube_session;
					$unique_full					=	empty($param_json['LEVEL_FULL']) ? $param_json['MEASURE_UNIQUE_NAME'] : $param_json['LEVEL_FULL'];
					$class		=	fwrs_replace_attr($unique_full);
					
					$title		=	null;
					
					
					if(isset($param_json['DESCRIPTION'])){
						if(!empty($param_json['DESCRIPTION']))
						{
							$title	=	$param_json['DESCRIPTION'];
						}
					}
					
					$param_json['UNIQUE_FULL']	=	$unique_full;
					/*
					if($type=='metrica')
					{
						$title_tt[0] = '<b>Title</b><br>Nova linha com informações<br>demosntração nova linha';
						$title_tt[1] = '<b>Title ZXJHATSD</b><br>Nova linha com informações<br>demosntração nova linha<br><b>asdasasd</b>asdadasd<br>asdasd<br>';
						
						$title		=	$title_tt[rand(0,1)];
					}*/
					
					
					$lReplace	=	 array($_ivalue[$valueShow[0]],$_ivalue[$valueShow[1]],'',$type,$class,json_encode($param_json,true),$title);
					//$lReplace	=	 array($_ivalue[$valueShow[0]],$_ivalue[$valueShow[1]],base64_encode(json_encode($param_json,true)),$type,$class,json_encode($param_json,true));
					
					$liTemp		.=str_replace($liSearch, $lReplace, $li);
				}		
				//WRS_DEBUG_QUERY(print_r($param_json,true));
				
				$rel				=	fwrs_replace_attr($unique_full);
				$dragDropReplace	=	array($label,$liFindGroup.$liTemp,$rel);
				$html				.=	str_replace($dragDropSearch, $dragDropReplace, $dragDrop);
		}
		
		
		
		return $html;
	}

	
	
	
	
	
	
	
	/**
	 * Construção do menu do lado esquerdo
	 * @param array $container
	 * @return string
	 */
	public function MENU_DRAG_DROP_ESQUERDO($container)
	{

		$menu		=	<<<EOF
								<h2 vvalue="{value}">{label}</h2>
								<div class="{id}"></div>
EOF;
		$menuSearch		=	 array('{value}','{label}','{id}');
		
		$html			=	NULL;
		
		if(!is_array($container)) return  $html;
		
		foreach($container as $label =>$value)
		{
			$replace	= array($value['title'],$value['label'],$value['id']);
			$html.=str_replace($menuSearch, $replace, $menu);
		}
		
		return $html;
	}
	
	
	
	
	
	
	
	
	/**
	 * Criando a ABA auto load
	 * @param array $container
	 * @return string
	 */
	public function CREATE_ABAS()
	{
		$aba	=<<<EOF
							 <div class="WRS_ABA">
					 			<ul class="nav nav-tabs">
									 {li}
								</ul>
							 </div>
EOF;
		
		$abaSearch	=	'{li}';
		$html		=	NULL;
		

		$li		=	<<<EOF
							<li class="{active}"><a href="#">{li}<span class="icon-remove-aba glyphicon glyphicon-remove"></span></a></li>
EOF;
		$liSearch	= array('{li}','{active}');
		
		
		
		return str_replace($abaSearch, $html, $aba);
	}
	
	
	
	
	
	
	
	
}

?>