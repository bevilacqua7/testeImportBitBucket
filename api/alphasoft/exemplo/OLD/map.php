


<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <script type="text/javascript" src="jquery-2.1.3.min.js"></script>    
    
    <meta charset="utf-8">
    <title>Complex icons</title>
    <style>
      html, body, #map-canvas1 {
        height: 400px;
        margin: 0px;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>

<script>
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to
// (0,32) to correspond to the base of the flagpole.
/**
 * @link http://stackoverflow.com/questions/7402667/google-maps-multiple-markers-1-infowindow-problem
 */
function initialize()
{
  var mapOptions = {
				    zoom: 10,
				    center: new google.maps.LatLng(-33.9, 151.2)
				   }

  
  var map = new google.maps.Map(document.getElementById('map-canvas1'),mapOptions);
  
  setMarkers(map, beaches);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */

var beaches = [
               { 'title':'Bondi Beach'	, 	'lat':-33.890542,			'lng':151.274856 			,'info': '<h3>Title Bondi</h3>asdhgafsdhjgafsdgjhsdfjasd<br>asdfatysdfiaytf'},
               { 'title':'Coogee Beach'	, 	'lat':-33.923036, 			'lng':151.259052			,'info': 'Title Coogee '},
               { 'title':'Cronulla Beach', 	'lat':-34.028249, 			'lng':151.157507			,'info': 'Title Cronulla '}	,
               { 'title':'Manly Beach'	, 	'lat':-33.80010128657071, 	'lng':151.28747820854187	,'info': 'Title Manly '},
               { 'title':'Maroubra Beach', 	'lat':-33.950198, 			'lng':151.259302			,'info': 'Title Maroubra '}
			];

function setMarkers(map, locations) {
  	// Add markers to the map
  	var infowindow = new google.maps.InfoWindow();
  
	// Marker sizes are expressed as a Size of X,Y
	// where the origin of the image (0,0) is located
	// in the top left of the image.
	
	// Origins, anchor positions and coordinates of the marker
	// increase in the X direction to the right and in
	// the Y direction down.
	var image = {
	    url		: 'SUM.png',
	    // This marker is 20 pixels wide by 32 pixels tall.
	    size	: new google.maps.Size(20, 32),
	    // The origin for this image is 0,0.
	    origin	: new google.maps.Point(0,0),
	    // The anchor for this image is the base of the flagpole at 0,32.
	    anchor	: new google.maps.Point(0, 32)
	};
	// Shapes define the clickable region of the icon.
	// The type defines an HTML &lt;area&gt; element 'poly' which
	// traces out a polygon as a series of X,Y points. The final
	// coordinate closes the poly by connecting to the first
	// coordinate.
	var shape = {
	      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
	      type: 'poly'
	};

  	for (var i = 0; i < locations.length; i++) 
 	{
		    var beach = locations[i];
		    var myLatLng = new google.maps.LatLng(beach.lat, beach.lng);
		
		    var marker = new google.maps.Marker({
		        position	: myLatLng,
		        map			: map,
		        icon		: image,
		        shape		: shape,
		        title		: beach.title,
		        info		: beach.info, //info para o Click
		        zIndex		: i
		    });
		
		    /*
		     * Evento do Click do Google MAPS
		     */
		    google.maps.event.addListener(marker, 'click', function () {
		        infowindow.setContent(this.info);
		        infowindow.open(map, this);
		    });

  	}
}

google.maps.event.addDomListener(window, 'load', initialize);



$(function(){
	$('.click_reciseMaps').click(function(){
		$('#map-canvas1').width(400);
	 //   google.maps.event.trigger(map, 'resize');  
		//google.maps.event.trigger(map, "resize");
	});
	
})

    </script>
  </head>
  <body>
    <div id="map-canvas1"></div>
    <button class="click_reciseMaps">GO</button>
  </body>
</html>