import React from 'react';
import '../resource/css/Receita.css';
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

function Receita() {
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
              <span>Receita: </span> <span className='colorGreen'>1000</span> <span>/</span> <span>Gasto:</span> <span className='colorRed'>3000</span> <span>R$</span>
            </div>
          </div>
        </div>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Receita</span>
          </div>
          <div className='cardReceita'>
            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>2872,43 R$</span> </div>
              <div className='cardBody'>
                <span>10/12/2021</span>
              </div>
              <div className='cardDescription'></div>
            </div>

            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>1845,21 R$</span> </div>
              <div className='cardBody'>
                <span>15/12/2021</span>
              </div>
              <div className='cardDescription'>parcela do decimo tervceiro salaraio</div>
            </div>


            <div className='card'>
              <div className='titleCardBody'>Venda <span className='colorGreen'>1500 R$</span> </div>
              <div className='cardBody'>
                <span>03/12/2021</span>
              </div>
              <div className='cardDescription'>Venda de VideoGame PS3</div>
            </div>

            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>2872,43 R$</span> </div>
              <div className='cardBody'>
                <span>10/11/2021</span>
              </div>
              <div className='cardDescription'></div>
            </div>

            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>2872,43 R$</span> </div>
              <div className='cardBody'>
                <span>10/10/2021</span>
              </div>
              <div className='cardDescription'></div>
            </div>

            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>2872,43 R$</span> </div>
              <div className='cardBody'>
                <span>10/09/2021</span>
              </div>
              <div className='cardDescription'></div>
            </div>

            <div className='card'>
              <div className='titleCardBody'>Salario <span className='colorGreen'>2872,43 R$</span> </div>
              <div className='cardBody'>
                <span>10/08/2021</span>
              </div>
              <div className='cardDescription'></div>
            </div>
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
              <tr className='backcolorGreen'>
                <td>Salario</td>
                <td>10/12/2021</td>
                <td>
                  <span>2872,43</span>
                  <span>R$</span>
                </td>
                <td></td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorGreenLight'>
                <td>Venda</td>
                <td>03/12/2021</td>
                <td>
                  <span>1500</span>
                  <span>R$</span>
                </td>
                <td>venda do video game ps3</td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorGreen'>
                <td>Saalario</td>
                <td>10/11/2021</td>
                <td>
                  <span>2872,43</span>
                  <span>R$</span>
                </td>
                <td></td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorGreenLight'>
                <td>Salario</td>
                <td>10/10/2021</td>
                <td>
                  <span>2872,43</span>
                  <span>R$</span>
                </td>
                <td></td>
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

export default Receita;
