"use strict"
//para el uso de Router es necesario importarlo desde express.js
import {Router} from 'express'

//Router() crea una instancia de la clase express.Router() la cual se recibe en la variable router.
//router constituye, por tanto, el objeto ROUTER donde vamos a definir todos los endpoints para la URL clientes.
const router=Router();

//Se crean las diferentes rutas a través del objeto router, en lugar de hacerlo sobre el objeto app como en el
//ejemplo anterior.
//router.get() es el endpoint que responderá a una solicitud get a la URL /clientes mediante el middleware especificado
//mediante la función flecha.
router.get("/clientes", (req, res)=>{
    res.send("Obteniendo clientes")
});

//router.post() es el endpoint que responderá a una solicitud post a la URL /clientes mediante el middleware especificado
//mediante la función flecha.

router.post("/clientes", (req, res)=>{
    res.send("Creando clientes")
})

//router.put() es el endpoint que responderá a una solicitud put a la URL /clientes mediante el middleware especificado
//mediante la función flecha.

router.put("/clientes", (req, res)=>{
    res.send("Actualizando clientes")
})

//router.delete() es el endpoint que responderá a una solicitud delete a la URL /clientes mediante el middleware especificado
//mediante la función flecha.

router.delete("/clientes", (req, res)=>{
    res.send("Borrando clientes")
})

//Para poder utilizarlo fuera del módulo es necesario exportarlo.
export default router; //exportamos