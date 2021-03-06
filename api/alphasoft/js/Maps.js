

function convertURLGoogleMaps(google,wrsParam,_map)
{
			var c = google.getCenter();
            //URL of Google Static Maps.
            var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";

            //Set the Google Map Center.
            staticMapUrl += "?center=" + c.lat() + "," + c.lng();

            //Set the Google Map Size.
            staticMapUrl += "&size="+_map.width+"x"+_map.height;

            //Set the Google Map Zoom.
            staticMapUrl += "&zoom=" + google.getZoom();

            //Set the Google Map Type.
            staticMapUrl += "&maptype=" + google.mapTypeId;

            //Loop and add Markers.
            for (var line in wrsParam) 
			{
				 staticMapUrl += "&markers=color:" + wrsParam[line].color + "|" + wrsParam[line].latitude + "," + wrsParam[line].longitude;
//                staticMapUrl += "&markers=icon:" + wrsParam[line].icon + "|" + wrsParam[line].latitude + "," + wrsParam[line].longitude;
            }

		//	staticMapUrl += "&key=AIzaSyAvq_yJP8-zcJZNuwF47gmhIGPXQhjlTgE";
           TRACE_DEBUG('<img src="'+staticMapUrl+'" />');
         

		
}

function exportGoogleMapsImage()
{
	$('.map').each(function(){
			var _that		=	 $(this);
			var wrsParam	=	_that.data('mapsImage');
			var google		=	_that.data('goMap').map;	
			//	_that.find('.gm-style').hide();
			convertURLGoogleMaps(google,wrsParam,{width:_that.width(), height:_that.height()});
	});
}	


function WRSMaps(KendoUi)
{
	_START('WRSMaps');
	
	var idName			=	KendoUi.element.attr('id');
	var GRID			=	$('#'+idName);
	var telerikGrid 	= 	GRID.data('kendoGrid');		
	var NAV				=	$('#'+idName+'NAV');
	var ELEMENT			=	$('#'+idName+'Elements');
	var MAP				=	$('#'+idName+'Elements .map');
	var BOX				=	$('.'+idName+'BOX');

	var _data		=	telerikGrid._data;
	var maps		=	[];

	MAP.height(ELEMENT.height());
	MAP.width(ELEMENT.width());
	 
	MAP.show();
	
	if(ELEMENT.attr('maps_wrs')=='true') 
	{
		return true;
	}
	
	/*
	 * Pesquisando o campo latitude
	 */ 
	var isLatitude	=	 function (param,field)
	{
		for(_op in param)
		{
			if(field ==_op ) return true;
		}		
		return false;
	}
	
	/*
	 * Processando dos Dados
	 */

	var headerIndex		=	telerikGrid.headerIndex;
	var columnMap		=	[];
	var backColumn		=	'';
	var tmpBackCol		=	'';
	var titleByColumn	=	[];
	
	

		
	/*
	 * Pesquisando quem é o pai dos dados que será necessário 
	 */
	var searchMainLatitudeRecursive	=	 function(column,LEVEL_FULL,FIELD)
	{
		_START('WRSMaps::searchMainLatitudeRecursive');
		var _dataDeep	=	'';

		if(empty(column)) {
			_END('WRSMaps::searchMainLatitudeRecursive');
			return '';
		}
		if(empty(column.c_parent))
		{
			_dataDeep	=	column;
		}
		else
		{
			_dataDeep	=	headerIndex[column.c_parent];
		}
		
		var field		=	_dataDeep['LEVEL_FULL'];
		
		_END('WRSMaps::searchMainLatitudeRecursive');
		
		

		var __latitude		=	 typeof RELATIONSHIPS_FULL[field]=='undefined' ? false : true;
		
			if(__latitude==true)	if(isEmpty(RELATIONSHIPS_FULL[field]['LATITUDE']))	__latitude	=	true;
			
		if(__latitude)
		{
			return searchMainLatitudeRecursive(headerIndex[column.c_parent],LEVEL_FULL,FIELD);
			
		}else{
			return _dataDeep['title'];
		}
		
	}
	
	
	
	for(ho in headerIndex)
	{
		if(headerIndex[ho].map=='[LATITUDE]')
			{
				columnMap[columnMap.length]			=	headerIndex[ho].field;
				backColumn							=	headerIndex[tmpBackCol].field;
				titleByColumn[titleByColumn.length]	=	searchMainLatitudeRecursive(headerIndex[ho],headerIndex[ho]['LEVEL_FULL'],headerIndex[ho]['tb_field']);
			}
			tmpBackCol	=	ho;
	}

	
	if(!columnMap.length){
		MAP.goMap(/*{markers: [{			latitude:					-15.794145,  
			longitude:					-47.882379,
			icon		: 	'./api/gomap/none.png',
			zoom: 11
}],hideByClick: true,zoom:15,streetViewControl: 15}*/);
		
		

		return true;
	}
	
	var indexLatLon		=	[];
	var is_line			=	columnMap.length<=1 ?true : false; 
	var is_sort			=	getElementsWrsKendoUi(GRID);
		is_sort			=	is_sort.ORDER_BY_COLUMN;
		is_sort			=	empty(is_sort) ? false : is_sort;
		
	var that_url		=	'.';//dirname(window.location.href);
	
	//foreach(telerikGrid.headerIndex['1_3']);
	/*
	 * WARNING:
	 * Quando a variável columnMap timver mais que um elemento ele está ná coluna e não na linha
	 */
	for(obj in _data)
	{
			for(_cmp in columnMap)
			{
				var columnNaname		=	columnMap[_cmp];

				if(empty(_data[obj][columnNaname])) continue;

				var _explode		=	 explode('|',str_replace(' ','',_data[obj][columnNaname]));
				var _title			=	_explode[0]+_explode[1];
				var data_value		=	'';
				
				
					if(!empty(_explode[0]) &&  !empty(_explode[1])  )
					{
						
						if(indexLatLon[_explode[0]+'_'+_explode[1]]) continue;
						
						if(is_line)
						{
							
							_title		=	_data[obj][backColumn];
							if(is_sort)
							{
								try{
									data_value		=	headerIndex['field'][is_sort]['title']+' : '+_data[obj][is_sort];
								}catch(e){
									if(IS_EXCEPTION) console.warn(' exception');
								}
							}
						}else{
							_title		=	titleByColumn[_cmp];
						}
						
						_title			=	strip_tags(_title);
						var	_icon		=	that_url+'/api/gomap/map-marker-32_blue.png';
						
							switch(data_value)
							{
								case 'setinha_verde'	:	_icon =that_url+'/api/gomap/map-marker-32_green.png'; break;
								case 'setinha_vermelha'	:	_icon =that_url+'/api/gomap/map-marker-32_pink.png'; break;
								case 'yellow_square'	:	_icon =that_url+'/api/gomap/map-marker-32_yellow'; break;
								
							}
							 
							
							
							maps[maps.length]	=	 {
															latitude	:	_explode[0],
															longitude	:	_explode[1],
															icon		: 	_icon,
														//	color: 'red',
															title		:	 _title,
															html		: 	'<h5>'+_title+'</h5>'+data_value,
															id			:	_data[obj].C000
													};
						
						indexLatLon[_explode[0]+'_'+_explode[1]]	=	true;
					}
			}
			
		
	}



	if(ELEMENT.attr('maps')=='true')
	{
		$.goMap.clearMarkers();
		for(m in maps)
		{
			$.goMap.createMarker(maps[m]); 
		}
	}else{
			var _zoom		=	10;
			var options		=	{markers: maps, hideByClick: true,/*zoom:_zoom,*/streetViewControl: true};
			//var options		=	{markers: maps, hideByClick: true,zoom:_zoom,streetViewControl: true};
			MAP.goMap(options);
			
			//var goMapCurrent	=	 MAP.data('goMap');
			ELEMENT.attr('maps','true')
			
			MAP.data('mapsImage',maps);
	}
		
		ELEMENT.attr('maps_wrs','true');

	_END('WRSMaps');
}



 