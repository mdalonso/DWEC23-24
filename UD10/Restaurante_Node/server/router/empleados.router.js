"use strict";

import {Router} from "express";

import { getEmpleadosRest } from "../controller/empleados.controller.js";

const router=Router();

router.get("/empleados/:id",getEmpleadosRest);

export default router;