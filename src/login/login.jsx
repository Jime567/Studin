import React from 'react';
import { makeLogin } from './makeLogin';


export function Login() {

    React.useEffect(() => {
        makeLogin();
    }, []);

    return (
        <>
           <span className="head">
                <a href="https://studin.jamesephelps.com"><img className="logoIMG" alt="STUDIN LOGO" 
                src="/images/studinPNGWhite.png" width='200' /></a>            
                </span> 
 
         <div className="main">
        <div className="logInScreen">
        <img className="img1" src="/images/studinPNGWhite.png"/>
        <h2>Student Dining</h2>
        <form className="loginInputs" action="/now.html">
            <input id="idInput" type="text" placeholder="Din ID"/>
            <input id="passwordInput" type="password" placeholder = "Password"/>
        </form>
        <span className="signInButtonContainer">
        <button className="signInButton" id="signInButton">Sign In</button>
        <button className="signInButton" id="createAccount">Create</button>
        </span>
        </div>
        <p id="weather"></p>
        </div> 
        </>
    )
}