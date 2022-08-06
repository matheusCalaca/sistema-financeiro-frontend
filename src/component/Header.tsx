import React from 'react';
import logo from '../resource/img/logo.svg';
import '../resource/css/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className='header'>
        <div className='header-img'>
          <img src={logo} className="App-logo" alt="logo" width={32} />
        </div>

        <div className='Menu'>
          <span className='menuTitle'><Link to="/">Sobre</Link></span>
          <span>|</span>
          <span className='menuTitle'><Link to="/login">Login</Link></span>
        </div>
      </div>
    </>
  );
}

export default Header;
