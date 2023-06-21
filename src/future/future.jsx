import React from 'react';
import { makeFuture } from './makeFuture';
export function Future() {

    React.useEffect(() => {
        makeFuture();
    }, []);

    return (
        <>
        <div className="futureBody">
            <div className="navContainer">
            <nav>
                <a href="/now.html"><button className="navElement">Now</button></a>
                <a href="/map.html"><button className="navElement">Map</button></a>
                <a href="/future.html"><button className="navElement">Future</button></a>
            </nav>
            </div>
            <div id="futureContent" className="futureContent">
            </div>
        </div>
        </>
    )
}

