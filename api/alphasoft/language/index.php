<?PHP
header('Content-Type: text/html; charset=utf-8');

 class WRS{
 	
 	public static function VERSION(){}
 }

include('POR.lng');

header('Content-Type: text/html; charset=utf-8');

foreach($language as $label =>$value)
{
	$replace		=	 array('%s','"');
	$rr				=	array('<span class="notranslate">%s</span>', "'");
	
	$prince			=	'"';
	
	
	echo '<span class="notranslate"><b>$language["'.$label.'"]='."<span class='notranslate'>".$prince."</span>".' </b></span>';
	echo str_replace($replace, $rr, htmlspecialchars($value));
	echo "<span class='notranslate'>".$prince."</span>;<br>";
	echo '<br>';
}


?>

