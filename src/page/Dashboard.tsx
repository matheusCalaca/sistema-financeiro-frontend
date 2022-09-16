import React, { useEffect, useState } from 'react';
import '../resource/css/Dashboard.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import DashboardGrafico from '../component/DashboardGrafico';
import ReceitaType from '../model/ReceitaType';
import DespesaType from '../model/DespesaType';
import DashType from '../model/DashType';
import CardDash from '../component/CardDash';
import TableDash from '../component/TableDash';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import api from '../api/API';
import { Backdrop, CircularProgress, Grid, Snackbar } from '@mui/material';

export const dataMes: MesType[] = meses;
export let dataDash: DashType[] = [];
export let id: number = 0;

function dadosDash(dataReceita: ReceitaType[], dataDespesa: DespesaType[]) {
  id = 0;
  dataDash = [];

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
}

export const Dashboard = (): JSX.Element => {
  const [currentMes, setCurrentMes] = useState<MesType>(dataMes[new Date().getMonth()]);
  const [receitas, setReceitas] = useState<ReceitaType[]>([]);
  const [despesas, setDespesas] = useState<DespesaType[]>([]);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    gethealth()
  }, []);

  useEffect(() => {
    loadDados()
  }, [currentMes])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

  // chamada para start do back end ate as proximas paginas -> solução provisoria
  async function gethealth() {
    await api.get(`actuator/health`)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        loadDados()
      })
      .catch(async (err) => {
        console.log(err)
        setOpen(true)
        await delay(5000);
        gethealth()
      }
      )
  }

  async function loadDados() {
    await api.get("receita", { params: { idCliente: 1, month: currentMes.value }, headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } } )
      .then(response => {
        setReceitas(response.data)
        console.log(receitas);
      })
      .catch(error => console.log(`receita: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );

    await api.get("despesa", { params: { idCliente: 1, month: currentMes.value }, headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }  })
      .then(response => {
        setDespesas(response.data)
        console.log(despesas);
      })
      .catch(error => console.log(`despesa: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );
  }
  function change(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMes(dataMes[Number(event.target.value) - 1]);
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
            <span>Resumo</span>

            <select value={currentMes.value} onChange={change}>
              <option>Escolha o mês</option>
              {dataMes.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </select>
          </div>

          <CardDash dataDash={dadosDash(receitas, despesas)} />
          <TableDash dataDash={dadosDash(receitas, despesas)} />

        </div>
      </div>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid xs={12}>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid xs={10}>
            <h2>Iniciando o BACK-END, por favor aguarde !</h2>
          </Grid>
        </Grid>
      </Backdrop>
      <Footer />
    </>
  );
}

export default Dashboard;
