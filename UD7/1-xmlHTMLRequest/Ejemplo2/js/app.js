"use strict"
let xmlHttp;
/************************************** */
//Este ejemplo muestra cómo se reciben datos de un archivo php cuando la respuesta
//consiste en un texto plano
/***************************************************************** */
window.addEventListener("DOMContentLoaded", ()=>{
    //crear el objeto
    xmlHttp=crearConexion();
    if (xmlHttp != undefined){
        //funcionalidad
        document.querySelector("#boton").addEventListener("click" ,mostrarMensaje);
    }else{
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

const mostrarMensaje=()=>{
    //preparar el objeto xmlHttp
    //Se va a utilizar el método GET para hacer una solicitud al archivo ejemploPHP.php
    xmlHttp.open("GET", "ejemploPHP.php", true);
    //Se prepara la respuesta en caso de que la solicitud se resuelva con éxito.
    xmlHttp.onreadystatechange=()=>{
       if (xmlHttp.readyState==4 && xmlHttp.status==200) {
        //La respuesta consiste en mostrar lo que ha devuelto el script php.
        //Como el php devuelve un texto plano, utilizamos responseText.
        document.querySelector("#mensaje").textContent=xmlHttp.responseText;
       }
    };
    //Enviamos la petición.
    xmlHttp.send(); //comienza la petición de respuesta al servidor
}