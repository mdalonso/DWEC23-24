"use strict"; //Obligatorio declarar variables y constantes
//declarar variables y constantes globales
let nota = prompt("Introduzca nota [1-10]", "1");
let resultado;
console.log(typeof numSemana);
switch (nota) {
  case "1":
  case "2":
  case "3":
  case "4":
    resultado = "Insuficiente";
    break;
  case "5":
    resultado = "Suficiente";
    break;
  case "6":
    resultado = "Bien";
    break;
  case "7":
  case "8":
    resultado = "Notable";
    break;
  case "9":
  case "10":
    resultado = "Notable";
    break;
  default:
    resultado = "Dato erróneo. Debe estar entre 1-7";
    break;
}
console.log(`La nota  ${nota} es ${resultado}`);
// 2ª forma

switch (true) {
  case nota >=1 && nota <=4:
      resultado = "Insuficiente";
    break;
  case nota >=5 && nota <6:
    resultado = "Suficiente";
    break;
    case nota >=6 && nota <7:
    resultado = "Bien";
    break;
  case nota >=7 && nota <=8:
    resultado = "Notable";
    break;
  case nota>=9 && nota<=10:
    resultado = "Sobresaliente";
    break;
  
  default:
    resultado = "Dato erróneo. Debe estar entre 1-7";
    break;
}
console.log(`La nota  ${nota} es ${resultado}`);

