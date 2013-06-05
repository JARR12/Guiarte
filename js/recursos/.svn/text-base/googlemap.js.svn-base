var map;
var geocoder;
var directionsDisplay;
var directionsService;
var posicion_actual;
var posicion_lugar;
var bounds;

google.maps.visualRefresh = true;

function initialize() {
    var medellin = new google.maps.LatLng(6.216667,-75.566667);
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    bounds = new google.maps.LatLngBounds ();
    directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
    zoom: 16,
    center: medellin,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
  	directionsDisplay.setMap(map);
    cargar_direccion();
    if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(ubicacion_actual);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

function cargar_direccion() {
	var id = location.search.substr(1);
	var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
    var  params = "nombreServicio=id&id="+id;
    callService(urlService,params,"dir_coord","jsonp");
}

function dir_coord(data) {
	var direccion = data[0].direccion;
	var limite_ne = new google.maps.LatLng(6.41188,-75.406981);
	var limite_sw = new google.maps.LatLng(6.084419,-75.648851);
	if (geocoder) {
      geocoder.geocode({ 
      	'address': direccion,
      	'bounds': new google.maps.LatLngBounds(limite_sw, limite_ne) 
      }, 
      	function (results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.jb;
            var lng = results[0].geometry.location.kb;
   			marker(lat, lng);
         }
         else {
            console.log("Geocoding failed: " + status);
         }
      });
   } 
}

function calcRoute() {
  var start = posicion_actual;
  var end = posicion_lugar;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function marker(lat, lng) {
	posicion_lugar = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
      position: posicion_lugar,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Aquí es!'
  	});
  bounds.extend(posicion_lugar);
  map.fitBounds(bounds);
  map.setZoom(16);
}

function ubicacion_actual(position) {
	posicion_actual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	marker = new google.maps.Marker({
		position: posicion_actual,
		map: map,
		animation: google.maps.Animation.DROP,
		title: 'Usted esta aquí.'
	});
	calcRoute();
  bounds.extend(posicion_actual);
  map.fitBounds(bounds);
  map.setZoom(16);
}