"use strict"; //Obligatorio declarar variables y constantes

//averiguar las dimensiones del objeto screen.
//El objeto SCREEN pertenece al objeto WINDOW

document.write(`La resolución de la pantalla es ${screen.width}x${screen.height}`);


//averiguar idioma del navegador
console.log(navigator.language);
if(navigator.language=="es-ES"){
  alert('El idioma del navegador es español');
}else{
  alert('El idioma del navegador no está en español');
}

//mostrar SO y motores de HTML
document.write (`<br>El sistema operativo es ${navigator.userAgent}`);
