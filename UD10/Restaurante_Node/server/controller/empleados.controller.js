"use strict";

import conexion from "../conector_mysql.js";

export const getEmpleadosRest=async(req,res)=>{
    const {id}=req.params;

    const [resultado]=await conexion.query("SELECT * FROM empleados WHERE idrest=?",[id]);

    console.log(resultado);

    if (resultado.length!=0){
        res.status(200).json(resultado);
    }
}