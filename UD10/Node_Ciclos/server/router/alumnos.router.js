"use strict";

import {Router} from "express";
import { getAlumnos } from "../controller/alumnos.controller.js";


const router=Router();

router.get("/alumnos/:idCurso",getAlumnos);

export default router;