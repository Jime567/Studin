import moment from "moment";
import { useNavigate } from 'react-router-dom';
export async function makeLogin() {
    const nav = document.querySelector(".header");
    nav.style.display = "none";
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
            //move pages here
            window.location.replace("/current");
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
        logIn(user);
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
    
    
    
    ///auto generating sample events stuff 
    let now = moment();
    
    function generateSampleCards() {
    
        let card1Name = "ACME Club";
        deleteEvent(card1Name);
        let card1Description = "Get yet another free ACME shirt and enjoy pizza for all your needs.";
        let card1Time = moment().subtract(33, 'minute');
        card1Time = moment(card1Time).format('HH:mm');
        let card1Location = "ASB";
        let card1Room = "3209A";
    
        let card2Name = "Dean's Dinner";
        deleteEvent(card2Name);
        let card2Description = "School of Music dinner for dean's list students and friends. Honoring their amazing accomplishments as students. Solely bread will be served";
        let card2Time = moment().subtract(18, 'minute');
        card2Time = moment(card2Time).format('HH:mm');
        let card2Location = "MB";
        let card2Room = "125";
        
        let card3Name = "Career Fair";
        deleteEvent(card3Name);
        let card3Description = "Some of the company booths feature free food. So-in-so company on the south side has good eclairs";
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
        
        createEvent(card3Name, card3Description, card3Location, card3Room, card3Time);
        createEvent(card2Name, card2Description, card2Location, card2Room, card2Time);
        createEvent(card1Name, card1Description, card1Location, card1Room, card1Time);
        createEvent(card4Name, card4Description, card4Location, card4Room, card4Time);
        createEvent(card5Name, card5Description, card5Location, card5Room, card5Time);
        createEvent(card6Name, card6Description, card6Location, card6Room, card6Time);
        // generateCardList();
        
    }
    
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
        //  sendEvent(newEvent);
    }
    
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
    
    
    generateSampleCards();

}