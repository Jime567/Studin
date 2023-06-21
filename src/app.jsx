import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './app.css';
import { Login } from './login/login';
import { Header } from './header/header'
import { Future } from './future/future';
import { Maps } from './maps/maps';
import { Now } from './now/now';
import moment from 'moment';

function NotFound() {
        return <main > 404: Return to Sender. Address Unknown</main>;
}

export default function App() {
    return ( 
        <BrowserRouter>      
        <script src="/moment.min.js"></script>
        <Header />
        <div className="navContainer">
            <nav>
                <NavLink to="/current"><button className="navElement">Now</button></NavLink>
                <NavLink to="/map"><button className="navElement">Map</button></NavLink>
                <NavLink to="/futures"><button className="navElement">Future</button></NavLink>
            </nav>
        </div>
        <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/current" element={<Now />} />
                <Route path="/map" element={<Maps />} />
                <Route path="/futures" element={<Future />} />
                <Route path='*' element={<NotFound />} />
        </Routes>


        <footer>
        <a href="https://github.com/Jime567/startup"><img alt="My Github" className="githubLogo" src="/images/githubLogo.png"/></a>
        <a href="https://jamesephelps.com/projects"><img alt="JP Logo" className="jpLogo" src="/images/JPLogo.png" /></a>
        </footer>
        </BrowserRouter>
        )
}



    