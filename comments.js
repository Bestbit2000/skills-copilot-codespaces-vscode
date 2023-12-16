// create web server with node.js

// import modules
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//             Comment
//=================================

// save comment
router.post('/saveComment', (req, res) => {
  // save to db
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    // find comment's data and send to client
    Comment.find({ _id: comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, result });
      });
  });
});

// get comments
router.post('/getComments', (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
