"use strict"
//Se asocia la función mostrarMensaje al evento click del botón en el evento READY.
$(()=>{
    $("#boton").on("click", mostrarMensaje)

})


function mostrarMensaje(){
//Se realiza una solicitud al archivo ejemploPHP.php
    $.get("ejemploPHP.php", function (responseText, statusTxt, xhr){
        //Una vez resuelta la solicitud se va a ejecutar la función callback
        console.log(statusTxt)
        //Si la solicitud se ha resuelto con éxito...
        if (statusTxt=="success"){
            //...Se carga en la capa "mensaje" la respuesta del servidor...
            //...Y se muestra un mensaje
            $("#mensaje").text(responseText);
            Swal.fire({
                icon:"success",
                title:"La carga ha sido satisfactoria",
                text:"AJAX con jQuery"
            })
        }else if (statusTxt=="error"){
            //Si no se ha resuelto con éxito...
            //...Se muestra un error
            Swal.fire({
                icon:"error",
                title:"Error "+ xhr.status,
                text:xhr.statusText
            })
        }
    })
        
}