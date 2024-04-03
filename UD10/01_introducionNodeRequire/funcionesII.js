"use strict";
//En este módulo se definen 2 elementos que serán utilizados en un módulo externo, por tanto es necesario exportar los dos
const aNombres=['María', 'Juan', 'Inés', 'Lola'];
const MODULO='Dwec'

//cuando se desea exportar más de un elemento éstos se pasan formando un objeto JS de manera que para uno 
//se puede indicar un nombre distinto del de su definición si se desea.
//cada elemento será un par nombre:elemento donde:
//- nombre: nombre con el que se exporta el elemento y por el que será conocido en los módulos que hagan uso de él
    //(si no se especifica ningún nombre node.js entenderá que el elemento se va a reconocer con el mismo nombre
    //con el que ha sido declarado)
//- elemento: el elemento que se va a exportar en cuestión.

module.exports={
    //El array aNombres se exporta como aNom.
    aNom:aNombres,
    //La constante MODULO se exporta con ese mismo nombre. Sería equivalente a MODULO:MODULO
    MODULO
}
