"use strict"
//Se invoca al método mostrarProv en el evento READY.
$(() => {

    mostrarProv();

})
function mostrarProv() {
    //Mediante el método ajax() se realiza una solicitud GET al servidor externo que es un archivo json.
    //Este archio json contiene la información relativa al código postal de cada provincia (los dos primeros dígitos)
    $.ajax({
        url: "https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json",
        type: "GET",
        //Se indica que los datos que se van a recibir son json
        dataType:"json"
    })
    //si la solicitud se resuelve con éxito...(programamos la respuesta)
        .done(function (responseText) {
            console.log(responseText);
           //responseText contiene la información json parseada en un array de objetos
            //Ordenamos ese array en orden alfabético ascendente por el campo nm.
            responseText.sort((a, b) => {
                return a.nm.localeCompare(b.nm)
            })
            //Una vez ordenado, metemos las provincias en el select dándole a cada opción como id el valor del
            //campo id de los objetos del array, el cual contiene el código postal.
            
            $(responseText).each((ind, ele) => {
                $("#provincias").append("<option id=" + ele.id + ">" + ele.nm + "</option>")
            })

            //Cuando se seleccione un elemento en el select, se mostrará un mensaje con el id del elemento mostrado.
            //evento change
            $("#provincias").on("change", function () {

                Swal.fire("El Id es " + $("#provincias option:selected").attr("id"))
            })
        })
    //si se produce un error en la solicitud.
        .fail(function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
            Swal.fire({
                icon: "error",
                title: "Error " + xhr.status,
                text: errorThrown
            })
        })
    
}