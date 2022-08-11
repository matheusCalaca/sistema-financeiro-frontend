import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import DashType from '../model/DashType';
import { convertData } from './Uteis';

interface CardDashProps {
  dataDash: DashType[],
}


const CardDash: FC<CardDashProps> = ({ dataDash }): JSX.Element => {
  return (
    <>
      <div className='cardReceita'>
        {dataDash.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className={data.type ? "colorGreen" : "colorRed"}>{data.valor} R$</span> </div> <div className="cardBody">  <span>{convertData(data.data)}</span></div></div>)}
      </div>
    </>
  );
}

export default CardDash;
