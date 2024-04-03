"use strict";
//En el módulo funcionesI.js se define el array aNombres que será exportado para su uso en un módulo externo.

const aNombres=['María', 'Juan', 'Inés', 'Lola'];
//Module.exports establece la exportación del array aNombres.
//Esto es válido cuando se quiere exportar un único elemento del módulo.
//Para exportar varios elementos del módulo ver funcionesII.js
module.exports=aNombres;

