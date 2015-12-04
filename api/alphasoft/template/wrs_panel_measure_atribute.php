	<div class="wrs_title_drag ">
		<div class="nav nav-tabs ui-accordion-header  ui-accordion-header-active ui-state-active wrs_panel_esquerdo_header DRAG_DROP_LATERAIS_title">
			<span class="navbar-left title_left"><i class="glyphicon glyphicon-th-list colorSelect"  ></i> <?php echo LNG('ATTRIBUTOS_TITLE');?></span>
			<div class="navbar-right btn-group DRAG_DROP_LATERAIS_title_btn_right">
				<button type="button" class="btn btn-default btn-xs glyphicon glyphicon-floppy-disk"></button>
				<button type="button" class="btn btn-default btn-xs glyphicon glyphicon-folder-open"></button>
			</div>
		</div>

	</div>
	
	

	
	
	<div id="products"
		class="wrs_options_select wrs_options_panel_atributo">
		
		<div class="WRS_DRAG_DROP WRS_DRAG_DROP_ATTR wrs_relationships_menu_direiro">
			  <?php echo $HTML_ATRIBUTOS;?>
		</div>
	</div>

	<div
		class="nav nav-tabs ui-accordion-header  ui-accordion-header-active ui-state-active wrs_panel_esquerdo_header DRAG_DROP_LATERAIS_title">
		<span class="navbar-left title_left"><i class="fa fa-puzzle-piece"></i>  <?php echo LNG('ATTRIBUTOS_METRICA');?></span>
	</div>


	<div id="products"
		class="wrs_options_select  wrs_options_panel_metrica">
		<div class="WRS_DRAG_DROP WRS_DRAG_DROP_METRICA wrs_measure_menu_direiro">
			<?php echo $HTML_METICAS;
			?>
		</div>
	</div>
	
	<script>
		SetElementDataWrs('.wrs_options_select');
	</script>


