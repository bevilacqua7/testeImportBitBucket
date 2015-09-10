<style>
.bt_pequeno{
    width: 100px;
    height: 20px;
    padding: 0px;
    }
.select_altura{
    height: 100px!important;
    padding: 0px!important;
}
</style>
<script>

$(function(){
	select_work('select1');
	select_work('select2');
});

/*
 * Considera que existem botoes com as class: toActive, toMeasure, toAllActive, toAllMeasure
 * e tamb�m as selects multiples com as class: wrs-measures e wrs-measures-receive
 */
function select_work($id_div){
	$('#'+$id_div).find('.toActive').unbind('click').click(function(){
		$('#'+$id_div).find('.wrs-measures :selected').each(function(i, selected){ 
			$(this).remove().appendTo($('#'+$id_div).find('.wrs-measures-receive'));
		});
		$('#'+$id_div).find('.wrs-measures-receive :selected').removeAttr("selected");
	});
	$('#'+$id_div).find('.toAllActive').unbind('click').click(function(){
		$('#'+$id_div).find('.wrs-measures option').each(function(i, selected){ 
			$(this).remove().appendTo($('#'+$id_div).find('.wrs-measures-receive'));
		});
		$('#'+$id_div).find('.wrs-measures-receive :selected').removeAttr("selected");
	});
	$('#'+$id_div).find('.toMeasure').unbind('click').click(function(){
		$('#'+$id_div).find('.wrs-measures-receive :selected').each(function(i, selected){ 
			$(this).remove().appendTo($('#'+$id_div).find('.wrs-measures'));
		});
		$('#'+$id_div).find('.wrs-measures :selected').removeAttr("selected");
	});
	$('#'+$id_div).find('.toAllMeasure').unbind('click').click(function(){
		$('#'+$id_div).find('.wrs-measures-receive option').each(function(i, selected){ 
			$(this).remove().appendTo($('#'+$id_div).find('.wrs-measures'));
		});
		$('#'+$id_div).find('.wrs-measures :selected').removeAttr("selected");
	});
	$('#'+$id_div).find('.wrs-measures').unbind('dblclick').bind('dblclick',function(){
		$("option:selected", this).remove().appendTo($('#'+$id_div).find('.wrs-measures-receive'));
		$('#'+$id_div).find('.wrs-measures-receive :selected').removeAttr("selected");
	});
	$('#'+$id_div).find('.wrs-measures-receive').unbind('dblclick').bind('dblclick',function(){
		$("option:selected", this).remove().appendTo($('#'+$id_div).find('.wrs-measures'));
		$('#'+$id_div).find('.wrs-measures :selected').removeAttr("selected");
	});
}

</script>
<form id="insert_report" name="insert_report">

				<label for="report_name">Nome</label><br>
					<input type="text" id="report_name" name="report_name" value="<?php echo $nome_report;?>" style="width: 768px;">	
				<br>
				<input type="checkbox" id="report_auto" name="report_auto" value="1"> <label for="report_auto">Carga Automática </label>  &nbsp; &nbsp; &nbsp; <input type="checkbox" id="report_share" name="report_share" value="1"> <label for="report_share">Compartilhado</label>	
								
				<br>
				<label for="select1">Layouts</label>
	      		<div class="row default_config" id="select1">
      				<select class="select_altura col-sm-5 wrs-measures multiple" multiple>
					</select>		      		 
		      		<div class="col-sm-2 spance_paddding_top_wrs">		      			
		      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
						<button type="button" class="bt_pequeno toMeasure btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
						<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
						<button type="button" class="bt_pequeno toAllMeasure btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
					</div>				
  					<select name="layouts" class="select_altura col-sm-5 wrs-measures-receive multiple" multiple>
					</select>				
				</div>
				<br>
				<label for="select2">Grupos</label>
	      		<div class="row default_config" id="select2">
      				<select class="select_altura col-sm-5 wrs-measures multiple" multiple>
					</select>		      		 
		      		<div class="col-sm-2 spance_paddding_top_wrs">		      			
		      			<button type="button" class="bt_pequeno toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
						<button type="button" class="bt_pequeno toMeasure btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
						<button type="button" class="bt_pequeno toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
						<button type="button" class="bt_pequeno toAllMeasure btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
					</div>				
  					<select name="grupos" class="select_altura col-sm-5 wrs-measures-receive multiple" multiple>
					</select>				
				</div>

</form>