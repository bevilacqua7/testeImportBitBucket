/**
 * Criado por Marcelo Santos 
 * Criando e manipulando o Google Maps
 *  
 */


/*
 * API para salvar os elementos do Kendo Ui na estrutura
 */
(function( $ ) {
	
	/**
	 * Configurações das opções TOP
	 */
	$.fn.loadParanGridWindow = function(column,param) 
	{
		var that		=	 '#'+param.table;
			$(that).data('loadParanGridWindow',{'column':column,'param':param});
	}
	
}( jQuery ));


 









//Essa função é apenas para evitar erros pois o CUBE_S é utilizado apenas no Main para identidicar qual o cubo da requisição
try{
	if(CUBE_S){}//Validação para verificar se CUBES Existe
}catch(e){
	var CUBE_S	=	null;
}






/**
 * Construlçao do Dado da GRid
 */
function onDataBindingWindowGrid(arg)
{
	return arg;
}

var wrsWindowGridShare			=	null;

function onDataBoundWindowGrid(arg)
{	
	_START('onDataBoundWindowGrid');
	var tabela				=	arg.sender.element.attr('id');
	var IDName				=	'#'+tabela;
	
	
	wrsWindowGridShare		=	$(IDName).data('wrsWindowGridShare');
	
	
	$(IDName).data('wrs-modal',arg.sender._data);

	var loadParanGridWindow	=	$(IDName).data('loadParanGridWindow');
	var telerikGrid 		= 	$(IDName).data('kendoGrid');
		
	arg.sender['wrs_grid']		=	loadParanGridWindow;

	var _linhas_tabela 	= arg.sender.content.find('table tr');
	var _linha_header	= arg.sender.thead.children('tr');
	var _classes_Line 		= [];
	var _classes_Header		= [];
	var _param_aplicaClassLinhas 	= (arg.sender.wrs_grid==undefined)?'':arg.sender.wrs_grid.param.aplicaClassLinhas;
	var _param_aplicaClassHeaders 	= (arg.sender.wrs_grid==undefined)?'':arg.sender.wrs_grid.param.aplicaClassHeaders;
	
	// preencho o array com as classes existentes
	if(arg.sender.wrs_grid!=undefined)
		
	for(idx in arg.sender.wrs_grid.column){
		// se houver classe por linha de coluna OU houver uma classe forcada para todas as linhas de colunas
		if(arg.sender.wrs_grid.column[idx].classDataLine!=undefined || (_param_aplicaClassLinhas!=false && _param_aplicaClassLinhas!=true)){
			_classes_Line[idx]=(_param_aplicaClassLinhas!=false && _param_aplicaClassLinhas!=true)?_param_aplicaClassLinhas:arg.sender.wrs_grid.column[idx].classDataLine;
		}
		// se houver classe por coluna OU houver uma classe forcada para todas as colunas
		if(arg.sender.wrs_grid.column[idx].classDataHeader!=undefined || (_param_aplicaClassHeaders!=false && _param_aplicaClassHeaders!=true)){
			_classes_Header[idx]=(_param_aplicaClassHeaders!=false && _param_aplicaClassHeaders!=true)?_param_aplicaClassHeaders:arg.sender.wrs_grid.column[idx].classDataHeader;
		}
	}

	// se houverem classes para preencher na grid, varre a linha e adiciona as classes na coluna correspondente
	if(_classes_Line.length>0 || (arg.sender.wrs_grid!=undefined && arg.sender.wrs_grid.param.aplicaClassLinhas!=false && arg.sender.wrs_grid.param.aplicaClassLinhas!=true)){
		if(arg.sender.wrs_grid.param.aplicaClassLinhas==true){ // verifica parametro na WRSPARAM
			_linhas_tabela.each(function(){ // aplica em cada linha do conteudo
				if($(this).find('input.checkline').length){ // excecao para alinhar no centro quando houver checkbox na linha
					$($(this).find('td')[$(this).find('input.checkline').index()]).addClass('text-center');				
				}
				for(posicao in _classes_Line){ // aplica a classe na coluna correspondente
					$($(this).find('td')[posicao]).addClass(_classes_Line[posicao]);
				}
			});
		}else if(arg.sender.wrs_grid.param.aplicaClassLinhas!=false){ // se ela nao for false, nem true é porque está forçando uma Class especifica padrao
			_linhas_tabela.each(function(){ // aplica em cada coluna da linha do conteudo
				if($(this).find('input.checkline').length){ // excecao para alinhar no centro quando houver checkbox na linha
					$($(this).find('td')[$(this).find('input.checkline').index()]).addClass('text-center');				
				}
				for(posicao in _classes_Line){ // aplica a classe na coluna da linha correspondente
					$($(this).find('td')[posicao]).addClass(arg.sender.wrs_grid.param.aplicaClassLinhas);
				}
			});
		}
	}
	// se houverem classes para preencher na grid, varre a linha das headers e adiciona as classes na coluna correspondente
	if(_classes_Header.length>0 || (arg.sender.wrs_grid!=undefined && arg.sender.wrs_grid.param.aplicaClassHeaders!=false && arg.sender.wrs_grid.param.aplicaClassHeaders!=true)){
		if(arg.sender.wrs_grid.param.aplicaClassHeaders==true){ // verifica parametro na WRSPARAM
			_linha_header.each(function(){ // aplica a classe tambem na linha de cabecalho para corresponder ao conteudo
				if($(this).find('input.checkline').length){ // excecao para alinhar no centro quando houver checkbox na linha
					$($(this).find('th')[$(this).find('input.checkline').index()]).addClass('text-center');				
				}
				for(posicao in _classes_Header){ // aplica a classe na coluna correspondente
					$($(this).find('th')[posicao]).addClass(_classes_Header[posicao]);
				}
			});
		}else if(arg.sender.wrs_grid.param.aplicaClassHeaders!=false){ // se ela nao for false, nem true é porque está forçando uma Class especifica padrao
			_linha_header.each(function(){ // aplica a classe tambem na linha de cabecalho para corresponder ao conteudo
				if($(this).find('input.checkline').length){ // excecao para alinhar no centro quando houver checkbox na linha
					$($(this).find('th')[$(this).find('input.checkline').index()]).addClass('text-center');				
				}
				for(posicao in _classes_Header){ // aplica a classe na coluna correspondente
					$($(this).find('th')[posicao]).addClass(arg.sender.wrs_grid.param.aplicaClassHeaders);
				}
			});
		}
	}

	
	// tratamento das classes por COLUNA no KendoGrid ADMIN
	// felipeb 20160226
	var WindowGridKendoAddColumnClass = function(idGrid,atributoColuna,classe){
		var _idx_header		=	$('#'+idGrid+' .k-grid-header-wrap tr:last-child th[data-field="'+atributoColuna+'"]').index();	

		$($('#'+idGrid+' .k-grid-header-wrap tr:last-child th')[_idx_header]).addClass(classe);
		$('#'+idGrid+' .k-grid-content tr').each(function(){
			$($(this).find('td')[_idx_header]).addClass(classe)
		});	

		$($('#'+idGrid+' .k-grid-header-wrap colgroup col')[_idx_header]).addClass(classe);
		$($('#'+idGrid+' .k-grid-content colgroup col')[_idx_header]).each(function(){
			$(this).addClass(classe)
		});	
	}
	for(indx in arg.sender.wrs_grid.column){
		if(arg.sender.wrs_grid.column[indx]['class']!=undefined){
			var classeCOL 	= arg.sender.wrs_grid.column[indx]['class'];
			WindowGridKendoAddColumnClass(tabela,arg.sender.wrs_grid.column[indx]['field'],classeCOL);
		}
	}
	
	
	var HandleArg			=	arg;

	
	var KendoGridWindowTools	=	 function ()
	{		
			_START('onDataBoundWindowGrid::KendoGridWindowTools');
		var param			=	wrsWindowGridShare;
		var index			=	$(this).parent().index();
		var table			=	param['table'];	
		
		try{
			var is_exception 	= ('exception' in param && (typeof param['exception'] == 'object' || param['exception']==true));
			if(is_exception && param['actionDouble']){			
				var toAction	=	param['actionDouble'];
				HandleArg.sender._data[index]['indexClickTabela']	= 	index;
				window[toAction](HandleArg.sender._data[index],table);					
			}
		}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
		
			_END('onDataBoundWindowGrid::KendoGridWindowTools');
	}
	
	var KendoGridWindowToolsAuxSingleClick	=	 function(){

		_START('onDataBoundWindowGrid::KendoGridWindowToolsAuxSingleClick');
		
		
		var param			=	wrsWindowGridShare;
		var parent			=	$(this).parent();
		var index			=	$(this).parent().index();
		var value_primary 	=	(strip_tags(HandleArg.sender._data[index][param['primary']]));
		var table						=	param['table'];	
		var option						=	 [];
			option['wrs_type_grid']		=	'form';
			option[param['primary']]	=	value_primary;

			
			
		try{	
			var is_exception 	= ('exception' in param && (typeof param['exception'] == 'object' || param['exception']==true));

			if(is_exception && param['actionSingle']){
				var toAction	=	param['actionSingle'];
				HandleArg.sender._data[index]['indexClickTabela']	= 	index;
				window[toAction](HandleArg.sender._data[index],table);	
				
			}else{
				grid_window_modal(option,table);
			}
			
			
		}catch(e){
			if(IS_EXCEPTION) console.warn(' exception');
			grid_window_modal(option,table);
		}
		
		
			_END('onDataBoundWindowGrid::KendoGridWindowToolsAuxSingleClick');
	}
	$(IDName).find('.k-grid-content').find('td').unbind('dblclick').dblclick(KendoGridWindowTools);		
	
	$(IDName).find('.k-grid-content').find('td').unbind('click').click(KendoGridWindowToolsAuxSingleClick);	
	$(IDName).find('.k-grid-content').addClass('wrsGrid border_color');
	
	// se houver checkbox como parametro da tabela remove o action da coluna do checkbox	
	if(HandleArg.sender.columns[0].field=='checkbox_linha'){
		$(IDName).find('[data-field=checkbox_linha]').unbind('click').find('input.checkline').change(function(){ trataCheckColuna($(this),tabela); });
	}

	//Corrige Thema
	addKendoUiColorJQueryGrid();
	
_END('onDataBoundWindowGrid');
}

function wrd_grid_window_to_form()
{
	_START('wrd_grid_window_to_form');
	var primary			=	 $.parseJSON(base64_decode($(this).attr('primary')));
	var table			=	 $(this).attr('table');
	var option			=	 {wrs_type_grid:'form'};
	var _data			=	 $('.body_grid_window').data('wrsGrid');
	var param			=	 _data.param_original;
	var index			=	 $(this).parents('.body_grid_window').first().children().index($(this));
	var is_exception 	= 	 ('exception' in param && (typeof param['exception'] == 'object' || param['exception']==true));
	
	if(!is_exception){
		grid_window_modal(_local_merge_array(primary,option),table);
	}else{
		if(param['actionSingle']){
			var toAction				=	param['actionSingle'];
			_data[index]['visao_atual']	= 	'icon';
			_data[index]['obj_sel']		= 	$(this).children('div.wrs_grid_'+param.visao_atual+'_custom');
			window[toAction](_data[index],table);	
		}
	}
	_END('wrd_grid_window_to_form');
}

function wrd_grid_window_to_form_dbl(arg)
{
	_START('wrd_grid_window_to_form_dbl');
	var primary			=	 $.parseJSON(base64_decode($(this).attr('primary')));
	var table			=	 $(this).attr('table');
	var option			=	 {wrs_type_grid:'form'};
	var _data			=	 $('.body_grid_window').data('wrsGrid');
	var param			=	 _data.param_original;
	var index			=	 $(this).parents('.body_grid_window').first().children().index($(this));
	var is_exception 	= 	 ('exception' in param && (typeof param['exception'] == 'object' || param['exception']==true));
	if(!is_exception){
		grid_window_modal(_local_merge_array(primary,option),table);
	}else{
		if(param['actionDouble'])
		{			

			var toAction	=	param['actionDouble'];
			
			window[toAction](_data[index]);				
		}
	}
	_END('wrd_grid_window_to_form_dbl');
}


function wrs_grid_window_event()
{
	_START('wrs_grid_window_event');
	var rel		=	 $(this).attr('rel');
	var table	=	 $(this).attr('table');
	var option	=	 {wrs_type_grid:rel,cube_s:CUBE_S};
	grid_window_modal(option,table);
	_END('wrs_grid_window_event');
}


function get_grid_window_values_form(_event)
{
	_START('get_grid_window_values_form');
	var form	=	$('form.grid_window_values_form');
	
	if(!empty(_event))	form	=	_event;
	
	var param		=	[];

	form.find('input[type=text]').each(function(){
		param[$(this).attr('name')]	=	$(this).val();
	});

	form.find('input[type=hidden]').each(function(){
		param[$(this).attr('name')]	=	$(this).val();
	});


	form.find('input[type=checkbox]').each(function(){		
		var _value			=	$(this).prop('checked')==true ? $(this).val() : 0;		
		param[$(this).attr('name')]	=	_value;
	});
	
	form.find('input[type=radio]').each(function(){		
		if($(this).prop('checked')==true){
			var _value			=	 $(this).val();		
			param[$(this).attr('name')]	=	_value;
		}
	});
	
	
	form.find('select').each(function(){
		param[$(this).attr('name')]	=	$(this).val();
	});
	
	_END('get_grid_window_values_form');
	return param;
	
}


function btn_window_grid_event(_functionCallBack,_action_type,_table,_extraValues)
{
	
	_START('btn_window_grid_event');
	var action_type				=	 _action_type==undefined?$(this).attr('action_type'):_action_type;
	var table					=	 _table==undefined?$(this).attr('table'):_table;
	var values					=	 get_grid_window_values_form();
	var option					=	 {};
	
	try{
		//CUBE_S existe apenas no Painel ele pe a referencia de qual cubo está sendo utilizado pelo system
		option['cube_s']	=	CUBE_S;
	}catch(e){
		delete option['cube_s'];
	}
	
	var functionCallBack		=	_functionCallBack;

	var extraValues				=	_extraValues;
		values['wrs_type_grid']	=	'form';

		switch(action_type)
		{
			case 'new' 		: values['form_event']='new'	;	break;
			case 'update' 	: 
								{
									if(extraValues!=undefined && extraValues['extra_validation_on_update_admin']!=undefined && typeof extraValues['extra_validation_on_update_admin'] == 'function'){
										$retorno = extraValues['extra_validation_on_update_admin']();
										if(!$retorno){
											return false;
										}
									}
								}
								values['form_event']='update' ; 	
								break;
			case 'remove' 	: values['form_event']='remove' ;	break;
			case 'import' 	: values['form_event']='import' ;	break;
			case 'export' 	: values['form_event']='export' ;	break;
			case 'back' 	: values['form_event']='back' 	;	break;
		}

		values = merge_objeto(values,option);

		if(extraValues!=undefined)
		{
			values = merge_objeto(values,{'extraValues':((typeof extraValues!='string')?json_encode(extraValues):extraValues)});
		}

		grid_window_modal(values,table,functionCallBack);
		
		_END('btn_window_grid_event');	
	
}

//Change Evento de Doble clique da modal
function wrs_window_grid_events_tools(objectClick)
{
	_START('wrs_window_grid_events_tools');
	var _options	=	{
							visao	:	wrs_grid_window_event,
							icon	:	wrd_grid_window_to_form,
							icondbl	:	wrd_grid_window_to_form_dbl,
							btn		:	btn_window_grid_event
						};
	
	

	var options		=	_options;
	
		if(!isEmpty(objectClick))
		{
			options		=	merge_objeto(_options,objectClick);
		}
		
		
		/*
		$('.wrs_grid_window_event a').unbind('click').click(wrs_grid_window_event);
		$('.margin_fix_grid_window').unbind('click').click(wrd_grid_window_to_form); //evento para quamdp for 	visão tipo icones
		$('.btn_window_grid_event').unbind('click').click(btn_window_grid_event);
		
		*/
		$('.wrs_grid_window_event a').unbind('click').click(options.visao);
		$('.margin_fix_grid_window').unbind('click').click(options.icon).unbind('dblclick').dblclick(options.icondbl); //evento para quamdp for 	visão tipo icones
		$('.btn_window_grid_event').unbind('click').click(options.btn);
	
	_END('wrs_window_grid_events_tools');
}




function grid_window_modal(param_request,Event,_funCallBackData)
{
	_START('grid_window_modal');
	
	//var param_request	=	 {wrs_type_grid:type};
	var Ofile			=	'WindowGrid';
	var Oclass			=	'WindowGrid';
	var Oevent			=	empty(Event) ? 'ATT_WRS_USER' : Event;

	var funCallBackData		=	 _funCallBackData;
	var btn_events			=	null; 
	
	
	if(Event=='GET_SSAS_LAYOUTS')
		{
				btn_events	=	{btn:layout_events_button};
		}
	
	if(!isset(_funCallBackData) || _funCallBackData==undefined)
	{
		funCallBackData	=	function(data)
		{
			
				$('.modal-content-grid').html(data);
				wrs_window_grid_events_tools(btn_events);
			
				$(".wrs_grid_window_event a[rel="+param_request.wrs_type_grid+"]").addClass('active_tools');
				
				if(Event=='GET_SSAS_LAYOUTS')
				{
					$(".wrs_grid_window_event a[rel=icon_big]").parent().hide();
					$(".wrs_grid_window_event a[rel=icon_small]").parent().hide();
					$(".wrs_grid_window_event a[rel=icon_middle]").parent().hide();
				 
				}
		};
	}

	var header	=	'<div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active"><h4 class="modal-title" id="myModalLabel">'+LNG('LABEL_LOAD')+'</h4></div><div class="body_grid_window_center_Load"></div>';
	$('.modal-content-grid').html(header);
	
	setLoading($('.body_grid_window_center_Load'));	
	runCall(param_request,Ofile,Oclass,Oevent,funCallBackData,'modal');
	_END('grid_window_modal');
}


/*
 * 
 * Paginação
 */
(function( $ ) {
 	$.fn.WrsGridWindowPagination = function() 
    {

		_START('WrsGridWindowPagination');
 		var event	=	 this;
 		var json	=	event.attr('json');
 			json	=	$.parseJSON(base64_decode(json));	
 			
 		
 		var num_rows		=	json.num_rows;
 		var page_size		=	json.page_size;
 		var page_current	=	json.page_current;
 		var size_page		=	json.size_page;
 		var wrs_type_grid	=	json.wrs_type_grid;
 		var table			=	json.table;
 		
 		var option					=	[]; 		
 			option['wrs_type_grid']	=	wrs_type_grid;
 			option['page_current']	=	page_current;
 			option['size_page']		=	size_page;
 			option['page_size']		=	page_size;
 			
 			
 		
 		var buttonEvent	=	 function(){
			_START('WrsGridWindowPagination::buttonEvent');
 				var rel	=	$(this).attr('rel');
 				
 				switch(rel)
 				{
	 				case 'first' 	: page_current =1; 			break;
	 				case 'back'		: page_current--;			break;
	 				case 'next' 	: page_current++;			break;
	 				case 'last' 	: page_current=size_page;	break;
 				}
 				
 				if(page_current<=1) 		page_current=1;
 				if(page_current>=size_page) page_current=size_page;
 				
 				
 				option['page_current']	=	page_current;
 				
 				
 				grid_window_modal(option,table);
 			_END('WrsGridWindowPagination::buttonEvent');	
 				//page_current
 				//page_size
 		}
 		
 		event.find('button').unbind('click').click(buttonEvent);
 		
 		
 		
 		
 		event.find('input').unbind('keydown').keydown(function( event ) {
 			  if ( event.which == 13 ) {
 				  page_current	=	 parseInt($(this).val());
 				  
 				 if(page_current<=1) 		page_current=1;
  				 if(page_current>=size_page) page_current=size_page;
  				 
  				option['page_current']	=	page_current;
  				grid_window_modal(option,table);
 			  }
 			});
 		
 		
 		
 		
 		event.find('select').unbind('change').change(function () {
 		    	option['page_size']	=	$(this).val();
  				grid_window_modal(option,table);
  				
 		  });
		  
		 _END('WrsGridWindowPagination'); 
    }
    }( jQuery ));



