"use strict"; //Obligatorio declarar variables y constantes
//declarar variables y constantes globales
let numero,
  total = 1;
//bucle for
for (let index = 0; index < 20; index++) {
  console.log(`El número es ${index}`);
}

//bucle do...while
do {
  //recogida de datos
  numero = parseInt(prompt("Introduzca un número 0->Fin"));
  if (numero != 0) {
    total *= numero;
  }
} while (numero != 0);
console.log(`El resultado de la operación es ${total}`);
//Utilizar bucle while
numero = parseInt(prompt("Introduzca un número 0->Fin"));
while (numero != 0) {
  total *= numero;

  numero = parseInt(prompt("Introduzca un número 0->Fin"));
}
console.log(`El resultado de la operación es ${total}`);
