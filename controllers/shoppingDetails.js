"use strict"

//const project = require('../../backend/models/project');
const ShoppingCar = require('../models/shoppingCar');
const ShoppinDetails= require('../models/shoppingDetails');
var moment = require('moment');



var controller={
    test: function(req,res){

        res.send({
             
            message:"Soy la home"
        })
       
    },

    saveShoppingDetails: function(req, res){
        let shoppinDetails= new ShoppinDetails();

        let params= req.body;
        
        //creando fecha con moment js
        let fecha= moment().format('MM-DD-YYYY');

        shoppinDetails.tipePay= params.tipePay;
        shoppinDetails.walletEmisora= params.walletEmisora;
        shoppinDetails.hash= params.hash;
        shoppinDetails.porcentaje= params.porcentaje;
        shoppinDetails.monto= params.monto;
        shoppinDetails.userId= params.userId;
        shoppinDetails.fecha= fecha;

        shoppinDetails.save((err,shoppinDetailsStored)=>{
            if(err) return res.status(500).send({message:"Error al guardar el documento"});

             if (!shoppinDetailsStored) return res.status(404).send({message: 'No se ha podido guardar el documento'});
       
             return res.status(200).send({shoppinDetails: shoppinDetailsStored});
        });
        
      
    },
    getShoppingDetails: function( req, res){
        let shoppingId=req.params.id;
        

        ShoppinDetails.find({'userId':{$eq:shoppingId}},(err, shoppingDetails)=>{
            
            if(err) return res.status(500).send({message: 'error aldevolver los datos'});

            if(!shoppingDetails) return res.status(404).send({message:'elproyecto no existe'});

            return res.status(200).send({
                shoppingDetails
            });
        })
    },
    updateShoppingDetails: (req,res)=>{
        let shoppingId= req.params.id;
        let update= req.body;

        ShoppinDetails.findByIdAndUpdate(shoppingId,update,{new:true}, (err,shoppinDetailsUpdate)=>{
            if(err) return res.status(500).send({message:"Error al actualizar"});

            if (!shoppinDetailsUpdate) return res.status(404).send({message:'No existe elproyectopara actualizar'});
        

            return res.status(200).send({
                shoppinDetails: shoppinDetailsUpdate
            })
        })

    },

    deleteShoppingDetails: async (req,res)=>{
        var shoppinDetailsId= req.params.id;

     //    let busqueda= await ShoppinDetails.findById(shoppinDetailsId).select('status');

       //  var busquedaStatus= busqueda.status;
           
        //  JSON.stringify(busquedaStatus)
         
       
       //  if(busquedaStatus=="sin Confirmar"){
            ShoppinDetails.findByIdAndRemove(shoppinDetailsId,(err,shoppinDetailsRemoved)=>{
    
                if(err) return res.status(500).send({message:'No se ha podido el eliiminar'});
    
                if(!shoppinDetailsRemoved) return res.status(404).send({message:'el shopping detalle no existe'});
    
                return res.status(200).send({
                    shoppinDetails:shoppinDetailsRemoved
                })
            });


         },
        // console.log(busquedaStatus+"sin Confirmar")
       //  if(busquedaStatus=="sin Confirmar") res.send({busquedaStatus})

         

            
         
              
                

      //  return res.status(200).send({message:busquedaStatus})
    
    
            
        
        relacionarUserShoppingclient:async (req,res)=>{
 //1 shoppingDetail
   const resultado = await  ShoppinDetails.aggregate(
            [
                {
                    $lookup:
                    {
                        frow:'User',//2
                        localField:'userId',
                        foreignField: '_id',
                        as: "usuarioAuthor"
                    }
                }
            ]
        )
    return res.send({resultado})
    }
}

module.exports= controller;