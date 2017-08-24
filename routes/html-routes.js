const User = require('../models').User;
const Photo = require('../models').Photo;

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('index');
    }
  });

  app.get('/login', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('login', { message: req.flash('loginMessage')[0] });
    }
  });

  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  app.get('/signup', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('signup', { message: req.flash('signupMessage')[0] });
    }
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    })
  );

  app.get('/profile', isLoggedIn, function(req, res) {
    if (req.isAuthenticated()) {
      Photo.findAll({
          where: {
            UserId: req.user.dataValues.id,
            isPet: false
          },
          include: [User]
        }).then(function (data) {
          res.render('profile', { user: req.user, "ProfilePic": data });
        });
  } else {
      res.render('index', { message: req.flash('loginMessage')[0] });
  }
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
