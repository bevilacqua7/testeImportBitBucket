<!DOCTYPE html>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br" class="k-webkit k-webkit43 k-bootstrap"> 
  <head>
    <meta charset="ISO_8859-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
<link rel="stylesheet" type="text/css" href="../api/bootstrap-3.3.0/dist/css/bootstrap.css">
    <title></title>


<script src="../api/ckeditor/ckeditor.js"></script>
    
 <style type="text/css">
 body{
 margin: 50px;
}

.btn{
-webkit-border-radius: 0px;
-moz-border-radius: 0px;
border-radius: 0px;
}
 </style>

<!-- <script src="./bootstrap/js/bootstrap-inputmask.js"></script> -->    
  </head>
<body>
<h3>Decode</h3>
<hr/>
<?PHP

$_r	=	 strip_tags($_REQUEST['s']);



if(!empty($_r)){
	$array	=	(json_decode(base64_decode($_r),true));
	echo '<b>JSON Original </b>:';
	echo (base64_decode($_r));
	echo '<hr/>';
	foreach($array as $label =>$value)
	{
		echo '<b>'.$label.'</b> : <pre>'.(is_array($value) ? print_r($value,true) : $value).'</pre><br><hr/>';
	}
}

?>
</hr>

<form action="?" method="POST">
<textarea id="editor" name="s"></textarea>
<button type="submit" class="btn btn-success btn-block">decode</button>
</form>



             	<script>
						
						
						CKEDITOR.replace( 'editor',{
	toolbar: [
		{ name: 'document', items: [ 'Source', '-','Templates' ] },	// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
		['NumberedList', 'BulletedList' ,'-','Outdent', 'Indent','-','Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],		
		['Link', 'Unlink', 'Anchor' ],
		[ 'Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar', 'PageBreak', 'Iframe' ],
		'/',
[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] ,		// Line break - next group will be placed in new line.
		{ name: 'basicstyles', items: [  'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat','Format','Font','FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
	{ name: 'others', items: [ '-' ] }
	]

	// NOTE: Remember to leave 'toolbar' property with the default value (null).
});


						
						</script>

</body>
</html>