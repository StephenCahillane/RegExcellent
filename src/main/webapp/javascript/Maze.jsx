import React from "react";
import { createRoot }  from 'react-dom/client';
import Canvas from './Canvas.jsx';

export default function Maze(){

    const sampleData = {
        name: "Spikes",
        description: "You come across some deadly moving spikes, you need a SHIELD but not a WHEEL",
        hint: "We use ^ to say 'not' in regex"
    }

    return (
        <div>
            <h1>Game</h1>
            <div>
                <Canvas width={500} height={500}/>
            </div>

            <div className="question-text-box">
                <h4>Trap Encountered!</h4>
                <p>{sampleData.name}</p>
                <p>{sampleData.description}</p>
                <p>Hint: {sampleData.hint}</p>
            </div>
        </div>
    );
}