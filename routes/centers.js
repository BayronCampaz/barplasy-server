var express = require('express');
var router = express.Router();
const centerController = require('../controllers/centerController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', auth, [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
], centerController.create);

router.get('/', auth, centerController.index);
router.get('/:id',auth, centerController.details);

/*
router.get('/:id', centerController.details);
router.get('/:id', centerController.details);
router.put('/:id', centerController.update);
router.delete('/:id', centerController.delete);*/

module.exports = router;