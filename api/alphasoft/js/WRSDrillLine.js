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
	var columnsName			=	[];
	
	
	
	
	
	
	//Forçando a inserção para poder saber o total de colunas para retirar com as opções plus minus drill_linha
	kendoUi['wrs_size_columns']	=	line_size.length;	
	
	
	if(empty(lineDataArray))	{
		start	=	1;
		lineDataArray			=	{column:"", query:""};
		lineDataArray.column	=	kendoUi.headerIndex.byFrozenLevelFull[line_size[0]].key;
		columnsName				=	[lineDataArray.column];
		columns					=	1;	
		
	}else{
		start				=	1;
		flag_hide_show		=	true;
		columns				=	[];
		columnsName			=	explode(',',lineDataArray.column);
		columns				=	parseInt(columnsName.length);
	}
	
		
	if(wrsKendoUi.DRILL_HIERARQUIA_LINHA!=	_TRUE) return true;


	
		var fitst_key		=	'';
		for(lineRows in line_size)
			{
				var _key		=	line_size[lineRows];
				var key_short	=	kendoUi.headerIndex.byFrozenLevelFull[_key].key;

				
					kendoUi.headerIndex.field[key_short].drill_line			=	 false;
//					kendoUi.headerIndex.field[key_short].drill_line_button	=	 false;
					
					if(exist_in_array(columnsName,key_short))
					{
						kendoUi.headerIndex.field[key_short].drill_line_button	=	 true;
						kendoUi.headerIndex.field[key_short].drill_line			=	 false;
					}else{
						//HIDEN
						kendoUi.headerIndex.field[key_short].drill_line			=	 true;
						kendoUi.hideColumn(kendoUi.headerIndex.field[key_short]);
						
					}
			}
		
		
		//Remove o Botão da ultima opção
		var last_column															=	kendoUi.headerIndex.byFrozenLevelFull[line_size[line_size.length-1]].key;
			kendoUi.headerIndex.field[last_column].drill_line_button			=	 false;

	
	
	
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
		kendoUi				=	[];
		kendoUi				=	$(idName).data('kendoGrid');
	
	var wrsKendoUi			=	$.parseJSON(base64_decode($(idName).attr('wrsKendoUi')));
	var DRILL_LINHA			=	$.parseJSON(base64_decode(wrsKendoUi.DRILL_HIERARQUIA_LINHA_DATA));
	var _check_to_remove	=	[];

	
	var layout					=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	var layoutROWS				=	 explode(',',layout.LAYOUT_ROWS);

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

		_array				=	DRILL_LINE_empty_array(_array,_check_to_remove);		
		
		
		//Alimentado o array
		
		if(type!='minus')
		{
			_array[_array.length]		=	query;
		}else{
			//Minus
			var _is_user									=	[];
				_array										=	DRILL_LINE_empty_array(_array,[implode('{VIR}',array_minus)],true);	
				_check_to_remove[_check_to_remove.length]	=	data;
			
			var data_remove							=	implode('{VIR}',_check_to_remove);
			var get_array							=	DRILL_LINE_strpos(_array,data_remove);
				_array								=	get_array.data;
					
					var _first_key	=	'';
					//Remove
					for(_lineLayoutROWS in layoutROWS)
						{
							var __key	=	kendoUi.headerIndex.byFrozenLevelFull[layoutROWS[_lineLayoutROWS]].key;
							if(empty(_first_key)) _first_key=__key;
							kendoUi.headerIndex.field[__key]['drill_line']			=	 true;
							kendoUi.headerIndex.field[__key]['drill_line_button']	=	 true;
						}
		}
		
		DRILL_LINHA.column	=	getColumnsFrozenTAGName(_array,layoutROWS,kendoUi);

		//array_minus
		DRILL_LINHA.query			=	implode('{SEP}',_array);
		wrsKendoUiChange(idName,'DRILL_HIERARQUIA_LINHA_DATA',base64_encode(json_encode(DRILL_LINHA,true)));
	
		$('.wrs_run_filter').trigger('click'); //executra o click
}

function getColumnsFrozenTAGName(_param,layoutROWS,kendoUi)
{
	var count	=	0;
	var columns	=	[];
	for(lineParamArray in _param)
	{
		var compare	=		explode_('{VIR}',_param[lineParamArray]);
		
		if(compare.length > count)  count	=	compare.length;
	}
	

	if(_param.length==1)
		{
			if(empty(_param[0])) count=0;
		}


	
	for(var _i=0;_i<=count;_i++)
		{
			columns[columns.length]	= kendoUi.headerIndex.byFrozenLevelFull[layoutROWS[_i]].key;
		}
	
	
	
	return implode(',',columns);
}

 


/**
 * Removendo apenas informações repetidas
 * @param _arrayMain
 * @param _arrayCopare
 * @returns
 */
function DRILL_LINE_empty_array(_arrayMain,_arrayCopare,remove)
{
	var _tmp			=	[];
	var _size_column	=	0;
	
	if(_arrayCopare.length==0) 	return _arrayMain;
	if(_arrayMain.length==0) 	return _arrayMain;
	
	for(linearrayMain in _arrayMain)
		{
			if(!exist_in_array(_arrayCopare,_arrayMain[linearrayMain]))
				{
					_tmp[_tmp.length]	=	_arrayMain[linearrayMain];
				}
		}
	
	
	if(remove){
		if(!_tmp.length)
		{
			if(!empty(_arrayCopare[0])){
				_tmp[_tmp.length]		=	dirname_VIR(_arrayCopare[0]);
			}
			
		}
	}
	
	return _tmp;
	
	//return _tmp;
}

function dirname_VIR(name)
{
	var _explode	=	explode('{VIR}',name);
	var data		=	[];
		for(var i=0 ; i<_explode.length-1;i++)	data[data.length]=	_explode[i];
	return implode('{VIR}',data);
}

function DRILL_LINE_strpos(_arrayMain,_value)
{
	var _tmp			=	[];
	var _size_column	=	0;
	if(_arrayMain.length==0) 	return _arrayMain;
	
	for(linearrayMain in _arrayMain)
		{
			if(strpos(_arrayMain[linearrayMain],_value)===false)
			{
				_tmp[_tmp.length]		=	_arrayMain[linearrayMain];
				if(!empty(_arrayMain[linearrayMain])){
					var __size_column		=	 explode('{VIR}',_arrayMain[linearrayMain]);				
					if(__size_column.length > _size_column) _size_column	=__size_column.length;
				}
			}	
		}
	return {data: _tmp, column : _size_column};
}


(function( $ ) {
	
  $.fn.wrsDrillLine = function() 
  {
	  var element	=	this;
	  
	  
 
	  
	  
	  
	  return element;
	  
  }
});