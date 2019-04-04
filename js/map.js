var rent_slidervar = document.getElementById('rent_slider');
var travel_slidervar = document.getElementById('travel_slider');
var travel_slidervar_secondary = document.getElementById('travel_slider_secondary');
var rent_value = 800
var travel_time = 90
var travel_time_2 = 120
var select_destination = false
var select_destinaton_2 = false
var destination = '2548'
var hex_data = []
var brownfield_data = []
var mymap = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 11);
var brownfields = L.layerGroup().addTo(mymap);
var polygons = L.featureGroup().addTo(mymap).on('click', 
    function(e) {
        if (select_destination){
            destination=e['layer']['feature']['properties']['id'];
            polygons.clearLayers();
            L.geoJSON(hex_data, {style: style}).addTo(polygons);
            select_destination=false;
        }
    });
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

noUiSlider.create(travel_slider_secondary, {
    start: [travel_time_2],
    range: {
        'min': 0,
        'max': 160
    },
});

rent_slidervar.noUiSlider.on('update', function(values, handle){
	rent_value = values[0]
    document.getElementById('rent_value').innerHTML =  Math.round(rent_value) + ' £';
	//clear layers
	polygons.clearLayers();
	L.geoJSON(hex_data, {style: style}).addTo(polygons);
	//repopulate
})

travel_slidervar.noUiSlider.on('update', function(values, handle){
    travel_time = values[0]
    document.getElementById('travel_value').innerHTML =  Math.round(travel_time) + ' min';
    // clear layers
    polygons.clearLayers();
    L.geoJSON(hex_data, {style: style}).addTo(polygons);
    //repopulate
})

travel_slidervar_secondary.noUiSlider.on('update', function(values, handle){
    travel_time_2 = values[0]
    document.getElementById('travel_value_2').innerHTML =  Math.round(travel_time_2) + ' min';
    // clear layers
    polygons.clearLayers();
    L.geoJSON(hex_data, {style: style}).addTo(polygons);
    //repopulate
})

// read json and add to map
$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/db1e64c941b8f24a33d3a6f859dba2376225c457/data/brownfield.geojson", function(json) {
    // console.log(json); // this will show the info it in firebug console
    brownfield_data = json
    L.geoJSON(brownfield_data, {style: {fillColor: '#0f0f0f', fillOpacity:0.5, weight:1, color:'#000000'}}).addTo(brownfields);
});


// // read json and add to map
$.getJSON("https://raw.githubusercontent.com/mateoneira/interactive_map/12219f7bdbb9304bc0632a32badb5bbdf4c324cc/data/london_rent.geojson", function(json) {
    // console.log(json); // this will show the info it in firebug console
    hex_data = json
    L.geoJSON(hex_data, {style: style}).addTo(polygons);
});



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.light'
}).addTo(mymap);


// function to colo mao
function getColor(rent, travel, travel_2) {
    console.log(rent, travel)
    return (rent < rent_value && travel<travel_time && travel_2<travel_time_2) ? '#1a9641' :
                      '#d7191c';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties[rent_property], feature.properties[destination], feature.properties['1683']),
        weight: 1,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}

function set_destination() {
    select_destination = true
}


$("input[type='radio']").click(function(){
    var radioValue = $("input[name='rent']:checked").val();
    if(radioValue){
        rent_property = radioValue
        polygons.clearLayers();
		L.geoJSON(hex_data, {style: style}).addTo(polygons);
    }
});