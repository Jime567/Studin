
function gatherInput() {
    let idInput = document.getElementById("idInput");
    let passwordInput = document.getElementById("passwordInput");

    let id = idInput.value;
    let password = passwordInput.value;
    if (id === "" || password === "") {
        alert("Cannot be Empty");
    }
    else {
        idInput.value = "";
        passwordInput = "";
        let user = {
            dinID: id,
            password: password
        }
        console.log(user);
        createAccount(user);
        //window.location.replace("/now.html");
    }
}

function gatherInputLog() {
    let idInput = document.getElementById("idInput");
    let passwordInput = document.getElementById("passwordInput");

    let id = idInput.value;
    let password = passwordInput.value;
    if (id === "" || password === "") {
        alert("Cannot be Empty");
    }
    else {
        idInput.value = "";
        passwordInput = "";
        let user = {
            dinID: id,
            password: password
        }
        console.log(user);
        logIn(user);

        
    }
}

//log in function
async function logIn(user) {
    const response = await fetch('/auth/login', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    

    if (!response.ok) {
        alert("Incorrect DinID or Password");
        return;
    }
    else {
        window.location.replace("/now.html"); 
    }
}

//create account function
async function createAccount(user) {
    const response = await fetch('/auth/create', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
}
//sign in button
const signInBtn = document.getElementById("signInButton");
signInBtn.addEventListener("click", function () {
    gatherInputLog();
});

//create account button
const createAccountBtn = document.getElementById("createAccount");
createAccountBtn.addEventListener("click", function () {
    gatherInput();
});



//lame weather api call stuff
function getWeather() {
    let key = "32bf695e85986b57f45f1127f6cdfd72";
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 5780026 + '&appid=' + key)
    .then(function(res) {
        return res.json();
    })
    .then( function(data) {
        console.log(data.weather);
        document.getElementById("weather").innerText = data.name + " Weather: " + data.weather[0].description + ", " + Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32) + "°";
    })
   
}
getWeather();

