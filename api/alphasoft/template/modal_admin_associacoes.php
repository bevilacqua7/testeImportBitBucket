<?php

$HTML 		=	<<<HTML
<form class='grid_window_values_form'>
<div class="association-container">

				
			<label for="select_cubes">Cubos</label>
	      		<div class="row default_config" id="select_cubes">
	      				<select name="cubos_unselected" class="select_altura col-sm-5 wrs-select multiple" multiple="multiple">
	  					{$parameter['cubos']}
						</select>
			      		<div class="col-sm-2 spance_paddding_top_wrs">
			      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
							<button type="button" class="bt_pequeno toBack btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
							<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
							<button type="button" class="bt_pequeno toAllBack btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
						</div>
	  					<select name="cubos" class="select_altura col-sm-5 wrs-select-receive multiple" multiple="multiple">
	  					{$parameter['cubos_sel']}
						</select>
				</div>
				
			<br>
				
			<label for="select_users">Usuários</label>
	      		<div class="row default_config" id="select_users">
	      				<select name="users_unselected" class="select_altura col-sm-5 wrs-select multiple" multiple="multiple">
	  					{$parameter['users']}
						</select>
			      		<div class="col-sm-2 spance_paddding_top_wrs">
			      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
							<button type="button" class="bt_pequeno toBack btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
							<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
							<button type="button" class="bt_pequeno toAllBack btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
						</div>
	  					<select name="users" class="select_altura col-sm-5 wrs-select-receive multiple" multiple="multiple">
	  					{$parameter['users_sel']}
						</select>
				</div>
	  					
			<input type="hidden" name="association_for" value="{$parameter['association_for']}">	
			<input type="hidden" name="association_indexes_for_cubes" value="{$parameter['association_indexes_for_cubes']}">	
				
	  		<script>
	  			select_work_generic('select_cubes',{$parameter['combo_block_cubes']});
	  			select_work_generic('select_users',{$parameter['combo_block_users']});
	  		</script>

</div>	
</form>
HTML;

						  					
?>