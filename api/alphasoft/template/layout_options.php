 <?php 
 
 $HTML	=	<<<HTML
				

<div class="layout-container layout-select-box">

		<h4>{$parameter['ATTRIBUTOS_COLUNA']}</h4> 		
			<select  name="LAYOUT_COLUMNS" class="ATTRIBUTOS_COLUNA">{$parameter['ATTRIBUTOS_COLUNA_OPTIONS']}</select>

 		<h4>{$parameter['ATTRIBUTOS_LINHA']}</h4>
			<select  name="LAYOUT_ROWS"  class="ATTRIBUTOS_LINHA">{$parameter['ATTRIBUTOS_LINHA_OPTIONS']}</select>
 		
 		<h4>{$parameter['ATTRIBUTOS_METRICA']}</h4>
			<select  name="LAYOUT_MEASURES"  class="ATTRIBUTOS_METRICA">{$parameter['ATTRIBUTOS_METRICA_OPTIONS']}</select>
				
</div>	
 

HTML;

 echo $HTML;
 
 
?>				