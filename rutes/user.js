'use strict'

var express= require("express");

var UserController= require('../controllers/users');
const authMiddleware = require("../middleware/session");




var router= express.Router();

router.get('/userTest', UserController.test);
router.post('/saveUser', UserController.singUp);
//router.post('/getUser',authMiddleware, UserController.getUser);
router.get('/getUser/:id',authMiddleware, UserController.getUser);
router.put('/updateUser/:id', UserController.updateUser);
router.get('/singIn/:email/:password', UserController.singIn);
router.put('/updatePassword/:id',UserController.cambiarPassword);
router.get('/confirEmail/:token',UserController.confirmaEmail);
//restrablecer la password cuando se envia un correo 
router.put('/resetPassword/:token',UserController.resetPassword);
//emviar correo cuando se ha olvidado password
router.get('/sendEmailPassword/:email', UserController.sendEmailPass);
//verificar si el link de cambiar contrasena es valido
router.get('/verificarLinkPassword/:token', UserController.verificarLinkResetPassword);


module.exports= router;

