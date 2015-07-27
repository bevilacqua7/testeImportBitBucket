<!DOCTYPE dhtml>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br"> 
<HEAD>
<meta charset="utf-8" />
<meta http-equiv="content-type" content="text/html" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WRS - Web Report System</title>

<script type="text/javascript" src="../js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.8.21.custom.js"></script>
<script type="text/javascript" src="../js/jquery.layout-latest.js"></script>
<script type="text/javascript" src="../js/jquery.layout.resizePaneAccordions-1.0.js"></script>
<script type="text/javascript" src="../js/jqGrid/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="../js/jqGrid/jquery.jqChart.min.js"></script>
<script type="text/javascript" src="../js/jqGrid/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="../js/contextMenu/jquery.contextMenu.js"></script>
<script type="text/javascript" src="../js/contextMenu/jquery.ui.position.js"></script>
<script type="text/javascript" src="../js/contextMenu/jquery.contextMenu.js"></script>
<script type="text/javascript" src="../js/jquery.ui.touch-punch.min.js"></script>
<!-- Biblioteca para PRINTAR a tela-->
<script type="text/javascript" src="../js/html2canvas.min.js"></script> 
<script type="text/javascript" src="../js/canvg.js"></script> 
<script type="text/javascript" src="../js/rgbcolor.js"></script> 
<script type="text/javascript" src="../js/blockUI.js"></script>
<script type="text/javascript" src="../js/googlemaps.js"></script>
<script type="text/javascript" src="../http://maps.googleapis.com/maps/api/js?key=AIzaSyAvq_yJP8-zcJZNuwF47gmhIGPXQhjlTgE&sensor=true"></script>
<script type="text/javascript" src="../js/funcoes.js?2835"></script>
<script type="text/javascript" src="../js/php_js.js?2835"></script>
<script type="text/javascript" src="../js/ajax.js"></script>
<script type="text/javascript" src="../js/ajax_funcoes.js?9855"></script>
<script type="text/javascript" src="../js/overlib.js?1816"></script>
<script type="text/javascript" src="../api/jQuery-Mac-like-Dock-Menu-Plugin-jqdock/jquery.jqDock.js"></script>

<!--CSS-->
<link rel="stylesheet" type="text/css" href="estilo.css" />
<link rel="stylesheet" type="text/css" href="../css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" href="../js/contextMenu/jquery.contextMenu.css" />
<link rel="stylesheet" type="text/css" href="../api/style.css?788269042" />
<link rel="stylesheet" type="text/css" href="../api/jQuery-Mac-like-Dock-Menu-Plugin-jqdock/aple.css?v=0.0.1" />
<link rel="stylesheet" type="text/css" href="../css/estilo.css" />
<link rel="stylesheet" type="text/css" href="../css/estilo_jquery.css" />
<link rel="stylesheet" type="text/css" href="../css/layout-default-latest.css" />
<link rel="stylesheet" type="text/css" href="../css/theme-azul/jquery-ui-1.8.22.custom.css?v=1.0" />
<link rel="stylesheet" type="text/css" href="../css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" href="../js/contextMenu/jquery.contextMenu.css" />


<script type="text/javascript">
//Variavel global que estancia o mapa
var map;

var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	}
};

function pad(val){
	var valString = val + "";
	if(valString.length < 2){
		return "0" + valString;
	} else {
		return valString;
	}
}

$(document).ready(function (){
    SizeBar = (isMobile.any() ? 16 : 8);

	myLayout = $('body').layout({ 
		applyDefaultStyles: true,
		name: "wrs_Layouts",

		// Define o tamanho de cada Painel
		north__size: 70,
		south__size: 35,
		west__size: 230,
		east__size: 230,

		// Retira o Resize do North + South
		north__resizable: false,
		south__resizable: false,

		// Define que os Paineis Permitem Menus Sobre os Elementos
		north__showOverflowOnHover: true,
		south__showOverflowOnHover: true,
		center__showOverflowOnHover: true,
		west__showOverflowOnHover: true,
		east__showOverflowOnHover: true,

		// Define o tamanho das Barras
        north__spacing_open:	SizeBar,
        north__spacing_closed:	SizeBar,
        south__spacing_open:	SizeBar,
        south__spacing_closed:	SizeBar,
        west__spacing_open:		SizeBar+2,
        west__spacing_closed:	SizeBar+2,
        east__spacing_open:		SizeBar+2,
        east__spacing_closed:	SizeBar+2,

		// Painel de Cima (Cabeçalho)
		north__togglerLength_open:  "100",
		north__togglerLength_closed:  "200",
		north__togglerTip_open: "Oculta Cabeçalho",
		north__togglerTip_closed: "Exibe Cabeçalho",
		north__togglerContent_open: "<span class='ui-icon ui-icon-triangle-1-n' style='margin-left:43px;margin-top:-4px'></span>",
		north__togglerContent_closed: "<span class='ui-icon ui-icon-triangle-1-s' style='margin-left:89px;margin-top:-4px'></span>",
		north__onopen: function () {
			document.getElementById('div_visao_consulta').style.top = '83px';
			if(document.getElementById('cmb_grid_grafico').value=='ALL'){
				chamaAcertaTamanhoPosicionamentoGrid();
			}else{
				chamaAcertaTamanhoPosicionamentoGrid(16);
			}
		},
		north__onclose: function () {
			document.getElementById('div_visao_consulta').style.top = '12px';
			if(document.getElementById('cmb_grid_grafico').value=='ALL'){
				chamaAcertaTamanhoPosicionamentoGrid();
				//chamaAcertaTamanhoPosicionamentoGrid(-17);
			}else{
				chamaAcertaTamanhoPosicionamentoGrid();
			}
		},

		// Painel de Baixo (Rodapé)
		south__togglerLength_open:  "100",
		south__togglerLength_closed:  "200",
		south__togglerTip_open: "Oculta Rodapé",
		south__togglerTip_closed: "Exibe Rodapé",
		south__togglerContent_open: "<span class='ui-icon ui-icon-triangle-1-s' style='margin-left:43px;margin-top:-4px'></span>",
		south__togglerContent_closed: "<span class='ui-icon ui-icon-triangle-1-n' style='margin-left:89px;margin-top:-4px'></span>",
		south__onopen: function () {
			chamaAcertaTamanhoPosicionamentoGrid();
		},
		south__onclose: function () {
			if(document.getElementById('cmb_grid_grafico').value=='ALL'){
				chamaAcertaTamanhoPosicionamentoGrid();
				//chamaAcertaTamanhoPosicionamentoGrid(-17);
			}else{
				chamaAcertaTamanhoPosicionamentoGrid();
			}
		},

		// Painel da Esquerda (Filtros)
		west__togglerLength_open:  "100",
		west__togglerLength_closed:  "200",
		west__togglerTip_open: "Oculta Filtros",
		west__togglerTip_closed: "Exibe Filtros",
		west__resizerTip: "Redimensiona Filtros",
		west__togglerContent_open: "<span class='ui-icon ui-icon-triangle-1-w' style='margin-left:-4px'></span>",
		west__togglerContent_closed: "<span class='ui-icon ui-icon-triangle-1-e' style='margin-left:-4px'></span>",
		west__onresize: function () {
        	$('#accordion').accordion('resize');
    	},
		west__onopen: function () {
			var navegador = navigator.userAgent;
			if(document.getElementById('cmb_grid_grafico').value=='ALL'){
				if(navegador.indexOf('Safari')!=-1){
					chamaAcertaTamanhoPosicionamentoGrid(-16);
				}else{
					if(navegador.indexOf('Firefox')!=-1){
						chamaAcertaTamanhoPosicionamentoGrid();
					}else{
						chamaAcertaTamanhoPosicionamentoGrid();
					}
				}
			}else{
				if(navegador.indexOf('Safari')!=-1){
					chamaAcertaTamanhoPosicionamentoGrid();
				}else{
					if(navegador.indexOf('Firefox')!=-1){
						chamaAcertaTamanhoPosicionamentoGrid(17);
					}else{
						chamaAcertaTamanhoPosicionamentoGrid(17);	
					}
				}
			}
		},
		west__onclose: function () {
			if(document.getElementById('cmb_grid_grafico').value=='ALL'){
				chamaAcertaTamanhoPosicionamentoGrid();
				//chamaAcertaTamanhoPosicionamentoGrid(-17)
			}else{
				chamaAcertaTamanhoPosicionamentoGrid();
			}
		},

		// Painel da Direita (Layouts)
		east__togglerLength_open:  "100",
		east__togglerLength_closed:  "200",
		east__togglerTip_open: "Oculta Layouts",
		east__togglerTip_closed: "Exibe Layouts",
		east__resizerTip: "Redimensiona Layouts",
		east__togglerContent_open: "<span class='ui-icon ui-icon-triangle-1-e' style='margin-left:-4px'></span>",
		east__togglerContent_closed: "<span class='ui-icon ui-icon-triangle-1-w' style='margin-left:-4px'></span>",
		east__onopen: function () {
			mudaVisao("layouts");
		},
		east__onclose: function () {
			mudaVisao("relatorios");
		},
		
		// Habilita ou Desabilita Area de Drag and Drop
		east__initClosed: true,
		
		//Desabilita a funcionalidade de abrir os paineis pelo teclado com CTRL+Seta
		enableCursorHotkey: false,
		slidable: false
	});
	
	// Variaveis de Chamada Ajax
	var ajax_ID;
	var xhrAjax;

	// Ativa Relogio
	var totalSeconds = 0;
	//setInterval(setTimeClock, 1000);
});

</script> 
</HEAD>

<div id="loaderBox" style="display:none"></div>
<div id="loader" style="display:none">
	<img id="loaderImg" src="../imagens/loader_azul.gif"/>
	<p><div id="clock"><label id="minutes">00</label>:<label id="seconds">00</label></div></p>
	<p><input id="loaderCancel" type="button" value="Cancel" onClick="if(xhrAjax && xhrAjax.readystate != 4){xhrAjax.abort(); xhrAjax = undefined; tiraLoad();};"></p>
</div>

<BODY>
<div id="div_visao_consulta">
    <span class="fonte12">Visão: </span>
    <select name="cmb_grid_grafico" id="cmb_grid_grafico" onChange="atualizaVisaoRelatorioAtual();chamaMontaGrafico(this.value);" >
       <option value="G">Grid</option>
       <option value="GR">Chart</option>
       <option value="M">Map</option>
       <option value="ALL">Grid e Chart</option>
       <option value="ALL2">Grid e Map</option>
    </select>
</div>
<?php 
//hiddens
include("hiddens_index_panel.php");
?>
<div class="ui-layout-center" id="centro">

    <div id="div_escolhe_layouts"><div class="ui-icon ui-icon-circle-plus" onClick="abreFechaRecarregaEscolheLayouts()" title="Troca Layout"></div></div>
	<div id="div_background_transparente_layout" class="ui-widget-shadow ui-corner-all"></div>
    <div id="div_background_layout" class="ui-widget ui-widget-content ui-corner-all"></div>
	
    <div>
		<div id="div_sem_resultado" class="ui-state-default" align="center" valign="middle"></div>
		<div id="conteudo_central">
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
				  <div><span class="titulo_place">Colunas</span>
					 <table class="ui-state-focus tabela_place_colunas" border="0">
						  <tr>
							  <td class='attribute' id="place_colunas" align="center"></td>
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
				  <div><span class="titulo_place">Linhas</span>
					  <table class="ui-state-focus tabela_place_linhas" border="0">
						  <tr>
							  <td class='attribute' id="place_linhas" align="center"></td>
						  </tr>
					  </table>
				  </div>
			  </td>
			  <td width="130" align="center">
				  <div><span class="titulo_place">Metricas</span>
					 <table class="ui-state-focus tabela_place_metricas" border="0">
						  <tr>
							  <td class='metrica' id="place_metricas" align="center" ></td>
						  </tr>
					  </table>
				  </div>
			  </td>
			</tr>
		</table>
	</div>
	<div id='place_abas'></div>
</div>

<div class="ui-layout-north" style="overflow-y:hidden;overflow-x:hidden;border:solid 0 #F7F7F7">
	<?php include('topo_index_panel.php');?> 	
</div>

<div class="ui-layout-south" style="overflow-y:hidden;overflow-x:hidden;border:solid 0 #F7F7F7">
	<?php include('rodape_index_panel.php');?> 
</div>

<div class="ui-layout-east" id="esquerda">
	<div id="div_atributos_metricas_icones"></div>
	<div id="div_atributos_metricas" class="ui-widget-content">
		<div class="classe_mini_titulos ui-widget-header" style="width:99.5%;">
			<table>
				<tr>
					<td class="titulo_container">Atributos</td>
					<td>
						<div class='ui-state-default ui-corner-all e7' id="wrs-ico" onMouseOver="this.className='ui-state-hover ui-corner-all'" onMouseOut="this.className='ui-state-default ui-corner-all'" onClick="mostraDiv('div_nome_layout','1','form_nome_layout','1')">
						     <span class="ui-icon ui-icon-disk" style="float: center" title="Salvar"></span>
						</div>
					</td>
					<td>
						<div class='ui-state-default ui-corner-all e7' id="wrs-ico" onMouseOver="this.className='ui-state-hover ui-corner-all'" onMouseOut="this.className='ui-state-default ui-corner-all'" onClick="abrePagina('gerenciamento_layouts','div_lista_de_layouts_relatorios')">
						     <span class="ui-icon ui-icon-folder-open" style="float: center" title="Abrir"></span>
						</div>
					</td>
				</tr>
			</table>
		</div>
        <div id="div_accordions_atributos">
       		<?php include('accordion_atributos.php');?> 	        
        </div>
        <div class="classe_mini_titulos ui-widget-header" style="width:99.5%;padding-left:3px">Metricas</div>
        <div id="div_accordions_metricas">
        	<?php include('accordion_metricas.php');?> 			
		</div>
    </div>
</div>

<div class="ui-layout-west" id="direita">
	<div style="height:99.5%;overflow-y:scroll" class="ui-widget-content">
		<div class="classe_mini_titulos ui-widget-header">
			<table>
				<tr>
					<td class="titulo_container">Filtros</td>
					<td>
						<div id="div_botao_filtro_info" class='ui-state-default ui-corner-all e7' onMouseOver="this.className='ui-state-hover ui-corner-all';mostraFiltrosSelecionados('1');" onMouseOut="this.className='ui-state-default ui-corner-all';mostraFiltrosSelecionados('-1');" onClick="mostraFiltrosSelecionados('2');">
							<span id="icone_info_accordions" class="ui-icon ui-icon-info" style="float:center;" onClick="tentaFechaAtualizaAccordionAberto()"></span>
						</div>
					</td>
					<td>
						<div class="ui-state-default ui-corner-all e7" onMouseOver="this.className='ui-state-hover ui-corner-all'" onMouseOut="this.className='ui-state-default ui-corner-all'" onClick="fechaAtualizaAccordionAberto('1')">
							<img src="../imagens/apply.png" height="18" style="cursor:pointer;vertical-align:middle" title="Aplicar"/>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="height:auto;width:100%;  overflow:hidden" id="conteudo_esquerda">
			 <table class="e8" border="0">
				  <tr>
					  <td class='attribute' id="place_filtros" align="center" valign="top"></td>
				  </tr>
			  </table>
		</div>
	</div>
</div>
<div id="div_lista_de_layouts_relatorios"></div>
<?php 
//div_layout
include("conteudo_div_layouts.php");
//div_relatorio
include("conteudo_div_relatorios.php");
//div_tipos_graficos
include("conteudo_div_tipos_graficos.php");
//div_relatorio
include("conteudo_div_print_tela_email.php");  
?>    
<div id="dialog_alert_personalizado" style="position:absolute;z-index:9999999999"></div>
<?php 
//div_relatorio
include("conteudo_div_principal_google_maps.php");  
?>
<script type="text/javascript">
	$(function(){
		if(!isMobile.any()){
			$("#div_nome_layout").draggable();
			$("#div_nome_relatorio").draggable();
			$("#div_tipos_graficos").draggable();
			$("#div_print_tela_email").draggable();
		}else{
			$("#div_nome_layout").draggable( "destroy" );
			$("#div_nome_relatorio").draggable( "destroy" );
			$("#div_tipos_graficos").draggable( "destroy" );
			$("#div_print_tela_email").draggable( "destroy" );
		}
		wrs_window_center('#div_nome_layout');
		wrs_window_center('#div_nome_relatorio');
		wrs_window_center('#div_tipos_graficos');
		wrs_window_center('#div_print_tela_email');	
	});

	$('input,textarea').click(function(){$(this).focus();})
</script>
</BODY>
</HTML>