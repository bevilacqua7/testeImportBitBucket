<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js?332458"></script>
<script type="text/javascript" src="api/alphasoft/js/Global.js?520751"></script>

<body>


<div id="msdantas" >
	<div class="mainDefaiutl">
		valor padrão
	</div>
</div>

<button class="ad">add</button>

<style>
.mainDefaiutl{

	display: block;
	background: #ffc125;
	cursor: pointer;

}

</style>
 

<script>

$('#msdantas').prop('id','teste');

$('#teste .mainDefaiutl').data('wrs',{names:['marcelo','felipe'], datas:[1,2,3,4]});

$('#teste .mainDefaiutl').click(function(e){

	e.preventDefault();
	
	e.stopPropagation();
	
	console.log('click no ID');	
});



$('.ad').click(function(){
	$('#teste .mainDefaiutl').html('mudando infos');
	
	$('#teste').prop('id','alterado');
	
	console.log('add');
	
}
);
</script>
</body>