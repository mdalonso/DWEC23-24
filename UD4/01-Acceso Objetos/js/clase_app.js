"use strict"
/** DESCRIPCIÓN
 * En este ejemplo tenemos un INDEX.HTML con formulario con dos elementos de entrada de datos
 * (input) y un botón (Ver index.html)
 * Nos va a servir para conocer distintas formas de acceder 
 * a los elementos contenidos en un formulario.
 */

//Tenemos una función acceso, sin parámetros de entrada que utiliza diferentes formas de acceder
//a los elementos de un formulario.
const acceso=()=>{
    //Método getElementById: permite acceder al objeto del documento cuyo id es nombreId
    const nombre=document.getElementById("nombreId");
    console.log({nombre});
    
    //Se pueden cambiar las propiedades del objeto.
    // La siguiente línea establece el objeto como un botón en lugar
    //de una caja de texto, tal y como está establecido en index.html (descomentar la línea para probarlo)
    //nombre.type="button"
    
    //value: Devuelve el contenido del objeto, en este caso la cadena escrita en la caja de texto.
    console.log(nombre.value);
    console.log(document.getElementById("nombreId"));

    //****Método getElementsByName: Permite acceder al objeto del document por el nombre 
    //asignado en la propiedad name
    //En este caso, como hay dos elementos del document con el mismo nombre, devuelve una lista con los dos objetos.
    //Los objetos se van introduciendo en la lista por orden de aparición desde el nodo raíz del documento.
    const nombres=document.getElementsByName("nombre")
    console.log({nombres});

    //mostrar el value de apellidos
    //Dado que nombres es una lista, su propiedad value es undefined (no puede almacenar el contenido de los dos)
    console.log(nombres.value);
    //Pero sí que puedo acceder a cada elemento de esa lista a través de su índice
    console.log(nombres[0].value);

    //Método getElementsByTagName: Permite acceder al objeto del documents por el tag (etiqueta HTML)
    const nombreTag=document.getElementsByTagName("input");
    //Hay dos elementos INPUT en el documento.
    //mostrar elementos
    //Como es una lista (objeto iterable implementado mediante un array) podemos determinar cuántos elementos hay
    //mediante el atributo lenght
    console.log(`Los elementos de nombreTag son ${nombreTag.length}`);
    //Y también podemos acceder al valor de uno de los elementos en particular mediante su índice.
    //acceder al value de apellidos
    console.log(nombreTag[1].value);
}

//script
acceso();