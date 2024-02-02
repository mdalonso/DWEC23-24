"use strict"
let xmlHttp;
/****************************************** */
//Este ejemplo muestra el uso de la función crearConexion de la librería creada
//para la creación del objeto XMLHTTPRequest.
//Además realiza una solicitud a un archivo de texto como primera prueba solicitud
//a un servidor
/****************************************************************** */
window.addEventListener("DOMContentLoaded", ()=>{
    //crear el objeto utilizando la librería crearXMLHTTP.js
    xmlHttp=crearConexion();
    if (xmlHttp != undefined){
        //Si el objeto XMLHTTPRequest se ha podido crear, el navegador es compatible con AJAX
        document.querySelector("#boton").addEventListener("click" ,mostrarMensaje);
    }else{
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

const mostrarMensaje=()=>{
    //Preparar el objeto xmlHttp
    //Se prepara el envío:
    //- Método GET
    //- URL: la ruta del archivo del que queremos tomar los datos.
    //- true: comunicación asíncrona.
    xmlHttp.open("GET", "ficheros/Mensaje.txt", true);
    //Se prepara la respuesta en caso de éxito.
    xmlHttp.onreadystatechange=()=>{
       if (xmlHttp.readyState==4 && xmlHttp.status==200) {
           document.querySelector("#mensaje").textContent=xmlHttp.responseText;
      }
    };
    //Se envía la solicitud.
    xmlHttp.send(); //comienza la petición de respuesta al servidor

}