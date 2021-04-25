import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFetcha'
})
export class FiltroFetchaPipe implements PipeTransform {

  
  transform(row: any, f1:Date,f2:Date): any {
    const resultadoFiltro = [];
    console.log(f1)
    console.log(f2)
let date1 = new Date(f1);
console.log(date1)
let date2 = new Date(f2);
console.log(date2)
console.log(row)
if (f1 >= f2 || f1 == null) {
  return row;
}

if (f2 == null) {
  f2 = new Date();
}

for (const filteredRow of row) {
  
  // console.log(new Date(filteredRow.fecha))
  let a = new Date(filteredRow.fecha);
  console.log(a);

  if (a > date1 && a <= date2) {
    console.log("asd", filteredRow);
    resultadoFiltro.push(filteredRow);
  }
}

    return resultadoFiltro;
  }

}
