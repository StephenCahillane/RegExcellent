import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import useSound from 'use-sound';
import "../css/style.css";
import sound from "../../resources/static/sounds/sinister.mp3" 
export default function Menu(){
    const [isActive, setIsActive] = useState(true);
    const [playSound] = useSound(sound);
    const toggleActive = () => {
        setIsActive((current) => !current);
    }

    useEffect(()=>{
        playSound();
        // playSound;
    });

    if(isActive){
        return (
            <div on={playSound}>
                <h1 className="menu-header">RegQuest</h1>
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
                {/* <button onClick={playSound}>Play Sound</button> */}

            </div>
        );
    }
}