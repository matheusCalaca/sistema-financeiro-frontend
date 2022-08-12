import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import MetasType from '../model/MetasType';
import { convertData, convertMoney } from './Uteis';
import { useNavigate, Navigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface TableReceitaProps {
  metas: MetasType[],
}


export const TableMetas: FC<TableReceitaProps> = ({ metas }): JSX.Element => {

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
            {
              metas.map((data) =>
                <TableRow key={data.id} hover={true} onClick={() => navegate(`cad/${data.id}`)}>
                  <TableCell key="titulo">{data.titulo}</TableCell>
                  <TableCell key="descricao">{data.descricao}</TableCell>
                  <TableCell key="valor" align="center">{convertMoney(data.valor.toString())}</TableCell>
                  <TableCell key="data" align="center">{convertData(data.data)}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
}

