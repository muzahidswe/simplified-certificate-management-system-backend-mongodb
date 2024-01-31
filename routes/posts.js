const express = require('express');
const router = express.Router();
const { getAllPostList, getPostDetails, createPost, deletePost } = require('../controllers/postsController');

router.get('/list', getAllPostList);
router.get('/details/:id', getPostDetails);
router.post('/add-new', createPost);
router.delete('/delete/:id', deletePost);

module.exports = router;