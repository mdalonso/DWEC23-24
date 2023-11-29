"use strict"
//Ejemplo de cambio dinámico de página
/**Primero examinamos el html y vemos que...
 * - Tenemos un footer que incluye 4 nav. Ese footer es de la clase .footer. Si nos vamos al css para ver el aspecto que
 *      se le da a esa clase podemos comprobar que tiene el bottom a -100%. Bottom es la distancia desde el borde exterior
 *      del margen inferior y el borde exterior del bloque contenedor. Un valor negativo, quiere decir que esa distancia
 *      sobrepasa hacia abajo los límites de la página. Al establecer -100%, se oculta totalmente (el porcentaje se calcula
 *      en relación a la altura del contenedor, en este caso del footer) Por este motivo el footer aparece oculto.
 * - Tenemos un <a></a> que es un enlace al propio footer de la clase btn_flotante. Esta clase hace que ese enlace tenga 
 *      aspecto de botón.
 * 
 * En este ejemplo lo que haremos será mostrar el footer al pulsar el enlace. Esto modificará el aspecto del enlace también.
 * Cuando se vuelva a pulsar el enlace se volverá a ocultar el footer.
 *  */

window.addEventListener("DOMContentLoaded",()=>{
    //Localizamos el footer utilizando el selector .footer
    const pie=document.querySelector(".footer");
    //Localizamos el enlace utilizando el selector .btn-flotante
    const btnFlotante=document.querySelector(".btn-flotante");
    
    
    //establecer evento al botón (enlace)
    btnFlotante.addEventListener("click",()=>{
    //    console.log("pulsar botón");
        //Si el footer contiene la clase activo quiere decir que se está mostrando y por tanto hay que ocultarlo.
        if(pie.classList.contains("activo")){ //averiguar si contiene una clase
            //Se elimina la clase activo con lo que vuelve a su aspecto original (bottom: -100%)
            pie.classList.remove("activo"); //eliminar clase

            //También se elimina la clase activo del enlace volviendo también a su aspecto original.
            btnFlotante.classList.remove("activo"); //eliminar clase
            
            //Restauramos el texto original
            btnFlotante.textContent="Idioma y moneda"
        }else{
            //Si no está activo (no encuentra la clase activo en su classList)
            //añade la clase para cambiar su apariencia.
            //Si vamos al css podemos comprobar que lo que hace la clase .activo cuando también es un .footer es
            //cambiar el bottom a 0, haciendo coincidir sus bordes inferiores y por tanto, mostándose el footer
            pie.classList.add("activo");//añadir clase

            //También añadimos la clase activo al botón para cambiar su apariencia (ver el css .btn-activo.activo)
            btnFlotante.classList.add("activo"); //añadir clase

            //Además, cambia el texto del botón
           btnFlotante.textContent="X Cerrar"
    }
                
    })
})