import React from 'react';
import logo from '../resource/img/logo.svg';
import '../resource/css/HeaderDash.css';
import { Link } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';

function HeaderDash() {
  return (
    <>
 <div className='header'>
        <div className='header-img'>
          <img src={logo} className="App-logo" alt="logo" width={32} />
        </div>

        <div className='MenuDash'>
          <span className='menuDashTitle'><Link to="/Receita">Receita</Link></span>
          <span>|</span>
          <span className='menuDashTitle'><Link to="/login">Despesa</Link></span>
          <span>|</span>
          <span className='menuDashTitle'><Link to="/login">Meta</Link></span>
        </div>

        <div className='MenuDashUser'>
          <span className='menuDashTitle'><Link to="/"><MdOutlineAccountCircle/> Usuario</Link></span>
        </div>
      </div>
    </>
  );
}

export default HeaderDash;
