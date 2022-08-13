import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import { MdCheck, MdDelete } from 'react-icons/md';
import api from '../api/API';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { convertSetDate } from '../component/Uteis';
import { Alert, Box, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { isMobile } from 'react-device-detect';

export type Receita = {
  data?: string;
  descricao?: string;
  idCliente?: number;
  nome?: string;
  valor?: number;
}

export const ReceitaCadastro = (): JSX.Element => {

  const [receitaCurrente, setReceitaCurrente] = useState<Receita>({ idCliente: 1 });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  let { id } = useParams()
  const navegate = useNavigate();

  useEffect(() => {
    getReceita()
  }, [id]);

  async function getReceita() {
    await api.get(`receita/${id}`)
      .then((res) => {
        console.log(res.data);

        setReceitaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }



  function changeInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setReceitaCurrente({ ...receitaCurrente, [name]: value });
    console.log(receitaCurrente);

  }

  function valid() {
    if (!receitaCurrente.nome) {
      handleClick("Nescessario preencher o campo Titulo");
      return false;
    }
    if (!receitaCurrente.valor) {
      handleClick("Nescessario preencher o campo Valor");
      return false;
    }
    if (!receitaCurrente.data) {
      handleClick("Nescessario preencher o campo Data");
      return false;
    }
    return true;
  }


  function cadastro() {
    if (valid()) {
      api.post("receita", receitaCurrente)
        .then((res) => { navegate("/receita") })
        .catch((err) => { handleClick(err.message) });
    }
  }

  function update() {
    if (valid()) {
      api.put("receita", receitaCurrente)
        .then((res) => { navegate("/receita") })
        .catch((err) => { handleClick(err.message) });
    }
  }

  function excluir() {
    api.delete(`receita\\${id}`)
      .then((res) => {
        navegate("/receita")
      })
      .catch((err) => { handleClick(err.message) });
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
            <span>Cadastrar Receita</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><TextField fullWidth id="nome" type="text" name="nome" value={receitaCurrente.nome} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><TextField fullWidth id="valor" type="number" name="valor" value={receitaCurrente.valor} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Descrição:</b></div>
          <div className='inputCad'><TextField multiline fullWidth maxRows={4} id="descricao" name="descricao" value={receitaCurrente.descricao} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'><TextField fullWidth id="data" type="date" name="data" value={convertSetDate(receitaCurrente.data)} onChange={changeInputs} /></div>
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
