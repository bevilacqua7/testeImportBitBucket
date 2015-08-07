<!-- Modal MODAL CHART CONFIGURE-->
		<div class="modal fade" id="myModalChartConfig" tabindex="-1" role="dialog" aria-labelledby="myModalChartConfigLabel" aria-hidden="true">
			  <div class="modal-dialog">
				    <div class="modal-content">
					      <div class="modal-header ui-accordion-header  ui-accordion-header-active ui-state-active">
					        <h4 class="modal-title modal-chart-header" id="myModalChartConfigLabel"> <?php echo LNG('CHART_CONFIG');?></h4>
					      </div>
					      <div class="modal-body">
					      			<div class="chart-config-body">
					      			<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
										<div class="row">
										  				
										  				<div class="col-md-6 col-xs-12" style="height:440px;">
										  				<table class="table table-condensed">
														      <thead>
														        <tr>
														          <th><?php echo LNG('ATTRIBUTOS_METRICA');?></th>
														          <th><?php echo LNG('ACTION');?></th>
														          <th><?php echo LNG('ACTIVE');?></th>
														        </tr>
														      </thead>
														      <tbody>
														      	<tr>
														      		<td colspan="3" >
														      		<div class="row default_config">
														      				<select class="col-sm-4 wrs-measures multiple" multiple>
																			<option>UNIDADE</option>
																			<option>DOSE</option>
																			</select>
														      		 
														      		<div class="col-sm-3 spance_paddding_top_wrs">
														      			
														      			<button type="button" class="toActive btn btn-block btn-default"><i class="fa fa-angle-right"></i></button>
																		<button type="button" class="toMeasure btn btn-block btn-default"><i class="fa fa-angle-left"></i></button>
																		
																		<button type="button" class="toAllActive btn btn-block btn-info color_write"><i class="fa fa-angle-double-right"></i></button>
																		<button type="button" class="toAllMeasure btn btn-block btn-info color_write"><i class="fa fa-angle-double-left"></i></button>
																	</div>
																	
													  					<select class="col-sm-4 wrs-measures-receive multiple" multiple>
																			<option>DOLAR</option>
																			<option>REAL</option>
																		</select>
																	
																	</div>
																	</td>
																	
																</tr>
																
																<tr><td colspan="3" width="364"><table width="100%">
																
																
																<tr class="wrs-container-legend">
																	<td valign="baseline" colspan="2"  >
																		<label class="">
																			<img src="imagens/chart/legend.png"/> <input type="checkbox" name="LEGEND" id="LEGEND" class="LEGEND_WRS" value="true"> <?php echo LNG('LEGEND');?>
																		</label>
																		
																		<div class="LEGEND_TYPES_WRS">
																		<table class="margin-left">
																			<tr><td>
																					<label class=""><input type="radio" checked="checked"  name="LEGEND" class="legend-types"  value="bottom"> <?php echo LNG('CHART_LEGEND_BOTTOM');?> </label>
																					<label class=""><input type="radio" name="LEGEND" class="legend-types"  value="top"> <?php echo LNG('CHART_LEGEND_TOP');?>  </label><br>
																					<label class=""><input type="radio" name="LEGEND" class="legend-types"  value="left"> <?php echo LNG('CHART_LEGEND_LEFT');?>  </label> 
																					<label class=""><input type="radio" name="LEGEND" class="legend-types"  value="right"> <?php echo LNG('CHART_LEGEND_RIGHT');?>  </label>
																			</td></tr>
																		</table>
																		
																		
																		
																		</div>
																		<!-- END LEGEND_TYPES_WRS -->
																		
																	</td  >
																	<td valign="baseline" colspan="1">
																			<label class=""><input type="checkbox" name="PIE_DONUT_LEGEND" class="legend-types-config"  value="true" > <?php echo LNG('CHART_INSIDE_NOT_LEGEND');?>  </label></td></tr>
																	</td>
																</tr>
																
																
																<tr class="line-total-bubble">
																	<td colspan="2" >
																				<div class="row padding-5">	 <b><?php echo  LNG('LINE_TOTAL_BUBBLE');?></b>
																					
																				<div class="radio bubble-radio">
																			    <label>
																			      <input type="radio" name="line-total-bubble" value="true"> <?php echo LNG('BTN_SIM');?>
																			    </label>
																			     <label>
																			      <input type="radio" checked="checked" value="false"  name="line-total-bubble"> <?php echo LNG('BTN_NAO');?>
																			    </label>
																			  </div>
																				    
																	</td>
																	<td  colspan="1"></td>
																</tr>
																
																<tr class="gauge-container-size-line" >
																	<td colspan="2"   >
																				<div class="row padding-5" style="width:300px;">	 <b><?php echo  LNG('CHART_GAUGE_QUANTIDADE');?></b>
																					
																				<select class="input-slide-md-line col-md-12" ><option>1</option></select>
																				
																				</div>
																				    
																	</td>
																	<td  colspan="1"></td>
																</tr>
																
																<!--  TAG CHART GAUGE -->
																
																<tr class="gauge-container-html">
																	<td colspan="2"  >
																		<!-- CONFIG GAUGE  Template-->
																				<div class="row gauge_configure ">
																					<b><?php echo  LNG('CHART_GAUGE_RANGE');?></b>
																					<div class="layout-slider"></div>
																			   </div><script type="text/javascript">/*WrsGougeConfigure();*/</script>
																			     <!--  END PLUGINS GAUGE Template -->
																		 
																	</td >
																	<td  colspan="1">
																		
																	</td>
																</tr>
																
																<!-- END  -->
																 	
																</table></td></tr>
																 	
													  		</tbody>		 
													</table>		 
												</div>
											  <div class="col-md-6 col-xs-12 modal_chart_body_table"></div>
											  
										</div>
								</div>
					      		
					      </div>
					      <div class="modal-footer">
					      	<div class="btn-group" role="group" aria-label="...">
						        <button type="button" class="toRunConfigChartWrs btn btn-success color_write"> <i class="fa fa-floppy-o"></i> <?php echo LNG('BTN_APPLY');?></button>
						        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-off"></span> <?php echo LNG('BTN_SAIR');?></button>
					        </div>
					      </div>
				    </div>
			  </div>
		</div>
<!--END MODAL CHART CONFIGURE-->