
<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br" class="k-webkit k-webkit43 k-bootstrap"> 


<head>

<?php 

	include_once '../config/configCommon.php';
	
	
	includeCLASS('HeaderTag');
	$tag = new HeaderTag();

	
	echo $tag->header('main');
	

?> 
 

</head>
<body>

<ul id="more" class="">
    <li> <a class="wrs-tooltip"  	 wrs-posicao="left"	title="Demo01">Link</a> </li>
    <li> <span class="wrs-tooltip" 						title="Demo02">Link</span> </li>
</ul>

<button id="addmore">Add more!</a>

</body>

<script type="text/javascript">


 //http://craigsworks.com/projects/forums/showthread.php?tid=942
	// Create the tooltips only when document ready
	$(function() {
	    // Change the first select to the document if you want to 
	    // detect addition of elements accross the whole page!
	    $(document).on('mouseenter', '.wrs-tooltip[title]', function (event) {


		    //RIGHT
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
	            show: {
	                event: event.type, // Use the same event type as above
	                ready: true, // Show immediately - important!,
	                solo:true
	            }	    		
	        });

	        
	    });


	    
	    
	    // Setup add more elements button
	    $('#addmore').click(function () {
	        $('<li />', {
	            html: '<a class="wrs-tooltip"  title="Lorem ipsum: Added after page load!"><b>New</b> link!</a>'
	        })
	            .appendTo($('#more'));
	    });

	    
	});
	
	
 
</script>


</HTML>