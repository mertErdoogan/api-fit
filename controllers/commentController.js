const Comment = require('../models/Comment');

// Get all Abouts
exports.getCommentList = async (req, res) => {
  try {
    const comment = await Comment.findAll();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comment with key
exports.getCommentData = async (req, res) => {
  try {
    const { id } = req.query;
      const comment = await Comment.findOne({
        where: {
          id: id,
        },
      });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new Comment
exports.createComment = async (req, res) => {
  try {
    const { title, commentText, author, jobTitle } = req.body;
    const comment = await Comment.create({ author, title, jobTitle, commentText, title });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, commentText, author, jobTitle } = req.body;
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.title = title;
      comment.commentText = commentText;
      comment.author = author;
      comment.jobTitle = jobTitle;
      await comment.save();
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};