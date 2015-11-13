/**
 * Controle do Plugin JQuery Layout
 * By Marcelo Santos - Alpha Soft
 * Build in 17/12/2014
 * 
 * Commum a todos
 * 
 * API
 * @link http://layout.jquery-dev.com/
 */

var IS_TRACE	=	false;
var RAND_TOKEN	=	js_rand(0,9999999999999);
	include_js('ThreadJobManager');


/*
 * Tipos de Execuções que o sistema opera para gerar uma novo Report
 */
var TYPE_RUN	=	{
						direct				:	'RunFiltro',
						options				:	'Options',
						reorden_column		:	'OrdenaColuna',
						drildown			:	'DrillDown',
						linha				:	'DrillLinha',
						coluna_header		:	'DrillColuna',//Não modificar sem antes também modificar na lib pois é por esse nome que não insiro no histórico
						coluna_header_line	:	'DrillLinhaHeader',
						linha_header		:	'DrillHeaderData',
						data				:	'DrillValue'
					};

var ABA_TAG_NAME		=	'.WRSAbas ul';

function WRS_CONSOLE(){
	if(IS_TRACE){
		console.log(arguments);
	}
}

function WRS_IS_LOGGED_IN(){
	var loggedin	=	false;
	$.ajax({
		  type: 'POST',
		  url: 'run.php',
		  data: {'exit':1,'file':'WRS_LOGIN','class':'WRS_LOGIN','event':'userIsLogged'},
		  success: function(data){
						loggedin	=	data.trim()=='S'?true:false;	
						WRS_CONSOLE('LOGGED IN?',data,loggedin);	
					},
		  async:false  // este é o segredo de aguardar o retorno do ajax antes de retornar a funcao
		});
	return loggedin;
}
	
function verifica_loggedin_periodico(){
	
	var periodicidade = 30;//em segundos

	if(!WRS_IS_LOGGED_IN()){
		if(window.location.href.substr(-9,9)!='login.php'){
			var logoff = function(){ 
					window.location	= "run.php?file=WRS_MAIN&class=WRS_MAIN&event=logout";
			}

			var MODAL_JOB			=	'.modal-window-wrs';
			var MODAL_LOGOFF		=	'.modal-window-wrs-logoff';
			var _html	=	'<!--  Modal LOGOFF -->'+
							'		<div class="modal-window-wrs-logoff modal-window-wrs hide" >'+
							'			<div class="modal-box-wrs  modal-type-primary modal-size-normal" style="position: absolute; top: 50%; margin-top: -72px; ">'+
							'				<div class="modal-inner-wrs">'+
							'						<div class="modal-title-wrs-job">'+
							'							<h3><!-- Primary -->&nbsp;</h3> '+
							'						</div>'+
							'						<div class="modal-text-wrs-job">'+
							'							'+LNG('MSG_FORCE_LOGOFF')+
							'						</div>'+
							'						<div class="modal-buttons-wrs-job" report_id="">'+
							'							<button class="btn btn-warning modal-btn-padding modal-btn-job-wrs   action_logoff"> <span class="title"> <i class="glyphicon glyphicon-off color_white"></i> '+LNG('BTN_CLOSE')+' </span> </button>'+
							'						</div>'+
							'				</div>'+
							'			</div>'+
							'		</div>'+
							'<!--  END Modal LOGOFF -->';

			//Garante que não exista outra janela
			$('body').find(MODAL_JOB).each(function(){$(this).remove()});
			
			//Adiciona a estrutura da JANELA
			$('body').append(_html);

			$(MODAL_LOGOFF).width($(window).width()).height($(window).height()).removeClass('hide');				
			$('.action_logoff').unbind('click').click(logoff);				
		}
	}else{
		setTimeout(function(){
			verifica_loggedin_periodico();
		},periodicidade*1000);
	}

}
verifica_loggedin_periodico();

function changeTypeRun(IDGrid,typeRun)
{
	var report_id		=	str_replace('#','.',IDGrid);
	
		$(report_id).wrsAbaData('setKendoUi',{TYPE_RUN:typeRun});
}


function chIClass(input)
{
		return str_replace('#','.',input);
}

function getEIClass(inputEvent)
{
	return '.'+inputEvent.attr('id');
	
}

function _trim(input)
{
	return $.trim(input);
}


function include_js(file)
{
	var script	=	$('<script/>',{type:"text/javascript",src:"api/alphasoft/js/"+file+".js?"+RAND_TOKEN});
		$('head').append(script);

}


function setOption(event,value,_selected)
{
	var _option	=	"<option value='{value}' {selected} >{label}</option>";
	var replace	=	['{value}','{label}','{selected}'];
	
	for(lineValue in value)
		{
			var _tag	=	'';
			
			if(_selected==value[lineValue]){
				_tag	=	'selected';
			}
			
			event.append(str_replace(replace,[lineValue,value[lineValue],_tag],  _option));
		}	
}

function empty_wrs_defaults(input)
{
		switch(input)
		{
			case 'e30=' 	 :  return null; break;
			case undefined   : return null; break;
			case ''         :  return null; break;
			default  : return input; break;
		}
		
		return input;
}

function setOptionRadio(event,value,_selected)
{
	var rand_name = Math.floor((Math.random() * 1000) + 1);
	var _option	=	"<span><input type='radio' id='{rand}' name='"+rand_name+"' value='{value}' {selected} ><label for='{rand}'>{label}</label></span>";
	var replace	=	['{value}','{label}','{selected}','{rand}'];
	var elements = []; // inverter a ordem dos objetos, pois não da pra reordenar diretamente sem ser array
	for(lineValue in value)
		{
			var _tag	=	'';
			var _rand = 'radio_'+(Math.floor((Math.random() * 1000) + 1));			
			if(_selected==value[lineValue]){
				_tag	=	'checked';
			}
			elements.push($(str_replace(replace,[lineValue,value[lineValue],_tag,_rand],  _option)));
		}	
	event.append(elements.reverse());	
}



function array_length(array)
{
	var cc	=	0;
	
	for(array_0 in array)
		{
			cc++;
		}
	
	return cc;
}




function array_join(_param,__param)
{
	var _param_back	=	 [];
	
	
	for(line in _param)
		{
			_param_back[_param_back.length]=	_param[line];
		}
	
	for(line in __param)
	{
		_param_back[_param_back.length]=	__param[line];
	}
	return _param_back;
}

function array_find_data(array,value)
{

	for(obj in array)
		{
			if(obj==value) return true;
		}
	
	return false;
}


function exist_in_array(array,value)
{
	if(array.length==0) return false; 
	for(obj in array)
		{
			if(array[obj]==value) return true;
		}
	
	return false;
}

function qtd_frozen_eq(kendoUiID,index)
{
	return $(kendoUiID).find('.k-grid-header-locked tr:eq('+index+')').find('th').length;
}



function array_remove_value(_param,array_remove)
{
	var _array_tmp	= [];
 
	
	for(array_remove_value_o in _param)
		{
			if(exist_in_array(array_remove,_param[array_remove_value_o])==false)
			{
				_array_tmp[_array_tmp.length]	=	_param[array_remove_value_o];
			}
		}	
	
	return _array_tmp;
}


function sleep(milliseconds)
{
	  var start = new Date().getTime();
	  
	  for (var i = 0; i < 1e7; i++)
	  {
		    if ((new Date().getTime() - start) > milliseconds)
		    {
		      break;
		    }
	  }
	  
}




function WRS_PANEL_DRAG()
{
	$('.wrs_panel_center_body').show();
	$('.container_panel_relatorio').hide();
}

function addJsonEncodeToElement(array,element)
{
	element.attr('json',base64_encode(json_encode(array,true)));
}



function activeToGetAllFilters()
{
	var _filter_hide_string		=	$('.wrs_panel_filter_icon').attr('filter_hide');
		_filter_hide			=	 _filter_hide_string=='true'	? true : false;

	if(!_filter_hide)
	{
			$('.wrs_panel_filter_icon').attr('filter_hide','false').trigger('click');
	}
	
	return _filter_hide;
}


function activeToGetAllFiltersRecover(_filter_hide)
{
	if(!_filter_hide)
	{
		$('.wrs_panel_filter_icon').trigger('click');
	}
	
}

function wrs_base64encode(inputArray)
{
	
	return base64_encode(inputArray);
}

function base64_json(inputArray)
{
	return base64_encode(json_encode(inputArray));
}



function cleanJsonEncodeToElement(element)
{
	element.attr('json','');
}


function fwrs_array_change_value(_array,value,valueChange)
{
	var tmp	=	_array;
	
	for(x in _array)
		{
			
			if(value==_array[x])
			{
				tmp[x]	=	valueChange;
			}
		}
		
		return tmp;
}

function fwrs_array_val_not_empty(_array)
{
	var tmp	=	[];
	
	for(x in _array)
		{
			if(!empty(_array[x])){
				tmp[x]=	_array[x];
			}
		}
	return tmp;
}

function getJsonEncodeToElement(element)
{
	return $.parseJSON(base64_decode(element.attr('json')));
}

/*
 * Decodifica base 64 para json e para array
 */
function getJsonDecodeBase64(json)
{
	
	if(empty(json) || json=='null') return json;
	return $.parseJSON(base64_decode(json));
}


function filter_array_convert(input)
{
	if(empty(input)) return [];
	
	var input_array	=	 explode(',',input);
	var tmp_input	=	[];

	for(var lineInput in input_array)
		{
			tmp_input[tmp_input.length]		=	'__'+replace_attr(input_array[lineInput]);
		}
	return tmp_input;
}


function filter_TMP_to_array(input)
{
	if(empty(input)) return [];
	
	var tmp_input	=	[];
	
	
	for(var lineInput in input)
		{
			var inputData		=	input[lineInput];
			var _filter			=	explode(',',inputData['data']);
				_filter			=	empty(_filter) ? '' : _filter;
				
				tmp_input[tmp_input.length]		=	[inputData['class'],'',_filter];				
		}
	
	return tmp_input;
}


function filter_configure_window()
{
	var filter_h	=	$('.wrs_panel_filter_icon').attr('filter_hide'); 
	var label		=	'false';
		$('.WRS_DRAG_DROP_RECEIVER_FILTER').show();
		$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
	

		if(filter_h=='true')
		{
			label	=	 'false';
		}
		
		$('.wrs_panel_filter_icon').attr('filter_hide',label).trigger('click'); 
	
}

/**
 * @Link http://stackoverflow.com/questions/1822598/getting-url-hash-location-and-using-it-in-jquery/1822617#1822617
 * @returns
 */
function url_hash()
{
	var hash = window.location.hash;
	return hash;
}

function setLoading(obj)
{
	obj.html('<div class="wrs_loading"><img src="./imagens/wrs_loading.gif"/></div>');
}

function WRS_PANEL_RELATORIO()
{
	$('.wrs_panel_center_body').hide();
	$('.container_panel_relatorio').show();
}



function replace_attr(value)
{
	var repalce		=	['[',']','.','%'    ,'&',' ',',','(',')','/','}','{'];
	var sub			=	['' ,'' ,'' ,'_por_','' ,'' ,'' ,'' ,'' ,'' ,'' , ''];
	return str_replace(repalce,sub,value);	
}



function WRS_CONFIRM(_text,_type,_callback)
{
	
	var _tite		=	"ALERT_TITLE_INFO";
	var _is_type	=	_type;
	
	switch(_type)
	{
		case 'info' 	: _title	=	LNG('ALERT_TITLE_INFO') ;break;
		case 'error' 	: _title	=	LNG('ALERT_TITLE_ERRO') ;break;
		case 'success' 	: _title	=	LNG('ALERT_TITLE_SUCCESS') ;break;
		case 'warning' 	: _title	=	LNG('ALERT_TITLE_WARNING') ;break;
	}
	
	
	modal({
		type  		: 'confirm',
		wrs_type	:	_type,
		 title		:	_title,
		 buttonText : {ok:LNG('BTN_CONFIRM'),yes:LNG('BTN_SIM'),cancel:LNG('BTN_NAO')},
		closeClick 	: false, //Close Modal on click near the box
		text  		: _text,
		callback	: function(result){ _callback(result); }
	});
}


function WRS_ALERT(_text,_type)
{
	var _tite		=	"ALERT_TITLE_INFO";
	var _is_type	=	_type;
	
	switch(_type)
	{
		case 'info' 	: _title	=	LNG('ALERT_TITLE_INFO') ;break;
		case 'error' 	: _title	=	LNG('ALERT_TITLE_ERRO') ;break;
		case 'success' 	: _title	=	LNG('ALERT_TITLE_SUCCESS') ;break;
		case 'warning' 	: _title	=	LNG('ALERT_TITLE_WARNING') ;break;
	}
	
	modal({
		type  		: _type,
		title		:	_title,
		 buttonText : {ok:LNG('BTN_CONFIRM'),yes:LNG('BTN_SIM'),cancel:LNG('BTN_NAO')},
		closeClick 	: false, //Close Modal on click near the box
		text  		: _text
	});
}

/**
 * Apenas para uso rápido não oficial
 */
function TRACE_DEBUG(value)
{
	IS_TRACE=	true;
	TRACE(value);
	IS_TRACE=	false;
}
function TRACE(value)
{
	if(!IS_TRACE) return false;
	if(empty($('.WRS_TRACE').html()))
	{
		$('body').append('<div class="WRS_TRACE"></div>');
		$('.WRS_TRACE').dblclick(function() {$(this).html('');});
	}
	$('.WRS_TRACE').append('<div>'+value+'</div>');
}




function fwrs_error(msg)
{
	return fwrs_alert(msg,'alert-danger');
}

function fwrs_warning(msg)
{
	return fwrs_alert(msg,'alert-warning');
}

function fwrs_alert(msg,type)
{
	return '<div class="alert '+type+'">'+msg+'</div>';
}

function wrsCheckLogin(login,pwd,event,perfil)
{
	TRACE('Iniciando wrsCheckLogin na common.js');
	
	$('.wrs_login').html('Login: <img src="./imagens/wrs_loading.gif"/>');
	var isCookie	=	 $('#chk_lembrar:checked').val() == 1 ? 1 : 0;	

	$('.mensagens').html('');
	
	
	TRACE('Enviando parametro para o Post run.php wrsCheckLogin na common.js');
	$.post('run.php',{'login':login,'pwd':pwd,'perfil':((perfil!=undefined && perfil!='')?perfil:''),'file':'WRS_LOGIN','class':'WRS_LOGIN','event':event,'isCookie':isCookie},function(data){

				TRACE('recebendo parametro do Post run.php wrsCheckLogin na common.js');
		
				$('.wrs_login').html('Login');
				
				if(data=='true'){
					window.location	=	'run.php?file=WRS_MAIN&class=WRS_MAIN&ncon';
				}else{
					$('.mensagens').html(data);
				}
				
				
				if(empty(data)){
					$('.mensagens').html(fwrs_error(LNG('ERRO_FILE_PROCCESS')));
				}
				
				TRACE('O post da run.php wrsCheckLogin da common.js foi concluido');
	}).fail(function() {
		$('.mensagens').html(fwrs_error(LNG('ERRO_FILE_PROCCESS')));
	  });
}



/**
 * Fazendo merge no objetos do javascript
 * @param objFirst
 * @param objSecond
 * @returns
 */
function merge_objeto(objFirst,objSecond)
{
	return $.extend({}, objFirst,objSecond);		
}

 

/**
 * passando apenas parametros
 * @param param_request
 * @param Ofile
 * @param Oclass
 * @param Oevent
 */
function runCall(param_request,Ofile,Oclass,Oevent,funCallBack,typeAlert,typeData)
{
	//No typeData pode se informar se é json ou não
	
	var param	=	{'class':Oclass,'file':Ofile,'event':Oevent};
		param	=	merge_objeto(param,param_request);


	TRACE('Enviando parametro para o run.php mas sem esperar resposta file:common.js');	
	$.post('run.php',param,funCallBack,typeData).fail(function() {
			if(typeAlert=='modal')
			{
				WRS_ALERT(LNG('ERRO_FILE_PROCCESS'),'error');
				
			}else{
				$('.mensagens').html(fwrs_error(LNG('ERRO_FILE_PROCCESS')));
			}
			
	  });
	TRACE('runCall finalizado');
}





function getDateTime(){
	
		var objToday = new Date(),
			weekday = new Array('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'),
			dayOfWeek = weekday[objToday.getDay()],
			dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
			months = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'),
			curMonth = months[objToday.getMonth()],
			curYear = objToday.getFullYear(),
			curHour = objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours(),
			curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
			curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds()
		var today = curHour + ":" + curMinute + ":" + curSeconds + " - " + dayOfWeek + ", " + dayOfMonth + " de " + curMonth + " de " + curYear;
	
		/*
	if(curSeconds % 59 == 0){
		verificaSessaoAtiva()
	}*/
	
	$('.WRS_TIME').html(today);
}



function setWRSTime()
{
	setInterval(getDateTime,1000);
}




/*
 * 
 * Construção do Botão direito
 * 
 */



function removeKey(inputArray, line)
{
	var _tmp		=	[];
	
	    for(var lineArray in inputArray) 
	    {
	        if(lineArray != line) 
	        {
	        	_tmp[lineArray]	=	inputArray[lineArray];
	        }
	    }
    
    return _tmp;
}


function buttonClickRightRelatorios(nameObject,itemsElement)
{
	$(nameObject).each(function(){
		$(this).removeClass('context-menu-active');
	});
	
	
	
	 $.contextMenu({
	        selector: nameObject, 
	        className: 'contex-menu-title',
	        //callback: function(key, options) {},
	        items: itemsElement
	    });
	  $('.contex-menu-title').attr('data-menutitle', LNG('TITLE_CONTEX_MENU'));
}

function wrs_contex_menu_options_panel_atributos()
{
	//A variável droppableOptionsOl vem do preenchimento da wrs_panel.js
	
	var itemsElement	=	{};
	
	itemsElement[0]	=	{name:LNG('ATTRIBUTOS_FILTRO')	,icon : 'add', callback:function(){ send_filters_to_painel( 'DIRECT', $(this),$('.sortable_filtro'));  }};
	itemsElement[1]	=	{name:LNG('ATTRIBUTOS_COLUNA')	,icon : 'add', callback:function(){ send_filters_to_painel( 'DIRECT', $(this),$('.sortable_coluna')); }};
	itemsElement[2]	=	{name:LNG('ATTRIBUTOS_LINHA')	,icon : 'add', callback:function(){ send_filters_to_painel( 'DIRECT', $(this),$('.sortable_linha')); }};
	itemsElement[3]	=	'---------';
	itemsElement[4]	=	{name:LNG('BTN_SAIR'),icon : 'quit' , callback:function(){}};
	
	buttonClickRightRelatorios('.wrs_options_panel_atributo li',itemsElement);
}

function send_filters_to_painel(type,obj,painel){
	var itens_selecionados = obj.parents('div.wrs_panel_options').find('li.ui-draggable.ui-state-focus');
	if(itens_selecionados.length>0){
		var item_ja_existe=[];
		var _painel_find = painel;
		if(painel.hasClass('sortable_coluna') || painel.hasClass('sortable_linha')){
			_painel_find = $('.sortable_coluna, .sortable_linha');
		}
		itens_selecionados.each(function(){
			if(_painel_find.find('li.'+$(this).attr('tag-class')).length<=0){
				DROP_EVENT(type, $(this).removeClass('ui-state-focus'),painel);
			}else{
				item_ja_existe.push($(this).text());
			}
		});
		limpa_botoes_selecionados_filtros(obj.parents('div.wrs_panel_options'));
		if(item_ja_existe.length>0){
			var _s 		= item_ja_existe.length>1?'s':'';
			var _ns 	= item_ja_existe.length>1?'ns':'m';
			var _m 		= item_ja_existe.length>1?'m':'';
			var _ram 	= item_ja_existe.length>1?'ram':'i';
			var text 	= LNG('FILTER_CONTEX_MENU_SELECTION_ITEM_EXISTS').replace('%s',_s).replace('%ns',_ns).replace('%m',_m).replace('%ram',_ram).replace('%s',_s);
			for(var item in item_ja_existe){
				text   += "<br/> - "+item_ja_existe[item];
			}
			WRS_ALERT(text,'warning');
		}
	}else{
		DROP_EVENT(type, obj, painel);
	}	
}

function wrs_contex_menu_options_panel_metrica()
{
	var itemsElement	=	{};
	
	itemsElement[0]	=	{name:LNG('ATTRIBUTOS_METRICA')	,icon : 'add', callback:function(){ send_filters_to_painel('DIRECT',$(this),$('.sortable_metrica')); }};
	itemsElement[1]	=	'---------';
	itemsElement[2]	=	{name:LNG('BTN_SAIR'),icon : 'quit' , callback:function(){}};
	
	buttonClickRightRelatorios('.wrs_options_panel_metrica li',itemsElement);
}



function add_filtro_simples_composto_btn(type)
{
	var btn_simple		=	'<span  class="icon_atributo glyphicon glyphicon-play-circle"></span>';
	var btn_composto		=	'<span  class="icon_atributo"></span>';
	
	if(type)
		return btn_simple;
	
	return btn_composto;
}

function add_filtro_simples_composto()
{
	$('.sortable_filtro li').each(function(){
		 var class_is		=	 $(this).attr('class');
		 var sc_load		=	$(this).attr('sc_load');
		 
		 if(!empty(sc_load))
			 {
			 	$(this).attr('atributo',sc_load);
			 	$(this).attr('sc_load','');
			 }
		 
		 if(class_is!='placeholder')
		 {
			var atributo	=	$(this).attr('atributo');
			
			$(this).find('.icon_atributo').remove();
			
			if(atributo=='simples')
			{
				$(this).prepend(add_filtro_simples_composto_btn(true));
			}
			else
			{
				$(this).prepend(add_filtro_simples_composto_btn(false));
			}
		 }
	});
}


function sortable_attr_simples_composto()
{
	var itemsElement	=	{};
	
	itemsElement[0]	=	{name:LNG('ATTRIBUTOS_SIMPLES')	,	icon : 'add', callback:function(){ $(this).attr('atributo','simples'); add_filtro_simples_composto(); }};
	itemsElement[1]	=	{name:LNG('ATTRIBUTOS_COMPOSTO'),	icon : 'add', callback:function(){ $(this).attr('atributo','composto');add_filtro_simples_composto(); }};
	itemsElement[2]	=	'---------';
	itemsElement[3]	=	{name:LNG('BTN_SAIR'),icon : 'quit' , callback:function(){}};
	
	buttonClickRightRelatorios('.sortable_filtro li',itemsElement);
	
	add_filtro_simples_composto();
	
	
	

}



function WRSformatString(cellValue) 
{
	return '<div class="wrs_control_td_jqgrid ui-state-default" wrsclass="no_jgrid_config" >'+cellValue+'</div>';
}
				

/**
 * Formata os campos Numericos da GRid
 * @param cellValue
 * @param options
 * @param rowObject
 * @returns
 */
function WRSformatNumber(cellValue, options, rowObject)
{
			/*
			 * Campos esperados
			 * wrs_data.MEASURE
			 * wrs_data.FORMAT_STRING
			 */	
			var wrs_data	=	options.colModel['wrs_data'];
	
			//Configura para o Negrito
			if(strpos(cellValue,'<strong>')!==false){
				return '<strong>'+formataValue(wrs_data.MEASURE,wrs_data.FORMAT_STRING,cellValue,1)+'</strong>';
			}
			
			
			return formataValue(wrs_data.MEASURE,wrs_data.FORMAT_STRING,cellValue,1);
			

						
}
			
/**
 * Faz o ajuste do Backgroud do Frozen
 */
function WRSFrozenTheme()
{
	$('.wrs_control_td_jqgrid').each(function(){
		$(this).parent().addClass($(this).attr('wrsclass'));
	});
}
			

/**
 * 
 * Exemplos de resize
 * @link http://stackoverflow.com/questions/875225/resize-jqgrid-when-browser-is-resized
 * 
 * @param object
 */
function WRSGridLoadComplete(object)
{
	var padding		=	parseInt($('.ui-layout-center').css('padding-top').replace('px'))*2;
	var abaHeight	=	$('.WRS_ABA').outerHeight();
	
	var width		=	$('.ui-layout-center').width()-padding;
	var height		=	$('.ui-layout-center').height()-(padding+(abaHeight*3));
	
//	$(object).setGridWidth(width);
	
	$(object).jqGrid("setGridWidth", "100%");
	
	//$(object).setGridHeight(height);
}


 
/*
 * COntruindo o resize da Grid Simples
 * TODO: Tenho que sincronizar essa informação com o WRSWindowGridEventTools
 */
function resizeGridSimple()
{
	var hasClass	=	 empty($(".wrsGrid").html()) ? false : true;
	if(hasClass)//Verificando se a classe existe
	{
		
		var telerikGrid 	= 	$('.wrsGrid').data('kendoGrid');
		var IDName			=	'#'+telerikGrid.element.attr('id');
		
		var grid			=	getElementsWrsKendoUi($('.wrsGrid'));
		var window_grid		=	grid['WINDOW'];
		

		//$(IDName+"NAV .wrs_tools_options_window").find("a[wrs-data="+window_grid+"]").trigger('click');
		
		/*
		
		var padding			=	parseInt($('.wrs_nav_relatorio').css('padding-top').replace('px'))*2;
		var abaHeight		=	$('.wrs_nav_relatorio').outerHeight();
		var paddingCenter	=	parseInt($('.ui-layout-center').css('padding-bottom').replace('px'));
		var width			=	$('.ui-layout-center').width()-padding;
		var height			=	$('.ui-layout-center').height()-((padding+(abaHeight))+paddingCenter);
		
		$(IDName).height(height);	*/
		//telerikGrid.resize();
		resize_common();
	}
} 


/*
 * TODO: Verificar se está correto as informações
 */
function merge_filter_data(input,inputMerge)
{

	var _tmp_merge		=	[];
		_tmp_merge		=	inputMerge;



	for(lineInputMerge in input)
		{
			var _key	=	String(lineInputMerge);
			
				if(!empty(input[_key]))
				{
					
						_tmp_merge[_key]		=	input[_key];
				}
		}

	return _tmp_merge;
	
}

function array_concat(first_input,second_input)
{
	var call_back	=	first_input;
	
	for(var lineSecond in second_input)
		{
			call_back[lineSecond]=	second_input[lineSecond];
		}

	return call_back;
}

/**
 * 
 * Está vinculado a formataValue
 * 
 */
function sumarizaValor(valor)
{
	var _casa_decimal 	= 	'.';
	var _milhar 		= 	',';
	var _value 			= 	valor;
	var _value_limit	=	0;
	var _WORD			=	'';
	
	if(LNG('IDIOMA')== 'POR')
	{
		_casa_decimal 	= ',';
		_milhar 		= '.';
	}
	
	
	if(valor>1000000000000000)
	{
		_value_limit	=	16;
		_WORD			=	'T';
	}
	else if(valor>1000000000000)
	{
		_value_limit	=	12;
		_WORD			=	'G';
	}
	else if(valor>1000000000)
	{
		_value_limit	=	8;
		_WORD			=	'M';
	}
	else if(valor>1000000)
	{
		_value_limit	=	4;
		_WORD			=	'K';
	}
	
	if(_value>200 || _value<-200)
	{
		_value 	= number_format(_value,0,'',_milhar);
	}
	
	return  substr(_value,0,strlen(_value)-_value_limit)+_WORD;
	
}



/**
 * Formatação das String da GRID
 * @param MEASURE_NAME
 * @param formatacao
 * @param valor
 * @param sumariza
 * @returns
 */
function formataValue(MEASURE_NAME,formatacao,valor,sumariza,notTAG,label)
{
	var _casa_decimal 	= '.';
	var _milhar 		= ',';
	var _label			= (label!=undefined && label.trim()!='')?label:'';

	if(LNG('IDIOMA')== 'POR')
	{
		_casa_decimal 	= ',';
		_milhar 		= '.';
	}
	
	switch(formatacao)
	{
		//Colunas de Valores
		case '' : 
		case 'Standard' :{
								if(sumariza=='1')
								{
									return sumarizaValor(number_format(valor,0,'',''));
								}
								else
								{
									return number_format(valor,0,_casa_decimal,_milhar);
								}
						};
		break;
		case 'Currency' :	return "$"+number_format(valor,2,_casa_decimal,_milhar);	break;
		case 'Percent' 	:
							{

									var controle_metricas=false;

									try{
										controle_metricas=(_label.trim().toLowerCase().substr(0,5)=='cresc' || _label.trim().toLowerCase().substr(0,4)=='evol');
									}catch(e){}

									//if(strpos(MEASURE_NAME,'Cresc.')!==false || strpos(MEASURE_NAME,'Evol.')!==false)	
									if(controle_metricas)
									{
										if(valor>0){
											seta = "<img src='imagens/setinha_verde.png' width='9' height='9'/>";
										}
										else if(valor<0)
										{
											seta = "<img src='imagens/setinha_vermelha.png' width='9' height='9'/>";
										}else if(number_format(valor*100,2,_casa_decimal,_milhar)=='0,00')
										{
											seta = "<img src='imagens/yellow_square.png' width='9' height='9'/>";
										}
										else
										{
											seta = "";
										}
										if(!empty(notTAG))  return number_format(valor*100,2,_casa_decimal,_milhar);
										
										/*
										 * TODO:IMplementar a barra adicional para funcionar
										 */
//										seta	=	'';
										return [number_format(valor*100,2,_casa_decimal,_milhar)+'% ',seta];
										
									}
									else
									{
										if(!empty(notTAG)) return number_format(valor*100,2,_casa_decimal,_milhar);
											
										return number_format(valor*100,2,_casa_decimal,_milhar)+'%';
									}
			
							}
		break;
		case 'Short Date' : 
		case 'Short Time' :	return valor;		break;
	}
	
	

	//Verifica formatação de casas decimais (Ex: #.## / #.00, etc)
	if(	(strpos(formatacao,'.#')!==false) || 
		(strpos(formatacao,'.0')!==false))
	{
		//Conta a quantidade de caracteres que contenham a formatação numérica;
		qtd_casas 		= strspn(substr(formatacao,strpos(formatacao,'.')+1),"#0");
		valor_formatado = number_format(valor,qtd_casas,_casa_decimal,_milhar);
	}else{
		valor_formatado = (valor == '' ? number_format(0,0,_casa_decimal,_milhar) : number_format(valor,0,_casa_decimal,_milhar));
	}

	
	
	//Verifica Caracter Literal no inicio da string
	literal_inicio = strcspn(formatacao,"#0,.");
	
	if (literal_inicio > 0)
	{
		valor_formatado = substr(formatacao,0,literal_inicio).valor_formatado;
	}
	
	
	//Verifica Caracter Literal no final da string
	literal_final = strlen(formatacao)-(literal_inicio+strspn(substr(formatacao,literal_inicio),"#0,."));
	
	if (literal_final > 0)
	{
		valor_formatado += substr(formatacao,-literal_final);
	}

	return valor_formatado;
	
	
	
}




$(document).ready(function(){
	
	$('body').WRSJobModal(); //Criando o BOX de CSS
	
	$('.menu_administrativo_itens').hide();
	
	$('.menuADM_link').click(function(){
		$('.menu_administrativo_itens, #fullwidth, #fullwidth_ds').toggle();
	});

	$('.menu_cadastro').click(function(){
		grid_window_modal({wrs_type_grid:'list',cube_s:CUBE_S},$(this).attr('tabela'));
		$('#myModal').modal('show');
	});
		

});