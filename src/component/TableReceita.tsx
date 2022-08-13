import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import { MdModeEdit } from 'react-icons/md';
import ReceitaType from '../model/ReceitaType';
import { convertData, convertMoney } from './Uteis';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface TableReceitaProps {
  receita: ReceitaType[],
}


const TableReceita: FC<TableReceitaProps> = ({ receita }): JSX.Element => {

  const navegate = useNavigate();

  interface Column {
    id: 'titulo' | 'descricao' | 'valor' | 'data';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  const columns: readonly Column[] = [
    { id: 'titulo', label: 'Título', minWidth: 100 },
    { id: 'descricao', label: 'Descrição', minWidth: 200 },
    {
      id: 'valor',
      label: 'Valor',
      minWidth: 100
    },
    {
      id: 'data',
      label: 'Data',
      minWidth: 100
    }
  ];


  return (
    <>

      <div className='tableName'>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {receita.map((data, i) =>
              <TableRow key={data.id} hover={true} className={(i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight"} onClick={() => navegate(`cad/${data.id}`)}>
                <TableCell>{data.nome}</TableCell>
                <TableCell>{convertData(data.data)}</TableCell>
                <TableCell>{convertMoney(data.valor.toString())}</TableCell>
                <TableCell>{data.descricao}</TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>

    </>
  );
}

export default TableReceita;
