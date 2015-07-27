<?php 
	include_once(PATH_TEMPLATE.'headerCommon.php');
	include_once(PATH_TEMPLATE.'TOP.php');
	
	?>
	
	<!-- IMPLEMENTOS -->
		<link href="api/assets/css/allWrs.css" rel="stylesheet">
		<link rel="stylesheet" href="api/fonte/stylesheet.css" />
		<link rel="stylesheet" href="api/assets/utilcarousel-files/utilcarousel/util.carousel.skins.css" />

	<div id="fullwidth" class="util-carousel fullwidth"  >
			<?php echo $WRS_MAIN_DATABASES;?>
	</div><!-- "fullwidth" -->
		
	<?php 
		
	if(!empty($WRS_MAIN_DATABASES_DASHBOARD))
	{
		echo '<div id="fullwidth" class="util-carousel fullwidth"  >'.$WRS_MAIN_DATABASES_DASHBOARD.'</div><!-- "fullwidth" -->';
		
	}
	
	?>



	   <div style="position:fixed;bottom:0;margin-top:30px;height:40px;width:99%">
		<div style="-webkit-box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
-moz-box-shadow:    3px 3px 5px 0px rgba(50, 50, 50, 0.75);
box-shadow:         3px 3px 5px 0px rgba(50, 50, 50, 0.75);">
			<table width="100%" border="0" class="ui-widget-header">
			  <tr>
				<td align="right" style="padding: 5px" class="ui-state-active no-border">
					<span id="data_sistema" class="WRS_TIME" style="font-weight:bold;font-size:12px;"></span></td>
			  </tr>
			</table>
		</div>
	</div>
	
<script src="api/assets/utilcarousel-files/utilcarousel/jquery.utilcarousel.js?r=1.2?9371"></script>

<script>

/*
$(function(){
	$('#fullwidth a').click(function(){
		$("#fakeloader").show().fakeLoader({closeLoad:true});
	});
});*/
//Animação do BOX
function WRS_RESIZE(){
				//var height	=	$(window).height()-120;
				var height	=	$(window).height()-100;
				var fullwidthFirst	=	$('.fullwidth:first').height();
				var fullwidthSecond	=	$('.fullwidth:last').height();
				
				var complete	=	height-(fullwidthFirst*2);
				$('.fullwidth:first,.fullwidth:last').css('margin-bottom',(complete/4));
				$('.fullwidth:first,.fullwidth:last').css('margin-top',(complete/4));

				//first-child
				//fullwidth
}

		  $( window ).resize(function(){
				setTimeout(function(){
					WRS_RESIZE();
					},500);
			  });

		  
		  $(function () {

			  $( ".fullwidth" ).hover(
					  function() {

						$(this).attr('hover','hover');

						$('.fullwidth').each(function(){

							if($(this).attr('hover')!='hover'){
								 $( this ).animate({
									    opacity: 0.25
									  }, {
										    duration: 100,
										    specialEasing: {
										    	opacity: "easeInOutCirc"
										    }
										  });
							}
							
						});
						    
					  }, function() {
						  $(this).attr('hover','');
						  
						  $( '.fullwidth' ).animate({
							    opacity: 1
							  }, {
								    duration: 100,
								    specialEasing: {
								    	opacity: "easeInOutCirc"
								    }
								  });
						  
					  }
					);
				
				$('.fullwidth').utilCarousel({
					breakPoints: [[600, 2], [900, 3], [1200, 4], [1500, 5], [1800, 5]],
					mouseWheel: true,
					rewind: false,
				/*	itemLess:'',*/
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
		var theme	=	'theme-'+$(this).val();
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


	<?php 
	
	
	include_once(PATH_TEMPLATE.'footer.php');
	
?>