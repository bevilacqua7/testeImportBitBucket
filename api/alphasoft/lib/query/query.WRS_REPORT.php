<?php

/**
 * Contem Querys para a verificação da conexão do usuário
 * @author msdantas
 */

class QUERY_WRS_REPORT
{
	
	public function Get_SSAS_Reports_Groups($CUSTOMER_ID)
	{

		$query			=	"select distinct USER_TYPE from ATT_WRS_USER where CUSTOMER_ID =".$CUSTOMER_ID;
		return $query;
		
	}
	
	
	
	/**
	 * Gerando o CSV
	 * 
	 * @param string $TABLE_NAME
	 * @param string $FILE
	 * 
	 * @return string
	 */
	public function csv_generate($TABLE_NAME,$FILE)
	{
		$FIELDS			=	'*';
		$FILTER			=	'';
		$SEPARATOR		=	';';
		$USER_CODE		=	WRS::USER_CODE();
		$USER_MASTER	=	WRS::USER_MASTER();
		$EXPORT_DESC	=	$TABLE_NAME;
		
		return $this->EXPORT_TABLE($TABLE_NAME, $FIELDS, $FILTER, $FILE, $SEPARATOR, $USER_CODE, $USER_MASTER, $EXPORT_DESC);
		
	}
	
	
	public function EXPORT_TABLE(	$TABLE_NAME,
									$FIELDS,
									$FILTER,
									$FILE,
									$SEPARATOR,
									$USER_CODE,
									$USER_MASTER,
									$EXPORT_DESC)
	{

		$HTML		= <<<HTML
								EXEC Export_Table
													'{$TABLE_NAME}',
													'{$FIELDS}',
													'{$FILTER}',
													'{$FILE}',
													'{$SEPARATOR}',
													'{$USER_CODE}',
													'{$USER_MASTER}',
													'{$EXPORT_DESC}'
HTML;
		
		return $HTML;
	}
	
	
	/**
	 * Gerando o zip
	 * 
	 * @param string $ZipFolder
	 * @param string $ZipFile
	 * 
	 * @return string
	 */
	public  function zip_generate($ZipFolder, $ZipFile)
	{
		$ZipCommand		=	'ZIP';
		$Replace		=	'1';
		$ShowOutput		=	'0';
		
		/*
			'E:\WEB\_root\DEV\SANTOS\WRS\TESTE.CSV',
			'E:\WEB\_root\DEV\SANTOS\WRS\TESTE.ZIP',
		*/
		
		$HTML	=	<<<HTML
								EXEC Compress_Files 
														'{$ZipCommand}',
														'{$ZipFolder}',
														'{$ZipFile}', 
														{$Replace}, 
														{$ShowOutput}
HTML;
		
		
		return $HTML;
								
	}
	
	
	
	
	
	
}