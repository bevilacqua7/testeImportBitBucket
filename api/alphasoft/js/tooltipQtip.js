 //http://craigsworks.com/projects/forums/showthread.php?tid=942
	// Create the tooltips only when document ready

//Exemplos de uso
/*
<li> <a class="wrs-tooltip"  	 wrs-posicao="left"	title="Demo01">Link</a> </li>
    <li> <span class="wrs-tooltip" 						title="Demo02">Link</span> </li>
    
    */

	$(function() {
	    // Change the first select to the document if you want to 
	    // detect addition of elements accross the whole page!
	    $(document).on('mouseenter', '.wrs-tooltip[title]', function (event) {
		    //RIGHT
	    	
	    	_ONLY('TooltipQtip');
		    var _position	=	{
					    			my: 'top left',
					    			at: 'top right'
					    		};


		    if($(this).attr('wrs-posicao')=="left")
			{
					//LEFT
				    _position	=	{
						    			my: 'top right',
						    			at: 'top left'
						    		};
		    }
		    
	        $(this).qtip({
	            position: _position,
	            content: '<div class="tooltip-wrs-container">'+$(this).attr('title')+'</div>',
	            show: {
	                event: event.type, // Use the same event type as above
	                ready: true, // Show immediately - important!,
	                solo:true
	            }	    		
	        });
	    });
	});