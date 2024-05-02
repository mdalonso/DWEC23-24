"use strict"

//importar el paquete mongodb para realizar la conexión con MongoDB

import { MongoClient } from "mongodb";
import { DB_DATABASE, DB_PASSWORD, DB_USER } from "./config.js";

//PAsos para establecer la conexión:***************************************************************
//1.- Creación de objeto MongoClient --> Referencia al cluster identificado por la cadena de conexión (URI).
//2.- Conexión al cluster --> Método connect()
//3.- Conexión a la base de datos --> Método db(). Este método devuelve un objeto que contiene la instancia de la base
//de datos con la que queremos conectar y es lo que tenemos que devolver.
//***************************************************************************************************** */

//Paso 1: Creación del objeto MongoClient

//Definimos una constante con la cadena de conexión proporcionada por la aplicación Atlas MongoDb
//const URI="mongodb+srv://mdalonsodavila:mdalonsodavila@empresadb.4p1u3vs.mongodb.net/?retryWrites=true&w=majority&appName=empresadb";
//Sin ustilizar variables de entorno
//const URI="mongodb+srv://usuariodb:ljFsyAXnQHiioDnJ@empresadb.4p1u3vs.mongodb.net/?retryWrites=true&w=majority&appName=empresadb";

//USANDO VARIABLES DE ENTORNO
const URI=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@empresadb.4p1u3vs.mongodb.net/?retryWrites=true&w=majority&appName=empresadb`;

//crear la instancia del cliente Mongodb utilizando la URI de conexión que nos ha proporcionado MongoDB.
const client=new MongoClient(URI);



//Definimos una variable que nos permitirá chequear si la conexión se realiza correctamente.
let conexion

//Definimos una función que será a que utilizamos en los controladores para establecer la conexión con la base de datos en cada operación.
//Se utilizan funciones async await ya que estamos manejando situaciones de asincronía.
const conexionBD=async()=>{
    //conectar al servidor de forma asíncrona
    try {
        //Paso 2: Conexión al cluster
        //Si la conexión es undefined es porque aún no se ha establecido una conexión.
        if(!conexion){
            //El método connect devuelve una promesa que se resuelve en un objeto MongoClient.
            //El objeto MongoCliente establece la conexión con el servidor (cluster) especificado en la cadena de conexión.
            conexion=await client.connect();
            console.log('Conectada la BD MongoDB');
        }
        //Paso 3: Conexión a la base de datos
        //Una vez se realiza la conexión con el cluster, devolvemos un objeto Db con una instacia de la base de datos 
        //con la que queremos conectar dentro del servidor (cluster)

        //(Sin variables de entorno)
        //return conexion.db("empresadb");  

        //(Con variables de entorno)
        return conexion.db(DB_DATABASE);  

     } catch (error) {
        console.log('Error!! BD no conectada ');
    } 
    
}

//Se exporta la función que establece la conexión con el servidor para hacer uso de ella en los controladores.
export default conexionBD;