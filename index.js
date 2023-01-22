'use strict'

var mongoose= require('mongoose');
const app = require('./app');
const port= 7209;
var MONGOPORT=7209;
var MONGOPASSWORD='vyDf77FkXARVKecXLw3Y';
var MOUSEONGR= 'mongo';
var MONGOHOST='containers-us-west-89.railway.app';
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;

//mongoose.connect('mongodb://localhost:27017/backend-financiacion')
mongoose.connect('mongodb://:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{ MONGOPORT }}')
.then(()=>{
    console.log('Conexion a labase de datos establecida satisfactoriamente')
     
    app.listen(MONGOPORT,()=>{//metodo de express
        console.log('Servidor corriendo correctamente en la url: localhost:3700')
    })
})
.catch(err=> console.log(err));

