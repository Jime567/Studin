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

//user
async function getUser() {
    const response = await fetch('/user/me', {
        method: 'GET'
    });
    let jaysun = await response.json();
    return jaysun.dinID;
}
//set the user 
const userName = await getUser();
const userNameText = document.getElementById("userNameText");
userNameText.innerText = userName;

//sign out button
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", function () {
    signOut();
    
});

//sign out function
async function signOut() {
    fetch('/auth/logout', {
        method: 'DELETE',
    }).then(() => (window.location.href = '/'));
}

//change password btn
const changePasswordBtn = document.getElementById("changePassword");
changePasswordBtn.addEventListener("click", function () {
    const currPassword = document.getElementById("currPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    changePassword(currPassword, newPassword);
});
//change password func
async function changePassword(oldPassword, newPassword) {
    let body = {
        dinID: userName,
        password: oldPassword,
        newPassword: newPassword
    }

    const response = await fetch('/auth/changePassword', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if (response.ok) {
        alert("Password Changed Successfully");
        document.getElementById("currPassword").value = "";
        document.getElementById("newPassword").value = "";
    }
    else {
        alert("Incorrect Password");
    }
}
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

function generateDateFromTime(time) {
    let now = moment();
    
    let laDate = now.get('year') + "-" 
    + (((now.get('month')+1) >= 10) ? "" : "0" ) + (now.get('month') + 1) + "-" 
    + ((now.get('date') >= 10) ? "" : "0") +  now.get('date') 
    + "T" + time + ":00";
    return laDate;
}

function generateSampleCards() {
    let card1Name = "ACME Club";
    deleteEvent(card1Name);
    let card1Description = "Get yet another free ACME shirt and enjoy food for all your needs.";
    let card1Time = moment().subtract(33, 'minute');
    card1Time = moment(card1Time).format('HH:mm');
    let card1Location = "ASB";
    let card1Room = "3209A";

    let card2Name = "Dean's Dinner";
    deleteEvent(card2Name);
    let card2Description = "School of Music dinner for dean's list students and friends. Honoring their amazing accomplishments as students. Solely bread will be served";
    let card2Time = moment().subtract(16, 'minute');
    card2Time = moment(card2Time).format('HH:mm');
    let card2Location = "MB";
    let card2Room = "125";
    
    let card3Name = "Career Fair";
    deleteEvent(card3Name);
    let card3Description = "Some of the company booths feature free food. Look in the Computer Science jobs for the better foods.";
    let card3Time = moment().subtract(55, 'minute');
    card3Time = moment(card3Time).format('HH:mm');
    let card3Location = "BNSN";
    let card3Room = "4112C";
    
    let card4Name = "Law Review Party";
    deleteEvent(card4Name);
    let card4Description = "Event to celebrate the law school journal's fifth publication this year.";
    let card4Time = moment().add(1, 'hour');
    card4Time = moment(card4Time).format('HH:mm');
    let card4Location = "JRCB";
    let card4Room = "2116";
    
    let card5Name = "Bakery Sampling";
    deleteEvent(card5Name);
    let card5Description = "BYU Bakery is hosting a free sampling event to present new creations. Students can taste and rate their new foods. The top ten will be add to their menu for the next year.";
    let card5Time = moment().add(100, 'minute');
    card5Time = moment(card5Time).format('HH:mm');
    let card5Location = "WSC";
    let card5Room = "146";

    let card6Name = "Family History Presentation";
    deleteEvent(card6Name);
    let card6Description = "A presenter from Familysearch.org will be talking about the implications of machine learning in family history. Donuts will be available on a first-come first-serve basis.";
    let card6Time = moment().add(120, 'minute');
    card6Time = moment(card6Time).format('HH:mm');
    let card6Location = "JSB";
    let card6Room = "187 Auditorium";
    
    createEvent(card1Name, card1Description, card1Location, card1Room, card1Time);
    createEvent(card2Name, card2Description, card2Location, card2Room, card2Time);
    createEvent(card3Name, card3Description, card3Location, card3Room, card3Time);
    createEvent(card4Name, card4Description, card4Location, card4Room, card4Time);
    createEvent(card5Name, card5Description, card5Location, card5Room, card5Time);
    createEvent(card6Name, card6Description, card6Location, card6Room, card6Time);
    // generateCardList();
    
}

generateCardList();



