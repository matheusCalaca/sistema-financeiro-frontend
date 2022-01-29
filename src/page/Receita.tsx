import React, { useState } from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdAdd } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import receita from '../data/dataReceita.json';
import despesa from '../data/dataDespesa.json';
import DashboardGrafico from '../component/DashboardGrafico';
import CardReceita from '../component/CardReceita';
import TableReceita from '../component/TableReceita';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import { Link } from 'react-router-dom';

export const dataMes: MesType[] = meses;

export const dataReceita: ReceitaType[] = receita;

export const dataDespesa: DespesaType[] = despesa;



export const Receita = (): JSX.Element => {
  const [currentMes, setCurrentMes] = useState<MesType>(dataMes[11]);

  function change(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMes(dataMes[Number(event.target.value) - 1]);
  }

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }


  function dados(mes: Number) {


    return dataReceita.filter((v, i, a) => onlyUnique(v.id, i, a.map(i => i.id)))
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
            <span>Receita</span>

            <select value={currentMes.value} onChange={change}>
              <option>Escolha o mês</option>
              {dataMes.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>

          <CardReceita receita={dados(currentMes.value)} />

          <TableReceita receita={dados(currentMes.value)} />

        </div>
      </div>

<Link to="cad">
      <div className="butoonFloat">
        <MdAdd />
      </div>
</Link>
      <Footer />
    </>
  );
}

export default Receita;
