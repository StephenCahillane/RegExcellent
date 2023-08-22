import React, { useEffect, useState, useRef } from "react";
import { Animate, AnimateKeyframes } from "react-simple-animate";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Question from './Question'
import HUD from './hud.jsx';


export default function Sliding() {
  const [data, setData] = useState([[]]);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(35);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [height, setHeight] = useState(5);
  const [width, setWidth] = useState(5);


  //Player coordinates and details
  const [playerRow, setPlayerRow] = useState(0);
  const [playerCol, setPlayerCol] = useState(0);
  const [lives, setLives] = useState(3);
  const [gems, setGems] = useState(0);
  const [playerClassName, setPlayerClassName] = useState("player-sprite-sheet pixel-art face-right");
  const [playerFacing, setPlayerFacing] = useState("");

  //Animation states
  const [animate, setAnimate] = useState(true);
  const [animateStart, setAnimateStart] = useState({});
  const [animateEnd, setAnimateEnd] = useState({});
  const [subAnimateStart, setSubAnimateStart] = useState({});
  const [subAnimateEnd, setSubAnimateEnd] = useState({});
  const [trapID, setTrapID] = useState(undefined);
  const [onTrapSpace, setOnTrapSpace] = useState(false);

  const [animateDuration, setAnimateDuration] = useState(2);
  const [animateEaseType, setAnimateEaseType] = useState("ease-in-out");
  const [animationCallback, setAnimationCallback] = useState(() => () => { });

  const navigate = useNavigate();


  useEffect(() => {
    if (playerCol % 3 == 0 && playerCol != 0) {
      setTrapID((playerCol / 3) - 1)
      setOnTrapSpace(true);
      setTutorial(true);
    } else {
      setTrapID(undefined)
      setOnTrapSpace(false);
    }
  }, [playerCol])

  useEffect(() => {
    if(lives < 1){
      if(confirm("You've run out of lives! Would you like to retry your quest?")){
        setPlayerCol(0);
        setLives(3);
      } else {
        navigate("/");
      }
    }
  }, [lives])

  const forward = () => {
    setAnimate(true);
    // setAnimateStart({ transform: "translateX(0%)" });
    // setAnimateEnd({ transform: "translateX(-20%)" });

    setSubAnimateStart({ transform: "translateX(0%)" });
    setSubAnimateEnd({ transform: "translateX(55%)" });

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
    if (playerFacing === "left") {
      setPlayerClassName("player-sprite-sheet pixel-art face-left");
    } else {
      setPlayerClassName("player-sprite-sheet pixel-art face-right");
    }
  }, [playerFacing]);

  const handlePlayerMove = (e) => {
    if (e.key === "ArrowRight" && playerCol < columns && !onTrapSpace) {
      setPlayerFacing("right");
      forward();

      //Check if camera needs to move forward
      if (playerCol == left + width - 1) {
        setLeft(playerCol + 1);
      }
    }

    if (e.key === "ArrowLeft" && playerCol > 1 && !onTrapSpace) {
      setPlayerFacing("left");
      backward();

      //Check if camera needs to move backward
      if (playerCol <= left) {
        setLeft(playerCol - width);
      }
    }
  }

  const [tutorial, setTutorial] = useState(true);
  const [tutorialText, setTutorialText] = useState("Welcome to RegQuest, the ultimate adventure where you'll embark on a journey through tutorials and cunning traps to hone your regex matching skills. Your epic quest into the world of regular expressions starts here, and here's the twist: you'll need to use regular expressions to match the passwords that operate each trap. This means that not only will you learn about regular expressions, but you'll also put your knowledge to the test by crafting regex patterns to overcome obstacles and unlock your path to victory. Are you ready to embrace the challenge and emerge victorious?");


  const handleTutorial = () => {
    setTutorial(false)
  }




  const [answerMatched, setAnswerMatched] = useState(false);

  const handleAnswerChecked = (isMatching) => {
    setAnswerMatched(isMatching);
  }

 

  const renderTutorialContent = () => {
    switch (trapID) {
      case 0:
        setTutorialText("For this lesson, your goal is to match specific literal characters in a text. This is the foundation of regular expressions, and it will help you get comfortable with the basic syntax. Try to match exactly what you see in the text.")
        break;
      case 1:
        setTutorialText("Square brackets [ ] allow you to match a single character from a set of characters you specify. Examples:[aeiou] matches any one of the lowercase vowels ('a,' 'e,' 'i,' 'o,' 'u').[0-9] matches any digit from 0 to 9.");
        break;
      case 2:
        setTutorialText("The period character (.) in regular expressions is a special metacharacter that matches any single character. While the period character is powerful for matching any character, be mindful that it might match unintended characters.")
        break;
      case 3:
        setTutorialText("Caret Inside Character Class: When the caret symbol (^) is used inside a character class (square brackets [ ]), it negates the character class, making it match any character that is not in the specified set. For example, [^0-9] matches any character that is not a digit.")
        break;
      case 4:
        setTutorialText("Ranges in square brackets, like [a-z], are a powerful feature in regular expressions. They allow you to match any single character that falls within a specified range of characters.")
        break;
      case 5:
        setTutorialText(" [^2-5] is a character class that matches any single character that is not in the range from '2' to '5'. It essentially excludes characters '2,' '3,' '4,' and '5.' Examples:[0-9] matches any digit from '0' to '9,' but [^0-9] matches any character that is not a digit.")
        break;
      case 6:
        setTutorialText("[^] can be used to filter out or exclude specific characters from your text data. For example, you might want to find all characters that are not digits between '2' and '5' in a string.")
        break;
      case 7:
        setTutorialText("The {} quantifier allows you to specify exactly how many times a character or group of characters should be repeated in a regular expression. Other Quantifiers: Besides {3} to specify an exact count, you can use other quantifiers like:* to match 0 or more occurrences (e.g., az*up matches 'aup,' 'azup,' and 'azzzup'). + to match 1 or more occurrences (e.g., az+up matches 'azup' and 'azzzup' but not 'aup').? to match 0 or 1 occurrence (e.g., colou?r matches 'color' and 'colour').")
        break;
      case 8:
        setTutorialText("The + quantifier in a regular expression allows you to match one or more occurrences of the preceding character or group. In the pattern 'c+' it matches one or more 'c' characters in sequence. Examples: 'c+' matches 'c' (one 'c'), 'cc' (two 'c's), 'ccc' (three 'c's), and so on. It requires at least one 'c' to match. 'ca+b' matches 'cab,' 'caab,' 'caaab,' and so on because it looks for one or more 'a' characters followed by 'b'. Quantifier Comparison: * matches 0 or more occurrences (e.g., c* matches '', 'c', 'cc', ...). + matches 1 or more occurrences (e.g., c+ matches 'c', 'cc', 'ccc', ...). ? matches 0 or 1 occurrence (e.g., c? matches '', 'c').")
        break;
      case 9:
        setTutorialText("The caret ^ and dollar sign $ are anchors in regular expressions that specify the position within a line of text. ^ Caret Anchor: It matches the start of a line. When you use ^ at the beginning of a regular expression, it signifies that the pattern must begin at the very start of a line. $ Dollar Sign Anchor: It matches the end of a line. When you use $ at the end of a regular expression, it signifies that the pattern must end at the very end of a line. Examples: Pattern: ^Hello Explanation: This pattern matches lines that start with the word 'Hello.' The caret ^ specifies that 'Hello' must appear at the very beginning of the line. Pattern: '\?$' Explanation: This pattern matches lines that end with a question mark ?. The dollar sign $ specifies that the question mark must appear at the very end of the line. Pattern: '^\d+$' Explanation: This pattern matches lines that contain only digits 0-9. The caret ^ and dollar sign $ together ensure that the entire line consists of digits.")
        break;
    }
  };


  useEffect(() => {
    renderTutorialContent();
  }, [playerCol, trapID]);





  return (
    <div>


      <div onKeyDown={handlePlayerMove} tabIndex={0}>



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
            lives={lives}
            gems={gems}
            />

          {tutorial && (<div className="tutorialBox">
            <p className="tutorialText">
              {tutorialText}
            </p>
            <button onClick={handleTutorial}>Close</button>
          </div>)}
        </Animate>
      </div>
      <br></br>
      <Question setOnTrapSpace={setOnTrapSpace} onAnswerChecked={handleAnswerChecked} index={trapID} lives={lives} setLives={setLives} gems={gems} setGems={setGems}/>
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
  playerClassName,
  lives,
  gems
}) {
  return (
    <div onKeyDown={handlePlayerMove} tabIndex={0}>
      <table border={0}>
        <tbody>
          {data.slice(bottom, bottom + height).map((dataRow, rowIdx) => (
            <tr key={`Row${1 * bottom + rowIdx}`}>
            <HUD lives={lives} gems={gems}/>
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
  );
}


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
          <img className={playerClassName} src="images/knight-sprite.png"></img>
        </div>
      </Animate>

    );
  else if (cell.trap) {
    return (
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
      trapImage = <img src="css/images/spike trap.png" alt="Trap 1" />;
      break;
    case 2:
      trapImage = (
        <img src="css/images/clipart-alligator-dancing-16.png" alt="Trap 2" />
      );
      break;
    case 3:
      trapImage = <img src="css/images/lockeddoor.png" alt="Trap 3" />;
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
      trapImage = <img src="css/images/bats.png" alt="Trap 7" />;
      break;
    case 8:
      trapImage = (
        <img
          src="css/images/bf5296e44b0cc8663c71fee6d67aa879.png"
          alt="Trap 8"
        />
      );
      break;
    case 9:
      trapImage = (
        <img src="css/images/Ancient_tablet_lost_city.png" alt="Trap 9" />
      );
      break;
    case 10:
      trapImage = <img src="css/images/final door.png" alt="Trap 10" />;
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
