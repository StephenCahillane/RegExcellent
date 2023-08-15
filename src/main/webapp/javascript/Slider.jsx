import React, { useEffect, useState, useRef } from "react";
import { Animate, AnimateKeyframes } from "react-simple-animate";
import '../css/style.css';


export default function Sliding() {

  const [data, setData] = useState([[]]);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [height, setHeight] = useState(5);
  const [width, setWidth] = useState(5);

  //Player coordinates and input
  const [playerRow, setPlayerRow] = useState(0);
  const [playerCol, setPlayerCol] = useState(0);

  //Animation states
  const [animate, setAnimate] = useState(true);
  const [animateStart, setAnimateStart] = useState({});
  const [animateEnd, setAnimateEnd] = useState({});
  const [subAnimateStart, setSubAnimateStart] = useState({});
  const [subAnimateEnd, setSubAnimateEnd] = useState({});

  const [animateDuration, setAnimateDuration] = useState(2);
  const [animateEaseType, setAnimateEaseType] = useState("ease-in-out");
  const [animationCallback, setAnimationCallback] = useState(() => () => {});


  const forward = () => {
    setAnimate(true);
    // setAnimateStart({ transform: "translateX(0%)" });
    // setAnimateEnd({ transform: "translateX(-20%)" });
    setSubAnimateStart({ transform: "translateX(0%)" });
    setSubAnimateEnd({ transform: "translateX(100%)" });
    setAnimateDuration(0.5);
    setAnimationCallback(() => () => {
      //setLeft((col) => col + 1);
      setPlayerCol((col) => col + 1);
      setAnimate(false);
      setAnimationCallback(() => () => {});
      setAnimateDuration(0.0);
    });
  };

  const backward = () => {
    if (playerCol <= 0) return;
    setAnimate(true);
    // setAnimateStart({ transform: "translateX(0%)" });
    // setAnimateEnd({ transform: "translateX(20%)" });
    setSubAnimateStart({ transform: "translateX(0%)" });
    setSubAnimateEnd({ transform: "translateX(-100%)" });
    setAnimateDuration(0.5);
    setAnimationCallback(() => () => {
      // setLeft((col) => col - 1);
      setPlayerCol((col) => col - 1);
      setAnimate(false);
      setAnimationCallback(() => () => {});
      setAnimateDuration(0.0);
    });
  };

  useEffect(() => {
    
    function cell(row, col) {
      let trap = undefined;
      if (col % 3 === 0 && col != 0) {
        trap = "trap" + Math.ceil(col / 3);
      }
      return { row: row, col: col, trap: trap };
    }
    setData(new Array(1).fill(undefined).map((_, row) => new Array(31).fill(undefined).map((_, col) => cell(row, col)
    )))
  }, [rows, columns])

  const handlePlayerMove = (e) => {
    if(e.key === "ArrowRight" && playerCol < columns){
      if(data[playerRow][playerCol + 1].trap){
        alert("You've triggered a trap!");
      } else {
        forward();
      }
      
      //Check if camera needs to move forward
      if(playerCol == (left + width - 1)){
        setLeft(playerCol + 1);
      }
    }

    if(e.key === "ArrowLeft" && playerCol > 0){
      if(data[playerRow][playerCol - 1].trap){
        alert("You've triggered a trap!");
        backward();
      } else {
        backward();
      }
      
      //Check if camera needs to move backward
      if(playerCol <= left){
        setLeft(playerCol - width);
      }
    }
  }

  const handleManualSlide = () => {
    if (left + width < columns) {
      setLeft(left => left + 1);
    } else {
      setLeft(0);
      if (bottom + height < rows) {
        setBottom(bottom => bottom + 1);
      } else {
        setBottom(0);
      }
    }
  };

  return (
    <div>
      {/* <Knob getter={rows} setter={setRows} text="Row" />
      <Knob getter={columns} setter={setColumns} text="Columns" />
      <Knob getter={bottom} setter={setBottom} text="Bottom" />
      <Knob getter={left} setter={setLeft} text="Left" />
      <Knob getter={height} setter={setHeight} text="Height" />
      <Knob getter={width} setter={setWidth} text="Width" />
      <Knob getter={playerRow} setter={setPlayerRow} text="playerRow"/>

      <Knob getter={playerCol} setter={setPlayerCol} text="playerCol"/> */}
      {/* <button onClick={handleManualSlide}>Slide Manually</button> */}
      <div onKeyDown={handlePlayerMove} tabIndex={0}>

      {/* <Knob getter={playerCol} setter={setPlayerCol} text="playerCol"/> */}
      {/* <button onClick={handleManualSlide}>Slide Manually</button> */}
      <div onKeyDown={handlePlayerMove} tabIndex={0}>
        <table border={0}>
          <tbody>
            {data.slice(bottom, bottom + height).map((dataRow, rowIdx) => (
              <tr key={`Row${1 * bottom + rowIdx}`}>
                {dataRow.slice(left, left + width).map((cell, columnIdx) => (
                  <td key={`Col${1 * left + columnIdx}`}>
                    <CellComponent
                      cell={cell}
                      playerRow={playerRow}
                      playerCol={playerCol}
                      animate={animate}
                      animateDuration={animateDuration}
                      animateEaseType={animateEaseType}
                      subAnimateStart={subAnimateStart}
                      subAnimateEnd={subAnimateEnd}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div></div></div>
  )


function CellComponent({
  cell,
  playerRow,
  playerCol,
  animate,
  animateDuration,
  animateEaseType,
  subAnimateStart,
  subAnimateEnd,
}) {
  if (cell.row == playerRow && cell.col == playerCol)
    return (
      <Animate
        play={animate}
        duration={animateDuration}
        start={subAnimateStart}
        end={subAnimateEnd}
        complete={subAnimateStart}
        easeType={animateEaseType}
      >
        <img src="knight.png" alt="Character" />
      </Animate>
    );
  else if(cell.trap){
    return (
    <>
      <img src="goblin.png" alt="Goblin Trap" />
    </>
    );
  } else {
    return "";
  }
}

function Knob({ getter, setter, text }) {
  
  return (
    <>
      <button onClick={() => setter((n) => (n > 0 ? n - 1 : 0))}>--</button>
      {text}: {getter}
      {<button onClick={() => setter((n) => n + 1)}>++</button>}
      <br />
    </>
  );
}


// export function Cell({ cellData, playerRow, playerCol }) {
//   const isPlayerCell = cellData.row === playerRow && cellData.col === playerCol;

//   return (
//     <div>
//       {isPlayerCell ? (
//         <img src="knight.png" alt="Character" />
//       ) : cellData.trap ? (
//         <img src="goblin.png" alt="Goblin Trap" />
//       ) : (
//         "" // Display empty space for cells without trap
//       )}
//     </div>
//   );
// }


}
