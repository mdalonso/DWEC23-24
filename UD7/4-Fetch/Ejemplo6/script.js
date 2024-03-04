"use strict";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#regiones").addEventListener("change", mostrarProv);
});
//El método mostrarProv hace una solicitud POST al servidor. El servidor consiste en un script php que recibe como
//parámetro de entrada el nombre de la comunidad autónoma y devuelve un json con las provincias pertenecientes a esa
//comunidad.
const mostrarProv=() =>{
  //para el paso de parámetros hay que pasar a fetch la configuración correspondiente además de la url del servidor.
  fetch("Ejemplo6.php",{
    //hay que especificar el método ya que por defecto sería GET
    method:'POST',
    //hay que especificar el formato en el que se van a pasar los parámetros mediante la cabecera http correspodiente
    headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
    },
    //Se pasa el parámetro ca=valor seleccionado en el select.
    body: `ca=${document.querySelector("#regiones").value}`
    
  })
  //Se comprueba si la solicitud ha tenido éxito o no atendiendo a la propiedad status del objeto response
    .then((response) => {
      if (response.status==200){
        //Si la solicitud se ha realizado con éxito se utiliza el método json() del objeto response el cual
        //devuelve una promesa que se resuelve en un objeto json.
        //En este caso la información devuelta por el servidor no es de tipo texto sino un JSON
        //Este JSON se parseará automáticamente en un array que puede ser recorrido
        return response.json();
     }else{
      //si la solicitud no ha tenido éxito se lanza una excepción.
        throw ("Error en la comunicación")
     }
    })
    //Este then atiende a la información que recibimos del servidor, que es la que verdaderamente nos interesa
    .then((data) => {
        console.log(data);

        let cadena = "";

        //Esta información viene parseada de forma automática en un array (en este caso)
        //(Un JSON puede ser parseado en diferentes objetos JS en función de su contenido (objeto, array, string, número...))
        //(recordemos que con el objeto xmlhttprequest había que parsearlo manualmente y en el caso de JQuery, había
        //que especificar que se iba a recibir este tipo de información para poder usarlo)
        
        //Construimos la lista en una variable auxiliar...
        data.forEach(element => {
          cadena += element + "<br>";
        });
        //...mostramos la lista en el elemento con id 'mostrar'
        document.querySelector("#mostrar").innerHTML=cadena;
    })
    //Se captura la excepción lanzada en el primer then en caso de error
    .catch((error) => {
      console.log(error);
    });
  
}
