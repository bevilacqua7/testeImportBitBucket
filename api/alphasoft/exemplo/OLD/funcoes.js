//Menu de Contexto
$(function(){
	// Verifica tipo de Browser para Configurar o Menu de Contexto
	var triggerMenu = ((isMobile.any()) ? 'left' : 'right');
	$.contextMenu({
		selector: '.context-menu-one',
        trigger: triggerMenu,	// right , left , hover	
		build: function($trigger, e) {
			// Obtem os Atributos do Objeto Clicado
			//C = Colunm | R = Row = | M = Metric | H = Header | E = Element | V = Value
			var tipo_coluna = e.target.getAttribute('tipo_coluna');
			var dados_maps = '-1';
			var tem_mais_itens = '0';
			if(tipo_coluna == 'E'){
				//Drill Down por Elemento
				var posicao_coluna = e.target.getAttribute('posicao_coluna');
			    var dimensoes = e.target.getAttribute('dimension').split(',');
                var atributo = dimensoes[posicao_coluna];
				var filtro = (e.target.innerText || e.target.textContent);
			}else if(tipo_coluna == 'H'){
				//Drill Down por Cabeçalho
			    var dimensoes = e.target.getAttribute('dimension');
                var atributo = dimensoes;
				var filtro = (e.target.innerText || e.target.textContent);
			}else if(tipo_coluna == 'V'){
				//Drill Down por Valor
				var atributos_linha = e.target.getAttribute('atributos_linha');
				var filtros_linha = e.target.getAttribute('filtros_linha');
				var atributos_coluna = e.target.getAttribute('atributos_coluna');
				var filtros_coluna = e.target.getAttribute('filtros_coluna');
                var filtro = '';
				var drill_valor = 1;
				//alert(valor+' - '+posicao_linha+' - '+posicao_coluna+' - '+atributos_linha+' - '+atributos_coluna+' - '+filtros_linha+' - '+filtros_coluna);
				//return false;
			}else if(tipo_coluna=='DR'){ //Menu de contexto para simular o DRAG DROP
					var nome_atributo = (e.target.innerText || e.target.textContent);
					var tipo_do_atributo = e.target.getAttribute('tipo')
			}else if(tipo_coluna=='TF'){ //Menu de contexto para simular o DRAG DROP
					var nome_atributo = (e.target.innerText || e.target.textContent);
			}else{
				// C = Column / R = Row / M = Metric
				var dimensoes = (e.target.innerText || e.target.textContent);
				var atributo = dimensoes;
				var filtro = '';
			}
			//alert('tipo:'+tipo_coluna+' - filtro:'+filtro+' - atributo:'+atributo+' - posicao:'+posicao_coluna);

			//Verifica se o Usuario tem direito para Menu de Navegação - DRILL THROUGH (ATRIBUTE + METRIC)
			if (((tipo_coluna == 'C') || (tipo_coluna == 'R') || (tipo_coluna == 'M')) && (0 == 1)){
				return false;
			}

			//Verifica se o Usuario tem direito para Menu de Navegação - DRILL DOWN (ELEMENT + HEADER)
			if (((tipo_coluna == 'E') || (tipo_coluna == 'H')) && (0 == 1)){
				return false;
			}

			//Verifica se o Usuario tem direito para Menu de Navegação - DRILL VALUE
			if ((tipo_coluna == 'V') && (0 == 1)){
				return false;
			}

			//A função procuraFilhos traz todos os filhos do atributo escolhido
			if(atributo){
				//alert(atributo)
				var filhos = procuraFilhos(atributo);
				filtro = substituiCaracter('+','{MAIS}',filtro)
			}else{
				var filhos = ''	
			}
			/*if ((filhos == '') && ((tipo_coluna == 'E') || (tipo_coluna == 'H'))){
				return false;
			}*/
			
			if(filtro){
				filtro = substituiCaracter('&','{ECOMERCIAL}',filtro);
			}
			// Envia chamada para o PHP montar o Menu (aguardando o resultado)
			var menuPrincipalObj = {};
			if (filhos != '' || tipo_coluna=='R' || tipo_coluna=='C' || tipo_coluna=='M' || tipo_coluna=='E' || tipo_coluna=='H' || tipo_coluna=='V'){
				$.ajax({
				  async: false,
				  type: 'POST',
				  dataType: 'html',
				  url: "ajax/montaMenu.php",
				  data: "filhos="+filhos+"&tipo="+tipo_coluna+"&filtro="+atributo+"&valor="+filtro,
				  success: function(result) { menuItems = result }
				});
				//alert(menuItems);
				if (menuItems == undefined || menuItems=='-1{SEPARADOR_PRINCIPAL}-1'){
					return false;
				}
				
				//Quebra a string pelo '{SEPARADOR_PRINCIPAL}'. A 1a parte tem os itens do menu de DRILL. A 2a tem a parte do GOOGLE MAPS
				var retorno_php = menuItems.split("{SEPARADOR_PRINCIPAL}");
				
				if(retorno_php[0]!='-1'){
					tem_mais_itens = '1'
					//Quebra a string pelo '|'. O '|' separa cada item do menu principal com seus filhos
					var arrItems = retorno_php[0].split("|");
					for (var i = 0; i < arrItems.length; i++) {
						//Quebra a string pelo '{SEP}'. O '{SEP}' faz a separação dentro de cada posição da separação por '|'. 
						//A 1a posição é o item do menu principal, as demais são os submenus.
						var arrSubItems = arrItems[i].split("{SEP}");
						
						var menuItemsObj = {};
						//Começa do 1 pra frente porque o 0 é o item do menu principal
						for (var p = 1; p < arrSubItems.length; p++) {
							menuItemsObj[arrSubItems[p]] = {name: arrSubItems[p], icon: "copy"};
						}
						//Coloca os itens do menu principal (sempre a posição 0 do 2o array).
						//O campo items seriam os submenus que estão no objeto menuItemsObj
						menuPrincipalObj[arrSubItems[0]] = {name: arrSubItems[0]+'&nbsp&nbsp&nbsp', icon: "add", items: menuItemsObj};
					}
				}
			}
			
			// Verifica Adição da Opção para Remover Atributo / Metrica
			if ((tipo_coluna != 'E') && (tipo_coluna != 'H') && (tipo_coluna!='DR') && (tipo_coluna!='TF')){
				if (menuPrincipalObj.lenght>0){
					menuPrincipalObj['sep1'] = "---------";
				}
				if ((tipo_coluna == 'C') ||
				    ((tipo_coluna == 'R') && (document.getElementById('linhas_selecionadas').value.indexOf(',') > 0)) ||
					((tipo_coluna == 'M') && (document.getElementById('metricas_selecionadas').value.indexOf(',') > 0))){
					menuPrincipalObj['delete_item'] = {name: "REMOVE ITEM", icon: "delete"};
				} else {
					if(tipo_coluna!=null){
						menuPrincipalObj['delete_item'] = {name: "REMOVE ITEM", icon: "delete", disabled: true};
					}else{
						return false;	
					}
				}
			}else if(((tipo_coluna=='E') || (tipo_coluna=='H')) && (retorno_php[1]!='-1')){
				dados_maps = retorno_php[1];
				if(tem_mais_itens=='1'){
					menuPrincipalObj['sep1'] = "---------";	
				}
				if(menuItems != '-1'){
					menuPrincipalObj['maps_item'] = {name: "GOOGLE MAPS", icon: "quit"};
				}else{
					if(navigator.userAgent.indexOf('iPad')!='-1'){
						menuPrincipalObj['maps_item'] = {name: "PRESS AGAIN...", disabled: true};
					}
				}
				//alert(retorno_php[1]);
			}else if(tipo_coluna=='DR'){
				if(tipo_do_atributo=='atributo'){
					menuPrincipalObj['filtros'] = {name: "FILTROS", icon: "add"};
					menuPrincipalObj['colunas'] = {name: "COLUNAS", icon: "add"};
					menuPrincipalObj['linhas'] = {name: "LINHAS", icon: "add"};
				}else{
					menuPrincipalObj['metricas'] = {name: "METRICAS", icon: "add"};	
				}	
			}else if(tipo_coluna=='TF'){
				menuPrincipalObj['simples'] = {name: "SIMPLES", icon: "add"};
				menuPrincipalObj['range'] = {name: "COMPOSTO", icon: "add"};
			}
			
			return {
				callback: function(key, options) {
					// Executa Função para Aplicar Drill
					//alert('tipo:'+tipo_coluna+' - atributo:'+atributo+' - filtro:'+filtro+' - key:'+key+' - maps:'+dados_maps);
					if(tipo_coluna=='DR'){
						simulaDragDrop(key,trim(nome_atributo.toUpperCase()))
					}else if(tipo_coluna=='TF'){
						alteraTipoFiltro(key,trim(nome_atributo.toUpperCase()))
					}else if(drill_valor!='1'){
						fazDrillGrid(tipo_coluna,atributo,filtro,key,dados_maps);
					}else{
						fazDrillGridPorValor(atributos_linha,filtros_linha,atributos_coluna,filtros_coluna,key)	
					}
				},
				items: menuPrincipalObj
			};
		}
	});
});

//Transforma os elementos em Drag&Drop e faz as regras dos Atributos e Métricas Drag&Drop
function iniciaEstruturaDragDrop(){
	//Telas
	$("#div_nome_layout").draggable();
	$("#div_nome_relatorio").draggable();
	$("#div_tipos_graficos").draggable();
	$("#div_lista_de_layouts_relatorios").draggable();
	$("#div_print_tela_email").draggable();
	
	//ADM
	$("#dialog_altera_senha").draggable();
	$("#dialog_alert_personalizado").draggable();
	$("#dialog_gerenciamento_clientes").draggable();
	$("#dialog_gerenciamento_usuarios").draggable();
	$("#dialog_gerenciamento_auditorias").draggable();
	$("#dialog_gerenciamento_cubos").draggable();
	$("#dialog_gerenciamento_logs").draggable();
	$("#dialog_gerenciamento_perfis").draggable();
	$("#dialog_gerenciamento_arquivos").draggable();
	$("#dialog_gerenciamento_consultas").draggable();
	$("#dialog_gerenciamento_cubos_usuarios").draggable();
	$("#dialog_gerenciamento_hierarquias").draggable();
	$("#dialog_cadastro_clientes").draggable();
	$("#dialog_cadastro_usuarios").draggable();
	$("#dialog_cadastro_auditorias").draggable();
	$("#dialog_cadastro_cubos").draggable();
	$("#dialog_cadastro_perfis").draggable();
	$("#dialog_cadastro_cubos_usuarios").draggable();
	$("#dialog_cadastro_hierarquias").draggable();
	$("#dialog_upload_clientes").draggable();
	$("#dialog_upload_usuarios").draggable();
	$("#dialog_upload_auditorias").draggable();
	$("#dialog_upload_cubos").draggable();
	$("#dialog_upload_perfis").draggable();
	$("#dialog_upload_cubos_usuarios").draggable();
	$("#dialog_escolhe_exportacao_clientes").draggable();
	$("#dialog_escolhe_exportacao_usuarios").draggable();
	$("#dialog_escolhe_exportacao_auditorias").draggable();
	$("#dialog_escolhe_exportacao_cubos").draggable();
	$("#dialog_escolhe_exportacao_logs").draggable();
	$("#dialog_escolhe_exportacao_perfis").draggable();
	$("#dialog_escolhe_exportacao_cubos_usuarios").draggable();
	$("#dialog_escolhe_exportacao_hierarquias").draggable();
	$("#dialog_executa_comando").draggable();
	$("#dialog_consulta_execucao").draggable();
	$("#dialog_replica_relatorios").draggable();
	
	//Atributos de COLUNAS (sortable)
	$( ".attribute" ).sortable({
		connectWith: ".drag_atributo"
		,helper:  function (evt, ui) { 
			return $(ui).clone().appendTo('body').show(); 
		}
		,receive: function(e, ui){ 
			sortableIn = 1;
			if(document.getElementById('controla_sortable').value!='filtros'){
				if(ja_tem!=''){
					document.getElementById(ja_tem).id = 'DELETA'
					$("#DELETA").detach();
					
					alertPersonalizado('ALERTA','O atributo '+id_verdadeiro+' já está sendo utilizado!','OK',"escondeDiv('dialog_alert_persona');",260)
					
				}else{
					if(document.getElementById('controla_sortable').value=='colunas'){
						if(document.getElementById('colunas_selecionadas').value!=''){
							document.getElementById('colunas_selecionadas').value += ',';
						}
						document.getElementById('colunas_selecionadas').value += ui.item[0].id;
					}else{
						if(document.getElementById('controla_sortable').value=='linhas'){
							if(document.getElementById('linhas_selecionadas').value!=''){
								document.getElementById('linhas_selecionadas').value += ',';
							}
							document.getElementById('linhas_selecionadas').value += ui.item[0].id;
						}	
					}
				}
			}else{
				if(ja_tem_filtro!=''){
					document.getElementById(ja_tem_filtro).id = 'DELETA'
					$("#DELETA").detach();
					
					alertPersonalizado('ALERTA','O atributo '+id_verdadeiro+' já está sendo utilizado como filtro!','OK',					
									   "escondeDiv('dialog_alert_persona');",260)
					
				}else{
					if(document.getElementById('controla_sortable').value=='filtros'){
						if(document.getElementById('filtros_selecionados').value!=''){
							document.getElementById('filtros_selecionados').value += ',';
						}
						//document.getElementById('filtros_selecionados').value += ui.item[0].id+'|'+ui.item[0].name;
						document.getElementById('filtros_selecionados').value += ui.item[0].id;
						var fi = ui.item[0].id.replace('{SD}default','')
						document.getElementById('hd_filtros_so_dashboard').value = document.getElementById('hd_filtros_so_dashboard').value.replace(fi,'')
					}
				}
			}

			montaDesmontaAccordionsEsquerda('1')
			
		}
		,over: function(e, ui){
			sortableIn = 1;
			if(ui.item.parent().parent()[0].innerHTML.indexOf('place_filtros')!='-1'){
				document.getElementById('controla_sortable').value	= 'filtros';
			}else{
				if(ui.item.parent().parent()[0].innerHTML.indexOf('place_colunas')!='-1'){
					document.getElementById('controla_sortable').value	= 'colunas';
				}else{
					document.getElementById('controla_sortable').value	= 'linhas';
				}
			}
			//alert(ui.item.parent().parent()[0].innerHTML);
		}
		,out: function(e, ui){ 
			sortableIn = 0;
		}
		,beforeStop: function(e, ui) { 
			if (sortableIn == 0){
				
				//Para tirar do campo de texto de atributos selecionados os valores arrastados para fora do sortable
				var novos_filtros = '';
				//alert($(this)[0].childNodes[0].childNodes[0].childNodes[0].id)
				qual_place = $(this)[0].id.split('_')
				if(qual_place[1].indexOf('filtro')!='-1'){
					var sele = '_selecionados'	
				}else{
					var sele = '_selecionadas'	
				}
				
				pedacos_selecionados = document.getElementById(qual_place[1]+sele).value.split(',');
				for(var m=0;m<pedacos_selecionados.length;m++){
					//if(pedacos_selecionados[m].indexOf(document.getElementById('atributo_arrastado').value)=='-1'){
					if(pedacos_selecionados[m].indexOf(document.getElementById('atributo_arrastado').value+'{SD}default')=='-1'){
						novos_filtros += pedacos_selecionados[m]+','	
					}	
				}
				
				novos_filtros = novos_filtros.substr(0,novos_filtros.length-1);
				document.getElementById(qual_place[1]+sele).value = novos_filtros
				
				//Se está na área de filtros, quando é retirado apagada o HIDDEN dele
				if(qual_place[1].indexOf('filtro')!='-1'){
					var pai = document.getElementById("place_hiddens");
					var filho = document.getElementById("hd_"+document.getElementById('atributo_arrastado').value);
					//alert(filho+' - '+document.getElementById('atributo_arrastado').value)
					if(filho){
						pai.removeChild(filho);
					}
				}
				ui.item.remove();   
				
				if(qual_place[1].indexOf('filtro')!='-1'){
					//Tira da lista dos filtros simples e altera no Array para range (COMPOSTO)
					alteraTipoFiltro('range',document.getElementById('atributo_arrastado').value)
				
					if(procuraStringEmOutraStringJS(document.getElementById('hd_filtros_simples').value,',',document.getElementById('atributo_arrastado').value)=='1'){
						document.getElementById('hd_filtros_simples').value = document.getElementById('hd_filtros_simples').value.replace(document.getElementById('atributo_arrastado').value+',','')
						document.getElementById('hd_filtros_simples').value = document.getElementById('hd_filtros_simples').value.replace(document.getElementById('atributo_arrastado').value,'')
					}
				}
				
			}  
		},stop: function( e, ui ) {
			//Pega tudo que está dentro do place de LINHAS, COLUNAS ou ATRIBUTOS
			var place = document.getElementById('place_'+document.getElementById('controla_sortable').value).innerHTML
			//alert(place)
			//Quebra a string pela palavra drag_atributo
			var pedacos = place.split('drag_atributo')
			
			if(document.getElementById('controla_sortable').value=='filtros'){
				var sele = 'selecionados'	
			}else{
				var sele = 'selecionadas'	
			}
			//Pega o conteudo do campo linhas_selecionadas ou colunas_selecionadas ou atributos_selecionados
			var hd_selecionadas = document.getElementById(document.getElementById('controla_sortable').value+'_'+sele).value
			//Quebra a string por virgula
			var pedacos_sele = hd_selecionadas.split(',')
			
			
			//Procura que elemento selecionado está dentro de cada posição do place
			var filtros_ordenados =''
			for(var i=1;i<pedacos.length;i++){
				//alert(pedacos[i])
				for(var j=0;j<pedacos_sele.length;j++){
					//var peda_pedaco_sele = pedacos_sele[j].split('_')
					var peda_pedaco_sele = pedacos_sele[j].split('{SD}')
					//alert(pedacos[i])
					if(pedacos[i].indexOf('['+peda_pedaco_sele[0]+']')!='-1' && filtros_ordenados.indexOf(pedacos_sele[j])=='-1'){
						filtros_ordenados += pedacos_sele[j]+','		
					}
				}
			}
			
			//Tira a virgula do final da string
			filtros_ordenados = filtros_ordenados.substr(0,filtros_ordenados.length-1)
			//Coloca a nova string ordenada no campo de SELECIONADAS
			document.getElementById(document.getElementById('controla_sortable').value+'_'+sele).value = filtros_ordenados
			//alert(filtros_ordenados)
		}
	});
	
	$(".drag_atributo").draggable({ 
	   connectToSortable: ".attribute"
	   // create a clone & append it to 'body' 
	   ,helper: function (e,ui) {
		  return $(this).clone().appendTo('body').css('zIndex',5).show();
	   }
	   ,start: function(event, ui) {
		   //Pega o clone...
		   //$(this).clone().attr('id', 'TEESTEEEE');
		   //alert($(this).clone().attr('id'))
		   //alert('A')
		   var_place_colunas = document.getElementById('place_colunas')
		   var_place_linhas = document.getElementById('place_linhas')
		   var_place_filtros = document.getElementById('place_filtros');
		   
		   //id_quebrado = $(this)[0].id.split('_')
		   id_quebrado = $(this)[0].id.split('{SD}')
		   id_verdadeiro = id_quebrado[0]
		   //id_filtro = id_quebrado[0]+'_filtro'
		   id_filtro = id_quebrado[0]+'{SD}filtro'
		   
		   //alert($(this)[0].id)
		   while(var_place_colunas.innerHTML.indexOf($(this)[0].id)!='-1'){
			   var_place_colunas.innerHTML = var_place_colunas.innerHTML.replace($(this)[0].id,id_verdadeiro)
		   }
		   while(var_place_linhas.innerHTML.indexOf($(this)[0].id)!='-1'){
			   var_place_linhas.innerHTML = var_place_linhas.innerHTML.replace($(this)[0].id,id_verdadeiro)
		   }
		   while(var_place_filtros.innerHTML.indexOf($(this)[0].id)!='-1'){
			   var_place_filtros.innerHTML = var_place_filtros.innerHTML.replace($(this)[0].id,id_filtro)
		   }
		   
		   if(document.getElementById('linhas_selecionadas').value.indexOf(id_verdadeiro+'{SD}default')!='-1' || document.getElementById('colunas_selecionadas').value.indexOf(id_verdadeiro+'{SD}default')!='-1'){
			   ja_tem = $(this)[0].id  
		   }else{
			   ja_tem = ''; 
		   }
		   
		  // alert(id_filtro)
		   //var id_filtro_new = id_filtro.split('_')
		   var id_filtro_new = id_filtro.split('{SD}')
		   var id_filtro_verdadeiro = id_filtro_new[0]
		   if(document.getElementById('filtros_selecionados').value.indexOf(id_filtro_verdadeiro+'{SD}default')!='-1'){
			   ja_tem_filtro = id_filtro  
		   }else{
			   ja_tem_filtro = ''; 
		   }
		   
	    }
		 ,stop: function(event, ui) {
	    }
		
	})
	
	//Métricas (sortable)
	$( ".metrica" ).sortable({
		connectWith: ".drag_metrica"
		,helper:  function (evt, ui) {  
			return $(ui).clone().appendTo('body').show(); 
		}
		,receive: function(e, ui){ 
			sortableIn = 1; 
			if(ja_tem!=''){
				document.getElementById(ja_tem).id = 'DELETA'
				$("#DELETA").detach();
				alertPersonalizado('ALERTA','A metrica '+id_verdadeiro+' já está sendo utilizada!','OK',"escondeDiv('dialog_alert_persona');",260)
			}else{
				if(document.getElementById('metricas_selecionadas').value!=''){
					document.getElementById('metricas_selecionadas').value += ',';
				}
				document.getElementById('metricas_selecionadas').value += ui.item[0].id;	
			}
		}
		,over: function(e, ui){
			sortableIn = 1;
		}
		,out: function(e, ui){ 
		sortableIn = 0;
		}
		,beforeStop: function(e, ui) { 
			if (sortableIn == 0){
				
				//Para tirar do campo de texto de metricas selecionadas os valores arrastados para fora do sortable
				var novos_filtros = '';
				qual_place = $(this)[0].id.split('_')
				
				var sele = '_selecionadas'	
				pedacos_selecionados = document.getElementById(qual_place[1]+sele).value.split(',');
				for(var m=0;m<pedacos_selecionados.length;m++){
					if(procuraStringEmOutraStringJS(pedacos_selecionados[m],',',document.getElementById('atributo_arrastado').value+'{SD}default')=='-1'){
						novos_filtros += pedacos_selecionados[m]+','
					}
				}
				novos_filtros = novos_filtros.substr(0,novos_filtros.length-1);
				document.getElementById(qual_place[1]+sele).value = novos_filtros	
				ui.item.remove();     
			}
		},
		stop: function( e, ui ) {
			//Pega tudo que está dentro do place de LINHAS, COLUNAS ou ATRIBUTOS
			var place = document.getElementById('place_metricas').innerHTML
			//Quebra a string pela palavra drag_atributo
			var pedacos = place.split('drag_metrica')
			
			//alert(pedacos.length)
			//alert(place)
			
			var sele = 'selecionadas'	
			
			//Pega o conteudo do campo linhas_selecionadas ou colunas_selecionadas ou atributos_selecionados
			var hd_selecionadas = document.getElementById('metricas_'+sele).value
			//Quebra a string por virgula
			var pedacos_sele = hd_selecionadas.split(',')
			
			//Procura que elemento selecionado está dentro de cada posição do place
			var filtros_ordenados =''
			for(var i=1;i<pedacos.length;i++){
				//alert(pedacos[i])
				for(var j=0;j<pedacos_sele.length;j++){
					//var peda_pedaco_sele = pedacos_sele[j].split('_')
					var peda_pedaco_sele = pedacos_sele[j].split('{SD}')
					
					var posicao_encontrada = filtros_ordenados.indexOf(pedacos_sele[j])
		  
				    if( (posicao_encontrada!='0' && posicao_encontrada!='-1' && filtros_ordenados[posicao_encontrada-1]==',')  || posicao_encontrada=='0'){
						var realmente_encontrada = '1';   
				    }else{
						var realmente_encontrada = '-1'	
					}	
						
					if(pedacos[i].indexOf('['+peda_pedaco_sele[0]+']')!='-1' && realmente_encontrada=='-1'){
						filtros_ordenados += pedacos_sele[j]+','		
					}
				}
			}
			
			//Tira a virgula do final da string
			filtros_ordenados = filtros_ordenados.substr(0,filtros_ordenados.length-1)
			//Coloca a nova string ordenada no campo de SELECIONADAS
			document.getElementById('metricas_'+sele).value = filtros_ordenados
			//alert(filtros_ordenados)
		} 
	});
	
	$(".drag_metrica").draggable({ 
	   connectToSortable: ".metrica"
	   // create a clone & append it to 'body' 
	   ,helper: function (e,ui) {
		  return $(this).clone().appendTo('body').css('zIndex',5).show();
	   }
	   ,start: function(event, ui) {
		   
		   var_place_metricas = document.getElementById('place_metricas')
		   
		   var this_id = $(this)[0].id;
		   id_quebrado = this_id.split('{SD}')
		   id_verdadeiro = id_quebrado[0]
		   //alert($(this)[0].id)
		   
		   while(var_place_metricas.innerHTML.indexOf(this_id)!='-1'){
			   //alert('B')
			   var_place_metricas.innerHTML = var_place_metricas.innerHTML.replace(this_id,id_verdadeiro)
		   }
		   //alert('C')
		   
		   var posicao_encontrada = document.getElementById('metricas_selecionadas').value.indexOf(id_verdadeiro+'{SD}default')
		   
		   if( (posicao_encontrada!='0' && posicao_encontrada!='-1' && document.getElementById('metricas_selecionadas').value[posicao_encontrada-1]==',')  || posicao_encontrada=='0'){
			   var realmente_encontrada = '1';   
		   }
		   
		   if(posicao_encontrada!='-1' && realmente_encontrada==1){
			   ja_tem = this_id  
		   }else{
			   ja_tem = ''; 
		   }
		}
		,stop: function(event, ui) {
	    }
	})
}