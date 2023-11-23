"use strict"

window.addEventListener("DOMContentLoaded",()=>{
    const formulario=document.getElementById("frmFirst");
    const edad=document.getElementById("edad");
    //establecer evento al submit del formulario
    formulario.addEventListener("submit", validar);
    //establecer evento al reset del formulario
    formulario.addEventListener("reset", limpiar);
    //establecer el evento blur para comprobar que edad sea >=18
    edad.addEventListener("blur", comprobarEdad);

        //implementar frecaptcha
        /*grecaptcha.ready(function() {
            grecaptcha.execute('6LfsP90oAAAAAMBv6Pt2vaRIJGe-wKAQz6iHOI1Y', {action: 'submit'}).then(function(token) {
            document.getElementById("recaptcha").value=token;
                console.log(token);
            });
          });*/

   
})
const validar=(evento)=>{
   //anular envío
   evento.preventDefault();
   const inputs=validarInputs();
   const radios=validarRadio();
   if (!inputs && !radios){  //si las dos constantes están a false, no hay errores
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
        
        //llamada grecaptch
    //implementar frecaptcha
    //grecaptcha ejecutado en el navegador recibe la clave de sitio web.
    //action puede contener cualquier cadena descriptiva de la acción que se está verificando con el fin de
    //que las estadísticas de recaptcha puedan monitorizar el uso de la api y las acciones en las que se
    //realiza la verificación más frecuentemente.
    grecaptcha.ready(function() {
        grecaptcha.execute('6LfsP90oAAAAAMBv6Pt2vaRIJGe-wKAQz6iHOI1Y', {action: 'submit'}).then(function(token) {
            //recaptcha devuelve un token demostrando que el usuario ha completado la verificación con éxito.
            //Este token puede ser posteriormente enviado al servidor.
            //En este fragmento de código se incluirían las acciones a realizar para el envío al servidor.
            //En este caso, como no hay servidor al que enviar, simplemente mostraremos el token en un elemento oculto
            //en el html
            document.getElementById("recaptcha").value=token;
            console.log(token);
        });
      });
        

   }

}
const limpiar=()=>{
    
    const inputText=document.getElementsByName("texto");
    const spanErrores=document.getElementsByName("error");
    const radios=document.getElementsByName("tipo");
    inputText.forEach(elemento=>{
        elemento.value=""
    })
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
       this.focus(); //establecer el foco
    }else{
        error.innerText="";
    }
     //implementar frecaptcha
   
      grecaptcha.ready(function() {
        grecaptcha.execute('6LfsP90oAAAAAMBv6Pt2vaRIJGe-wKAQz6iHOI1Y', {action: 'validación'}).then(function(token) {
            //recaptcha devuelve un token demostrando que el usuario ha completado la verificación con éxito.
            //Este token puede ser posteriormente enviado al servidor.
            //En este fragmento de código se incluirían las acciones a realizar para el envío al servidor.
            //En este caso, como no hay servidor al que enviar, simplemente mostraremos el token en un elemento oculto
            //en el html
            document.getElementById("recaptcha").value=token;
            console.log(token);
        });
      });
}
const validarInputs=function(){
    let contErrores=false;
    //seleccionar todos los objetos cuyo atributo name sea texto
    const inputText=document.getElementsByName("texto")
    for (let elemento of inputText){
       
        const error=document.getElementById(`err${elemento.id}`)
    
     if(elemento.value=="" ){
        error.innerText="El campo es requerido";
        contErrores=true
       
     }else if (elemento.id =="edad" && elemento.value<18){
        contErrores=true;
     }else{
         error.innerText="";
        
     }
    }
    return contErrores //retorna true si hay errores y false si está correcto
}
const validarRadio=function(){
    //seleccionar todos los objetos cuyo atributo name sea texto
    const radios=document.getElementsByName("tipo")
    const errorTexto=document.getElementById(`errtipo`);
    let error=true;
    radios.forEach(elemento=>{
            
        if(elemento.checked){
            error=false;
        }
          
    })
    if (!error){
        errorTexto.innerText=""
    }else  {
        errorTexto.innerText="El campo es requerido"
    }
   return error
    
}