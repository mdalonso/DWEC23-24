"use strict";
//Declaracion de variables
let xmlHttpRequest;
//Cuerpo script
$(() => {
  //Tratamos de crear el objeto xmlhttprequest
  try {
    xmlHttpRequest = crearConexion();
    //Metodo que listara los restaurantes
    listRestaurantes();
    //Evento que cambiara la lista de empleados
    $("#rest").change(listEmpleados);
    //Dos eventos que borran las mesas al cambiar alguno de los dos
    $("#rest").change(() => {
      $("#comedor").empty();
    });
    $("#fechaR").change(() => {
      $("#comedor").empty();
    });
    //Metodo que valida los formularios
    validar();
    //Metodo que controla el click en las mesas
    $("#comedor").click(eventoMesas);
  } catch (error) {
    console.log(error);
    alert("Su navegador no soporta ajax");
  }
});
//Funciones
//Funcion que valida ambos formularios usando validate
function validar() {
  //Primer formulario (Restaurante, empleado y fecha)
  $(".form-horizontal").validate({
    //Funcion que muestra el texto de error
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the `help-block` class to the error element
      error.addClass("invalid-feedback");
      //Comprueba el tipo de input para poner el error en el sitio correcto
      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else if (element.prop("type") === "radio") {
        error.insertBefore(element.parent("div"));
      } else {
        error.insertAfter(element);
      }
    },
    //Propiedad que muestra el borde de error o de valido
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
    //Reglas que seguira
    rules: {
      rest: {
        required: true,
      },
      emp: {
        required: true,
      },
      fechaR: {
        required: true,
      },
    },
    //Propiedad que indica la ejecucion al ser un formulario valido
    submitHandler: (form) => {
      //Funcion que imprimira las mesas disponibles
      pintarMesas($("#rest option:checked").attr("numMesas"));
    },
  });
  //Validacion del segundo formulario (Nombre y comensales)
  $(".frmReservas").validate({
    //Funcion que muestra el texto de error
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the `help-block` class to the error element
      error.addClass("invalid-feedback");
      //Comprueba el tipo de input para poner el error en el sitio correcto
      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else if (element.prop("type") === "radio") {
        error.insertBefore(element.parent("div"));
      } else {
        error.insertAfter(element);
      }
    },
    //Propiedad que muestra el borde de error o de valido
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
    //Reglas que seguira
    rules: {
      nameApeCli: {
        required: true,
      },
      numCom: {
        required: true,
      },
    },
    //Propiedad que indica la ejecucion al ser un formulario valido
    submitHandler: (form) => {
      //Funcion que reservara la mesa
      reservar();
    },
  });
}
//Funcion que recoje los datos sobre los restaurantes y los imprime como opciones
async function listRestaurantes() {
  try {
    let result = await fetch("http://localhost:3000/restaurantes");
    let data = await result.json();
    data.forEach((element) => {
      $("#rest").append(
        `<option value='${element.idrest}' numMesas='${element.mesas}'>${element.name}</option>`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
//Funcion que recoge la informacion sobre los empleados segun el restaurante y los imprime como opciones
function listEmpleados() {
  if ($("#rest").val() != "") {
    const url=`http://localhost:3000/empleados/${$("#rest").val()}`;
    console.log(url);
    xmlHttpRequest.open("GET", url, true);
    $("#emp option+option").remove();
    xmlHttpRequest.onreadystatechange = () => {
      if (xmlHttpRequest.status == 200 && xmlHttpRequest.readyState == 4) {
        let dato = JSON.parse(xmlHttpRequest.responseText);
        dato.forEach((empleado) => {
          console.log(empleado.idemp+" "+empleado.nomape);
          $("#emp").append(
            `<option value='${empleado.idemp}'>${empleado.nomape}</option>`
          );
        });
      }
    };
    xmlHttpRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    xmlHttpRequest.send();
  }
}
//Funcion que pinta la cantidad de mesas pasadas por parametro, ademas comprueba las mesas ya reservadas para el restaurante seleccionado
async function pintarMesas(nummesas) {
  //Vacia el contenedor en caso de que hubiera mesas
  $("#comedor").empty();
  try {
    //Bucle que pinta tantas mesas como se hallan pasado por parametro
    for (let index = 0; index < nummesas; index++) {
      $("#comedor").append(
        `<img src='./imagenes/mesaLibre.png' nummesa='${
          index + 1
        }' reservada='false'>`
      );
    }

    //Fetch que recogera la informacion de las reservas en ese restaurante en esa fecha
    //CREAMOS LA URL PARA INVOCAR AL SERVIDOR NODE************************************************
    const url=`http://localhost:3000/reservas/${$("#rest").val()}/${$("#fechaR").val()}`;
    console.log(url);

    /* let res = await fetch(
      `./php/consReservas.php?idrest=${$("#rest").val()}&fecha=${$(
        "#fechaR"
      ).val()}`
    ); */

    let res = await fetch(url);
    let data = await res.json();
    //data = await data.data;*************esto no nos hace falta ya que los resultados no están en un objeto data dentro de data.


    //Recoremos la información obtenida, y por todos los numeros de mesa obtenidos cambiamos las mesas impresas que coincidan con el numero
    //Para ello las mesas (<img>) tienen un atributo llamado nummesa
    data.forEach((reserva) => {
      $(`img[nummesa='${reserva.mesa}']`)
        .attr("src", "./imagenes/mesaOcupada.png")
        .attr("reservada", "true") //Atributo que usaremos para el evento click y saber si la mesa esta o no reservada
        .attr("title", `${reserva.nomapecli}`) //Atributo para jquery ui que se muestra al pasar el raton
        .attr("idReserva", reserva.idreservas) //El id de la reserva en la tabla
        .tooltip(); //Funcion de jquery ui y boostrap boondle que hara que al pasar el raton se muestre el tittle
    });
  } catch (error) {
    console.log(error);
  }
}

//Funcion que controla el evento click sobre el contenedor de las mesas
function eventoMesas(evento) {
  //Comprueba si se ha pulsado en una mesa buscando el atributo "nummesa" (Creado en todas las mesas)
  if ($(evento.target).attr("nummesa") != undefined) {
    //Comprueba el atributo "reservada" que indica si esta reservada o no
    if ($(evento.target).attr("reservada") == "false") {
      $("#Nmesa").val($(evento.target).attr("nummesa")); //Guarda en un campo hidden del formulario de la ventana modal el numero de la mesa pulsada
      $("#reservas").modal("show"); //Muestra la ventana modal
    } else {
      //Disparamos una alerta para pedir confirmacion
      swal
        .fire({
          icon: "warning",
          showCancelButton: true,
          title: "<h1>¿Estas seguro de querer borrar la reserva?</h1>",
          text: `Cliente: ${$(evento.target).attr("data-bs-original-title")}`, //"data-bs-original-title" es como queda la etiqueta "tittle" tras ser procesada por tooltip()
        }) //Dispara una alerta de confirmacion
        .then((result) => {
          if (result.isConfirmed) {
            //Comprobamos si ha sido confirmada
            //Fetch que intentara borrar la mesa de la base de datos con el id de la reserva (Obtenido por el atributo "idreserva")
            //ADAPTAMOS LA URL AL SERVIDOR NODE.JS
            const url=`http://localhost:3000/reservas/${$(evento.target).attr("idReserva")}`;
            fetch(url)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                //Si ha conseguido borrar la reserva volvemos a imprimir las mesas con la informacion actualizada
                pintarMesas($("#rest option:checked").attr("numMesas"));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  }
}
//Funcion que hara una reserva al completar correctamente el formulario
async function reservar() {
  //Variable que recoge y almacena todos los datos necesarios para la insercion en forma de formulario
  //Hay que adaptar el cliente al funcionamiento del nuevo servidor.
  //El nuevo servidor debe recibir un JSON, por tanto construímos un objeto JS con los datos que le debemos pasar
  //al servidor...
  const res={
    "rest":$("#rest").val(),
    "emp":$("#emp").val(),
    "fecha":$("#fechaR").val(),
    "mesa":$("#Nmesa").val(),
    "cli":$("#nameApeCli").val(),
    "comen":$("#numCom").val()
  }
  //Esto es para el servidor con php**************
  /* let formdata = new FormData();
  formdata.append("rest", $("#rest").val());
  formdata.append("emp", $("#emp").val());
  formdata.append("fecha", $("#fechaR").val());
  formdata.append("mesa", $("#Nmesa").val());
  formdata.append("cli", $("#nameApeCli").val());
  formdata.append("comen", $("#numCom").val()); */
  //***************************************** */
  console.log(res);
  try {
    //Fetch que intentara guardar la reserva

    const url="http://localhost:3000/reservas";
    
    //Esto es para el servidor con php*************************************
    //console.log(formdata.json());
    /* const respuesta = await fetch("./php/saveReservas.php", {
      method: "POST",
      body: formdata,
    }); *********************************************************************/
    
    //...Y le decimos al servidor que los datos que se le pasan están en formato json
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(res)
    });

    const data = await respuesta.json();
    //Si la reserva es correcta ocultamos la ventana modal, reseteamos el formulario y actualizamos las mesas
    $("#reservas").modal("hide");
    $(".frmReservas").trigger("reset");
    pintarMesas($("#rest option:checked").attr("numMesas"));
  } catch (error) {
    console.log(error);
  }
}
