import conexion from "../mysql_conector.js"


//Las funciones del controlador deben ser exportadas para poder utilizarlas desde el router.

//La consultas a la base de datos n una situación de asincronismo, por tanto necesitamos
//utilizar un esquema basado en promesas async/await para la implementación del middleware.

//GET para recuperar todos los clientes de la base de datos.****************************************
export const getClientes=async(req, res)=>{
    //Es necesario controlar los errores ya que si no hacemos express detendrá el servidor si se produce
    //un error.
    try {
        //Realizamos la consulta SELECT a través de la conexión
        //La consulta SELECT devuelve un array de dos elementos de los cuales sólo nos interesa el primero
        //Lo recuperamos mediante destructuring
        //(Podemos comprobar la respuesta completa de la query quitando los corchetes a la siguiente línea)
        const [result]=await conexion.query("SELECT * FROM clientes");
        //Con este console podemos comprobar lo que nos devuelve la base de datos.
        //Result va a contener una colección de objetos JSON cada uno de los cuales es un registro de la tabla clientes
        console.log(result);
        //Una vez obtenida la información de la base de datos, el servidor debe devolver una respuesta con el resultado
        //de la solicitud GET.
        //En este caso, como no se ha producido ningún error devolveremos un código de error 200 y los datos
        //obtenidos de la base de datos en RESULT. 
        //PAra devolver los datos en formato json es necesario especificar en la aplicación (app.js) que los 
        //datos vienen en ese formato (ver app.js)
        //Eso nos va a permitir utilizar el método json para cerrar la solicitud.
        //json devuelve los resultados de tipo JSON convertidos en una cadena utilizando internamente JSON.STRINGIFY
        res.status(200).json(result); 
    } catch (error) {
        //En caso de que se produzca un error, con el fin de que el servidor no se detenga
        //podemos lanzar un error genérico (500) y enviar como salida un mensaje de error que podemos configurar
        //como consideremos mejor.
        res.status(500).json({
            message:"Error en el servidor"
        })
   }
   
};

//GET PARA RECUPERAR UN CLIENTE POR SU ID ******************************************
export const getCliente=async(req, res)=>{
    //En este caso la consulta a la base de datos contendrá un WHERE que aplicará un filtro a la tabla.
    //Esto supone definir un parámetro que represente al id del cliente que se quiere recuperar
    //Ese parámetro se pasa a través de la url (ver el router).
    //Este parámetro está contenido en el campo params del objeto request.
    //El campo params es un objeto JSON que contiene un elemento por cda uno de los parámetros que se
    //pasan a la URL
    console.log(req.params);
    //Obtenemos el valor de ese parámetro por destructuring de manera que a la constante id se le asignará
    //el valor del campo id contenido en params. Id es el nombre del parámetro definido en el router.

    const {id}=req.params
    
    //OTRA FORMA DE EXTRAER EL VALOR DEL PARÁMETRO id de params sería
    //const id=req.params.id

    //Controlamos los posibles errores con un try-catch
    try {
        //Se configura la consulta con un parámetro. El valor del parámetro sustituirá al signo de interrogación,
        //en este caso, el valor obtenido de req.params (los valores de los parámetros se asignan por destructuring)
        //Estos parámetros se asignan por destructuring, por ello es necesario pasarlos en forma de array
        //Select, como ya sabesmos, devuelve una colección de objetos JSON, con un elemento por cada registro
        //obtenido de la consulta.
        const [result]=await conexion.query("SELECT * FROM clientes WHERE id=?", [id]);
        //Como en este caso sólo se devolverá un elemento como máximo, en caso de que no se produzca ningún error
        //se devolverá el primer elemento de result (es decir, la fila que queríamos localizar)
        console.log(result[0]);
        //Podemos elaborar una respuesta específica en caso de que no se encuentre el cliente que buscamos
        //PAra ello podemos comprobar la longitud de la colección devuelta por la query
        if (result.length<=0){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.status(200).json(result[0]); //la  respuesta que devuelve el servidor
    } catch (error) {
        //en caso de que se produzca algún error, devolvemos un código genérico y un objeto json con un mensaje
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    
};


//POST -> Inserción de nuevo registro en la base de datos.************************************
export const addCliente=async(req, res)=>{
    //Los datos que se van a insertar se reciben en el objeto request dentro del body.
    //body contiene un objeto JSON con todos los datos que se deben guardar en la base de datos.
    //Estos datos pueden (y deben) ser validados como veremos más adelante.
    console.log(req.body);

    //Se crean constantes con los valores de los distintos campos extrayéndolos del body por destructuring
    const {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;
    //Utilizamos un try-catch para interceptar posibles errores
    try {
        //Se realiza la consulta insert into en la cada interrogación será sustituida por el valor del
        //campo correspondiente a la posición en la que se pasan (destructuring)
        
        const [result]=await conexion.query("INSERT INTO clientes (nombreCliente, emailCliente, tlfnoCliente, empresaCliente) VALUES (?,?,?,?)", [nombreCliente, emailCliente, tlfnoCliente, empresaCliente]);
        //La consulta devuelve un array con 2 elementos, igual que en el SELECT, pero en este caso el primer
        //elemento del array es un objeto JSON con información acerca de la consulta.
        //De entre la información que contiene ese objeto nos interesa insertId que es el ID que la base de datos
        //le ha dado al nuevo registro (es autoincremental)
         console.log(result);
         
        //El servidor debe devolver algo. Si no se ha producido ningún error devolveremos un código de estado y
        //un objeto json con el id que le ha asignado la base de datos al nuevo registro.
        //(esa respuesta la hemos diseñado nosotros. Podríamos haber elaborado una respuesta con cualquier 
        //otra estructura)
        //el código 201 significa que una solicitud se ha resuelto con éxito y devuelve o crea un nuevo recurso
        //(que es justo lo que hace el post)
        res.status(201).json({id:result.insertId});
    } catch (error) {
        //Si se produce algún error devolvemos un error genérico y un mensaje.
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    
};


//DELETE -> ELIMINACIÓN DE UN REGISTRO DE LA TABLA CLIENTES 
export const delCliente=async(req, res)=>{
    //El eliminado de un registro supone su identificación previa.
    //en este caso esta identificación se realizará a través de su ID.
    //El valor de ese ID se pasan en la URL y el servidor lo recibe a través del objeto request en su
    //params. Para ello es necesario definir ese parámetro en el endpoint (ver router)
    //Asignamos el valor de ese identificador pasado como parámetro en la constante id mediante destructuring
    const {id}=req.params
    //Interceptamos cualquier error que pueda producirse utilizando un estructura try-catch
    try {
        //el paso de parámetros es similar al get de manera que el ? se sustuirá por el valor de la constante id.
        //Estos parámetros se asignan por destructuring, por ello es necesario pasarlos en forma de array
        //La consulta devuelve un array con 2 elementos, igual que en el SELECT, pero en este caso el primer
        //elemento del array es un objeto JSON con información acerca de la consulta.
        const [result]=await conexion.query("DELETE FROM clientes WHERE id=?", [id]);
        //De la información contenida en ese objeto devuelto, nos interesa el campo affectedRows que contiene
        //el número de filas eliminadas
        console.log(result);
        //Si el cliente no se encuentra, express devolverá un código 200 de éxito sólo que affectedRows será 0
        //Podemos elaborar una respuesta más adecuada teniendo en cuenta esa información
        //Si no se ha eliminado ninguna fila...
        if (result.affectedRows==0){
            //...devuelvo un código de error 404 (de no encontrado), y un mensaje de error en un objeto JSON...
            return res.status(404).json({
                message:'no existe'
            })
        }
        //Elaboramos una respuesta si el cliente se elimina adecuadamente.
        //Podemos utilizar el código de error 204 que representa a una solicitud que se ha procesado con éxito
        //pero que no devuelve ningún contenido.
        return res.status(204);
        //Si queremos homogeneizar la respuesta podemos devolver un código 200 o 201 y un mensaje en un objeto JSON
        
    } catch (error) {
       //Si se produce algún error devolvemos un error genérico (500) y un mensaje.
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    

}

//PUT --> modificación de un registro de la base de datos
export const updateCliente=async(req, res)=>{
    //En el caso del update el servidor necesitará identificar al registro que desea eliminar además
    //de los nuevos datos del registro.
    //Los nuevos datos del registro están en el body del objeto request.
    console.log(req.body);
    //Se crean constantes que contendrán los valores de los distintos campos del registro.
    //Estos valores se asignan por destructuring de manera que las constantes deben tener los mismos nombres
    //que los elementos del body.
    const {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;
    //Se crea una constante id que recibe el valor que identifica el registro que va a ser modificado.
    //Este valor se ha pasado como parámetro a través de la URL (ver router).
    //Igualmente se asigna por destructuring como ya sabemos.
    const {id}=req.params;
    //Utilizamos un bloque try-catch para interceptar cualquier error que pueda surgir y no acabe con la
    //ejecución de nuestro servidor.
    try {
        
        //La siguiente línea se utiliza en caso de que se vayan a modificar todos y cada uno de los campos del
        //registro (PUT). Como se puede ver, los valores se sustituyen por ? y cada uno de esos ? recibirá un valor por destructuring
        //del array que se pasa como parámetro a la query
        //La consulta devuelve un array con 2 elementos, igual que en el SELECT, pero en este caso el primer
        //elemento del array es un objeto JSON con información acerca de la consulta.
        const [result]=await conexion.query("UPDATE clientes SET nombreCliente=?, emailCliente=?, tlfnoCliente=?, empresaCliente=? WHERE id=?", [nombreCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
        //De la información contenida en ese objeto devuelto, al igual que con Delete, nos interesa el campo affectedRows que contiene
        //el número de filas eliminadas
         console.log(result);
         //Podemos utilizar ese valor para elaborar una respuesta más adecuada, generando un código
         //404 en caso de que no se encuentre el registro y emitiendo un mensaje de error
         if (result.affectedRows==0){
            return res.status(404).json({
                message:'el cliente no existe'
            })
         }
         //En caso de que no se produzca ningún error, podemos devolver un código de estado adecuado y el registro con los nuevos datos, para
         //lo cual hay que realizar un select tal y como vimos en el getCliente
         //(recordatorio: podemos diseñar la respuesta a conveniencia)
        const [filas]=await conexion.query("SELECT * FROM clientes WHERE id=?",[id]);
        res.status(201).json(filas[0]);

    
    } catch (error) {
        //Si se produce un error se envia un código genérico y un mensaje de error
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
   

}

//PATCH --> modificación parcial de un registro de la base de datos
export const patchCliente=async(req, res)=>{
    //En el caso del update el servidor necesitará identificar al registro que desea eliminar además
    //de los nuevos datos del registro.
    //Los nuevos datos del registro están en el body del objeto request.
    console.log(req.body);
    //Se crean constantes que contendrán los valores de los distintos campos del registro.
    //Estos valores se asignan por destructuring de manera que las constantes deben tener los mismos nombres
    //que los elementos del body.
    //Si no se ha recibido alguno de los parámetros, el valor de la constante será undefined
    //(los undefined se convertirán en null en la sentencia SQL)
    const {nombreCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;
    //Se crea una constante id que recibe el valor que identifica el registro que va a ser modificado.
    //Este valor se ha pasado como parámetro a través de la URL (ver router).
    //Igualmente se asigna por destructuring como ya sabemos.
    const {id}=req.params;
    //Utilizamos un bloque try-catch para interceptar cualquier error que pueda surgir y no acabe con la
    //ejecución de nuestro servidor.
    try {
        
        //Existe la posibilidad de que no se quieran modificar todos los campos.
        //En ese caso el verbo utilizado habitualmete es el patch en lugar de put.
        //Para tener en cuenta esta circunstancia se utiliza el IFNULL según el cual, si el nuevo valor es nulo
        //se mantendrá el valor que ya existía en el registro
        //La consulta devuelve lo mismo que en el PUT ya que se trata de un update
        const [result]=await conexion.query("UPDATE clientes SET nombreCliente=IFNULL(?,nombreCliente), emailCliente=IFNULL(?,emailCliente), tlfnoCliente=IFNULL(?,tlfnoCliente), empresaCliente=IFNULL(?, empresaCliente) WHERE id=?", [nombreCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
    
        console.log(result);
        if (result.affectedRows==0){
            return res.status(404).json({
                message:'el cliente no existe'
            })
        }
        //En caso de que no se produzca ningún error, podemos devolver un código de estado adecuado y el registro con los nuevos datos, para
         //lo cual hay que realizar un select tal y como vimos en el getCliente
         //el código 206 indica contenido parcial
         //(recordatorio: podemos diseñar la respuesta a conveniencia)
         const [filas]=await conexion.query("SELECT * FROM clientes WHERE id=?",[id]);
         res.status(206).json(filas[0]);
         
    
    } catch (error) {
        //Si se produce un error se muestra un código y un mensaje de error genéricos
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
   

}