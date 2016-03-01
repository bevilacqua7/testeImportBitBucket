<?php 
includeClass("WRS_USER");
$arr_perfil_user 	= WRS_USER::getArrPerfUser();
$hide_layout_button = in_array('DRG',$arr_perfil_user);
				
$description	=	 NULL;

if(!empty($CUBE_EDITION))
{

		$description	=	<<<EOF
								<p>
									<span><b class="color_wrs_label">{$EDITION_TITLE} </b>{$CUBE_EDITION}</span>
								</p>
EOF;
	
}

if(!empty($CUBE_UPDATE))
{
	$description	.=	<<<EOF
								<p>
									<span><b class="color_wrs_label">{$ATUALIZACAO_TITLE} </b>{$CUBE_UPDATE}</span>
								</p>
EOF;
}

if(!empty($WARNING)) $description=$WARNING;

$LINK_HTML	=	"";

if(!$flag_cube_indisponivel){

	$LINK_HTML=	<<<HTML
		 
									<a href="{$LINK}" title="{$TITLE_LINK}" class="btn btn-info btn2 wrs-tooltip"><i class="fa fa-file-o"></i></a> 
HTML;
	
if(!$hide_layout_button){
		$LINK_HTML.= <<<HTML
									<a href="{$LINK_LAYOUT}" title="{$TITLE_LINK_LAYOUT}" class="btn btn-info btn1 wrs-tooltip">
											<i
										class="fa fa-th"></i></a>
HTML;
	}
	
	 

}


$html	=<<<EOF
				<li>
					<figure>
						
						<img src="imagens/databases/{$DATABASE_IMAGE}" >
						 <h1>{$DATABASE_DESC}</h1>
						 <div class="descriptions">{$description}</div>
						<figcaption>
							<h3 class="h2-figure">{$DATABASE_DESC}</h3>
							<span>{$DATABASE_COMMENT}</span>
							
							{$LINK_HTML}
							
						</figcaption>
					</figure>
				</li>
EOF


	/*						
$html	=<<<EOF
				<div class="ui-widget-content item wrs_audit-status wrs_item_santos" >
						<div class="meida-holder">
							<div class="background_item"></div>
							<h1>{$DATABASE_DESC}</h1>
							<description class="description">{$description}</description>
							<img src="imagens/databases/{$DATABASE_IMAGE}" alt="" />
						</div>
						<div class="hover-content">
							<div class="overlay"></div>
							{$LINK_HTML}
							<div class="detail-container">
								<p>{$DATABASE_COMMENT}</p>
							</div>
						</div>
				</div>
EOF
*/
				?>