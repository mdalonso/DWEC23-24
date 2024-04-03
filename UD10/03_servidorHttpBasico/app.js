"use strict"

//CONFIGURACIÓN BÁSICA DE UN SERVIDOR HTTP con NODE.js nativo.

//El paquete http está preinstalado en Node.js por lo que no hay que hacer ninguna instalación npm.

import http from 'http';

//Pasos para implementar un servidor http
//Paso1: crear el servidor con createServer.
//  createServer recibe como parámetro de entrada una función que actúa como listener y que se va a
//              ejecutar cada vez que se dispara el evento request. El evento request se dispara cada
//              vez que el servidor recibe una solicitud.
//  La función listener recibe dos parámetros de entrada:
//  - req: objeto request con el contenido de la solicitud.
//  - res: objeto response con el contenido de la respuesta.
const server=http.createServer((req, res)=>{ //indicar los parámetros de petición y respuesta
    //end es un evento asociado al objeto response que envía la respuesta del servidor.
    //Entre los parámetros que recibe end están los datos que pueden ser una cadena, como se muestra en este ejemplo
    //Esta es la forma más sencilla de respuesta de un servidor.
    res.end('Estoy respondiendo a tu solicitud v.1.') 
})

//configurar el puerto
const PORT=3000;
//servidor a la escucha por el puerto 3000
//El servidor debe estar permanentemente a la escucha de que se realice alguna solicitud.
//Esto se consigue con el método listen el cual entre otras posibles configuraciones puede recibir:
//- un puerto a través del cual se producirá la comunicación con el servidor. Cuando la página está en despliegue
//          normalmente el puerto nos lo va a indicar la empresa de hosting.
//- Una función callback que se ejecuta inmediatamente después de poner el servidor a la escucha.     
server.listen(PORT,()=>{
    console.log('escuchando solicitud');
});