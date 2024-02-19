//En el evento READY se asocia el método mostrarProv al evento change del select con id 'regiones'
$(() => {
   
        $("#regiones").on("change", mostrarProv)
    
})

function mostrarProv(){
    //Se utiliza el método ajax() para enviar una solicitud de tipo POST al servidor.
    //en este casop para nosotros, el servidor será el archivo Ejemplo6.php el cual devuelve un json con la lista de las
    //provincias de la comunidad seleccionada en el select.
    $.ajax({
        url:"Ejemplo6.php",
        type:"POST",
        //al tratarse de una solicitud de tipo post, hay que pasarle los parámetros mediante la opción data en forma de 
        //objeto JS.
        //El archivo php recibe un único parámetro llamado ca con el valor del select que contiene las regiones.
        data:{
            ca: $("#regiones").val()
        },
        //Hay que indicar que el tipo de información que se va a recibir es un json para que la solicitud pueda procesarse correctamente.
        //Esto se puede hacer aquí mediante la propiedad dataType o bien desde el php en la cabecera de la respuesta.
        //(Se puede probar a jugar comentando las dos líneas que indican esta situación tanto en el JS como en el php)
        dataType:"json"
    })
    //Se programa la respuesta cuando la solicitud se resuelve con éxito.
    .done(function (responseText){
        //Se construye la lista de las provincias de la comunidad seleccionada para mostrarla en la capa correspondiente.
        console.log(responseText);
        let cadena="";
           //el objeto jqXHR sabe que los datos se han recibo en json gracias a la opción dataType así que lo parsea en un array
           //Se va introduciendo cada elemento del array en la variable cadena que contiene la lista de provincias
            $(responseText).each((ind,ele)=>{
                cadena+=ele+"<br>";
            });
            //Se muestra la lista en la capa
            $("#mostrar").html(cadena);
        
    })
    //Se programa la respuesta cuando se produce un error en la solicitud.
    .fail(function (xhr,textStatus, errorThrown){
        Swal.fire({
            icon:"error",
            title:"Error "+ xhr.status,
            text:errorThrown
        })
    })
    
}