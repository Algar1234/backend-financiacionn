const bcryptjs= require ('bcrypt');

const encrypt= async (passwordPlain)=>{
    //encriptar contrase#a
    //passwordPlain: contrase#a aencriptar

    const hast= await bcryptjs.hash(passwordPlain, 10);
    return hast;
};


//comprar password con hash

const compare= async (passwordPlain, hashPassword)=>{
      
    return await bcryptjs.compare(passwordPlain,hashPassword);

}

module.exports= {encrypt, compare}