import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '../css/style.css';

function Layout() {
    return (
        <>
            <nav>
                <Link to="/main"></Link>
                <Link to="/question">Questions</Link>
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
                    <Route path="/question" element={<Question/>}></Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}


function Question() {



    const [answer, setAnswer] = useState("");

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