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

  //Player coordinates and details
  const [playerRow, setPlayerRow] = useState(0);
  const [playerCol, setPlayerCol] = useState(0);
  const [playerClassName, setPlayerClassName] = useState("player-sprite-sheet pixel-art face-right");

  const [playerFacing, setPlayerFacing] = useState("");


  //Animation states
  const [animate, setAnimate] = useState(true);
  const [animateStart, setAnimateStart] = useState({});
  const [animateEnd, setAnimateEnd] = useState({});
  const [subAnimateStart, setSubAnimateStart] = useState({});
  const [subAnimateEnd, setSubAnimateEnd] = useState({});

  const [playerFacing, setPlayerFacing] = useState("");

  const [animateDuration, setAnimateDuration] = useState(2);
  const [animateEaseType, setAnimateEaseType] = useState("ease-in-out");
  const [animationCallback, setAnimationCallback] = useState(() => () => { });

  const forward = () => {
    setAnimate(true);
    // setAnimateStart({ transform: "translateX(0%)" });
    // setAnimateEnd({ transform: "translateX(-20%)" });

    setSubAnimateStart({ transform: "translateX(0%)"});
    setSubAnimateEnd({ transform: "translateX(55%)"});

    setAnimateDuration(0.5);
    setAnimationCallback(() => () => {
      //setLeft((col) => col + 1);
      setPlayerCol((col) => col + 1);
      setAnimate(false);
      setAnimationCallback(() => () => { });
      setAnimateDuration(0.0);
    });
  };
  const backward = () => {
    if (playerCol <= 0) return;
    setAnimate(true);
    // setAnimateStart({ transform: "translateX(0%)" });
    // setAnimateEnd({ transform: "translateX(20%)" });
    setSubAnimateStart({ transform: "translateX(0%)" });

    setSubAnimateEnd({ transform: "translateX(-55%)" });

    setAnimateDuration(0.5);
    setAnimationCallback(() => () => {
      // setLeft((col) => col - 1);
      setPlayerCol((col) => col - 1);
      setAnimate(false);
      setAnimationCallback(() => () => { });
      setAnimateDuration(0.0);
    });
  };
  useEffect(() => {
    function cell(row, col) {
      let trap = undefined;
      if (col % 3 === 0 && col != 0) {
        trap = Math.ceil(col / 3);
      }
      return { row: row, col: col, trap: trap };
    }

    setData(
      new Array(1)
        .fill(undefined)
        .map((_, row) =>
          new Array(31).fill(undefined).map((_, col) => cell(row, col))
        )
    );
  }, [rows, columns]);

  useEffect(() => {
    if(playerFacing === "left"){

      setPlayerClassName("player-sprite-sheet pixel-art face-left");
    } else {
      setPlayerClassName("player-sprite-sheet pixel-art face-right");
    }
  }, [playerFacing])

  const handlePlayerMove = (e) => {
    if(e.key === "ArrowRight" && playerCol < columns){
      if(data[playerRow][playerCol + 1].trap){
        //alert("You've triggered a trap!");
        setPlayerFacing("right");
        forward();
      } else {
        setPlayerFacing("right");
        forward();
      }
      //Check if camera needs to move forward
      if (playerCol == (left + width - 1)) {
        setLeft(playerCol + 1);
      }
    }

    if(e.key === "ArrowLeft" && playerCol > 0){
      if(data[playerRow][playerCol - 1].trap){
        //alert("You've triggered a trap!");
        setPlayerFacing("left");
        backward();
      } else {
        setPlayerFacing("left");
        backward();
      }
      //Check if camera needs to move backward
      if (playerCol <= left) {
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

        <Knob getter={playerCol} setter={setPlayerCol} text="playerCol"/>
        <button onClick={handleManualSlide}>Slide Manually</button>

        <Animate
          play={animate}
          duration={animateDuration}
          start={animateStart}
          end={animateEnd}
          complete={animateStart}
          easeType={animateEaseType}
          onComplete={animationCallback}
        >
          <GridComponent
            data={data}
            bottom={bottom}
            left={left}
            height={height}
            width={width}
            playerRow={playerRow}
            playerCol={playerCol}
            animate={animate}
            animateDuration={animateDuration}
            animateEaseType={animateEaseType}
            subAnimateStart={subAnimateStart}
            subAnimateEnd={subAnimateEnd}
            handlePlayerMove={handlePlayerMove}
            playerClassName={playerClassName}
          />
        </Animate>
      </div>
    </div>
  );
}

function GridComponent({
  data,
  bottom,
  left,
  height,
  width,
  playerRow,
  playerCol,
  animate,
  animateDuration,
  animateEaseType,
  subAnimateStart,
  subAnimateEnd,
  handlePlayerMove,
  playerClassName
}) {
  return (
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
                      playerClassName={playerClassName}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );}

  
  
  function CellComponent({
    cell,
    playerRow,
    playerCol,
    animate,
    animateDuration,
    animateEaseType,
    subAnimateStart,
    subAnimateEnd,
    playerClassName,
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
        <div className="player">

          {/* <PlayerImage src="images/player-sprite-sheet.png" playerFacing={playerFacing}></PlayerImage> */}
          <img className={playerClassName} src="images/player-sprite-sheet.png"></img>
        </div>
      </Animate>
    );

  else if (cell.trap) {
   

      <Trap cell={cell} />

    );
  }

  else {
    return <div></div>;
  }
}



function Trap({ cell }) {
let trapImage;

  switch (cell.trap) {
    case 1:
      trapImage = <img src="css/images/lockeddoor.png" alt="Trap 1" />;
      break;
    case 2:
      trapImage = <img src="css/images/clipart-alligator-dancing-16.png" alt="Trap 2" />;
      break;
    case 3:
      trapImage = <img src="css/images/spike trap.png" alt="Trap 3" />;
      break;
    case 4:
      trapImage = <img src="css/images/mysticStew.png" alt="Trap 4" />;
      break;
    case 5:
      trapImage = <img src="css/images/underground river.jpg" alt="Trap 5" />;
      break;
    case 6:
      trapImage = <img src="css/images/switch-right_360.png" alt="Trap 6" />;
      break;
    case 7:
      trapImage = <img src="css/images/bats/png" alt="Trap 7" />;
      break;
    case 8:
      trapImage = <img src="css/images/bf5296e44b0cc8663c71fee6d67aa879.png" alt="Trap 8" />;
      break;
    case 9:
      trapImage = <img src="css/images/Ancient_tablet_lost_city.png" alt="Trap 9" />;
      break;
    case 10:
      trapImage = <img src="css/images/final door" alt="Trap 10" />;
      break;

  }
  return (
    <div className="trap">
      {trapImage}
    </div>
  );
};





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


