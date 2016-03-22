<?php
/*
 * jQuery File Upload Plugin PHP Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */



include_once ((dirname(dirname(dirname(dirname(__DIR__))))).DIRECTORY_SEPARATOR.'config'.DIRECTORY_SEPARATOR.'configCommon.php');//.'config\configCommon.php');




error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
$upload_handler = new UploadHandler();
