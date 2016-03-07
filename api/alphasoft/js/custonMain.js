 

		
		$(function(){
 

			new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'wrs-button-options' ), {
				type : 'cover'
			} );
			
			if(Modernizr.touch!=true){
			//Menu hover
			$( ".grid > li" ).hover(
				function(e) {
					
					$( this).find('h1,.descriptions').addClass('hide');
			  }, function() {
				$( this).find('h1,.descriptions').removeClass('hide');
			  }
			);
			}
		
			
			
			$('.logout_wrs').click(function(){wrs_logout();});
		
	
});

		
	
		