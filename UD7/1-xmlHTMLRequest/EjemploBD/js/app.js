"use strict"
let xmlHttp
$(() => {
    //crear el objeto
    xmlHttp = crearConexion();
    if (xmlHttp != undefined) {
        $("#first, #all").on("click", mostrar);

    } else {
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
       
   
})
function mostrar() {
     //PREPARAR EL OBJETO XMLHTTPRequest

     //Se prepara la URL por defecto para mostrar un listado con todos los perros.
     //Dado que el archivo mostrar.php hace uso del parámetro perro, hay que pasárselo como
     //parámetro. En este caso se pasa el parámetro vacío, lo cual se tendrá en cuenta en el
     //archivo php para construir la consulta sql que atacará la base de datos.
     let param= "php/mostrar.php?perro=";
     //Si se ha pulsado el botón MOSTRAR EL PRIMERO, se prepara la URL para pasarle
     //al servidor el parámetro con el código del perro que se quiere mostrar.
     if ($(this).attr("id") == "first") {
        param="php/mostrar.php?perro=111A";
    }
    //Se prepara la solicitud GET con los parámetros requeridos por el servidor.
     xmlHttp.open("GET", param, true);
     
     //SE PREPARA LA RESPUESTA A LA SOLICITUD UNA VEZ SE RESUELVA
     xmlHttp.onreadystatechange = () => {
        //Si la solicitud se resuelve con éxito...
         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
            //...se parsean los datos que se reciben mediante un JSON.
            //Convierte el JSON en un array y cada elemento del array es un objeto con los datos
            //de cada perro.
             let datos = JSON.parse(xmlHttp.responseText); //parsear la respuesta que viene en formato texto a JSON
             //Para mostrar la respuesta primero se vacía la tabla (se limpia por si hubiera tenido datos
             //anteriores)
             $("tbody").empty();
             ////Recorro el array para añadir cada perro a la tabla.
             //PAra ello se crea una fila por cada elemento del array y una columna por cada campo
             //de cada objeto.
            $(datos.data).each((ind, ele) => {
                $("tbody").append(`<tr><td>${ele.chip}</td><td>${ele.nombre}</td><td>${ele.raza}</td><td>${ele.fechaNac}</td></tr>`)
            })
            
         }
     };
 
    //SE ENVÍA LA SOLICITUD AL SERVIDOR.
     xmlHttp.send(); //comienza la petición de respuesta al servidor
 
 

}