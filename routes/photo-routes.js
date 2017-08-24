const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary');
var multer = require('multer');
const path = require('path');
var fs = require('fs');

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

module.exports = function (app, passport) {
    app.get('/photos', function (req, res) {
        if (req.isAuthenticated()) {
            res.render('photos');
        } else {
            res.render('index', { message: req.flash('loginMessage')[0] });
        }
    });

//!!!!Resubmitting the page post the image to cloudinary again!!!!!!
    app.post('/photos', upload.single('userFile'), function (req, res, next) {
        cloudinary.uploader.upload(req.file.path, result => {
            console.log(result);
            console.log('Uploaded ' + req.file.path.replace(/^.*[\\\/]/, '') + " to clousinary.");
            fs.unlink(req.file.path, function(error) {
                if (error) {
                    throw error;
                }
                console.log('Deleted ' + req.file.path.replace(/^.*[\\\/]/, '') + " from server.");
            });
          });
          res.redirect('profile');
    })
};

