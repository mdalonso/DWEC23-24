"use strict"
let xmlHttp;

$(() => {
    //crear el objeto XMLHTTPRequest utilizando la librería que hemos creado.
    xmlHttp = crearConexion();
    //Si se ha creado correctamente (navegador compatible)
    if (xmlHttp != undefined) {
        //Se asocia el comportamiento al select. Cada vez que se seleccione una provincia distinta
        //se cargarán las provincias en pantalla.
        $("#regiones").on("change", cargarProvincias);

    } else {//Si no, se muestra un mensaje indicando que el navegador no es compatible
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

let cargarProvincias = () => {
    //preparar el objeto xmlHttp
    //Se realiza una solicitud GET al archivo Ejemplo6.php al que se le pasa el parámetro ca con
    //la comunidad autónoma seleccionada.
    xmlHttp.open("GET", "Ejemplo6.php?ca="+$("#regiones").val(), true);
    //Se prepara la respuesta a la solicitud.
    xmlHttp.onreadystatechange = () => {
        //Si la solicitud se resuelve con éxito.
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //Los datos recibidos en JSON se parsean obteniendo un array con los datos.
            let datos = JSON.parse(xmlHttp.responseText); //parsear la respuesta que viene en formato texto a JSON
            console.log(datos);
            //se inicializa la cadena con la lista de provincias.
            let mensaje="";
            //Se recorre el array con los datos recibidor para construcir la lista de provincias.
            $(datos).each((ind, elemento)=>{
                mensaje+=elemento + "<br>"
            })
            //Se muestra la lista en la capa correspondiente utilizando el método html para que 
            //renderice la cadena.
            $("#mostrar").html(mensaje);
        }
    };
//Se envía la solicitud al servidor.
    xmlHttp.send(); //comienza la petición de respuesta al servidor

}