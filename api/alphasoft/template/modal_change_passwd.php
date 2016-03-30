<?php


$placeholder_old 			= LNG('js_admin_old_pass_placeholder');
$label_old 					= LNG('js_admin_old_pass');
$placeholder_new 			= LNG('js_admin_new_pass_placeholder');
$label_new 					= LNG('js_admin_new_pass');
$label_new_confirm 			= LNG('js_admin_confirm_pass');
$expira_senha	 			= LNG('js_admin_observation');

$isAdm						= isset($parameter['isAdm'])?$parameter['isAdm']:false;
$extraValues				= isset($parameter['extraValues'])?$parameter['extraValues']:'';

$HTML 		=	<<<HTML

						<form class="grid_window_values_form grid_alterar_senha">
								<input type="hidden" name="extraValues" id="extraValues" value="{$extraValues}">
HTML;

if(!$isAdm){
	$HTML		.=	<<<HTML
							        <div class="form-group form-control-wrs_color">
							            <label for="old_senha">{$label_old}</label>
							            <div class="form-control-wrs">
							                <input type="password" name="old_senha" id="old_senha" placeholder="{$placeholder_old}" class="form-control-wrs-auto form-control">
						                </div>
						            </div>
									<script> $('.wrs_grid_window_custum_tools_menu').hide(); </script>
HTML;
}

$HTML		.=	<<<HTML
							    <div class="form-group form-control-wrs_color">
						            <label for="nova_senha">{$label_new}</label>
						            <div class="form-control-wrs">
						                <input type="password" name="nova_senha" id="nova_senha" placeholder="{$placeholder_new}" class="form-control-wrs-auto form-control">
					                </div>
					            </div>
							    <div class="form-group form-control-wrs_color">
					                <label for="confirmar_senha">{$label_new_confirm}</label>
					                <div class="form-control-wrs">
					                    <input type="password" name="confirmar_senha" id="confirmar_senha" placeholder="{$placeholder_new}" class="form-control-wrs-auto form-control">
				                    </div>
				                </div>
HTML;

if($isAdm){
	$HTML		.=	<<<HTML
							    	<div class="form-group form-control-wrs_color">
					                    <input type="checkbox" name="expira_senha" id="expira_senha">
				                        <label for="expira_senha">{$expira_senha}</label>
				                    </div>
HTML;
}

$HTML		.=	<<<HTML
			            </form>
									
HTML;

	
	
	
	
	
