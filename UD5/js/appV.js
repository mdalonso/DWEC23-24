"use strict"
document.addEventListener("DOMContentLoaded", ()=>{
//**********MODIFICACIÓN DE LOS ELEMENTOS DEL DOM*****************************
//Una vez localizamos el elemento, se pueden modificar sus propiedades mediante asignación =.

//(Para poder seguir el proceso de ejecución de este script hay que poner en comentarios a partir
//de la línea 18 e ir descomentando progresivamente.)

//Localizamos todos los elementos de tipo <h1></h1> dentro de un lemento de clase .contenido-hero
    const encabezado=document.querySelector(".contenido-hero h1");
    
    //Diferencias entre propiedades que muestran contenido de los elementos.
    console.log(encabezado.innerText); //Si en el css está invisible no lo encuentra. Muestra el texto tal cual aparece en el navegador.
    console.log(encabezado.textContent); //Si está invisible, lo encuentra. Muestra el texto sin formato
    console.log(encabezado.innerHTML); //se trae el código HTML

//Modificar el texto
    encabezado.innerHTML="<b>Nuevo Heading</b>";//Si quiero que interprete HTML hay que usar innerHTML

//cambiar una imagen
    //Localiza el primer elemento imagen dentro de un elemento de clase card ...
    //...y cambia su atributo src
    //En este caso es la imagen de la primera tarjeta del QUÉ HACER
    const imagen=document.querySelector(".card img").src="../assets/img/hacer2.jpg"
    
    //Localiza el segundo hijo de tipo <p></p> dentro de un elemento de clase info
    //En este caso es el texto Música Electrónica 2021
    const card=document.querySelector(".info p:nth-child(2)").textContent="ejemplo cambio"

//También se puede cambiar el estilo css mediante la propiedad style.
//Este método no debe utilizarse salvo que no podamos manejar los cambios utilizando las clases.
//cambiar el encabezado
    //Localizamos el primer elemento de tipo <h1></h1> (Encuentra hospedaje para tus próximas vacaciones/Nuevo Heading)
    const encabezadoII=document.querySelector("h1")
    console.log(encabezadoII);
    //Cambiamos su color de fondo
    encabezadoII.style.backgroundColor="red";
    //Cambiamos la fuente
    encabezadoII.style.fontFamily="Times";
    //Lo ponemos en mayúsculas
    encabezadoII.style.textTransform="uppercase";

//utilizando clase
    //Localizamos el primer elemento de clase .card
    const cardII=document.querySelector(".card");
    console.log(cardII);
    //classList muestra la lista de clases del elemento, como una colección.
    console.log(cardII.classList);
    //className devuelve una cadena con todas las clases
    console.log(cardII.className);

//Podemos añadir una clase mediante la manipulación de la classList.
//(si utilizara className, debería crear la cadena completa con la lista de clases.
//No podría añadir una sin más)
     cardII.classList.add("nuevaClase", "segundaClase");
     console.log(cardII.classList);
     console.log(cardII.className);

//También podemos eliminar clase mediante la manipulación de la classList
    cardII.classList.remove("nuevaClase");
    console.log(cardII.classList);
    console.log(cardII.className);
})
