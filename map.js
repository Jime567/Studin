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

 
  //Generate the markers
  let events = JSON.parse(localStorage.getItem("events"));
  if (events === null) {
    events = [];
  }

  else {
    let i;
    for ( i of events) {
    let eventObject = JSON.parse(localStorage.getItem(i));
    let pos = getCoordinates(eventObject.location);
    const marker = new google.maps.Marker({
      position: pos,
      map,
      title: eventObject.name,
      icon: "/images/hamburger.png"
    });
    //get time in 12hr format
    let now = moment();
    let startTime = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " +  eventObject.time);
    startTime = moment(startTime).format('hh:mm a');
    const contentString = "<h1 class='mapTitles'>" + eventObject.name + "</h1>" + "<p>" + eventObject.location + " " + eventObject.room + "          " + startTime + "</p>" + "<p>" + eventObject.description + "</p>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map
      });
    });

    }
  }





//   // The marker
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
}

initMap();


function getCoordinates(place) {
  switch (place) {
    case "ASB":
      return { lat: 40.250824857245874, lng:  -111.64927755654855};

    case "BELL":
      return { lat: 40.252761412186274, lng: -111.64762240171116};

    case "BNSN":
      return { lat: 40.24586896927701, lng:  -111.6508383099376};
    
    case "BRMB":
      return { lat: 40.24623490905223, lng: -111.65237182111193};

    case "CONF":
      return { lat:40.255532409664, lng: -111.64547388555283 };

    case "CMB":
      return { lat: 40.247741636224376, lng:  -111.64448852555843};

    case "CB":
      return { lat: 40.24687311012043, lng:   -111.64807181308153};

    case "CTB":
      return { lat: 40.247722800018565, lng: -111.64647487811342 };

    case "ELLB":
      return { lat: 40.26440202307073, lng: -111.6593800080549 };

    case "EB":
      return { lat: 40.24625452143474, lng:  -111.64786965528143};

    case "ERL":
      return { lat: 40.24669573978527, lng:  -111.64721441068887};

    case "ESC":
      return { lat: 40.24716533122803, lng: -111.65021120633311 };

    case "FPH":
      return { lat: 40.246651162601, lng:  -111.65283932678115};
    
    case "HBLL":
      return { lat: 40.24868444187999, lng: -111.64925743380925 };

    case "HGB":
      return { lat: 40.24546776618449, lng:  -111.65247460805786};

    case "HCEB":
      return { lat: 40.2561246405846, lng: -111.64543497277728};

    case "HRCB":
      return { lat: 40.24767727296692, lng:  -111.6493236435047};

    case "JRCB":
      return { lat: 40.24957185932559, lng: -111.64530670122886 };

    case "JKB":
      return { lat: 40.250190946236316, lng: -111.64995762731472 };

    case "JFSB":
      return { lat: 40.248417871178205, lng: -111.65115735594016 };

    case "JSB":
      return { lat: 40.24580692901098, lng:  -111.65150148707157};

    case "KMBL":
      return { lat: 40.24754021442173, lng:  -111.65115777802909};

    case "LSB":
      return { lat: 40.24502928396082, lng:  -111.6492762023778};
    
    case "LSGH":
      return { lat: 40.245226143163144, lng: -111.6412478244953};

    case "MB":
      return { lat: 40.248920780779365, lng: -111.64402887651475};

    case "MSRB":
      return {lat: 40.245375765312076, lng: -111.65350044137006};

    case "MCKB":
      return { lat: 40.24722118566496, lng: -111.65183467124847 };

    case "NICB":
      return { lat: 40.246593851583086, lng: -111.65011919219873  };

    case "RMB":
      return { lat: 40.24401341728101, lng:  -111.65034171990622};

    case "ROTC":
      return { lat: 40.24796642872128, lng: -111.6439959934627};

    case "RB":
      return { lat: 40.2490341828839, lng:  -111.65344926702281};

    case "SNLB":
      return { lat: 40.24732142837467, lng: -111.64534737547557 };

    case "SFH":
      return { lat: 40.24738048521057, lng: -111.65401518315664};

    case "TMCB":
      return { lat: 40.2493986375008, lng: -111.6508130914719};
    
    case "TNRB":
      return { lat: 40.250423141223955, lng: -111.65252418365306};

    case "TLRB":
      return { lat: 40.24928458924108, lng: -111.6425856537254 };

    case "UPC":
      return { lat: 40.25629151475184, lng: -111.65804473698773 };

    case "WVB":
      return { lat: 40.248845724605104, lng: -111.6521576685488};

    case "WSC":
      return { lat: 40.24853740959004, lng: -111.64718638854792};

  }
}