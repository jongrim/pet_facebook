const User = require('../models').User;
const Pet = require('../models').Pet;

module.exports = function (app, passport) {
    app.get('/pets', function (req, res) {
        if (req.isAuthenticated()) {
            Pet.findAll({
                where: {
                  UserId: req.user.dataValues.id
                },
                include: [User]
              }).then(function (data) {
                var hbsObject = { "Pet": data };
                res.render('pets', hbsObject);
              });
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        }
    });

    app.post('/pets', function (req, res) {
        if (req.isAuthenticated()) {
                Pet.create({
                    pet_name: req.body.pet_name,
                    pet_species: req.body.pet_species,
                    pet_breed: req.body.pet_breed,
                    pet_about: req.body.pet_about,
                    UserId: req.user.dataValues.id
                  }).then(function () {
                    res.redirect('profile');
                });
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        } 
    })
};
