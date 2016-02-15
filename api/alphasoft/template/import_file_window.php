<?php


includeCLASS('Upload');
	
$upload				=	new WRSUpload($upload_dir_key,$extra_params);
$htmlUpload			=	$upload->uploadHTML();
$msg_sel			=	LNG('upload_files_select');

$HTML_UPLOAD 		=	<<<EOF
<form class="grid_window_values_form">
		<div>
    		<label for="uploadFile">{$msg_sel}</label>
    		<input type="hidden" name="envio_de_arquivo" value="1">
	    	<div id="uploadFile">
				{$htmlUpload}
			</div>
    	</div>
</form>
EOF;
			
				/*
				 
				 
			<div class="form-group form-control-wrs_color">
	    		<label for="CUSTOMER_CODE">Código</label>
		    	<div class="form-control-wrs">
		    		<input type="text" name="CUSTOMER_CODE" maxlength="15" size="15" class=" " value="GSK" id="CUSTOMER_CODE" placeholder="Código">
		    	</div>
	    	</div>
				 
				 */


				
$HTML_OK 			= <<<EOF
		<script>		
			WRS_ALERT("{MENSAGEM}",'{TIPOMENSAGEM}',function(){ $('.menu_cadastro[tabela={$event_form}]').trigger('click') }); 
		</script>
EOF;

				
				