
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
    localStorage.removeItem("user");
    window.location.replace("/index.html");
});

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

function createFutureCard(eventObject) {

    let futureEvent = document.createElement("div");
    futureEvent.className = "futureEvent";

    let headerLevel = document.createElement("div");
    headerLevel.className = "headerLevel";

    let nameAndTime = document.createElement("span");
    nameAndTime.className = "nameAndTime";

    let cardName = document.createElement("p");
    cardName.className = "cardName";
    cardName.innerText = eventObject.name;

    let futureTime = document.createElement("p");
    futureTime.className = "futureTime";
    //time magic
    let now = moment();
    let startTime = moment(generateDateFromTime(eventObject.time));
    futureTime.innerText = moment(startTime).format('hh:mm a');

    nameAndTime.appendChild(cardName);
    nameAndTime.appendChild(futureTime);

    let futureLocation = document.createElement("p");
    futureLocation.className = "futureLocation";
    futureLocation.innerText = eventObject.location + " " + eventObject.room;

    headerLevel.appendChild(nameAndTime);
    headerLevel.appendChild(futureLocation);
    futureEvent.append(headerLevel);

    let bottomLevel = document.createElement("div");
    bottomLevel.className = "bottomLevel";

    let description = document.createElement("p");
    description.innerText = eventObject.description;

    bottomLevel.appendChild(description);
    futureEvent.appendChild(bottomLevel);
    const futureContent = document.querySelector(".futureContent");
    futureContent.appendChild(futureEvent);


}

async function generateFutureList () {

    let events = await getEvents();

    if ((events === null)) {
        events = [];
    }
    else {

        let i;
        for (i of events) {
            let time = i.time;
            let now = moment();
            time = moment(generateDateFromTime(time));
            if (now.diff(time) < 0) {
                createFutureCard(i);
            }
        
        }
    }

    const futureContent = document.getElementById("futureContent");
    let noMore = document.createElement("p");
    noMore.innerText = "No more...";
    noMore.className= "noMore";
    futureContent.appendChild(noMore);
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

function generateDateFromTime(time) {
    let now = moment();
    let laDate = now.get('year') + "-" 
    + (((now.get('month')+1) >= 10) ? "" : "0" ) + (now.get('month') + 1) + "-" 
    + ((now.get('date') >= 10) ? "" : "0") +  now.get('date') 
    + "T" + time + ":00";
    return laDate;
}

generateFutureList();