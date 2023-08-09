import React, { useState, useEffect } from 'react';
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
            <Question />
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
    const [entityData, setEntityData] = useState("");
    const endpoint = `/api/questions/152`;

  
    useEffect(() => {
        // Define an async function to fetch the data
        const fetchData = async () => {
          try {
            const response = await fetch(endpoint);
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setEntityData(data);
          } catch (error) {
            console.error('Error fetching entity:', error);
          }
        };
    
        
        fetchData();
      }, []);



    const handleSubmit = () => {
        const candidate = new RegExp(answer);
        console.log(candidate);

        const passwords = entityData.matchWordsString;
        console.log(JSON.stringify(entityData));
        
        
        //column
        console.log(passwords);
        
        const isMatching = candidate.test(passwords);
        console.log("Answer matches:", isMatching);
        
    }


    return (
        <><div>
            <h3>{entityData.name}</h3>
            <p>{entityData.description}</p>
            <p>{entityData.hint}</p>
        </div>
            <div>
                
                <input name="answer" type="text" placeholder="Answer" onChange={(event) => setAnswer(event.target.value)}></input>
                <button onClick={handleSubmit}>Submit Answer</button>
                
            </div></>
    )
}

createRoot(document.getElementById('react-mountpoint')).render(<Main />);