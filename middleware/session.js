const { verifyToken } = require("../utils/handleJswt");
const User= require('../models/users');

const authMiddleware= async(req, res, next)=>{
    
    try {
        
        
        if(!req.headers.authorization){
            return res.status(401).send({message: 'no autorizado'});
        }
        
          // seprar el bear del token y optecer el ultimo valor del array que seria el token
        const token = req.headers.authorization.split(' ').pop()
        console.log(dataToken);
        

       var  dataToken= await verifyToken(token);
    
      
     
       if(!dataToken._id){
          return res.status(404).send({message: 'Error Id toekn'});
       }
        //buscar al iguario por su id para saber uien es
       const user = await User.findById(dataToken._id);
        //inyectar una propiedad user en la respuesta con la id del usuario
       req.user= user
      
        
        next();
        
    } catch (error) {
        return error
    }

   







}


module.exports=authMiddleware