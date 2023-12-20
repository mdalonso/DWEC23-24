"use strict"
/**Al igual que en JS nativo utilizábamos el evento DOMContentLoaded para comprobar que el DOM
 * estuviera cargado, con JQuery utilizaremos el método ready().
 * Ready() es un método que se ejecuta cuando tanto el DOM como la librería JQuery están completamente
 * cargadas.
 */
//Se invoca al método Ready() del document
$(()=>{
   
    //establecer evento al submit del formulario
    $("#frmFirst").on("submit", validar);
    //establecer evento click al botón cancelr
    $("#cancelar").on("click", limpiar);
    //establecer el evento blur para comprobar que edad sea >=18
    $("#edad").on("blur", comprobarEdad);
    activarCaptcha();
})


const activarCaptcha=()=>{
    grecaptcha.ready(function() {
        grecaptcha.execute('6LecRTEpAAAAACs2Qcq_YO4YGFixO2zKNxYdyuSt', {action: 'submit'}).then(function(token) {
            console.log({token});
            $("#recaptcha").attr("value",token);
        });
      });
}


const validar=(evento)=>{
    //Es necesario pasar el evento como parámetro ya que tendremos que hacer referencia a él
    //para anular el envío.

  //Programamos funciones para que validen los objetos del formulario, uno para los inputs 
  //y otra para los radiobuttons
   const inputs=validarInputs();
   const radios=validarRadio();

   console.log({inputs});
   console.log(radios);
   
   //Si no se ha producido ningún error...
   if (!inputs && !radios){
    
    //...Mostramos el spinner con el método show (aún no ha sido visto en clase)
    $("#spinner").show();
    $("#exito").text("Datos enviados");
    setTimeout(() => {
        $("#spinner").hide();
        $("#exito").text("");
        limpiar();
    }, 3000);
   }
   
   //Evitamos el evento por defecto (envío)
   evento.preventDefault();
   
}

const limpiar=()=>{
  //Sin JQuery deberíamos seleccionar los elementos utilizando por ejemplo getElementsByName y 
  //recorrer las colecciones que devuelve para vaciar su contenido.
    //const inputText=document.getElementsByName("texto");
    //const spanErrores=document.getElementsByName("error");
    //const radios=document.getElementsByName("tipo");
     
    //Con JQuery podemos hacer lo mismo con muy pocas sentencias

    //limpiar los inputs
     $(".controls").val("");

     //limpiar los span de error.
     $(".error").text("");
    
    //limpiar los radio
    $(".radio").prop("checked", false);
    
    //establecer el foco en el input de nombre para empezar de nuevo
    $("#nombre").focus();
}

const comprobarEdad=function(evento){
    //comprobar que sea mayor de edad

   //this hace referencia al objeto sobre el que se dispara el evento, en este caso el input
   //de la edad.
    if($(this).val()<18){
       $("#erredad").text("La edad debe ser mayor o igual a 18 años");
       this.focus(); //establecer el foco (cuidado que esto obliga a poner un valor correcto sí o sí)
    }else{
        $("#erredad").text("");
    }
}

const validarInputs=function(){
    //La función devolverá verdadero o falso en función del resultado de la validación.
    //La validación de ejemplo sólo consistirá en que los campos no estén vacío.
    
    //Inicialmente daremos por hecho que no va a haber ningún error.
    let valErrores=false;

   //Seleccionamos todos los objetos de la clase .controls (los inputs y el select)
   //Con la función each podemos recorrer la colección de esos elementos para comprobar si
   //están vacíos.
    $(".controls").each((index,elemento)=>{
        //Si el atribute Value del elemento está vacío... 
        if($(elemento).val()==""){
            //...en el span correspondiente se mostrará el texto "El campo es requerido"...
           $(`#err${elemento.id}`).text("El campo es requerido");
            //...y valErrores será true porque ha fallado la validación.
           valErrores=true;
        //Si no está vacío, se elimina el contenido del span correspondiente por si anteriormente
        //se hubiera mostrado un mensaje de error y este hubiera sido subsanado por el usuario.  
        }else{
            $(`#err${elemento.id}`).text("");
        }
     })
              
    //Devolvemos valErrores
   return valErrores 
}

const validarRadio=function(){
    //En este caso consideraremos que por defecto sí que se va a producir un error ya que 
    //cuando la página se carga, los dos radiobutton están vacíos por defecto.

    //seleccionar todos los objetos cuyo atributo name sea texto
   let error=true;

   //Selecciona todos los elementos de la clase .radio que cumplen con el selector :checked
   //is() devuelve true si existe que responda al selector dado como parámetro y false
   //en caso contrario.
   //si es true, es que hay algún elemento de la clase radio que está checked...
   if ($(".radio").is(':checked')){ 
        //...en cuyo caso el span de error correspondiente se elimina por si tuviera contenido
        //asociado a errores previos que hubiera subsanado el usuario...
        $("#errtipo").text("");
        //... se establece que no hay errores.
        error=false
    }else  {
    //Si es false, es que no seha seleccionado ningún radio.
        $("#errtipo").text("El campo es requerido")
    }
   
    return error; //si no hay errores devuelve false
}