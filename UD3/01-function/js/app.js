"use strict";
//Declaración tradicional
function multiplicar(a){
    return(a*5);
}
//Expresión de función
const multiplicarII=function(a,b=1){
    return a*b;
}
//función flecha 1
const multiplicarIII=(a,b=1)=>{
    return a*b;
}
//función flecha 2 (simplificada)
const multiplicarIV=(a,b=1)=>a*b;

const multiplicarV=a=>a*5;

console.log(multiplicar(2));
console.log(multiplicarII(4));
console.log(multiplicarIII(3));
console.log(multiplicarIV(6));
console.log(multiplicarV(6));