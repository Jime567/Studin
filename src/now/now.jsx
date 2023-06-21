import React from 'react';
import { useState, useEffect } from "react";
import { makeNow } from './makeNow';


export function Now() {
    
    useEffect(() => {
        makeNow();
    }, []);
    
    return (
        
        <>
        <div className="nowBody">
           
     
        <button id="addTopButton" className="addTopButton">+</button>

        <div className="form-popup" id="createEventPopUp">
        <form className="form-container">
            <h2>Create Event</h2>

            <p><b>Event Name</b></p>
            <input type="text" id="eventNameInput" placeholder="What is the event?" name="email" />

            <p><b>Description</b></p>
            <textarea id="descriptionInput" 
            rows="3" type="text" wrap="soft" 
            placeholder="Write a short description of the event and mention any requirements"></textarea>
    
                <div className="selectBuilding">
                    <p className="locationInput">Building:</p>
                    <select name="buildings" id="buildingInput">
                    <option value="ASB">ASB Smoot (Abraham O.) Administration Building</option>
                    <option value="BELL">BELL Centennial Carillon Tower </option>
                    <option value="BNSN">BNSN Benson (Ezra Taft) Building</option>
                    <option value="BRMB">BRMB Brimhall (George H.) Building</option>
                    <option value="CONF">CONF BYU Conference Center </option>
                    <option value="CMB">CMB Chemicals Management Building </option>
                    <option value="CB">CB Clyde (W.W.) Engineering Building </option>
                    <option value="CTB">CTB Crabtree (Roland A.) Technology Building </option>
                    <option value="ELLB">ELLB Ellsworth (Leo B.) Building </option>
                    <option value="EB">EB Engineering Building  </option>
                    <option value="ERL">ERL Engineering Research Lab </option>
                    <option value="ESC">ESC Eyring (Carl F.) Science Center </option>
                    <option value="FPH">FPH Former Presidents' Home </option>
                    <option value="HBLL">HBLL Lee (Harold B.) Library</option>
                    <option value="HGB">HGB Testing Center </option>
                    <option value="HCEB">HCEB Harman (Caroline Hemenway) Building </option>
                    <option value="HRCB">HRCB Clark (Herald R.) Building </option>
                    <option value="JRCB">JRCB Clark (J. Reuben) Building  </option>
                    <option value="JKB">JKB Knight (Jesse) Building</option>
                    <option value="JFSB">JFSB Smith (Joseph F.) Building</option>
                    <option value="JSB">JSB Smith (Joseph) Building</option>
                    <option value="KMBL">KMBL Kimball (Spencer W.) Tower </option>
                    <option value="LSB">LSB Life Sciences Building</option>
                    <option value="LSGH">LSGH Life Sciences Greenhouses </option>
                    <option value="MSRB">MSRB Maeser (Karl G.) Building</option>
                    <option value="MB">MB Music Building</option>
                    <option value="MCKB">MCKB McKay (David O.) Building</option>
                    <option value="NICB">NICB Nicholes (Joseph K.) Building (Chemical Stores) </option>
                    <option value="RMB">RMB Risk Management Building </option>
                    <option value="ROTC">ROTC Wells (Daniel H.) Building (ROTC)</option>
                    <option value="RB">RB Richards (Stephen L.) Building</option>
                    <option value="SNLB">SNLB Snell (William H.) Building</option>
                    <option value="SFH">SFH Smith (George Albert) Fieldhouse</option>
                    <option value="TMCB">TMCB Talmage (James E.) Math Sciences/Computer Building</option>
                    <option value="TNRB">TNRB Tanner (N. Eldon) Building</option>
                    <option value="TLRB">TLRB Taylor (John) Building (Comprehensive Clinic)</option>
                    <option value="UPC">UPC University Parkway Center</option>
                    <option value="WVB">WVB West View Building </option>
                    <option value="WSC">WSC Ernest L. Wilkinson Center</option>
                    
                    </select>
                </div>
                <div className="roomTime">
                    <span>
                        <p className="locationInput">Room #:</p>
                        <input id="roomInput" type="text" className="roomInput" placeholder="#" name="email" />
                    </span>
                        <span>
                            <p className="locationInput">Time:</p>
                            <input id="timeInput" type="time" className="roomInput" placeholder="#" name="email" />
                        </span>
                </div>

            


            <span className="popUpButtons">
                <button id="addEventButton" type="button">Add</button>
                <button type="button" id="popCancel" className="popCancel">Close</button>
            </span>
        </form>
        </div> 

        <div className="content">
            
                

            
                </div>
                <div className="popUpButton">
                    <img src="/images/plus.png" id="openForm" className="openForm" />
            
        </div>
    </div>
</>
    )
}