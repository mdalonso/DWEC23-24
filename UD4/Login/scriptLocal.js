"use strict"

window.addEventListener("load", (e) => {

    //establecer evento focus a la contraseña
    document.getElementById("contrasena").addEventListener("focus", comprobarContrasena)
    document.getElementById("enviar").addEventListener("click", loguear)
})

let loguear = (e) => {
    let error = false;
    //comprobar si el usuario esté vacío
    if (document.getElementById("usuario").value.trim() == "") {
        document.getElementById("usuario").placeholder = "Dato Requerido"
        error = true
    }

    //comprobar si la contraseña está vacío
    if (document.getElementById("contrasena").value.trim() == "") {
              
        if (localStorage.getItem(document.getElementById("usuario").value)!=undefined){
            document.getElementById("contrasena").value=localStorage.getItem(document.getElementById("usuario").value)
           }else{
            document.getElementById("contrasena").placeholder="Dato Requerido"
            error=true
           }
    }
    if (error) {
        //cancelar el submit ya que hay datos vacíos
        e.preventDefault();
    } else {
        alert("Usuario logueado");
        if (document.getElementById("check").checked) {
            localStorage.setItem(document.getElementById("usuario").value,CryptoJS.MD5(document.getElementById("contrasena").value))
           
        }
    }


}

function comprobarContrasena() {
   if (localStorage.getItem(document.getElementById("usuario").value)!=undefined){
 document.getElementById("contrasena").value=localStorage.getItem(document.getElementById("usuario").value)
   }else{
    document.getElementById("contrasena").placeholder=""
   }

    
}
