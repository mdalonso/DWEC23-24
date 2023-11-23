"use strict"
/**
 * En este ejemplo se ilustra la validación de un formulario con elementos
 * de diferente tipo.
 * 
 * La validación se puede realizar en diferentes momentos (no excluyentes):
 * - Al introducir información en los elementos del formulario.
 * - En el envío del formulario (submit)
 * 
 * Otro evento de formulario que se utiliza habitualmente es el reset (limpiar el formulario)
 * Objetos de tipo button <button></button>: Este tipo de objetos tiene una propiedad type que
 * puede tomar el valor button, submit (por defecto) y reset.
 * - El valor reset, hace que el botón invoque al evento reset que limpia el formulario.
 * - El valor submit, lanza el evento de envío del formulario.
 * 
 */
window.addEventListener("DOMContentLoaded",()=>{
    const formulario=document.getElementById("frmFirst");
    const edad=document.getElementById("edad");
    
    //establecer evento al submit del formulario
    //Validamos la información en el submit
    formulario.addEventListener("submit", validar);
    //establecer evento al reset del formulario
    formulario.addEventListener("reset", limpiar);
    //establecer el evento blur para comprobar que edad sea >=18
    //Se valida la información tras su introducción en el elemento html, en este caso al perder el foco
    edad.addEventListener("blur", comprobarEdad) 
})

const validar=(evento)=>{
   //anular envío (el formulario no tiene asociado un servidor donde enviar los datos y dará error si no lo anulamos)
   evento.preventDefault();
   const inputs=validarInputs();
   const radios=validarRadio();
   
   //Se simulará que los datos se están enviando mediante el uso de un timer de 3 segundos.
   //Durante esos 3 segundos se mostrará la animación del spinner y se mostrará el mensaje "envio de datos"
   if (!inputs && !radios){  //si las dos constantes están a false, no hay errores (ver funcionamiento de las validaciones)
        //mostrar spinner
        const spinner=document.getElementById("spinner");
        let exito= document.getElementById("exito");

        //mostrar
        spinner.style.display="block";
        exito.innerText="Envío de datos";
        //Limpiar el spinner a los 3 segundos
        const reloj=setTimeout(() => {
                spinner.style.display="none"
                exito.innerText=""
        }, 3000);
       
        //pasar el foco a nombre
        document.getElementById("nombre").focus();
   }

}

const limpiar=()=>{
//Se limpia el formulario para empezar de nuevo.    
    const inputText=document.getElementsByName("texto");//Estos elementos se limpian automáticamente en el evento reset
    const spanErrores=document.getElementsByName("error");
    const radios=document.getElementsByName("tipo");//Estos elementos se limpian automáticamente en el evento reset
    inputText.forEach(elemento=>{
        elemento.value=""
    })
    //Se limpian todas las etiquetas de error (span)
    spanErrores.forEach(elemento=>{
        elemento.innerText=""
    })
    radios.forEach(elemento=>{
        elemento.checked=false
    })
     //pasar el foco a nombre
     document.getElementById("nombre").focus();
     
}

const comprobarEdad=function(evento){
    //comprobar que sea mayor de edad
    const error=document.getElementById("erredad")
    if(this.value<18){
       error.innerText="La edad debe ser mayor o igual a 18 años"
       //this representa a la caja de texto a la cual se está asociando el evento
       this.focus(); //establecer el foco
    }else{
        error.innerText="";
    }
}

const validarInputs=function(){
    //la variable contErrores controla la existencia de errores en el formulario.
    //Se considera que hay un error si hay campos vacíos.
    let contErrores=false;
    //seleccionar todos los objetos cuyo atributo name sea texto () (nombre, edad, fecha y provincia)
    const inputText=document.getElementsByName("texto")
    //Recorremos el conjunto de esos objetos con un for-of
    for (let elemento of inputText){
        //Accedemos al span de error asociado al elemento para escribir en él o limpiarlo
        const error=document.getElementById(`err${elemento.id}`)
        //Si la caja de texto está vacía, hay un error + se muestra el mensaje de error en el span correspondiente
        if(elemento.value=="" ){
            error.innerText="El campo es requerido";
            contErrores=true
        //Si no está vacío pero se trata de la edad y ésta es menor de 18 años, también se produce un error
        }else if (elemento.id =="edad" && elemento.value<18){
            error.innerText="La edad debe ser mayor a 18 años";
            contErrores=true;
        }else{
            //Si no hay errores se limpia el span correspondiente
            //esto es necesario por si se escribió algo en él previamente
             error.innerText="";
        }
    }
    return contErrores //retorna true si hay errores y false si está correcto
}

const validarRadio=function(){
    //Se selecciona todos los radiobuttons a través de la propiedad name (todos ellos tienen asignado "tipo")
    const radios=document.getElementsByName("tipo")
    //También se selecciona el span de error correspondiente
    const errorTexto=document.getElementById(`errtipo`);
    //Inicialmente consideramos que puede haber un error ya que los dos radiobutton están sin marcar
    let error=true;
    //Se recorren todos los radiobutton con un foreach, por ejemplo
    radios.forEach(elemento=>{
        if(elemento.checked){
            //Si hay alguno marcado ya no hay error
            error=false;
        }
          
    })
    //Se comprueba si ha habido error para mostrar el mensaje en el span correspndiente.
    if (!error){
        errorTexto.innerText=""
    }else  {
        errorTexto.innerText="El campo es requerido"
    }
   return error
}