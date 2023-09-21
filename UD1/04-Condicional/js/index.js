"use strict"; //Obligatorio declarar variables y constantes
//declarar variables y constantes globales
const numero = "123";
if (numero == 123) {
  console.log("Los números son iguales");
}
if (numero===123) {
    console.log("Los números son iguales");
} else {
    console.log("Los números no son iguales"); 
}

if (numero == 123) console.log("Los números son iguales");

//operador ternario
let resultado= numero===123?'Los números son iguales':'No son iguales';
console.log(resultado);