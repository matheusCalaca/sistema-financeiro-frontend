import React, { useEffect, useState } from 'react';
import '../resource/css/cadastro.css';
import Footer from '../component/Footer';
import HeaderDash from '../component/HeaderDash';
import OptionType from '../model/OptionType';
import meioPagamento from '../data/dataMeioPagamento.json'
import category from '../data/dataCategoria.json'
import api from '../api/API';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { convertSetDate } from '../component/Uteis';
import { Alert, Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { isMobile } from 'react-device-detect';


export type Estado = {
  uf?: string;
}

export type Endereco = {
  cep?: number;
  cidade?: string;
  complemento?: string;
  logradouro?: string;
  estado?: Estado;
}

export type Cliente = {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  endereco?: Endereco;
}

export const ClientCadastro = (): JSX.Element => {
  const [clienteCurrente, setClienteCurrente] = useState<Cliente>({});
  const [enderecoCurrente, setEnderecoCurrente] = useState<Endereco>({});
  const [dataEstados, setDataEstados] = useState<Estado[]>();
  const [estadoCurrente, setEstadoCurrent] = useState<Estado>();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navegate = useNavigate();


  function changeInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setClienteCurrente({ ...clienteCurrente, [name]: value });
    console.log(clienteCurrente);

  }

  function changeEnderecoInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setEnderecoCurrente({ ...enderecoCurrente, [name]: value });
    setClienteCurrente({ ...clienteCurrente, endereco: enderecoCurrente });
    console.log(clienteCurrente);

  }

  function changeEstados(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    let est: Estado = { uf: value }
    setEstadoCurrent(est);
    setEnderecoCurrente({ ...enderecoCurrente, estado: est });
    setClienteCurrente({ ...clienteCurrente, endereco: enderecoCurrente });
    console.log(clienteCurrente);

  }

  useEffect(() => {
    getEstados()
  }, [])

  function valid() {
    if (!clienteCurrente.name) {
      handleClick("Nescessario preencher o campo Nome");
      return false;
    }

    if (!clienteCurrente.cpf || !isCPFValid(clienteCurrente.cpf)) {
      handleClick("Campo CPF Invalido");
      return false;
    }


    if (!clienteCurrente.email || !isEmailValidate(clienteCurrente.email)) {
      handleClick("campo E-mail Invalido");
      return false;
    }

    if (!clienteCurrente.password || clienteCurrente.password.length < 6) {
      handleClick("campo Senha Invalido");
      return false;
    }

    if (!clienteCurrente.endereco?.cep) {
      handleClick("Nescessario preencher o campo CEP");
      return false;
    }

    if (!clienteCurrente.endereco.estado?.uf) {
      handleClick("Nescessario preencher o campo Estado");
      return false;
    }

    if (!clienteCurrente.endereco.cidade) {
      handleClick("Nescessario preencher o campo Cidade");
      return false;
    }

    if (!clienteCurrente.endereco.logradouro) {
      handleClick("Nescessario preencher o campo Logradouro");
      return false;
    }

    return true;
  }

  function cadastro() {
    console.log("salvar Cliente");
    
    if (valid()) {
        api.post("client", clienteCurrente)
          .then((res) => { console.log(res.data); navegate("/login") })
          .catch((err) => { handleClick(err.message) })
    }
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
        onClick={cadastro}
      />
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
          onClick={cadastro}
          sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}
        />
      </SpeedDial>
    );
  }

  async function getEstados() {
    await api.get(`estado`)
      .then((res) => {
        setDataEstados(res.data);
      })
      .catch((err) => console.log(err))
  }


  function isEmailValidate(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function isCPFValid(strCPF: string) {

    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (var i: number = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var i: number = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;

  }

  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Cadastrar Cliente</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><TextField fullWidth id="name" name="name" value={clienteCurrente.name} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>CPF:</b></div>
          <div className='inputCad'><TextField fullWidth id="cpf" name="cpf" value={clienteCurrente.cpf} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>E-mail:</b></div>
          <div className='inputCad'><TextField fullWidth type="email" id="email" name="email" value={clienteCurrente.email} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Senha:</b></div>
          <div className='inputCad'><TextField fullWidth type="password" id="password" name="password" value={clienteCurrente.password} onChange={changeInputs} /></div>
        </div>

        <div className='tableResumoTitle'>
          <span>Endereço</span>
        </div>

        <div className='fieldCad'>
          <div className='labelCad'><b>CEP:</b></div>
          <div className='inputCad'><TextField fullWidth id="cep" name="cep" value={enderecoCurrente.cep} onChange={changeEnderecoInputs} /></div>
        </div>

        <div className='fieldCad'>
          <div className='labelCad'><b>Estado:</b></div>
          <div className='inputCad'>
            <NativeSelect fullWidth value={estadoCurrente?.uf} name="uf" onChange={changeEstados}>
              <option>Estado</option>
              {dataEstados?.map(item => <option key={item.uf} value={item.uf}>{item.uf}</option>)}
            </NativeSelect>
          </div>
        </div>

        <div className='fieldCad'>
          <div className='labelCad'><b>Cidade:</b></div>
          <div className='inputCad'><TextField fullWidth id="cidade" name="cidade" value={enderecoCurrente.cidade} onChange={changeEnderecoInputs} /></div>
        </div>

        <div className='fieldCad'>
          <div className='labelCad'><b>Logradouro:</b></div>
          <div className='inputCad'><TextField fullWidth id="logradouro" name="logradouro" value={enderecoCurrente.logradouro} onChange={changeEnderecoInputs} /></div>
        </div>

        <div className='fieldCad'>
          <div className='labelCad'><b>Complemento:</b></div>
          <div className='inputCad'><TextField fullWidth id="complemento" name="complemento" value={enderecoCurrente.complemento} onChange={changeEnderecoInputs} /></div>
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}
