"use strict"

window.addEventListener("DOMContentLoaded", ()=>{
    confFormulario();
    cargarCursos();
    //establecer eventos
    document.querySelector("#cursos").addEventListener("change", cargarModulos);
    document.querySelector("#grabar").addEventListener("click", grabarAlumnos);
})
 /**
    * Para mostrar cursos se utilizará el objeto xmlHttpRequest
    */
function cargarCursos(){
    let xmlHttp=crearConexion();
    if (xmlHttp!=undefined){
        const url="http://localhost:3000/cursos";
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange=()=>{
            if (xmlHttp.readyState==4 && xmlHttp.status==200) {
                const respuesta=JSON.parse(xmlHttp.responseText);
            //cargar
                respuesta.forEach(element => {
                  const elemento=document.createElement("option");
                  elemento.setAttribute("id",element.idCurso);
                  elemento.textContent=`${element.idCurso} - ${element.descripcion}`;
                  document.querySelector("#cursos").appendChild(elemento)
                });
            }
                
        }
        xmlHttp.send();
    }else{
        mensaje("El navegador no soporta AJAX", "error");
    }

}

const cargarModulos=()=>{
  /* $.ajax({
    url:"php/modulos.php",
    type:"GET",
    data:{
        idCurso:$("#cursos option:selected").attr("id")
    }
}) */  
  $.ajax({
        url:`http://localhost:3000/modulos/${$("#cursos option:selected").attr("id")}`,
        type:"GET"
    })
    .done(function (responseText) {
        $("#modulos option:gt(0)").remove();
        console.log(responseText);
            $(responseText).each((ind, ele) => {
                $("#modulos").append(`<option id=${ele.idModulo}>${ele.descripcion}</tr>`)
            })
       
       
    })
    .fail(function (responseText, textStatus, xhr) {
        console.log(responseText);
        Swal.fire({
            icon: "error",
            title: "Error " + xhr.status,
            text: xhr.statusText
        })
    })    
}
const confFormulario=()=>{
       
     $(".form-horizontal").validate( {
       errorElement: "em",
       errorPlacement: function ( error, element ) {
         // Add the `help-block` class to the error element
         error.addClass( "invalid-feedback" );
   
         if ( element.prop( "type" ) === "radio" ) {
           error.insertAfter(element.parent( "div" ) );
         } else {
           error.insertAfter( element );
         }
       },
       highlight: function ( element, errorClass, validClass ) {
         $(element).addClass("is-invalid").removeClass("is-valid");
       },
       unhighlight: function (element, errorClass, validClass) {
         $(element).addClass("is-valid").removeClass("is-invalid");
       },
       rules: {
         cursos: "required",
         modulos: "required"
        
       },
       submitHandler: function (form) { //evento al enviar el formulario
          
               mostrarAlumnos();
   
           }
     } );
   
   }

   /**
    * Para mostrar alumnos se utilizará Fetch
    */
const mostrarAlumnos=()=>{
    $(".calificaciones").show();
    /* const param=new FormData()
    param.append("idCurso", $('#cursos option:selected').attr("id")) */
    const url=`http://localhost:3000/alumnos/${$('#cursos option:selected').attr("id")}`
    fetch(url,{
        method:'GET',
        //body: param 
    })
    .then((response) =>{
        if (response.status==200){
            return response.json();
         }else{
            throw ("Error en la comunicación")
         }
    }) 
    .then((data) => {
       
       $(".myTable tbody").empty();
       console.log(data);
           $(data).each((ind, ele) => {
               $(".myTable tbody").append(`<tr><td id=${ele.idAlumno}>${ele.apellidosNombre}</td><td class='soltar'></td></tr>`)
           })
           //establecer evento drag
           $('.arrastrar').draggable({
            helper:'clone'
           })
           $('.soltar').droppable({
            classes:{
              "ui-droppable-hover": "ui-state-hover"
            },
            drop: ( (event, ui)=>{
              $(event.target).empty();
              $(event.target).append($(ui.draggable).text())
            })
          })
     })
     .catch((error) => {
       console.log(error);
     });
}
const grabarAlumnos=()=>{
  //recorrer los alumnos
  const datos={
    idCurso:$("#cursos option:selected").attr('id'),
      idModulo:$("#modulos option:selected").attr('id'),
      idAlumno:'',
      calificacion:''
  }
  /* const param={
    params:{
        idCurso:$("#cursos option:selected").attr('id'),
        idModulo:$("#modulos option:selected").attr('id'),
        idAlumno:'',
        calificacion:''
    }
  }
 */
  console.log( $(".myTable tbody tr"))
  $(".myTable tbody tr").each(async(ind,elemento)=>{
    console.log(ind,elemento);
    $(elemento).children("td").each(function (ind, col) {
      if (ind == 0) {
        datos.idAlumno= $(col).attr("id");
      } else {
        datos.calificacion= $(col).text();
      }
    })
    console.log(datos);
    try {
      const response=await axios.post("http://localhost:3000/calificaciones",datos);
     
      mensaje("Alumnos grabado", "success");
      
    } catch (error) {
      console.log(error);
    }
    
  })
  limpiar();
}
    
const limpiar=()=>{
  $(".calificaciones").hide(); // Ocultar las calificaciones
  $("#cursos option:first").attr("selected", true); //seleccionar la primera opción de cursos
  $("#modulos option:gt(0)").remove(); 
  $(".myTable tbody tr").remove
}    
const mensaje=(texto, icono)=>{
    Swal.fire({
      position: 'bottom-end',
      icon:icono,
      title: texto,
      showConfirmButton: false,
      timer: 2500
    })
  }
