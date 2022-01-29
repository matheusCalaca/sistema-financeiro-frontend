import React, { useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck } from 'react-icons/md';
import OptionType from '../model/OptionType';
import meioPagamento from '../data/dataMeioPagamento.json'
import category from '../data/dataCategoria.json'

export const dataMeioPagamento: OptionType[] = meioPagamento;
export const dataCategory: OptionType[] = category;

export const DespesaCadastro = (): JSX.Element => {
  const [currentMeioPagamento, setCurrentMeioPagamento] = useState<OptionType>();
  const [currentCategory, setCurrentCategory] = useState<OptionType>();


  function changeMeioPagamento(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMeioPagamento(dataMeioPagamento[Number(event.target.value) - 1]);
  }
  
  function changeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMeioPagamento(dataCategory[Number(event.target.value) - 1]);
  }

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Despesa</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><input type="text" name="nome" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><input type="number" name="valor" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Maeio Pagamento:</b></div>
          <div className='inputCad'>
            <select value={currentMeioPagamento?.value} onChange={changeMeioPagamento}>
              <option>Meio Pagamento</option>
              {dataMeioPagamento.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Onde:</b></div>
          <div className='inputCad'><input type="text" name="onde" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Motivo:</b></div>
          <div className='inputCad'><textarea name="motivo" /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Categoria:</b></div>
          <div className='inputCad'>
            <select value={currentCategory?.value} onChange={changeCategory}>
              <option>Categoria</option>
              {dataCategory.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>
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
