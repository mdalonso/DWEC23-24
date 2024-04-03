"use strict"

//instalar el paquete expres
/**
 * El paquete Express es el framework de backend más popular de node
 * Proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas http,
 * enrutamiento y middleware para construir y desplegar aplicaciones a gran escala
 */

import express from 'express';

const app=express(); //creado el objeto con la instacia de express
//configurar el puerto
const PORT=3000;
//responder a los endpoint. Representa una acción de la API de servidor.

//Respuesta a solicitud GET al endpoint clientes.
app.get("/clientes", (req, res)=>{
    res.send("Obteniendo clientes")
});

//Respuesta a solicitud POST al endpoint clientes.
app.post("/clientes", (req, res)=>{
    res.send("Creando clientes")
})
//Respuesta a solicitud PUT al endpoint clientes.
app.put("/clientes", (req, res)=>{
    res.send("Actualizando clientes")
})
//Respuesta a solicitud DELETE al endpoint clientes.
app.delete("/clientes", (req, res)=>{
    res.send("Borrando clientes")
})
//Respuesta a solicitud GET al endpoint login.
app.get("/login", (req, res)=>{
    res.send("Respuesta servidor con express en la ruta login")
})
//servidor a la escucha por el puerto 3000
app.listen(PORT,()=>{
    console.log('escuchando solicitud');
})