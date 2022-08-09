import React, { useEffect, useState } from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdAdd } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import DashboardGrafico from '../component/DashboardGrafico';
import CardDespesa from '../component/CardDespesa';
import TableDespesa from '../component/TableDespesa';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import { Link, useParams } from 'react-router-dom';
import api from '../api/API';

export const dataMes: MesType[] = meses;

export const Despesa = (): JSX.Element => {
  const [currentMes, setCurrentMes] = useState<MesType>(dataMes[new Date().getMonth()]);
  const [receitas, setReceitas] = useState<ReceitaType[]>([]);
  const [despesas, setDespesas] = useState<DespesaType[]>([]);

  let { id } = useParams();

  useEffect(() => {
    getCurrentMonth()
    loadDados()
  }, [])

  useEffect(() => {
    loadDados()
  }, [currentMes])

  async function loadDados() {
    await api.get("despesa", { params: { idCliente: 1, month: currentMes.value  } })
      .then(response => {
        setDespesas(response.data)
        console.log(despesas);
      })
      .catch(error => console.log(`despesa: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );

      await api.get("receita", { params: { idCliente: 1, month: currentMes.value  } })
      .then(response => {
        setReceitas(response.data)
        console.log(receitas);
      })
      .catch(error => console.log(`receita: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );
  }

  function change(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMes(dataMes[Number(event.target.value) - 1]);
    loadDados();
  }

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  function getCurrentMonth(){
    setCurrentMes(dataMes[new Date().getMonth()]);
  }


  function dados(mes: Number) {

    return despesas.filter((v, i, a) => onlyUnique(v.id, i, a.map(i => i.id)))
      .sort(
        (n1, n2) => {
          if (n1.data.split("-")[0] > n2.data.split("-")[0]) {
            return -1;
          }

          if (n1.data.split("-")[0] < n2.data.split("-")[0]) {
            return 1;
          }

          return 0;
        }
      )
      .sort(
        (n1, n2) => {
          if (n1.data.split("-")[1] > n2.data.split("-")[1]) {
            return -1;
          }

          if (n1.data.split("-")[1] < n2.data.split("-")[1]) {
            return 1;
          }

          return 0;
        }
      )
      .sort(
        (n1, n2) => {
          if (n1.data.split("-")[2] > n2.data.split("-")[2]) {
            return -1;
          }

          if (n1.data.split("-")[2] < n2.data.split("-")[2]) {
            return 1;
          }

          return 0;
        }
      )
      //.filter(item => Number(item.data.split("-")[1]) === mes)
  }



  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>{currentMes.name} 2021</span>
        </div>
        <DashboardGrafico receita={receitas} despesa={despesas} />

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Despesa {id}</span> 

            <select value={currentMes.value} onChange={change}>
              <option>Escolha o mês</option>
              {dataMes.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>

          <CardDespesa despesa={dados(currentMes.value)} />
          <TableDespesa despesa={dados(currentMes.value)} />

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

export default Despesa;
