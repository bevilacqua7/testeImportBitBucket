 <div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active">
        <h4 class="modal-title" id="myModalLabel"><?php echo $TPL_TITLE;?>
		<?php echo $TPL_COMPLEMENT_TITLE;?>
        </h4>
        
        

</div>      
<div class="modal-body wrs_window_grid">      
		     <?php echo $TPL_HTML;?> 
</div>      
<div class="modal-footer">
	<div class="btn-group" role="group" aria-label="...">
			<?php echo $TPL_BUTTON;?>
	</div>
</div>


<script>
	$('#myModal, .body_grid_window').data('wrsGrid',<?php echo (($TPL_DATA!='')?$TPL_DATA:'{}');?>);
</script>