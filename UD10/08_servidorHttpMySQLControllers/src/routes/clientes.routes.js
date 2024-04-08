"use strict"
import {Router} from 'express'
import { getClientes,  getCliente, delCliente,addCliente, updateCliente,patchCliente } from '../controllers/clientes.controllers.js';

const router=Router();
//Endpoint para objetener todos los registro de la tabla clientes
router.get("/clientes", getClientes)

//Endpoing para obtener el cliente con un id determinado.
//:id permite definir un parámetro sobre la url con nombre id.
//Este parámetro se pasa dentro del objeto params de request
router.get("/clientes/:id", getCliente)

//Endpoint para insertar un nuevo cliente en la base de datos
router.post("/clientes", addCliente);

//Endpoint para eliminar un cliente de la base de datos
router.delete("/clientes/:id", delCliente )

router.put("/clientes/:id", updateCliente);
router.patch("/clientes/:id", patchCliente);

export default router; //exportamos