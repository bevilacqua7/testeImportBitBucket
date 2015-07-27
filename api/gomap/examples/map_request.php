<?PHP

function WRS_DEBUG_QUERY($texto)
{
	$fp 	= fopen('map.txt','a');
	fwrite($fp,$texto.PHP_EOL); // grava a string no arquivo. Se o arquivo não existir ele será criado
	fclose($fp);
}

$texto	= array('lat'=>$_REQUEST['lat'], 'long'=>$_REQUEST['long']);
WRS_DEBUG_QUERY(json_encode($texto,true));

?> 
