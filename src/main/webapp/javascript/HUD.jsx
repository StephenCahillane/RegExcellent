import React from "react";

export default function HUD({lives, gems}) {
    return(
        <div className="hud">
            <h4>Sir Reginald</h4>
            <h5>Gems: {gems}</h5>
            <div className="lives">
                {new Array(lives).fill(undefined).map((_, index) => <img key={index} src="/images/heart.png"></img>)}
            </div>
        </div>
    );
}