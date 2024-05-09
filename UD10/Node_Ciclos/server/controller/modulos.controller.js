"use strict";

import conexion from "../conector_mysql.js";

export const getModulos=async(req,res)=>{
    const {idCurso}=req.params;

    const [resultado]=await conexion.query("SELECT * FROM modulos WHERE idCurso=? ORDER BY descripcion",[idCurso]);

    if (resultado.lenght!=0){
        res.status(200).json(resultado);
    }
}