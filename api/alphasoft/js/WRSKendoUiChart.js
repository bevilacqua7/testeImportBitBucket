 
(function ($) {

    window.addRule = function (selector, styles, sheet) {

        styles = (function (styles) {
            if (typeof styles === "string") return styles;
            var clone = "";
            for (var p in styles) {
                if (styles.hasOwnProperty(p)) {
                    var val = styles[p];
                    p = p.replace(/([A-Z])/g, "-$1").toLowerCase(); // convert to dash-case
                    clone += p + ":" + (p === "content" ? '"' + val + '"' : val) + "; ";
                }
            }
            return clone;
        }(styles));
        sheet = sheet || document.styleSheets[document.styleSheets.length - 1];

        if (sheet.insertRule) sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
        else if (sheet.addRule) sheet.addRule(selector, styles);

        return this;

    };

    if ($) $.fn.addRule = function (styles, sheet){
        addRule(this.selector, styles, sheet);
        return this;
    };
    
    
    
    
    
    
    
    
    
}(window.jQuery));




 										
/**
 *  Iniciando a criação do Plugin
 *  
 *  http://demos.telerik.com/kendo-ui/bar-charts/grouped-data
 *  http://docs.telerik.com/kendo-ui/api/jsp/chart/seriesdefaults#configuration-attributes
 *  http://demos.telerik.com/kendo-ui/bar-charts/multiple-axes
 *  http://docs.telerik.com/kendo-ui/using-kendo-in-responsive-web-pages
 *  http://www.telerik.com/forums/auto-resize-charts-on-responsive-web-design-
 *  
 *  http://docs.telerik.com/kendo-ui/dataviz/chart/tooltip
 *  
 *  http://demos.telerik.com/kendo-ui/chart-api/export
 *  
 *  LEGENDAS
 *  http://docs.telerik.com/devtools/silverlight/controls/radchart/features/chart-legend
 *  
 *  http://www.telerik.com/help/winforms/chartview-series-types-donut.html
 *  
 *  
 *  Não suportados multiplos
 *  http://www.telerik.com/forums/pie-charts-with-multiple-series
 *  
 *  
 *  TYpe legende PIE DONUT
 *  http://demos.telerik.com/aspnet-ajax/htmlchart/examples/charttypes/piechart/defaultcs.aspx
 *  
 *  Examples Chart to configures 
 *  http://demos.telerik.com/aspnet-ajax/htmlchart/examples/charttypes/piechart/defaultcs.aspx
 *  
 *  
 *  DOcumentation
 *  http://docs.telerik.com/kendo-ui/introduction
 *  
 *  
 *  CUstom Colors Charts
 *  http://docs.telerik.com/kendo-ui/dataviz/chart/how-to/customize-chart-theme
 *  
 *  
 *  Build Theme
 *  http://demos.telerik.com/kendo-ui/themebuilder/
 *  
 *  
 *  Change theme on chart
 *  http://docs.telerik.com/kendo-ui/dataviz/appearance-styling
 *  
 *  
 *  
 *  Tratar erro no javascript
 *  http://www.w3schools.com/js/js_errors.asp
 *  
 *  
 *  FORMATANDO VALOR NO CHART
 *  http://www.telerik.com/forums/format-numbers-as-1-2m-instead-of-full-number
 *  
 *  Buble
 *  http://www.telerik.com/help/windows-8-html/chart-bubble-series.html
 *  
 */ 

/*
 * Configurando o Thema
 */
var CHART_THEME		=	"office365";

var chart_multiples			=	['pie','donut','bubblex','bubbley','bubble_total','gauge_radial','gauge_linear'];
var chart_radar_polar		=	['radarLine','radarArea','radarColumn'];
var chart_bubble			=	['bubbley'	,'bubblex','bubble_total'];
var category_remove			=	['TOTAL'];
var palletColorGauge		=	['#F39C11','#39CAC7','#C23A2C','#BFC2C7','#D15201','#002F89','#0071CF','#8F9D9E','#B2BCB9','#0BB9B7','#7E8C8D','#9AECEA','#C9FBFA','#6CE600','#479400','#69AD2B','#91F03B','#ABF16C','#353D01','#615C00','#63710F','#DEBF4B'];
var GRID_TMP				=	'';

var palletCol				=	["#f44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#ef5350","#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#29B6F6","#26C6DA","#26A69A","#66BB6A","#9CCC65","#D4E157","#FFEE58","#FFCA28","#FFA726","#FF7043","#8D6E63","#BDBDBD","#78909C","#f44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#e53935","#D81B60","#8E24AA","#5E35B1","#3949AB","#1E88E5","#039BE5","#00ACC1","#00897B","#43A047","#7CB342","#C0CA33","#FDD835","#FFB300","#FB8C00","#F4511E","#6D4C41","#757575","#546E7A","#d32f2f","#C2185B","#7B1FA2","#512DA8","#303F9F","#1976D2","#0288D1","#0097A7","#00796B","#388E3C","#689F38","#AFB42B","#FBC02D","#FFA000","#F57C00","#E64A19","#5D4037","#616161","#455A64","#c62828","#AD1457","#6A1B9A","#4527A0","#283593","#1565C0","#0277BD","#00838F","#00695C","#2E7D32","#558B2F","#9E9D24","#F9A825","#FF8F00","#EF6C00","#D84315","#4E342E","#424242","#37474F","#b71c1c","#880E4F","#4A148C","#311B92","#1A237E","#0D47A1","#01579B","#006064","#004D40","#1B5E20","#33691E","#827717","#F57F17","#FF6F00","#E65100","#BF360C","#3E2723","#212121","#263238","#ff5252","#FF4081","#E040FB","#7C4DFF","#536DFE","#448AFF","#40C4FF","#18FFFF","#64FFDA","#69F0AE","#B2FF59","#EEFF41","#FFFF00","#FFD740","#FFAB40","#FF6E40","#ff1744","#F50057","#D500F9","#651FFF","#3D5AFE","#2979FF","#00B0FF","#00E5FF","#1DE9B6","#00E676","#76FF03","#C6FF00","#FFEA00","#FFC400","#FF9100","#FF3D00","#d50000","#C51162","#AA00FF","#6200EA","#304FFE","#2962FF","#0091EA","#00B8D4","#00BFA5","#00C853","#64DD17","#AEEA00","#FFD600","#FFAB00","#FF6D00","#DD2C00",'#140007','#29000e','#3d0014','#52001b','#660022','#7a0029','#8f0030','#a30036','#b8003d','#cc0044','#e0004b','#f50052','#130014','#250029','#38003d','#4b0052','#5d0066','#70007a','#83008f','#9600a3','#a800b8','#bb00cc','#0b0014','#150029','#20003d','#2a0052','#350066','#3f007a','#4a008f','#5400a3','#5f00b8','#6900cc','#7400e0','#7e00f5','#010014','#030029','#04003d','#050052','#070066','#08007a','#0a008f','#0b00a3','#0c00b8','#0e00cc','#0f00e0','#000c14','#001829','#00253d','#003152','#003d66','#00497a','#00568f','#0062a3','#006eb8','#007acc','#0087e0','#0093f5','#0a9dff','#001114','#002329','#00343d','#004552','#005766','#00687a','#00798f','#008ba3','#009cb8','#00adcc','#00bfe0','#00140f','#00291d','#003d2c','#00523a','#006649','#007a58','#008f66','#00a375','#00b884','#00cc92','#00e0a1','#001407','#00290e','#003d15','#00521d','#006624','#007a2b','#008f32','#00a339','#00b840','#00cc47','#00e04f','#00f556','#011400','#022900','#033d00','#045200','#056600','#067a00','#078f00','#08a300','#09b800','#0acc00','#0be000','#0a1400','#142900','#1e3d00','#275200','#316600','#3b7a00','#458f00','#4fa300','#59b800','#63cc00','#6ce000','#0e1400','#1c2900','#2a3d00','#385200','#466600','#547a00','#628f00','#70a300','#7db800','#8bcc00','#99e000','#a7f500','#b1ff0a','#101400','#212900','#313d00','#415200','#526600','#627a00','#728f00','#83a300','#93b800','#141400','#272900','#3b3d00','#4f5200','#636600','#767a00','#8a8f00','#9ea300','#b1b800','#c5cc00','#d9e000','#140f00','#291f00','#3d2e00','#523d00','#664d00','#7a5c00','#8f6b00','#a37a00','#b88a00','#cc9900','#e0a800','#140900','#291200','#3d1b00','#522300','#662c00','#7a3500','#8f3e00','#a34700','#b85000','#cc5800','#e06100','#140500','#290a00','#3d0e00','#521300','#661800','#7a1d00','#8f2100','#a32600','#b82b00','#cc3000','#e03400','#130203','#250305','#380508','#4b070a','#5d090d','#700a0f','#830c12','#950e15','#a81017','#bb111a','#cd131c','#e0151f','#ea1f29','#13020b','#250316','#380520','#4b072b','#5d0936','#700a41','#830c4b','#950e56','#a81061','#bb116c','#cd1376','#e01581','#ea1f8b','#eb2c92','#ee449f','#100213','#210325','#310538','#42074b','#52095d','#620a70','#730c83','#830e95','#9410a8','#a411bb','#b413cd','#c515e0','#cf1fea','#d22ceb','#0b0213','#160325','#210538','#2c074b','#37095d','#420a70','#4d0c83','#580e95','#6310a8','#6e11bb','#7a13cd','#8515e0','#8f1fea','#952ceb','#a144ee','#ab57ef','#b46af1','#040213','#090325','#0d0538','#11074b','#15095d','#1a0a70','#1e0c83','#220e95','#2610a8','#2b11bb','#2f13cd','#3315e0','#3d1fea','#492ceb','#5e44ee','#6e57ef','#7e6af1','#020a13','#031425','#051e38','#07284b','#09325d','#0a3c70','#0c4583','#0e4f95','#1059a8','#1163bb','#136dcd','#1577e0','#1f81ea','#2c88eb','#4496ee','#57a1ef','#6aabf1','#021213','#032325','#053538','#07464b','#09585d','#0a6970','#0c7b83','#0e8c95','#109ea8','#11afbb','#13c1cd','#15d2e0','#1fddea','#2cdeeb','#44e2ee','#02130e','#03251c','#05382a','#074b37','#095d45','#0a7053','#0c8361','#0e956f','#10a87d','#11bb8b','#13cd99','#15e0a6','#1feab1','#2cebb5','#44eebe','#021307','#03250e','#053815','#074b1c','#095d23','#0a702b','#0c8332','#0e9539','#10a840','#11bb47','#13cd4e','#15e055','#1fea5f','#2ceb69','#44ee7a','#041302','#082503','#0c3805','#104b07','#145d09','#18700a','#1c830c','#20950e','#24a810','#28bb11','#2ccd13','#30e015','#3aea1f','#46eb2c','#0c1302','#182503','#243805','#304b07','#3b5d09','#47700a','#53830c','#5f950e','#6ba810','#77bb11','#83cd13','#8fe015','#99ea1f','#121302','#242503','#363805','#484b07','#5b5d09','#6d700a','#7f830c','#91950e','#a3a810','#b5bb11','#c7cd13','#d9e015','#e3ea1f','#130c02','#251903','#382505','#4b3207','#5d3e09','#704b0a','#83570c','#95640e','#a87010','#bb7d11','#cd8913','#e09515','#eaa01f','#130802','#250f03','#381705','#4b1f07','#5d2609','#702e0a','#83360c','#953d0e','#a84510','#bb4d11','#cd5413','#e05c15','#ea661f','#130402','#250903','#380d05','#4b1107','#5d1509','#701a0a','#831e0c','#95220e','#a82610','#bb2b11','#cd2f13','#e03315','#ea3d1f','#0e0707','#1c0d0d','#2a1414','#371a1a','#452121','#532727','#612e2e','#6f3434','#7d3b3b','#8b4141','#994848','#a64e4e','#b15959','#0e0709','#1c0d12','#2a141b','#371a24','#45212d','#532736','#612e3f','#6f3448','#7d3b51','#8b415a','#994863','#a64e6c','#b15976','#b76681','#be748d','#c7879c','#0e070c','#1c0d18','#2a1424','#371a31','#45213d','#532749','#612e55','#6f3461','#7d3b6d','#8b417a','#994886','#a64e92','#b1599c','#b766a4','#be74ad','#c787b8','#0d070e','#1a0d1c','#27142a','#341a37','#402145','#4d2753','#5a2e61','#67346f','#743b7d','#81418b','#8e4899','#9b4ea6','#a559b1','#ac66b7','#b474be','#08070e','#110d1c','#19142a','#221a37','#2a2145','#332753','#3b2e61','#44346f','#4c3b7d','#55418b','#5d4899','#664ea6','#7059b1','#7c66b7','#8874be','#9887c7','#07090e','#0d121c','#141c2a','#1a2537','#212e45','#273753','#2e4161','#344a6f','#3b537d','#415c8b','#486599','#4e6fa6','#5979b1','#6684b7','#748fbe','#879ec7','#070d0e','#0d1b1c','#14282a','#1a3637','#214345','#275053','#2e5e61','#346b6f','#3b787d','#41868b','#489399','#4ea1a6','#59abb1','#66b2b7','#74b9be','#87c3c7','#070e0a','#0d1c15','#142a1f','#1a3729','#214534','#27533e','#2e6148','#346f53','#3b7d5d','#418b67','#489972','#4ea67c','#59b186','#66b790','#74be9a','#87c7a8','#90cbae','#9ed1b8','#080e07','#101c0d','#182a14','#20371a','#284521','#305327','#38612e','#406f34','#487d3b','#508b41','#589948','#60a64e','#6ab159','#77b766','#83be74','#94c787','#0b0e07','#151c0d','#202a14','#2b371a','#354521','#405327','#4b612e','#566f34','#607d3b','#6b8b41','#769948','#80a64e','#8ab159','#94b766','#9ebe74','#abc787','#b1cb90','#0e0d07','#1c1b0d','#2a2814','#37351a','#454221','#535027','#615d2e','#6f6a34','#7d773b','#8b8541','#999248','#a69f4e','#b1a959','#b7b066','#beb874','#c7c287','#0e0a07','#1c130d','#2a1d14','#37271a','#453121','#533a27','#61442e','#6f4e34','#7d573b','#8b6141','#996b48','#a6754e','#b17f59','#b78966','#be9474','#0e0807','#1c0f0d','#2a1714','#371f1a','#452621','#532e27','#61352e','#6f3d34','#7d453b','#8b4c41','#995448','#a65c4e','#b16659','#0e0707','#1c0d0d','#2a1414','#371a1a','#452121','#532727','#612e2e','#6f3434','#7d3b3b','#874040','#994848','#a64e4e','#b15959','#0e070b','#1c0d16','#291421','#371b2c','#452137','#532841','#602e4c','#6e3557','#7c3c62','#854069','#974978','#a55083','#af5a8d','#0d070e','#1a0d1b','#271429','#341b37','#412244','#4f2852','#5c2f60','#69366d','#763d7b','#7f4185','#904a96','#0a070e','#140d1b','#1e1429','#281b37','#322244','#3c2852','#462f60','#50366d','#5a3d7b','#614185','#6e4a96','#7851a4','#825bae','#07070e','#0d0d1b','#141429','#1b1b37','#222244','#282852','#2f2f60','#36366d','#3d3d7b','#414185','#070a0e','#0d131b','#141d29','#1b2637','#223044','#283952','#2f4360','#364c6d','#3d567b','#415c85','#4a6996','#5172a4','#070d0e','#0d191b','#142629','#1b3337','#223f44','#284c52','#2f5860','#36656d','#3d727b','#417b85','#4a8b96','#5198a4','#5ba2ae','#070e0c','#0d1b17','#142923','#1b372f','#22443b','#285246','#2f6052','#366d5e','#3d7b69','#418572','#4a9681','#51a48c','#5bae97','#69b59f','#070e0a','#0d1b13','#14291d','#1b3727','#224431','#28523a','#2f6044','#366d4e','#3d7b58','#41855f','#4a966b','#51a475','#5bae7f','#69b58a','#76bc94','#84c29f','#070e07','#0d1b0e','#142916','#1b371d','#224424','#28522b','#2f6032','#366d3a','#3d7b41','#418546','#4a964f','#51a456','#5bae61','#69b56e','#76bc7b','#090e07','#131b0d','#1c2914','#25371b','#2e4422','#385228','#41602f','#4a6d36','#537b3d','#5a8541','#66964a','#6fa451','#7aae5b','#0d0e07','#1b1b0d','#282914','#36371b','#434422','#515228','#5e602f','#6b6d36','#797b3d','#838541','#94964a','#a1a451','#0e0b07','#1b160d','#292114','#372c1b','#443822','#524328','#604e2f','#6d5936','#7b643d','#856c41','#967a4a','#a48551','#ae905b','#b59969','#100404','#200909','#300d0d','#401212','#501616','#5c1919','#701f1f','#802323','#902727','#a02c2c','#b03030','#c03535','#ca3f3f','#100404','#200909','#300d0d','#401212','#501616','#5c1919','#701f1f','#802323','#902727','#a02c2c','#b03030','#c03535','#ca3f3f','#0e0510','#1c0920','#2a0e2f','#38123f','#46174f','#511b5c','#62206f','#70257e','#7d298e','#8b2e9e','#9932ae','#a737be','#b141c8','#090510','#120920','#1b0e2f','#24123f','#2d174f','#351b5c','#40206f','#49257e','#52298e','#5b2e9e','#6432ae','#6d37be','#7741c8','#050710','#090e20','#0e152f','#121b3f','#17224f','#1b285c','#20306f','#25377e','#293e8e','#2e449e','#324bae','#3752be','#415cc8','#050f10','#091d20','#0e2c2f','#123a3f','#17494f','#1b545c','#20666f','#25747e','#29838e','#2e919e','#32a0ae','#37aebe','#41b8c8','#050f10','#091d20','#0e2c2f','#123a3f','#17494f','#1b545c','#20666f','#25747e','#29838e','#2e919e','#32a0ae','#37aebe','#41b8c8','#05100a','#092015','#0e2f1f','#123f2a','#174f34','#1b5c3d','#206f49','#257e53','#298e5d','#2e9e68','#32ae72','#37be7d','#41c887','#051009','#092012','#0e2f1b','#123f24','#174f2d','#1b5c35','#206f40','#257e49','#298e52','#2e9e5b','#32ae64','#061005','#0b2009','#112f0e','#173f12','#1d4f17','#215c1b','#286f20','#2e7e25','#338e29','#399e2e','#3fae32','#45be37','#4fc841','#081005','#112009','#192f0e','#213f12','#2a4f17','#315c1b','#3a6f20','#437e25','#4b8e29','#539e2e','#5cae32','#64be37','#6ec841','#081005','#112009','#192f0e','#213f12','#2a4f17','#315c1b','#3a6f20','#437e25','#4b8e29','#539e2e','#5cae32','#64be37','#6ec841','#0a1005','#142009','#1f2f0e','#293f12','#334f17','#3b5c1b','#476f20','#527e25','#5c8e29','#669e2e','#70ae32','#7abe37','#85c841','#0f1005','#1e2009','#2d2f0e','#3c3f12','#4b4f17','#585c1b','#696f20','#787e25','#888e29','#979e2e','#a6ae32','#b5be37','#bfc841','#100805','#201009','#2f180e','#3f2112','#4f2917','#5c301b','#6f3920','#7e4125','#8e4929','#9e512e','#ae5a32','#120309','#230611','#35081a','#470b23','#580e2c','#6a1134','#7c133d','#8d1646','#9f194e','#b01c57','#c21e60','#d42169','#de2b73','#100312','#210623','#310935','#410b46','#520e58','#621169','#72147b','#83178c','#931a9e','#a31daf','#b41fc1','#100312','#210623','#310935','#410b46','#520e58','#621169','#72147b','#83178c','#931a9e','#a31daf','#b41fc1','#030a12','#061423','#091e35','#0b2846','#0e3258','#113c69','#14467b','#17508c','#1a5a9e','#1d64af','#1f6ec1','#2277d3','#2c82dd'];

var sameFamily				=	['line','line_smooth','column','column_stack','column_stack_100','bar','bar_stack','bar_stack_100','area','area_stack','area_stack_100'];


function FormatLongNumber(value)
{
	  	var _data	=	Number(value);
	  	
	  	if(_data>-1000 && _data <1000) return _data;
	  	
	  	return sumarizaValor(Number(_data));
}




function exceptionChartResize()
{
	var charts	=	 array_join(chart_multiples,chart_radar_polar);
		charts	=	 array_join(charts,chart_bubble);
	return charts;
}


/*
 * START SLIDE
 */


function sliderOnChange(e) {
	wrsKendoUiChange('#'+GRID_TMP,'GAUGE_COLOR',e.value);
}

function getMeasuteChartUse(telerikGrid,frozenSize)
{
	var _columns		=	[];
	for(var i=(frozenSize+1) ; i<telerikGrid.columns.length;i++){
		_columns[telerikGrid.columns[i].LEVEL_FULL]	=	telerikGrid.columns[i].field
	}
	return _columns;
}


  //GRID
/*
 * @Link http://docs.telerik.com/kendo-ui/api/javascript/ui/slider
 */  
/*
 * Segue os modelos do Bootstrap
 * col-md-4
 */


function WrsGougeConfigureLineShow(_GRID,kendoUiTools)
{
	GRID_TMP	=	_GRID;

	//Segue o modelo do Bootstrap col-md-4
	var options	=	{'6':2,'4':3,'3':4,'2':6,'1':12};
	
	/*// atualizacao do tipo de elemento (de select pra radio) a pedido do facioli
	  // felipebevi 201508071340
	var _input	=	$('.gauge-container-size-line').find('.input-slide-md-line');
	
	_input.html('');
	setOption(_input,options,options[kendoUiTools.GAUGE_SIZE_BY_LINE]);
	
	//CHANGE
	_input.unbind('change').change(function(){
		var _value	=	$(this).parent().find('option:selected').val();
		wrsKendoUiChange('#'+GRID_TMP,'GAUGE_SIZE_BY_LINE',_value);
	});
	*/

	var _input_radio	=	$('.gauge-container-size-line').find('.input-slide-md-line-radio');

	_input_radio.html('');
	setOptionRadio(_input_radio,options,options[kendoUiTools.GAUGE_SIZE_BY_LINE]);
	
	//CHANGE
	_input_radio.unbind('change').change(function(){
		var _value	=	$('input:checked', '.input-slide-md-line-radio').val();
		wrsKendoUiChange('#'+GRID_TMP,'GAUGE_SIZE_BY_LINE',_value);
	});
	
}

/*
 * Buble SHOW CHART
 */
function showLineTOTAL(_GRID,kendoUiTools,_start)
{
	GRID_TMP	=	_GRID;
	
	var _flag	=	kendoUiTools.SHOW_LINE_TOTAL;
		_flag	=	empty(_flag) ? 'false' : _flag;
		
		$('.line-total-bubble').find('input[value='+_flag+']').attr('checked','checked');

		$('.line-total-bubble input').unbind('click').click(function(){
			
			kendoUiTools.SHOW_LINE_TOTAL	=	 $(this).val();
			wrsKendoUiChange('#'+GRID_TMP,'SHOW_LINE_TOTAL',$(this).val());
		});
		
}


function WrsGougeConfigure(_GRID,kendoUiTools,typeGauge)
{
	
	var _slide		=	$(".gauge_configure .layout-slider");
		_slide.html('<input class="input_slide" type="slider" name="price" value="1" />');
		
		GRID_TMP	=	_GRID;

	var _input		=	$(".gauge_configure .layout-slider .input_slide");
	
	
	var slider = _input.kendoSlider({
	
//         increaseButtonTitle: "Right",
  //       decreaseButtonTitle: "Left",
         min: 2,
         max: 5,
         smallStep: 1,
         largeStep: 1,
         isEnabled: true,
         isVisible: true,
         change: sliderOnChange,
         theme:'office365',
         value : kendoUiTools.GAUGE_COLOR
     }).data("kendoSlider");
	
}


function getFisrtChartValue(ChartDefault)
{
		if(empty(ChartDefault) || !ChartDefault) return '';
		if(empty(ChartDefault.data)) return '';

	var _data		=	 ChartDefault.data;
	var _line_name	=	'';
	
		for(lineData in _data)	_line_name=lineData;
		
	return _data[_line_name].value;
}
/*
 * END SLIDE
*/

function	WRSKendoUiChart(KendoUi,_onlyDefault,_start_modal) 
	    {	
		
			var onlyDefault		=	empty(_onlyDefault) ? false : _onlyDefault; //Apenas quando for configurações Default
			var idName			=	KendoUi.element.attr('id');
			var GRID			=	$('#'+idName);
			var telerikGrid 	= 	GRID.data('kendoGrid');		
			var NAV				=	$('#'+idName+'NAV');
			var ELEMENT			=	$('#'+idName+'Elements');
			var kendoChart		=	$('#'+idName+'Elements .chart');
			var kendoChartTAG	=	'#'+idName+'Elements .chart';
			var BOX				=	$('.'+idName+'BOX');
			var headerIndex		=	telerikGrid.headerIndex;
			var kendoUiTools	=	getElementsWrsKendoUi(GRID);
			
			var ChartDefault				=	$.parseJSON(base64_decode(kendoUiTools.CHART)); 
			var DRILL_HIERARQUIA_LINHA		=	kendoUiTools.DRILL_HIERARQUIA_LINHA;
			
			var DRILL_COLUMN_TITLE		=	'';
			var DRILL_FROZEN			=	'';
			
			//Apenas garante que exista o drill Nullo
			try{
			
					if(DRILL_HIERARQUIA_LINHA==_TRUE)
						{
							var title_line		=	0;
		
							
							if(telerikGrid.dataSource._wrs_request_data.drill!='')
							{
								title_line	=	telerikGrid.dataSource._wrs_request_data.drill.OPENCOLS;
							}
							DRILL_FROZEN		=	title_line+1;
							DRILL_COLUMN_TITLE	=	telerikGrid.wrsKendoUi.WRS_ROWS[title_line]
						
						
						}
			}catch(e){}
			
			
			
			var typeChart		=	[];
						
			var _data			=	telerikGrid._data;
			var _data_wrs		=	telerikGrid._wrs_data;
			var maps			=	[];
			var chartData		=	headerIndex['chart']['data'];
			var tmpCustomer		=	chartData;//Para executar a customização do usuário
			var chartTitles		=	headerIndex['chart']['measure_title'];
			var paramChart		=	[];
			var columnToLabel	=	'';
			var titleFrozen		=	'';
			var ChartTitle		=	[];
			var legendChart		=	[];
			var ActiveDefaultTag=	'input.line';
			var ActiveDefault	=	'line';
			var tmpTotalLine	=	[];
			
			
			var gaugeOptions	=	{data: [],min:0,max:0};
			

			
			kendoChart.show();

			var typeGauge		=	{
										linear	:	false,
										radial	:	false,
										active	:	false
									};
			
			
			
			
			
			//kendoChart.height(ELEMENT.attr('height-chart'));
			//Column Frozen para totais	
			var _colum_frozen	=	parseInt($(GRID).find('.k-grid-content-locked').find('tr:last-child').find('td').length)-1;
				
			
			try{
			//Verificando se é DRILL LINHA para modificar as linhas de totais
				if(DRILL_HIERARQUIA_LINHA==_TRUE)
				{
				 	_colum_frozen	=	1;
					if(telerikGrid.dataSource._wrs_request_data.drill!='')
					{
						_colum_frozen	=	telerikGrid.dataSource._wrs_request_data.drill.OPENCOLS+1
					}
					
				}
			}catch(e){}
			
			
			if(empty(kendoUiTools.GAUGE_COLOR)){
				kendoUiTools.GAUGE_COLOR	=	5;
				wrsKendoUiChange('#'+idName,'GAUGE_COLOR',kendoUiTools.GAUGE_COLOR);
			}
			
			if(empty(kendoUiTools.GAUGE_SIZE_BY_LINE)){
				kendoUiTools.GAUGE_SIZE_BY_LINE	=	3;
				wrsKendoUiChange('#'+idName,'GAUGE_SIZE_BY_LINE',kendoUiTools.GAUGE_SIZE_BY_LINE);
			}
			
			
			/*
			 * Valida as opções de select
			 */
			var measure_option_check_family		=	 function(measures_receive,value,event)
			{
					var	inputs		=	[];
					var select_all	=	false;
				
						switch(value)
						{
							case 'gauge_radial':
							case 'gauge_linear':{measures_receive.find('option').prop('selected',true); return true;}; break;
						}
						
					
						event.parent().parent().find('input').each(function(){
							inputs[inputs.length]	=	$(this).attr('value');
						});
						
						//Permite juntar mais de um tipo de estrutura
						if(exist_in_array(sameFamily,value))
						{
							inputs	=	array_join(inputs,sameFamily);
						}
						
						
						
						measures_receive.find('option').each(function(){
							
							var index_value	=	$(this).attr('index-value');
								
								if(empty(index_value)) {
									measures_receive.find('option').prop('selected',true);
									measures_receive.attr('selected-all',true);
								}else{
									if(!exist_in_array(inputs,index_value))
									{
										select_all	=	true;
									}
								}
							
						});
						
						
						if(select_all)
							{
								measures_receive.find('option').prop('selected',true);
								measures_receive.attr('selected-all',true);
							}
				
			}
			
			
			
			/*
			 * Apenas permite as colunas que realmente foram selecionadas
			 */
			var checkGaugeData	=	 function(data)
			{
				
				var _data		=	[];
				var _tmp_data	=	data;
				var _level_full	=	 [];
				
				//Verifica se foi enviado opções para a seleção de colunas
				if(!empty(ChartDefault))
				{
					var _data_full	=	ChartDefault.data;
					for(lineFull in _data_full)	_level_full[_level_full.length]	=	lineFull;
					
					for(_line_data_g in data)
						{
							
								var _data_column	= 	data[_line_data_g];
								var _column_line	=	[];
							
								for(_data_column_line in _data_column)
									{
										var _name_column	=	headerIndex.field[_data_column[_data_column_line]].LEVEL_FULL;
										
										if(exist_in_array(_level_full,_name_column))
										{
											_column_line[_column_line.length]	=	_data_column[_data_column_line];
										}
										
									}
								_data[_line_data_g]=_column_line;
						}
					
					return _data;
				}
				
				return data;
			}
			/*
			 * Usado para calcular o centro de corte do gráfico de Bolhas
			 */
			var calcMaxMin		=	 function(axis)
			{
					
						var _axis 	= axis;
						var _min 	= axis.min - axis.min * 0.25;
						var _max 	= axis.max + axis.max * 0.25;
						var _cross 	= axis.axisCrossingValue;
	
						
						_min = _cross < _min  ?  (_cross - _cross * 0.25) :  (_min) ;
						_max = _cross > _max ?  (_cross + _cross * 0.25) : (_max);
						
						
						
		
						if( Math.abs(_min - _cross) < Math.abs(_max - _cross) ) {
						 _min = _min - (Math.abs(_max - _cross) - Math.abs(_min - _cross));
						}
						else{
							_max = _max + (Math.abs(_min - _cross) - Math.abs(_max - _cross));
						 
						}
		
						_axis.min = _min;
						_axis.max = _max;
				
				
					    if(_axis.plotBands.length >=1){
							_axis.plotBands[0].to			=	_axis.axisCrossingValue;
							_axis.plotBands[0].from			=	_axis.min;
					    }
					    
					    

						return _axis;
					
			}
			
			
			var getColumnsTochart	=	 function(columns)
			{
				var tmpVal		=	[];
				var levelFull	=	'';
				var back		=	[];
				for(lineCol in columns)
					{
						levelFull				=	columns[lineCol].LEVEL_FULL;
						tmpVal[tmpVal.length]	=	columns[lineCol].field;
					}
				
				back[levelFull]=tmpVal;
				
				return back;
			}
			
			var LABEL_FORMAT	=	" FormatLongNumber(value) ";
			
			
				if(!kendoUiTools.SUMARIZA)	LABEL_FORMAT = " value ";
			

			
			var setInfoTotalColumn	=	 function(column,value,arrayDirecty)
			{
					var totalBubble	=		[];
						if(empty(arrayDirecty))
						{
							totalBubble			=		$.parseJSON(base64_decode(GRID.attr('total-bubble')));
							totalBubble[column]	=	value;
						}else{
							totalBubble			=	{};
							totalBubble			=	column;
						}
						GRID.attr('total-bubble',base64_encode(json_encode(totalBubble,true)));
			};
			
			var _convertNumber		=	 function(data){
				
				var _data	=	str_replace(['.','%'],'',data);
					_data	=	str_replace(',','.',_data);
					
				return Number(_data)	;
			}
			
			
			var getInfoTotalColumn	=	 function(column,check)
			{
					var totalGrid			=		GRID.attr('total-bubble');
					var totalBubble			=		$.parseJSON(base64_decode(totalGrid));
						
					if(!empty(check))
						{
							if(empty(totalGrid)) return false;
							
							return true;
						}
					
					
					if(column=='All') return totalBubble;
					
					try {
						return totalBubble[column];
					}catch(e) {
						return '';
					}
						return '';
					
			};
			
			
			
			var ChartDefaultOnject	=	{
											data  	:	'', /* contem o json da estrutura selecionada quando não existe pega a primeira
																type || column
																value || column
																title || Nornal
																stack || false
																			*/
											legend 	:	{position : '', visible : false},
											labels 	:	{position : 'OutsideEnd', visible : false}
										};
			
			ChartDefault		=	$.extend( {}, ChartDefaultOnject, ChartDefault );

			
			
			
			//Flag para saber quando se está usando algumas das opções de DONUT , PIE , RADAR ou Polar
			var pie_donut			=	false;
			var radar_polar			=	false;
			var bubble				=	false;
			/*
			 * Join multiples
			 */
			var merge_unic_multiple	=	 function()
			{
				return array_join( chart_multiples, chart_radar_polar );
			}
			
			var multiple_selected	=	 function(data)
			{
				
				var _paramMultiple	=	merge_unic_multiple();
				
					for(line in _paramMultiple)
						{
							if(data==_paramMultiple[line]) return true;
						}
				return false;
			}
			
			
			/*
			 * Comparando para ver se contra multiples
			 */
			var compare_multiple	=	 function(data)
			{
				for(lineCMultiple in chart_multiples)
					{
							if(chart_multiples[lineCMultiple]==data) return true;
					}
				
				return false;
			}
			
			
			var compare_radar_polar	=	 function(data)
			{
				for(lineCMultipleRP in chart_radar_polar)
					{
							if(chart_radar_polar[lineCMultipleRP]==data) return true;
					}
				
				return false;
			}
			
			
			
			
			
			
			
			/*
			 * Pegando apenas os primeiros valores do array 
			 */
			var getFirstValueArray	=	 function(param)
			{
				for(line in param)
					{
						return {value : param[line][0], name:line};
					}
			}
			

				
			var infoFirst	=	getFirstValueArray(chartData);
			
			/*
			 * COnfiguração para quando for apenas grafico do tipo Donut 
			 */
			if(!empty(ChartDefault))
			{
				
				if(!empty(kendoUiTools.ORDER_BY_COLUMN))
				{
					infoFirst.value	=	kendoUiTools.ORDER_BY_COLUMN;
				}
			}//END 
			
			

			
			/*
			 * Simulando a opção do usuário 
			 */
			/*
				ChartDefault	=	[];
				ChartDefault['data']	=	[];
				ChartDefault['data']['[Measures].[DOLAR]']={'type':'line', value:'line_smooth', 'title':'novo', 'style': "smooth"};
				ChartDefault['legend']={position: "bottom",visible: true};
				ChartDefault['labels']={position:'OutsideEnd', visible: false};*/



				NAV.find('.info_chart').show();
				kendoChart.height(ELEMENT.height());
				kendoChart.width(ELEMENT.width());
				
				/*
				 * Verificando se é para recriar o gráfico ou apena fazer o resize
				 * 
				 */
				
				if(!exist_in_array(exceptionChartResize(),getFisrtChartValue(ChartDefault)))//VErifica se é alguns charts que não precisa fazer o resize
				{
					if(ELEMENT.attr('chart')=='true') 
					{
						 var chart = kendoChart.data("kendoChart");
						 	
						 	if(!empty(chart)){
						 	 chart.redraw();
						 	}
						 	
						 	if(empty(_start_modal)){
						 			return true;
						 	}
					}
				}
				
				
				 
				/*
				 * Aplicando as configurações das legendas
				 */
				var mergeChartConfigLegend	=	 function(defaults)
				{
					var tmpDefaults			=	defaults;

					if(empty(defaults)){
						tmpDefaults	=	{labels:{}};
					}
					
					if(array_find_data(ChartDefault,'labels'))
					{
						tmpDefaults.labels = $.extend( {}, tmpDefaults.labels, ChartDefault.labels );
					}
					
					return tmpDefaults;
				}
				
				
				
				

				
				
				/*
				 * COnfigurações
				 */
				/*
				 * Usando as confirurações do Usuário
				 * 
				 */

				if(!empty(ChartDefault))
				{
					var useCustumer		=	[];
					
		    		for(lineChartDefault in chartData)
		    			{
		    				if(array_find_data(ChartDefault['data'],lineChartDefault))
			    			{
			    				useCustumer[lineChartDefault]	=	chartData[lineChartDefault];
			    			}		    				
		    			}
		    		
		    		if(array_length(useCustumer)>=1)
		    		{
			    		chartData	=	[];
			    		chartData	=	useCustumer;
			    		legendChart	=	ChartDefault['legend']; //Usando a legenda configurada pelo usuário
			    		
		    		}else{
		    			if(is_array(ChartDefault)){
		    				legendChart	=	ChartDefault['legend'];
		    			}
		    			
		    			//Apenas zera quando não for o default
		    			if(!onlyDefault){ChartDefault	=	 '';}
		    		}
				}
	    		
	    		
	    		
				
				
				/*
				 * 
				 * Aplicando configurações Default
				 */
				if(empty(ChartDefault))
				{
					//Quando o usuário ainda não escolher as opções
					var columnCustomerClick	=	kendoUiTools.ORDER_BY_COLUMN;
					var firstFullName		=	'';
					
					if(!empty(columnCustomerClick))
					{
						var cLevelFull				=	headerIndex.field[columnCustomerClick].LEVEL_FULL;
							chartData				=	[];
							chartData[cLevelFull]	=	tmpCustomer[cLevelFull];
						
					}else{
						for(flf in chartData)	if(empty(firstFullName))	firstFullName=flf
						chartData					=	[];
						//chartData[cLevelFull]
						
						if(!empty(infoFirst)){
							chartData[infoFirst.name]	=	tmpCustomer[firstFullName];
						}
					}
					
					//Garante as configurações básica para funcionar
					
					if(empty(legendChart))
					{
						legendChart	=	{position :'bottom',visible: false};
					}
					
					ChartDefault			=	[];
					ChartDefault['data']	=	[];
		    	}
		    	
				
				//END CUstomer	
		    	/*
				 * CHart Config
				 */
				var btnConfigChart			 =	NAV.find('.chart_config_btn');				
				var event_btnConfigChart	=	function(){
					var modal	=	 $(this).attr('data-target');
						$(modal).modal('show');
						$('.modal-chart-header').html(LNG('CHART_CONFIG'));
						$('.gauge-container-html,.gauge-container-size-line,.line-total-bubble').addClass('hide');
						WrsGougeConfigure(idName,kendoUiTools,typeGauge);
					}
				
					btnConfigChart.unbind('click').click(event_btnConfigChart);
				

					//Apenas quando for o Default no DRAG and DROP
					if(onlyDefault)	event_btnConfigChart();
					
					
				
				/*
				 * Carregando a tabela 
				 */
				var createTypeForms	=	 function()
				{
						var NORMAL		=	LNG('NORMAL');	//"Nornal";
						var STACKED		=	LNG('STACKED');	//	"Empilhado";
						var WAVY		=	LNG('WAVY');	//"Ondulado";
						var PERCENT		=	LNG('PERCENT');	//"Percentual";
							typeChart	=	[];
						var html		=	'';
						var htmlData	=	'';
						
						
						if(GRID.attr('chart-wrs')=='true') return true;
						
						

							typeChart['line']	=	{
															icon		:	'line.png',
															limit_use	:	0,//0 - é ilimitado	
															show		:	0, // 0 - é ilimitado
															types		:	[
															     	 	 	{'type':'line', 'value':'line'				, 'title':NORMAL , 'stack': false},
															     	 	 	{'type':'line', 'value':'line_smooth'		,'title':WAVY, 'style': "smooth"}		
																		]
													};
							
							typeChart['column']	=	{
														icon	:	'column.png',
														limit_use	:	0,//0 - é ilimitado	
														show		:	0, // 0 - é ilimitado
														types	:	[
														     	 	 	{'type':'column', 'value':'column'			,'title':NORMAL , 'stack': false},
														     	 	 	{'type':'column', 'value':'column_stack'	,'title':STACKED, 'stack': true},
														     	 	 	{'type':'column', 'value':'column_stack_100','title':PERCENT, 'stack': {type: "100%"}}
																	]
							};
							
							typeChart['bar']	=	{
														icon	:	'bar.png',
														limit_use	:	0,//0 - é ilimitado	
														show		:	0, // 0 - é ilimitado
														types	:	[
														     	 	 	{'type':'bar', 'value':'bar'			, 'title':NORMAL , 'stack': false},
														     	 	 	{'type':'bar', 'value':'bar_stack'		, 'title':STACKED, 'stack': true},
														     	 	 	{'type':'bar', 'value':'bar_stack_100'	, 'title':PERCENT, 'stack': {type: "100%"}}
																	]
							};
						
							typeChart['area']	=	{
															icon	:	'area.png', 
															limit_use	:	0,//0 - é ilimitado	
															show		:	0, // 0 - é ilimitado
															types	:	[
															     	 	 	{'type':'area', 'value':'area'			, 'title':NORMAL , 'stack': false},
															     	 	 	{'type':'area', 'value':'area_stack'	, 'title':STACKED, 'stack': true},
															     	 	 	{'type':'area', 'value':'area_stack_100', 'title':PERCENT, 'stack': {type: "100%"}}
																		]
													};
							
							

							typeChart['pie']	=	{
															icon	:	'pie.png?1',
															limit_use	:	0,//0 - é ilimitado	
															show		:	0, // 0 - é ilimitado
															types	:	[
															     	 	 	{'type':'pie', 'value':'pie', 'title':LNG('CHART_PIE'),
															     	 	 	   labels: {
																	                        template	: 	"#= category # - #= kendo.format('{0:P}', percentage)#",
																	                        background	: 	"transparent"
															     	 	 	   			}
															     	 	 	},
															     	 	 	{'type':'donut', 'value':'donut', 'title':LNG('CHART_DONUT'),
																     	 	 	   labels: {
																		                        template	: 	"#= category # - #= kendo.format('{0:P}', percentage)#",
																		                        background	: 	"transparent"
																     	 	 	   			}
																     	 	 	}
																		]
													};//END PIE
							
							
							
							typeChart['radar']	=	{
									icon	:	'radar.png', 
									limit_use	:	0,//0 - é ilimitado	
									show		:	0, // 0 - é ilimitado
									types	:	[
									     	 	 	{'type':'radarLine', 'value':'radarLine', 'title':LNG('CHART_RADAR_LINE') },
									     	 	 	{'type':'radarColumn', 'value':'radarColumn', 'title':LNG('CHART_RADAR_COLUMN') },
									     	 	 	{'type':'radarArea', 'value':'radarArea', 'title':LNG('CHART_RADAR_AREA') }
												]
							};
							
							//['bubbley','bubblex','bubble_total'];
							typeChart['bubble']	=	{
									icon		:	'bubble.png', 
									limit_use	:	3,//0 - é ilimitado	
									show		:	3, // 0 - é ilimitado
									types		:	[
									     	 	 		{'type':'bubblex', 		'value':'bubblex', 'title':LNG('CHART_BUBBLE_X') },
									     	 	 		{'type':'bubbley', 		'value':'bubbley', 'title':LNG('CHART_BUBBLE_Y') },
									     	 	 		{'type':'bubble_total', 'value':'bubble_total', 'title':LNG('CHART_BUBBLE_TOTAL') }
									     	 	 		
									     	 	 	]
							};
							
							
							
							
							//['bubbley','bubblex','bubble_total'];
							typeChart['gauge']	=	{
									icon		:	'gauge-radial.png', 
									limit_use	:	0,//0 - é ilimitado	
									show		:	0, // 0 - é ilimitado
									types		:	[
									     	 	 		{'type':'gauge_linear', 		'value':'gauge_linear', 'title':LNG('CHART_GAUGE_LINEAR') },
									     	 	 		{'type':'gauge_radial', 		'value':'gauge_radial', 'title':LNG('CHART_GAUGE_RADIAL') }
									     	 	 	]
							};
							
							
					
							//Construindo o Formulário
							

							var icon		=	'';
							var inputHtml	=	'';
							var types		=	[];
							var limit_use	=	0;
							var limit_show	=	0;
							
							
							
							
							for(lineTypeChart in typeChart)
								{
										icon		=	typeChart[lineTypeChart].icon;
										types		=	typeChart[lineTypeChart].types;
										limit_use	=	typeChart[lineTypeChart].limit_use;
										limit_show	=	typeChart[lineTypeChart].show;
										
										
										inputHtml	=	'';
										
										for(linkTypes	in types)
											{
													var _title	=	types[linkTypes].title;
													var _type	=	types[linkTypes].type;
													inputHtml		+=	  '<label class="radio-inline">'+
																	  '	  	<input wrs-key="'+lineTypeChart+'" wrs-type="'+_type+'" limit-show="'+limit_show+'" limit-use="'+limit_use+'" disabled json="'+base64_encode(json_encode(types[linkTypes],true))+'" type="radio" name="wrs-chart-types"  class="wrs-chart-types '+types[linkTypes].value+'"  value="'+types[linkTypes].value+'"> '+_title+
																	  '		</label>  ';
											}
										
										htmlData+=	'<tr>'+
											        '  <td valign="middle"  ><img src="imagens/chart/'+icon+'"/></td>'+
											        '  <td valign="bottom">'+inputHtml+
											        '  </td>'+
											        '</tr>';						         
								
								}	
							
							html	=	'<table style="margin-bottom: 0px!important;" class="table table-condensed table-hover wrs_chart_config_kynds">'+
										'  	<thead>'+
										'		<tr>'+
										'			<th>'+LNG('TYPE')+'</th>'+
										'			<th>'+LNG('SUB_TYPE')+'</th>'+
										'		</tr>'+
										'	</thead>'+
										'	<tbody>'+htmlData+
										'	</tbody>'+
										'	</table>';
							
							$('.modal_chart_body_table').html(html);
							 
							
							
				};
				//END Configure Chart
				
				createTypeForms();
				
				
				
				/*
				 * COnstruindo o Evento do Select
				 */
				var loadTypesMeasuresAction	=	 function()
					{
					
					
						var bodyConfigChart			=	$('.chart-config-body');
						var measures				=	bodyConfigChart.find('.wrs-measures');
						var measures_receive		=	bodyConfigChart.find('.wrs-measures-receive');
						
						/*
						 * TODO:COmentado em 11/09/2015 
						 */
//							if(GRID.attr('chart-wrs')=='true') return true;
						
							measures.find('option').remove();
							measures_receive.find('option').remove();
							
							for(lineChartTitles in chartTitles)
							{
								//verificando se já existe essa informação 
								var _json		=	'';
								var to_add		=	measures;
								if(!empty(ChartDefault['data']))
									{
									;
//										console.log('ChartDefault',ChartDefault['data']);
										if(array_find_data(ChartDefault['data'],lineChartTitles))
										{//Inserindo os que já estão ativos
											to_add	=	measures_receive
											_json	=	base64_encode(json_encode(ChartDefault['data'][lineChartTitles]));
											//continue;

										}
										
									}
								

								to_add.append($('<option/>',{'json':_json,'value':lineChartTitles,'html':chartTitles[lineChartTitles]}));
							}
							
							var disableInputBySize	=	 function(_event){
								
									var	sizeOption	=	_event.find('option').length;
									
									
										bodyConfigChart.find('.wrs_chart_config_kynds').find('input').each(function(){
											var limit_use	=	parseInt($(this).attr('limit-use'));
											var limit_show	=	parseInt($(this).attr('limit-show'));
											var _type		=	parseInt($(this).attr('wrs-type'));
											
											/*
											 * TODO:
											 */
											//Regras de limitação
											if(limit_use!=0)
												{
													if(sizeOption>limit_use){
														$(this).attr('disabled','disabled');
													}
												}
											
											if(limit_show!=0)
												{
													if(sizeOption!=limit_show )
														{
															if(!exist_in_array(chart_bubble,_type))
															{
																$(this).attr('disabled','disabled');
															}
														}
												}
										});
								
								
							}
							/*
							 * Evento CLick
							 */
							
							var runOptions		=	 function(who,to,where,select)
							{
								var sizeOption	=	0;
								who.find(where).each(function() {		
									
									to.append($('<option/>',{'value':$(this).val(),'html':$(this).text()}).attr('json',$(this).attr('json')));
									
									//Garantindo que ao selecionar uam opção ela seja preenchida com as informações default
									if(!empty(select))
										{
											if(empty($(this).attr('json'))){
												to.find('option').last().attr('json',bodyConfigChart.find(ActiveDefaultTag).attr('json')); //Carregando o Json
											}
										}									
									$(this).remove();
								});
								
								if(!empty(select))
								{
									to.find('option').prop('selected', false).last().prop('selected', true);
									to.focus().trigger('click');
									
									
									disableInputBySize(to);									
									
								}else{
									bodyConfigChart.find('.wrs_chart_config_kynds').find('input').attr('disabled','disabled');
								}
								
							}
							
							var toActive			=	 function(){runOptions(measures,measures_receive,"option:selected",true);};
							
							var toMeasure			=	 function(){runOptions(measures_receive,measures,"option:selected");};
							
							var toAllActive			=	 function(){runOptions(measures,measures_receive,"option",true);};
							
							var toAllMeasure		=	 function(){runOptions(measures_receive,measures,"option");};
							
							
							
							/*
							 * COnfigurando a Legenda
							 */
								var LEGEND_WRS	=	 function(){
								var _toggle		=	'hide';
								if($(this).is(':checked'))
									{
										_toggle=	'show';
									}
								
								bodyConfigChart.find('.LEGEND_TYPES_WRS').toggle(_toggle);
							}//END Legenda
							
							
							
							/*
							 * Salvando as INformações
							 * legend-types
							 */
							var toRunConfigChartWrs	=	function(){
								
								var cCHART				=	{};

								var chart_configLegend 	=	bodyConfigChart.find('.legend-types-config').is(':checked');
								
								var legend 	=	{
													position	:	bodyConfigChart.find('.legend-types:checked').val(),
													visible		: 	bodyConfigChart.find('.LEGEND_WRS').prop('checked')
												};
								
								
								var labels	=	{position:ChartDefaultOnject.labels.position, visible:chart_configLegend};
								
								var data	=	{};
								
									measures_receive.find('option').each(function(){
										data[$(this).val()]	=	 $.parseJSON(base64_decode($(this).attr('json')));
									});
									
	
									cCHART['data']		=	{};
									cCHART['data']		=	data;
									cCHART['legend']	=	legend;
									cCHART['labels']	=	labels;
									

									
									ELEMENT.attr('chart','false');//Abilitando a construção 
									
									var chartParam	=	base64_encode(json_encode(cCHART,true));
										wrsKendoUiChange('#'+idName,'CHART',chartParam);								
									
									
									var infoDefault		=	'';

						  			
						  			
									if(onlyDefault){
										//Quando for o Default
										var configOptions	=	$('#wrsConfigGridDefault').data('wrsConfigGridDefault');			
										configOptions.CHART	=	chartParam;
										infoDefault			=	configOptions;
									}else{
										
										infoDefault	=	kendoUiTools;
										WRSKendoUiChart(KendoUi);//Run 
									}
									
									
									//Save Historico
									var saveHistory	=	[];
							  			saveHistory['CHART']	=	chartParam;
							  			saveHistoryEvents(saveHistory,infoDefault['REPORT_ID']);

							  			
								
							};
							
							var measures_receive_click	=	 function(){
								
								var see	=	false;
									
								$(this).find('option:selected').each(function() {
																	see = true;
																	
																	if(!empty($(this).attr('json')))
																		{
																			var json	=	 $.parseJSON(base64_decode($(this).attr('json'))) ;
																				bodyConfigChart.find('input.'+json['value']).prop('checked', true);
																		}else{
																			bodyConfigChart.find(ActiveDefaultTag).trigger('click');	//selecionando ao menos o primeiro
																		}
															});
								
								if(see)
								{
									bodyConfigChart.find('.wrs_chart_config_kynds').find('input').removeAttr('disabled');									
								}
								
								disableInputBySize($(this));
								
							};
							
							
							/*
							 * Evento ao clicar no input do radio
							 */
							var wrs_chart_types_click	=	 function(){

								var _pie		=	false;
								var _radar		=	false;
								var _clean		=	false;
								var _value		=	$(this).val();
								var _is_select	=	'';
								var size_option	=	measures_receive.find('option').length;
								
								$('.wrs-container-legend').show();
								
								//escondendo a opção de legenda
								switch($(this).attr('wrs-key'))
								{
									case 'gauge':
									case 'bubble' :	$('.wrs-container-legend').hide();
								}
								
								//Removendo os selects
								measures_receive.removeAttr('selected-all');
								
								$('.gauge-container-html,.gauge-container-size-line,.line-total-bubble').addClass('hide');
								
								if(_value=='gauge_radial' ) $('.gauge-container-html').removeClass('hide');
								
								if(_value=='bubble_total' || _value=='bubbley' || _value=='bubblex' || _value=='gauge_linear' || _value=='gauge_radial' ) {
									showLineTOTAL(idName,kendoUiTools);
									$('.line-total-bubble').removeClass('hide');
								}
								
								
								if(_value=='gauge_radial' ||  _value=='gauge_linear' ) {
									$('.gauge-container-size-line').removeClass('hide');
									WrsGougeConfigureLineShow(idName,kendoUiTools);
								}
								
								
								measure_option_check_family(measures_receive,_value,$(this));
								
								

										measures_receive.find('option').each(function(){
												var	json		=	$.parseJSON(base64_decode($(this).attr('json')));
												
												if(!empty(json))
													{
														if(compare_multiple(json.value)) {
															_clean	=	_pie	=	true;															
														}
														
														if(compare_radar_polar(json.value))	{
															_clean	=	_radar	=	true;
														}
														
														
													}
													
										});
									
									
										if(_pie && _radar)
										{
											_clean	=	false;
											measures_receive.find('option').prop('selected',true);
											measures_receive.attr('selected-all',true);
										}
										
								
								
								
									if($(this).is(':checked'))
									{
										/*
										 * Verifica se foi selecionado algum multiplo
										 * E aplicando a regra para fechar a seleção ou abilitar
										 */
										
										if(multiple_selected(_value))
										{
											/*
											 * VErificando se o ultimo select option é diferente da regra multiple
											 * se for então seleciona todos para que possa ser alterado 
											 */
											
											
												if(_pie)if(compare_radar_polar(_value)) _clean=false;
												
												if(_radar)if(compare_multiple(_value)) _clean=false;
												
												
												if(size_option==parseInt($(this).attr('limit-show'))) {
													_is_select	=	$(this).val();
													_clean=true;
												}
												
												
												if(!_clean){
													measures_receive.find('option').prop('selected',true);
													measures_receive.attr('selected-all',true);
												}

												
												//Bloqueando as outras opções
												bodyConfigChart.find('.wrs-chart-types').each(function(){
													
													var _type	=	 $(this).attr('wrs-type');
													
													if(empty(_is_select))
													{ 		
														
														if(!multiple_selected($(this).val()))
															{
																$(this).attr('disabled','disabled');
															}
													}else{
														if($(this).val()!=_is_select){
															if(!exist_in_array(chart_bubble,_type)){
																$(this).attr('disabled','disabled');
															}
														}
													}
												});//END FIND
										}

										var json_input	=	$(this).attr('json');
										var _value		=	$.parseJSON(base64_decode(json_input));
											_value		=	_value.value ;
											measures_receive.find('option:selected').each(function() { $(this).attr('json',json_input).attr('index-value',_value)});
											
										
											//Preenche o JSON com as informações necessárias para gerar o Bubble
											if(!empty(measures_receive.attr('selected-all')) && (_value=='bubblex' ||_value=='bubbley' || _value=='bubble_total'))
											{
												measures_receive.removeAttr('selected-all');
												if(size_option==3)
													{
														var _count_option	=	0;
														$(this).parent().parent().find('input').each(function(){
															measures_receive.focus();
															measures_receive.find('option').prop('selected',false);
															measures_receive.find('option').eq(_count_option).prop('selected',true);
															$(this).prop('checked',true).trigger('click');
															_count_option++;
														});
													}
											}//END
											
											
									}
								
									
							};
							//End Salvar as informações
							
							
							var __legendDefault	=	legendChart;
							
							//Default
							bodyConfigChart.find('.LEGEND_WRS').prop('checked', __legendDefault.visible);
							bodyConfigChart.find('.legend-types[value='+__legendDefault.position+']').prop('checked', true);
							
							
							//Caso já exist legend configurada
							

							bodyConfigChart.find('.legend-types-config').prop('checked', ChartDefaultOnject.labels.visible);
							
							
							bodyConfigChart.find('input.column').prop('checked', true);	//selecionando ao menos o primeiro
							
							if(__legendDefault.visible)
								bodyConfigChart.find('.LEGEND_TYPES_WRS').show();
							else
								bodyConfigChart.find('.LEGEND_TYPES_WRS').hide();
							//End Default
							
							/*
							 * Eventos
							 */
							
							bodyConfigChart.find('.wrs-chart-types').unbind('click').click(wrs_chart_types_click);
							bodyConfigChart.find('.LEGEND_WRS').unbind('click').click(LEGEND_WRS);
							bodyConfigChart.find('.toActive').unbind('click').click(toActive);
							bodyConfigChart.find('.toMeasure').unbind('click').click(toMeasure);
							bodyConfigChart.find('.toAllActive').unbind('click').click(toAllActive);
							bodyConfigChart.find('.toAllMeasure').unbind('click').click(toAllMeasure);
							
							measures_receive.unbind('click').click(measures_receive_click);
							measures_receive.unbind('change').change(measures_receive_click);
							
							measures.unbind('dblclick').dblclick(toActive);
							measures_receive.unbind('dblclick').dblclick(toMeasure);
							
							$('.toRunConfigChartWrs').unbind('click').click(toRunConfigChartWrs);
							
							GRID.attr('chart-wrs','true');//Controler
							
					};
					
					loadTypesMeasuresAction();
					

					if(!empty(_start_modal)) return false;
					
					//Quando for o Default Para o processo neste estágio
					if(onlyDefault) return true;
					
				
				//PEsquisando quem é o frozem original
					/*
					 * TODO:
					 */
					var find_last			=	'last-child';
					
					//Verificando se é LINHA DRILL e se é linha de total
					if(DRILL_HIERARQUIA_LINHA==_TRUE)
						{
							find_last	=	'eq('+DRILL_FROZEN+')';
						}
					
					
					
				GRID.find('.k-grid-header-locked tr:last-child').find('th:'+find_last).each(function(){
					var index		=	 parseInt($(this).index());
					var key			=	$(this).parent().index()+'_'+index;
					var header		=	headerIndex[key];
					var _indexHigth	=	parseInt($(this).parent().index())-1;	
					if(strpos(header.tb_field,'[LATITUDE]'))
						{
							key		=	$(this).parent().index()+'_'+(index-1);
						}
					
					columnToLabel	=	headerIndex[key].field ;
					titleFrozen		=	headerIndex[key].title ;
					ChartTitle[0]	=	titleFrozen;
					
					
					if(_indexHigth>=0){
						var hIndex			=	$(this).parent().parent().find('tr:eq('+_indexHigth+')').find('th:last-child').index();
							titleHigth		=	headerIndex[_indexHigth+'_'+hIndex].title ;
							ChartTitle[1]	=	titleHigth;
					}
					
					
					
						
				});
				
				
				
				
				
				
				
				
				/*
				 * Exportando Gráficos
				 */
				var createExportButtonWrsCHart	=	 function()
				{
					var svg		=	NAV.find('.wrs_chart_export_svg');
					var pdf		=	NAV.find('.wrs_chart_export_pdf');
					var image	=	NAV.find('.wrs_chart_export_image');
					
						svg.unbind('click');
						pdf.unbind('click');
						image.unbind('click');
						
						//Gerando IMagem	
						image.click(function() {
					            var chart = kendoChart.getKendoChart();
					            chart.exportImage().done(function(data) {
					                kendo.saveAs({
					                    dataURI: data,
					                    fileName: "chart_wrs.png"
					                  //  proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
					                });
					            });
					        });
						
						pdf.click(function() {
					            var chart = kendoChart.getKendoChart();
					            chart.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
					                kendo.saveAs({
					                    dataURI: data,
					                    fileName: "chart_wrs.pdf"
					                   // proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
					                });
					            });
					        });
	
						svg.click(function() {
					            var chart = kendoChart.getKendoChart();
					            chart.exportSVG().done(function(data) {
					                kendo.saveAs({
					                    dataURI: data,
					                    fileName: "chart_wrs.svg"
					                    //proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
					                });
					            });
					        });
				        
				        
				};//END CONVERTER
				
				
				
				/*
				 * Apenas é carregado para ser usando apenas quando for o Donut, PIE 
				 */
				var donutDataChartLoad	=	 function()
					{
						var _param		=	[];
						var tmp_param	=	[];
						
							for(lineChartData in chartData)
								{
										tmp_param	=	chartData[lineChartData];
										
										for(lineTmpParam in tmp_param)
											{
												_param[tmp_param[lineTmpParam]]=	 [];
											}
								}
						
						return _param;
					}
				
				
				/*
				 * Zera o array principal com base nas measre
				 */
				var measuresDataLoad	=	 function()
				{
						var	_param	=	[];
						
						for(lineMeasure in chartData)
							{
								_param[lineMeasure]	=	[];
							}
						
						return _param;
				}
				
				
				var chartToUseUnic	=	[];
				var flagUserToChart	=	false;
				var posTypeCHart	=	[];

				

				/*
				 * Verificando qual o tipo de Gráfico que o usuário escolhe 
				 * e se é a configuração inicial escolho um gráfico padão 
				 */
				for(ocd in chartData)
					{
						posTypeCHart[posTypeCHart.length]	=	ocd;
						if(array_find_data(ChartDefault['data'],ocd))
							{
								typeChart[ocd]		=	ChartDefault['data'][ocd];
								chartToUseUnic[ocd]	=	chartData[ocd];
								flagUserToChart		=	 true;
							}else{
								typeChart[ocd]		=	{type	:	ActiveDefault};
								chartToUseUnic[ocd]	=	chartData[ocd];
							}
					}


							var WRSManipuleChart	=	function()
								{
									var chart				=	[];
									var series				=	[];	
									var axisArray			=	chartTitles;
									var axisTmp				=	[];
									var axis				=	[];
									var axisCrossingValues	=	[];
									var backLoad			=	[];
									var FlagLoad			=	[];
									var getData				=	[];
									var getDataFlag			=	false;
									var loadDataRows		=	[];	
									    
									
									var bodyConfigChart			=	$('.chart-config-body');
									var measures_receive		=	bodyConfigChart.find('.wrs-measures-receive');
									
									
									var json_receive	=	measures_receive.find('option').first().attr('json');
										json_receive	=	$.parseJSON(base64_decode(json_receive));
									var type_chart		=	'';	
									
									var category_length	=	parseInt(headerIndex['chart']['category'].length)+1;
									

									var typesBubble	=	{};//{0 : 	'cxField',1	: 	'cyField',2	:	'csizeField'};
									var colNameBubble	=	{'cxField' : '' , 'cyField' : '', 'csizeField':''};
									/*
									 * Opções para gerar o Bubble
									 */
									var optionBubble	=	{
																dataSource	: {data: ''},
																xAxis		: {/*title: {text: " - "},*/axisCrossingValue:0,max:0,min:0, flag:false, plotBands: []},
																yAxis		: {/*title: {text: " - "},*/axisCrossingValue:0,max:0,min:0, flag:false,plotBands: []}
															};
									
									var calcWithPercent		=	 function (data)
										{
											var _data	=	Number(data);
											return _data;
											//return  ((_data*15)/100)+_data;
										}
									
										/*
										 * Preparando para gerar o Gráfico Bubble
										 */
										if(!empty(json_receive)){
												type_chart	=	json_receive.type;
												
												if(exist_in_array(chart_bubble,type_chart))
												{
													type_chart='bubble';
													
														var count_buble	=	0;
														measures_receive.find('option').each(function(){
															
															var _json_receive	=	$.parseJSON(base64_decode($(this).attr('json')));
															var _type			=	'';
															
																switch(_json_receive.type)
																{
																	case 'bubbley'		: 	_type ='cyField'; break;
																	case 'bubblex'		:	_type ='cxField'; break;
																	case 'bubble_total'	:	_type ='csizeField'; break;
																}
																
																typesBubble[count_buble]	=	_type;
																count_buble++;
															
														}); //END each
														
												}
												
												
												if(type_chart=='bubble')
												{
													bubble	=	true;
													pie_donut 	=	radar_polar	=	false;
													/*
													 * TODO: Verificar sem as colunas
													 */
//													foreach(headerIndex.field[infoFirst.value]);
													if(!empty(headerIndex.field[infoFirst.value].c_parent))
														{
															var _label 		= 	headerIndex.field[infoFirst.value].c_parent;
															var bubbleCol	=	headerIndex[_label].columns;
															
																//ORdenando igual ao measure receive
																measures_receive.find('option').each(function(){
																		for(lineBubbleCol in bubbleCol)
																			{
																				if($(this).val()==bubbleCol[lineBubbleCol].LEVEL_FULL)
																					{
																						loadDataRows[loadDataRows.length]	=	bubbleCol[lineBubbleCol].field  ;
																					}
																			}
																});
														}
													
													
												}else{
													/*
													 * Verificando se é GAUGE
													 */
													var _label 		= 	headerIndex.field[infoFirst.value].c_parent;
													/*
													 * PROBLEMAS NESSA LINHA
													 */
													
													var bubbleCol	=	getMeasuteChartUse(telerikGrid,_colum_frozen);
													
													if(!empty(_label))
													{
														var bubbleCol	=	headerIndex[_label].columns;
													}
													
													
													measures_receive.find('option').each(function(){

														var _json_receive	=	$.parseJSON(base64_decode($(this).attr('json')));
														
																	if(_json_receive.type=='gauge_radial')
																		{
																			typeGauge.radial	=	true;
																			typeGauge.active	=	true;
																		}
																	
																	if(_json_receive.type=='gauge_linear')
																		{
																			typeGauge.linear	=	true;
																			typeGauge.active	=	true;
																		}
														 
																	if(typeGauge.active && !empty(bubbleCol))
																	{	
																		for(lineBubbleCol in bubbleCol)
																		{
																			
																			if($(this).val()==bubbleCol[lineBubbleCol].LEVEL_FULL)
																				{
																					loadDataRows[loadDataRows.length]	=	bubbleCol[lineBubbleCol].field  ;
																				}
																		}
																	}
														
													}); //END each
													
													
												}
											}
										//END BUBBLE
										

									/*
									 * Preenchendo o array default das measures 
									 */
									for(lineAxis in chartData)
									{
										axisTmp[lineAxis]	=	{name: "",wrs_title:'', volume:'', title: { text: "" }, labels: {template:''},/*minorGridLines: {visible: true}*/ /*,min: 900,max: 0*/};
									}
										
									
									
									
									if(typeGauge.active)
										{
											if(!empty(headerIndex.field[infoFirst.value].c_parent))
												{
													chartData	=	getColumnsTochart(headerIndex[headerIndex.field[infoFirst.value].c_parent].columns);
													chartData	=	checkGaugeData(chartData);
												}
										}
									
										/*
										 * Lendo todos os dados que contem na GRID
										 */

										for(lineData in _data)
											{

												if(FlagLoad[_data[lineData]['C000']]) continue;
												
												FlagLoad[_data[lineData]['C000']]	=	true;
											
												//Faz com que se existir menos resultado que o esperado então ele não repete as informações
												if(isset(backLoad[_data[lineData]['C000']])) continue;
													
													backLoad[_data[lineData]['C000']]	=	true;	//Apenas Flag
													
													//Evitando linhas de totais
													if(empty(_data[lineData]['C001'])){
														/*
														 * Salvando informações penas se for a primeira linha e se for TOTAL
														 */
														if(_data[lineData]['C000']==1)
														{
															//if(!getInfoTotalColumn(true,true)){
																var tmpTotalLabel		=	 headerIndex.field;
																var createTotalInfoCol	=	{};	
																//precisamos apenas da lineTmpTotalLabel
																for(lineTmpTotalLabel in tmpTotalLabel)
																	{
																		createTotalInfoCol[lineTmpTotalLabel]	=	_data_wrs[lineData][lineTmpTotalLabel];
																	}
																
																setInfoTotalColumn(createTotalInfoCol,'',true);
																
																//Não permite a primeira linha de total apenas quando for o Bolhas com a opção de totais
																if(kendoUiTools.SHOW_LINE_TOTAL=='true' && bubble) continue; 
															//}
														}
														
														if(!typeGauge.active){//Apenas não paara os gauges
															
															if(kendoUiTools.SHOW_LINE_TOTAL=='true' && bubble){} else {continue;}
														}
													}
													
													//Validando linha de totais

													if(empty(_data[lineData]['C00'+_colum_frozen])){
														
															if(kendoUiTools.SHOW_LINE_TOTAL=='true' && bubble ||
																	kendoUiTools.SHOW_LINE_TOTAL=='true' && typeGauge.active ){} else {continue;}
														
													}
													
													
													
											 
													
													
													
													/*
													 * Contem informações das metricas e quais informações deve ser lidas bor metrica e por coluna
													 * 
													 * [Measures].[DOLAR] 	|| C003,C006,C009,C012,C015,C018
													 * [Measures].[DOSE] 	|| C004,C007,C010,C013,C016,C019
													 * [Measures].[REAL] 	|| C002,C005,C008,C011,C014,C017
													 * 
													 */
												
													if(bubble)	getData			=	[];
													
													
													
													
													
													for(lineDataMeasure in chartData)
														{
																													//Carregando com as informações de cada linha 
															//Carregando a linha do array inicial
															if(typeGauge.active)
															{
																gaugeOptions.data[lineData]			=	'';
																gaugeOptions.data[lineData]			=	{};
																gaugeOptions.data[lineData]			=	{ title:'', pointer: ''};
																gaugeOptions.data[lineData].pointer	=	[];
															}
																 
														
															var dataChartCol	=	chartData[lineDataMeasure];

															var ccCategory		=	0;
															
																//criando o Bubble
																if(bubble)	{
																	dataChartCol	=	loadDataRows;
																}
																
															
																if(!pie_donut && !radar_polar && !bubble){
																	getData			=	[];
																}
															/*
															 * TO DONUT
															 */
																
															if(!empty(typeChart[lineDataMeasure])){
																if(compare_multiple(typeChart[lineDataMeasure]['type']) && !bubble)
																{
																	pie_donut	=	true;
																	
																	if(!getDataFlag)
																	{
																		getData		=	donutDataChartLoad();
																		getDataFlag	=	true;
																	}
																	
																}
															
															
															/*
															 * TO RADAR
															 */
															
															if(compare_radar_polar(typeChart[lineDataMeasure]['type']) && !bubble)
															{
																radar_polar	=	true;
																
																if(!getDataFlag)
																{
																	getData		=	measuresDataLoad();
																	getDataFlag	=	true;
																}
															}
															}
															
															for(linkdcC in dataChartCol)
																{
																
																	//Exclui linhas de totais																
																	if(headerIndex.field[dataChartCol[linkdcC]].TOTAL=='S') {
																		
																		//Apenas libera para o polar ou donut
																		if(!pie_donut || !radar_polar){
																			if(!typeGauge.active)
																			{
																				if(!bubble) continue;
																			}
																		}
																	}
																
																
																	var __data_cC	=	_data_wrs[lineData][dataChartCol[linkdcC]];
																	
																		if(!empty(__data_cC))
																		{
																			__data_cC	=	strip_tags(__data_cC);
																		}
																	
																		__data_cC	=	_convertNumber(__data_cC);//str_replace(',','.',str_replace(['.','%'],'',__data_cC));
																		/*
																		 * TO READ
																		 * Nesta opção a categoria é apenas para o PIE e o DONUT pois aqui a categoria é apenas a label
																		 */
																	var	paramGetData	=	{
																										'category'			: _data_wrs[lineData][columnToLabel],
																										'category_title'	: headerIndex['chart']['category'][ccCategory],
																										'value'				: __data_cC,
																										'wrs_field'			: dataChartCol[linkdcC],	
																										'level_full'		: lineDataMeasure,
																										'name'				: _data_wrs[lineData][columnToLabel],	//Para ser usado do DONUT
																										'axis'				: axisArray[lineDataMeasure], //para ser usado no DONUT
																										'color'				: palletCol[lineData]
																							};
																	

																	if(empty(paramGetData.name))
																	{
																		paramGetData.name	=	strip_tags(GRID.find('.k-grid-content-locked table tr:eq('+(lineData)+')').attr('wrs-html-data'));
																		
																		if(empty(paramGetData.name)){
																			paramGetData.name	=	LNG('LINE_TOTAL');
																		}
																		
																	}
																	
																	//Carregando informações para o Gauge
																	if(typeGauge.active)
																	{
																		var _pointerLength												=	gaugeOptions.data[lineData]['pointer'].length;
																		var edgeSize													=	0.1;
																		var edgeCalc													=	(((_pointerLength*100)/dataChartCol.length)-100)*-1;
																		var edgeWidth													=	(edgeSize*edgeCalc)/100;
																		
																			gaugeOptions.data[lineData]['pointer'][_pointerLength]		= 	{
																																				value	: paramGetData.value,
																																				margin	:	(_pointerLength*7)+3,
																																				color	: palletColorGauge[_pointerLength],
																																				cap		: { size: edgeWidth },
																																				field	:	dataChartCol[linkdcC]
																																			};
																			

																			gaugeOptions.data[lineData].title							=	paramGetData.name;
																			
																			if(!gaugeOptions.MinMax){
																				gaugeOptions.max	=	gaugeOptions.min	=	Number(paramGetData.value);
																				gaugeOptions.MinMax	=	true;
																			}
																			
																			if(Number(gaugeOptions.min)> Number(paramGetData.value))  gaugeOptions.min	=	paramGetData.value;

																			if(Number(paramGetData.value) > Number(gaugeOptions.max))  {
																				gaugeOptions.max	=	paramGetData.value;
																			}
																		
																		
																	}
																	
																	
																	if(!radar_polar)
																	{
																		if(!pie_donut){
																				//NORMAL
																				
																				getData[getData.length]	=	paramGetData;
																		}else{
																			//QUando For PIE DONUT 
																			var _length									=	getData[dataChartCol[linkdcC]].length;
																				getData[dataChartCol[linkdcC]][_length]	=	paramGetData;
																		}
																		
																	}else{
																		
																		//RADAR ou POLAR
																		var _getDataParam	=	 [];
																		var _line			=	parseInt(_data[lineData]['C000']);
																			_line			=	_line-1;	

																			try {
																					_getDataParam		=	getData[lineDataMeasure][_line];
																				}catch(e) {
																					getData[lineDataMeasure][_line]	=	{name:'',data:[]};
																				}
																		
																			if(!_getDataParam)
																				{
																					getData[lineDataMeasure][_line]	=	{name:'',data:[]};
																				}
																			
																			
																			_getDataParam	=	getData[lineDataMeasure][_line];
																			
																			
																			_getDataParam.name								=	_data_wrs[lineData][columnToLabel];
																			_getDataParam.data[_getDataParam.data.length]	=	__data_cC;
																			getData[lineDataMeasure][_line]	=	_getDataParam;
																			
																	}//END RADAR ou POLAR
																	ccCategory++;
																}
															
																// opção para os gráficos covencionais
																var options_series	=	 {
																							data: getData, 
																							name: _data_wrs[lineData][columnToLabel],
																							axis: axisArray[lineDataMeasure],
																							color: palletCol[lineData]
																						};
																


																//renderizando gráficos convêncionais
																if(!pie_donut && !bubble)
																{	
																	series[series.length]	=	$.extend( {}, mergeChartConfigLegend(typeChart[lineDataMeasure]), options_series );
																}
														}
													
													
													//cofigurações do Gráfivo bubble
													if(bubble)
													{
														var valueEmpty	=	{'cxField'	:0,'cyField'	:0,'csizeField':0,'title':'', 'color':palletCol[lineData]};
														
															for(lineDataBubble in getData)
															{
																
																	
																	valueEmpty[typesBubble[lineDataBubble]]	=	 getData[lineDataBubble].value;
																	valueEmpty.title						=	getData[lineDataBubble].name;	
																	
																	var _calc		=	 calcWithPercent(getData[lineDataBubble].value);
																	
																		/*
																		 * Preenchendo os valores dos minimo e máximo com os 10%
																		 */
																		switch(typesBubble[lineDataBubble])
																		{
																			case 'csizeField' : {colNameBubble.csizeField=getData[lineDataBubble].wrs_field;} ;break;
																			case 'cxField' 	: {
																				
																				colNameBubble.cxField		=	getData[lineDataBubble].wrs_field;
																				

																				if(!optionBubble.xAxis.flag){
																					optionBubble.xAxis.min	=	_calc;
																					optionBubble.xAxis.flag	=	true;
																				}
																				
																				if(_calc < optionBubble.xAxis.min ){
																						optionBubble.xAxis.min	=	_calc;
																					}
																				
																				if(_calc > optionBubble.xAxis.max ){
																					optionBubble.xAxis.max	=	_calc;
																				}
																				
																				
																				
																			};break; 
																			case 'cyField'	: {
																				
																				colNameBubble.cyField		=	getData[lineDataBubble].wrs_field;
																				
																				if(!optionBubble.yAxis.flag){
																					optionBubble.yAxis.min	=	_calc;
																					optionBubble.yAxis.flag	=	true;
																				}
																				
																				
																				if(_calc < optionBubble.yAxis.min ){
																						optionBubble.yAxis.min	=	_calc;
																					}
																				
																				if(_calc > optionBubble.yAxis.max ){
																					optionBubble.yAxis.max	=	_calc;
																				}
																				
																				
																			};break;
																		}
																	
																	
																	
															}
															series[series.length]	=	valueEmpty;//$.extend( {}, mergeChartConfigLegend(typeChart[lineDataMeasure]), options_series );
													}
													
													
											}
											//END
										
										
										
										
										
										
										
										
										
										
										
										
										
										
										
										
										
										/*
										 * Apenas para o PIE e o DONUT
										 * é implementado apenas uma casa de ARRAY
										 */
										if(pie_donut)
										{
											series		=	getData;
											//series[series.length]	=	$.extend( {}, mergeChartConfigLegend(typeChart[lineDataMeasure]), options_series );
										}
										
										/*
										 * Configurado apenas para quando for o Radar
										 */
										if(radar_polar)
											{
												series	=	getData;
											}
										
										if(typeGauge.active){
											series	=	gaugeOptions;
										}
										
										/*
										 * Manipupando o Array
										 */
										if(bubble)
											{
											//TRACE_DEBUG(optionBubble.xAxis.max);
								  		
													if(getInfoTotalColumn(true,true))
														{
																var getAllTotal	=	getInfoTotalColumn('All');
																 
																if(!empty(getAllTotal))
																	{
																		var _color		=	{
													                        from: -5000,
													                        to: 2000,
													                        color: "#00f",
													                        opacity: 0.05
													                    };
																	
																		
																		 
																		if(!empty(colNameBubble.cxField))
																		{
																			
																			optionBubble.xAxis.axisCrossingValue		=	_convertNumber(getAllTotal[colNameBubble.cxField]);
																			optionBubble.xAxis.plotBands[0]				=	merge_objeto(optionBubble.xAxis.plotBands,_color);
																			optionBubble.xAxis.plotBands[0].to			=	optionBubble.xAxis.axisCrossingValue;
																			optionBubble.xAxis.plotBands[0].from		=	optionBubble.xAxis.min;
																		}
																		
																		if(!empty(colNameBubble.cyField))
																		{
																			optionBubble.yAxis.axisCrossingValue		=	_convertNumber(getAllTotal[colNameBubble.cyField]);
																			
																			optionBubble.yAxis.plotBands[0]				=	merge_objeto(optionBubble.yAxis.plotBands,_color);
																			optionBubble.yAxis.plotBands[0].to			=	optionBubble.yAxis.axisCrossingValue;
																			optionBubble.yAxis.plotBands[0].from		=	optionBubble.yAxis.min;
																			optionBubble.yAxis.plotBands[0].color		=	'#186DEE';
																		}
																		
																		
																		
																		optionBubble.xAxis	=	calcMaxMin(optionBubble.xAxis);
																		optionBubble.yAxis	=	calcMaxMin(optionBubble.yAxis);
																		 
																		
																	}
																		
																/*
																 * TODO:
																 */
																//calculando o maximo e o mínimo do Y
																//optionBubble.yAxis.min
															}
													
													
													if(!empty(colNameBubble.cxField))
													{
														optionBubble.xAxis.wrs_title	=		headerIndex.field[colNameBubble.cxField].title;// + '( '+optionBubble.xAxis.axisCrossingValue+' ) ';
														optionBubble.yAxis.wrs_title	=		headerIndex.field[colNameBubble.cyField].title;// + '( '+optionBubble.yAxis.axisCrossingValue+' ) ';
													
														optionBubble.xAxis.volume	=	optionBubble.yAxis.volume	=	headerIndex.field[colNameBubble.csizeField].title;
													}
													
													

													optionBubble.dataSource.data	=	series;
													series							=	optionBubble;
											}
										
										/*
										 * Ajustando as legendas das Categorias
										 */
										for(lineAxis in axisTmp)
										{
											axisTmp[lineAxis].name				=	axisArray[lineAxis];
											axisTmp[lineAxis].title.text		=	axisArray[lineAxis];
											axisTmp[lineAxis].labels.template	=	"#= "+LABEL_FORMAT+" #";
											axis[axis.length]					=	axisTmp[lineAxis];
											
											axisCrossingValues[axisCrossingValues.length]	=	axisCrossingValues.length%2==0 ? 0 : category_length;
										}
										

										
										headerIndex['chart']['category']	=	array_remove_value(headerIndex['chart']['category'],category_remove);
										
										
										//Alimentando o Array para ser implementado no chart posteriormente
										chart['series']					=	series;
										chart['valueAxes']				=	axis;
										chart['categories']				=	headerIndex['chart']['category'];
										chart['axisCrossingValues']		=	axisCrossingValues;
										chart['title']					=	implode(' x ',ChartTitle);												
									
									return chart;
								};
								//END WRSManipuleChart						
								
								
					 		
							/*
							 * Renderizando o Gráfico
							 */
							var createChartCommon		=	 function() 
		 						{
									var pathChart			=	kendoChart;
									var chartSeries			=	[];
									var tmpSeries			=	paramChart['series'];
									var tmpSeriesArray		=	[];
									var title				=	paramChart['title'];
									var _title				=	title;
									var titleMultiple		=	[];
									var _titleSubNivel		=	'';
									var toMergerRADAR		=	[];
									var toMergerRADARTmp	=	[];
									var col_md				=	'3';
									var bodyConfigChart			=	$('.chart-config-body');
									var measures_receive		=	bodyConfigChart.find('.wrs-measures-receive');
									
									//Ajustando tamanho por cauza do resize de Bolhas
									if(pathChart.hasClass('buble-container-chart')){
										pathChart.height(pathChart.height()-40);
										pathChart.width(pathChart.width()-10);
									}
									
									pathChart.removeClass('buble-container-chart'); //removendo defaults
									pathChart.removeClass('hide-before-after').addClass('hide-before-after');
									
									
									
									var color_ranger		=	["#c20000","#ff7a00","#ffc700","#96eaa0","#2ed642"];
									var GAUGE_RADIAL		=	{
															        pointer: [],
															        scale: {
																            max			: 0,
																            min			: 0,
																            labels		: {
																                			position: "outside"
																            			},
																            ranges: []
															        }
															    };
									
									
									
									
									
									if(!empty(headerIndex[headerIndex.field[infoFirst.value].c_parent]))
									{
											_titleSubNivel	=	" ("+headerIndex[headerIndex.field[infoFirst.value].c_parent].title+")";
									}

									
									
									var GAUGE_LINEAR		=	{
															        pointer: [],
															        scale: {
																            max			: 0,
																            min			: 0,
																            vertical	:	true
															        }
															    };
									
									
									if(typeGauge.linear)
										{
											GAUGE_RADIAL	=	GAUGE_LINEAR;
										}
									
									var _dchart = kendoChart.data("kendoChart");
									
									if(!exist_in_array(exceptionChartResize(),getFisrtChartValue(ChartDefault)))//VErifica se é alguns charts que não precisa fazer o resize
									{
										if(_dchart) _dchart.destroy();
									}
									
									
									kendoChart.removeClass('wrs_grid_elementsOverFlow');
									
									
									/* Criando os Gauges*/
									
									if(typeGauge.active)
									{
										pathChart.html('');										
										kendoChart.addClass('wrs_grid_elementsOverFlow');
										pathChart.html($('<div/>',{'class':'row wrs_gauge_container'}));//EMPTY All chart
										

										var _data_gauge					=	tmpSeries.data;
											GAUGE_RADIAL.scale.max		=	parseInt(tmpSeries.max);
											GAUGE_RADIAL.scale.min		=	parseInt(tmpSeries.min);
											
											var _ranger					=	[];
											var _color					=	kendoUiTools.GAUGE_COLOR ;
											
											var g_range_from			=	origen_to_from	=	GAUGE_RADIAL.scale.min;
											var g_range_to				=	GAUGE_RADIAL.scale.max/_color;
											 
											
											if(!empty(headerIndex.field[infoFirst.value].c_parent)){
												var _paramColumn	=	headerIndex[headerIndex.field[infoFirst.value].c_parent];	
													title	+=	" ("+_paramColumn.title+")";
											}
											
											
											col_md	=	kendoUiTools.GAUGE_SIZE_BY_LINE;
											/*
											 * Colors a serem apresentadas na barra de inficadores dos valores
											 */
											for(var i=1; i<=_color;i++)
												{
														
														_ranger[_ranger.length]	=	{
																						from	: origen_to_from,
																						to		: g_range_to*i,
																						color	: color_ranger[i-1]
																					}
														
														origen_to_from		=	g_range_to*i;
												}
											
											if(!typeGauge.linear)
												{
													GAUGE_RADIAL.scale.ranges	=	_ranger;
												}
											
											var _div_legenda	=	$('<p/>',{'class':'col-md-12 text-center'});
											var info_legend		=	_data_gauge[_data_gauge.length-1].pointer;
											_div_legenda.append('<h3>'+title+'</h3>');
											for(info_legend_line in info_legend)
												{
													var __color	=	 info_legend[info_legend_line].color;
													var __field	=	 info_legend[info_legend_line].field;
													_div_legenda.append('<i class="fa " style="width:10px; height:10px; background: '+__color+';"> </i> <strong>'+headerIndex.field[__field].title+'</strong>   ');
												
													
												}
											
											pathChart.find('.row').append(_div_legenda);
											
											for(lineDataGauge in _data_gauge)
												{
												 	var _div	=	$('<div/>',{'class':'col-md-'+col_md+' gauge_chart'}).height(200);
												 
												 		_div.attr('title',_data_gauge[lineDataGauge].title);
												 		
												 		pathChart.find('.row').append(_div);
												 		GAUGE_RADIAL.pointer	=	_data_gauge[lineDataGauge].pointer;

												 		if(typeGauge.linear){
												 			_div.kendoLinearGauge(GAUGE_RADIAL);	
												 			
												 		}else{
												 			_div.kendoRadialGauge(GAUGE_RADIAL);
												 		}
												
												}
										
											
											pathChart.find('.gauge_chart').each(function(){												
												var _div_title	=	$('<div/>',{'class':'gauge-title'}).html($(this).attr('title'));												
												$(this).append(_div_title);
												
												
												
											});
										return true;
									}											
									
									//END Gauges
									
									
									
									
									
									
									/*
									 * Reordenação de coluna com os dados
									 */
									var reorderColumn		=	 function(column,indexActive)
									{
										var tmp_Column	=	[];
											measures_receive.find('option').each(function(){
												if(empty(indexActive)){
													for(lineCol in column){
														if($(this).val()==column[lineCol].LEVEL_FULL){
															tmp_Column[tmp_Column.length]	=	column[lineCol];
														}
													}
												}else{
													tmp_Column[$(this).val()]	=	column[$(this).val()];
												}
											});
										return tmp_Column;
									}
									
									
									
						        	
						        	
									
										/*
										 * 
										 * Verificando se é alguns das confirurações a ser personalizada por slice 
										 */
									
										if(pie_donut)
										{
											pathChart.html($('<div/>',{'class':'row'}));//EMPTY All chart
											/*
											 * Campos necessário para fazer essa operação
											 * wrs_field
											 * level_full
											 * 
											 */
											var _columns		=	[];
											
												if(!empty(headerIndex[headerIndex.field[infoFirst.value].c_parent]))
													{
														var _paramColumn	=	headerIndex[headerIndex.field[infoFirst.value].c_parent];	
															_columns		=	_paramColumn.columns;
															_titleSubNivel	=	" ("+_paramColumn.title+")";
													}else{
														_columns		=	headerIndex.field;
													}
											
												_columns	=	reorderColumn(_columns);
											
											var order			=	0;
											
											
											
												
											/*
											 * Multiplos PIE
											 */	
											for(lineCol	in _columns)
												{
													//LEVEL_FULL
													//field
												
													if(array_find_data(tmpSeries,_columns[lineCol].field))
													{
														
														
														titleMultiple[chartSeries.length]	=	_columns[lineCol].title;			
														
														var getVals							=	tmpSeries[_columns[lineCol].field];
														var _merge							=	[];
														
														var _mergeChartConfigLegend			=	'';
														
														
														//Apenas para não dar erro
														try{
															_mergeChartConfigLegend	=	typeChart[getVals[0].level_full];
														}catch(e){
															_mergeChartConfigLegend='';
														}
														
														//Apenas para não dar erro 
														if(empty(getVals))
															{
																getVals	=	[];
																getVals[0]	=	{name:"" ,axis:""};
															}
														
														 
														
														
															
														
														_merge							=	$.extend( {}, 
																mergeChartConfigLegend(_mergeChartConfigLegend), 
																												{
																													data: getVals, 
																													name: getVals[0].name,
																													axis: getVals[0].axis
																												}
																										);

														chartSeries[chartSeries.length]		=	 [_merge];
													}
												}
									
											
										}else if(radar_polar){
											pathChart.html($('<div/>',{'class':'row'}));//EMPTY All chart

											tmpSeries	=	reorderColumn(tmpSeries,true);
											
											for(typeMesure in tmpSeries)
												{
													chartSeries[chartSeries.length]				=	tmpSeries[typeMesure];
													titleMultiple[titleMultiple.length]			=	chartTitles[typeMesure];
													toMergerRADARTmp[toMergerRADARTmp.length]	=	{seriesDefaults: {type: ChartDefault.data[typeMesure].type,template	:	"#= "+LABEL_FORMAT+" #"}};
													

												}
												
										}else if(bubble){
											chartSeries			=	[];
											chartSeries[0]		=	tmpSeries;
										}else{
											//Chart converncional sem ser o PIE, DONUT, RADAR
											chartSeries[0]	=	tmpSeries;
										}
										
										
										/*
										 * Gráficos diversos
										 */
										for(lineChart	in chartSeries)
										{
											
											/*
											 * Preparando para criar as multiplas BOXS pra os charts PIE, DONUTS, RADAR
											 */
												if(pie_donut || radar_polar)
													{	
														
														switch(chartSeries.length)
														{
															case 1 : col_md=12; break;
															case 2 : col_md=6;	break;
															case 3 : col_md=4;	break;
														}
														
														
														pathChart	=	$('<div/>',{'class':'col-md-'+col_md+' wrs_multiple_chart wrs_box_chart'+lineChart,'id':'wrs_box_chart'+lineChart}).height(ELEMENT.attr('chart-multiple-height'));
														title		=	_title+_titleSubNivel+' ( '+titleMultiple[lineChart]+' )';
														kendoChart.find('.row').append(pathChart);
														
														var __dchart = $('wrs_box_chart'+lineChart).data("kendoChart");
														
														if(!exist_in_array(exceptionChartResize(),getFisrtChartValue(ChartDefault)))//VErifica se é alguns charts que não precisa fazer o resize
															{
																if(__dchart) __dchart.destroy();
															}
														
														
														kendoChart.addClass('wrs_grid_elementsOverFlow');
													}
												
												if(radar_polar)
													{
														toMergerRADAR	=	{};
														toMergerRADAR	=	toMergerRADARTmp[lineChart];
													}
											
											var _paramKendoChart	=	{
																		  	theme		: 	CHART_THEME, 
															                title		: 	{text: title, color:'#222'},
															                legend		: 	legendChart,
															                series		: 	chartSeries[lineChart],
															                valueAxis	: 	paramChart['valueAxes'],
															                tooltip		: 	{
																			                    visible		: true,
																			                    format		: "{0}%",
																			                    template	: "#= category #: #= series.name #: #= "+LABEL_FORMAT+" #"
																			                },
															                categoryAxis: 	{
																			                    categories			: paramChart['categories'],
																			                    axisCrossingValues	: paramChart['axisCrossingValues']
																			                }
															            };	
											
											
											
											var kendoChartOptions		=	$.extend( true, {}, _paramKendoChart, toMergerRADAR );
											
											/*
											 * Gráfico de bolhas
											 */
											var ChartBubble	=	 {
									                title		: 	{text: title},
									                legend		: 	legendChart,
									                dataSource	: 	{data: ''},
									                series		: [{
													                    type			: "bubble",
													                    xField			: "cxField",
													                    yField			: "cyField",
													                    sizeField		: "csizeField",
													                    categoryField	: "title"
													                }],
									                xAxis		: {
									                	minorGridLines: {visible: true},
									                	majorGridLines: {visible: true},
									                	max:15,
									                	/*title: {
									                         text: " - "
									                     },*/
									                	min:-1,
									                	plotBands		:	[],
									                	axisCrossingValue : 0,
									                	color:'#aaa'

												                },
									                yAxis		: {
									                	plotBands		:	[],
									                	minorGridLines: {visible: true},
									                	majorGridLines: {visible: true},
									                	axisCrossingValue : 0,
/*									                	 title: {
									                         text: " - "
									                     },*/
									                	color:'#aaa',
									                	
									                		max:6,
									                		min:-5
												                },
									                tooltip		: {
													                    visible: true,
													                    format: "carregando...",
													                    opacity: 1
													                }
									            }; // END ChartBubble
											
												if(bubble)
												{
													kendoChartOptions	=	$.extend( true, {}, ChartBubble, chartSeries[0] );
													var _left	=	'-25px';
													pathChart.removeClass('hide-before-after');
													pathChart.addClass('buble-container-chart');

													if(empty(kendoChartOptions.xAxis.wrs_title))	kendoChartOptions.xAxis.wrs_title='';
													if(empty(kendoChartOptions.yAxis.wrs_title))	kendoChartOptions.yAxis.wrs_title='';
													
													
													
													
													
													
													kendoChartOptions.tooltip.format	=	"{3}<br>"+
																							LNG('CHART_BUBBLE_X')+" ("+kendoChartOptions.xAxis.wrs_title+") : <b>{0}</b> <br>"+
																							LNG('CHART_BUBBLE_Y')+" ("+kendoChartOptions.yAxis.wrs_title+") : <b>{1}</b> <br>"+
																							LNG('CHART_BUBBLE_TOTAL')+" ("+kendoChartOptions.yAxis.volume+")  : <b>{2:N0}</b>";
													
													//Title
													if(!empty(kendoChartOptions.xAxis.axisCrossingValue))
													{
														kendoChartOptions.xAxis.wrs_title+=' ('+kendoChartOptions.xAxis.axisCrossingValue+')';
													}
													
													if(!empty(kendoChartOptions.yAxis.axisCrossingValue))
													{
														kendoChartOptions.yAxis.wrs_title+=' ('+kendoChartOptions.yAxis.axisCrossingValue+')';
														_left	=	'-45px';
													}
													
													
													kendoChartOptions.title.text+=_titleSubNivel;
													
													
													//console.log('CHART',kendoChartOptions);
													
													
													//Value
													$(kendoChartTAG+':after').addRule({
													    content: kendoChartOptions.xAxis.wrs_title
													});
													//VAlue 
													$(kendoChartTAG+':before').addRule({
													    content: kendoChartOptions.yAxis.wrs_title,
													    left: _left
													});
												}

												pathChart.kendoChart(kendoChartOptions);
												
												//console.log('WRS CHART::',pathChart.data('kendoChart'));
												
												
												
		 								}
										
										createExportButtonWrsCHart();

										 
						        };
								//END createChartCommon
							
								//Manipulando os datos do GRáfico
								paramChart		=	WRSManipuleChart();
								
						        $(document).ready(createChartCommon);						        
						        $(document).bind("kendo:skinChange", createChartCommon);
						        $(window).on("resize", function(){kendo.resize(ELEMENT);});					        
						        ELEMENT.attr('chart','true');
	};