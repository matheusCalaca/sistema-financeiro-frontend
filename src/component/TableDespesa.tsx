import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import DespesaType from '../model/DespesaType';
import { convertData } from './Uteis';
import { Link } from 'react-router-dom';

interface TableDespesaProps {
  despesa: DespesaType[],
}


const TableDespesa: FC<TableDespesaProps> = ({ despesa }): JSX.Element => {
  return (
    <>
     
     <div className='tableName'>
            <table>
              <tr>
                <th>Nome</th>
                <th>data</th>
                <th>Valor</th>
                <th>Meio Pag.</th>
                <th>Onde</th>
                <th>Por que</th>
                <th>Categoria</th>
                <th>Edit</th>
              </tr>
              {despesa.map((data, i) => 
              <tr key={data.id} className={(i % 2 === 0) ? "backcolorRed" : "backcolorRedLight"}>
              <td>{data.nome}</td>
              <td>{convertData(data.data)}</td>
              <td>{data.valor} R$</td>
              <td>{data.meioPagamento}</td>
              <td>{data.onde}</td>
              <td>{data.porque}</td>
              <td>{data.categoria}</td>
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

export default TableDespesa;
