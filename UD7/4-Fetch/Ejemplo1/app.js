"use strict"
//FETCH es una API de JS, por lo que podemos utilizar JavaScript nativo en lugar de hacer uso 
//de alguna librería de terceros como JQuery

window.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#boton").addEventListener("click", mostrarMensaje)

})

const mostrarMensaje=()=> {
//Hacemos una solicitud GET al servidor (fichero Mensaje.txt)
   fetch("ficheros/Mensaje.txt")
   //Si la solicitud se resuelve con éxito, como se realiza a través de una
   //promesa, se lanza el método then()
   //En nuestro caso, el método then recibe como parámetro una función que tiene
   //como parámetro de entrada el objeto RESPONSE que envuelve el valor
   //resultante de la ejecución de la promesa.
   //Comprobaremos en primer lugar el éxito o fracaso de la conexión.
   .then ( response =>{
    //Para gestionar los errores producidos (ya que fetch sólo detecta errores
    //de red y autentificación), debemos utilizar la propiedad status del objeto
    //response. Esa propiedad contiene el código HTTP del error. Hay que hacerlo explícitamente.
    //En este caso, si la solicitud se ha resuelto con éxito...
    if (response.status==200){
        //...se devuelve el texto de la respuesta (la respuesta es el contenido
        //del archivo Mensaje.txt, que sabemos que es de tipo texto, por eso se hace uso 
        //uso del método text())
        //El método text() devuelve una promesa resuelta en un String que ya sí podremos utilizar.
        //Con el return devolvemos una promesa resuelta en el String que necesitamos (el siguiente then corresponde
        //a esta nueva promesa)
       return response.text();
    //Si la solicitud no se ha resuelto con éxito...
    }else{
        //...se lanza una excepción con un mensaje de error o se maneja de la
        //manera que creamos conveniente.
       throw ("Error en la comunicación")
    }
   })
   //Para hacer uso del dato que necesitamos, encadenamos este then que recibe como parámetro de entrada
   //el resultado de la promesa generada en el anterior then, la cual esta vez se resolvía en un String.
   //Así vemos cómo se aprovecha la capacidad de encadenamiento de las promesas.
   .then (data=>{
       document.querySelector("#mensaje").textContent=data;
   })
   //Si se ha producido un error (throw del primer then)
   .catch (error=>{
       console.log("Atención:" +error);
   })
        
}

