"use strict"
/**
 * ESTABLECIMIENTO DE VARIOS EVENTOS DE RATÓN
 * Pertenecen a la clase MouseEvent, la cual hereda de Event
 * 
 * - mouseover: meter el cursor del ratón dentro del área del objeto
 * - mouseout: sacar el cursor del ratón fuera del área del objeto
 * - click: hacer click en el objeto.
 * - mousedown: mantener el botón pulsado.
 * - mouseup: soltar el botón pulsado previamente
 * - mousemove: mover el ratón sobre el objeto
 */
//Asociaremos los eventos a los objetos una vez se haya cargado el documento (Evento DOMContentLoaded)

//establecer el evento de carga del DOM
let pintar=false;

window.addEventListener("DOMContentLoaded", ()=>{
    establecerEvent()
})

//La siguiente función es la que asocia los eventos a los componentes
const establecerEvent=()=>{
    //Los eventos van a ser establecidos sobre los campos de texto (INPUT)
    const elementosInput =document.getElementsByTagName("input")
    //Recorremos la lista de elementos de tipo INPUT, que en este caso son 2.
    for (const element of elementosInput) {
        //Cuando metamos el cursor en el área del campo de texto, el fondo cambiará de color.
        element.addEventListener("mouseover",function(){
            this.style.background="#608ae5";
        })
        //Cuando saquemos el cursor del área del campo de texto, el fondo volverá al valor por defecto.
        //establecer evento salida al input de nombre
        element.addEventListener("mouseout",function(){
            this.style.background="";
        })
        //Cuando hagamos click en el área del campo de texto, el fondo cambiará de color a verde
        element.addEventListener("click",function(){
            this.style.background="green";
        })
        //establecer el evento mousedown
        
        //Podemos combinar varios eventos estableciendo condicionoes en unos sobre 0tros
        // Por ejemplo, su se mueve el ratón mientas se mantiene el click, que el fondo del
        //campo de texto se ponga rojo.

        //Cuando mantengamos el botón izquierdo del ratón pulsado sobre la caja de texto
        //estableceremos ciertas condiciones que van a condicionar el evento del movimiento de ratón
        //En este caso, pasamos como parámetro a la función el evento que lo lanza para poder
        //examinar algunas de sus propiedades. El evento es un MouseEvent
        element.addEventListener("mousedown", function(evento) {
            console.log(evento);
            //buttons es una propiedad de MouseEvent que devuelve los botones que se han pulsado
            if (evento.buttons==1){ //botón izquierdo
              pintar=true;//Establecemos a true la variable que establece la condición  
              color=this.style.background  ; //guardar el color que tiene  
           }
        }) 
        //Cuando suelto el botón del ratón, desaparece a condición
        element.addEventListener("mouseup", function(event) {
              pintar=false;    
        }) 
        element.addEventListener("mousemove", function() {
            //Si mientras el ratón se está moviendo, a la vez está pulsado el botón izquirdo (pintar=true)
            if(pintar) { //pinta cuando el ratón se mueve y el botón pulsado es el izquierdo
                this.style.background="red"
            }       
                
         
      }) 
    }
        
    
    
}