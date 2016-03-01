<?php

/**
 * 
 * GLobais padronizados 
 * 
 * @author msdantas
 *
 */
 
/*
 * COMO USAR
<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js?332458"></script>
<script type="text/javascript" src="api/alphasoft/js/Global.js?520751"></script>

<body>
<script>

$('body').WrsGlobal('setJS',{type:'filter',data:{a:1,b:2,c:3}});
$('body').WrsGlobal('setJS',{type:'drill',data:'dataFinal'});
</script>
<?php


include_once 'config/configCommon.php';


WRS_GLOBAL::setPHP(array('type'=>'measure','data'=>array(1,2,3,4,5,6)));
WRS_GLOBAL::setPHP(array('type'=>'attr','data'=>array('ano'=>2012,'mes'=>11)));
WRS_GLOBAL::setJS(array('type'=>'drill','data'=>array('col'=>'CANAL')));



echo WRS_GLOBAL::loadGLobal();

echo '<pre>';
print_r(WRS_GLOBAL::getPHP('measure'));

?>
</body>
*/

class WRS_GLOBAL
{
	/*
	 * 										php					:	{},//Variáveis do PHP
											js					:	{
																	//drill : {'parent':event, 'type':'linha'}
												
											}//Variáveis do JS
											
	 */
	private static $param	=	 array('php'=>array(),'js'=>array());
	
	
	
	
	/**
	 * Gravando globais para JS navtivos do PHP
	 * @param array $data
	 */
	public static function setPHP($data)
	{
		self::$param['php'][$data['type']]	=	$data['data'];
	}
	
	
	
	
	/**
	 * Gravando globais para JS navtivos do JS
	 * @param array $data
	 */
	public static function setJS($data)
	{
		self::$param['js'][$data['type']]	=	$data['data'];
	}
	
	
	
	/**
	 * Retornando os dados do JS
	 * @param string $type
	 */
	public static function getJS($type=NULL)
	{
		if($type!=NULL && isset(self::$param['js'][$type])) return self::$param['js'][$type];	
		
		return  self::$param['js'];
		
	}
	
	
	
	
	/**
	 * Retornando os dados do JS do PHP
	 * @param string $type
	 */
	public static function getPHP($type=NULL)
	{
		if($type!=NULL && isset(self::$param['php'][$type])) return self::$param['php'][$type];
	
		return  self::$param['php'];
	}
	
	/**
	 * Retornando todos os parametros da variável
	 */
	public static function getData()
	{
		return  self::$param;
	}
	
	
	
	/**
	 * Gerando JSON
	 * @return string
	 */
	public static function getJson()
	{
		return json_encode(self::$param,true);
	}
	
	
	/**
	 * Carregando o JS
	 */
	public static function loadGLobal()
	{
		$val	= self::getJson();
		$html	=	<<<HTML
			<script>
					$('.body').WrsGlobal('loadGLobal',{$val});	
			</script>
HTML;
		return $html;
	}
	
	
	
	
}