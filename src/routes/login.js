const express = require('express');
const loginController = require('../controller/LoginController');
const router = express.Router();

router.post('/', loginController.create);
router.get('/me', loginController.me);

module.exports = router;
