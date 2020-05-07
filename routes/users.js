var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController') 
const { check } = require('express-validator');

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmail(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
], userController.create);


/*router.get('/', userController.index)
router.get('/:id', userController.details);
router.get('/:id', userController.details);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);*/

module.exports = router;
