"use strict";

import {Router} from "express";
import { getRestaurantes } from "../controller/restaurantes.controller.js";

const router=Router();

router.get("/restaurantes",getRestaurantes);


export default router;