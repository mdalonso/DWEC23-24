"use strict";

//Importación de módulos externos
import { addCliente, deleteCliente, getClientes, getCliente, updateCliente } from "./API.js";
import { mensaje } from "./funciones.js";

//Variable que contiene el identificado del cliente en caso de que queramos actualizar o eliminar ese registro.
let id;

//Método Domcontentloaded: nos aseguramos de que toda la página esté correctamente cargada antes de realizar cualquier acción.
document.addEventListener("DOMContentLoaded", () => {
  //configurar formulario con restricciones utilizando JQuery Validator
  confFormulario(); 
  
  //cargar clientes en la tabla
  mostrarClientes(); 
  
  //Añade funcionalidad al botón Añadir Cliente del panel de navegación de la izquierda.
  document.querySelector(".addCliente").addEventListener("click", () => {
      //llamar a la ventana moda
      //modificar los textos
      //El botón Añadir Cliente muestra la ventana modal para la introducción de datos de un cliente en particular.
      //Por tanto, es necesario configurar esa ventana para que el usuario sepa que está AÑADIENDO
      //ya que es la misma ventana que se utiliza para modificar.
      document.querySelector(".modal-title").innerText="Añadir Cliente";
      document.querySelector(".submit").innerText="Insertar";
  
      $("#frmModal").modal("show");
  });
  //Cuando se oculte la ventana modal (evento hidden.bs.modal, se limpian todos sus campos
  $("#frmModal").on("hidden.bs.modal",()=>{
    $("input").val("");
  })
});

//MÉTODO CONFFORMULARIO: Configuración de jQuery Validator sobre la ventana modal para validación de datos.
const confFormulario = () => {
  //Localiza el formulario mediante su clase (Selector .frmCliente) y llama al método validate, que configuraremos a continuación
  $(".frmClientes").validate({
    //La opción errorElement indica el tipo de elemento html que se va a utilizar para mostrar el error de validación.
    errorElement: "em",
    //Opción errorPlacement: Recibe una función que permite ubicar el elemento que va a mostrar la información de error. En nuestro
    //caso, los objetos "em". Esa función recibe dos parámetros:
    //- error: que es el elemento que va a mostrar el error, en este caso un elemento de tipo em
    //- element: que es el elemento donde se produce el error.
    errorPlacement: function (error, element) {
        //añade la clase de bootstrap "invalid-feedback" al elemento de error.
        error.addClass("invalid-feedback");
        //Se añadirá el elemento de error justo después del elemento donde se produce dicho error.
        error.insertAfter(element);
      
/*        if (element.prop("type") === "radio") {
        error.insertAfter(element.parent("div"));
      } else {
        error.insertAfter(element);
      }*/
    },
    //Opción highlight: Ejecuta una función cuyo objetivo es resaltar el elemento donde se produce el error de forma visual.
    //Esa función recibe 3 parámetros:
    //- element: elemento donde se produce el error.
    //- errorClass: opción que permite definir qué clase se asignará a los elementos cuando se produzca un error.
    //- validClass: opción que permite definir qué clase se asignará a los elementos cuando la validación sea OK
    //En esta función no se hace uso de errorClass y validClass pero podríamos sustituir is-invalid e is-valid por una
    //y otra respectivamente. Para ello habría que definir previamente la opción errorClass:"is-invalid" y validClass:"is-valid"
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    //Opción unhightlight: Ejecuta una función cuyo objetivo es NO RESALTAR el elemento cuando la validación ha sido OK y previamente
    //se dio un error de validación que el usuario ha solucionado.
    //Mismos parámetros que highlight.
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },

    //Opción rules: Definición de reglas de validación.
    rules: {
      //MUY IMPORTANTE: LA REFERENCIA A LOS CAMPOS DEL FORMULARIO SE HACE A TRAVÉS DE LA PROPIEDAD NAME, NOOOOOO DEL ID.
      //Regla 1: Indica que el campo nameCliente es obligatorio
      nameCliente: "required",
      
      //Regla 2: Indica que el campo emailCliente es requerido y además debe ajustarse al formato de un email (contener la @ y un . etc)
      emailCliente: {
        required: true,
        email: true,
      },
      
      //Regla 3: Indica que el campo tlfnoCliete es requerido y además debe tener una longitud mínima de 9 cifras.
      tlfnoCliente: {
        required: true,
        minlength: 9,
      },
      
      //Regla 4: Indica que el campo empresaCliente es obligatorio.
      empresaCliente: "required",
    },
    //Opción SubmitHandler: Define una función que será invocada en el evento submit del formulario.
    //HAbitualmente el evento submit se dispara al pulsar un botón de tipo submit.
    //Esa función recibe como parámetro de entrada el propio formulario (form)
    submitHandler: (form) => {
      //En nuestro caso, si el botón de tipo submit contiene el texto Insertar, es porque se está añadiendo un nuevo cliente
      //por tanto, se invoca al método add() el cual hará uso del método addCliente de la API.
      if(document.querySelector(".submit").innerText=="Insertar"){
        add(); //añadir cliente
      }else{
      //Si el texto no es Insertar, es porque estamos actualizando un cliente que ya existía.
        //En ese caso invocamos al método grabarActCliente que hará uso del método updateCliente de la API.
        grabarActCliente();//actualizar cliente
      }
     
    },
  });
};

//MÉTODO ADD: Hacer uso del método addCliente de la API, por lo que previamente debe preparar la información
//que recibe ese método.
const add = async () => {
  //El método addCliente recibe un objeto JSON, por tanto debemos construir ese objeto que pasaremos como parámetro
  //  Ese objeto se construye utilizando la información contenida en los campos del formulario.
  let cliente={
    nameCliente:document.querySelector("#nameCliente").value,
    emailCliente:document.querySelector("#emailCliente").value,
    tlfnoCliente:document.querySelector("#tlfnoCliente").value,
    empresaCliente:document.querySelector("#empresaCliente").value
  }
  console.log(cliente);
  
  //llamar la API de addCliente
  const data = await addCliente(cliente);

  //limpiar formulario para prepararlo para otra posible operación
  $("input").val("");
  //cerrar el formulario
  $("#frmModal").modal("hide");
  
  //Se comprueba el valor devuelto por el mátodo addCliente para gestionar la retroinformación al usuario.
  //mostrar el mensaje
  //addCliente devuelve un objeto que contiene un único campo de tipo cadena con un mensaje.
  //Si ese mensaje es "insertado", la opción se ha realizado con éxito.
  if (data.mensaje == "insertado") {
      //Se muestra un mensaje al usuario
    mensaje("Cliente grabado", "success");
      //Se actualiza el listado de clientes en el dashboard
    mostrarClientes();
  } else {
    //Si el mensaje es otro, es que no se ha podido insertar el cliente.
    mensaje("Cliente NO grabado", "error");
  }
};


const mostrarClientes = async () => {
  const botAcc = `<button type='button' class='edit btn btn-success'><i class="fa-regular fa-pen-to-square"></i></button><button type='button' class='del btn btn-danger ms-2'><i class="fa-solid fa-trash"></i></button>`;
  //vaciar la tabla
  $(".table tbody").empty();
  //cargar los clientes
  const clientes = await getClientes();
  console.log(clientes);
  if (clientes.data.length > 0) {
    //cargar los clientes en la tabla
    clientes.data.forEach((cliente) => {
      $(".table tbody").append(
        `<tr><td>${cliente.id}</td><td>${cliente.nameCliente}</td><td>${cliente.emailCliente}</td><td>${cliente.tlfnoCliente}</td><td>${cliente.empresaCliente}</td><td>${botAcc}</td></tr>`
      );
    });
    //establecer evento click a los botones de acción
    $(".del").on("click", eliminarCliente);
    $(".edit").on("click", actualizarCliente);
  } else {
    $(".table tbody").append(
      `<tr><td colspan=6 class="text-center">No hay registros</td></tr>`);
  }
};
const eliminarCliente =function()  {
  const id=this.parentNode.parentNode.firstChild.innerText;
  console.log(id);
  Swal.fire({
    title: "¿Desea eliminar el cliente?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    focusCancel:true
  }).then(async(result) => {
    if (result.isConfirmed) {
      const datos=await deleteCliente(id);
      mensaje(`Cliente borrado`, 'success');
      mostrarClientes();
    }
  });
};
const actualizarCliente =async function()  {
   id=this.parentNode.parentNode.firstChild.innerText;
  //cargar los datos del cliente
  const datos= await getCliente(id);
  //mostrar la ventana modal
  $("#frmModal").modal("show");
  //cargar los datos en el formulario
  document.querySelector("#nameCliente").value=datos.nameCliente;
  document.querySelector("#emailCliente").value=datos.emailCliente;
  document.querySelector("#tlfnoCliente").value=datos.tlfnoCliente;
  document.querySelector("#empresaCliente").value=datos.empresaCliente;
//modificar los textos
  document.querySelector(".modal-title").innerText="Modificar Cliente";
  document.querySelector(".submit").innerText="Modificar";
};


const grabarActCliente=async ()=>{
   const cliente={
    'id':document.querySelector("#id").value,
    'nameCliente':document.querySelector("#nameCliente").value,
    'emailCliente':document.querySelector("#emailCliente").value,
    'tlfnoCliente':document.querySelector("#tlfnoCliente").value,
    'empresaCliente': document.querySelector("#empresaCliente").value
   }
   
   const datos= await updateCliente(cliente);
   //mostrar el mensaje
   if (datos.mensaje=="actualizado"){
    mensaje("Cliente actualizado", "success");
    mostrarClientes();
   }else{
    mensaje("Cliente No actualizado", "error");
   }
   //limpiar y cerrar formulario
   $("input").val("");
   $("#frmModal").modal("hide");

   

};
