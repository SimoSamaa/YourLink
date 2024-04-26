const express = require('express');

const router = express.Router();

const themeControllers = require('../controllers/theme');

const isAuth = require('../middleware/is-auth');

router.get('/theme', isAuth, themeControllers.getTheme);

router.put('/selected-theme', isAuth, themeControllers.selectedTheme);

module.exports = router;
