var slidervar = document.getElementById('slider');
var value = 50
var data = []
var mymap = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 13);
var polygons = L.layerGroup().addTo(mymap);

noUiSlider.create(slider, {
    start: [value],
    range: {
        'min': 0,
        'max': 1000
    },
});

slidervar.noUiSlider.on('update', function(values, handle){
	value = values[0]
	console.log(value)
	//clear layers
	polygons.clearLayers();
	L.geoJSON(data, {style: style}).addTo(polygons);
	//repopulate

})


// read json and add to map
$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/master/data/london_hexagons.geojson?token=AJ7APAGm-5HZjCsQqnY5q0lvip7KElaKks5co1_YwA%3D%3D", function(json) {
    console.log(json); // this will show the info it in firebug console
    data = json
    L.geoJSON(data, {style: style}).addTo(polygons);
});


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.light'
}).addTo(mymap);


// function to colo mao
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(value),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}
