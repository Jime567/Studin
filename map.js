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

  // The map, centered on Library
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new google.maps.Marker({
    position: position,
    map,
    title: "Food for You",
    icon: "/images/hamburger.png"
  });

  const infowindow = new google.maps.InfoWindow({
    content: "Hamburger HBLL 3209"
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map
    });
  });



//   // The marker
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
}

initMap();
