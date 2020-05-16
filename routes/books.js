var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', auth, bookController.create);

router.get('/', bookController.index);

/*
router.get('/:id', centerController.details);
router.get('/:id', centerController.details);
router.put('/:id', centerController.update);
router.delete('/:id', centerController.delete);*/

module.exports = router;