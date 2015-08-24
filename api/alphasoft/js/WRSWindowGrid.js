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
var DELAY = 400, clicks = 0, timer = null;
function onDataBoundWindowGrid(arg)
{

	var IDName				=	'#'+arg.sender.element.attr('id');
	var telerikGrid 		= 	$(IDName).data('kendoGrid');
	var HandleArg			=	arg;
	console.log('dataBound',IDName);
	var KendoGridWindowTools	=	 function ()
	{
		var param			=	HandleArg.sender.columns[0].window_grid
		var parent			=	$(this).parent();
		var index			=	$(this).parent().index();
		var value_primary 	=	(strip_tags(HandleArg.sender._data[index][param['primary']]));
		var table						=	param['table'];	
		var option						=	 [];
			option['wrs_type_grid']		=	'form';
			option[param['primary']]	=	value_primary;

		if(table=='GET_SSAS_REPORT'){
			clicks++;  //count clicks

	        if(clicks === 1) {

	            timer = setTimeout(function() {
	            	
	            	parent.find('.checklinha').val(option.REPORT_ID).prop('checked', !(parent.find('.checklinha').val(option.REPORT_ID).prop('checked')));
	                clicks = 0;             //after action performed, reset counter

	    	        console.log('Valores marcados: ');
	    	        parent.parent().find('.checklinha:checked').each(function(){
	    	        	console.log('check ',$(this).val());
	    	        });
	    	        
	            }, DELAY);

	        } else {

	            clearTimeout(timer);    //prevent single-click action
	            alert("carrega autoload do reportID: "+option.REPORT_ID);  //perform double-click action
	            clicks = 0;             //after action performed, reset counter
	        }
	        return false;
		}else{			
			grid_window_modal(option,table);
		}
	}
	$(IDName).find('.k-grid-content').find('td').unbind('click').unbind('dblclick').click(KendoGridWindowTools);	
	
	$(IDName).find('.k-grid-content').addClass('wrsGrid border_color');

	
	if(arg,HandleArg.sender.columns[0].window_grid.table=='GET_SSAS_REPORT'){
		$(IDName).find('thead tr').prepend('<th/>');	
		$(IDName).find('colgroup').prepend('<col style="width:30px">');	
		$(IDName).find('tbody tr').each(function(){
			$(this).prepend('<td role="gridcell"><input type="checkbox" class="checklinha" value=""></td>');
		});
	}
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
	var option	=	 {wrs_type_grid:rel,cube_s:CUBE_S};
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
	//$('#myModal').modal('show');
}

$(function(){
	addKendoUiColorJQueryGrid();
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



