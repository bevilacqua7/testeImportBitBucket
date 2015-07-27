<ul class="nav nav-pills wrs_menu">
  <li role="presentation"><a href="run.php?file=WRS_MAIN&class=WRS_MAIN&ncon"><i class="wrs_icon wrs_home"></i></a></li>
  <li role="presentation"><a href="#"><i class="wrs_icon wrs_new"></i></a></li>
  <li role="presentation"><a href="#" class="wrs_open_modal" data-toggle="modal" data-target="#myModal"><i class="wrs_icon wrs_open"></i></a></li>
  <li role="presentation"><a href="#"><i class="wrs_icon wrs_save" data-toggle="modal" data-target="#myModalChartConfig"></i></a></li>
  <li role="presentation"><a href="#"><i class="wrs_icon wrs_save_how"></i></a></li>
  <li role="presentation"><a href="#"><i class="wrs_icon wrs_download"></i></a></li>
  <li role="presentation"><a href="run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout"><i class="wrs_icon wrs_out"></i></a></li>
  
  <li role="presentation" class="ui-state-active wrs_panel_info_hover ">Detalhes ao passar o mouse</li>
</ul>
<div class="rodape_name_right"><span class="glyphicon glyphicon-user"></span> <span class="ui-state-active"><?php echo $HTML_USER_NAME;?></span> | <?php echo $HTML_CUSTOMER_NAME;?>

</div>

<SCRIPT>

$(function(){
$('.wrs_menu a').hover(
		  function() {
			    $( this ).parent().addClass( 'ui-state-active');
			  }, function() {
				  $( this ).parent().removeClass( 'ui-state-active');
			  }
			);
});
</SCRIPT>