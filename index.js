var mongoPassword =  process.env.MONGOPASSWORD;

var mongoose= require('mongoose');
const app = require('./app');
//const uri = process.env.url;
mongoose.set("strictQuery", false);
mongoose.Promise= global.Promise;
			


  var config = JSON.parse(process.env.APP_CONFIG);
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(
    "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
    config.mongo.hostString, 
    function(err, db) {
      if(!err) {
        res.end("We are connected to MongoDB");
        app.listen(3700,()=>{//metodo de express
            console.log('Servidor corriendo correctamente en la url: localhost:3700')
        })
      } else {
        res.end("Error while connecting to MongoDB");
      }
    }
  );

