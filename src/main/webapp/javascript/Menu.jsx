import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import "../css/style.css";

export default function Menu(){
    const [isActive, setIsActive] = useState(true);

    const toggleActive = () => {
        setIsActive((current) => !current);
    }

    if(isActive){
        return (
            <div>
                <h1 className="menu-header">RegQuest</h1>
                <div className="menu-container">
                    <div>
                        <img src="images/animated-candle.gif"></img>
                    </div>
                    <div className="btn-container">
                        <Link to="/Maze" >
                            <button className="menu-btn" onClick={toggleActive}>Begin Quest</button>
                        </Link>
                            <button className="menu-btn" onClick={toggleActive}>What is a regular expression?</button>
                        <Link to="/About">
                            <button className="menu-btn" onClick={toggleActive}>About the Game</button>
                        </Link>
                        <button className="menu-btn" onClick={toggleActive}>Quit</button>
                    </div>
                    <div>
                        <img src="images/animated-candle.gif"></img>
                    </div>
                </div>
            </div>
        );
    }
}