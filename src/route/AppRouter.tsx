import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from '../page/Dashboard';
import App from '../page/Home';
import Login from '../page/Login';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;