// ↓ INSTRUCCIONES DEL EJERCICIO ↓
//     a - Selecciona todos los módulos de primero y mostrar en consola
//     b - Selecciona el módulo Sistemas Informáticos
//     c - Selecciona el módulo que va detrás de Sistemas Informáticos
//     d - Selecciona los módulos que van detrás de Sistemas Informáticos
//     e - Selecciona los módulos de primero que tengan el atributo href
//     f - Selecciona los módulos de primero que no tengan el atributo href
//     g - Selecciona aquellos módulos de primero que contengan en el atributo href la cadena 'mod'
//     h - Selecciona aquellos módulos de primero que empiecen en el atributo href por la cadena 'mod'
//     i - Selecciona aquellos módulos de primero que terminen en el atributo href con la cadena '.html'
//     j - Selecciona todas las horas de los módulos de segundo
//     k - Selecciona los ítems vacíos y añade el contenido 'Nodo vacío'
//     h - Selecciona los módulos DWESE, DAW y EIE

"use strict";

$(function () {
//************* */
    console.log("a - Selecciona todos los módulos de primero y mostrar en consola");
    //Selector: Descendientes del primer elemento de tipo ul que sean de tipo li.
    $("ul:first li").each((ind, element) => {
        console.log($(element).text())
    });
//*********** */
    console.log("b - Selecciona el módulo Sistemas Informáticos");
    //Selector: Elemento li que sea tercer hijo del primer elemento de tipo ul
    //console.log($("ul:first li:nth-child(3)").text());
    
    //Selector: Elemento de tipo a (enlace) cuyo atributo href coincide con 'SImod.html'
    console.log($("a[href='SImod.html']").text());
//************ */
    console.log("c.- Selecciona el módulo que va detrás de Sistemas Informáticos");
    //Selector: Selecciona los elementos li que sean el siguiente a un tercer hijo de tipo li
    //del primer elemento del tipo ul.
    console.log($("ul:first li:nth-child(3)+li").text());

//************ */
    console.log("d - Selecciona los módulos que van detrás de Sistemas Informáticos");
    //Selector: De todos los descendientes del primer elemento de tipo ul, que sean de tipo li
    //devolver aquellos a partir de la cuarta posición (a partir del índice 3)
    $("ul:first li:gt(2)").each((ind, element) => {
        console.log($(element).text())
    });

/********* */
    console.log("e - Selecciona los módulos de primero que tengan el atributo href");
    //Selector: Elementos de tipo a que tengan definido el atributo href que sean descen-
    //dientes del primer elemento de tipo ul.
    $("ul:first a[href]").each((ind, element) => {
        console.log($(element).text())
    });
    
/***************** */    
    console.log("f - Selecciona los módulos de primero que no tengan el atributo href");
    //Selector: Descendientes de tipo a del primer elemento de tipo ul. Y dentro de ese
    //conjunto de elementos, aquellos que no tenga definido el atributo href. 
    $("ul:first a").not("[href]").each((ind, element) => {
        console.log($(element).text())
    });

/***************** */
    console.log("g - Selecciona aquellos módulos de primero que contengan en el atributo href la cadena 'mod'");
    //Selector: Entre todos los elementos de tipo a que son descendientes del primer
    //elemento de tipo ul, seleccionan aquellos que contienen la cadena 'mod' en su 
    //atributo href.
    $("ul:first a[href*='mod']").each((ind, element) => {
        console.log($(element).text())
    });

/************************* */
    console.log("h - Selecciona aquellos módulos de primero que comience en el atributo href la cadena 'mod'");
    //Selector: Entre tgodos los elementos de tipo a que son descendientes del primer elemento
    //de tipo ul (módulos de primero), devuelve aquellos cuyo valor del atributo href
    //comienza por la cadena 'mod'
    $("ul:first a[href^='mod']").each((ind, element) => {
        console.log($(element).text())
    });
    
/********************** */    
    console.log("i - Selecciona aquellos módulos de primero que terminen en el atributo href la cadena '.html'");
    //Selector: Entre todos los elements de tipo a que son descendientes del primer elemento
    //de tipo ul (módulos de primero), devuelve aquellos cuyo valor del atributo href
    //termina por la cadena '.html'
    $("ul:first a[href$='.html']").each((ind, element) => {
        console.log($(element).text())
    });

/********************* */
    console.log(" j - Selecciona todas las horas de los módulos de segundo");
    //Selector: Todos los ul que son hijos directos de un elemento li que a su vez
    //es hijo directo de un ul. Devuelve los descendientes de esos elementos de tipo ul
    //que contienen el texto 'horas'
    //**Recordamos que el texto que se rastrea es el que está entre
    //las etiquetas html, en este caso entre las etiquetas <li></li>
    $("ul>li>ul").find("li:contains('horas')").each((ind, element) => {
        console.log($(element).text())
    });

/********************* */
    //k - Selecciona los ítems vacíos y añade el contenido 'Nodo vacío'
    //Selector: Selecciona los elementos de tipo li que están vacíos (sólo tienen las
    //etiquetas de apertura y cierre)
    $("li:empty").each((ind, element) => {
        $(element).text("Nodo vacío");
    });

/*************** */
    //     h - Selecciona los módulos DWESE, DAW y EIE
    //Selector: De todos los elementos de tipo li selecciona aquellos que contienen en su
    //texto las cadenas especificadas. Se especifican varios filtros separados por una coma
    $("li").filter(":contains('DWESE'),:contains('DAW'),:contains('EIE')").each((ind,element)=>{
        console.log($(element).text());
    })
       
   

})