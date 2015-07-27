<?php

/**
 * Barra de separação entre arquivos específica do sistema operacional
 * @var string
 */
define('DS',DIRECTORY_SEPARATOR);
//define('PATH_WRS')

/**
 * Diretório da Raiz
 * @var string
 */
define('PATH_MAIN',dirname(__DIR__).DS);

/**
 * Endereço do arquivo ini
 * @var string'
 */
define('PATH_INI',PATH_MAIN.'WRS.ini');


include_once(dirname(__DIR__).DS.'api'.DS.'alphasoft'.DS.'config.php');

includeSTATIC('WRS');

include_once(PATH_DEFINE.DS.'common.php');

/**
 * Trazendo as informações do arquivo ini
 */
	$conn_wrs	=	 NULL;
	if(!isset($_REQUEST['URL_CONNECT']))
	{
		WRS_INI::LOAD_INI();
		$ini	=	 WRS_INI::get_full_var();
		$connectionInfo_wrs = array(	"Database"					=>$ini['DATABASE_ID'],
										'UID'						=>$ini['DATABASE_USER'],
										'PWD'						=>$ini['DATABASE_PWD'],
										'CharacterSet'				=>'UTF-8',
										'APP'						=>'WRS',
										'ConnectionPooling'			=>0,
										'MultipleActiveResultSets'	=>true,
										'TransactionIsolation'		=>SQLSRV_TXN_READ_UNCOMMITTED
										//,'TraceFile'				=>'D:\WEB\TEMP\WRS_SQL_TRACE.TXT'
										//,'TraceOn'					=>true
									);
		$conn_wrs 			= sqlsrv_connect( $ini['DATABASE_SERVER'], $connectionInfo_wrs);
		
		if( $conn_wrs === false )
		{
			echo "Could not connect.\n<pre>";
			die( print_r( sqlsrv_errors(), true));
		}
	}
/*
 * FIM da Conexão com o Banco de dados
 */





?>