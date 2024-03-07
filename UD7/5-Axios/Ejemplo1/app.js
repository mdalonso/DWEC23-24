"use strict"

window.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#boton").addEventListener("click", mostrarMensaje)

})
const mostrarMensaje=()=> {
        //Realiza una solicitud get al servidor que en este caso es un archivo de texto.

        axios.get("ficheros/Mensaje.txt")
        .then ( response =>{
            //A diferencia de fetch, con axios podemos utilizar directamente la información recibida por el servidor.
            //
            console.log(response);
           document.querySelector("#mensaje").textContent=response.data;
                 
        })
        
        .catch (error=>{
            console.log(error);
            console.log(error.message);
        })
   
   
}

