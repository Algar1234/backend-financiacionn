const {check}= require("express-validator");
const validationResults= require('../utils/handleValidator');

const validatorRegister=[
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:2, max:99}),
    check('apellido')
    .exists()
    .notEmpty()
    .isLength({min:2, max:99}),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:4,max:20}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports={validatorRegister}


