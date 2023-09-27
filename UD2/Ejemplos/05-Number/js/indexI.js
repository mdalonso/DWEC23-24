"use strict"; //Obligatorio declarar variables y constantes
//usando setInterval

let num1=new Number(23);
let num2 =23;
let num3="aa11"


console.log(num1==num2);
console.log(num1===num2);//no son exactamente iguales porque num1 es de tipo object y num2 es de tipo NUMBER (no el objeto sino el tipo)
console.log(typeof num1);
console.log(typeof num2);
//isNaN(); no es un número devuelve true y si es un número devuelve false
console.log(isNaN(num3));

//introducir un dato y comprobar que sea un número

let numero=prompt("Introduzca un número");

while (isNaN(numero) || numero=="" || numero==" "){
  numero=prompt("Error, no es un número!!\nIntroduzca un número");
}
//sumar a numero +50

console.log(`La suma es ${parseInt(numero)+50}`);