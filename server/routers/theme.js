const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const themeControllers = require('../controllers/theme');

const isAuth = require('../middleware/is-auth');

router.get('/theme', isAuth, themeControllers.getTheme);

router.put('/selected-theme', isAuth, themeControllers.selectedTheme);

router.put('/change-bgClr',
  [
    body('hexClr')
      .isHexColor()
      .withMessage('Invalid color format')
  ]
  , isAuth, themeControllers.chnageBgclr);

module.exports = router;
