// Link to get the GeoJSON data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

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
});


