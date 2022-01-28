import React from 'react';
import '../resource/css/Dashboard.css';
import Footer from '../component/Footer';
import Chart from 'react-google-charts';
import HeaderDash from '../component/HeaderDash';
import { MdModeEdit } from 'react-icons/md';
import DashboardGrafico from '../component/DashboardGrafico';


import receita from '../data/dataReceita.json'
import ReceitaType from '../model/ReceitaType';

export const dataReceita: ReceitaType[] = receita;




export const dataDespesa = [{ "id": 1, "nome": "Conta de Energia", "valor": 872.43, "data": "20/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "Enel", "categoria": "Habitação" },
{ "id": 2, "nome": "almoço de trabalho", "valor": 45.21, "data": "18/12/2021", "porque": "saida com o pessoal de trabalho para almoçar", "meioPagamento": "Boleto", "onde": "", "categoria": "Restaurante" },
{ "id": 3, "nome": "Conta de Agua", "valor": 150.10, "data": "15/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "Saneago", "categoria": "Habitação" },
{ "id": 4, "nome": "Internet", "valor": 89.90, "data": "15/12/2021", "porque": "", "meioPagamento": "Boleto", "onde": "", "categoria": "Habitação" },
{ "id": 5, "nome": "Presente aniversario", "valor": 72.90, "data": "10/12/2021", "porque": "Compra do presente de aniversario do Jõao", "meioPagamento": "Cartão de Credito", "onde": "Renner", "categoria": "Familia" },
{ "id": 6, "nome": "Jantar", "valor": 372.43, "data": "09/12/2021", "porque": "Saida para jantar em familia", "meioPagamento": "Cartão de Credito", "onde": "Pizza na Brasa", "categoria": "Familia" },
{ "id": 7, "nome": "sorvete", "valor": 22.18, "data": "03/12/2021", "porque": "compra de sorvet pois estava com vontade", "meioPagamento": "PIX", "onde": "Soreveteria Açai", "categoria": "Restaurante" }];

function Dashboard() {
  return (
    <>
      <HeaderDash />
      <div className='saldoDash'>
        <div className='titleDash'>
          <span>Dezembro 2021</span>
        </div>
        <DashboardGrafico receita={dataReceita} />

        <div className='tableResumo'>
          <div className='tableResumoTitle'>
            <span>Resumo</span>
          </div>

          <div className='tableName'>
            <table>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Edit</th>
              </tr>
              <tr className='backcolorRed'>
                <td>Conta Energia</td>
                <td>
                  <span>1000</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorRedLight'>
                <td>Conta de Agua</td>
                <td>
                  <span>456.67</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorRed'>
                <td>Internet</td>
                <td>
                  <span>1000</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>

              <tr className='backcolorGreenLight'>
                <td>Salario</td>
                <td>
                  <span>2267,78</span>
                  <span>R$</span>
                </td>
                <td><MdModeEdit /></td>
              </tr>
            </table>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
