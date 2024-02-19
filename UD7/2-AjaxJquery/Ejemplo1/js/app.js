"use strict"
//en el evento READY se asocia la función mostrarMensaje con el evento click del botón.
$(() => {
    $("#boton").on("click", mostrarMensaje)
})
function mostrarMensaje() {
//Se hace una solicitud al archivo MENSAJE.TXT.
//Se devolverá el texto contenido en ese archirvo y se cargará en la capa con id mensaje 
//cuando se resuelva la solicitud se lanza la función callback (que en este caso está
//definido como una función anónima)
//En este caso, como no se envían parámetros, la solicitud será de tipo GET.
    $("#mensaje").load("ficheros/Mensaje.txt", function (responseText, statusTxt, xhr) {
        console.log(responseText);
        //Si la solicitud se ha resuelto con éxito...
        if (statusTxt == "success") {
            //...Se muestra un mensaje de carga correcta
            Swal.fire("Carga correcta");
        //Si la solicitud no se ha resuelto con éxito
        } else if (statusTxt == "error") {
            //Se lanza un mensaje con el error correspondiente.
            //La información del error se extrae del el objeto xhr.
            Swal.fire("Error: " + xhr.status + " : " + xhr.statusText);
        }
    });
}
