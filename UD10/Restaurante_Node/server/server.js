"use strict";

import express from "express";
import cors from "cors";
import routerRestaurantes from "./router/restaurantes.router.js";
import routerEmpleados from "./router/empleados.router.js";
import routerReservas from "./router/reservas.router.js"

const app=express();

app.use(cors());
app.use(express.json());

app.use(routerRestaurantes);
app.use(routerEmpleados);
app.use(routerReservas);

app.listen(3000,()=>{
    console.log('escuchando solicitud');
})