import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from '../page/Dashboard';
import Despesa from '../page/Despesa';
import { DespesaCadastro } from '../page/DespesaCadastro';
import App from '../page/Home';
import Login from '../page/Login';
import { Metas } from '../page/Metas';
import Receita from '../page/Receita';
import { ReceitaCadastro } from '../page/ReceitaCadastro';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/receita" element={<Receita />} />
                <Route path="/receita/cad" element={<ReceitaCadastro />} />
                <Route path="/despesa" element={<Despesa />} />
                <Route path="/despesa/cad" element={<DespesaCadastro />} />
                <Route path="/meta" element={<Metas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;