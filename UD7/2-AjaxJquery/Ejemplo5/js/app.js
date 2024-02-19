"use strict";
//En el evento READY, se asigna el método mostrarAsig al evento change del select con id cursos.
$(() => {
  
        $("#cursos").on("change", mostrarAsig);
    
})

function mostrarAsig(){
    //Se realiza una solicitud de tipo GET al archivo XML, mediante el método ajax.
    //El método ajax() devuelve un objeto jqXHR (similar al objeto XMLHTTPRequest (A partir de JQuery 1.5)) que implementa la interfaz PROMISE.
    //La interfaz PROMISE contiene una serie de métodos que pueden ser invocados en función del resultado de la solicitud.
    //Estos métodos crean una cola de funciones que serán invocadas una tras otra.
    $.ajax({
        url:"Ejemplo5.xml",
        type:"GET"
    })
    //Método .done--> Sustituye a la opción success del método ajax().
    //Recibe como parámetro una función que a su vez puede recibir tres parámetros
    //- responseText: Datos recibidos desde el servidor.
    //- textStatus: cadena con información del estado de la solicitud.
    //- xhr: objeto jqXHR 
    .done(function (responseText, textStatus, xhr){
        //La respuesta que se programa en el caso de que la solicutud haya tenido éxito es la siguiente:
        //Se eliminan todas las opciones del select con id modulos (donde aparece la lista de los módulos del curso seleccionado
        //en el otro select) salvo la primera (gt(0))
        $("#modulos option:gt(0)").remove();
        //responseText contiene los datos recibidos que esta vez van en formato XML.
        //Dentro de esa respuesta se localizan (find) todos los elementos con la etiqueta CURSO (hay 2)
        //Para cada uno de esos elementos...
        $(responseText).find("curso").each((ind,ele)=>{
            //...si el índice del elemento coincide con el índice del elemento seleccionado en el select donde se muestran los cursos
            //(el curso de índice 0 dentro de responseText es 1º curso y el elemento de índice 1 (por eso se le quita 1) 
            // en el select CURSOS también es 1º curso.
            //Y lo mismo ocurre para segundo)
            if (ind== $("#cursos").prop("selectedIndex")-1){
                //Dentro de ese elemento CURSO se localizan todos los elementos con etiqueta ASIG...
                $(ele).find("asig").each((i, valor) =>{
                    //...y se cargan en el select correspondiente.
                    $("#modulos").append("<option>"+ $(valor).text()+ "</option>");

                })
            }
        })
        
    })

    //Método .fail: sustituye a la opción error del método ajax() y lanza la función que recibe como parámetro en el caso de 
    //que se produzca un error en la solicitud.
    .fail(function (xhr,textStatus,errorThrown){
        Swal.fire({
            icon:"error",
            title:"Error "+ xhr.status,
            text:errorThrown
        })
    })
    
        
   
}