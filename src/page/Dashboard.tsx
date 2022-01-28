import React from 'react';
import '../resource/css/Dashboard.css';
import Footer from '../component/Footer';
import Chart from 'react-google-charts';
import HeaderDash from '../component/HeaderDash';
import { MdModeEdit } from 'react-icons/md';

export const data = [
  ["Task", "Hours per Day"],
  ["receita", 1000],
  ["gasto", 3000],
];

export const options = {
  pieHole: 0.4,
};

function Dashboard() {
  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>Dezembro 2021</span>
        </div>
        <div className='dashResumo'>
          <div className='graficoDiv'>
            <Chart
              chartType="PieChart"
              className='grafico'
              data={data}
              options={options}
            />
          </div>
          <div className='dadosFinanceiro'>
            <div className='titleSaldo'>
              <div>Saldo: </div> <div>1000</div> <div>R$</div>
            </div>
            <div className='resumoFinanceiro'>
              <span>Receita: </span> <span className='colorGreen'>1000</span> <span>/</span> <span>Despesa:</span> <span className='colorRed'>3000</span> <span>R$</span>
            </div>
          </div>
        </div>

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
