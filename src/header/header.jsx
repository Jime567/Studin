import React from 'react';
import { makeHeader } from './makeHeader';
export function Header() {

    React.useEffect(() => {
        makeHeader();
    }, []);

    return (
        <>
        <div className="header">
            <span>
                    <a href="https://studin.jamesephelps.com"> <img id="logoIMG" className="logoIMG" alt="STUDIN LOGO" src="/images/studinPNGWhite.png" width="200" /></a>   
            </span>
                <span>
                    <div id="dropDown" className="dropDown" >
                        <img src="/images/profile.png" id="profileImg" className="profileImg" />
                        <div id="dropContent" className="dropContent">
                            <div className="topLevelProfile">
                                <h2 id="userNameText">User Name</h2>
                                <div id="xBtn"><img  className="xBtn" src="/images/x.png" /></div>
                            </div>
                            <h3>Change Password</h3>
                            <input id="currPassword" type="password" placeholder="Current Password" />
                            <input id="newPassword" type="password" placeholder="New Password" />
                            <div className="profileButtons">
                                <button id="changePassword">Change</button>
                                
                                <button id="signOutButton">Sign Out</button>
                                
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        </> 
    )
}