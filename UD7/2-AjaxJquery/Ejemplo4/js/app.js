"use strict"
//En el evento READY se asocia la función mostrarAsig al evento click del botón
//El selector :button significa "input de tipo button"
$(() => {
   
        $(":button").on("click", mostrarAsig)
    
})

function mostrarAsig() {
    //Se realiza una solicitud GET al archivo "Ejempl4.xml"
    $.get("Ejemplo4.xml", function (response, statusTxt, xhr){
        //Cuando se resuelve la solicitud
        console.log(statusTxt)
        //Si la solicitud se reuelve con éxito...
        if (statusTxt=="success"){
            //...se construye la lista con todos los módulos de 2º DAM en la variable mensaje
           let mensaje="";
           //response contiene la respuesta del servidor que en este caso está en formato XML
           //por tanto podemos tratarla como tal.
           //Mediante find, localizamos todos los elementos CURSO de los datos XML. Hay 2, uno
           //que contiene los módulos de 1º (índice 0) y otro que contiene los módulos de 2º (índice 1)
           //Recorremos esa colección de 2 elementos con each.
            $(response).find("curso").each((ind, ele) => {
                //Como estamos buscando los módulos de segundo tomamos el de índice 1
                if (ind == 1) {
                    //Vamos construyendo la lista a mostrar.
                    mensaje = "Módulos de 2º DAW";
                    //ele contiene el objeto CURSO con índice 1.
                    //Dentro de ese elemento localizamos sus descendientes con etiqueta ASIG
                    //El find devolverá una colección con todos los módulos de 2º curso.
                    //recorremos esta colección con un each
                    $(ele).find("asig").each((ind, mod) => {
                        mensaje += "<br>" + $(mod).text()
                    })
                }
            })
            //Una vez construída la lista mostramos el mensaje.
            //La lista la hemos construído en html
            $("#mensaje").html(mensaje);
            //Se muestra el mensaje que indica que la solicitud se ha resuelto con éxito.
            Swal.fire({
                icon:"success",
                title:"La carga ha sido satisfactoria con GET",
                text:"AJAX con jQuery"
            })
        //Si la solicitud se resuelve con error...
        }else if (statusTxt=="error"){
            //...se muestra un mensaje de error con el código y el texto asociado al mismo.
            Swal.fire({
                icon:"error",
                title:"Error "+ xhr.status,
                text:xhr.statusText
            })
        };
    
          
})
}
