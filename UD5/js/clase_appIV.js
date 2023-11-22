"use strict"

document.addEventListener("DOMContentLoaded", ()=>{
//QUERYSELECTORALL*********************************************
//querySelectorAll--> retorna todos los nodos que encuentre con esas características, a diferencia
//de querySelector, que solo devuelve el primero. Utilizando siempre selectores CSS

//Devuelve todos los hijos impares(odd) de clase card
    const card=document.querySelectorAll(".card:nth-child(odd)"); //selectores compatibles con CSS
    console.log(card);
    
//Devuelve todos los elementos de clase info que están dentro de un elemento de clase premium
 const info=document.querySelectorAll(".premium .info");
 console.log(info);

//Devuelve el segundo hijo de clase card dentro de una section de clase hospedaje
 const segundaCard=document.querySelectorAll("section.hospedaje .card:nth-child(2)");
 console.log(segundaCard);

//Devuelve el elemento cuyo id es formulario
const formulario=document.querySelectorAll("#formulario");
 console.log(formulario);


//Devuelve todos los elementos de tipo <nav></nav>
 const navegacion=document.querySelectorAll("nav");
 console.log(navegacion);
 })

