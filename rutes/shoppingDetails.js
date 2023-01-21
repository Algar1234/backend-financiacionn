'use strict'

var express= require('express');
var ShoppingDetailsController= require('../controllers/shoppingDetails');
const authMiddleware = require('../middleware/session');
const statusShoppingDetail= require("../middleware/verifyStatus");


var router= express.Router();

router.get('/test',ShoppingDetailsController.test);
router.post('/saveShoppingDetails',authMiddleware, ShoppingDetailsController.saveShoppingDetails);
router.get('/shoppingDetails/:id',authMiddleware, ShoppingDetailsController.getShoppingDetails);
router.put('/shoppingDetailsUpdate/:id',authMiddleware, ShoppingDetailsController.updateShoppingDetails);
router.delete('/deleteDetalles/:id',authMiddleware,statusShoppingDetail, ShoppingDetailsController.deleteShoppingDetails);
router.get('relacionarUser',authMiddleware, ShoppingDetailsController.relacionarUserShoppingclient);

module.exports= router;