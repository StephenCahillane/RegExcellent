import React from "react";
import { createRoot }  from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '../css/style.css';
import About from "./About";
import Maze from "./Maze";


function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Main</Link>
                <Link to="/About">About</Link>
                <Link to="/Maze">Maze</Link>
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
                        <Route path="About" element={<About />} />
                        <Route path="Maze" element={<Maze />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

createRoot(document.getElementById('react-mountpoint')).render(<Main />);