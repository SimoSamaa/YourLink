const Header = require('../models/header');
const { validationResult } = require('express-validator');

function catchError(err) {
  if(!err.statusCode) err.statusCode = 500;
}

// LOAD HEADERS
exports.getHeaders = (req, res, next) => {
  Header.find()
    .then((headers) => {
      res
        .status(200)
        .json({
          message: 'load all headers successfully',
          headers: headers
        });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// CREATE HEADER
exports.createHeader = (req, res, next) => {
  const headerData = req.body;
  const title = headerData.title;
  const dataIndex = headerData.dataIndex;
  const isDisable = headerData.isDisable;

  const header = new Header({
    title: title,
    dataIndex: dataIndex,
    isDisable: isDisable
  });

  header.save()
    .then((header) => {
      res
        .status(201)
        .json({
          message: 'header create successfully!',
          header: header
        });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// DELETE HEADER
exports.deleteHeader = (req, res, next) => {
  const headerId = req.params.id;

  Header.findById(headerId)
    .then((header) => {

      if(!header) {
        const error = new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }

      return Header.findByIdAndDelete(headerId);
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'header deleted successfully!' });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// UPDATE HEADER
exports.updateHeader = (req, res, next) => {
  const headerId = req.body.id;
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error =
      new Error("Validation faild, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const updatedHeader = req.body;
  const title = updatedHeader.title;
  const isDisable = updatedHeader.isDisable;

  Header.findById(headerId)
    .then((header) => {
      if(!header) {
        const error = new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      } else if(header.title === title) {
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
    .catch((err) => {
      catchError(err);
      next(err);
    });
};

// UPDATE CHECKBOX
exports.updateHeaderCheckbox = (req, res, next) => {
  const headerId = req.params.id;
  const updateCheck = req.body;
  const isDisable = updateCheck.isDisable;

  Header.findById(headerId)
    .then((header) => {
      header.isDisable = isDisable;
      return header.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: 'checked  successfully!' });
    })
    .catch((err) => {
      catchError(err);
      next(err);
    });
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
    .catch(err => {
      catchError(err);
      next(err);
    });
};