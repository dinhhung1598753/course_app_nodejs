const express = require('express');
const userController = require('../controller/UserController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/',userController.create);
router.get('/', auth.requireAuth, userController.index);
router.get('/course',auth.requireAuth, userController.getCourses);
router.post('/course',auth.requireAuth, userController.addCourse);
// router.get('/:userId',userController.show);
// router.patch('/profile/:userId',userController.updateProfile);
// router.patch('/role/:userId',userController.updateRole);
// router.patch('/:userId', userController.changePassword);
router.delete('/:userId',auth.requireAuth, userController.delete);





module.exports = router;
