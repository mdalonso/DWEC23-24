"use strict";
let tabla;
$(()=>{
    validarForm();
    cargarZonas();
})

const validarForm=()=>{

    $.validator.addMethod("dni",function(value,elemento,regexp){
        const re=new RegExp(regexp);
        return re.test(value);
    });

    $("#frm").validate({

        //EFECTOS QUE PODEMOS CONTROLAR ANTE LA VALIDACIÓN

        //Definimos el elemento que se va a utilizar para mostrar errores de validación
        errorElement: "em",
        //Ubicación del elemento de feedback
        errorPlacement:function(error,elemento){
            error.addClass("invalid-feedback");

            if ($(elemento).attr("type")=="radio"){
                console.log("hola");
                error.insertAfter(".form-check");
            }else{
                console.log("adios");
                error.insertAfter(elemento);
            }
        },
        //Resaltar el elemento que produce error
        highlight:function(elemento,errorClass,validClass){
            if ($(elemento).attr("type")!="radio"){
                $(elemento).addClass("is-invalid").removeClass("is-valid");
            }
            
        },
        
        unhighlight: function(elemento,errorClass,validClass){
            
            if ($(elemento).attr("type")!="radio"){
                $(elemento).addClass("is-valid").removeClass("is-invalid");
            }
        },  

        rules:{
            /*
            name_del_input:{
                regla1:valor
                ...
                reglaN:valor,
                regla_personalizada (nombre que le damos al método):parámetros que requiere el método
            }
            */

            dni:{
                required:true,
                dni:/^[0-9]{8}[a-zA-Z]$/
            },
            zona:{
                required:true
            },
            precio:"required",
            numhab:"required"

        },
        //Manejador del envío del formulario
        submitHandler: (form)=>{
            buscarInmuebles();
        },

        messages:{
           
            dni:{
                required: "Campo requerido",
                dni: "El dni debe tener formato 11111111X"
            },
            zona:{
                required: "Campo requerido",
                
            },
            precio:{
                required: "Campo requerido",
                
            },
            numhab:{
                required: "Campo requerido",

            }
        }

    })

}

const buscarInmuebles=()=>{
    const zona=$("#zona option:selected").attr("idZona");
    const hab=$(":radio:checked").attr("value");
    const precio=$("#precio option:selected").attr("value");

    console.log("Zona:"+zona);
    console.log("habitaciones:"+hab);
    console.log("precio:"+precio);
    tabla=$(".table").DataTable({
       ajax:{
            url:"php/inmuebles.php",
            type:"GET",
            data:{
                zona:zona,
                habitaciones:hab,
                precio:precio
            },
            dataType:"json"
       },
       columns:[
        {
            data:"idinmuebles"
        },
        {
            data:"domicilio"
        },
        {
            data:"precio"
        }
       ],
       select:{
            style:"multi"
       },
       language:{
        url:"../../assets/librerias/DataTables/es-Es.json"
       },
       destroy:true,
       pagingType:"simple",
       initComplete:function(settings,json){
            if (json.data.length>0){
                $(".capaGrabar").append("<button class='botonGrabar boton btn btn-primary btn-lg'>Grabar Reserva</button>")
                $(".botonGrabar").on("click",grabarReserva);
            }else{
                $(".capaGrabar").empty();
            }
       }

    })
    console.log("Buscando inmuebles");
}

const cargarZonas=async()=>{

   /*  fetch("php/zonas.php")
    .then(respuesta=>{
        if (respuesta.ok){
            return respuesta.json();
        }else{
            throw ("Error muy mal todo");
        }} 
    )
    .then(datos=>{
        datos.data.forEach (elemento=>{
            const opcion=$(`<option>${elemento.descripcion}</option>`)
            $("#zona").append(opcion);
        });
    }) */


    const respuesta=await fetch("php/zonas.php") ;
    
    const datos=await respuesta.json();
    console.log(datos);

    datos.data.forEach (elemento=>{
        const opcion=$(`<option idZona='${elemento.idzona}'>${elemento.descripcion}</option>`)
        $("#zona").append(opcion);
    });


}

const grabarReserva=()=>{
    console.log("Grabando reservas");
    const filas=tabla.rows({ selected:true }).data();

    filas.each(async(elemento,indice)=>{
        console.log(elemento);
        let reserva={
            dni:$("#dni").val(),
            inmueble:elemento.idinmuebles
        };

        const param={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(reserva)
        }

        try{
            const response=await fetch("php/reservas.php",param)

            if (response.ok){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                    title: "",
                    text: "Reserva Grabada"
                });
            }else{
                throw error;
            }
        }catch(error){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                title: "",
                text: error
            });
        }

    })


    limpiar()
}

const limpiar=()=>{
    console.log("Limpiar formulario");
}