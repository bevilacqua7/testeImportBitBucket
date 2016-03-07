<?php 
	include_once(PATH_TEMPLATE.'header.php');

	//Apaga o cache do banco de dados
	WRS::cleanTABLE_CACHE_REPORT();
	$pedaco_style 		= 	explode('-',fwrs_request('ss'));
	$cor 				= 	$pedaco_style[1];
	$loader 			= 	'loader_'.$cor;
	$_SESSION['COR'] 	=	$cor;
?>



<script type="text/javascript">
	/*
	 * Verifica qual evento irá aplicar na lateral da página
	 */
	var WRS_CUBE_INFO					=	<?php echo $CUBE_INFO;?>;
	 
	var WRS_LAYOUT_HIDE_CLOSE_FLAG		= 	<?php echo strstr($_SESSION['PERFIL_FLAG'],"|DRG|")!==false ? 'true' : 'false';?>;
	var DASHBOARD_AUTO_LOAD				=	<?php echo $DASHBOARD_AUTO_LOAD; ?>;
	var WRS_DASHBOARD_Relationships		=	<?php echo $WRS_DASHBOARD_Relationships;?>;

	var tema							=	'<?php echo fwrs_request('ss');?>';
	var lingua							=	'<?php echo $_SESSION ['USER_LANGUAGE'];?>';
	
</script>

<script type="text/javascript" src="../<?php echo JS_PATH;?>dashboard_auto_load.js?rand=<?php echo RAND_TOKEN;?>"></script>
<script type="text/javascript" src="../<?php echo JS_PATH;?>dashboard.js?rand=<?php echo RAND_TOKEN;?>"></script>

<div id="loaderBox" style="display:none"></div>
<div id="loader" style="display:none">
	<img id="loaderImg" src="../imagens/<?php echo $loader?>.gif"/>
	<p><div id="clock"><label id="minutes">00</label>:<label id="seconds">00</label></div></p>
	<p><input id="loaderCancel" type="button" value="Cancel" onClick="if(xhrAjax && xhrAjax.readystate != 4){xhrAjax.abort(); xhrAjax = undefined; tiraLoad();};"></p>
</div>


<script type="text/javascript">

$( window ).resize(function() {

		//acertaTamanhoPosicionamentoGridsDashboard();
	//	fechaMapa();
});

$(function(){
	WRS_mount_auto_load_dashboard(DASHBOARD_AUTO_LOAD);
})

</script>

<div id="div_visao_consulta" style="position:absolute;height:22px;width:162px;width /*\**/: 156px\9;z-index:9998;top:83px;top /*\**/: 83px\9;right:229px;display:none">
    <span style="font-family:Verdana, Geneva, sans-serif;font-size:12px;">VisÃ£o: </span>
    <select name="cmb_grid_grafico" id="cmb_grid_grafico" onChange="atualizaVisaoRelatorioAtual();chamaMontaGrafico(this.value);" >
       <option value="G">Grid</option>
       <option value="GR">Chart</option>
       <option value="ALL">Grid e Chart</option>
    </select>
</div>

<div class="ui-layout-center" id="centro" style="overflow-y:hidden;overflow-x:hidden;">

    <?php if(strstr($_SESSION['PERFIL_FLAG'],"|LAY|")!==false){?>	
		<div id="div_escolhe_layouts" style="display:none"><!--<div style="margin-left:8px;margin-top:3px;color:<?php echo $cor?>" class="ui-state-disabled ui-icon ui-icon-circle-plus"></div>--></div>
	<?php }else{?>
		<div id="div_escolhe_layouts" style="display:none"><!--<div style="margin-left:8px;margin-top:3px;color:<?php echo $cor?>" class="ui-icon ui-icon-circle-plus" onClick="abreFechaRecarregaEscolheLayouts()" title="<?php echo traduzTexto('TROCA LAYOUT',$_SESSION['USER_LANGUAGE'],'M')?>"></div>--></div>
	<?php }?>
    <div id="div_background_transparente_layout" class="ui-widget-shadow ui-corner-all"></div>
    <div id="div_background_layout" class="ui-widget ui-widget-content ui-corner-all"></div>
	
    <div>
		<div id="div_sem_resultado" class="ui-state-default" align="center" valign="middle" 
		 style="display:none;text-align:center;vertical-align:middle;position:absolute;left:50%;top:50%;margin:-90px 0 0 -250px;height:90px;width:500px"></div>
	
		<div id="conteudo_central" style="text-align:center;margin-left:auto;margin-right:auto;overflow:hidden">
		
        	<div id="conteudo1"></div><div id="conteudo2"></div><div id="conteudo3"></div><div id="conteudo4"></div>
            <div id="conteudo5"></div><div id="conteudo6"></div><div id="conteudo7"></div><div id="conteudo8"></div>
            <div id="conteudo9"></div><div id="conteudo10"></div><div id="conteudo11"></div><div id="conteudo12"></div>
            <div id="conteudo13"></div><div id="conteudo14"></div><div id="conteudo15"></div><div id="conteudo16"></div>

            
            <div id="conteudo0">
                <table id='tabela_conteudo_central' width='100%' border='0'>
                    <tr>
                        <td id='linha_grid'>
                            <table id='grid' align='left'></table>
                            <div id='pager'></div>
                        </td>
                    </tr>
                    <tr>
                        <td id='linha_grafico'>
                        </td>
                    </tr>
                </table>
            </div>
		</div>
	
		<table style="display:none">
			<tr><td>&nbsp;</td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>&nbsp;</td></tr>
		</table>

		<table style="display:none" align="center" border="0">
			<tr>
			  <td width="130">&nbsp;</td>
			  <td width="130" align="center">
				  <div><span style="font-size:12px;color:<?php echo corTitulo($cor)?>"><?php echo traduzTexto('COLUNAS',$_SESSION['USER_LANGUAGE'],'M')?></span>
					 <table class="ui-state-focus" style="height:160px;width:200px;margin-left:auto;margin-right:auto;" border="0">
						  <tr>
							  <td class='relatorio' id="place_colunas" align="center"></td>
						  </tr>
					  </table>
				  </div>
			  </td>
			</tr>
			<tr>
			   <td colspan="2" style="font-size:4px">&nbsp;</td>
			</tr>
			<tr>
			  <td width="140" align="center">
				  <div><span style="font-size:12px;color:<?php echo corTitulo($cor)?>"><?php echo traduzTexto('LINHAS',$_SESSION['USER_LANGUAGE'],'M')?></span>
					  <table class="ui-state-focus" style="height:160px;width:130px;" border="0">
						  <tr>
							  <td class='relatorio' id="place_linhas" align="center"></td>
						  </tr>
					  </table>
				  </div>
			  </td>
			  <td width="130" align="center">
				  <div><span style="font-size:12px;color:<?php echo corTitulo($cor)?>"><?php echo traduzTexto('METRICAS',$_SESSION['USER_LANGUAGE'],'M')?></span>
					 <table class="ui-state-focus" style="height:160px;width:200px;margin-left:auto;margin-right:auto;" border="0">
						  <tr>
							  <td class='metrica' id="place_metricas" align="center" ></td>
						  </tr>
					  </table>
				  </div>
			  </td>
			</tr>
		</table>
	</div>

	<!-- ABAS do DASHBOARD -->
	<?php 
		echo $WRS_ABA;
	?>
	
	

</div>

<div class="ui-layout-north" style="overflow-y:hidden;overflow-x:hidden;border:solid 0 #F7F7F7">
	<div class="ui-state-focus" width="100%" style="text-align:right;border:solid 0 #F7F7F7;">
    	<table width="100%" border="0" class="ui-state-focus" height="70" style="vertical-align:middle">
        	<tr>
            	<td width="38%" align="left">&nbsp;<img src="../imagens/logo-wrs.png" width="110" height="50"/>

            	
                    <form method="POST" enctype="multipart/form-data" action="geraPrintTela.php" id="form_print_tela" target="iframe_uploads">
                    	<input type="hidden" id="hd_print_tela" name="hd_print_tela" value=""/>
                    </form>
                    
                    
                    <iframe name="iframe_uploads" style="width:1px; height:1px;background-color:#F00;visibility:hidden"></iframe>
                    
                    <iframe name="iframe_downloads" style="width:1px; height:1px;background-color:#F00;visibility:hidden"></iframe>
                    
				</td>
            	<td width="25%" align="center">
                    <div id="div_titulo_database" class="ui-state-active"  style="font-weight:bold;font-size:25px;background: none; border: none;">DASHBOARDS<span onClick="window.open('mostra_dados_dashboard_2.php')"></span></div>
                    <div style="font-size:12px" id="div_cubos_dashboard_atual"><?php echo $CUBO_DASHBOARD_TITLE; ?></div>
                </td>
                <td width="20%" align="center">
                </td>
                <td width="1%" align="center"><form id="place_hiddens" name="place_hiddens"></form></td>
                <td width="16%" align="right"><img src="../imagens/logo-ims.png" width="130" height="35" onClick="document.getElementById('div_conteudo_q2').style.backgroundColor='#FF0000'"/>&nbsp;</td>
            </tr>
        </table>
    </div>
</div>

<div class="ui-layout-south" style="overflow-y:hidden;overflow-x:hidden;border:solid 0 #F7F7F7">
	<div class="ui-state-focus" width="100%" style="border:solid 0 #F7F7F7">
		<table width="100%" border="0" height="35">
			<tr>
				<td width="240" align="left" style="vertical-align:middle;padding-left:5px">
				
					
				<div id="pageMenuDash">
	 <div class="menu_apleDash" id="menu_apleDash">
	 <?php 
	 $li		=	fwrs_request('li');
	 $ss		=	fwrs_request('ss');
	 $dt 		= 	fwrs_request('dt');
	 $down_ativo=	fwrs_request('down_ativo');
	 
	 ?>
					<a href="#" >
							<img src="../imagens/home.png?<?php echo WRS_TEMP_RAND;?>" style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('MENU PRINCIPAL',NULL,'M');?>" onClick="voltaHome('<?php echo $ss;?>','<?php echo $li;?>','<?php echo isset($_SESSION['MODULOS'][$dt]['DATABASE_DESC']) ? $_SESSION['MODULOS'][$dt]['DATABASE_DESC'] : NULL;?>')" />
					</a>
					<?php if(strstr($_SESSION['PERFIL_FLAG'],"|DRG|")!==false){?>
							  <a href="#" ><img src="../imagens/new_disable.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('NOVO DASHBOARD',NULL,'M')?>" /></a>
					<?php }else{?>
					          <a href="#" ><img src="../imagens/new.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('NOVO DASHBOARD',NULL,'M')?>" onClick="criaNewDashboard();" /></a>
					<?php }?>
				    <a href="#" ><img src="../imagens/open.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('ABRIR DASHBOARD',NULL,'M')?>" onClick="abrePagina('gerenciamento_dashboards','div_lista_de_layouts_relatorios');" /></a>
				    <a href="#" ><img  id="menu_save" src="../imagens/save.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle;" title="<?php echo traduzTexto('SALVAR DASHBOARD',NULL,'M')?>" onClick="mostraDiv('div_nome_dashboard','','form_nome_dashboard','1','1','0');" /></a>
				    																																																   
				    <a href="#" ><img id="img_save_as" src="../imagens/save_as.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('SALVAR DASHBOARD COMO',NULL,'M')?>" onClick="mostraDiv('div_nome_dashboard','','form_nome_dashboard','1','1','1');" /></a>
                    <!--<?php if($down_ativo!='1'){?>
                    		<img id="img_download" src="../imagens/download_disabled.png" height="22" style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('DOWNLOAD ARQUIVOS',NULL,'M')?>"/>&nbsp;&nbsp;<span style="font-size:20px;color:#666666;;vertical-align:middle">|</span>
                    <?php }else{?>
                    		<img id="img_download" src="../imagens/download.png" height="22" style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('DOWNLOAD ARQUIVOS',NULL,'M')?>" onClick="abrePagina('gerenciamento_arquivos_download','div_lista_de_layouts_relatorios');" onMouseOver="this.height='30';this.style.margin='-4px'" onMouseOut="this.height='22';this.style.margin='0px'"/>&nbsp;&nbsp;<span style="font-size:20px;color:#666666;;vertical-align:middle">|</span>
					<?php }?>-->
                   <a href="#" > <img src="../imagens/exit.png?<?php echo WRS_TEMP_RAND;?>"  style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('SAIR',NULL,'M')?>"  /></a>
	</div>
	</div>
	
					
					<script type="text/javascript">
					
					$(function(){

					 	function replace_image_title(object,typeObject)
					 	{
						 	$(object).find('img').each(function(){
							 	if(typeObject=='get'){
						 			$(this).attr('title_replace',$(this).attr('title'));
							 	}else{
							 		$(this).attr('title',$(this).attr('title_replace'));
								 }						 	
						 	});
					 	}

					 	
	/*					var dockOptions =
					    { 
							    size: 24  // set the maximum minor axis (horizontal) image dimension to 60px
							   
							        , fadeLayer: 'dock' // fade in the div.jqDock layer
							        	, fadeIn: 2000 // fade in over 2 seconds
					    };
*/
var dockOptions =
{ align: 'bottom' // horizontal menu, with expansion UP from a fixed BOTTOM edge
, flow: true,
size: 24 ,
 fadeLayer: 'dock' // fade in the div.jqDock layer
	, fadeIn: 2000 // fade in over 2 seconds
  //once div.jqDockWrap exists, append .greyBase...
, onReady: function(){ $('.jqDockWrap', this).append($('.greyBase')); }
};
						replace_image_title('#menu_apleDash','get');
						
				 


					 

			 

						if(isMobile.any()){
							//Quando for Ipad
							 $('.menu_aple,.menu_apleDash').css('display','block').addClass('wrs_icon_mini');
						}else{
							//NÃ£o Ipad
							
							  $('#menu_apleDash').jqDock(dockOptions);
							  setTimeout(function(){replace_image_title('.jqDockItem','replace');},2000);
							/*
									  $('#menu_apleDash').jqDock(dockOptions).each(function(){
				
												setTimeout(function(){
				
													$('.jqDock').removeAttr('style'); 
				
													$('.jqDock').Attr('style','position: absolute; top: 0px; left: 0px; padding: 0px; margin: 0px; margin-top:0px; overflow: visible; height: 25px; width: 210px;');
													
												},1000);
												
									 });
									setTimeout(function(){replace_image_title('.jqDockItem','replace');},2000);*/
						}//END isMobile.any()
					 
					 

					 
					});
					
				</script>
				    </td>
			   <td align="left" id="barra_status_menu">
				</td>
				<td width="460" align="right" style="vertical-align:middle">
					<span style="font-size:12px;" class="ui-state-active no-border"><?php echo $_SESSION['USER_DESC']?> - <?php echo $_SESSION['USER_TYPE']?> - </span>
				    <span style="font-size:12px;color:#FFFFFF;font-weight:bold"><?php echo $_SESSION['CUSTOMER_DESC']?></span>&nbsp;
				</td>
			</tr>
		</table>
	</div>
</div>

<div class="ui-layout-east" id="esquerda">
	<div id="div_atributos_metricas_icones" style="position:absolute;margin-top:0px;margin-left:122px;margin-left /*\**/: 120px\9;visibility:hidden"></div>
	<div id="div_atributos_metricas" style="height:99.5%;overflow-y:scroll;overflow-x:hidden;" class="ui-widget-content" >
    	<?php 
    	
    	$cubos_bd	=	isset($_SESSION['CUBOS_BD']) ? count($_SESSION['CUBOS_BD']) : NULL;
    	
    	if($cubos_bd>1){?>
			<div class="classe_mini_titulos ui-widget-header" style="width:99.5%;padding-left:3px">
				<?php echo traduzTexto('CUBO',$_SESSION['USER_LANGUAGE'],'M');?>
			</div>
			<div style="background-color:EAF4FD;padding-top:5px;padding-bottom:5px;text-align:center">
				<!--<span style="color:#1D5987;font-size:11px;font-weight:bold;padding-left:12px">CUBE:</span> -->
				  <select name="cmb_multi_cubos" id="cmb_multi_cubos" onChange="trocaCubo(this.value,'1')" style="font-size:11px">
					  <?php $cont_cubo_bd = 0;
							while($_SESSION['CUBOS_BD'][$cont_cubo_bd]){?> 
								 <option value="<?php echo $_SESSION['CUBOS_BD'][$cont_cubo_bd]?>" <?php if($_SESSION['CUBO_ATUAL']==$_SESSION['CUBOS_BD'][$cont_cubo_bd]){ echo 'SELECTED';}?>><?php echo $_SESSION['CUBOS_BD_DESC'][$cont_cubo_bd]?></option>
					  <?php 	 $cont_cubo_bd++;
						  }?>
				  </select>
			</div>
        <?php }?>
        <div class="classe_mini_titulos ui-widget-header" style="width:99.5%;">
			<table>
				<tr>
					<td style="color: #ffffff; font-weight: bold; text-align: left; width: 100%">
						<?php echo traduzTexto('RELATORIOS',$_SESSION['USER_LANGUAGE'],'M');?>
					</td>
				</tr>
			</table>
		</div>
        <div id="div_accordions_atributos">
        
        	<?php 
					echo $WRS_HTML_CUBO_RELATORIO;
        			//echo criaAccordion('accordion_relatorios','Relatorios',$_SESSION['CUBOS_ACCORDION'],'drag_relatorio',1,'drag_drop');
        	?>
        </div>
    </div>
</div>

<div class="ui-layout-west" id="direita">
	<div style="height:99.5%;overflow-y:scroll" class="ui-widget-content">
		<div class="classe_mini_titulos ui-widget-header wrs-navebar-height-min">
			<div class="navbar no-margin-padding width-90" >
					<div class="navbar-left wrs-padding-5"><?php echo traduzTexto('VISOES',$_SESSION['USER_LANGUAGE'],'M')?></div>
					<div class="btn-group navbar-right" role="group" aria-label="...">
					  <button type="button" class="btn btn-default btn-xs " id="div_botao_filtro_info"><span id="icone_info_accordions" class="ui-icon ui-icon-info" style="float: center;"></span></button>
					  <button type="button" class="btn btn-default btn-xs wrs_refresh_dashboard">	<img src="../imagens/apply.png" height="16" style="cursor:pointer;vertical-align:middle" title="<?php echo traduzTexto('APLICAR',$_SESSION['USER_LANGUAGE'],'M')?>"/></button>
					</div>
			</div>
		</div>
		<div style="height:auto;width:100%;overflow:hidden" id="conteudo_esquerda">
				<?php  echo $DASHBOARD_FILTER;?>
		</div>
		<div style="height:auto;width:100%;overflow:hidden" class="wrs_layout_by_quadrante"><!-- TELA APENAS PARA CONTER OS LAYOUTS PARA ESCOLHA --></div>
	</div>
</div>

<div id="div_lista_de_layouts_relatorios"></div>
<script type="text/javascript">

var PERFIL_FLAG_DRT = <?php echo ((strstr($_SESSION['PERFIL_FLAG'],"|DRT|")!==false) ? 1 : 0);?>;
var PERFIL_FLAG_DRD = <?php echo ((strstr($_SESSION['PERFIL_FLAG'],"|DRD|")!==false) ? 1 : 0);?>;
var PERFIL_FLAG_DRV	=<?php echo ((strstr($_SESSION['PERFIL_FLAG'],"|DRV|")!==false) ? 1 : 0);?>;						  


</script>

<script type="text/javascript" src="../<?php echo JS_PATH;?>dashboard_filtros.js?rand=<?php echo RAND_TOKEN;?>"></script>

<?php 
if(strpos($_SERVER['HTTP_USER_AGENT'],'MSIE')!==FALSE){
	$height_div_nome_dashboard = "style='height:229px'";
	$margin_top_botoes = "style='margin-top:3px'";
	$padding = "padding-top:3px";
}else{
	$margin_top_botoes = "style='margin-top:3px'";
	$padding = "padding-top:2px";
}
?>
<?php
$disabled = $cor_texto = NULL;
if($_SESSION['PERFIL_ID']!='ADM' && $_SESSION['PERFIL_ID']!='MST'){
	$disabled = 'disabled';
	$cor_texto='color:#BCBCBC';
} 

$conteudo = "<form id='form_nome_dashboard' name='form_nome_dashboard'>
				<table width='560'>
					<tr>
						<td colspan='2'>
							<span style='font-size:11px'>".traduzTexto('NOME DASHBOARD',$_SESSION['USER_LANGUAGE'],'M').":</span>
							<input type='text' id='txt_nome_dashboard' style='width:430px;font-size:11px'/>
							<input type=\"hidden\" id=\"hd_save_as\" name=\"hd_sava_as\"/>
						</td>
					</tr>
					<tr>
						<td colspan='2'>
							<input type='checkbox' id='check_compartilhar_dashboard' name='check_compartilhar_dashboard' ".$disabled." />
							<span style='font-size:11px;".$cor_texto."'>".traduzTexto('COMPARTILHAR',$_SESSION['USER_LANGUAGE'],'M')."</span>
							<input type='checkbox' id='check_auto_load_dashboard' name='check_auto_load_dashboard'/>
							<span style='font-size:11px'>".traduzTexto('CARGA AUTOMATICA',$_SESSION['USER_LANGUAGE'],'M')."</span>
							<input type='hidden' id='hd_dashboard_id' name='hd_dashboard_id'/>
						</td>
					</tr>
				</table>
        	</form>";
$botoes = "SALVAR|FECHAR";
$eventos_botoes = "salvaAtualizaDashboard(document.getElementById('txt_nome_dashboard').value,document.getElementById('hd_dashboard_id').value)|escondeDiv('div_nome_dashboard');tiraLoad()";
constroiDialog('div_nome_dashboard','SALVAR DASHBOARD',$conteudo,$botoes,$eventos_botoes,$_SESSION['LARGURA_TELA'],$_SESSION['ALTURA_TELA'],580,157,'centro',0,'centro',175,'none');
?>
<?php 
//Div de Atributos (Filtros) DASHBOARD/RELATORIO COMPARTILHADOS
$conteudo = "<form id='form_filtros_compartilhados' name='form_filtros_compartilhados'>
				<table width='373'>
					<tr>
						<td colspan='2' class='wrs_form_filtros_compartilhados'>
							
							<div id='div_multi_select_filtros_compartilhados'>
										<div class='row'>
										  <div class='col-xs-5 col-md-5'>
													".traduzTexto('FILTROS',$_SESSION['USER_LANGUAGE'],'M')."<br><span class='wrs_filtro_unshared'>
													".$FILTRO_UNSHARED."</span>
										  </div>
										  <div class='col-xs-2 col-md-2'><br><br>
													<button class='btn   btn-default btn_click_filtro_change_select' event='shared'  type='button'><span class='glyphicon glyphicon-chevron-right'></span></button><br>
													<button class='btn  btn-default btn_click_filtro_change_select' event='unshared'  type='button'><span class='glyphicon glyphicon-chevron-left'></span></button>
										  </div>
										  <div class='col-xs-5 col-md-5 wrs_filtro_shared'>
												Filtros Compartilhados<br>
												".$FILTRO_SHARED."
											</div>
										</div>
						</div>
						</td>
					</tr>
				</table>
        	</form>";
$botoes = "OK|FECHAR";


$eventos_botoes = "WRS_open_modify_filter()|WRS_open_modify_filter()";

constroiDialog('div_filtros_compartilhados','COMPARTILHAR FILTROS',$conteudo,$botoes,$eventos_botoes,$_SESSION['LARGURA_TELA'],$_SESSION['ALTURA_TELA'],430,205,'centro',0,'centro',175,'none');
?>
<div id="dialog_alert_personalizado" style="position:absolute;z-index:9999999999"></div>
<div id="div_principal_google_maps" style="position:absolute;z-index:9999999999;height:530px;width:1208px;visibility:hidden;" class="ui-state-default ui-corner-all">
	<div id="div_google_maps" style="height:490px;width:1200px;display:block;margin-left:4px;margin-top:4px" class="ui-corner-all"></div>
    <div style="text-align:center;padding:4px" class="ui-corner-all">
    	<button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="fechaMapa()">
        <span class="ui-button-text"><?php echo traduzTexto('FECHAR',$_SESSION['USER_LANGUAGE'],'M')?></span>
        </button>
    </div>
</div>
<?php unset($_SESSION['INFOS_DASH']);?>

<script type="text/javascript">

/**
 * LOAD CONFIGURAÇÕES LOCAIS
 */
$(function(){

	/*
	 * Apenas para modificar o Hover dos Relatorio
	 */
	 WRS_LOAD_DASHBOARD_EVENT();
	
});


</script>

<?php 
	include_once(PATH_TEMPLATE.'footer.php');
?>

<!-- Esta Classe é utilizada apenas para troca e armazenamento de informações temporária das ABAS do Dash -->
<div class="DASHBOARD_SWAP"></div>