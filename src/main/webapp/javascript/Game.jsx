import React from "react";
import Sliding from './Slider.jsx'

import Question from "./Question.jsx";


export default function Game(){

    const sampleData = {
        name: "Spikes",
        description: "You come across some deadly moving spikes, you need a SHIELD but not a WHEEL",
        hint: "We use ^ to say 'not' in regex"
    }

    return (
        <div>
            

            <Sliding />
            <br></br>
            <Question />
        </div>
    );
}