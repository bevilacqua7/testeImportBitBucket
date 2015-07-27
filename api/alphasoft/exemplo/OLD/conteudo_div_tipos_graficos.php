<div id="div_tipos_graficos" class="pws_box_dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable ui-resizable" tabindex="-1" role="dialog" aria-describedby="dialog" aria-labelledby="ui-id-8">
    <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-8" class="ui-dialog-title fonte12" ><span id="titulo_div_tipos_graficos">Opcoes de Graficos</span></span>
        <button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" role="button" aria-disabled="false" title="close" onClick="escondeDiv('div_tipos_graficos');clareiaTela()">
            <span class="fecharX">X</span>
        </button>
	</div>
    <div id="dialog" class="ui-dialog-content ui-widget-content wrs_check_vertical_scrol janela_height">
		<form id='form_tipos_graficos' name='form_tipos_graficos'>
            <table width='360'>
                <tr>
                    <td colspan='2' style='padding-right:10px'>
                        <span class='tit_metricas'>Metricas</span>
                        <div id='div_multi_select_metricas_graficos' style='margin-top:5px'></div>
                        <input type='checkbox' id='check_legendas' name='check_legendas'>Exibir Legendas
                        <input type='checkbox' id='check_polar' name='check_polar'>Polar 
                    </td>
                    <td class='e1' valign="top">
                        <table>
                            <tr>
                                <td><span class="tit_metricas">Tipo</span></td>
                                <td><span class="tit_metricas">&nbsp;&nbsp;Sub Tipo</span></td>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <div class="e2">
                                        <div style='margin-top:3px'><img src="../imagens/graficos/linha.png"/></div>
                                        <div style='margin-top:5px'><img src="../imagens/graficos/barras.png"/></div>
                                        <div class="top6"><img src="../imagens/graficos/colunas.png"/></div>
                                        <div class="top6"><img src="../imagens/graficos/area.png"/></div>
                                        <div class="top6"><img src="../imagens/graficos/pizza.png"/></div>
                                    </div>
                                </td>
                                <td>
                                    <div class="e3">
                                        <div class="e4">
                                            <table>
                                                <tr>
                                                    <td width='71' id='td_gln'><input type='radio' id='gln' name='sele_graficos' checked onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gln')">Normal</span></td>
                                                    <td width='90' id='td_gls'><input type='radio' id='gls' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gls')">Ondulado</span></td>
                                                    <td width='87' id='td_glp'><input type='radio' id='glp' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('glp')">Pontilhado</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="e5">
                                            <table>
                                                <tr>
                                                    <td width='73' id='td_gcn'><input type='radio' id='gcn' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gcn')">Normal</span></td>
                                                    <td width='90' id='td_gcs'><input type='radio' id='gcs' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gcs')">Empilhado</span></td>
                                                    <td width='87' id='td_gcp'><input type='radio' id='gcp' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gcp')">Percentual</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="e6">
                                            <table>
                                                <tr>
                                                    <td width='73' id='td_gbn'><input type='radio' id='gbn' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gbn')">Normal</span></td>
                                                    <td width='90' id='td_gbs'><input type='radio' id='gbs' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gbs')">Empilhado</span></td>
                                                    <td width='87' id='td_gbp'><input type='radio' id='gbp' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gbp')">Percentual</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class='e6'>
                                            <table>
                                                <tr>
                                                    <td width='73' id='td_gan'><input type='radio' id='gan' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gan')">Normal</span></td>
                                                    <td width='90' id='td_gas'><input type='radio' id='gas' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gas')">Empilhado<span></td>
                                                    <td width='87' id='td_gap'><input type='radio' id='gap' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gap')">Percentual</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class='e6'>
                                            <table>
                                                <tr>
                                                    <td width='72' id='td_gpi'><input type='radio' id='gpi' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gpi')">Pizza</span></td>
                                                    <td width='91' id='td_gga'><input type='radio' id='gga' name='sele_graficos' onclick='selecionaGrafico(this.id)'><span onClick="selecionaGraficoSeNaoDisabled('gga')">Gauge</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
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
            <button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="remontaGrafico();escondeDiv('div_tipos_graficos');clareiaTela()">
                <span class="ui-button-text">Ok</span>
            </button>
            <button class="botoes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false" onClick="escondeDiv('div_tipos_graficos');clareiaTela()">
                <span class="ui-button-text">Fechar</span>
            </button>
		</div>
    </div>
</div>