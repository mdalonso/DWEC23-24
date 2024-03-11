"use strict";

window.addEventListener("DOMContentLoaded", () => {
  
  confFormulario()
  activarCaptcha();
});
const confFormulario = () => {
  /**
   * Crear una nueva restricción al formulario
   */

  //OBJETO validator.
  //=================================
  //Creación de reglas de validación personalizadas:
  // Para crear una regla de validación personalizada es necesario definir un método de validación añadiendo este método
  //al objeto VALIDATOR mediante el uso del método addMethod.
  // ADDMETHOD recibe como parámetros el nombre del método y una función que implementa la lógica de validación.
  // Esa función que implementa la lógica de validación recibe a su vez 3 parámetros:
  //  - valor que se va a validar. Este parámetro se recibe automáticamente. 
  //  - elemento que se está validando (el que contiene el valor a validar). Este parámetro se recibe automáticamente.
  //  - parámetros que requiere la función. Este parámetro se envía a la función cuando se asocia una regla de validación al
  //    método personalizado. Este parámetro es opcional.

  //En este caso, el método personalizado se llama "regex". Este nombre será utilizado en la definición de la regla
  //  de validación en la opción rules del método validate. Por otro lado, la función recibe como tercer parámetro una 
  //  cadena que contiene la expresión regular que se va a utilizar para validar.
  $.validator.addMethod("regex", function (value, element, regexp) {
    const re = new RegExp(regexp);
    //this representa al objeto validator, que es el que llama a la función de validación
    //La función que implementa la validación devuelve true si el elemento 
    // sobre el que se está realizando la validación es opcional o
    //si el resultado de la aplicación de la expresión regular al valor introducido en el campo es true (encaja con 
    //la expresión regular)
    //(optional es un método del objeto validate que permite determinar si un campo tiene la opción REQUIRED a true)
    return this.optional(element) || re.test(value);
  });

  //Método VALIDATE:
  //======================================================================
  //el método validate se aplica sobre un formulario, en nuestro caso el formulario con id frmFirst el cual se localiza
  //utilizando su ID como selector.
  $("#frmFirst").validate({
    //OPCIONES DEL MÉTODO validate:

    //errorElement: Permite determinar el tipo de elemento que va a ser utilizado para crear mensajes de error.
    //En este caso se va a utilizar la etiqueta <em></em>, que permite enfatizar texto.
    errorElement: "em",

    //errorPlacement: Consiste en una función que se encargará de colocar los mensajes
    //de error en el lugar adecuado del formulario.
    //Esta función recibe dos parámetros:
    //  - error: el elemento que se crea al producirse el error en la validación (en nuestro caso un em)
    //  - element: el elemento en el que se produce el error
    errorPlacement: function (error, element) {

      //Se añadirá la clase "invalid-feedback" de bootstrap al elemento que se crea para mostrar el error
      error.addClass("invalid-feedback");

      //Si el tipo del elemento en el que se ha producido el error es un "radio" (hay 2, los correspondientes
      //a profesor o estudiante)...
      if (element.prop("type") === "radio") {
        //...el elemento de error se insertará despues del padre del radiobutton.
        //elemento es el radio que ha generado el error. 
        //Esto se hace así porque los dos radios están dentro de una capa para poder ponerlos en paralelo.
        error.insertAfter(element.parent());
      } else {
        //..Si no se trta de un radio, se insertará después del elemento que ha generado el error.
        error.insertAfter(element);
      }
    },

    //HIGHLIGHT: Consiste en una función que establece la manera en la que se va a resaltar el campo que ha
    //generado el error.
    //En este caso lo que se hace es añadir la clase "is-invalid" y eliminarlo de la clase "is-valid"
    //Ambas son clases de bootstrap.
      highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }, 
    //Podemos hacer el resaltado como queramos. Aquí se muestra otro ejemplo (descomentar para probarlo).
    /* highlight: function(element, errorClass) {
      $(element).fadeOut(function() {
        $(element).fadeIn();
      });}, */

    //UNHIGHLIGHT: Permite revertir los cambios hechos por la opción highlight.
    //Esto es necesario porque si inicialmente se produce error en un campo y posteriormente
    //el usuario solventa este error, es necesario dejar de resaltar el campo en cuestión si es que
    //se había resaltado previamente. Obviamente, si no se ha utilizado la opción highlight, no será necesario tampoco
    //utilizar la función unhighlight
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },

    //RULES: Define las reglas de validación sobre cada campo del formulario
    //El conjunto de reglas conforman un objeto JS del tipo {campo:regla,campo:regla...}
    //Las reglas pueden ser simples (una sola regla) o compuestas (varias reglas asociadas al mismo campo).
    //En el caso de ser reglas compuestas, se expresan también como un objeto JS.
    //Los campos se identifican por el name, no por el id.
    //si no se cumple alguna de las reglas, se generará un elemento de error que se ubicará en el lugar correspondiente
    rules: {
      //para el campo NOMBRE se establecen las siguientes reglas:
      //  -required: Indica que el campo es obligatorio si se pone a true
      // - regex: Las reglas, también puede ser personalizadas mediante la definición de métodos de validación propios.
            //Para ello hay que añadir ese método de validación al objeto validation (Ver addMethod más arriba)
            //El nombre de la regla será el nombre definido para el método de validación en el addMethod y el valor
            //establecido en la regla se pasará a la función que implementa la lógica de validación como 3º parámetro.
      nombre: {
        required: true,
        //La expresión regular dice que el nombre tiene que empezar por una letra mayúscula, contener un espacio y tener una
        //longitud de entre 4 y 35 caracteres.
        regex: /^[A-ZÁ-Ú][A-Za-z\sñá-úÁ-Ú]{4,35}$/,
      },

      //para el campo EDAD se establecen las siguientes reglas:
      //  - required: campo obligatorio.
      //  - Longitud máxima de 3 dígitos.
      //  - Tiene que ser información numérica
      //  - El valor mínimo tiene que ser 18
      edad: {
        required: true,
        maxlength: 3,
        number: true,
        min: 18,
      },

      //para el campo FECHA se establecen las siguientes reglas:
      //  - Campo obligatorio (required)
      //  - Sólo admite información de tipo fecha (date=true)
      fecha: {
        required: true,
        date: true,
      },

      //Reglas de validación para el campo TIPO.
      //Como en este caso sólo se establece una regla, no es necesario construirlas utilizando la sintaxis de objeto JS
      //sino que se simplifica poniendo simpremente "required". Esto equivaldría a 
                                                                                  /* tipo:{
                                                                                    required:true
                                                                                   }, */
      //Hay que observar que, en este caso, TIPO no se refiere a un único elemento del documento sino a los dos radios.
      //Como ambos forman un grupo, se comprueba que haya al menos uno marcado.
      tipo: "required",

      //Reglas de validación para el campo PROVICIA
      //Igual que en el caso anterior sólo se establece una regla, no es necesario construirlas utilizando la sintaxis de objeto JS
      //sino que se simplifica poniendo simpremente "required". Esto equivaldría a 
                                                                                  /* provincia:{
                                                                                    required:true
                                                                                   }, */
      provincia: "required",
    },
    
    //MESSAGES: Define mensajes personalizados para cada una de las reglas de validación que se aplican sobre los diferentes
    //elementos del formulario.
    //En este caso, se define el mensaje "El nombre del usuario debe estar relleno" que se mostrará cuando no se cumpla
    //la regla de required (campo obligatorio) para el campo NOMBRE.
    //Asímismo, se define el mensaje "Forma del campo erróneo" para que se muestre cuando el valor introducido en el campo
    //NOMBRE no cumpla con el método de validación regex (recordamos que este método comprueba si el valor introducido
    //cumple con una determinada expresión regular)
    messages: {
      nombre: {
        required: "El nombre del usuario debe estar relleno",
        regex: "Formato del campo erróneo",
      },
      
      //Para probar la personalización del mensaje para la edad mínima podemos comentar las siguientes líneas
      //para ver cuál es el mensaje por defecto
      edad:{
        min: "Debe tener al menos 18 años"
      }

    },

    //SUBMITHANDLER: Define un manejador que se ejecutará cuando no se produzcan errores en la validación del
    //formulario, sustituyendo al submit por defecto del botón "Enviar".
    //El manejador recibe como parámetros de entrada el formulario y el propio evento submit.
    submitHandler: (form) => {
      //En este caso, el manejador llama al método enviar() que está definido más abajo.
      enviar();
    },
  });
};
const activarCaptcha = () => {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LeUMpApAAAAANAfkFTrk-PTIc-x0FrHSwcLSFkY", { action: "submit" })
      .then(function (token) {
        console.log({ token });
        document.getElementById("recaptcha").value = token;
      });
  });
};

//Método ENVIAR: simula el envío del formulario.
//En este método es donde se debería hacer la solicitud al servidor para enviar los datos y que éste los
//gestionara como se necesitara.
const enviar = () => { 
  let exito=document.getElementById("exito");
  exito.innerText="El formulario se ha enviado con éxito";

  setTimeout(() => {
    exito.innerText = "";
    limpiar();
  }, 3000); 
  
};


//Se limpia el formulario para empezar de nuevo con un nuevo registro
const limpiar = () => {

  const inputText = document.getElementsByTagName("input");
  console.log(inputText);
    for (let ele of inputText){
    ele.value="";
  }  

  const radios = document.getElementsByName("tipo");
  //limpiar los inputs
  /*   inputText.forEach((elemento,ind) => {
    elemento.value = "";
  });   */
  
  //limpiar los checked
  radios.forEach((elemento) => {
    elemento.checked = false;
  });

  //document.querySelector("option:first-child").setAttribute("selected");
//  getElementsByTagName("option").setAttribute("selected",true);
  //establecer el foco en el input de nombre
  document.getElementById("nombre").focus();
};
