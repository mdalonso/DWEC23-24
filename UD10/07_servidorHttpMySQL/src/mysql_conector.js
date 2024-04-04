"use strict"

//CREACIÓN DE CONEXIÓN A BASE DE DATOS MYSQL

//Para la creación de una conexión con una base de datos debemos importar el objeto
//createPool del paquete mysql2.
//createPool existe tanto en mysql2 como en mysql2/promise.
//utilizamos mysql2/promise debido a que la conexión a la base de datos es una tarea asíncrona 
//por lo que debemos utilizar promesas o funciones async/await.
import {createPool} from "mysql2/promise"; 

//Creamos la conexión utilizando el objeto importado createPool/
//El constructor de createPool recibe como parámetro un objeto JSON con las información de la conexión
//Estas características son...
const conexion=createPool(
    { //...host: dirección del servidor mysql. En nuestro caso estamos trabajando en local
        //y por tanto es localhost. Si tuvieramos la base de datos alojada en un servidor 
        //externo, habría que poner aquí la ip de dicho servidor.
        "host":"localhost",
        //user: Usuario con el que nos vamos a autenticar en la base de datos
        "user": "root",
        //password: Clave del usuario con el que nos vamos a autenticar. En nuestro caso está vacía
        "password":"",
        //database: nombre de la base de datos a la que nos vamos a conectar
        "database":"empresadb",
        //port: Establecemos el puerto por el que accedemos al servidor. 
        //El puerto por defecto de MySQL es el 3306. Si no lo hemos cambiado no es necesario
        //especificarlo.
        //"port":
    }
)

//Exportamos la conexión para poder utilizarla 
export default conexion;