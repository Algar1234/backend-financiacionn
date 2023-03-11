'use strict'

var mongoose= require('mongoose');
const app = require('./app');
//const uri = process.env.url;
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;
//mongodb://user:password@mongo/mydatabase'
mongoose.connect('mongodb://mongo/mydatabase') ////fvfvfvfvfvf
.then(()=>{
    console.log('Conexion a labase de datos establecida satisfactoriamente')
     //3700
    app.listen(3700,()=>{//metodo de express
        console.log('Servidor corriendo correctamente en la url: localhost:3700')
    })
})
.catch(err=> console.log(err));