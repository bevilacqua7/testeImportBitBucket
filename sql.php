<?php 
include_once 'config/configCommon.php';
?>
<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>

<link href="api/bootstrap-3.3.0/dist/css/bootstrap.min.css?v=1.0 "
	rel="stylesheet">

	
	<form  action="?" method="post">
  <div class="form-group">
    <label class="control-label col-sm-2" >Comando:</label>
    <div class="col-sm-10">
      <textarea type="cmd" class="form-control" name="cmd" id="cmd"><?PHP echo fwrs_request('cmd');?></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="control-label col-sm-2" ></div>
    <div class="col-sm-10">
       <button type="submit" class="btn btn-default">Executar</button>
    </div>
  </div>
 
</form>

<style>
table{
font-size:10px;
}
</style>
<pre>
<?php echo fwrs_request('cmd'); ?>
</pre>

<div class="container">
<?PHP

//ini_set("display_errors","1");
	/**
	 * file:WRS_CLASS
	 * class: Name class
	 * event: INterno para cada processo
	 */
/*	ini_set("log_errors", 1);
	ini_set("error_log", dirname(__FILE__).DIRECTORY_SEPARATOR."wrs-php-error.log");*/

//	header("Content-Type: text/html; charset=ISO-8859-1",true);
//	header("Content-Type: text/html; charset=ISO-8859-1",true);
	
	
	$data		=	array('file', 'event', 'class');
	$data		=	fwrs_request($data);

	
	
	$is_js		=	 fwrs_request('is_js');
	$login		=	 fwrs_request('login');
	$pwd		=	 fwrs_request('pwd');
	
	
 
	
	
	/*
	$exeption_by_event		=	array('threadJobManager','change_cube','save_history','stopjob','load_grid_header','logout');
	
	if(($is_js!=true && empty($login) && empty($pwd)))
	{
		if(!in_array($data['event'], $search_array) && $data['event']!='' && !empty($data['event']))
		{
			WRS_DEBUG_QUERY($data['event']);
			
			includeCLASS('WRS_LOGIN');
			$login	=	 new WRS_LOGIN();
			$login->set_conn($conn_wrs);
			$userIsLogged	=	 $login->userIsLogged();
			
	
			if(!$userIsLogged['is_loged'] )
			{
				header('Location: login.php');	
				exit();
			}
		}
		
	}*/
	includeCLASS('WRS_USER');

/*
 * Incluindo a thread Manager JOB
 */

 

class SSQL  extends WRS_USER
{
	 
			public function run()
			{
					$cmd	=	 fwrs_request('cmd');
					
					if(!empty($cmd))
					{
						
						$sql	=	$this->query($cmd);
						
						if(!$this->num_rows($sql)) {
							
								echo 'Erro ao executar o comando';
								print_r(sqlsrv_errors());
								
								return false;
								
								
						}
						

						
						$header		=		false;
						
						
						
						echo '<table class="table table-striped"> <caption>Resultados.</caption> ';
						
						$line		=	0;
						while($rows = $this->fetch_array($sql))
						{
							
							if($header==false)
							{
								$header	=	true;
								
								echo '<thead><tr><th>#</th>';
								foreach($rows as $column =>$vvalue)
								{
									echo '<th>'.$column.'</th>';
								}
								echo '</tr></thead><tbody> ';
								
								
								
							}
							
							
							echo '<tr><th scope="row">'.$line.'</th>';
						 
							
							$line++;
							
							foreach($rows as $value)
							{
								
								echo '<td>'.(empty($value) ? '-' : $value).'</td>';
							}
							echo '</tr>';
						}
						
						
						echo '</tbody> </table>';
						
						
					}
			}
	}
	
	
	
	$obj	=	 new SSQL();
	$obj->set_conn($conn_wrs);
	$obj->run(); 	

?>


</div>
