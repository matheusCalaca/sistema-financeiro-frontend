import React from 'react';
import '../resource/css/Receita.css';
import Footer from '../component/Footer';
import Chart from 'react-google-charts';
import HeaderDash from '../component/HeaderDash';
import { MdAdd, MdModeEdit } from 'react-icons/md';

export const data = [
  ["Task", "Hours per Day"],
  ["receita", 1000],
  ["gasto", 3000],
];

export const options = {
  pieHole: 0.4,
};

export const dataDespesa = [{ "nome": "Conta de Energia", "valor": 872.43, "data": "20/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "Enel", "categoria": "Habitação" },
{ "nome": "almoço de trabalho", "valor": 45.21, "data": "18/12/2021", "porque": "saida com o pessoal de trabalho para almoçar", "meioPagamento": "Boleto", "onde": "", "categoria": "Restaurante" },
{ "nome": "Conta de Agua", "valor": 150.00, "data": "15/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "Saneago", "categoria": "Habitação" },
{ "nome": "Internet", "valor": 89.90, "data": "15/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "", "categoria": "Habitação" },
{ "nome": "Presente aniversario", "valor": 72.90, "data": "10/12/2021", "porque": "Compra do presente de aniversario do Jõao", "meioPagamento": "Cartão de Credito", "onde": "Renner", "categoria": "Familia" },
{ "nome": "Jantar", "valor": 372.43, "data": "09/12/2021", "porque": "Saida para jantar em familia", "meioPagamento": "Cartão de Credito", "onde": "Pizza na Brasa", "categoria": "Familia" },
{ "nome": "sorvete", "valor": 22.18, "data": "03/12/2021", "porque": "compra de sorvet pois estava com vontade", "meioPagamento": "PIX", "onde": "Soreveteria Açai", "categoria": "Restaurante" }];


function Despesa() {
  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>Dezembro 2021</span>
        </div>
        <div className='dashResumo'>
          <div className='graficoDiv'>
            <Chart
              chartType="PieChart"
              className='grafico'
              data={data}
              options={options}
            />
          </div>
          <div className='dadosFinanceiro'>
            <div className='titleSaldo'>
              <div>Saldo: </div> <div>1000</div> <div>R$</div>
            </div>
            <div className='resumoFinanceiro'>
              <span>Receita: </span> <span className='colorGreen'>1000</span> <span>/</span> <span>Despesa:</span> <span className='colorRed'>3000</span> <span>R$</span>
            </div>
          </div>
        </div>

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Despesa</span>
          </div>
          <div className='cardReceita'>
            {dataDespesa.map((data, i) => <div className="card"><div className="titleCardBody">{data.nome} <span className="colorRed">{data.valor} R$</span> </div> <div className="cardBody">  <span>{data.data}</span></div><div className="cardDescription">{data.porque}</div></div>)}
          </div>

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
              {dataDespesa.map((data, i) => <tr className={(i%2 === 0) ? "backcolorRed" : "backcolorRedLight"}><td>{data.nome}</td><td>{data.data}</td><td>{data.valor} R$</td><td>{data.meioPagamento}</td><td>{data.onde}</td><td>{data.porque}</td><td>{data.categoria}</td><td>Edit</td></tr>)}
            
            </table>
          </div>

        </div>
      </div>

      <div className="butoonFloat">
        <MdAdd />
      </div>

      <Footer />
    </>
  );
}

export default Despesa;
