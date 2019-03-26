var mymap = L.map('map').setView([51.505, -0.09], 13);

$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/master/data/london_hexagons.geojson?token=AJ7APAGm-5HZjCsQqnY5q0lvip7KElaKks5co1_YwA%3D%3D", function(json) {
    console.log(json); // this will show the info it in firebug console
    L.geoJSON(json).addTo(mymap);
});


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);