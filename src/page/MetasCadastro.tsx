import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck, MdDelete } from 'react-icons/md';
import api from '../api/API';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export type Meta = {
  data?: number;
  descricao?: string;
  idCliente?: number;
  titulo?: string;
  valor?: number;
}

export const MetasCadastro = (): JSX.Element => {

  const [metaCurrente, setMetaCurrente] = useState<Meta>({ idCliente: 1 });
  const navegate = useNavigate();

  let { id } = useParams()

  useEffect(() => {
    getMeta()
  }, [id]);

  async function getMeta() {
    await api.get(`meta/${id}`)
      .then((res) => {
        console.log(res.data);

        setMetaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }


  function changeMetaInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setMetaCurrente({ ...metaCurrente, [name]: value });
    console.log(metaCurrente);

  }

  function cadastro() {
    api.post("meta", metaCurrente).then((res) => { console.log(res.data); navegate("/meta") }).catch((err) => console.log(err))
  }

  function excluir() {
    api.delete(`meta\\${id}`)
      .then((res) => {
        navegate("/meta")
      })
      .catch((err) => console.log(err))
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

      <div className="butoonFloatPosition">
        {id != null ? <div className="butoonFloatDelete"><MdDelete onClick={excluir} /></div> : null}
        <div className="butoonFloatCad">
          <MdCheck onClick={cadastro} />
        </div>
      </div>

      <Footer />
    </>
  );
}
