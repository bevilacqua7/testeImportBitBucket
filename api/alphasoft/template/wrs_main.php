<?php 
	include_once(PATH_TEMPLATE.'headerCommon.php');

	
	include_once(PATH_TEMPLATE.'TOP.php');
	
	?>
	
	

<link rel="stylesheet" type="text/css" href="css/wrs_main.css?<?php echo RAND_TOKEN;?>" />
<!-- IMPLEMENTOS -->




<div class="container_main">

	<div id="fullwidth" class="util-carousel fullwidth"  >
			<?php echo $WRS_MAIN_DATABASES;?>
	</div><!-- "fullwidth" -->
		
	<?php 
		
	if(!empty($WRS_MAIN_DATABASES_DASHBOARD))
	{
		echo '<div id="fullwidth_ds" class="util-carousel fullwidth"  >'.$WRS_MAIN_DATABASES_DASHBOARD.'</div><!-- "fullwidth" -->';
		
	}
	
	?>



</div>
	   <div class="rodape-main ui-widget-header ui-state-active no-border">
					<span id="data_sistema" class="WRS_TIME" style="font-weight:bold;font-size:12px;"></span>
		</div>
	 
	


<script>


$(function(){
	$('#fullwidth a').click(function(){
		$("#fakeloader").show().fakeLoader({closeLoad:true});
	});
});
//Animação do BOX
function WRS_RESIZE(){
				//var height	=	$(window).height()-120;
				var height	=	$(window).height()-100;
				var fullwidthFirst	=	$('.fullwidth:first').height();
				var fullwidthSecond	=	$('.fullwidth:last').height();
				
				var complete	=	height-(fullwidthFirst*2);
				$('.fullwidth:first,.fullwidth:last').css('margin-bottom',(complete/4));
				$('.fullwidth:first,.fullwidth:last').css('margin-top',(complete/4));



				
				  var _height		=	 ($(window).outerHeight()-$('.wrs_header_main').outerHeight()-$('.rodape-main').outerHeight())-40;
				  $('.container_main').height(_height);				
 
}

		  $( window ).resize(function(){


			  location.reload();
			  
				
				/*
				setTimeout(function(){
					WRS_RESIZE;
					},1000);
					*/
			  });

		  
		  $(function () {

			  $( ".fullwidth" ).hover(
					  function() {

						$(this).attr('hover','hover');
					  }, function() {
						  $(this).attr('hover','');
						   
					  }
					);

			  var _height		=	 ($(window).outerHeight()-$('.wrs_header_main').outerHeight()-$('.rodape-main').outerHeight())-40;
				
				$('.container_main').height(_height);
				
				
				$('.fullwidth').utilCarousel({
					breakPoints: [[600, 2], [900, 3], [1200, 4], [1500, 5], [1800, 5]],
					mouseWheel: true,
					rewind: false
				});



				 $(document).ready(function() {
					 WRS_RESIZE();
				    });
				    $(window).load(function() {     
				    	WRS_RESIZE();
				    });
				    $(window).resize(function() {
				    	WRS_RESIZE();
				    });

			
				 
				$('.no-link-item').css({ opacity: 0.5 });
				$('.no-link-item').css('cursor','auto');
	 			$('.background_item').each(function(){

					$(this).css({ opacity: 0.3 });
					var height	=	$(this).parent().find('h1').height();
					$(this).height(height+16);
					
					});

	 			WRS_RESIZE();

	 			setTimeout(function(){
					WRS_RESIZE;
					},1000);
	 			 
			});
	 

		  
//Animação do BOX
</script>

<script>

	/*
	 * Evento quando se seleciona a mudança de Themas
	 */
	function WRSChangeTheme()
	{
		TRACE('Mudando o Thema na função WRSChangeTheme  no file:wrs_main.php');
		var theme	=	$(this).val();
		var param	=	{'theme':theme};
		
		runCall(param,'WRS_MAIN','WRS_MAIN','updateTheme');

		var host 	= 	$('#themeHost').attr('host');
			host	=	str_replace('{host}',theme,host); 
			$('#themeHost').attr('href',host);
			
		//$("#switch_style").attr("href", id + ".css"); 
		TRACE('Finalizaou WRSChangeTheme');	
	}


	function WRSChangeIdioma()
	{
		TRACE('Mudando o Idioma na função WRSChangeIdioma  no file:wrs_main.php');
		var idioma	=	$(this).val();
		var param	=	{'idioma':idioma};
		
		runCall(param,'WRS_MAIN','WRS_MAIN','updateIdioma',function(data){ location.reload();});
		//$("#switch_style").attr("href", id + ".css"); 
		TRACE('Finalizou WRSChangeIdioma');	
	}

	
	$(function(){
		$('.WRSChangeTheme').change(WRSChangeTheme);
		$('.WRSChangeIdioma').change(WRSChangeIdioma);

		setWRSTime();
	});
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

	<?php 
	
	
	include_once(PATH_TEMPLATE.'footer.php');
	
?>