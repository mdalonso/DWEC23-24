"use strict";

import conexion from "../conector_mysql.js";

export const addReserva=async(req,res)=>{
    //$stmt = $pdo->prepare("INSERT INTO reservas VALUES(NULL,'$rest','$emp','$fecha','$mesa','$cli',$comen)");
    console.log("Body:" +req.body);
    const {rest,emp,fecha,mesa,cli,comen}=req.body;

    const [resultado]=await conexion.query("INSERT INTO reservas (idrest,idemp,fecha,mesa,nomapecli,comensales) VALUES (?,?,?,?,?,?)",[rest,emp,fecha,mesa,cli,comen]);

    console.log(resultado);

    if(resultado.affectedRows!=0){
        res.status(200).json({mensaje:"Reserva creada"});
    }

}

export const getReserva=async (req,res)=>{

    const {id,fecha}=req.params;
    console.log(id);

    const [resultado]=await conexion.query("SELECT idreservas, mesa, nomapecli FROM reservas WHERE idrest=? and fecha=?",[id,fecha]);
    console.log(resultado);
    if (resultado.length!=0){
        res.status(200).json(resultado);
    }
    
}

export const deleteReserva=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const [resultado]=await conexion.query("DELETE FROM reservas where idreservas=?",[id]);
    console.log(resultado);
    if (resultado.affectedRows!=0){
        res.status(200).json({mensaje:"Reserva eliminada"});
    }
}