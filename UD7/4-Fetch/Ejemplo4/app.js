"use strict";
//En este ejemplo se muestran las asignaturas de 2º curso
//Implementamos la correspondencia entre eventos y métodos cuando el html está completa y correctamente cargado
document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector("#mostrar").addEventListener("click", mostrarAsig);
})
 


const mostrarAsig = () => {
  //Se realiza una solicitud GET al servidor que en este caso es un archivo xml que contiene la información
  //correspondiente a los módulos de 1º y 2º curso de DAW
  fetch("Ejemplo4.xml")
    //En  el primer then comprobamos si la solicitud se ha resuelto con éxito o no mediante el objeto response.
    .then((response) => {
      if (response.status == 200) {
        //la información xml se trata como si fuera texto plano por tanto accedemos a ella mediante 
        //el método text(), el cual recordamos que devuelve una promesa que se resuelve en un String.
        //Un poco más adelante veremos como gestionamos esos datos en XML.
        return response.text();
      } else {
        throw "Error en la comunicación";
      }
    })
    //Este then es el que gestiona los datos devueltos por el servidor y que están en forma de String.
    .then((data) => {
      let mensaje = "";
      //utilizar XML
      //JQuery nos ofrecía facilidades para procesar información en formato XML.
      //con JavaScript nativo podemos hacer uso del objeto DOMParser (API de JS nativo)
      //DOMParser permite parsear XML y HTML
      const parser = new DOMParser();
      //el método parseFromString permite parsear XML contenido en una cadena
      //Este método recibe la cadena y el formato del tipo de información. En este caso
      //se trata de parsear texto a xml ('text/xml')
      //xmlDoc contendrá el código XML parseado desde la cadena. Este código puede ser utilizado como si de HTML
      //se tratara
      const xmlDoc = parser.parseFromString(data, "text/xml");
      
      //con querySelectorAll utilizando como selector la etiqueta 'curso' obtenemos una colección de dos elementos
      //un elemento por cada curso.
      //Se recorre esa colección con un foreach
      xmlDoc.querySelectorAll("curso").forEach((element,index) => {
        //el que nos interesa es el segundo elemento 'curso' que es el que corresponde al 2º curso
        if (index == 1) {
           mensaje = "Módulos de 2º DAW";
           //Ahora, dentro del elemento con índice 2 (el segundo curso), localizamos todos los elementos
           //que hacen match con la etiqueta 'asig', es decir, todas las asignaturas dentro de ese curso en
           //cuestión.
           //Recorremos la colección resultante con un foreach para obtener los nombres de todos los módulos
           //pertenecientes a segundo curso
           element.querySelectorAll("asig").forEach(mod => {
                       mensaje += "<br>" + mod.textContent;
           });
        }   
        
      });
      //Una vez construída la lista, la muestro en el elemento correpondiente.
      //como mensaje contiene código html utilizamos innerHTML para que sea renderizado por el navegador.
      document.querySelector("#mensaje").innerHTML = mensaje;
     
    
    })
    //Se captura la excepción lanzada en el primer then.
    .catch((error) => {
      console.log("Atención: "+error);
    });
};
