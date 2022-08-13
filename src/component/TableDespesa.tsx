import React, { FC } from 'react';
import '../resource/css/HeaderDash.css';
import DespesaType from '../model/DespesaType';
import { convertData, convertMoney } from './Uteis';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface TableDespesaProps {
  despesa: DespesaType[],
}


const TableDespesa: FC<TableDespesaProps> = ({ despesa }): JSX.Element => {
  const navegate = useNavigate();

  interface Column {
    id: 'titulo' | 'data' | 'valor' | 'descricao' | 'categoria';
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
      id: 'descricao',
      label: 'Descrição',
      minWidth: 200
    },
    {
      id: 'categoria',
      label: 'Categoria',
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
          {despesa.map((data, i) =>
            <TableRow key={data.id} hover={true} onClick={() => navegate(`cad/${data.id}`)} className={(i % 2 === 0) ? "backcolorRed" : "backcolorRedLight"}>
              <TableCell>{data.nome}</TableCell>
              <TableCell>{convertMoney(data.valor.toString())} R$</TableCell>
              <TableCell>{data.meioDePagamento} - {data.onde} - {data.porque}</TableCell>
              <TableCell>{data.categoria}</TableCell>
              <TableCell>{convertData(data.data)}</TableCell>
            </TableRow>)}

        </Table>
      </div>
    </>
  );
}

export default TableDespesa;
