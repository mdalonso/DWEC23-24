"use strict"

//instalar el paquete expres
/**
 * El paquete Express es el framework de backend más popular de node
 * Proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas http,
 * enrutamiento y middleware para construir y desplegar aplicaciones a gran escala
 */

import express from 'express';
//Se importan los routers que se han configurado
import routerCliente from './routes/clientes.routes.js'
import routerLogin from './routes/login.routes.js'

const app=express(); //creado el objeto con la instacia de express
//configurar el puerto
const PORT=3000;

//middleware
//Un Router se comporta como middleware, por tanto su utilización se realiza a través de app.use
app.use(routerLogin);
app.use(routerCliente);

//servidor a la escucha por el puerto 3000
app.listen(PORT,()=>{
    console.log('escuchando solicitud');
})