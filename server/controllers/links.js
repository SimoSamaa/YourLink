const Link = require('../models/links');
const { validationResult } = require('express-validator');
const { handleErrCatch } = require('../util/helper');

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
  const erros = validationResult(req);

  if(!erros.isEmpty()) {
    const error = new Error('Validation faild, URL is incorrect');
    error.statusCode = 422;
    throw error;
  }

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

      if(!link) {
        const error = new Error('Link not found');
        error.statusCode = 404;
        throw error;
      }

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
  const errors = validationResult(req);
  const updatedTitileId = req.params.id;
  const updatedTitile = req.body.title;

  if(!errors.isEmpty()) {
    const error =
      new Error("Validation faild, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  Link.findById(updatedTitileId)
    .then((link) => {
      if(!link) {
        const error = new Error('Link not found');
        error.statusCode = 404;
        throw error;
      }

      link.title = updatedTitile;

      return link.save();
    })
    .then((updatedTitile) => {
      res
        .status(200)
        .json({
          title: updatedTitile.title,
          message: 'title is updated successfully!'
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE URL LINK
exports.updateUrlLink = (req, res, next) => {
  const errors = validationResult(req);
  const updatedUrlId = req.params.id;
  const updatedTUrl = req.body.link;

  if(!errors.isEmpty()) {
    const error =
      new Error("Validation faild, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  Link.findById(updatedUrlId)
    .then((link) => {
      if(!link) {
        const error = new Error('Link not found');
        error.statusCode = 404;
        throw error;
      }

      link.link = updatedTUrl;

      return link.save();
    })
    .then((updatedUrl) => {
      res
        .status(200)
        .json({
          title: updatedUrl.link,
          message: 'URL is updated successfully!'
        });
    })
    .catch((err) => handleErrCatch(err, next));
};