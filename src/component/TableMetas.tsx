import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import MetasType from '../model/MetasType';
import { convertionData } from './Uteis';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';

interface TableReceitaProps {
  metas: MetasType[],
}


export const TableMetas: FC<TableReceitaProps> = ({ metas }): JSX.Element => {

    return (
    <>

      <div className='tableName'>
        <table>
          <tr>
            <th>Titulo</th>
            <th>descrição</th>
            <th>Valor</th>
            <th>data</th>
            <th>Edit</th>
          </tr>
          {metas.map((data, i) => <tr key={data.id}>
            <td>{data.titulo}</td>
            <td>{data.descricao}</td>
            <td>    <span>{data.valor}</span>    <span>R$</span></td>
            <td>{convertionData(data.data)}</td>
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

