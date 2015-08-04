<div class="direito_container">
	
	<span class="multiple_cube <?PHP echo $HIDE_MULTIPLE_CUBE;?>">
		<div
			class="nav nav-tabs ui-accordion-header  ui-accordion-header-active ui-state-active wrs_panel_esquerdo_header DRAG_DROP_LATERAIS_title">
			<span class="navbar-left title_left"><i class="fa fa-cube"></i> <?php echo LNG('ATTRIBUTOS_MULTIPLE_CUBE');?></span>
		</div>
				<select class="selectpicker wrs_multiple_cube_event show-tick"  data-width="100%">
					<?php echo $MULTIPLE_CUBE;?>
			  </select>
  		<div class="margin-botton"></div>
	</span>
	
	<span class="wrs_panel_measure_atribute">
		<?php include_once('wrs_panel_measure_atribute.php'); ?>
	</span>

</div>


