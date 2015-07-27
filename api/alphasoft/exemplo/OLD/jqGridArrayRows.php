<?php 





$column				=	$_REQUEST['sidx'];
$column_type_order	=   $_REQUEST['sord'];
$rows_size			=	$_REQUEST['rows'];
$numRows			=	$_REQUEST['numRows'];
$pageCurrent		=	$_REQUEST['page'];



for($i=0;$i<$rows_size;$i++)
{
//	$data1[$i]['[PERIODO].[ANO].&[2010].[PERIODO].[SEMESTRE].&[201007].[Measures].[DOLAR]']    	= (integer)$i+1;
	$data1[$i]['id']    	= 'id'.($i+1);
	
	$data1[$i]['foo']   	= md5(rand(0, 10000));
	$data1[$i]['bar']  	 	= 'bar'.($i+1);
	$data1[$i]['nomes']   	= 'last'.($i+1);
}


$array_info	=	array();
$array_info['records'] 	= 	$numRows;
$array_info['page'] 	= 	$pageCurrent;
$array_info['total'] 	= 	round($numRows/$rows_size);
$array_info['rows'] 	=	$data1;
echo json_encode($array_info,true);

?>