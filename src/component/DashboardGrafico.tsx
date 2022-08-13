import React, { FC } from 'react';
import '../resource/css/DashGrafico.css';
import Chart from 'react-google-charts';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import { convertMoney } from './Uteis';

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
    ["receita", somaReceita()],
    ["gasto", somaDespesa()],
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
            <div>Saldo: </div> <div><b>{convertMoney((somaReceita() - somaDespesa()).toString())}</b></div>
          </div>
          <div className='resumoFinanceiro'>
            <span>Receita: </span> <span className='colorGreen'><b>{convertMoney(somaReceita().toString())}</b></span> <span>/</span> <span>Despesa:</span> <span className='colorRed'><b>{convertMoney(somaDespesa().toString())}</b></span> 
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardGrafico;
