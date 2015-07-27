/**
 * Apenas faz a indexação das headers para que possa ser consultada de formamais eficaz
 * 
 */ 



//Executa depois que a grid está renderizada
function WRSHeaderIndex(kendoUi)
{
	
	var kendoUiColumns		=	kendoUi.columns;
	var indexByField		=	[];
	var indexFullNameMeasure=	[];
	var layout				=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	var measures			=	explode(',',layout.LAYOUT_MEASURES);
	var measure_title		=	[];
	
	for(mo in measures)
		{
			indexFullNameMeasure[measures[mo]]	=	[];
		}
	
	
	
	var index_category_chart	=	 function(tmpComeBack)
	{
		var limit		=	0;
		var category	=	[];
		
		for(ifnm in indexFullNameMeasure)
		{
			var label	=	indexFullNameMeasure[ifnm];
			 
				measure_title[ifnm]	=	tmpComeBack.field[label[0]].title;
			
				if(limit)continue;
	
				for(llo in label)
				{
					var _key	=	!empty(indexByField[label[llo]].c_parent) ?  indexByField[label[llo]].c_parent : indexByField[label[llo]].field;
					
					
						if(!empty(indexByField[label[llo]].c_parent))
							{
								category[category.length]=tmpComeBack[_key]['title'];
							}else{
								category[category.length]=tmpComeBack.field[_key]['title'];
							}
				}
				limit++;
		}
		
		return category;
	}
	
	var directDrillRecursive	=	 function(data,_index_TR,_index_TD,key_parent)
	{
		var tmp			=	[];
		var index_TR	=	_index_TR;
		var index_TD	=	_index_TD;
		var tmpComeBack	=	[];
		var vValue		=	'';
			
			/*
			 * Apenas garantindo o start do Array
			 */
			if(!index_TD[index_TR])
			{
				index_TD[index_TR]=0;
			}
			
			
		var key								=	index_TR+'_'+index_TD[index_TR];
			tmpComeBack[key]				=	data;
			tmpComeBack[key]['c_parent']	=	key_parent;
			index_TR						=	index_TR+1;
			vValue							=	tmpComeBack[key];
			
			//foreach(tmpComeBack[key]);
			//criando o index por field
			if(isset(vValue['field']))
			{
				indexByField[vValue['field']]	=	tmpComeBack[key];	
				
				
				if(array_find_data(indexFullNameMeasure,vValue['LEVEL_FULL']))
				{
					indexFullNameMeasure[vValue['LEVEL_FULL']][indexFullNameMeasure[vValue['LEVEL_FULL']].length]	=	vValue['field'];
				}
			}

			
			if(isset(data['columns']))
			{
				var dt					=	data.columns;
				for(x in dt)
				{
					tmp			=	directDrillRecursive(dt[x],index_TR,index_TD,key);
					tmpComeBack	=	_local_merge_array(tmpComeBack,tmp['data']);
					index_TD[index_TR]++;
				}
			}	
		
		return {'data':tmpComeBack,'td':index_TD};
	}
	
	
	var directDrillRecursiveStart	=	 function (column)
	{
		var tmp			=	[];
		var tmpComeBack	=	[];
		var index_TR	=	0;
		var index_TD	=	[];

			for(xobj in column)
			{
				/*
				 * Apenas garantindo o start do Array
				 */
				if(!index_TD[index_TR])
				{
					index_TD[index_TR]	=	0;
				}
				
				tmp				=	directDrillRecursive(column[xobj],index_TR,index_TD,'');
				tmpComeBack		=	_local_merge_array(tmpComeBack,tmp['data']);
				
				index_TD[index_TR]++;
			}
			
			tmpComeBack['field']					=	indexByField;
			tmpComeBack['chart']					=	[];
			tmpComeBack['chart']['data']			=	indexFullNameMeasure;
			tmpComeBack['chart']['category']		=	index_category_chart(tmpComeBack);
			tmpComeBack['chart']['measure_title']	=	measure_title;
			return tmpComeBack;		
	}

	
	
	return directDrillRecursiveStart(kendoUiColumns);

	//kendoUi.sender.hideColumn(columnsStructureWrs['APRESENTACAO']);
	
}

