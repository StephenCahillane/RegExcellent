import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '../css/style.css';
import About from "./About";
import Maze from "./Maze";
import Form from './form';

function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Main</Link>
                <Link to="/About">About</Link>
                <Link to="/Maze">Maze</Link>
                <Link to="/form">Form</Link>
            </nav>
            <Outlet />
        </>
    );
}

function Main() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/app4?/src?/main?/resources?/static?/index.html?" element={<Layout />}></Route>

                        <Route path="About" element={<About />} />
                        <Route path="Maze" element={<Maze />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/question" element={<Question />} />

                    
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}


function Question() {



    const [answer, setAnswer] = useState("");
    const [trapID, setTrapID] = useState(0);

    const endpoint = `/api/questions/1`;

  
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(entityData => {
        // Handle the received entity data
        console.log('Fetched entity:', entityData);
        // Update component state or perform other actions
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching entity:', error);
      });
  



    const handleSubmit = () => {
        const candidate = new RegExp(answer);
        console.log(candidate);

        const passwords = ["rope", "flashlight"];//column

        const isMatching = candidate.test(passwords);
        console.log("Answer matches:", isMatching);
        
    }


    return (
        <><div>
            <h3>Question 1</h3>
            <p>pulled from db</p>
        </div>
            <div>
                
                <input name="answer" type="text" placeholder="Answer" onChange={(event) => setAnswer(event.target.value)}></input>
                <button onClick={handleSubmit}>Submit Answer</button>
                
            </div></>
    )
}

createRoot(document.getElementById('react-mountpoint')).render(<Main />);