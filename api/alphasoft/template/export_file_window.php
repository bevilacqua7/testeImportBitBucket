<?php

$event_form = ((!isset($event_form) || $event_form==null || $event_form==''))?(isset($_request_original)?$_request_original['event']:'export'):$event_form;

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









$LNG_caracter_delimitador 		= LNG('ADMIN_IMPORT_caracter_delimitador');
$LNG_compactar_resultados		= LNG('ADMIN_IMPORT_compactar_resultados');
$LNG_virgula 					= LNG('ADMIN_IMPORT_virgula');
$LNG_ponto_virgula 				= LNG('ADMIN_IMPORT_ponto_virgula');
$LNG_tabulacao 					= LNG('ADMIN_IMPORT_tabulacao');
$LNG_JS_admin_confirm_export 	= LNG('JS_admin_confirm_export');
$LNG_JS_admin_select_one 		= LNG('JS_admin_select_one');
$LNG_JS_admin_all_records 		= LNG('JS_admin_all_records');
$LNG_JS_admin_selecteds 		= LNG('JS_admin_selecteds');
$LNG_MODAL_CONFIRM_BT_CANCEL 	= LNG('MODAL_CONFIRM_BT_CANCEL');
$LNG_bt_export 					= LNG('bt_export');
$LNG_bt_sim 					= LNG('BTN_SIM');
$LNG_bt_nao 					= LNG('BTN_NAO');
				
$prerequest						= isset($prerequest) && $prerequest!=''?$prerequest:'';


$HTML_DEFAULT = <<<EOF

<form class="grid_window_values_form">
  <input type="hidden" name="prerequest" value="{$prerequest}">
  <div class="container-fluid">
    <div class="row">
      <table class="table form-group">
        <tbody>
          <tr>
            <td>{$LNG_caracter_delimitador} 
            </td>
            <td>
              <input type="radio" name="caracter_d" id="caracter_d2" value="ponto_virgula" checked>
              <label for="caracter_d2" style="font-weight: normal;">{$LNG_ponto_virgula}
              </label>
            </td>
            <td>
              <input type="radio" name="caracter_d" id="caracter_d1" value="virgula">
              <label for="caracter_d1" style="font-weight: normal;">{$LNG_virgula}
              </label>
            </td>
            <td>
              <input type="radio" name="caracter_d" id="caracter_d3" value="tabulacao">
              <label for="caracter_d3" style="font-weight: normal;">{$LNG_tabulacao}
              </label>
            </td>
          </tr>
          <tr>
            <td>{$LNG_compactar_resultados} 
            </td>
            <td>
              <input type="radio" name="caracter_c" id="caracter_c1" value="sim" checked>
              <label for="caracter_c1" style="font-weight: normal;">{$LNG_bt_sim}
              </label>
            </td>
            <td colspan="2">
              <input type="radio" name="caracter_c" id="caracter_c2" value="nao">
              <label for="caracter_c2" style="font-weight: normal;">{$LNG_bt_nao}
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</form>
		


EOF;









