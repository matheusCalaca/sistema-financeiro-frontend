import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';

interface TableReceitaProps {
  receita: ReceitaType[],
}


const TableReceita: FC<TableReceitaProps> = ({ receita }): JSX.Element => {
  return (
    <>
      {receita.map((data, i) => <tr key={data.id} className={(i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight"}><td>{data.nome}</td><td>{data.data}</td><td>    <span>{data.valor}</span>    <span>R$</span></td><td>{data.descricao}</td><td><MdModeEdit /></td></tr>)}
    </>
  );
}

export default TableReceita;
