import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck } from 'react-icons/md';
import api from '../api/API';
import { useParams } from 'react-router-dom';

export type Receita = {
  data?: number;
  descricao?: string;
  idCliente?: number;
  nome?: string;
  valor?: number;
}

export const ReceitaCadastro = (): JSX.Element => {

  const [receitaCurrente, setReceitaCurrente] = useState<Receita>({ idCliente: 1 });

  let { id } = useParams()

  useEffect(() => {
    getReceita()
  }, [id]);

  async function getReceita() {
    await api.get(`receita/${id}`)
      .then((res) => {
        console.log(res.data);
        
        setReceitaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }



  function changeInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setReceitaCurrente({ ...receitaCurrente, [name]: value });
    console.log(receitaCurrente);

  }

  function cadastro() {
    api.post("receita", receitaCurrente).then((res) => console.log(res)).catch((err) => console.log(err))
  }


  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Receita</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><input type="text" name="nome" value={receitaCurrente.nome} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><input type="number" name="valor" value={receitaCurrente.valor} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Descrição:</b></div>
          <div className='inputCad'><textarea name="descricao" value={receitaCurrente.descricao} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'><input type="date" name="data" value={receitaCurrente.data} onChange={changeInputs} /></div>
        </div>
      </div>

      <div className="butoonFloatCad">
        <MdCheck onClick={cadastro}/>
      </div>

      <Footer />
    </>
  );
}
