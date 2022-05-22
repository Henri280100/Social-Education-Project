const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');

router.post('/register', userController.register);
router.post('/delete', userController.delete);
router.get('/login', userController.login);
module.exports = router;