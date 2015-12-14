<?php

class Upload extends WRS_BASE
{

	private $event			=  	NULL;
	private $file			= 	array();
	private $directory		=	NULL;

	public function run($event)
	{
		$this->event		=	empty($event)?fwrs_request('event'):$event;
		$this->directory	=	dirname(__FILE__)."/../../var/upload/";
		if(!is_dir($this->directory)){
			exec("mkdir ".$this->directory,$retorno);
		}
		
		
		
	}
	
}