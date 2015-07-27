<div id="div_nome_relatorio" class="pws_box_dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable ui-resizable" tabindex="-1" role="dialog" aria-describedby="dialog" aria-labelledby="ui-id-8">   
    <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
        <span id="ui-id-8" class="ui-dialog-title fonte12" ><span id="titulo_div_nome_relatorio">Salvar Relatorio</span></span>
            <button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" role="button" aria-disabled="false" title="close" onClick="escondeDiv('div_nome_relatorio');tiraLoad()">
                <span class="fecharX">X</span>
            </button>
    </div>
    <div id="dialog" class="ui-dialog-content ui-widget-content wrs_check_vertical_scrol janela_height">
        <form id='form_nome_relatorio' name='form_nome_relatorio'>
            <table width='560'>
                <tr>
                    <td colspan='2'>
                        <span class="fonte11">Nome Relatorio:</span>
                        <input type='text' id='txt_nome_relatorio'/>
                        <input type="hidden" id="hd_save_as" name="hd_sava_as"/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <input type='checkbox' id='check_compartilhar_relatorio' name='check_compartilhar_relatorio'  />
                        <span class="fonte11">Compartilhar</span>
                        <input type='checkbox' id='check_auto_load' name='check_auto_load'/>
                        <span class="fonte11">Carga Automatica</span>
                        <input type='hidden' id='hd_relatorio_id' name='hd_relatorio_id'/>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <span class="fonte11">Layouts:</span>
                        <div id='div_multi_select_layouts'></div>
                    </td>
                </tr>
            </table>
        </form>               
    </div>
    <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix pws_box_dialog_button">
		<div style="text-align:center">
			<button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="salvaAtualizaRelatorio(document.getElementById('txt_nome_relatorio').value,document.getElementById('hd_relatorio_id').value)">
				<span class="ui-button-text">Salvar</span>
			</button>
            <button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="escondeDiv('div_nome_relatorio');tiraLoad()">
                <span class="ui-button-text">Fechar</span>
            </button>
        </div>
    </div>
</div>