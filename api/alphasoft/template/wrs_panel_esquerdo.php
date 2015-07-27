<div class="DRAG_DROP_LATERAIS   wrs_container">


<div class="nav nav-tabs ui-accordion-header  ui-accordion-header-active ui-state-active wrs_panel_esquerdo_header">
	<span class="navbar-left title_left"><i class="fa fa-filter"></i> <?PHP echo LNG('ATTRIBUTOS_FILTRO'); ?></span>
	<div class="navbar-right btn-group DRAG_DROP_LATERAIS_title_btn_right" >
	
					  <button type="button" class="btn btn-warning btn-xs glyphicon glyphicon-trash wrs_clean_box_drag_drop"></button>
					  <button type="button"  class="btn btn-default btn-xs glyphicon glyphicon-filter wrs_panel_filter_icon"></button>
					  <button type="button" class="btn btn-default btn-xs glyphicon glyphicon-info-sign tooltip_info_wrs_panel"></button>
					  <button type="button" class="btn btn-default btn-xs glyphicon glyphicon-check wrs_run_filter"></button>
				</div>
</div>
 
	
 
	<div class="WRS_DRAG_DROP_RECEIVER WRS_DRAG_DROP_RECEIVER_FILTER  ">
	  <div class="ui-widget-content  wrs_panel_receive wrs_panel_esquerdo_drag_drop " type="filtro" who_receive="filtros">
	    <ol class="wrs_swap_drag_drop sortable_filtro  sortable_attr" LNG="DRAG_DROP_FIELD_ATRIBUTO" ></ol>
	  </div>
	</div>

	<div class="WRS_DRAG_DROP_FILTER_CONTAINER">
	     <div class="WRS_DRAG_DROP_FILTER"></div>
	</div>
	
</div>





	 <script>
	 $(document).ready(function() {
			$.WrsFilter();
	 });
    </script>
    
