function empty(mixed_var) {
  //  discuss at: http://phpjs.org/functions/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman
  //    input by: LH
  //    input by: Stoyan Kyosev (http://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafal Kukawski
  //   example 1: empty(null);
  //   returns 1: true
  //   example 2: empty(undefined);
  //   returns 2: true
  //   example 3: empty([]);
  //   returns 3: true
  //   example 4: empty({});
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } });
  //   returns 5: false

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === 'object') {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}

//http://bootstraplovers.com/templates/assan-v1.7.5/

$('body').append('<div class="msdantas" style="position: relative; width: 300px; min-height:200px; border:1px solid #ccc; z-index:10000; background: #fff; top: 0px; right: 0px;"></div>');

var _PAGE	=	window.location.href;
	
//PEgando os LINK CSS
$('link').each(function(){
//	$('.msdantas').append($(this).attr('href')+'<br>');
});


//js
$('script').each(function(){
//	$('.msdantas').append($(this).attr('src')+'<br>');
});

//imagens
$('img').each(function(){
	//$('.msdantas').append($(this).attr('src')+'<br>');
});


//imagens
/*$('a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4, h5, h6,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr').each(function(){

	var _back_ground	=	 $(this).css('background');
	var _back_ground_image	=	 $(this).css('background-image');
	
	if(!empty(_back_ground)){
		$('.msdantas').append(_back_ground+'<br>');
	}
	
	if(!empty(_back_ground_image)){
		$('.msdantas').append(_back_ground_image+'<br>');
	}
});
*/

/*
$subject = $css;
$pattern = "/(url\((\"|'|)(.*?)(\"|'|)\))/Ui";

if(preg_match($pattern,$subject, $matches)){
	print_r($matches);
}*/

















