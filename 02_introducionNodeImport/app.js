"use strict";
//Import asigna contenido a aNombres y MODULO por destructuring en función del orden de los export que va
//encontrando en el archivo externo funciones.js

//Para poder utilizar import hay que modificar el archivo package.json.

import {aNombres, MODULO} from './funciones.js';

//antes de utilizar cowsay es necesario instalarlo con npm

import cowsay from 'cowsay';


aNombres.forEach(nombre=>{
    console.log(nombre);
});

console.log(cowsay.say({
    text : MODULO,
    e : "oO",
    T : "U"
}));
 