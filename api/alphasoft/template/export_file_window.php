<?php


$HTML	= <<<EOF
		<script>
			$('#myModal').modal('hide');
			WRS_ALERT('{MENSAGEM}','{TIPOMENSAGEM}');
			executaDownloadFile('{URL_DOWNLOAD}');
		</script>
		<iframe id='downloadFileExport' class='hide'></iframe>
EOF;

$HTML_ERR	= <<<EOF
		<script>
			$('#myModal').modal('hide');
			WRS_ALERT('{MENSAGEM}','{TIPOMENSAGEM}');
		</script>
EOF;

				
				