

/*
 * TODO: Tem que sincronizar esta função com o resizeGridSimple()
 */
(function ( $ ) {
	
	
	
	$.fn.NavConfigure = function()
	{
		var navConfigure=	this;
	}
	
	
    $.fn.WRSWindowGridEventTools = function(){
    	
    	var eventTelerik	=	this;
		var idName			=	eventTelerik.attr('id');
		var GRID			=	$('#'+idName);
		var telerikGrid 	= 	GRID.data('kendoGrid');		
		var NAV				=	$('#'+idName+'NAV');
		var ELEMENT			=	$('#'+idName+'Elements');
		var BOX				=	$('.'+idName+'BOX');
		var MAP				=	$('#'+idName+'Elements .map');
		var CHART			=	$('#'+idName+'Elements .chart');
		var _height			=	BOX.parent().outerHeight();
		var navHeight		=	NAV.height();
		
		
		
		

		//Criando a DIV do MAPA o da CHART
		var check_div_map_chart	=	 function(type)
		{
			var flag_c_m	=	false;
			var type_div	=	'';
			var _explode	=	'';
				_explode	=	explode('_',type);
			var toUse		=	{chart:false,map:false};
			
			
			//Garantindo a posição do mapa e do gráfico no mesmo elemento
			if(type=='chart_map' || type=='map_chart')
			{
				var chart = $('#'+idName+'Elements .chart').data("kendoChart");
		        	
					if(!empty(chart)){
						chart.destroy();
					}
		        	
		        	$('#'+idName+'Elements .map').removeData();//Removendo o Mapa
		        	
		        	
		        	//GRID.removeAttr('style-data').removeAttr('style');
		        	ELEMENT.removeAttr('style-data').removeAttr('style');
		        	
			}
			
			
			switch(type)
			{
				case "grid_chart"	: 
				case "grid_map"		: 
				case "chart_grid"	:
				case "chart_map"	:
				case "map_grid"		:
				case "map_chart"	:{ 
					
					ELEMENT.attr('chart','false');
		        	ELEMENT.attr('maps_wrs','false');
		        	ELEMENT.attr('maps','false');
		        	ELEMENT.html('');
		        	
				};				break;
			}
			
			
			
			for(_ie in _explode)
			{
				flag_c_m	=	false;
				type_div	=	_explode[_ie];
				
				
				switch(type_div)
				{
					case 'chart': toUse.chart=flag_c_m=true; break;
					case 'map'	: toUse.map=flag_c_m=true; break;
				}
				
				if(flag_c_m)
					{
						if(ELEMENT.find('.'+type_div).length==0)
						{
							ELEMENT.append($('<div/>').hide().addClass(type_div).addClass('block'));
						}else{							
							ELEMENT.find('.'+type_div).show();
						}
						
						flag_c_m	=	 false;
					}
			}
			
			for(toU in toUse)
				{
						if(!toUse[toU])
						{
							ELEMENT.find('.'+toU).hide();
						}
				}
		}
		
		
		
		var WRSWindowGridEventToolsClick	=	function(e,data)
		{
			
			var wrs_data		=	"";
			var height			=	BOX.parent().outerHeight();
			var BOX_PARENT		=	BOX.parent();
			var active_half		=	false;
			var paddingCenter	=	((parseInt(BOX_PARENT.parent().css('padding-bottom').replace('px')))*3)-2;
			var _heightToUse	=	'';
			
			MAP.hide();
			CHART.hide();
			GRID.hide();
			
				NAV.find('.info_chart').hide();
			
				_height		=	height;
				_height		=	_height-navHeight;
				
				

				
			var half		=	(_height-paddingCenter)/2;
				_heightToUse=	half*2;
				
				if(empty(data)){
					wrs_data	=	$(this).attr('wrs-data');
				}else{
					wrs_data	=	data;

				}
				
				//Default
				switch(wrs_data){case "grid"			:  case "chart"		: case "map"			: {GRID.removeAttr('style');ELEMENT.removeAttr('style');GRID.removeAttr('style-data');ELEMENT.removeAttr('style-data');};break;}
				
				ELEMENT.height((height-paddingCenter));
				GRID.height(height-paddingCenter);
				ELEMENT.show().removeClass('hide');
//				GRID.show();
				
				var changeOrder		=	 function(flag){
					
					
//Voltando para o formato com a grid para cima
					
					//Default

					
					var heightGrid		=	GRID.height();
					var heightElement	=	ELEMENT.height();
						
					if(empty(GRID.attr('style-data')))
					{
						GRID.attr('style-data',GRID.attr('style'));
					}else{
						GRID.attr('style',GRID.attr('style-data'));
						GRID.height(heightGrid);
					}
					
					if(empty(ELEMENT.attr('style-data'))){
						ELEMENT.attr('style-data',ELEMENT.attr('style'));
					}else{
						ELEMENT.attr('style',ELEMENT.attr('style-data'));
						ELEMENT.height(heightElement);
					}
					
					
					if(empty(flag))
					{
						var offsetGrid 		= GRID.offset();
						var offsetElement 	= ELEMENT.offset();
						
							GRID.offset({ top: offsetElement.top});
							ELEMENT.offset({ top: offsetGrid.top});
					}
				};
				
				//Save alteration in MAP
				wrsKendoUiChange('#'+idName,'WINDOW',wrs_data);
				
				
				
				//CRiando a DIV do MAPA ou CHART
				check_div_map_chart(wrs_data);
				
				//END criando div CHART ou MAPA
				
				switch(wrs_data)
				{
					case "grid_chart"	: GRID.show();break;
					case "chart_grid"	: GRID.show();break;
					case "map_grid"		: GRID.show();break;
					case "grid_map"		: GRID.show();break;
					case "grid"			: GRID.show();break;
				}
				
				
				switch(wrs_data)
				{
					case "grid"			: {GRID.show();ELEMENT.hide();};break;
					case "chart"		: GRID.hide();					break;
					case "map"			: GRID.hide();					break;
					case "grid_chart"	: active_half=true;				break;
					case "grid_map"		: active_half=true;				break;
					case "chart_grid"	:{ active_half=true;};				break;
					case "chart_map"	:{ active_half=true;};				break;
					case "map_grid"		:{ active_half=true;};				break;
					case "map_chart"	:{ active_half=true; };				break;
				}
				
				
				
				
				
				//Tamando para que possamos saber qual o tamano dos gráficos multiplos
				ELEMENT.attr('chart-multiple-height',half);
				
				if(active_half)
				{
				//	GRID.show();
			//		ELEMENT.show();
					ELEMENT.height(half);
					GRID.height(half);
					
					//ELEMENT.attr('height-chart',half);
					
				}else{
					ELEMENT.height(_heightToUse);
					ELEMENT.attr('height-chart',_heightToUse);
					GRID.height(_heightToUse);
				}				

				

				//Invertendo a orderm
				if(	wrs_data=='chart_grid' ||
					wrs_data=='map_grid'	||
					wrs_data=='map_chart')
				{
					changeOrder(); 
				}
				
				if(	wrs_data=='grid_chart' ||
						wrs_data=='grid_map')	
					{
						changeOrder(true); 
					}
				
				switch(wrs_data)
				{
					case "grid_chart"	: {WRSKendoUiChart(telerikGrid);}							break;
					case "chart_grid"	: {WRSKendoUiChart(telerikGrid);};							break;
					case "chart_map"	: { WRSKendoUiChart(telerikGrid);WRSMaps(telerikGrid);};	break;
					case "map_grid"		: {WRSMaps(telerikGrid); WRSKendoUiChart(telerikGrid);};	break;
					case "map_chart"	: {WRSMaps(telerikGrid);	WRSKendoUiChart(telerikGrid);};	break;
					case "grid_map"		: {WRSMaps(telerikGrid);};									break;
					case "chart"		: {WRSKendoUiChart(telerikGrid);};												break;
					case "map"			: {WRSMaps(telerikGrid);};														break;
				}
				
				
				

				telerikGrid.resize();
				
		};

		NAV.find('.wrs_tools_options_window a').unbind('click').click(WRSWindowGridEventToolsClick);
		//Load event ptincipal
		//WRSWindowGridEventToolsClick('','grid_map');
    };
 
}( jQuery ));
 

