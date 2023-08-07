import React from "react";
import { createRoot }  from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '../css/style.css';

function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Main</Link>
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

createRoot(document.getElementById('react-mountpoint')).render(<Main />);