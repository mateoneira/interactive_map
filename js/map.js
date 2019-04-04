var rent_slidervar = document.getElementById('rent_slider');
var travel_slidervar = document.getElementById('travel_slider');
var rent_value = 800
var travel_time = 90
var data = []
var mymap = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 11);
var polygons = L.layerGroup().addTo(mymap);
var rent_property = "Studio"

noUiSlider.create(rent_slider, {
    start: [rent_value],
    range: {
        'min': 0,
        'max': 3000
    },
});

noUiSlider.create(travel_slider, {
    start: [travel_time],
    range: {
        'min': 0,
        'max': 160
    },
});

rent_slidervar.noUiSlider.on('update', function(values, handle){
	rent_value = values[0]
    document.getElementById('rent_value').innerHTML =  Math.round(rent_value);
	//clear layers
	polygons.clearLayers();
	L.geoJSON(data, {style: style}).addTo(polygons);
	//repopulate

})

travel_slidervar.noUiSlider.on('update', function(values, handle){
    travel_time = values[0]
    document.getElementById('travel_value').innerHTML =  Math.round(travel_time);
    // clear layers
    polygons.clearLayers();
    L.geoJSON(data, {style: style}).addTo(polygons);
    //repopulate

})

// read json and add to map
$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/2c0ca5328f3e3c499f9b017417101d1e7bae142d/data/london_rent.geojson", function(json) {
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
function getColor(rent, travel) {
    console.log(rent, travel)
    return (rent < rent_value && travel<travel_time) ? '#1a9641' :
                      '#d7191c';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties[rent_property], feature.properties['travel_time']),
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