import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import DashType from '../model/DashType';

interface TableDashProps {
  dataDash: DashType[],
}


const TableDash: FC<TableDashProps> = ({ dataDash }): JSX.Element => {
  return (
    <>

      <div className='tableName'>
        <table>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Edit</th>
          </tr>
          {dataDash.map((item, i) => <tr className={item.type ? ((i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight") : ((i % 2 === 0) ? "backcolorRed" : "backcolorRedLight")}> <td>{item.nome}</td><td><span>{item.valor}</span><span>R$</span></td> <td>{item.data}</td><td><MdModeEdit /></td></tr>)}

        </table>
      </div>
    </>
  );
}

export default TableDash;
