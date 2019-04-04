var slidervar = document.getElementById('slider');
var value = 800
var data = []
var mymap = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 11);
var polygons = L.layerGroup().addTo(mymap);
var rent_property = "Studio"

noUiSlider.create(slider, {
    start: [value],
    range: {
        'min': 0,
        'max': 3000
    },
});

slidervar.noUiSlider.on('update', function(values, handle){
	value = values[0]
	//clear layers
	polygons.clearLayers();
	L.geoJSON(data, {style: style}).addTo(polygons);
	//repopulate

})


// read json and add to map
$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/6de3bea34524e767c6d5817b31f906fa98e2c31b/data/london_rent.geojson", function(json) {
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
    return d > value ? '#d7191c' :
                      '#1a9641';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties[rent_property]),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}


$("input[type='radio']").click(function(){
    var radioValue = $("input[name='rent']:checked").val();
    if(radioValue){
        rent_property = radioValue
        polygons.clearLayers();
		L.geoJSON(data, {style: style}).addTo(polygons);
    }
});