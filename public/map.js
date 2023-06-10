
//profile image listener to open pop down
const profileImg = document.getElementById("profileImg");
profileImg.addEventListener("click", function () {
   const dropContent = document.getElementById("dropContent");
   dropContent.style.display = "block";
});

//profile x button
const xBtn = document.getElementById("xBtn");
xBtn.addEventListener("click", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "none";
});

//dropDown hover 
const dropDown = document.getElementById("dropDown");
dropDown.addEventListener("mouseover", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "block";
});
dropDown.addEventListener("mouseout", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "none";
});

//set the user 
const userNameText = document.getElementById("userNameText");
userNameText.innerText = JSON.parse(localStorage.getItem("user")).user;

//sign out button
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.replace("/index.html");
});

//change password
const changePasswordBtn = document.getElementById("changePassword");
changePasswordBtn.addEventListener("click", function () {
    const currPassword = document.getElementById("currPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    if (currPassword != JSON.parse(localStorage.getItem("user")).password) {
        alert("Current Password Incorrect");
    }   
    else {
        let tempUser = JSON.parse(localStorage.getItem("user"));
        tempUser.password = newPassword;
        localStorage.setItem("user", JSON.stringify(tempUser));
        document.getElementById("currPassword").value = '';
        document.getElementById("newPassword").value = '';
    }
});

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

  //styles
  const styles = {
    default: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#002d5f" }],
      },
      {
        featureType: "POI.school",
        elementType: "geometry",
        stylers: [{ color: "#3381c6" }],
      },
  
    ],
  };

  // The map, centered on Library
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    styles: styles["default"],
    disableDefaultUI: true,
    // mapId: "DEMO_MAP_ID",
  });


  //Generate the markers
  let events = await getEvents();
  if (events === null) {
    events = [];
  }

  else {
    let i;
    for ( i of events) {
    let eventObject = i;
    let pos = await getCoordinates(eventObject.location);
    let currOrNot = newOrOld(eventObject.time);
    let hamburger = "/images/hamburgerNot.png";
    if (currOrNot) {
      hamburger = "/images/hamburger.png";
    }
    

    const marker = new google.maps.Marker({
      position: pos,
      map,
      title: eventObject.name,
      icon: hamburger
    });
    //get time in 12hr format
    let now = moment();
    let startTime = moment(generateDateFromTime(eventObject.time));
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

  async function getEvents() {
    console.log("Getting all of the event from databse");
    try {
        const response = await fetch('/api/getEvents', {
            method: 'GET',
        });
        return response.json();
    }
    catch {
        console.log("Refusal to get events");
    }
}

  function newOrOld(time) {
    let now = moment();
    let tempTime = moment(generateDateFromTime(time));
    if (now.diff(tempTime) > 0) {
      return true;
    }
    else {
      return false;
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

function generateDateFromTime(time) {
  let now = moment();
  let laDate = now.get('year') + "-" 
  + (((now.get('month')+1) >= 10) ? "" : "0" ) + (now.get('month') + 1) + "-" 
  + ((now.get('date') >= 10) ? "" : "0") +  now.get('date') 
  + "T" + time + ":00";
  return laDate;
}

async function getCoordinates(place) {
  let coords;
  try {
    const response = await fetch('/api/place/' + place);
    coords = await response.json();
    console.log(coords);
    return coords;
  }
  catch {
    console.log("AAAGHHHHH!");
  }
  
}