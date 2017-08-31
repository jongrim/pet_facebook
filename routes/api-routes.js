const User = require('../models').User;
const Post = require('../models').Post;
const router = require('express').Router();

router.route('/post').get(function(req, res) {
  Post.findAll({
    include: [User]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.route('/user/:id').get(function(req, res) {
  let { id } = req.params;
  User.findById(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
