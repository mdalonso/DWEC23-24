import conexion from "../conector_mysql.js";

//importamos el objeto bcrypt que da acceso a la funcionalidad del módulo bcrypt que nos permite 
//encriptar datos.
import bcrypt from 'bcrypt';
//importamos el objeto jwt del paquete jsonwebtoken con el fin de crear un token de seguridad para el
//usuario autenticado.
import jwt from 'jsonwebtoken';
import { SECRETO } from '../../config.js'


//Controlador para añadir un usuario (POST a /register)
export const addUsuario=async(req,res)=>{
    //Recibimos los datos de la cuenta de usuario a través del body
    //ya que se trata de una operación de inserción de información en el servidor.
    //En nuestro caso hemos considerado únicamente usuario y contraseña para simplificar
    //pero es habitual que una cuenta de usuario tenga más información.
    const {usuario,contrasena}=req.body;

    console.log(usuario,contrasena);

    try{
        //Hay que comprobar que el usuario no exista previamente ya que en ese caso no se insertará la información
        let [resultado]=await conexion.query("SELECT * FROM usuarios WHERE usuario=?",[usuario]);
        //Si el resultado no es un array vacío, ees porque ha encontrado un usuario con ese nombre
        if (resultado.length>0){
            return res.status(400).json({mensaje:"Usuario ya existe"});
        }

        //LA contraseña debe de guardarse encriptada por lo que se hará uso del módulo bcrypt.
        //salt contendrá la cadena de SALT para fortalecer el proceso de encriptación.
        const salt=await bcrypt.genSalt(10);
        //Encriptamos la contraseña junto con la cadeja de SALT.
        const clave=await bcrypt.hash(contrasena,salt);

        console.log(clave);


        //Insertamos los datos de la cuenta de usuario en la tabla correspondiente
        [resultado]=await conexion.query("INSERT INTO usuarios (usuario,contrasena) VALUES (?,?)",[usuario,clave]);
        
        console.log(resultado);
        
        //Se elabora la respuesta de usuario creado
        res.status(201).json({
            id:resultado.insertId,
            mensaje:"Usuario creado"
        })
    
      }catch(error){

        
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    } 

}   


export const doLogin=async(req,res)=>{
    //Recuperamos los datos de login del body
    const {usuario,contrasena}=req.body;
    console.log(usuario,contrasena);
    //Comprobamos que existe un usuario con el nombre introducido
    const [resultado]=await conexion.query("SELECT * FROM usuarios WHERE usuario=?",[usuario]);
    
    console.log(resultado[0]);
    //Si el resultado es un array de longitud 0 es porque no se ha encontrado un usuario con ese nombre
    //En ese caso devolvemos la respuesta correspondiente a un error.
    if (resultado.length==0){
        return res.status(404).json({mensaje:"El usuario no existe"});
    }
    
    //Comprobamos que la contraseña que le pasamos coincida con la que tenemos almacenada
    //Como la contraseña almacenada está encriptada, debemos utilizar el método compare de bcrypt
    const passOK=await bcrypt.compare(contrasena,resultado[0].contrasena);
    //Si el resultado de la comparación es false (no son iguales) y por tanto debemos elaborar
    //la respuesta acorde a esa situación
    if (!passOK){
        return res.status(401).json({mensaje:"Contraseña no válida"});
    }

 //Creación del token de autenticación del usuario
 //El Token tiene tres partes: cabecera, payload y firma. Nuestra tarea principal con respecto al token
 // es construir el objeto con 
 //la información que lleva el token (payload) la cual está relacionada con la autenticación del usuario
 //Creamos el objeto payload que en nuestro caso sólo va a contener el nombre del usuario.
    const payload={
        name:usuario
    };
 //También podemos intervenir en la creación del token indicando algunos elementos de la cabera a través de
 //las opciones. Entre estas opciones podemos pasar información para la encriptación del token, información sobre
 //la entidad que realiza la firma, tiempo de validez del token...
 //Nosotros en este caso le vamos a indicar el tiempo de validez del token (1 hora)
    const opciones={
        expiresIn:'1h'
    }
 //Mediante el método sign creamos el token. Para ello le pasamos 3 argumentos:
 //- el payload creado anteriormente
 //- la clave privada de firma. La tenemos almacenada en la variable de entorno SECRETO y
 //sólo se conoce en el servidor. Nunca se envia al cliente.
 //- opciones en el objeto construido más arriba.
    const token=jwt.sign(payload,SECRETO,opciones)

//El token debe ser utilizado con el cliente para demostrar su identidad, por lo que debemos enviarselo
//para que pueda volver a enviarlo al servidor cuando necesite solicitar autorización
//ante alguna acción que lo requiera.
//El cliente enviará el token en cada solicitud a través de la cabecera authorization o x-access-token
    res.status(200).json({mensaje:"Bienvenido",token:token});
    
}