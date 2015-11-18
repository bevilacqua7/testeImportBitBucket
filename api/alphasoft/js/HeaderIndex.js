/**
 * Apenas faz a indexação das headers para que possa ser consultada de formamais eficaz
 * 
 */ 



//Executa depois que a grid está renderizada
function WRSHeaderIndex(kendoUi)
{
	_START('WRSHeaderIndex');
	var kendoUiColumns		=	kendoUi.columns;
	var indexByField		=	[];
	var countColumn			=	[];
	var byFrozenLevelFull	=	[];
	var indexFullNameMeasure=	[];
	var layout				=	wrsKendoUiContextMenuGetLayoutInfo(kendoUi);
	var measures			=	explode(',',layout.LAYOUT_MEASURES);
	var measure_title		=	[];
	var TOTAL				=	LNG('LINE_TOTAL');
	var column_total		=	[];
	
	for(mo in measures)
		{
			indexFullNameMeasure[measures[mo]]	=	[];
		}
	
	
	
	var index_category_chart	=	 function(tmpComeBack)
	{
		_START('WRSHeaderIndex::index_category_chart');
		var limit		=	0;
		var category	=	[];
		
		
		for(ifnm in indexFullNameMeasure)
		{
			var label	=	indexFullNameMeasure[ifnm];
			 
				try{
					measure_title[ifnm]	=	tmpComeBack.field[label[0]].title;
				}catch(e){
					console.log('pode não existir title');
				}
			
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
		_END('WRSHeaderIndex::index_category_chart');
		return category;
	}
	
	var directDrillRecursive	=	 function(data,_index_TR,_index_TD,key_parent,_isTOTAL)
	{
		_START('WRSHeaderIndex::directDrillRecursive');
		var tmp			=	[];
		var index_TR	=	_index_TR;
		var index_TD	=	_index_TD;
		var tmpComeBack	=	[];
		var vValue		=	'';
		var isTOTAL		=	_isTOTAL;
			
			/*
			 * Apenas garantindo o start do Array
			 */
			if(!index_TD[index_TR])
			{
				index_TD[index_TR]=0;
			}
			
			if(isTOTAL)
			{
				if(!empty(data.field)){
					column_total[data.field]	=	data.title;
				}

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
				indexByField[vValue['field']]				=	tmpComeBack[key];	
				countColumn[countColumn.length]				=	vValue['field'];
				
				
				if(tmpComeBack[key]['map']!="[LATITUDE]"){///Não preenche com a latitude
					byFrozenLevelFull[vValue['LEVEL_FULL']]		=	tmpComeBack[key];
				}
				
//				foreach(tmpComeBack[key])
				
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
					if(dt[x]['TOTAL']=='S') isTOTAL = true;
					
					tmp			=	directDrillRecursive(dt[x],index_TR,index_TD,key,isTOTAL);
					tmpComeBack	=	_local_merge_array(tmpComeBack,tmp['data']);
					index_TD[index_TR]++;
				}
			}	
		_END('WRSHeaderIndex::directDrillRecursive');
		return {'data':tmpComeBack,'td':index_TD};
	}
	
	
	var directDrillRecursiveStart	=	 function (column)
	{
		_START('WRSHeaderIndex::directDrillRecursiveStart');
		var tmp			=	[];
		var tmpComeBack	=	[];
		var index_TR	=	0;
		var index_TD	=	[];
		var isTOTAL		=	false;
			for(xobj in column)
			{
				isTOTAL	=	false;
				/*
				 * Apenas garantindo o start do Array
				 */
				if(!index_TD[index_TR])
				{
					index_TD[index_TR]	=	0;
				}
				
				if(column[xobj].is_total=='S') isTOTAL	=	true;
					
				tmp				=	directDrillRecursive(column[xobj],index_TR,index_TD,'',isTOTAL);
				tmpComeBack		=	_local_merge_array(tmpComeBack,tmp['data']);
				
				index_TD[index_TR]++;
			}
			
			
			
			
			tmpComeBack['field']					=	indexByField;
			tmpComeBack['column_count']				=	countColumn;
			tmpComeBack['column_total']				=	column_total
			tmpComeBack['byFrozenLevelFull']		=	byFrozenLevelFull;
			//foreach(byFrozenLevelFull);
			tmpComeBack['chart']					=	[];
			tmpComeBack['chart']['data']			=	indexFullNameMeasure;
			tmpComeBack['chart']['category']		=	index_category_chart(tmpComeBack);
			tmpComeBack['chart']['measure_title']	=	measure_title;
			_END('WRSHeaderIndex::directDrillRecursiveStart');
			return tmpComeBack;		
	}

	
	_END('WRSHeaderIndex');	
	return directDrillRecursiveStart(kendoUiColumns);

	//kendoUi.sender.hideColumn(columnsStructureWrs['APRESENTACAO']);
	
}

