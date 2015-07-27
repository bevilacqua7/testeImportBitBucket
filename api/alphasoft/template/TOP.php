
<div class="wrs_header_main">
		<table width="100%" border="0" class="ui-state-focus" height="60">
		  <tr>
			<td align="left" width="22%">
				<img src="imagens/logo-wrs.png" width="110" height="50"/>
			</td>
			<td align="center" width="52%">
            	<img border="1px" src="<?php echo $WRS_LOGO;?>" height="59" />
			</td>
			<td align="right" width="22%" style="padding-right: 10px" >
				<img src="imagens/logo-ims.png" width="130" height="35"/>
			</td>
		  </tr>
		</table>
		<table width="100%" height="30" border="0" class="ui-widget-header pws-style-select">
		  <tr>
			<td align="left" width="50%" style="padding-left: 10px">
				<span style="font-size:11px;vertical-align:middle"><?php echo LNG('TITLE_TEMA')?>: </span><?php echo $SELECT_THEME;?>
				<span style="font-size:11px;vertical-align:middle"><?php echo LNG('TITLE_LINGUA')?>: </span><?php echo $SELECT_IDOMA;?>
			</td>
			<td align="right">
				<span class="ui_color_user ui-state-active" style="font-size:12px;cursor:pointer;vertical-align:middle; background: none; border: none;" title="<?php echo LNG('TITLE_ALTER_SENHA')?>" >
					  <?php echo WRS::INFO_SSAS_LOGIN('USER_DESC').' - '.WRS::INFO_SSAS_LOGIN('USER_TYPE'); ?> 
				</span>&nbsp;
				<?php 
				$perfil_type	=	 WRS::INFO_SSAS_LOGIN('PERFIL_ID');
				
				if($perfil_type=='MST' || $perfil_type=='ADM'){?>
					<span  style="font-size:12px;cursor:pointer;vertical-align:middle;" onClick="window.location='index_adm.php"> <?php echo LNG('TITLE_ADMINISTRATIVO')?> </span>&nbsp;
				<?php }?>
				<a href="run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout"> <img src="imagens/exit.png" height="22" style="cursor:pointer;vertical-align:middle;" title="<?php echo LNG('BTN_SAIR')?>" /></a>
			</td>
		  </tr>
		</table>
    </div>