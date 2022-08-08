import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import ReceitaType from '../model/ReceitaType';
import { convertionData } from './Uteis';

interface CardReceitaProps {
  receita: ReceitaType[],
}


const CardReceita: FC<CardReceitaProps> = ({ receita }): JSX.Element => {
  return (
    <>
      <div className='cardReceita'>
        {receita.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className="colorGreen">{data.valor} R$</span> </div><div className="cardBody"><span>{convertionData(data.data)}</span></div><div className="cardDescription">{data.descricao}</div></div>)}
      </div>
    </>
  );
}

export default CardReceita;
