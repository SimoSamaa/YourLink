const fs = require('fs');
const path = require('path');

const User = require('../models/user');
const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors
} = require('../util/helper');

// GET LOGIN USER DATA
exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      handleNotFound(user, 'user', next);
      res.status(200).json({
        message: 'User data retrieved successfully!',
        user: user
      });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE USER LOGIN DATA
exports.updateProfile = (req, res, next) => {
  const userId = req.params.id;
  const { username, bio } = req.body;
  let imgUrl;

  handleValidationErrors(req);

  // Check if a new image is provided
  if(req.file) imgUrl = req.file.path.replace("\\", "/");

  User.findById(userId)
    .then((user) => {
      handleNotFound(user, 'user', next);

      // If a new image is provided and different, delete the old image
      if(imgUrl && imgUrl !== user.userImg) clearImage(user.userImg);

      // Update username and bio if provided
      if(username) user.username = username;
      if(bio) user.bio = bio;
      if(imgUrl) user.userImg = imgUrl;
      return user.save();
    })
    .then((user) => {
      res
        .status(200)
        .json({ message: 'user profile updated successfully!', user: user });
    })
    .catch((err) => handleErrCatch(err, next));
};

exports.removeUserImg = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      handleNotFound(user, 'user', next);
      clearImage(user.userImg);
      user.userImg = '';
      user.save();
    })
    .then(() => {
      res.status(200).json({ message: 'remove image user successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

const clearImage = (filePath) => {
  if(!filePath) return;
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
