/**
 * Criado por Marcelo Santos 
 * Criando e manipulando o Google Maps
 *  
 */


/**
 * COnstrulçao do Dado da GRid
 */
function onDataBindingWindowGrid(arg)
{
	/*
	var _arg	=	arg;
	var column	=	_arg.sender.columns;
	//[field ]
//	foreach([0]);
	for(var i=0;i<_arg.items.length;i++)
		{
			for(cc in column)
			{
				_arg.items[i][column[cc]['field']]	=	 '<b>'+_arg.items[i][column[cc]['field']]+'</b>';
			}
		}
	*/
	return arg;
}

/**
 * Quando finalizou de construir os elemtnos da GRid
 * @param arg
 */
function onDataBoundWindowGrid(arg)
{

	var IDName				=	'#'+arg.sender.element.attr('id');
	var telerikGrid 		= 	$(IDName).data('kendoGrid');
	var HandleArg			=	arg;
	
	var KendoGridWindowTools	=	 function ()
	{
		var param			=	HandleArg.sender.columns[0].window_grid
		var index			=	$(this).parent().index();
		var value_primary 	=	(strip_tags(HandleArg.sender._data[index][param['primary']]));

			var table						=	param['table'];	
			var option						=	 [];
				option['wrs_type_grid']		=	'form';
				option[param['primary']]	=	value_primary;
				grid_window_modal(option,table);
	}
	
	$(IDName).find('.k-grid-content').find('td').unbind('click').click(KendoGridWindowTools);
	
	
	
	$(IDName).find('.k-grid-content').addClass('wrsGrid border_color');//.find('tbody tr').addClass('ui-state-default');
	
}


function wrd_grid_window_to_form()
{
	var primary		=	 $.parseJSON(base64_decode($(this).attr('primary')));
	var table		=	 $(this).attr('table');
	var option		=	 {wrs_type_grid:'form'};
	grid_window_modal(_local_merge_array(primary,option),table);

}


function wrs_grid_window_event()
{
	var rel		=	 $(this).attr('rel');
	var table	=	 $(this).attr('table');
	var option	=	 {wrs_type_grid:rel};
	grid_window_modal(option,table);
}


function get_grid_window_values_form(_event)
{
	var form	=	$('form.grid_window_values_form');
	
	if(!empty(_event))	form	=	_event;
	
	var param		=	[];
	
	form.find('input[type=text]').each(function(){
		param[$(this).attr('name')]	=	$(this).val();
	});
	
	
	form.find('select').each(function(){
		param[$(this).attr('name')]	=	$(this).val();
	});
	
	
	return param;
	
}


function btn_window_grid_event()
{
	var action_type				=	 $(this).attr('action_type');
	var table					=	 $(this).attr('table');
	var values					=	 get_grid_window_values_form();
	
		values['wrs_type_grid']	=	'form';
	
		switch(action_type)
		{
			case 'new' 		: values['form_event']='new'	;	break;
			case 'update' 	: values['form_event']='update' ; 	break;
			case 'remove' 	: values['form_event']='remove' ;	break;
		}
		
		grid_window_modal(values,table);
		
}


function wrs_window_grid_events_tools()
{
	$('.wrs_grid_window_event a').unbind('click').click(wrs_grid_window_event);
	$('.margin_fix_grid_window').unbind('click').click(wrd_grid_window_to_form);
	$('.btn_window_grid_event').unbind('click').click(btn_window_grid_event);
	
}




function grid_window_modal(param_request,Event)
{
	//var param_request	=	 {wrs_type_grid:type};
	var Ofile			=	'WindowGrid';
	var Oclass			=	'WindowGrid';
	var Oevent			=	empty(Event) ? 'ATT_WRS_USER' : Event;

	var funCallBack		=	 function(data){
			$('.modal-content-grid').html(data);
			wrs_window_grid_events_tools();
		};

		
	var header	=	'<div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active"><h4 class="modal-title" id="myModalLabel">'+LNG('LABEL_LOAD')+'</h4></div><div class="body_grid_window_center_Load"></div>';
		$('.modal-content-grid').html(header);
		setLoading($('.body_grid_window_center_Load'));	
	
	runCall(param_request,Ofile,Oclass,Oevent,funCallBack,'modal');
}


function WRS_WINDOW_GRID()
{
	$('.wrs_open_modal').click(function()
	{
		/*
		 * Trabalhando com a estrutura  do WindowGRid
		 
			icon_big
			icon_middle
			icon_small
			list
			details
			date
			*/
		
		
		 grid_window_modal({wrs_type_grid:'icon_middle'});

	});
	
	//	var option	=	 {wrs_type_grid:rel};
	
	addKendoUiColorJQueryGrid();
}


$(function(){
	WRS_WINDOW_GRID();
});





 	




(function( $ ) {
	
 	$.fn.WrsGridWindowPagination = function() 
    {

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
    }
    }( jQuery ));



