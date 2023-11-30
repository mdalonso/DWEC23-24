"use strict";

window.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("usuario").addEventListener("blur",validarUsuario);
    document.getElementById("usuario").addEventListener("blur",leerCookies);
    document.getElementById("contrasena").addEventListener("blur",validarContrasena);
    document.getElementById("enviar").addEventListener("click",ingresar);
})

const validarUsuario=()=>{
    const usuario=document.getElementById("usuario");
    const error=document.getElementById("errusuario");

    if (usuario.value.trim()!=""){
        let expresion=/^@[a-zA-Z0-9]{6,}$/;
        if(!expresion.test(usuario.value.trim())){
            usuario.value="";
            error.innerText="El nombre de usuario debe ser una cadena que comience con @, \n"+
            " contenga sólo minúsculas y dígitos y una longitud mínima de 6 caracteres.";
            usuario.focus();
        }else{
            error.innerText="";
        }
    }
   
};

const leerCookies=()=>{
    if (document.cookie.length>0){
        let aCookie=document.cookie.split(";");
        console.log(document.cookie);
        for (let index = 0; index < aCookie.length; index++) {
            let aDatos=aCookie[index].split("=");
            console.log(aDatos[0]);
            console.log(aDatos[1]);
            if (aDatos[0].trim()==document.getElementById("usuario").value.trim()){
                console.log(document.getElementById("usuario").value.trim());
                
                document.getElementById("contrasena").value=aDatos[1];
            } 
        }
    }
};



const validarContrasena=()=>{
    const contrasena=document.getElementById("contrasena");
    const error=document.getElementById("errcontrasena");

    if (contrasena.value.trim()!=""){
        let expresion=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,._!?¿¡#$]).{8,16}$/;
        if(!expresion.test(contrasena.value)){
            contrasena.value="";
            error.innerText="La contraseña debe cumplir con: \n"+
            "- Contener al menos una minúscula \n"+
            "- Contener al menos una mayúscula \n"+
            "- Contener al menos un número \n"+
            "- Contener al menos un carácter especial \n"+
            "- Tener entre 8 y 16 caracteres";
            contrasena.focus();
        }else{
            error.innerText="";
        }
    }
   
};

const ingresar=(e)=>{
    e.preventDefault();

    let error=false;
    if (document.getElementById("usuario").value.trim()==""){
        document.getElementById("usuario").placeholder="Dato Requerido";
        error=true;
    }
    if (document.getElementById("contrasena").value.trim()==""){
        document.getElementById("contrasena").placeholder="Dato Requerido";
        error=true;
    }

    if(!error){
        const grabar=document.getElementById("check");
        if (grabar.checked){
            let fecha=new Date();
            fecha.setMonth(fecha.getMonth()+1);
            document.cookie=`${document.getElementById("usuario").value.trim()}=${document.getElementById("contrasena").value.trim()};expires=${fecha.toUTCString()}`;
            console.log("Se ha guardado la contraseña");
            console.log(document.cookie);
        }
        alert("Usuario logueado");
        document.getElementById("usuario").value="";
        document.getElementById("contrasena").value="";
    }



};