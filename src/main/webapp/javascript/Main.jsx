import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import About from "./About";
import Game from "./Game";
import Menu from "./Menu";
import Form from './Form';
import Question from './Question';


function Layout() {
    const [menuIsActive, setMenuIsActive] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if(location.pathname == "/"){
            setMenuIsActive(true);
        } else {
            setMenuIsActive(false);
        }
    }, [location])

    if(menuIsActive){
        return (
            <>
                <Menu isActive={menuIsActive} />
            </>
        );
    } else {
        return (
            <>
                <nav>
                    <Link to="/">Main</Link>
                    <Link to="/About">About</Link>
                    <Link to="/Game">Game</Link>
                    <Link to="/Form">Form</Link>
                </nav>
                <Menu isActive={menuIsActive} />
                <Outlet />
            </>
        );
    }
    
}

function Main() {
    return (
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="/app4?/src?/main?/resources?/static?/index.html?" element={<Layout />}>
                            <Route path="About" element={<About />} />
                            <Route path="Game" element={<Game />} />
                            <Route path="Form" element={<Form />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
    );
}




createRoot(document.getElementById('react-mountpoint')).render(<Main />);