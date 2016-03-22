<?php 
$nameImage	=	 fwrs_request('nameImage');

?>
	<div class="modal-content modal-content-grid">
	
		<div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active">
			<h4 class="modal-title2" id="myModalLabel"><?php  eLNG('MAIL_TITLE');?></h4>
		</div>
	
		<div class="modal-body wrs_window_grid">
			<div class="row body_grid_window">
				<div class="col-md-12 col-xs-12 col-sm-12  body_data_mail">
					<div class="form-group"><input type="email" class="form-control" id=mailTo placeholder="<?php eLNG('MAIL_TO');?>"></div>
					<div class="form-group"><input type="email" class="form-control" id="mailSubject" placeholder="<?php  eLNG('MAIL_SUBJECT');?>"></div>
					
					<div class="form-group">
								<div class="form-group"><div id="bodyMail"></div></div>
					</div>
					
					<div class="form-group">
						<img style="width: 100%; height: auto;"  src="<?php echo $pathScreenShot.$nameImage;?>.jpeg">
					</div>
					
			
				            
				<!--  Templates padrão de utilização do APP -->
				<div class="templates"></div>
				
				<!-- Tabela onde irá mostrar as informações de download e já incluidos -->
				<table role="presentation" class="table table-striped container-butto-table"><tbody class="lisUpload"></tbody></table>
					
					
					
					
				</div>
			</div>
		</div>
	
		<div class="modal-footer">

<!-- ANEXAR -->		    
    <button id="fileupload" class="btn btn-success btn-left-anexo-css ">
	        <span class="fileupload-buttonbar">
	                <!-- The fileinput-button span is used to style the file input field as button -->
	                <span class="fileinput-button btn-anexo">
	                   <i class="fa fa-paperclip"></i><?php eLNG('UPLOAD_BTN_ANEXAR');?>
	                </span>
	        </span>
    </button>

    	<div class="col-lg-5 wrs-progress-bar fade" style="width: 200px; float: left; margin-left: 10px;"></div>
    <!-- END ANEXAR -->
    
    
    
    
			<div class="btn-group" role="group" aria-label="...">
				<button type="button" table="GET_SSAS_REPORT" action_type="new"
					class="btn btn-color-write btn-success 	btn_window_grid_event">
					<i class="fa fa-envelope-o"></i><?php  eLNG('MAIL_SEND');?>
				</button>
				<button type="button" class="btn btn-default btn-modal-cancel" data-dismiss="modal">
					<i class="glyphicon glyphicon-off"></i> <?php eLNG('MODAL_GENERICA_CANCELAR');?>
				</button>
			</div>
		</div>
	</div>


<script>
	
	

	//@link http://summernote.org/examples/#codemirror-as-codeview -- save
  	get_form_info_screenShot();
  	//@link http://stackoverflow.com/questions/28812825/custom-toolbar-with-summernote
	$('#bodyMail').summernote(
								{ 
									height	: 150,
									lang	: '<?php eLNG('siglaIdioma');?>',
									   toolbar: [
									             //[groupname, [button list]]

									             ['style', ['bold', 'italic', 'underline', 'clear']],
									             ['color', ['color']],
									             ['fontname', ['fontname']],
									             ['para', ['ul', 'ol', 'paragraph']]
									         ]
								}
							);


	$('.btn_window_grid_event').click(sendMailScreenShot);
	
	    $('.btn_attach').Anexo('upload',
	    				{
	    					host				:	'api/jQueryFileUpload/server/php/',
	    					url					:	'api/jQueryFileUpload/server/php/',
	   						templates			:	'.templates',
   							tableUpload			:	'.lisUpload',
   							fileuploadProgress	:	'.wrs-progress-bar',
   							btnAnexar			:	'.btn-anexo',
   							progressComplete	:	false,
   					        paramRequest		:	{	
   					        								upload_dir 	: 'files/mail/'+getLogin('USER_ID')+'/',
											                upload_url 	: 'http://179.111.208.168/DEV/SANTOS/WRS/files/mail/'+getLogin('USER_ID')+'/'
											         },
						    attachStartSend		:	 function(){
							    							//ao clicar em enviar ele realoca a barra para visualizar o que está sendo baixado
															jQuery(".wrs_window_grid").scrollTop(jQuery(".wrs_window_grid")[0].scrollHeight);
														}
		    			});

	
</script>