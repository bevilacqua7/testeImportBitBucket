<?php 

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
	<div class="link-contianer">
								<a href="{$LINK}" class="ui-widget-header changePage" title="{$TITLE_LINK}"><span
									class="glyphicon glyphicon-file"></span></a>
								<a href="{$LINK_LAYOUT}" class="ui-widget-header changePage" title="{$TITLE_LINK_LAYOUT}"><span
									class="glyphicon glyphicon-th"></span></a>
							</div>
HTML;

}

							
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
				?>