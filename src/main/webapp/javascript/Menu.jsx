import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import useSound from 'use-sound';
import sound from "../../resources/static/sounds/sinister.mp3" 
import "../css/style.css";
=======


>>>>>>> origin/main

export default function Menu({ isActive }){
    
    const [playSound] = useSound(sound);

    useEffect(()=>{
        playSound();
        // playSound;
    });

    if(isActive){
        return (
            <div on={playSound}>
                <h1 className="menu-header">RegQuest</h1>
                <div className="menu-container">
                    <div className="candle-bg">
                        <img src="images/animated-candle.gif"></img>
                    </div>
                    <div className="btn-container">
                        <Link to="/Game" >
                            <button className="menu-btn" >Begin Quest</button>
                        </Link>
                            <button className="menu-btn" >What is a regular expression?</button>
                        <Link to="/About">
                            <button className="menu-btn" >About the Game</button>
                        </Link>
                        <button className="menu-btn" >Quit</button>
                    </div>
                    <div className="candle-bg">
                        <img src="images/animated-candle.gif"></img>
                    </div>
                </div>
                {/* <button onClick={playSound}>Play Sound</button> */}

            </div>
        );
    }
}