"use strict";
//Exportación de un único elemento.

//Utilizamos la constante aNombres que está definida en el módulo funcionesI.js
//require permite omitir la extensión del archivo si éste es un archivo js.
//el nombre del elemento que recibe el require (aNombres) debe coincidir con el nombre del elemento
//exportado en el módulo externo.

const aNombres=require('./funcionesI')

aNombres.forEach(nombre=>{
    console.log(nombre);
});
