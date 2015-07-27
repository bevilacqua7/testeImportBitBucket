<?php

/**
 * Barra de separação entre arquivos específica do sistema operacional
 * @var string
 */
define('DS',DIRECTORY_SEPARATOR);

/**
 * Carrega as configurações Antigas do WRS
 */
include_once(dirname(__DIR__).DS."funcoes.php");
include_once(dirname(__DIR__).DS."dicionario.php");
include_once(dirname(__DIR__).DS."db/config.php");

//Tem que verifica pois pode haver erros ao carregar
include_once(dirname(__DIR__).DS."constroiDialogs.php");

/**
 * Carrega as confirurações padrões do sistema
 */


define('REFERENCE_JS_PATH',dirname(__DIR__).DIRECTORY_SEPARATOR);


include_once(dirname(__DIR__).DS.'api'.DS.'alphasoft'.DS.'config.php');

includeSTATIC('WRS');


?>