import conexionBd from "../mongodb_conector.js";
import { ObjectId } from "mongodb";


export const getClientes=async(req, res)=>{
    try {
        //CONEXION CON BD Y COLECCIÓN
        const database=await conexionBd();
        const coleccion=database.collection("clientes");
        //QUERY
        const resultado=await coleccion.find().toArray();
        console.log(resultado);
        //ELABORACIÓN DE RESPUESTA
        res.status(200).json(resultado);
        
     } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    } 
   
};
export const getCliente=async(req, res)=>{
    try {
        //CONEXION CON BD Y COLECCIÓN
        const database=await conexionBd();
        const coleccion=database.collection("clientes");

        //PARÁMETRO 
        //const id=req.params.id;
        const {id}=req.params;
        console.log(id);

        //QUERY
        const resultado=await coleccion.find({_id:new ObjectId(id)}).toArray();
        console.log(resultado);
        //ELABORACIÓN DE RESPUESTA
        res.status(200).json(resultado);
        
     } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    } 
    
};

export const anadirCliente=async(req,res)=>{
    try{

        const database=await conexionBd();
        const coleccion=database.collection("clientes");
    
        const {nombreCliente,emailCliente,tlfnoCliente,empresaCliente}=req.body;
        
        
        
        const resultado=await coleccion.insertOne({nombreCliente,emailCliente,tlfnoCliente,empresaCliente});
        console.log(resultado);
        
        res.status(200).json({mensaje:resultado.insertId});
        
        
    }catch(error){
        res.status(500).json({mensaje:"Error en el servidor"});
    }
    
}

export const actualizarCliente=async(req,res)=>{
    try{

        const database=await conexionBd();
        const coleccion=database.collection("clientes");
        
        const {id}=req.params;
        const {nombreCliente,emailCliente,tlfnoCliente,empresaCliente}=req.body;
    
        const resultado=await coleccion.updateOne({_id:new ObjectId(id)},{$set:{nombreCliente,emailCliente,tlfnoCliente,empresaCliente}});
    
        console.log(resultado);

        if (resultado.matchedCount==0){
            res.status(404).json({mensaje:"No se encuentra el cliente"});
        }
        else{
            
            res.status(201).json({mensaje:"Cliente actualizado"});
        }

        
    
        
    }catch(error){
        res.status(500).json({mensaje:"Error en el servidor"});
    }
}

export const borrarCliente=async(req,res)=>{
    try{

        const database=await conexionBd();
        const coleccion=database.collection("clientes");
    
        const {id}=req.params;
    
        const resultado=await coleccion.deleteOne({_id:new ObjectId(id)});
    
        console.log(resultado);
    
        if (resultado.deletedCount==0){
            res.status(404).json({mensaje:"cliente no encontrado"});
        }else{
            res.status(200).json({mensaje:"Cliente eliminado"});
        }
    }catch(error){
        res.status(500).json({mensaje:"Error en el servidor"});
    }

    
}

export const delCliente=async(req, res)=>{
    try {
        const {id}=req.params
         const [result]=await conexion.query("DELETE FROM clientes WHERE id=?", [id]);
        console.log(result);
        if (result.affectedRows==0){
            return res.status(400).json({
                message:'no existe'
            })
        }else{
            return res.status(200).json({
                message:'ha sido borrado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
    

}

export const updateCliente=async(req, res)=>{
    try {
        console.log(req.body);
        const {nameCliente, emailCliente, tlfnoCliente, empresaCliente}=req.body;
        const {id}=req.params;
    
        //  const [result]=await conexion.query("UPDATE clientes SET nameCliente=?, emailCliente=?, tlfnoCliente=?, empresaCliente=? WHERE id=?", [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
        const [result]=await conexion.query("UPDATE clientes SET nameCliente=IFNULL(?,nameCliente), emailCliente=IFNULL(?,emailCliente), tlfnoCliente=IFNULL(?,tlfnoCliente), empresaCliente=IFNULL(?, empresaCliente) WHERE id=?", [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]);
    
         console.log(result);
         if (result.affectedRows==0){
            return res.status(400).json({
                message:'no existe'
            })
         }else{
            return res.status(200).json({
                message:'ha sido actualilzado'
            })
         }
    
    } catch (error) {
        res.status(500).json({
            message:"Error en el servidor"
        })
    }
   
    //res.status(201).json({id:result.insertId});

}