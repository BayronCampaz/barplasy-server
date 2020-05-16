var express = require('express');
var router = express.Router();
const serviceController = require('../controllers/serviceController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', auth, [
    check('type', 'El tipo de servicio es obligatorio').notEmpty(),
    check('name', 'El nombre del servicio es obligatorio').notEmpty(),
    check('description', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
], serviceController.create);

router.get('/', serviceController.index);
router.delete('/:id', serviceController.delete);
router.put('/:id', serviceController.update);


//router.get('/:id', centerController.details);


module.exports = router;