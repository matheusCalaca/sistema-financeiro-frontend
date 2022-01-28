import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import Chart from 'react-google-charts';


import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';

interface DashGraficoProps {
  receita: ReceitaType[],
  despesa: DespesaType[],
}

export const options = {
  pieHole: 0.3,
};

const DashboardGrafico: FC<DashGraficoProps> = ({ receita, despesa }): JSX.Element => {

  function somaReceita() {
    const sum = receita.filter(item => item.valor)
      .reduce((sum, current) => {
        return sum + current.valor
      }, 0);
    return Math.round(sum * 100) / 100
  }


  function somaDespesa() {
    const sum = despesa.filter(item => item.valor)
      .reduce((sum, current) => {
        return sum + current.valor
      }, 0);
    return Math.round(sum * 100) / 100
  }


  const data = [
    ["Title", "Value"],
    ["receita", somaDespesa()],
    ["gasto", somaReceita()],
  ];


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
