/**
 * Configuração apenas do Jquery Layout
 * 
 * Criado por Marcelo Santos
 * 
 * @link http://layout.jquery-dev.com/demos/custom_scrollbars.html
 */


function wrs_north_onresize()
{
	//TOPO
	//alert('wrs_north_onresize');
}


function wrs_center_onresize()
{
	//BODY
	TRACE('wrs_center_onresize()');
	
	var paddinLayoutCenter	=	parseInt($('.ui-layout-center').css('padding-top').replace('px'));
	var heightCenter		=	($('.ui-layout-center').outerHeight()-(paddinLayoutCenter));
	var abaHeight			=	$('.WRS_ABA').outerHeight();
	

	//Redimencionadno a tela do center body
	$('.wrs_panel_center_body').height((heightCenter)-abaHeight);

//	$('.WRS_ABA').width($('.ui-layout-center').outerWidth());
	
	var divMain					=	 (heightCenter-abaHeight)-45;
	var paddingContainerCenter	=	parseInt($('.container_center').css('padding-bottom').replace('px'));
	
	var navegacao_inside		=	$('.wrs_panel_center_body_container .wrs_nav_relatorio').css({'margin-bottom':15});
	
	
	var divisor_common			=	(((divMain-abaHeight)-paddingContainerCenter)/3);

	

	
	
		$('.container_center').height(divisor_common);
		
		 
		 $('.wrs_panel_center_body').find('.WRS_DRAG_DROP_RECEIVER').each(function(){
			 var h4Header		=	$(this).parent().find('h4').outerHeight();
			 
			 var grth4Header	=	$(this).parent().find('h4').attr('h4Header');
			 
			 //Grava o tamanho na propia TAG para não perder após a customização
			 if(empty(grth4Header)){
				 $(this).parent().find('h4').attr('h4Header',h4Header);
			 }else{
				 h4Header	=	grth4Header;
			 }
			 
			 var offsetHeader 	=	 ((divisor_common) -h4Header );
			 
			 $(this).find('div').height(offsetHeader-(paddinLayoutCenter/2));
			 $(this).find('ol').height((offsetHeader-paddinLayoutCenter/2)-h4Header);
		 });

		 
		 resizeGridSimple();
		TRACE('END wrs_center_onresize()');
}






function wrs_west_onresize(pane, $Pane)
{

	/*
	 * 	lado esquerdo
	 */
	//Div principal
	
	var divMain			=	 $('.ui-layout-west');
	var heightBox		=	divMain.outerHeight();
	var offsetHeader 	=	 $('.wrs_panel_esquerdo_header').outerHeight();
	
	var padding 		=	 parseInt($('.wrs_panel_esquerdo_header').css('padding-top').replace('px',''))+parseInt($('.wrs_panel_esquerdo_header').css('padding-bottom').replace('px',''));
	
	heightBox			=	(heightBox-padding) - offsetHeader - offsetHeader;
	
	$('.wrs_panel_esquerdo_drag_drop ol').height(heightBox);
	
	formata_texto_resultado_filtros();
	
}

// formatar textos muito longos nos filtros criando tooltip pra cada um
function formata_texto_resultado_filtros(){	
	var tamanho_letra = $("<div/>").text("W").textWidth();
	$('.wrs_filter_body_container').each(function(){
		$(this).find('.pws_filter_text').each(function(){
			var tamanho_espaco = parseInt($(this).css('width'))+10;//+10=ajuste até a borda
			if($(this).attr('text_original').length > ceil(tamanho_espaco/tamanho_letra)){
				$(this).text($(this).attr('text_original').substring(0,ceil(tamanho_espaco/tamanho_letra))+'...');
				bindQtip($(this));
			}else{
				$(this).text($(this).attr('text_original'));
				$(this).qtip("destroy");
			}
		});
	});
}

// cria o qtip para o objeto em questão (fazer pra cada um, outra alternativa a mandar atualizar o DOM (varrendo um por um))
function bindQtip(obj){
	obj.qtip({
         style: {                                                     
        	 	width: $("<span/>").text(obj.attr('text_original')).textWidth()+80,
        	 	classes: 'qtip-bootstrap qtip-shadow qtip-filtros'
         },content: {
				text: obj.attr('text_original')
	         },position: {
	        	 my: 'top left',
	             at: 'top right',
	             adjust: { x: -5, y: -2 }
         }
     });		
	
}

//Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function wrs_east_onresize()
{
	//lado direito
	var height	=	$('.ui-layout-east').outerHeight();
	$('.direito_container').height(height-2);
}

function wrs_south_onresize()
{
	//Lado de baixo
	//alert('wrs_south_onresize');
}

 

function BTN_HOVER_BOX_DROP()
{
	$('.box_wrs_panel').unbind('hover');
	//Quanho hover o botão para hover do Drag and Drop
	$('.box_wrs_panel').hover(function() {$( this ).addClass( "ui-state-hover" );}, function() {$( this ).removeClass( "ui-state-hover" );});
}


//Controlando o Evento do Layout
$(document).ready(function () {

	var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i) ? true : false;
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) ? true : false;
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
			}
		};

	

	var SizeBar = (isMobile.any() ? 16 : 8);


	 
	var jqueryLayoutOptions	=	{
			applyDefaultStyles			: true,
			name						: "wrs_Layouts",

			// Define o tamanho de cada Painel
			north__size	: 70,
			south__size	: 36,
			west__size	: 230,
			east__size	: 230,

			// Retira o Resize do North + South
			north__resizable: false,
			south__resizable: false,

			// Define que os Paineis Permitem Menus Sobre os Elementos
			north__showOverflowOnHover	: true,
			south__showOverflowOnHover	: true,
			center__showOverflowOnHover	: true,
			west__showOverflowOnHover	: true,
			east__showOverflowOnHover	: true,

			// Define o tamanho das Barras
	        north__spacing_open		:	SizeBar,
	        north__spacing_closed	:	SizeBar,
	        south__spacing_open		:	SizeBar,
	        south__spacing_closed	:	SizeBar,
	        west__spacing_open		:	SizeBar+2,
	        west__spacing_closed	:	SizeBar+2,
	        east__spacing_open		:	SizeBar+2,
	        east__spacing_closed	:	SizeBar+2,
	        
	        center__onresize 	: wrs_center_onresize,
	        
	        

			// Painel de Cima (Cabeçalho)
			north__togglerLength_open		:  "100",
			north__togglerLength_closed		:  "200",
			north__togglerTip_open			: "Oculta Cabeçalho",
			north__togglerTip_closed		: "Exibe Cabeçalho",
			north__togglerContent_open		: "<span class='ui-icon ui-icon-triangle-1-n' style='margin-left:43px;margin-top:-4px'></span>",
			north__togglerContent_closed	: "<span class='ui-icon ui-icon-triangle-1-s' style='margin-left:89px;margin-top:-4px'></span>",
			north__onresize 	: wrs_north_onresize,
			north__onopen: function ()
							{
								//Chama o tamanho do posicionamento
			},
			north__onclose: function () 
							{
								//Chama o tamanho do posicionamento
								
			},

			// Painel de Baixo (Rodapé)
			south__togglerLength_open		:  "100",
			south__togglerLength_closed		:  "200",
			south__togglerTip_open			: "Oculta Rodapé",
			south__togglerTip_closed		: "Exibe Rodapé",
			south__togglerContent_open		: "<span class='ui-icon ui-icon-triangle-1-s' style='margin-left:40px;margin-top:-4px'></span>",
			south__togglerContent_closed	: "<span class='ui-icon ui-icon-triangle-1-n' style='margin-left:89px;margin-top:-4px'></span>",
			south__onresize 	: wrs_south_onresize,
			south__onopen: function () 
							{
								//Chama o tamanho do posicionamento
								
			},
			south__onclose: function () 
							{
								//Chama o tamanho do posicionamento
								
			},

			// Painel da Esquerda (Filtros)
			west__togglerLength_open	:  "100",
			west__togglerLength_closed	:  "200",
			west__togglerTip_open		: "Oculta Filtros",
			west__togglerTip_closed		: "Exibe Filtros",
			west__resizerTip			: "Redimensiona Filtros",
			west__togglerContent_open	: "<span class='ui-icon ui-icon-triangle-1-w' style='margin-left:-4px'></span>",
			west__togglerContent_closed	: "<span class='ui-icon ui-icon-triangle-1-e' style='margin-left:-4px'></span>",

			west__onresize 	: wrs_west_onresize,

			west__onopen: function () 
							{
								//Chama o tamanho do posicionamento
			},
			west__onclose: function () 
							{
								//Chama o tamanho do posicionamento
								
			},

			// Painel da Direita (Layouts)
			east__togglerLength_open		:  "100",
			east__togglerLength_closed		:  "200",
			east__togglerTip_open			: "Oculta Layouts",
			east__togglerTip_closed			: "Exibe Layouts",
			east__resizerTip				: "Redimensiona Layouts",
			east__togglerContent_open		: "<span class='ui-icon ui-icon-triangle-1-e' style='margin-left:-4px'></span>",
			east__togglerContent_closed		: "<span class='ui-icon ui-icon-triangle-1-w' style='margin-left:-4px'></span>",
			east__onresize 	: wrs_east_onresize,
			east__onopen: function () {
											WRS_PANEL_DRAG();
											$('.WRS_DRAG_DROP_RECEIVER_FILTER').show();
											$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
											$('.wrs_panel_filter_icon').show();
											wrsFilterClickFalse();
											
											
										},
			east__onclose: function () 
			{
				//Executa o Click para executar o Gráfico
				
				if($('.wrs_run_filter').attr('locked')!='locked')
				{
					$('.wrs_run_filter').attr('eastonclose','true').attr('flag_load','true');//Pra informar que o clique partir da opção para feixare a tela da direira 
					wrsRunFilter();
				}
				
				//Muda visão
			},
			
			//	Inicia com o Lado direito ativado
		    //	east__initClosed: true,
			
			//Desabilita a funcionalidade de abrir os paineis pelo teclado com CTRL+Seta
			enableCursorHotkey	: false,
			slidable			: false
	};

	
	

	BTN_HOVER_BOX_DROP();

	 wrs_panel_layout	 = $('body').layout(jqueryLayoutOptions);
	
	
	
	wrs_north_onresize('west', wrs_panel_layout.panes.west);
	wrs_west_onresize();
	wrs_east_onresize();
	wrs_south_onresize();
	wrs_center_onresize();

	$('.wrs_clean_box_drag_drop').click(wrs_clean_box_drag_drop);
	ABA_CLICK();
	ABA_WIDTH_LI();
	
});

function wrs_clean_box_drag_drop()
{
	var $this		=	 $(this);
	var type		=	 $this.attr('parent');
	var who_receive	= $this.parent().parent().find('.wrs_panel_receive').attr('who_receive');
	var mensagem	=	"";
	var mensagem_sucess	=	"";
	
	if(empty(who_receive))
	{
		who_receive	= $this.parent().parent().parent().parent().find('.wrs_panel_receive').attr('who_receive');
	}
	

	
	
	switch(who_receive)
	{
		case 'filtros' 	: 	{
								mensagem 		= sprintf(LNG('DRAG_DROP_CLEAN_SELECTION'),LNG('ATTRIBUTOS_FILTRO'));
								mensagem_sucess = sprintf(LNG('DRAG_DROP_CLEAN_SELECTION_SUCCESS'),LNG('ATTRIBUTOS_FILTRO'));
								
								if($('.wrs_panel_filter_icon').attr('filter_hide')=='true')
								{	
									mensagem 		= LNG('DRAG_DROP_CLEAN_SELECTION_INSIDE');
									mensagem_sucess = LNG('DRAG_DROP_CLEAN_SELECTION_SUCCESS_INSIDE');
								}
								
							}; break;
		case 'coluna' 	: 	{
								mensagem 		= sprintf(LNG('DRAG_DROP_CLEAN_SELECTION'),LNG('ATTRIBUTOS_COLUNA'));
								mensagem_sucess = sprintf(LNG('DRAG_DROP_CLEAN_SELECTION_SUCCESS'),LNG('ATTRIBUTOS_COLUNA'));
							}; break;
		case 'linha' 	:	{
								mensagem 		= sprintf(LNG('DRAG_DROP_CLEAN_SELECTION'),LNG('ATTRIBUTOS_LINHA')); 
								mensagem_sucess = sprintf(LNG('DRAG_DROP_CLEAN_SELECTION_SUCCESS'),LNG('ATTRIBUTOS_LINHA')); 
							};break;
		case 'metrica' 	:	{
								mensagem 		= sprintf(LNG('DRAG_DROP_CLEAN_SELECTION'),LNG('ATTRIBUTOS_METRICA'));
								mensagem_sucess = sprintf(LNG('DRAG_DROP_CLEAN_SELECTION_SUCCESS'),LNG('ATTRIBUTOS_METRICA'));
							}; break;
	}
	
	
	
	WRS_CONFIRM(mensagem,'warning',
										function(result)
										{ 
												if(result)
												{
													if(type!='no_parent')
													{
														//$('.wrs_panel_filter_icon').is(":visible")
														if($('.wrs_panel_filter_icon').attr('filter_hide')=='false' || empty($('.wrs_panel_filter_icon').attr('filter_hide'))){		
															$this.parent().parent().parent().find('li').each(function(){$(this).remove()});
															$this.parent().parent().parent().find('.WRS_DRAG_DROP_FILTER').html('');
															$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
														}
														//Zera as opções de Filtro
														$.WrsFilter('setSizeDataFilterClean','all');
														
													}else{
														$this.parent().parent().find('li').each(function(){$(this).remove()});
													}
													
													insetDragDropEmpry();
													
													WRS_ALERT(mensagem_sucess,'success');
												}
									});
}




function ABA_CLICK()
{
	
	$('.WRS_ABA a').click(function(){

		var getIcoRemove		=	 $(this).find('.icon-remove-aba').attr('type');
		
		if(getIcoRemove=='remove') return false;
		
		$('.WRS_ABA').find('li').each(function(){$(this).removeClass('active');});
		$(this).parent().addClass('active');
	});
	
	
	$('.icon-remove-aba').click(function(){
		$(this).attr('type','remove');
		$(this).parent().parent().remove();
		
		ABA_WIDTH_LI();
	});
	
}


function ABA_WIDTH_LI()
{
		var widthMax		=	0;
		
		$('.WRS_ABA').find('li').each(function(){ widthMax+=$(this).width()+5;});
		$('.WRS_ABA ul.nav').width(widthMax);
}


















/*
 * Controle do DRAG AND DROP
 */
function btn_right_remove()
{
	$('.btn-right').unbind('click');
	$('.btn-right').click(function(){

			$(this).parent().parent().find('li').each(function(){count++});
			
			var filterJson		=	$(this).parent().parent().parent();

			if(filterJson.attr('type')=='filtro')
			{
				var vvalue	=	$(this).parent().attr('vvalue');
				
				$('.WRS_DRAG_DROP_FILTER h2').each(function(){
						
					if($(this).attr('vvalue')==vvalue) $(this).remove();
						
				});

			}
			
			$(this).parent().remove();
			
			
			insetDragDropEmpry();
		
	});
}


function cloneDragDrop(whoClone,toClone,cloneTAGWrsFlag,who_receive)
{
	var buttonRemove		=	'<button type="button" class="btn btn-link btn-xs  btn-right"><span class=" glyphicon glyphicon-remove "></span></button>';

	if(cloneTAGWrsFlag=='true')
	{
		whoClone.attr('who_receive',who_receive).clone().appendTo(toClone);
	}
	else
	{
		whoClone.clone().removeClass('ui-state-hover').append(buttonRemove).attr('cloneTAGWrs','true').attr('who_receive',who_receive).appendTo(toClone);
	}
	
	
	btn_right_remove();
	
	
	 var sortableComplement		=	'attr';
	 
	 switch(who_receive)
	 {
	 	case 'metrica'	:	sortableComplement	=	'metrica'; break;
	 }
	 
	 
	 sortableComplement	=	 ".sortable_"+sortableComplement;
	 
	setDraggable(sortableComplement,true,who_receive);
	
	if(who_receive=='filtros')
	{
		sortable_attr_simples_composto();
	}
	
	BTN_HOVER_BOX_DROP(); //Removendo e inserindo o Hover
	
}

 

function insetDragDropEmpry()
{
	var DragValues	=	DragValues_LF	=	[]; // LF=level_full

	$('.wrs_swap_drag_drop').each(function(){
	
		var htmlDefault			=	'<li class="placeholder">'+sprintf(LNG('DRAG_DROP_AREA'),LNG($(this).attr('LNG')))+'</li>';
		var who_receive			=	 $(this).parent().attr('who_receive');
		var count				=	0;
		var notRepeatValueFlag	= 	notRepeatValueFlag_LF	= 	[]; //Contem as informações dentro de cada bloco 
				
		$(this).find('li').each(function(){
				var json 			=	$.parseJSON(base64_decode($(this).attr('json')));
				var level_full		=	(typeof json == 'object' && $(json).is('[LEVEL_FULL]'))?json.LEVEL_FULL:'';
				var vvalue			=	$(this).attr('vvalue');
				//Verificação apra confirmar a remoção de Filtro para linha ou coluna
				if($(this).parent().parent().attr('type')!='filtro')
				{		
						/*// validacao pelo level-full ao inves do vvalue
						if(isset(DragValues[vvalue]))
							{
								notRepeatValueFlag[vvalue]=	true;
							}
						DragValues[vvalue]	=	true;
						*/
					
						// validacao pelo level-full ao inves do vvalue
						if(isset(DragValues_LF[level_full]))
						{
							notRepeatValueFlag_LF[level_full]=	true;
						}
						DragValues_LF[level_full]	=	true;
				}
				
				// validacao pelo level-full ao inves do vvalue
				if(!isset(notRepeatValueFlag_LF[level_full]))
				{
						//PAra não permitir que a estrutura possa ir para a coluna e linhas
						notRepeatValueFlag_LF[level_full]=	true;
				}else{
					if(!empty(level_full)){
						WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_IN_USER_REMOVE'),vvalue),'warning');
						$(this).remove();
					}
				}
				
				/*// validacao pelo level-full ao inves do vvalue
				if(!isset(notRepeatValueFlag[vvalue]))
				{
						//PAra não permitir que a estrutura possa ir para a coluna e linhas
						notRepeatValueFlag[vvalue]=	true;
				}else{
					if(!empty(vvalue)){
						WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_IN_USER_REMOVE'),vvalue),'warning');
						$(this).remove();
					}
				}
				*/
				
				
				//Validando repetição em Filtros
				
				//Limpando informações desnecessária
				var who_receiveLi	=	$(this).attr('who_receive');
				if(who_receiveLi!=who_receive){
					$(this).attr('who_receive'	,who_receive);
					$(this).attr('atributo'		,'');
				}
				
				count++;
		})
		
		
		//Removendo icones quando passado para outra estrutura
		$('.sortable_linha li, .sortable_coluna li').find('.icon_atributo').remove();
		
		if(count==0){
			$(this).append(htmlDefault);
		}else{
			if(count>=2){
				$(this).find('.placeholder').remove();
			}
		}
		
	});
}


/*
function wrs_search_drad_drop_direita()
{
	
//	$(this).parent().parent().accordion({active:true});
	
//	$(this).parent().parent().find('ul').find('.wrs_esquerdo_search').remove();
	
	var event		=	$(this).parent().parent().find('ul');
	var div 		=	'<div class="input-group "><input type="text" class="form-control wrs_search_drag_drop_direita_eventos"  placeholder="'+LNG('WHAT_SEARCH')+'"><span class="input-group-addon span_sub wrs_remove_searcg_drag"><i class="glyphicon glyphicon-remove"></i></span></div>';
	var liSearch	=	'<li class="wrs_esquerdo_search" vvalue="wrs_search" >'+div+'<li>';
	
	event.prepend(liSearch);
	wrs_search_drag_drop_direita_eventos();
}
*/


function wrs_search_drad_drop_direita_h2()
{
	var type_click	=	$(this).attr('isClick');
	
	if(type_click!='true')
	{
		$(this).parent().find('.wrs_esquerdo_search').remove();
	}
	
	var relClass	=	 '.'+$(this).attr('rel');

		$(relClass).find('.wrs_search_drag_drop_direita_eventos').focus();
		
	$(this).attr('isClick','');
}

function wrs_search_drag_drop_direita_eventos()
{
	
	$('.wrs_remove_searcg_drag .fa-eraser').hide();
		
	
	//$('.wrs_remove_searcg_drag').unbind('click');
	$( ".wrs_search_drag_drop_direita_eventos" ).unbind('keyup');
	
	$( ".wrs_search_drag_drop_direita_eventos" ).keyup(function( event ) {
		
		if ( event.which == 13 ) {
			 	return true;
			  }

	if(empty($(this).val()))
			{
				$(this).parent().find('.fa-eraser').hide();
				$(this).parent().find('.fa-search').show();
			}else{
				$(this).parent().find('.fa-eraser').show();
				$(this).parent().find('.fa-search').hide();
			}
		
		var ul		=	$(this).parent().parent().parent().parent();
		var value	=	strtolower($(this).val());
		
		
		
		ul.find('li').each(function(){
				var liValue	=	 strtolower($(this).attr('vvalue'));
				var flagSee	=	false;

				if(liValue!='wrs_search'){
	
				
					var valueLike	=	 explode(' ',value);
					var likeCompare	=	valueLike.length;
					var likeCount	=	0;
					
					//Executando o like
					for(var like=0;like<valueLike.length;like++)
					{
						if (strpos(liValue, valueLike[like])===false) {
								//if(!flagSee){
									flagSee	=	false;
								//}
						}else{
							flagSee	=	true;
							likeCount++;
						}
					}
					
					if(likeCompare!=likeCount) flagSee=false;
					
					if(flagSee==false){
						$(this).hide();
					}else{
						$(this).show();
					}
				}
		});
		 
	});
	
	$('.wrs_remove_searcg_drag').unbind('click');
	
	$('.wrs_remove_searcg_drag').click(function(){
		$(this).parent().parent().parent().parent().find('li').show();
		//$(this).parent().parent().remove();
		$(this).parent().find('input').val('');
	});
	
}




var droppableOptionsOlSortable	=	{};
var droppableOptionsOl			=	{};





/**
 * Evento principal do DRAG DROP
 * @param event
 * @param ui
 * @returns {Boolean}
 */
function DROP_EVENT( event, ui ,eventReceive){
	
		var toEvent;
		var receiveEvent	=	$(this);
		
		if(event=='DIRECT')
		{
			toEvent			=	ui;
			receiveEvent	=	eventReceive;
		}else{
			toEvent			=	ui.draggable;
		}
		
		
		var filters			=	receiveEvent.parent().attr('type');
		var who_receive 	=	receiveEvent.parent().attr('who_receive');
		
		var api			=	toEvent.attr('api');
		var cloneTAGWrs	=	toEvent.attr('cloneTAGWrs');
		//Recusa se o DRAG não for da API WRS
		if(api!='wrs') return false;
	
		var value		=	toEvent.attr('vvalue');
		var insert		=	true;

		var typesDraggable		=	toEvent.attr('type');
		var whereFoundReceive	=	$('.wrs_panel_receive_coluna_linha');


	if(filters!='metrica')
	{
		if(typesDraggable=='metrica')
		{
			WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_NOT_PUT'),value),'warning');
			return false;
		}
	}
	
 	switch(filters)
		{
			case 'filtro'  : whereFoundReceive =  receiveEvent.parent(); break; 
			case 'metrica'  : {
									whereFoundReceive =  receiveEvent.parent();
									
									if(typesDraggable!='metrica')
									{				    					      												
										WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_NOT_PUT'),value),'warning');
										return false;
									}
			}; break;
		}
 	
 	if(cloneTAGWrs!='true')
 	{
 		var flag_alert		=	true;

 		
				whereFoundReceive.find('li').each(function()
													{
															if(value==$(this).attr('vvalue')) 
															{
																insert=false;
																if(flag_alert)
																{
																		WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_IN_USER'),value),'error');
																		flag_alert=false; //Não repete a mensagem
																}
															}
										  			});
 	}
			
 	
 	
	if(insert)
	{
				receiveEvent.find( ".placeholder" ).remove();
    	  
				cloneDragDrop(toEvent,receiveEvent,cloneTAGWrs,who_receive);
				
				if(cloneTAGWrs=='true')
				{
					toEvent.remove();
					insetDragDropEmpry();																		
				}
	}
	
	
	
	
	var json 			=	$.parseJSON(base64_decode(toEvent.attr('json')));
	json['FILTER']	=	'';
	toEvent.attr('json',base64_encode(json_encode(json,true)));

}









function setDraggable(name,use,who_receive)
{
	 if(use)
	 {
		 var sortableComplement		=	'attr';
		 
		 switch(who_receive)
		 {
		 	case 'metrica'	:	sortableComplement	=	'metrica'; break;
		 }
		 
		 $( name ).sortable({
		      connectWith: ".sortable_"+sortableComplement
		    }).disableSelection();
		 
		 return true;
	 }
	 
	 	var draggableOptionsLi		=	{
									   	     helper		: "clone",
									   	     cursor		: "move", 
									   	     appendTo	: "body",
									   	     zIndex		: 10000,
									   	     cursorAt	: { top: 10, left: 20 }
								   	     };
		 
	
	$( name ).draggable(draggableOptionsLi).sortable({placeholder	: "ui-state-highlight"});
	$( name).disableSelection();
	wrs_panel_layout.allowOverflow($(name));
	
}


function find_relatorio_attributo_metrica(where_find,_values,_clone)
{
	
	$(_clone).html('');
	/*
	 * Aplicando quando vier com CLASS
	 */
	
	if(is_array(_values))
	{
		
	for(x in _values)
	{
		var _class				=	 '';
		var simples_composto	=	false;
		var is_filter			=	'';
		if(substr(_values[x],0,2)=='__')
			{
				if(is_array(_values[x]))
				{
					
					var value	=	_values[x]
						_class	=	substr(value[0],2,value[0].length);
					
					if(value[1]=='simples') simples_composto=true;
					
					is_filter	=	 empty(value[2]) ? '' : value[2];
					
				}
				else
				{
					
					_class	=	substr(_values[x],2,_values[x].length);
					
				}
				

				//var object	=	$(where_find).find('li.'+_class);				 
				var object	=	$(where_find).find("li:containClass('"+_class+"')"); // alterado para procurar nas classes do objeto (case insensitive)
				
				
				if(simples_composto)
				{
					object.attr('sc_load','simples');
				}
				else
				{
					object.attr('sc_load','');
				}
				
				if(!empty(is_filter))
				{
					var json 			=	$.parseJSON(base64_decode(object.attr('json')));
					if(json!=null)
						json['FILTER']	=	is_filter;
						
						object.attr('json',base64_encode(json_encode(json,true)));
				}
				
				DROP_EVENT( 'DIRECT', object,$(_clone));
				
				//Limpando o LAdo dos ATTR Fixos
/*				var json 			=	$.parseJSON(base64_decode(object.attr('json')));
					json['FILTER']	=	[];
					object.attr('json',base64_encode(json_encode(json,true)));
					*/
			}
	}
	
	}
	/*
	
	$(where_find+' li').each(function(){
		
		var li_value	=	$(this).attr('vvalue');
		
		for(obj in _values)
		{
			var obj_value	=	_values[obj];
			var simples_composto	=	false;
			
			if(is_array(_values[obj]))
				{
					obj_value			=	_values[obj][0];
					simples_composto	=	true;
				}
			
			if(obj_value== li_value)
				{

				if(simples_composto)
				{
					$(this).attr('sc_load',_values[obj][1]);
				}
					//TRACE_DEBUG($(this).attr('class'));
					DROP_EVENT( 'DIRECT', $(this),$(_clone)); 
					
					if(simples_composto)
					{
						$(this).attr('sc_load','');
					}	
				}
			
		}
		
	});
	
	*/
}

// extensao para comparar valores case insensitive com as classes de um objeto
// embasado e alterado de: http://www.jquerybyexample.net/2012/11/make-jquery-contains-selector-case-insensitive.html
// felipebevi 20150806
jQuery.expr[':'].containClass = function(a, i, m) {
	var classes = jQuery(a).attr('class').toUpperCase().split(" ");
	var existe=false;
	for(i=0;i<classes.length;i++){
		if(m[3].toUpperCase().trim() == classes[i].trim()){
			existe=true;
		}
	}
	return existe;
};	
	
/**
 * 	Fazendos os inputs dos elementos na grid
 */
function set_value_box_relatorio(object)
{
	if(isset(object.LAYOUT_ROWS))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR ',object.LAYOUT_ROWS,'.sortable_linha');
	}
	
	if(isset(object.LAYOUT_COLUMNS))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR ',object.LAYOUT_COLUMNS,'.sortable_coluna');
	}
	
	if(isset(object.LAYOUT_FILTERS))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR ',object.LAYOUT_FILTERS,'.sortable_filtro');
	}
	
	if(isset(object.LAYOUT_MEASURES))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_METRICA ',object.LAYOUT_MEASURES,'.sortable_metrica');
	}
	
	$('.WRS_DRAG_DROP_FILTER').html(str_replace('li','h2',$('.sortable_filtro').html()));
	
	
	
}


/**
 * 
 * Verificando se existe informações para poder executar o Relatório 
 * E Já pega as informações necessária para rodar o Gráfico
 * 
 * @param object
 * @param _type
 * 
 * @returns array
 */
function rows_by_metrica_attr_base64(object,_type)
{
	var _flag		=	false;
	var _request	=	[];
	
	$(object).find('li').each(function(){
		
		var json		=	 $.parseJSON(base64_decode($(this).attr('json')));
		
		if(!$(this).hasClass('placeholder'))
		{
			_flag	=	true;
		
			//Pegando as informações para executar o Relatório
			if(_type=='attr'){
				_request[_request.length]	=	json.LEVEL_FULL;
			}else{
				_request[_request.length]	=	json.MEASURE_UNIQUE_NAME;
			}
		}
		
	});
	
	
	return {flag:_flag,request:implode(',',_request)};
}


/**
 * 
 * Evento do click do Botão para executar o Relatório
 * 
 * 
 */
function wrs_run_filter()
{
	$(this).attr('locked','locked');

	//Para poder saber se oculta as mensagems ou não
	$('.wrs_panel_center_body').attr('index-visible',$('.wrs_panel_center_body').css('display'));
	
	TRACE('START wrs_run_filter()');
	
	$.WrsFilter('wrs_filter_check_change_filter');
	
	//Verificando se existe informações básicas para gerar um relatório
	var sortable_metrica	=	 rows_by_metrica_attr_base64('.sortable_metrica','metrica');
	var sortable_linha		=	 rows_by_metrica_attr_base64('.sortable_linha','attr');
	var sortable_coluna		=	 rows_by_metrica_attr_base64('.sortable_coluna','attr');
	var sortable_filtro		=	 rows_by_metrica_attr_base64('.sortable_filtro','attr');
	

	var request_metrica		=	 sortable_metrica.request;
	var request_linha		=	 sortable_linha.request;
	var request_coluna		=	 sortable_coluna.request;
	var request_filtro		=	 sortable_filtro.request;
	
		sortable_metrica	=	 sortable_metrica.flag;
		sortable_linha		=	 sortable_linha.flag;
		sortable_coluna		=	 sortable_coluna.flag;
		sortable_filtro		=	 sortable_filtro.flag;
		
	var run					=	 false;
	var mensagem			=	"";
	var flag_load			=	$(this).attr('flag_load');
	
	
 
	//Verificando se todos tem informações
	if(sortable_metrica && sortable_linha )
	{
		run		=	 true;
	}
	
	/*
	 *  Personalizando Mensagens
	 */
	
	if(!sortable_metrica)
	{
		mensagem	+= LNG('ATTRIBUTOS_METRICA')+'<br>';	
	}

	if(!sortable_linha)
	{
		mensagem	+= LNG('ATTRIBUTOS_LINHA')+'<br>';
	}


	if(run)
		{
		//manda executar o Relatório
		
		if($(this).attr('is_atributo_simples')!='true')
		{//Apenas abre o load se for diferente de informações simples no select
			if($(this).attr('eastonclose')!='true')
			{
				if(empty($(this).attr('history')))
				{
					MODAL_LOADING_WRS_PANEL();
					$(this).attr('flag_load','true');
					flag_load	=	'true';
				}
			}
		} 
		
		WRS_PANEL_RELATORIO();
		
		var _file	=	'WRS_PANEL';
		var _class	=	'WRS_PANEL';
		var _event	=	'load_grid_header';
		
		var param_request	=	[];
		//Pegando as informações já pre estabelecidas pelo gráfico atuak
		var is_param		=	false;
		//Buscando a Grid para poder pegar as  opções selecionadas
		$('.container_panel_relatorio').find('.wrsGrid').each(function(){
			param_request	=	getElementsWrsKendoUi($(this));
			is_param	=	true;
		});
		//Se não encontrar a variábel pesquisa pela primeira div que encontrar na tela
		if(!is_param){
			$('.container_panel_relatorio').find('div').each(function(){
				param_request	=	getElementsWrsKendoUi($(this));
			});
		}
		

		param_request['LAYOUT_ROWS']		=	base64_encode(implode(',',request_linha));
		param_request['LAYOUT_COLUMNS']		=	base64_encode(implode(',',request_coluna));
		param_request['LAYOUT_MEASURES']	=	base64_encode(implode(',',request_metrica));
		

		//Força a conversão do Menu 
		wrsFilterShow();
		param_request['LAYOUT_FILTERS']	=	base64_encode($.WrsFilter('getAllFiltersToRun'));
		//Passando o ID do Cubo na sessão
		var _wrs_multiple_cube_event	=	$('.wrs_multiple_cube_event').find('option').length;
		//Verificando se existe multiplos cubos
		if(_wrs_multiple_cube_event==1 || empty(_wrs_multiple_cube_event))
		{	
			//Caso não seja multiplo cubo pega o cubo corrente
			param_request[TAG_URL_CUBE_SELECTED]=CUBE_S;
		}else{
			var jsonMukltiple			=	$('.wrs_multiple_cube_event').find('option:selected').attr('json');
			param_request['json']		=	jsonMukltiple;
		}
		
		
		/*
		 * Verificnado os Filtros simples
		 * nesse caso inpede o fluxo completo
		 */
		
		if(!$.WrsFilter('wrs_check_filter_simples')) {
			TRACE('EXISTE FILTRO SIMPLES');
			return false;
		}
		
		//Verificnado se existe alterações de pesquisa 
		if(is_wrs_change_to_run(param_request))
		{
			
			if($(this).attr('is_atributo_simples')=='true'){
				$(this).attr('is_atributo_simples','false');
			}
			$(this).attr('locked',false);//Libera o filtro
			$(this).attr('flag_load','false');

			return true;
		}else{
			if(flag_load!='true')
			{
				MODAL_LOADING_WRS_PANEL();
				$(this).attr('flag_load','true');
			}
		}
		
		//foreach(param_request);
		/*
		 * Pega os elementos das Opções antes não Dashboard
		 * 
		 */
		var wrsConfigGridDefault		=	$('#wrsConfigGridDefault');
		var wrsConfigGridDefault_data	=	wrsConfigGridDefault.data('wrsConfigGridDefault');

		
		//Se existir interação então faz o merge das informações 
			if(!empty(wrsConfigGridDefault.attr('is-event'))){
				if(!empty(wrsConfigGridDefault_data))
				{
					param_request	=	merge_objeto(param_request,wrsConfigGridDefault_data);
				}
			}
		
		//Ajustando ABAS HTML	
		$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide();
		$('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
		$('.wrs_panel_filter_icon').hide();
			
		runCall(param_request,_file,_class,_event,MOUNT_LAYOUT_GRID_HEADER,'modal');		

		
		wrs_panel_layout.close('east');
		$('.wrs_panel_center_body').hide();
		$('.wrs_panel_filter_icon').hide();
		
		
		
	}
	else
	{
			//Falta informações para executar o relatório
			WRS_ALERT(sprintf(LNG('RUN_RELATORIO_FALTA_INFORMACAO'),mensagem),'error');
	}
	
	TRACE('END wrs_run_filter()');
	
}

function wrsRunGridButton(param_request)
{
		var _file	=	'WRS_PANEL';
		var _class	=	'WRS_PANEL';
		var _event	=	'load_grid_header';
		MODAL_LOADING_WRS_PANEL();
		runCall(param_request,_file,_class,_event,MOUNT_LAYOUT_GRID_HEADER,'modal');	
}

/**
 * Montando a Grid com header
 * @param data
 */
function MOUNT_LAYOUT_GRID_HEADER(data)
{
	TRACE('START MOUNT_LAYOUT_GRID_HEADER'); 
	
	$('.container_panel_relatorio').html(data);
	//CLOSE_LOAD_RELATORIO();
	
	//Apenas éexecutando quando existe atributo simples
	if($('.wrs_run_filter').attr('is_atributo_simples')=='true')
	{
		$(".WRS_DRAG_DROP_FILTER").attr('is_atributo_simples',true);
		$('.wrs_run_filter').attr('is_atributo_simples',false);
	}
	
	$('.wrs_run_filter').attr('locked','false').attr('flag_load','false');
	
	
	TRACE('END MOUNT_LAYOUT_GRID_HEADER'); 
}




function MODAL_LOADING_WRS_PANEL(_title,_text_body,_class_button)
{
	var l_title			=	_title;
	var l_text_body		=	_text_body;
	var l_class_button	=	_class_button;
	
	if(empty(_title)){
		l_title	=	'GERANDO_RELATORIO_TITLE';
	}
	
	if(empty(_text_body))
	{
		l_text_body	=	'GERANDO_RELATORIO';
	}
	
	if(empty(_class_button)){
		l_class_button	=	'';
	}
	
	modal(
			{
				 type       : 'info', //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
				 title      : LNG(l_title)+' <img src="./imagens/wrs_loading.gif"/>', //Modal Title
				 text       : LNG(l_text_body), //Modal HTML Content
                 size       : 'normal', //Modal Size (normal | large | small)
				 buttons: [
					{
                        text: LNG('BTN_CANCEL_CONSULTA')+' 00:00', //Button Text
                        eKey: true, //Enter Keypress
                        val:"ok",
                        addClass: 'btn-light-blue TIME_RUN_RELATORIO_button '+l_class_button, //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
                        onClick: function(dialog){
                        	var cancelSystem		=	dialog.bObj.attr('whoCancel');
                        	//Para o time do relogio 
                            _TIME_RUN_RELATORIO 		= false;
                            
                            /*
                             * TODO: Depois temos que criar o botão para Cancelar a Consulta no banco
                             */
                            //TRACE('++'+dialog.val);
                            if(cancelSystem!='system')
                            {
                            	TRACE('Cancelado pelo Usuário');
                            }
                            
                            return true;
                        }
                    },
			     ],
				 center     : true, //Center Modal Box?
				 autoclose  : false, //Auto Close Modal Box?
				 callback   : function(){ if(_TIME_RUN_RELATORIO) MODAL_LOADING_WRS_PANEL(); }, //Callback Function after close Modal (ex: function(result){alert(result);})
				 onShow     : function(r){ }, //After show Modal function
				 closeClick : false, //Close Modal on click near the box
                 closable   : true, //If Modal is closable
				 theme      : 'atlant', //Modal Custom Theme
                 animate    : false, //Slide animation
				 background : 'rgba(0,0,0,0.6)', //Background Color, it can be null
				 zIndex     : 1050, //z-index
				 template   : '<div class="modal-box WRS_PANEL_LOADING_RELATORIO"><div class="modal-inner"><div class="modal-title modal-title-load"></div><div class="modal-text"></div><div class="modal-buttons TIME_RUN_RELATORIO"></div></div></div>',
				 _classes   : {box:'.modal-box', boxInner: ".modal-inner", title:'.modal-title-load', content:'.modal-text', buttons:'.modal-buttons', closebtn:'.modal-close-btn'}
			}
			);
	

	if(!_TIME_RUN_RELATORIO)
	{
		TIME_RUN_RELATORIO();
	}
}

/**
 * Fechando o Load do Carregamento do Relatório
 */
function CLOSE_LOAD_RELATORIO()
{
	 $('.TIME_RUN_RELATORIO_button').attr('whoCancel','system').trigger('click');
}







function wrs_panel_active_drag_drop()
{
	 //Ativando o click do Pesquisar dentro do DREAG
	// $('.wrs_search_drad_drop_direita').click(wrs_search_drad_drop_direita);
	 wrs_search_drag_drop_direita_eventos();
	 //Iniciando o Evento de Arrastar
	 setDraggable(".WRS_DRAG_DROP li",false,'');
	 

	 wrs_panel_layout.allowOverflow($("li.ui-widget-content.box_wrs_panel"));
	 
	 
	 $('.WRS_DRAG_DROP h2').click(wrs_search_drad_drop_direita_h2);
	 
	
	 
	 //Startando o Acordion 
	 $( ".WRS_DRAG_DROP" ).accordion({collapsible: true,active: false,heightStyle: 'content'});
		 
		var droppableOptionsOl		=	{
	  	      activeClass	: "no_border",
	  	      accept		: ":not(.ui-sortable-helper)",
	  	      revert: true,
	  	      zIndex		: 10000,
	  	      drop			: DROP_EVENT
	  	 };
	
		var droppableOptionsOlSortable	=	{
					      items			: "li:not(.placeholder)",
					      placeholder	: "ui-state-highlight",
					      zIndex		: 10000,
					      stop			:	function(event) { 
					    	  					insetDragDropEmpry();  
					    	  					sortable_attr_simples_composto(); 
					    	  					$(this).find('li').each(function(){
					    	  						$(this).removeClass('hide');
					    	  						$(this).show();
					    	  					});
					    	  				},
						  sort			: 	function(){
									       	$( this ).removeClass( "ui-state-default" );
									       },
									       helper: function(){ // modificando o helper pra clonar o objeto ao inves de move-lo
										       return $(this).children('li.ui-state-hover').clone()
										            .appendTo('body') 
										            .css('zIndex',1000) 
										            .show(); 
										  } 			
							,start: function (e, ui) { 
									ui.item.show();
									$(this).children('li.ui-state-hover').addClass('hide');
							} // quando iniciar o novo objeto exibi-lo na tela			
							,deactivate:function(){
	    	  					$(this).find('li').each(function(){
	    	  						$(this).removeClass('hide');
	    	  						$(this).show();
	    	  					});
    	  					}// ao fim, exibe todos os filhos existentes
					}


		//Ativando o DRAG AND DROP
		$( ".WRS_DRAG_DROP_RECEIVER ol").sortable(droppableOptionsOlSortable).droppable(droppableOptionsOl);
			
		sortable_attr_simples_composto();
		
		insetDragDropEmpry();
}
/**
 * Processo principal
 */
 $(function(){
	  
	 //Evento de click para gerar o relatório
	 $('.wrs_run_filter').unbind('click').click(wrs_run_filter);
	 
	 //Api SElect para multiplos cubos
	 $('.wrs_multiple_cube_event').selectpicker();
	 $('.wrs_multiple_cube_event').change(wrs_multiple_cube_event);
	 

	 
	 //Escondendo o container de todos os relatório
	 $('.container_panel_relatorio').hide();
   
	   var receiveActive		=	false;
	   
		   
	   wrs_panel_active_drag_drop();
	   
	   /*
	    * COnfigurando o Contex Menu
	    */
		wrs_contex_menu_options_panel_metrica();
		wrs_contex_menu_options_panel_atributos();
		
 });
 
 
	

 /*
  * TIME PARA O RELOGIO
  */
 var _TIME_RUN_RELATORIO	=	 false;
 var wrs_relatorio_h	=	0;
 var wrs_relatorio_m	=	0;
 var wrs_relatorio_s	=	0;

 function TIME_RUN_RELATORIO()
 {
 	wrs_relatorio_h	=	0;
 	wrs_relatorio_m	=	0;
 	wrs_relatorio_s	=	0;

 	
  
 	_TIME_RUN_RELATORIO	=	 true;
 	setTimeout(TIME_RUN_RELATORIO_CLOCK,1000);
 }

 /**
  * Relotio para cancelamento
  */
 function TIME_RUN_RELATORIO_CLOCK()
 {
 	wrs_relatorio_s++;
 	var tmp_wrs_relatorio_m	=	0;
 	var tmp_wrs_relatorio_h	=	0;
 	
 	if(wrs_relatorio_s>=60){
 		wrs_relatorio_m++;
 		wrs_relatorio_s	= 0;
 		
 	}
 	
 	if(wrs_relatorio_m>=60)
 	{
 		wrs_relatorio_h++;
 		wrs_relatorio_m	=	0;
 	}
 	
 	if(wrs_relatorio_s<10) wrs_relatorio_s = '0'+wrs_relatorio_s;
 	if(wrs_relatorio_m<10) tmp_wrs_relatorio_m = '0';
 	if(wrs_relatorio_h<10) tmp_wrs_relatorio_h = '0';
 	
 	//var time		=	LNG('BTN_CANCEL_CONSULTA')+(tmp_wrs_relatorio_h+wrs_relatorio_h)+':'+(tmp_wrs_relatorio_m+wrs_relatorio_m)+':'+wrs_relatorio_s;
	var time		=	LNG('BTN_CANCEL_CONSULTA')+(tmp_wrs_relatorio_m+wrs_relatorio_m)+':'+wrs_relatorio_s;

 	$('.TIME_RUN_RELATORIO_button').html(time);
 	
 	if(_TIME_RUN_RELATORIO){
 		setTimeout(TIME_RUN_RELATORIO_CLOCK,1000);
 	}
 	
 }
 
 
 /**
  * Carregando o mapa
  * @param object
  */
 function WRS_LOAD_GRAFICO(object)
 {
	 //alert(object);
 }

 