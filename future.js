

function createFutureCard(eventObject) {

    futureEvent = document.createElement("div");
    futureEvent.className = "futureEvent";

    headerLevel = document.createElement("div");
    headerLevel.className = "headerLevel";

    nameAndTime = document.createElement("span");
    nameAndTime.className = "nameAndTime";

    cardName = document.createElement("p");
    cardName.className = "cardName";
    cardName.innerText = eventObject.name;

    futureTime = document.createElement("p");
    futureTime.className = "futureTime";
    //time magic
    let now = moment();
    let startTime = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " +  eventObject.time);
    futureTime.innerText = moment(startTime).format('hh:mm a');
    
    nameAndTime.appendChild(cardName);
    nameAndTime.appendChild(futureTime);

    futureLocation = document.createElement("p");
    futureLocation.className = "futureLocation";
    futureLocation.innerText = eventObject.location + " " + eventObject.room;

    headerLevel.appendChild(nameAndTime);
    headerLevel.appendChild(futureLocation);
    futureEvent.append(headerLevel);

    bottomLevel = document.createElement("div");
    bottomLevel.className = "bottomLevel";

    description = document.createElement("p");
    description.innerText = eventObject.description;

    bottomLevel.appendChild(description);
    futureEvent.appendChild(bottomLevel);
    const futureContent = document.querySelector(".futureContent");
    futureContent.appendChild(futureEvent);


}

function generateFutureList () {

    let events = JSON.parse(localStorage.getItem("events"));

    if ((events === null)) {
        events = [];
    }
    else {

        let i;
        for (i of events) {
            let time = JSON.parse(localStorage.getItem(i)).time;
            let now = moment();
            time = moment(now.get('year') + " " + (now.get('month') + 1) + " " + now.get('date') + " " + time);
            if (now.diff(time) < 0) {
                createFutureCard(JSON.parse(localStorage.getItem(i)));
            }
        
        }
    }

    const futureContent = document.getElementById("futureContent");
    noMore = document.createElement("p");
    noMore.innerText = "No more...";
    noMore.className= "noMore";
    futureContent.appendChild(noMore);
}

generateFutureList();