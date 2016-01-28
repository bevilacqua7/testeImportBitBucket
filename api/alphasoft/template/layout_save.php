 <?php 
 
 /*
 $parameter['tpl_layout_title'] 			= LNG('tpl_layout_title');
 $parameter['tpl_layout_name'] 			= LNG('tpl_layout_name');
 $parameter['tpl_layout_alias'] 			= LNG('tpl_layout_alias');
 $parameter['tpl_layout_share'] 			= LNG('tpl_layout_share');
 */
 
 $HTML	=	<<<HTML
				

<div class="layout-container">

				<label for="LAYOUT_DESC">{$parameter['tpl_layout_name']}</label><br>
					<input type="text" id="LAYOUT_DESC" name="LAYOUT_DESC"   style="width: 768px;">	
				<br><br>
				
				
				<label for="LAYOUT_ALIAS">{$parameter['tpl_layout_alias']}</label><br>
					<input type="text" id="LAYOUT_ALIAS" name="LAYOUT_ALIAS"   style="width: 768px;">	
				<br><br>
				
				<input type="checkbox" id="LAYOUT_SHARE" name="LAYOUT_SHARE" value="1"> <label for="LAYOUT_SHARE">{$parameter['tpl_layout_share']} </label>  				
				<br>
				
				<div class="mensagem"></div>
</div>	
HTML;

 echo $HTML;
 
 
?>				