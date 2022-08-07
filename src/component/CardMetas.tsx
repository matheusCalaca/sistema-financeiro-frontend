import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import MetasType from '../model/MetasType';
import { convertionData } from './Uteis';

interface CardReceitaProps {
  metas: MetasType[],
}


export const CardMetas: FC<CardReceitaProps> = ({ metas }): JSX.Element => {
  return (
    <>
      <div className='cardReceita'>
        {metas.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.titulo} <span>{data.valor} R$</span> </div><div className="cardBody"><span>{convertionData(data.data)}</span></div><div className="cardDescription">{data.descricao}</div></div>)}
      </div>
    </>
  );
}
