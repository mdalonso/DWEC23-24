"use strict";

import conexion from "../conector_mysql.js";

export const addCalificaciones=async(req,res)=>{
    console.log(req.body);
    const {idCurso,idModulo,idAlumno,calificacion}=req.body;

    const [resultado]=await conexion.query("INSERT INTO calificaciones (idCurso,idModulo,idAlumno,calificacion) VALUES(?,?,?,?)",[idCurso,idModulo,idAlumno,calificacion]);

    if (resultado.affectedRows!=0){
        res.status(200).json({mensaje:"Calificación registrada"});
    }
}