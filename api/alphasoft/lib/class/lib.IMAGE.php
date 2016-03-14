<?php 
/**
 * Gerenciamento de IMAGENS
 * 
 * Author: Marcelo Santos 
 * Company:Alpha Soft
 * Date: 14/03/2016
 * 
 * 
 */


includeCLASS('WRS_USER');

/**
 * 
 * @link http://stackoverflow.com/questions/17672020/html2canvas-save-image-doesnt-work
 * 
 * @author msdantas
 *
 */
class IMAGE  extends  WRS_USER
{

	
	public function run()
	{		
		$event		=	fwrs_request('event');
		
		if(!empty($event))
		{
			switch ($event)
			{
				case 'screenShot' 	: 	return $this->screenShot(); break;
			}
		}
	}
	
	
	/**
	 * ScreenSHot da tela
	 */
	private function screenShot()
	{
		$image		=	base64_decode(fwrs_request('image'));
		
		$image		=	substr($image, strpos($image, ",")+1);
		
		$nameFile	=	fwrs_request('nameFile');
		
		$image		= 	str_replace('data:image/png;base64,', '', $image);
//		str_replace('data:image/png;base64,', '', $image)
		$decoded 	= 	base64_decode($image);
		
		$ini		=	WRS_INI::WRS_DEFINE();
		$path		=	str_replace($ini['DB_DIRECTORY_SEPARATOR'], DS, $ini['PATH_SCREEN_SHOT'].WRS::USER_ID()).DS;


		//CRiando a pasta de destino
		create_directory($ini['PATH_SCREEN_SHOT'].WRS::USER_ID(),$ini['DB_DIRECTORY_SEPARATOR'],$ini['PATH_RAIZ']);

		file_put_contents($path.$nameFile.".jpeg", $decoded, LOCK_EX);
		
		
		
		
		
	}
	
	
	
}

?>