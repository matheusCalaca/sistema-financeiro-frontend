import React from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck } from 'react-icons/md';

export const MetasCadastro = (): JSX.Element => {

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Meta</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>titulo:</b></div>
          <div className='inputCad'><input type="text" name="titulo" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><input type="number" name="valor" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Descrição:</b></div>
          <div className='inputCad'><textarea name="descricao" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'><input type="date" name="data" /></div>
        </div>
      </div>

      <div className="butoonFloatCad">
        <MdCheck />
      </div>

      <Footer />
    </>
  );
}
