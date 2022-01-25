import React from 'react';
import '../resource/css/Login.css';
import { MdCheckCircleOutline, MdCopyright } from "react-icons/md";
import Header from '../component/Header';

function Login() {
  return (
    <>
      <Header />
      <div className='content'>
        <div className='firstPage'>
          <div className='title'>
            <h1>Controlando sua Vida Financeira</h1>
          </div>
          <div className='subtitle'>
            <h2>Ajudamos você a controlar seus gastos e receitas e ter uma visão
              ampla da sua situação financeira. </h2>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='page'>
          <div className='title'>
            <h1>O que você vai encontrar</h1>
          </div>
          <div className='subtitle'>
            <h2>Principais ações disponíveis no sistema para, que você consiga controlar a sua vida financeira. E dar o primeiro passo para acabar com as dividas.</h2>
          </div>
        </div>
      </div>

      <div className='contentCard'>
        {/* Receita */}

        <div className='pageCard'>
          <div className='imgCard'>
            <MdCheckCircleOutline />
          </div>
          <div className='textCard'>
            <div className='titleCard'>
              <h1>Gerenciar Receitas</h1>
            </div>
            <div className='subtitleCard'>
              <h2>Cadastre suas receitas mensais , e gerencia seus recebíveis de forma fácil.</h2>
            </div>
          </div>
        </div>

        {/* Despesa */}

        <div className='pageCard'>
          <div className='imgCard'>
            <MdCheckCircleOutline />
          </div>
          <div className='textCard'>
            <div className='titleCard'>
              <h1>Gerenciar Despesas</h1>
            </div>
            <div className='subtitleCard'>
              <h2>Cadastre seus gastos diários, e controle quanto e como você gasta seu dinheiro.</h2>
            </div>
          </div>
        </div>

        {/* metas */}


        <div className='pageCard'>
          <div className='imgCard'>
            <MdCheckCircleOutline />
          </div>
          <div className='textCard'>
            <div className='titleCard'>
              <h1>Gerenciar Metas</h1>
            </div>
            <div className='subtitleCard'>
              <h2>Crie e gerencie suas metas financeiras.</h2>
            </div>
          </div>
        </div>

      </div>

      <div className='contentFooter'>
        <div className='titleFooter'>
          <h1><MdCopyright /> Matheus Calaça</h1>
        </div>
      </div>
    </>
  );
}

export default Login;
