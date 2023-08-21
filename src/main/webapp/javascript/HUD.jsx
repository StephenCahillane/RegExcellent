import React from "react";

export default function HUD() {
    return(
        <div className="hud">
            <h4>Sir Reginald</h4>
            <h5>Shillings: 0</h5>
            <div className="lives">
                <img src="/images/heart.png"></img>
                <img src="/images/heart.png"></img>
                <img src="/images/heart.png"></img>
            </div>
        </div>
    );
}