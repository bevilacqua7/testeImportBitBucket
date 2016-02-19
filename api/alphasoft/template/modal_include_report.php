<?php




$DG_SELECT 		=	<<<HTML

<br>
								<label for="select1">Layouts</label>
					      		<div class="row default_config" id="select1">
				      				<select name="layouts_unselected" class="select_altura col-sm-5 wrs-measures multiple" multiple="multiple">
				  					{$combo_layouts}
									</select>		      		 
						      		<div class="col-sm-2 spance_paddding_top_wrs">		      			
						      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
										<button type="button" class="bt_pequeno toMeasure btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
										<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
										<button type="button" class="bt_pequeno toAllMeasure btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
									</div>				
				  					<select name="layouts" class="select_altura col-sm-5 wrs-measures-receive multiple" multiple="multiple">
				  					{$combo_layouts_sel}
									</select>				
								</div>
								<br>
								<label for="select2">Grupos</label>
					      		<div class="row default_config" id="select2">
				      				<select name="grupos_unselected" class="select_altura col-sm-5 wrs-measures multiple" multiple="multiple">
				  					{$combo_grupos}
									</select>		      		 
						      		<div class="col-sm-2 spance_paddding_top_wrs">		      			
						      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
										<button type="button" class="bt_pequeno toMeasure btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
										<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
										<button type="button" class="bt_pequeno toAllMeasure btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
									</div>				
				  					<select name="grupos" class="select_altura col-sm-5 wrs-measures-receive multiple" multiple="multiple">
				  					{$combo_grupos_sel}
									</select>				
								</div>
									
HTML;

//Não tem permissãoi para GD				  					
if(WRS_USER::getArrPerfUser('DRG'))
{
	$DG_SELECT	='';				  	
}

$HTML	=	<<<HTML
				<style>
				.bt_pequeno{
				    width: 100px;
				    height: 20px;
				    padding: 0px;
				    }
				.select_altura{
				    height: 100px!important;
				    padding: 0px!important;
				}
				</style>
				<script>
								
				{$EXTRA_SCRIPT}
					
				/*
				 * Considera que existem botoes com as class: toActive, toMeasure, toAllActive, toAllMeasure
				 * e tamb�m as selects multiples com as class: wrs-measures e wrs-measures-receive
				 */
				function select_work(obj){
					obj.find('.toActive').unbind('click').click(function(){
						obj.find('.wrs-measures :selected').each(function(i, selected){ 
							$(this).remove().appendTo(obj.find('.wrs-measures-receive'));
						});
						obj.find('.wrs-measures-receive :selected').removeAttr("selected");
					});
					obj.find('.toAllActive').unbind('click').click(function(){
						obj.find('.wrs-measures option').each(function(i, selected){ 
							$(this).remove().appendTo(obj.find('.wrs-measures-receive'));
						});
						obj.find('.wrs-measures-receive :selected').removeAttr("selected");
					});
					obj.find('.toMeasure').unbind('click').click(function(){
						obj.find('.wrs-measures-receive :selected').each(function(i, selected){ 
							$(this).remove().appendTo(obj.find('.wrs-measures'));
						});
						obj.find('.wrs-measures :selected').removeAttr("selected");
					});
					obj.find('.toAllMeasure').unbind('click').click(function(){
						obj.find('.wrs-measures-receive option').each(function(i, selected){ 
							$(this).remove().appendTo(obj.find('.wrs-measures'));
						});
						obj.find('.wrs-measures :selected').removeAttr("selected");
					});
					obj.find('.wrs-measures').unbind('dblclick').bind('dblclick',function(){
						$("option:selected", this).remove().appendTo(obj.find('.wrs-measures-receive'));
						obj.find('.wrs-measures-receive :selected').removeAttr("selected");
					});
					obj.find('.wrs-measures-receive').unbind('dblclick').bind('dblclick',function(){
						$("option:selected", this).remove().appendTo(obj.find('.wrs-measures'));
						obj.find('.wrs-measures :selected').removeAttr("selected");
					});
				}
				
				</script>
				<form id="insert_report" class="modal_report" name="insert_report">
				
								<label for="report_name">Nome</label><br>
									<input class="change_title_report" type="text" id="report_name" name="report_name" value="{$nome_report}" style="width: 768px;">	
								<br>
								<input type="checkbox" id="report_auto" name="report_auto" value="1"> <label for="report_auto">Carga Automática </label>  &nbsp; &nbsp; &nbsp; <input type="checkbox" id="report_share" name="report_share" value="1"> <label for="report_share">Compartilhado</label>	
							{$DG_SELECT}						
				</form>
				
			 
HTML;

