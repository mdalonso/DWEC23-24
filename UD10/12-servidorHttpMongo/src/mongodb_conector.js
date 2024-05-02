"use strict";

import { MongoClient } from 'mongodb';
import { DB_USER,DB_PASSWORD, DB_DATABASE} from './config.js';

//PAsos para la conexión:
//1.- Crear un objeto MongoClient 
//2.- Conexión con un cluster
//3.- Conexión con la base de datos

console.log(DB_USER,DB_PASSWORD,DB_DATABASE);
const URI=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@empresadb.4p1u3vs.mongodb.net/?retryWrites=true&w=majority&appName=empresadb`;

const cliente=new MongoClient(URI);

let conexion

const conexionBd=async ()=>{
    //try{
        if (!conexion){

            conexion=await cliente.connect();
            console.log("Conexión a MongoDB");
        }

        return conexion.db(DB_DATABASE);

    /* }catch(error){
        console.log("Error!! BD no conectada");
    } */
}

export default conexionBd;

