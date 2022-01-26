import React from 'react';
import '../resource/css/Login.css';
import { MdAccountCircle, MdAccountBox, MdPassword } from "react-icons/md";
import Header from '../component/Header';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';

function Login() {
  return (
    <>
      <Header />
      <div className='iconLogin'>
        <div className='title'>
          <MdAccountCircle size={"125px"} />
        </div>
      </div>

      <div className='form'>
        <div className='input'>
          <div className='inputIcon'>
            <MdAccountBox />
          </div>
          <div className='field'>
            <input type="text" placeholder='CPF' />
          </div>
        </div>

        <div className='input'>
          <div className='inputIcon'>
            <MdPassword />
          </div>
          <div className='field'>
            <input type="password" placeholder='password' />
          </div>
        </div>

        <div className='inputButton'>
          <div className='fieldButton'>
            <Link to="/dashboard" ><button>Entrar</button></Link>
          </div>
          <div className='fieldButton'>
            <Link to="/">cadastrar-se</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
