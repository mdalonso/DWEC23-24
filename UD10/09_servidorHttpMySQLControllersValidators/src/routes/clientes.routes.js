"use strict"
import {Router} from 'express'
import { getClientes,  getCliente, delCliente,addCliente, updateCliente } from '../controllers/clientes.controllers.js';

//importamos las funciones de validación.

import { validacion } from '../validators/clientes.validator.js';

const router=Router();

router.get("/clientes", getClientes)
router.get("/clientes/:id", getCliente)
//Hacemos uso de la validación antes de llamar al controlador.
//validation es un array de funciones de middleware, la última de las cuales gestiona el resultado de la validación.
//Si no se produce ningún error en la validación, se llamará al controlador addCliente ya que esa última función
//contenida en el array validacion, invoca a next(). En este caso next() representa a addCliente().
router.post("/clientes", validacion, addCliente);
router.put("/clientes/:id", validacion, updateCliente);

router.patch("/clientes/:id", updateCliente);
router.delete("/clientes/:id", delCliente )

export default router; //exportamos
