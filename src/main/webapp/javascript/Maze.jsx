import React from "react";
import { createRoot }  from 'react-dom/client';
import Canvas from './Canvas.jsx';

export default function Maze(){
    return (
        <div>
            <h1>Game</h1>
            <div>
                <Canvas width={500} height={500}/>
            </div>
        </div>
    );
}