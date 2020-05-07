var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController') 
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', authController.authenticateUser);

router.get('/', auth, authController.userAuthenticated);


module.exports = router;