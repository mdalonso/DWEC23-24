"use strict";

import conexion from "../conector_mysql.js";

export const getAlumnos=async(req,res)=>{
    const {idCurso}=req.params;

    const [resultado]=await conexion.query("SELECT * FROM alumnos WHERE idCurso=? ORDER BY apellidosNombre",[idCurso]);

    if (resultado.lenght!=0){
        res.status(200).json(resultado);
    }
}