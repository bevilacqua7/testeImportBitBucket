
<div class="wrs_header_main">
		<table width="auto" border="0" class="ui-state-focus" height="60">
		  <tr>
			<td align="left" width="22%" style="padding-left: 6px">
				<img src="imagens/logo-wrs.png" width="110" height="50"/>
			</td>
			<td align="center" width="52%">
            	<img border="1px" src="<?php echo $WRS_LOGO;?>" height="59" />
			</td>
			<td align="right" width="22%" style="padding-right: 10px" >
				<img src="imagens/logo-ims.png" width="130" height="35"/>
			</td>
		  </tr>
		  <tr>
		  	<td colspan="3" class="ui-widget-header pws-style-select border-corner-none">
		  		
		  	<div class=" width_100">
					  <div class="col-md-2 col-sm-2 col-xs-2">
								<?php 
									$perfil_type	=	 WRS::INFO_SSAS_LOGIN('PERFIL_ID');
									$title_manager	=	LNG('TITLE_OPTIONS');
									
									if($perfil_type=='MST' || $perfil_type=='ADM')
										{
											$title_manager	=	LNG('TITLE_ADMINISTRATIVO');
										}
								?>
										
										<button   id="wrs-button-options" class="btn btn-link white" > <i class="fa fa-bars"></i> <?php echo $title_manager?> </button>
									
				
					  </div>
					  <div class="col-md-8 col-sm-8 col-xs-8 aling-center">					  
					  			<button class="btn btn-link">
						  			<span class="ui_color_user ui-state-active no_border_background"  title="<?php echo LNG('TITLE_ALTER_SENHA')?>" >
						  				<?php echo WRS::INFO_SSAS_LOGIN('USER_DESC').' - '.WRS::INFO_SSAS_LOGIN('USER_TYPE'); ?> 
									</span>
								</button>
					</div>
					  <div class="col-md-2 col-sm-2 col-xs-2 aling-right">
					  			<a class="btn btn-link logout_wrs " href="run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout"> 
					  				<img src="imagens/exit.png" height="22" style="cursor:pointer;vertical-align:middle;" title="<?php echo LNG('BTN_SAIR')?>" />
					  			</a>
					  </div>
			</div>
		  		
		  		
		  	</td>
		  </tr>
		</table>
    </div>