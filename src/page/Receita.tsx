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



function Receita() {
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
            <span>Receita</span>
          </div>
          <div className='cardReceita'>

            {dataReceita.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className="colorGreen">{data.valor} R$</span> </div><div className="cardBody"><span>{data.data}</span></div><div className="cardDescription">{data.descricao}</div></div>)}

          </div>

          <div className='tableName'>
            <table>
              <tr>
                <th>Nome</th>
                <th>data</th>
                <th>Valor</th>
                <th>descrição</th>
                <th>Edit</th>
              </tr>
              {dataReceita.map((data, i) => <tr key={data.id} className={(i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight"}><td>{data.nome}</td><td>{data.data}</td><td>    <span>{data.valor}</span>    <span>R$</span></td><td>{data.descricao}</td><td><MdModeEdit /></td></tr>)}

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

export default Receita;
