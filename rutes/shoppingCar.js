'use strict'

var express= require ('express');
const authMiddleware = require('../middleware/session');

var shoppinCarControllers= require ('../controllers/shoppingCar');

//middleware



var router= express.Router();

router.get('/testCar',authMiddleware, shoppinCarControllers.test);
router.post('/saveShoppingCar', authMiddleware, shoppinCarControllers.saveShoppingCar);
router.get('/getShoppingCar/:id',authMiddleware, shoppinCarControllers.getShoppingCars);
router.put('/updateShoppingCar/:id',authMiddleware, shoppinCarControllers.updateShoppingCar);
router.delete('/deleteShoppingCar/:id',authMiddleware, shoppinCarControllers.deteleShoppingCar);
router.get('/getShoppingCarUser/:id',authMiddleware, shoppinCarControllers.getShoppingCarsUser);



module.exports= router;
