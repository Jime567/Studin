// Initialize and add the map
let map;

async function initMap() {
  // The location of Library
  //40.24869701219513, -111.6492336543945
  const position = { lat: 40.24869701219513, lng: -111.6492336543945 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered Library
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

//   // The marker
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
}

initMap();