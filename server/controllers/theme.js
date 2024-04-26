const Theme = require('../models/theme');
const User = require('../models/user');

const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors,
  authorized,
} = require('../util/helper');

// GET THEME
exports.getTheme = (req, res, next) => {
  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      res.status(200).json({ message: 'Fetch theme', theme: theme });
    })
    .catch((err) => handleErrCatch(err, next));
};

// CREATE OR UPDATE THEME
exports.selectedTheme = (req, res, next) => {
  Theme.findOne({ creator: req.userId })
    .then((existingTheme) => {
      if(existingTheme) {
        authorized(existingTheme, req);
        // UPDATE EXISTING THEME
        existingTheme.page = req.body.page;
        existingTheme.link = req.body.link;
        existingTheme.name = req.body.name;
        existingTheme.logo = req.body.logo;
        existingTheme.bgImg = req.body.bgImg;
        existingTheme.save()
          .then(() => res.status(200).json({ message: 'Theme updated successfully' }))
          .catch((err) => handleErrCatch(err, next));
      } else {
        // CREATE THEME
        const theme = new Theme({ ...req.body, creator: req.userId });
        theme.save()
          .then(() => User.findById(req.userId))
          .then((user) => {
            user.theme = theme;
            return user.save();
          })
          .then(() => res.status(201).json({ message: 'Theme created successfully' }))
          .catch((err) => handleErrCatch(err, next));
      }
    })
    .catch((err) => handleErrCatch(err, next));
};
