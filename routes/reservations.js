var express = require('express');
var router = express.Router();
const reservationController = require('../controllers/reservationController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', auth, reservationController.create);
router.get('/',auth, reservationController.index);
router.put('/:id', auth, reservationController.update);

/*
router.get('/:id', centerController.details);
router.get('/:id', centerController.details);

router.delete('/:id', centerController.delete);*/

module.exports = router;