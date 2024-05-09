"use strict";

import express from "express";
import cors from "cors";
import routerCursos from "./router/cursos.router.js";
import routerModulos from "./router/modulos.router.js";
import routerAlumnos from "./router/alumnos.router.js";
import routerCalificaciones from "./router/calificaciones.router.js";
//import routerReservas from "./router/reservas.router.js"

const app=express();

app.use(cors());
app.use(express.json());

app.use(routerCursos);
app.use(routerModulos);
app.use(routerAlumnos);
app.use(routerCalificaciones);

app.listen(3000,()=>{
    console.log('escuchando solicitud');
})