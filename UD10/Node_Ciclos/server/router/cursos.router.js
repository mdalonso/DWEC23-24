"use strict";

import {Router} from "express";
import { getCursos } from "../controller/cursos.controller.js";


const router=Router();

router.get("/cursos",getCursos);

export default router;