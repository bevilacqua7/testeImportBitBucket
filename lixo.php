<?php 

	
	$_sleep	=	$_REQUEST['sleep'];
	
	
	if(!empty($_sleep))
	{
		sleep($_sleep);
		
		echo 'sleep='.$_sleep." Sender=".$_REQUEST['event_sender'];
		
		exit();
		
	}


?>


<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js?35766"></script>

<div class="msd"></div>

<script>

	
	function load_data(event,sleep)
	{
		
		var cal_back	=	 function(data)
		{
			console.log('event',event,'|',data);
		}
	
		$.post('lixo.php',{'sleep':sleep,'event_sender':event},cal_back);
	}
	
	
	load_data(55,3);
	load_data(60,1);
	load_data(10,2);
	load_data(25,1);

</script>

