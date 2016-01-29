<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br" class="k-webkit k-webkit43 k-bootstrap"> 

<head>
 <meta charset="ISO_8859-1">
<?PHP
	$request_exec_report		=	fwrs_request('exec_reports');
	$idTag	=	NULL;
	include_once(PATH_TEMPLATE.'scripts_ini.php');
?>

<title><?PHP echo LNG('TITLE');?></title>

<script>
	not_close_save_info();
</script>	
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
// set_value_box_relatorio(<?php /*echo json_encode($result_box,true);*/?>);
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

<?PHP include_once(PATH_TEMPLATE.'upload_script.php'); ?>
</body>

<script>
$(function(){
	$(ABA_TAG_NAME).wrsAbas('auto_load', AUTO_LOAD);

	controllers_layout();//click controllers layout
})
</script>

</html>