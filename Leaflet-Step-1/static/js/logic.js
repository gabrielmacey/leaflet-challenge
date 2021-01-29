// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 15,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    39.8283, -98.5795
  ],
  zoom: 4.5,

});

streetmap.addTo(myMap);

// Store our API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  function styleMap(geometry) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(features.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
    // changing color based on magnitude of the earthquakes
    function getColor(coodrinates) {
    switch (true) {
    case coordinates < 10:
      return "#b0e0e6";
    case coordinates >= 10 && coordinates < 30:
      return "#87cefa";
    case coordinates >= 30 && coordinates < 50:
      return "00bfff";
    case coordinates >= 50 && coordinates < 70:
      return "#1e90ff";
    case coordinates >= 70 && coordinates < 90:
      return "#0000ff";
    default:
      return "#000080";
    }
  }
    // get radius from magnitude and amplify
    function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 5;
  }
};
