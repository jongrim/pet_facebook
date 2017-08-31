const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models').User;
const Photo = require('../models').Photo;
const Pet = require('../models').Pet;

// tells multer how to store images
const storage = multer.diskStorage({
  destination: './public/images', // this is where we want to save images
  filename: (req, file, cb) => {
    // the callback function returns the file name which is
    // currently just the current date plus the original
    // extension. Multer doesn't set extensions!
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// make an upload function to use in the route
const upload = multer({ storage: storage });

module.exports = function(app, passport) {
  app.get('/photos', function(req, res) {
    if (req.isAuthenticated()) {
      User.findAll({
        where: {
          id: req.user.dataValues.id
        },
        include: [Pet, Photo]
      }).then(function(data) {
        res.render('photos', {
          user: req.user,
          Photo: data[0].Photos,
          Pet: data[0].Pets
        });
      });
    } else {
      res.render('index', { message: req.flash('loginMessage')[0] });
    }
  });

  //!!!!Resubmitting the page post the image to cloudinary again!!!!!!
  //a pet must be created before you add any photos
  app.post('/photos', upload.single('userFile'), function(req, res, next) {
    if (req.isAuthenticated()) {
      cloudinary.uploader.upload(req.file.path, result => {
        Photo.update(
          {default_Pic: false},
          {where: {
            UserId: req.user.dataValues.id, 
            PetId: req.body.pet
          }}  
      ).then( () => {
          Photo.create({
          isPet: true,
          likes: 1,
          img_url: result.secure_url,
          default_Pic: true,
          PetId: req.body.pet,
          UserId: req.user.dataValues.id
        } 
          ).then(
          fs.unlink(req.file.path, function(error) {
            if (error) {
              throw error;
            }
            console.log(
              'Deleted ' +
                req.file.path.replace(/^.*[\\\/]/, '') +
                ' from server.'
            );
            res.redirect('profile');
          })
        );
      });
    });
    } else {
      res.render('index', { message: req.flash('loginMessage')[0] });
    }
  });

  app.post('/profilePhotos', upload.single('userFile'), function(req, res, next) {
    if (req.isAuthenticated()) {
      cloudinary.uploader.upload(req.file.path, result => {
        Photo.update(
          {default_Pic: false},
          {where: {
            UserId: req.user.dataValues.id, 
            isPet: false
          }}  
      ).then( () => {
          Photo.create({
          isPet: false,
          likes: 1,
          img_url: result.secure_url,
          default_Pic: true,
          PetId: null,
          UserId: req.user.dataValues.id
        } 
          ).then(
          fs.unlink(req.file.path, function(error) {
            if (error) {
              throw error;
            }
            console.log(
              'Deleted ' +
                req.file.path.replace(/^.*[\\\/]/, '') +
                ' from server.'
            );
            res.redirect('profile');
          })
        );
      });
    });
    } else {
      res.render('index', { message: req.flash('loginMessage')[0] });
    }
  });
};