import React, { useEffect, useState } from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import ReceitaType from '../model/ReceitaType';
import receita from '../data/dataReceita.json';
import MesType from '../model/MesType';
import meses from '../data/dataMes.json';
import { Link, useNavigate } from 'react-router-dom';
import { CardMetas } from '../component/CardMetas';
import MetasType from '../model/MetasType';
import { TableMetas } from '../component/TableMetas';
import api from '../api/API';
import { Box, SpeedDial, SpeedDialIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const dataMes: MesType[] = meses;

export const dataReceita: ReceitaType[] = receita;

export const Metas = (): JSX.Element => {

  const [metas, setMetas] = useState<MetasType[]>([])
  const navegate = useNavigate();

  useEffect(() => {
    loadDados()
  }, [])

  async function loadDados() {
    await api.get("meta", { params: { idCliente: 1 } })
      .then(response => {
        setMetas(response.data)
        console.log(metas);
      })
      .catch(error => console.log(`metas: ${error}`)
      ).finally(
        () => { console.log("finalizado"); }
      );
  }

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  function dados() {


    return metas.filter((v, i, a) => onlyUnique(v.id, i, a.map(i => i.id)))
      .sort(
        (n1, n2) => {
          let dts1 = n1.data.split("T")[0]
          let dts2 = n2.data.split("T")[0]
          if (dts1.split("-")[2] > dts2.split("-")[2]) {
            return -1;
          }

          if (dts1.split("-")[2] < dts2.split("-")[2]) {
            return 1;
          }

          return 0;
        }
      )
      .sort(
        (n1, n2) => {
          let dts1 = n1.data.split("T")[0]
          let dts2 = n2.data.split("T")[0]
          if (dts1.split("-")[1] > dts2.split("-")[1]) {
            return -1;
          }

          if (dts1.split("-")[1] < dts2.split("-")[1]) {
            return 1;
          }

          return 0;
        }
      )
      .sort(
        (n1, n2) => {
          let dts1 = n1.data.split("T")[0]
          let dts2 = n2.data.split("T")[0]
          if (dts1.split("-")[0] > dts2.split("-")[0]) {
            return -1;
          }

          if (dts1.split("-")[0] < dts2.split("-")[0]) {
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

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Metas</span>
          </div>

          <CardMetas metas={dados()} />

          <TableMetas metas={dados()} />

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
