import React, { useEffect, useState } from 'react';
import '../resource/css/Login.css';
import { MdAccountCircle, MdAccountBox, MdPassword } from "react-icons/md";
import Header from '../component/Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import api from '../api/API';
import { Alert, Snackbar } from '@mui/material';

export type Login = {
  email?: string;
  password?: string;
}

function Login() {

  const [loginCurrente, setLoginCurrente] = useState<Login>({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navegate = useNavigate();

  // chamada para start do back end ate as proximas paginas -> solução provisoria
  async function gethealth() {
    await api.get(`actuator/health`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    gethealth()
  }, []);


  function autenticar() {
    if (valid()) {
      api.post("authenticate", loginCurrente)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("token", res.data.token);
          
          navegate("/dashboard")
        })
        .catch((err) => {
          handleClick("E-mail ou Senha incorreta")
        })
    }
  }

  function valid() {
    if (!loginCurrente.email) {
      handleClick("Nescessario preencher o campo Email");
      return false;
    }
    if (!loginCurrente.password) {
      handleClick("Nescessario preencher o campo Senha");
      return false;
    }

    return true;
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

  function changeLoginInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setLoginCurrente({ ...loginCurrente, [name]: value });
  }

  return (
    <>
      <Header />
      <div className='iconLogin'>
        <div className='title'>
          <MdAccountCircle size={"125px"} />
        </div>
      </div>

      <div className='form'>
        <div className='input'>
          <div className='inputIcon'>
            <MdAccountBox />
          </div>
          <div className='field'>
            <input type="text" placeholder='E-mail' name="email" value={loginCurrente.email} onChange={changeLoginInputs} />
          </div>
        </div>

        <div className='input'>
          <div className='inputIcon'>
            <MdPassword />
          </div>
          <div className='field'>
            <input type="password" placeholder='password' name="password" value={loginCurrente.password} onChange={changeLoginInputs} />
          </div>
        </div>

        <div className='inputButton'>
          <div className='fieldButton'>
            <button onClick={autenticar}>Entrar</button>
          </div>
          <div className='fieldButton'>
            <Link to="/">cadastrar-se</Link>
          </div>
        </div>
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

export default Login;
