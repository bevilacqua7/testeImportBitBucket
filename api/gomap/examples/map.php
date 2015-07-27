<script>

<?PHP

$fh 		= fopen('map.txt','r');
$marker		=	 array();
$i=1;
while ($line = fgets($fh)) {
 	$_marker		= 	json_decode($line,true);
	$marker[]= "['Title', ".$_marker['lat'].", ".$_marker['long'].", ".$i."]";
	
	//echo "_marker[".$i."]	=	{position: new google.maps.LatLng(".$marker['lat'].",".$marker['long'].")};".PHP_EOL;
$i++;
}
fclose($fh);


 

?>
var beaches = [<?PHP echo implode(',',$marker)?>]; 
</script>

 <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Elevation service</title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
	<script src="jquery.min.js"></script>
	<script>
	var IS_TRACE	=	 true;
	function TRACE_DEBUG(value)
{
	IS_TRACE=	true;
	TRACE(value);
	IS_TRACE=	false;
}
function TRACE(value)
{
	if(!IS_TRACE) return false;

	$('.WRS_TRACE').append('<div>'+value+'</div>');
}

	  function foreach(array,type){

		IS_TRACE	=	true;
		
		TRACE('---foreach--------');
		

		for(obj in array)
		{

				TRACE(obj+'   ||   '+array[obj]);

		}
		
			IS_TRACE	=	false;
  }
  
  
  
var elevator;
var map;
var infowindow 	= new google.maps.InfoWindow();
var denali 		= new google.maps.LatLng(-23.66548,-46.49732);



function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
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
  for (var i = 0; i < locations.length; i++) {
    var beach = locations[i];
    var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        shape: shape,
        title: beach[0],
        zIndex: beach[3]
    });
  }
}

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: denali,
    mapTypeId: 'terrain'
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Create an ElevationService
  elevator = new google.maps.ElevationService();

  setMarkers(map, beaches);
//  var marker = new google.maps.Marker(_marker);



//marker.setMap(map);

  // Add a listener for the click event and call getElevation on that location
  google.maps.event.addListener(map, 'click', getElevation);
}

function getElevation(event) {

  var locations = [];

  // Retrieve the clicked location and push it on the array
  var clickedLocation = event.latLng;
  locations.push(clickedLocation);

  // Create a LocationElevationRequest object using the array's one value
  var positionalRequest = {
    'locations': locations
  }

  // Initiate the location request
  elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK) {

      // Retrieve the first result
      if (results[0]) {
//	foreach(results[0].location);
        // Open an info window indicating the elevation at the clicked position
       // infowindow.setContent('The elevation at this point <br>is ' + results[0].elevation + ' meters.');
		//infowindow.setPosition(clickedLocation);
	    //infowindow.open(map);
		
		
			var lat	=	 results[0].location['A'];
			var lon	=	 results[0].location['F'];
		
		$.post('map_request.php',{'lat':lat, 'long':lon});
		
		   var mapCenter = new google.maps.LatLng(lat, lon);
		   
		 var marker = new google.maps.Marker({
                position:mapCenter,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"This a new marker!",
              icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
            });
	 
			
			
      } else {
        alert('No results found');
      }
    } else {
      alert('Elevation service failed due to: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

    </script>
  </head>
  <body>
    <div id="map-canvas"></div>
	<div class="WRS_TRACE"></div>
  </body>
</html>
	