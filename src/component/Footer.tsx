import React from 'react';
import '../resource/css/Footer.css';
import {  MdCopyright } from "react-icons/md";

function Footer() {
  return (
    <>
      <div className='contentFooter'>
        <div className='titleFooter'>
          <MdCopyright /> Matheus Calaça
        </div>
      </div>
    </>
  );
}

export default Footer;
