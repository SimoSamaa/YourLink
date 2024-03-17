const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors
} = require('../util/helper');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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',
  }
}));

const signupEmailTemplate = fs.readFileSync(path.join(__dirname, '..', 'emails', 'signup.html'), 'utf8');

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
    .then(() => {
      const signupEmail = signupEmailTemplate
        .replace('{{username}}', username)
        .replace('{{email}}', email);

      return transporter.sendMail({
        to: email,
        from: 'rayanidbrahim@gmail.com',
        subject: 'Signup succeeded!',
        html: signupEmail
      });
    })
    .catch((err) => handleErrCatch(err, next));
};

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if(!user) {
        const error = new Error('A user with this email could not be found');
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if(!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'thisismyblablabla',
        { expiresIn: '1h' });
      res
        .status(200)
        .json({ token: token, userId: loadedUser._id.toString(), username: loadedUser.username });
    })
    .catch((err) => handleErrCatch(err, next));
};