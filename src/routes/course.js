const express = require('express');
const courseController = require('../controller/CourseController');
const router = express.Router();

router.get('/', courseController.index);
router.post('/', courseController.create);
router.put('/', courseController.update);
router.delete('/:key', courseController.delete);
router.get('/search', courseController.search);


module.exports = router;
