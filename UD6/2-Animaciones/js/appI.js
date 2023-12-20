"use strict"
//Evento ready() --> todos los métodos se asocian a los eventos de los objetos correspondientes
//en el evento ready()

$(() => {
    //EVENTOS:

    //Selector: elementos de la clase .botons que contengan el texto "Hide"
    //En este caso en el evento click se ejecutará la función nominativa OCULTAR.
    $(".botons:contains('Hide')").on("click", ocultar);

    //Selector: elementos de la clase .botons que contenga el texto "Show"
    //En este caso, en el evento click se ejecutará una función anómina que invoca a show.
    //se mostrará a velocidad lenta (parámetro slow)
    $(".botons:contains('Show')").on("click", () => {
         $("h1").show("slow");
    });

    //Selector: elementos de la clase .botons que contengan el texto "Toogle".
    //En el evento click se ejecuta una función anónima que invoca a toggle.
    //toggle recibe dos parámetros: velocidad=2000 ms y la función que se ejecutará
    //una vez que toggle se haya resuelto (función FIN)
    $(".botons:contains('Toogle')").on("click", () => {
         $("h1").toggle(2000, fin);
    });
})

//La función OCULTAR: oculta los elementos de tipo "h1" (hide no recibe parámetros de entrada)
const ocultar=()=>{
    $("h1").hide();
}

//La función fin muestra un mensaje con la librería sweet alert.
const fin=()=>{
    Swal.fire("Función terminada");
}