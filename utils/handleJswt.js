const jwt= require("jsonwebtoken");
const JWT_SECRET= process.env.JWT_SECRET;

//user es el objeto del usuario a firmar
const tokenSing= async (user)=>{

    //firmar token
    const sign= jwt.sign(
        {
            _id: user.id,
            role: user.role
        }, JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign
}

// generar token para el correo confirmacion
const tokenCorreoConfirmation= async(payLoad)=>{
      
    const singEmail= jwt.sign(
        {data:payLoad},
        JWT_SECRET,
        {expiresIn:'24h'}
    );
    return singEmail
}



//Verificar el token de session

const verifyToken= async(tokenJwt)=>{
    try {
         return  jwt.verify(tokenJwt, JWT_SECRET);
    } 
    catch (e) {
        return e
    }
}

module.exports= {tokenSing, verifyToken, tokenCorreoConfirmation};