"use strict";
let aBarcos = [];
let aciertos = 0;
let intentos = 0;
document.addEventListener("DOMContentLoaded", () => {
  crearTitulo();
  crearFormulario();
});
const crearTitulo = () => {
  const titulo = document.createElement("h2");
  titulo.textContent = "Juego de barcos";
  document.body.appendChild(titulo);
};
const crearFormulario = () => {
  const formulario = document.createElement("form");
  const etiqueta = document.createElement("label");
  etiqueta.textContent = "Introduzca Edad";
  etiqueta.setAttribute("for", "edad");
  const inputEdad = document.createElement("input");
  inputEdad.setAttribute("id", "edad");
  inputEdad.setAttribute("type", "number");
  inputEdad.setAttribute("placeholder", "Introduzca Edad");

  //crear botón en una capa
  const div = document.createElement("div");
  const boton = document.createElement("button");
  boton.textContent = "Comenzar";
  //añadir el botón a la capa
  div.appendChild(boton);
  //establecer evento click al botón
  boton.addEventListener("click", comenzar);
  //añadir objetos al documento

  document.body.appendChild(formulario); //añadir formulario al body
  formulario.appendChild(etiqueta);
  formulario.appendChild(inputEdad);
  formulario.appendChild(div);
};
const generarBarcosRandom = (num) => {
  do {
    const numero = Math.round(Math.random() * (num * num)) + 1;
    if (aBarcos.findIndex((barco) => barco == numero) == -1) {
      //añadir el número al array
      aBarcos.push(numero);
    }
  } while (aBarcos.length < 5);
};

const comenzar = (e) => {
  const edad = document.querySelector("#edad");
  if (edad.value <= 12) {
    crearTablero(5);
  } else if (edad.value > 12) {
    crearTablero(10);
  }
  e.preventDefault();
};
const crearTablero = (filas) => {
  let contador = 1;
  generarBarcosRandom(filas);
  console.log(aBarcos);
  const tabla = document.createElement("table");
  //añadir al body
  document.body.appendChild(tabla);
  for (let fil = 0; fil < filas; fil++) {
    const fila = document.createElement("tr");
    //añadir a la tabla
    tabla.appendChild(fila);
    for (let col = 0; col < filas; col++) {
      const columna = document.createElement("td");
      columna.setAttribute("id", contador++);
      const imagen=document.createElement("img");
      //añadir la imagen a la celda
      columna.appendChild(imagen)
      columna.addEventListener("click", pulsar);
      fila.appendChild(columna);
    }
    //añadir la fila a la tabla
    tabla.appendChild(fila);
  }
};
function pulsar() {
  //averiguar si hay agua o barco
  if (aBarcos.findIndex((barco) => barco == this.id) == -1) {
    //Buscar si el id de la celda coincide con los números generados donde hay barco.
    //Si devuelve -1 no está el número
    this.children[0].setAttribute("src","imagenes/agua.jpg");
    intentos++;
  } else {
    this.children[0].setAttribute("src","imagenes/barco.jpg");
    aciertos++;
  }
  this.removeEventListener("click", pulsar);
  if (aciertos==5){
    finalizar();
  }
}
const finalizar=()=>{
    Swal.fire({
        title: `Juego finalizado. Has fallado ${intentos} veces`,
        text:'¿Desea continuar jugando',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        CancelButtonText: `Abandonar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          limpiar();
        } 
      })
}
const limpiar=()=>{
    document.querySelector("table").remove();
    document.querySelector("#edad").value="";
}
