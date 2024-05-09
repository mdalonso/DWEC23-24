"use strict";

import {Router} from "express";
import { getModulos } from "../controller/modulos.controller.js";


const router=Router();

router.get("/modulos/:idCurso",getModulos);

export default router;