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
 * DRILL_HIERARQUIA_LINHA_DATA_HEADER
 */ 


/*
 * Retira o level full para o FIELD
 */
function DRILL_FCC(index,columns)
{
	
	_START('DRILL_FCC');
	var columnTMP	=	[];
	
	for(lineColumn in columns)
	{
		
		var field	=	'';
		
		
		try{
			field	=	index[columns[lineColumn]].field;
		}catch(e){
			field	=	'';
			console.warn(' exception');
		}
		
		if(empty(field)) continue;
		
		columnTMP[columnTMP.length]	=	field;
	}
	_END('DRILL_FCC');
	return columnTMP;
}




function DRILL_HIERARQUIA_LINHA_hideColumn(	IDGRid,KendoUi,rows,drill)
{
	
	_START('DRILL_HIERARQUIA_LINHA_hideColumn');
	var startCol	=	0;

	if(drill!='')	startCol	=	drill.OPENCOLS;
	
	for(var lineColumn in rows)
	{
		//é mapa
		
		if(lineColumn!=0 && lineColumn > startCol)
			{
				var column	=	KendoUi.headerIndex.field[rows[lineColumn]];
					KendoUi.hideColumn(column);
			}
	}
	_END('DRILL_HIERARQUIA_LINHA_hideColumn');
}

function DRILL_HIERARQUIA_LINHA_setButtonExpandALL(IDGRid,columnSelected,lastColumn)
{
	_START('DRILL_HIERARQUIA_LINHA_setButtonExpandALL');
	//DRILL_HIERARQUIA_LINHA_DATA_HEADER
	$(IDGRid).find('.k-grid-header .k-grid-header-locked').find('tr:last-child').find('th').each(function(){
	
		
		var column			=	 $(this).attr('data-field');
		
		if(column!='C000' && lastColumn!=column)
		{
			/*
			 * Esses ficam na Header da GRid
			 */
			var btn_plus		=	'<button grid-id="'+IDGRid+'" class="DRILL_HIERARQUIA_LINHA_HEADER" column="'+column+'" type="button"  wrs-type="plus"><i class="fa fa-plus-square"></i></button>';
			var btn_minus		=	'<button grid-id="'+IDGRid+'" class="DRILL_HIERARQUIA_LINHA_HEADER" column="'+column+'" type="button"  wrs-type="minus"><i class="fa  fa-minus-square"></i></button>';
			var btn_use			=	btn_plus;
			
			$(this).addClass('DRILL_HIERARQUIA_LINHA_HEADER_CONTAINER');
			

			if(exist_in_array(columnSelected,column))	btn_use	=	btn_minus;
			
			$(this).prepend(btn_use);
		}
		
	});
	
	
	$(IDGRid).find('.DRILL_HIERARQUIA_LINHA_HEADER').unbind('click').click(DRILL_HIERARQUIA_LINHA_HEADER_CLICK);
	
	_END('DRILL_HIERARQUIA_LINHA_setButtonExpandALL');
	
}

function DRILL_HIERARQUIA_LINHA_setButton(_data,C000, line,column,DRILL_HIERARQUIA_REQUEST,LAYOUT_ROWS_B64,IDGrid,DRILL_FCC,DRILL_LINE_LAST_COLUMN,arg,next_column,data_line)
{
	_START('DRILL_HIERARQUIA_LINHA_setButton');
	
	
	if(empty(_data) || column=='C000') 	return _data;
	if(DRILL_LINE_LAST_COLUMN==column)	return _data;
	/*
	 * DRILL_HIERARQUIA_REQUEST  - FIELDS
	 * line
	 * data
	 * OPENCOLS
	 */
	
	/*
	 * Fica nos dados da grid
	 */
	var data			=	_data;
	var btn_plus		=	'<button class="DRILL_HIERARQUIA_LINHA" column="'+column+'" grid-id="'+IDGrid+'" rows="'+LAYOUT_ROWS_B64+'" line="'+line+'"  data="'+_data+'" type="button"  wrs-type="plus"><i class="fa fa-plus-square"></i></button>';
	var btn_minus		=	'<button class="DRILL_HIERARQUIA_LINHA" column="'+column+'" grid-id="'+IDGrid+'" rows="'+LAYOUT_ROWS_B64+'" line="'+line+'"  data="'+_data+'" type="button"  wrs-type="minus"><i class="fa  fa-minus-square"></i></button>';

	
	//De o drill for nulo já assume a posição de Abertura
	if(DRILL_HIERARQUIA_REQUEST=='')
	{
		arg.drill_line_total_data[line]=	true;
		return btn_plus+data;
	}else{
		try{
				if(DRILL_HIERARQUIA_REQUEST['line'][C000])
				{
					if(DRILL_FCC[DRILL_HIERARQUIA_REQUEST['line'][C000]['LEVEL']-1]==column)
					{
						return btn_minus+data;
					}
				}
			}catch(e){console.warn(' exception');}		
		
		
		try{
				if(DRILL_HIERARQUIA_REQUEST['data'][data])
				{
					//Verificanso se a p´roxima coluna está nula então ela é coluna de TOTAL
					if(empty(data_line[next_column])){
						return btn_plus+data;
					}
					
					return  data;
				}
			}catch(e){console.warn(' exception');}	
	
	
	}
	
	arg.drill_line_total_data[line]=	true;
	
	_END('DRILL_HIERARQUIA_LINHA_setButton');
	return btn_plus+data;
}

		 
function DRILL_HIERARQUIA_LINHA_HEADER_CLICK()
{
	_START('DRILL_HIERARQUIA_LINHA_HEADER_CLICK');
	var column		=	$(this).attr('column');
	var grid_id		=	$(this).attr('grid-id');
	var kendoGrid	=	$(grid_id).data('kendoGrid');
	var DrillData	=	[];
	var DrillDataCol=	[];
	var flag_load	=	true;
	var rows		=	kendoGrid.wrsKendoUi.WRS_ROWS;
	var wrs_type	=	$(this).attr('wrs-type');
	var DrillDataTMP=	"";
	
	

	for(lineData in rows)
	{
		if(flag_load)
		{
			DrillData[DrillData.length]			=	'{_*_}';
			
			DrillDataCol[DrillDataCol.length]	=	rows[lineData];

			if(rows[lineData]==column)
			{
				flag_load	=	false;
			}
		}
	}
	
	//Se for para remover removo o ultimo elemento
	if(wrs_type=='minus')
		{
			DrillData.pop();
			DrillDataCol.pop();
		}
	
	
	DrillDataTMP		=	implode('(_,_)',DrillData);
	
	
	if(wrs_type=='minus')
	{
			if(DrillData.length==0)
				{
					DrillDataCol	=	[];
					//Essa conferencia é direto na query
					DrillDataTMP=	"DRILL_LINHA_RESTAR_CONSULTA";
				}
	}
	
	
	//TRACE_DEBUG(DrillDataTMP);
	
	var s_param		=	 [];
		
		s_param['DRILL_HIERARQUIA_LINHA_DATA_HEADER']	=	base64_encode(DrillDataCol.join(','));
		s_param['DRILL_HIERARQUIA_LINHA_DATA']			=	base64_encode(DrillDataTMP);
		s_param['PAGE_CURRENT']							=	kendoGrid.dataSource._page;
		s_param['TYPE_RUN']								=	TYPE_RUN.coluna_header;


		wrsKendoUiChange(grid_id,'',s_param);
		

		wrsRunFilter();
	_END('DRILL_HIERARQUIA_LINHA_HEADER_CLICK');
	return false; //Obriga a não reordenar a coluna

}














function DRILL_HIERARQUIA_LINHA_CLICK_PLUS_MINUS()
{
	
	_START('DRILL_HIERARQUIA_LINHA_CLICK_PLUS_MINUS');
	var column		=	 $(this).attr('column');
	var line		=	 $(this).attr('line');
	var data		=	 $(this).attr('data');
	var wrs_type	=	 $(this).attr('wrs-type');
	var rows		=	 $.parseJSON(base64_decode($(this).attr('rows')));
	var grid_id		=	 $(this).attr('grid-id');
	var DrillData	=	[];
	
	var kendoGrid		=	$(grid_id).data('kendoGrid');
	var flag_load	=	 true;

	
	for(lineData in rows)
	{
		
		if(flag_load)
		{
			DrillData[DrillData.length]=	kendoGrid._wrs_data[line][rows[lineData]];

			if(rows[lineData]==column)
			{
				flag_load	=	false;
			}
		}
	}

	
	var options_change		=		
	{
			'PAGE_CURRENT'					:	kendoGrid.dataSource._page,
			'TYPE_RUN'						:	TYPE_RUN.coluna_header,
			'DRILL_HIERARQUIA_LINHA_DATA'	:	base64_encode(implode('(_,_)',DrillData))
	}
	
	
	if(wrs_type=='minus')
	{
		options_change['DRILL_HIERARQUIA_LINHA_DATA_MINUS']	=	'remove_line';
	}
	
	$(chIClass(grid_id)).wrsAbaData('setKendoUi',options_change);
	
	wrsRunFilter();
	
	_END('DRILL_HIERARQUIA_LINHA_CLICK_PLUS_MINUS');
}



function DRILL_HIERARQUIA_LINHA_createEventClick(IDGrid)
{
	_ONLY('DRILL_HIERARQUIA_LINHA_createEventClick');
	$(IDGrid).find('.DRILL_HIERARQUIA_LINHA').unbind('click').click(DRILL_HIERARQUIA_LINHA_CLICK_PLUS_MINUS);
}


function DRILL_HIERARQUIA_LINHA_onDataBindingHideColumn()
{
	
	
}







 

 
 


 

function dirname_VIR(name)
{
	_START('dirname_VIR');
	var _explode	=	explode('{VIR}',name);
	var data		=	[];
		for(var i=0 ; i<_explode.length-1;i++)	data[data.length]=	_explode[i];
		
	_END('dirname_VIR');	
	return implode('{VIR}',data);
}


 
 