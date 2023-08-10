import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Canvas({width, height}){
    const [input, setInput] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const keyDownHandler = (e) => {
            if((e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" ||  e.key == "ArrowRight") && input.indexOf(e.key) === -1)
            {
                input.push(e.key);
                console.log(input);
            }
        }

        const keyUpHandler = (e) => {
            if((e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight")){
                input.splice(input.indexOf(e.key), 1);
                console.log(input);
            }
        }
        

        canvas.addEventListener("keydown", keyDownHandler);
        canvas.addEventListener("keyup", keyUpHandler);

        return () => {
            canvas.removeEventListener("keydown", keyDownHandler);
            canvas.removeEventListener("keyup", keyUpHandler);
        };
    }, []);

    function Player({gameWidth, gameHeight, context}){
        const [width, setWidth] = useState(100);
        const [height, setHeight] = useState(100);
        const [x, setX] = useState(0);
        const [y, setY] = useState(0);

        setY(gameHeight - height);

        function draw(context){
            context.fillStyle = "black";
            context.fillRect(x, y, width, height);
        }

        function update(){
            setX(x++);
        }

        draw(context);
    }

    return(
        <div>
            <Canvas tabIndex="-1" ref={canvasRef} width={width} height={height}>
                
            </Canvas>
        </div>
    );
}