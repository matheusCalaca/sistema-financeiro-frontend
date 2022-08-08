export const convertionData = function convertionData (mes: string): string { 
    let dts = mes.split("T")[0]
  return `${dts.split("-")[2]}/${dts.split("-")[1]}/${dts.split("-")[0]}`
 }