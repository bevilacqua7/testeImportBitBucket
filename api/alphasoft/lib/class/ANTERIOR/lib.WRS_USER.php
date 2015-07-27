<?PHP


/**
 * Obtendo informações do usuário
 */

includeCLASS('WRS_BASE');

class WRS_USER extends WRS_BASE
{


	/**
	 * Informaações do Usuário logado
	 * @var array
	 */
	private $_user	=	array();
	
	
	/**
	 *
	 * Pegando informações do Usuário
	 *
	 */
	protected  function SET_USER_INFO()
	{
		$this->_user	=	WRS::GET_SSAS_USER();
	}
	
	protected function getUserLoginId()
	{
		return $this->_user['LOGIN_ID'];
	}
	
	protected function getUserId()
	{
		return $this->_user['USER_ID'];
	}
	
	protected function getUserCode()
	{
		return $this->_user['USER_CODE'];
	}
	
	protected function getUserDesc()
	{
		return $this->_user['USER_DESC'];
	}
	
	protected function getUserEmail()
	{
		return $this->_user['USER_EMAIL'];
	}
	
	
	protected function getUserType()
	{
		return $this->_user['USER_TYPE'];
	}
	
	
	protected function getUserFilter()
	{
		return $this->_user['USER_FILTER'];
	}
	
	
	protected function getUserFilterValue()
	{
		return $this->_user['USER_FILTER_VALUE'];
	}
	
	
	protected function getUserTerminal()
	{
		return $this->_user['USER_INTERNAL'];
	}
	
	
	protected function getUserFVD()
	{
		return $this->_user['USER_FVD'];
	}
	
	protected function getUserFlag()
	{
		return $this->_user['USER_FLAG'];
	}
	
	protected function getUserTheme()
	{
		return WRS::INFO_SSAS_LOGIN('USER_FORMAT');
	}
	
	protected function getUserLanguage()
	{
		return WRS::INFO_SSAS_LOGIN('LANGUAGE_ID');
	}
	
	protected function getUserPerfil()
	{
		return $this->_user['PERFIL_ID'];
	}
	
	protected function getUserPerfilDesc()
	{
		return $this->_user['PERFIL_DESC'];
	}
	
	protected function getUserCustomerID()
	{
		return $this->_user['CUSTOMER_ID'];
	}
	
	protected function getUserCustomerDesc()
	{
		return $this->_user['CUSTOMER_DESC'];
	}
	
	protected function getUserCustomerCode()
	{
		return $this->_user['CUSTOMER_CODE'];
	}
	
	
	protected function getUserAddressIP()
	{
		return $this->_user['ADDRESS_IP'];
	}
	
	protected function getUserSessionID()
	{
		return $this->_user['SESSION_ID'];
	}
	
	protected function getUserBrowser()
	{
		return $this->_user['BROWSER_TYPE'];
	}
	
	protected function getUserSystem()
	{
		return $this->_user['SYSTEM_TYPE'];
	}
	
	
}

?>