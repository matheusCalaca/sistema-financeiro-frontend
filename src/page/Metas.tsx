import React from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdAdd } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import receita from '../data/dataReceita.json';
import despesa from '../data/dataDespesa.json';
import DashboardGrafico from '../component/DashboardGrafico';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import { Link } from 'react-router-dom';
import { CardMetas } from '../component/CardMetas';
import MetasType from '../model/MetasType';
import metas from '../data/dataMetas.json'
import { TableMetas } from '../component/TableMetas';


export const dataMetas: MetasType[] = metas;

export const dataMes: MesType[] = meses;

export const dataReceita: ReceitaType[] = receita;

export const dataDespesa: DespesaType[] = despesa;



export const Metas = (): JSX.Element => {

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  function dados() {


    return dataMetas.filter((v, i, a) => onlyUnique(v.id, i, a.map(i => i.id)))
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

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>{(new Date()).getFullYear()}</span>
        </div>
        <DashboardGrafico receita={dataReceita} despesa={despesa} />

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Metas</span>
          </div>

          <CardMetas metas={dados()} />

          <TableMetas metas={dados()} />

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
