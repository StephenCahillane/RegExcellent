import React, { useEffect, useState, useRef } from "react";
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
        setPlayerCol(playerCol + 1);
      }
      
      //Check if camera needs to move forward
      if(playerCol == (left + width - 1)){
        setLeft(playerCol + 1);
      }
    }

    if(e.key === "ArrowLeft" && playerCol > 0){
      if(data[playerRow][playerCol - 1].trap){
        alert("You've triggered a trap!");
      } else {
        setPlayerCol(playerCol - 1);
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
        <table border={0}>
          <tbody>
            {data.slice(bottom, bottom + height).map((dataRow, rowIdx) => (
              <tr key={`Row${bottom + rowIdx}`}>
                {dataRow.slice(left, left + width).map((cell, columnIdx) => (
                  <td key={`Col${left + columnIdx}`}>
                    <Cell cellData={cell} playerRow={playerRow} playerCol={playerCol} />
                  </td>
                ))}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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


export function Cell({ cellData, playerRow, playerCol }) {
  const isPlayerCell = cellData.row === playerRow && cellData.col === playerCol;

  return (
    <div>
      {isPlayerCell ? (
        <img src="knight.png" alt="Character" />
      ) : cellData.trap ? (
        <img src="goblin.png" alt="Goblin Trap" />
      ) : (
        "" // Display empty space for cells without trap
      )}
    </div>
  );
}



