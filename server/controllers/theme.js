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
        existingTheme.bgClr = undefined;
        existingTheme.linkClr = undefined;
        existingTheme.fontLinkClr = undefined;
        existingTheme.shadowlinkClr = undefined;
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


// UPDATE BACKGROUND COLOR
exports.chnageBgclr = (req, res, next) => {
  handleValidationErrors(req);
  const color = req.body.hexClr;

  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      authorized(theme, req);
      theme.bgClr = color;
      return theme.save();
    })
    .then(() => res.status(200).json({ message: 'Background color change successfully!!' }))
    .catch((err) => handleErrCatch(err, next));
};

exports.linkStyle = (req, res, next) => {
  const linkStyle = req.body.linkStyle;

  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      authorized(theme, req);
      theme.link = linkStyle;
      theme.name = 'custom mode';
      return theme.save();
    })
    .then(() => res.status(200).json({ message: 'Link style change successfully!!' }))
    .catch((err) => handleErrCatch(err, next));
};

exports.linkChangeclr = (req, res, next) => {
  const color = req.body.colorLink;

  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      authorized(theme, req);
      theme.linkClr = color;
      return theme.save();
    })
    .then(() => res.status(200).json({ message: 'Background Link color change successfully!!' }))
    .catch((err) => handleErrCatch(err, next));
};

exports.linkChangeFontclr = (req, res, next) => {
  color = req.body.linkFontClr;

  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      authorized(theme, req);
      theme.fontLinkClr = color;
      return theme.save();
    })
    .then(() => res.status(200).json({ message: 'Font Link color change successfully!!' }))
    .catch((err) => handleErrCatch(err, next));
};

exports.linkChangeShadowClr = (req, res, next) => {
  const color = req.body.shadowlinkClr;

  Theme.findOne({ creator: req.userId })
    .then((theme) => {
      handleNotFound(theme, 'theme', next);
      authorized(theme, req);
      theme.shadowlinkClr = color;
      return theme.save();
    })
    .then(() => res.status(200).json({ message: 'Shadow Link color change successfully!!' }))
    .catch((err) => handleErrCatch(err, next));
};