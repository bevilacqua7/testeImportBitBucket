<?php 
	include_once(PATH_TEMPLATE.'headerCommon.php');
	include_once(PATH_TEMPLATE.'main_container.php');
	
?>

<script>


$(function(){
	$('#fullwidth a').click(function(){
		$("#fakeloader").show().fakeLoader({closeLoad:true});
	});

	$('.selectpicker').selectpicker();


	$('.WRSChangeIdioma button, .WRSChangeTheme button').click(function(event){
			var menu		=	$(this).parent().find('.dropdown-menu');
			var ul			=	menu.find('ul');

				menu.toggle();
				ul.toggle();

				 $(window).one('click',function() {
							menu.toggle();
							ul.toggle();
					  });
			  
			event.stopPropagation();
});
	
});



		  
		 	 

		  
//Animação do BOX
</script>

<script>

	/*
	 * Evento quando se seleciona a mudança de Themas
	 */
	

	
	$(function(){
		$('.WRSChangeTheme').change(WRSChangeTheme);
		$('.WRSChangeIdioma').change(WRSChangeIdioma);

		setWRSTime();
	});
</script>

<!-- MODAL WINDOW GRID -->
<div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
<?php

			$_jsPHP	=	 array('type'=>'login','data'=>WRS::INFO_SSAS_LOGIN());
	
			WRS_GLOBAL::setPHP($_jsPHP);
			
			echo WRS_GLOBAL::loadGLobal();
				
				include_once(PATH_TEMPLATE.'footer.php');
?>
		
 