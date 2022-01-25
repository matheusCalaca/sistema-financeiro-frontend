import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from '../App';
import Login from '../page/Login';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;