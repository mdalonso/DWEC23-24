"use strict";

//1- Crear nuevas cartas que se van a añadir al tablero.

//let cartaSeleccionada = null;
let palo=[1,2,3,4,5,6,7,"sota","caballo","rey"];
let partida;

class Juego{
  constructor(){
    this.baraja=[];
    this.cuenta=0;
    this.inicio=false;
  }
}


console.log(palo);


document.addEventListener("DOMContentLoaded", () => {
  prepararPantalla();
});

// Agregar un evento al botón "Agregar Carta"

//Agregamos una nueva carta.

//********************************************* */

const prepararPantalla=()=>{
  //Creamos un contenedor para la cabecera
  let cabecera=document.createElement("div");
  cabecera.setAttribute("id","cabecera")

  let nodo=document.createElement("h1");
  nodo.setAttribute("id","titulo");
  nodo.textContent="SIETE Y MEDIA";
  cabecera.appendChild(nodo);


  let tablero=document.createElement("div");
  tablero.setAttribute("id","tablero");
  console.log(tablero);
  
  let btnIniciar=document.createElement("input");
  btnIniciar.setAttribute("id","btnIniciar");
  btnIniciar.setAttribute("type","button");
  btnIniciar.setAttribute("value","Iniciar partida");
  btnIniciar.classList.add("botons");
  btnIniciar.classList.add("botonsInicio");
  btnIniciar.addEventListener("click",iniciarJuego);
  
  document.body.appendChild(cabecera);
  document.body.appendChild(tablero);
  document.body.appendChild(btnIniciar);
  
  let tapete=document.createElement("div");
  tapete.setAttribute("id","tapete");
  tapete.classList.add("tapete");
  
  let capaBotones=document.createElement("div");
  capaBotones.setAttribute("id","botonera");
  
  let btnCarta=document.createElement("input");
  btnCarta.setAttribute("id","btnCarta");
  btnCarta.setAttribute("type","button");
  btnCarta.setAttribute("value","Pedir carta");
  btnCarta.classList.add("botons");
  
  let btnTerminar=document.createElement("input");
  btnTerminar.setAttribute("id","btnTerminar");
  btnTerminar.setAttribute("type","button");
  btnTerminar.setAttribute("value","Terminar");
  btnTerminar.classList.add("botons");

  capaBotones.appendChild(btnCarta);
  capaBotones.appendChild(btnTerminar);

  tablero = document.querySelector("#tablero");
  tablero.appendChild(tapete);
  tablero.appendChild(capaBotones);
};

const iniciarJuego=()=>{
  limpiarTapete();

  if (partida==undefined || partida.inicio==false){
      console.log("Iniciando el juego");
      partida=new Juego();
      partida.baraja=[...palo,...palo,...palo,...palo];
      barajar();
      partida.inicio=true;
      document.querySelector("#btnCarta").addEventListener("click", pedirCarta);
      document.querySelector("#btnTerminar").addEventListener("click", terminarPartida);

  }
};

const barajar=()=>{
  console.log("Barajando...");
  if (partida!=undefined){
      partida.baraja = partida.baraja.sort(function () {
        //Mismas posibilidades de que salga un número positivo y negativo.
        return Math.random() - 0.5
        
      });
      console.log(partida.baraja);
  }
};

const pedirCarta=()=>{
  let carta=document.createElement("div");
  carta.classList.add("carta");
  let valor=partida.baraja.pop();

  if (isNaN(valor)){
    partida.cuenta+=0.5;
  } else{
    partida.cuenta+=valor;
  }
  carta.textContent=valor;
  document.getElementById("tapete").appendChild(carta);

  if (partida.cuenta>7.5){
    console.log("has perdido");
    document.getElementById("btnCarta").removeEventListener("click",pedirCarta);
    document.getElementById("btnTerminar").removeEventListener("click",terminarPartida);
    partida.inicio=false;
  }else if(partida.cuenta==7.5){
    console.log("has GANADO");
    document.getElementById("btnCarta").removeEventListener("click",pedirCarta);
    document.getElementById("btnTerminar").removeEventListener("click",terminarPartida);
    partida.inicio=false;
   
  }

  console.log(partida.baraja);
  console.log("cuenta:"+partida.cuenta);
  
};

const limpiarTapete=()=>{
  let tapete=document.querySelector("#tapete");
  console.log("tapete:"+tapete.children.length);
  if (tapete!=null){
    while(tapete.firstChild){
      tapete.removeChild(tapete.firstChild);
    }
  }
}

const terminarPartida=()=>{
  if (partida.cuenta<6){
    
    mensaje("No puedes terminar la partida con menos de 6 puntos","warning");
   // console.log("No puedes terminar la partida con menos de 6 puntos");
  }else{
    console.log("Has conseguido un total de "+partida.cuenta+" puntos");
    partida.inicio=false;
    partida.cuenta=0;
    limpiarTapete();
    document.getElementById("btnCarta").removeEventListener("click",pedirCarta);
    document.getElementById("btnTerminar").removeEventListener("click",terminarPartida);
  }

  
};

const mensaje=(texto, icono)=>{
  Swal.fire({
    position: 'bottom-end',
    icon:icono,
    title: texto,
    showConfirmButton: false,
    timer: 2500
  })
}