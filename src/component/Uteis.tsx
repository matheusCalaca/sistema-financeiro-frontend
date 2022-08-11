export const convertData = (mes: string): string => {
  let dts = mes.split("T")[0]
  return `${dts.split("-")[2]}/${dts.split("-")[1]}/${dts.split("-")[0]}`
}

export const convertMoney = (valor: string): string => {
  let hasDot = valor.match("\\.")
  return hasDot ? `${espacamentoMoney(valor.split('.')[0])},${valor.split('.')[1]} R$` : `${espacamentoMoney(valor)},00 R$`
}

function espacamentoMoney(valor: string): string {
  let tamanho = valor.length
  valor = reverseString(valor);
  if (tamanho > 3) {
    let novoValor = ""
    for (var i = 0; i < tamanho; i = i + 3) {
      novoValor += valor.substring(i, (3 + i)) + " "
    }
    return reverseString(novoValor)
  }
  return reverseString(valor);
}

function reverseString(str: string): string {
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}
