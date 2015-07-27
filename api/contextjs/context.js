/* 
 * Context.js
 * Copyright Jacob Kelley
 * MIT License
 */

var context = context || (function () {
    
	var options = {
		fadeSpeed: 100,
		filter: function ($obj) {
			// Modify $obj, Do not return
		},
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	};

	function initialize(opts) {
		
		options = $.extend({}, options, opts);
		
		$(document).on('click', 'html', function () {
			$('.dropdown-context').fadeOut(options.fadeSpeed, function(){
				$('.dropdown-context').css({display:''}).find('.drop-left').removeClass('drop-left');
			});
		});
		if(options.preventDoubleContext){
			$(document).on('contextmenu', '.dropdown-context', function (e) {
				e.preventDefault();
			});
		}
		$(document).on('mouseenter', '.dropdown-submenu', function(){
			var $sub = $(this).find('.dropdown-context-sub:first'),
				subWidth = $sub.width(),
				subLeft = $sub.offset().left,
				collision = (subWidth+subLeft) > window.innerWidth;
			if(collision){
				$sub.addClass('drop-left');
			}
		});
		
	}

	function updateOptions(opts){
		options = $.extend({}, options, opts);
	}

	function buildMenu(data, id, subMenu) {
		var subClass = (subMenu) ? ' dropdown-context-sub' : '',
			compressed = options.compress ? ' compressed-context' : '',
			$menu = $('<ul class="dropdown-menu dropdown-menu-drill dropdown-context' + subClass + compressed+'" id="dropdown-' + id + '"></ul>');
        var i = 0, linkTarget = '';
        for(i; i<data.length; i++) {
        	if (typeof data[i].divider !== 'undefined') {
				$menu.append('<li class="divider"></li>');
			} else if (typeof data[i].header !== 'undefined') {
				$menu.append('<li class="nav-header">' + data[i].header + '</li>');
			} else {
				if (typeof data[i].href == 'undefined') {
					data[i].href = '#';
				}
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="'+data[i].target+'"';
				}
				if (typeof data[i].subMenu !== 'undefined') {
					$sub = ('<li class="dropdown-submenu"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '</a></li>');
				} else {
					$sub = $('<li><a tabindex="-1" href="' + data[i].href + '"'+linkTarget+'>' + data[i].text + '</a></li>');
				}
				if (typeof data[i].action !== 'undefined') {
					var actiond = new Date(),
						actionID = 'event-' + actiond.getTime() * Math.floor(Math.random()*100000),
						eventAction = data[i].action;
					$sub.find('a').attr('id', actionID);
					$('#' + actionID).addClass('context-event');
					$(document).on('click', '#' + actionID, eventAction);
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = buildMenu(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
		return $menu;
	}

	
	function buildMenuWRS(data, id, subMenu) {
		var subClass = (subMenu) ? ' dropdown-context-sub' : '',
			compressed = options.compress ? ' compressed-context' : '',
			$menu = $('<ul class="dropdown-menu dropdown-menu-drill dropdown-context' + subClass + compressed+'" id="dropdown-' + id + '"></ul>');
        var i = 0, linkTarget = '';
        for(i; i<data.length; i++) {
        	if (typeof data[i].divider !== 'undefined') {
				$menu.append('<li class="divider"></li>');
			} else if (typeof data[i].header !== 'undefined') {
				$menu.append('<li class="nav-header">' + data[i].header + '</li>');
			} else {
				if (typeof data[i].href == 'undefined') {
					data[i].href = '#';
				}
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="'+data[i].target+'"';
				}
				//TRACE_DEBUG(data[i].className);
				if (typeof data[i].subMenu !== 'undefined') {
					$sub = ('<li class="dropdown-submenu ' + data[i].className + '"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '<i class="fa fa-angle-right"></i></a></li>');
				} else {
					$sub = $('<li class="' + data[i].className + '"><a tabindex="-1" json="'+data[i].json+'" href="' + data[i].href + '"'+linkTarget+'>' + data[i].text + '</a></li>');
				}
				if (typeof data[i].action !== 'undefined') {
					var actiond = new Date(),
						actionID 	= 'event-' + actiond.getTime() * Math.floor(Math.random()*100000),
						eventAction = data[i].action;
					$sub.find('a').attr('id', actionID);
					$('#' + actionID).addClass('context-event');
				//	$(document).on('click', '#' + actionID, eventAction);
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = buildMenuWRS(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
		return $menu;
	}
	
	
	function addContext(selector, data) {
		
			var d 		= new Date(),
				id 		= d.getTime(),
				$menu 	= buildMenu(data, id);
			
				$('body').append($menu);
		
	
		
		$(document).on('contextmenu', selector, function (e) {
			e.preventDefault();
			e.stopPropagation();
			
			

			$('.dropdown-context:not(.dropdown-context-sub)').hide();
			
			$dd = $('#dropdown-' + id);
		
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('dropdown-context-up').css({
					top: e.pageY - 20 - $('#dropdown-' + id).height(),
					left: e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('dropdown-context-up').css({
						top: e.pageY - 20 - autoH,
						left: e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top: e.pageY + 10,
						left: e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		});
	}
	
	
	 /*
	  * Layout
	  *  ROWSL
	  *  COLUMNS
	  *  MEASURES
	  *  FILTERS
	  *  
	  *  Type
	  *  linha
	  *	 linha_header
	  *  coluna_header
	  */
	function hideContextMenu(type,layout)
	{
//		if(empty(layout)) return false;
		$('.dropdown-menu li').show();
		
		

		for(x in layout)
			{
				var layout_inside	=	layout[x];
				
				for(i in layout_inside)
					{
						var object	=	$('.dropdown-menu  .'+replace_attr(layout_inside[i]));
							object.hide();
							

						object.find('.dropdown-context-sub').each(function(){
								var subMain		=	 $(this);
								var hide		=	 true;
								$(this).find('li').each(function(){
									if($(this).css("display")!='none'){
										hide=false;
									}else{
										//TRACE_DEBUG($(this).html());
									}
								});
								
								if(!hide)  $(this).parent().show();
							})
							
					}
			}

		
		
	}
	
	
	function addContextWRS(selector, data,whoEventRequest) {
		
		destroyContext(selector);

		var d 		= new Date(),
			id 		= d.getTime(),
			$menu 	= buildMenuWRS(data, id);
		
			$('body').append($menu);
	
			
			/*
			 * COntrolando os eventos do Hover 
			 * by Marcelo Santos
			 */
			$('.dropdown-menu li a').unbind('hover').hover(function(event){
				
				
				
				var dropdown_menu		=	$(this);				
				var offset 				= 	dropdown_menu.offset();
				var mainHeight			=	dropdown_menu.outerHeight()+8;

				var dropdown_menu_sub	=	$(this).parent().find('.dropdown-menu');
				var offset_sub 			= 	dropdown_menu_sub.offset();
				var height				=	dropdown_menu_sub.outerHeight(); 
				
				//Não permite alicar o filtro
				//A class bold é exclusiva do Total para linha e colunas

				if(dropdown_menu.hasClass('bold')){
					return true;
				}
				
				if((event.pageY+(height))>$(window).height())
				{
					var cssStyle			=	{'top':offset.top-(height-mainHeight)};//{left:offset.left, top:offset.top};
					dropdown_menu_sub.offset(cssStyle);
				}
				else
				{
					var cssStyle			=	{'top':offset.top-8};//{left:offset.left, top:offset.top};
					dropdown_menu_sub.offset(cssStyle);
				}
			});
			
			
			var eventAction	=	data[0].action;
	
	$(document).on('contextmenu', selector, function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		
		//Verificando se é linha de total
		if($(this).hasClass('tag_total') || $(this).parent().hasClass('tag_total')) {
			return true;
		}
		//Verificando linha de total mas da locked para o content 
		if($(this).parent().parent().parent().parent().hasClass('k-grid-content-locked'))
		{
			if($('.k-grid-content tr:eq('+$(this).parent().index()+')').hasClass('tag_total'))
				{
					return true;
				}
		}
		
		//

		
		
		
		
		$('.dropdown-context:not(.dropdown-context-sub)').hide();
		
		$dd = $('#dropdown-' + id);
		
		$wrsEventMain		=	 $(this);
		
		var divMainEvent		=	$wrsEventMain.parent().parent().parent().parent();
		var type				=	divMainEvent.attr('type');
		 
		
	 	/*
		  *  LAYOUT_ROWS
		  *	 LAYOUT_COLUMNS
		  *  LAYOUT_MEASURES
		  *  LAYOUT_FILTERS
		  */
		var _layout	=	wrsKendoUiContextMenu(whoEventRequest);
		
		
			hideContextMenu(type,_layout.layout_clean);
		
		if(empty($wrsEventMain.html())) return true;
		
		/*
		 * Removendo o evento apenas das primeiras casas quando for os números das linhas
		 */
		if($wrsEventMain.index()==0)
		{
			var mainInfo		=	divMainEvent.attr('rel');
			if(mainInfo=='noContext')
			{
				return false;
			}
		}
		
		
		var wrs_event	=	$dd.attr('wrs_event');
		
		/*
		 * impedindo que o evento seja replicado diversas vezes
		 */
		if(!wrs_event){
			$dd.attr('wrs_event','true');
			$dd.find('li a').each(function(){
				$(document).on('click', '#' + $(this).attr('id'), function(event)
																	{ 
																			var json	=	$(this).attr('json');
																				
																				if(!empty(json))
																				{
																					json	=	$.parseJSON(base64_decode(json));
																				}else{
																					json='';
																				}

																			var events		=	 {'json':json,'event':$(this),'parent':$wrsEventMain, 'type':type,'kendoId':whoEventRequest.attr('id'), 'layout':_layout.layout_full};
																			return eventAction(events);
																	}
								);
			});		
		}
		/*
		 * END IF
		 */
		
		if (typeof options.above == 'boolean' && options.above) {
			$dd.addClass('dropdown-context-up').css({
				top: e.pageY - 20 - $('#dropdown-' + id).height(),
				left: e.pageX - 13
			}).fadeIn(options.fadeSpeed);
		} else if (typeof options.above == 'string' && options.above == 'auto') {
			$dd.removeClass('dropdown-context-up');
			var autoH = $dd.height() + 12;
			if ((e.pageY + autoH) > $('html').height()) {
				$dd.addClass('dropdown-context-up').css({
					top: e.pageY - 20 - autoH,
					left: e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else {
				$dd.css({
					top: e.pageY + 10,
					left: e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			}
		}
	});
}
	
	function destroyContext(selector) {
		$(document).off('contextmenu', selector).off('click', '.context-event');
	}
	
	return {
		init: initialize,
		settings	: updateOptions,
		attach		: addContext,
		attachWRS	: addContextWRS,//Criado Por Marcelo Santos customização para o Dril WRS
		destroy		: destroyContext
	};
})();