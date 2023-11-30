
"use strict"
/**Guardará la contraseña encriptada en las cookies
 * - El rescate de la contraseña desde las cookies se realizará cuando la caja de texto correspondiente tome el foco.
 * - Hay que comprobar que el nombre de usuario tenga todo minúsculas o números y una longitud mínima de 6 y que empiece por @
 * - Hay que comprobar que la contraseña tenga al menos una minúscula, una mayúscula, un número y un carácter especial
 *      con una longitud de entre 8 y 16 caracteres.
 * - Crear los span correspondientes para que en caso de que se introduzcan usuario o una clave que no haga match, mostrar
 *      un aviso al usuario 
* - Si no se hace match con las expresiones regulares
 * - Si se marca el check, se debe de guardar la contraseña en una cookie.
 * - La cookie se guarda encriptada haciendo uso de la librería CryptoJS.
 */

//Nos aseguramos de que el DOM está cargado
window.addEventListener("DOMContentLoaded", (e) => {

    //Cuando el input de la contraseña recibe el foco se comprobará si existe una cookie que la tenga almacenada
    document.getElementById("contrasena").addEventListener("focus", comprobarContrasena)
    //Cuando se haga click en el botón Ingresar...
    document.getElementById("enviar").addEventListener("click", loguear)
    //Cuando se pierda el foco del input de usuario, se validará la cadena introducida
    document.getElementById("usuario").addEventListener("blur",validarUsuario);
    //Cuando se pierda el foto del input de contraseña, se validará la cadena introducida
    document.getElementById("contrasena").addEventListener("blur",validarContrasena);
})


let validarUsuario=()=>{
    const usuario=document.getElementById("usuario");
    const error=document.getElementById("errusuario");
    //Si hay un texto introducido
    if (usuario.value.trim()!=""){
        const expresion=/^@[a-z0-9]{5}/;
        //Se comprueba la expresión regular y si no hace match se avisa al usuario a través del span.
        if (!expresion.test(usuario.value)){
            usuario.value="";
            error.innerText="El nombre de usuario debe ser una cadena que comience con @ y contenga sólo minúsculas y dígitos";
            usuario.focus();
        }else {
            error.innerText="";
        }
    }
};



let validarContrasena=()=>{
    const contrasena=document.getElementById("contrasena");
    const error=document.getElementById("errcontrasena");
    if (contrasena.value.trim()!=""){
        const expresion=/^@[a-z0-9]{5}/;
        if (!expresion.test(contrasena.value)){
            contrasena.value="";
            error.innerText="La contraseña debe cumplir con las siguientes condiciones: \n"+
            "- Tener entre 8 y 16 caracteres. \n"+
            "- Tener al menos una letra minúscula. \n"+
            "- Tener al menos una letra mayúscula. \n"+
            "- Tener al menos un número."+
            "- Tener al menos uno de los siguientes caracteres +-¿?!¿";
            contrasena.focus();
        }else {
            error.innerText="";
        }
    }
};

let loguear = (e) => {
    let error = false;
    //comprobar si el usuario esté vacío
    if (document.getElementById("usuario").value.trim() == "") {
        document.getElementById("usuario").placeholder = "Dato Requerido"
        document.getElementById("errusuario").innerHTML="";
        error = true
    }
    //Si se ha introducido un usuario pero no se ha introducido una contraseña, se busca en las cookies
    //comprobar si la contraseña está vacío
    if (document.getElementById("contrasena").value.trim() == "") {
        //leer si hay cookies de ese usuario
        let cookie = leerCookie();
        if (cookie != "") {
            document.getElementById("contrasena").value = cookie
        } else {
            document.getElementById("contrasena").placeholder = "Dato requerido"
            document.getElementById("errcontrasena").innerHTML="";
            error = true
        }

    }
    if (error) {
        //cancelar el submit ya que hay datos vacíos
        e.preventDefault();
    } else {
        alert("Usuario logueado");
        //Y si el check está marcado, se guarda la cookie con caducidad
        if (document.getElementById("check").checked) {
            //grabar cookie
            let fecha = new Date()
            fecha.setMonth(fecha.getMonth() + 1) //Establecemos como fecha de caducidad un mes
            document.cookie = `${document.getElementById("usuario").value}=${CryptoJS.MD5(document.getElementById("contrasena").value)};expires=${fecha.toUTCString()}`
            console.log("Se ha guardado la contraseña");
        }
    }


}

function comprobarContrasena() {

    document.getElementById("contrasena").value = leerCookie()
}

function leerCookie() {
    //busca si está el usuario en la cookie
    let passw = ""
    //Si existen cookies almacenadas...
    if (document.cookie.length > 0) {
        console.log(document.cookie);
        //Las extraemos para recorrerlas
        let aCookie = document.cookie.split(";");
        aCookie.forEach(element => {
            let aDatos = element.split("=");
            if (aDatos[0].trim() == document.getElementById("usuario").value.trim()) {
                passw = aDatos[1] //le pasa  la contraseña
            }
        });

    }
    return passw //retorna o contraseña o blanco
}