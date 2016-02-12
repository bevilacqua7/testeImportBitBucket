<?php

$event_form = $_request_original['event'];

$HTML	= <<<EOF
		<script>			
			WRS_ALERT('{MENSAGEM}','{TIPOMENSAGEM}',function(){ $('#myModal').modal('hide'); $('.menu_cadastro[tabela={$event_form}]').trigger('click'); });
			executaDownloadFile('{URL_DOWNLOAD}');
		</script>
		<iframe id='downloadFileExport' class='hide'></iframe>
EOF;

$HTML_ERR	= <<<EOF
		<script>			
			WRS_ALERT('{MENSAGEM}','{TIPOMENSAGEM}',function(){ $('#myModal').modal('hide'); $('.menu_cadastro[tabela={$event_form}]').trigger('click'); });
		</script>
EOF;

				
				