import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Canvas({width, height}){
    const [input, setInput] = useState([]);

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        canvas.addEventListener('keydown', function(e){
            console.log(e);
        })
    }, []);

    return(
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    );
}