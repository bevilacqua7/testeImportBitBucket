<?php

/**
 * Obtendo informações do usuário
 */

includeCLASS('WRS_BASE');

class ATT_WRS_USER extends WRS_BASE
{
	
	private $OBJECT	= NULL;
	
	
	
	public function SetObject($Object)
	{
		$this->OBJECT=$Object;
	}
	
	public function insert($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>INSERT CLASS - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	public function update($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>UPDATE CLASS - tabela: '.$_tabela.'<hr>'.print_r($_POST,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	public function delete($options)
	{
		$_fields			= $options['field'];
		$_request_original 	= $_REQUEST;
		$_tabela			= $options['table'];
		$arr_campos_request = array();
		foreach($_fields as $nome_campo => $valores){
			if(array_key_exists($nome_campo, $_request_original)){
				$arr_campos_request[$nome_campo]=$_request_original[$nome_campo];
			}
		}
		
		$param	=	 $this->OBJECT->build_grid_form($options);	
		$param['html']			=	'<pre>DELETE CLASS - tabela: '.$_tabela.'<hr>'.json_encode($arr_campos_request,1).'</pre>'.$param['html'];	
		return $param;
	}
	
	

}

?>