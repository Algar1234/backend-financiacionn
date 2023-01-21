const shoppingDetails = require('../models/shoppingDetails');
const soppingdetail= require('../models/shoppingDetails');

//si en el modelo shoppingDetails en la poriedad status es igual a
// "confirmado " no procedera
const statusShoppingDetail= async(req, res, next)=>{
    try {
        let id= req.params.id

       let busqueda= await shoppingDetails.findById(id)

       if(busqueda.status=="confirmado"){
        return  res.status(401).send({message: "Pago confirmado"});
       }

       if(busqueda.status!='confirmado') {

        next();
        
       }

       


        
    } catch (error) {
        
    }
}


module.exports= statusShoppingDetail;