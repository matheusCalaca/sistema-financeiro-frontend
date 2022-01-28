
interface DespesaType {
  id: number,
  nome: string,
  valor: number,
  data: string,
  porque?: string,
  meioPagamento: string,
  onde?: string,
  categoria: string
};

export default DespesaType;