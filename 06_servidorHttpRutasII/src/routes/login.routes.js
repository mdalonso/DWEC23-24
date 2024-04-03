"use strict"
import {Router} from 'express'

const router=Router();

router.get("/login", (req, res)=>{
    res.send("Respuesta servidor con express en la ruta login")
})

export default router; //exportamos para poder hacer uso de él en el servidor (app.js)