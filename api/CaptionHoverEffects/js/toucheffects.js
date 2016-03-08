/** Used Only For Touch Devices **/
//( function( window ) {
	
$(function(){
	

	
	//Menu click
	
$( ".btn-wrs-link" ).click(
	function(e) {
	
		$("#fakeloader").show();
		
		
		
		var title_is_time	=	null;
		 
		var is_title_empty = {
				  that    		: 	$(this),
				  resize		: 	function( event ) 
				  {
					  
					  		clearTimeout(title_is_time);
					  		window.location	=	this.that.attr('href');
					  		
					  		
				  }
				};
		
		var time_out 	= $.proxy( is_title_empty.resize, is_title_empty );
		
		
		title_is_time		=	setTimeout(time_out,200);
		
		
		return false;
	
  }
);

	// for touch devices: add class cs-hover to the figures when touching the items
//	if( Modernizr.touch ) 
	//{

		// classie.js https://github.com/desandro/classie/blob/master/classie.js
		// class helper functions from bonzo https://github.com/ded/bonzo

		function classReg( className ) 
		{
			return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ( 'classList' in document.documentElement ) {
			hasClass = function( elem, c ) {
				return elem.classList.contains( c );
			};
			addClass = function( elem, c ) {
				elem.classList.add( c );
			};
			removeClass = function( elem, c ) {
				elem.classList.remove( c );
			};
		}
		else {
			hasClass = function( elem, c ) {
				return classReg( c ).test( elem.className );
			};
			addClass = function( elem, c ) {
				if ( !hasClass( elem, c ) ) {
						elem.className = elem.className + ' ' + c;
				}
			};
			removeClass = function( elem, c ) {
				elem.className = elem.className.replace( classReg( c ), ' ' );
			};
		}


		function toggleClass( elem, c ) {


			
			$( elem).find('h1,.descriptions').each(function(){
					var el		=	$(this);
					var figcaption	=	el.parent().find('figcaption');
					
						el.parent().find('a').removeClass('wrs-tooltip');
						
					
						var title_is_time	=	null;
						 
						var is_title_empty = {
								  that    		: 	el,
								  _figcaption	:	figcaption,
								  resize		: 	function( event ) 
								  {
									  
										  if(this.that.is(':hidden')==false)
											{
											  this._figcaption.css('z-index','1400');
											  this.that.toggle();
											}
											else
											{
												this._figcaption.css('z-index','10');
												this.that.toggle();
											}
										  
									  		clearTimeout(title_is_time);
									  		
									  		
								  }
								};
						
						var time_out 	= $.proxy( is_title_empty.resize, is_title_empty );
						
						
						title_is_time		=	setTimeout(time_out,el.is(':hidden')==false? 0 : 500);
						
						
						
					
					
						
					
			});
			
			var fn = hasClass( elem, c ) ? removeClass : addClass;
			fn( elem, c );
		}

		var classie = {
			// full names
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			// short names
			has: hasClass,
			add: addClass,
			remove: removeClass,
			toggle: toggleClass
		};

		// transport
		if ( typeof define === 'function' && define.amd ) {
			// AMD
			define( classie );
		} else {
			// browser global
			window.classie = classie;
		}

		var __slide	=	[];
		
		__slide.slice.call( document.querySelectorAll( '.container-menu-animation ul.grid > li > figure' ) ).forEach( function( el, i ) {
			

			try{
				/*
			el.querySelector( 'figcaption > a' ).addEventListener( 'touchstart', function(e) {
				e.stopPropagation();
				
			}, false );
			*/
			
			el.addEventListener( 'touchstart', function(e) {
				classie.toggle( this, 'cs-hover' );
			}, false );
			
			}catch(e){}
		} );
		

//	}

});
//})( window );