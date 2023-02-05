'use strict'

var mongoose= require('mongoose');
const app = require('./app');
const uri = process.env.url;
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;
mongoose.connect(uri) ////fvfvfvfvfvf
.then(()=>{
    console.log('Conexion a labase de datos establecida satisfactoriamente')
     
    app.listen(3700,()=>{//metodo de express
        console.log('Servidor corriendo correctamente en la url: localhost:3700')
    })
})
.catch(err=> console.log(err));

/*
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

var mongoose= require('mongoose');
const app = require('./app');
const port= 7209;
var MONGOPORT='7209';
var MONGOPASSWORD='vyDf77FkXARVKecXLw3Y';
var MOUSEONGR= 'Mongo';
var MONGOHOST='containers-us-west-89.railway.app';
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;
//mongoose.connect('mongodb://:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{ MONGOPORT }}')
//mongoose.connect('mongodb://localhost:27017/backend-financiacion')
mongoose.connect('mongodb+srv://anel710:v2qw*_J*8Ne@UX#@backend-financiacion.sblllud.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Conexion a labase de datos establecida satisfactoriamente')
     
    app.listen(MONGOPORT,()=>{//metodo de express
        console.log('Servidor corriendo correctamente en la url: localhost:3700')
    })
})
.catch(err=> console.log(err));

*/
