"use strict"
let xmlHttp;
//En este ejemplo se pueden realizar solicitudes al servidor utilizando el método post
//o el método get para ver la diferencia de funcionamiento en ambos casos en lo relativo al 
//paso de parámetros.

window.addEventListener("DOMContentLoaded", ()=>{
    //crear el objeto XMLHTTPRequest
    xmlHttp=crearConexion();
    //Si el objeto se crea con éxito...
    if (xmlHttp != undefined){
        //funcionalidad
        //...se da funcionalidad a los botones añadiéndoles un EventListener.
        document.querySelector("#GET").addEventListener("click" ,mostrarMensajeGET);
        document.querySelector("#POST").addEventListener("click" ,mostrarMensajePOST);
    }else{
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})
//Método para realizar solicitud con el método GET
const mostrarMensajeGET=()=>{
    //preparar el objeto xmlHttp
    //Se hará uso del programa en php al que se le pasarán dos parámetros:valor(GET) Y nombre (Laura)
    //Como se va a realizar la solicitud con el método GET es necesarios pasar los parámetros
    //en la URL.
    xmlHttp.open("GET", "Ejemplo3.php?valor=GET&nombre=Laura", true);
    //Se prepara la respuesta a la solicitud
    xmlHttp.onreadystatechange=()=>{
        //Si la solicitud tiene éxito...
       if (xmlHttp.readyState==4 && xmlHttp.status==200) {
        //...se muestra la respuesta del servidor.
        document.querySelector("#mensaje").textContent=xmlHttp.responseText;
       }
    };

    xmlHttp.send(); //comienza la petición de respuesta al servidor

}

let mostrarMensajePOST=()=>{
    //preparar el objeto xmlHttp
    //Se hace la solicitud al archivo Ejemplo.php pero como se hace con POST, los parámetros
    //que necesita el archivo php se envían en el método send.
    xmlHttp.open("POST", "Ejemplo3.php", true);
    //establecer las cabeceras para que reconozca los parámetros en el formato en el 
    //que los vamos a enviar (clave=valor&clave=valor...)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //Se prepara la respuesta a la solicitud
    xmlHttp.onreadystatechange=()=>{
        //Si la solicitud tiene éxito...
       if (xmlHttp.readyState==4 && xmlHttp.status==200) {
        //...Se muestra el mensaje con la respuesta enviada por el servidor.
        document.querySelector("#mensaje").textContent=xmlHttp.responseText;
       }
    };
    //Se envía la petición al servidor.
    //Como estamos utilizando el método POST, los parámetros se envían en el SEND y para que
    //el servidor los entienda hemos debido previamente cambiar la cabecera Content-Type.
    xmlHttp.send("valor=POST&nombre=Marcos"); //comienza la petición de respuesta al servidor

}