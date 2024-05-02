"use strict";

import { check,validationResult } from "express-validator";

export const reglas=[
    check("nombreCliente")
        .exists().withMessage("Nombre requerido")
        .notEmpty().withMessage("Nombre vacío")
        .isLength({min:2,max:20}).withMessage("LA longitud de nombre debe ser de entre 2 y 20 caracteres"),
    check("emailCliente")
        .exists().withMessage("Email requerido")
        .notEmpty().withMessage("Email requerido")
        .isEmail().withMessage("Email invalido "),
    check("tlfnoCliente")
        .exists().withMessage("Teléfono requerido")
        .notEmpty().withMessage("Teléfono requerido")
        .isLength({min:9,max:9}).withMessage("Debe tener 9 dígitos")
        .isNumeric().withMessage("Debe contener únicamente dígitos"),
    check("empresaCliente")
        .exists().withMessage("Empresa requerida")
        .not().isEmpty().withMessage("Empresa requerido")
        .matches(/^[A-Z][a-zA-Z0-9\s.@]{4,25}$/).withMessage("El nimbre de la empresa nos dlfnsñdfsdfnds"),
    (req,res,next)=>{
        const errores=validationResult(req);

        if (!errores.isEmpty()){
            return res.status(400).json({errores:errores.array()});
        }else{
            next();
        }


    }
]
