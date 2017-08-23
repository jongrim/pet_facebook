const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  });

  /**
   * Local login strategy
   */
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({
          where: { email }
        })
          .then(user => {
            // if no user found
            if (!user) {
              return done(
                null,
                false,
                req.flash('loginMessage', 'Email or password is incorrect.')
              );
            }
            // if password is not valid
            if (!user.validatePassword(password)) {
              return done(
                null,
                false,
                req.flash('loginMessage', 'Email or password is incorrect.')
              );
            }
            return done(null, user);
          })
          .catch(err => {
            return done(err);
          });
      }
    )
  );

  /**
   * Local signup strategy
   */
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne({
            where: {
              email: email
            }
          })
            .then(user => {
              if (user) {
                console.log('found a user!');
                return done(
                  null,
                  false,
                  req.flash(
                    'signupMessage',
                    'An account with that email already exists'
                  )
                );
              } else {
                User.create({
                  email: email,
                  password: password
                })
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    throw err;
                  });
              }
            })
            .catch(err => {
              done(err);
            });
        });
      }
    )
  );
};
