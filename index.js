'use strict'

var mongoose= require('mongoose');
const app = require('./app');
const port= 3700;
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;

mongoose.connect('mongodb://localhost:27017/backend-financiacion')
.then(()=>{
    console.log('Conexion a labase de datos establecida satisfactoriamente')
     
    app.listen(port,()=>{//metodo de express
        console.log('Servidor corriendo correctamente en la url: localhost:3700')
    })
})
.catch(err=> console.log(err));

