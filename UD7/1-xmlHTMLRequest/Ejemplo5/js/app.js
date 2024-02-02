"use strict"
/************************************************************** */
//Este ejemplo carga las provincias pertenecientes a una comunidad autónoma
//Para ello disponemos de un script en php que genera un XML con las provincias
//de la comunidad seleccionada en el Select y lo devuelve como respuesta a
//la solicitud hecha desde JS
/************************************************************** */
let xmlHttp;

$(() => {
    //crear el objeto
    xmlHttp = crearConexion();
    if (xmlHttp != undefined) {
        //funcionalidad
        //Cada vez que cambie la comunidad seleccionada en el select se invocará al método cargarProvincias
        $("#regiones").on("change", cargarProvincias);

    } else {
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

let cargarProvincias = () => {
    //preparar el objeto xmlHttp
    //Se va a utilizar el método GET (los parámetros van en la URL), el parámetro que espera
    //el script se llama ca y como valor tendrá el option que esté seleccionado en el select 
    xmlHttp.open("GET", "Ejemplo5.php?ca="+$("#regiones").val(), true);
    //Se prepara la respuesta en caso de que la solicitud se resuelva de forma correcta
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //La respuesta se recibe en formato XML
            let datos = xmlHttp.responseXML;
            console.log(datos);
            let mensaje="";
           //Se parsea el objeto xml buscando todos los elementos etiquetados como <capital></capital>
           //recorremos esa colección y para cada elemento se monta en una variable el texto que
           //se va a mostrar en el documento html.
            $(datos).find("capital").each((ind, ele) => {
                mensaje+= $(ele).text()+"<br>";
              //mensaje+= ele.innerText+"<br>";         
            })
            //mostramos la lista de todas las provincias en la capa que hay para ello.
            $("#mostrar").html(mensaje);
        }
    };
    //Se envía la solicitud.
    xmlHttp.send(); //comienza la petición de respuesta al servidor

}