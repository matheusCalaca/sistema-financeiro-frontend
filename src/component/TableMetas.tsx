import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import MetasType from '../model/MetasType';

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
          </tr>
          {metas.map((data, i) => <tr key={data.id}><td>{data.titulo}</td><td>{data.descricao}</td><td>    <span>{data.valor}</span>    <span>R$</span></td><td>{data.data}</td></tr>)}


        </table>
      </div>

    </>
  );
}

