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
      failureRedirect: '/signup',
      failureFlash: true
    })
  );

  app.get('/feed', redirectToLoginIfNotSignedIn, function(req, res) {
    res.render('feed', { title: 'Feed', user: req.user });
  });

  app.get('/profile', redirectToLoginIfNotSignedIn, function(req, res) {
    res.render('profile', { title: 'Profile', user: req.user });
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
