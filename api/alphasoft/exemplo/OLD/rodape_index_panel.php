<div class="ui-state-focus" width="100%" style="border:solid 0 #F7F7F7">
    <table width="100%" border="0" height="35">
        <tr>
            <td width="240" align="left" style="vertical-align:middle;padding-left:5px">
                <div id="pageMenu">
                    <div class="menu_aple " id="menu_aple">
                        <a href="#" >
                            <img class="" src="../imagens/home.png?125594175" title="Menu Principal" onClick="voltaHome('theme-azul','PT','PMB')"  />
                        </a>
                        <a href="#">
                            <img class="" src="../imagens/new.png?125594175"   title="Novo Relatorio" onClick="criaNew();"/>
                        </a>
                        <a href="#">
                            <img class="" src="../imagens/open.png?125594175"   title="Abrir Relatorio" onClick="abrePagina('gerenciamento_relatorios','div_lista_de_layouts_relatorios');"/>
                        </a>
                        <a href="#" id="menu_save_">
                            <img id="menu_save" src="../imagens/save.png?125594175"   title="Salvar Relatorio" onClick="mostraDiv('div_nome_relatorio','','form_nome_relatorio','1','1','0');" />
                        </a>
                        <a href="#">
                            <img id="img_save_as" class="" id="img_save_as" src="../imagens/save_as.png?125594175"    title="Salvar Relatorio Como" onClick="mostraDiv('div_nome_relatorio','','form_nome_relatorio','1','1','1');"  />
                        </a>
                        <a href="#">
                            <img class="" id="img_download" src="../imagens/download_disabled.png?125594175"    title="Download Arquivos"/>
                        </a>
                        <a href="#">
                            <img class="" src="../imagens/exit.png?125594175" title="Sair" onClick="fazLogout();" />
                        </a>
                    </div>
                 </div>
                 
                 <script type="text/javascript">
                    function replace_image_title(object,typeObject)
                    {
                        $(object).find('img').each(function(){
                            if(typeObject=='get'){
                                $(this).attr('title_replace',$(this).attr('title'));
                            }else{
                                $(this).attr('title',$(this).attr('title_replace'));
                             }						 	
                        });
                    }
                    
                    $(function(){
                        var dockOptions =
                            { align: 'bottom' // horizontal menu, with expansion UP from a fixed BOTTOM edge
                            , flow: true,
                            size: 24 ,
                             fadeLayer: 'dock' // fade in the div.jqDock layer
                                , fadeIn: 2000 // fade in over 2 seconds
                              //once div.jqDockWrap exists, append .greyBase...
                            , onReady: function(){ $('.jqDockWrap', this).append($('.greyBase')); }
                            };
                            
                        replace_image_title('#menu_aple','get');
                
                        if(isMobile.any()){
                            //Quando for Ipad
                             $('.menu_aple,.menu_apleDash').css('display','block').addClass('wrs_icon_mini');
                        }else{
                            //Não Ipad
                             // ...and apply...
                              $('#menu_aple').jqDock(dockOptions);
                              setTimeout(function(){replace_image_title('.jqDockItem','replace');},2000);
                        }//END isMobile.any()
                     
                    });
                </script>
            </td>
            <td align="left" id="barra_status_menu"></td>
            <td class="ui-barra-user-panel"  width="460" cl align="right" style="vertical-align:middle">
                <span class="ui-state-active no-border fonte12">MARCELO FACIOLI - MASTER - </span>
                <span class="fonte12" style="font-weight:bold;color:#FFFFFF">GLAXO SMITHKLINE</span>&nbsp;
            </td>
        </tr>
    </table>
</div>