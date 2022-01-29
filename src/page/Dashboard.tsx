import React from 'react';
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

export const dataReceita: ReceitaType[] = receita;

export const dataDespesa: DespesaType[] = despesa;
export let dataDash: DashType[] = new Array();
export let id: number = 0;

function dadosDash() {
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
    )
}

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

          <CardDash dataDash={dadosDash()} />
          <TableDash dataDash={dadosDash()} />

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
