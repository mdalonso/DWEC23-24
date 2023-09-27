"use strict"; //Obligatorio declarar variables y constantes

//mostrar abecedario
for (let index =65; index <= 90; index++) {
  document.write(String.fromCharCode(index)); //convertir el valor numérico a caracter
  
}

//mostrar 20 letras del alfabeto de forma aleatoria
document.write("<br>");
for (let index = 0; index <= 20; index++) {
  
  //generar un número aleatorio entre 65 y 90
  const numAscc=Math.round(Math.random()*(90-65))+65;
  document.write(String.fromCharCode(numAscc))
}