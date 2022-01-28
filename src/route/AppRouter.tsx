import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from '../page/Dashboard';
import Despesa from '../page/Despesa';
import App from '../page/Home';
import Login from '../page/Login';
import Receita from '../page/Receita';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/receita" element={<Receita />} />
                <Route path="/despesa" element={<Despesa />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;