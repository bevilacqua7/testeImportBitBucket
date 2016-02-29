<?PHP 

//$parameter_upload	recebe diversas informações para ser apresentadas na tela
//CHAMADAPADRÔES
			

$upload_form_selecionar 	= LNG('upload_form_selecionar');
$upload_form_enviar 		= LNG('upload_form_enviar');
$upload_form_cancelar 		= LNG('upload_form_cancelar');
$upload_form_apagar 		= LNG('upload_form_apagar');


$BT_SELECIONAR 		=<<<HTML
		                <!-- The fileinput-button span is used to style the file input field as button -->
		                <span class="btn btn-success fileinput-button  btn-color-write">
		                    <i class="glyphicon glyphicon-plus  btn-color-write"></i>
		                    <span>{$upload_form_selecionar}</span>
		                    <input type="file" name="files[]" >
		                </span>
HTML;


$BT_ENVIAR 			=<<<HTML
		                <button type="submit" class="btn btn-primary start  btn-color-write">
		                    <i class="glyphicon glyphicon-upload  btn-color-write"></i>
		                    <span>{$upload_form_enviar}</span>
		                </button>
HTML;


$BT_CANCELAR 		=<<<HTML
		                <button type="reset" class="btn btn-warning cancel  btn-color-write">
		                    <i class="glyphicon glyphicon-ban-circle  btn-color-write"></i>
		                    <span>{$upload_form_cancelar}</span>
		                </button>

HTML;


$BT_APAGAR			=<<<HTML
		                <button type="button" class="btn btn-danger delete  btn-color-write">
		                    <i class="glyphicon glyphicon-trash  btn-color-write"></i>
		                    <span>{$upload_form_apagar}</span>
		                </button>
		                <input type="checkbox" class="toggle">

HTML;


$BARRA_STATUS 		=<<<HTML
		            <!-- The global progress state -->
		            <div class="col-lg-12 fileupload-progress fade">
		                <!-- The global progress bar -->
		                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
		                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
		                </div>
		                <!-- The extended global progress state -->
		                <div class="progress-extended">&nbsp;</div>
		            </div>

HTML;


if(!$parameter_upload['botao_selecionar']){
	$BT_SELECIONAR='';
}
if(!$parameter_upload['botao_enviar']){
	$BT_ENVIAR='';
}
if(!$parameter_upload['botao_cancelar']){
	$BT_CANCELAR='';
}
if(!$parameter_upload['botao_apagar']){
	$BT_APAGAR='';
}
if(!$parameter_upload['barra_status']){
	$BARRA_STATUS='';
}



$HTML =<<<HTML

		<div id="{$parameter_upload['id']}" style="position:relative">
					        <!-- Redirect browsers with JavaScript disabled to the origin page -->
		        <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
		        
		        <div class="row fileupload-buttonbar">
		            <div class="col-lg-12">
		            	{$BT_SELECIONAR}
		            	{$BT_ENVIAR}
		            	{$BT_CANCELAR}
		            	{$BT_APAGAR}
		                <!-- The global file processing state -->
		                <span class="fileupload-process"></span>
		            </div>
		        </div>
		            	{$BARRA_STATUS}
		        <!-- The table listing the files available for upload/download -->
		        <table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
		</div>
						 
				
		<!-- The blueimp Gallery widget -->
		<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls" data-filter=":even">
		    <div class="slides"></div>
		    <h3 class="title"></h3>
		    <a class="prev">‹</a>
		    <a class="next">›</a>
		    <a class="close">×</a>
		    <a class="play-pause"></a>
		    <ol class="indicator"></ol>
		</div>

		<script id="felipe-code-test">
		
				$(function () {
				/*
						console.log('extra param',{ url: '{$parameter_upload['upload_server']}' {$parameter_upload['upload_extra_options']} });
				*/					
					    $('#{$parameter_upload['id']}').fileupload({
					    
					        url: '{$parameter_upload['upload_server']}'
		        			{$parameter_upload['upload_extra_options']}
		            		
		            		
				/* validacoes extra se necessario		        
		        ,'add' 	:  function(e, data) {
										var uploadErrors = [];
										//var acceptFileTypes =  /(zip)|(csv)$/i;
										//if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
											//uploadErrors.push('Not an accepted file type: '+data.originalFiles[0]['type']);
										//	console.log('extensao nao permitida');
										//}
										//if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
										//	uploadErrors.push('Filesize is too big');
										//}
										if(true || uploadErrors.length > 0) {
											console.log(uploadErrors,data.originalFiles[0]);
										} else {
											data.submit();
										}
									}
				*/
					        		
					    });
				
				        // Load existing files:
				        $('#{$parameter_upload['id']}').addClass('fileupload-processing');
				        
				        $.ajax({
				            url			: '{$parameter_upload['upload_server']}',
				            dataType	: 'json',
				            context		: $('#{$parameter_upload['id']}')[0]
				        }).always(function () {
				            $(this).removeClass('fileupload-processing');
				        }).done(function (result) {
				            $(this).fileupload('option', 'done')
				                .call(this, $.Event('done'), {result: result});
				        });
				   
				
				});
		
		
		</script>

HTML;


?>


		