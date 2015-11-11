/**
 * Configuração apenas do Jquery Layout
 * 
 * Criado por Marcelo Santos
 * 
 * @link http://layout.jquery-dev.com/demos/custom_scrollbars.html
 */

var qtde_max_linhas		=	15;
var qtde_max_colunas	=	10;
var qtde_max_metricas	=	30;
var hideeast			=	in_array('DRG',PERFIL_ID_USER)?true:false;
var LXLX				=	true;
var userinfo_filter_fixed = null;

function wrs_north_onresize()
{
	//TOPO
	//alert('wrs_north_onresize');
}

function set_userinfo_filter_fixed(obj){
	if(typeof obj == 'object'){
		userinfo_filter_fixed = obj;
	}
}


function merge_filter_in_array(_input_merge)
{
	var input_merge		=	 _input_merge;
	
	if(userinfo_filter_fixed!=null)
	{
			for(var lineFilterFixed in userinfo_filter_fixed)
				{
				
						var _tmp_filter			=	[];
						var _tmp_filter_array	=	userinfo_filter_fixed[lineFilterFixed];

						
						for(var lineInside in _tmp_filter_array)
						{
							var value	=	_tmp_filter_array[lineInside];
								_tmp_filter.push(lineFilterFixed+'.['+value+']');
						}
						
						
						
						var _merge		=	 {'class':'__'+replace_attr(lineFilterFixed),data:_tmp_filter.join(',')};
						input_merge.push(_merge);
				}
	}

	return input_merge;
}

// esconder os filtros fixos do usuario para que o mesmo nao possa ser manipulado
function hide_fixed_filter()
{
	for(var lineFixed in userinfo_filter_fixed)
	{
		$('.wrs_panel_esquerdo_drag_drop').find('.'+replace_attr(lineFixed)).addClass('hide').attr('not-use',true);
		var bt_painel_dd = $('.WRS_DRAG_DROP li.box_wrs_panel.'+replace_attr(lineFixed));
		if(!bt_painel_dd.hasClass('hide'))
		{
			bt_painel_dd.addClass('hide').attr('not-use',true);
			var json_bt_painel_dd = $.parseJSON(base64_decode(bt_painel_dd.attr('json')));
			esconde_pais_drag_drop(json_bt_painel_dd);
		}
	}
}

// funcao recursiva para verificar e apagar todos os pais de um atributo
function esconde_pais_drag_drop(json_bt_painel_dd)
{
	if(typeof json_bt_painel_dd == 'object' && json_bt_painel_dd.LEVEL_UP != null && json_bt_painel_dd.LEVEL_UP != '' && json_bt_painel_dd.LEVEL_UP != undefined)
	{
		var pais_bt_painel_dd = json_bt_painel_dd.LEVEL_UP.split(',');
		if(pais_bt_painel_dd!='' && pais_bt_painel_dd.length>0)
		{
			for(var pos in pais_bt_painel_dd)
			{
				var bt_painel_dd = $('.WRS_DRAG_DROP li.box_wrs_panel.'+replace_attr(pais_bt_painel_dd[pos]));
				if(!bt_painel_dd.hasClass('hide'))
				{
					bt_painel_dd.addClass('hide').attr('not-use',true);
					var json_bt_painel_dd = $.parseJSON(base64_decode(bt_painel_dd.attr('json')));
					esconde_pais_drag_drop(json_bt_painel_dd);
				}
			}
		}
	}
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
	
	heightBox			=	heightBox-$('.ui-layout-north').outerHeight();
	
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

function hide_east(){
	wrs_panel_layout.east.pane.css('visibility','hidden');
	wrs_panel_layout.east.pane.hide();
	wrs_panel_layout.hide('east',true);
	return true;
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

	if(hideeast){
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
				
									var MODAL_JOB		=	'.modal-window-wrs';
									var layout_center	=	$('.ui-layout-center');
									$(MODAL_JOB).width(layout_center.outerWidth()-2).height(layout_center.outerHeight()-3);
									
									
									resize_common();
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
			east__onresize 	: hideeast?hide_east: wrs_east_onresize,
			east__onopen: hideeast?hide_east:function () {
											WRS_PANEL_DRAG();
											$('.WRS_DRAG_DROP_RECEIVER_FILTER').show();
											$('.WRS_DRAG_DROP_FILTER_CONTAINER').hide();
											$('.wrs_panel_filter_icon').show();
											wrsFilterClickFalse();
											
											
										},
			east__onclose: hideeast?hide_east:function () 
			{
				
				//Executa o Click para executar o Gráfico
				var east__onclose	=	$('.wrs_run_filter').attr('east__onclose');
					east__onclose	=	empty(east__onclose) ? false : true;
					
					//$('.modal-window-wrs').removeClass('hide');
					
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
				
				
				
				$('.wrs_run_filter').removeAttr('east__onclose');
				
				
				
				//Muda visão
			},
			
			//	Inicia com o Lado direito ativado
		    //	east__initClosed: true,
			
			//Desabilita a funcionalidade de abrir os paineis pelo teclado com CTRL+Seta
			enableCursorHotkey	: false,
			slidable			: false
	};

	
	
 

	BTN_HOVER_BOX_DROP();

	 wrs_panel_layout	 = 	$('body').layout(jqueryLayoutOptions);
	
//	 $('body').data('wrs_panel_layout',wrs_panel_layout);
	
	 
	
	
	wrs_north_onresize('west', wrs_panel_layout.panes.west);
	wrs_west_onresize();
	wrs_east_onresize();
	wrs_south_onresize();
	wrs_center_onresize();

	$('.wrs_clean_box_drag_drop').click(wrs_clean_box_drag_drop);
 
	if(hideeast){ hide_east(); }
});



function layout_east_close(_only_show_progress,is_hide)
{
	
	var only_show_progress	=	 _only_show_progress==undefined ? false : _only_show_progress;
	
	var report_id		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
	
	
	var active_f5		=	$('#wrsConfigGridDefault').attr('f5_ative');
		active_f5		=	 active_f5==null ? false :  true;
		
		
		$('.container_panel_relatorio_rows').addClass('hide');

		
		
		if(is_hide==true){
			$('.modal-window-wrs').removeClass('hide');
		}else{
			$('.modal-window-wrs').addClass('hide');
		}
		
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
		
		if(only_show_progress)
		{

			wrs_panel_layout.close('east');
			
		}else{
			//if($('#'+report_id).length!=0 || active_f5)
				//{
					wrs_panel_layout.close('east');
				//}
		}
	}
}

function wrs_clean_box_drag_drop()
{
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
									});
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
			
			DEFAULT_OPTIONS_TOPS();
		
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
		
		setTimeout(DEFAULT_OPTIONS_TOPS,500);
		
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
						json['FILTER']	=	is_array(is_filter) ? implode(',',is_filter) : is_filter;
						
						object.attr('json',base64_encode(json_encode(json,true)));
				}
				
				DROP_EVENT( 'DIRECT', object,$(_clone));

			}
	}
	
	
	if(_clone=='.sortable_filtro')
	{
		hide_fixed_filter();
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
	
	
	$('.wrs_panel_receive').find('li').remove();
	$('.WRS_DRAG_DROP_FILTER').html('');
	
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
	
	
	
	hide_fixed_filter();
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
	var _info_save	=	[];
	

	$(object).find('li').each(function(){
		
		//Foi incrementado a TAG  tag_class e get_object para resolver o problema de acentuação
		var tag_class	=	$(this).attr('tag-class');

		var get_object	=	$('.ui-layout-pane-east ul').find('.'+tag_class);
		
		

		var json		=	 $.parseJSON(base64_decode(get_object.attr('json')));
//		var json		=	 $.parseJSON(base64_decode($(this).attr('json'))); //- Chamada original mas com problema de acentuação

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

	var manager_aba			=	$(this).attr('manager_aba');
		manager_aba			=	empty(manager_aba) ? false : true;
		$(this).removeAttr('manager_aba');
	
	var status_load			=	$(this).attr('status_load');
		status_load			=	empty(status_load) ? false : true;
		
		
	var noactive			=	$(this).attr('noactive');
		noactive			=	empty(noactive) ? false : true;
		

		if(noactive)
		{
			$(this).removeAttr('noactive');
			return true;
		}
	
		
		
	
		
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
	var getAllFiltersToRun	=	"";
	var aba_active			=	$('.WRS_ABA').find('.active');
	var report_KendoUi		=	aba_active.wrsAbaData('getKendoUi');
	var history				=	aba_active.wrsAbaData('getHistory');
	
	
	//Se existir o job em execução desse mesmo report id então faz o cancelamento
	if(job_exist(report_KendoUi.REPORT_ID))
	{
		click_stop_job();
	}
	
	
	
	
	//Ao navegar pelas abas essa função impede que seja executada mesmo se tiver aoteração a alteração só será efetivada ao mandar executar
	try{
		if(report_KendoUi.STOP_RUN==true)
		{
			aba_active.wrsAbaData('setKendoUi',{STOP_RUN:false});
			configure_options_show_grid($(this));
			return true;
		}
	}catch(e){}
	
	
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
						//manda executar o Relatório
			
						if($(this).attr('is_atributo_simples')!='true')
						{//Apenas abre o load se for diferente de informações simples no select
							if($(this).attr('eastonclose')!='true')
							{
								if(empty(history))
								{
									$(this).attr('flag_load','true');
								//	$('body').WRSJobModal('add_load');
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
						}catch(e){}
							is_param		=	true;
					}
			
			
					
			
					
					
			
					
					
					
					wrs_data_param.LAYOUT_ROWS		=	base64_encode(implode(',',request_linha));
					wrs_data_param.LAYOUT_COLUMNS	=	base64_encode(implode(',',request_coluna));
					wrs_data_param.LAYOUT_MEASURES	=	base64_encode(implode(',',request_metrica));
					
					
					//Força a conversão do Menu 
					wrsFilterShow();
					
					
					
					getAllFiltersToRun				=	$.WrsFilter('getAllFiltersToRun');
					
					//foreach(getAllFiltersToRun);
					wrs_data_param.LAYOUT_FILTERS	=	base64_encode(getAllFiltersToRun.data);
					wrs_data_param.FILTER_TMP		=	base64_encode(json_encode(getAllFiltersToRun.full));
					
					
					//Verificnado se existe alterações de pesquisa 
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
						TRACE('EXISTE FILTRO SIMPLES');
						$('body').wrsAbas('remove_event_click');
						return false;
					}

					var is_wrs_change_to	=	is_wrs_change_to_run(_param_request,manager_aba,_param_request['REPORT_ID']);
						_param_request		=	{};
						_param_request		=	is_wrs_change_to.val;
						
						
					if(is_wrs_change_to.status)
					{
						configure_options_show_grid($(this));
						return true;
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
		
		
		

		//tagABA.find('.'+REPORT_ID);
		
		//Verificando se o relatório está liberado para ser executado
		//$('body').WRSJobModal('is_active',{report_id : _param_request['REPORT_ID']});
		
		
//		console.log('_param_request',_param_request);

		$('body').WRSJobModal('aba',{report_id:_param_request['REPORT_ID'],wait:true,title_aba:_param_request['TITLE_ABA']});
		
		$('body').wrsAbas('remove_event_click');
		
		
		
		
		if(status_load)
		{

			$('.wrs_run_filter').removeAttr('status_load');
			return true;
		}
		

		$('body').ThreadJobManager(_param_request['REPORT_ID']);
		
		
		//É necessário zerar essas funções para que não mande recriar novamente a estrutura de deill
		$('.WRS_ABA').find('.active').wrsAbaData('setKendoUi',{DRILL_HIERARQUIA_LINHA_DATA_MINUS:null, DRILL_HIERARQUIA_LINHA_DATA:null});
		
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
			
			if(!manager_aba){

				WRS_ALERT(sprintf(LNG('RUN_RELATORIO_FALTA_INFORMACAO'),mensagem),'error');
			}
			
	}
	
	TRACE('END wrs_run_filter()');
	
}


function configure_options_show_grid(that)
{
	if(that.attr('is_atributo_simples')=='true')
	{
		that.attr('is_atributo_simples','false');
	}
	
	that.attr('locked',false);//Libera o filtro
	that.attr('flag_load','false');
	
	$('body').wrsAbas('show_grid');
	
	$('body').wrsAbas('remove_event_click');
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


function ThreadJobManagerDONEJOB(report_id)
{
	
	var DATA_NAME		=	'WrsThreadJobManager';
	var data_param		=	$('body').data(DATA_NAME);
	var tmp_data_param	=	{};
	
		if(empty(data_param)) data_param	=	{};
	
		for(var line_data_param in data_param)
			{
					if(data_param[line_data_param].report_id!=report_id)
					{
						tmp_data_param[line_data_param]		=	 data_param[line_data_param];
					}
			}
	
	
		$('body').data(DATA_NAME,tmp_data_param);
	
	
}


/**
 * Montando a Grid com header
 * @param data
 */
function MOUNT_LAYOUT_GRID_HEADER(data,is_job_call)
{
	
	
	if(is_job_call!='ThreadMainLoadData')
	{
		
		if(is_array(data))
		{
			if(!$('body').ThreadJobManager(data.REPORT_ID),true)
			{
				return true;
			}
			
		}else{
			if(IS_TRACE)
			{
				console.log('MOUNT_LAYOUT_GRID_HEADER',data);
			}
		}
	}
	

	TRACE('START MOUNT_LAYOUT_GRID_HEADER'); 

	
	/*
	 * WARNING: é essa variável que impede de repetir os conteiners
	 */
	var remove_report	=	 $('<div/>',{html:str_replace('script','',data)}).find('.container_panel_relatorio_rows').attr('id'); 
	
	
	var _report_id		=	 str_replace('Main','',remove_report);
	var aba_ativa		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
	
	
	
	
	
	$('.container_panel_relatorio_rows').each(function(){var id_remove	=	 $(this).attr('id'); if(id_remove==remove_report)	$(this).remove();});
	
	$('.container_panel_relatorio').append(data);
	
	
	var msg_error		=	$('#'+remove_report).attr('rel');
	
	
	
	
	//Se não for a aba ativa então faz o hide nbo HTML 

	find_and_hide_container(aba_ativa);
	
	 
		
		
		$('#'+aba_ativa+'Main').removeClass('hide');
	
		var is_active	=	 true;
		if(aba_ativa!=_report_id){
			$('.wrsGrid').removeClass('wrsGrid');
			is_active	=	 false;
		}	
		
		
		if(msg_error=='error')
		{
			//$('body').ThreadJobManager(_report_id,{report_id:_report_id, error:'<br>'+$('#'+remove_report).find('div').html()}) ;
			var body_html_error		=	$('#'+remove_report).find('div').html();
		
			
			$('body').WRSJobModal('error',{report_id:_report_id,msg:body_html_error, active:is_active});
			
		}else{
			
			ThreadJobManagerDONEJOB(_report_id);
			

			$(ABA_TAG_NAME).wrsAbas('refresh',$('.'+_report_id).wrsAbaData('getKendoUi'));
			
		}
		
	
	
	//Apenas éexecutando quando existe atributo simples
	if($('.wrs_run_filter').attr('is_atributo_simples')=='true')
	{
		$(".WRS_DRAG_DROP_FILTER").attr('is_atributo_simples',true);
		$('.wrs_run_filter').attr('is_atributo_simples',false);
	}
	
	$('.wrs_run_filter').attr('locked','false').attr('flag_load','false');
	
	
	$(window).resize();
	
	TRACE('END MOUNT_LAYOUT_GRID_HEADER'); 
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
	
	$('.container_panel_relatorio_rows').each(function(){
		
		var _report_id_local		=	 str_replace('Main','',$(this).attr('id'));

		if(aba_ativa!=_report_id_local){
			$(this).addClass('hide');
		}
		
	});
	
	
}


function find_and_hide_container_auto()
{
	
	var aba_ativa		=	$('.WRS_ABA ul').find('li.active').attr('id-aba');
	
	find_and_hide_container(aba_ativa);
	
	
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
}

// funcao para identificar qual é o painel pai de origem e destino do drag em seleção, para efetuar o mouseover/mouseout correspondente e
// exibir corretamente o botao em drag enquanto está sendo reposicionado entre os paineis na tela
function force_show_drag_on_drop(painel_origem,count){
	_count = (count==undefined)?0:count;
	if(_count>=0 && _count<5){ // tentativas necessarias para que o browser acabe de processar o mouseout e reconheca que deva reajustar os focos dos paineis envolvidos no drag
		window.setTimeout(function(){ 
			$('.ui-layout-pane-west').trigger(((painel_origem)?"mouseout":"mouseover")); 
			$('.ui-layout-pane-center').trigger(((!painel_origem)?"mouseout":"mouseover"));
			var __count=_count+1;
			force_show_drag_on_drop(painel_origem,__count);
		},20); 
	}
}

/**
 * Processo principal
 */
 $(function(){
	  
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

function acoes_multiplas_menu_painel(){
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
}

function confere_se_existe_menu_panel_selecionado(painel){

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
}

function action_button_ver_itens_selecionados_nos_filtros(e){
	var painel	= $(e.currentTarget).parents('div.wrs_panel_options');
	if(painel.find('li.botoes_nao_selecionados').length<=0){
		var itens_nao_selecionados = painel.find('li.ui-draggable.ui-widget-content:not(.ui-state-focus)').addClass('botoes_nao_selecionados');
		if(itens_nao_selecionados.length>0){
			painel.find('li.botoes_nao_selecionados').hide();
		}
	}else{
		mostrar_botoes_nao_selecionados_ocultos(painel);
	}
}

function mostrar_botoes_nao_selecionados_ocultos(painel){
	painel.find('li.botoes_nao_selecionados').show(0,function(){ $(this).removeClass('botoes_nao_selecionados'); });		
}

function limpa_botoes_selecionados_filtros(painel){
	var _painel='';
	if(painel.type=='click'){ // quando for evento vindo de click ao inves de uma funcao, gerar o painel manualmente
		_painel	= $(painel.currentTarget).parents('div.wrs_panel_options');		
	}else{
		_painel = painel; 
	}
	_painel.find('.menu_selecionados_painel_filtros').slideUp(100,function(){ $(this).remove(); });
	mostrar_botoes_nao_selecionados_ocultos(_painel);
	_painel.find('li.ui-draggable.ui-state-focus').removeClass('ui-state-focus');
}