import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck } from 'react-icons/md';
import OptionType from '../model/OptionType';
import meioPagamento from '../data/dataMeioPagamento.json'
import category from '../data/dataCategoria.json'
import api from '../api/API';
import { useParams } from 'react-router-dom';

export const dataMeioPagamento: OptionType[] = meioPagamento;
export const dataCategory: OptionType[] = category;

export type Despesa = {
  id?: number;
  data?: number;
  descricao?: string;
  idCliente?: number;
  idCategoria?: number;
  meioDePagamento?: string;
  nome?: string;
  onde?: string;
  porque?: string;
  valor?: number;
}

export const DespesaCadastro = (): JSX.Element => {
  const [currentMeioPagamento, setCurrentMeioPagamento] = useState<OptionType>();
  const [currentCategory, setCurrentCategory] = useState<OptionType>();
  const [despesaCurrente, setDespesaCurrente] = useState<Despesa>({ idCliente: 1 });

  let { id } = useParams()

  useEffect(() => {
    getDespesa()
  }, [id])

  useEffect(() => {
    setCurrentMeioPagamento(dataMeioPagamento[Number(returnIndexMeioDePagamentos())]);
    console.log("categoria");
    console.log(returnIndexCategoria());
    
    // setDespesaCurrente(dataCategory[returnIndexCategoria()]);
  }, [despesaCurrente])

  function changeMeioPagamento(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMeioPagamento(dataMeioPagamento[Number(event.target.id) - 1]);
    setDespesaCurrente({ ...despesaCurrente, meioDePagamento: event.target.value });
  }

  function changeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentCategory(dataCategory[Number(event.target.value) - 1]);
    //todo: trocar pelo real
    setDespesaCurrente({ ...despesaCurrente, idCategoria: 1 });
  }


  function changeInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setDespesaCurrente({ ...despesaCurrente, [name]: value });
  }

  function cadastro() {
    api.post("despesa", despesaCurrente).then((res) => console.log(res)).catch((err) => console.log(err))
  }

  async function getDespesa() {
    await api.get(`despesa/${id}`)
      .then((res) => {
        setDespesaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }

  function returnIndexMeioDePagamentos(): number {
    var fieldData = dataMeioPagamento,
      i = 0, ii = dataMeioPagamento.length;
    for (i; i < ii; i++) if (fieldData[i].value === despesaCurrente.meioDePagamento) break;
    return i;
  }

  function returnIndexCategoria(): number {
    var fieldData = dataCategory,
      i = 0, ii = dataCategory.length;
    for (i; i < ii; i++) if (fieldData[i].value === despesaCurrente.idCategoria) break;
    return i;
  }




  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Despesa {id}</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><input type="text" name="nome" value={despesaCurrente.nome} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><input type="number" name="valor" value={despesaCurrente.valor} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Meio Pagamento:</b></div>
          <div className='inputCad'>
            <select value={currentMeioPagamento?.value} onChange={changeMeioPagamento}>
              <option>Meio Pagamento</option>
              {dataMeioPagamento.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Onde:</b></div>
          <div className='inputCad'><input type="text" name="onde" value={despesaCurrente.onde} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Motivo:</b></div>
          <div className='inputCad'><textarea name="porque" value={despesaCurrente.porque} onChange={changeInputs} /></div>
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
          <div className='inputCad'><input type="date" name="data" value={despesaCurrente.data} onChange={changeInputs} /></div>
        </div>
      </div>

      <div className="butoonFloatCad">
        <MdCheck onClick={cadastro} />
      </div>

      <Footer />
    </>
  );
}
