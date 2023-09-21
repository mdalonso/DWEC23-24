"use strict"; //Obligatorio declarar variables y constantes
//declarar variables y constantes globales
let numSemana = prompt("Introduzca nº semana [1-7]", "1");
let resultado;
console.log(typeof numSemana);
switch (numSemana) {
  case "1":
    resultado = "Lunes";
    break;
  case "2":
    resultado = "Martes";
    break;
  case "3":
    resultado = "Miércoles";
    break;
  case "4":
    resultado = "Jueves";
    break;
  case "5":
    resultado = "Viernes";
    break;
  case "6":
    resultado = "Sábado";
    break;
  case "7":
    resultado = "domingo";
    break;
  default:
    resultado = "Dato erróneo. Debe estar entre 1-7";
    break;
}
console.log(`El día de la semana ${numSemana} es ${resultado}`);
