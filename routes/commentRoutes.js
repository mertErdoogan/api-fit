const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.get('/comments', commentController.getCommentList);
router.get('/get-comment-with-id', commentController.getCommentData);
router.post('/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;