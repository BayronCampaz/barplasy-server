var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController') 
const { check } = require('express-validator');

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmail(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
], authController.authenticateUser);


module.exports = router;