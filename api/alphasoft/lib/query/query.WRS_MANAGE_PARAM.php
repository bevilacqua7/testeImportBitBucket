<?php

/**
 * Contem as querys para a construção do Administrativo
 * @author msdantas, fbevilacqua
 *
 */

class WRS_MANAGE_PARAM
{
	
	private $array_retorno_padrao = array(	 'title'				=>	'',
										 'button'				=>	'',
										 'field'				=>	'',
										 'table'				=>	'',
										 'order'				=>	'',
										 'icon'					=>	'',	
										 'primary'				=>	'',
										 'button_force_label'	=>	false, 		// forca o label dos icones na visualizacao de ICON de acordo com o array abaixo
						 				 'button_icon'			=>	'',			// altera o icone padrao de cada botao na WindowGrid
										 'exception'			=>	'', 		// quando houver exceptions (uma view ao inves de tabela) utilizar um array com o nome da classe em questão para esta excecao 
										 'checkbox'				=>	false,		// se existe checkbox por linha na visualizacao de grid
										 'label_icon_custom'	=>	false,		// se existir labels personalizados por visao de icone
 										 'use_auto_width'		=>	true, 		// usar o calculo de largura para a coluna de acordo com o nome do titulo da mesma
						 				 'callback_btn_events'	=>	'', 		// se as acoes padrao dos botoes será alterada, adicionar o nome da acao de callback
										 'actionSingle'			=>	'', 		// se a acao do clique simples sera alterada, adicionar o nome da acao de callback
										 'actionDouble'			=>	'',			// se a acao do clique duplo sera alterada, adicionar o nome da acao de callback
										 'aplicaClassLinhas'	=>	true,		// [false,true,ClassEspecifica] se o parametro classDataLine sera aplicado nas linhas da grid do KendoUi
						 				 'aplicaClassHeaders'	=>	false		// [false,true,ClassEspecifica] se o parametro classDataHeader sera aplicado nas headers da grid do KendoUi
		 );

	private static $array_configuracao_padrao = 	array(
			'tabela_bd'				=>	'',
			'acesso_requisicao'		=>	true,
			'acesso_via_menu'		=>	true,
			'metodo_classe_param'	=>	''
	);
	
	private static $array_configuracao_tabelas = 	array(
			'ATT_WRS_CUSTOMER'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_CUSTOMER',
					'metodo_classe_param'	=>	'ATT_WRS_CUSTOMER',
					'nome_menu_LNG'			=>	'MENU_ADMIN_CUSTOMER',
					'nome_arquivo_import'	=>	'CUSTOMER.CSV',
					'icon'					=>	'fa fa-users',
					'colunas_import_export'	=>	'CUSTOMER_CODE, CUSTOMER_DESC, CUSTOMER_EXPIRY, CUSTOMER_FLAG, CUSTOMER_STATUS, CUSTOMER_GROUP',
					'colunas_descricao'		=>	'CUSTOMER_CODE(varchar[50]), CUSTOMER_DESC(varchar[100]), CUSTOMER_EXPIRY(Int), CUSTOMER_FLAG(text), CUSTOMER_STATUS(Int), CUSTOMER_GROUP(varchar[100])'
			),
			'ATT_WRS_USER'					=> 	array(
					'tabela_bd'				=>	'ATT_WRS_USER',
					'metodo_classe_param'	=>	'ATT_WRS_USER',
					'nome_menu_LNG'			=>	'MENU_ADMIN_USER',
					'nome_arquivo_import'	=>	'USER.CSV',
					'icon'					=>	'fa fa-users',
					'colunas_import_export'	=>	'USER_CODE, USER_DESC, USER_EMAIL, USER_TYPE, USER_FILTER, USER_FILTER_VALUE, USER_INTERNAL, USER_STATUS, USER_FORMAT, LANGUAGE_ID, PERFIL_ID',
					'colunas_descricao'		=>	'USER_CODE(varchar[50]), USER_DESC(varchar[100]), USER_EMAIL(varchar[200]), USER_TYPE(varchar[100]), USER_FILTER(text), USER_FILTER_VALUE(text), USER_INTERNAL(varchar[50]), USER_STATUS(smallint), USER_FORMAT(varchar[15]), LANGUAGE_ID(varchar[3]), PERFIL_ID(varchar[50])',
					'exibe_menu_ADM'		=>	true
			),
			'ATT_WRS_SERVER'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_SERVER',
					'metodo_classe_param'	=>	'ATT_WRS_SERVER',
					'nome_menu_LNG'			=>	'MENU_ADMIN_SERVER',
					'nome_arquivo_import'	=>	'SERVER.CSV',
					'colunas_import_export'	=>	'SERVER_ID, SERVER_DESC, SERVER_COMMENT, SERVER_USER, SERVER_PWD, SERVER_FLAG, SERVER_STATUS',
					'colunas_descricao'		=>	'SERVER_ID(varchar[50]), SERVER_DESC(varchar[100]), SERVER_COMMENT(varchar[1000]), SERVER_USER(varchar[100]), SERVER_PWD(varchar[100]), SERVER_STATUS(smallint))'
			),
			'ATT_WRS_DATABASE'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_DATABASE',
					'metodo_classe_param'	=>	'ATT_WRS_DATABASE',
					'nome_menu_LNG'			=>	'MENU_ADMIN_DATABASE',
					'icon'					=>	'fa fa-database',
					'nome_arquivo_import'	=>	'DATABASE.CSV',
					'colunas_import_export'	=>	'DATABASE_ID, DATABASE_DESC, DATABASE_COMMENT, DATABASE_LINK, DATABASE_IMAGE, DATABASE_ORDER, DATABASE_POOL, DATABASE_STATUS, DATABASE_BALANCE, SERVER_ID',
					'colunas_descricao'		=>	'DATABASE_ID(varchar[100]), DATABASE_DESC(varchar[100]), DATABASE_COMMENT(varchar[1000]), DATABASE_LINK(varchar[1000]), DATABASE_IMAGE(varchar[100]), DATABASE_ORDER(smallint), DATABASE_POOL(smallint), DATABASE_STATUS(smallint), DATABASE_BALANCE(bigint), SERVER_ID(varchar[100])'
			),
			'ATT_WRS_CUBE'					=> 	array(
					'tabela_bd'				=>	'ATT_WRS_CUBE',
					'metodo_classe_param'	=>	'ATT_WRS_CUBE',
					'nome_menu_LNG'			=>	'MENU_ADMIN_CUBE',
					'icon'					=>	'fa fa-cube',
					'nome_arquivo_import'	=>	'CUBE.CSV',
					'colunas_import_export'	=>	'CUBE_ID, CUBE_DESC, CUBE_FILTER, CUBE_FILTER_VALUE, CUBE_STATUS, DATABASE_ID, SERVER_ID',
					'colunas_descricao'		=>	'CUBE_ID(varchar[100]), CUBE_DESC(varchar[100]), CUBE_FILTER(text), CUBE_FILTER_VALUE(text), CUBE_STATUS(smallint), DATABASE_ID(varchar[100]), SERVER_ID(varchar[100])'
			),
			'REL_WRS_CUBE_USER'				=> 	array(
					'tabela_bd'				=>	'REL_WRS_CUBE_USER',
					'metodo_classe_param'	=>	'REL_WRS_CUBE_USER',
					'nome_menu_LNG'			=>	'MENU_ADMIN_CUBE_USER',
					'icon'					=>	'fa fa-object-group',
					'nome_arquivo_import'	=>	'ASSOCIATION.CSV',
					'colunas_import_export'	=>	'DATABASE_ID, CUBE_ID, [USER_CODE]',
					'colunas_descricao'		=>	'DATABASE_ID (varchar[100]), CUBE_ID (varchar[100]), USER_CODE (varchar[100])',
					'exibe_menu_ADM'		=>	true
			),
			'ATT_WRS_LOG'					=> 	array(
					'tabela_bd'				=>	'FAT_WRS_LOG',
					'metodo_classe_param'	=>	'ATT_WRS_LOG',
					'nome_menu_LNG'			=>	'MENU_ADMIN_LOG',
					'icon'					=>	'fa fa-file-text-o',
					'nome_arquivo_import'	=>	'LOG.CSV',
					'colunas_import_export'	=>	'DATE_ID, MODULE, PROCESS, OPERATION, MESSAGE, USER_MASTER, USER_CODE, USER_DESC, CUSTOMER_DESC',
					'exibe_menu_ADM'		=>	true
			),
			'ATT_WRS_PERFIL'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_PERFIL',
					'metodo_classe_param'	=>	'ATT_WRS_PERFIL',
					'nome_menu_LNG'			=>	'MENU_ADMIN_PERFIL',
					'icon'					=>	'fa fa-male',
					'nome_arquivo_import'	=>	'PERFIL.CSV',
					'colunas_import_export'	=>	'PERFIL_ID, PERFIL_DESC, PERFIL_LEVEL, PERFIL_FLAG, PERFIL_STATUS'
			),
			'ATT_WRS_REPORT'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_REPORT',
					'metodo_classe_param'	=>	'ATT_WRS_REPORT',
					'nome_menu_LNG'			=>	'MENU_ADMIN_REPORT',
					'icon'					=>	'fa fa-file-excel-o'
			),
			'ATT_WRS_DOWNLOAD'				=> 	array(
					'tabela_bd'				=>	'ATT_WRS_DOWNLOAD',
					'metodo_classe_param'	=>	'ATT_WRS_DOWNLOAD',
					'nome_menu_LNG'			=>	'MENU_ADMIN_DOWNLOAD',
					'icon'					=>	'fa fa-download'
			),
			'GET_SSAS_REPORT'				=> 	array(
					'tabela_bd'				=>	'GET_SSAS_REPORT',
					'metodo_classe_param'	=>	'GET_SSAS_REPORT',
					'nome_menu_LNG'			=>	'MENU_ADMIN_SSAS_REPORT',
					'acesso_via_menu'		=>	false,
					'icon'					=>	'fa fa-area-chart'
			),
			'GET_SSAS_LAYOUTS'				=> 	array(
					'tabela_bd'				=>	'GET_SSAS_LAYOUTS',
					'metodo_classe_param'	=>	'GET_SSAS_LAYOUTS',
					'nome_menu_LNG'			=>	'MENU_ADMIN_SSAS_LAYOUTS',
					'acesso_via_menu'		=>	false,
					'icon'					=>	'fa fa-desktop'
			)
	);
	
	public static function GET_CONFIG_TABLE($tabela=NULL,$perfil_type=NULL)
	{
		$arr_todos 		=	array();
		$html_menu		=	NULL;	

		
		foreach(self::$array_configuracao_tabelas as $tabela_name=>$config)
		{
			$info_tabelas = array_merge(self::$array_configuracao_padrao,self::$array_configuracao_tabelas[$tabela_name]);
			$arr_todos[$tabela_name] = $info_tabelas;
			
			if($info_tabelas['acesso_via_menu']==true && ($perfil_type=='MST' || ($perfil_type=='ADM' && $info_tabelas['exibe_menu_ADM'])))
			{
				
				$label  = LNG($info_tabelas['nome_menu_LNG']);
				$html_menu .= <<<HTML
							<li class=" menu_cadastro only-li" tabela="{$info_tabelas['tabela_bd']}">
								 <div> <i class="{$info_tabelas['icon']}" aria-hidden="true"></i> {$label}</div>
							</li>
HTML;
			}
			
		}
		
		if($tabela==NULL || $tabela=='menu')
		{
			return $html_menu;
		}
		
		
		if(!is_string($tabela) || !array_key_exists($tabela, $arr_todos))
		{
		
			// se for passado o nome de uma tabela diferente do padrao só porque o nome da tabela é um teste ou porque mudou,
			// procura nos nomes das tabelas configurados para retornar o objeto correto e prosseguir com o fucnionamento do sistema
			$dados_contem_tabela_parametro=array();
			
			foreach($arr_todos as $nome_tabela=>$dados)
			{
				if($dados['tabela_bd']==$tabela)
				{
					$dados['nome_tabela_correto']	= $nome_tabela;
					$dados_contem_tabela_parametro	= $dados;
					break;
				}
			}
			
			if(count($dados_contem_tabela_parametro)==0)
			{
				return false;
			}else{
				return $dados_contem_tabela_parametro;
			}
			
		}
		
		
		return $arr_todos[$tabela];
		
	}
	
	

	public static function confereTabelaCadastroRetorno($nome_tabela){ // se o nome da tabela estiver diferente do padrao, retorna sempre o nome correto do sistema
		$dadosTabela = self::GET_CONFIG_TABLE($nome_tabela);
		if(array_key_exists('nome_tabela_correto', $dadosTabela)){
			return $dadosTabela['nome_tabela_correto'];
		}else{
			return $nome_tabela;
		}
	}
	
	public static function getAtributoTabelaConfig($tabela,$atributo){
		$table = self::GET_CONFIG_TABLE($tabela);
		if(is_array($table) && array_key_exists($atributo, $table)){
			return $table[$atributo];
		}else{
			return false;
		}
	}
	
	public function getDadosTabelaConfig($tabela=NULL){
		return self::GET_CONFIG_TABLE($tabela);
	}
	
	public function getMetodoTabela($tabela){
		$dados_tabela = $this->getDadosTabelaConfig($tabela);
		return $this->$dados_tabela['metodo_classe_param']();
	}
	
	public function retornaCamposKeyFrom($tabela){
		try{
			$obj = $this->$tabela();
			$keys=array();
			foreach($obj['field'] as $atributo=>$dados_campo){
				if(array_key_exists('key', $dados_campo)){
					$keys[]=$atributo;
				}
			}
			return $keys;
		}catch(Exception $e){
			return false;
		}
	}
	
	public function load($_event)
	{
		
		$dados_tabela_evento = $this->getDadosTabelaConfig($_event);
		if($dados_tabela_evento!=false && $dados_tabela_evento['acesso_requisicao']){
			return true;
		}
				
		return false;
	}
	
	/**
	 * 
	 * Contruindo o select 
	 * 
	 * @param string $_columns
	 * @param string $table
	 * @param string $orderBy
	 * @param string $orderByPOS
	 * @param int 	 $_start
	 * @param int 	 $_end
	 */
	public static function select($columns,$table,$orderBy,$orderByPOS,$_start,$_end, $_where=NULL)
	{
		$_columns	=	$columns;
		$where		=	$_where;
		
		if(is_array($columns))
		{
			unset($_columns['WRS_ICON']);
		}
		
		if(is_array($where))
		{
			foreach($_where as $label=>$value)
			{
				$where	.=	$label.' LIKE "%'.$value.'%"';
			}
		}
		
		
		$columns 	= 	empty($_columns) 	?	'*' 					: 	$_columns;
		$columns	=	is_array($columns) 	?	implode(',',array_keys($columns)) 	:	$columns;
		
		return "exec Select_Table '".$table."', '".$orderBy."', '".$orderByPOS."', '".$where."',".$_start.",".$_end;
		//return ' SELECT '.$columns.' FROM '.$table.' '.$where.' ORDER BY '.$orderBy.' '.$orderByPOS;
	}
	
	//Classe de Customer ADMINISTRATIVO
	public function ATT_WRS_CUSTOMER()
	{
		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_customer');
		$button['import']		=	LNG('bt_import_customer');		
		
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento 	=	 $this->getDadosTabelaConfig('ATT_WRS_CUSTOMER');
		$table					=	$dados_tabela_evento['tabela_bd'];
		$order	=	array('order_by'=>'CUSTOMER_DESC' ,'order_type'=>'ASC');
		$extend = 	array('class'=>'ATT_WRS_CUSTOMER' 	,'file'=>'ATT_WRS_CUSTOMER');
		$fields	=	array();

		$exceptions	= array('class'=>'ATT_WRS_CUSTOMER'	,'file'=>'ATT_WRS_CUSTOMER'	, 'type'=>'');

		/*
		$fields['WRS_ICON']			=	array('title'=>'Icone'				,   'width'=>50,     'basic'=>true, 'grid'=>true, 'is_upload'=>true);
		$fields['CUSTOMER_ID']		=	array('title'=>'ID'					,   'primary'=>true, 'class'=>'hide');
		$fields['CUSTOMER_CODE']	=	array('title'=>'Código'				,	'length'=>10,    'list'=>true,	'basic'=>true,  'grid'=>true, 'key'=>true); // atributo KEY será usado para identificar chaves na tabela que não sao como o atributo primary, usado na importacao, exportacao e tratamento de campos que so podem ser editados na criacao de um registros, mas que nao podem ser alterados na modificacao de um registro ja existente
		$fields['CUSTOMER_DESC']	=	array('title'=>'Nome'				,	'length'=>100,   'list'=>true,	'basic'=>true , 'grid'=>true);
		$fields['CUSTOMER_GROUP']	=	array('title'=>'Corporação'			,	'length'=>100);
		$fields['CUSTOMER_STATUS']	=	array('title'=>'Status'				,	'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'), 'basic'=>true, 'list'=>true, 'grid'=>true);
		$fields['CUSTOMER_EXPIRY']	=	array('title'=>'Dias Expira Senha'	,	'type'=>'int');
		//Falta o UPLOAD do LOGO
		*/
	
		// Atributos gerados com base na tabela ATT_WRS_CUSTOMER automaticamente de acordo com script SQL ao final deste arquivo
		$fields['WRS_ICON']			= array('title'=>'Icone'					, 'width'=>50,     'basic'=>true, 'grid'=>true, 'is_upload'=>true, 'sortable'=>false); // sortable é nativo do KendoUi e impede a ordenacao na GRID quando renderizado, evitando quebra de SQL por coluna que nao existe
		$fields['CUSTOMER_ID']   	= array('title'=>LNG('CUSTOMER_ID')    		, 'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['CUSTOMER_CODE']   	= array('title'=>LNG('CUSTOMER_CODE')    	, 'key'=>true,   'length'=>10,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_DESC']   	= array('title'=>LNG('CUSTOMER_DESC')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_EXPIRY']	= array('title'=>LNG('CUSTOMER_EXPIRY') 	, 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true, 'max-value'=>365, 'min-value'=>1); // existe tambem 'min-value'=>1
		$fields['CUSTOMER_FLAG'] 	= array('title'=>LNG('CUSTOMER_FLAG')    	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500, 'class'=>'hide', 'list'=>true, 'basic'=>true , 'grid'=>true, 'obrigatorio' => false);
		$fields['CUSTOMER_STATUS']	= array('title'=>LNG('CUSTOMER_STATUS')		, 'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'),   'type'=>'int',   'length' => 5,  'list'=>true, 'basic'=>true , 'grid'=>true, 'obrigatorio' => true);
		$fields['CUSTOMER_GROUP']	= array('title'=>LNG('CUSTOMER_GROUP')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);		
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_CUSTOMER'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,

				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'CUSTOMER_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'carrega_grid_list_admin', 							// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
	
	
	//Classe de User ADMINISTRATIVO
	public function ATT_WRS_USER()
	{
		$button		=	$button_icon	=	array();
		
		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');		
		$button['export']		=	LNG('bt_export_user');
		$button['import']		=	LNG('bt_import_user');
		
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_USER');
		
		$table		=	$dados_tabela_evento['tabela_bd'];
		$order		=	array('order_by'=>'USER_DESC' ,'order_type'=>'ASC');
		$extend 	= 	array('class'=>'ATT_WRS_USER' ,'file'=>'ATT_WRS_USER');
		$fields		=	array();

		/*
		$fields['WRS_ICON']				=	array('title'=>'Icone'					, 'width'=>60,     'basic'=>true, 'grid'=>true, 'is_upload'=>true);
		$fields['USER_ID']				=	array('title'=>'ID'						, 'primary'=>true, 'type'=>'int', 'class'=>'hide');
		$fields['USER_CODE']			=	array('title'=>'Usuário'				, 'length'=>50,   'basic'=>true, 'list'=>true,  'grid'=>true, 'key'=>true); // atributo KEY será usado para identificar chaves na tabela que não sao como o atributo primary, usado na importacao, exportacao e tratamento de campos que so podem ser editados na criacao de um registros, mas que nao podem ser alterados na modificacao de um registro ja existente
		//$fields['USER_PWD']				=	array('title'=>'Senha'					, 'length'=>30, 	'type'=>'password');
		$fields['USER_DESC']			=	array('title'=>'Nome'					, 'length'=>100,   'basic'=>true, 'list'=>true,  'grid'=>true);
		$fields['USER_EMAIL']			=	array('title'=>'Email'					, 'length'=>200);
		$fields['USER_FILTER']			=	array('title'=>'Nível de Estrutura'		, 'length'=>80);
		$fields['USER_TYPE']			=	array('title'=>'Cargo'					, 'length'=>100);
		$fields['USER_FILTER']			=	array('title'=>'Filtro Usuário' , 'length'=>7500);
		$fields['USER_FILTER_VALUE']	=	array('title'=>'Filtro Usuário Valor' , 'length'=>7500);
		$fields['USER_INTERNAL']		=	array('title'=>'Interno'				, 'length'=>50);
		$fields['USER_FLAG']			=	array('title'=>'Flag'				, 'length'=>7500);
		$fields['USER_STATUS']			=	array('title'=>'Status'					, 'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'), 'basic'=>true, 'list'=>true, 'grid'=>true);
		$fields['USER_FORMAT']			=	array('title'=>'Tema'					, 'is_select'=>array('-1'=>'Selecionar','azul'=>'Azul','cinza'=>'Cinza','laranja'=>'Laranja','verde'=>'Verde','vermelho'=>'Vermelho'));
		$fields['LANGUAGE_ID']			=	array('title'=>'Idioma'					, 'is_select'=>array('-1'=>'Selecionar','ENG'=>'Inglês','ESP'=>'Espanhol','POR'=>'Português'));
		$fields['PERFIL_ID']			=	array('title'=>'Perfil'					, 'is_select'=>'ATT_WRS_PERFIL', 'select_fields_in_table'=>array('PERFIL_ID','PERFIL_DESC'), 'length'=>255);
		$fields['CUSTOMER_ID']			=	array('title'=>'Cliente'				, 'is_select'=>'ATT_WRS_CUSTOMER', 'select_fields_in_table'=>array('CUSTOMER_CODE','CUSTOMER_DESC'),'length'=>255);
		*/
		
		/**
		 * TODO: jogar no language os valores dos IS_SELECT
		 */
		
		// Atributos gerados com base na tabela ATT_WRS_USER automaticamente de acordo com script SQL ao final deste arquivo
		$fields['USER_ID']   			= array('title'=>LNG('USER_ID')    			, 'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['USER_CODE']   			= array('title'=>LNG('USER_CODE')    		, 'key'=>true ,   'length'=>50,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_DESC']   			= array('title'=>LNG('USER_DESC')    		, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_PWD']   			= array('title'=>LNG('USER_PWD')    		, 'length'=>32, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_SALT']   			= array('title'=>LNG('USER_SALT')    		, 'length'=>32, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_PWD_OLD']  	 	= array('title'=>LNG('USER_PWD_OLD')    	, 'length'=>32, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_EMAIL']  			= array('title'=>LNG('USER_EMAIL')    		, 'length'=>200,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_TYPE']   			= array('title'=>LNG('USER_TYPE')    		, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_FILTER']   		= array('title'=>LNG('USER_FILTER')    		, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_FILTER_VALUE']   	= array('title'=>LNG('USER_FILTER_VALUE') 	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_INTERNAL']   		= array('title'=>LNG('USER_INTERNAL')    	, 'length'=>50,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_FVD']   			= array('title'=>LNG('USER_FVD')    		, 'type'=>'int',   'length' => 5, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_FLAG']   			= array('title'=>LNG('USER_FLAG')    		, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['USER_STATUS']   		= array('title'=>LNG('USER_STATUS')   		, 'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'),   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_FORMAT']   		= array('title'=>LNG('USER_FORMAT')    		, 'is_select'=>array('-1'=>'Selecionar','azul'=>'Azul','cinza'=>'Cinza','laranja'=>'Laranja','verde'=>'Verde','vermelho'=>'Vermelho'),   'length'=>15,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_EXPIRY']   		= array('title'=>LNG('USER_EXPIRY')    		, 'type'=>'date_object' ,'format'=>'d/m/Y H:i:s', 'class'=>'hide', 'type_convert'=>true,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['LANGUAGE_ID']   		= array('title'=>LNG('LANGUAGE_ID')    		, 'is_select'=>array('-1'=>'Selecionar','ENG'=>'Inglês','ESP'=>'Espanhol','POR'=>'Português'),   'length'=>3,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['PERFIL_ID']   			= array('title'=>LNG('PERFIL_ID')    		, 'is_select'=>'ATT_WRS_PERFIL', 'select_fields_in_table'=>array('PERFIL_ID','PERFIL_DESC'),   'length'=>50,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_ID']   		= array('title'=>LNG('CUSTOMER_ID')    		, 'is_select'=>'ATT_WRS_CUSTOMER', 'select_fields_in_table'=>array('CUSTOMER_CODE','CUSTOMER_DESC'),   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_USER'), 
						'button'	=>	$button,
						'field'		=>	$fields,
						'table'		=>	$table,
						'order'		=>	$order,
						'icon'		=>	'user.png',
						'primary'	=>	'USER_ID',
						'extend'				=>	$extend,											// NEW
						'checkbox'				=>	true, 												// NEW
						'button_icon'			=>	$button_icon,										// NEW
						'button_force_label'	=>	true, 			  									// NEW
		 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
						'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
						'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
						'exception'				=>	true, 												// NEW
						'aplicaClassLinhas'		=>	true,												// NEW
						'aplicaClassHeaders'	=>	'text-center'										// NEW
					);
		
	}

	
	//Classe de Server ADMINISTRATIVO
	public function ATT_WRS_SERVER()
	{
		//Botões Language
		$button		=	$button_icon	=	array();
		
		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_server');
		$button['import']		=	LNG('bt_import_server');
		
		if(!WRS_USER::getArrPerfUser('DRG'))
		{
			$button['remove']	=	LNG('bt_remove');
		}
		
		//Personalizando o icone
		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';
		
		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_SERVER');
		
		$table	=	$dados_tabela_evento['tabela_bd'];		
		$order	=	array('order_by'=>'SERVER_DESC' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'ATT_WRS_SERVER' ,'file'=>'ATT_WRS_SERVER');
		$fields	=	array();
		
		// Atributos gerados com base na tabela ATT_WRS_SERVER automaticamente de acordo com script SQL ao final deste arquivo
		$fields['SERVER_ID']   		= array('title'=>LNG('SERVER_ID')    	, 'length'=>50,   'primary' => true, 'list'=>true, 'basic'=>true, 'grid'=>true,  'obrigatorio' => true);
		$fields['SERVER_DESC']   	= array('title'=>LNG('SERVER_DESC')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['SERVER_COMMENT']   = array('title'=>LNG('SERVER_COMMENT') 	, 'length'=>1000,   'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['SERVER_USER']   	= array('title'=>LNG('SERVER_USER')    	, 'length'=>100,   'grid'=>true,   'obrigatorio' => true);
		$fields['SERVER_PWD']   	= array('title'=>LNG('SERVER_PWD')    	, 'length'=>100,   'obrigatorio' => true);
		$fields['SERVER_FLAG']   	= array('title'=>LNG('SERVER_FLAG')    	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500, 'class'=>'hide',  'obrigatorio' => false);
		$fields['SERVER_STATUS']   	= array('title'=>LNG('SERVER_STATUS') 	, 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);

		//Atributos de execuções e Eventos
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_SERVER'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'SERVER_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
	
	
	//Classe de Database ADMINISTRATIVO
	public function ATT_WRS_DATABASE()
	{

		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_database');
		$button['import']		=	LNG('bt_import_database');
				
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_DATABASE');
		
		$table	=	$dados_tabela_evento['tabela_bd'];
		$order	=	array('order_by'=>'DATABASE_DESC' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'ATT_WRS_DATABASE' ,'file'=>'ATT_WRS_DATABASE');
		$fields	=	array();

		/*
		$fields['WRS_ICON']			=	array('title'=>'#',   			'width'=>50,     'basic'=>true, 'grid'=>true);
		$fields['DATABASE_ID']		=	array('title'=>'Código',   		'primary'=>true, 'list'=>true,  'grid'=>true);
		$fields['DATABASE_DESC']	=	array('title'=>'Nome',			'length'=>255,   'basic'=>true, 'list'=>true,  'grid'=>true);
		$fields['DATABASE_COMMENT']	=	array('title'=>'Comentários',   'length'=>255,   'list'=>true,  'grid'=>true);
		$fields['DATABASE_USER']	=	array('title'=>'Usuário',   	'length'=>30,    'grid'=>true);
		$fields['DATABASE_PWD']  	=	array('title'=>'Senha',   		'length'=>30);
		$fields['DATABASE_STATUS']	=	array('title'=>'Status',		'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','2'=>'Bloqueado','3'=>'Inativo'),      'basic'=>true, 'list'=>true, 'grid'=>true);
		$fields['DATABASE_LINK']  	=	array('title'=>'Link',   		'length'=>255);
		//IMAGEM (DATABASE_IMAGE) => Combo com as imagens que foram UPLOAD
		$fields['DATABASE_ORDER']	=	array('title'=>'Ordem',   		'type'=>'int');
		//$fields['SERVER_ID']	=	array('title'=>'Servidor',   	'is_select'=>'ATT_WRS_SERVER','list'=>true,   'grid'=>true);
		$fields['SERVER_ID']	=	array('title'=>'Servidor',   	'list'=>true,   'grid'=>true);
		$fields['CUSTOMER_ID']		=	array('title'=>'Cliente',   	'is_select'=>'ATT_WRS_CUSTOMER','list'=>true,   'grid'=>true);
		*/

		/*
		 * TODO: nao existe ATT_WRS_SERVER e ATT_WRS_CUSTOMER para buscar informacoes
		 */
		
		// Atributos gerados com base na tabela ATT_WRS_DATABASE automaticamente de acordo com script SQL ao final deste arquivo
		$fields['DATABASE_ID']   		= array('title'=>LNG('DATABASE_ID')			, 'length'=>100,   'primary' => true, 'grid'=>true, 'obrigatorio' => true);
		$fields['DATABASE_DESC']   		= array('title'=>LNG('DATABASE_DESC')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_COMMENT']   	= array('title'=>LNG('DATABASE_COMMENT')    , 'length'=>1000,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_FLAG']   		= array('title'=>LNG('DATABASE_FLAG')    	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1', 'class'=>'hide',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['DATABASE_LINK']   		= array('title'=>LNG('DATABASE_LINK')    	, 'length'=>1000,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['DATABASE_IMAGE']   	= array('title'=>LNG('DATABASE_IMAGE')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'class'=>'hide', 'obrigatorio' => false);
		$fields['DATABASE_ORDER']   	= array('title'=>LNG('DATABASE_ORDER')    	, 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_POOL']   		= array('title'=>LNG('DATABASE_POOL')    	, 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_STATUS']   	= array('title'=>LNG('DATABASE_STATUS')   	, 'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','2'=>'Bloqueado','3'=>'Inativo') ,   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_BALANCE']   	= array('title'=>LNG('DATABASE_BALANCE')    , 'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['SERVER_ID']   			= array('title'=>LNG('SERVER_ID')    		, 'length'=>100,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['CUSTOMER_ID']   		= array('title'=>LNG('CUSTOMER_ID')    		, 'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
				
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_DATABASE'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'DATABASE_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
	
	
	//Classe de Cubo ADMINISTRATIVO
	public function ATT_WRS_CUBE()
	{
		//Botões Language
		$button		=	$button_icon	=	array();
		
		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_cube');
		$button['import']		=	LNG('bt_import_cube');
		
		if(!WRS_USER::getArrPerfUser('DRG'))
		{
			$button['remove']	=	LNG('bt_remove');
		}
		
		//Personalizando o icone
		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';
		
		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_CUBE');
		
		$table	=	$dados_tabela_evento['tabela_bd'];		
		$order	=	array('order_by'=>'CUBE_DESC' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'ATT_WRS_CUBE' ,'file'=>'ATT_WRS_CUBE');
		$fields	=	array();

		/*
		$fields['WRS_ICON']			=	array('title'=>'#',   		'width'=>50,    'basic'=>true , 'grid'=>true);
		$fields['CUBE_ID']		    =	array('title'=>'Código',   	'primary'=>true,'list'=>true,   'grid'=>true);
		$fields['CUBE_DESC']	    =	array('title'=>'Nome',		'length'=>180,  'basic'=>true,  'list'=>true,  'grid'=>true);
		$fields['CUBE_STATUS']		=	array('title'=>'Status',	'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'),     'basic'=>true, 'list'=>true, 'grid'=>true);
		$fields['DATABASE_ID']		=	array('title'=>'Database',  'is_select'=>'ATT_WRS_DATABASE', 'select_fields_in_table'=>array('DATABASE_ID','DATABASE_DESC'),  'length'=>180,    'list'=>true,  'grid'=>true);
		$fields['CUSTOMER_ID']		=	array('title'=>'Cliente',   'is_select'=>'ATT_WRS_CUSTOMER', 'select_fields_in_table'=>array('CUSTOMER_CODE','CUSTOMER_DESC'),  'grid'=>true,     'class'=>'hide');
		*/
		
		// Atributos gerados com base na tabela ATT_WRS_CUBE automaticamente de acordo com script SQL ao final deste arquivo
		$fields['CUBE_ID']   			= array('title'=>LNG('CUBE_ID')    			, 'length'=>100,   'primary' => true, 'list'=>true, 'basic'=>true , 'grid'=>true,  'obrigatorio' => true);
		$fields['CUBE_DESC']   			= array('title'=>LNG('CUBE_DESC')    		, 'length'=>100,   'list'=>true, 'basic'=>true, 'grid'=>true,   'obrigatorio' => true);
		$fields['CUBE_FLAG']   			= array('title'=>LNG('CUBE_FLAG')    		, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'class'=>'hide',  'obrigatorio' => false);
		$fields['CUBE_FILTER']   		= array('title'=>LNG('CUBE_FILTER')    		, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'grid'=>true,   'obrigatorio' => false);
		$fields['CUBE_FILTER_VALUE'] 	= array('title'=>LNG('CUBE_FILTER_VALUE') 	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'grid'=>true,   'obrigatorio' => false);
		$fields['CUBE_STATUS'] 			= array('title'=>LNG('CUBE_STATUS')    		, 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_ID'] 			= array('title'=>LNG('DATABASE_ID')    		, 'length'=>100,   'primary' => true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['SERVER_ID'] 			= array('title'=>LNG('SERVER_ID')    		, 'length'=>100,   'primary' => true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_ID']   		= array('title'=>LNG('CUSTOMER_ID')    		, 'is_select'=>'ATT_WRS_CUSTOMER', 'select_fields_in_table'=>array('CUSTOMER_CODE','CUSTOMER_DESC'), 'type'=>'int',   'length' => 19, 'basic'=>true, 'grid'=>true,   'obrigatorio' => true);

		//Atributos de execuções e Eventos
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_CUBE'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'CUBE_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
	
	
	//Classe de Hierarquia ADMINISTRATIVO
	/*public function ATT_WRS_HIERARCHY()
	{
		$button	=	array('new'=>'');
		
		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_HIERARCHY');
		$table	=	$dados_tabela_evento['tabela_bd'];

		$order	=	array('order_by'=>'CUSTOMER_ID' ,'order_type'=>'ASC');
		$fields	=	array();
		
		$fields['WRS_ICON']			=	array('title'=>'#'					,   'width'=>50,    'basic'=>true , 'grid'=>true);
		$fields['CUBE_ID']		    =	array('title'=>'ID'					,   'primary'=>true,'list'=>true,   'grid'=>true);
		$fields['CUBE_DESC']	    =	array('title'=>'CUBE_DESC'		    ,	'length'=>255,  'basic'=>true,  'list'=>true,  'grid'=>true);
		$fields['CUBE_STATUS']		=	array('title'=>'CUBE_STATUS'		,	'type'=>'int',  'basic'=>true,  'list'=>true,  'grid'=>true);
		$fields['DATABASE_ID']		=	array('title'=>'DATABASE ID'	    ,   'is_select'=>'ATT_WRS_DATABASE','list'=>true,  'grid'=>true);
		$fields['CUSTOMER_ID']		=	array('title'=>'CUSTOMER ID'	    ,   'grid'=>true);
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_HIERARCHY'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'CUBE_ID'
			);
	}*/
	
	
	//Classe de Perfil ADMINISTRATIVO
	public function ATT_WRS_PERFIL()
	{
		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_profile');
		$button['import']		=	LNG('bt_import_profile');
		
		
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_PERFIL');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order	=	array('order_by'=>'PERFIL_ID' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'ATT_WRS_PERFIL' 	,'file'=>'ATT_WRS_PERFIL');
		$fields	=	array();
		
		/*
		$fields['WRS_ICON']			=	array('title'=>'#',   			'width'=>50,  		'basic'=>true,  'grid'=>true);
		$fields['PERFIL_ID']		=	array('title'=>'Código',   		'primary'=>true	,	'length'=>15);
		$fields['PERFIL_DESC']		=	array('title'=>'Nome',			'length'=>180,	 	'basic'=>true,  'list'=>true,  'grid'=>true);
		$fields['PERFIL_LEVEL']		=	array('title'=>'Nível'	,		'length'=>15);
		$fields['PERFIL_STATUS']	=	array('title'=>'Status',		'is_select'=>array('-1'=>'Selecionar','1'=>'Ativo','0'=>'Inativo'), 'basic'=>true, 'list'=>true, 'grid'=>true);
		//$fields['PERFIL_FLAG']		=	array('title'=>'PERFIL_STATUS',	'type'=>'int',   'list'=>true, 	'basic'=>true );
		//Marcar os checkbox do Perfil Flag
		 */
		
		// Atributos gerados com base na tabela ATT_WRS_PERFIL automaticamente de acordo com script SQL ao final deste arquivo
		$fields['PERFIL_ID']   		= array('title'=>LNG('PERFIL_ID')    	, 'length'=>50,   'primary' => true, 'grid'=>true,   'obrigatorio' => true);
		$fields['PERFIL_DESC']   	= array('title'=>LNG('PERFIL_DESC')    	, 'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['PERFIL_LEVEL']   	= array('title'=>LNG('PERFIL_LEVEL')    , 'length'=>10,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['PERFIL_FLAG']   	= array('title'=>LNG('PERFIL_FLAG')    	, 'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500, 'class'=>'hide',   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		$fields['PERFIL_STATUS']   	= array('title'=>LNG('PERFIL_STATUS')   , 'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_PERFIL'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'PERFIL_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
		
	
	//Classe de Relação CUBO-USUÁRIO ADMINISTRATIVO
	public function REL_WRS_CUBE_USER()
	{
		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');
		$button['export']		=	LNG('bt_export_cube_user');
		$button['import']		=	LNG('bt_import_cube_user');
		
		
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('REL_WRS_CUBE_USER');
		
		$table	=	$dados_tabela_evento['tabela_bd'];
		$order	=	array('order_by'=>'CUBE_ID' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'REL_WRS_CUBE_USER' 	,'file'=>'REL_WRS_CUBE_USER');
		
		$fields							=	array();
		
		/*
		$fields['WRS_ICON']				=	array('title'=>'#',		'basic'=>true,	'width'=>50,	 'grid'=>true);
		$fields['CUBE_ID']				=	array('title'=>'ID', 	'primary'=>true,'type'=>'int',   'list'=>true,'type'=>'int', 'basic'=>true );
		$fields['CUBE_IDS']				=	array('title'=>'IDS',	'type'=>'int',  'list'=>true,	 'type'=>'int', 'basic'=>true,'class'=>'' );
		*/
		
		// atributos gerados com base na tabela REL_WRS_CUBE_USER automaticamente de acordo com script SQL ao final deste arquivo
		$fields['SERVER_ID']   = array('title'=>LNG('SERVER_ID')    ,   'length'=>100,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['DATABASE_ID']   = array('title'=>LNG('DATABASE_ID')    ,   'length'=>100,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['CUBE_ID']   = array('title'=>LNG('CUBE_ID')    ,   'length'=>100,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['USER_ID']   = array('title'=>LNG('USER_ID')    ,   'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		
		return array(	'title'		=>	LNG('TITLE_REL_WRS_CUBE_USER'), 
						'button'	=>	$button,
						'field'		=>	$fields,			
						'table'		=>	$table,
						'order'		=>	$order,
						'icon'		=>	'user.png',
						'primary'	=>	'CUBE_ID',
						'extend'				=>	$extend,											// NEW
						'checkbox'				=>	true, 												// NEW
						'button_icon'			=>	$button_icon,										// NEW
						'button_force_label'	=>	true, 			  									// NEW
		 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
						'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
						'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
						'exception'				=>	true, 												// NEW
						'aplicaClassLinhas'		=>	true,												// NEW
						'aplicaClassHeaders'	=>	'text-center'										// NEW
					);
					
					
	}
	
	/*
	//Classe de Relatórios ADMINISTRATIVO
	public function ATT_WRS_REPORT()
	{
		$button	=	array('new'=>'');
		
		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_REPORT');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order	=	array('order_by'=>'REPORT_ID' ,'order_type'=>'ASC');
		$fields	=	array();
		
		
		// 		$fields['WRS_ICON']			=	array('title'=>'#',   			'basic'=>true ,  'width'=>50,'grid'=>true);
		// 		$fields['REPORT_ID']		=	array('title'=>'ID',   			'primary'=>true, 'type'=>'int',  'class'=>'hide');
		// 		$fields['DATABASE_ID']		=	array('title'=>'Database',		'list'=>true,	 'basic'=>true,  'grid'=>true);
		// 		$fields['CUBE_ID']			=	array('title'=>'Cubo',			'list'=>true,	 'basic'=>true,  'grid'=>true );
		// 		$fields['CUSTOMER_ID']		=	array('title'=>'Cliente',		'list'=>true, 	 'basic'=>true,  'grid'=>true);
		// 		$fields['USER_ID']			=	array('title'=>'Usuário',		'list'=>true,	 'basic'=>true,  'grid'=>true);
		// 		$fields['REPORT_DESC']		=	array('title'=>'Nome Relatório','list'=>true,	 'basic'=>true,  'grid'=>true);
		//ROWS
		//COLUMNS
		//MEASURES
		//FILTERS
		//Checkbox REPORT_SHARE
		//Checkbox REPORT_AUTOLOAD		
	
	
		// atributos gerados com base na tabela ATT_WRS_REPORT automaticamente de acordo com script SQL ao final deste arquivo
		  $fields['REPORT_ID']   = array('title'=>LNG('REPORT_ID')    ,   'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		  $fields['REPORT_DESC']   = array('title'=>LNG('REPORT_DESC')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		  $fields['REPORT_SHARE']   = array('title'=>LNG('REPORT_SHARE')    ,   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_DATE']   = array('title'=>LNG('REPORT_DATE')    ,'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		  $fields['REPORT_UPDATE']   = array('title'=>LNG('REPORT_UPDATE')    ,'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_OPTIONS']   = array('title'=>LNG('REPORT_OPTIONS')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_FORMULAS']   = array('title'=>LNG('REPORT_FORMULAS')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_FILTER']   = array('title'=>LNG('REPORT_FILTER')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_FLAG']   = array('title'=>LNG('REPORT_FLAG')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_AUTOLOAD']   = array('title'=>LNG('REPORT_AUTOLOAD')    ,   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['REPORT_STATUS']   = array('title'=>LNG('REPORT_STATUS')    ,   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['SERVER_ID']   = array('title'=>LNG('SERVER_ID')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['DATABASE_ID']   = array('title'=>LNG('DATABASE_ID')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['CUBE_ID']   = array('title'=>LNG('CUBE_ID')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['USER_ID']   = array('title'=>LNG('USER_ID')    ,   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		  $fields['CUSTOMER_ID']   = array('title'=>LNG('CUSTOMER_ID')    ,   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		
		
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_REPORT'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'REPORT_ID'
			);
	}
	*/
	
	// Classe de Arquivos para Download ADMINISTRATIVO
	public function ATT_WRS_DOWNLOAD()
	{
		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['new']			=	LNG('bt_new');
		$button['update']		=	LNG('bt_update');		
		$button['export']		=	LNG('bt_export_download');
		$button['import']		=	LNG('bt_import_download');
		
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';
		$button_icon['import']	=	'glyphicon glyphicon-import color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_DOWNLOAD');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order	=	array('order_by'=>'DOWNLOAD_ID' ,'order_type'=>'ASC');
		$extend	= 	array('class'=>'ATT_WRS_DOWNLOAD' 	,'file'=>'ATT_WRS_DOWNLOAD');
		$fields	=	array();
		
		/*
		$fields['WRS_ICON']			=	array('title'=>'#',   			'width'=>50,      'basic'=>true,  'grid'=>true);
		$fields['DOWNLOAD_ID']		=	array('title'=>'ID',   			'primary'=>true,  'type'=>'int',  'class'=>'hide');
		$fields['FILE_DESC']		=	array('title'=>'FILE_DESC',		'class'=>'hide');
		$fields['FILE_NAME']		=	array('title'=>'Nome Arquivo',	'list'=>true,	  'basic'=>true,  'grid'=>true,  'class'=>'hide');
		$fields['DATABASE_ID']		=	array('title'=>'Database',		'list'=>true,	  'basic'=>true,  'grid'=>true,  'class'=>'hide');
		$fields['FILE_SIZE']		=	array('title'=>'Tamanho',		'list'=>true, 	  'basic'=>true,  'grid'=>true,  'class'=>'hide');
		//$fields['FILE_DATE']		=	array('title'=>'Data',			'list'=>true,	  'basic'=>true,  'grid'=>true,  'class'=>'hide');
		*/
		
		// atributos gerados com base na tabela ATT_WRS_DOWNLOAD automaticamente de acordo com script SQL ao final deste arquivo
		$fields['DOWNLOAD_ID']   = array('title'=>LNG('DOWNLOAD_ID')    ,   'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['CUSTOMER_ID']   = array('title'=>LNG('CUSTOMER_ID')    ,   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['DATABASE_ID']   = array('title'=>LNG('DATABASE_ID')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['FILE_NAME']   = array('title'=>LNG('FILE_NAME')    ,   'length'=>250,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['FILE_DESC']   = array('title'=>LNG('FILE_DESC')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['FILE_DATE']   = array('title'=>LNG('FILE_DATE')    ,'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['FILE_SIZE']   = array('title'=>LNG('FILE_SIZE')    ,   'type'=>'int',   'length' => 5,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['FILE_FLAG']   = array('title'=>LNG('FILE_FLAG')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => false);
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_DOWNLOAD'), 
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'DOWNLOAD_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'callback_load_admin_generic_modal',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
			);
	}
	

	//Classe de Logs ADMINISTRATIVO
	public function ATT_WRS_LOG()
	{
		$button		=	$button_icon	=	array();

		$button['back']			=	LNG('bt_back');
		$button['export']		=	LNG('bt_export_log');
		
		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['export']	=	'glyphicon glyphicon-export color_write';

		$dados_tabela_evento = $this->getDadosTabelaConfig('ATT_WRS_LOG');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order	=	array('order_by'=>'DATE_ID' ,'order_type'=>'DESC');
		$extend	= 	array('class'=>'ATT_WRS_LOG' ,'file'=>'ATT_WRS_LOG');
		$fields	=	array();
	
		/*
		$fields['WRS_ICON']			=	array('title'=>'#',    		'width'=>50,	  'grid'=>true);
		$fields['TRANSACTION_ID']	=	array('title'=>'ID',   		'primary'=>true,  'list'=>true,  'grid'=>true,  'class'=>'hide');
		$fields['DATE_ID']			=	array('title'=>'Data', 		'list'=>true,	 'grid'=>true,  'class'=>'hide', 'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true);
		$fields['PROCESS']			=	array('title'=>'Processo',	'list'=>true,	  'grid'=>true,  'class'=>'hide');
		$fields['OPERATION']		=	array('title'=>'Operação',	'list'=>true, 	  'grid'=>true,  'class'=>'hide');
		$fields['MESSAGE']			=	array('title'=>'Mensagem',	'list'=>true, 	  'grid'=>true,  'class'=>'hide');
		$fields['USER_DESC']		=	array('title'=>'Usuário',	'list'=>true, 	  'grid'=>true,  'class'=>'hide');
		$fields['CUSTOMER_DESC']	=	array('title'=>'Cliente',	'list'=>true, 	  'grid'=>true,  'class'=>'hide');
		*/
		
		// Atributos gerados com base na tabela FAT_WRS_LOG automaticamente de acordo com script SQL ao final deste arquivo
		$fields['TRANSACTION_ID']   = array('title'=>LNG('TRANSACTION_ID')    ,   'type'=>'int',   'length' => 19,   'primary' => true, 'class'=>'hide',   'obrigatorio' => true);
		$fields['DATE_ID']   = array('title'=>LNG('DATE_ID')    ,'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['MODULE']   = array('title'=>LNG('MODULE')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['PROCESS']   = array('title'=>LNG('PROCESS')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['OPERATION']   = array('title'=>LNG('OPERATION')    ,   'length'=>250,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['MESSAGE']   = array('title'=>LNG('MESSAGE')    ,   'datatype_original_bd'=>'varchar',   'length_original_bd'=>'-1',   'length' => 7500,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_MASTER']   = array('title'=>LNG('USER_MASTER')    ,   'length'=>50,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_ID']   = array('title'=>LNG('USER_ID')    ,   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_CODE']   = array('title'=>LNG('USER_CODE')    ,   'length'=>50,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['USER_DESC']   = array('title'=>LNG('USER_DESC')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_ID']   = array('title'=>LNG('CUSTOMER_ID')    ,   'type'=>'int',   'length' => 19,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		$fields['CUSTOMER_DESC']   = array('title'=>LNG('CUSTOMER_DESC')    ,   'length'=>100,   'list'=>true, 'basic'=>true , 'grid'=>true,   'obrigatorio' => true);
		
		return array(	'title'		=>	LNG('TITLE_ATT_WRS_LOG'),
				'button'	=>	$button,
				'field'		=>	$fields,
				'table'		=>	$table,
				'order'		=>	$order,
				'icon'		=>	'user.png',
				'primary'	=>	'TRANSACTION_ID',
				'extend'				=>	$extend,											// NEW
				'checkbox'				=>	true, 												// NEW
				'button_icon'			=>	$button_icon,										// NEW
				'button_force_label'	=>	true, 			  									// NEW
 				'callback_btn_events'	=>	'callback_admin_btn_events', 						// NEW
				'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
				'actionDouble'			=>	'',				// NEW
				'exception'				=>	true, 												// NEW
				'aplicaClassLinhas'		=>	true,												// NEW
				'aplicaClassHeaders'	=>	'text-center'										// NEW
		);
	}
	
	public function GET_SSAS_REPORT()
	{
		$dados_tabela_evento = $this->getDadosTabelaConfig('GET_SSAS_REPORT');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order		=	array();
		$fields		=	array();
		$button		=	array();
		
		$button['new']		=	'Abrir Relatório';
		if(!WRS_USER::getArrPerfUser('DRG')){
			$button['update']	=	'Abrir Layout';
			$button['remove']	=	LNG('bt_remove');
		}

		$button_icon['back']	=	'glyphicon glyphicon-chevron-left bt_voltar';
		$button_icon['new']		=	'fa fa-pencil-square-o';
		$button_icon['update']	=	'fa fa-floppy-o';
		
		/*
		 * TODO: pegar do language esses labels
		 */
		
		$exceptions	=	array('file'=>'WRS_REPORT', 'class'=>'WRS_REPORT','type'=>'');
				
		$fields['REPORT_DESC']		=	array('title'=>'Nome', 				'width'=>250,	'classDataLine'=>'text-left',	'label_icon_small'=>true,	'label_icon_middle'=>true,	'label_icon_big'=>true,		'list'=>true,	'basic'=>true,  'grid'=>true);
		$fields['REPORT_SHARE']	=	array('title'=>'Compartilhado', 	'width'=>100,	'classDataLine'=>'text-center', 																					'list'=>true, 	'basic'=>true, 	'grid'=>false,'is_select'=>array('-1'=>'Selecionar','1'=>'Sim','0'=>'Não'));
		$fields['REPORT_DATE']		=	array('title'=>'Data', 				'width'=>130,	'classDataLine'=>'text-center',															'label_icon_big'=>true,		'list'=>true,	'basic'=>true,  'grid'=>true, 		'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true);
		$fields['REPORT_AUTOLOAD']	=	array('title'=>'Carga', 			'width'=>80,	'classDataLine'=>'text-center', 																					'list'=>true, 	'basic'=>true, 	'grid'=>false,'is_select'=>array('-1'=>'Selecionar','1'=>'Sim','0'=>'Não'));
		$fields['USER_DESC']		=	array('title'=>'Criador', 			'width'=>150,	'classDataLine'=>'text-left',								'label_icon_middle'=>true,	'label_icon_big'=>true,		'list'=>true,	'basic'=>true,  'grid'=>true);
		$fields['LAYOUT_ROWS']		=	array('title'=>'Linhas', 			'width'=>200,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_COLUMNS']	=	array('title'=>'Colunas', 			'width'=>200,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_MEASURES']	=	array('title'=>'Medidas', 			'width'=>200,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_FILTERS']	=	array('title'=>'Filtros', 			'width'=>200,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['FILTER_DESC']		=	array('title'=>'Filtrados', 		'width'=>200,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['FILTERS_VALUES']	=	array('title'=>'Itens Filtrados',	'list'=>false,	'basic'=>false, 'grid'=>false);
		
		return array(	 'title'				=>	LNG('TITLE_ATT_WRS_REPORT'),
						 'button'				=>	$button,
						 'field'				=>	$fields,
						 'table'				=>	$table,
						 'order'				=>	$order,
						 'icon'					=>	'report.png',	
						 'primary'				=>	'REPORT_ID',
						 'button_force_label'	=>	true, 			  									// NEW
						 'button_icon'			=>	$button_icon,										// NEW
						 'exception'			=>	$exceptions, 										// NEW
						 'checkbox'				=>	true, 												// NEW
						 'label_icon_custom'	=>	true, 												// NEW
 						 'use_auto_width'		=>	false, 												// NEW
		 				 'callback_btn_events'	=>	'callback_report_btn_events', 						// NEW
						 'actionSingle'			=>	'callback_check_line_generic_modal',				// NEW
						 'actionDouble'			=>	'callback_load_report_generic_modal',				// NEW
						 'aplicaClassLinhas'	=>	true,												// NEW
						 'aplicaClassHeaders'	=>	'text-center'										// NEW
		);
	}
	
	public function GET_SSAS_LAYOUTS()
	{
		$dados_tabela_evento = $this->getDadosTabelaConfig('GET_SSAS_LAYOUTS');
		$table	=	$dados_tabela_evento['tabela_bd'];
		
		$order		=	array();
		$fields		=	array();
		$button		=	array();
	
		
		if(!WRS_USER::getArrPerfUser('DRG'))
		{
			$button['remove']	=	LNG('BTN_REMOVE');
		}
	
		$button_icon=	array('new'=>'fa fa-folder-open');
		/*
		 * TODO: pegar do language esses labels
		*/
	
		$exceptions	=	array('file'=>'ReportLayout', 'class'=>'ReportLayout','type'=>'');
		
	
		$fields['LAYOUT_ID']		=	array('title'=>'#'							, 	'width'=>50,		'class'=>'hide','grid'=>false );
		$fields['LAYOUT_DESC']		=	array('title'=>LNG('tpl_layout_name')		, 	'width'=>300,	'classDataLine'=>'text-center', 'list'=>true, 	'basic'=>true, 	'grid'=>false);
		$fields['LAYOUT_ALIAS']		=	array('title'=>LNG('tpl_layout_alias')		, 	'width'=>300,	'classDataLine'=>'text-center',	'label_icon_big'=>true,		'list'=>true,	'basic'=>true,  'grid'=>true, 		);
		$fields['LAYOUT_SHARE']		=	array('title'=>'Comartilhado'				, 	'width'=>50,	'classDataLine'=>'text-center', 'list'=>true, 	'basic'=>true, 	'grid'=>false,'is_select'=>array(''=>'Sem opção','1'=>'Sim','0'=>'Não'));
		$fields['LAYOUT_ROWS']		=	array('title'=>LNG('ATTRIBUTOS_LINHA')		, 	'width'=>150,	'classDataLine'=>'text-left',	'label_icon_middle'=>true,	'label_icon_big'=>true,		'list'=>true,	'basic'=>true,  'grid'=>true);
		$fields['LAYOUT_COLUMNS']	=	array('title'=>LNG('ATTRIBUTOS_COLUNA')		, 	'width'=>150,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_MEASURES']	=	array('title'=>LNG('ATTRIBUTOS_METRICA')	, 	'width'=>150,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_FILTERS']	=	array('title'=>LNG('ATTRIBUTOS_FILTRO')		, 	'width'=>150,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false);
		$fields['LAYOUT_DATE']		=	array('title'=>'Data'						, 	'width'=>100,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false ,'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true);
		$fields['LAYOUT_UPDATE']	=	array('title'=>'Update'						, 	'width'=>100,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false, 'type'=>'date_object' ,'format'=>'d/m/Y H:i:s' ,'type_convert'=>true);
		$fields['LAYOUT_FLAG']		=	array('title'=>'Flag'						, 	'width'=>60,	'classDataLine'=>'text-left',	'list'=>true,	'basic'=>false, 'grid'=>false ,'is_select'=>array(''=>'Sem opção','1'=>'Sim','0'=>'Não'));
		$fields['LAYOUT_STATUS']	=	array('title'=>'Status'						,	'list'=>false,	'basic'=>false, 'grid'=>false);
		$fields['SERVER_ID']		=	array('title'=>'Server ID'					,	'list'=>false,	'basic'=>false, 'grid'=>false);
		$fields['DATABASE_ID']		=	array('title'=>'Database ID'				,	'list'=>false,	'basic'=>false, 'grid'=>false);
		$fields['CUBE_ID']			=	array('title'=>'Cube ID'					,	'list'=>false,	'basic'=>false, 'grid'=>false);
		$fields['USER_ID']			=	array('title'=>'User ID'					,	'list'=>false,	'basic'=>false, 'grid'=>false);
	
		
		return array(	 'title'				=>	LNG('tpl_layout'),
						'button'				=>	$button,
						'field'					=>	$fields,
						'table'					=>	$table,
						'order'					=>	$order,
						'icon'					=>	'report.png',
						'primary'				=>	'REPORT_ID',
						'button_force_label'	=>	true, 			  			// NEW
						'button_icon'			=>	$button_icon,				// NEW
						'exception'				=>	$exceptions, 				// NEW
						'checkbox'				=>	true, 						// NEW
						'label_icon_custom'		=>	true, 						// NEW
						'use_auto_width'		=>	false, 						// NEW
						'callback_btn_events'	=>	null, 						// NEW
						'actionSingle'			=>	'layout_actionSingle',		// NEW
						'actionDouble'			=>	'layout_actionDouble',		// NEW
						'aplicaClassLinhas'		=>	true,						// NEW
						'aplicaClassHeaders'	=>	'text-center'				// NEW
				);
	
	}

}



/*
 * felipeb 2016/02/25
 * SCRIPT SQL sutomatico para geracao de atributos de cada coluna de acordo com a tabela no BD 
 * 

-- EXEMPLOS GERADOS:
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_CUSTOMER')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_USER')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_DATABASE')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_CUBE')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_PERFIL')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('REL_WRS_CUBE_USER')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_REPORT')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_DOWNLOAD')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('FAT_WRS_LOG')
-- select * from fn_cria_atributos_para_PHP_WRS_PARAM('ATT_WRS_HIERARCHY')


IF OBJECT_ID (N'fn_cria_atributos_para_PHP_WRS_PARAM', N'IF') IS NOT NULL
    DROP FUNCTION fn_cria_atributos_para_PHP_WRS_PARAM;
GO
CREATE FUNCTION fn_cria_atributos_para_PHP_WRS_PARAM (@tabela varchar(50))
RETURNS TABLE
AS
RETURN 
(
	select {fn CONCAT('// atributos gerados com base na tabela ',{fn CONCAT(@tabela,' automaticamente de acordo com script SQL ao final deste arquivo')})} as descricao
	union all
	select 
		{fn CONCAT(
			{fn CONCAT(
				{fn CONCAT(
					{fn CONCAT(
						{fn CONCAT(
							{fn CONCAT(
								CONVERT(varchar,  '		$fields['''),
								CONVERT(varchar,  ic.COLUMN_NAME ))
							},
							CONVERT(varchar,  ''']			=	array(''title''=>LNG('''))		
						},
						CONVERT(varchar,  ic.COLUMN_NAME))
					},
					CONVERT(varchar,  ''')				') 
					)
				},
				(CASE CONVERT(varchar,  ISNULL(ic.CHARACTER_MAXIMUM_LENGTH,0)) WHEN '0' THEN 
																							(CASE ic.DATA_TYPE WHEN 'datetime' THEN ',''type''=>''date_object'' ,''format''=>''d/m/Y H:i:s'' ,''type_convert''=>true' ELSE {fn CONCAT(',   ''type''=>''int'',   ''length'' => ',CONVERT(varchar,  ic.NUMERIC_PRECISION))} END)
																				WHEN '-1' THEN 
																																	{fn CONCAT(
																																				',   ''datatype_original_bd''=>''',
																																				{fn CONCAT(
																																							ic.DATA_TYPE,
																																							{fn CONCAT(
																																										''',   ''length_original_bd''=>''',
																																										{fn CONCAT(
																																													CONVERT(varchar,  ic.CHARACTER_MAXIMUM_LENGTH),
																																													{fn CONCAT(
																																																'''',
																																																(CASE ic.DATA_TYPE WHEN 'varchar' THEN ',   ''length'' => 7500' ELSE ',   ''length'' => 1' END)
																																													)}
																																										)}
																																							)}
																																				)}
																																	)} 
																																	ELSE {FN CONCAT(',   ''length''=>',CONVERT(varchar,  ic.CHARACTER_MAXIMUM_LENGTH))} END)
				)
			},
				{fn CONCAT(										
							(CASE WHEN ic.COLUMN_NAME in (
															SELECT  --OBJECT_NAME(ic.OBJECT_ID) AS tabela, 
																	COL_NAME(ic.OBJECT_ID,ic.column_id) AS COLUMN_NAME
															FROM sys.indexes AS i
															INNER JOIN sys.index_columns AS ic
															ON i.OBJECT_ID = ic.OBJECT_ID
															AND i.index_id = ic.index_id
															WHERE i.is_primary_key = 1
															and OBJECT_NAME(ic.OBJECT_ID) = @tabela
							) THEN ',   ''primary'' => true, ''class''=>''hide''' ELSE ',   ''list''=>true,	''basic''=>true , ''grid''=>true' END),
							{fn CONCAT(	
										(CASE ic.IS_NULLABLE 
											WHEN 'YES' THEN ',   ''obrigatorio'' => false'
											WHEN 'NO' THEN ',   ''obrigatorio'' => true'
										END),				
										CONVERT(varchar,  ');')
							)}
				)}			
			)
		} as descricao
	from INFORMATION_SCHEMA.COLUMNS ic
	where ic.TABLE_NAME=@tabela
);
GO

 */