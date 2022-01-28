import React from 'react';
import '../resource/css/Dashboard.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdModeEdit } from 'react-icons/md';
import DashboardGrafico from '../component/DashboardGrafico';

import receita from '../data/dataReceita.json'
import despesa from '../data/dataDespesa.json'
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';

export const dataReceita: ReceitaType[] = receita;

export const dataDespesa: DespesaType[] = despesa;

function Dashboard() {
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
            <span>Resumo</span>
          </div>

          <div className='tableName'>
            <table>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Edit</th>
              </tr>
              <tr className='backcolorRed'>
                <td>Conta Energia</td>
                <td>
                  <span>1000</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorRedLight'>
                <td>Conta de Agua</td>
                <td>
                  <span>456.67</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorRed'>
                <td>Internet</td>
                <td>
                  <span>1000</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorGreenLight'>
                <td>Salario</td>
                <td>
                  <span>2267,78</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>
            </table>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
