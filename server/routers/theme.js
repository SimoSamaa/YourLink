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
      .isLength({ min: 4, max: 9 })
      .withMessage('Invalid color format')
  ]
  , isAuth, themeControllers.chnageBgclr);

router.put('/link-style', isAuth, themeControllers.linkStyle);

router.put('/link-change-clr',
  [
    body('colorLink')
      .isHexColor()
      .isLength({ min: 4, max: 9 })
      .withMessage('Invalid color format')
  ]
  , isAuth, themeControllers.linkChangeclr);


// link-change-clr

module.exports = router;
