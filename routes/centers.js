var express = require('express');
var router = express.Router();
const centerController = require('../controllers/centerController') 
const { check } = require('express-validator');

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmail(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
], centerController.create);


/*router.get('/', centerController.index)
router.get('/:id', centerController.details);
router.get('/:id', centerController.details);
router.put('/:id', centerController.update);
router.delete('/:id', centerController.delete);*/

module.exports = router;