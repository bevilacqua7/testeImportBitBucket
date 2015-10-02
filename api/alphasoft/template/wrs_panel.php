<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br" class="k-webkit k-webkit43 k-bootstrap"> 

<head>
 <meta charset="ISO_8859-1">

<script>
var wrs_panel_layout		=	'';
var jqueryLayoutOptions		=	{};
var CUBE_S					=  <?php echo fwrs_request(TAG_URL_CUBE_SELECTED); ?>;
var TAG_URL_CUBE_SELECTED	=  '<?php echo TAG_URL_CUBE_SELECTED; ?>';

var ATRIBUTOS_JSON			= '<?php echo $ATRIBUTOS_JSON; ?>';	
var METRICAS_JSON			= '<?php echo $METRICAS_JSON; ?>';

var MEASURE_RELATIONSSHIPS	= '<?php echo base64_encode(json_encode($MEASURE_RELATIONSSHIPS,true));?>';

</script>
<title><?PHP echo LNG('TITLE');?></title>

<!-- Fonte font-awesome-4.3.0 -->
 <link href="api/font-awesome-4.3.0/css/font-awesome.min.css?v=0.0.1" rel="stylesheet" type="text/css" />

  
<link rel="stylesheet" type="text/css" href="api/bootstrap-3.3.0/dist/css/bootstrap.css" />

<link rel="stylesheet" href="css/jquery/jquery-ui.css">

<script type="text/javascript" src="js/jquery-ui/jquery-latest.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>


  

<!-- BOOT STRAP -->
<script type="text/javascript" src="api/bootstrap-3.3.0/js/dropdown.js?<?php echo RAND_TOKEN;?>"></script>

<!--  Conversões das funções do PHP para javascript -->
<script type="text/javascript" src="api/alphasoft/js/php_js.js?<?php echo RAND_TOKEN;?>"></script>

<script type="text/javascript" src="js/jquery-ui/jquery-ui.js"></script>

<!--  Ativa o Jquery para Mobile -->
<script type="text/javascript" src="js/jquery-ui/jquery.ui.touch-punch.min.js"></script>

<!--  Complemento da API jqueryLayout -->
<script type="text/javascript" src="js/jquery-ui/jquery.layout-latest.js"></script>

<!--  Funções comuns do WRS -->
<script type="text/javascript" src="api/alphasoft/js/common.js?<?php echo RAND_TOKEN;?>"></script>

<!--  Configurações do idioma  -->
<script type="text/javascript" src="language_javascript.php?<?php echo RAND_TOKEN;?>"></script>

 <!--  Configurações do Contex Menu -->
  <script src="api/contextMenu/src/jquery.contextMenu.js" type="text/javascript"></script> 
  <link href="api/contextMenu/src/jquery.contextMenu.css?v=0.0.1" rel="stylesheet" type="text/css" />

 <!--  JS do BootStrap -->
  <script src="api/bootstrap-3.3.0/js/modal.js" type="text/javascript"></script> 
<!-- <script src="api/bootstrap-3.3.0/dist/js/bootstrap.min.js"></script> -->   
  
<!-- API MODAL ALERT-->

<link href="api/jquery.modal-1.2/css/jquery.modal.wrs.job.css" type="text/css" rel="stylesheet" /> <!-- Gerenciador de JOBS -->
<link href="api/jquery.modal-1.2/css/jquery.modal.css" type="text/css" rel="stylesheet" />
<link href="api/jquery.modal-1.2/css/jquery.modal.theme-xenon.css" type="text/css" rel="stylesheet" />
<link href="api/jquery.modal-1.2/css/jquery.modal.theme-atlant.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="api/jquery.modal-1.2/js/jquery.modal.min.js"></script>
  
  
  
<link rel="stylesheet" href="api/alertify/themes/alertify.core.css" />
<link rel="stylesheet" href="api/alertify/themes/alertify.default.css" id="toggleCSS" />
<script src="api/alertify/src/alertify.js"></script>
	
  
  
  <!--  SLIDER -->

	<link rel="stylesheet" href="api/jslider-master/css/jslider.css" type="text/css">
	<link rel="stylesheet" href="api/jslider-master/css/jslider.blue.css" type="text/css">
	<link rel="stylesheet" href="api/jslider-master/css/jslider.plastic.css" type="text/css">
	<link rel="stylesheet" href="api/jslider-master/css/jslider.round.css" type="text/css">
	<link rel="stylesheet" href="api/jslider-master/css/jslider.round.plastic.css" type="text/css">
	
	
	
	<script type="text/javascript" src="api/jslider-master/js/jshashtable-2.1_src.js"></script>
	<script type="text/javascript" src="api/jslider-master/js/jquery.numberformatter-1.2.3.js"></script>
	<script type="text/javascript" src="api/jslider-master/js/tmpl.js"></script>
	<script type="text/javascript" src="api/jslider-master/js/jquery.dependClass-0.1.js"></script>
	<script type="text/javascript" src="api/jslider-master/js/draggable-0.1.js"></script>
	<script type="text/javascript" src="api/jslider-master/js/jquery.slider.js"></script>
	
  <!-- end -->
  

<!--  CONTEXT MENU JS COM BOOTSTRAP -->
<link href="api/contextjs/context.bootstrap.css" type="text/css" rel="stylesheet" />
<link href="api/contextjs/context.standalone.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="api/contextjs/context.js"></script>

<link href="api/silviomoreto-bootstrap-select/dist/css/bootstrap-select.min.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="api/silviomoreto-bootstrap-select/js/bootstrap-select.js"></script>
  
<!-- Configugraçlão para  Telerik GRID e Gráficos -->  
    <link href="api/kendoUi/styles/kendo.common.min.css" rel="stylesheet">
    <link href="api/kendoUi/styles/kendo.default.min.css" rel="stylesheet">
   	
   	<link href="api/kendoUi/styles/kendo.rtl.min.css" rel="stylesheet">
    <link href="api/kendoUi/styles/kendo.dataviz.min.css" rel="stylesheet">
	
    <link href="api/kendoUi/styles/kendo.blueopal.min.css" rel="stylesheet">
	
    <link href="api/kendoUi/styles/kendo.dataviz.default.min.css" rel="stylesheet">
    <link href="api/kendoUi/styles/kendo.mobile.all.min.css" rel="stylesheet">



 	<script src="api/kendoUi/js/angular.min.js"></script>
 	
 	
   <!--<script src="api/kendoUi/js/kendo.all.minDEBUG.js?<?php echo RAND_TOKEN;?>"></script>-->
   
  <script src="api/kendoUi/src/js/kendo.all.js?<?php echo RAND_TOKEN;?>"></script>

   
    
    <script src="api/kendoUi/examples/content/shared/js/console.js"></script>
	<script src="api/kendoUi/js/messages/kendo.messages.pt-BR.min.js"></script>
	<script src="api/kendoUi/js/jszip.min.js"></script>
<script src="api/kendoUi/js/kendo.dataviz.themes.min.js"></script>   	

	 <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAvq_yJP8-zcJZNuwF47gmhIGPXQhjlTgE&sensor=true&v=3.exp"></script>
	<script type="text/javascript" src="api/gomap/jquery.gomap-1.3.3.js"></script>



  
	<!--  PLIGIN WRS -->
	<script type="text/javascript" src="api/alphasoft/js/WRSKendoUi.js?<?php echo RAND_TOKEN;?>"></script>
    <script type="text/javascript" src="api/alphasoft/js/WRSFilter.js?<?php echo RAND_TOKEN;?>"></script>
    <script type="text/javascript" src="api/alphasoft/js/WRSDrill.js?<?php echo RAND_TOKEN;?>"></script>
    <script type="text/javascript" src="api/alphasoft/js/WRSMultipleCube.js?<?php echo RAND_TOKEN;?>"></script>
    
    
        
        
    
    
  <link rel="stylesheet" href="api/fakeLoader/fakeLoader.css">
  <script type="text/javascript" src="api/fakeLoader/fakeLoader.js"></script>
  
  
  
  <!--  COLOR PICKER -->
  
 
  
  
  	<!--[if lt IE 8]>
    	<link href="api/compatibilidade/bootstrap-ie7-master/css/bootstrap-ie7.css" rel="stylesheet">
	<![endif]-->


     <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  
  
<!-- Configurações do TOOLTIP -->  
<link href="api/jquery.qtip.custom/jquery.qtip.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="api/jquery.qtip.custom/jquery.qtip.min.js"></script>

<!-- WRS THEME -->
<link rel="stylesheet" type="text/css" href="css/<?php echo WRS::INFO_SSAS_LOGIN('USER_FORMAT')?>/jquery-ui-1.8.22.custom.css" />
<!-- <link rel="stylesheet" type="text/css" href="css/theme-verde/jquery-ui-1.8.22.custom.css" />  -->
<link rel="stylesheet" type="text/css" href="css/wrs_panel.css?<?php echo RAND_TOKEN;?>" />
<link rel="stylesheet" type="text/css" href="css/wrs_common.css?<?php echo RAND_TOKEN;?>" />


	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
<div id="fakeloader"></div><script type="text/javascript">$("#fakeloader").fakeLoader();</script>

<div class="ui-layout-center"><?php include 'wrs_panel_body.php';?></div>

<div class="ui-layout-north ui-state-focus"><?php include 'wrs_panel_header.php';?></div>
<div class="ui-layout-south ui-state-focus"><?php include 'wrs_menu_button.php';?></div>

<div class="ui-layout-east "><?php include 'wrs_panel_direito.php'; ?></div>
<div class="ui-layout-west "><?php include 'wrs_panel_esquerdo.php'; ?></div>



<script type="text/javascript" src="js/alphasoft/wrs_panel.js?<?php echo rand(0,9999999);?>"></script>

<script type="text/javascript" src="js/alphasoft/common_plugins.js?<?php echo rand(0,9999999);?>"></script>




<?php 
/*
	$result_box							= array();
	
	
	$result_box['LAYOUT_ROWS']			=	array('__FORCADEVENDASREGIONAL','__FORCADEVENDASDISTRITAL','__GEOGRAFIABRICK');
	$result_box['LAYOUT_COLUMNS']		=	array('__PERIODOANO','__PERIODOSEMESTRE');
	$result_box['LAYOUT_MEASURES']		=	array('__MeasuresShareDolar','__MeasuresEvolDolar','__MeasuresDolar');
	$result_box['LAYOUT_FILTERS']		=	array(	array('__MERCADOMERCADO','',array('[MERCADO].[MERCADO].[D06-BACTROBAN]','[MERCADO].[MERCADO].[D-CX-ACNE LIMPEZA]')),
			array('__PRODUTOLABORATORIO','','[PRODUTO].[LABORATORIO].[GSK FARMA]'));*/
	
	
	/*$result_box['LAYOUT_FILTERS']		=	array(	array('__MERCADOMERCADO','',array('[MERCADO].[MERCADO].[D06-BACTROBAN]','[MERCADO].[MERCADO].[D-CX-ACNE LIMPEZA]')),
													array('__PRODUTOLABORATORIO','','[PRODUTO].[LABORATORIO].[GSK FARMA]'));
													*/
	
	
	/*
							 	,
							 	'[PERIODO].[ANO]',
							 	'[Measures].[Share Dolar],[Measures].[Evol. Dolar],[Measures].[Dolar]',
							 	'{[MERCADO].[MERCADO].[D06-BACTROBAN]},{[PRODUTO].[LABORATORIO].[GSK FARMA]}',
								
								*/
	/*
	$result_box['LAYOUT_ROWS']			=	array('__PRODUTOMARCA','__GEOGRAFIABRICK');
	$result_box['LAYOUT_COLUMNS']		=	array('__PERIODOANO');
	$result_box['LAYOUT_MEASURES']		=	array('__MeasuresShareDolar','__MeasuresEvolDolar','__MeasuresDOLAR');
	$result_box['LAYOUT_FILTERS']		=	array(array('__MERCADOMERCADO','','[MERCADO].[MERCADO].[D06-BACTROBAN_MKT]'));
	
	*/
	
	
	/*
		$result_box							= array();
	$result_box['LAYOUT_ROWS']			=	array('__FORCADEVENDASUNIDADE','__FORCADEVENDASREGIONAL','__FORCADEVENDASSETOR');
	$result_box['LAYOUT_COLUMNS']		=	array('__PERIODOANO');
	$result_box['LAYOUT_MEASURES']		=	array('__MeasuresShareDolar','__MeasuresEvolDolar','__MeasuresDolar');
	$result_box['LAYOUT_FILTERS']		=	array(array('__MERCADOMERCADO','','[MERCADO].[MERCADO].[D06-BACTROBAN]'));
	*/
?>
 <script>
// set_value_box_relatorio(<?php echo json_encode($result_box,true);?>);
 </script>
 
 
<!-- MODAL WINDOW GRID -->
<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" >
    <div class="modal-content modal-content-grid"></div>
  </div>
</div>
<!-- END MODAL WINDOW GRID -->

<!-- Modal MODAL CHART CONFIGURE-->
<?php include 'modal_chart.php'; ?>
<!--END MODAL CHART CONFIGURE-->

<!-- Modal MODAL GENERIC CONFIGURE-->
<?php include 'modal_generic.php'; ?>
<!--END MODAL GENERIC CONFIGURE-->

<!-- Modal MODAL CONFIRM-->
<?php include 'modal_confirm.php'; ?>
<!--END MODAL CONFIRM-->

</body>



</html>