"use strict"
window.addEventListener("DOMContentLoaded", ()=>{
    mostrarProv();
})

//El método mostrarProv hace una solicitud GET al servidor. En este caso el servidor es un archivo json con
//información de las provincias y su código postal.
const mostrarProv=() =>{
        fetch("https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json")
        //En el primer then comprobaremos si la solicitud se ha realizado con éxito o no atendiendo a la propiedad
        //status del objeto response en el que se resuelve la promesa devuelta por fetch.
         .then((response) =>{ 
            if (response.status==200){
              //Si la solicitud se resuelve correctamente se utiliza el método json para genera una nueva promesa
              //que se resuelva en un objeto JS en el que encontremos la información JSON parseada
             return response.json();
            }else{
              //Si no se resuelve correctamente se lanza una excepción que capturaremos mediante un catch posteriormente
              throw ("Error en la comunicación")
            }
         })
         //
         .then((data) => {
          //En este caso, la información JSON se ha parseado en un array de objetos JS. Cada objeto tiene dos
          //campos: id: con el código postal y nm con el nombre de la provincia.
            console.log(data);
      
            //ordenar ascedente
           //Hay que cargar las provincias en el select y lo haremos en orden alfabético ascendente de provincia,
           //es decir, el campo nm.
           //Recordamos: sort ordena en orden ascendente si la función que recibe como parámetro da un número negativo y en orden
              //descendente en caso contrario
            data.sort((a, b) => {
              //Recordamos: localeCompare devuelve un número negativo si la cadena de referencia debe ir antes que
              //la cadena de comparación y un número positivo en caso contrario.
                return a.nm.localeCompare(b.nm)
            })

            //cargar en el select
            //Una vez ordenado el array, lo recorremos para ir creando un elemento option por cada elemento del array
            //cada elemento option contendrá el nombre de la provincia.
            data.forEach(element => {
              const option=document.createElement("option");
              //Para facilitar el acceso a la información del código postal, la asignaremos como id del elemento
              option.setAttribute("id", element.id);
              option.textContent=element.nm;
              //añadimos cada nuevo option al select de provincias
              document.querySelector("#provincias").append(option);
            }); 

            //evento change
            //Con el fin de mostrar un mensaje con el código postal, asignamos una función al evento change del
            //select de provincias.
            //Esa función mostrará un mensaje con el id del option seleccionado, el cual contiene el código postal de
            //la provincia en cuestión.
            document.querySelector("#provincias").addEventListener("change", function () {
                const provincias=document.querySelector("#provincias")
                if (provincias.selectedIndex!=0){
                  Swal.fire("El Id es " +provincias.options[provincias.selectedIndex].getAttribute("id"));
                }
            })
          })
          //Se captura la excepción lanzada en el primer then
          .catch((error) => {
            console.log(error);
          });
        
      }
