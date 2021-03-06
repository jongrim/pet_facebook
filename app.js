require('dotenv').config();
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const flash = require('connect-flash');

const app = express();

const db = require('./models');

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// view engine setup
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session setup
require('./config/passport')(passport);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // TODO need to research to determine
    saveUninitialized: false // do not save session unless a modification occurs
    // Need to research a session-store option - TODO
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/html-routes.js')(app, passport);
require('./routes/photo-routes.js')(app, passport);
require('./routes/post-routes.js')(app, passport);
require('./routes/addPet-routes.js')(app, passport);
require('./routes/updateProfile-routes.js')(app, passport);
const APIrouter = require('./routes/api-routes');
app.use('/api', APIrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.redirect('/login');
  return;
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync({ force: true });
} else {
  db.sequelize.sync();
}

module.exports = app;
