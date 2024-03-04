"use strict"
//en  el evento DOMcontentLoaded implementamos la correspondencia entre eventos y métodos para asegurarnos
//de que el documento está totalmente cargado.
window.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#boton").addEventListener("click", mostrarMensaje)

})

const mostrarMensaje=()=>{
    //Hacemos una solicitud GET al servidor, que en este caso es el archivo PHP que devuelve
    //un texto de bienvenida con la hora actual.
    fetch("ejemploPHP.php")
   .then ( response =>{
    //En primer lugar comprobamos el éxito o fracaso de la conexión con el servidor a través de la propiedad
    //status del objeto RESPONSE
    if (response.status==200){
        //Si la conexión se ha realizado con éxito se devuelve una promesa que se resolverá en un String
        //por eso utilizamos el método text().
        return response.text();
     }else{
        //si la conexión no ha tenido éxito se lanza una excepción que capturaremos a continuación.
        throw ("Error en la comunicación")
     }
   })
   //Este then corresponde a la promesa devuelta por el método text() del objeto response.
   .then (data=>{
    //data es un String que se mostrará en el objeto correspondiente identificado por su ID
    document.querySelector("#mensaje").textContent=data;
   })
   //Capturamos la excepción generada en el primer then
   .catch (error=>{
       console.log("Atención:"+error);
   })
   
        
}