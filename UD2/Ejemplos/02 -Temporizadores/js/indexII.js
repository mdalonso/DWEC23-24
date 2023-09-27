"use strict"; //Obligatorio declarar variables y constantes
//setTimeout (sólo repite la acción una vez)
let ventana= open("", "ventana", "height=200,width=200");
let intervalo;

//crear funciones
function comenzar() {
  //pasar el foco a la ventana secundaria
  ventana.focus();
  //crear temporizador
  intervalo=setTimeout(color,500);
  
}
function color(){
  if(ventana.document.body.bgColor=="red"){
    ventana.document.body.bgColor="green";
  }else{
    ventana.document.body.bgColor="red";
  }
  
}
function parar() {
  //parar
  clearTimeout(intervalo);
  //pasar el foco a la ventana secundaria
  ventana.focus();
}
