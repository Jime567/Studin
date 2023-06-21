import moment from "moment";

export async function makeNow() {
    const nav = document.querySelector(".navContainer");
    nav.style.display = "flex";
    //events and list of events variables

    //open the pop up from bottom right plus button
    const popButton = document.getElementById("openForm");
    popButton.addEventListener("click", function() {
        document.getElementById("createEventPopUp").style.display = "flex";
    });

    //open the pop up from top plus button
    const addTopButton = document.getElementById("addTopButton");
    addTopButton.addEventListener("click", function () {
        document.getElementById("createEventPopUp").style.display = "flex";
    });


    //close pop up from close button
    const popClose = document.getElementById("popCancel");
    popClose.addEventListener("click", function () {
        document.getElementById("createEventPopUp").style.display = "none";     
    });


    async function addToDatabase(newEvent) {
        console.log(`Adding ${newEvent.name} to the Database`);
        try {
            const response = await fetch('/api/addEvent', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newEvent),
            });
    
            const scores = await response.json();
        } catch {
            console.log("Obviously, there has been an error");
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
        //add to database
        addToDatabase(newEvent);
        //send through websocket
        sendEvent(newEvent);
    }

    function createEventCard (eventObject) {
        const entryContainer = document.createElement("div");
        entryContainer.className = "entryContainer";
        entryContainer.id = eventObject.name;
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
        let startTime = moment(generateDateFromTime(eventObject.time));
        let endTime = moment(generateDateFromTime(eventObject.time));
        endTime = endTime.add(1, 'hour');
        timeLeft.innerText = endTime.fromNow(true) + " left";
        time.innerText = moment(startTime).format('hh:mma');

        outTime.appendChild(outButton);
        outTime.appendChild(timeLeft);
        entryContainer.appendChild(topLevel);
        entryContainer.appendChild(description);
        entryContainer.appendChild(outTime);

        const content = document.querySelector(".content");
        content.appendChild(entryContainer);

        //make delete out button functionality
        outButton.addEventListener("click", function () {
            
            const cards = document.querySelectorAll(".entryContainer");
            let c;
            for (c of cards) {
                if (c.id === eventObject.name) {
                    c.remove();
                }
            }
            deleteEvent(eventObject.name);
        });
        
    }

    async function deleteEvent(name) {
        console.log(`Deleting ${name} from the Database`);
        try {
            const response = await fetch('/api/deleteEvent/' + name, {
            method: 'DELETE',
            });
        } catch {
            console.log("Obviously, there has been no deletion");
        }
    }

    async function getEvents() {
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


    const addEventButton = document.getElementById("addEventButton");
    addEventButton.addEventListener("click", async function () {
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
        let tempTime = moment(generateDateFromTime(time));
        if (now.diff(tempTime) > 0 && now.diff(tempTime, 'minutes') < 60 && eventName.length != 0) {
            //create the event
            await createEvent(eventName, desc, building, room, time);
            createEventCard({name : eventName, description : desc, location : building, room : room, time : time})
        
            document.getElementById("createEventPopUp").style.display = "none";  
            document.getElementById("eventNameInput").value = "";
            document.getElementById("descriptionInput").value = "";
            document.getElementById("buildingInput").value = "ASB";
            document.getElementById("roomInput").value = "";
            document.getElementById("timeInput").value = "";
        }
        else if (now.diff(tempTime) < 0 && now.diff(tempTime, 'minutes') < 60 && eventName.length != 0) {
            //create the event
            createEvent(eventName, desc, building, room, time);
            document.getElementById("createEventPopUp").style.display = "none";  
            document.getElementById("eventNameInput").value = "";
            document.getElementById("descriptionInput").value = "";
            document.getElementById("buildingInput").value = "ASB";
            document.getElementById("roomInput").value = "";
            document.getElementById("timeInput").value = "";
        }
        else if (eventName.length === 0) {
            alert("Event must have name")
        }
        else if (now.diff(tempTime, 'minutes') > 60) {
            alert("Time cannot be longer than 1 hour ago");
        }
        //close the pop up window and clear fields
        
    });


    async function generateCardList() {
        //events and list of events variables
        let events = await getEvents();
        if (events === null) {
            events = [];
            console.log("No Events");
        }
        else {
            let i;
            for (i of events) {
                //see if it has started already
                let time = i.time;
                let now = moment();
                time = moment(generateDateFromTime(time));
            
                if (now.diff(time) > 0 && now.diff(time, 'minutes') < 60) {
                    createEventCard(i)      
                }
            }
            //delete old events
            for (i of events) {
                let time = i.time;
                let now = moment();
                time = moment(generateDateFromTime(time));
                if (now.diff(time, 'minutes') >= 60) {
                    deleteEvent(i.name);
                }
            }
        }
    }


    //configure websocket
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log("Websocket Connected");
    };
    socket.onclose = (event) => {
        console.log("Websocket Disconnected");
    }
    socket.onmessage = async (event) => {
        console.log("Received WS: " + JSON.parse(await event.data.text()));
        createEventCard(JSON.parse(await event.data.text()));
    }


    function sendEvent (event) {
        console.log("Sending Event")
        socket.send(JSON.stringify(event));
    }

    function generateDateFromTime(time) {
        let now = moment();
        
        let laDate = now.get('year') + "-" 
        + (((now.get('month')+1) >= 10) ? "" : "0" ) + (now.get('month') + 1) + "-" 
        + ((now.get('date') >= 10) ? "" : "0") +  now.get('date') 
        + "T" + time + ":00";
        return laDate;
    }

    generateCardList();

}
