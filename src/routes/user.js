const express = require('express');
const userController = require('../controller/UserController');
const router = express.Router();

router.post('/',userController.create);
router.get('/',userController.index);
router.get('/:userId',userController.show);
router.patch('/profile/:userId',userController.updateProfile);
router.patch('/role/:userId',userController.updateRole);
router.patch('/:userId', userController.changePassword);
router.delete('/:userId',userController.delete);

module.exports = router;
