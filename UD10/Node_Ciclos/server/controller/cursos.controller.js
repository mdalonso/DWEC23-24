"use strict";

import conexion from "../conector_mysql.js";

export const getCursos=async(req,res)=>{
    const [resultado]=await conexion.query("SELECT * FROM cursos ORDER BY descripcion");

    if (resultado.lenght!=0){
        res.status(200).json(resultado);
    }
}