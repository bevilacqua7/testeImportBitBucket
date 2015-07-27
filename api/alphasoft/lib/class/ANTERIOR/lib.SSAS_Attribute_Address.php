<?php 



class SSAS_Attribute_Address
{
	
	private $Relationships		=	array();

	
	/**
	 * Envia o Array do Relation Sheep para comparar
	 * @param array $Relationships
	 */	
	public function setRelationships($Relationships)
	{
		//json_decode(WRS::getWRS_DASHBOARD_Relationships(),true)
		$this->Relationships	=	  $Relationships;
	}
	
	

	
	public function __construct()
	{
		
	/*
				"EXEC Get_SSAS_Attribute_Address 	'192.168.1.3',
													'ALPHASOFT\automacao',
													'auto!@#123',
													'GSK - DDD',
													'GSK - DDD',
													'[GEOGRAFIA].[BRICK]',
			
													'
														[GEOGRAFIA].[BRICK].[0437 - S.JERONIMO],
														[GEOGRAFIA].[BRICK].[0434 - BR.TIJUCA/R.BANDEIRANTES],
														[GEOGRAFIA].[BRICK].[0431 - JACAREPAGUA/PECHINCHA],
														[GEOGRAFIA].[BRICK].[0426 - BARRA TIJUCA],
														[GEOGRAFIA].[BRICK].[0394 - VILA MILITAR],
														[GEOGRAFIA].[BRICK].[0439 - CAMPO GRANDE],
														[GEOGRAFIA].[BRICK].[0410 - BOTAFOGO / FLAMENGO],
														[GEOGRAFIA].[BRICK].[0427 - BARRA TIJUCA / AMERICAS],
														[GEOGRAFIA].[BRICK].[0422 - LEBLON],
														[GEOGRAFIA].[BRICK].[0348 - TIJUCA],
														[GEOGRAFIA].[BRICK].[0441 - ITAGUAI],
														[GEOGRAFIA].[BRICK].[0357 - MEIER / E.DENTRO],
														[GEOGRAFIA].[BRICK].[0350 - PRACA SAENZ PENA],
														[GEOGRAFIA].[BRICK].[0428 - CURICICA],
														[GEOGRAFIA].[BRICK].[0369 - BONSUCESSO],
														[GEOGRAFIA].[BRICK].[0398 - ILHA GOVERNADOR-CACUIA],
														[GEOGRAFIA].[BRICK].[0395 - BANGU / A.FIGUEIREDO],
														[GEOGRAFIA].[BRICK].[0343 - FATIMA],
														[GEOGRAFIA].[BRICK].[0354 - MARACANA],
														[GEOGRAFIA].[BRICK].[0409 - LARANJEIRAS],
														[GEOGRAFIA].[BRICK].[0370 - PENHA],
														[GEOGRAFIA].[BRICK].[0404 - COPACABANA-B.RIBEIRO],
														[GEOGRAFIA].[BRICK].[0399 - COPACABANA / LIDO],
														[GEOGRAFIA].[BRICK].[0337 - CENTRO / PRES. VARGAS],
														[GEOGRAFIA].[BRICK].[0413 - BOTAFOGO / VL.PATRIA]
			'";
		
	*/
	}
	
	
	
	 
}

?>