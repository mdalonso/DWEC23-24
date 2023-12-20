"use strict"


//Evento ready() --> todos los métodos se asocian a los eventos de los objetos correspondientes
//en el evento ready()"use strict"
$(() => {
    //eventos

    //Selector: elementos de la clase .botons que contengan el texto "fadeOut"
    //En el evento se click se llama a la función ocultar (función nominal)
    $(".botons:contains('fadeOut')").on("click", ocultar);

    //Selector: elementos de la clase .botons que contengan el texto "fadeOut"
    //En el evento click se aplica un fadeIn (mostrar con fundido) a velocidad slow.
    //Como inicialmente el h1 está mostrado, no ningún efecto hasta que no se oculta previamente
    //con fadeOut.
    $(".botons:contains('fadeIn')").on("click", () => {
         $("h1").fadeIn("Slow");
    });

    //Selector: elementos de la clase .botons que contengan el texto "fadeToggle"
    //En el evento click se aplica un fadeToggle a velocidad 2000ms y después se
    //ejecuta la función fin.
    //fadeToggle: Si está oculto se mostrará y si está visible se ocultará (efecto fundido)
    $(".botons:contains('fadeToggle')").on("click", () => {
         $("h1").fadeToggle(2000, fin);
    });

    //Selector: elementos de la clase .botons que contengan el texto "fadeTo"
    //En el evento click se llama a la función anómina que...
    $(".botons:contains('fadeTo')").on("click", () => {
        //si la opacidad del h1 es 1...
        if($('h1').css("opacity")==1){
            //Se va ha disolver hasta la opacidad 0.25 (no se ocultará del todo) y el efecto
            //tardará 2000 ms
            $("h1").fadeTo(2000,0.25);
        //Si la opacidad no es 1
        }else{
            //Se recuperará la visibilidad total (opacidad=1) y el efecto tardará 2000ms
            $("h1").fadeTo(2000,1);
        }
      
   });
})


//La función ocultar aplica un fadeOut (disuelve) al elemento de tipo h1.
const ocultar=()=>{
    $("h1").fadeOut();
}

//La función fin muestra un mensaje con la librería sweet alert.
const fin=()=>{
    Swal.fire("Función terminada");
}