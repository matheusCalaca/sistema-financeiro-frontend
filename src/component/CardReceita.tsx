import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import ReceitaType from '../model/ReceitaType';
import { convertData, convertMoney } from './Uteis';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardReceitaProps {
  receita: ReceitaType[],
}


const CardReceita: FC<CardReceitaProps> = ({ receita }): JSX.Element => {

  const navegate = useNavigate();

  return (
    <>
      <div className='cardReceita'>
        {receita.map((data, i) => (
          <div key={data.id} className="card">
            

            <Box key={data.id} sx={{ my: 3, mx: 2 }} onClick={() => navegate(`cad/${data.id}`)}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                  {data.nome}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="div" className='colorGreen'>
                    {convertMoney(data.valor.toString())}
                  </Typography>
                </Grid>
              </Grid>
              <Divider>{convertData(data.data)}</Divider>
              <Typography color="text.secondary" variant="body2">
                {data.descricao}
              </Typography>
            </Box>

          </div>
        ))}
      </div>

    </>
  );
}

export default CardReceita;
