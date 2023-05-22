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
        //see if it has started already
        let time = JSON.parse(localStorage.getItem(i)).time;
        let now = moment();
        time = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
        if (now.diff(time) > 0 && now.diff(time, 'minutes') < 60) {
            createEventCard(JSON.parse(localStorage.getItem(i)))      
        }
    }
    for (i of events) {
        let time = JSON.parse(localStorage.getItem(i)).time;
        let now = moment();
        time = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
        if (now.diff(time, 'minutes') > 60) {
            deleteEvent(i);
        }
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
    entryContainer.id = "entryContainer";
    const topLevel = document.createElement("span");
    topLevel.className = "topLevel";
    const nameLocation = document.createElement("div"); 
    nameLocation.className = "nameLocation";
    const cardTitle = document.createElement("p");
    cardTitle.className = "cardTitle, cardName";
    cardTitle.id = "cardTitle";
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
    outButton.id = eventObject.name;
    outButton.innerText = "Out";
    
    const timeLeft = document.createElement("p");
    
    //time left magic
    let now = moment();
    let endTime = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " +  eventObject.time)
    endTime = endTime.add(1, 'hour');
    timeLeft.innerText = endTime.fromNow(true) + " left";

    outTime.appendChild(outButton);
    outTime.appendChild(timeLeft);
    entryContainer.appendChild(topLevel);
    entryContainer.appendChild(description);
    entryContainer.appendChild(outTime);

    const content = document.querySelector(".content");
    content.appendChild(entryContainer);

    //make delete out button functionality
    outButton.addEventListener("click", function () {
        deleteEvent(eventObject.name);
    });
    
}

function deleteEvent(name) {
    const index = events.indexOf(name);
        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        window.localStorage.removeItem(name);
        const cards = document.querySelectorAll("#entryContainer");
        let c;
        for (c of cards) {
            c.remove();
        }
        generateCardList();
}

const addEventButton = document.getElementById("addEventButton");
addEventButton.addEventListener("click", function () {
    //event name
    const eventName = document.getElementById("eventNameInput").value;
    
    //description
    const desc = document.getElementById("descriptionInput").value;
    //building
    const building = document.getElementById("buildingInput").value;
    //room
    const room = document.getElementById("roomInput").value;
    //time
    const time = document.getElementById("timeInput").value;
    
    //check to see if it has started or is too old
    let now = moment();
    let tempTime = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
    console.log(now.diff(tempTime, 'minutes'));
    if (now.diff(tempTime) > 0 && now.diff(tempTime, 'minutes') < 60) {
        //create the event
        createEvent(eventName, desc, building, room, time);
        createEventCard(JSON.parse(localStorage.getItem(eventName)));
        document.getElementById("createEventPopUp").style.display = "none";  
        document.getElementById("eventNameInput").value = "";
        document.getElementById("descriptionInput").value = "";
        document.getElementById("buildingInput").value = "ASB";
        document.getElementById("roomInput").value = "";
        document.getElementById("timeInput").value = "";
    }
    else if (now.diff(tempTime) < 0 && now.diff(tempTime, 'minutes') < 60) {
        //create the event
        createEvent(eventName, desc, building, room, time);
        document.getElementById("createEventPopUp").style.display = "none";  
        document.getElementById("eventNameInput").value = "";
        document.getElementById("descriptionInput").value = "";
        document.getElementById("buildingInput").value = "ASB";
        document.getElementById("roomInput").value = "";
        document.getElementById("timeInput").value = "";
    }
    else if (now.diff(tempTime, 'minutes') > 60) {
        alert("Event start is too long ago.");
    }
    //close the pop up window and clear fields
    
});

function generateCardList() {
    //events and list of events variables
    let events = JSON.parse(localStorage.getItem("events"));
    if (events === null) {
        events = [];
    }
    else {
        let i;
        for (i of events) {
            //see if it has started already
            let time = JSON.parse(localStorage.getItem(i)).time;
            let now = moment();
            time = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
            if (now.diff(time) > 0 && now.diff(time, 'minutes') < 60) {
                createEventCard(JSON.parse(localStorage.getItem(i)))      
            }
        }
        //delete old events
        for (i of events) {
            let time = JSON.parse(localStorage.getItem(i)).time;
            let now = moment();
            time = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
            if (now.diff(time, 'minutes') > 60) {
                deleteEvent(i);
            }
        }
    }
}

