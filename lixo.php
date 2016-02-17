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