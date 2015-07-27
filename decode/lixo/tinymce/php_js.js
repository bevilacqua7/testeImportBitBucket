/**
 * Funções do site
 * @link http://phpjs.org/functions/str_replace/
 */


function strtolower(str) {
  //  discuss at: http://phpjs.org/functions/strtolower/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  //   example 1: strtolower('Kevin van Zonneveld');
  //   returns 1: 'kevin van zonneveld'

  return (str + '')
    .toLowerCase();
}

function strpos(haystack, needle, offset) {
  //  discuss at: http://phpjs.org/functions/strpos/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Daniel Esteban
  //   example 1: strpos('Kevin van Zonneveld', 'e', 5);
  //   returns 1: 14

  var i = (haystack + '')
    .indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}


function is_int(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_int/
  // original by: Alex
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
  
}


function isset() {
	  //  discuss at: http://phpjs.org/functions/isset/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: FremyCompany
	  // improved by: Onno Marsman
	  // improved by: Rafał Kukawski
	  //   example 1: isset( undefined, true);
	  //   returns 1: false
	  //   example 2: isset( 'Kevin van Zonneveld' );
	  //   returns 2: true

	  var a = arguments,
	    l = a.length,
	    i = 0,
	    undef;

	  if (l === 0) {
	    throw new Error('Empty isset');
	  }

	  while (i !== l) {
	    if (a[i] === undef || a[i] === null) {
	      return false;
	    }
	    i++;
	  }
	  return true;
	}


function str_replace(search, replace, subject, count) {
	  //  discuss at: http://phpjs.org/functions/str_replace/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Gabriel Paderni
	  // improved by: Philip Peterson
	  // improved by: Simon Willison (http://simonwillison.net)
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Onno Marsman
	  // improved by: Brett Zamir (http://brett-zamir.me)
	  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	  // bugfixed by: Anton Ongson
	  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // bugfixed by: Oleg Eremeev
	  //    input by: Onno Marsman
	  //    input by: Brett Zamir (http://brett-zamir.me)
	  //    input by: Oleg Eremeev
	  //        note: The count parameter must be passed as a string in order
	  //        note: to find a global variable in which the result will be given
	  //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
	  //   returns 1: 'Kevin.van.Zonneveld'
	  //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
	  //   returns 2: 'hemmo, mars'

	  var i = 0,
	    j = 0,
	    temp = '',
	    repl = '',
	    sl = 0,
	    fl = 0,
	    f = [].concat(search),
	    r = [].concat(replace),
	    s = subject,
	    ra = Object.prototype.toString.call(r) === '[object Array]',
	    sa = Object.prototype.toString.call(s) === '[object Array]';
	  s = [].concat(s);
	  if (count) {
	    this.window[count] = 0;
	  }

	  for (i = 0, sl = s.length; i < sl; i++) {
	    if (s[i] === '') {
	      continue;
	    }
	    for (j = 0, fl = f.length; j < fl; j++) {
	      temp = s[i] + '';
	      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
	      s[i] = (temp)
	        .split(f[j])
	        .join(repl);
	      if (count && s[i] !== temp) {
	        this.window[count] += (temp.length - s[i].length) / f[j].length;
	      }
	    }
	  }
	  return sa ? s : s[0];
	}



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


function is_array(mixed_var) {
	  //  discuss at: http://phpjs.org/functions/is_array/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Legaev Andrey
	  // improved by: Onno Marsman
	  // improved by: Brett Zamir (http://brett-zamir.me)
	  // improved by: Nathan Sepulveda
	  // improved by: Brett Zamir (http://brett-zamir.me)
	  // bugfixed by: Cord
	  // bugfixed by: Manish
	  // bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //        note: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
	  //        note: return true in this function (except for objects which inherit properties, being thus used as objects),
	  //        note: unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays
	  //        note: will return true
	  //   example 1: is_array(['Kevin', 'van', 'Zonneveld']);
	  //   returns 1: true
	  //   example 2: is_array('Kevin van Zonneveld');
	  //   returns 2: false
	  //   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
	  //   returns 3: true
	  //   example 4: is_array(function tmp_a(){this.name = 'Kevin'});
	  //   returns 4: false

	  var ini,
	    _getFuncName = function(fn) {
	      var name = (/\W*function\s+([\w\$]+)\s*\(/)
	        .exec(fn);
	      if (!name) {
	        return '(Anonymous)';
	      }
	      return name[1];
	    };
	  _isArray = function(mixed_var) {
	    // return Object.prototype.toString.call(mixed_var) === '[object Array]';
	    // The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
	    // Null, Not an object, no length property so couldn't be an Array (or String)
	    if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
	      return false;
	    }
	    var len = mixed_var.length;
	    mixed_var[mixed_var.length] = 'bogus';
	    // The only way I can think of to get around this (or where there would be trouble) would be to have an object defined
	    // with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom
	    // setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives
	    // and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
	    if (len !== mixed_var.length) { // We know it's an array since length auto-changed with the addition of a
	      // numeric property at its length end, so safely get rid of our bogus element
	      mixed_var.length -= 1;
	      return true;
	    }
	    // Get rid of the property we added onto a non-array object; only possible
	    // side-effect is if the user adds back the property later, it will iterate
	    // this property in the older order placement in IE (an order which should not
	    // be depended on anyways)
	    delete mixed_var[mixed_var.length];
	    return false;
	  };

	  if (!mixed_var || typeof mixed_var !== 'object') {
	    return false;
	  }

	  // BEGIN REDUNDANT
	  this.php_js = this.php_js || {};
	  this.php_js.ini = this.php_js.ini || {};
	  // END REDUNDANT

	  ini = this.php_js.ini['phpjs.objectsAsArrays'];

	  return _isArray(mixed_var) ||
	  // Allow returning true unless user has called
	  // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
	  ((!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays
	    (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
	      'off')))) && (
	    Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) ===
	    'Object' // Most likely a literal and intended as assoc. array
	  ));
	}



function js_rand(min, max) {
	  //  discuss at: http://phpjs.org/functions/rand/
	  // original by: Leslie Hoare
	  // bugfixed by: Onno Marsman
	  //        note: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
	  //   example 1: rand(1, 1);
	  //   returns 1: 1

	  var argc = arguments.length;
	  if (argc === 0) {
	    min = 0;
	    max = 2147483647;
	  } else if (argc === 1) {
	    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
	  }
	  return Math.floor(Math.random() * (max - min + 1)) + min;

	  /*
	  // See note above for an explanation of the following alternative code

	  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
	  // -    depends on: srand
	  // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
	  var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

	  if (!this.php_js || this.php_js.rand_seed === undefined) {
	    this.srand();
	  }
	  rand_seed = this.php_js.rand_seed;

	  var argc = arguments.length;
	  if (argc === 1) {
	    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
	  }

	  var do_rand = function (ctx) {
	    return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
	  };

	  var php_rand = function (ctxArg) { // php_rand_r
	    this.php_js.rand_seed = do_rand(ctxArg);
	    return parseInt(this.php_js.rand_seed, 10);
	  };

	  var number = php_rand(rand_seed);

	  if (argc === 2) {
	    number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
	  }
	  return number;
	  */
	}



function explode(delimiter, string, limit) {
	  //  discuss at: http://phpjs.org/functions/explode/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //   example 1: explode(' ', 'Kevin van Zonneveld');
	  //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

	  if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
	  if (delimiter === '' || delimiter === false || delimiter === null) return false;
	  if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
	    'object') {
	    return {
	      0: ''
	    };
	  }
	  if (delimiter === true) delimiter = '1';

	  // Here we go...
	  delimiter += '';
	  string += '';

	  var s = string.split(delimiter);

	  if (typeof limit === 'undefined') return s;

	  // Support for limit
	  if (limit === 0) limit = 1;

	  // Positive limit
	  if (limit > 0) {
	    if (limit >= s.length) return s;
	    return s.slice(0, limit - 1)
	      .concat([s.slice(limit - 1)
	        .join(delimiter)
	      ]);
	  }

	  // Negative limit
	  if (-limit >= s.length) return [];

	  s.splice(s.length + limit);
	  return s;
	}



function implode(glue, pieces) {
	  //  discuss at: http://phpjs.org/functions/implode/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Waldo Malqui Silva
	  // improved by: Itsacon (http://www.itsacon.net/)
	  // bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //   example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
	  //   returns 1: 'Kevin van Zonneveld'
	  //   example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
	  //   returns 2: 'Kevin van Zonneveld'

	  var i = '',
	    retVal = '',
	    tGlue = '';
	  if (arguments.length === 1) {
	    pieces = glue;
	    glue = '';
	  }
	  if (typeof pieces === 'object') {
	    if (Object.prototype.toString.call(pieces) === '[object Array]') {
	      return pieces.join(glue);
	    }
	    for (i in pieces) {
	      retVal += tGlue + pieces[i];
	      tGlue = glue;
	    }
	    return retVal;
	  }
	  return pieces;
	}




function base64_decode(data) {
	  //  discuss at: http://phpjs.org/functions/base64_decode/
	  // original by: Tyler Akins (http://rumkin.com)
	  // improved by: Thunder.m
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //    input by: Aman Gupta
	  //    input by: Brett Zamir (http://brett-zamir.me)
	  // bugfixed by: Onno Marsman
	  // bugfixed by: Pellentesque Malesuada
	  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
	  //   returns 1: 'Kevin van Zonneveld'
	  //   example 2: base64_decode('YQ===');
	  //   returns 2: 'a'

	  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	    ac = 0,
	    dec = '',
	    tmp_arr = [];

	  if (!data) {
	    return data;
	  }

	  data += '';

	  do { // unpack four hexets into three octets using index points in b64
	    h1 = b64.indexOf(data.charAt(i++));
	    h2 = b64.indexOf(data.charAt(i++));
	    h3 = b64.indexOf(data.charAt(i++));
	    h4 = b64.indexOf(data.charAt(i++));

	    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

	    o1 = bits >> 16 & 0xff;
	    o2 = bits >> 8 & 0xff;
	    o3 = bits & 0xff;

	    if (h3 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1);
	    } else if (h4 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2);
	    } else {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	    }
	  } while (i < data.length);

	  dec = tmp_arr.join('');

	  return dec.replace(/\0+$/, '');
	}


function base64_encode(data) {
	  //  discuss at: http://phpjs.org/functions/base64_encode/
	  // original by: Tyler Akins (http://rumkin.com)
	  // improved by: Bayron Guevara
	  // improved by: Thunder.m
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: Rafał Kukawski (http://kukawski.pl)
	  // bugfixed by: Pellentesque Malesuada
	  //   example 1: base64_encode('Kevin van Zonneveld');
	  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	  //   example 2: base64_encode('a');
	  //   returns 2: 'YQ=='

	  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	    ac = 0,
	    enc = '',
	    tmp_arr = [];

	  if (!data) {
	    return data;
	  }

	  do { // pack three octets into four hexets
	    o1 = data.charCodeAt(i++);
	    o2 = data.charCodeAt(i++);
	    o3 = data.charCodeAt(i++);

	    bits = o1 << 16 | o2 << 8 | o3;

	    h1 = bits >> 18 & 0x3f;
	    h2 = bits >> 12 & 0x3f;
	    h3 = bits >> 6 & 0x3f;
	    h4 = bits & 0x3f;

	    // use hexets to index into b64, and append result to encoded string
	    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	  } while (i < data.length);

	  enc = tmp_arr.join('');

	  var r = data.length % 3;

	  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	}



function array_unique(inputArr) {
	  //  discuss at: http://phpjs.org/functions/array_unique/
	  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	  //    input by: duncan
	  //    input by: Brett Zamir (http://brett-zamir.me)
	  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // bugfixed by: Nate
	  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // bugfixed by: Brett Zamir (http://brett-zamir.me)
	  // improved by: Michael Grier
	  //        note: The second argument, sort_flags is not implemented;
	  //        note: also should be sorted (asort?) first according to docs
	  //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
	  //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
	  //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
	  //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

	  var key = '',
	    tmp_arr2 = {},
	    val = '';

	  var __array_search = function(needle, haystack) {
	    var fkey = '';
	    for (fkey in haystack) {
	      if (haystack.hasOwnProperty(fkey)) {
	        if ((haystack[fkey] + '') === (needle + '')) {
	          return fkey;
	        }
	      }
	    }
	    return false;
	  };

	  for (key in inputArr) {
	    if (inputArr.hasOwnProperty(key)) {
	      val = inputArr[key];
	      if (false === __array_search(val, tmp_arr2)) {
	        tmp_arr2[key] = val;
	      }
	    }
	  }

	  return tmp_arr2;
	}



function array_uintersect(arr1) {
	  //  discuss at: http://phpjs.org/functions/array_uintersect/
	  // original by: Brett Zamir (http://brett-zamir.me)
	  // bugfixed by: Demosthenes Koptsis
	  //   example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
	  //   example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
	  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
	  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

	  var retArr = {},
	    arglm1 = arguments.length - 1,
	    arglm2 = arglm1 - 1,
	    cb = arguments[arglm1],
	    k1 = '',
	    i = 1,
	    arr = {},
	    k = '';

	  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
	    cb[0]][cb[1]] : cb;

	  arr1keys: for (k1 in arr1) {
	    arrs: for (i = 1; i < arglm1; i++) {
	      arr = arguments[i];
	      for (k in arr) {
	        if (cb(arr[k], arr1[k1]) === 0) {
	          if (i === arglm2) {
	            retArr[k1] = arr1[k1];
	          }
	          // If the innermost loop always leads at least once to an equal value, continue the loop until done
	          continue arrs;
	        }
	      }
	      // If it reaches here, it wasn't found in at least one array, so try next value
	      continue arr1keys;
	    }
	  }

	  return retArr;
	}


function strcasecmp(f_string1, f_string2) {
	  //  discuss at: http://phpjs.org/functions/strcasecmp/
	  // original by: Martijn Wieringa
	  // bugfixed by: Onno Marsman
	  //   example 1: strcasecmp('Hello', 'hello');
	  //   returns 1: 0

	  var string1 = (f_string1 + '')
	    .toLowerCase();
	  var string2 = (f_string2 + '')
	    .toLowerCase();

	  if (string1 > string2) {
	    return 1;
	  } else if (string1 == string2) {
	    return 0;
	  }

	  return -1;
	}



function json_encode(mixed_val) {
	  //       discuss at: http://phpjs.org/functions/json_encode/
	  //      original by: Public Domain (http://www.json.org/json2.js)
	  // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //      improved by: Michael White
	  //         input by: felix
	  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //        example 1: json_encode('Kevin');
	  //        returns 1: '"Kevin"'

	  /*
	    http://www.JSON.org/json2.js
	    2008-11-19
	    Public Domain.
	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	    See http://www.JSON.org/js.html
	  */
	  var retVal, json = this.window.JSON;
	  try {
	    if (typeof json === 'object' && typeof json.stringify === 'function') {
	      retVal = json.stringify(mixed_val); // Errors will not be caught here if our own equivalent to resource
	      //  (an instance of PHPJS_Resource) is used
	      if (retVal === undefined) {
	        throw new SyntaxError('json_encode');
	      }
	      return retVal;
	    }

	    var value = mixed_val;

	    var quote = function(string) {
	      var escapable =
	        /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	      var meta = { // table of character substitutions
	        '\b': '\\b',
	        '\t': '\\t',
	        '\n': '\\n',
	        '\f': '\\f',
	        '\r': '\\r',
	        '"': '\\"',
	        '\\': '\\\\'
	      };

	      escapable.lastIndex = 0;
	      return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
	        var c = meta[a];
	        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
	          .toString(16))
	          .slice(-4);
	      }) + '"' : '"' + string + '"';
	    };

	    var str = function(key, holder) {
	      var gap = '';
	      var indent = '    ';
	      var i = 0; // The loop counter.
	      var k = ''; // The member key.
	      var v = ''; // The member value.
	      var length = 0;
	      var mind = gap;
	      var partial = [];
	      var value = holder[key];

	      // If the value has a toJSON method, call it to obtain a replacement value.
	      if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
	        value = value.toJSON(key);
	      }

	      // What happens next depends on the value's type.
	      switch (typeof value) {
	        case 'string':
	          return quote(value);

	        case 'number':
	          // JSON numbers must be finite. Encode non-finite numbers as null.
	          return isFinite(value) ? String(value) : 'null';

	        case 'boolean':
	        case 'null':
	          // If the value is a boolean or null, convert it to a string. Note:
	          // typeof null does not produce 'null'. The case is included here in
	          // the remote chance that this gets fixed someday.
	          return String(value);

	        case 'object':
	          // If the type is 'object', we might be dealing with an object or an array or
	          // null.
	          // Due to a specification blunder in ECMAScript, typeof null is 'object',
	          // so watch out for that case.
	          if (!value) {
	            return 'null';
	          }
	          if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&
	            value instanceof window.PHPJS_Resource)) {
	            throw new SyntaxError('json_encode');
	          }

	          // Make an array to hold the partial results of stringifying this object value.
	          gap += indent;
	          partial = [];

	          // Is the value an array?
	          if (Object.prototype.toString.apply(value) === '[object Array]') {
	            // The value is an array. Stringify every element. Use null as a placeholder
	            // for non-JSON values.
	            length = value.length;
	            for (i = 0; i < length; i += 1) {
	              partial[i] = str(i, value) || 'null';
	            }

	            // Join all of the elements together, separated with commas, and wrap them in
	            // brackets.
	            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind +
	              ']' : '[' + partial.join(',') + ']';
	            gap = mind;
	            return v;
	          }

	          // Iterate through all of the keys in the object.
	          for (k in value) {
	            if (Object.hasOwnProperty.call(value, k)) {
	              v = str(k, value);
	              if (v) {
	                partial.push(quote(k) + (gap ? ': ' : ':') + v);
	              }
	            }
	          }

	          // Join all of the member texts together, separated with commas,
	          // and wrap them in braces.
	          v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	            '{' + partial.join(',') + '}';
	          gap = mind;
	          return v;
	        case 'undefined':
	          // Fall-through
	        case 'function':
	          // Fall-through
	        default:
	          throw new SyntaxError('json_encode');
	      }
	    };

	    // Make a fake root object containing our value under the key of ''.
	    // Return the result of stringifying the value.
	    return str('', {
	      '': value
	    });

	  } catch (err) { // Todo: ensure error handling above throws a SyntaxError in all cases where it could
	    // (i.e., when the JSON global is not available and there is an error)
	    if (!(err instanceof SyntaxError)) {
	      throw new Error('Unexpected error type in json_encode()');
	    }
	    this.php_js = this.php_js || {};
	    this.php_js.last_error_json = 4; // usable by json_last_error()
	    return null;
	  }
	}



function count(mixed_var, mode) {
	  //  discuss at: http://phpjs.org/functions/count/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //    input by: Waldo Malqui Silva
	  //    input by: merabi
	  // bugfixed by: Soren Hansen
	  // bugfixed by: Olivier Louvignes (http://mg-crea.com/)
	  // improved by: Brett Zamir (http://brett-zamir.me)
	  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
	  //   returns 1: 6
	  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
	  //   returns 2: 6

	  var key, cnt = 0;

	  if (mixed_var === null || typeof mixed_var === 'undefined') {
	    return 0;
	  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
	    return 1;
	  }

	  if (mode === 'COUNT_RECURSIVE') {
	    mode = 1;
	  }
	  if (mode != 1) {
	    mode = 0;
	  }

	  for (key in mixed_var) {
	    if (mixed_var.hasOwnProperty(key)) {
	      cnt++;
	      if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
	        Object)) {
	        cnt += this.count(mixed_var[key], 1);
	      }
	    }
	  }

	  return cnt;
	}
	
	
	
	
	function sprintf() {
  //  discuss at: http://phpjs.org/functions/sprintf/
  // original by: Ash Searle (http://hexmen.com/blog/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Dj
  // improved by: Allidylls
  //    input by: Paulo Freitas
  //    input by: Brett Zamir (http://brett-zamir.me)
  //   example 1: sprintf("%01.2f", 123.1);
  //   returns 1: 123.10
  //   example 2: sprintf("[%10s]", 'monkey');
  //   returns 2: '[    monkey]'
  //   example 3: sprintf("[%'#10s]", 'monkey');
  //   returns 3: '[####monkey]'
  //   example 4: sprintf("%d", 123456789012345);
  //   returns 4: '123456789012345'
  //   example 5: sprintf('%-03s', 'E');
  //   returns 5: 'E00'

  var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
  var a = arguments;
  var i = 0;
  var format = a[i++];

  // pad()
  var pad = function(str, len, chr, leftJustify) {
    if (!chr) {
      chr = ' ';
    }
    var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)
      .join(chr);
    return leftJustify ? str + padding : padding + str;
  };

  // justify()
  var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
    var diff = minWidth - value.length;
    if (diff > 0) {
      if (leftJustify || !zeroPad) {
        value = pad(value, minWidth, customPadChar, leftJustify);
      } else {
        value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
      }
    }
    return value;
  };

  // formatBaseX()
  var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
    // Note: casts negative numbers to positive ones
    var number = value >>> 0;
    prefix = prefix && number && {
      '2': '0b',
      '8': '0',
      '16': '0x'
    }[base] || '';
    value = prefix + pad(number.toString(base), precision || 0, '0', false);
    return justify(value, prefix, leftJustify, minWidth, zeroPad);
  };

  // formatString()
  var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
    if (precision != null) {
      value = value.slice(0, precision);
    }
    return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
  };

  // doFormat()
  var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
    var number, prefix, method, textTransform, value;

    if (substring === '%%') {
      return '%';
    }

    // parse flags
    var leftJustify = false;
    var positivePrefix = '';
    var zeroPad = false;
    var prefixBaseX = false;
    var customPadChar = ' ';
    var flagsl = flags.length;
    for (var j = 0; flags && j < flagsl; j++) {
      switch (flags.charAt(j)) {
        case ' ':
          positivePrefix = ' ';
          break;
        case '+':
          positivePrefix = '+';
          break;
        case '-':
          leftJustify = true;
          break;
        case "'":
          customPadChar = flags.charAt(j + 1);
          break;
        case '0':
          zeroPad = true;
          customPadChar = '0';
          break;
        case '#':
          prefixBaseX = true;
          break;
      }
    }

    // parameters may be null, undefined, empty-string or real valued
    // we want to ignore null, undefined and empty-string values
    if (!minWidth) {
      minWidth = 0;
    } else if (minWidth === '*') {
      minWidth = +a[i++];
    } else if (minWidth.charAt(0) == '*') {
      minWidth = +a[minWidth.slice(1, -1)];
    } else {
      minWidth = +minWidth;
    }

    // Note: undocumented perl feature:
    if (minWidth < 0) {
      minWidth = -minWidth;
      leftJustify = true;
    }

    if (!isFinite(minWidth)) {
      throw new Error('sprintf: (minimum-)width must be finite');
    }

    if (!precision) {
      precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
    } else if (precision === '*') {
      precision = +a[i++];
    } else if (precision.charAt(0) == '*') {
      precision = +a[precision.slice(1, -1)];
    } else {
      precision = +precision;
    }

    // grab value using valueIndex if required?
    value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

    switch (type) {
      case 's':
        return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
      case 'c':
        return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
      case 'b':
        return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
      case 'o':
        return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
      case 'x':
        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
      case 'X':
        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
          .toUpperCase();
      case 'u':
        return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
      case 'i':
      case 'd':
        number = +value || 0;
        number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
        prefix = number < 0 ? '-' : positivePrefix;
        value = prefix + pad(String(Math.abs(number)), precision, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
      case 'e':
      case 'E':
      case 'f': // Should handle locales (as per setlocale)
      case 'F':
      case 'g':
      case 'G':
        number = +value;
        prefix = number < 0 ? '-' : positivePrefix;
        method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
        value = prefix + Math.abs(number)[method](precision);
        return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
      default:
        return substring;
    }
  };

  return format.replace(regex, doFormat);
}
	
	
	
	
	
	function substr(str, start, len) {
		  //  discuss at: http://phpjs.org/functions/substr/
		  //     version: 909.322
		  // original by: Martijn Wieringa
		  // bugfixed by: T.Wild
		  // improved by: Onno Marsman
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  //  revised by: Theriault
		  //        note: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
		  //   example 1: substr('abcdef', 0, -1);
		  //   returns 1: 'abcde'
		  //   example 2: substr(2, 0, -6);
		  //   returns 2: false
		  //   example 3: ini_set('unicode.semantics',  'on');
		  //   example 3: substr('a\uD801\uDC00', 0, -1);
		  //   returns 3: 'a'
		  //   example 4: ini_set('unicode.semantics',  'on');
		  //   example 4: substr('a\uD801\uDC00', 0, 2);
		  //   returns 4: 'a\uD801\uDC00'
		  //   example 5: ini_set('unicode.semantics',  'on');
		  //   example 5: substr('a\uD801\uDC00', -1, 1);
		  //   returns 5: '\uD801\uDC00'
		  //   example 6: ini_set('unicode.semantics',  'on');
		  //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
		  //   returns 6: '\uD801\uDC00z'
		  //   example 7: ini_set('unicode.semantics',  'on');
		  //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
		  //   returns 7: '\uD801\uDC00z'

		  var i = 0,
		    allBMP = true,
		    es = 0,
		    el = 0,
		    se = 0,
		    ret = '';
		  str += '';
		  var end = str.length;

		  // BEGIN REDUNDANT
		  this.php_js = this.php_js || {};
		  this.php_js.ini = this.php_js.ini || {};
		  // END REDUNDANT
		  switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
		    case 'on':
		      // Full-blown Unicode including non-Basic-Multilingual-Plane characters
		      // strlen()
		      for (i = 0; i < str.length; i++) {
		        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
		          allBMP = false;
		          break;
		        }
		      }

		      if (!allBMP) {
		        if (start < 0) {
		          for (i = end - 1, es = (start += end); i >= es; i--) {
		            if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
		              start--;
		              es--;
		            }
		          }
		        } else {
		          var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
		          while ((surrogatePairs.exec(str)) != null) {
		            var li = surrogatePairs.lastIndex;
		            if (li - 2 < start) {
		              start++;
		            } else {
		              break;
		            }
		          }
		        }

		        if (start >= end || start < 0) {
		          return false;
		        }
		        if (len < 0) {
		          for (i = end - 1, el = (end += len); i >= el; i--) {
		            if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
		              end--;
		              el--;
		            }
		          }
		          if (start > end) {
		            return false;
		          }
		          return str.slice(start, end);
		        } else {
		          se = start + len;
		          for (i = start; i < se; i++) {
		            ret += str.charAt(i);
		            if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
		              se++; // Go one further, since one of the "characters" is part of a surrogate pair
		            }
		          }
		          return ret;
		        }
		        break;
		      }
		      // Fall-through
		    case 'off':
		      // assumes there are no non-BMP characters;
		      //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
		    default:
		      if (start < 0) {
		        start += end;
		      }
		      end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
		      // PHP returns false if start does not fall within the string.
		      // PHP returns false if the calculated end comes before the calculated start.
		      // PHP returns an empty string if start and end are the same.
		      // Otherwise, PHP returns the portion of the string from start to end.
		      return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
		  }
		  return undefined; // Please Netbeans
		}
	
	
	
	
	
	function number_format(number, decimals, dec_point, thousands_sep) {
		  //  discuss at: http://phpjs.org/functions/number_format/
		  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: davook
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  // improved by: Theriault
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // bugfixed by: Michael White (http://getsprink.com)
		  // bugfixed by: Benjamin Lupton
		  // bugfixed by: Allan Jensen (http://www.winternet.no)
		  // bugfixed by: Howard Yeend
		  // bugfixed by: Diogo Resende
		  // bugfixed by: Rival
		  // bugfixed by: Brett Zamir (http://brett-zamir.me)
		  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		  //  revised by: Luke Smith (http://lucassmith.name)
		  //    input by: Kheang Hok Chin (http://www.distantia.ca/)
		  //    input by: Jay Klehr
		  //    input by: Amir Habibi (http://www.residence-mixte.com/)
		  //    input by: Amirouche
		  //   example 1: number_format(1234.56);
		  //   returns 1: '1,235'
		  //   example 2: number_format(1234.56, 2, ',', ' ');
		  //   returns 2: '1 234,56'
		  //   example 3: number_format(1234.5678, 2, '.', '');
		  //   returns 3: '1234.57'
		  //   example 4: number_format(67, 2, ',', '.');
		  //   returns 4: '67,00'
		  //   example 5: number_format(1000);
		  //   returns 5: '1,000'
		  //   example 6: number_format(67.311, 2);
		  //   returns 6: '67.31'
		  //   example 7: number_format(1000.55, 1);
		  //   returns 7: '1,000.6'
		  //   example 8: number_format(67000, 5, ',', '.');
		  //   returns 8: '67.000,00000'
		  //   example 9: number_format(0.9, 0);
		  //   returns 9: '1'
		  //  example 10: number_format('1.20', 2);
		  //  returns 10: '1.20'
		  //  example 11: number_format('1.20', 4);
		  //  returns 11: '1.2000'
		  //  example 12: number_format('1.2000', 3);
		  //  returns 12: '1.200'
		  //  example 13: number_format('1 000,50', 2, '.', ' ');
		  //  returns 13: '100 050.00'
		  //  example 14: number_format(1e-8, 8, '.', '');
		  //  returns 14: '0.00000001'

		  number = (number + '')
		    .replace(/[^0-9+\-Ee.]/g, '');
		  var n = !isFinite(+number) ? 0 : +number,
		    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		    s = '',
		    toFixedFix = function(n, prec) {
		      var k = Math.pow(10, prec);
		      return '' + (Math.round(n * k) / k)
		        .toFixed(prec);
		    };
		  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
		  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		    .split('.');
		  if (s[0].length > 3) {
		    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		  }
		  if ((s[1] || '')
		    .length < prec) {
		    s[1] = s[1] || '';
		    s[1] += new Array(prec - s[1].length + 1)
		      .join('0');
		  }
		  return s.join(dec);
		}	
	
	
	
	
	
	function strspn(str1, str2, start, lgth) {
		  //  discuss at: http://phpjs.org/functions/strspn/
		  // original by: Valentina De Rosa
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  //   example 1: strspn('42 is the answer, what is the question ...', '1234567890');
		  //   returns 1: 2
		  //   example 2: strspn('foo', 'o', 1, 2);
		  //   returns 2: 2

		  var found;
		  var stri;
		  var strj;
		  var j = 0;
		  var i = 0;

		  start = start ? (start < 0 ? (str1.length + start) : start) : 0;
		  lgth = lgth ? ((lgth < 0) ? (str1.length + lgth - start) : lgth) : str1.length - start;
		  str1 = str1.substr(start, lgth);

		  for (i = 0; i < str1.length; i++) {
		    found = 0;
		    stri = str1.substring(i, i + 1);
		    for (j = 0; j <= str2.length; j++) {
		      strj = str2.substring(j, j + 1);
		      if (stri == strj) {
		        found = 1;
		        break;
		      }
		    }
		    if (found != 1) {
		      return i;
		    }
		  }

		  return i;
		}
	
	
	
	
	
	function strlen(string) {
		  //  discuss at: http://phpjs.org/functions/strlen/
		  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: Sakimori
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  //    input by: Kirk Strobeck
		  // bugfixed by: Onno Marsman
		  //  revised by: Brett Zamir (http://brett-zamir.me)
		  //        note: May look like overkill, but in order to be truly faithful to handling all Unicode
		  //        note: characters and to this function in PHP which does not count the number of bytes
		  //        note: but counts the number of characters, something like this is really necessary.
		  //   example 1: strlen('Kevin van Zonneveld');
		  //   returns 1: 19
		  //   example 2: ini_set('unicode.semantics', 'on');
		  //   example 2: strlen('A\ud87e\udc04Z');
		  //   returns 2: 3

		  var str = string + '';
		  var i = 0,
		    chr = '',
		    lgth = 0;

		  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini[
		    'unicode.semantics'].local_value.toLowerCase() !== 'on') {
		    return string.length;
		  }

		  var getWholeChar = function(str, i) {
		    var code = str.charCodeAt(i);
		    var next = '',
		      prev = '';
		    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
		      if (str.length <= (i + 1)) {
		        throw 'High surrogate without following low surrogate';
		      }
		      next = str.charCodeAt(i + 1);
		      if (0xDC00 > next || next > 0xDFFF) {
		        throw 'High surrogate without following low surrogate';
		      }
		      return str.charAt(i) + str.charAt(i + 1);
		    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
		      if (i === 0) {
		        throw 'Low surrogate without preceding high surrogate';
		      }
		      prev = str.charCodeAt(i - 1);
		      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
		        throw 'Low surrogate without preceding high surrogate';
		      }
		      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
		    }
		    return str.charAt(i);
		  };

		  for (i = 0, lgth = 0; i < str.length; i++) {
		    if ((chr = getWholeChar(str, i)) === false) {
		      continue;
		    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
		    lgth++;
		  }
		  return lgth;
		}
		
		
		
function sort(inputArr, sort_flags) {
  //  discuss at: http://phpjs.org/functions/sort/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: SORT_STRING (as well as natsort and natcasesort) might also be
  //        note: integrated into all of these functions by adapting the code at
  //        note: http://sourcefrog.net/projects/natsort/natcompare.js
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //        note: Since JS objects' keys are always strings, and (the
  //        note: default) SORT_REGULAR flag distinguishes by key type,
  //        note: if the content is a numeric string, we treat the
  //        note: "original type" as numeric.
  //  depends on: i18n_loc_get_default
  //   example 1: var arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: sort(arr);
  //   example 1: $result = arr;
  //   returns 1: ['Kevin', 'Zonneveld', 'van']
  //   example 2: ini_set('phpjs.strictForIn', true);
  //   example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 2: sort(fruits);
  //   example 2: $result = fruits;
  //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}

  var valArr = [],
    keyArr = [],
    k = '',
    i = 0,
    sorter = false,
    that = this,
    strictForIn = false,
    populateArr = [];

  switch (sort_flags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function(a, b) {
        return that.strnatcmp(a, b);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
      var loc = this.i18n_loc_get_default();
      sorter = this.php_js.i18nLocales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function(a, b) {
        return (a - b);
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
    default:
      sorter = function(a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // BEGIN REDUNDANT
  try {
    this.php_js = this.php_js || {};
  } catch (e) {
    this.php_js = {};
  }

  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return strictForIn || populateArr;
}



function strcmp(str1, str2) {
  //  discuss at: http://phpjs.org/functions/strcmp/
  // original by: Waldo Malqui Silva
  //    input by: Steve Hilder
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: gorthaur
  //   example 1: strcmp( 'waldo', 'owald' );
  //   returns 1: 1
  //   example 2: strcmp( 'owald', 'waldo' );
  //   returns 2: -1

  return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}


function strnatcmp(f_string1, f_string2, f_version) {
  //  discuss at: http://phpjs.org/functions/strnatcmp/
  // original by: Martijn Wieringa
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // bugfixed by: Onno Marsman
  //  depends on: strcmp
  //        note: Added f_version argument against code guidelines, because it's so neat
  //   example 1: strnatcmp('Price 12.9', 'Price 12.15');
  //   returns 1: 1
  //   example 2: strnatcmp('Price 12.09', 'Price 12.15');
  //   returns 2: -1
  //   example 3: strnatcmp('Price 12.90', 'Price 12.15');
  //   returns 3: 1
  //   example 4: strnatcmp('Version 12.9', 'Version 12.15', true);
  //   returns 4: -6
  //   example 5: strnatcmp('Version 12.15', 'Version 12.9', true);
  //   returns 5: 6

  var i = 0;

  if (f_version == undefined) {
    f_version = false;
  }

  var __strnatcmp_split = function(f_string) {
    var result = [];
    var buffer = '';
    var chr = '';
    var i = 0,
      f_stringl = 0;

    var text = true;

    f_stringl = f_string.length;
    for (i = 0; i < f_stringl; i++) {
      chr = f_string.substring(i, i + 1);
      if (chr.match(/\d/)) {
        if (text) {
          if (buffer.length > 0) {
            result[result.length] = buffer;
            buffer = '';
          }

          text = false;
        }
        buffer += chr;
      } else if ((text == false) && (chr === '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i +
          2)
        .match(/\d/))) {
        result[result.length] = buffer;
        buffer = '';
      } else {
        if (text == false) {
          if (buffer.length > 0) {
            result[result.length] = parseInt(buffer, 10);
            buffer = '';
          }
          text = true;
        }
        buffer += chr;
      }
    }

    if (buffer.length > 0) {
      if (text) {
        result[result.length] = buffer;
      } else {
        result[result.length] = parseInt(buffer, 10);
      }
    }

    return result;
  };

  var array1 = __strnatcmp_split(f_string1 + '');
  var array2 = __strnatcmp_split(f_string2 + '');

  var len = array1.length;
  var text = true;

  var result = -1;
  var r = 0;

  if (len > array2.length) {
    len = array2.length;
    result = 1;
  }

  for (i = 0; i < len; i++) {
    if (isNaN(array1[i])) {
      if (isNaN(array2[i])) {
        text = true;

        if ((r = this.strcmp(array1[i], array2[i])) != 0) {
          return r;
        }
      } else if (text) {
        return 1;
      } else {
        return -1;
      }
    } else if (isNaN(array2[i])) {
      if (text) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (text || f_version) {
        if ((r = (array1[i] - array2[i])) != 0) {
          return r;
        }
      } else {
        if ((r = this.strcmp(array1[i].toString(), array2[i].toString())) != 0) {
          return r;
        }
      }

      text = false;
    }
  }

  return result;
}


function natsort(inputArr) {
  //  discuss at: http://phpjs.org/functions/natsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //  depends on: strnatcmp
  //   example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
  //   example 1: $array1 = natsort($array1);
  //   returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}

  var valArr = [],
    k, i, ret, that = this,
    strictForIn = false,
    populateArr = {};

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function(a, b) {
    return that.strnatcmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}



function in_array(needle, haystack, argStrict) {
	  //  discuss at: http://phpjs.org/functions/in_array/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: vlado houba
	  // improved by: Jonas Sciangula Street (Joni2Back)
	  //    input by: Billy
	  // bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
	  //   returns 1: true
	  //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
	  //   returns 2: false
	  //   example 3: in_array(1, ['1', '2', '3']);
	  //   example 3: in_array(1, ['1', '2', '3'], false);
	  //   returns 3: true
	  //   returns 3: true
	  //   example 4: in_array(1, ['1', '2', '3'], true);
	  //   returns 4: false

	  var key = '',
	    strict = !! argStrict;

	  //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
	  //in just one for, in order to improve the performance 
	  //deciding wich type of comparation will do before walk array
	  if (strict) {
	    for (key in haystack) {
	      if (haystack[key] === needle) {
	        return true;
	      }
	    }
	  } else {
	    for (key in haystack) {
	      if (haystack[key] == needle) {
	        return true;
	      }
	    }
	  }

	  return false;
	}