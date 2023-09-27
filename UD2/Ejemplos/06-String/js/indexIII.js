"use strict"; //Obligatorio declarar variables y constantes

//Permitir la entrada de un dato que contenga
//nombre y 2 apellidos
//Tenemos que controlar que la entrada contiene 3 palabras
//no es null, ni vacío. Si esto ocurre, mostrar mensaje
//de error y volver a pedir dato.
//Crear un array y en cada posición tendrá nombre, primer
//apellido y segundo apellido.
//mostrar un mensaje indicando el nombre es ...., el primer apellido es ...;
// y el segundo apellido es ...

//crear un usuario,primer caracter del nombre, 3 primeras letras
//del primer apellido y las 3 últimas letras del segundo apellido

//declaración variables
let aNomApe, usuario;
let cadena=prompt("Introduca nombre y 2 apellidos");

while (cadena ==null ||cadena=="" ||cadena.split(" ").length!=3){
  cadena=prompt("¡¡Error, al introducir datos\nIntroduca nombre y 2 apellidos")
}
//extraer nombre y apellidos mediante el método split en un array
aNomApe=cadena.split(" ");
//mostrar datos por separado
console.log(`El nombre es ${aNomApe[0]} el primer apellido es ${aNomApe[1]} el segundo apellido es ${aNomApe[2]}`);

//crear usuario
usuario=`${aNomApe[0][0]}${aNomApe[1].slice(0,3)}${aNomApe[2].slice(-3)}`;
//mostrar usuario
console.log(`El usuario es ${usuario.toLocaleLowerCase()}`);
