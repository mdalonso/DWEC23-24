"use strict";
import Participante from "./participante.js";
import Jurado from "./jurado.js";
import Festival from "./festival.js";
import Produccion from "./produccion.js";
//declaración de variables y objetos
const festival = new Festival(); //crear el objeto
//let mostrar = "<table border=1>";
/**Vamos a crear varias funciones
 * - para añadir un festival.
 * - Para añadir un participante: Cada vez que se añada un participante, se añadirá al festival.
 * - Para añadir un jurado: Cada vez que se añada un jurado, se añadirá al festival.
 * - Para añadir la producción.
 * - Mostrar el festival
 */
//declaraciones de funciones
const addFestival = () => {
  try {//Utiliza los setters para asitnar los valores.
    festival.nombre = prompt("Introduzca el nombre del festival");
    festival.ciudad = prompt("Introduzca la ciudad del festival");
    festival.edicion = parseInt(prompt("Introduzca la edición del festival"));
    festival.descripcion = prompt("Introduzca la descripción del festival");
    console.log("Festival creado");
  } catch (error) {
    console.log(error);
  }
};
//Esto se puede hacer más fino dando el control al usuario del número de participantes
//o mostrando un menú...
//o mejorar este sistema mostrando mensajes que indiquen al usuario qué va a pasar a continuación
//y qué tiene que hacer.
const addParticipantes = () => {
  //Se van a introducir 3 participantes
  for (let i = 1; i <= 3; i++) {
    const participante = new Participante(); //crear el objeto
    try {//utiliza los setters para asignar los valores.
      participante.nombre = prompt("Introduzca el nombre del participante");
      participante.edad = parseInt(
        prompt("Introduzca la edad del participante")
      );
      //añadir el participante  al festival
      //Si no se le pasa el índice, se comprueba qué clase instancia el objeto (ver clase Festival)
      festival.anadirParticipantes(participante, 0);
      console.log("Participante" + i + " creado");
    } catch (error) {
      console.log(error);
    }
  }
};

const addJurado = () => {
  //Se van a intrducir 3 jurados
  for (let i = 1; i <= 3; i++) {
    const jurado = new Jurado(); //crear el objeto
    try {
      jurado.nombre = prompt("Introduzca el nombre del jurado");
      jurado.edad = parseInt(prompt("Introduzca la edad del jurado"));
      jurado.profesion = prompt("Introduzca la profesión del jurado");
      jurado.genero = prompt("Introduzca el género del jurado");
      //añadir el jurado  al festival
      //Si no se le pasa el índice, se comprueba qué clase instancia el objeto (ver clase Festival)
      festival.anadirParticipantes(jurado, 1);
      console.log("Jurado" + i + " creado");
    } catch (error) {
      console.log(error);
    }
  }
};
const addProduccion = () => {
  let contador = 1; //contador para controlar que se introducen 2 producciones
  while (contador <= 2) {
    const prod = new Produccion(); //crear el objeto
    try {
      prod.titulo = prompt("Introduzca el título de la producción");
      prod.nacionalidad = prompt("Introduzca la nacionalidad");
      prod.genero = prompt("Introduzca el género");
      prod.anio = parseInt(prompt("Introduzca el año"));
      //añadir la producción
      //el método devuelve true o false en función de si se ha podido introducir la producción o no.
      if (festival.introducirProduccion(prod)) {
        alert("Producción insertada");
        contador++;
      } else {
        alert("La producción está repetida y no ha sido insertada");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
const mostrarFestival = () => {
  let mostrar = "<table border=1>";
  mostrar += festival.toString(); //Datos del festival
  mostrar += "<tr><td colspan=4><h2><center>Producciones</center></h2></td></tr>";
  //mostrar información por cada producción
  festival.aProducciones.forEach((produccion) => {
    mostrar += produccion.toString();
  });

  festival.aParticipantes.forEach((fila, index) => {
    if (index == 0) {
      //mostrar cabecera de participantes
      mostrar += "<tr><td colspan=4><center><h2>Participantes</center></h2></td></tr>";
    } else {
      // //mostrar cabecera de jurado
      mostrar += "<tr><td colspan=4><center><h2>Jurado</h2></center></td></tr>";
    }
    //mostrar información
    fila.forEach((participante) => {
      mostrar += participante.toString();
    });
  });
  //mostrar en la capa
  document.getElementById("capa").innerHTML = mostrar;
};
const deleteProduccion = () => {
  //Mostrar mensaje por si desea eliminar una producción
  while (confirm("¿Desea eliminar una producción")) {
    const titulo = prompt("Introduzca el título de la producción");
    if (festival.eliminarProduccion(titulo)) {
      //eliminar la producción
      alert(`${titulo} eliminado.`);
    } else {
      alert(`${titulo} no existe, no ha podido eliminarse.`);
    }
  }
};
//body script
try {
  addFestival();
  addParticipantes();
  addJurado();
  addProduccion();
  deleteProduccion();
  mostrarFestival();
  console.log(festival);
} catch (error) {
  console.log(error);
}
