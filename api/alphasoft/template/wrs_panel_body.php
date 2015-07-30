<div class="wrs_panel_filter_measure wrs_panel_center_body">
<div class="wrs_panel_center_body_container">

		<?php 
				$HIDE_EXPORT	=	'hide';
				include ('wrs_panel_header_table.php'); 
				echo $WRS_PANEL_HEADER_TABLE;
		?>
	<script type="text/javascript">$(function(){$('.wrs_panel_center_body_container .wrs_nav_relatorio').NavConfigure();});</script>
	<div class="container_center">

		<h4 class="ui-accordion-header  ui-accordion-header-active ui-state-active"><i class="fa fa-columns"></i> <?php echo LNG('ATTRIBUTOS_COLUNA');?>
										
										<button type="button" class="btn btn-warning btn-xs glyphicon glyphicon-trash wrs_clean_box_drag_drop  wrs_clean_box_drag_drop_css" parent="no_parent"></button>
		</h4>
		<div class="WRS_DRAG_DROP_RECEIVER">
		  <div class="ui-widget-content  wrs_panel_receive wrs_panel_receive_coluna_linha ui-state-default" type="receive" who_receive="coluna">
		    <ol class="nav nav-tabs wrs_swap_drag_drop sortable_coluna sortable_attr" LNG="DRAG_DROP_FIELD_ATRIBUTO"></ol>
		  </div>
		</div>
	</div>
	
	<div class="container_center">
	<h4 class="ui-accordion-header  ui-accordion-header-active ui-state-active"><i class="fa fa-bars"></i> <?php echo LNG('ATTRIBUTOS_LINHA');?> <button type="button" class="btn btn-warning btn-xs glyphicon glyphicon-trash wrs_clean_box_drag_drop wrs_clean_box_drag_drop_css" parent="no_parent"></button></h4>
	<div class="WRS_DRAG_DROP_RECEIVER">
	  <div class="ui-widget-content  wrs_panel_receive wrs_panel_receive_coluna_linha ui-state-default" type="receive" who_receive="linha">
	    <ol class="nav nav-tabs wrs_swap_drag_drop sortable_attr sortable_linha" LNG="DRAG_DROP_FIELD_ATRIBUTO"></ol>
	  </div>
	</div>
	</div>
	
	<div class="container_center">
	<h4 class="ui-accordion-header  ui-accordion-header-active ui-state-active"><i class="fa fa-puzzle-piece"></i> <?php echo LNG('ATTRIBUTOS_METRICA');?> <button type="button" class="btn btn-warning btn-xs glyphicon glyphicon-trash wrs_clean_box_drag_drop wrs_clean_box_drag_drop_css" parent="no_parent"></button></h4>
	<div class="WRS_DRAG_DROP_RECEIVER WRS_MEASURE_DRAG">
	  <div class="ui-widget-content  wrs_panel_receive ui-state-default" type="metrica" who_receive="metrica">
	    <ol class="nav nav-tabs wrs_swap_drag_drop sortable_metrica" LNG="DRAG_DROP_FIELD_METRICA"></ol>
	  </div>
	</div>
	</div>
</div>
</div>


<div class="container_panel_relatorio"></div>
 
 
 <!--  AUTO LOAD -->
<?php 
	echo $HTML_ABAS_AUTO_LOAD;
?>


<!--  Styles css ui-state-default -->