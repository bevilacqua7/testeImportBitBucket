<div id="div_nome_layout" class="pws_box_dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable ui-resizable" tabindex="-1" role="dialog" aria-describedby="dialog" aria-labelledby="ui-id-8">
    <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
        <span id="ui-id-8" class="ui-dialog-title fonte12"><span id="titulo_div_nome_layout">Salvar Layout</span></span>
        <button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" role="button" aria-disabled="false" title="close" onClick="escondeDiv('div_nome_layout');tiraLoad()">
            <span class="fecharX">X</span>
        </button>
	</div>
    <div id="dialog" class="ui-dialog-content ui-widget-content wrs_check_vertical_scrol janela_height">
        <form id='form_nome_layout' name='form_nome_layout'>
            <table width='360'>
                <tr>
                    <td colspan='2'>
                        <label class="fonte11">Nome Layout:</label>
                        <input type='text' id='txt_nome_layout' class="fonte12"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <label class="fonte11">Alias Layout:</label>
                        <input type='text' id='txt_alias_layout' class="fonte12"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <input type='checkbox' id='check_compartilhar_layout' name='check_compartilhar_layout'  />
                        <span class="fonte11">Compartilhar</span>
                    </td>
                </tr>
            </table>
		</form>                
    </div>
    <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix pws_box_dialog_button">
        <div style="text-align:center">
        	<button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="salvaLayout(document.getElementById('txt_nome_layout').value)">
        		<span class="ui-button-text">Salvar</span>
        	</button>
            <button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="escondeDiv('div_nome_layout');tiraLoad()">
        		<span class="ui-button-text">Fechar</span>
        	</button>
        </div>
    </div>
</div>