/**
 * Implementado a função do DRILL LINE
 * 
 * Ao habilitar a configuração Função consolidada 'DRILL_HIERARQUIA_LINHA' habilita a configuração abaixo
 * 
 * 
 * 
 * Variávels principais
 * 
 * DRILL_HIERARQUIA_LINHA_DATA  - contem as variáveis necessaria para aplicar o DRILL_LINE
 * DRILL_HIERARQUIA_LINHA       - status
 */ 

function DRILL_LINE_check_header(wrsKendoUi,kendoUi,_lineDataArray)
{
	var kendoUiColumns		=	kendoUi.columns;
	var layout				=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	var line_size			=	explode(',',layout.LAYOUT_ROWS);
	var start				=	1;
	var lineDataArray		=	_lineDataArray;
	var flag_hide_show		=	false;
	var columns				=	0;
	
	//Forçando a inserção para poder saber o total de colunas para retirar com as opções plus minus drill_linha
	kendoUi['wrs_size_columns']	=	line_size.length;	
	
	
	if(empty(lineDataArray))	{
		start	=	1;
		lineDataArray		=	{column:"", query:""};
	}else{
		start				=	1;
		flag_hide_show		=	true;
		columns				=	[];
		columns				=	 explode(',',lineDataArray.column);
		columns				=	parseInt(columns.length);
	}
	
		
	if(wrsKendoUi.DRILL_HIERARQUIA_LINHA!=	_TRUE) return true;
		
	//
	//Apenas na estrutura das linhas 
	for(var _line=start;_line<line_size.length;_line++)
	{
		//FAz com que não seha apresentado o botão de dril para o ultimo elemento
		if(_line==(line_size.length-1))
		{
			kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]].drill_line_button	=	 false;
		}
		
		//Escondendo as colunas caso a estrutura estiver em branco
		//console.log('ASS',kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]]);
		if(!flag_hide_show)
		{			
			kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]].drill_line	=	 true;
			kendoUi.hideColumn(kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]]);
		}else{
				if(_line>columns){
					kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]].drill_line				=	 true;
					kendoUi.hideColumn(kendoUi.headerIndex.byFrozenLevelFull[line_size[_line]]);
				}
			
			
			
		}
	}
}



function DRILL_LINE_get_values_table(_array_line_query)
{
	
	if(empty(_array_line_query)) return [];
	
	var param		=	 explode('{SEP}',_array_line_query);
	var result		=	[];
	var findResult	=	[];
	var _count		=	0;	
	for(lineParan in param)
		{
			findResult	=	 explode('{VIR}',param[lineParan]);
			for(lineFindResult in findResult)
				{
					result[findResult[lineFindResult]]	=	true;
					_count++;
				}
		}
	
	result['length']	=	_count;
	return result;
}


/**
 * Click do Botão mais ou menos
 */
function DRILL_LINE_CLICK_DRILL_HIERARQUIA_LINHA()
{
	//Elementos no CLick
	var type				=	$(this).attr('wrs-type');
	var data				=	$(this).attr('data');
	var column				=	$(this).attr('column');
	var line				=	$(this).attr('line');
	var size_column			=	$(this).attr('size-column');
	var parent_column		=	$(this).attr('parent_column');
	var parent				=	explode(',',parent_column);
	
	//Info da GRID
	var kendoUi				=	$(this).data('kendoGrid');
	var query				=	[];
	var idName 				=	'#'+kendoUi.element.attr('id');
	var wrsKendoUi			=	$.parseJSON(base64_decode($(idName).attr('wrsKendoUi')));
	var DRILL_LINHA			=	$.parseJSON(base64_decode(wrsKendoUi.DRILL_HIERARQUIA_LINHA_DATA));
	var _check_to_remove	=	[];
	
	
	//preenchendo o elemento 
	var data_default		=	{	'parent_column'	:	parent_column, 
									'data'			:	data,
									'line'			:	line,
									'column'		:	column
								};
	
	
		//Obtendo os elementos para remover
	var flag_to_remove		=	false;
	var array_minus			=	[];
	var count_column_line	=	0;
	var count_line_elimine	=	0;
	//END remove minus
	if(type=='minus')
	{
		$(idName).find('.DRILL_HIERARQUIA_LINHA[line="'+line+'"]').each(function(){
			
			var i_type	=	$(this).attr('wrs-type');;
			
			if(!empty(parent_column) && i_type=='minus')
			{
				if(data==$(this).attr('data') && i_type=='minus') 	
				{
					count_line_elimine++;
					if(count_column_line > size_column )
					{
						flag_to_remove	=	true;
					}
				}
			}
			
			
			if(count_line_elimine && i_type=='minus')
			{
					count_line_elimine++;
			}
			
			
			
			if(!flag_to_remove && i_type=='minus')
			{
				array_minus[array_minus.length]	=	$(this).attr('data');
			}
			
			count_column_line++;
		});
		
		count_line_elimine	=	(count_line_elimine ? count_line_elimine-1 : count_line_elimine);
	}
	//END mount Remove minus
		
		//Caso esteja nulo crio o default
		if(empty(DRILL_LINHA))
		{
			DRILL_LINHA		=	{	
									'column'	:	[],
									'query'		:	''
								};
		}
	
	
	var _array				=	explode('{SEP}',DRILL_LINHA.query);
	
	
	if(empty(DRILL_LINHA.query))	_array	=	[];
	
		if(empty(parent_column))
		{
			query[query.length]	=	data;	
			parent				=	[];
		}else{
			//PRocessando os parents
			var sub_query	=	[];
			for(p_column in parent)
			{
				sub_query[sub_query.length]	=	kendoUi._wrs_data[line][parent[p_column]];
				//Armazenando para remover
				_check_to_remove[_check_to_remove.length]		=	sub_query[(sub_query.length-1)];
			}
			
			sub_query[sub_query.length]						=	 data;
			query[query.length]								=	 implode('{VIR}',sub_query);
		}
	
	
	var DRILL_COLUMN_PARENT_SIZE		=	explode(',',DRILL_LINHA.column);
		
		if(empty(DRILL_LINHA.column))
		{
			DRILL_LINHA.column			=	column;
			DRILL_COLUMN_PARENT_SIZE	=	[];
		}

	var DRILL_COLUMN_PARENT									=		parent;
		DRILL_COLUMN_PARENT[DRILL_COLUMN_PARENT.length]		=		column;
	
	
		
		if(DRILL_COLUMN_PARENT.length >  DRILL_COLUMN_PARENT_SIZE.length)
		{
			DRILL_LINHA.column	=	implode(',',DRILL_COLUMN_PARENT);
		}
		
		
		_array	=	DRILL_LINE_empty_array(_array,_check_to_remove);
		
		//Alimentado o array
		
		if(type!='minus')
		{
			_array[_array.length]		=	query;
		}else{
				//Minus DDR
			var _is_user				=	[];
				
				_array					=	DRILL_LINE_empty_array(_array,[implode('{VIR}',array_minus)]);
				
				//Garantidno o elemento retirado
				if(!empty(parent_column))
				{

					_array					=	DRILL_LINE_strpos(_array,implode('{VIR}',_check_to_remove));
					//_array[_array.length]		=	query;
				}
		}
		
		
		//array_minus
		DRILL_LINHA.query			=	implode('{SEP}',_array);
		wrsKendoUiChange(idName,'DRILL_HIERARQUIA_LINHA_DATA',base64_encode(json_encode(DRILL_LINHA,true)));
	
		$('.wrs_run_filter').trigger('click'); //executra o click
}


 


/**
 * Removendo apenas informações repetidas
 * @param _arrayMain
 * @param _arrayCopare
 * @returns
 */
function DRILL_LINE_empty_array(_arrayMain,_arrayCopare)
{
	var _tmp	=	[];
	if(_arrayCopare.length==0) 	return _arrayMain;
	if(_arrayMain.length==0) 	return _arrayMain;
	
	for(linearrayMain in _arrayMain)
		{
			if(!exist_in_array(_arrayCopare,_arrayMain[linearrayMain]))
				{
					_tmp[_tmp.length]	=	_arrayMain[linearrayMain];
				}
		}
	
	return _tmp;
}


function DRILL_LINE_strpos(_arrayMain,_value)
{
	var _tmp	=	[];
	if(_arrayMain.length==0) 	return _arrayMain;
	
	for(linearrayMain in _arrayMain)
		{

			if(strpos(_arrayMain[linearrayMain],_value)===false)
			{
				//TRACE_DEBUG('SAME::;'+_arrayMain[linearrayMain]);
				_tmp[_tmp.length]	=	_arrayMain[linearrayMain];
			}
				
		}
	
	
	_tmp[_tmp.length]	=	_value;
	
	
	return _tmp;
}


(function( $ ) {
	
  $.fn.wrsDrillLine = function() 
  {
	  var element	=	this;
	  
	  
 
	  
	  
	  
	  return element;
	  
  }
});