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

export const dataMeioPagamento: OptionType[] = meioPagamento;
export const dataCategory: OptionType[] = category;

export type Despesa = {
  id?: number;
  data?: string;
  descricao?: string;
  idCliente?: number;
  idCategoria?: number;
  meioDePagamento?: string;
  nome?: string;
  onde?: string;
  porque?: string;
  valor?: number;
}

export const DespesaCadastro = (): JSX.Element => {
  const [currentMeioPagamento, setCurrentMeioPagamento] = useState<OptionType>();
  const [currentCategory, setCurrentCategory] = useState<OptionType>();
  const [despesaCurrente, setDespesaCurrente] = useState<Despesa>({ idCliente: 1 });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navegate = useNavigate();

  let { id } = useParams()

  useEffect(() => {
    getDespesa()
  }, [id])

  useEffect(() => {
    setCurrentMeioPagamento(dataMeioPagamento[Number(returnIndexMeioDePagamentos())]);
    console.log("categoria");
    console.log(returnIndexCategoria());

    // setDespesaCurrente(dataCategory[returnIndexCategoria()]);
  }, [despesaCurrente])

  function changeMeioPagamento(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentMeioPagamento(dataMeioPagamento[Number(event.target.id) - 1]);
    setDespesaCurrente({ ...despesaCurrente, meioDePagamento: event.target.value });
  }

  function changeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setCurrentCategory(dataCategory[Number(event.target.value) - 1]);
    //todo: trocar pelo real
    setDespesaCurrente({ ...despesaCurrente, idCategoria: 1 });
  }


  function changeInputs(event: React.ChangeEvent<any>) {
    event.preventDefault();
    const { name, value } = event.target;
    setDespesaCurrente({ ...despesaCurrente, [name]: value });
  }

  function valid() {
    if (!despesaCurrente.nome) {
      handleClick("Nescessario preencher o campo Nome");
      return false;
    }
    if (!despesaCurrente.valor) {
      handleClick("Nescessario preencher o campo Valor");
      return false;
    }
    if (!despesaCurrente.data) {
      handleClick("Nescessario preencher o campo Data");
      return false;
    }
    if (!despesaCurrente.meioDePagamento) {
      handleClick("Nescessario preencher o campo Meio de Pagamento");
      return false;
    }
    if (!despesaCurrente.onde) {
      handleClick("Nescessario preencher o campo Onde");
      return false;
    }
    if (!despesaCurrente.porque) {
      handleClick("Nescessario preencher o campo Motivo");
      return false;
    }
    if (!despesaCurrente.idCategoria) {
      handleClick("Nescessario preencher o Categoria");
      return false;
    }
    return true;
  }

  function cadastro() {
    if (valid()) {
      api.post("despesa", despesaCurrente)
        .then((res) => { console.log(res.data); navegate("/despesa") })
        .catch((err) => { handleClick(err.message) })
    }
  }

  function update() {
    if (valid()) {
      api.put("despesa", despesaCurrente)
        .then((res) => { console.log(res.data); navegate("/despesa") })
        .catch((err) => { handleClick(err.message) })
    }
  }

  async function getDespesa() {
    await api.get(`despesa/${id}`)
      .then((res) => {
        setDespesaCurrente(res.data);
      })
      .catch((err) => console.log(err))
  }

  function returnIndexMeioDePagamentos(): number {
    var fieldData = dataMeioPagamento,
      i = 0, ii = dataMeioPagamento.length;
    for (i; i < ii; i++) if (fieldData[i].value === despesaCurrente.meioDePagamento) break;
    return i;
  }

  function returnIndexCategoria(): number {
    var fieldData = dataCategory,
      i = 0, ii = dataCategory.length;
    for (i; i < ii; i++) if (fieldData[i].value === despesaCurrente.idCategoria) break;
    return i;
  }



  function excluir() {
    api.delete(`despesa\\${id}`)
      .then((res) => {
        navegate("/despesa")
      })
      .catch((err) => handleClick(err.message))
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
            <span>Cadastrar Despesa {id}</span>
          </div>
        </div>
      </div>
      <div className='formCad'>
        <div className='fieldCad'>
          <div className='labelCad'><b>Nome:</b></div>
          <div className='inputCad'><TextField fullWidth id="nome" name="nome" value={despesaCurrente.nome} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Valor:</b></div>
          <div className='inputCad'><TextField fullWidth id="valor" type="number" name="valor" value={despesaCurrente.valor} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Meio De Pagamento:</b></div>
          <div className='inputCad'>
            <NativeSelect fullWidth value={currentMeioPagamento?.value} id="meioPagamento" onChange={changeMeioPagamento}>
              <option>Meio Pagamento</option>
              {dataMeioPagamento.map(item => <option key={item.value} value={item.value}>{item.name}</option >)}
            </NativeSelect>
          </div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Onde:</b></div>
          <div className='inputCad'><TextField fullWidth id="onde" type="text" name="onde" value={despesaCurrente.onde} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Motivo:</b></div>
          <div className='inputCad'><TextField multiline fullWidth maxRows={4} id="porque" name="porque" value={despesaCurrente.porque} onChange={changeInputs} /></div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Categoria:</b></div>
          <div className='inputCad'>
            <NativeSelect fullWidth value={currentCategory?.value} onChange={changeCategory}>
              <option>Categoria</option>
              {dataCategory.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
            </NativeSelect>
          </div>
        </div>
        <div className='fieldCad'>
          <div className='labelCad'><b>Data:</b></div>
          <div className='inputCad'><TextField fullWidth type="date" id="data" name="data" value={convertSetDate(despesaCurrente.data)} onChange={changeInputs} /></div>
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
