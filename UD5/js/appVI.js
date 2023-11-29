"use strict"
document.addEventListener("DOMContentLoaded", ()=>{

//TRAVERSING DOM, Recorrer el árbol del DOM a través de sus relaciones padre-hijo y hermano-hermano*******************
//- parenNode
//- chidNodes[index]
//- firstChild
//- lastChild
//- nextSibling
//- previousSibling
//Hasta ahora hemos estado localizándolos mediante selectores de forma directa

//Localiza el primer elemento de clase navegacion
      const navegacion=document.querySelector('.navegacion');
      console.log(navegacion);

//childNodes es una colección que contiene todos los hijos de un elemento (incluye todos los tipos de nodo)
      console.log(navegacion.childNodes); //los espacios en blanco son considerados nodos elementos (text, comment)

//children es una colección que sólo incluye los nodos de tipo element
      console.log(navegacion.children); //Sólo toma los nodos de tipo element
      console.log(navegacion.children[0]);
      console.log(navegacion.children[0].nodeName);//Devuelve el tag HTML en mayúsculas
      console.log(navegacion.children[0].nodeType);//Tipo de nodo según la siguiente tabla
  //1- Element Node
  //2- Atribute node
  //3- Text Node
  //8- Comment Node
  //9- Document Node


//Localizamos el primer elemento de clase card (Representar el árbol de este nodo)
      const card=document.querySelector(".card");
      console.log(card)

//Este es el segundo nodo hijo de tipo element (el children[0] sería el img)
    console.log(card.children[1]); //acceso a la clase info

//Accedemos al segundo hijo dentro del info
//Cambiarmos el texto que se muestra
    card.children[1].children[1].innerText='Traversing the DOM'; //acceso al párrafo cuya clase es titulo

 //traversing DOM de hijo al padre
 //Accedemos al nodo padre del card --> div de clase contenedor-class
 //El nodo padre es un nodo element o document
 //Como los nodos document no tienen padre, devolverá null.
 //También devuelve null si el elemento acaba de ser creado y no se ha incorporado aún al árbol
    console.log(card.parentNode);
 
//Se accede al nodo padre cuando ese nodo padre es de tipo element
//Devuelve null si el padre no es de tipo element (podría ser de tipo document)
//También devuelve null si el elemento acaba de ser creado y no se ha incorporado aún al árbol
    console.log(card.parentElement); //se recomienda

//acceso a nodos a través de sus relaciones de hermanos.
//previousSibling y nextSibling navegan por listNodes (no por Children) por lo que tiene en cuenta también
//los tipos de nodos text y coments, no solo los nodos de tipo element
  console.log(card.parentElement.previousSibling);
//acceso a hermano siguiente
  console.log(card.parentElement.nextSibling.nextSibling);
//Navegación
  card.parentElement.previousSibling.textContent="Cambio hermano traversing"
})


