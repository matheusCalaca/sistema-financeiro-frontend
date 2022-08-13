import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import api from '../api/API';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, InputAdornment, Snackbar, SnackbarOrigin, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { isMobile } from 'react-device-detect';
import { convertSetDate } from '../component/Uteis';

export type Meta = {
  data?: string;
  descricao?: string;
  idCliente?: number;
  titulo?: string;
  valor?: number;
}

export const MetasCadastro = (): JSX.Element => {

  const [metaCurrente, setMetaCurrente] = useState<Meta>({ idCliente: 1 });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navegate = useNavigate();

  let { id } = useParams()

  useEffect(() => {
    getMeta()
  }, [id]);

  async function getMeta() {
    await api.get(`meta/${id}`)
      .then((res) => {
        setMetaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }


  function changeMetaInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setMetaCurrente({ ...metaCurrente, [name]: value });
  }

  function valid() {
    if (!metaCurrente.titulo) {
      handleClick("Nescessario preencher o campo Titulo");
      return false;
    }
    if (!metaCurrente.valor) {
      handleClick("Nescessario preencher o campo Valor");
      return false;
    }
    if (!metaCurrente.data) {
      handleClick("Nescessario preencher o campo Data");
      return false;
    }
    return true;
  }

  function cadastro() {
    if (valid()) {
      api.post("meta", metaCurrente)
        .then((res) => { console.log(res.data); navegate("/meta") })
        .catch((err) => { handleClick(err.message) })
    }
  }

  function update() {
    if (valid()) {
      api.put("meta", metaCurrente)
        .then((res) => { console.log(res.data); navegate("/meta") })
        .catch((err) => { handleClick(err.message) })
    }
  }

  function excluir() {
    api.delete(`meta\\${id}`)
      .then((res) => {
        navegate("/meta")
      })
      .catch((err) => { handleClick(err.message) })
  }

  const handleClick = (messagem: any) => {
    setMessage(messagem);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  function botaoPc() {
    return (
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<SaveIcon />} />}
        onClick={id ? update : cadastro}
      >
        {id != null ?
          <SpeedDialAction
            key="deletar"
            icon={<DeleteIcon />}
            tooltipTitle="Deletar"
            onClick={excluir}
            sx={{ transform: 'translateZ(0px)', flexGrow: 1, color: "red" }}
          />
          : null}
      </SpeedDial>
    )
  }

  function botaoMobile() {
    return (
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<AddIcon />} />}
      >

        < SpeedDialAction
          key="save"
          icon={< SaveIcon />}
          tooltipTitle="Savar"
          onClick={id ? update : cadastro}
          sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}
        />

        {id != null ?
          <SpeedDialAction
            key="deletar"
            icon={<DeleteIcon />}
            tooltipTitle="Deletar"
            onClick={excluir}
            sx={{ transform: 'translateZ(0px)', flexGrow: 1, color: "red" }}
          />
          : null}
      </SpeedDial>
    );
  }

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Meta</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>titulo:</b></div>
          <div className='inputCad'><TextField fullWidth type="text" id="titulo" name="titulo" value={metaCurrente.titulo} onChange={changeMetaInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><TextField type="number" fullWidth id="valor" name="valor" value={metaCurrente.valor} onChange={changeMetaInputs} InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Descrição:</b></div>
          <div className='inputCad'><TextField multiline fullWidth maxRows={4} id="descricao" name="descricao" value={metaCurrente.descricao} onChange={changeMetaInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'>

            <TextField fullWidth type="date" id="data" name="data" value={convertSetDate(metaCurrente.data)} onChange={changeMetaInputs} /></div>
        </div>
      </div>

      <div className="butoonFloatPosition">
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>


          {isMobile ? botaoMobile() : botaoPc()}


        </Box>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}
