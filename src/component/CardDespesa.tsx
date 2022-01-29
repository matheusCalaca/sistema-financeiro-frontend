import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import DespesaType from '../model/DespesaType';

interface CardDespesaProps {
  despesa: DespesaType[],
}


const CardDespesa: FC<CardDespesaProps> = ({ despesa }): JSX.Element => {
  return (
    <>
      <div className='cardReceita'>
            {despesa.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className="colorRed">{data.valor} R$</span> </div> <div className="cardBody">  <span>{data.data}</span></div><div className="cardDescription">{data.porque}</div></div>)}
          </div>
    </>
  );
}

export default CardDespesa;
