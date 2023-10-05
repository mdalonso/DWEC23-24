"use strict";

let mensaje="variable global";

const mostrar=function(){
    let mensaje="Variable local";
    var nombre="pepito";
    console.log({mensaje},{nombre});
}

mostrar();

console.log({mensaje});
console.log({mensaje});//,{nombre});