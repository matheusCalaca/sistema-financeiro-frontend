import React, { useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck } from 'react-icons/md';
import api from '../api/API';

export type Meta = {
  data?: number;
  descricao?: string;
  idCliente?: number;
  titulo?: string;
  valor?: number;
}

export const MetasCadastro = (): JSX.Element => {

  const [metaCurrente, setMetaCurrente] = useState<Meta>({idCliente: 1});


  function changeMetaInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setMetaCurrente({ ...metaCurrente, [name]: value });
    console.log(metaCurrente);

  }

  function cadastro() {
    api.post("meta", metaCurrente).then((res) => console.log(res)).catch((err) => console.log(err))
  }

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
          <div className='inputCad'><input type="text" name="titulo" value={metaCurrente.titulo} onChange={changeMetaInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><input type="number" name="valor" value={metaCurrente.valor} onChange={changeMetaInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Descrição:</b></div>
          <div className='inputCad'><textarea name="descricao" value={metaCurrente.descricao} onChange={changeMetaInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'><input type="date" name="data" value={metaCurrente.data} onChange={changeMetaInputs} /></div>
        </div>
      </div>

      <div className="butoonFloatCad">
        <MdCheck onClick={cadastro}/>
      </div>

      <Footer />
    </>
  );
}
