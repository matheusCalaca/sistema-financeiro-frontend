import React from 'react';
import '../resource/css/HeaderDash.css';
import Chart from 'react-google-charts';

import receita from '../data/dataReceita.json'
import despesa from '../data/dataDespesa.json'

export const dataReceita = receita;


export const dataDespesa = despesa;

function somaDespesa() {
  const sum = dataDespesa.filter(item => item.valor)
    .reduce((sum, current) => {
      return sum + current.valor
    }, 0);
  return Math.round(sum * 100) / 100
}

function somaReceita() {
  const sum = dataReceita.filter(item => item.valor)
    .reduce((sum, current) => {
      return sum + current.valor
    }, 0);
  return Math.round(sum * 100) / 100
}


export const data = [
  ["Title", "Value"],
  ["receita", somaDespesa()],
  ["gasto", somaReceita()],
];

export const options = {
  pieHole: 0.3,
};


function DashboardGrafico() {
  return (
    <>
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
            <div>Saldo: </div> <div>{(somaReceita() - somaDespesa())}</div> <div>R$</div>
          </div>
          <div className='resumoFinanceiro'>
            <span>Receita: </span> <span className='colorGreen'>{somaReceita()}</span> <span>/</span> <span>Despesa:</span> <span className='colorRed'>{somaDespesa()}</span> <span>R$</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardGrafico;
