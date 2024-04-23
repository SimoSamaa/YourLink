const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
    api_key: process.env.SENDGRID_API,
  }
}));

const signupEmailTemplate = fs.readFileSync(path.join(__dirname, '..', 'emails', 'signup.html'), 'utf8');
const loginEmailTemplate = fs.readFileSync(path.join(__dirname, '..', 'emails', 'login.html'), 'utf8');
const resetPassTemplate = fs.readFileSync(path.join(__dirname, '..', 'emails', 'reset-password.html'), 'utf8');

// SIGNUP
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

// LOGIN
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
        process.env.JWT_SIGN,
        { expiresIn: '1h' });

      const expirationTimeMs = (1 * 60 * 60 * 1000); // 1 hour
      // SEND EMAIL
      const logInEmail = loginEmailTemplate
        .replace('{{username}}', loadedUser.username);

      transporter.sendMail({
        to: email,
        from: 'rayanidbrahim@gmail.com',
        subject: 'Login succeeded!',
        html: logInEmail
      });

      res
        .status(200)
        .json({
          token: token,
          userId: loadedUser._id.toString(),
          username: loadedUser.username,
          expiresIn: expirationTimeMs
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// RESET PASSWORD
exports.resetPassword = (req, res, next) => {
  const email = req.body.email;
  handleValidationErrors(req);
  crypto.randomBytes(32, (err, buffer) => {
    if(err) {
      const error = new Error('fails to generate reset password token');
      error.statusCode = 422;
      throw error;
    }

    const token = buffer.toString('hex');
    User.findOne({ email: email })
      .then((user) => {
        handleNotFound(user, 'user', next);

        user.resetToken = token;;
        user.resetTokenExp = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        const resetPassEmail = resetPassTemplate
          .replace('token', `${ process.env.CLIENT_LOCATION }reset-password/${ token }`);

        transporter.sendMail({
          to: email,
          from: 'rayanidbrahim@gmail.com',
          subject: 'Reset your password',
          html: resetPassEmail
        });
      })
      .then(() => {
        res.status(200).json({ message: 'email reset password sent successfully' });
      })
      .catch((err) => handleErrCatch(err, next));
  });
};

// UPDATE PASSWORD
exports.newPassword = (req, res, next) => {
  const token = req.params.token;
  const newPass = req.body.newPass;
  let resetUser;

  handleValidationErrors(req);

  User.findOne({ resetToken: token, resetTokenExp: { $gt: Date.now() } })
    .then((user) => {
      handleNotFound(user, 'Reset token', next);

      resetUser = user;
      return bcrypt.hash(newPass, 12);
    })
    .then((hashedPass) => {
      resetUser.password = hashedPass;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExp = undefined;
      return resetUser.save();
    })
    .then(() => {
      transporter.sendMail({
        to: email,
        from: 'rayanidbrahim@gmail.com',
        subject: 'Update password',
        html: `<h3>Your password is updated successfully</h3>`
      });
    })
    .catch((err) => handleErrCatch(err, next));
};