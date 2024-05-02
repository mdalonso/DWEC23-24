"use strict"
import {Router} from 'express'
import { getClientes,  getCliente,anadirCliente,  actualizarCliente, borrarCliente } from '../controllers/clientes.controllers.js';
import { validacion } from '../validators/clientes.validator.js';

const router=Router();

router.get("/clientes", getClientes)
router.get("/clientes/:id", getCliente)
router.post("/clientes",anadirCliente);
router.put("/clientes/:id",actualizarCliente);
//router.patch("/clientes/:id",updateCliente);
router.delete("/clientes/:id", borrarCliente )

export default router; //exportamos