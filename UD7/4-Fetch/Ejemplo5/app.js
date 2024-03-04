"use strict"
document.addEventListener("DOMContentLoaded", () => {
  
    document.querySelector("#cursos").addEventListener("change", mostrarAsig)

})
//Se realiza una solicitud GET al servidor para cargar los módulos correspondientes al curso seleccionado.
const mostrarAsig=()=>{
fetch("Ejemplo5.xml")
//Se comprueba si la solicitud se ha resuelto con éxito o no.
.then ( response =>{
  //Si se ha resuelto con éxito se devuelve el texto que contiene el código XML pero en formato String.
    if (response.status==200){
        return response.text();
        //si no se ha resuelto con éxito se lanza una excepción que capturaremos más adelante.
     }else{
        throw ("Error en la comunicación")
     }
})
//Hacemos uso de los datos devueltos por el servidor.
.then (data=>{
   //Tenemos que parsear la cadena en código XML y para ello utiliamos el objeto DOMParser
      const parser = new DOMParser()
      //Como el código XML está en un String, utilizamos el método parseFromString indicando el formato que esperamos
      const xmlDoc = parser.parseFromString(data, "text/xml");
      
      //borrar todas las opciones excepto la primera
      
      //Para el objeto con id 'modulos' seleccionar todos sus hijos que son de tipo option salvo el
      //que es primer hijo --> Esta colección se almacena en la variable opciones.
      const opciones = document.querySelector('#modulos').querySelectorAll('option:not(:first-child)');
      //se recorre la colección eliminando cada elemento
      opciones.forEach(element => {
        element.remove();
      })

      //recorrer el documento XML para montar la lista de módulos correspondientes al curso seleccionado.
      //Recorro la colección de elementos de tipo CURSO (2 elemento)
      xmlDoc.querySelectorAll("curso").forEach((element,index) => {
        //Si el índice del elemento de la iteración actual coincide con el seleccionado en select con id 'cursos'
        if (index== document.querySelector("#cursos").selectedIndex-1){
          //Recorro la colección de elementos de tipo 'asig' de ese 'curso'
           element.querySelectorAll("asig").forEach(mod => { //recorrer los módulos
            //en cada iteración creo un elemento de tipo option...
            const option=document.createElement("option")
            //...le asigno el texto correspndiente...
            option.textContent=mod.textContent
            //...y lo añado como hijo del select con id 'modulos'
            document.querySelector("#modulos").appendChild(option)
           
           });
        }   
        
      });
    }) 
  //Si se ha producido un error, capturo la excepción lanzada en el primer then.    
.catch (error=>{
    console.log(error);
})

}