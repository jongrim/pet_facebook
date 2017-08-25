const User = require('../models').User;
const Post = require('../models').Post;

module.exports = function (app, passport) {
    app.get('/posts', function (req, res) {
        if (req.isAuthenticated()) {
            Post.findAll({
                include: [User]
              }).then(function (data) {
                var hbsObject = { "Post": data };
                res.render('posts', hbsObject);
              });
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        }
    });

    app.post('/posts', function (req, res) {
        if (req.isAuthenticated()) {
                Post.create({
                    textContent: req.body.postBody,
                    likes: 1,
                    PetID: 0,
                    UserId: req.user.dataValues.id
                  })
              res.redirect('profile');
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        } 
    })
};
