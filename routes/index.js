const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

router.get('/', blogController.home);
router.get('/blog', blogController.listPost)
router.post('/blog', blogController.storePost)
router.get('/blog/create', blogController.createPost)
router.get('/blog/:id/edit', blogController.editPost)
router.post('/blog/:id/update', blogController.updatePost)
router.post('/blog/:id/delete', blogController.deletePost)
router.get('/blog/:id', blogController.detailPost)

module.exports = router;