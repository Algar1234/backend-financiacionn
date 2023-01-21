'use strict'

var mongoose= require("mongoose");
var Schema= mongoose.Schema;

var ShoppingCarShema= Schema({
    id: String,
    porcentaje: Number,
    total:Number,
    userId: {
        type:mongoose.Types.ObjectId
    }

});

module.exports= mongoose.model("shoppingCar", ShoppingCarShema);