//open the pop up from bottom right plus button
const popButton = document.getElementById("openForm");
popButton.addEventListener("click", function() {
    document.getElementById("createEventPopUp").style.display = "flex";
});

//close pop up from close button
const popClose = document.getElementById("popCancel");
popClose.addEventListener("click", function () {
    document.getElementById("createEventPopUp").style.display = "none";     
});

//events and list of events variables
let events = JSON.parse(localStorage.getItem("events"));
if (events === null) {
    events = [];
}
else {
    let i;
    for (i of events) {
        createEventCard(JSON.parse(localStorage.getItem(i)))
    }
}

//make an event
function createEvent (name, description, location, room, time) {
    const newEvent = {
        name : name,
        description : description,
        location : location,
        room : room,
        time: time
      }
      window.localStorage.setItem(name, JSON.stringify(newEvent));
      events.push(name);
      localStorage.setItem("events", JSON.stringify(events));
}


function createEventCard (eventObject) {
    const entryContainer = document.createElement("div");
    entryContainer.className = "entryContainer";
    const topLevel = document.createElement("span");
    topLevel.className = "topLevel";
    const nameLocation = document.createElement("div"); 
    nameLocation.className = "nameLocation";
    const cardTitle = document.createElement("p");
    cardTitle.className = "cardTitle, cardName";
    cardTitle.innerText = eventObject.name;
    const locationName = document.createElement("p");
    locationName.className = "cardTitle";
    locationName.innerText = eventObject.location + " " + eventObject.room;
    nameLocation.appendChild(cardTitle);
    nameLocation.appendChild(locationName);
    const time = document.createElement("p");
    time.className = "time";
    time.innerText = eventObject.time;
    topLevel.appendChild(nameLocation);
    topLevel.appendChild(time);
    const description = document.createElement("p");
    description.className = "description";
    description.innerText = eventObject.description;
    const outTime = document.createElement("span");
    outTime.className = "outTime";
    const outButton = document.createElement("button");
    outButton.className = "outButton";
    outButton.innerText = "Out";
    const timeLeft = document.createElement("p");
    timeLeft.innerText = "17 min left";
    outTime.appendChild(outButton);
    outTime.appendChild(timeLeft);
    entryContainer.appendChild(topLevel);
    entryContainer.appendChild(description);
    entryContainer.appendChild(outTime);

    const content = document.querySelector(".content");
    content.appendChild(entryContainer);
}


const addEventButton = document.getElementById("addEventButton");
addEventButton.addEventListener("click", function () {
    //event name
    const eventName = document.getElementById("eventNameInput").value;
    document.getElementById("eventNameInput").value = "";
    //description
    const desc = document.getElementById("descriptionInput").value;
    document.getElementById("descriptionInput").value = "";
    //building
    const building = document.getElementById("buildingInput").value;
    document.getElementById("buildingInput").value = "ASB";
    //room
    const room = document.getElementById("roomInput").value;
    document.getElementById("roomInput").value = "";
    //time
    const time = document.getElementById("timeInput").value;
    document.getElementById("timeInput").value = "";
    //create the event
    createEvent(eventName, desc, building, room, time);
    createEventCard(JSON.parse(window.localStorage.getItem(eventName)));
    //close the pop up window
    document.getElementById("createEventPopUp").style.display = "none";  
});

