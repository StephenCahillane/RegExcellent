import React from "react";
import { createRoot }  from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '../css/style.css';

function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Main</Link>
                <Link to="/question">Questions</Link>
            </nav>
            <Outlet />
        </>
    );
}

function Main(){
    return(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/app4?/src?/main?/resources?/static?/index.html?" element={<Layout />}>
                        <Route path="/" element={<Main />} />
                        <Route path="/question" element={<Question />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}


function Question() {


    return (
        <><div>
            <h3>Question 1</h3>
            <p>pulled from db</p>
        </div>
        <div>
            <input type="text" placeholder="Answer"></input>
        </div></>
    )
}

createRoot(document.getElementById('react-mountpoint')).render(<Main />);