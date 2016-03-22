
/*
 * 
 * 
 * Forma de implementar 
 * 
 */
    
/*    
 *  BOTÂO
 <span class="btn btn-success fileinput-button">
   		 <i class="fa fa-paperclip btn_attach"></i><span>Selecione o arquivo</span>
    </span>
    
    <!-- The global progress bar -->
    <div id="progress" class="progress barra-de-progresso">
        <div class="progress-bar progress-bar-success"></div>
    </div>
    
    */

/*Chamada básica    
    $('.btn_attach').Anexo('init',
    				{
    					load	:	$('.barra-de-progresso'), 
    					host	:	'server/php/'
    				});
    
    */
(function ( $ ) {
	 /**
     * Estrutura do Filtro Fixo
     */

	$.fn.Anexo	= function(methodOrOptions) 
    {
		var that	=	 this;
		
		var _done	=	 function (e, data) 
		{
            $.each(data.result.files, function (index, file) 
            {
                $('<p/>').text(file.name).appendTo('#files');
            }
            );
        }
		
		
		var _progressall  	=	function (e, data) 
        {
			var _param	=	that.data('Anexo');
			
            var progress = parseInt(data.loaded / data.total * 100, 10);
            _param.load.find('.progress-bar').css(
                'width',
                progress + '%'
            );
        }
		
		var __init	=	 function(_param)
		{
			console.warn('chamda em branco');
		}
		
		
		
		var __basic	=	 function(_param)
		{
			var _id		=	'fileupload_'+js_rand(0,9000000)+date('H_i_s');
				
				var base		=	{id:_id, multiple:'multiple'};
				var data_option	=	$.extend({}, base,_param);
				
				that.data('Anexo',data_option);
				
				that.append('<input id="'+_id+'" type="file" name="files[]" '+data_option.multiple+'>');
				
			    $('#'+_id).fileupload({
			        url			: _param.host,
			        dataType	: 'json',
			        done		: _done,
			        progressall	: _progressall  
			    })
			    .prop('disabled', !$.support.fileInput)
			    .parent().addClass($.support.fileInput ? undefined : 'disabled');
			    
		}
		
		
		
		
		
		
		var templates_upload	=	 function(param)
		{

				var template_upload	=				'<!-- The template to display files available for upload -->'+
													'<script id="'+param.template+'" type="text/x-tmpl">'+
													'{% for (var i=0, file; file=o.files[i]; i++) { %}'+
													'    <tr class="template-upload fade">'+
													'        <td>'+
													'            <span class="preview"></span>'+
													'        </td>'+
													'        <td>'+
													'            <p class="name">{%=file.name%}</p>'+
													'            <strong class="error text-danger"></strong>'+
													'        </td>'+
													'        <td>'+
													'            <p class="size">'+LNG('UPLOAD_BTN_PROCESS')+'</p>'+
													'            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>'+
													'        </td>'+
													'        <td>'+
													'            {% if (!i) { %}'+
													'                <button class="btn btn-warning cancel">'+
													'                    <i class="glyphicon glyphicon-ban-circle"></i>'+
													'                    <span>'+LNG('UPLOAD_BTN_CANCEL')+'</span>'+
													'                </button>'+
													'            {% } %}'+
													'        </td>'+
													'    </tr>'+
													'{% } %}'+
													'</script>';
			
			


				var template_download	=		'<!-- The template to display files available for download -->'+
												'<script id="'+param.download+'" type="text/x-tmpl">'+
												'{% for (var i=0, file; file=o.files[i]; i++) { %}'+
												'    <tr class="template-download fade">'+
												'        <td>'+
												'            <span class="preview">'+
												'                {% if (file.thumbnailUrl) { %}'+
												'                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>'+
												'                {% } %}'+
												'            </span>'+
												'        </td>'+
												'        <td>'+
												'            <p class="name">'+
												'                {% if (file.url) { %}'+
												'                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?\'data-gallery\':\'\'%}>{%=file.name%}</a>'+
												'                {% } else { %}'+
												'                    <span>{%=file.name%}</span>'+
												'                {% } %}'+
												'            </p>'+
												'            {% if (file.error) { %}'+
												'                <div><span class="label label-danger">Error</span> {%=file.error%}</div>'+
												'            {% } %}'+
												'        </td>'+
												'        <td>'+
												'            <span class="size">{%=o.formatFileSize(file.size)%}</span>'+
												'        </td>'+
												'        <td>'+
												'            {% if (file.deleteUrl) { %}'+
												'                <button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields=\'{"withCredentials":true}\'{% } %}>'+
												'                    <i class="glyphicon glyphicon-trash"></i>'+
												'                    <span>'+LNG('UPLOAD_BTN_DELETAR')+'</span>'+
												'                </button>'+
												'            {% } else { %}'+
												'                <button class="btn btn-warning cancel">'+
												'                    <i class="glyphicon glyphicon-ban-circle"></i>'+
												'                    <span>'+LNG('UPLOAD_BTN_CANCEL')+'</span>'+
												'                </button>'+
												'            {% } %}'+
												'        </td>'+
												'    </tr>'+
												'{% } %}'+
												'</script>';
						return template_upload+template_download;
		}
		
		
		var __upload	=	 function(_param)
		{
				
			var _id			=	'fileupload_'+js_rand(0,9000000)+date('H_i_s');
			
			var base		=	{
									id					:	_id,	//create local
									progressComplete	:	true,
							        url					: 	'server/php/',
							        autoUpload			:	true,
							        uploadTemplateId	: 	'template-upload-wrs',
							        downloadTemplateId	: 	'template-download-wrs',
							        fileuploadProgress	:	'.fileupload-progress',
							        table_upload		:	'.files', //customização da API
							        sequentialUploads	:	true,
							        btnAnexar			:	'.btn-anexo',
							        paramRequest		:	{	
													                upload_dir : 'E:/WEB/_root/DEV/SANTOS/WRS/api/jQueryFileUpload/oficial/server/php/files/',
													                upload_url : 'http://alphaweb/DEV/SANTOS/WRS/api/jQueryFileUpload/oficial/server/php/files/'
													         },
								    attachStartSend		:	 null
						        };
			
			
			
			//Join nos options
			var data_option	=	$.extend({}, base,_param);
			
			
			//inserindo o input para anexar
			$(data_option.btnAnexar).append('<input type="file" name="files[]" multiple>');
			
				//Ajustar barra de progressão
				progress_bar_custom(data_option);
				
			
				//Deixando o template visual na tela
				$(_param.templates).html(templates_upload(
														{
																template:data_option.uploadTemplateId,
																download:data_option.downloadTemplateId
														}
													)
									);
				
				//Salvando atributos
				that.data('Anexo',data_option);
				
			    // Initialize the jQuery File Upload widget:
			    $('#fileupload').fileupload(data_option);
			    
			        // Load existing files:
		        $('#fileupload').addClass('fileupload-processing');
			        
		        	//UPLOAD
			        $.ajax({
					            url			: 	$('#fileupload').fileupload('option', 'url'),
					            dataType	: 	'json',
					            context		: 	$('#fileupload')[0],
					            data		: 	data_option.paramRequest ,
			        		}).always(function () {
			            $(this).removeClass('fileupload-processing');
			        })
			        .done(function (result) {
			            $(this).fileupload('option', 'done').call(this, $.Event('done'), {result: result});
			        });
			        
			        
		}
		
		
		
		
		var progress_bar_custom	=	 function(options)
		{
			
	         var _html		=	'<!-- The global progress bar -->'+
						         '<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">'+
						         '    <div class="progress-bar progress-bar-success" style="width:0%;"></div>'+
						         '</div>';
	         
	         
	         
	         if(options.progressComplete==true)
	         {
	        	 _html+=		 '<!-- The extended global progress state -->'+
								 '<div class="progress-extended">&nbsp;</div>';
	         }
	         

	         $(options.fileuploadProgress).html(_html);

		}
		
		
    	/*
		 * Metodos de funções
		 * formas de chamadas externas
		 */
		var methods = 
		{
		        init 			: 	__init,
		        basic			:	__basic,
		        upload			:	__upload
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
	            $.error( 'Method ' +  methodOrOptions + ' does not exist on Anexo.Anexo' );
	    }
		
		
    };	
}( jQuery ));


 
