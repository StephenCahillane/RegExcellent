import React from "react";
import Sliding from './Slider.jsx'

export default function Game(){

    const sampleData = {
        name: "Spikes",
        description: "You come across some deadly moving spikes, you need a SHIELD but not a WHEEL",
        hint: "We use ^ to say 'not' in regex"
    }

    return (
        <div>
            <h1>Game</h1>

            <Sliding />

            <div className="question-text-box">
                <h4>Trap Encountered!</h4>
                <p>{sampleData.name}</p>
                <p>{sampleData.description}</p>
                <p>Hint: {sampleData.hint}</p>
            </div>
        </div>
    );
}