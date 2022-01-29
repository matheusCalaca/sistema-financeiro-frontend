import React, { useState } from 'react';
import '../resource/css/Dashboard.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import DashboardGrafico from '../component/DashboardGrafico';

import receita from '../data/dataReceita.json';
import despesa from '../data/dataDespesa.json';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import DashType from '../model/DashType';
import CardDash from '../component/CardDash';
import TableDash from '../component/TableDash';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';

export const dataReceita: ReceitaType[] = receita;
export const dataMes: MesType[] = meses;

export const dataDespesa: DespesaType[] = despesa;
export let dataDash: DashType[] = new Array();
export let id: number = 0;

function dadosDash(mes: Number) {
  id = 0;
  dataDash = new Array();

  dataDespesa.forEach(item => {
    let dt: DashType = { id: ++id, nome: item.nome, valor: item.valor, data: item.data, type: false };
    dataDash.push(dt);
  });

  dataReceita.forEach(item => {
    let dt: DashType = { id: ++id, nome: item.nome, valor: item.valor, data: item.data, type: true };
    dataDash.push(dt);
  });


  return dataDash
    .sort(
      (n1, n2) => {
        if (n1.data.split("/")[0] > n2.data.split("/")[0]) {
          return -1;
        }

        if (n1.data.split("/")[0] < n2.data.split("/")[0]) {
          return 1;
        }

        return 0;
      }
    )
    .sort(
      (n1, n2) => {
        if (n1.data.split("/")[1] > n2.data.split("/")[1]) {
          return -1;
        }

        if (n1.data.split("/")[1] < n2.data.split("/")[1]) {
          return 1;
        }

        return 0;
      }
    )
    .sort(
      (n1, n2) => {
        if (n1.data.split("/")[2] > n2.data.split("/")[2]) {
          return -1;
        }

        if (n1.data.split("/")[2] < n2.data.split("/")[2]) {
          return 1;
        }

        return 0;
      }
    ).filter(item => Number(item.data.split("/")[1]) === mes)
}

export const Dashboard = (): JSX.Element => {
  const [currentMes, setCurrentMes] = useState<MesType>(dataMes[11]);

  function change(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMes(dataMes[Number(event.target.value) - 1]);
  }

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>{currentMes.name} 2021</span>
        </div>
        <DashboardGrafico receita={dataReceita} despesa={despesa} />

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Resumo</span>

            <select value={currentMes.value} onChange={change}>
              <option>Escolha o mês</option>
              {dataMes.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>

          <CardDash dataDash={dadosDash(currentMes.value)} />
          <TableDash dataDash={dadosDash(currentMes.value)} />

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
