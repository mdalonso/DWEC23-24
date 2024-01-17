"use strict";
let aNum = [];

$(() => {
    //Preparamos el documento
    //Generamos los números que se van a ordenar y los metemos n los span.
    generarNumeros();
    //Convertiremos la capa con id sortable en un widget sortable.
    //Como no le especificamos ninguna opción al inicializarlo, tomará las opciones por defecto
    $("#sortable").sortable();
    
    $("button").on("click", comprobar);
  
})
let generarNumeros = () => {
    
    //Generamos 5 números aleatorios entre 1 y 50 y los metemos en un array.
    let contador = 0;
    aNum=[]; //inicializar el array
    while (contador < 5) {
        let numero = Math.round(Math.random() * 49) + 1

        //Se meterá en el array ese número generado aleatoriamente si es que no ha sido
        //ya previamente introducido. Para ello primero tenemos que mirar si ya
        //existe ese valor en el array.

        //Si queremos localizar un elemento dentro de un array...
        //...Esta sería la forma "artesanal" de hacerlo usando JS nativo...

        // if (aNum.indexOf(numero)==-1){ //el número no está en el array
        //     aNum.push(numero);
        //     contador++;
        // }

        //...pero jQuery ofrece métodos también...
        //...El método inArray() de JQuery busca un valor en un array devuelviendo 
        //su índice (-1 si no lo encuentra)

        if (jQuery.inArray(numero, aNum) < 0) { //el número no se encuentra
            //Se mete en el array
            aNum.push(numero);
            contador++;
        }

    }

    //cargamos el array de números en los objetos gráficos del documento
    cargarNumLista();
    
    //Ordenamos el array de forma ascendente para poder tener una referencia que nos permita
    //comprobar si hemos ordenados los elementos en pantalla de forma correcta.
    aNum.sort((a, b) => {
        return a - b
    });
}

//Este método mete los números en los objetos span
let cargarNumLista = () => {
    //Se buscan los descendientes de tipo span dentro del elemento con id sortable
    $('#sortable span').each((ind, ele) => {
        //Se recorre esa colección con each introduciendo en cada elemento el número correspondiente
        $(ele).text(aNum[ind]) //Esta es la forma de hacero en jquery
        // ele.innerText=aNum[ind]//Esta sería la forma de hacerlo en javascript nativo
    })
}

//Este método comprueba si los objetos están ordenados.
let comprobar = () => {
    //La variable ordenar determina si los objetos están ordenados o no.
    let ordenar = true
   
    //Como previamente he ordenado el array, puedo recorrer
    //todos los objetos del sortable e ir comprobando uno a uno si su contenido
    //coincide con el valor correspondiente al mismo índice dentro del array.
    $("#sortable span").each((ind, ele) => {
        if ($(ele).text() != aNum[ind]) {
            ordenar = false;
        }
    })

    //Se mostrará un mensaje con sweet alert según los números estén ordenados o no.
    if (ordenar) {
       mostrarMensaje("¡Los números están ordenados", true);
    } else {
        mostrarMensaje("¡Los números no están ordenados",false);
    }
   
   
}

let mostrarMensaje = (mensaje, estado) => {
   
    Swal.fire({
        title: mensaje,
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: `No seguir jugando`
      }).then((result) => {
        //Si se ha pulsado el botón "Continuar"...
        if (result.isConfirmed) {
            if(estado){ //... y en caso de que que se hayan ordenado adecuadamente...
                generarNumeros(); //...se vuelven a generar los números reiniciando el juego.
            }
        
        } 
      });
}