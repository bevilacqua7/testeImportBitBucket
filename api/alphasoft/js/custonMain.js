$(function(){
 
	
			$('figcaption a').click(function(){
				$('a').trigger('mouseout');
			});

			new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'wrs-button-options' ), {
				type : 'cover'
			} );
			
			
			if(Modernizr.touch!=true)
			{
			//Menu hover
			$( ".grid > li figure" ).hover(
				function(e) {
				//	$( this).find('h1,.descriptions').toggle();
					$( this).find('h1,.descriptions').addClass('hide');
			  }, function() {
				$( this).find('h1,.descriptions').removeClass('hide');
				//  $( this).find('h1,.descriptions').toggle();
			  }
			);
			}
		
			
			
			$('.logout_wrs').click(function(){wrs_logout();});
			
			
			 
		
	
});

		
	
		