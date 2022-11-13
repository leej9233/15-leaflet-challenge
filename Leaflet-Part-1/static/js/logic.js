// Link to get the GeoJSON data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"



// Creating the map object
var myMap = L.map("map", {
   center:[38, -120],
   zoom: 5
})



//Layer Group
var layerGroup = L.layerGroup();
//Tile Layer
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Getting our GeoJSON data and print
d3.json(url).then((data) => {
   //Test Print
   console.log(data)
   //Size of earthquake
   function markerSize (mag) {
      return mag * 4
   };
   //Color by earthquake magnitude
   function chooseColor(mag) {
      switch (true) {
         case mag > 5:
            return "red";
         case mag > 4:
           return "orangered";
         case mag > 3:
           return "orange";
         case mag > 2:
           return "gold";
         case mag > 1:
           return "yellow";
         default:
           return "lightgreen";
      }
   };
   //Reference Doc: https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.GeoJson/
   L.geoJson(data, {
      //Circle Marker
      pointToLayer: function (feature, latlng) {
         return L.circleMarker (latlng);
      },
      //Apply Style
      style: function (feature) {
         return {
            color: "gray",
            radius: markerSize(feature.properties.mag),
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1.5
         }
      },
      //Popup
      onEachFeature: function(feature, layer) {
         layer.bindPopup("Location: " + feature.properties.place + "<br>Magnitude: " + feature.geometry.coordinates[2])
      }
   }).addTo(layerGroup);

   //Add layerGroup to Map
   layerGroup.addTo(myMap);
});


//Adding Legend Reference: https://leafletjs.com/examples/choropleth/
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5]
        var colors = ["red", "orangered", "orange", "gold", "yellow", "lightgreen"]

   // loop through our density intervals and generate a label with a colored square for each interval
   for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
         '<i style="background:' + colors[i] + '"></i> ' +
         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);