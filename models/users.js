'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var UserShema= Schema({
    
    name: String,
    apellido: String,
    email: String,
    password: String,
    fecha:String,
    tokenConfirEmail:{
        type:String,
        default:''
    },
    tokenConfirResePassword: {
        type:String,
        default:''
    },
    role:{
        type:["user", "admin"],
        default: "user",
      },
    status:{
        type: String,
        require:true,
        default: 'no verificado'
    },
    code:{
        type: String,
        require: true
    }
      
},
{
    timestamps: true,
})

module.exports= mongoose.model('User', UserShema);

