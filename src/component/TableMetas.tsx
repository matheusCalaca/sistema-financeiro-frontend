import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import MetasType from '../model/MetasType';

interface TableReceitaProps {
  metas: MetasType[],
}


export const TableMetas: FC<TableReceitaProps> = ({ metas }): JSX.Element => {

function converteDate(data: string): string {
  let dts = data.split("T")[0]
  return `${dts.split("-")[2]}\\${dts.split("-")[1]}\\${dts.split("-")[0]}`
}

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
          {metas.map((data, i) => <tr key={data.id}><td>{data.titulo}</td><td>{data.descricao}</td><td>    <span>{data.valor}</span>    <span>R$</span></td><td>{converteDate(data.data)}</td></tr>)}


        </table>
      </div>

    </>
  );
}

