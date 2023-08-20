import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Menu({ isActive }){

    if(isActive){
        return (
            <div>
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
            </div>
        );
    }
}