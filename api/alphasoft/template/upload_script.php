<?php 
	$msg_maxNumberOfFiles		= LNG('msg_maxNumberOfFiles');
	$msg_acceptFileTypes		= LNG('msg_acceptFileTypes');
	$msg_maxFileSize			= LNG('msg_maxFileSize');
	$msg_minFileSize			= LNG('msg_minFileSize');

	$upload_form_selecionar 	= LNG('upload_form_selecionar');
	$upload_form_enviar 		= LNG('upload_form_enviar');
	$upload_form_cancelar 		= LNG('upload_form_cancelar');
	$upload_form_apagar 		= LNG('upload_form_apagar');
	$upload_form_processando	= LNG('upload_form_processando');
	$upload_form_erro			= LNG('upload_form_erro');
	
?>


			<script>
				var msg_maxNumberOfFiles	= '<?php echo $msg_maxNumberOfFiles; ?>';
				var msg_acceptFileTypes		= '<?php echo $msg_acceptFileTypes; ?>';
				var msg_maxFileSize			= '<?php echo $msg_maxFileSize; ?>';
				var msg_minFileSize			= '<?php echo $msg_minFileSize; ?>';
			</script>
			
				<!-- The template to display files available for upload -->
				<script id="template-upload" type="text/x-tmpl">
				{% for (var i=0, file; file=o.files[i]; i++) { %}
				    <tr class="template-upload fade">
				        <td>
				            <span class="preview"></span>
				        </td>
				        <td>
				            <p class="name">{%=file.name%}</p>
				            <strong class="error text-danger"></strong>
				        </td>
				        <td>
				            <p class="size"><?php echo $upload_form_processando; ?></p>
				            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
				        </td>
				        <td>
				            {% if (!i && !o.options.autoUpload) { %}
				                <button class="btn btn-primary start  btn-color-write" disabled>
				                    <i class="glyphicon glyphicon-upload  btn-color-write"></i>
				                    <span><?php echo $upload_form_enviar; ?></span>
				                </button>
				            {% } %}
				            {% if (!i) { %}
				                <button class="btn btn-warning cancel  btn-color-write">
				                    <i class="glyphicon glyphicon-ban-circle  btn-color-write"></i>
				                    <span><?php echo $upload_form_cancelar; ?></span>
				                </button>
				            {% } %}
				        </td>
				    </tr>
				{% } %}
				</script>
	
	
	
	<!-- The template to display files available for download -->
	<script id="template-download" type="text/x-tmpl">
				{% for (var i=0, file; file=o.files[i]; i++) { %}
				    <tr class="template-download fade">
				        <td>
				            <span class="preview">
				                {% if (false && file.thumbnailUrl) { %}
				                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
				                {% } else { %}
				                    <img src="{%=file.thumbnailUrl%}">
				                {% } %}
				            </span>
				        </td>
				        <td>
				            <p class="name">
				                {% if (false && file.url) { %}
				                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
				                {% } else { %}
				                    <span>{%=file.name%}</span>
				                {% } %}
				            </p>
				            {% if (file.error) { %}
				                <div><span class="label label-danger"><?php echo $upload_form_erro;?></span> {%=file.error%}</div>
				            {% } %}
				        </td>
				        <td>
				            <span class="size">{%=o.formatFileSize(file.size)%}</span>
				        </td>
				        <td>
				            {% if (file.deleteUrl) { %}
				                <button class="btn btn-danger delete btn-color-write" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
				                    <i class="glyphicon glyphicon-trash btn-color-write"></i>
				                    <span><?php echo $upload_form_apagar;?></span>
				                </button>
				                <input type="checkbox" name="delete" value="1" class="toggle">
				            {% } else { %}
				                <button class="btn btn-warning cancel btn-color-write">
				                    <i class="glyphicon glyphicon-ban-circle btn-color-write"></i>
				                    <span><?php echo $upload_form_cancelar;?></span>
				                </button>
				            {% } %}
				        </td>
				    </tr>
				{% } %}
				</script>
	
	
<!-- TODO: Baixar as firulas que estão externas para a pasta do jQueryUpload  -->				

<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
<link rel="stylesheet" href="api/jQuery-File-Upload-9.11.2/css/jquery.fileupload.css">
<link rel="stylesheet" href="api/jQuery-File-Upload-9.11.2/css/jquery.fileupload-ui.css">
<link rel="stylesheet" href="//blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
<script src="api/jQuery-File-Upload-9.11.2/js/vendor/jquery.ui.widget.js"></script>
<!-- The Templates plugin is included to render the upload/download listings -->
<script src="//blueimp.github.io/JavaScript-Templates/js/tmpl.min.js"></script>
<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
<script src="//blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
<!-- The Canvas to Blob plugin is included for image resizing functionality -->
<script src="//blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<!-- blueimp Gallery script -->
<script src="//blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.iframe-transport.js"></script>
<!-- The basic File Upload plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload.js"></script>
<!-- The File Upload processing plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-process.js"></script>
<!-- The File Upload image preview & resize plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-image.js"></script>
<!-- The File Upload audio preview plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-audio.js"></script>
<!-- The File Upload video preview plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-video.js"></script>
<!-- The File Upload validation plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-validate.js"></script>
<!-- The File Upload user interface plugin -->
<script src="api/jQuery-File-Upload-9.11.2/js/jquery.fileupload-ui.js"></script>
<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE 8 and IE 9 -->
<!--[if (gte IE 8)&(lt IE 10)]>
<script src="api/jQuery-File-Upload-9.11.2/js/cors/jquery.xdr-transport.js"></script>
<![endif]-->		
