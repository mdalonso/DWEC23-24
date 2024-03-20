"use strict";

//Esta API funciona sobre el recurso CLIENTES que es la única tabla de la que disponemos en la base de datos.
//como tenemos que hacer un uso reiterado de esta URL, creamos una variable para usarla cuando la necesitemos.
//Esta URL es el endpoint que nos ofrece la api restful del lado del servidor (automatizada por json-server).
const url = "http://localhost:3000/clientes";

//La API es un módulo que contiene varias funciones por lo que estas funciones deben ser exportadas para poder
//utilizarlas en un módulo externo.

//FUNCIÓN ADDCLIENTE (Crud): El objetivo de esta función es añadir un cliente a la base de datos.
//El acceso al servidor se realizará siempre de forma asíncrona para que la interacción del usuario con la app sea
//fluída.
//Para ello se crea una función async/await con fetch
//Esta función recibe como parámetro de entrada un 
export const addCliente = async (cliente) => {
  //Definimos los parámetros de la solicitud en una constante para mayor claridad
  console.log({cliente});
  const param = {
    //Tipo de solicitud. Debe ser POST ya que estamos realizando una inserción.
    method: "POST",
    //headers: Establece el formato de los datos que se pasan al servidor en la opción body, en este caso están en la variable
    //cliente que se ha recibido como parámetro de entrada.
    
    headers: {
      'Content-Type':'application/json'
    },
    //body: datos que se pasan al servidor. En este caso es un objeto JSON con los datos del cliente
    //que se van a introducir en la base de datos.
    body: JSON.stringify(cliente) //nomCliente="pepe"&emailCliente="dkldl@gmail.com"
  };
  //
  try {
    //Se realiza la solicutud en 2 pasos:
    //- Paso 1: el primer await envía la solicutud al servidor lo cual crea una promesa que se resuelve en un objeto RESPONSE
    const response = await fetch(url, param);
    //Recordamos: La promesa generada por fetch no entra en estado rejected a no ser que haya un error de red o de autencación
    //por tanto lo más conveniente es que nosotros constrolemos la situación.
    if (response.ok){
      return { mensaje: "insertado" };
    }else{
      throw error;
    }
  } catch (error) {
    //Si la solicitud no se resuelve con éxito, se devuelve un objeto con un campo mensaje que contiene una cadena
    //indicativa del fracaso ("NO INSertado") 
    //LO QUE DEVUELVE LA FUNCIÓN DEPENDE DEL DISEÑO QUE REALICE EL PROGRAMADOR.
    //EN ESTE CASO SE DEVUELVE UN MENSAJE TEXTUAL PERO SE PODRÍA INCLUIR, POR EJEMPLO, OTRO CAMPO EN ESTE OBJETO
    //DEVUELTO CON UN CÓDIGO DE ERROR QUE PODRÍA SER MANEJADO DESDE LA APLICACIÓN.

    return { mensaje: "NO insertado" };
  }
};


//FUNCIÓN GETCLIENTES (cRud): El objetivo de esta función es leer los datos de la base de datos.
//Como estamos leyendo, la solicitud que realicemos será de tipo GET.
//Se implementa mediante una función async/await
//No tiene parámetros de entrada.
export const getClientes = async () => {
  try {
    //el primer await realiza la solicitud al servidor que, al no indicar nada, por defecto es de tipo GET.
    //Esta solicitud traerá TODOS los registros de la base de datos.
    const response = await fetch(url);
    //el segundo await extrae los datos devuelto por el servidor en el objeto response.
    const data = await response.json();
    //Si la solicitud se ha realizado con éxito, se devuelve un objeto con un campo data que contiene los datos
    //devueltos por el servidor.
    if (response.ok){

      return { data: data };
    }else{
      throw error;
    }
  } catch (error) {
    //Si la solicitud no se ha realizado con éxito, se devuelve un objeto con un campo error que contiene el serror
    //capturado
    return { error: error };
  }
};

//FUNCIÓN GETCLIENTE (cRud): el objetivo de esta función es devulver un único registro de la base de datos
//identificado por su id.
//Recibe como parámetro de entrada el id del registro que se quiere traer de la base de datos.
//Se implementa mediante una función async/await.
export const getCliente = async (id) => {
  try {
    //El primer await realiza la solicitud de tipo GET al servidor.
    //como queremos acceder a un registro en concreto, hay que identificarlo mediante su endpoint que será la url/identificador
    const response = await fetch(`${url}/${id}`);
    //El segundo await extrae los datos recibidos por el servidor dentro del objeto response.
    const data = await response.json();
    //Si la solicitud se ha resuelto con éxito se devuelven los datos (vemos que esta vez no hay ningún
    //objeto que contenga los datos sino que se pasan los datos directamente. Esto va a depender del diseño que está
    //en nuestras manos)
    if (response.ok){

      return data;
    }else{
      throw error;
    }
  } catch (error) {
     //Si la solicitud no se ha realizado con éxito, se devuelve un objeto con un campo error que contiene el serror
    //capturado
    return { error: error };
  }
};

//función DELETECLIENTE (cruD): Esta función tiene como objetivo eliminar un registro concreto de la base de datos
//identificado por su id.
//Se implementa mediante una función async/await
export const deleteCliente = async (id) => {
  //Asignamos parámetros en una variable para mayor claridad.
  const param = {
    //En este caso la solicitud será de tipo DELETE ya que queremos eliminar un registro.
    method: "DELETE",
  };
  try {
    //El await realiza la solicitud al servidor.
    //Se construye la URL del endpoint correspondiente al registro que se quiere eliminar y se le pasan
    //los parámetros de la solicitud
    const response = await fetch(`${url}/${id}`, param);
   //Como no queremos procesar datos, en este caso no se necesita un segundo await
    //Simplemente comprobamos el estado de éxito/fracaso de la solicitud para devolver
    //un valor acorde a la situación.
    if (response.ok){
      return { mensaje: "borrado" }; 
    }else{
      throw error;
    }
    
    //const data = await response.json();
  } catch (error) {
    return { mensaje: "No borrado" };
  }
};

//FUNCIÓN UPDATECLIENTE (crUd): El objetivo de esta función es actualizar los datos de un cliente que se pasa como parámetro.
//Este cliente puede o no existir enla base de datos.
//Para ello se realiza una solicitud de tipo PUT 
//Se recibe como parámetro un objeto de tipo JSON que contiene los datos del cliente. 
export const updateCliente = async (cliente) => {
  //Se configuran los parámetros de la solicitud en una variable para mayor claridad
    const param = {
      //Las solicitud será de tipo PUT ya que estamos modificando un registro existente
      method: "PUT",
      //los datos que se pasan a la solicitud a través del body son una cadena que contiene un objeto JSON.
      body:JSON.stringify(cliente),
      //Para el que el servidor lo trate con un JSON debemos indicarle que aunque se pasa en forma de cadena,
      //se trata de un JSON que debe parsear. Esto es lo que indica el valor de la cabecera que pasamos a continuación.
      headers:{
       "Content-Type":"application/json"
      }
    };
    //Usamos un await para realizar la solicitud con fetch e
    try {
      const response = await fetch(`${url}/${cliente.id}`, param);
      //Si la solicitud se resuelve con éxito, se devuelve un objeto con un mensaje acorde a la situación.
      if (response.ok){
        return { 'mensaje': "actualizado" };
      }else{
        throw error;
      }
      //const data = await response.json();
      //si se produce un error en la solicitud se devuelve un mensaje de fracaso.
    } catch (error) {
      return { 'mensaje': "No actualizado" };
    }
  };
