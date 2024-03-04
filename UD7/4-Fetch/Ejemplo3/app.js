"use strict"
//Implementamos la correspondencia entre los métodos y los eventos en el evento DOMContentLoaded para
//asegurarnos de que el archivo HTML está complementamente cargado.
window.addEventListener("DOMContentLoaded",() => {

    document.querySelector("#GET").addEventListener("click", mostrarMensajeGET)
    document.querySelector("#POST").addEventListener("click", mostrarMensajePOST)

})
//El método mostrarMensajeGET realiza una solicitud GET al servidor que en este caso se trata
//de un archivo php que recibe dos parámetros de entrada (valor y nombre) y genera una cadena con un mensaje
const mostrarMensajeGET=()=>{
    //al ser una solicitud de tipo GET, hay que pasar los parámetros en la misma URL (NO SE SE PUEDE UTILIZAR
    //EL BODY PARA ENVIAR PARÁMETROS CUANDO SE REALIZA UNA SOLICITUD GET)
    fetch("Ejemplo3.php?valor=GET&nombre=Ana")
    .then ( response =>{
        //En este caso no vamos a gestionar un posible error para ver el efecto que tiene sobre la ejecución.
        //Devolvemos la respuesta para poder utilizarla con el método text() ya que esperamos una respuesta de este tipo
        //Recordamos: Text() devuelve una promesa que se resuelve en un String.
        return response.text();
    })
    //Hacemos uso de la respuesta que esperamos.
    .then (data=>{
        document.querySelector("#mensaje").textContent=data;
    })
    //Si, por ejemplo, renombramos el archivo Ejemplo3.php para que no lo encuentre, vemos que no se
    //captura el error ya que no se trata de un error de red ni de autentificación, sino de un error
    //html que deberíamos gestionar explícitamente.
    .catch (error=>{
        console.error(error);
    })
    
   
    
}
//El método mostrarMensajePOST realiza una solicitud POST al servidor
const mostrarMensajePOST=()=>{
    //En este caso, al tratarse de una solicitud POST no basta sólo con pasar como parámetro la url, sino que hay
    //que indicarle algunas opciones mediante el parámetro de configuración.
    fetch("Ejemplo3.php", {
        //con method le indicamos qué método vamos a utilizar, en este caso POST
        method:'POST',
        //con headers le vamos a indicar el formato de los parámetros que enviamos al servidor. En este caso va a
        //ser el que vemos aquí para poder utilizar el mismo forma que usaba en el GET (podemos repasar esto en el
        //ejemplo3 de xmlHTTPRequest
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //Le pasamos los parámetros en la opción body en el formato especificado por la cabecera 'content-type'
        body: `valor=POST&nombre=Luis`
       
    })
    //En el primer then comprobamos el éxito o fracaso de la conexión para poder hacer uso de la info devuelta
    //por el servidor o capturar algún error que haya podido ocurrir
    .then ( response =>{
        if (response.status==200){
            //Mediante response.text() se devuelve una promesa que se resuelve en un String.
            return response.text();
         }else{
            throw ("Error en la comunicación")
         }
    })
    //mediante este then hacemos uso de la respuesta del servidor.
    .then (data=>{
        document.querySelector("#mensaje").textContent=data;
    })
    //Capturamos la excepción generada en el primer then.
    .catch (error=>{
        console.log(error);
    })
    
    
   
}