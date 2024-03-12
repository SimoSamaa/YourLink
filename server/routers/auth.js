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

module.exports = router;