import React, { FC } from 'react';
import logo from '../resource/img/logo.svg';
import '../resource/css/HeaderDash.css';
import { Link } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';

interface CardReceitaProps {
  receita: ReceitaType[],
}


const CardReceita: FC<CardReceitaProps> = ({ receita }): JSX.Element => {
  return (
    <>
      <div className='cardReceita'>
        {receita.map((data, i) => <div key={data.id} className="card"><div className="titleCardBody">{data.nome} <span className="colorGreen">{data.valor} R$</span> </div><div className="cardBody"><span>{data.data}</span></div><div className="cardDescription">{data.descricao}</div></div>)}
      </div>
    </>
  );
}

export default CardReceita;
