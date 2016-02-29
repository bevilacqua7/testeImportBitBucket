
<div class="wrs_header_main">
		<table width="100%" border="0" class="ui-state-focus" height="60">
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
		</table>
		<table width="100%" height="30" border="0" class="ui-widget-header pws-style-select">
		  <tr>
			<td align="left" width="300" style="padding-left: 10px;padding-right: 10px;position:relative;">
				<div class="bt_config_templates" style="position:absolute;top:3px">
					<span style="font-size:11px;vertical-align:middle"><?php echo LNG('TITLE_TEMA')?>: </span><?php echo $SELECT_THEME;?>
					<span style="font-size:11px;vertical-align:middle"><?php echo LNG('TITLE_LINGUA')?>: </span><?php echo $SELECT_IDOMA;?>
				</div>
				<div class="menu_administrativo_itens" style="display:none;position:absolute;top:3px">
					<?php 					
					includeQUERY('WRS_MANAGE_PARAM');
					$classes_menu 		= WRS_MANAGE_PARAM::GET_CONFIG_TABLE();
					$html				= '';
					$perfil_logado 		= trim(WRS::INFO_SSAS_LOGIN('PERFIL_ID'));
					// regra de acesso perfil de usuario FACIOLI 20160226 - felipeb
					$arr_perfil_access 	= array(
							'MST' 	=>	'*',
							'ADM'	=>	array(
												'ATT_WRS_USER',
												'REL_WRS_CUBE_USER',
												'ATT_WRS_LOG'
										)
					);
					foreach($classes_menu as $nome_tabela=>$info_tabelas){
						
						if(
								$info_tabelas['acesso_via_menu']==true   &&
								array_key_exists($perfil_logado,$arr_perfil_access) &&
								(
									$arr_perfil_access[$perfil_logado]=='*'  ||
									in_array($nome_tabela, $arr_perfil_access[$perfil_logado])
								)
							){
							
							$tabela = $nome_tabela;
							$label  = LNG($info_tabelas['nome_menu_LNG']);
							
							$html .= <<<HTML
							<button type="button" class="menu_cadastro btn btn-default btn-xs" tabela="{$tabela}">
							  <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span> {$label}
							</button>
HTML;
						}
					}
					
					echo $html;
					?>
				</div>	
				
			</td>
			<td align="left" style="padding-left: 10px">
			</td>
			<td align="right">
				<span class="ui_color_user ui-state-active" style="font-size:12px;cursor:pointer;vertical-align:middle; background: none; border: none;" title="<?php echo LNG('TITLE_ALTER_SENHA')?>" >
					  <?php echo WRS::INFO_SSAS_LOGIN('USER_DESC').' - '.WRS::INFO_SSAS_LOGIN('USER_TYPE'); ?> 
				</span>&nbsp;
				<?php 
				$perfil_type	=	 WRS::INFO_SSAS_LOGIN('PERFIL_ID');
				
				if($perfil_type=='MST' || $perfil_type=='ADM'){?>
					<span  style="font-size:12px;cursor:pointer;vertical-align:middle;" class="menuADM_link"> <?php echo LNG('TITLE_ADMINISTRATIVO')?> </span>&nbsp;
				<?php }?>
				<a href="run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout"> <img src="imagens/exit.png" height="22" style="cursor:pointer;vertical-align:middle;" title="<?php echo LNG('BTN_SAIR')?>" /></a>
			</td>
		  </tr>
		</table>
    </div>