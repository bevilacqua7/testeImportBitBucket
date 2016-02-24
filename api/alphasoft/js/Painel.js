/**
 * Configuração apenas do Jquery Layout
 * 
 * Criado por Marcelo Santos
 * 
 * @link http://layout.jquery-dev.com/demos/custom_scrollbars.html
 */

var qtde_max_linhas			=	15;
var qtde_max_colunas		=	10;
var qtde_max_metricas		=	30;
var LXLX					=	true;


function wrs_north_onresize()
{
	//TOPO
	//alert('wrs_north_onresize');
}



function get_aa()
{
	var html	=	"\n";
	$('head').find('script').each(function(){
		html	+=	'$tag[]		=	array("host"=>"'+$(this).attr('src')+'","access"=>array("main","panel"));'+"\n";
	});
	
	console.log(html);
}

 
function wrs_clean_data(input_default)
{
	_START('wrs_clean_data');
		var object_clean		=	 {
				TYPE_RUN 	:	false,
				IS_REFRESH 	: 	false,
				JOB_RESULT 	: 	null,
				STOP_RUN 	: 	false,
				TYPE_RUN 	: 	null,
				new_aba 	: 	false
		};
	
		
	if(isEmpty(input_default))	
	{
		_END('wrs_clean_data');
		return object_clean;
	}
		
	var call	=	merge_objeto(input_default,object_clean);
	
	
	_END('wrs_clean_data');
	return call;

}




 





function wrs_run_filter_unlocked()
{
	$('.wrs_run_filter').attr('locked','');
}

function wrs_run_filter_add_history(inputHistory)
{

	$('.wrs_run_filter').attr('history',inputHistory);
}


function WRS_MENU_FOOTER(){
	_START('WRS_MENU_FOOTER');
		
		$('.wrs_menu_footer_sub').each(function(){
			$(this).css('top', $(this).outerHeight()*-1);
		});

		$('.wrs_menu_footer li').click(function(event){

			$('.wrs_menu_footer_sub').removeClass('wrs_visible');
			
			$(this).find('.wrs_menu_footer_sub').addClass('wrs_visible');


			$('html').one('click',function() {
				$('.wrs_menu_footer_sub').removeClass('wrs_visible');
			  });
				  event.stopPropagation();
			  
		});
	_END('WRS_MENU_FOOTER');	
}

function wrs_center_onresize()
{
	_START('wrs_center_onresize');
	//BODY
	
	
	var paddinLayoutCenter	=	parseInt($('.ui-layout-center').css('padding-top').replace('px'));
	var heightCenter		=	($('.ui-layout-center').outerHeight()-(paddinLayoutCenter));
	var abaHeight			=	$('.WRS_ABA').outerHeight();
	

	//Redimencionadno a tela do center body
	$('.wrs_panel_center_body').height((heightCenter)-abaHeight);

	
	var divMain					=	 (heightCenter-abaHeight)-45;
	var paddingContainerCenter	=	parseInt($('.container_center').css('padding-bottom').replace('px'));
	
	var navegacao_inside		=	$('.wrs_panel_center_body_container .wrs_nav_relatorio').css({'margin-bottom':15});
	
	
	var divisor_common			=	(((divMain-abaHeight)-paddingContainerCenter)/3);

		//Aplica o resize na tela re RUN onde fica passando os informativos das janelas
		wrs_modal_filter_run();
	
	
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
		_END('wrs_center_onresize');
}






function wrs_west_onresize(pane, $Pane)
{
	_START('wrs_west_onresize');
	/*
	 * 	lado esquerdo
	 */
	//Div principal
	
	var divMain			=	 $('.ui-layout-west');
	var heightBox		=	divMain.outerHeight();
	var offsetHeader 	=	 $('.wrs_panel_esquerdo_header').outerHeight();
	
	var padding 		=	 parseInt($('.wrs_panel_esquerdo_header').css('padding-top').replace('px',''))+parseInt($('.wrs_panel_esquerdo_header').css('padding-bottom').replace('px',''));
	
	heightBox			=	(heightBox-padding) - offsetHeader - offsetHeader;
	
	heightBox			=	heightBox-$('.ui-layout-north').outerHeight();
	
	$('.wrs_panel_esquerdo_drag_drop ol').height(heightBox);
	formata_texto_resultado_filtros();
	_END('wrs_west_onresize');
	
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

function metricas_tool_tip()
{
	$('.metricas-tooltip').each(function(){
		create_tool_tip($(this));
	});
}

function metricas_tool_tip_drag_drop()
{
	$('.sortable_metrica').find('.metricas-tooltip').each(function(){
		create_tool_tip($(this));
	});
}


function create_tool_tip(obj)
{
	var _width	=	250;
		obj.qtip('destroy', true);
	
	if(isEmpty(obj.attr('text_original'))) return true;
	
	obj.qtip({
		content	: 	obj.attr('text_original'),
		style	: 	{                                                     
    	 				width: _width
    	 			//	classes: 'qtip-bootstrap qtip-shadow qtip-filtros'
					},
		position	: 	{
					        at		: 'auto left',
					        adjust	: { x: -_width, y: -2 }
	    				}
     });	
}

// cria o qtip para o objeto em questão (fazer pra cada um, outra alternativa a mandar atualizar o DOM (varrendo um por um))
function bindQtip(obj){
	_START('bindQtip');
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
	_END('bindQtip');
}

//Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function wrs_east_onresize()
{
	_ONLY('wrs_east_onresize');
	//lado direito
	var height	=	$('.ui-layout-east').outerHeight();
	$('.direito_container').height(height-2);
}

function wrs_south_onresize()
{
	//Lado de baixo
	//alert('wrs_south_onresize');
}

 


function hide_east(){
	_ONLY('hide_east');
	wrs_panel_layout.east.pane.css('visibility','hidden');
	wrs_panel_layout.east.pane.hide();
	wrs_panel_layout.hide('east',true);
	return true;
}


var resize_load	=	 function()
{
	$('body').managerJOB('resize');	
}

$( window ).resize(resize_load);

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

	if(getArrPerfUser('DRG')){
		$('div.WRS_ABA ul.nav li.new_file').addClass('hide');
	}
	 
	jqueryLayoutOptions	=	{
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
			
			onresize_end	:	function()
			{//http://layout.jquery-dev.com/demos/complex.html
									_START('onresize_end');
									
									
									resize_load();
									
									
									resize_common();
								_END('onresize_end');	
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
			east__onresize 	: getArrPerfUser('DRG')?hide_east: wrs_east_onresize,
			east__onopen: getArrPerfUser('DRG')?hide_east:function () {
				_START('east__onopen');

											WRS_PANEL_DRAG();
											$('.WRS_DRAG_DROP_RECEIVER_FILTER').show();
											$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
											$('.wrs_panel_filter_icon').show();
											wrsFilterClickFalse();
											
											_END('east__onopen');
										},
			east__onclose: getArrPerfUser('DRG')?hide_east:function () 
			{
				_START('east__onclose');
				//Executa o Click para executar o Gráfico
				var east__onclose	=	$('.wrs_run_filter').attr('east__onclose');
					east__onclose	=	empty(east__onclose) ? false : true;
					
					$('.container_panel_relatorio').show();
					$('.wrs_panel_filter_measure').hide();
					
				if(!east__onclose)
				{
					if($('.wrs_run_filter').attr('locked')!='locked')
					{
						$('.wrs_run_filter').attr('eastonclose','true').attr('flag_load','true');//Pra informar que o clique partir da opção para feixare a tela da direira 
						wrsRunFilter();
					}
				}
				
				
				$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide();
				$('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
				$('.wrs_panel_filter_icon').hide();

				
				$('.wrs_run_filter').removeAttr('east__onclose');
				
				
				_END('east__onclose');
				//Muda visão
			},
			
			//	Inicia com o Lado direito ativado
		    //	east__initClosed: true,
			
			//Desabilita a funcionalidade de abrir os paineis pelo teclado com CTRL+Seta
			enableCursorHotkey	: false,
			slidable			: false
	};

	
	
 


	 wrs_panel_layout	 = 	$('body').layout(jqueryLayoutOptions);
	
//	 $('body').data('wrs_panel_layout',wrs_panel_layout);
	
	wrs_north_onresize('west', wrs_panel_layout.panes.west);
	wrs_west_onresize();
	wrs_east_onresize();
	wrs_south_onresize();
	wrs_center_onresize();

	$('.wrs_clean_box_drag_drop').click(wrs_clean_box_drag_drop);
 
	if(getArrPerfUser('DRG')){ hide_east(); }
});



function layout_east_close(_only_show_progress,is_hide)
{
	_START('layout_east_close');
	var only_show_progress	=	_only_show_progress==undefined ? false : _only_show_progress;
	var report_id			=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
	
	var active_f5			=	$('#wrsConfigGridDefault').attr('f5_ative');
		active_f5			=	active_f5==null ? false :  true;

		
		$('.container_panel_relatorio').show();
		$('.wrs_panel_filter_measure').hide();
		
		
		
		if(active_f5)
		{
			$('#wrsConfigGridDefault').removeAttr('f5_ative');
		}
		
		if(only_show_progress)
		{
			$('.wrs_run_filter').attr('east__onclose','true');
		}
	
		
	if(wrs_panel_layout.state.east.isClosed)
	{
		jqueryLayoutOptions.east__onclose();
		
	}else{
		wrs_panel_layout.close('east');
	}
	
	_END('layout_east_close');
}

function wrs_clean_box_drag_drop()
{
	_START('wrs_clean_box_drag_drop');
	var $this			=	 $(this);
	var type			=	 $this.attr('parent');
	var who_receive		= $this.parent().parent().find('.wrs_panel_receive').attr('who_receive');
	var mensagem		=	"";
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
															$this.parent().parent().parent().find('li').each(function(){
																var not_use		=  $(this).attr('not-use');

																if(empty(not_use)){
																	$(this).remove();
																}
															});
															
															var is_remove	=	 true;
															
															
															$this.parent().parent().parent().find('.WRS_DRAG_DROP_FILTER > h2').each(function()
																{
																		var not_use		=	 $(this).hasClass('hide');
																		
																		if(not_use) {
																			is_remove	=	 false;
																		}else{
																			$(this).remove();
																		}
																		
																}
															);
															
															if(is_remove){
																$this.parent().parent().parent().find('.WRS_DRAG_DROP_FILTER').html('');
															}
															
															$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
														}
														//Zera as opções de Filtro

														$.WrsFilter('setSizeDataFilterClean','all');
														
													}else{
														$this.parent().parent().find('li').each(function(){
															var not_use		=  $(this).attr('not-use');
																if(empty(not_use)){
																	$(this).remove();
																}
																	
															}
														);
													}
													
													insetDragDropEmpry();
													
													DEFAULT_OPTIONS_TOPS();
													WRS_ALERT(mensagem_sucess,'success');
												}
												
												$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
									});
									
									_END('wrs_clean_box_drag_drop');
}





/*
 * Controle do DRAG AND DROP
 */
function btn_right_remove()
{
	_START('btn_right_remove');
	$('.btn-right').unbind('click');
	$('.btn-right').click(function(){

			$(this).parent().parent().find('li').each(function(){count++});
			
			var filterJson		=	$(this).parent().parent().parent();

			if(filterJson.attr('type')=='filtro')
			{
				var vvalue	=	$(this).parent().attr('vvalue');
				
				$('.WRS_DRAG_DROP_FILTER h2').each(function(){
						
					if($(this).attr('vvalue')==vvalue) {
						$(this).remove();
					}
						
				});

			}
			
			$(this).parent().qtip('destroy', true);
			$(this).parent().remove();
			
			
			
			
			insetDragDropEmpry();
			
			DEFAULT_OPTIONS_TOPS();
		
	});
	
	_END('btn_right_remove');
}


function cloneDragDrop(whoClone,toClone,cloneTAGWrsFlag,who_receive)
{
	
 
	

	_START('cloneDragDrop');
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
	
	_END('cloneDragDrop');
}

 

function insetDragDropEmpry()
{
	_START('insetDragDropEmpry');
	var DragValues	=	DragValues_LF	=	[]; // LF=level_full

	$('.wrs_swap_drag_drop').each(function(){
	
		var htmlDefault			=	'<li class="placeholder">'+sprintf(LNG('DRAG_DROP_AREA'),LNG($(this).attr('LNG')))+'</li>';
		var who_receive			=	 $(this).parent().attr('who_receive');
		var count				=	0;
		var notRepeatValueFlag	= 	notRepeatValueFlag_LF	= 	[]; //Contem as informações dentro de cada bloco 
				
		$(this).find('li').each(function(){

				
				
				
				var tag_class	=	$(this).attr('tag-class');
				var get_object	=	$('.ui-layout-pane-east ul').find('.'+tag_class);
				var json		=	get_object.data('wrs-data');
				var level_full	=	tag_class;//md5((typeof json == 'object' && $(json).is('[LEVEL_FULL]'))?json.LEVEL_FULL:'');
				
				
				
				var vvalue			=	$(this).attr('vvalue');

				
				

				//Verificação apra confirmar a remoção de Filtro para linha ou coluna
				if($(this).parent().parent().attr('type')!='filtro')
				{		
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
					if(!isEmpty(level_full))
					{
						if(!$(this).hasClass('.ui-sortable-helper'))
						{
							
							WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_IN_USER_REMOVE'),vvalue),'warning');
							$(this).remove();
						}
					}
				}
				
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
	
	
	_END('insetDragDropEmpry');
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
	_START('wrs_search_drad_drop_direita_h2');
	var type_click	=	$(this).attr('isClick');
	
	if(type_click!='true')
	{
		$(this).parent().find('.wrs_esquerdo_search').remove();
	}
	
	var relClass	=	 '.'+$(this).attr('rel');

		$(relClass).find('.wrs_search_drag_drop_direita_eventos').focus();
		
	$(this).attr('isClick','');
	
	_END('wrs_search_drad_drop_direita_h2');
}

function wrs_search_drag_drop_direita_eventos()
{
	_START('wrs_search_drag_drop_direita_eventos');
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
	_END('wrs_search_drag_drop_direita_eventos');
}




var droppableOptionsOlSortable	=	{};
var droppableOptionsOl			=	{};





/**
 * Evento principal do DRAG DROP
 * @param event
 * @param ui
 * @returns {Boolean}
 */


var TMP_DEFAULT_OPTIONS_TOPS	=	null;


function DROP_EVENT( event, ui ,eventReceive)
{

		_START('DROP_EVENT');
		var toEvent;
		var receiveEvent	=	$(this);
		
		if(event=='DIRECT')
		{
			toEvent			=	ui;
			receiveEvent	=	eventReceive;
			
	//		console.log('ui',ui.data('wrs-data'));
		//	foreach(ui.data('wrs-data'));
		}else{
			toEvent			=	ui.draggable;
		}
		
		if(TMP_DEFAULT_OPTIONS_TOPS!=null)
			{
				clearTimeout(TMP_DEFAULT_OPTIONS_TOPS);
			}
		
		TMP_DEFAULT_OPTIONS_TOPS	=	setTimeout(DEFAULT_OPTIONS_TOPS,500);
		
		var filters			=	receiveEvent.parent().attr('type');
		var who_receive 	=	receiveEvent.parent().attr('who_receive');
		
		var api			=	toEvent.attr('api');
		var cloneTAGWrs	=	toEvent.attr('cloneTAGWrs');
		//Recusa se o DRAG não for da API WRS
		if(api!='wrs') return false;
	
		var value		=	toEvent.attr('vvalue');
		var json 		=	toEvent.data('wrs-data');
		
		
		
		var insert		=	true;

		var typesDraggable		=	toEvent.attr('type');
		var whereFoundReceive	=	$('.wrs_panel_receive_coluna_linha');

		// tratamento para quantidade maxima de opcoes por box de draganddrop
		if(
				(who_receive=='linha' && receiveEvent.find('li').length>=qtde_max_linhas)
				||
				(who_receive=='coluna' && receiveEvent.find('li').length>=qtde_max_colunas)
				||
				(who_receive=='metrica' && receiveEvent.find('li').length>=qtde_max_metricas)
		){
			WRS_ALERT(sprintf(LNG('DRAG_DROP_MSG_ERROX_MAX_QTDE'),receiveEvent.find('li').length,who_receive),'error');
			return false;
		}

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
					
					var tag_class	=	$(this).attr('tag-class');
					var get_object	=	$('.ui-layout-pane-east ul').find('.'+tag_class);
					var json_current=	get_object.data('wrs-data');
															//if(value==$(this).attr('vvalue')) 
															try{
																if(json['UNIQUE_FULL']==json_current['UNIQUE_FULL'])
																{
																	insert=false;
																	if(flag_alert)
																	{
																			WRS_ALERT(sprintf(LNG('DRAG_DROP_FILE_IN_USER'),value),'error');
																			flag_alert=false; //Não repete a mensagem
																	}
																}
															}catch(e){ //pode não existir o UNIQUE_FULL
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
	
	
	//TODO:Removido em 29/01/2016 e inserido na header dessa funcao
	//var json 			=	toEvent.data('wrs-data');
	


//	json['FILTER']	=	null;
	toEvent.data('wrs-data',json);
	
	/*
	var json 			=	$.parseJSON(base64_decode(toEvent.attr('json')));
	json['FILTER']	=	'';
	toEvent.attr('json',base64_encode(json_encode(json,true)));
	*/
	metricas_tool_tip_drag_drop();

	_END('DROP_EVENT');
}









function setDraggable(name,use,who_receive)
{
	_START('setDraggable');
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
	 	var callbk_reativa_button_selected=function(){};
	 	var draggableOptionsLi		=	{
									   	     helper		: "clone",
									   	     cursor		: "move", 
									   	     appendTo	: "body",
									   	     zIndex		: 10000,
									   	     cursorAt	: { top: 10, left: 20 },
									   	     start		: function(e,ui){ 
									   	    	 							if($(ui.helper.context).hasClass('ui-state-focus')){
										   	    	 							$(ui.helper.context).removeClass('ui-state-focus');
										   	    	 							callbk_reativa_button_selected=function(){
										   	    	 									$(ui.helper.context).addClass('ui-state-focus');
										   	    	 							};
									   	    	 							}else{
									   	    	 								callbk_reativa_button_selected=function(){};
									   	    	 							}
									   	    	 						},
									   	     stop		: function(e,ui){
									   	    	 			callbk_reativa_button_selected();
									   	     				}
								   	     };
		 
	
	$( name ).draggable(draggableOptionsLi).sortable({placeholder	: "ui-state-highlight"});
	$( name).disableSelection();
	wrs_panel_layout.allowOverflow($(name));

_END('setDraggable');	
}


function find_relatorio_attributo_metrica(where_find,_values,_clone,_clean)
{
	_START('find_relatorio_attributo_metrica');
	
	if(_clean!=false)
	{
		$(_clone).html('');
	}
	/*
	 * Aplicando quando vier com CLASS
	 */
	

	if(is_array(_values))
	{
		
			for(var x in _values)
			{
				var _class				=	 '';
				var simples_composto	=	false;
				var is_filter			=	'';
				
				
				
				if(substr(_values[x],0,2)=='__')
					{
						
						
						
						if(is_array(_values[x]))
						{
							

								var value	=	_values[x];
							
								_class	=	substr(value[0],2,value[0].length);
							
							if(value[1]=='simples') simples_composto=true;
							

							
								is_filter	=	 isEmpty(value[2]) ? '' : value[2];
							
						}
						else
						{
							_class	=	substr(_values[x],2,_values[x].length);
							
						//	console.log('_class',_class);
						}
						
						
						//var object	=	$(where_find).find('li.'+_class);				 
						//var object	=	$(where_find).find("li:containClass('"+_class+"')"); // alterado para procurar nas classes do objeto (case insensitive)
						var object	=	$(where_find).find("li."+_class); // alterado para procurar nas classes do objeto (case insensitive)

						if(simples_composto)
						{
							object.attr('sc_load','simples');
						}
						else
						{
							object.attr('sc_load','');
						}
				 

		  			if(!isEmpty(is_filter))
						{
							var json 			=	object.data('wrs-data');

							if(json!=null)
							{
								var _tmp_filter		=	typeof is_filter == "object" ? implode(',',is_filter) : is_filter;
								
									object.data('wrs-data',json);
		
							}
								
								
						}
		  			
						DROP_EVENT( 'DIRECT', object,$(_clone));
		
					}
			}
	
	
	}
	
	
	_END('find_relatorio_attributo_metrica');
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
function set_value_box_relatorio(object,clean)
{
	_START('set_value_box_relatorio');
	
	if(clean==undefined)
		{
			$('.wrs_panel_receive').find('li').remove();
			$('.WRS_DRAG_DROP_FILTER').html('');
		}
	

	
	if(isset(object.LAYOUT_ROWS))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR .wrs_panel_options',object.LAYOUT_ROWS,'.sortable_linha',clean);
	}
	
	if(isset(object.LAYOUT_COLUMNS))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR .wrs_panel_options',object.LAYOUT_COLUMNS,'.sortable_coluna',clean);
	}
	
	
	if(isset(object.LAYOUT_FILTERS))
	{
		var _filtros		=	 object.LAYOUT_FILTERS;
		
		_filtros	=	$('body').filterFixed('filtro_fixed_check',_filtros);
		
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_ATTR .wrs_panel_options ',_filtros,'.sortable_filtro',clean);
	}
	
	
	if(isset(object.LAYOUT_MEASURES))
	{
		find_relatorio_attributo_metrica('.WRS_DRAG_DROP_METRICA .wrs_panel_options',object.LAYOUT_MEASURES,'.sortable_metrica',clean);
	}
	
	
	if(clean==undefined)
	{
		$('.WRS_DRAG_DROP_FILTER').html(str_replace('li','h2',$('.sortable_filtro').html()));
	}
	
	
	check_filter_simple_composto();
	

	
	_END('set_value_box_relatorio');
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
	_START('rows_by_metrica_attr_base64');
	var _flag		=	false;
	var _request	=	[];
	var _info_save	=	[];
	

	$(object).find('li').each(function(){
		
		//Foi incrementado a TAG  tag_class e get_object para resolver o problema de acentuação
		var tag_class	=	$(this).attr('tag-class');
		var get_object	=	$('.ui-layout-pane-east ul').find('.'+tag_class);
		
		

		
		//console.log(get_object.data('wrs-data'));
		var json		=	get_object.data('wrs-data');//$.parseJSON(base64_decode(get_object.attr('json')));

		
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
	
	_END('rows_by_metrica_attr_base64');
	return {flag:_flag,request:implode(',',_request)};
}
/*
function stop_job_timeout(report_id)
{
	$('body').managerJOB('reload_job',{'report_id':report_id});    	
}*/
/**
 * 
 * Evento do click do Botão para executar o Relatório
 * 
 * 
 */
function wrs_run_filter()
{ 
	_START('wrs_run_filter');
 
	var manager_aba			=	$(this).attr('manager_aba');
		manager_aba			=	empty(manager_aba) ? false : true;
		$(this).removeAttr('manager_aba');
	
	var status_load			=	$(this).attr('status_load');
		status_load			=	empty(status_load) ? false : true;
		
		
	var noactive			=	$(this).attr('noactive');
		noactive			=	empty(noactive) ? false : true;
	
	var aba_active			=	get_aba_active_object();
	var report_KendoUi		=	aba_active.wrsAbaData('getKendoUi');
	var history				=	aba_active.wrsAbaData('getHistory');
	var _report_id			=	report_KendoUi['REPORT_ID'];
	var get_active_aba_data	=	get_aba_active();
	
	
	//Verificando se existe informações nas linhas se não existir informações nas linhas assumo que seja uma nova aba que está sendo executada
	//Ao detectar insere o * para informar que a aba falta ser salva
	if(isEmpty(get_active_aba_data.history))
		{
			if(isEmpty(get_active_aba_data.data.LAYOUT_MEASURES))
			{
				aba_active.wrsAbaData('setEnableChange',true);
				aba_active.wrsAbaData('aba_detect_change');
			}

		}
	
	
	
	var _filtro_size		=	$('.sortable_filtro').find('li');
	
	
	find_and_hide_container(_report_id);
	
	if(_filtro_size.length==1)
	{
		_filtro_size = _filtro_size.hasClass('placeholder')==true ? false : true;
	}else if(_filtro_size.length==0)
	{
		_filtro_size	=	 false;
	}else{
		_filtro_size	=	 true;
	}
	
	
	
	//Se não existir filtro então fecha a aba de filtros
	if(_filtro_size==false)
	{
		wrs_panel_layout.close('west');
	}else{
		wrs_panel_layout.open('west');
	}
		

	if(aba_active.wrsAbaData('get_change_aba')==true)
		{
			aba_active.wrsAbaData('set_change_aba',false);	
			configure_options_show_grid($(this));
			
			_END('wrs_run_filter 1');
			
			aba_active.wrsAbaData('setKendoUi',{STOP_RUN:false});
			
			panel_open_by_time_out(_report_id);
			
			
			
			delete aba_active;
			delete report_KendoUi;
			delete history;
			delete _filtro_size;
			
			return true;
		}
	
		
		
		
		
		
		if(noactive)
		{
			$(this).removeAttr('noactive');
			//stop_job_timeout(_report_id);
			_END('wrs_run_filter 2');
			
						delete aba_active;
			delete report_KendoUi;
			delete history;
			delete _filtro_size;

			
			return true;
		}
	
		
	$(this).attr('locked','locked');
		
	//Para poder saber se oculta as mensagems ou não
	$('.wrs_panel_center_body').attr('index-visible',$('.wrs_panel_center_body').css('display'));
	
	
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
	var getAllFiltersToRun	=	"";
	
	
		
	
	//Se existir o job em execução desse mesmo report id então faz o cancelamento
	if(job_exist(report_KendoUi.REPORT_ID))
	{
		//click_stop_job();
		WRS_ALERT(LNG('CONSULTA_ATIVA_CANCELAR'),'warning');
		
			delete aba_active;
			delete report_KendoUi;
			delete history;
			delete _filtro_size;
			delete sortable_metrica;
			delete sortable_linha;
			delete sortable_coluna;
			delete sortable_filtro;
			delete request_metrica;
			delete request_linha;
			delete request_coluna;
			delete request_filtro;
			
		return true;
	}
	
	
	//Ao navegar pelas abas essa função impede que seja executada mesmo se tiver aoteração a alteração só será efetivada ao mandar executar
	try{
		
		if(report_KendoUi.STOP_RUN==true)
		{
			aba_active.wrsAbaData('setKendoUi',{STOP_RUN:false});
			configure_options_show_grid($(this));
			//stop_job_timeout(_report_id);
			
				delete aba_active;
			delete report_KendoUi;
			delete history;
			delete _filtro_size;
			delete sortable_metrica;
			delete sortable_linha;
			delete sortable_coluna;
			delete sortable_filtro;
			delete request_metrica;
			delete request_linha;
			delete request_coluna;
			delete request_filtro;
			
			_END('wrs_run_filter 3');
			
			return true;
		}
	}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
	
	
	var demo_top	=	'';
	
	if(!empty($('.wrsGrid').html()))
	{
		demo_top	=	report_KendoUi;
	}
 
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
						
						$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
			
						//manda executar o Relatório
						if($(this).attr('is_atributo_simples')!='true')
						{//Apenas abre o load se for diferente de informações simples no select
							if($(this).attr('eastonclose')!='true')
							{
								if(empty(history))
								{
									$(this).attr('flag_load','true');
									flag_load	=	'true';
								}
							}
						} 
						
					WRS_PANEL_RELATORIO();
					
					var _file	=	'WRS_PANEL';
					var _class	=	'WRS_PANEL';
					var _event	=	'load_grid_header';
					
					var _param_request	=	{};
					var wrs_data_param	=	{FILTER_TMP:null,LAYOUT_FILTERS:null,LAYOUT_MEASURES:null,LAYOUT_COLUMNS:null,LAYOUT_ROWS:null};
					var _base64			=	'';
					
					//Pegando as informações já pre estabelecidas pelo gráfico atuak
					var is_param		=	false;
					
					
					
					
					//Buscando a Grid para poder pegar as  opções selecionadas
					if(!empty($('.wrsGrid').html()))
					{
						var _wrsGrid	=	$('.wrsGrid');
						var __id		=	'#'+_wrsGrid.attr('id');
						var _rand		=	 js_rand(0,99999);
							
						try{
							if(empty(report_KendoUi.TYPE_RUN))
							{
								report_KendoUi['TYPE_RUN']=TYPE_RUN.direct;
							}
						}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
							is_param		=	true;
					}
					
					
					//Gravando informações do MLC para a primeira consulta
					aba_active.wrsAbaData('set_first_MLC',{line:request_linha,column:request_coluna, measure:request_metrica});
					
					
					wrs_data_param.LAYOUT_ROWS		=	base64_encode(implode(',',request_linha));
					wrs_data_param.LAYOUT_COLUMNS	=	base64_encode(implode(',',request_coluna));
					wrs_data_param.LAYOUT_MEASURES	=	base64_encode(implode(',',request_metrica));
					
					
							//Força a conversão do Menu 
							wrsFilterShow();
							
					
					

							//Se for drill então não insere os filtros
							if(isEmpty(report_KendoUi['DRILL_HIERARQUIA_LINHA_DATA'])) 
							{
								getAllFiltersToRun				=	$.WrsFilter('getAllFiltersToRun');
								
								
								
								
								
								wrs_data_param.LAYOUT_FILTERS	=	base64_encode(getAllFiltersToRun.data);
								wrs_data_param.FILTER_TMP		=	base64_encode(json_encode(getAllFiltersToRun.full));
								
								if(report_KendoUi['TYPE_RUN']==TYPE_RUN.coluna_header)//Apenas executa quando for clique por DILLColuna
								{
									wrs_data_param.ALL_ROWS					=	1;
									wrs_data_param.DRILL_HIERARQUIA_LINHA	=	1;
								}

								//Salva na aba a nova estrutura
								aba_active.wrsAbaData('setWrsData',{
																			LAYOUT_FILTERS			:	wrs_data_param.LAYOUT_FILTERS	, 
																			FILTER_TMP				:	wrs_data_param.FILTER_TMP		, 
																			index_filtro			:	getAllFiltersToRun.index		,
																			ALL_ROWS				:	1,
																			DRILL_HIERARQUIA_LINHA	:	1
																	}
													);
							}
							
							

					
					//		console.log('filter',getAllFiltersToRun.data);
					//		console.log('tmp',getAllFiltersToRun.full);
					
					var wrsConfigGridDefault_data	=	get_aba_active_kendoUi()
					
					
					//Merge com a estrutura da aba
					 _param_request		=	array_concat(wrs_data_param,report_KendoUi);
					
					 
					//Passando o ID do Cubo na sessão
					var _wrs_multiple_cube_event	=	$('.wrs_multiple_cube_event').find('option').length;
					
					//Verificando se existe multiplos cubos
					if(_wrs_multiple_cube_event==1 || empty(_wrs_multiple_cube_event))
					{	
						//Caso não seja multiplo cubo pega o cubo corrente
						_param_request[TAG_URL_CUBE_SELECTED]=CUBE_S;
					}else{
						var jsonMukltiple			=	$('.wrs_multiple_cube_event').find('option:selected').attr('json');
						_param_request['json']		=	jsonMukltiple;
					}
					
					
					/*
					 * Verificnado os Filtros simples
					 * nesse caso inpede o fluxo completo
					 */
					if(!$.WrsFilter('wrs_check_filter_simples')) {
						
						$('body').wrsAbas('remove_event_click');
						//stop_job_timeout(_report_id);
						
						delete aba_active;
						delete report_KendoUi;
						delete history;
						delete _filtro_size;
						delete sortable_metrica;
						delete sortable_linha;
						delete sortable_coluna;
						delete sortable_filtro;
						delete request_metrica;
						delete request_linha;
						delete request_coluna;
						delete request_filtro;
						delete wrs_data_param;
						delete getAllFiltersToRun;
						delete wrsConfigGridDefault_data;
						delete _param_request;

						_END('wrs_run_filter 4');
						
						return false;
						

					}
					
					
			 
					

					var is_wrs_change_to	=	is_wrs_change_to_run(	_param_request,
																		manager_aba,
																		_param_request['REPORT_ID'],
																		base64_encode(getAllFiltersToRun.only_compare));
						_param_request		=	{};
						_param_request		=	is_wrs_change_to.val;
						
						
					if(is_wrs_change_to.status)
					{
						if($('#'+_report_id).length!=0)
						{
							configure_options_show_grid($(this));
							//stop_job_timeout(_report_id);
							delete aba_active;
							delete report_KendoUi;
							delete history;
							delete _filtro_size;
							delete sortable_metrica;
							delete sortable_linha;
							delete sortable_coluna;
							delete sortable_filtro;
							delete request_metrica;
							delete request_linha;
							delete request_coluna;
							delete request_filtro;
							delete wrs_data_param;
							delete getAllFiltersToRun;
							delete wrsConfigGridDefault_data;
							delete _param_request;
							delete is_wrs_change_to;

							_END('wrs_run_filter 5');
							return true;
						}
		}else{
			if(flag_load!='true')
			{
				$(this).attr('flag_load','true');
				
				
			}
		}
		
					//Ajustando ABAS HTML	
					
					$('.WRS_DRAG_DROP_RECEIVER_FILTER').hide();
					$('.WRS_DRAG_DROP_FILTER_CONTAINER').show();
					$('.wrs_panel_filter_icon').hide();
				
					//Libero a configuração das janelas 
					wrsConfigGridDefaultManagerTopOptions();
		
		
		

					$('body').wrsAbas('remove_event_click');
		
		if(status_load)
		{

			$('.wrs_run_filter').removeAttr('status_load');
			//stop_job_timeout(_report_id);
			
							delete aba_active;
							delete report_KendoUi;
							delete history;
							delete _filtro_size;
							delete sortable_metrica;
							delete sortable_linha;
							delete sortable_coluna;
							delete sortable_filtro;
							delete request_metrica;
							delete request_linha;
							delete request_coluna;
							delete request_filtro;
							delete wrs_data_param;
							delete getAllFiltersToRun;
							delete wrsConfigGridDefault_data;
							delete _param_request;
							delete is_wrs_change_to;
							
			_END('wrs_run_filter 6');
			return true;
		}
		
		//chave para cancelar o o resultado do job
		_param_request['KEYS']	=	 _param_request['REPORT_ID']+'_'+js_rand(0,9999999999999);
		
		
		
	//É necessário zerar essas funções para que não mande recriar novamente a estrutura de deill
		
		
		var data_header_drill_column	=	report_KendoUi.DRILL_HIERARQUIA_LINHA_DATA_HEADER;

		
		if(report_KendoUi.TYPE_RUN!='DrillColuna')
		{
			data_header_drill_column							=	'';
			_param_request.DRILL_HIERARQUIA_LINHA_DATA_HEADER	=	null;
		}
		
		
		$('.WRS_ABA').find('.active').wrsAbaData('setKendoUi',
																{
																	DRILL_HIERARQUIA_LINHA_DATA_MINUS	:	null, 
																	DRILL_HIERARQUIA_LINHA_DATA			:	null,
																	DRILL_HIERARQUIA_LINHA_DATA_HEADER	: 	data_header_drill_column,
																	TYPE_RUN							:	null,
																	MKTIME_HISTORY						:	null,
																	KEYS								:	_param_request['KEYS'],//Chave para cancelamento
																	JOB_RESULT							:	null 	//Apagando a estrutura de JOB Result caso seja selecionando,
																}
												);
		
		
		
		$('body').managerJOB('start_job',{report_id:_param_request['REPORT_ID'],title_aba:_param_request['TITLE_ABA'], 'mktime':mktime(), type_run: _param_request['TYPE_RUN'], KEYS : _param_request['KEYS']});
		
	
		
		try{
			if(report_KendoUi['MKTIME_HISTORY']!=null)
			{
				_param_request['MKTIME_HISTORY']	=	report_KendoUi['MKTIME_HISTORY'];
			}
		}catch(e){
			if(IS_EXCEPTION) console.warn(' exception');
			_param_request['MKTIME_HISTORY']	=	null;
		}
		
		
		
		
	
		
		if( _param_request['TYPE_RUN']!='DrillColuna')
		{
			aba_active.wrsAbaData('aba_detect_change');
			aba_active.wrsAbas('resize_aba');
		}
		
		
		clean_filters();
		
		//Apenas éexecutando quando existe atributo simples
		if($('.wrs_run_filter').attr('is_atributo_simples')=='true')
		{
			$(".WRS_DRAG_DROP_FILTER").attr('is_atributo_simples',false);
			$('.wrs_run_filter').attr('is_atributo_simples',false);
		}
		
		
		//console.log('_param_request',_param_request);
		runCall(_param_request,_file,_class,_event,MOUNT_LAYOUT_GRID_HEADER,'modal');		
		
		//AUTO LOAD
		if($(this).attr('auto_load')=='true')
		{
			//$(ABA_TAG_NAME).wrsAbas('auto_load',$(this).data('auto_load_data'),true);
		}
		
		$('.wrs_run_filter').attr('east__onclose','true');
		layout_east_close(false,true);
		//wrs_panel_layout.close('east');
		
		$('.wrs_panel_center_body').hide();
		$('.wrs_panel_filter_icon').hide();
		
		
	}
	else
	{
			//wrs_panel_layout.open('east');
		
			$('body').wrsAbas('remove_event_click');
			
			//Falta informações para executar o relatório
			//stop_job_timeout(_report_id);
			
			if(!manager_aba)
			{
				WRS_ALERT(sprintf(LNG('RUN_RELATORIO_FALTA_INFORMACAO'),mensagem),'error');
			}
			
			panel_open_by_time_out(_report_id);
			//END
			
	}
	
	delete aba_active;
	delete report_KendoUi;
	delete history;
	delete _filtro_size;
	delete sortable_metrica;
	delete sortable_linha;
	delete sortable_coluna;
	delete sortable_filtro;
	delete request_metrica;
	delete request_linha;
	delete request_coluna;
	delete request_filtro;
	delete wrs_data_param;
	delete getAllFiltersToRun;
	delete wrsConfigGridDefault_data;
	delete _param_request;
	delete is_wrs_change_to;
	
	_END('wrs_run_filter 7');
	
}

function panel_open_by_time_out(_report_id)
{
	
	//SEt Time OUt
/*	var options_resize = {
			'_report_id'    	: _report_id,
		  resize: function( event ) 
		  {
*/
				//FAzendo com que se não tiver contedúdo reabra a janela
				if($('#'+_report_id+'Main').length==0)
				{
					if(wrs_panel_layout)
					{
						wrs_panel_layout.open('east');
					}
				}
			/*	
		  }
		};

var time_out 	= $.proxy( options_resize.resize, options_resize );


	setTimeout(time_out,50);
*/	
	
}

function configure_options_show_grid(that)
{
	_START('configure_options_show_grid');
	if(that.attr('is_atributo_simples')=='true')
	{
		that.attr('is_atributo_simples','false');
	}
	
	that.attr('locked',false);//Libera o filtro
	that.attr('flag_load','false');
	
	$('body').wrsAbas('show_grid');
	
	$('body').wrsAbas('remove_event_click');
	_END('configure_options_show_grid');
}



function wrsRunGridButton(param_request)
{
	TRACE_DEBUG('wrsRunGridButton função removida');
	/*
		var _file	=	'WRS_PANEL';
		var _class	=	'WRS_PANEL';
		var _event	=	'load_grid_header';
		
			MODAL_LOADING_WRS_PANEL();
			runCall(param_request,_file,_class,_event,MOUNT_LAYOUT_GRID_HEADER,'modal');	
			*/
}



/**
 * Montando a Grid com header
 * @param dataWRS_CONFIRM
 */
function MOUNT_LAYOUT_GRID_HEADER(data,is_job_call)
{

	if(isEmpty(data))
	{
		WRS_CONFIRM(LNG('DATABASE_NOT_CONECTED'),'error',function(data){
			SYSTEM_OFF	=	true;
				window.location	= "./login.php";
		},true);
		
		return false;
	}
	
	try{
		if(data.error_job==true)
			{
						$('.'+data.REPORT_ID).wrsAbaData('setKendoUi',{STOP_RUN:false});
						WRS_ALERT(data.error,'error');
						$('body').managerJOB('error_html',{report_id:data.REPORT_ID,msg:data.error});
						$('body').managerJOB('setMessengerWindow',{kendoUi:$('.'+data.REPORT_ID).wrsAbaData('getKendoUi'),messenger:data.error});
						
						return false;
			}
	}catch(e){}
	
	
	_START('MOUNT_LAYOUT_GRID_HEADER');
	
	if(is_job_call!='ThreadMainLoadData')
	{
		if(is_array(data))
		{
			//Força o inicio do JOB Nesse ponto
			if($('body').managerJOB('exist_job_render',{report_id:data.REPORT_ID,force_loop_job:true}))
			{
				_END('MOUNT_LAYOUT_GRID_HEADER not in JOB');
				delete data;
				return true;
			}
			
		}else{
			if(IS_TRACE)
			{
				console.log('MOUNT_LAYOUT_GRID_HEADER',data);
			}
		}
	}
	
	


	
	/*
	 * WARNING: é essa variável que impede de repetir os conteiners
	 */
	var remove_report	=	 $('<div/>',{html:str_replace('script','',data)}).find('.container_panel_relatorio_rows').attr('id'); 
	var _report_id		=	 str_replace('Main','',remove_report);
	
	var aba_active		=	get_aba_active_kendoUi();
	var aba_ativa		=	aba_active.REPORT_ID;
	
	
	
	
	
		if(_report_id!=undefined && _report_id!='undefined')
		{
			$('.'+_report_id).wrsAbaData('setKendoUi',{STOP_RUN:false});
			
		}
	
	$('.container_panel_relatorio_rows').each(function(){var id_remove	=	 $(this).attr('id'); if(id_remove==remove_report)	$(this).remove();});
	
	
	
	var tmp_div_reports	=	$('#'+remove_report);
	var msg_error		=	tmp_div_reports.attr('rel');
	var keys			=	tmp_div_reports.attr('keys');
	
	

	
	var getKeys		=	$('body').managerJOB('getKeys');

	try{
			
			if(getKeys[keys]==_report_id)
			{
				console.log('Não recebe os dados pois foram cancelados');
				$('body').managerJOB('setKeys',keys,null);//Apagando keys
				
				delete remove_report;
				delete data;
				delete aba_ativa;
				delete tmp_div_reports;

				return true;
			}
			
	}catch(e){
		
	}
	
	
	
	$('.container_panel_relatorio').append(data);
	
	
	//Se não for a aba ativa então faz o hide nbo HTML 

	find_and_hide_container(aba_ativa);
	
	 
		if(_report_id!=undefined && _report_id!='undefined')
		{
			//Apagando os filtros a ser adicionados
			$('.'+_report_id).wrsAbaData('setNewFilter',{tag:null});
			
		}
		
		
		$('#'+aba_ativa+'Main').removeClass('hide');
	
		var is_active	=	 true;
		if(aba_ativa!=_report_id)
		{
			$('.wrsGrid').removeClass('wrsGrid');
			is_active	=	 false;
		}else{
			//Se o retorno for do mesmo ID que estiver ativo então fecha a janela
			$( ".WRS_DRAG_DROP_FILTER" ).accordion( "option","active",false ).accordion( "refresh");
			
			var aba_active		=	get_aba_active_kendoUi();
			var aba_ativa		=	aba_active.REPORT_ID;

			changeIDWindowDRag(aba_ativa,aba_active.TITLE_ABA);
			
		}	
		
		
		if(msg_error=='error')
		{
			var body_html_error		=	tmp_div_reports.find('div').html();
			
			$('body').managerJOB('error_html',{report_id:_report_id,msg:body_html_error});
			
			delete body_html_error;
			
		}else{
			
			$(ABA_TAG_NAME).wrsAbas('refresh',$('.'+_report_id).wrsAbaData('getKendoUi'));
			
		}
		
	
	
	
	
	$('.wrs_run_filter').attr('locked','false').attr('flag_load','false');
	
	
	$(window).resize();
	
	delete remove_report;
	delete data;
	delete aba_ativa;
	delete tmp_div_reports;

				
	_END('MOUNT_LAYOUT_GRID_HEADER');
}



/*
 * TODO: Corrigir a janela de load
 */
function MODAL_LOADING_WRS_PANEL(_title,_text_body,_class_button)
{
	TRACE_DEBUG('Função Removida::MODAL_LOADING_WRS_PANEL');
}

/**
 * Fechando o Load do Carregamento do Relatório
 */
function CLOSE_LOAD_RELATORIO()
{
	 $('.TIME_RUN_RELATORIO_button').attr('whoCancel','system').trigger('click');
}





function find_and_hide_container(aba_ativa)
{
	_START('find_and_hide_container');
	
	$('.container_panel_relatorio_rows').each(function(){
		
		var _report_id_local		=	 str_replace('Main','',$(this).attr('id'));
		
		if(aba_ativa!=_report_id_local){
			$(this).addClass('hide');
		}
		
	});
	
	_END('find_and_hide_container');
}


function find_and_hide_container_auto()
{
	_START('find_and_hide_container_auto');
	var aba_ativa		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
	
	find_and_hide_container(aba_ativa);
	
	_END('find_and_hide_container_auto');
	
}



function wrs_panel_active_drag_drop()
{
	_START('wrs_panel_active_drag_drop');
	 //Ativando o click do Pesquisar dentro do DREAG
	// $('.wrs_search_drad_drop_direita').click(wrs_search_drad_drop_direita);
	 wrs_search_drag_drop_direita_eventos();
	 //Iniciando o Evento de Arrastar
	 setDraggable(".WRS_DRAG_DROP li",false,'');
	 
	 
	 /*
	  * Detectando quando há modificações
	  * @Link http://stackoverflow.com/questions/15657686/jquery-event-detect-changes-to-the-html-text-of-a-div
	  */	 
/*	 $('.sortable_metrica,.sortable_linha,.sortable_coluna,.sortable_filtro').bind("DOMNodeInserted DOMNodeRemoved",function(){
		 aba_detect_change();
	 });*/
	 
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
	
		var ultimo_index_sel=pai_original=pai_final=pai_inicial=houve_mudanca='';
		var droppableOptionsOlSortable	=	{
					      items				: "li:not(.placeholder)",
					      placeholder		: "ui-state-highlight",
					      zIndex			: 9999,
					      forcePlaceholderSize: true,
					      opacity			: 0.8,
					      tolerance			: "pointer",
					      scrollSensitivity	: 10,
					      cursorAt			: { left: 20,top: 10 },
					      stop				:function(e,ui) { 	
								insetDragDropEmpry();  
								sortable_attr_simples_composto();
								
								// volta ao position original do objeto que tranca o draganddrop dentro da div pai do em questao
								$('.wrs_panel_center_body_container').css({position: 'relative'});
								
								// como o botao em drag estava com o status hover forcado, volta ao status normal dele (mouseout) apos soltar o clique
								$(ui.item).unbind('mouseout').trigger("mouseout");
								
								// mostrar ou nao o icone de menu quando estiver no painel de filtros
								if($(ui.item).find('span.wrs_tops_configure').length != 0 && $(ui.item).parents('div.ui-layout-pane').hasClass('ui-layout-pane-center')){
									$(ui.item).find('span.wrs_tops_configure').show();
								}else{
									$(ui.item).find('span.wrs_tops_configure').hide();
								}
						  }	
						  ,start:function(e,ui){							  
							  	// ao iniciar o drag, verifica se o mouse sai de cima do objeto (mouseout) e forca o estado do hover para continuar 
							  	// acima dos elementos, tambem forca a acao de hover dos paineis, necessarios para manter o correto funcionamento 
							  	// visual do botao enquanto permanecer no draganddrop!
							  	$(ui.item).trigger("mouseover").on('mouseout',function(){ 
							  																$(this).trigger("mouseover"); 
							  																force_show_drag_on_drop($(this).parents('div.ui-layout-pane').hasClass('ui-layout-pane-center'));
							  															});
							  	
							  	// forca um position menor restritivo para que o botao em drag nao seja ocultado pelo elemento div pai
							  	$('.wrs_panel_center_body_container').css({position: 'inherit'});
						  }
						  // tratamento para quantidade maxima de opcoes por box de draganddrop
						  ,receive: function(e,ui) {
					            var $this = $(this);
					            var who_receive = $(this).parent().attr('who_receive');
								var qtde_in_who_receive	=	$this.children('li.ui-sortable').length-1;//-1 por causa do placeholder

								if(
										(who_receive=='linha' && qtde_in_who_receive>=qtde_max_linhas)
										||
										(who_receive=='coluna' && qtde_in_who_receive>=qtde_max_colunas)
										||
										(who_receive=='metrica' && qtde_in_who_receive>=qtde_max_metricas)
								){
									WRS_ALERT(sprintf(LNG('DRAG_DROP_MSG_ERROX_MAX_QTDE'),qtde_in_who_receive,who_receive),'error');
									$(ui.sender).sortable('cancel');
								}
								
					        }
					}

		//Ativando o DRAG AND DROP
		$( ".WRS_DRAG_DROP_RECEIVER ol").sortable(droppableOptionsOlSortable).droppable(droppableOptionsOl);
			
		sortable_attr_simples_composto();
		
		insetDragDropEmpry();
		_END('wrs_panel_active_drag_drop');
}

// funcao para identificar qual é o painel pai de origem e destino do drag em seleção, para efetuar o mouseover/mouseout correspondente e
// exibir corretamente o botao em drag enquanto está sendo reposicionado entre os paineis na tela
function force_show_drag_on_drop(painel_origem,count){
	_START('force_show_drag_on_drop');
	_count = (count==undefined)?0:count;
	if(_count>=0 && _count<5){ // tentativas necessarias para que o browser acabe de processar o mouseout e reconheca que deva reajustar os focos dos paineis envolvidos no drag
		window.setTimeout(function(){ 
			$('.ui-layout-pane-west').trigger(((painel_origem)?"mouseout":"mouseover")); 
			$('.ui-layout-pane-center').trigger(((!painel_origem)?"mouseout":"mouseover"));
			var __count=_count+1;
			force_show_drag_on_drop(painel_origem,__count);
		},20); 
	}
	_END('force_show_drag_on_drop');
}

/**
 * Processo principal
 */
 $(function(){
	 _START('wrs_panel.js Enable CLick');
	  
	 //Evento de click para gerar o relatório
	 $('.wrs_run_filter').unbind('click').click(wrs_run_filter);
	 
	 var wrs_multiple_cube_event_class	=	$('.wrs_multiple_cube_event');
	 //Api SElect para multiplos cubos
	 wrs_multiple_cube_event_class.selectpicker();
	 
	 
	 var val	=	wrs_multiple_cube_event_class.find('option:selected').val();
	 

	 wrs_multiple_cube_event_class.data('wrsParan',{'val':val,type_event:false});
	 wrs_multiple_cube_event_class.change(wrs_multiple_cube_event);
	 
	 //Escondendo o container de todos os relatório
	 $('.container_panel_relatorio').hide();
   
	   var receiveActive		=	false;
	   
		   

		   wrs_panel_active_drag_drop();
	   
	   /*
	    * COnfigurando o Contex Menu
	    */
		wrs_contex_menu_options_panel_metrica();
		wrs_contex_menu_options_panel_atributos();
		_END('wrs_panel.js  Enable CLick');
 });
 
 
 
 
 /**
  * Carregando o mapa
  * @param object
  */
 function WRS_LOAD_GRAFICO(object)
 {
	 //alert(object);
 }

 
 
function wrs_modal_filter_run()
{
	_START('wrs_modal_filter_run');
	 var div_center = 	$('.ui-layout-center');
	 var offset 	= 	div_center.offset();
	 var WRS_ABA	=	$('.WRS_ABA');
	 var _css		=	{
	 						left	:	offset.left, 
	 						top		:	offset.top,
	 						width	:	div_center.outerWidth(),
 							height	:	div_center.outerHeight()-(WRS_ABA.outerHeight()+1),
 							position:	'absolute'
	 					};
	 
	 	$('.wrs-modal-filter-run').css(_css);
		
	_END('wrs_modal_filter_run');	
}
 
var tecla_shift_press=false;
$(function(){
	acoes_multiplas_menu_painel();
	$(document).keydown(function(e){
		if(e.keyCode==16){
			tecla_shift_press=true;
		}
	}).keyup(function(e){
		if(e.keyCode==16){
			tecla_shift_press=false;
		}
	});
});

function acoes_multiplas_menu_painel()
{
	_START('acoes_multiplas_menu_painel');
	$('.wrs_panel_options li.ui-draggable.ui-widget-content').each(function(){
		$(this).click(function(){
			if($(this).hasClass('ui-state-focus')){
				$(this).removeClass('ui-state-focus');
			}else{
				$(this).addClass('ui-state-focus');				
				// regra para utilizar o shift (ja identificado na funcao acima) para verificar as seguintes regras:
				// - se o shift estiver pressionado
				// - se a diferenca entre os itens for maior que 1 (tiver algum item entre eles)
				// - ENTAO:
				// - seleciona os itens dentro do intervalo do primeiro ao último selecionado
				if(
						//$(this).parent().find('li.ui-draggable.ui-state-focus').length==2 && // regra antiga para funcionar com apenas 2 itens
						tecla_shift_press
				){
					var primeiro_item 			= $(this).parent().find('li.ui-draggable.ui-state-focus').first();
					var segundo_item 			= $(this).parent().find('li.ui-draggable.ui-state-focus').last();
					var primeiro_item_index 	= $(this).parent().find('li.ui-draggable').index(primeiro_item);
					var segundo_item_index 		= $(this).parent().find('li.ui-draggable').index(segundo_item);					
					if(segundo_item_index-primeiro_item_index>1){
						for(var o=primeiro_item_index+1;o<segundo_item_index;o++){
							if(!$(this).parent().find('li.ui-draggable').eq(o).hasClass()){
								$(this).parent().find('li.ui-draggable').eq(o).addClass('ui-state-focus');
							}
						}
					}
				}
			}
			confere_se_existe_menu_panel_selecionado($(this).parents('div.wrs_panel_options'));
		});
	}); 
	_END('acoes_multiplas_menu_painel');
}

function confere_se_existe_menu_panel_selecionado(painel){

	_START('confere_se_existe_menu_panel_selecionado');
	var qtde_selecionados 			= painel.find('li.ui-draggable.ui-state-focus').length;
	var _s							= qtde_selecionados>1?'s':'';
	var _ns							= qtde_selecionados>1?'ns':'m';
	
	var menu_painel 				= $('<div/>').addClass('menu_selecionados_painel_filtros').css(
			{
				'width'				: '100%',
				'height'			: '40px',
				'background-color'	: '#ddd',
				'margin-bottom'		: '5px',
				'margin-top'		: '-20px',
				'display'			: 'none'
			});

	var botao_ver_selecionados		= $('<div/>')
										.css(
												{
													'width'		:	'33%',
													'padding'	:	'12px'
												}
											)
										.addClass('btn btn-color-write btn-success')
										.append(
												$('<i/>').addClass('glyphicon glyphicon-ok-circle color_write')
											/*	,$('<span/>').addClass('qtde_sel').css(
														{
															'font-size'		: '15px',
															'padding-left'	: '5px'															
														}
												)
											*/
										)
										.click(action_button_ver_itens_selecionados_nos_filtros)
										;	

	var botao_limpa_selecionados	= $('<div/>')
										.css(
												{
													'width'		:	'33%',
													'padding'	:	'12px'
												}
											)
										.addClass('btn btn-color-write btn-danger')
										.append(
												$('<i/>').addClass('glyphicon glyphicon-remove-circle color_write')
											/*	,$('<span/>').addClass('qtde_sel').css(
														{
															'font-size'		: '15px',
															'padding-left'	: '5px'															
														}
												)
											*/
										)
										.click(limpa_botoes_selecionados_filtros)
										;	
	
	var botao_qtde_selecionados	= $('<div/>')
										.css(
												{
													'width'			:	'34%',
													'padding'		:	'12px',
													'text-align'	:	'center'
												}
											)
										.addClass('btn-group ui-state-focus')
										.append(
												$('<span/>').addClass('qtde_sel').css(
														{
															'font-size'		: '15px'															
														}
												)
										)
										;	
	
	menu_painel.append(botao_ver_selecionados,botao_qtde_selecionados,botao_limpa_selecionados);
	

	if(qtde_selecionados>0){
		if(painel.find('.menu_selecionados_painel_filtros').length<=0){
			menu_painel.insertAfter(painel.find('.wrs_drag_direita_find')).slideDown();
		}
		painel.find('div.menu_selecionados_painel_filtros div span.qtde_sel').html(qtde_selecionados);
		painel.find('div.menu_selecionados_painel_filtros div.btn-success').attr('title',LNG('FILTER_CONTEX_MENU_SELECTION_VIEW').replace('%s',_s).replace('%ns',_ns)).qtip(
										{
										         content: $(this).attr('title'),
											     style: {
											     	 classes: 'qtip-bootstrap qtip-shadow'
											     },
												 position: {
													 //at: 'left',
													 my: 'top right',
											          target: 'mouse', // Track the mouse as the positioning target
											          adjust: { x: 10, y: 10 } // Offset it slightly from under the mouse
											      }
										});

		painel.find('div.menu_selecionados_painel_filtros div.btn-danger').attr('title',LNG('FILTER_CONTEX_MENU_SELECTION_REMOVE').replace('%s',_s).replace('%ns',_ns)).qtip(
										{
										         content: $(this).attr('title'),
											     style: {
											     	 classes: 'qtip-bootstrap qtip-shadow'
											     },
												 position: {
													// at: 'left',
													 my: 'top right',
											          target: 'mouse', // Track the mouse as the positioning target
											          adjust: { x: 10, y: 10 } // Offset it slightly from under the mouse
											      }
										});
	}else{
		limpa_botoes_selecionados_filtros(painel);
	}
	_END('confere_se_existe_menu_panel_selecionado');
}

function action_button_ver_itens_selecionados_nos_filtros(e){
	_START('action_button_ver_itens_selecionados_nos_filtros');
	var painel	= $(e.currentTarget).parents('div.wrs_panel_options');
	if(painel.find('li.botoes_nao_selecionados').length<=0){
		var itens_nao_selecionados = painel.find('li.ui-draggable.ui-widget-content:not(.ui-state-focus)').addClass('botoes_nao_selecionados');
		if(itens_nao_selecionados.length>0){
			painel.find('li.botoes_nao_selecionados').hide();
		}
	}else{
		mostrar_botoes_nao_selecionados_ocultos(painel);
	}
	_END('action_button_ver_itens_selecionados_nos_filtros');
}

function mostrar_botoes_nao_selecionados_ocultos(painel){
	_ONLY('mostrar_botoes_nao_selecionados_ocultos');
	painel.find('li.botoes_nao_selecionados').show(0,function(){ $(this).removeClass('botoes_nao_selecionados'); });		
}

function limpa_botoes_selecionados_filtros(painel)
{
	_START('limpa_botoes_selecionados_filtros');
	var _painel='';
	if(painel.type=='click'){ // quando for evento vindo de click ao inves de uma funcao, gerar o painel manualmente
		_painel	= $(painel.currentTarget).parents('div.wrs_panel_options');		
	}else{
		_painel = painel; 
	}
	_painel.find('.menu_selecionados_painel_filtros').slideUp(100,function(){ $(this).remove(); });
	mostrar_botoes_nao_selecionados_ocultos(_painel);
	_painel.find('li.ui-draggable.ui-state-focus').removeClass('ui-state-focus');
	
	_END('limpa_botoes_selecionados_filtros');
	
	
}
