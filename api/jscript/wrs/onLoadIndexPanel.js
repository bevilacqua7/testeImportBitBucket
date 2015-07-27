 
function WRS_LOAD_PLUGINS_ANIMATIONS()
{
	
	$('#dock2').Fisheye(
			{
				maxWidth: 100,
				items: 'a',
				itemsText: 'span',
				container: '.dock-container2',
				itemWidth: 30,
				proximity: 100,
				alignment : 'left',
				valign: 'bottom',
				halign : 'left'
			}
		);
	
}



$(function(){
	/*
	 * Apenas para o Menu Principal
	 */
	WRS_LOAD_PLUGINS_ANIMATIONS();
}); 