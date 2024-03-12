const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors
} = require('../util/helper');

exports.userSignup = (req, res, next) => {
  handleValidationErrors(req);

  const { email, username, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const user = new User({
        email: email,
        username: username,
        password: hashedPass,
      });

      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: 'User created', userId: result._id });
    })
    .catch((err) => handleErrCatch(err, next));
};