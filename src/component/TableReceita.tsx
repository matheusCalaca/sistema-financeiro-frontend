import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import { convertionData } from './Uteis';
import { Link } from 'react-router-dom';

interface TableReceitaProps {
  receita: ReceitaType[],
}


const TableReceita: FC<TableReceitaProps> = ({ receita }): JSX.Element => {
  return (
    <>

      <div className='tableName'>
        <table>
          <tr>
            <th>Nome</th>
            <th>data</th>
            <th>Valor</th>
            <th>descrição</th>
            <th>Edit</th>
          </tr>
          {receita.map((data, i) => <tr key={data.id} className={(i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight"}><td>{data.nome}</td>
            <td>{convertionData(data.data)}</td>
            <td>    <span>{data.valor}</span>    <span>R$</span></td>
            <td>{data.descricao}</td>
            <td>
              <Link to={`cad/${data.id}`} key={data.id}>
                <MdModeEdit />
              </Link>
            </td>
          </tr>)}


        </table>
      </div>

    </>
  );
}

export default TableReceita;
