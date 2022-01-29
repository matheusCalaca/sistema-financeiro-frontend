import React from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdAdd } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import receita from '../data/dataReceita.json';
import despesa from '../data/dataDespesa.json';
import DashboardGrafico from '../component/DashboardGrafico';
import CardDespesa from '../component/CardDespesa';
import TableDespesa from '../component/TableDespesa';


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

          <CardDespesa despesa={despesa} />
          <TableDespesa despesa={despesa} />

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
