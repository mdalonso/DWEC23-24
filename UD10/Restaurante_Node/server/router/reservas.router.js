"use strict";

import {Router} from "express";
import { addReserva,deleteReserva,getReserva } from "../controller/reservas.controller.js";

const router=Router();

router.post("/reservas",addReserva);

router.get("/reservas/:id/:fecha",getReserva);

router.delete("/reservas/:id",deleteReserva);

export default router;