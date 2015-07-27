


<!--  http://demos.telerik.com/kendo-ui/bar-charts/grouped-data  -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css"
	href="api/bootstrap-3.3.0/dist/css/bootstrap.css" />
<!-- Fonte font-awesome-4.3.0 -->
<link href="api/font-awesome-4.3.0/css/font-awesome.min.css?v=0.0.1"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css"
	href="api/bootstrap-3.3.0/dist/css/bootstrap.css" />

<link rel="stylesheet" href="api/KendoUi/styles/kendo.common.min.css" />
<link rel="stylesheet" href="api/KendoUi/styles/kendo.default.min.css" />
<link rel="stylesheet" href="api/KendoUi/styles/kendo.dataviz.min.css" />



<link rel="stylesheet"
	href="api/KendoUi/styles/kendo.dataviz.default.min.css" />
<script src="api/jquery.min.js"></script>
<script src="api/KendoUi/js/kendo.all.min.js"></script>
<script src="api/KendoUi/js/kendo.dataviz.themes.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/wrs_panel.css?873443" />
<!-- BOOT STRAP -->
<script type="text/javascript"
	src="api/bootstrap-3.3.0/js/dropdown.js?446746"></script>

</head><body>
<style>

.k-tooltip{
	text-align: left;
}
 
/*yyktofds@tafmail.com*/

body{
	margin: 20px;
}



.buble-container-chart{
	width: 100%;
	padding:0px;
	padding-left: 30px;
	padding-bottom: 30px;
	border: 1px solid;

}

.buble-container-chart:after, 
.buble-container-chart:before {
	color:#4e4e4e;
	font-size:16px;
	font-family:Arial,Helvetica,sans-serif;
	position: absolute;
}


.buble-container-chart:after {
	content: "Title Baixo";
	text-align: center;
	left: 50%;
}


.buble-container-chart:before{
	content: "Title left";
	left: -10px;
	
	/* Safari */
	-webkit-transform: rotate(-90deg);
	
	/* Firefox */
	-moz-transform: rotate(-90deg);
	
	/* IE */
	-ms-transform: rotate(-90deg);
	
	/* Opera */
	-o-transform: rotate(-90deg);
	
	/* Internet Explorer */
	filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
	
	top: 50%;
	
}


 
</style>
<body>
   
<div id="example">
    <div class="demo-section k-content">
        <div id="chart" class="buble-container-chart">
        <div data-role="footer">
     
        <div data-role="tabstrip" id="myTabStrip">
            <a href="#tabstrip-home" data-icon="recents">Catalog</a>
        </div>
    </div>
        </div>
        
    </div>
    <script>

    	var _DATA	=	{
    	    				"title":
        	    						{
	    									"text":"SETOR x ANO"
		    							},
		    				"legend":
			    						{
	    									"position":"bottom",
	    									"visible":false
	    								},
	    					"dataSource":
		    							{
    										"data":
        												[
         														{
             														"cxField":14.09,
             														"cyField":0,
             														"csizeField":77947,
             														"title":"112202 - GERMANO PENIDO DE CASTRO",
             														"color":"#f44336",
             														"undefined":77947
             													},
             													{
                 													"cxField":14.09,
                 													"cyField":0,
                 													"csizeField":77947,
                 													"title":"112206 - FERNANDA CHRISTINE DUARTE GONCALVES BAPTISTA",
                 													"color":"#E91E63",
                 													"undefined":77947
                 												},{
                     													"cxField":14.09,
                     													"cyField":0,
                     													"csizeField":77947,
                     													"title":"112211 - ALESSANDRO PASCHOAL DOS SANTOS",
                     													"color":"#9C27B0",
                     													"undefined":77947
                     											},{
                         											"cxField":14.09,
                         											"cyField":0,
                         											"csizeField":77947,
                         											"title":"112218 - CHRISTIANO WICHAN DOS SANTOS",
                         											"color":"#673AB7",
                         											"undefined":77947
                         										},{
                             										"cxField":14.09,
                             										"cyField":0,
                             										"csizeField":77947,
                             										"title":"112220 - VINICIUS LIMA DE ALMEIDA SILVA",
                             										"color":"#3F51B5",
                             										"undefined":77947
                             									},{
                                 									"cxField":14.09,
                                 									"cyField":0,
                                 									"csizeField":77947,
                                 									"title":"112221 - FLAVIA FIGUEIREDO DE PAULA",
                                 									"color":"#2196F3",
                                 									"undefined":77947
                                 								},{
                                     								"cxField":14.09,
                                     								"cyField":0,
                                     								"csizeField":77947,
                                     								"title":"112222 - ADRIANA MALTESE",
                                     								"color":"#03A9F4",
                                     								"undefined":77947
                                     							},{
                                         							"cxField":14.09,
                                         							"cyField":0,
                                         							"csizeField":77947,
                                         							"title":"112223 - MICHELLE ALVES GOMES ELOY",
                                         							"color":"#00BCD4",
                                         							"undefined":77947
                                         						},{
                                             						"cxField":32.04,
                                             						"cyField":0,
                                             						"csizeField":50640,
                                             						"title":"112501 - VINICIUS PINTO DE REZENDE",
                                             						"color":"#009688",
                                             						"undefined":50640
                                             					},{
                                                 					"cxField":14.96,
                                                 					"cyField":0,
                                                 					"csizeField":8231,
                                                 					"title":"112502 - ANTONIO FEITOSA DOS SANTOS JUNIOR",
                                                 					"color":"#4CAF50",
                                                 					"undefined":8231
                                                 				},{
                                                     				"cxField":32.04,
                                                     				"cyField":0,
                                                     				"csizeField":50640,
                                                     				"title":"112503 - GISELE URBANO RIOS",
                                                     				"color":"#8BC34A",
                                                     				"undefined":50640
                                                     			},{
                                                         			"cxField":32.04,
                                                         			"cyField":0,
                                                         			"csizeField":50640,
                                                         			"title":"112504 - JORGE EMANUEL SANTOS BORGES",
                                                         			"color":"#CDDC39",
                                                         			"undefined":50640
                                                         		},{
                                                             		"cxField":21.14,
                                                             		"cyField":0,
                                                             		"csizeField":20703,
                                                             		"title":"112505 - CHARLSTON MELO DA CUNHA",
                                                             		"color":"#FFEB3B",
                                                             		"undefined":20703
                                                             	}]},
                                                "series":[
                                                     			{
                                                         			"type":"bubble",
                                                         			"xField":"cxField",
                                                         			"yField":"cyField",
                                                         			"sizeField":"csizeField",
                                                         			"categoryField":"title"
                                                             	}
                                                            ],
                                                "xAxis":{
                                        					"minorGridLines":{"visible":true},
                                        					"majorGridLines":{"visible":true},
                                        					"max":38.04,
                                        					"min":-11.49,
                                        					"plotBands":[],
                                        					"axisCrossingValue":0,
                                        					"color":"#aaa",
                                        					"flag":true
                                        				},
                                        		"yAxis":{
                                            				"plotBands":[],
                                            				"minorGridLines":{"visible":true},
                                            				"majorGridLines":{"visible":true},
                                            				"axisCrossingValue":0,
                                            				"color":"#aaa",
                                            				"max":1,
                                            				"min":-2,
                                            				"flag":true
                                            				},
                                            	"tooltip":{
                                                			"visible":true,
                                                			"format":"{3}: {2:N0} Total",
                                                			"opacity":1
                                                			}
                                                	};


    	_DATA		=	{
    	    				"title":{"text":"SETOR x ANO"},
    	    				"legend":{"position":"bottom","visible":false},
    	    				"dataSource":
        	    							{
    											"data":[
    	    												{
        	    												"cxField":32.1,
        	    												"cyField":0.06,
        	    												"csizeField":229678,
        	    												"title":"112501 - VINICIUS PINTO DE REZENDE",
        	    												"color":"#00BCD4",
        	    												"undefined":229678
        	    											},
        	    											{
            	    											"cxField":32.1,
            	    											"cyField":0.06,
            	    											"csizeField":229678,
            	    											"title":"112503 - GISELE URBANO RIOS",
            	    											"color":"#009688",
            	    											"undefined":229678
            	    										},
            	    										{
                	    										"cxField":32.1,
                	    										"cyField":0.06,
                	    										"csizeField":229678,
                	    										"title":"112504 - JORGE EMANUEL SANTOS BORGES",
                	    										"color":"#4CAF50",
                	    										"undefined":229678
                	    									},{
                    	    									"cxField":24.69,
                    	    									"cyField":2.82,
                    	    									"csizeField":86640,
                    	    									"title":"112508 - ALAN DE OLIVEIRA LOBATO",
                    	    									"color":"#8BC34A",
                    	    									"undefined":86640
                    	    								},{
                        	    								"cxField":20.59,
                        	    								"cyField":-0.54,
                        	    								"csizeField":90329,
                        	    								"title":"112505 - CHARLSTON MELO DA CUNHA",
                        	    								"color":"#CDDC39",
                        	    								"undefined":90329
                        	    							},{
                            	    							"cxField":20.59,
                            	    							"cyField":-0.54,
                            	    							"csizeField":90329,
                            	    							"title":"112506 - RAYANE BEZERRA DA COSTA",
                            	    							"color":"#FFEB3B",
                            	    							"undefined":90329
                            	    						},{
                                	    						"cxField":20.59,
                                	    						"cyField":-0.54,
                                	    						"csizeField":90329,
                                	    						"title":"112507 - FFV BRUNO CABRAL DOS SANTOS",
                                	    						"color":"#FFC107",
                                	    						"undefined":90329
                                	    					},{
                                    	    					"cxField":19.64,
                                    	    					"cyField":-1.78,
                                    	    					"csizeField":15085,
                                    	    					"title":"112510 - CARLOS EDUARDO DA SILVA LOPES",
                                    	    					"color":"#FF9800",
                                    	    					"undefined":15085
                                    	    				},{
                                        	    				"cxField":19.27,
                                        	    				"cyField":4.31,
                                        	    				"csizeField":45730,
                                        	    				"title":"112502 - ANTONIO FEITOSA DOS SANTOS JUNIOR",
                                        	    				"color":"#FF5722",
                                        	    				"undefined":45730
                                        	    			},{
                                            	    			"cxField":31.57,
                                            	    			"cyField":-0.09,
                                            	    			"csizeField":76702,
                                            	    			"title":"112706 - ANDRE GOMES CASTELO BRANCO",
                                            	    			"color":"#9E9E9E",
                                            	    			"undefined":76702
                                            	    		},{
                                                	    		"cxField":25.93,
                                                	    		"cyField":2.1,
                                                	    		"csizeField":170788,
                                                	    		"title":"112707 - ALEXANDRE CABRAL DE ALMEIDA",
                                                	    		"color":"#607D8B",
                                                	    		"undefined":170788
                                                	    	},{
                                                    	    	"cxField":25.93,
                                                    	    	"cyField":2.1,
                                                    	    	"csizeField":170788,
                                                    	    	"title":"112701 - LUCIANA HORTA BARRETO",
                                                    	    	"color":"#ef5350",
                                                    	    	"undefined":170788
                                                    	    },{
                                                        	    "cxField":25.93,
                                                        	    "cyField":2.1,
                                                        	    "csizeField":170788,
                                                        	    "title":"112702 - ISABELLE DE ABREU CAFE CASTRO",
                                                        	    "color":"#EC407A","undefined":170788
                                                        	   }]
                     	  							},
                     	  				"series":[
                               	  					{
                                   	  						"type":"bubble",
                                   	  						"xField":"cxField",
                                   	  						"yField":"cyField",
                                   	  						"sizeField":"csizeField",
                                   	  						"categoryField":"title"
                                       	  			}],
                                       	 "xAxis":{
                                           	 			"minorGridLines":{"visible":true},
                                           	 			"majorGridLines":{"visible":true},
                                           	 			"max":32.1,
                                           	 			"min":10.575,
                                           	 			"plotBands":[
                                                        	 				{
                                                            	 				"from":10.575,"to":-1.000,"color":"#00f","opacity":0.05
                                                            	 			}
                                                            	 	],
                                                        "axisCrossingValue":null,
                                                        "color":"#aaa",
                                                        "flag":true
                                                  },
                                           "yAxis":{
                                               			"plotBands":[{"from":-1.335,"to":null,"color":"#186DEE","opacity":0.05}],
                                               			"minorGridLines":{"visible":true},
                                               			"majorGridLines":{"visible":true},
                                               			"axisCrossingValue":null,
                                               			"color":"#aaa",
                                               			"max":4.31,
                                               			"min":-1.335,
                                               			"flag":true
                                               		},
                                              "tooltip":{"visible":true, "format":"{3}<br> csizeField:<b>{2:N0}</b> <br>cyField:<b>{1}</b> <br> cxField:<b>{0}</b> ","opacity":1}};
/*
    	"cxField":20.59,
		"cyField":-0.54,
		"csizeField":90329,
		"title":"112507 - BRUNO CABRAL DOS SANTOS",
		"color":"#FFC107",
		"undefined":90329
		*/
//Values #=data.view().min=# to #=data.view().max=#
    	var s_DATA	=	{
                title: {
                    text: "Job Growth for 2011"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bubble"
                },
                series: [{
                    data: [{
                        x: -2500,
                        y: 50000,
                        size: 500000,
                        category: "Microsoft"
                    }, {
                        x: 500,
                        y: 110000,
                        size: 7600000,
                        category: "Starbucks"
                    }, {
                        x: 7000,
                        y: 19000,
                        size: 700000,
                        category: "Google"
                    }, {
                        x: 1400,
                        y: 150000,
                        size: 700000,
                        category: "Publix Super Markets"
                    }, {
                        x: 2400,
                        y: 30000,
                        size: 300000,
                        category: "PricewaterhouseCoopers"
                    }, {
                        x: 2450,
                        y: 34000,
                        size: 90000,
                        category: "Cisco"
                    }, {
                        x: 2700,
                        y: 34000,
                        size: 400000,
                        category: "Accenture"
                    }, {
                        x: 2900,
                        y: 40000,
                        size: 450000,
                        category: "Deloitte"
                    }, {
                        x: 3000,
                        y: 55000,
                        size: 900000,
                        category: "Whole Foods Market"
                    }]
                }],
                xAxis: {
                    labels: {
                        format: "{0:N0}",
                        skip: 1,
                        rotation: "auto"
                    },
                    axisCrossingValue: -5000,
                    majorUnit: 2000,
                    plotBands: [{
                        from: -5000,
                        to: 0,
                        color: "#00f",
                        opacity: 0.05
                    }]
                },
                yAxis: {
                    labels: {
                        format: "{0:N0}"
                    },
                    line: {
                        width: 0
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{3}: {2:N0} applications",
                    opacity: 1
                }
            };
        function createChart() {
            $("#chart").kendoChart(_DATA);

            

            
            }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
    </script>
    <style>
        .demo-section {
            position: relative;
        }

        .demo-section ul {
            font-size: 11px;
            margin: 63px 30px 0 0;
            padding: 30px;
            position: absolute;
            right: 0;
            top: 0;
            text-transform: uppercase;
            width: 146px;
            height: 94px;
        }
    </style>
</div>


</body>
</html>
