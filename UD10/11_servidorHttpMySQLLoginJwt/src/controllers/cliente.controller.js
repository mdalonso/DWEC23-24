import conexion from "../conector_mysql.js";

export const getClientes=async (req, res)=>{
    try{
        //Si necesitamos realizar alguna comprobación sobre la identidad del usuario,
        //por ejemplo, si incluyera información acerca del rol que restringiera
        //ciertas funcionalidades, podemos acceder a esa información del usuario
        //que ha sido extraída del token y ubicada en decode dentro del objeto request.
        console.log(req.decode);
        const [resultado]=await conexion.query("SELECT * FROM clientes");
        console.log(resultado);
        res.status(200);
        res.json(resultado);
    }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    }
    //res.send("Obteniendo clientes")
};

export const getCliente=async (req, res)=>{
    console.log(req.params);
    const id=req.params.id;
    //const {id}=req.params;
    console.log(id);
    try{
        
        const [resultado]=await conexion.query("SELECT * FROM clientes WHERE id=?",[id]);
        console.log(resultado);
        
        if (resultado.length==0){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        } 
        res.status(200).json(resultado[0]); 
    }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
        
    }
    //res.send("Obteniendo cliente");
};

export const addCliente=async(req, res)=>{

    console.log(req.body);

    const {nombreCliente,emailCliente,tlfnoCliente,empresaCliente}=req.body;


    console.log(nombreCliente,emailCliente,tlfnoCliente,empresaCliente);
    try{

        const [resultado]=await conexion.query("INSERT INTO clientes (nombreCliente,emailCliente,tlfnoCliente,empresaCliente) VALUES (?,?,?,?)",[nombreCliente,emailCliente,tlfnoCliente,empresaCliente]);
    
        console.log(resultado);
    
        res.status(201).json({
            id:resultado.insertId,
            mensaje:"Registro insertado"
        })
    
        //res.send("Creando clientes");
     }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    }

};

export const updateCliente=async(req, res)=>{
    console.log(req.body);
    console.log(req.params);

    //const id=req.params.id;
    const {id}=req.params;
    const {nombreCliente,emailCliente,tlfnoCliente,empresaCliente}=req.body;

    try{
        
        const [resultado]=await conexion.query("UPDATE clientes SET nombreCliente=?,emailCliente=?,tlfnoCliente=?,empresaCliente=? WHERE id=?",[nombreCliente,emailCliente,tlfnoCliente,empresaCliente,id]);
        console.log(resultado);
        if (resultado.affectedRows==0){
            return res.status(404).json({
                mensaje:"Cliente no encontrado"
            })
        }
        const [filas]=await conexion.query("SELECT * FROM clientes WHERE id=?",[id]);
        res.status(200).json(filas[0]);
    }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    }
    //res.send("Actualizando clientes")//
};

export const patchCliente=async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

    //const id=req.params.id;
    const {id}=req.params;
    const {nombreCliente,emailCliente,tlfnoCliente,empresaCliente}=req.body;

    try{

        const [resultado]=await conexion.query("UPDATE clientes SET nombreCliente=IFNULL(?,nombrecliente),emailCliente=IFNULL(?,emailCliente),tlfnoCliente=IFNULL(?,tlfnoCliente),empresaCliente=IFNULL(?,empresaCliente) WHERE id=?",[nombreCliente,emailCliente,tlfnoCliente,empresaCliente,id]);
        console.log(resultado);
        if (resultado.affectedRows==0){
            return res.status(404).json({
                mensaje:"Cliente no encontrado"
            })
        }
        const [filas]=await conexion.query("SELECT * FROM clientes WHERE id=?",[id]);
        res.status(206).json(filas[0]);
    }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    }
};

export const deleteCliente=async(req, res)=>{
    const {id}=req.params;
    try{

        const [resultado]=await conexion.query("DELETE FROM clientes WHERE id=?",[id]);
        console.log(resultado);
    
        if (resultado.affectedRows==0){
            return res.status(404).json({
                mensaje:"Cliente no encontrado"
            })
        }
        res.status(200).json({mensaje:"Cliente eliminado"});
    }catch(error){
        return res.status(500).json({
            mensaje:"Error en el servidor"
        })
    }
    //res.send("Borrando clientes")
};

