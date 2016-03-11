<?php


class HeaderTag 
{
	 private $tags		=	 array();
	 
	 
	 
	 public function __construct()
	 {
	 	
	 }
	 
	 
	 public function header($type)
	 {
	 	$html	=	 $this->css($type).PHP_EOL;
	 	$html	.=	$this->js($type).PHP_EOL;
	 	 
	 	return $html;
	 }
			 
	 
	 private function css($type)
	 {
	 	$tag		=	array();
	 	
	 	$tag[]		=	array("host"=>"api/font-awesome-4.3.0/css/font-awesome.min.css",						"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/bootstrap-3.3.0/dist/css/bootstrap.css",								"access"=>array("panel","main",'login'));
//		$tag[]		=	array("host"=>"./api/bootstrap-3.3.0/dist/css/bootstrap-wrs.css",						"access"=>array("main"));			//Main
//		$tag[]		=	array("host"=>"./api/bootstrap-3.3.0/dist/css/bootstrap-theme.min.css",					"access"=>array("main"));			//Main
		$tag[]		=	array("host"=>"./css/wrs_config.css",													"access"=>array("main"));			//Main
	 	$tag[]		=	array("host"=>"css/jquery/jquery-ui.css",												"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/contextMenu/src/jquery.contextMenu.css",								"access"=>array("main","panel"));
	 	
	 	
	 	//Kendo Ui
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.common.min.css",								"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.default.min.css",								"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.rtl.min.css",									"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.dataviz.min.css",								"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.blueopal.min.css",								"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.dataviz.default.min.css",						"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/kendoUi/styles/kendo.mobile.all.min.css",							"access"=>array("main","panel"));
	 	
	 	
	 	//Jquery Modal
	 	$tag[]		=	array("host"=>"api/jquery.modal-1.2/css/jquery.modal.wrs.job.css",						"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/jquery.modal-1.2/css/jquery.modal.css",								"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/jquery.modal-1.2/css/jquery.modal.theme-xenon.css"	,				"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/jquery.modal-1.2/css/jquery.modal.theme-atlant.css",					"access"=>array("main","panel"));
	 	
	 	$tag[]		=	array("host"=>"api/alertify/themes/alertify.core.css",									"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/alertify/themes/alertify.default.css",								"access"=>array("main","panel"));
	 	
	 	$tag[]		=	array("host"=>"api/contextjs/context.bootstrap.css",									"access"=>array("panel"));
	 	$tag[]		=	array("host"=>"api/contextjs/context.standalone.css",									"access"=>array("panel"));
	 	$tag[]		=	array("host"=>"api/silviomoreto-bootstrap-select/dist/css/bootstrap-select.min.css",	"access"=>array("panel"));
	 	
	
	 	
	 	
	 	$tag[]		=	array("host"=>"api/jquery.qtip.custom/jquery.qtip.css",									"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"api/fakeLoader/fakeLoader.css",											"access"=>array("main","panel",'login'));//Main
	 	$tag[]		=	array("host"=>"css/".WRS::INFO_SSAS_LOGIN('USER_FORMAT')."/jquery-ui-1.8.22.custom.css",								"access"=>array("main","panel"), 'add_tags'=>' id="themeHost" host="./css/{host}/jquery-ui-1.8.22.custom.css?v=1.0"');
	 	$tag[]		=	array("host"=>"css/wrs_common.css",														"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"css/wrs_panel.css",														"access"=>array("panel") );
	 	$tag[]		=	array("host"=>"css/wrs_main.css",														"access"=>array("main") );
	 	

//	 	$tag[]		=	array("host"=>"api/assets/css/allWrs.css",											"access"=>array("main"));
	 	$tag[]		=	array("host"=>"api/fonte/stylesheet.css",											"access"=>array("main"));
	 //	$tag[]		=	array("host"=>"api/assets/utilcarousel-files/utilcarousel/util.carousel.skins.css",	"access"=>array("main"));
	 	
	 	
	 	
	 	//MENU OPTINOS 
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/css/normalize.css",	"access"=>array("main"));
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/css/demo.css",		"access"=>array("main"));
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/css/icons.css",		"access"=>array("main"));
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/css/component.css",	"access"=>array("main"));
	 	
	 	// MENU CUBO 
	 	$tag[]		=	array("host"=>"api/CaptionHoverEffects/css/default.css",	"access"=>array("main"));
	 	$tag[]		=	array("host"=>"api/CaptionHoverEffects/css/component.css",	"access"=>array("main"));
	 	

	 	

	 	//LOGIN
	 	$tag[]		=	array("host"=>"api/bootstrap-3.3.0/signin.css",											"access"=>array("login"));
	 	$tag[]		=	array("host"=>"css/login.css",											"access"=>array("login"));
	 	
	 	if(wrs_get_user_browser()=='ie')
	 	{
	 		$tag[]		=	array("host"=>"./css/wrs_ie.css",						"access"=>array("main","panel"));
	 	}
	 	
	 	if(wrs_get_user_browser()=='firefox')
	 	{
	 		$tag[]		=	array("host"=>"./css/wrs_firefox.css",						"access"=>array("main","panel"));
	 	}
	 	
	 	return $this->link($tag,$type);
	 	
	 }
	 
	 
	 
	 
	 private function js($type)
	 {
	 	$tag		=	 array();
	 	
	 	$tag[]		=	array("host"=>"js/jquery-ui/jquery-latest.js",				"access"=>array("main","panel","login"));  //Main
	 	$tag[]		=	array("host"=>"js/jquery/jquery-1.8.2.min.js",				"access"=>array("main","panel",'login'));	//Main
	 	
	 	
	 	$tag[]		=	array("host"=>"api/bootstrap-3.3.0/js/dropdown.js",			"access"=>array("main","panel"));
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."php_js.js",						"access"=>array("main","panel",'login'));	//Main
	 	$tag[]		=	array("host"=>"js/jquery-ui/jquery-ui.js",					"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>"js/jquery-ui/jquery.ui.touch-punch.min.js",	"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>"js/jquery-ui/jquery.layout-latest.js",		"access"=>array("main","panel"));	//Main
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."Global.js",						"access"=>array("main","panel",'login'));	//Main
	 	$tag[]		=	array("host"=>JS_PATH_API."common.js",						"access"=>array("main","panel","login"));	//Main
	 	$tag[]		=	array("host"=>"language_javascript.php",				"access"=>array("main","panel",'login'));			//Main
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."ThreadJobManager.js",			"access"=>array("panel"));
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."Layouts.js",						"access"=>array("panel"));
	 	
	 	$tag[]		=	array("host"=>"api/contextMenu/src/jquery.contextMenu.js","access"=>array("panel"));		//Main
	 	
	 	$tag[]		=	array("host"=>"api/bootstrap-3.3.0/js/modal.js",		"access"=>array("main","panel"));		//Main
	 	
	 	$tag[]		=	array("host"=>"api/jquery.modal-1.2/js/jquery.modal.min.js","access"=>array("main","panel"));
	 	
	 	$tag[]		=	array("host"=>"api/alertify/src/alertify.js",			"access"=>array("main","panel"));		//Main
	 	
	 	//http://igorescobar.github.io/jQuery-Mask-Plugin/
	 	$tag[]		=	array("host"=>"api/jQuery-Mask-Plugin-535b4e4/jquery.mask.min.js",			"access"=>array("main"));		//Main
	 	
	 	$tag[]		=	array("host"=>"api/contextjs/context.js",					"access"=>array("panel"));
	 	
	 	$tag[]		=	array("host"=>"api/silviomoreto-bootstrap-select/js/bootstrap-select.js","access"=>array("panel"));

	 	$tag[]		=	array("host"=>"api/kendoUi/js/angular.min.js",				"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>"api/kendoUi/src/js/kendo.all.js",			"access"=>array("main","panel"));	//Main

	 	$tag[]		=	array("host"=>"api/kendoUi/examples/content/shared/js/console.js","access"=>array("main","panel"));//Main
	 	
	 	$tag[]		=	array("host"=>"api/kendoUi/js/messages/kendo.messages.pt-BR.min.js","access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>"api/kendoUi/js/jszip.min.js",				"access"=>array("main","panel"));//Main
	 	$tag[]		=	array("host"=>"api/kendoUi/js/kendo.dataviz.themes.min.js",	"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>"http://maps.googleapis.com/maps/api/js?key=AIzaSyAvq_yJP8-zcJZNuwF47gmhIGPXQhjlTgE&sensor=true&v=3.exp","access"=>array("panel"),'version'=>'no-use');
	 	$tag[]		=	array("host"=>"api/gomap/jquery.gomap-1.3.3.js",			"access"=>array("panel"));

	 	
	 
	 	$tag[]		=	array("host"=>JS_PATH_API."tooltipQtip.js",						"access"=>array("panel",'main'));
	 	
	 	//Developer AlphaSoft
	 	$tag[]		=	array("host"=>JS_PATH_API."KendoUi.js",						"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."WindowGrid.js",					"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>JS_PATH_API."Maps.js",						"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."KendoUiChart.js",				"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."GridEventsTools.js",				"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."HeaderIndex.js",					"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."DrillLine.js",					"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."TopOptions.js",					"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."GenericModal.js",				"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>JS_PATH_API."Menu.js",						"access"=>array("main","panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."templateReport.js",				"access"=>array("panel")	);
	 	$tag[]		=	array("host"=>JS_PATH_API."adminWindows.js",				"access"=>array("main","panel"));	//Main
	 	$tag[]		=	array("host"=>JS_PATH_API."Abas.js",						"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."Filter.js",						"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."Drill.js",						"access"=>array("panel"));
	 	$tag[]		=	array("host"=>JS_PATH_API."MultipleCube.js",				"access"=>array("panel"));
	 	
	 	
	 	
	 	$tag[]		=	array("host"=>"api/jquery.qtip.custom/jquery.qtip.min.js",	"access"=>array("main","panel"));//Main
	 	$tag[]		=	array("host"=>"api/fakeLoader/fakeLoader.js",				"access"=>array("main","panel",'login'));//Main
	 	

//	 	$tag[]		=	array("host"=>"api/assets/utilcarousel-files/utilcarousel/jquery.utilcarousel.js?r=1.2",				"access"=>array("main"),'version'=>'no-use');//Main
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."Painel.js",				"access"=>array("panel"));
	 	
	 	
	 	/* API modernizr */
	 	$tag[]		=	array("host"=>"api/modernizr/modernizr-custom.js",	"access"=>array("main"));//Main
	 	
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/js/classie.js",	"access"=>array("main"));//Main
	 	$tag[]		=	array("host"=>"api/MultiLevelPushMenu/js/mlpushmenu.js",	"access"=>array("main"));//Main
	 	
	 	$tag[]		=	array("host"=>"api/CaptionHoverEffects/js/toucheffects.js",	"access"=>array("main"));//Main
	 	
	 	$tag[]		=	array("host"=>JS_PATH_API."custonMain.js",				"access"=>array("main"));
	 	
	 	
	 	//Login
	 	$tag[]		=	array("host"=>JS_PATH_API."login.js",						"access"=>array("login"));	//Main
	 	
	 	return $this->script($tag,$type);
	 	
	 }
	 
	 
	 
	 public function script($tag,$type)
	 {
	 	
	 		$html		=	"";
	 		
	 		foreach($tag as $tag_html)
	 		{
	 			$host		=	$tag_html['host'];
	 			$version	=	false;
	 			
	 			if(!in_array($type,$tag_html['access']))  continue;

	 			
	 			if(array_key_exists('version', $tag_html))
	 			{
	 				$version	=	$tag_html['version'];
	 			
	 			}
	 			
	 			
	 			if($version!='no-use')
	 			{
		 			if(WRS_INI::WRS_SERVER('ACTIVE_RAND_JS')==true)
		 			{
		 				$host	.='?'.rand(0,999999);
		 			}
		 			else
		 			{
		 				if($version)
		 				{
		 					$host.='?'.$tag_html['version'];
		 				}
		 				else
		 				{
		 					$host.='?'.RAND_TOKEN;
		 				}
		 			}
	 			}
	 			

	 			
	 			$html.='<script type="text/javascript" src="'.$host.'"></script>'.PHP_EOL;
	 		}
	 		
	 		
	 		return $html;
	 }
	 
	 
	 
	 
	 public function link($tag,$type)
	 {
	 	 
	 	 
	 
		$html='<link rel="shortcut icon" href="./imagens/favico/favicon.ico" type="image/x-icon">'.PHP_EOL;
		
	 	foreach($tag as $tag_html)
	 	{
	 		$host		=	$tag_html['host'];
	 		
	 		
	 		$add_tags	=	'';	
	 		
	 		
	 		if(array_key_exists('add_tags', $tag_html))
	 		{
	 			$add_tags		=	$tag_html['add_tags'];
	 		}
	 	 	
	 		if(!in_array($type,$tag_html['access']))  continue;
	 	 	
	 		if(WRS_INI::WRS_SERVER('ACTIVE_RAND_JS')==true)
	 		{
	 			$host	.='?'.rand(0,999999);
	 		}
	 		else
	 		{
	 			if(array_key_exists('version', $tag_html))
	 			{
	 				$host.='?'.$tag_html['version'];
	 			}
	 			else
	 			{
	 				$host.='?'.RAND_TOKEN;
	 			}
	 		}
	 	 	
	 		
	 		
	 		$html.='<link type="text/css"  '.$add_tags.' rel="stylesheet"  href="'.$host.'"/>'.PHP_EOL;
	 	}
	 	
	 	return $html;
	 }
	 
	 
	 

}

?>