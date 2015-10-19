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
		$icon		=	'font';
		
		if($type=='metrica'){
			$icon	=	'usd';
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
								<li  	class="ui-widget-content box_wrs_panel {class}" tag-class="{class}" api="wrs" type="{type}"
										vvalue="{label}" json="{json}"><span class="btn-left glyphicon glyphicon glyphicon-{$icon}"></span>{value}</li>
EOF;

		$liSearch	=	 array('{label}','{value}','{json}','{type}','{class}');
		
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
					
					$class		=	fwrs_replace_attr(empty($param_json['LEVEL_FULL']) ? $param_json['MEASURE_UNIQUE_NAME'] : $param_json['LEVEL_FULL']);
					$lReplace	=	 array($_ivalue[$valueShow[0]],$_ivalue[$valueShow[1]],base64_encode(json_encode($param_json,true)),$type,$class);
					$liTemp		.=str_replace($liSearch, $lReplace, $li);
				}		
				//WRS_DEBUG_QUERY(print_r($param_json,true));
				
				$rel				=	fwrs_replace_attr(empty($param_json['LEVEL_FULL']) ? $param_json['MEASURE_UNIQUE_NAME'] : $param_json['LEVEL_FULL']);
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
	public function MENU_AUTO_LAOD($container)
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
		
		
		if(!is_array($container)) return $html;

		$li		=	<<<EOF
							<li class="{active}"><a href="#">{li}<span class="icon-remove-aba glyphicon glyphicon-remove"></span></a></li>
EOF;
		$liSearch	= array('{li}','{active}');
		
		foreach($container as $label =>$value)
		{
			
			$replace	=	array($value['REPORT_DESC']);	
			$html		.=	str_replace($liSearch, $replace, $li);
		}

		/*
		if(empty($html)){
			$replace	=	array(LNG('LABEL_NOVO'),'active');
			$html		.=	str_replace($liSearch, $replace, $li);
		}*/
		
		
		return str_replace($abaSearch, $html, $aba);
	}
	
	
	
	
	
	
	
	
}

?>