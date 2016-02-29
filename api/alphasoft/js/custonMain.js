 
		
		
		$(function(){
	 
		
			new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'wrs-button-options' ), {
				type : 'cover'
			} );
			
			//Menu hover
			$( ".grid > li" ).hover(
				function(e) {
					
					$( this).find('h1,.descriptions').addClass('hide');
			  }, function() {
				$( this).find('h1,.descriptions').removeClass('hide');
			  }
			);
		
		
			//Menu click
		$( ".grid li" ).click(
			function(e) {
				var 	type 	=	$(this).attr('_hide');
				
				e.stopPropagation();
				switch(type)
				{
					case 1: type=0; break;
					case '1': type=0; break;
					case 0: type=1; break;
					case '0': type=1; break;
					default : type=0; break;
				}
				
				if(type==0)
					$( this).find('h1,.descriptions').addClass('hide');
				else
				$( this).find('h1,.descriptions').removeClass('hide');
				
				
				$(this).attr('_hide',type);
		  }
		);
		
		
	
});

		
	
		