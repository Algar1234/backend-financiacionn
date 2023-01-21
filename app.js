'use strict'
require('dotenv').config();
var express= require ('express');

var bodyParser= require('body-parser');

var app= express();

//cargar archivos rutas
var shoppinDetails_routes= require('./rutes/shoppingDetails');
var shoppinCar_routes= require('./rutes/shoppingCar');
var user_routes= require('./rutes/user');


//middlewares
app.use(bodyParser.urlencoded({extended:false}));// esto convierte a los datos que nos lleguen por post a un objeto json
app.use(bodyParser.json());// cualquier tipo depeticion que llegue porel body la convierte a json


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//aqui va lapagina web
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api',shoppinDetails_routes);
app.use('/api',shoppinCar_routes);
app.use('/api', user_routes);


//exportar
module.exports=app;