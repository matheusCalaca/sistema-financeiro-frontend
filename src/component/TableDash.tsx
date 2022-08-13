import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import DashType from '../model/DashType';
import { convertData, convertMoney } from './Uteis';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface TableDashProps {
  dataDash: DashType[],
}


const TableDash: FC<TableDashProps> = ({ dataDash }): JSX.Element => {

  interface Column {
    id: 'titulo' | 'valor' | 'data';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  const columns: readonly Column[] = [
    { id: 'titulo', label: 'Título', minWidth: 100 },
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
            {dataDash.map((item, i) =>
              <TableRow key={i} className={item.type ? ((i % 2 === 0) ? "backcolorGreen" : "backcolorGreenLight") : ((i % 2 === 0) ? "backcolorRed" : "backcolorRedLight")}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{convertMoney(item.valor.toString())}</TableCell>
                <TableCell>{convertData(item.data)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TableDash;
