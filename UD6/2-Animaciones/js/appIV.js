"use strict"

$(() => {
    //eventos

    //crear un nuevo atributo en el botón animación1
   // $(".botons:contains('animacion1')").attr("data-clave", "prueba")
    document.querySelector(".botons").setAttribute("data-clave", "prueba")
    //acceso
    console.log( document.querySelector (".botons").getAttribute("data-clave"));
    
    //Selector: elementos de la clase .botons que contienen el texto "animacion1"
    //En el click se llamará a la función animacion1 (función nominal)
    $(".botons:contains('animacion1')").on("click",animacion1);

    //Selector: elementos de la clase .botons que contienen el texto "animacion2"
    //en el click se ejecutará la función anómina que invoca a animate para modificar
    //4 propiedades css: anchura (width), altura (height), left (distancia 
    // entre el margen izquierdo del elemento y el borde izquierdo de su bloque contenedor,
    // en este caso la página en sí porque su contenedor es body, y opacidad
    $(".botons:contains('animacion2')").on("click", () => {
        $("#figura").animate({
            width: '200px',
            height: '150px',
            left: '300px',
            opacity: 0.5
        });
    });

    //Selector: elementos de la clase .botons que contienen el texto "animacion3".
    //En el click se invoca a la función animacion3.
    $(".botons:contains('animacion3')").on("click", animacion3);
    
})

//la función animacion1 invoca a animate que modificará 2 propiedades css: width y height.
//la anchura y la altura del elemento con id "figura" se modificará progresivamente desde su valor
//original hasta los valores especificados en esta función.
const animacion1 = () => {
    $("#figura").animate({
        width: '200px',
        height: '150px'
    })
}

//La funcion ANIMACION3 invoca a animate para modificar 5 propiedades: width, height, left,
//opacity y backgroundColor.
//También se determina la velocidad (3000 ms), se especifica la forma de aplicar la velocidad
//a la animación  y por último una función que servirá
//para restaurar la figura a su estado inicial (animacionRecuperacion)
const animacion3 = () => {
    $("#figura").animate({
        width: '200px',
        height: '150px',
        left: '300px',
        opacity: 0.5,
        backgroundColor: 'purple'
    }, 3000,"linear", animacionRecuperacion)
}

//FUNCIÓN animacionRecuperacion: realiza una animación que devuelve la figura a su estado inicial
//modificando las propiedades css a sus valores originales.
//También establece la duración a 3000ms
const animacionRecuperacion = () => {
    $("#figura").animate({
        width: '100px',
        height: '100px',
        left: '5px',
        opacity: 1,
        backgroundColor: '#FC2'
    }, 3000)

}

