const User = require('../models').User;

module.exports = function (app, passport) {
    app.get('/updateProfile', function (req, res) {
        if (req.isAuthenticated()) {
            User.findAll({
                where: {
                    id: req.user.dataValues.id,
                }
            }).then(function (data) {
                var hbsObject = { "User": data };
                res.render('updateProfile', hbsObject);
            });
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        }
    });

    //this works but we need to talk about the password encryption and resetting password
    app.put('/updateProfile', function (req, res) {
        if (req.isAuthenticated()) {
            User.update(
                {first_name: req.body.first_name,
                last_species: req.body.last_name,
                email: req.body.email,
                about: req.body.aboutMe},
                {where: {id: req.user.dataValues.id}}
            ).then(function () {
                res.redirect('profile');
            });
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        } 
    })
};
