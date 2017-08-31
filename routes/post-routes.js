const User = require('../models').User;
const Photo = require('../models').Photo;
const Post = require('../models').Post;
const moment = require('moment');

module.exports = function(app, passport) {
  app.get('/feed', redirectToLoginIfNotSignedIn, function(req, res) {
    Post.findAll({
      order: [['createdAt', 'DESC']],
      // look into fixing the photo part
      include: [User]
    })
      .then(function(data) {
        let mapData = data.map(post => {
          post.dataValues.createdAt = moment(
            post.dataValues.createdAt,
            moment.ISO_8601
          ).format('MMM, Do @ h:mm a');
          return post;
        });
        res.render('feed', {
          Post: mapData,
          User: data[0].User
        });
      })
      .catch(() => {
        res.render('feed');
      });
  });

  app.post('/feed', redirectToLoginIfNotSignedIn, function(req, res) {
    Post.create({
      textContent: req.body.postText,
      likes: 1,
      PetID: 0,
      UserId: req.user.dataValues.id
    }).then(function(data) {
      res.json(data);
    });
  });
};

function redirectToLoginIfNotSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

//   User.findAll({
//     where: {
//       id: req.user.dataValues.id,
//     },
//     include: [Post]
//   }).then(function (data) {
//       console.log(data[0].Posts);
//     res.render('feed', { Post: data[0].Posts });
//   });
