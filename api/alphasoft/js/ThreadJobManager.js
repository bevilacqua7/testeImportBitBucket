/*
 *
 * Gerenciador DOS JOBS ao criar ou executar um novo processo é necessário iniciar o start de JOBS nele é gerenciado 
 * todo o processo de JOBS do WRS
 *
 * @author Marcelo Santos
 *
 * Referências
 * @link http://learn.jquery.com/plugins/basic-plugin-creation/
 */

/*
 * Apresentação em Segundos para o setTimeOutst
 * 
 */


//Convertendo para o seguntos do setTimeout
var WRS_TIME_THREAD			=	1000*2; 
//Segundos para administração para verificar se a ação morreu
var WRS_TIME_OUT_THREAD		=	10;	

//Contagem em mile Segundos
var TIME_LOAD				=	300;





function job_exist(report_id)
{
	return $('body').managerJOB('exist_job_render',{'report_id':report_id});
}

function get_all_jobs()
{
	return $('body').data('managerWrsJOB');
}

(function($){

	$.fn.managerJOB = function(methodOrOptions)
	{
		var DataManagerJob		=	'managerWrsJOB';
			/**
			 * Pegando todos os registros do ManagerJOB
			 */
			var GetData		=	function()
				{
						var data_body		=	$('body').data(DataManagerJob);
							data_body		=	data_body==undefined || data_body==null || data_body=='' ? {} : data_body;
							
						var defaultData		=	{
													job					:	{},	//Processos que ainda estão em execução pelo JOB do Banco de dados
													job_render			:	{}, //Processos de load que ainda está em execução mesmo que o job já tenha finalizado  é a copia de dados do JOB mas apenas para que a Grid finaliza de carregar
													cancel				:	{}, //Solicitação de cancelamento
													keys				:	{}, //Chave para retorno caso não exita a chave para o retorno então não mostra na tela
													mensagens			:	{},	//Contem as mensagens de erro que foram geradas apenas se limpa quando solicita uma nova
													mktime				:	{}, //contem todos os mktime da criação do event 
													_time				:	null, // 
													report_id_active	:	null,
													not_title			:	false,  // Flag informa se pode ou não executar a ação do cancelar e mostrar o title
													modal				:	'.modal-window-wrs',
													close_modal			:	'.manager-job-modal-close',
													cancel_job			:	'.manager-job-modal-cancel',
													aba_close_report_id :  false,
															
													
												}
						
						return $.extend({}, defaultData,data_body);
				}
			
			var setNotTitle		=	 function(not_title)
			{
				var _data				=		GetData();
					_data.not_title		=		not_title;
					setData(_data);
					
					delete _data;
					
			}
			
			
			var setAbaClose		=	 function(report_id)
			{
				var _data							=		GetData();
					_data.aba_close_report_id		=		report_id;
					setData(_data);
					delete _data;
			}
			
			
			var setData	=	function(data)
			{
				//console.error('__setData',data);
				
				$('body').data(DataManagerJob,data);
				delete data;
			}
		
			
			var setReportActive	=	 function(data)
			{
				var _data						=		GetData();
					_data.report_id_active		=		data;
					setData(_data);
					delete _data;
			}			
			
			var setTime	=	 function(data)
			{
				var _data			=		GetData();
					_data._time		=		data;
					
					setData(_data);
					delete _data;
			}			
			
			var setMktime	=	 function(key,data)
			{
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.mktime	=	{};
						}else
						{
							delete _data.mktime[key];
						}
					}
					else
					{
						_data.mktime[key]	=	data;
					}
					
					setData(_data);
					delete _data;
			}
						
			var setMensagens	=	 function(key,data)
			{
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.mensagens	=	{};
						}else
						{
							delete _data.mensagens[key];
						}
					}
					else
					{
						_data.mensagens[key]	=	data;
					}
					
					setData(_data);
					delete _data;
			}
			
			
			
			var setCancel	=	 function(key,data)
			{
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.cancel	=	{};
						}else
						{
							delete _data.cancel[key];
						}
					}
					else
					{
						_data.cancel[key]	=	data;
					}
					
					setData(_data);
					delete _data;
			}
			
			
			
			var __setKeys		=	 function(key,data)
			{
				_START('setKeys');
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.keys	=	{};
						}else
						{
							delete _data.keys[key];
						}
					}
					else
					{
						_data.keys[key]	=	data;
					}
					
					setData(_data);
					delete _data;
					_END('setKeys');
			}
			
			
			
			
			var __getKeys		=	 function()
			{
				_ONLY('getKeys');
				var _data					=	GetData();
				var key 					= _data.keys;
				delete _data;
				return key;
			}	
			
			
			
			var getCancelCall	=	 function()
			{
				var _data					=	GetData();
				
				var ccancel	=	 _data.cancel_call;
				delete _data;
				return ccancel;
			}
			
			
			
			var setJobRender	=	 function(key,data)
			{
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.job_render	=	{};
						}else
						{
							delete _data.job_render[key];
						}
					}
					else
					{
						_data.job_render[key]	=	data;
					}
					
					setData(_data);
					delete _data;
			}			 
			
			
			
			
			var setJob	=	 function(key,data)
			{
				var _data					=	GetData();
				
				if(data==undefined || data=='undefined' || data==null || data=='')
					{
						if(key==undefined || key=='undefined' || key==null || key=='')
						{
							_data.job	=	{};
						}
						else
						{
							delete _data.job[key];
						}
					}
					else
					{
						_data.job[key]	=	data;
					}
					
					setData(_data);
					delete _data;
			}
			
			
			
			
			var setJobData	=	 function(data)
			{
				var _data			=	GetData();
					_data.job		=	data;
					setData(_data);
					delete _data;
			}
			
			var __init		=	function()
			{
				console.error('É Necessário especificar qual ação deve ser tomada');
			}			
			
			
			
			
			
			
			/**
			 * Finalizou de carregar a Grid ou remove de vez o load
			 */
			var __load_complete	=	 function(options)
			{
				_START('managerJOB::__load_complete');
				
				var _report_id	=	 options.report_id;
				var _data		= 	GetData();
				var _kendoActive=	get_aba_active_kendoUi();
				
					setMensagens(_report_id,undefined);
					setJobRender(_report_id,undefined);
					//setJob(_report_id,undefined);
					setMktime(_report_id,undefined);
					setNotTitle(false);
					
					
					if(_kendoActive.REPORT_ID==_report_id)
					{
						$(_data.modal).addClass('hide');
					}
					
					
					
					
				delete _data;
				_END('managerJOB::__load_complete');
			}
			
			
	
			
			
			/*
			 * Errro no processo de renderização do HTML
			 */
			var __error_html	=	 function(options)
			{
				_START('managerJOB::__error_html');
				
				var _report_id		=	options.report_id;
				var _msg			=	 options.msg;
				var _title			=	$('.'+_report_id).wrsAbas('aba_title',{report_id:_report_id});
				
					alertify.error(sprintf(LNG('ERRO_EXECUTE_ABA'),_title)+_msg, 0);
				
					setMensagens(_report_id,_msg);
					setCancel(_report_id,undefined);
					
					setJobRender(_report_id,undefined);
					//setJob(_report_id,undefined);
					setMktime(_report_id,undefined);
					setNotTitle(false);
					
				_END('managerJOB::__error_html');
				
			}
			
			
			
			
			
			/*
			 * Iniciando o processo de renderização não starta o processo de gerenciamento de JOB
			 * options = {report_id,title_aba,mktime}
			 */
			var __start_job	=	 function(options)
			{
				_START('managerJOB::__start_job');
				
					var _data		=	 GetData();
					var _report_id	=	options.report_id;
					
						$(_data.modal).find('.modal-text-wrs-job').html(LNG('GERANDO_RELATORIO'));
					
						setJobRender(_report_id,options);		
						setMktime(_report_id,options);
						
						time_loop_control();
						
						$(_data.modal).removeClass('hide');
						$(_data.close_modal).addClass('hide');
						
						
						
							if(ExistRealJob(_report_id,_data.mensagens))
							{
								$(_data.close_modal).removeClass('hide');
								$(_data.modal).addClass('hide');
								
							}
							
					delete _data;
					
					
					__show_modal();
						
					_END('managerJOB::__start_job');	
			}
			
			
			
			
			
			/**
			 * Create HTML modal
			 */
			var __create_modal	=	 function()
			{
				_START('managerJOB::__create_modal');
				
				var _html	=	'<!--  Modal JOB -->'+
								'		<div class="modal-window-wrs hide modal-manager-job" >'+
								'			<div class="modal-box-wrs  modal-type-primary modal-size-normal" style="position: absolute; top: 50%; margin-top: -72px; ">'+
								'				<div class="modal-inner-wrs">'+
								'						<div class="modal-title-wrs-job">'+
								'							<h3><!-- Primary --></h3> '+
								'						</div>'+
								'						<div class="modal-text-wrs-job">'+
								'							<!--A simple primary message! -->'+
								'						</div>'+
								'						<div class="modal-buttons-wrs-job" report_id="">'+
								'							<button class="btn btn-warning modal-btn-padding modal-btn-job-wrs   manager-job-modal-cancel"> <span class="title"> <i class="fa fa-hand-paper-o"></i> '+LNG('BTN_CANCEL_CONSULTA')+' </span> <span class="wrs-modal-time">00:00</span></button>'+
								'							<button class="btn btn-default  modal-btn-padding manager-job-modal-close"><i class="fa fa-times"></i> '+LNG('JOB_CLOSE_ALERT')+'</button>'+
								'						</div>'+
								'				</div>'+
								'			</div>'+
								'		</div>'+
								'<!--  END MODAL JOB -->';
				
				//Gatante que não exista outra janela
				$('.container_panel_relatorio').find('.modal-manager-job').each(function(){$(this).remove()});
				
				//Adiciona a estrutura da JANELA
				$('.container_panel_relatorio').append(_html);
				
				$('.manager-job-modal-cancel').unbind('click').click(EventClickJobModalCancel);
				
				$('.manager-job-modal-close').unbind('click').click(EventClickJobModalClose);
				
				_END('managerJOB::__create_modal');	
				
			}
			
			var __show_modal		=	 function()
			{
				var _data		=	GetData();
				
				


				try{
					$(_data.close_modal).addClass('hide');				
					$(_data.cancel_job).removeClass('hide');
				}catch(e){}
				
				
				$(_data.modal).removeClass('hide');
				
			}
			
			
			var RequestProccessCancelJOB	=	 function(data)
			{
					_START('managerJOB::RequestProccessCancelJOB');
					
						var _title		=	$('.'+data.report_id).find('.title').html();
						var _data		=	 GetData();		
						
						if(data.status!=-2)
						{
							alertify.success(sprintf(LNG('JOB_CANCEL'),_title));
						}

						if(data.status < 0)
						{
							/*
							 * Este erro é irrelevante pois o usuário não precisa tomar ciencia caso ele ocorra
							 */
							console.error('Error no JOB '+data.report_id,data.html);
						}
					
					delete _data;
				_END('managerJOB::RequestProccessCancelJOB');	
			}
			
			
			
			/*
			 * Click Cancel JOB
			 */
			var EventClickJobModalCancel	=	 function()
			{
				_START('managerJOB::EventClickJobModalCancel');
				
					var _data		=	 GetData();
					var _report_id	=	_data.report_id_active;
					var kendoActive	=	get_aba_active_kendoUi();
					
						//Faz com que o cancelamento seja efetivado se for a mesma aba corrente
						if(kendoActive.REPORT_ID!=_report_id)
						{
							return false;
						}
						
						
						
					
					var setElementsLocal	=	 function(_report_id,_data)
					{
						//Alimentando as flags do sistema
						setCancel(_report_id,_report_id);
						setMensagens(_report_id,undefined);
						setJobRender(_report_id,undefined);
						setMktime(_report_id,undefined);
						
						if(_data.aba_close_report_id!=false)
						{
							setAbaClose(false);
						}
					}
					
					
						// Foi solicitado a opção de cancelar a ABA
						if(_data.aba_close_report_id!=false)
						{
							_report_id	=	_data.aba_close_report_id;
						}
						
						
						
						
						//Não permite a parace se o title do botão tiver desabilitado
						if(_data.not_title==true)
						{
							_END('managerJOB::EventClickJobModalCancel');
							setElementsLocal(_report_id,_data);
							return true;
						}
						
						
						if(!isEmpty(kendoActive.KEYS))
							{
								__setKeys(kendoActive.KEYS,kendoActive.REPORT_ID);
								setElementsLocal(_report_id,_data);
							}
						
						//show grid
						$('#'+_report_id+'Main').removeClass('hide');
						$(_data.modal).addClass('hide');
						
						$('.'+_report_id).wrsAbaData('setKendoUi',{STOP_QUERY:true});
						
						
						//Se não existir job então não permite o cancelamento
						if(ExistRealJob(_report_id,_data.job)==false)
						{
							_END('managerJOB::EventClickJobModalCancel o Job pode já estar em processo de renderização ou não foi criado');
							//alertify.error('O job ainda não foi criado');
							//setElementsLocal(_report_id,_data)
							return true;
						}


						
					
					var _file			=	'WRS_PANEL';
					var _class			=	'WRS_PANEL';
					var _event			=	'stopjob';
					var param_request	=	{report_id:_report_id};
						
						

							runCall(
										param_request,
										_file,
										_class,
										_event,
										RequestProccessCancelJOB,
										'modal','json'
									);	


						//setElementsLocal(_report_id,_data);				
							
				delete _data,kendoActive;
				
				_END('managerJOB::EventClickJobModalCancel');
			}
			
			
			
		
			
			
			
			/*
			 * CLick para fechar a janela de modal
			 */
			var EventClickJobModalClose		=	 function()
			{
				_ONLY('managerJOB::EventClickJobModalClose');
				
				var _data			=	 GetData();
				
				var _active_aba		=	get_aba_active_kendoUi();
				
					$(_data.modal).addClass('hide');
					$(_data.cancel_job).removeClass('hide');
					$(_data.close_modal).addClass('hide');
					
					
					//Removendo a menagem do alertify de erro
					$('.alertify-logs .'+_active_aba.REPORT_ID).trigger('click');
					
					wrs_panel_layout.open('east');
					wrs_panel_layout.open('west');
					
					
					$('.wrs_run_filter').removeAttr('locked');
					
					setMensagens(_data.report_id_active,undefined);//remove a mensagel
					
					delete _data,_active_aba;
			}
			
			
			
			
			
			var __setActiveAba	=	 function(options)
			{
				_START('managerJOB::__setActiveAba');
				
				var _report_id		=	options.report_id;
				var _data			=	GetData();
				
					setReportActive(_report_id);

					//Não existe informações para rendetizar
					if(ExistRealJob(_report_id,_data.job_render)==false)
					{
						$(_data.modal).addClass('hide');
						
						var is_messenger	=	__getMessenger({report_id:_report_id});
						
						if(!isEmpty(is_messenger))
						{
							__setMessengerWindow({kendoUi:options.kendoUi,messenger:is_messenger});
							delete _data,is_messenger;
							return  false;
						}

						
						delete _data,is_messenger;
						return true;
					}
					
					
					time_loop_control();
					
					$(_data.modal).removeClass('hide');
					delete _data;
					return true;
				_END('managerJOB::__setActiveAba');
			}
			
			
			
			
			
			var __setMessengerWindow		=	 function(options)
			{
				_START('managerJOB::__setMessengerWindow');
				
				var _report_id		=	options.kendoUi.REPORT_ID;
				var _data			=	GetData();
				
					$(_data.modal).removeClass('hide');
					$(_data.cancel_job).addClass('hide');
					$(_data.close_modal).removeClass('hide');
					
					$(_data.modal).find('.modal-title-wrs-job').html(options.kendoUi.TITLE_ABA);
					$(_data.modal).find('.modal-text-wrs-job').html(options.messenger);
					
					delete _data;
				_END('managerJOB::__setMessengerWindow');
			}
			
			
			
			var __resize			=	 function(options)
			{
				_START('managerJOB::__resize');
				
				formata_texto_resultado_filtros();
				
				$('.ui-layout-center').css({overflow: 'visible'})
					var _data		=	 GetData();
					var _options	=	options;
					
					//Pegando o Tamando padrão da Tela para repassar para a tela do modal
					//if(options==undefined || options=='undefined')
					//	{
							var layout_center_object	=		$('.ui-layout-center');
							var offset					= 		layout_center_object.offset();
							//offset.top
							
							var layout_center			=	{
																padding_left	:	parseInt(layout_center_object.css('padding-left').replace("px", "")),
																padding_right	:	parseInt(layout_center_object.css('padding-right').replace("px", "")),
																context			:	layout_center_object,
																height			:	layout_center_object.outerHeight(),
																width			:	layout_center_object.outerWidth()
															};
	
							
							_options	=	{height:layout_center.height-25,width:layout_center.width	}
					//	}
					
	
					$(_data.modal).width(	_options.width	).height(_options.height);
				delete _data,_options;
				_END('managerJOB::__resize');
			}
			
			
			/**
			 * Verifica se existe um job Real em Processo
			 */
			var ExistRealJob	=	 function (report_id,data)
			{
				
				if(jQuery.isEmptyObject(data)==true) {
					return false;
				}
				
				for(var lineData in data)
				{
					if(lineData==report_id) return true;
				}
				
				return false;
			}
			
			/**
			 * Existe in JOB
			 * Nesse processo pe que detectamos que o JOB foi criado e é necessário iniciar o processo de LOOP
			 * Caso exista então faz a criação do processo de JOB
			 */
			var __exist_job_render			=	 function(options)
			{
				_START('managerJOB::__exist_job_render');
				
				var _data				=	 GetData();
				var _report_id			=	options.report_id;
				var _is_force			=	 false;
				var _data_job_render	=	_data.job_render
				
				//Verificando se veio com o comando de inicialização do Loop do JOB
				try
				{
					_is_force	=	options.force_loop_job;
					
				}catch(e){
					_is_force	=	 false;
					if(IS_EXCEPTION) console.warn(' exception');
				}
				
				if(ExistRealJob(_report_id,_data)==true) return true;
				
				for(var lineData in _data_job_render)
					{
						if(lineData==_report_id)
						{
							if(_is_force) 
							{
								//setJob(lineData,lineData);
								setTimeout(ThreaLoopJobManager, WRS_TIME_THREAD);
							}
								delete _data,_data_job_render;
							return true;
						}
					}
				delete _data,_data_job_render;
				
				_END('managerJOB::__exist_job_render');
				
				return false;
			}
			
			
			
			
			
			
			
			
			
			
			//Cancelamento do JOB Automatico pelo script
			var __remove_aba_cancel_job	=	 function(options)
			{
				_START('managerJOB::__remove_aba_cancel_job');
					var _data		=	 GetData();
					
					var _report_id		=	 options.report_id;
						setAbaClose(_report_id);	
						EventClickJobModalCancel();
						setAbaClose(false);
						delete _data;
				_END('managerJOB::__remove_aba_cancel_job');
			}
			
			
			
			
			
		 
		 /*
    	 * Thread por requisição do JOB
    	 * Quando oprocesso é finalizado chama-o novamente até que não exista mais JOBS a serem processados
    	 */
    	var ThreaLoopJobManager	=	 function()
    	{
			_START('ThreaLoopJob');
			var _data	=	 GetData();
				if(jQuery.isEmptyObject(_data.job_render)==false)
				{
					var _file			=	'WRS_PANEL';
					var _class			=	'WRS_PANEL';
					var _event			=	'threadJobManager';

						param_request	=	base64_encode(json_encode(array_keys(_data.job_render)));
						runCall(	
									{'jobs_manager':param_request},
									_file,
									_class,
									_event,
									ThreaLoopJobManagerData,
									'modal',
									'json'
								);	
				}
				
			delete _data;
    		_END('ThreaLoopJob');
    	}
		
		
		
		/*
    	 * Recebe dados do run call
    	 */
    	var ThreaLoopJobManagerData	=	 function(data)
    	{
			_START('ThreaLoopJobManagerData');
			
			var _data_local			=	GetData();
    		var modal				=	$(_data_local.modal);
    		var report_id_modal		=	modal.find('.modal-buttons-wrs-job').attr('report_id');

    			setJobData(data);
    			
    		for(var _report_id in data)
    			{
    					var _data_json	=	typeof(data[_report_id]) == 'string' ? $.parseJSON(data[_report_id]) : data[_report_id];
    					var is_Cancel	=	 false;
    					var is_current	=	false;	
    					 
    					
							try{
								if(_data_json['cancel']==true)
								{
									is_Cancel			=		true;	
								}
							}catch(e){
								is_Cancel	=	 false;
								if(IS_EXCEPTION) console.warn(' exception');
							}
							

							
							
							
							if(_data_local.report_id_active==_report_id)
							{
								is_current	=	 true;
								try{
									if(is_Cancel==false)
									{
										var msg_job		=	_data_json['data']['QUERY_MESSAGE'];
										
											modal.find('.modal-text-wrs-job').html(msg_job);
									}									
								}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
							}
							
							
							
						
							try{
									
									if(_data_json['error'])
										{
											var _title		=	$('.'+_report_id).wrsAbas('aba_title',{report_id:_report_id});
											var aba_active	=	 get_aba_active_kendoUi();

											
											

												//setJob(_data_json['REPORT_ID'],undefined)//Removendo a estrutura do JOB

												setJobRender(_data_json['REPORT_ID'],undefined)//Removendo a estrutura do JOB
												setJob(_report_id,undefined);
												
												$('.'+_report_id).wrsAbaData('setKendoUi',{STOP_RUN:false});
												
												
												if(!is_Cancel)
												{

													var mensagem_alert		=	_data_json['error'];
													
													
													try{
														mensagem_alert	=	_data_json.data.QUERY_MESSAGE
													}catch(e){
														mensagem_alert		=	_data_json['error'];
													}
													
													
													alertify.error(sprintf(LNG('ERRO_EXECUTE_ABA'),_title)+'<span class="'+_report_id+'">'+mensagem_alert+'</span>', 0);

													setMensagens(_data_json['REPORT_ID'],mensagem_alert);//Adicionando a mensagem de erro ao processo de JOB

													if(aba_active['REPORT_ID']==_data_json['REPORT_ID'])
														{
														
															$('#'+aba_active['REPORT_ID']+'Main').removeClass('hide');
														}
												}

												if(is_current==true)
												{
													$(_data_local.cancel_job).addClass('hide');
													$(_data_local.close_modal).removeClass('hide');
												}
												
												delete aba_active;
										}
							}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
							
							
							
				
						
							try{
									
									if(_data_json['html'])
										{
											
											var _title		=	$('.'+_report_id).wrsAbas('aba_title',{report_id:_report_id});
											
											alertify.success(sprintf(LNG('JOB_COMPLETE_LOAD'),_title));
											MOUNT_LAYOUT_GRID_HEADER(_data_json['warning']+_data_json['html'],'ThreadMainLoadData');
											
											setJob(_report_id,undefined);

											setMensagens(_data_json['REPORT_ID']);//removendo mensagem desse key
											
											//setJob(_data_json['REPORT_ID'],undefined)//Removendo a estrutura do JOB
										}
								}catch(e){if(IS_EXCEPTION) console.warn(' exception');}
								
    			}
    		

			if(jQuery.isEmptyObject(data)==false)
    			{
						setTimeout(ThreaLoopJobManager, WRS_TIME_THREAD);
    			}
				else
				{
					//setJob(undefined);//Zerando a estrutura de job
    				alertify.success(LNG('JOB_COMPLETE'));
    				setJob(undefined);
    			}
				
				delete data;
				delete _data_local;
				delete modal;
				delete _data_local;

			_END('ThreaLoopJobManagerData');	
			
    	}
		
		
    	var __getMessenger		=	 function (options)
    	{
    		
    		var _options		=	options;
    		var _data			=	 GetData();
    		var _messenger		=	null;
    		
    		try{
    			_messenger	=	_data.mensagens[_options.report_id];
    			
    		}catch(e){
    			console.warn('exception');
    			_messenger	=	 null;
    		}
    		
			
			delete _options,_data;
    		return _messenger;
    		//_options.report_id
    	}
		
		
		/**
		 * GErenciamento do Loop do TIMER
		 */
		var time_loop_control	=	 function()
			{
				var _data			=	GetData();
		
				
				
					if(_data.report_id_active==null)
					{
						console.error('Não há aba ativa para o time_loop_control processar');
						return false;
					}
					
					if(jQuery.isEmptyObject(_data.job_render)==true)
					{
						_ONLY('time_loop_control:: Não existe mais objetos a serem renderizados');
						return true;
					}
					
				
				
				var _mktime			=	null;
				var _type_run	=	null;
				
				try{
					_mktime			=	_data.mktime[_data.report_id_active].mktime;
					_type_run		=	_data.mktime[_data.report_id_active].type_run
				}catch(e){
					_mktime= null;
					if(IS_EXCEPTION) console.warn(' exception');
				}
				
				if(_mktime==null) return false;
				
				
					if(_type_run=='DrillColuna')
					{
						$(_data.cancel_job+' .title').hide();
						setNotTitle(true);
					}else{
						$(_data.cancel_job+' .title').show();
						setNotTitle(false);
					}

				
				
				 
				$(_data.modal).find('.modal-title-wrs-job h3').html(_data.mktime[_data.report_id_active].title_aba);
				
				
				var _mktime_current	=	mktime();
					_mktime			=	_mktime_current-_mktime;
				var _date			=	 date('i:s',_mktime);
				
					if(_data.not_title==true)
					{
						$(_data.cancel_job+' .title').hide();
					}else{
						$(_data.cancel_job+' .title').show();
					}
					
					$('.wrs-modal-time').html(_date);
					
					setTimeout(time_loop_control, TIME_LOAD);
					
					
					delete _data;
			}
			
			
		var methods = 
		{
				init 					: 	__init,
				load_complete			:	__load_complete	,
				start_job				:	__start_job,
				error_html				:	__error_html,
				create_modal			:	__create_modal,
				setActiveAba			:	__setActiveAba,
				resize					:	__resize,
				exist_job_render		:	__exist_job_render,
				getMessenger			:	__getMessenger,
				setMessengerWindow		:	__setMessengerWindow,
				data					:	GetData,
				remove_aba_cancel_job	:	__remove_aba_cancel_job,
				getKeys					:	__getKeys,
				setKeys					:	__setKeys,
				show_modal				:	__show_modal
		};
		
		 
		/*
		 * 
		 * Inicia a construção dos metodos
		 * 
		 */
		if ( methods[methodOrOptions] )
		{
				return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof methodOrOptions === 'object' || ! methodOrOptions )
		{
				// Default to "init"
				return methods.init.apply( this, arguments );
		}
		else
		{
				$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
		}   
	
	}
 
 
}( jQuery ));



$(document).ready(function(){
	
	$('body').managerJOB('create_modal'); //Criando o BOX de CSS
	

});
