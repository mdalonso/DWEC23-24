"use strict";
document.addEventListener("DOMContentLoaded", () => {
//ACCESO A OBJETOS DEL DOM A TRAVÉS DE SELECTORES CSS**********************

//Un selector es una clase CSS (ver stylesUD5.css en /assets)
// El selector también se utiliza en getElementByClassName, pero en ese caso se devuelve una 
//colección con todos los elementos del DOM que utilizan el selector especificado.

//querySelector solo retorna el primero que encuentre, no una colección.
//El uso de querySelector requiero la estructura "".selector", tal y como se especifican en CSS
  const card = document.querySelector(".card"); //selectores compatibles con CSS
  console.log(card);

//Devuelve el primer elemento .info que sea hijo de un elemento .premium
  const info = document.querySelector(".premium .info");
  console.log(info);


 //Selecciona el segundo hijo de clase card dentro de la primera section cuya clase sea hospedaje
  const segundaCard = document.querySelector("section.hospedaje .card:nth-child(2)");
  console.log(segundaCard);

  //Selecciona el elemento cuyo id sea formulario
  const formulario = document.querySelector("#formulario");
  console.log(formulario);

  //seleccionar por etiqueta HTML <>
  //Devuelve el primer elemento de tipo <nav></nav>
  const navegacion = document.querySelector("nav");
  console.log(navegacion);
});
