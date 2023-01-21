"use strict"

const shoppinCar= require('../models/shoppingCar');
var ShoppingCar= require('../models/shoppingCar');

var controller={
    test: function(req,res){

        res.send(
            {
                message:"Soy la home"

            }
        )

        
    },

    saveShoppingCar: async (req, res)=>{

        let shoppingCar= new ShoppingCar();
        let params= req.body
        let userId=params.userId
       

        shoppingCar.porcentaje= params.porcentaje;
        shoppingCar.total= params.total;
        shoppingCar.userId= params.userId;

       let buscando= await shoppinCar.findOne({userId:userId})

        if(buscando){
            
           let update= await shoppinCar.findOneAndUpdate({userId: userId},params, {new:true})

           return res.status(200).send({message:update});
            

        }

         shoppingCar.save((err,shoppingCarStorage)=>{

            if(err) return res.status(500).send({message:'error al guardar shoppinCars'});

            if(!shoppingCarStorage) return res.status(404).send({message:'no se ha podido guardar el ShoppingCar'});

            return res.status(200).send({shoppingCar: shoppingCarStorage});
        })

        

    },

    getShoppingCars: (req, res)=>{
        let id= req.params.id;

        ShoppingCar.findById(id, (err,shoppinCar)=>{
            if (err) return res.status(500).send({message:'error al devolver los datos'});

            if(!shoppinCar) return res.status(404).send({message: 'el shoppinCar no existe'});

            return res.status(200).send({shoppinCar: shoppinCar});
        })
    },
    getShoppingCarsUser: (req, res)=>{
          let userId= req.params.id;
          ShoppingCar.findOne({userId:userId},(err,shoppingCar)=>{
            if(err) return res.status(500).send({message:"error al devolver los datos"});

            if(!shoppinCar) return res.status(404).send({message: 'Dato no existe'});

            return res.status(200).send({shoppingCar: shoppingCar});
          })
    },
    updateShoppingCar: (req, res)=>{
        let id= req.params.id;
        let update= req.body;
        let porcentaje=update.porcentaje;
        let total=update.total;

        ShoppingCar.findOneAndUpdate({userId:id},{porcentaje:porcentaje, total:total}, {new:true}, (err, shoppingCarUpdate)=>{
               if(err) return res.status(500).send({message: 'Error al actualizar'});

               if(!shoppingCarUpdate) return res.status(404).send({message:'no existe el projecto para actualizar'});

               return res.status(200).send({shoppinCar: shoppingCarUpdate});

        });
    },

    deteleShoppingCar:  (req, res)=>{
        let id= req.params.id;

        ShoppingCar.findOneAndRemove({userId:id},  (err, shoppinCarRemove)=>{
            if (err) return res.status(500).send({message: 'No se ha podido borrar shoppinCar'});
            
            if(!shoppinCarRemove) return res.status(500).send({message:'No existe shoppingCar'});

            return res.status(200).send({ shoppinCar: shoppinCarRemove});
        } )

        
    }
}

module.exports= controller;