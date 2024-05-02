"use strict";

//La operación sobre la base de datos requiere de la importación de la función que establece la conexión.
import conexionBD from "../mongodb_conector.js";
//También necesitaremos importar el objeto ObjectId.
//el objeto ObjectId permite crear un identificador único para cada documento si es que éste no se proporciona.
import { ObjectId } from "mongodb";

//Estructura de la conexión:
// 1.- Conectar con la base de datos dentro del cluster.
    //Como esto genera una situación de asincronía es necesario gestionarlo con async/await o con promesas.
// 2.- Conectar con la colección.
export const getClientes=async(req, res)=>{
    try {
        //La constante database recibe una instancia de la base de datos dentro del servidor (empresadb)
        const database= await conexionBD();
        //El método collection devuelve un objeto Collection. Ese objeto collection contiene todos los
        //documentos (registros). Recibe como parámetro el nombre de la colección.
        const collection=database.collection("clientes");
        //indicar la instrucción MQL (MongoDB Query Language)
        //El método find equivale a una sentencia Select de una base de datos Relacional.
        //Recibe como parámetro un objeto que define el criterio de búsqueda.
        //en este caso, como queremos rescatar todos los documentos de la collecció Clientes,
        //ese objeto está vacío.
        //Devuelve un cursor que permite recorrer todos los documentos que cumplen con el criterio de búsqueda.
        //Ese cursor se puede convertir en un array para hacer el tratamiento habitual desde JS
        
        const result=await collection.find().toArray();
        //(PROBAR A IMPRIMIR RESULT SIN CONVERTIRLO EN UN ARRAY)
        console.log(result);
        res.status(200).json(result); 
    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
   
};
export const getCliente=async(req, res)=>{
    try {
        //Al igual que cuando se trataba de SQL, los parámetros se pasan a través el elemento
        //params del objeto request (esto no varía ya que forma parte de la estructura de http)
        console.log(req.params);
        //Se extrae el valor del parámetro por destructuring.
        //id es el nombre que se le ha dado al parámetro en el router.
        const {id}=req.params

        //conectamos con la colección
        const database= await conexionBD();
        const collection=database.collection("clientes");

        //indicar la instrucción MQL
        //Ya que el campo _id es de tipo ObjectID (tipo específico de MongoDB) es necesario
        //especificarlo ya que de lo contrario, estaríamos indicando que el valor es una cadena
        //cuando no es así.
        //Para utilizar el tipo datos ObjectId dentro de JS es necesario importar el tipo
        //desde el paquerte mongodb (ver imports)
        //ObjectId recibe como parámetro la cadena hexadecimal de 24 caracteres que
        //es el valor del ID que aparece en la colección.

        //Nota: new ObjectId aparece como tachado porque no sabe de què tipo es id. Si
        //id fuera un valor entero normal, no podría realizarse la búsqueda ya que ese 
        //constructor está deprecated. Sin embargo, sí que puede utilizarse cuando id es 
        //una cadena hexadecimal de 24 caracteres o un valor entero de 12 bytes (el
        //cual interpreta como los milisegundos transcurridos desde el 01/01/1970)
        // o un valor de fecha
        const result=await collection.find({_id: new ObjectId(id)}).toArray();
        console.log(result);
        res.status(200).json(result[0]); //la  respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    
};
export const delCliente=async(req, res)=>{
    try {
        //Obtenemos el valor del parámetro para identificar el documento que queremos eliminar
        //Este viene como parámetro definido en el endpoing
        console.log(req.params);
        const {id}=req.params

        //Conectamos con la colección
        const database= await conexionBD();
        const collection=database.collection("clientes");

        //indicar la instrucción MQL
        //deleteOne: elimina un documento identificado por el filtro especificado.
        //En este caso se eliminará el documento cuyo _id coincida con el valor especificado en el parámetro.
        //Debemos utilizar ObjectId ya que el campo _id es de ese tipo. Por tanto convertimos el parámetro
        //recibido en params como cadena al tipo de dato adecuado.
        const result=await collection.deleteOne({_id: new ObjectId(id)});

        console.log(result);
        //el objeto devuelto por deleteOne contiene un campo deletedCount que indica el número de documentos que ha sido
        //eliminado y que puede sernos útil para elaborar la respuesta.
         if (result.deletedCount==0){
            //Si no se ha eliminado ningún documento es porque no existe ninguno con el id especificado
            return res.status(404).json({
                message:'no existe'
            })
         }else{
            //En caso contrario devolvemos un mensaje de éxito.
           return res.status(200).json({
              message:'ha sido borrado'
           })
        } //la  respuesta que devuelve el servidor
        
    
    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    

}
export const addCliente=async(req, res)=>{
    try {
        //Se extraen los valores que se van a insertar en una serie de constantes 
        //por destructuring. De esa manera, body contendrá un campo que se llama nombreCliente
        //cuyo valor será asignado a la constante nombreCliente y así sucesivamente.
        console.log(req.body);
        const {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;

        //acceder a la BD
        const database= await conexionBD();
        const collection=database.collection("clientes");

        //indicar la instrucción MQL
        //Se insertará el siguiente objeto:
        /* {
            nombreCliente:valor contenido en nombreCliente,
            emailCliente:valor contenido en emailCliente,
            tlfnoCliente:valor contenido en tlfnoCliente,
            empresaCliente:valor contenido en empresaCliente
        } */

        const result=await collection.insertOne({nombreCliente, emailCliente, tlfnoCliente, empresaCliente})
        //insertOne devuelve una promesa que sse resuelve en un objeto InserOneResult con información
        //sobre la operación que puede resultar útil en al cliente. Entre esta información
        //está el id del documento insertado (insertedId)
        //En este caso, estamos devolviendo directamente esos resultados pero también
        //podríamos hacer un find sobre la colección y devolver el documento insertado
        //localizándolo mediante su id.

        console.log(result);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    

}

export const updateCliente=async(req, res)=>{
    try {
        //Se extraen la información para la actualización del documento del elemento body de request.
        //Esto se hace por destructuring de manera que cada dato recibido en el body se asigna a una constante
        //declarada con igual nombre.
        console.log(req.body);
        const {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;

        //Se extrae la información para identificar el documento que hay que actualizar
        //también por destructuring.
        console.log(req.params);
        const {id}=req.params;
    
        //Conectamos con la colección clientes.
        const database= await conexionBD();
        const collection=database.collection("clientes");

        //indicar la instrucción MQL
        //El método updateOne recibe como paratro de entrada un filtro y una o varias operaciones de actualización.
        //Como filtro, en este caso, se trata de indicar qué documento va a ser actualizado identificándolo
        //mediante su campo _id y el valor recibodo como parámetro.
        //Como operación de actualización se ha utilizado el operador $set el cual recibe las constantes que contienen
        //los valores que se van a actualizar en el documento. MongoDB sabe qué valor asignar a cada campo
        //utilizando el nombre de la constante, es decir, el nombre de la constante debe coincidir con el nombre
        //del campo cuyo valor se quiere actualizar.
        const result=await collection.updateOne({_id: new ObjectId(id)},{$set: {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}})
    
         console.log(result);
         //El campo modificedCount del objeto devuelto por updateOne nos indica el número de registros
         //que se han actualizado. Podemos utilizarlo para elaborar nuestra respuesta
         //identificando así si se ha realizado o no la actualización deseada.
         if (result.modifiedCount==0){
            //Si no se ha realizado la actualización es porque no se ha localizado el documento.
            return res.status(404).json({
                message:'no existe el documento'
            })
         }else{
            //En caso contrario, devolvemos un estado de éxito.
            return res.status(201).json({
                message:'ha sido actualilzado'
            })
         }
    
    } catch (error) {
        res.status(400).json({
            message:"no modificado"
        })
    }
   
  
}