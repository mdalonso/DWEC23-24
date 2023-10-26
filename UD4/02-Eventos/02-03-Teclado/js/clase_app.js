"use strict"
/**
 * Este ejemplo ilustra la captura de diferentes eventos de teclado sobre los objetos de un
 * formulario.
 * Los eventos de teclado pertenecen a la clase KeyBoardEvent, la cual hereda de Event
 * - keydown: Se lanza cuando se pulsa cualquier tecla independientemente de que esa pulsación
 *              produzca un caracter o no.
 * - keypress (Deprecated): Se lanza al pulsar una tecla que devuelve un carácter alfanumérico o el espacio.
 *              Distingue entre mayúsculas y minúsculas Por ejempo code(a)=97 y code (A)=65. KeyDown y Keyup
 *              no distinguen por lo que hay que controlar si también se ha pulsado shift a la vez
 *              mediante las propiedades del evento.
 * - keyup: Sede lanza cuando se suelta una tecla (es el opuesto a keydown)
 * - input: Se lanza cuando se produce un cambio en el contenido del objeto (no todas las teclas producen cambios)
 */

window.addEventListener("DOMContentLoaded", ()=>{
    establecerEvent();
})
const establecerEvent=()=>{
    //Se localizan todos los elementos INPUT para asociarles los evento a todos ellos.
    //***Evento KEYDOWN:
    const elementosInput =document.getElementsByTagName("input")
    for (const element of elementosInput) {
        //al pulsar una tecla se imprime por consola el contenido del elemento
        element.addEventListener("keydown",function(event){
            console.log(`keydown->  ${element.value}`);
            //Vemos el objeto evento que ha sido lanzado con todas sus propiedades.
            //En estas propiedades podemos ver key, que devuelve el valor de carácter de
            //la tecla que ha sido pulsada y el código interno que utiliza js para 
            //identificar a la tecla (puede variar entre navegadores y plataformas), entre otras.
        })

        //***Evento KEYPRESS (Deprecated debido a que no funciona para las teclas que no devuelven
        // un carácter)
        //establecer evento salida al input de nombre
        element.addEventListener("keypress",function(event){
            console.log(`keypress -> ${element.value}`);
            console.log(event);
            
            //Se pueden hacer uso de las propiedades del evento para limitar la entrada de datos
            //(válido también para keydown)
            //El siguiente código solo permite letras y espacios en blanco
            //Todas las teclas de carácter tienen un código que empieza con 'Key' y 'Space'
            //es el código de la tecla espacio.
            //En el caso de que no se pulse una tecla Key o Space, el evento se cancela
            //(Quitar comentarios para probarlo)
             if (event.code.slice(0,3)!='Key' && event.code!='Space'){
                 event.preventDefault()
             }
            
            //El siguiente código sólo permite números
            //(Quitr comentarios para probarlo)
            // if (event.code.slice(0,5)!='Digit'){
            //     event.preventDefault()
            // }
        })
        //***Evento KEYUP: Cuando se suelta una tecla
        element.addEventListener("keyup",function(event){
            console.log(`keyup -> ${element.value}` );
            console.log(event);
        })
        //***Evento INPUT: se produce un cambio en el input text
        //Por ejemplo: pulsar una tilde no produce un cambio en el contenido y por tanto no se
        //lanza este evento (lo mismo con la tecla Scape y otras)
        element.addEventListener("input",function(event){
            console.log(`input ->  ${element.value}` );
            console.log(event);
            
        })
        
    }
        
    
    
}