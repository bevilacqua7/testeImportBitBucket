<?php
//Includes scripts jqGrid
ini_set("display_errors","1");


/*
 * @link http://www.guriddo.net/demo/jqgridphp/
 * */
include_once('../dashboard/config.php');
 


//$conn_wrs
$query		= 'SELECT TOP 6 * FROM [CACHE_MDX_MFACIOLI_42059777811342596]';
$query		=	 sqlsrv_query($conn_wrs,$query);
$rowsJqGrid	=	array();
while($rows = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC))
{
	$rowsJqGrid[]=$rows;
}


echo json_encode($rowsJqGrid,true);




