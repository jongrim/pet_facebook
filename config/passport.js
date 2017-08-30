const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;
const Photo = require('../models').Photo;

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
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: email,
                  password: password
                })
                  .then(user => {
                    console.log("!!!!!!!!");
                    console.log(user);
                    Photo.create({
                      isPet: false,
                      likes: 1,
                      img_url: "https://res.cloudinary.com/db3eyrc2q/image/upload/v1503611196/dontDelete.jpg",
                      PetId: null,
                      UserId: user.dataValues.id
                    }
                  ).then(photo => {
                    console.log("!!!!!!!!");
                    console.log(user);
                      return done(null, user);
                      
                    })
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
