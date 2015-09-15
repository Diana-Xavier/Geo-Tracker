function initMap(trackLatitude,trackLongitude) {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
	  var pos1 = {
        lat: trackLatitude,
        lng: trackLongitude
      };
	  console.log("latitude   "+trackLatitude+"trackLongitude  "+trackLongitude);
	console.log("latitude"+pos.lat);
	console.log("longitude"+pos.lng);
      infoWindow.setPosition(pos);
	  infoWindow.setPosition(pos1);
      infoWindow.setContent('Location found.');
	  
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
		$('#getLocation').on('click', function (event) {
			console.log("get locatioon");
			
			socket.emit('switch', 'on');
	
		});
    });
	
	socket.on('data', function(data) {
		console.log("data   "+data);
		
		var res = data.split(",");
		console.log(res[0]);
		console.log(res[1]);
		var latitude = parseInt(res[0]);
		var longitude = parseInt(res[1]);
		initMap(latitude,longitude);
		
		
    });