<?php

 
function WRS_DEBUG_QUERY($texto,$fileName='WRS_DEBUG.txt')
{
	$fp = fopen(__DIR__.DIRECTORY_SEPARATOR.$fileName,'a');
	fwrite($fp,$texto.PHP_EOL); 
	fclose($fp);
}



 $type = $_GET['type'];
 
 
    if ($type == 'save') {
    	
    	WRS_DEBUG_QUERY('EXPORT');
        $fileName 		= $_POST['fileName'];
        $contentType 	= $_POST['contentType'];
        $base64 		= $_POST['base64'];

        $data = base64_decode($base64);

        header('Content-Type:' . $contentType);
        header('Content-Length:' . strlen($data));
        header('Content-Disposition: attachment; filename=' . $fileName);

        echo $data;
        exit();
    } 
	
	

	//remote-data-binding.php
    header('Content-Type: application/json');
    
    /*
     * Pegando as informações passadas pelos eventos
     * 
     * Eventos de Retorno
     * 
     *  [take] => 10
    	[skip] => 0
    	[page] => 1
    	[pageSize] => 10
    	[sort] => Array
			        (
			            [0] => Array
			                (
			                    [field] => OrderID
			                    [dir] => asc
			                )
			
			        )
        
     */
    $request 		= 	json_decode(file_get_contents('php://input'),true);
    $pageCurrent	=	$request['page'];
	$limiByPage		=	$request['take'];
	
	
//	WRS_DEBUG_QUERY(print_r($request,true));
	
	
    
    $data				= array();
    $__rows_start		=	$pageCurrent*$limiByPage;
    $__rows_end			=	$__rows_start+$limiByPage;
    
    for($i=$__rows_start;$i<(($__rows_end));$i++)
    {
//		usleep(500000);
    	$data[] =	array('ShipName'=>'asdasd - '.$request['sort'][0]['field'].' | '.'||'.$request['sort'][0]['dir'], 'Freight' => $i.'A'.print_r($_REQUEST,true).'||' , 'OrderDate'=>' adfa sdfasdf 2012-06-12', 'OrderID'=>$i, 'ShipCity'=>'sdf asjdfg ajsfh gkagf asd uyg sdfobhu o');
    }
    
    $result				=	array();
    $result['total']	=	300;
    $result['data']		=	$data;
    
    echo json_encode($result);
	
	
    exit;



?>