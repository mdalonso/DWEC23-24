"use strict";
//El siguiente script muestra por consola la lista de nombres existentes en el array aNombres
const aNombres=['María','José','Juan','Ana'];

//Al ejecutar este Script en Node.js, console.log no hará referencia a la consola del navegador sino a la consola
//del sistema donde tenemos instalado Node.js que en nuestro caso es la consola del propio sistema Windows.
//Para su ejecución debemos poner en la consola: node app.js (podemos obviar el .js ya que Node reconoce
//archivos JavaScript)

aNombres.forEach(function(nombre){
    console.log(nombre);
});