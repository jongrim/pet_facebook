const User = require('../models').User;
const Post = require('../models').Post;

module.exports = function(app, passport) {
  app.get('/feed', redirectToLoginIfNotSignedIn, function(req, res) {
    Post.findAll({
      include: [User]
    })
      .then(function(data) {
        res.render('feed', { Post: data, User: data[0].User });
      })
      .catch(() => {
        res.render('feed');
      });
  });

  app.post('/feed', redirectToLoginIfNotSignedIn, function(req, res) {
    Post.create({
      textContent: req.body.postBody,
      likes: 1,
      PetID: 0,
      UserId: req.user.dataValues.id
    }).then( () => {
      res.redirect('feed');
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
