"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let elemento;
  //ACCESO A LOS ELEMENTOS DEL DOM*********************
  
  //Podemos acceder a los objetos del documento HTML como vimos en la UD4 (Ejemplo 01-Acceso)
  //además, el DOM ofrece formas de acceder a algunos elementos concretos:
  
  //HEAD-------> Da acceso a la sección head del documento HTML
   elemento = document.head;
   
   //BODY ---> Devuelve la sección body del documento HTMLS
   elemento = document.body;
   
   //FORMS--> Devuelve una colección con todos los formularios definidos en el documento HTML
   //En este caso sólo hay un formulario que es el buscador.
   //(un formulario es una sección donde el usuario puede interactuar mediante cajas de texto, botones...)
   elemento = document.forms;
   
   //Como forms es una colección podemos acceder a cada elemento mediante su índice
   //Para cada formulario podemos acceder a sus atributos.
   //Accedemos al id que lo identifica dentro del documento HTML
   elemento = document.forms[0].id;
   
   //Podemos acceder a las clases CSS que definen su apariencia
   elemento = document.forms[0].classList;
   
   
   //Podemos acceder al método que usa el navegador para enviar el formulario
   //Puede ser POST: Los datos del formulario se incluyen en el cuerpo del formulario y se envían al servidor
   //o GET: Los datos del formulario se adjuntan a la URI de action con un ? como separador
   elemento = document.forms[0].method;
   
   //LINKS --> Devuelve una colección con todos los elementos de tipo <a> o <area> que tienen un valor
   //para su atributo href, es decir, todos los enlaces del documento.
   elemento = document.links;
   
   //Como es una colección, se puede acceder a cada link independientemente porsu índice
   elemento = document.links[4];
   
   //Cada link también tiene una colección classList que contiene las clases CSS que definen su apariencia
   elemento = document.links[4].classList;
   
   //COMPATIBILIDAD --> APLICACIONES CROSS-BROWSER (Aplicaciones que se adaptan a cualquier navegador)
   //className devuelve una cadena con los nombres de las clases CSS en lugar de una colección
   //IE no admite classList hasta su versión 10 por lo que hay que utilizar otra forma de acceder.
   //Para ver esas compatibilidad hay que consultar las tablas correspondientes.

   elemento = document.links[4].className;

  console.log(elemento);
});
