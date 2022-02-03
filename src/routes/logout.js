const express = require('express');
// const loginController = require('../controller/LoginController');
const router = express.Router();

router.get('/', router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
   }));

module.exports = router;
