<?php 

$GRID_HEADER_OPTION	=	LNG('GRID_HEADER_OPTION');
$GRID_HEADER_EXPORT	=	LNG('GRID_HEADER_EXPORT');
$GRID_HEADER_SEE	=	LNG('GRID_HEADER_SEE');

$GRID_HEADER_OPTION_TOTAL_LINE			=	LNG('GRID_HEADER_OPTION_TOTAL_LINE');
$GRID_HEADER_OPTION_TOTAL_COLUMN		=	LNG('GRID_HEADER_OPTION_TOTAL_COLUMN');
$GRID_HEADER_OPTION_TOTAL_SUMARIZA		=	LNG('GRID_HEADER_OPTION_TOTAL_SUMARIZA');
$GRID_HEADER_OPTION_TOTAL_LINE_COLOR	=	LNG('GRID_HEADER_OPTION_TOTAL_LINE_COLOR');

$GRID_HEADER_EXPORT_PDF		=	LNG('GRID_HEADER_EXPORT_PDF');
$GRID_HEADER_EXPORT_CSV		=	LNG('GRID_HEADER_EXPORT_CSV');
$GRID_HEADER_EXPORT_EXCEL	=	LNG('GRID_HEADER_EXPORT_EXCEL');
$GRID_HEADER_EXPORT_IMAGE	=	LNG('GRID_HEADER_EXPORT_IMAGE');
$GRID_HEADER_EXPORT_IMAGE_SVG	=	LNG('GRID_HEADER_EXPORT_IMAGE_SVG');
$GRID_HEADER_SEE_GRID		=	LNG('GRID_HEADER_SEE_GRID');
$GRID_HEADER_SEE_CHART		=	LNG('GRID_HEADER_SEE_CHART');
$GRID_HEADER_SEE_MAP		=	LNG('GRID_HEADER_SEE_MAP');

$GRID_HEADER_TITLE_EXIBITION		=	LNG('GRID_HEADER_TITLE_EXIBITION');
$GRID_HEADER_TITLE_DADOS			=	LNG('GRID_HEADER_TITLE_DADOS');
$GRID_HEADER_OPTION_ORDER_COLUMN	=  	LNG('GRID_HEADER_OPTION_ORDER_COLUMN');
$BTN_SAIR							=	LNG('BTN_SAIR');
$BTN_SAVE							=	LNG('BTN_SAVE');
$BTN_APLY								=	LNG('BTN_APLY');
$CHART_CONFIG							=	LNG('CHART_CONFIG');


//TAG pode ser enviada externamente pelo include
if(!isset($HIDE_EXPORT)) $HIDE_EXPORT	=	'';

$WRS_PANEL_HEADER_TABLE		=	<<<HTML


<nav class="navbar  wrs_nav_relatorio ui-state-active" id="{$idTag}NAV" >
		  <div class="container-fluid">
		  
		  <!-- Title -->
			 <div class="navbar-left wrs_titles_config">

			 <!-- Botão Histórico -->
			 <div class="btn-group  font-black" role="group">			 
					  <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false" disabled_s >
						    <i class="fa fa-history"></i> <span class="caret"></span>
						</button>
						<ul class="dropdown-menu " role="history">
						    <li><a href="#" ><i class="fa fa-history"></i> 15:05:00 - 14/04 - <span class="label label-info">Drill</span> </a></li>
						    <li><a href="#" ><i class="fa fa-history"></i> 15:05:00 - 14/04 - <span class="label label-info">Filtro</span>  </a></li>
						    <li><a href="#" ><i class="fa fa-history"></i> 15:05:00 - 14/04 - <span class="label label-info">Drag</span> </a></li>
						    <li><a href="#" ><i class="fa fa-history"></i> 15:05:00 - 14/04 - <span class="label label-info">Filtro</span> </a></li>
						    <li><a href="#" ><i class="fa fa-history"></i> 15:05:00 - 14/04 - <span class="label label-info">Drag</span> </a> </li>
						</ul>
						
			 </div>
			<!-- END Botão Histórico -->
			<div class="btn-group  " role="group" aria-label="...">
					  <span class="h4">Title</span>
			</div>
					
			 </div>
			 
			<div class="navbar-right">
			
				<div class="grid_button_header_menu ">
					  		
				<!-- TOTAL -->
				<div class="btn-group dropdown-menu-configuration wrs_grid_options">
						<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
						    <i class="fa fa-cog"></i> {$GRID_HEADER_OPTION} <span class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu_export">
						    
					  		
						    
						    <li><h4>{$GRID_HEADER_TITLE_EXIBITION}</h4></li>
					  		<li>
						  		<form>
						  		 		<div class="checkbox"><label><input type="checkbox" value="1" name="SUMARIZA"> {$GRID_HEADER_OPTION_TOTAL_SUMARIZA}</label></div>
						  		 		<div class="checkbox"><label><input type="checkbox" value="1" name="COLORS_LINE"> {$GRID_HEADER_OPTION_TOTAL_LINE_COLOR}</label></div>
						  		</form>
					  		</li>
					  		<li class="divider"></li>
					  		<li><h4>{$GRID_HEADER_TITLE_DADOS}</h4></li>
					  		<li>
						  		<form>
						  		 		<div class="checkbox"><label><input type="checkbox" value="1" name="ALL_ROWS" > {$GRID_HEADER_OPTION_TOTAL_LINE}</label></div>
						  				<div class="checkbox"><label><input type="checkbox" value="1" name="ALL_COLS" > {$GRID_HEADER_OPTION_TOTAL_COLUMN}</label></div>
						  				<div class="checkbox"><label><input type="checkbox" value="1" name="ORDER_COLUMN"> {$GRID_HEADER_OPTION_ORDER_COLUMN}</label></div>
						  		</form>
					  		</li>
					  		 
					  		<li class="info_chart divider"></li>
					  		<li class="info_chart li-padding">
					  			<button type="button" class="btn btn-info  btn-block  btn-sm color_write chart_config_btn" data-target="#myModalChartConfig" ><i class="fa fa-cog"></i> {$CHART_CONFIG}</button>
					  		</li> 
					  		<li class="divider"></li>
					  		<li class="li-padding">
					  			<button type="button" class="btn btn-success  btn-block  btn-sm btn_add_opcoes"><i class="fa fa-filter"></i> {$BTN_APLY}</button>
					  		</li>
						</ul>
						
				</div>
				<!-- END TOTAL -->	  

					  		
					  		
				<!-- Export -->
				<div class="btn-group {$HIDE_EXPORT}">
						<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						    <i class="glyphicon glyphicon-export"></i> {$GRID_HEADER_EXPORT} <span class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu_export">
							<li id="dropdown-title"><h4 class="black"><i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID}</h4></li>

						    <li><a href="#" class="wrs_event_export" rel="k-grid-pdf"><i class="fa fa-file-pdf-o"></i> {$GRID_HEADER_EXPORT_PDF}</a></li>
						    <li><a href="#" class="wrs_event_export" rel="k-grid-excel"><i class="fa fa-file-excel-o"></i> {$GRID_HEADER_EXPORT_EXCEL}</a></li>
					  		<li><a href="#" class="wrs_event_export" rel="k-grid-excel"><i class="fa fa-file-o"></i> {$GRID_HEADER_EXPORT_CSV}</a></li>
						    <li><a href="#"><i class="fa fa-picture-o"></i> {$GRID_HEADER_EXPORT_IMAGE}</a></li>
						    
						    <li  class="info_chart divider"></li>
						    <li class="info_chart" id="dropdown-title"><h4 class="black"><i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART}</h4></li>
						    <li class="info_chart" ><a href="#" class="wrs_chart_export_svg"><i class="fa fa-file-o"></i> {$GRID_HEADER_EXPORT_IMAGE_SVG}</a></li>
						    <li class="info_chart" ><a href="#" class="wrs_chart_export_image"><i class="fa fa-picture-o"></i> {$GRID_HEADER_EXPORT_IMAGE}</a></li>
						    <li class="info_chart" ><a href="#" class="wrs_event_export wrs_chart_export_pdf" rel="k-grid-pdf"><i class="fa fa-file-pdf-o"></i> {$GRID_HEADER_EXPORT_PDF}</a></li>
						    
						</ul>
				</div>
				<!-- END Export -->	  
					
					  		
					  		
					  		
					  		
					
				<!-- Visao -->
				 <div class="btn-group">
						  <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						    <i class="fa fa-eye"></i> {$GRID_HEADER_SEE} <span class="caret"></span>
						  </button>
						  <ul class="dropdown-menu wrs_tools_options_window" role="menu">
						    <li><a href="#" wrs-data="grid"><i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID}</a></li>
						    <li><a href="#"	wrs-data="chart"><i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART}</a></li>
						    <li><a href="#"	wrs-data="map"><i class="fa fa-map-marker"></i> {$GRID_HEADER_SEE_MAP}</a></li>
								<li class="divider"></li>
						    <li><a href="#"	wrs-data="grid_chart"><i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID} + <i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART}</a></li>
							<li><a href="#" wrs-data="grid_map"><i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID} + <i class="fa fa-map-marker"></i> {$GRID_HEADER_SEE_MAP}</a></li>
								<li class="divider"></li>
							<li><a href="#"	wrs-data="chart_grid"><i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART} + <i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID}</a></li>
							<li><a href="#" wrs-data="chart_map"><i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART} + <i class="fa fa-map-marker"></i> {$GRID_HEADER_SEE_MAP}</a></li>
								<li class="divider"></li>
							<li><a href="#"	wrs-data="map_grid"><i class="fa fa-map-marker"></i> {$GRID_HEADER_SEE_MAP} + <i class="fa fa-th"></i> {$GRID_HEADER_SEE_GRID}</a></li>
							<li><a href="#" wrs-data="map_chart"><i class="fa fa-map-marker"></i> {$GRID_HEADER_SEE_MAP} + <i class="fa fa-bar-chart"></i> {$GRID_HEADER_SEE_CHART}</a></li>
							
						  </ul>
					</div>
					<!-- END Visao -->	  
					  		
					 </div>
			</div><!-- END navbar-right-->
			
		  </div>
		</nav>
HTML;
				
		?>