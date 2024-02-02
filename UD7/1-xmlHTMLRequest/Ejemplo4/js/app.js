"use strict"
let xmlHttp;
/*********************************************** */
//Este ejemplo utiliza datos XML contenidos en un archivo en el servidor
//para cargar datos en el HTML
//También veremos como podemos parsear un archivo XML utilizando JQuery
/*************************************************************** */
$(() => {
    //crear el objeto
    xmlHttp = crearConexion();
    if (xmlHttp != undefined) {
        //funcionalidad
        //Con JQuery: Añadimos funcionalidad al combo de manera que cuando cambie su valor
        //se invoque al método cargarModulos.
        $("#cursos").on("change", cargarModulos);
        console.log("hola2");

    } else {
        Swal.fire("El navegador no soporta AJAX. Debe actualizar el navegador");
    }
})

const cargarModulos = () => {
    //preparar el objeto xmlHttp
    //Se realiza una solicitud GET al archivo Ejemplo4.xml de forma asíncrona
    xmlHttp.open("GET","Ejemplo4.xml",true);
    //Se prepara la respuesta a la información que se reciba desde el servidor cuando
    //la solicitud sea procesada.
    xmlHttp.onreadystatechange = () => {
        //Si la solicitud se resuelve con éxito...
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //...se recibe la respuesta esta vez mediante responseXML ya que se trata de
            //información en formato XML.
            let datos = xmlHttp.responseXML; //pasamos la respuesta del servidor en formato xml a una variable
            console.log(datos);
            //Se eliminan todos los elementos de tipo option que son descendientes del
            //elemento con id modulos, excepto el primero (gt(0) toma todos cuyo índice es mayor
            //que 1)
            //limpiar el select de modulos, excepto la primera opción
            $("#modulos option:gt(0)").remove();
            console.log(datos);
            //JQuery permite parsear datos XML utilizando FIND.
            //FIND permite localizar etiquetas de elementos dentro del XML
            //Find va a devolver una colección de todos los elementos <curso></curso> (en nuestro
            //caso hay 2). El primer elemento tiene índice 0 y el segundo tiene índice 1.
            //Vamos a recorrer esa colección para poder extraer las asignaturas. 
            $(datos).find("curso").each((ind, ele) => {
                //muestre los módulos de primero
                //Ahora con each, recorremos esa colección. En el XML, el primer elemento <curso></curso>
                //contiene los módulos de primero y tiene el índice 0 dentro de la colección. El segundo
                //elemento <curso></curso> contiene los módulos de segundo y tiene el índice 1 dentro de
                //la colección.
                //$(#cursos) es el select que contiene los cursos y tiene 3 opciones: 
                //Seleccione curso...(índice 0), 1º curso (índice 1) y 2º curso (índice 2)
                //Para asociar los módulos al curso correcto utilizamos los índices:
                //El primeer elemento <curso> </curso> (índice 0) se corresponde con el segundo option (índice 1)
                //del select. Accedemos al índice del option mediante el método prop a la propiedad 
                //selectedIndex, que contiene el índice de la opción que está activa en este momento
                //en el select correspondiente.
                if (ind == $("#cursos").prop("selectedIndex") - 1) {
                    //Una vez tenemos localizado el elemento <curso></curso> que nos interesa, 
                    //lo parseamos para sacar sus módulos mediante aplicando FIND a la etiqueta
                    //<asig></asig>.
                    //ele contiene el elemento <curso></curso> de esta iteración del each.
                    $(ele).find("asig").each((ind, mod) => {
                        //crear option en el select de modulos
                        //Mediante un each se recorre la colección de todos los elementos <asig></asig>
                        //pertenecientes al elemento <curso></curso> de la presente iteración
                        //y se añaden al select con id "mmodulos"
                        //Para ello, cada elemento <asig></asig> tiene una propiedad text que devuelve
                        //el dato incluido en la etiqueta.
                        $("#modulos").append("<option>" + $(mod).text() + "</option>");
                    })
                }
            })

        }
    };
    
    //Se envía la solicitud al servidor.
    xmlHttp.send(); //comienza la petición de respuesta al servidor

}