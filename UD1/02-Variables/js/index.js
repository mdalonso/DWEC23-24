"use strict"; //Obligatorio declarar variables y constantes
//declarar variables y constantes globales
let nombre="María";
var apellidos="López";
const edad=23;
//edad=34;

if (nombre==="María") {
    const edad=23;
    let nombre="pepe"
    console.log("Se llama "+ nombre + " "+ apellidos  + " y tiene "+ edad + " años.");
    //utilizar interpolación
    console.log(`Se llama ${nombre} ${apellidos} y tiene ${edad} años.`);
}

//muestra error
console.log(`Se llama ${nombre} ${apellidos}`) // y tiene ${edad} años.`);
