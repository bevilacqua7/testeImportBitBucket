<?php

includeCLASS('Upload');
$extra_params = isset($extra_params)?$extra_params:null;
$upload				=	new WRSUpload($upload_dir_key,$extra_params);
$htmlUpload			=	$upload->uploadHTML();
$msg_sel			=	LNG('upload_files_select');
$uploaderId			=	$upload->getUploaderId();
$nome_obrigatorio_zip = array_key_exists('nome_obrigatorio_zip', $extra_params)?$extra_params['nome_obrigatorio_zip']:'';

if(isset($avisos) && $avisos!=''){	
	$avisosHTML = <<<HTML
				<div class="row">
					<p class="small">
						{$avisos}
					</p>
				</div>
HTML;
	
	$avisos = $avisosHTML;
}else{
	$avisos = '';
}

$LNG_caracter_delimitador 	= LNG('ADMIN_IMPORT_caracter_delimitador');
$LNG_tipo_importacao 		= LNG('ADMIN_IMPORT_tipo_importacao');
$LNG_virgula 				= LNG('ADMIN_IMPORT_virgula');
$LNG_ponto_virgula 			= LNG('ADMIN_IMPORT_ponto_virgula');
$LNG_tabulacao 				= LNG('ADMIN_IMPORT_tabulacao');
$LNG_remover 				= LNG('ADMIN_IMPORT_remover');
$LNG_atualizar 				= LNG('ADMIN_IMPORT_atualizar');

$HTML_UPLOAD 		=	<<<EOF
<form class="grid_window_values_form">
		<div class="container-fluid">
			{$avisos}
			<div class="row">
	    		<label for="uploadFile">{$msg_sel}</label>
	    		<input type="hidden" name="envio_de_arquivo" value="1">
		    	<div id="uploadFile">
					{$htmlUpload}
				</div>
				<script>
				trataUploadAdmin('{$uploaderId}');
				</script>
	    	</div>
			<div class="row">
				<table class="table">
					<tbody>
						<tr>
							<td>{$LNG_caracter_delimitador}</td>
							<td><input type="radio" name="caracter_d" id="caracter_d2" value="ponto_virgula" checked="checked">
									<label for="caracter_d2" style="font-weight: normal;">{$LNG_ponto_virgula}</label></td>
							<td><input type="radio" name="caracter_d" id="caracter_d1" value="virgula">
									<label for="caracter_d1" style="font-weight: normal;">{$LNG_virgula}</label></td>
							<td colspan="2"><input type="radio" name="caracter_d" id="caracter_d3" value="tabulacao">
									<label for="caracter_d3" style="font-weight: normal;">{$LNG_tabulacao}</label></td>
						</tr>
						<tr>
							<td>{$LNG_tipo_importacao}</td>
							<td colspan="2"><input type="radio" name="tipo_importacao" id="tipo_d2" value="atualizar" checked>
												<label for="tipo_d2">{$LNG_atualizar}</label></td>
							<td colspan="2"><input type="radio" name="tipo_importacao" id="tipo_d1" value="remover">
												<label for="tipo_d1">{$LNG_remover}</label></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
</form>
EOF;
			
				
$HTML_OK 			= <<<EOF
		<script>		
			WRS_ALERT("{MENSAGEM}",'{TIPOMENSAGEM}',function(){ $('.menu_cadastro[tabela={$event_form}]').trigger('click') }); 
		</script>
EOF;

				
				