
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
    let startTime = moment(generateDateFromTime(eventObject.time));
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
            time = moment(generateDateFromTime(time));
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

function generateDateFromTime(time) {
    let now = moment();
    let laDate = now.get('year') + "-" 
    + (((now.get('month')+1) >= 10) ? "" : "0" ) + (now.get('month') + 1) + "-" 
    + ((now.get('date') >= 10) ? "" : "0") +  now.get('date') 
    + "T" + time + ":00";
    return laDate;
}

generateFutureList();