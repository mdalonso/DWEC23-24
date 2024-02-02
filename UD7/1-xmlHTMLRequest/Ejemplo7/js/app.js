"use strict"
let xmlHttp;

$(() => {
    //crear el objeto XMLHTTPRequest utilizando la librería que hemos creado
    xmlHttp = crearConexion();
    //Si se ha creado con éxito (navegador compatible)
    if (xmlHttp != undefined) {
        //se cargan las provincias en el select
       cargarProvincias();

    } else {//si no, se informa de que el navegador no es compatible.
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

let cargarProvincias = () => {
    //preparar el objeto xmlHttp
    xmlHttp.open("GET","https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json" , true);
    //Si la solicitud se resuelve con éxito...
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //..se han devuelto el contenido del JSON
            //JSON.parse crea el objeto JS a partir de un texto. En este caso, lo que ha creado
            //es un array de objetos JS
            let datos = JSON.parse(xmlHttp.responseText);
            console.log(datos);
            //Como lo que hemos obtenido es un array de objetos, lo ordenamos utilizando el método sort
            //por el campo que contiene el nombre de la provincia.
            //ordenar las provincias
            datos.sort((a,b)=>{
                //localeCompare devuelve un valor negativo si la cadena de referencia va delante de la 
                //cadena con la que se compara y positivo en caso contrario.
                //Tal como lo hemos puesto, realiza el orden ascendente.
                return a.nm.localeCompare(b.nm)
            });
            //Una vez están ordenados, la provincia se introduce en el select.
            //En el id de cada opción del select, ponemos el código de la provincia para tenerlo a mano
            $(datos).each((ind, elemento)=>{
               $("#provincias").append("<option id=" + elemento.id + ">"+ elemento.nm +"</option>")
            })
            //establecer el evento change al select provincias para que muestre el código correspondiente
            $("#provincias").on("change", function(){
                //Se localiza el descendiente option del elemento con id provincias que está seleccionado
                Swal.fire("el código de la provincia es " + $("#provincias option:selected").attr("id"));
            })
           
        }
    };
    //Se envía la petición al servidor.
    xmlHttp.send(); //comienza la petición de respuesta al servidor

}