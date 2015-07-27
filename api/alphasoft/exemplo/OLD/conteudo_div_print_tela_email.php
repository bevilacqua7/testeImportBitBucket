<div id="div_print_tela_email" class="pws_box_dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable ui-resizable" tabindex="-1" role="dialog" aria-describedby="dialog" aria-labelledby="ui-id-8">
    <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
        <span id="ui-id-8" class="ui-dialog-title fonte12" ><span id="titulo_div_print_tela_email">Enviar E-mail</span></span>
        <button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" role="button" aria-disabled="false" title="close" onClick="escondeDiv('div_print_tela_email');tiraLoad()">
            <span class='fecharX'>X</span>
        </button>
	</div>
    <div id="dialog" class="ui-dialog-content ui-widget-content wrs_check_vertical_scrol janela_height">
		<form id='form_print_tela_email' name='form_print_tela_email'>
            <table width='360'>
                <tr>
                    <td colspan='2'>
                        <span class="fonte11">De:</span>
                        <input type='text' id='txt_de' class="txt_tela_email"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <span class="fonte11">Para:</span>
                        <input type='text' id='txt_para' class="txt_tela_email"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <span style='font-size:11px'>Assunto:</span>
                        <input type='text' id='txt_assunto' class="txt_tela_email"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <textarea name='txt_comentarios' id='txt_comentarios' rows='5' class="txt_area_tela_email"></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <table>
                            <tr>
                                <td>
                                    <select name='cmb_envio' id='cmb_envio'class="fonte12" onclick='verificaSeMostraCompactar(this.value)'>
                                        <option value='PRINT'>Imagem</option>
                                        <option value='HTML'>Html</option>
                                        <option value='CSV'>Texto</option>
                                    </select>
                                </td>
                                <td>
                                    <span id='div_check_compactar' style='display:none;'><input id='check_compactar' type='checkbox' checked/>Compactar</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
		</form>                
    </div>
    <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix pws_box_dialog_button">
        <div style="text-align:center">
			<button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="escolheTipoEnvioEmail()">
        		<span class="ui-button-text">Enviar</span>
        	</button>
            <button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="escondeDiv('div_print_tela_email');tiraLoad()">
        		<span class="ui-button-text">Fechar</span>
        	</button>
        </div>
	</div>
</div>