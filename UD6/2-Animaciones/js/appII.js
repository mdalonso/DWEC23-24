//Evento ready() --> todos los métodos se asocian a los eventos de los objetos correspondientes
//en el evento ready()"use strict"

$(() => {
    //eventos
    //Selector: objetos de la clase .botons que contengan el texto "SlideUp"
    //En el evento click se ejecutará la función ocultar.
    $(".botons:contains('SlideUp')").on("click", ocultar);

    //Selector: obejtos de la clase .botons que contengan el texto sliceDown.
    //En el evento click se mostrará el elemento h1 mediante una función anónima.
    //velocidad slow.
    $(".botons:contains('SlideDown')").on("click", () => {
         $("h1").slideDown("slow");
    });

    //Selector: objetos de la clase botons que contengan el texto "SlideToggle".
    //Se aplicacará slideToggle con una velocidad de 2000ms al encabezado y después se
    //llamará a la función fin.
    $(".botons:contains('SlideToggle')").on("click", () => {
         $("h1").slideToggle(2000, fin);
    });
})

//Ocultar: hace un slideUp al h1
const ocultar=()=>{
    $("h1").slideUp();
}

//La función fin muestra un mensaje utilizando la librería sweet alert.
const fin=()=>{
    Swal.fire("Función terminada");
}