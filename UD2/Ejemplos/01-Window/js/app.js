"use strict"; //Obligatorio declarar variables y constantes
/* QUÉ SE TRABAJA EN ESTE SCRIPT 
- Dos métodos del objeto WINDOW
        - Open: creación de una nueva ventana tanto con un contenido predefinido como una página en blanco.
        - close: Se cierra la ventana 
- Creación de funciones
*/
let ventana,
  i = 0;

//crear funciones
function crearVentSec() {
  console.log(ventana);
//El método OPEN devuelve un objeto WINDOW
//Abrir la ventana con otra url (descomentar la siguiente línea y comentar la línea 21)
  //open("https://www.iestrassierra.com","ventana", "height=200,width=200, resizable=0");
 //Crea una nueva ventana que se recibe en la variable declarada para su manipulación.
 //El nombre que recibe la ventana es valor del atributo name de la instancia que en cada momento se crea con open.
 //Siempre se recibe en la misma variable por lo que sólo se va a poder manipular la última que se haya creado, que es la que está
 //alojada en la variable VENTANA.
  ventana = open("", "ventana" + i, "width=400,height=400");
  
 //LA NUEVA VENTANA PUEDE SER MANIPULADA
  //crear una etiqueta h1 y un botón en la ventana secundaria
  console.log(ventana);
  //El objeto DOCUMENT se verá a más adelante.
  ventana.document.write("<h1>Ventana Secundaria</h1>");
  ventana.document.write("<button type='button' onclick='self.close();'>Cerrar ventana Sec</button>");
  
  
  i++;
}
function cerrarVentPrin() {
  close(); //cerrar ventana principal
}
