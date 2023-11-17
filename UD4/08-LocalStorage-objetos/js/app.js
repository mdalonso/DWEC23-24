"use strict";
//Grabar un objeto en localStorage --> Utilizar JSON para convertirlo en un cadena
//el objeto JSON permite convertir objetos en cadena y viceversa.
let nombre, ape, edad
document.addEventListener("DOMContentLoaded", () => {
    nombre = document.getElementById("nombreId");
    ape = document.getElementById("apellidosId");
    edad = document.getElementById("edadId");
    //establecer los eventos a los botones
    document.getElementById("crear").addEventListener("click", crearC);
    document.getElementById("listar").addEventListener("click", listarC)
})

const crearC = () => {
    //Se crea un objeto con los valores introducidos
    //(Habría que hacer previamente las validaciones de datos)
    let objeto = {
        nom: nombre.value,
        ape: ape.value,
        edad: parseInt(edad.value)
    }
    //convertir objeto a cadena
    console.log(objeto)
    //STRINGIFY convierte el objeto en una cadena JSON
    objeto = JSON.stringify(objeto);
    console.log(objeto)
    //Almacenamos el objeto en el localStorage, codificándolo previamente.
    localStorage.setItem("Persona" + (localStorage.length + 1), encodeURIComponent(objeto));

    //limpiar inputs
    for (let elemento of document.getElementsByTagName("input")) {
        elemento.value = ""
    }


}

//Acceder a los elementos de localStorage cuando estos son objetos
const listarC = () => {
    //El resultado se va a mostrar en el área CAPA del documento html
    document.getElementById("capa").innerHTML = "";
    //Se recorre el localStorage por índice
    for (let i = 0; i < localStorage.length; i++) {
        //En cada iteración OBJETO contiene una cookie
        let objeto = localStorage.getItem(localStorage.key(i)); //string
        console.log(objeto);
        //convertir la cadena a objeto-->método parse del objeto JASON
        let persona = JSON.parse(decodeURIComponent(objeto));
        console.log(persona);
        //Una vez parseada la cadena JASON en un objeto, podemos acceder a las propiedades del objeto
        document.getElementById("capa").innerHTML += "Nombre= " + persona.nom + " Apellidos=" + persona.ape + " Edad=" + persona.edad + "<br>"

    }
}
//localStorage.clear();

