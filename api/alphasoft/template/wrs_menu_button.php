<ul class="nav nav-pills wrs_menu_footer">

<!--  bkp ICONS MENU OLD
  
-->

  <li role="presentation"><a href="run.php?file=WRS_MAIN&class=WRS_MAIN&ncon"><i class="fa default_bk_button_menu" style="
													    background-image: url(imagens/icons/home.png);
													"></i></a></li>  
  <li role="presentation"><a href="#" class="wrs_open_modal"><i class="fa default_bk_button_menu" style="
													    background-image: url(imagens/icons/open.png);
													"></i></a></li>
  <li role="presentation"><a href="#" class="wrs_open_save" data-toggle="modal" data-target="#myModal"><i class="fa default_bk_button_menu" style="
													    background-image: url(imagens/icons/save.png);
													"></i></a></li>
  <li role="presentation"><a href="#"  class="link"><i class="fa default_bk_button_menu" style="
													    background-image: url(imagens/icons/download.png);
													"></i></a></li>
  <li role="presentation"><a href="#" class="config"><i class="fa default_bk_button_menu_alternativo" style="
													    background-image: url(imagens/icons/config.png);
													"></i></a></li>
  <li role="presentation"><a href="run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout"><i class="fa default_bk_button_menu" style="
													    background-image: url(imagens/icons/exit.png);
													"></i></a></li> 
  <style>
  .default_bk_button_menu{
													    background-size: 35px 25px;
													    width: 35px;
													    height: 25px;
													    margin-top: 3px;
  }
  .default_bk_button_menu_alternativo{
													    background-size: 25px 25px;
													    width: 25px;
													    height: 25px;
													    margin-top: 3px;
  }
  </style>
</ul>
<div class="rodape_name_right"><span class="glyphicon glyphicon-user"></span> <span class="ui-state-active"><?php echo $HTML_USER_NAME;?></span> | <?php echo $HTML_CUSTOMER_NAME;?>

</div>

<SCRIPT>	$(function(){WRS_MENU_FOOTER();});</SCRIPT>