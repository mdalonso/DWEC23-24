"use strict";

//Utilizamos las variables aNom y MODULO que están definidas en el módulo funciones.js
//El require asigna los elementos importados por destructuring de manera que el primer elemento
//del objeto en el modulo.exports se asignará al primer elemento, el segundo al segundo y así sucesivamente.

//aNom recibe el elemento aNomb de funcionesII.js que hace referencia al array aNombres.
//MODULO recibe el elemento MODULO.
//HAY QUE UTILIZAR LOS MISMOS NOMBRES CON LOS QUE SE EXPORTAN LOS ELEMENTOS.
const {aNom, MODULO}=require('./funcionesII')

aNom.forEach(nombre=>{
    console.log(nombre);
});
console.log(MODULO);