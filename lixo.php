<?php 

	session_start();
	
	$history	=	$_SESSION['CUBE_REPORT_HISTORY'];
	
	foreach($history as $label =>$val)
	{
		echo PHP_EOL.'---------------------------------------------------------------------------------------------------'.PHP_EOL;
		echo $label;
		echo PHP_EOL.'---------------------------------------------------------------------------------------------------'.PHP_EOL;
		
		foreach($val as $vlabel =>$vval)
		{
			echo PHP_EOL.'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'.PHP_EOL;
			echo $vlabel;
			echo PHP_EOL.'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'.PHP_EOL;
			
			$data_history	=	json_decode(base64_decode($vval),true);
			
			print_r($data_history[0]);
				
		}
	}
	
?>