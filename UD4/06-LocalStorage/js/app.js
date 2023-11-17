"use strict"
//Gestión de estado de la navegación con LocalStorage
//Mismo ejemplo que en cookies pero utilizando LocalStorage
//localStorage es un objeto de la navegación que está asociado a una página.
//No se elimina a no ser que se fuerce o lo haga el usuario manualmente.

//MÉTODOS-------------
// - setItem :añade una cookie (par clave, valor)
// - getItem : localiza una cookie dentro del almacenamiento y devuelve su valor.
// - key : localiza una cookie por su posición dentro de la colección localStorage (como en arrays)
// - removeItem : elimina una cookie en base a su clave.
// - length: Número de cookies almacenadas.
// - clear : elimina el contenido de todo el almacenamiento.

//declaración variables, funciones y eventos
let clave, valor;

document.addEventListener("DOMContentLoaded", () => {
    //establecer objetos
    clave = document.getElementById("clave");
    valor = document.getElementById("valor");

    //eventos 
    document.getElementById("crear").addEventListener("click", addCookie);
    document.getElementById("buscar").addEventListener("click", findCookie);
    document.getElementById("listar").addEventListener("click", listCookie);
    document.getElementById("eliminar").addEventListener("click", delCookie);
})
//Para añadir un elemento a LocalStorage --> setItem(clave,valor)
const addCookie = () => {
    //Es conveniente codificar el valor.
    //Tanto clave como valor deben ser cadenas.
    localStorage.setItem(clave.value, encodeURIComponent(valor.value))
    //limpiar campos
    clave.value = "";
    valor.value = "";
}
//PAra localizar un elemento almacenado en LocalStorage --> getItem(clave)
//El elemento se localiza por la clave.
const findCookie = () => {
    valor.value = localStorage.getItem(clave.value)
    if (valor.value == "" || valor.value==null) {
        valor.value = "cookie no existe"
    }
}
//Para acceder a la lista de cookies podemos hacerlo por su índice.
const listCookie = () => {
    let listar = "<h2>Listado de cookies</h2>"
    document.getElementById("capa").innerHTML="";
    //LocalStorage se gestiona como una colección, por tanto tiene una propiedad length
    for (let index = 0; index < localStorage.length; index++) {
        //El método key(index) permite acceder a la clave en una posición de la colección localStorage
        //Accediendo a esta posición mediante su índice
        document.getElementById("capa").innerHTML += localStorage.key(index) + " = " + decodeURIComponent(localStorage.getItem(localStorage.key(index))) + "<br>"

    }

}
//Eliminar una cookie --> removeItem(clave)
const delCookie = () => {
    //Si la cookie existe...
    if(localStorage.getItem(clave.value)!=null){
        //...se elimina
        localStorage.removeItem(clave.value);
        valor.value = "cookie borrada";
    }else{
        valor.value = "cookie no existe";
    }
 
}