"use strict"
import {Router} from 'express'
import { getClientes, getCliente, addCliente,updateCliente,deleteCliente,patchCliente } from "../controllers/cliente.controller.js";
import { reglas } from "../validators/clientes.validator.js"
import verifyToken from './verificador.js';


const router=Router();
//Si se necesita verificar la autorización del cliente, se realiza la verificación del token
router.get("/clientes",verifyToken, getClientes);
router.get("/clientes/:id", getCliente);

router.post("/clientes", reglas, addCliente);
router.put("/clientes/:id", updateCliente);

router.patch("/clientes/:id",patchCliente);
router.delete("/clientes/:id", deleteCliente);

export default router; //exportamos