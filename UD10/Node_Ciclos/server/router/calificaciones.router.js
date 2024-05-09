"use strict";

import {Router} from "express";
import { addCalificaciones } from "../controller/calificaciones.controller.js";


const router=Router();

router.post("/calificaciones",addCalificaciones);

export default router;