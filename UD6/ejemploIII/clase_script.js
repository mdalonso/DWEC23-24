/** Crearemos una lista a la que añadiremos elementos. Para ello utilizaremos 4 botones que harán
 * las operaciones sobre la lista.
 * 
 * Tareas:
 * 1- Crear 4 botones.
 *      - El primero permitirá añadir un elemento al final de la lista. Cada nuevo elemento de
 *          la lista mostrará el texto "Elemento + número" Ese número será un contador que se
 *          irá incrementando con cada adición o modificación de los elementos de la lista.
 *      - El segundo permitirá modificar el número del último elemento de la lista cambiando su
 *          número por el siguiente número del contador.
 *      - El tercero eliminará el último elemento de la lista. Se pedirá confirmación con la
 *          librería sweet alert.
 *      - El cuarto añadirá un nuevo elemento de la lista en el penúltimo lugar.
 * 
 * Si no hay ningún elemento en la lista sólo estará activo el botón para añadir.
 */


"use strict"
let contador = 1;
$(() => {
    crearBotones();
    asignarEventosBot();
    crearLista();
});

let crearBotones = () => {
    //crear capa
    $("body").append("<div id=capaBotones></div>");
    $("#capaBotones").append("<button id=add>Añadir elemento</button>");
    $("#capaBotones").append("<button id=update>Modificar elemento</button>");
    $("#capaBotones").append("<button id=delete>Eliminar elemento</button>");
    $("#capaBotones").append("<button id=addB>Añadir penúltimo</button>");
    habDesBot(true);
}

let crearLista = () => {
    $("body").append("<div id=capaLista></div>"); //crear una capa e insertalar en el body
    $("#capaLista").append("<ul id=listaEle></ul>")
}
let asignarEventosBot = () => {
    $("#add").on("click", addLista);
    $("#update").on("click", updateLista);
    $("#delete").on("click", deleteLista);
    $("#addB").on("click", addBLista);

}
let addLista = () => {
    $("#listaEle").append(`<li>Elemento ${contador++}</li>`);
    //habilitar el resto de botones al insertar el primer elemento
    if ($("li").length == 1) {
        habDesBot(false);
    }

}

let updateLista = () => {
    //crear el nodo nuevo y modifica el último
    $("li:last").text(`Elemento ${contador++}`)
   
}
let deleteLista = () => {
    Swal.fire({
        title: '¿Desea eliminar el elemento?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: `No eliminar`,
        //cambiar color
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        //pasar el foco al botón cancelar
        focusCancel: true,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            //eliminar el último hijo (li) de la lista
            $("li:last").remove();
            //
            // document.getElementById("listaEle").removeChild(document.getElementById("listaEle").childNodes[1]); //borrar el segundo
            if ($("li").length == 0) { //si es falso, no tiene hijos
                habDesBot(true); //Deshabilita botones eliminar, actualizar e Insertar Después
            }
            Swal.fire('¡Eliminado!', '', 'success')
        }
    })

}
let addBLista = () => {
    $(`#listaEle li:eq(${$("li").length-2})`).after(`<li>Elemento ${contador++}</li>`)
}
let habDesBot = (valor) => {
    $("#delete").prop("disabled", valor);
    $("#update").prop("disabled", valor);
    $("#addB").prop("disabled", valor);
}