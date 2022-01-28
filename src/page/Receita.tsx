import React from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import Chart from 'react-google-charts';
import HeaderDash from '../component/HeaderDash';
import { MdAdd, MdModeEdit } from 'react-icons/md';


export const dataReceita = [
  { "id": 1, "nome": "Salario", "data": "15/12/2021", "valor": 1506.03, "descricao": "parcela do decimo terceiro salario" },
  { "id": 1, "nome": "Salario", "data": "10/12/2021", "valor": 2872.43, "descricao": "" },
  { "id": 2, "nome": "Venda", "data": "05/12/2021", "valor": 1500.00, "descricao": "venda do video game PS3" },
  { "id": 3, "nome": "Salario", "data": "10/11/2021", "valor": 2872.43, "descricao": "" },
  { "id": 4, "nome": "Salario", "data": "10/10/2021", "valor": 2872.43, "descricao": "" },
  { "id": 5, "nome": "Salario", "data": "10/09/2021", "valor": 2872.43, "descricao": "" }
];

function somaReceita() {
  const sum = dataReceita.filter(item => item.valor)
    .reduce((sum, current) => {
      return sum + current.valor
    }, 0);
  return Math.round(sum * 100) / 100
}

export const data = [
  ["Task", "Hours per Day"],
  ["receita", somaReceita()],
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
              <span>Receita: </span> <span className='colorGreen'>{somaReceita()}</span> <span>/</span> <span>Despesa:</span> <span className='colorRed'>3000</span> <span>R$</span>
            </div>
          </div>
        </div>

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
