"use strict";
//El ROUTER DE LOGIN GESTIONA TANTO EL LOGIN COMO EL REGISTRO DEL USUARIO 
//ya que ambas funcionalidades suelen estar unidas en el mismo formulario de login
//DE MANERA QUE SE SUELE PRESENTAR UN BOTÓN DE "CREAR CUENTA" EN EL MISMO FORMULARIO
//DE LOGIN PERO SE PODRÍA HACER EN ROUTERS Y CONTROLADORES SEPARADOS.

import { Router } from "express";
import { addUsuario, doLogin } from "../controllers/login.controller.js";


const router=Router();

//Creamos en endpoint para la creación de un usuario.
router.post("/register",addUsuario);

//Creamos el endpoint para la validación del usuario /contraseña
//normalmente la validación de login se realiza en un POST en vez de un GET por motivos de seguridad
//La idea de implementarlo con un GET sería lógica ya que no estamos añadiendo datos al servidor
//pero la operación de POST ofrece una seguridad en la información que viaja en la solicitud que no
//nos proporciona una solicitud GET.
router.post("/login",doLogin);

export default router;