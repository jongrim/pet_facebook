const User = require('../models').User;
const Photo = require('../models').Photo;
const Pet = require('../models').Pet;

module.exports = function(app, passport) {
  app.get('/', redirectToFeedIfSignedIn, function(req, res) {
    res.render('index', { title: 'Petster' });
  });

  /**
   * LOGIN ROUTES
   */
  app.get('/login', redirectToFeedIfSignedIn, function(req, res) {
    res.render('login', {
      title: 'Login',
      message: req.flash('loginMessage')[0]
    });
  });

  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  /**
   * SIGNUP ROUTES
   */
  app.get('/signup', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('signup', {
        title: 'Sign Up',
        message: req.flash('signupMessage')[0]
      });
    }
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup?oops',
      failureFlash: true
    })
  );

  app.get('/profile', redirectToLoginIfNotSignedIn, function(req, res) {
    let id = req.user.dataValues.id;
    User.findAll({
      where: {
        id
      },
      include: [Pet, Photo]
    })
      .then(function(data) {
        console.log(data);
        res.render('profile', {
          user: data[0],
          Photo: data[0].Photos,
          Pet: data[0].Pets,
          enableEdit: true
        });
      })
      .catch(() => {
        res.render('error');
      });
  });

  app.get('/profile/:id', redirectToLoginIfNotSignedIn, function(req, res) {
    var id = req.params.id;

    if (req.params.id == null) {
      res.redirect('/profile');
    }

    User.findAll({
      where: {
        id
      },
      include: [Pet, Photo]
    }).then(function(data) {
      res.render('profile', {
        user: data[0],
        Photo: data[0].Photos,
        Pet: data[0].Pets,
        enableEdit: false
      });
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function redirectToLoginIfNotSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function redirectToFeedIfSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/feed');
  }
  return next();
}
