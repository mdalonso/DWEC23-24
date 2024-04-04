"use strict"
//Importamos la clase Router para poder crear las rutas a la URL login
import {Router} from 'express';
//Importamos el archivo en el que se ha configurado la conexión a MySQL
import conexion from '../mysql_conector.js';

//Creamos el router
const router=Router();

//Probamos la conexión a la base de datos con un get
//La conexión es una operación asíncrona por lo que necesitamos utilizar funciones async/await
router.get("/login", async(req, res)=>{
        // res.send("Respuesta servidor con express en la ruta login")
        //Aunque la consulta no está obteniendo datos almacenados, se está realizando sobre la base de datos
        //El resultado que se obtiene de la query es una colección bastante compleja de información (podemos quitar
        //los corchetes a result para comprobarlo)
        //A nosotros nos interesa RESULT, que es el primer elemento de esa
        //colección, por lo que indicamos que sólo queremos recibir ese primer elemento
        //Utilizamos para ello destructuring
        const [resultado]=await conexion.query("SELECT 1 + 1 as Suma");
        //Ese primer elemento recibido en resultado es a la vez otra colección con un
        //único elemento, que es el que nos interesa.
        console.log(resultado[0]);
        res.json(resultado[0]);
       
})

export default router; //exportamos