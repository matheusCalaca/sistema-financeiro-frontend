import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import DespesaType from '../model/DespesaType';
import { convertionData } from './Uteis';

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
              {despesa.map((data, i) => <tr key={data.id} className={(i % 2 === 0) ? "backcolorRed" : "backcolorRedLight"}><td>{data.nome}</td><td>{convertionData(data.data)}</td><td>{data.valor} R$</td><td>{data.meioPagamento}</td><td>{data.onde}</td><td>{data.porque}</td><td>{data.categoria}</td><td><MdModeEdit /></td></tr>)}

            </table>
          </div>
    </>
  );
}

export default TableDespesa;
