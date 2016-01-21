<?php


includeCLASS('Upload');
	
$upload				=	new WRSUpload($upload_dir_key,$extra_params);
$htmlUpload			=	$upload->uploadHTML();
$msg_sel			=	LNG('upload_files_select');

$HTML_UPLOAD 		=	<<<EOF
		<div>
    		<label for="uploadFile">{$msg_sel}</label>
	    	<div id="uploadFile">
				{$htmlUpload}
			</div>
    	</div>
EOF;

$HTML_OK 			= <<<EOF
		<script> 		
			$('#myModal').modal('hide');
			WRS_ALERT("{MENSAGEM}",'{TIPOMENSAGEM}'); 
		</script>
EOF;

				
				