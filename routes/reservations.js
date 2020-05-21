var express = require('express');
var router = express.Router();
const reservationController = require('../controllers/reservationController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', auth, reservationController.create);
router.get('/',auth, reservationController.index);
router.put('/:id', auth, reservationController.update);
router.delete('/:id',auth, reservationController.delete);

/*
router.get('/:id', centerController.details);
*/


module.exports = router;