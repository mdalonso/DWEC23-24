"use strict"

//instalar el paquete expres
/**
 * El paquete Express es el framework de backend más popular de node
 * Proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas http,
 * enrutamiento y middleware para construir y desplegar aplicaciones a gran escala
 */

import express from 'express';
import routerCliente from './routes/clientes.routes.js'
import routerLogin from './routes/login.routes.js'

const app=express(); //creado el objeto con la instacia de express
//configurar el puerto
const PORT=3000;
//responder a los endpoint. Representa una acción de la API


//middleware
//express.json es una función de middleware que permite parsear de forma automática las cadenas de tipo JSON en
//los objetos JSON correspondientes.
//Su uso es necesario cuando estamos recibiendo información en formato JSON. De no usarlo, express no será
//capaz de reconocer el formato de la información que recibe
app.use(express.json());

app.use(routerLogin);
app.use(routerCliente)
//servidor a la escucha por el puerto 3000

//middlewarre, controlar si se pasa una ruta en la url
app.use((req, res)=>{
    res.status(404).json({
        message:"endpoint no encontrado"
    })
})
app.listen(PORT,()=>{
    console.log('escuchando solicitud');
})