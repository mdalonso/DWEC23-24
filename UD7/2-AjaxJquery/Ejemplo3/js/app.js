"use strict"
//Evento READY: se asocian las funciones mostrarMensajeGet y mostrarMensajePOST 
//al evento click de los botones GET y POST respectivamente.
$(()=>{
    $("#GET").on("click", mostrarMensajeGET)
    $("#POST").on("click", mostrarMensajePOST)

})
//Se realiza una solicitud GET al archivo Ejemplo3.php.
//El archivo Ejemplo3.php requiere dos parámetros: VALOR, que puede tomar el valor 'GET' o 'POST'
//y NOMBRE, que contiene un cadena con un nombre cualquiera de usuario para elaborar
//un mensaje de respuesta.
//Devuelve un mensaje de texto plano.
function mostrarMensajeGET(){
    //Los parámetros se pasan en forma de objeto JS
    //Cada campo del objeto JS tendrá como clave el nombre del parámetro que espera
    //recibir el archivo php y como valor, el valor que toma el parámetro.
    $.get("Ejemplo3.php", {valor:'GET', nombre:'Ana'}, function (responseText, statusTxt, xhr){
        //Cuando la solicitud se resuelve se ejecuta la función callback.
        console.log(statusTxt)
        //Si se ha resuelto con éxito, se muestra la respuesta en la capa con id 'mensaje'
        //Se ha devuelto texto plano.
        if (statusTxt=="success"){
            $("#mensaje").text(responseText);
            //Y se muestra el mensaje
            Swal.fire({
                icon:"success",
                title:"La carga ha sido satisfactoria con GET",
                text:"AJAX con jQuery"
            })
        //Si no se ha resuelto satisfactoriamente, se muestra un mensaje con el código y el 
        //mensaje de error correspondiente.
        }else if (statusTxt=="error"){
            Swal.fire({
                icon:"error",
                title:"Error "+ xhr.status,
                text:xhr.statusText
            })
        }
    })
    
}

//Se realiza una solicitud POST al servidor.
//Es exactamente igual que GET. Los parámetros se envían de la misma forma, mediante un objeto JS
function mostrarMensajePOST(){
    $.post("Ejemplo3.php", {valor:'POST', nombre:'Luis'}, function (responseText, statusTxt, xhr){
        console.log(statusTxt)
        if (statusTxt=="success"){
            $("#mensaje").text(responseText);
            Swal.fire({
                icon:"success",
                title:"La carga ha sido satisfactoria con POST",
                text:"AJAX con jQuery"
            })
        }else if (statusTxt=="error"){
            Swal.fire({
                icon:"error",
                title:"Error "+ xhr.status,
                text:xhr.statusText
            })
        }
    })
}