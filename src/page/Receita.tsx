import React, { useEffect, useState } from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import AddIcon from '@mui/icons-material/Add';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import DashboardGrafico from '../component/DashboardGrafico';
import CardReceita from '../component/CardReceita';
import TableReceita from '../component/TableReceita';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import { Link } from 'react-router-dom';
import api from '../api/API';
import { Box, SpeedDial, SpeedDialIcon } from '@mui/material';

export const dataMes: MesType[] = meses;

export const Receita = (): JSX.Element => {
  const [currentMes, setCurrentMes] = useState<MesType>(dataMes[new Date().getMonth()]);
  const [receitas, setReceitas] = useState<ReceitaType[]>([]);
  const [despesas, setDespesas] = useState<DespesaType[]>([]);

  useEffect(() => {
    getCurrentMonth()
    loadDados()
  }, [])

  useEffect(() => {
    loadDados()
  }, [currentMes])

  async function loadDados() {
    await api.get("receita", { params: { month: currentMes.value }, headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } })
      .then(response => {
        setReceitas(response.data)
        console.log(receitas);
      })
      .catch(error => console.log(`receita: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );

    await api.get("despesa", { params: { month: currentMes.value }, headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } })
      .then(response => {
        setDespesas(response.data)
        console.log(despesas);
      })
      .catch(error => console.log(`despesa: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );
  }

  function getCurrentMonth() {
    setCurrentMes(dataMes[new Date().getMonth()]);
  }

  function change(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMes(dataMes[Number(event.target.value) - 1]);
  }

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }


  function dados(mes: Number) {


    return receitas.filter((v, i, a) => onlyUnique(v.id, i, a.map(i => i.id)))
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
          <span>{currentMes.name} 2022</span>
        </div>
        <DashboardGrafico receita={receitas} despesa={despesas} />

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

      <div className="butoonFloatPosition">
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <Link to="cad">
            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon icon={<AddIcon />} openIcon={<AddIcon />} />}
            >
            </SpeedDial>
          </Link>
        </Box>
      </div>

      <Footer />
    </>
  );
}

export default Receita;
