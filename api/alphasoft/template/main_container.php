 <div class="container-main-version1">
			<!-- Push Wrapper -->
			<div class="mp-pusher" id="mp-pusher">

				<!-- mp-menu -->
				<nav id="mp-menu" class="mp-menu">
					<div class="mp-level">
						<h2 class="icon icon-world main-title"><?php echo LNG('MENU_ALL_CATEGORY');?></h2>
						<ul>
						
							<?php 
							$perfil_type	=	 WRS::INFO_SSAS_LOGIN('PERFIL_ID');
							
							if($perfil_type=='MST' || $perfil_type=='ADM')
							{
								includeQUERY('WRS_MANAGE_PARAM');
								echo WRS_MANAGE_PARAM::GET_CONFIG_TABLE('menu');
							}
							
							?>
							
							
							<li class="only-li bt_config_templates">
									<div><i class=" fa fa-desktop" ></i><span ><?php echo LNG('TITLE_TEMA')?>: </span><?php echo $SELECT_THEME;?></div>
							</li>
							<li class="only-li bt_config_templates">
									<div><i class=" fa fa-language" ></i><span><?php echo LNG('TITLE_LINGUA')?>: </span><?php echo $SELECT_IDOMA;?></div>
							</li>
							
						</ul>
							
					</div>
				</nav>
				<!-- / DATA -->
					<?PHP include_once(PATH_TEMPLATE.'main_body.php');?>
		

			</div><!-- /pusher -->
		</div><!-- /container-main-version1 -->
			<div class="rodape-main ui-widget-header ui-state-active no-border">
					<span id="data_sistema" class="WRS_TIME" style="font-weight:bold;font-size:12px;"></span>
			</div>
			
	 
	  
			