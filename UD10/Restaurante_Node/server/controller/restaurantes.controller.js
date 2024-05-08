"use strict";

import conexion from "../conector_mysql.js";

export const getRestaurantes=async (req,res)=>{

    const [resultado]=await conexion.query("SELECT * FROM restaurantes ORDER BY name");

    console.log(resultado);
    if (resultado.lenght!=0){
        //res.send("Lista de restaurantes");
        res.status(200).json(resultado);
    }
}

