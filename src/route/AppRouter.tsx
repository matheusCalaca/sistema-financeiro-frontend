import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClientCadastro } from '../page/ClientCadastro';
import Dashboard from '../page/Dashboard';
import Despesa from '../page/Despesa';
import { DespesaCadastro } from '../page/DespesaCadastro';
import App from '../page/Home';
import Login from '../page/Login';
import { Metas } from '../page/Metas';
import { MetasCadastro } from '../page/MetasCadastro';
import Receita from '../page/Receita';
import { ReceitaCadastro } from '../page/ReceitaCadastro';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cliente/cad" element={<ClientCadastro />} />
                <Route path="/receita" element={<Receita />} />
                <Route path="/receita/cad" element={<ReceitaCadastro />} />
                <Route path="/receita/cad/:id" element={<ReceitaCadastro />} />
                <Route path="/despesa" element={<Despesa />} />
                <Route path="/despesa/cad/:id" element={<DespesaCadastro />} />
                <Route path="/despesa/cad" element={<DespesaCadastro />} />
                <Route path="/meta" element={<Metas />} />
                <Route path="/meta/cad" element={<MetasCadastro />} />
                <Route path="/meta/cad/:id" element={<MetasCadastro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;