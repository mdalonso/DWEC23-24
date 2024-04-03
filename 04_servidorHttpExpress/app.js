"use strict"
//Implememtación de un servidor http utilizando express.js
//instalar el paquete expres
/**
 * El paquete Express es el framework de backend más popular de node
 * Proporciona un conjunto de herramientas para aplicaciones web, peticiones y respuestas http,
 * enrutamiento y middleware para construir y desplegar aplicaciones a gran escala
 */

//Importamos la librería para poder utilizarla.
import express from 'express';

//la constante app va a recibir una instancia del objeto express, con toda la funcionalidad del framework
const app=express(); //creado el objeto con la instacia de express

//configurar el puerto
//para el ejemplo vamos a utilizar el puerto 3000
//En el caso de que la aplicación esté desplegada en un hosting, el puerto nos
//lo proporciona la empresa de hosting.
const PORT=3000;

//responder a los endpoint. Representa una acción de la API

//Se definen respuestas a solicitudes get de diferentes endpoints.
//Respuesta a solicitud get al directorio raiz de nuestra aplicación.
//Esta ruta raíz representa el index.html o el acceso a la url a través del puerto, por ejemplo en nuestro caso
//localhost:3000
app.get("/", (req, res)=>{
    //send es un método del objeto response que se encarga de enviar la respuesta http.
    //En este casp estamos enviando como respuesta una cadena
    res.send("Respuesta servidor con express")
})
//Definimos la respuesta al endpoint representado por la página de login.
app.get("/login", (req, res)=>{
    res.send("Respuesta servidor con express en la ruta login")
})

//El servidor debe estar a la escucha de solicitudes y para ello se utiliza el método listen.
app.listen(PORT,()=>{
    console.log('escuchando solicitud');
})