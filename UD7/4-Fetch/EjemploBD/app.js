"use strict"
document.addEventListener("DOMContentLoaded", () => {
   
        document.querySelectorAll("#first, #all").forEach(elemento =>{
            elemento.addEventListener("click", mostrar)
        })
        
       
})
//El método mostrar hace una solicitud POST al servidor. El servidor es un archivo php que hace una consulta
//a una base de datos para mostrar bien el primer registro (Mostrar Primero) o bien toda la lista (Mostrar todos)
function mostrar() {
    //En este caso vamos a pasar los parámetros al servidor utilizando un objeto FormData.
    //Se crea el objeto FormData
    const param=new FormData();

    //Se comprueba con qué botón se ha invocado al método mostrar.
    //Si se ha invocado con el botón "Mostrar Primero" (ID=first)...
    if (this.getAttribute("id") == "first") {
        //...se añade un par clave,valor al objeto FormData.
        //La clave será el nombre del parámetro que espera el archivo php
        //El valor será el valor de ese parámetro.
        param.append("perro", "111A")
    }else{
        //Si se ha invocado con el botón "Mostrar todos"
        //Se añade un par clave, valor pero en este caso el valor es la cadena vacía, que es lo que
        //necesita el archivo php para realizar la consulta sin parámetros a la base de datos.
        param.append("perro", "");
    }   
    
    //Una vez construido el objeto FormData se realiza la solicitud fetch.
    //al ser una solicitud POST, es necesario pasarle el objeto con las opciones.
    fetch("php/mostrar.php",{
        //el tipo de solicitud
        method:'POST',
        //los parámetros.
        //No es necesario indicar nada en la cabecera ya que el propio documento php reconocerá el formato
        body: param 
    })
    //En este caso no vamos a hacer comprobación de errores-
    .then((response) =>{
        //Para poder utilizar los datos devueltos por el servidor hay que utilizar el método json que devuelve una
        //promesa que se resuelve en un json que en este caso se materializará en objeto que contiene un array de objetos JS con tantos 
        //campos como campos hay en la base de datos y tantos elementos como filar tiene la tabla consultada
        return response.json()
    }) 
    //Con este then podemos utilizar los datos devueltos por el servidor.
    .then((datos) => {
        console.log(datos);
      //elimina las filas para que la información se muestra correctamente.
      //Para ello recorremos todas las filas y las eliminamos (recordamos que estamos en JS nativo)
       document.querySelector("tbody").querySelectorAll("tr").forEach(element=>{
        element.remove();
       })
       
       //Recorremos los datos
       //El array está en el elemento data del objeto DATOS devuelto por la consulta al servidor
        datos.data.forEach(elemento => {
            //Para cada elemento del array se crea una fila...
              const fila=document.createElement("tr");
              //...y dentro de esa fila se crean tantas columnas como campos tiene la tabla
              const colChip=document.createElement("td");
              colChip.textContent=elemento.chip;
              const colNombre=document.createElement("td");
              colNombre.textContent=elemento.nombre;
              const colRaza=document.createElement("td");
              colRaza.textContent=elemento.raza;
              const colFechaNac=document.createElement("td");
              colFechaNac.textContent=elemento.fechaNac;
              //Se añaden las columnas a la fila
              fila.append(colChip,colNombre,colRaza,colFechaNac);
              //Se añade la fila al cuerpo de la tabla
              document.querySelector("tbody").append(fila);
        })
         
         
    })
    //Se captura la excepción si se hubiera lanzado, que no es el caso de este ejemplo.
    .catch((error) => {
      console.log(error);
    });
  

}