const Link = require('../models/links');
const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors
} = require('../util/helper');

// GET ALL LINKS
exports.getLinks = (req, res, next) => {
  Link.find()
    .then((links) => {
      res
        .status(200)
        .json({
          links: links,
          message: 'load all links successfully!'
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// CREATE LINK
exports.createLink = (req, res, next) => {
  handleValidationErrors(req);

  const { title, link, dataIndex, isDisable, layout, icon } = req.body;

  const myLink = new Link({
    title: title,
    link: link,
    dataIndex: dataIndex,
    isDisable: isDisable,
    layout: layout,
    icon: icon
  });

  myLink.save()
    .then((link) => {
      res
        .status(201)
        .json({
          link: link,
          message: 'link create successfully!',
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// DELETE LINK
exports.deleteLink = (req, res, next) => {
  const deletedLinkId = req.params.id;

  Link.findById(deletedLinkId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      return Link.findByIdAndDelete(deletedLinkId);
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'links deleted successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE TITLE LINK
exports.updateTitleLink = (req, res, next) => {
  const updatedTitileId = req.params.id;
  const updatedTitile = req.body.title;

  handleValidationErrors(req);

  Link.findById(updatedTitileId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      link.title = updatedTitile;
      return link.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'title is updated successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE URL LINK
exports.updateUrlLink = (req, res, next) => {
  const updatedUrlId = req.params.id;
  const updatedTUrl = req.body.link;

  handleValidationErrors(req);

  Link.findById(updatedUrlId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      link.link = updatedTUrl;
      return link.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'URL is updated successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE THE HIDDEN LINK STATE
exports.updateHiddenLink = (req, res, next) => {
  const updatedHiddenId = req.params.id;
  const isDisable = req.body.isDisable;

  if(typeof isDisable !== 'boolean') {
    const error = new Error('isDisable must be a boolean value');
    error.statusCode = 404;
    throw error;
  }

  Link.findById(updatedHiddenId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      link.isDisable = isDisable;
      return link.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'checked successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE LAYOUT
exports.updateLayout = (req, res, next) => {
  const updatedLayoutId = req.params.id;
  const updatedLayout = req.body.layout;

  Link.findById(updatedLayoutId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      link.layout = updatedLayout;
      return link.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'layout updated successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE BOXICONS
exports.updateIcon = (req, res, next) => {
  const updatedIconId = req.params.id;
  const updatedIcon = req.body.icon;

  Link.findById(updatedIconId)
    .then((link) => {
      handleNotFound(link, 'link', next);
      link.icon = updatedIcon;
      return link.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'icon updated successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};