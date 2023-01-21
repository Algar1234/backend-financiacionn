'use strict'

var mongoose= require("mongoose");
const { stringify } = require("uuid");
var Schema= mongoose.Schema;

var ShoppingDetails= Schema({
    
        tipePay: String,
        walletEmisora: String,
        hash: String,
        porcentaje: Number,
        monto: Number,
        fecha: String,
        
        status:{
                type: String,
                default: "sin Confirmar",
                required:true
              },
        userId: {
                type: mongoose.Types.ObjectId
        }

},
{
        timestamps:true
}
   
);

module.exports= mongoose.model("shoppinDetails", ShoppingDetails);