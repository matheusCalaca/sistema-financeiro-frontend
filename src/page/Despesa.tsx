import React from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdAdd, MdModeEdit } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import receita from '../data/dataReceita.json';
import despesa from '../data/dataDespesa.json';
import DashboardGrafico from '../component/DashboardGrafico';


export const dataReceita: ReceitaType[] = receita;

export const dataDespesa: DespesaType[] = despesa;
function Despesa() {
  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>Dezembro 2021</span>
        </div>
        <DashboardGrafico receita={dataReceita} despesa={despesa} />

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Despesa</span>
          </div>
          <div className='cardReceita'>
            {dataDespesa.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className="colorRed">{data.valor} R$</span> </div> <div className="cardBody">  <span>{data.data}</span></div><div className="cardDescription">{data.porque}</div></div>)}
          </div>

          <div className='tableName'>
            <table>
              <tr>
                <th>Nome</th>
                <th>data</th>
                <th>Valor</th>
                <th>Meio Pag.</th>
                <th>Onde</th>
                <th>Por que</th>
                <th>Categoria</th>
                <th>Edit</th>
              </tr>
              {dataDespesa.map((data, i) => <tr key={data.id} className={(i % 2 === 0) ? "backcolorRed" : "backcolorRedLight"}><td>{data.nome}</td><td>{data.data}</td><td>{data.valor} R$</td><td>{data.meioPagamento}</td><td>{data.onde}</td><td>{data.porque}</td><td>{data.categoria}</td><td><MdModeEdit /></td></tr>)}

            </table>
          </div>

        </div>
      </div>

      <div className="butoonFloat">
        <MdAdd />
      </div>

      <Footer />
    </>
  );
}

export default Despesa;
