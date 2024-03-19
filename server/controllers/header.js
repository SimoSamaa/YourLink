const Header = require('../models/header');
const User = require('../models/user');
const {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors,
  authorized,
} = require('../util/helper');

// LOAD HEADERS
exports.getHeaders = (req, res, next) => {
  Header.find({ creator: req.userId })
    .then((headers) => {
      res
        .status(200)
        .json({
          message: 'load all headers successfully',
          headers: headers
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// CREATE HEADER
exports.createHeader = (req, res, next) => {
  const { title, dataIndex, isDisable } = req.body;
  let creator;

  const header = new Header({
    title: title,
    dataIndex: dataIndex,
    isDisable: isDisable,
    creator: req.userId,
  });

  header.save()
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.headers.push(header);
      return user.save();
    })
    .then(() => {
      res
        .status(201)
        .json({
          message: 'header create successfully!',
          header: header,
          creator: { _id: creator._id, username: creator.username }
        });
    })
    .catch((err) => handleErrCatch(err, next));
};

// DELETE HEADER
exports.deleteHeader = (req, res, next) => {
  const headerId = req.params.id;

  Header.findById(headerId)
    .then((header) => {
      handleNotFound(header, 'header', next);
      authorized(header, req);
      return Header.findByIdAndDelete(headerId);
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'header deleted successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE HEADER
exports.updateHeader = (req, res, next) => {
  const headerId = req.body.id;

  handleValidationErrors(req);

  const { title, isDisable } = req.body;

  Header.findById(headerId)
    .then((header) => {
      handleNotFound(header, 'header', next);
      authorized(header, req);
      if(header.title === title) {
        const error =
          new Error("the header already exist");
        error.statusCode = 422;
        throw error;
      }

      header.title = title;
      header.isDisable = isDisable;

      return header.save();
    })
    .then((updateHeader) => {
      res
        .status(200)
        .json(
          {
            message: 'header update successfully!',
            header: updateHeader
          });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE CHECKBOX
exports.updateHeaderCheckbox = (req, res, next) => {
  const headerId = req.params.id;
  const isDisable = req.body.isDisable;

  Header.findById(headerId)
    .then((header) => {
      handleNotFound(header, 'header', next);
      authorized(header, req);
      header.isDisable = isDisable;
      return header.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'checked  successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};

// UPDATE ORDER
exports.updateHeadersOrders = (req, res, next) => {
  const updatedHeaders = req.body;
  Promise.all(
    updatedHeaders.map((header) => {
      return Header.findByIdAndUpdate(header.id, { dataIndex: header.dataIndex });
    })
  )
    .then(() => {
      res
        .status(200)
        .json({ message: 'Order updated successfully!' });
    })
    .catch((err) => handleErrCatch(err, next));
};