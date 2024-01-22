// INSTRUCCIONES DEL EJERCICIO
//     a. Asigna la clase borde a Primero y Segundo.
//     b. Asigna la clase verde a las abreviaturas de cada módulo de segundo.
//     c. Borra la clase borde.
//     d. La clase borde se debe asignar o quitar según hagamos click sobre primero o segundo.
//     e. Modifica ‘Primero’ por ‘Módulos de primero’.
//     f. Modifica ‘Segundo’ por ‘Módulos de segundo’.
//     g. Elimina los elementos de la las listas que estén vacíos.
//     h. Añade el módulo de fol al final de la lista de primero. Realizar en ambos sentidos.
//     i. Añade el módulo de programación al principio de la lista de primero. Realizar en ambos sentidos.
//     j. Añade el módulo de sistemas informáticos detrás de base de datos.
//     k. En la lista de los módulos de segundo, añade al final de cada uno de ellos la cantidad de horas
//     semanales que tienen cuando se haga click sobre ellos. Parte del nombre de cada módulo y añade
//     la información desde ul.
//     l. Vacía la lista que contiene los módulos de segundo.
//     m. Elimina la lista que contiene los módulos de primero.
"use strict";
$(() => {
//a. Asigna la clase borde a Primero y Segundo.
    //Primero y Segundo son los dos únicos elementos de tipo p
    $("p").addClass('borde');
    
// b. Asigna la clase verde a las abreviaturas de cada módulo de segundo.
    //Selector: elementos de tipo li que sean descendientes de un elemento ul que justo el siguiente
    //al elemento que contiene la cadena Segundo.
    $(":contains('Segundo')+ul>li").addClass("verde");
    //$('ul:nth-child(1)>li').addClass('verde').removeClass('azul');--> MAL
   

 // c. Borra la clase borde.
     //$("p").removeClass('borde');--> MAL
	 //Selector: Todos los elementos de la clase 'verde'
	 $(".verde").removeClass("verde");
	 
	 
 //d. La clase borde se debe asignar o quitar según hagamos click sobre primero o segundo.
	//toggleClass: si la clase está se elimina y si no está se añade.
    $("p").on("click", function () {
        $(this).toggleClass('borde')
    })


//e. Modifica ‘Primero’ por ‘Módulos de primero’.i
	//Selector: El primer elemento de tipo p.
     $("p:first").text("Módulos de primero")
	 
	 
//f. Modifica ‘Segundo’ por ‘Módulos de segundo’.
	//Selector: El último elemento de tipo p.
     $("p:last").text("Módulos de segundo");
	 
//g. Elimina los elementos de la las listas que estén vacíos.
	//Selector: Elementos de tipo li que estén vacíos (sólo existe la etiqueta)
     $("li:empty").remove();
	 
//h. Añade el módulo de fol al final de la lista de primero. Realizar en ambos sentidos.
	//Selector: primer elemento de tipo ul.
	//Acción: Añade un nuevo elemento li como último hijo del elemento seleccionado.
    $("ul:first").append("<li>FOL</li>");
	//Acción: Añade un nuevo elemento li como primer hijo del elemento seleccionado.
    $("ul:first").prepend("<li>FOL</li>");


//i. Añade el módulo de programación al principio de la lista de primero. Realizar en ambos sentidos.
    $("ul:first").prepend("<li>Programación</li>");
    $("ul:first").append("<li>Programación</li>");
	
//j. Añade el módulo de sistemas informáticos detrás de base de datos.ç
	//Selector: primer elemento de tipo ul.
	//Filtro: (find) localiza un descendiente de tipo li con la cadena 'Base de Datos'
	//			Esto permite localizar la posición tras la cual se va a insertar el
	//			nuevo elemento.
	//Acción: Añadir el elemento 'Sistemas Informáticos'
	
     $("ul:first").find("li:contains('Base de Datos')").append("<li>Sistemas Informáticos</li>");
	 
	 
//k. En la lista de los módulos de segundo, añade al final de cada uno de ellos la cantidad de horas
    // //     semanales que tienen cuando se haga click sobre ellos. 
	//Selector: li que son hijos directos de un ul que a su vez son hijos directos
	//			de un li que a su vez son hijos de un ul.
	//Acción: se le asigna la función al evento click.
	//		La función consiste en apadir un hijo de tipo li con el número de horas
	//		El número de horas está especificado a través de un atributo data-hours.
    $("ul>li>ul>li").on("click", function () {
        $(this).append("<li>" + $(this).parent().attr("data-hours") + " horas</li>");
		//para que sólo se realice una vez la acción al click, se elimina la asociación
		//de la función con el evento.
        $(this).off("click")
     })
	 
//l. Vacía la lista que contiene los módulos de segundo.
//DOS FORMAS DE HACERLO, COMENTAR UNA U OTRA PARA PROBARLO.

	//Selector: elemento de tipo ul que es el 4º hijo 
	//$("ul:nth-child(4)").empty();
	
	//Otra forma de hacerlo
	//Selector: el elemento ul inmediatamente siguiente (hermano siguiente) a un párrafo que contiene en su 
	//texto la cadena 'segundo'
	//$("p:contains('segundo')+ul").empty();
	
	//Elimina los hijos del último elemento de tipo ul (QUE NO ES LO QUE SE PIDE)
    // $("ul:last").empty();

 //m. Elimina la lista que contiene los módulos de primero.
     $("ul:first").empty()
})