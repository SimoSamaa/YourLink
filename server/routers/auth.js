const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const authControllers = require('../controllers/auth');

const User = require('../models/user');

router.post('/signup',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => { // check if email already exists in database
        return User.findOne({ email: value })
          .then((matchUser) => {
            if(matchUser) return Promise
              .reject('E-mail address already exists');
          });
      }),
    body('username')
      .notEmpty()
      .trim(),
    body('password')
      .notEmpty()
      .isLength({ min: 8 })
      .trim()
  ],
  authControllers.userSignup);

router.post('/login', authControllers.userLogin);

router.post('/reset-password',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => { // check if email not exists in database
        return User.findOne({ email: value })
          .then((matchUser) => {
            if(!matchUser) return Promise
              .reject('email not exists');
          });
      }),
  ],
  authControllers.resetPassword);

router.post('/new-password/:token',
  [
    body('newPass')
      .notEmpty()
      .isLength({ min: 8 })
      .trim()
  ],
  authControllers.newPassword);

module.exports = router;